/**
 * demo: play the scripted working session into the real event log.
 *
 *   pnpm demo              loop for ever (Ctrl+C to stop)
 *   pnpm demo --once       play it through once
 *   pnpm demo --speed 2    twice as fast
 *
 * With the server and the office running, this shows the whole pipeline working:
 * script -> events.jsonl -> server -> office.
 */
import { parseArgs } from 'node:util';
import { DEMO_LOOP_SECONDS, DEMO_SCRIPT, resolveDemoEvent } from '@sc45/shared';
import { appendEvent, busPaths } from '@sc45/bus';

const { values } = parseArgs({ options: { once: { type: 'boolean' }, speed: { type: 'string' } } });
const speed = Math.max(0.1, Number(values.speed ?? 1) || 1);
const paths = busPaths();
const steps = [...DEMO_SCRIPT].sort((a, b) => a.at - b.at);
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

console.log(`Playing the demo session into ${paths.log}${values.once ? '' : ' (Ctrl+C to stop)'}`);

for (let loop = 0; ; loop++) {
  const startedAt = Date.now();
  for (const step of steps) {
    const due = startedAt + (step.at * 1000) / speed;
    if (due > Date.now()) await sleep(due - Date.now());
    const event = appendEvent(resolveDemoEvent(step, loop), paths);
    console.log(`${String(step.at).padStart(5)}s  ${event.type.padEnd(15)} ${event.agentId.padEnd(26)} ${event.state ?? event.missionId ?? ''}${event.task ? `  "${event.task}"` : ''}`);
  }
  if (values.once) break;
  await sleep(Math.max(0, startedAt + (DEMO_LOOP_SECONDS * 1000) / speed - Date.now()));
}
