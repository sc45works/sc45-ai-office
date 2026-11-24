/**
 * Start the local server: `pnpm start` (or `pnpm dev` to run it alongside the office).
 *
 * Settings, all optional, as environment variables:
 *   SC45_PORT      port to listen on (default 4545)
 *   SC45_DATA_DIR  folder holding events.jsonl (default <repo>/data)
 *   SC45_QUIET     set to 1 to stop printing each event
 *   SC45_BRAIN     who plans commands: auto (default), claude-code or built-in
 *   SC45_BRAIN_MODEL  the model Claude Code uses for planning (default haiku)
 *   SC45_WORKERS      set to off to stop agents doing real work (they do it by default when Claude Code plans)
 *   SC45_PROJECTS_DIR folder holding the project folders agents work in (default <repo>/projects)
 *   SC45_WORKER_MODEL the model the agents work with (default sonnet)
 *   SC45_WORKER_MINUTES  how long one agent may work on one task (default 10)
 *   SC45_WORKERS_MAX  how many agents may work at once (default 2)
 */
import { serve } from '@hono/node-server';
import { findAgent, type OfficeEvent } from '@sc45/shared';
import { createOfficeServer } from './app.ts';
import { brainFromEnvironment } from './brain.ts';

const port = Number(process.env.SC45_PORT ?? 4545);
const quiet = process.env.SC45_QUIET === '1';

function describe(event: OfficeEvent): string {
  const time = new Date(event.ts).toLocaleTimeString('en-GB');
  const who = findAgent(event.agentId)?.name ?? event.agentId;
  if (event.type === 'agent.state') return `${time}  ${who.padEnd(8)} ${event.state}${event.task ? `  "${event.task}"` : ''}${event.deskId ? `  at ${event.deskId}` : ''}`;
  if (event.type === 'agent.moved') return `${time}  ${who.padEnd(8)} moved to ${event.deskId}`;
  if (event.type === 'agent.output') return `${time}  ${who.padEnd(8)} output  ${event.meta?.path ?? ''}`;
  return `${time}  ${event.type.padEnd(16)} ${event.missionId ?? ''}${event.task ? `  "${event.task}"` : ''}`;
}

// Agents do real work unless that is switched off, or the built-in planner (which knows nothing of projects) was asked for.
const brainChoice = (process.env.SC45_BRAIN ?? 'auto').toLowerCase();
const realWork = (process.env.SC45_WORKERS ?? 'on').toLowerCase() !== 'off' && !['built-in', 'builtin', 'mock'].includes(brainChoice);

const office = createOfficeServer({
  brain: brainFromEnvironment(),
  onEvent: quiet ? undefined : (event) => console.log(describe(event)),
  ...(realWork ? { workers: {} } : {}),
});

// 127.0.0.1 only: the server is for this machine, not the network.
const server = serve({ fetch: office.app.fetch, port, hostname: '127.0.0.1' }, (info) => {
  console.log(`SC45 command center server: http://127.0.0.1:${info.port}`);
  console.log(`  log      ${office.paths.log}`);
  console.log(`  replayed ${office.replayed.events} event(s) from the log${office.replayed.skipped ? `, ${office.replayed.skipped} unreadable line(s) ignored` : ''}`);
  console.log(office.projects ? `  projects ${office.projects.dir}  (agents work here, with Claude Code)` : '  agents   plan only: real work is switched off');
  console.log('  waiting for events (pnpm emit ..., or pnpm demo)');
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Is the server already running? Set SC45_PORT to use another port.`);
  } else {
    console.error(error.message);
  }
  process.exit(1);
});

function shutdown() {
  office.stop();
  server.close();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
