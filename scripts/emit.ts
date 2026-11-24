/**
 * emit: append one event to the office's log.
 *
 *   pnpm emit working dev.frontend "Building hero section"
 *
 * This is the only way anything gets into the office. It writes one line to
 * data/events.jsonl and exits; it works whether or not the server is running.
 */
import { parseArgs } from 'node:util';
import { AGENT_STATES, EMITTING_AGENTS, MISSION_STATUSES, findAgent, type AgentState, type MissionStatus, type OfficeEvent } from '@sc45/shared';
import { appendEvent, busPaths } from '@sc45/bus';

const USAGE = `emit: append one event to the office's log (data/events.jsonl)

  An agent changes state
    emit <state> <agentId> [task] [--at <place>] [--mission <id>]
      state   ${AGENT_STATES.join(' | ')}
      place   another desk id, a spot id (meeting.seat-2) or a zone (meeting, lounge)

    emit working dev.frontend "Building hero section" --mission M-12
    emit collaborating design.lead "Launch sync" --at meeting
    emit blocked dev.qa "Staging URL returns 404"
    emit reporting dev.frontend "Hero section is live"
    emit idle dev.frontend

  An agent moves without changing state
    emit moved <agentId> <place>

  An agent produced a file
    emit output <agentId> <path> [description] [--mission <id>]

    emit output dev.frontend site/src/Hero.tsx "Hero component"

  A mission opens, changes or closes
    emit mission created <missionId> <title> [--status queued|active] [--by <agentId>]
    emit mission updated <missionId> [title] [--status ${MISSION_STATUSES.join('|')}]
    emit mission closed  <missionId>

  Other
    emit agents     list every agent id
    emit --help
`;

function fail(message: string, code = 1): never {
  console.error(`emit: ${message}`);
  process.exit(code);
}

function requireAgent(id: string | undefined): string {
  if (!id) fail('which agent? Run "emit agents" to list them.', 2);
  const agent = findAgent(id);
  if (!agent) fail(`there is no agent "${id}". Run "emit agents" to list them.`);
  if (agent.human) fail(`${agent.name} is a person, not an agent, and is not moved by events.`);
  return id;
}

let parsed;
try {
  parsed = parseArgs({
    allowPositionals: true,
    options: {
      at: { type: 'string' },
      mission: { type: 'string' },
      status: { type: 'string' },
      by: { type: 'string' },
      quiet: { type: 'boolean', short: 'q' },
      help: { type: 'boolean', short: 'h' },
    },
  });
} catch (error) {
  fail(`${(error as Error).message}\n\n${USAGE}`, 2);
}
const { values, positionals } = parsed;
const [command, ...rest] = positionals;

if (values.help || !command) {
  console.log(USAGE);
  process.exit(command || values.help ? 0 : 2);
}

if (command === 'agents') {
  for (const agent of EMITTING_AGENTS) console.log(`${agent.id.padEnd(26)} ${agent.name.padEnd(8)} ${agent.role}`);
  process.exit(0);
}

const ts = new Date().toISOString();
let event: OfficeEvent;

if ((AGENT_STATES as readonly string[]).includes(command)) {
  const [agentId, ...words] = rest;
  event = { ts, type: 'agent.state', agentId: requireAgent(agentId), state: command as AgentState };
  if (words.length > 0) event.task = words.join(' ');
  if (values.at) event.deskId = values.at;
  if (values.mission) event.missionId = values.mission;
} else if (command === 'moved') {
  const [agentId, place] = rest;
  if (!place) fail('where to? Usage: emit moved <agentId> <place>', 2);
  event = { ts, type: 'agent.moved', agentId: requireAgent(agentId), deskId: place };
} else if (command === 'output') {
  const [agentId, filePath, ...words] = rest;
  if (!filePath) fail('which file? Usage: emit output <agentId> <path> [description]', 2);
  event = { ts, type: 'agent.output', agentId: requireAgent(agentId), meta: { path: filePath } };
  if (words.length > 0) event.task = words.join(' ');
  if (values.mission) event.missionId = values.mission;
} else if (command === 'mission') {
  const [action, missionId, ...words] = rest;
  if (action !== 'created' && action !== 'updated' && action !== 'closed') fail('usage: emit mission <created|updated|closed> <missionId> [title]', 2);
  if (!missionId) fail('which mission? Give it an id, e.g. M-12.', 2);
  if (action === 'created' && words.length === 0) fail('a new mission needs a title: emit mission created M-12 "Homepage refresh"', 2);
  const by = values.by ? requireAgent(values.by) : 'exec.chief-of-staff';
  event = { ts, type: `mission.${action}`, agentId: by, missionId };
  if (words.length > 0) event.task = words.join(' ');
  if (values.status) {
    if (!(MISSION_STATUSES as readonly string[]).includes(values.status)) fail(`unknown status "${values.status}"; use ${MISSION_STATUSES.join(', ')}.`);
    event.meta = { status: values.status as MissionStatus };
  }
} else {
  fail(`unknown command "${command}".\n\n${USAGE}`, 2);
}

try {
  const written = appendEvent(event, busPaths());
  if (!values.quiet) console.log(JSON.stringify(written));
} catch (error) {
  fail((error as Error).message);
}
