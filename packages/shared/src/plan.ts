/**
 * Commands to the Chief of Staff.
 *
 * A command is a sentence from Stephen ("Build a landing page for Relay"). A brain
 * (Claude Code, or the built-in planner below) turns it into a Plan: a short reply and a
 * list of actions. The plan is then checked and turned into ordinary events, so nothing
 * a brain says can do more than open and close missions and set agents' states.
 *
 * This file is pure: no Node, no browser. The server uses it for real commands and the
 * office uses it in demo mode.
 */
import { AGENT_STATES, type AgentState, type OfficeEvent } from './events.ts';
import { CHIEF_OF_STAFF_ID, COORDINATOR_ID, EMITTING_AGENTS, findAgent } from './roster.ts';
import { displayName, type OfficeSnapshot } from './state.ts';

export const COMMAND_MAX_LENGTH = 500;
const MAX_ACTIONS = 6;
const MAX_ASSIGNMENTS = 8;
const MAX_TEXT = 80;

export interface Assignment {
  agentId: string;
  task: string;
  /**
   * When in the mission this task is done: stage 1 first, then 2, and so on. Tasks in the
   * same stage are done at the same time; a stage starts when the one before has finished.
   */
  stage: number;
  /** Why the Chief of Staff thinks Stephen should look at this task before it is done, if she does. */
  risk?: string;
}

const MAX_STAGE = 5;

/**
 * The stage a task falls in when the plan does not say: things others build on come first
 * (plans, research, copy, design), then building, then checking.
 */
export function defaultStage(agentId: string): number {
  if (agentId === 'dev.qa') return 3;
  if (agentId.startsWith('dev.')) return 2;
  return 1;
}

/** The folder a mission's work goes in. */
export interface ProjectChoice {
  /** The folder's name: lower case, words joined by dashes. */
  slug: string;
  /** The name as it was given. */
  name: string;
  /** True if the folder is to be created. */
  isNew: boolean;
}

export type PlanAction =
  | { type: 'create_mission'; title: string; assignments: Assignment[]; project?: ProjectChoice }
  | { type: 'close_mission'; missionId: string }
  | { type: 'set_state'; agentId: string; state: AgentState; task?: string; at?: string };

export interface Plan {
  /** What the Chief of Staff says back, in a sentence or two. */
  reply: string;
  actions: PlanAction[];
}

export type PlanResult = { ok: true; plan: Plan; dropped: string[]; /** A mission was dropped because it named no usable project. */ needsProject: boolean } | { ok: false; error: string };

export interface PlanRules {
  /**
   * The project folders that exist. When given, agents do real work, so every new mission
   * must say which project it is for: one of these, or a new one. A mission that does not is dropped.
   */
  projects?: readonly string[];
}

/**
 * A folder name from a project's name: lower case, letters and digits of any script, dashes
 * between words. Nothing that could step outside the projects folder (no dots, no slashes) survives.
 */
export function projectSlug(name: string): string {
  return name
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/g, '');
}

function parseProject(input: unknown, existing: readonly string[]): ProjectChoice | string {
  if (typeof input !== 'object' || input === null) return 'a mission with no project';
  const raw = input as Record<string, unknown>;
  const name = text(raw.name, 60);
  const slug = name ? projectSlug(name) : '';
  if (!name || !slug) return 'a mission with no project';
  const found = existing.find((folder) => folder === slug || folder === name);
  if (found) return { slug: found, name, isNew: false }; // an existing folder is used, whatever the plan called it
  if (raw.new === true) return { slug, name, isNew: true };
  return `a mission for a project that does not exist ("${name}")`;
}

const text = (value: unknown, max = MAX_TEXT): string | null => {
  if (typeof value !== 'string') return null;
  const clean = value.replace(/\s+/g, ' ').trim();
  return clean ? (clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean) : null;
};

/** An agent a plan may give work to: real, not the human, and not the Chief of Staff herself. */
function assignable(agentId: unknown): agentId is string {
  if (typeof agentId !== 'string') return false;
  const agent = findAgent(agentId);
  return Boolean(agent) && !agent!.human && agentId !== CHIEF_OF_STAFF_ID;
}

/**
 * Pull a JSON object out of a model's answer. Models sometimes wrap JSON in a code fence
 * or add a sentence round it, so this takes the outermost `{ ... }` it can parse.
 */
export function extractJson(answer: string): unknown {
  const start = answer.indexOf('{');
  const end = answer.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error('the answer contained no JSON object');
  return JSON.parse(answer.slice(start, end + 1));
}

/**
 * Check a plan from a brain. Anything malformed is dropped rather than trusted, and the
 * reasons are returned in `dropped` so they can be shown.
 */
export function parsePlan(input: unknown, snapshot: OfficeSnapshot, rules: PlanRules = {}): PlanResult {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return { ok: false, error: 'the plan is not a JSON object' };
  const raw = input as { reply?: unknown; actions?: unknown };
  const reply = text(raw.reply, 400);
  if (!reply) return { ok: false, error: 'the plan has no "reply"' };
  if (raw.actions !== undefined && !Array.isArray(raw.actions)) return { ok: false, error: '"actions" must be a list' };

  const actions: PlanAction[] = [];
  const dropped: string[] = [];
  let needsProject = false;
  for (const item of ((raw.actions as unknown[]) ?? []).slice(0, MAX_ACTIONS)) {
    const action = item as Record<string, unknown>;
    if (action?.type === 'create_mission') {
      const title = text(action.title, 60);
      if (!title) {
        dropped.push('a mission with no title');
        continue;
      }
      const assignments: Assignment[] = [];
      for (const entry of (Array.isArray(action.assignments) ? action.assignments : []).slice(0, MAX_ASSIGNMENTS)) {
        const { agentId, task, stage, risk } = (entry ?? {}) as Record<string, unknown>;
        const label = text(task);
        if (!assignable(agentId)) dropped.push(`an assignment to unknown agent "${String(agentId)}"`);
        else if (!label) dropped.push(`an assignment to ${agentId} with no task`);
        else if (!assignments.some((existing) => existing.agentId === agentId)) {
          const chosen = typeof stage === 'number' && Number.isInteger(stage) && stage >= 1 && stage <= MAX_STAGE ? stage : defaultStage(agentId);
          const flagged = text(risk);
          assignments.push({ agentId, task: label, stage: chosen, ...(flagged ? { risk: flagged } : {}) });
        }
      }
      if (rules.projects) {
        const project = parseProject(action.project, rules.projects);
        if (typeof project === 'string') {
          dropped.push(project);
          needsProject = true;
          continue;
        }
        actions.push({ type: 'create_mission', title, assignments, project });
      } else actions.push({ type: 'create_mission', title, assignments });
    } else if (action?.type === 'close_mission') {
      const mission = snapshot.missions.find((existing) => existing.id === action.missionId);
      if (!mission) dropped.push(`closing unknown mission "${String(action.missionId)}"`);
      else if (mission.status !== 'done') actions.push({ type: 'close_mission', missionId: mission.id });
    } else if (action?.type === 'set_state') {
      if (!assignable(action.agentId)) dropped.push(`a state for unknown agent "${String(action.agentId)}"`);
      else if (!(AGENT_STATES as readonly unknown[]).includes(action.state)) dropped.push(`unknown state "${String(action.state)}"`);
      else {
        const next: PlanAction = { type: 'set_state', agentId: action.agentId, state: action.state as AgentState };
        const label = text(action.task);
        const at = text(action.at, 40);
        if (label) next.task = label;
        if (at) next.at = at;
        actions.push(next);
      }
    } else {
      dropped.push(`unknown action "${String(action?.type)}"`);
    }
  }
  return { ok: true, plan: { reply, actions }, dropped, needsProject };
}

export type PlannedEvent = Omit<OfficeEvent, 'ts'>;

export interface PlannedWork {
  events: PlannedEvent[];
  /** One line per action, for showing what was done: `Opened M-4 "Relay landing page": Mika, Ada, Leo`. */
  summary: string[];
  /** The pieces of real work the plan calls for: one per agent given a task on a mission that has a project. */
  jobs: WorkerJob[];
  /** Missions the plan closes, so any work still running on them can be stopped. */
  closed: string[];
}

/** One agent's task on one mission, to be carried out in the mission's project folder. */
export interface WorkerJob {
  agentId: string;
  missionId: string;
  /** The mission's title. */
  mission: string;
  task: string;
  project: ProjectChoice;
  /** Its stage in the mission: it starts when every earlier stage has finished. */
  stage: number;
  /** Why this task was flagged for Stephen's attention, if it was. */
  risk?: string;
  /** Files Stephen attached to the request, as paths inside the project folder. */
  attachments?: string[];
  /** Who else is on the mission, what each is doing and in which stage, for the agent to know its lane. */
  team: Array<{ agentId: string; task: string; stage: number }>;
}

/** The next free mission id: one more than the highest `M-<number>` seen. */
export function nextMissionNumber(snapshot: OfficeSnapshot): number {
  let highest = 0;
  for (const mission of snapshot.missions) {
    const match = /^M-(\d+)$/.exec(mission.id);
    if (match) highest = Math.max(highest, Number(match[1]));
  }
  return highest + 1;
}

/** Turn a checked plan into the events that carry it out, in the order they should happen. */
export function planToEvents(plan: Plan, snapshot: OfficeSnapshot): PlannedWork {
  const events: PlannedEvent[] = [];
  const summary: string[] = [];
  const jobs: WorkerJob[] = [];
  const closed: string[] = [];
  let number = nextMissionNumber(snapshot);
  const name = (agentId: string) => displayName(snapshot, agentId);

  for (const action of plan.actions) {
    if (action.type === 'create_mission') {
      const missionId = `M-${number++}`;
      const created: PlannedEvent = { type: 'mission.created', agentId: CHIEF_OF_STAFF_ID, missionId, task: action.title };
      if (action.project) created.meta = { project: action.project.slug };
      events.push(created);
      const hasCoordinator = action.assignments.some((assignment) => assignment.agentId === COORDINATOR_ID);
      if (!hasCoordinator) events.push({ type: 'agent.state', agentId: COORDINATOR_ID, state: 'working', task: `Coordinating: ${action.title}`, missionId });
      // When the work is real it is done in stages, so only the first stage starts now; the mission
      // records who comes later. When agents only plan, everyone is shown at work at once.
      const first = Math.min(...action.assignments.map((assignment) => assignment.stage));
      for (const assignment of action.assignments) {
        if (action.project && assignment.stage !== first) continue;
        events.push({ type: 'agent.state', agentId: assignment.agentId, state: 'working', task: assignment.task, missionId });
      }
      if (action.project) {
        created.meta = { ...created.meta, assignments: action.assignments.map(({ agentId, task, stage }) => ({ agentId, task, stage })) };
        for (const assignment of action.assignments) {
          jobs.push({ agentId: assignment.agentId, missionId, mission: action.title, task: assignment.task, project: action.project, stage: assignment.stage, ...(assignment.risk ? { risk: assignment.risk } : {}), team: action.assignments.filter((other) => other !== assignment) });
        }
      }
      const who = action.assignments.map((assignment) => name(assignment.agentId)).join(', ');
      summary.push(`Opened ${missionId} "${action.title}"${action.project ? ` in ${action.project.isNew ? 'new project' : 'project'} ${action.project.slug}` : ''}${who ? `: ${who}` : ''}`);
    } else if (action.type === 'close_mission') {
      events.push({ type: 'mission.closed', agentId: CHIEF_OF_STAFF_ID, missionId: action.missionId });
      // Everyone still on that mission goes back to idle.
      for (const [agentId, status] of Object.entries(snapshot.agents)) {
        if (status.missionId === action.missionId && status.state !== 'idle') events.push({ type: 'agent.state', agentId, state: 'idle' });
      }
      closed.push(action.missionId);
      summary.push(`Closed ${action.missionId}`);
    } else {
      const event: PlannedEvent = { type: 'agent.state', agentId: action.agentId, state: action.state };
      if (action.task && action.state !== 'idle') event.task = action.task;
      if (action.at) event.deskId = action.at;
      events.push(event);
      summary.push(`${name(action.agentId)} is now ${action.state}`);
    }
  }
  return { events, summary, jobs, closed };
}

// What a brain is told about the office ---------------------------------------

/** The roster and the current state, as plain text for a model's prompt. */
export function describeOffice(snapshot: OfficeSnapshot): string {
  const lines: string[] = ['Agents (id · name · role · what they are doing now):'];
  for (const agent of EMITTING_AGENTS) {
    const status = snapshot.agents[agent.id];
    const doing = !status || status.state === 'idle' ? 'idle' : `${status.state}${status.task ? `: ${status.task}` : ''}${status.missionId ? ` (${status.missionId})` : ''}`;
    lines.push(`- ${agent.id} · ${displayName(snapshot, agent.id)} · ${agent.role} · ${doing}`);
  }
  const open = snapshot.missions.filter((mission) => mission.status !== 'done');
  lines.push('', open.length ? 'Open missions:' : 'Open missions: none.');
  for (const mission of open) lines.push(`- ${mission.id} · ${mission.title}`);
  return lines.join('\n');
}

// The built-in planner ----------------------------------------------------------

interface Department {
  words: RegExp;
  /** Each agent and the kind of task it gets, e.g. `Wireframes` gives `Wireframes: <subject>`. */
  assignments: Array<[agentId: string, kind: string]>;
}

const DEPARTMENTS: Department[] = [
  {
    words: /\b(design|logo|brand|landing|homepage|home page|website|web site|ui|ux|mock-?up|wireframe|layout|3d|animation)\b/i,
    assignments: [
      ['design.lead', 'Visual direction'],
      ['design.ui-ux', 'Wireframes'],
    ],
  },
  {
    words: /\b(build|code|develop|website|web site|site|landing|homepage|home page|app|deploy|launch|bug|fix|api|integrat\w*|form|cms)\b/i,
    assignments: [
      ['dev.lead', 'Technical plan'],
      ['dev.frontend', 'Build'],
      ['dev.qa', 'Test plan'],
    ],
  },
  {
    words: /\b(video|youtube|script|episode|post|blog|content|newsletter|thumbnail|title|social|copy|article)\b/i,
    assignments: [
      ['content.manager', 'Content plan'],
      ['content.script-writer', 'Draft'],
    ],
  },
  {
    words: /\b(client|lead|proposal|quote|invoice|sales|follow[- ]?up|onboard\w*|contract|deal)\b/i,
    assignments: [
      ['sales.manager', 'Proposal'],
      ['sales.client-success', 'Client follow-up'],
    ],
  },
  {
    words: /\b(research|competitor\w*|market|pricing|price|trend\w*|inspiration|benchmark\w*|compare|analy[sz]e)\b/i,
    assignments: [
      ['research.scout', 'Research'],
      ['research.analyst', 'Analysis'],
    ],
  },
];

/** "please create a mission to build a landing page for Relay." -> "Build a landing page for Relay" */
function missionTitle(command: string): string {
  const subject = command
    .replace(/^\s*(hey |hi |ok |okay )?(sophia[,:]?\s*)?/i, '')
    .replace(/^(please |can you |could you |let'?s |i want (you )?to |i need (you )?to |we need to )+/i, '')
    .replace(/^(create|open|start|kick off|begin) (a |the )?(new )?(mission|project|task)( to| for|:)?\s*/i, '')
    .replace(/[.!?\s]+$/, '')
    .trim();
  const title = subject || command.trim();
  return title.charAt(0).toUpperCase() + title.slice(1);
}

/** `Research` + `Research competitor pricing` is just `Research competitor pricing`, not `Research: Research ...`. */
function taskLabel(kind: string, subject: string): string {
  return subject.toLowerCase().startsWith(kind.toLowerCase().split(' ')[0]) ? subject : `${kind}: ${subject}`;
}

/**
 * A planner with no model behind it: keyword rules. It is what runs in the office's demo
 * mode, and what the server falls back to when Claude Code is not available, so the whole
 * command loop works with nothing installed.
 */
export function builtInPlan(command: string, snapshot: OfficeSnapshot): Plan {
  const open = snapshot.missions.filter((mission) => mission.status !== 'done');

  // "close M-3", "M-3 is done", "close everything"
  if (/\b(close|finish|complete|wrap up|done|shut)\b/i.test(command)) {
    const named = [...command.matchAll(/\bM-?(\d+)\b/gi)].map((match) => `M-${match[1]}`);
    const targets = /\b(all|every(thing)?)\b/i.test(command) ? open.map((mission) => mission.id) : named.filter((id) => open.some((mission) => mission.id === id));
    if (targets.length > 0) {
      return { reply: `Closing ${targets.join(', ')}. Everyone on ${targets.length > 1 ? 'them' : 'it'} is free again.`, actions: targets.map((missionId) => ({ type: 'close_mission', missionId })) };
    }
    if (named.length > 0) return { reply: `I can't find an open mission called ${named.join(', ')}.`, actions: [] };
  }

  // "status", "what's everyone doing?"
  if (/\b(status|what'?s (happening|going on|everyone doing)|who is (busy|working)|update me|report)\b/i.test(command)) {
    const busy = EMITTING_AGENTS.filter((agent) => (snapshot.agents[agent.id]?.state ?? 'idle') !== 'idle');
    const missions = open.length ? `${open.length} open mission${open.length > 1 ? 's' : ''}: ${open.map((mission) => `${mission.id} ${mission.title}`).join('; ')}.` : 'No open missions.';
    return { reply: `${missions} ${busy.length ? `${busy.map((agent) => displayName(snapshot, agent.id)).join(', ')} ${busy.length > 1 ? 'are' : 'is'} busy.` : 'Everyone is idle.'}`, actions: [] };
  }

  // Anything else is new work: open a mission and staff it by keyword.
  const title = missionTitle(command);
  const short = title.length > 44 ? `${title.slice(0, 43).trimEnd()}…` : title;
  const assignments: Assignment[] = [];
  for (const department of DEPARTMENTS) {
    if (!department.words.test(command)) continue;
    for (const [agentId, kind] of department.assignments) {
      if (!assignments.some((existing) => existing.agentId === agentId)) assignments.push({ agentId, task: taskLabel(kind, short), stage: defaultStage(agentId) });
    }
  }
  if (assignments.length === 0) assignments.push({ agentId: 'research.scout', task: `Scoping: ${short}`, stage: 1 });
  const names = assignments.slice(0, MAX_ASSIGNMENTS).map((assignment) => displayName(snapshot, assignment.agentId));
  return {
    reply: `On it. I've opened a mission and briefed ${names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0]}. ${displayName(snapshot, COORDINATOR_ID)} is coordinating.`,
    actions: [{ type: 'create_mission', title, assignments: assignments.slice(0, MAX_ASSIGNMENTS) }],
  };
}
