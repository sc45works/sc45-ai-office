/**
 * The event contract.
 *
 * Every layer agrees on this file: agents write these events, the bus stores them one
 * per line in `data/events.jsonl`, the server streams them, the office renders them.
 * Change an event's shape here and nowhere else.
 */

export const AGENT_STATES = ['idle', 'working', 'collaborating', 'blocked', 'reporting'] as const;
export type AgentState = (typeof AGENT_STATES)[number];

export const EVENT_TYPES = [
  'mission.created',
  'mission.updated',
  'mission.closed',
  'agent.state',
  'agent.moved',
  'agent.output',
  'agent.profile',
  'approval.requested',
  'approval.decided',
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const MISSION_STATUSES = ['queued', 'active', 'done'] as const;
export type MissionStatus = (typeof MISSION_STATUSES)[number];

/** What Stephen is asked to sign off: a mission starting, its next stage starting, or its being closed. */
export const APPROVAL_KINDS = ['start', 'stage', 'close'] as const;
export type ApprovalKind = (typeof APPROVAL_KINDS)[number];
/** `lapsed`: nobody decided, and the work it guarded is gone (the mission was closed, or the server restarted). */
export const APPROVAL_DECISIONS = ['approved', 'declined', 'lapsed'] as const;
export type ApprovalDecision = (typeof APPROVAL_DECISIONS)[number];

/**
 * One line of `data/events.jsonl`.
 *
 * - `agentId` is the agent's home desk id, e.g. `dev.frontend`. On mission events it is
 *   whoever opened or changed the mission.
 * - `deskId` is where the event happens when that is not the agent's own desk: another
 *   desk id (stand beside it), a spot id (`meeting.seat-2`), or a zone id (`meeting`,
 *   `lounge`), in which case the office picks a free seat there.
 * - `task` is the short label shown above the agent, or the mission's title on mission events.
 * - An `agent.output` event records a file the agent produced: `meta.path` is the file,
 *   `task` an optional short description of it.
 * - An `agent.profile` event changes what someone is called or looks like: `meta.name`,
 *   `meta.appearance`, or both (see appearance.ts). It is the one event the human can have too.
 * - An `approval.requested` event asks Stephen to sign something off before it happens:
 *   `meta.approvalId` names the request, `meta.kind` says what it is, `task` is its one-line
 *   title, and `meta.items` lists who would do what. Nothing it guards happens until an
 *   `approval.decided` event with the same `meta.approvalId` says `meta.decision: "approved"`.
 *   `agentId` on the decision is whoever decided; `task` is the note they left, if any.
 */
export interface OfficeEvent {
  /** When it happened, ISO 8601. */
  ts: string;
  type: EventType;
  agentId: string;
  deskId?: string;
  missionId?: string;
  state?: AgentState;
  task?: string;
  meta?: { status?: MissionStatus; path?: string; name?: string; appearance?: Appearance; [key: string]: unknown };
}

import { parseProfileChange, type Appearance } from './appearance.ts';

export type ParseResult = { ok: true; event: OfficeEvent } | { ok: false; error: string };

const isText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const includes = <T extends string>(list: readonly T[], value: unknown): value is T => list.includes(value as T);

/**
 * Check that a value read from the log (or about to be written to it) is a well-formed event.
 * It does not check that the agent exists: the roster can change, the log must still read.
 */
export function parseEvent(input: unknown): ParseResult {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return { ok: false, error: 'an event must be a JSON object' };
  const raw = input as Record<string, unknown>;

  if (!includes(EVENT_TYPES, raw.type)) return { ok: false, error: `unknown type "${String(raw.type)}"; expected one of ${EVENT_TYPES.join(', ')}` };
  if (!isText(raw.agentId)) return { ok: false, error: '"agentId" is required' };
  if (!isText(raw.ts) || Number.isNaN(Date.parse(raw.ts))) return { ok: false, error: '"ts" must be an ISO 8601 date and time' };

  for (const key of ['deskId', 'missionId', 'task'] as const) {
    if (raw[key] !== undefined && typeof raw[key] !== 'string') return { ok: false, error: `"${key}" must be text` };
  }
  if (raw.state !== undefined && !includes(AGENT_STATES, raw.state)) {
    return { ok: false, error: `unknown state "${String(raw.state)}"; expected one of ${AGENT_STATES.join(', ')}` };
  }
  if (raw.meta !== undefined && (typeof raw.meta !== 'object' || raw.meta === null || Array.isArray(raw.meta))) {
    return { ok: false, error: '"meta" must be an object' };
  }
  const meta = raw.meta as OfficeEvent['meta'];
  if (meta?.status !== undefined && !includes(MISSION_STATUSES, meta.status)) {
    return { ok: false, error: `unknown mission status "${String(meta.status)}"; expected one of ${MISSION_STATUSES.join(', ')}` };
  }

  if (raw.type === 'agent.state' && raw.state === undefined) return { ok: false, error: 'an agent.state event needs a "state"' };
  if (raw.type === 'agent.moved' && !isText(raw.deskId)) return { ok: false, error: 'an agent.moved event needs a "deskId" to move to' };
  if (raw.type.startsWith('mission.') && !isText(raw.missionId)) return { ok: false, error: `a ${raw.type} event needs a "missionId"` };
  if (raw.type === 'agent.output' && !isText(meta?.path)) return { ok: false, error: 'an agent.output event needs the file in "meta.path"' };
  if (raw.type === 'approval.requested' || raw.type === 'approval.decided') {
    if (!isText(meta?.approvalId)) return { ok: false, error: `an ${raw.type} event needs "meta.approvalId"` };
    if (raw.type === 'approval.requested' && !includes(APPROVAL_KINDS, meta?.kind)) return { ok: false, error: `an approval.requested event needs "meta.kind": one of ${APPROVAL_KINDS.join(', ')}` };
    if (raw.type === 'approval.requested' && !isText(raw.missionId)) return { ok: false, error: 'an approval.requested event needs a "missionId"' };
    if (raw.type === 'approval.decided' && !includes(APPROVAL_DECISIONS, meta?.decision)) return { ok: false, error: `an approval.decided event needs "meta.decision": one of ${APPROVAL_DECISIONS.join(', ')}` };
  }
  if (raw.type === 'agent.profile') {
    const profile = parseProfileChange({ name: meta?.name, appearance: meta?.appearance });
    if (!profile.ok) return { ok: false, error: `an agent.profile event's "meta": ${profile.error}` };
  }

  const event: OfficeEvent = { ts: raw.ts, type: raw.type, agentId: raw.agentId.trim() };
  if (isText(raw.deskId)) event.deskId = raw.deskId.trim();
  if (isText(raw.missionId)) event.missionId = raw.missionId.trim();
  if (raw.state !== undefined) event.state = raw.state;
  if (isText(raw.task)) event.task = raw.task.trim();
  if (meta && Object.keys(meta).length > 0) event.meta = meta;
  return { ok: true, event };
}
