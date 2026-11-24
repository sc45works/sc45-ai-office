import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DEMO_SCRIPT, EMITTING_AGENTS, activeMissionCount, applyEvent, buildAgentGraph, buildCompanyGraph, emptySnapshot, findAgent, nextPlace, parseEvent, resolveDemoEvent, type OfficeEvent } from '@sc45/shared';

const ts = '2026-11-14T01:00:00.000Z';
const stateEvent = (agentId: string, state: OfficeEvent['state'], extra: Partial<OfficeEvent> = {}): OfficeEvent => ({ ts, type: 'agent.state', agentId, state, ...extra });

test('parseEvent accepts a well-formed event and trims it', () => {
  const result = parseEvent({ ts, type: 'agent.state', agentId: ' dev.frontend ', state: 'working', task: ' Building hero section ' });
  assert.ok(result.ok);
  assert.deepEqual(result.event, { ts, type: 'agent.state', agentId: 'dev.frontend', state: 'working', task: 'Building hero section' });
});

test('parseEvent rejects malformed events with a reason', () => {
  const cases: Array<[unknown, RegExp]> = [
    ['nope', /JSON object/],
    [{ ts, type: 'agent.dance', agentId: 'dev.qa' }, /unknown type/],
    [{ ts, type: 'agent.state', state: 'working' }, /agentId/],
    [{ ts: 'yesterday', type: 'agent.state', agentId: 'dev.qa', state: 'working' }, /ISO 8601/],
    [{ ts, type: 'agent.state', agentId: 'dev.qa' }, /needs a "state"/],
    [{ ts, type: 'agent.state', agentId: 'dev.qa', state: 'napping' }, /unknown state/],
    [{ ts, type: 'agent.moved', agentId: 'dev.qa' }, /deskId/],
    [{ ts, type: 'mission.created', agentId: 'exec.chief-of-staff' }, /missionId/],
    [{ ts, type: 'mission.updated', agentId: 'exec.chief-of-staff', missionId: 'M-1', meta: { status: 'lost' } }, /mission status/],
    [{ ts, type: 'agent.output', agentId: 'dev.frontend', task: 'Hero component' }, /meta\.path/],
  ];
  for (const [input, reason] of cases) {
    const result = parseEvent(input);
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, reason);
  }
});

test('an empty snapshot has every agent idle, and not Stephen', () => {
  const snapshot = emptySnapshot();
  assert.equal(Object.keys(snapshot.agents).length, EMITTING_AGENTS.length);
  assert.equal(snapshot.agents['exec.ceo'], undefined);
  assert.ok(Object.values(snapshot.agents).every((agent) => agent.state === 'idle'));
});

test('working sets a task; idle clears it', () => {
  const snapshot = emptySnapshot();
  applyEvent(snapshot, stateEvent('dev.frontend', 'working', { task: 'Building hero section', missionId: 'M-1' }));
  assert.deepEqual(snapshot.agents['dev.frontend'], { state: 'working', since: ts, task: 'Building hero section', missionId: 'M-1' });
  applyEvent(snapshot, stateEvent('dev.frontend', 'idle'));
  assert.deepEqual(snapshot.agents['dev.frontend'], { state: 'idle', since: ts });
  assert.equal(snapshot.seq, 2);
});

test('where an agent is follows the place rules', () => {
  assert.equal(nextPlace(undefined, 'collaborating', 'meeting'), 'meeting');
  assert.equal(nextPlace('meeting', 'collaborating', undefined), 'meeting', 'a collaborating agent stays put');
  assert.equal(nextPlace('meeting', 'working', undefined), undefined, 'working sends it home');
  assert.equal(nextPlace('lounge.sofa-1', 'idle', undefined), 'lounge.sofa-1', 'idle in the lounge stays in the lounge');
  assert.equal(nextPlace('meeting', 'idle', undefined), undefined, 'idle elsewhere goes home');

  const snapshot = emptySnapshot();
  applyEvent(snapshot, stateEvent('design.lead', 'collaborating', { task: 'Sync', deskId: 'meeting' }));
  assert.equal(snapshot.agents['design.lead'].at, 'meeting');
  applyEvent(snapshot, stateEvent('design.lead', 'working', { task: 'Moodboard' }));
  assert.equal(snapshot.agents['design.lead'].at, undefined);
  applyEvent(snapshot, stateEvent('design.lead', 'idle', { deskId: 'design.lead' }));
  assert.equal(snapshot.agents['design.lead'].at, undefined, 'your own desk is not a special place');
  applyEvent(snapshot, { ts, type: 'agent.moved', agentId: 'design.lead', deskId: 'lounge' });
  assert.equal(snapshot.agents['design.lead'].at, 'lounge');
});

test('missions open, change and close', () => {
  const snapshot = emptySnapshot();
  applyEvent(snapshot, { ts, type: 'mission.created', agentId: 'exec.chief-of-staff', missionId: 'M-1', task: 'Homepage refresh' });
  applyEvent(snapshot, { ts, type: 'mission.created', agentId: 'exec.chief-of-staff', missionId: 'M-2', task: 'Build log', meta: { status: 'queued' } });
  assert.equal(activeMissionCount(snapshot), 1);
  applyEvent(snapshot, { ts, type: 'mission.updated', agentId: 'exec.chief-of-staff', missionId: 'M-2', meta: { status: 'active' } });
  assert.equal(activeMissionCount(snapshot), 2);
  applyEvent(snapshot, { ts, type: 'mission.closed', agentId: 'exec.chief-of-staff', missionId: 'M-1' });
  assert.equal(activeMissionCount(snapshot), 1);
  assert.deepEqual(snapshot.missions.map((mission) => [mission.id, mission.status, mission.title]), [
    ['M-2', 'active', 'Build log'],
    ['M-1', 'done', 'Homepage refresh'],
  ]);
});

test('the demo script is all valid events for real agents, and ends with everyone idle at home', () => {
  const snapshot = emptySnapshot();
  for (const step of DEMO_SCRIPT) {
    const event = resolveDemoEvent(step, 0, new Date(ts));
    const parsed = parseEvent(event);
    assert.ok(parsed.ok, parsed.ok ? '' : `${JSON.stringify(step)}: ${parsed.error}`);
    assert.ok(findAgent(event.agentId) && !findAgent(event.agentId)?.human, `unknown agent ${event.agentId}`);
    applyEvent(snapshot, event);
  }
  assert.equal(activeMissionCount(snapshot), 0);
  for (const [id, agent] of Object.entries(snapshot.agents)) {
    assert.equal(agent.state, 'idle', `${id} is still ${agent.state}`);
    assert.equal(agent.at, undefined, `${id} is still at ${agent.at}`);
  }
  assert.equal(resolveDemoEvent(DEMO_SCRIPT[0], 2, new Date(ts)).missionId, 'M-107');
});

test('outputs and tasks are remembered per agent, and an output joins the agent\'s current mission', () => {
  const snapshot = emptySnapshot();
  applyEvent(snapshot, { ts, type: 'mission.created', agentId: 'exec.chief-of-staff', missionId: 'M-1', task: 'Homepage refresh' });
  applyEvent(snapshot, stateEvent('dev.frontend', 'working', { task: 'Building hero section', missionId: 'M-1' }));
  applyEvent(snapshot, { ts, type: 'agent.output', agentId: 'dev.frontend', task: 'Hero component', meta: { path: 'site/src/Hero.tsx' } });
  applyEvent(snapshot, { ts, type: 'agent.output', agentId: 'dev.frontend', meta: { path: 'site/src/hero.css' } });
  applyEvent(snapshot, { ts, type: 'agent.output', agentId: 'dev.frontend', task: 'Hero component, second pass', meta: { path: 'site/src/Hero.tsx' } });

  const activity = snapshot.activity['dev.frontend'];
  assert.deepEqual(activity.missions, ['M-1']);
  assert.deepEqual(activity.tasks.map((task) => [task.label, task.missionId]), [['Building hero section', 'M-1']]);
  assert.deepEqual(
    activity.outputs.map((output) => [output.path, output.label, output.missionId]),
    [
      ['site/src/hero.css', undefined, 'M-1'],
      ['site/src/Hero.tsx', 'Hero component, second pass', 'M-1'],
    ],
    'the same file reported twice is one entry, moved to the end',
  );

  for (let i = 0; i < 30; i++) applyEvent(snapshot, { ts, type: 'agent.output', agentId: 'dev.frontend', meta: { path: `site/src/file-${i}.ts` } });
  assert.equal(snapshot.activity['dev.frontend'].outputs.length, 10, 'the list stays short');
});

test('the agent graph links agent, missions, tasks, folders and files', () => {
  const snapshot = emptySnapshot();
  assert.deepEqual(buildAgentGraph(snapshot, 'dev.frontend'), { agentId: 'dev.frontend', nodes: [{ id: 'agent:dev.frontend', kind: 'agent', label: 'Leo' }], links: [] });

  applyEvent(snapshot, { ts, type: 'mission.created', agentId: 'exec.chief-of-staff', missionId: 'M-1', task: 'Homepage refresh' });
  applyEvent(snapshot, stateEvent('dev.frontend', 'working', { task: 'Building hero section', missionId: 'M-1' }));
  applyEvent(snapshot, { ts, type: 'agent.output', agentId: 'dev.frontend', task: 'Hero component', meta: { path: 'site/src/Hero.tsx' } });
  applyEvent(snapshot, { ts, type: 'agent.output', agentId: 'dev.frontend', meta: { path: 'site/src/hero.css' } });
  applyEvent(snapshot, stateEvent('dev.frontend', 'idle'));
  applyEvent(snapshot, { ts, type: 'agent.output', agentId: 'dev.frontend', meta: { path: 'notes.md' } });

  const graph = buildAgentGraph(snapshot, 'dev.frontend');
  assert.deepEqual(
    graph.nodes.map((node) => `${node.kind}:${node.label}`),
    ['agent:Leo', 'mission:M-1', 'task:Building hero section', 'folder:site/src', 'file:Hero.tsx', 'file:hero.css', 'file:notes.md'],
  );
  const linked = (source: string, target: string) => graph.links.some((link) => link.source === source && link.target === target);
  assert.ok(linked('agent:dev.frontend', 'mission:M-1'));
  assert.ok(linked('mission:M-1', 'task:M-1:Building hero section'));
  assert.ok(linked('mission:M-1', 'folder:site/src'));
  assert.ok(linked('folder:site/src', 'file:site/src/Hero.tsx'));
  assert.ok(linked('agent:dev.frontend', 'file:notes.md'), 'a file with no mission and no folder hangs from the agent');
  assert.equal(graph.nodes.find((node) => node.id === 'mission:M-1')?.detail, 'Homepage refresh');
  assert.equal(new Set(graph.nodes.map((node) => node.id)).size, graph.nodes.length, 'no node appears twice');
});

test('the company graph gathers missions, the people on them and their files', () => {
  const snapshot = emptySnapshot();
  const at = (seconds: number) => new Date(Date.UTC(2026, 10, 14, 4, 0, seconds)).toISOString();
  const events: OfficeEvent[] = [
    { ts: at(1), type: 'mission.created', agentId: 'exec.chief-of-staff', missionId: 'M-1', task: 'Homepage refresh' },
    { ts: at(2), type: 'agent.state', agentId: 'dev.frontend', state: 'working', task: 'Build hero', missionId: 'M-1' },
    { ts: at(3), type: 'agent.output', agentId: 'dev.frontend', task: 'Hero', meta: { path: 'site/src/Hero.tsx' } },
    { ts: at(4), type: 'agent.state', agentId: 'design.lead', state: 'working', task: 'Art direction', missionId: 'M-1' },
    { ts: at(5), type: 'agent.state', agentId: 'content.manager', state: 'working', task: 'Tidy the calendar' },
  ];
  for (const event of events) applyEvent(snapshot, event);

  const graph = buildCompanyGraph(snapshot);
  const linked = (source: string, target: string) => graph.links.some((link) => link.source === source && link.target === target);
  assert.equal(graph.nodes[0].id, 'company');
  assert.ok(linked('company', 'mission:M-1'));
  assert.ok(linked('mission:M-1', 'agent:M-1:dev.frontend'));
  assert.ok(linked('mission:M-1', 'agent:M-1:design.lead'));
  assert.ok(linked('agent:M-1:dev.frontend', 'file:M-1:dev.frontend:site/src/Hero.tsx'));
  assert.ok(linked('company', 'agent::content.manager'), 'someone busy with no mission hangs from the centre');
  assert.equal(graph.nodes.find((node) => node.id === 'agent:M-1:dev.frontend')?.agentId, 'dev.frontend');
  assert.equal(new Set(graph.nodes.map((node) => node.id)).size, graph.nodes.length, 'no node appears twice');
});
