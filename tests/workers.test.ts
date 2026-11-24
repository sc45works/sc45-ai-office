import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { emptySnapshot, parsePlan, planToEvents, projectSlug, type OfficeEvent } from '@sc45/shared';
import { busPaths, readLog } from '@sc45/bus';
import { readVerdict } from '../packages/server/src/workers.ts';
import { createOfficeServer } from '@sc45/server';

const temporaryDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'sc45-workers-'));

/**
 * A stand-in for the `claude` command as a worker: it prints what Claude Code prints while
 * working (one JSON message per line) and really writes the files it says it wrote.
 * What it does depends on a word in its task.
 */
function fakeWorker(): string {
  const file = path.join(temporaryDir(), 'claude');
  fs.writeFileSync(
    file,
    `#!/usr/bin/env node
const fs = require('fs'), path = require('path');
let input = '';
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', async () => {
  const say = (message) => console.log(JSON.stringify(message));
  const use = (id, name, file) => say({ type: 'assistant', message: { content: [{ type: 'tool_use', id, name, input: { file_path: file } }] } });
  const result = (id, isError) => say({ type: 'user', message: { content: [{ type: 'tool_result', tool_use_id: id, is_error: isError }] } });
  say({ type: 'system', subtype: 'init', cwd: process.cwd(), args: process.argv.slice(2) });
  const task = /Your task: (.*)/.exec(input)[1]; // its own task only: the prompt also lists its colleagues'
  if (task.includes('SLOW')) return setTimeout(() => {}, 60000);
  if (task.includes('SHELL')) { use('t9', 'Bash', undefined); return setTimeout(() => {}, 60000); }
  if (task.includes('LOOKUP')) { use('w1', 'WebSearch', undefined); result('w1', false); say({ type: 'result', subtype: 'success', is_error: false, result: 'Found three.\\n\\nVERDICT: done' }); return; }
  if (task.includes('NOWEB')) { say({ type: 'result', subtype: 'success', is_error: false, result: 'The criteria are set, but I have no way to look anyone up.\\n\\n**VERDICT: blocked - no web access to find the prospects**' }); return; }
  if (task.includes('HALF')) { say({ type: 'result', subtype: 'success', is_error: false, result: 'Ranked what I had.\\n\\nVERDICT: partial - 4 of 10 rows filled; the rest need phone numbers' }); return; }
  if (task.includes('BROKEN')) { say({ type: 'result', subtype: 'error_during_execution', is_error: true, result: 'Credit balance is too low' }); return process.exit(1); }
  const name = /^(\\w+)/.exec(task)[1].toLowerCase() + '.html';
  fs.mkdirSync('site', { recursive: true });
  fs.writeFileSync(path.join('site', name), '<h1>made</h1>');
  use('t1', 'Write', path.join(process.cwd(), 'site', name));
  result('t1', false);
  use('t2', 'Write', path.join(process.cwd(), '..', 'outside.txt')); // refused, as Claude Code would
  result('t2', true);
  use('t3', 'Edit', 'site/' + name);
  result('t3', false);
  say({ type: 'result', subtype: 'success', is_error: false, result: '## Report\\n\\nBuilt the page in site/' + name + '.' });
});
`,
  );
  fs.chmodSync(file, 0o755);
  return file;
}

const plan = (tasks: Record<string, string>, project: unknown) => ({
  reply: 'On it.',
  actions: [{ type: 'create_mission', title: 'Relay landing page', project, assignments: Object.entries(tasks).map(([agentId, task]) => ({ agentId, task })) }],
});

function office(brainPlan: unknown, extra: Record<string, unknown> = {}) {
  const dataDir = temporaryDir();
  const projectsDir = temporaryDir();
  const server = createOfficeServer({
    dataDir,
    pollMs: 60_000,
    commandStepMs: 0,
    brain: async () => ({ plan: brainPlan, brain: 'claude-code' }),
    // Sign-offs are off unless a test asks for them: most of these are about the work itself.
    workers: { command: fakeWorker(), projectsDir, reportMs: 0, approvals: false, ...extra },
  });
  const command = (text: string) => server.app.request('/command', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text }) });
  const events = () => readLog(busPaths(dataDir)).events;
  /** Wait until the plan has been written and every worker it started has finished. */
  const settle = async () => {
    for (let i = 0; i < 200 && events().every((event) => event.type !== 'agent.state' || event.agentId !== 'exec.chief-of-staff' || event.state !== 'idle'); i++) await new Promise((r) => setTimeout(r, 10));
    await new Promise((r) => setTimeout(r, 30));
    await server.workers!.idle();
  };
  return { server, command, events, settle, projectsDir };
}
const line = (event: OfficeEvent) => `${event.type} ${event.agentId} ${event.state ?? ''} ${event.meta?.path ?? ''}`.trim();

test('a project name becomes a safe folder name', () => {
  assert.equal(projectSlug('Relay Landing Page!'), 'relay-landing-page');
  assert.equal(projectSlug('../../etc/passwd'), 'etc-passwd');
  assert.equal(projectSlug('C:\\\\Windows'), 'c-windows');
  assert.equal(projectSlug('台灣 咖啡'), '台灣-咖啡');
  assert.equal(projectSlug(' . '), '');
});

test('when agents do real work, a mission must name a project', () => {
  const snapshot = emptySnapshot();
  const tasks = { 'dev.frontend': 'Build the page' };
  const none = parsePlan(plan(tasks, undefined), snapshot, { projects: ['relay'] });
  assert.ok(none.ok && none.plan.actions.length === 0 && none.needsProject);
  const unknown = parsePlan(plan(tasks, { name: 'Atlas', new: false }), snapshot, { projects: ['relay'] });
  assert.ok(unknown.ok && unknown.plan.actions.length === 0 && unknown.needsProject);
  const existing = parsePlan(plan(tasks, { name: 'Relay', new: true }), snapshot, { projects: ['relay'] });
  assert.ok(existing.ok);
  assert.deepEqual(existing.ok && (existing.plan.actions[0] as { project?: unknown }).project, { slug: 'relay', name: 'Relay', isNew: false }, 'an existing folder is used, not made again');
  const fresh = parsePlan(plan(tasks, { name: 'Atlas Site', new: true }), snapshot, { projects: ['relay'] });
  assert.ok(fresh.ok);
  const work = planToEvents(fresh.ok ? fresh.plan : { reply: '', actions: [] }, snapshot);
  assert.equal(work.events[0].meta?.project, 'atlas-site');
  assert.deepEqual(work.jobs.map((job) => [job.agentId, job.missionId, job.task, job.project.slug]), [['dev.frontend', 'M-1', 'Build the page', 'atlas-site']]);
  // Without the rule (agents only plan), projects are neither needed nor used.
  const plain = parsePlan(plan(tasks, undefined), snapshot);
  assert.ok(plain.ok && plain.plan.actions.length === 1 && planToEvents(plain.plan, snapshot).jobs.length === 0);
});

test('workers do the tasks: files, outputs, reports, and the mission closes', async () => {
  const { server, command, events, settle, projectsDir } = office(plan({ 'dev.frontend': 'Hero section', 'design.lead': 'Direction for the page' }, { name: 'Relay', new: true }));
  try {
    const response = await command('Build a landing page for Relay, new project Relay');
    assert.equal(response.status, 200);
    await settle();
    server.poll();

    assert.ok(fs.existsSync(path.join(projectsDir, 'relay', 'site', 'hero.html')));
    assert.ok(fs.existsSync(path.join(projectsDir, 'relay', 'site', 'direction.html')));
    assert.ok(!fs.existsSync(path.join(projectsDir, 'outside.txt')));
    assert.match(fs.readFileSync(path.join(projectsDir, 'relay', 'reports', 'M-1-dev.frontend.md'), 'utf8'), /Built the page in site\/hero\.html/);

    const lines = events().map(line);
    assert.ok(lines.includes('agent.output dev.frontend  relay/site/hero.html'));
    assert.ok(lines.includes('agent.output design.lead  relay/site/direction.html'));
    assert.ok(lines.includes('agent.output dev.frontend  relay/reports/M-1-dev.frontend.md'));
    assert.ok(!lines.some((entry) => entry.includes('outside.txt')), 'a write that was refused is not reported');
    assert.equal(lines.filter((entry) => entry === 'agent.output dev.frontend  relay/site/hero.html').length, 2, 'the write and the later edit');
    assert.ok(lines.indexOf('agent.state dev.frontend reporting') < lines.lastIndexOf('agent.state dev.frontend idle'));
    assert.equal(lines.at(-2), 'mission.closed exec.project-coordinator');
    assert.equal(lines.at(-1), 'agent.state exec.project-coordinator idle');

    const snapshot = server.snapshot();
    assert.equal(snapshot.missions[0].status, 'done');
    assert.equal(snapshot.missions[0].project, 'relay');
    assert.equal(snapshot.agents['dev.frontend'].state, 'idle');
    assert.deepEqual(((await (await server.app.request("/projects")).json()) as { projects: string[] }).projects, ["relay"]);
  } finally {
    server.stop();
  }
});

test('a worker is given five file tools, its own folder, and its own brief', async () => {
  const { server, command, settle, projectsDir } = office(plan({ 'dev.qa': 'Check the page' }, { name: 'Relay', new: true }));
  try {
    await command('check it');
    await settle();
    const brief = fs.readFileSync(path.join(busPaths(path.dirname(server.paths.log)).dir, 'workers', 'M-1-dev.qa.md'), 'utf8');
    assert.match(brief, /How you work here/);
    assert.match(brief, /# QA Tester/, "the agent's own skill file is part of its brief");
    assert.ok(fs.existsSync(path.join(projectsDir, 'relay', 'site', 'check.html')), 'it ran in the project folder');
  } finally {
    server.stop();
  }
});

test('a worker that fails, runs out of time, or reaches for another tool is dealt with', async () => {
  const { server, command, events, settle } = office(plan({ 'dev.frontend': 'BROKEN build', 'dev.lead': 'SLOW plan', 'dev.integrations': 'SHELL trick', 'design.lead': 'Direction' }, { name: 'Relay', new: true }), { timeLimitMs: 300, concurrency: 4 });
  try {
    await command('go');
    await settle();
    server.poll();
    const snapshot = server.snapshot();
    assert.equal(snapshot.agents['dev.frontend'].state, 'blocked');
    assert.match(snapshot.agents['dev.frontend'].task ?? '', /Credit balance is too low/);
    assert.equal(snapshot.agents['dev.integrations'].state, 'blocked');
    assert.match(snapshot.agents['dev.integrations'].task ?? '', /tried to use "Bash"/);
    assert.ok(events().some((event) => event.agentId === 'dev.lead' && event.state === 'reporting' && /limit/.test(event.task ?? '')), 'the slow one stopped with a note');
    assert.equal(snapshot.agents['dev.lead'].state, 'idle');
    assert.equal(snapshot.agents['design.lead'].state, 'idle');
    assert.equal(snapshot.missions[0].status, 'active', 'not everyone finished, so the mission stays open');
    assert.deepEqual(server.workers!.list(), []);
  } finally {
    server.stop();
  }
});

test('Sophia asks which project when a plan names none, and closing a mission stops its workers', async () => {
  const asking = office(plan({ 'dev.frontend': 'Hero' }, undefined));
  try {
    const body = (await (await asking.command('Build a landing page')).json()) as { reply: string; summary: string[] };
    assert.match(body.reply, /Which project is this for/);
    assert.deepEqual(body.summary, []);
    await asking.settle();
    assert.ok(!asking.events().some((event) => event.type === 'mission.created'));
  } finally {
    asking.server.stop();
  }

  let call = 0;
  const dataDir = temporaryDir();
  const server = createOfficeServer({
    dataDir,
    pollMs: 60_000,
    commandStepMs: 0,
    brain: async (_request, _snapshot, context) => {
      call += 1;
      if (call === 2) assert.equal(context?.history?.[0].request, 'start');
      return { plan: call === 1 ? plan({ 'dev.lead': 'SLOW plan' }, { name: 'Relay', new: true }) : { reply: 'Closed.', actions: [{ type: 'close_mission', missionId: 'M-1' }] }, brain: 'claude-code' };
    },
    workers: { command: fakeWorker(), projectsDir: temporaryDir(), reportMs: 0, approvals: false },
  });
  const command = (text: string) => server.app.request('/command', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text }) });
  try {
    await command('start');
    for (let i = 0; i < 200 && server.workers!.list().length === 0; i++) await new Promise((r) => setTimeout(r, 10));
    assert.equal(server.workers!.list()[0]?.state, 'running');
    await command('close it');
    await server.workers!.idle();
    assert.deepEqual(server.workers!.list(), []);
    server.poll();
    assert.equal(server.snapshot().missions[0].status, 'done');
    assert.equal(server.snapshot().agents['dev.lead'].state, 'idle');
  } finally {
    server.stop();
  }
});

test('a mission runs in stages: the build waits for the copy, the check for the build', async () => {
  // Design and copy are stage 1 by default, the developer stage 2, QA stage 3.
  const { server, command, events, settle } = office(plan({ 'dev.qa': 'Check the page', 'dev.frontend': 'Hero section', 'content.social-copy': 'Copy for the page', 'design.lead': 'Direction' }, { name: 'Relay', new: true }), { concurrency: 4 });
  try {
    await command('go');
    // At first only stage 1 is shown at work; the others have not been started.
    for (let i = 0; i < 200 && !events().some((event) => event.type === 'mission.created'); i++) await new Promise((r) => setTimeout(r, 10));
    assert.deepEqual(
      events().find((event) => event.type === 'mission.created')?.meta?.assignments,
      [
        { agentId: 'dev.qa', task: 'Check the page', stage: 3 },
        { agentId: 'dev.frontend', task: 'Hero section', stage: 2 },
        { agentId: 'content.social-copy', task: 'Copy for the page', stage: 1 },
        { agentId: 'design.lead', task: 'Direction', stage: 1 },
      ],
    );
    await settle();
    server.poll();
    const order = events()
      .filter((event) => event.type === 'agent.state' && (event.state === 'working' || event.state === 'reporting') && event.agentId !== 'exec.chief-of-staff' && event.agentId !== 'exec.project-coordinator')
      .map((event) => `${event.agentId} ${event.state}`);
    const at = (entry: string) => order.lastIndexOf(entry);
    assert.ok(at('content.social-copy reporting') < order.indexOf('dev.frontend working'), 'the developer starts after the copy is done');
    assert.ok(at('design.lead reporting') < order.indexOf('dev.frontend working'));
    assert.ok(at('dev.frontend reporting') < order.indexOf('dev.qa working'), 'QA starts after the build is done');
    assert.equal(server.snapshot().missions[0].status, 'done');
    assert.deepEqual(server.snapshot().missions[0].assignments?.map((entry) => entry.stage).sort(), [1, 1, 2, 3]);
  } finally {
    server.stop();
  }
});

test('an explicit stage wins over the default: QA first, then the fix', () => {
  const checked = parsePlan(
    { reply: 'ok', actions: [{ type: 'create_mission', title: 'Review and fix', project: { name: 'relay', new: false }, assignments: [{ agentId: 'dev.qa', task: 'Review', stage: 1 }, { agentId: 'dev.frontend', task: 'Fix', stage: 2 }, { agentId: 'design.lead', task: 'Advise', stage: 99 }] }] },
    emptySnapshot(),
    { projects: ['relay'] },
  );
  assert.ok(checked.ok);
  const work = planToEvents(checked.ok ? checked.plan : { reply: '', actions: [] }, emptySnapshot());
  assert.deepEqual(work.jobs.map((job) => [job.agentId, job.stage]), [['dev.qa', 1], ['dev.frontend', 2], ['design.lead', 1]]);
  // Only stage 1 is put to work by the plan itself; the worker for stage 2 says so when it starts.
  assert.deepEqual(work.events.filter((event) => event.type === 'agent.state' && event.agentId !== 'exec.project-coordinator').map((event) => event.agentId), ['dev.qa', 'design.lead']);
});

test('nothing starts, moves to its next stage, or closes without sign-off', async () => {
  const tasks = { 'content.social-copy': 'Copy for the page', 'dev.frontend': 'Hero section' };
  const flagged = { reply: 'On it.', actions: [{ type: 'create_mission', title: 'Relay landing page', project: { name: 'Relay', new: true }, assignments: [{ agentId: 'content.social-copy', task: tasks['content.social-copy'] }, { agentId: 'dev.frontend', task: tasks['dev.frontend'], risk: 'Replaces the current home page' }] }] };
  const { server, command, events } = office(flagged, { approvals: true });
  const waitingFor = async (id: string) => {
    for (let i = 0; i < 300; i++) {
      server.poll();
      if (server.snapshot().approvals.some((approval) => approval.id === id)) return server.snapshot().approvals.find((approval) => approval.id === id)!;
      await new Promise((r) => setTimeout(r, 10));
    }
    throw new Error(`nothing asked for ${id}`);
  };
  const decide = (id: string, body: unknown, headers: Record<string, string> = {}) => server.app.request(`/approvals/${id}`, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
  const worked = () => events().filter((event) => event.type === 'agent.state' && event.state === 'reporting').map((event) => event.agentId);
  try {
    await command('go');
    // 1. Before the first worker starts. The request shows the whole plan, with the Chief of Staff's flag.
    const start = await waitingFor('M-1-start');
    assert.equal(start.kind, 'start');
    assert.deepEqual(start.items, [{ agentId: 'content.social-copy', task: 'Copy for the page', stage: 1 }, { agentId: 'dev.frontend', task: 'Hero section', stage: 2, risk: 'Replaces the current home page' }]);
    await new Promise((r) => setTimeout(r, 120));
    assert.deepEqual(server.workers!.list().filter((worker) => worker.state !== 'waiting'), [], 'no time limit: nothing runs while the request waits');
    assert.equal(server.snapshot().agents['content.social-copy'].state, 'blocked');
    assert.equal(server.snapshot().agents['content.social-copy'].task, "Waiting for Stephen's sign-off");

    // Only this machine's pages may answer, and only with a real decision.
    assert.equal((await decide('M-1-start', { decision: 'approved' }, { origin: 'https://evil.example' })).status, 403);
    assert.equal((await decide('M-1-start', { decision: 'maybe' })).status, 400);
    assert.equal((await decide('M-9-start', { decision: 'approved' })).status, 404);
    assert.equal(worked().length, 0);
    assert.equal((await decide('M-1-start', { decision: 'approved', note: 'Go ahead' })).status, 200);
    assert.equal((await decide('M-1-start', { decision: 'approved' })).status, 404, 'a request is answered once');

    // 2. Before the next stage, which builds on files already in the project.
    const stage = await waitingFor('M-1-stage-2');
    assert.deepEqual(worked(), ['content.social-copy']);
    assert.equal(stage.stage, 2);
    assert.equal(stage.stages, 2);
    assert.ok((stage.files ?? 0) >= 1, 'it says how much is in the folder already');
    assert.deepEqual(stage.items.map((item) => item.agentId), ['dev.frontend']);
    assert.equal((await decide('M-1-stage-2', { decision: 'approved' })).status, 200);

    // 3. Before the mission is closed.
    const close = await waitingFor('M-1-close');
    assert.deepEqual(worked(), ['content.social-copy', 'dev.frontend']);
    assert.equal(server.snapshot().missions[0].status, 'active');
    assert.equal(server.snapshot().agents['exec.project-coordinator'].state, 'blocked');
    assert.equal(close.kind, 'close');
    assert.equal((await decide('M-1-close', { decision: 'approved' })).status, 200);
    await server.workers!.idle();
    server.poll();
    assert.equal(server.snapshot().missions[0].status, 'done');
    assert.deepEqual(server.snapshot().approvals, []);
    assert.equal(server.snapshot().usage.runs, 0, 'the totals quoted on a request are not counted as spending');
    assert.equal(server.snapshot().agents['exec.project-coordinator'].state, 'idle');
    // Every decision is in the log, signed by Stephen, in order.
    assert.deepEqual(
      events().filter((event) => event.type === 'approval.decided').map((event) => [event.agentId, event.meta?.approvalId, event.meta?.decision, event.task]),
      [['exec.ceo', 'M-1-start', 'approved', 'Go ahead'], ['exec.ceo', 'M-1-stage-2', 'approved', undefined], ['exec.ceo', 'M-1-close', 'approved', undefined]],
    );
  } finally {
    server.stop();
  }
});

test('declining stops the work: a mission never started is closed, one part-way through stays open', async () => {
  const tasks = { 'content.social-copy': 'Copy for the page', 'dev.frontend': 'Hero section' };
  const decline = async (id: string, server: ReturnType<typeof office>['server']) => {
    for (let i = 0; i < 300 && !server.snapshot().approvals.some((approval) => approval.id === id); i++) {
      server.poll();
      await new Promise((r) => setTimeout(r, 10));
    }
    return server.app.request(`/approvals/${id}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision: 'declined', note: 'Not now' }) });
  };

  const never = office(plan(tasks, { name: 'Relay', new: true }), { approvals: true });
  try {
    await never.command('go');
    assert.equal((await decline('M-1-start', never.server)).status, 200);
    await never.server.workers!.idle();
    never.server.poll();
    assert.equal(never.server.snapshot().missions[0].status, 'done');
    assert.ok(!never.events().some((event) => event.type === 'agent.output'), 'nobody did anything');
    assert.equal(never.server.snapshot().agents['content.social-copy'].state, 'idle');
  } finally {
    never.server.stop();
  }

  const partly = office(plan(tasks, { name: 'Relay', new: true }), { approvals: true });
  try {
    await partly.command('go');
    for (let i = 0; i < 300 && !partly.server.snapshot().approvals.some((approval) => approval.id === 'M-1-start'); i++) {
      partly.server.poll();
      await new Promise((r) => setTimeout(r, 10));
    }
    await partly.server.app.request('/approvals/M-1-start', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision: 'approved' }) });
    assert.equal((await decline('M-1-stage-2', partly.server)).status, 200);
    await partly.server.workers!.idle();
    partly.server.poll();
    assert.equal(partly.server.snapshot().missions[0].status, 'active', 'left open for Stephen to redirect');
    assert.equal(partly.server.snapshot().agents['dev.frontend'].state, 'idle');
    assert.deepEqual(partly.server.snapshot().approvals, [], 'and nothing asks to close it');
    assert.ok(!partly.events().some((event) => event.type === 'agent.state' && event.agentId === 'dev.frontend' && event.state === 'reporting'));
  } finally {
    partly.server.stop();
  }
});

test('a request left unanswered when the server stops is marked lapsed when it starts again', async () => {
  const first = office(plan({ 'dev.frontend': 'Hero section' }, { name: 'Relay', new: true }), { approvals: true });
  const dataDir = path.dirname(first.server.paths.log);
  try {
    await first.command('go');
    for (let i = 0; i < 300 && first.server.snapshot().approvals.length === 0; i++) {
      first.server.poll();
      await new Promise((r) => setTimeout(r, 10));
    }
    assert.equal(first.server.snapshot().approvals.length, 1);
  } finally {
    first.server.stop();
  }
  const again = createOfficeServer({ dataDir, pollMs: 60_000, workers: { command: fakeWorker(), projectsDir: temporaryDir(), reportMs: 0 } });
  try {
    again.poll();
    assert.deepEqual(again.snapshot().approvals, []);
    assert.equal(again.snapshot().agents['dev.frontend'].state, 'idle');
    const lapsed = readLog(busPaths(dataDir)).events.filter((event) => event.type === 'approval.decided');
    assert.deepEqual(lapsed.map((event) => event.meta?.decision), ['lapsed']);
  } finally {
    again.stop();
  }
});

test('the work can be looked at: files inside the projects folder only, sandboxed', async () => {
  const { server, command, settle, projectsDir } = office(plan({ 'dev.frontend': 'Hero section' }, { name: 'Relay', new: true }));
  try {
    await command('go');
    await settle();
    const page = await server.app.request('/files/relay/site/hero.html');
    assert.equal(page.status, 200);
    assert.match(page.headers.get('content-type') ?? '', /text\/html/);
    assert.equal(page.headers.get('content-security-policy'), 'sandbox allow-scripts', 'a built page cannot act as this server');
    assert.equal(await page.text(), '<h1>made</h1>');
    const report = await server.app.request('/files/relay/reports/M-1-dev.frontend.md');
    assert.match(report.headers.get('content-type') ?? '', /text\/plain/);
    // Nothing outside the projects folder, however it is asked for.
    fs.writeFileSync(path.join(projectsDir, '..', 'secret.txt'), 'no');
    for (const attempt of ['/files/../secret.txt', '/files/relay/../../secret.txt', '/files/%2e%2e/secret.txt', '/files/relay/%2e%2e%2f%2e%2e%2fsecret.txt', '/files//etc/passwd', '/files/relay']) {
      assert.equal((await server.app.request(attempt)).status, 404, attempt);
    }
    fs.symlinkSync('/etc/hostname', path.join(projectsDir, 'relay', 'link.txt'));
    assert.equal((await server.app.request('/files/relay/link.txt')).status, 404, 'a link out of the folder is not followed');
  } finally {
    server.stop();
  }
});

test('files sent with a request go into the mission\'s project, for its agents to read', async () => {
  const { server, command, events, settle, projectsDir } = office(plan({ 'dev.frontend': 'Hero section' }, { name: 'Relay', new: true }));
  const send = (batch: string, name: string, body: string, headers: Record<string, string> = {}) =>
    server.app.request(`/attachments/${batch}?path=${encodeURIComponent(name)}`, { method: 'POST', headers: { 'content-type': 'application/octet-stream', ...headers }, body });
  try {
    assert.equal((await send('batch00001', 'brief.md', '# Brief')).status, 200);
    assert.equal((await send('batch00001', 'brand/logo.svg', '<svg/>')).status, 200);
    // A name that tries to climb out is flattened into the batch, not followed.
    assert.deepEqual(await (await send('batch00001', '../../outside.txt', 'x')).json(), { ok: true, path: 'outside.txt', bytes: 1 });
    assert.equal((await send('batch00001', 'a.txt', 'x', { origin: 'https://evil.example' })).status, 403);
    assert.equal((await send('batch00001', 'a.txt', 'x', { 'content-type': 'text/plain' })).status, 415);
    assert.equal((await send('../etc', 'a.txt', 'x')).status, 404);
    assert.equal((await send('BAD', 'a.txt', 'x')).status, 400);

    const reply = await server.app.request('/command', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: 'Build it from the brief', attachments: 'batch00001' }) });
    assert.equal(reply.status, 200);
    void command;
    await settle();
    const folder = path.join(projectsDir, 'relay', 'attachments');
    assert.equal(fs.readFileSync(path.join(folder, 'brief.md'), 'utf8'), '# Brief');
    assert.ok(fs.existsSync(path.join(folder, 'brand', 'logo.svg')));
    assert.ok(fs.existsSync(path.join(folder, 'outside.txt')) && !fs.existsSync(path.join(projectsDir, '..', 'outside.txt')));
    const attachedPaths = events().filter((event) => event.type === 'agent.output' && event.task === 'Attached').map((event) => event.meta?.path).sort();
    assert.deepEqual(attachedPaths, ['relay/attachments/brand/logo.svg', 'relay/attachments/brief.md', 'relay/attachments/outside.txt']);
    server.poll();
    assert.equal(server.snapshot().missions[0].status, 'done');
  } finally {
    server.stop();
  }
});

test('an agent says how its own task came out, and anything not done reaches Stephen', async () => {
  assert.deepEqual(readVerdict('All good.\n\nVERDICT: done'), { verdict: 'done', reason: '' });
  assert.deepEqual(readVerdict('x\n**VERDICT: Blocked** — no web access'), { verdict: 'blocked', reason: 'no web access' });
  assert.deepEqual(readVerdict('- VERDICT: partial: half the rows'), { verdict: 'partial', reason: 'half the rows' });
  assert.deepEqual(readVerdict('No verdict line at all'), { verdict: 'done', reason: '' }, 'a report without one is taken as it always was');

  const { server, command, events } = office(plan({ 'research.scout': 'NOWEB find prospects', 'research.analyst': 'HALF rank them', 'content.social-copy': 'Copy for the page' }, { name: 'Leads', new: true }), { approvals: true, concurrency: 3, webAgents: [] });
  const decide = (id: string, decision: string) => server.app.request(`/approvals/${id}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision }) });
  const waitingFor = async (id: string) => {
    for (let i = 0; i < 300; i++) {
      server.poll();
      const found = server.snapshot().approvals.find((approval) => approval.id === id);
      if (found) return found;
      await new Promise((r) => setTimeout(r, 10));
    }
    throw new Error(`nothing asked for ${id}`);
  };
  try {
    await command('go');
    await waitingFor('M-1-start');
    await decide('M-1-start', 'approved');
    const close = await waitingFor('M-1-close');
    // The request to close says the mission was not completed, and what went wrong with each task.
    assert.match(close.title, /was not completed/);
    assert.equal(close.problems, 2);
    assert.deepEqual(close.items.map((item) => [item.agentId, item.risk]).sort(), [
      ['research.analyst', 'partial: 4 of 10 rows filled; the rest need phone numbers'],
      ['research.scout', 'blocked: no web access to find the prospects'],
    ]);
    const snapshot = server.snapshot();
    assert.equal(snapshot.agents['research.scout'].state, 'blocked', 'the one who could not do it stays blocked, saying why');
    assert.match(snapshot.agents['research.scout'].task ?? '', /^Blocked: no web access/);
    assert.deepEqual(snapshot.missions[0].problems?.map((problem) => [problem.agentId, problem.verdict]).sort(), [['research.analyst', 'partial'], ['research.scout', 'blocked']]);
    const verdicts = events().filter((event) => event.type === 'agent.state' && event.meta?.verdict).map((event) => [event.agentId, event.state, event.meta?.verdict]).sort();
    assert.deepEqual(verdicts, [['content.social-copy', 'reporting', 'done'], ['research.analyst', 'reporting', 'partial'], ['research.scout', 'blocked', 'blocked']]);
    assert.equal(snapshot.missions[0].status, 'active', 'and it is not closed behind his back');
  } finally {
    server.stop();
  }
});

test('Research and Sales may use the web; everyone else is stopped if they try', async () => {
  const allowed = office(plan({ 'research.scout': 'LOOKUP prospects' }, { name: 'Leads', new: true }));
  try {
    await allowed.command('go');
    await allowed.settle();
    allowed.server.poll();
    const brief = fs.readFileSync(path.join(busPaths(path.dirname(allowed.server.paths.log)).dir, 'workers', 'M-1-research.scout.md'), 'utf8');
    assert.match(brief, /# Using the web/);
    assert.equal(allowed.server.snapshot().missions[0].status, 'done');
    assert.ok(!allowed.events().some((event) => event.state === 'blocked'));
  } finally {
    allowed.server.stop();
  }
  const refused = office(plan({ 'dev.frontend': 'LOOKUP a library' }, { name: 'Leads', new: true }));
  try {
    await refused.command('go');
    await refused.settle();
    refused.server.poll();
    assert.match(refused.server.snapshot().agents['dev.frontend'].task ?? '', /tried to use "WebSearch"/);
    const brief = fs.readFileSync(path.join(busPaths(path.dirname(refused.server.paths.log)).dir, 'workers', 'M-1-dev.frontend.md'), 'utf8');
    assert.doesNotMatch(brief, /# Using the web/);
    // With sign-offs off there is no card to say it on, so the Coordinator is left blocked on the mission.
    assert.equal(refused.server.snapshot().agents['exec.project-coordinator'].state, 'blocked');
    assert.equal(refused.server.snapshot().missions[0].status, 'active');
  } finally {
    refused.server.stop();
  }
});
