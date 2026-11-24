import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { applyEvent, builtInPlan, describeOffice, emptySnapshot, extractJson, parsePlan, planToEvents, type OfficeEvent, type OfficeSnapshot } from '@sc45/shared';
import { busPaths, readLog } from '@sc45/bus';
import { createOfficeServer } from '@sc45/server';
import { autoBrain, claudeCodeBrain } from '@sc45/server/brain';

const ts = '2026-11-14T03:00:00.000Z';
const temporaryDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'sc45-command-'));
const withMission = (): OfficeSnapshot => {
  const snapshot = emptySnapshot();
  applyEvent(snapshot, { ts, type: 'mission.created', agentId: 'exec.chief-of-staff', missionId: 'M-7', task: 'Relay proposal' });
  applyEvent(snapshot, { ts, type: 'agent.state', agentId: 'sales.manager', state: 'working', task: 'Proposal draft', missionId: 'M-7' });
  return snapshot;
};

test('a JSON plan is found inside a chatty answer', () => {
  assert.deepEqual(extractJson('Here you go:\n```json\n{"reply":"ok","actions":[]}\n```\nAnything else?'), { reply: 'ok', actions: [] });
  assert.throws(() => extractJson('no json here'), /no JSON object/);
});

test('a plan is checked: bad parts are dropped, with reasons', () => {
  const snapshot = withMission();
  const result = parsePlan(
    {
      reply: '  On it.  ',
      actions: [
        {
          type: 'create_mission',
          title: 'Landing page for Relay',
          assignments: [
            { agentId: 'dev.frontend', task: 'Build the page' },
            { agentId: 'dev.frontend', task: 'Build it twice' },
            { agentId: 'dev.backend', task: 'Does not exist' },
            { agentId: 'exec.ceo', task: 'Stephen is not an agent' },
            { agentId: 'exec.chief-of-staff', task: 'Not herself' },
            { agentId: 'design.lead' },
          ],
        },
        { type: 'close_mission', missionId: 'M-7' },
        { type: 'close_mission', missionId: 'M-99' },
        { type: 'set_state', agentId: 'dev.qa', state: 'blocked', task: 'Staging is down' },
        { type: 'set_state', agentId: 'dev.qa', state: 'napping' },
        { type: 'run_shell', command: 'rm -rf /' },
      ],
    },
    snapshot,
  );
  assert.ok(result.ok);
  assert.equal(result.plan.reply, 'On it.');
  assert.deepEqual(result.plan.actions, [
    { type: 'create_mission', title: 'Landing page for Relay', assignments: [{ agentId: 'dev.frontend', task: 'Build the page', stage: 2 }] },
    { type: 'close_mission', missionId: 'M-7' },
    { type: 'set_state', agentId: 'dev.qa', state: 'blocked', task: 'Staging is down' },
  ]);
  assert.equal(result.dropped.length, 7);
  assert.equal(parsePlan({ actions: [] }, snapshot).ok, false, 'a plan must say something');
  assert.equal(parsePlan('nope', snapshot).ok, false);
});

test('a plan becomes events: missions are numbered, the coordinator joins, closing frees the team', () => {
  const snapshot = withMission();
  const work = planToEvents(
    {
      reply: 'ok',
      actions: [
        { type: 'create_mission', title: 'Landing page', assignments: [{ agentId: 'dev.frontend', task: 'Build the page', stage: 2 }] },
        { type: 'create_mission', title: 'Launch video', assignments: [] },
        { type: 'close_mission', missionId: 'M-7' },
      ],
    },
    snapshot,
  );
  assert.deepEqual(
    work.events.map((event) => [event.type, event.agentId, event.missionId, event.state, event.task]),
    [
      ['mission.created', 'exec.chief-of-staff', 'M-8', undefined, 'Landing page'],
      ['agent.state', 'exec.project-coordinator', 'M-8', 'working', 'Coordinating: Landing page'],
      ['agent.state', 'dev.frontend', 'M-8', 'working', 'Build the page'],
      ['mission.created', 'exec.chief-of-staff', 'M-9', undefined, 'Launch video'],
      ['agent.state', 'exec.project-coordinator', 'M-9', 'working', 'Coordinating: Launch video'],
      ['mission.closed', 'exec.chief-of-staff', 'M-7', undefined, undefined],
      ['agent.state', 'sales.manager', undefined, 'idle', undefined],
    ],
  );
  assert.deepEqual(work.summary, ['Opened M-8 "Landing page": Leo', 'Opened M-9 "Launch video"', 'Closed M-7']);
});

test('the built-in planner staffs by keyword, closes missions and reports status', () => {
  const snapshot = withMission();
  const build = builtInPlan('Please build a landing page for Relay.', snapshot);
  assert.equal(build.actions.length, 1);
  const mission = build.actions[0];
  assert.ok(mission.type === 'create_mission');
  assert.equal(mission.title, 'Build a landing page for Relay');
  assert.deepEqual(mission.assignments.map((assignment) => assignment.agentId), ['design.lead', 'design.ui-ux', 'dev.lead', 'dev.frontend', 'dev.qa']);

  assert.deepEqual(builtInPlan('close M-7', snapshot).actions, [{ type: 'close_mission', missionId: 'M-7' }]);
  assert.deepEqual(builtInPlan('wrap up everything', snapshot).actions, [{ type: 'close_mission', missionId: 'M-7' }]);
  assert.deepEqual(builtInPlan('close M-99', snapshot).actions, []);

  const status = builtInPlan("what's the status?", snapshot);
  assert.deepEqual(status.actions, []);
  assert.match(status.reply, /1 open mission: M-7 Relay proposal\. Marco is busy\./);

  const vague = builtInPlan('Think about next quarter', snapshot).actions[0];
  assert.ok(vague.type === 'create_mission');
  assert.deepEqual(vague.assignments.map((assignment) => assignment.agentId), ['research.scout']);
  assert.match(describeOffice(snapshot), /sales\.manager · Marco · Sales Manager · working: Proposal draft \(M-7\)/);
});

const post = (server: ReturnType<typeof createOfficeServer>, body: unknown, headers: Record<string, string> = { 'content-type': 'application/json' }) =>
  server.app.request('/command', { method: 'POST', headers, body: typeof body === 'string' ? body : JSON.stringify(body) });

test('POST /command plans the request and writes the events to the log', async () => {
  const dataDir = temporaryDir();
  const server = createOfficeServer({ dataDir, pollMs: 60_000, commandStepMs: 0 });
  try {
    const response = await post(server, { text: 'Build a landing page for Relay' });
    assert.equal(response.status, 200);
    const result = (await response.json()) as { reply: string; summary: string[]; brain: string };
    assert.equal(result.brain, 'built-in');
    assert.deepEqual(result.summary, ['Opened M-1 "Build a landing page for Relay": Mika, Noor, Ada, Leo, Tess']);

    await new Promise((resolve) => setTimeout(resolve, 30)); // the events are written just after the answer
    server.poll();
    const events = readLog(busPaths(dataDir)).events;
    assert.deepEqual(
      events.map((event: OfficeEvent) => `${event.type} ${event.agentId} ${event.state ?? event.missionId}`),
      [
        'agent.state exec.chief-of-staff working',
        'agent.state exec.chief-of-staff working',
        'mission.created exec.chief-of-staff M-1',
        'agent.state exec.project-coordinator working',
        'agent.state design.lead working',
        'agent.state design.ui-ux working',
        'agent.state dev.lead working',
        'agent.state dev.frontend working',
        'agent.state dev.qa working',
        'agent.state exec.chief-of-staff idle',
      ],
    );
    const snapshot = server.snapshot();
    assert.equal(snapshot.missions[0].title, 'Build a landing page for Relay');
    assert.equal(snapshot.agents['dev.frontend'].missionId, 'M-1');
    assert.equal(snapshot.agents['exec.chief-of-staff'].state, 'idle');

    // A second mission gets the next number, and closing the first frees its team.
    assert.deepEqual(((await (await post(server, { text: 'Research competitor pricing' })).json()) as { summary: string[] }).summary, ['Opened M-2 "Research competitor pricing": Iris, Otto']);
    await new Promise((resolve) => setTimeout(resolve, 30));
    await post(server, { text: 'close M-1' });
    await new Promise((resolve) => setTimeout(resolve, 30));
    server.poll();
    assert.equal(server.snapshot().agents['dev.frontend'].state, 'idle');
    assert.equal(server.snapshot().agents['research.scout'].state, 'working');
  } finally {
    server.stop();
  }
});

test('POST /command refuses other sites, other content types and empty or oversized requests', async () => {
  const server = createOfficeServer({ dataDir: temporaryDir(), pollMs: 60_000, commandStepMs: 0 });
  try {
    assert.equal((await post(server, { text: 'hello' }, { 'content-type': 'application/json', origin: 'https://evil.example' })).status, 403);
    assert.equal((await post(server, { text: 'hello' }, { 'content-type': 'application/json', origin: 'http://localhost:5173' })).status, 200);
    assert.equal((await post(server, JSON.stringify({ text: 'hello' }), { 'content-type': 'text/plain' })).status, 415);
    assert.equal((await post(server, '{not json')).status, 400);
    assert.equal((await post(server, { text: '   ' })).status, 400);
    assert.equal((await post(server, { text: 'x'.repeat(501) })).status, 400);
  } finally {
    server.stop();
  }
});

test('a brain whose plan is unusable is reported, and the Chief of Staff is left idle', async () => {
  const dataDir = temporaryDir();
  const server = createOfficeServer({ dataDir, pollMs: 60_000, commandStepMs: 0, brain: async () => ({ plan: 'I would rather chat', brain: 'claude-code' }) });
  try {
    const response = await post(server, { text: 'Build something' });
    assert.equal(response.status, 502);
    assert.match(((await response.json()) as { error: string }).error, /could not be used/);
    server.poll();
    assert.equal(server.snapshot().agents['exec.chief-of-staff'].state, 'idle');
    assert.equal((await post(server, { text: 'status' }, { 'content-type': 'application/json' })).status, 502, 'and the next request is not blocked by a stuck lock');
  } finally {
    server.stop();
  }
});

// A stand-in for the `claude` command: a tiny script that prints what Claude Code prints.
function fakeClaude(script: string): string {
  const file = path.join(temporaryDir(), 'claude');
  fs.writeFileSync(file, `#!/usr/bin/env node\n${script}\n`, { mode: 0o755 });
  return file;
}

test('the Claude Code brain sends the office state on stdin with tools off, and reads the plan from the result', { skip: process.platform === 'win32' }, async () => {
  const record = path.join(temporaryDir(), 'call.json');
  const command = fakeClaude(`
    let input = '';
    process.stdin.on('data', (chunk) => (input += chunk)).on('end', () => {
      require('fs').writeFileSync(${JSON.stringify(record)}, JSON.stringify({ args: process.argv.slice(2), input }));
      const plan = { reply: 'Opening it now.', actions: [{ type: 'create_mission', title: 'Relay landing page', assignments: [{ agentId: 'dev.frontend', task: 'Build the page' }] }] };
      console.log(JSON.stringify({ type: 'result', is_error: false, result: 'Sure:\\n' + JSON.stringify(plan) }));
    });`);
  const answer = await claudeCodeBrain({ command })('Build a landing page for Relay', withMission());
  assert.equal(answer.brain, 'claude-code');
  assert.deepEqual((answer.plan as { actions: unknown[] }).actions.length, 1);

  const call = JSON.parse(fs.readFileSync(record, 'utf8')) as { args: string[]; input: string };
  assert.equal(call.args[call.args.indexOf('--tools') + 1], '', 'every tool is switched off');
  assert.ok(call.args.includes('-p') && call.args.includes('--strict-mcp-config'));
  assert.match(call.args[call.args.indexOf('--system-prompt-file') + 1], /chief-of-staff\.md$/);
  assert.ok(!call.args.some((arg) => arg.includes('Relay')), 'the request is never passed as an argument');
  assert.match(call.input, /Request from Stephen:\nBuild a landing page for Relay$/);
  assert.match(call.input, /M-7 · Relay proposal/);
});

test('with no Claude Code installed, the automatic brain falls back to the built-in planner and says so', async () => {
  const brain = autoBrain({ command: path.join(temporaryDir(), 'no-such-command') });
  const answer = await brain('Research competitor pricing', emptySnapshot());
  assert.equal(answer.brain, 'built-in');
  assert.match(answer.note ?? '', /Claude Code was not found/);
});

test('a Claude Code error is passed on, not swallowed', { skip: process.platform === 'win32' }, async () => {
  const command = fakeClaude(`console.log(JSON.stringify({ type: 'result', is_error: true, result: 'Credit balance is too low' }));`);
  await assert.rejects(claudeCodeBrain({ command })('anything', emptySnapshot()), /Credit balance is too low/);
});
