/**
 * Carrying out a command to the Chief of Staff.
 *
 *   request -> brain -> plan -> checked -> events appended to the log, one after another
 *
 * This is the only part of the server that writes events. It writes them to the same log
 * as everything else, so the office sees a command play out exactly as it would see real
 * agents reporting in: Sophia reads the request, missions open, agents start work.
 */
import { CHIEF_OF_STAFF_ID, parsePlan, planToEvents, type OfficeSnapshot, type PlannedEvent } from '@sc45/shared';
import fs from 'node:fs';
import path from 'node:path';
import { appendEvent, type BusPaths } from '@sc45/bus';
import type { Brain } from './brain.ts';
import type { Projects } from './projects.ts';
import type { Workers } from './workers.ts';

export interface CommandResult {
  /** What the Chief of Staff says back. */
  reply: string;
  /** One line per thing done, e.g. `Opened M-4 "Relay landing page": Mika, Ada, Leo`. */
  summary: string[];
  /** Parts of the plan that were ignored because they were not valid. */
  dropped: string[];
  brain: string;
  note?: string;
}

export interface Commander {
  busy(): boolean;
  /** Plan and start carrying out one request. Resolves once the plan is made; `finished` resolves when its last event is written. */
  /**
   * `attached` is a folder of files Stephen sent with the request, and their paths inside it.
   * They go to the first mission the request starts; if it starts none (Sophia asks a question
   * first), they are kept for the next request that does.
   */
  run(request: string, attached?: Attached): Promise<CommandResult & { finished: Promise<void> }>;
}

/** Files sent with a request: the folder they were saved in, and each one's path inside it. */
export interface Attached {
  dir: string;
  files: string[];
}

export interface CommanderOptions {
  paths: BusPaths;
  brain: Brain;
  /** The current state, including everything in the log up to now. */
  currentSnapshot: () => OfficeSnapshot;
  /** Pause between the events of one plan, so the office shows them one at a time. */
  stepMs?: number;
  /**
   * When both are given, agents do their tasks for real: every new mission must name a
   * project, and each task on it is handed to a worker once the plan has been written.
   */
  workers?: Workers;
  projects?: Projects;
}

/** How many past requests and replies the Chief of Staff is reminded of. */
const HISTORY_KEPT = 6;

const shorten = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);
const pause = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function createCommander(options: CommanderOptions): Commander {
  const stepMs = options.stepMs ?? 650;
  let running = false;
  // The conversation so far, so that "the Relay one" or "a new project called Atlas" can be understood.
  // Kept in memory only: restarting the server starts a new conversation.
  const history: Array<{ request: string; reply: string }> = [];
  // Files sent with a request that has not started a mission yet.
  let waiting: Attached | null = null;

  const write = (event: PlannedEvent) => appendEvent({ ...event, ts: new Date().toISOString() }, options.paths);
  const chief = (state: 'working' | 'idle', task?: string) => write({ type: 'agent.state', agentId: CHIEF_OF_STAFF_ID, state, ...(task ? { task } : {}) });

  return {
    busy: () => running,
    async run(request, attached) {
      if (running) throw new Error('The Chief of Staff is still working on the previous request.');
      running = true;
      try {
        chief('working', `Reading: ${shorten(request, 60)}`);
        const real = options.workers && options.projects ? { workers: options.workers, projects: options.projects } : null;
        const folders = real?.projects.list();
        if (attached?.files.length) waiting = attached;
        const answer = await options.brain(request, options.currentSnapshot(), { projects: folders, history: [...history], ...(waiting ? { attachments: waiting.files } : {}) });
        const snapshot = options.currentSnapshot();
        // Only a plan from Claude Code is held to the project rule: the built-in planner knows nothing of projects, and starts no workers.
        const working = real && answer.brain === 'claude-code' ? real : null;
        const checked = parsePlan(answer.plan, snapshot, working ? { projects: folders } : {});
        if (!checked.ok) throw new Error(`The plan could not be used: ${checked.error}.`);
        const work = planToEvents(checked.plan, snapshot);
        // A mission with no project was dropped. If nothing else came of the request, the reply
        // would claim work that is not happening, so ask the question instead.
        let reply = checked.plan.reply;
        if (checked.needsProject && work.events.length === 0) {
          reply = folders?.length ? `Which project is this for: a new one (tell me its name), or one of ${folders.join(', ')}?` : 'Which project is this for? Give me a name and I will start a new project folder.';
        }
        history.push({ request, reply });
        if (history.length > HISTORY_KEPT) history.splice(0, history.length - HISTORY_KEPT);
        // Work on a mission that is being closed stops now, not after the plan has played out.
        for (const missionId of work.closed) real?.workers.cancelMission(missionId);

        // What Stephen attached goes into the project folder of each mission this request starts,
        // under attachments/, where the agents on it can read it.
        let note = answer.note;
        if (waiting && working && work.jobs.length > 0) {
          const sent = waiting;
          waiting = null;
          for (const slug of new Set(work.jobs.map((job) => job.project.slug))) {
            const target = path.join(working.projects.ensure(slug), 'attachments');
            fs.cpSync(sent.dir, target, { recursive: true });
            for (const job of work.jobs) {
              if (job.project.slug !== slug) continue;
              job.attachments = sent.files.map((file) => `attachments/${file}`);
            }
            const missionId = work.jobs.find((job) => job.project.slug === slug)!.missionId;
            // Shown in the office as files Sophia filed, so they appear with the mission's work.
            for (const file of sent.files.slice(0, 10)) work.events.push({ type: 'agent.output', agentId: CHIEF_OF_STAFF_ID, missionId, task: 'Attached', meta: { path: `${slug}/attachments/${file}` } });
          }
        } else if (waiting && !working) {
          waiting = null;
          note = [note, 'The attached files were not used: agents are only planning here, not doing real work.'].filter(Boolean).join(' ');
        } else if (waiting && attached?.files.length) {
          note = [note, 'The attached files are kept for your next request: this one did not start a mission.'].filter(Boolean).join(' ');
        }

        // Write the events one at a time in the background, then let Sophia go.
        const finished = (async () => {
          try {
            if (work.events.length > 0) chief('working', 'Briefing the team');
            for (const event of work.events) {
              if (stepMs > 0) await pause(stepMs);
              write(event);
            }
            if (stepMs > 0) await pause(stepMs);
            chief('idle');
            // Everyone has been briefed: the work itself starts.
            if (working && work.jobs.length > 0) working.workers.enqueue(work.jobs);
          } finally {
            running = false;
          }
        })();

        const result: CommandResult = { reply, summary: work.summary, dropped: checked.dropped, brain: answer.brain };
        if (note) result.note = note;
        return { ...result, finished };
      } catch (error) {
        chief('idle');
        running = false;
        throw error;
      }
    },
  };
}
