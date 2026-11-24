/**
 * The current state of the office, and the one rule for how an event changes it.
 *
 * The server keeps a snapshot by applying every event from the log; the office keeps
 * its own the same way. Both use `applyEvent`, so they cannot disagree about what an
 * event means.
 */
import { APPROVAL_KINDS, type AgentState, type ApprovalKind, type MissionStatus, type OfficeEvent } from './events.ts';
import { parseProfileChange, type Appearance } from './appearance.ts';
import { EMITTING_AGENTS, findAgent } from './roster.ts';

export interface AgentStatus {
  state: AgentState;
  /** The label shown above the agent; absent while idle. */
  task?: string;
  /** Where the agent is, when that is not its default place for the state: a desk, spot or zone id. */
  at?: string;
  missionId?: string;
  /** When the agent entered this state, ISO 8601. */
  since: string | null;
}

export interface Mission {
  id: string;
  title: string;
  status: MissionStatus;
  createdAt: string;
  updatedAt: string;
  /** The project folder its work goes in, when agents are doing real work. */
  project?: string;
  /** Who was given what, and in which stage, when the work is real and done in stages. */
  assignments?: Array<{ agentId: string; task: string; stage: number }>;
  /** Tasks on it that did not come out done: who, how it ended (partial, blocked, failed), and what they said. */
  problems?: Array<{ agentId: string; verdict: string; note: string }>;
}

/** Something waiting for Stephen's sign-off. It stays here until he decides; there is no time limit. */
export interface Approval {
  id: string;
  kind: ApprovalKind;
  missionId: string;
  /** One line: what is being asked. */
  title: string;
  requestedAt: string;
  /** The agent asking. */
  requestedBy: string;
  project?: string;
  /** For a stage: which one, and how many the mission has. */
  stage?: number;
  stages?: number;
  /** Who would do what if it is approved. `risk` is why the Chief of Staff flagged that task, when she did. */
  items: Array<{ agentId: string; task: string; stage?: number; risk?: string }>;
  /** For closing a mission: what the work cost and how many files it left. */
  costUsd?: number;
  files?: number;
  /** How many of the mission's tasks have not come out done so far. */
  problems?: number;
}

/** A file an agent produced. */
export interface AgentOutput {
  path: string;
  /** A short description, if the agent gave one. */
  label?: string;
  missionId?: string;
  ts: string;
}

export interface AgentTask {
  label: string;
  missionId?: string;
  ts: string;
}

/** What an agent has recently worked on. Each list is oldest first and kept short. */
export interface AgentActivity {
  /** Ids of the missions it touched. */
  missions: string[];
  tasks: AgentTask[];
  outputs: AgentOutput[];
}

const ACTIVITY_LIMITS = { missions: 4, tasks: 6, outputs: 10 } as const;

export interface OfficeSnapshot {
  /** How many events have been applied. */
  seq: number;
  /** Timestamp of the last event applied, or null when there has been none. */
  updatedAt: string | null;
  agents: Record<string, AgentStatus>;
  /** In order of latest change, oldest first. */
  missions: Mission[];
  /** Recent work per agent: the source for the side panel and the per-agent graph. */
  activity: Record<string, AgentActivity>;
  /** Names and looks that have been changed from the roster's. Absent for anyone left as they were. */
  profiles: Record<string, { name?: string; appearance?: Appearance }>;
  /** The last things that happened, oldest first: what the activity feed shows. */
  recent: ActivityEntry[];
  /** What the agents' real work has cost so far, as Claude Code reports it. */
  usage: { costUsd: number; runs: number };
  /** Requests waiting for Stephen's sign-off, oldest first. */
  approvals: Approval[];
}

/** One line of the activity feed: an event, cut down to what the feed shows. */
export interface ActivityEntry {
  ts: string;
  type: OfficeEvent['type'];
  agentId: string;
  state?: AgentState;
  task?: string;
  missionId?: string;
  /** For a file: its path. */
  path?: string;
  /** For a finished piece of real work: what it cost (US dollars, at API prices) and how long it took. */
  costUsd?: number;
  durationMs?: number;
  /** For a sign-off: what was decided. */
  decision?: string;
  /** For an agent's report on real work: how it came out (done, partial, blocked, failed). */
  verdict?: string;
}

const RECENT_KEPT = 60;

/** How many finished missions the snapshot keeps before dropping the oldest. */
const DONE_MISSIONS_KEPT = 20;

/** Everyone idle at their own desk, no missions. */
export function emptySnapshot(): OfficeSnapshot {
  const agents: Record<string, AgentStatus> = {};
  for (const agent of EMITTING_AGENTS) agents[agent.id] = { state: 'idle', since: null };
  return { seq: 0, updatedAt: null, agents, missions: [], activity: {}, profiles: {}, recent: [], usage: { costUsd: 0, runs: 0 }, approvals: [] };
}

/** True for the lounge zone and any seat in it. */
export function isLounge(placeId: string | undefined): boolean {
  return placeId === 'lounge' || Boolean(placeId?.startsWith('lounge.'));
}

/**
 * Where an agent is after a state event.
 *
 * - An explicit `deskId` always wins.
 * - A collaborating agent with no `deskId` stays where it is.
 * - An idle agent stays in the lounge if it is already there.
 * - Otherwise `undefined`: the default place for the state, which the office decides
 *   (own desk for most states, beside the Chief of Staff when reporting).
 */
export function nextPlace(previousAt: string | undefined, state: AgentState, deskId: string | undefined): string | undefined {
  if (deskId) return deskId;
  if (state === 'collaborating') return previousAt;
  if (state === 'idle' && isLounge(previousAt)) return previousAt;
  return undefined;
}

/** Add an item to the end of a short list, moving it there if it is already present, and trim the front. */
function remember<T>(list: T[], item: T, same: (existing: T) => boolean, limit: number): void {
  const index = list.findIndex(same);
  if (index >= 0) list.splice(index, 1);
  list.push(item);
  if (list.length > limit) list.splice(0, list.length - limit);
}

function recordActivity(snapshot: OfficeSnapshot, event: OfficeEvent): void {
  const isTask = event.type === 'agent.state' && event.state !== 'idle' && Boolean(event.task);
  const isOutput = event.type === 'agent.output' && Boolean(event.meta?.path);
  if (!isTask && !isOutput) return;

  snapshot.activity ??= {}; // a snapshot saved before activity was recorded
  const activity = (snapshot.activity[event.agentId] ??= { missions: [], tasks: [], outputs: [] });
  // An output with no mission of its own belongs to the mission the agent is working on.
  const missionId = event.missionId ?? snapshot.agents[event.agentId]?.missionId;
  if (missionId) remember(activity.missions, missionId, (id) => id === missionId, ACTIVITY_LIMITS.missions);

  if (isTask) {
    const task: AgentTask = { label: event.task!, ts: event.ts };
    if (missionId) task.missionId = missionId;
    remember(activity.tasks, task, (existing) => existing.label === task.label && existing.missionId === task.missionId, ACTIVITY_LIMITS.tasks);
  } else {
    const output: AgentOutput = { path: event.meta!.path!, ts: event.ts };
    if (event.task) output.label = event.task;
    if (missionId) output.missionId = missionId;
    remember(activity.outputs, output, (existing) => existing.path === output.path, ACTIVITY_LIMITS.outputs);
  }
}

/** Keep the feed: everything except agents going idle, moving, and changes of name or look. */
function recordRecent(snapshot: OfficeSnapshot, event: OfficeEvent): void {
  snapshot.recent ??= []; // a snapshot saved before the feed existed
  snapshot.usage ??= { costUsd: 0, runs: 0 };
  // Only an agent's own report carries what its work cost; a request for sign-off quotes the running total, which must not be counted again.
  const reports = event.type === 'agent.state';
  const cost = reports && typeof event.meta?.costUsd === 'number' && event.meta.costUsd >= 0 ? event.meta.costUsd : undefined;
  const duration = reports && typeof event.meta?.durationMs === 'number' && event.meta.durationMs >= 0 ? event.meta.durationMs : undefined;
  if (cost !== undefined) {
    snapshot.usage.costUsd += cost;
    snapshot.usage.runs += 1;
  }
  if (event.type === 'agent.moved' || event.type === 'agent.profile' || (event.type === 'agent.state' && event.state === 'idle')) return;
  const entry: ActivityEntry = { ts: event.ts, type: event.type, agentId: event.agentId };
  if (event.state) entry.state = event.state;
  if (event.task) entry.task = event.task;
  if (event.missionId) entry.missionId = event.missionId;
  if (typeof event.meta?.path === 'string') entry.path = event.meta.path;
  if (event.type === 'approval.decided' && typeof event.meta?.decision === 'string') entry.decision = event.meta.decision;
  if (reports && typeof event.meta?.verdict === 'string') entry.verdict = event.meta.verdict;
  if (cost !== undefined) entry.costUsd = cost;
  if (duration !== undefined) entry.durationMs = duration;
  snapshot.recent.push(entry);
  if (snapshot.recent.length > RECENT_KEPT) snapshot.recent.splice(0, snapshot.recent.length - RECENT_KEPT);
}

/** Apply one event to a snapshot, in place, and return it. */
export function applyEvent(snapshot: OfficeSnapshot, event: OfficeEvent): OfficeSnapshot {
  snapshot.seq += 1;
  snapshot.updatedAt = event.ts;
  recordActivity(snapshot, event);
  recordRecent(snapshot, event);

  if (event.type === 'agent.state' && event.state) {
    const previous = snapshot.agents[event.agentId];
    const next: AgentStatus = { state: event.state, since: event.ts };
    const task = event.state === 'idle' ? undefined : (event.task ?? previous?.task);
    const at = nextPlace(previous?.at, event.state, event.deskId);
    const missionId = event.state === 'idle' ? undefined : (event.missionId ?? previous?.missionId);
    if (task) next.task = task;
    // Being sent to your own desk is the same as having no special place.
    if (at && at !== event.agentId) next.at = at;
    if (missionId) next.missionId = missionId;
    snapshot.agents[event.agentId] = next;
    // A report that the work did not come out done is kept on the mission, so it can be seen later.
    const verdict = event.meta?.verdict;
    if (typeof verdict === 'string' && verdict !== 'done' && missionId) {
      const mission = snapshot.missions.find((item) => item.id === missionId);
      if (mission) {
        mission.problems = [...(mission.problems ?? []).filter((problem) => problem.agentId !== event.agentId), { agentId: event.agentId, verdict, note: event.task ?? verdict }];
      }
    }
  } else if (event.type === 'agent.moved' && event.deskId) {
    const previous = snapshot.agents[event.agentId] ?? { state: 'idle' as const, since: event.ts };
    // Moving to your own desk is the same as having no special place.
    const at = event.deskId === event.agentId ? undefined : event.deskId;
    const next: AgentStatus = { ...previous };
    if (at) next.at = at;
    else delete next.at;
    snapshot.agents[event.agentId] = next;
  } else if (event.type === 'agent.profile') {
    const checked = parseProfileChange({ name: event.meta?.name, appearance: event.meta?.appearance });
    if (checked.ok) {
      snapshot.profiles ??= {}; // a snapshot saved before profiles existed
      snapshot.profiles[event.agentId] = { ...snapshot.profiles[event.agentId], ...checked.change };
    }
  } else if (event.type === 'approval.requested' || event.type === 'approval.decided') {
    snapshot.approvals ??= []; // a snapshot saved before approvals existed
    const id = typeof event.meta?.approvalId === 'string' ? event.meta.approvalId : '';
    // Either way the old entry goes: a decision settles it, a repeated request replaces it.
    snapshot.approvals = snapshot.approvals.filter((approval) => approval.id !== id);
    const kind = event.meta?.kind as ApprovalKind;
    if (event.type === 'approval.requested' && id && event.missionId && APPROVAL_KINDS.includes(kind)) {
      const meta = event.meta ?? {};
      const approval: Approval = { id, kind, missionId: event.missionId, title: event.task ?? id, requestedAt: event.ts, requestedBy: event.agentId, items: [] };
      if (typeof meta.project === 'string') approval.project = meta.project;
      if (typeof meta.stage === 'number') approval.stage = meta.stage;
      if (typeof meta.stages === 'number') approval.stages = meta.stages;
      if (typeof meta.costUsd === 'number') approval.costUsd = meta.costUsd;
      if (typeof meta.files === 'number') approval.files = meta.files;
      if (typeof meta.problems === 'number' && meta.problems > 0) approval.problems = meta.problems;
      // Believed only as far as it is well formed, like everything read from the log.
      for (const entry of Array.isArray(meta.items) ? (meta.items as unknown[]) : []) {
        const item = entry as Record<string, unknown> | null;
        if (typeof item?.agentId !== 'string' || typeof item.task !== 'string') continue;
        approval.items.push({ agentId: item.agentId, task: item.task, ...(typeof item.stage === 'number' ? { stage: item.stage } : {}), ...(typeof item.risk === 'string' && item.risk ? { risk: item.risk } : {}) });
      }
      snapshot.approvals.push(approval);
    }
  } else if (event.type.startsWith('mission.') && event.missionId) {
    const index = snapshot.missions.findIndex((mission) => mission.id === event.missionId);
    const existing = index >= 0 ? snapshot.missions.splice(index, 1)[0] : undefined;
    const mission: Mission = existing ?? { id: event.missionId, title: event.task ?? event.missionId, status: 'active', createdAt: event.ts, updatedAt: event.ts };
    if (event.task) mission.title = event.task;
    if (typeof event.meta?.project === 'string' && event.meta.project) mission.project = event.meta.project;
    if (Array.isArray(event.meta?.assignments)) {
      // Believed only as far as it is well formed: this is read from the log like anything else.
      mission.assignments = (event.meta.assignments as unknown[])
        .filter((entry): entry is { agentId: string; task: string; stage: number } => {
          const item = entry as Record<string, unknown> | null;
          return typeof item?.agentId === 'string' && typeof item.task === 'string' && typeof item.stage === 'number';
        })
        .map(({ agentId, task, stage }) => ({ agentId, task, stage }));
    }
    if (event.type === 'mission.closed') mission.status = 'done';
    else if (event.meta?.status) mission.status = event.meta.status;
    mission.updatedAt = event.ts;
    snapshot.missions.push(mission);

    // Keep the list from growing for ever: drop the oldest finished missions.
    let done = snapshot.missions.filter((item) => item.status === 'done').length;
    for (let i = 0; i < snapshot.missions.length && done > DONE_MISSIONS_KEPT; ) {
      if (snapshot.missions[i].status === 'done') {
        snapshot.missions.splice(i, 1);
        done -= 1;
      } else {
        i += 1;
      }
    }
  }
  return snapshot;
}

/** What someone is called now: the name they were given in the office, or the roster's. */
export function displayName(snapshot: OfficeSnapshot, agentId: string): string {
  return snapshot.profiles?.[agentId]?.name ?? findAgent(agentId)?.name ?? agentId;
}

export function activeMissionCount(snapshot: OfficeSnapshot): number {
  return snapshot.missions.filter((mission) => mission.status === 'active').length;
}
