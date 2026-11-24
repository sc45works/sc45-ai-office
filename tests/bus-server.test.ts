import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import type { OfficeEvent, OfficeSnapshot } from '@sc45/shared';
import { appendEvent, busPaths, followLog, loadSnapshot, readLog } from '@sc45/bus';
import { createOfficeServer } from '@sc45/server';

const temporaryDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'sc45-bus-'));
const working = (agentId: string, task: string, ts = new Date().toISOString()): OfficeEvent => ({ ts, type: 'agent.state', agentId, state: 'working', task });

test('append then read gives the same events back', () => {
  const paths = busPaths(temporaryDir());
  assert.deepEqual(readLog(paths), { events: [], bytes: 0, skipped: 0 }, 'a missing log is an empty one');
  const first = appendEvent(working('dev.frontend', 'Building hero section'), paths);
  const second = appendEvent(working('dev.qa', 'Testing: 手機版'), paths);
  const result = readLog(paths);
  assert.deepEqual(result.events, [first, second]);
  assert.equal(result.bytes, fs.statSync(paths.log).size);
});

test('a malformed event never reaches the file', () => {
  const paths = busPaths(temporaryDir());
  assert.throws(() => appendEvent({ ts: 'x', type: 'agent.state', agentId: 'dev.qa', state: 'working' } as OfficeEvent, paths), /Not a valid event/);
  assert.equal(fs.existsSync(paths.log), false);
});

test('unreadable lines are skipped and counted, not fatal', () => {
  const paths = busPaths(temporaryDir());
  appendEvent(working('dev.qa', 'One'), paths);
  fs.appendFileSync(paths.log, 'this is not json\n{"type":"agent.state"}\n\n');
  appendEvent(working('dev.qa', 'Two'), paths);
  const result = readLog(paths);
  assert.deepEqual(result.events.map((event) => event.task), ['One', 'Two']);
  assert.equal(result.skipped, 2);
});

test('a follower sees only new events, and waits for a half-written line', () => {
  const paths = busPaths(temporaryDir());
  appendEvent(working('dev.qa', 'Before'), paths);
  const seen: string[] = [];
  const follower = followLog(paths, (events) => seen.push(...events.map((event) => event.task ?? '')), { from: readLog(paths).bytes, intervalMs: 60_000 });
  try {
    follower.poll();
    assert.deepEqual(seen, []);

    appendEvent(working('dev.qa', 'After'), paths);
    const line = JSON.stringify(working('dev.qa', 'Split in two'));
    fs.appendFileSync(paths.log, line.slice(0, 30)); // a writer caught mid-line
    follower.poll();
    assert.deepEqual(seen, ['After']);

    fs.appendFileSync(paths.log, `${line.slice(30)}\n`);
    follower.poll();
    assert.deepEqual(seen, ['After', 'Split in two']);
  } finally {
    follower.stop();
  }
});

test('the server replays the log, serves the state and follows new events', async () => {
  const dataDir = temporaryDir();
  const paths = busPaths(dataDir);
  appendEvent({ ts: new Date().toISOString(), type: 'mission.created', agentId: 'exec.chief-of-staff', missionId: 'M-1', task: 'Homepage refresh' }, paths);
  appendEvent(working('dev.frontend', 'Building hero section'), paths);

  const server = createOfficeServer({ dataDir, pollMs: 60_000 });
  try {
    assert.equal(server.replayed.events, 2);
    let state = (await (await server.app.request('/state')).json()) as OfficeSnapshot & { activeMissions: number; roster: unknown[] };
    assert.equal(state.seq, 2);
    assert.equal(state.activeMissions, 1);
    assert.equal(state.agents['dev.frontend'].task, 'Building hero section');
    assert.equal(state.roster.length, 18);

    appendEvent({ ts: new Date().toISOString(), type: 'agent.state', agentId: 'dev.frontend', state: 'reporting', task: 'Hero is live' }, paths);
    server.poll();
    state = (await (await server.app.request('/state')).json()) as typeof state;
    assert.equal(state.agents['dev.frontend'].state, 'reporting');

    const health = (await (await server.app.request('/health')).json()) as { ok: boolean; seq: number };
    assert.deepEqual([health.ok, health.seq], [true, 3]);
    appendEvent({ ts: new Date().toISOString(), type: 'agent.output', agentId: 'dev.frontend', task: 'Hero component', meta: { path: 'site/src/Hero.tsx' } }, paths);
    server.poll();
    const graph = (await (await server.app.request('/agents/dev.frontend/graph')).json()) as { nodes: Array<{ kind: string; label: string }> };
    assert.deepEqual(graph.nodes.map((node) => `${node.kind}:${node.label}`), ['agent:Leo', 'task:Building hero section', 'task:Hero is live', 'folder:site/src', 'file:Hero.tsx']);
    assert.equal((await server.app.request('/agents/nobody/graph')).status, 404);
  } finally {
    server.stop();
  }
});

test('the event stream opens with a snapshot, then sends each new event', { timeout: 10_000 }, async () => {
  const dataDir = temporaryDir();
  const paths = busPaths(dataDir);
  appendEvent(working('dev.qa', 'Earlier'), paths);
  const server = createOfficeServer({ dataDir, pollMs: 60_000, keepAliveMs: 50 });
  const response = await server.app.request('/events');
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let text = '';
  const readUntil = async (marker: string) => {
    while (!text.includes(marker)) {
      const { value, done } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
  };
  try {
    assert.match(response.headers.get('content-type') ?? '', /text\/event-stream/);
    await readUntil('\n\n');
    assert.match(text, /event: snapshot/);
    assert.match(text, /"task":"Earlier"/);

    // Written the instant the snapshot has been read: it must not fall between snapshot and stream.
    appendEvent(working('dev.qa', 'Live one'), paths);
    server.poll();
    await readUntil('Live one');
    const live = text.slice(text.indexOf('event: event'));
    assert.match(live, /"task":"Live one"/);
    assert.match(live, /id: 2/);
    assert.equal(server.clients(), 1);
  } finally {
    await reader.cancel();
    server.stop();
  }
});

test('a new day archives the log and keeps the state', () => {
  const dataDir = temporaryDir();
  const paths = busPaths(dataDir);
  let clock = new Date(2026, 10, 14, 23, 59, 0);
  appendEvent(working('dev.frontend', 'Late night build', clock.toISOString()), paths);

  const server = createOfficeServer({ dataDir, pollMs: 60_000, now: () => clock });
  try {
    assert.equal(fs.existsSync(paths.log), true, 'same day: nothing rotates');
    clock = new Date(2026, 10, 15, 0, 0, 30);
    server.poll();
    assert.equal(fs.existsSync(paths.log), false, 'the finished day has left the live log');
    assert.equal(fs.existsSync(path.join(paths.archiveDir, 'events-2026-11-14.jsonl')), true);
    assert.equal(loadSnapshot(paths)?.agents['dev.frontend'].task, 'Late night build');

    appendEvent(working('dev.qa', 'First thing', clock.toISOString()), paths);
    server.poll();
    assert.equal(server.snapshot().agents['dev.qa'].task, 'First thing');
    assert.equal(server.snapshot().agents['dev.frontend'].task, 'Late night build', 'yesterday is remembered');
  } finally {
    server.stop();
  }

  // A restart rebuilds the same state from the saved snapshot plus the new day's log.
  const restarted = createOfficeServer({ dataDir, pollMs: 60_000, now: () => clock });
  try {
    assert.equal(restarted.snapshot().agents['dev.frontend'].task, 'Late night build');
    assert.equal(restarted.snapshot().agents['dev.qa'].task, 'First thing');
    assert.equal(restarted.snapshot().seq, 2);
  } finally {
    restarted.stop();
  }
});
