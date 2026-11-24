import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { AGENTS, applyEvent, defaultAppearance, describeOffice, displayName, emptySnapshot, parseAppearance, parseEvent, parseProfileChange } from '@sc45/shared';
import { busPaths, readLog } from '@sc45/bus';
import { createOfficeServer } from '@sc45/server';

const ts = '2026-11-14T06:00:00.000Z';
const temporaryDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'sc45-profile-'));

test('everyone has a valid starting look, and it never changes by itself', () => {
  for (const agent of AGENTS) {
    const look = defaultAppearance(agent.id);
    assert.deepEqual(parseAppearance(look), look, agent.id);
    assert.deepEqual(defaultAppearance(agent.id), look);
  }
  assert.ok(new Set(AGENTS.map((agent) => JSON.stringify(defaultAppearance(agent.id)))).size > AGENTS.length / 2, 'the starting looks differ from one another');
});

test('a change is checked: whole appearances and sensible names only', () => {
  const look = defaultAppearance('dev.qa');
  const named = parseProfileChange({ name: '  Tessa   Lee ' });
  assert.ok(named.ok && named.change.name === 'Tessa Lee');
  assert.equal(parseProfileChange({ name: '' }).ok, false);
  assert.equal(parseProfileChange({ name: 'x'.repeat(40) }).ok, false);
  assert.equal(parseProfileChange({}).ok, false);
  assert.equal(parseProfileChange({ appearance: { ...look, hair: 'mohawk' } }).ok, false);
  assert.equal(parseProfileChange({ appearance: { ...look, top: 'red' } }).ok, false);
  assert.equal(parseProfileChange({ appearance: { build: 'feminine' } }).ok, false, 'a partial appearance is refused');
  const dressed = parseProfileChange({ appearance: { ...look, top: '#FF2E88', glasses: true } });
  assert.ok(dressed.ok && dressed.change.appearance?.top === '#ff2e88' && dressed.change.appearance.glasses === true);
});

test('an agent.profile event renames and re-dresses, and Sophia uses the new name', () => {
  const snapshot = emptySnapshot();
  const look = { ...defaultAppearance('dev.qa'), hair: 'bun' as const };
  assert.equal(parseEvent({ ts, type: 'agent.profile', agentId: 'dev.qa', meta: { name: 'Tessa' } }).ok, true);
  assert.equal(parseEvent({ ts, type: 'agent.profile', agentId: 'dev.qa' }).ok, false);
  assert.equal(parseEvent({ ts, type: 'agent.profile', agentId: 'dev.qa', meta: { appearance: { hair: 'bun' } } }).ok, false);

  applyEvent(snapshot, { ts, type: 'agent.profile', agentId: 'dev.qa', meta: { name: 'Tessa' } });
  applyEvent(snapshot, { ts, type: 'agent.profile', agentId: 'dev.qa', meta: { appearance: look } });
  assert.deepEqual(snapshot.profiles['dev.qa'], { name: 'Tessa', appearance: look }, 'a later change keeps what it does not mention');
  assert.equal(displayName(snapshot, 'dev.qa'), 'Tessa');
  assert.equal(displayName(snapshot, 'dev.lead'), 'Ada');
  assert.match(describeOffice(snapshot), /dev\.qa · Tessa · QA Tester/);
  // The human can be changed too, though no other event moves him.
  applyEvent(snapshot, { ts, type: 'agent.profile', agentId: 'exec.ceo', meta: { name: 'Stephen Lee' } });
  assert.equal(displayName(snapshot, 'exec.ceo'), 'Stephen Lee');
});

test('POST /agents/:id/profile writes the event, and refuses what it should', async () => {
  const dataDir = temporaryDir();
  const server = createOfficeServer({ dataDir, pollMs: 60_000 });
  const post = (id: string, body: unknown, headers: Record<string, string> = { 'content-type': 'application/json' }) =>
    server.app.request(`/agents/${id}/profile`, { method: 'POST', headers, body: JSON.stringify(body) });
  try {
    const look = defaultAppearance('design.lead');
    const ok = await post('design.lead', { name: 'Mikaela', appearance: { ...look, beard: false } });
    assert.equal(ok.status, 200);
    server.poll();
    assert.equal(server.snapshot().profiles['design.lead']?.name, 'Mikaela');
    const written = readLog(busPaths(dataDir)).events.at(-1);
    assert.equal(written?.type, 'agent.profile');
    assert.equal(written?.agentId, 'design.lead');

    assert.equal((await post('design.nobody', { name: 'X' })).status, 404);
    assert.equal((await post('design.lead', { name: '' })).status, 400);
    assert.equal((await post('design.lead', { appearance: { ...look, skin: 'blue' } })).status, 400);
    assert.equal((await post('design.lead', { name: 'X' }, { 'content-type': 'text/plain' })).status, 415);
    assert.equal((await post('design.lead', { name: 'X' }, { 'content-type': 'application/json', origin: 'https://example.com' })).status, 403);
    assert.equal(readLog(busPaths(dataDir)).events.length, 1, 'nothing refused was written');
  } finally {
    server.stop();
  }
});
