/**
 * @sc45/server: the local server.
 *
 * It does three things and holds no state of its own beyond a snapshot it can always
 * rebuild from the log:
 *
 *   1. On start, replays `data/events.jsonl` (on top of the snapshot saved at the last
 *      rotation) to work out the current state of the office.
 *   2. Follows the log and pushes each new event to connected browsers over
 *      Server-Sent Events at `/events`.
 *   3. Answers `GET /state` with the current snapshot.
 *
 * Events flow one way, from the log out to the office. The one thing that comes back the
 * other way is a command to the Chief of Staff (`POST /command`, see command.ts), and even
 * that only ever results in more events being appended to the log.
 */
import fs from 'node:fs';
import path from 'node:path';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { streamSSE } from 'hono/streaming';
import { AGENTS, COMMAND_MAX_LENGTH, activeMissionCount, applyEvent, buildAgentGraph, emptySnapshot, findAgent, parseProfileChange, type OfficeEvent, type OfficeSnapshot } from '@sc45/shared';
import { appendEvent, busPaths, followLog, loadSnapshot, localDay, logDay, readLog, rotateLog, type BusPaths } from '@sc45/bus';
import { builtInBrain, type Brain } from './brain.ts';
import { createCommander, type Attached } from './command.ts';
import { projectsIn, type Projects } from './projects.ts';
import { createWorkers, type WorkerOptions, type Workers } from './workers.ts';

export interface OfficeServerOptions {
  /** Where the log lives. Defaults to `<repo>/data` or `SC45_DATA_DIR`. */
  dataDir?: string;
  /** How often the log is checked for new events, in milliseconds. */
  pollMs?: number;
  /** How often an idle event stream is sent a keep-alive line, in milliseconds. */
  keepAliveMs?: number;
  /** What turns a request to the Chief of Staff into a plan. Defaults to the built-in planner. */
  brain?: Brain;
  /** Pause between the events of one command, in milliseconds. */
  commandStepMs?: number;
  /**
   * Give this for agents to do their tasks for real (see workers.ts). Left out, missions are
   * planned and shown but nobody does the work.
   */
  workers?: Partial<Omit<WorkerOptions, 'projects' | 'write' | 'scratchDir'>> & { projectsDir?: string };
  /** Called for every event applied, e.g. to print it. */
  onEvent?: (event: OfficeEvent) => void;
  /** The current time; replaceable in tests. */
  now?: () => Date;
}

export interface OfficeServer {
  app: Hono;
  paths: BusPaths;
  snapshot(): OfficeSnapshot;
  /** How many events were replayed from the log at start, and how many lines were unreadable. */
  replayed: { events: number; skipped: number };
  clients(): number;
  /** The workers, when agents do real work; and where their projects are. */
  workers: Workers | null;
  projects: Projects | null;
  /** Check the log, and the calendar, now. */
  poll(): void;
  stop(): void;
}

type Listener = (event: OfficeEvent, seq: number) => void;

/** Browsers on this machine only: the office in development (any localhost port). */
function allowedOrigin(origin: string): string | null {
  try {
    const { hostname } = new URL(origin);
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]' ? origin : null;
  } catch {
    return null;
  }
}

export function createOfficeServer(options: OfficeServerOptions = {}): OfficeServer {
  const paths = busPaths(options.dataDir);
  const now = options.now ?? (() => new Date());
  const listeners = new Set<Listener>();

  // 1. Rebuild the current state: the snapshot from the last rotation, plus today's log.
  const snapshot: OfficeSnapshot = loadSnapshot(paths) ?? emptySnapshot();
  for (const [id, status] of Object.entries(emptySnapshot().agents)) snapshot.agents[id] ??= status; // agents added to the roster since
  snapshot.profiles ??= {}; // a snapshot saved before profiles existed
  snapshot.recent ??= [];
  snapshot.usage ??= { costUsd: 0, runs: 0 };
  snapshot.approvals ??= [];
  snapshot.activity ??= {}; // a snapshot saved before activity was recorded
  const initial = readLog(paths);
  for (const event of initial.events) applyEvent(snapshot, event);
  let skipped = initial.skipped;

  // 2. Follow the log from where the replay stopped.
  const follower = followLog(
    paths,
    (events, unreadable) => {
      skipped += unreadable;
      for (const event of events) {
        applyEvent(snapshot, event);
        options.onEvent?.(event);
        for (const listener of listeners) listener(event, snapshot.seq);
      }
    },
    { from: initial.bytes, intervalMs: options.pollMs ?? 200 },
  );

  // Daily rotation: when the date changes, archive the finished day's log.
  let day = logDay(paths) ?? localDay(now());
  function rotateIfNewDay() {
    const today = localDay(now());
    if (today === day) return;
    follower.poll(); // take in anything written just before midnight
    rotateLog(paths, day, snapshot);
    follower.rewind();
    day = today;
  }
  rotateIfNewDay();
  const calendar = setInterval(rotateIfNewDay, 30_000);

  // 3. HTTP ------------------------------------------------------------------

  const app = new Hono();
  app.use('*', cors({ origin: (origin) => allowedOrigin(origin) }));

  app.get('/', (c) =>
    c.json({
      name: 'sc45-command-center',
      endpoints: {
        'GET /health': 'is the server up',
        'GET /state': 'the current snapshot: agents, missions, roster',
        'POST /agents/:id/profile': 'change a name or an appearance',
        'GET /events': 'Server-Sent Events: one "snapshot", then an "event" per new line of the log',
        'GET /agents/:id/graph': 'what one agent has touched: missions, tasks, folders, files',
        'POST /command': 'a request to the Chief of Staff, as JSON: {"text": "...", "attachments": "<batch>"}',
        'POST /attachments/<batch>?path=<name>': 'one file to go with the next request, as its bytes',
        'GET /projects': 'the project folders agents work in',
        'GET /workers': 'the agents doing real work right now, and those waiting',
        'GET /files/<project>/<path>': 'one file an agent made, to look at (read-only)',
        'GET /approvals': 'what is waiting for sign-off',
        'POST /approvals/:id': 'sign off or decline, as JSON: {"decision": "approved" | "declined", "note": "..."}',
      },
    }),
  );

  app.get('/health', (c) => c.json({ ok: true, seq: snapshot.seq, clients: listeners.size, log: paths.log, skippedLines: skipped }));

  app.get('/state', (c) => c.json({ ...snapshot, activeMissions: activeMissionCount(snapshot), roster: AGENTS }));

  app.get('/events', (c) =>
    streamSSE(c, async (stream) => {
      // A browser that connects (or reconnects) first gets the whole current state, then live events.
      // The state is captured and the listener registered in the same breath, before anything is
      // awaited, so no event can fall into a gap between the two.
      const opening = { event: 'snapshot', id: String(snapshot.seq), data: JSON.stringify(snapshot) };
      const listener: Listener = (event, seq) => {
        stream.writeSSE({ event: 'event', id: String(seq), data: JSON.stringify(event) }).catch(() => listeners.delete(listener));
      };
      listeners.add(listener);
      stream.onAbort(() => {
        listeners.delete(listener);
      });
      await stream.writeSSE(opening);

      // Keep the connection open, with a comment line now and then so proxies and browsers do not drop it.
      while (!stream.aborted && !stream.closed) {
        await stream.sleep(options.keepAliveMs ?? 15_000);
        if (stream.aborted || stream.closed) break;
        await stream.write(': keep-alive\n\n');
      }
      listeners.delete(listener);
    }),
  );

  app.get('/agents/:id/graph', (c) => {
    const id = c.req.param('id');
    if (!findAgent(id)) return c.json({ error: `There is no agent "${id}".` }, 404);
    return c.json(buildAgentGraph(snapshot, id));
  });
  // Real work, if it is switched on.
  const projects = options.workers ? projectsIn(options.workers.projectsDir) : null;
  const workers =
    options.workers && projects
      ? createWorkers({ ...options.workers, projects, scratchDir: path.join(paths.dir, 'workers'), write: (event) => appendEvent({ ...event, ts: now().toISOString() }, paths) })
      : null;
  app.get('/projects', (c) => c.json({ enabled: Boolean(projects), dir: projects?.dir ?? null, projects: projects?.list() ?? [] }));
  app.get('/workers', (c) => c.json({ enabled: Boolean(workers), workers: workers?.list() ?? [] }));

  // Looking at the work: any file inside the projects folder, read-only. A page an agent built is
  // shown, but sandboxed: it runs as a stranger to this server, so nothing in it can give
  // commands or sign anything off, whatever an agent wrote into it.
  const FILE_TYPES: Record<string, string> = {
    '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
  };
  app.get('/files/*', (c) => {
    if (!projects) return c.json({ error: 'Agents are not doing real work here, so there are no files.' }, 404);
    let wanted: string;
    try {
      wanted = decodeURIComponent(c.req.path.slice('/files/'.length));
    } catch {
      return c.json({ error: 'That is not a usable path.' }, 400);
    }
    try {
      const root = fs.realpathSync(projects.dir);
      const file = fs.realpathSync(path.resolve(root, wanted)); // follows links, so a link out of the folder is caught below
      if (!file.startsWith(root + path.sep) || !fs.statSync(file).isFile()) throw new Error('outside');
      const type = FILE_TYPES[path.extname(file).toLowerCase()] ?? 'text/plain; charset=utf-8';
      return new Response(fs.readFileSync(file), {
        headers: { 'content-type': type, 'content-security-policy': 'sandbox allow-scripts', 'x-content-type-options': 'nosniff', 'cache-control': 'no-store' },
      });
    } catch {
      return c.json({ error: 'There is no such file in the projects folder.' }, 404);
    }
  });

  // Requests for sign-off left over from before this server started guarded work that is no
  // longer waiting anywhere (the queue is kept in memory). Say so in the log, rather than leave
  // a request on screen that approving could do nothing about.
  for (const approval of [...snapshot.approvals]) {
    const ts = now().toISOString();
    appendEvent({ ts, type: 'approval.decided', agentId: approval.requestedBy, missionId: approval.missionId, task: 'The server restarted before this was answered', meta: { approvalId: approval.id, decision: 'lapsed', kind: approval.kind } }, paths);
    const waiting = approval.kind === 'close' ? [approval.requestedBy] : approval.items.map((item) => item.agentId);
    for (const agentId of new Set(waiting)) {
      if (snapshot.agents[agentId]?.state === 'blocked' && snapshot.agents[agentId]?.missionId === approval.missionId) appendEvent({ ts, type: 'agent.state', agentId, state: 'idle' }, paths);
    }
  }

  app.get('/approvals', (c) => c.json({ enabled: Boolean(workers), approvals: snapshot.approvals }));

  // Stephen's answer to a request for sign-off. Like commands, only from this machine's own pages.
  app.post('/approvals/:id', async (c) => {
    const origin = c.req.header('origin');
    if (origin && !allowedOrigin(origin)) return c.json({ error: 'Sign-offs are only accepted from this machine.' }, 403);
    if (!(c.req.header('content-type') ?? '').includes('application/json')) return c.json({ error: 'Send the decision as JSON: {"decision": "approved" | "declined", "note": "..."}' }, 415);
    let body: { decision?: unknown; note?: unknown };
    try {
      body = (await c.req.json()) as typeof body;
    } catch {
      return c.json({ error: 'The request body is not valid JSON.' }, 400);
    }
    if (body.decision !== 'approved' && body.decision !== 'declined') return c.json({ error: '"decision" must be "approved" or "declined".' }, 400);
    if (body.note !== undefined && (typeof body.note !== 'string' || body.note.length > 300)) return c.json({ error: 'Keep the note under 300 characters.' }, 400);
    if (!workers?.decide(c.req.param('id'), body.decision, body.note as string | undefined)) return c.json({ error: 'That request is no longer waiting.' }, 404);
    return c.json({ ok: true, id: c.req.param('id'), decision: body.decision });
  });

  // A command to the Chief of Staff.
  const commander = createCommander({
    paths,
    ...(workers && projects ? { workers, projects } : {}),
    brain: options.brain ?? builtInBrain,
    stepMs: options.commandStepMs,
    currentSnapshot: () => {
      follower.poll(); // take in anything written since the last tick, so mission numbers never clash
      return snapshot;
    },
  });

  // Change what someone is called or looks like. It becomes an `agent.profile` event in the log,
  // so every open office sees it, and it is still there after a restart.
  app.post('/agents/:id/profile', async (c) => {
    const origin = c.req.header('origin');
    if (origin && !allowedOrigin(origin)) return c.json({ error: 'Changes are only accepted from this machine.' }, 403);
    if (!(c.req.header('content-type') ?? '').includes('application/json')) return c.json({ error: 'Send the change as JSON: {"name": "...", "appearance": {...}}' }, 415);
    const agent = findAgent(c.req.param('id'));
    if (!agent) return c.json({ error: `There is no one with the id "${c.req.param('id')}".` }, 404);
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: 'The request body is not valid JSON.' }, 400);
    }
    const checked = parseProfileChange(body);
    if (!checked.ok) return c.json({ error: checked.error }, 400);
    appendEvent({ ts: now().toISOString(), type: 'agent.profile', agentId: agent.id, meta: { ...checked.change } }, paths);
    return c.json({ ok: true, id: agent.id, ...checked.change });
  });

  // Files to go with a request. The office sends each one here first, all under one batch id it
  // makes up, then names the batch in the command. They are kept in the data folder, out of the
  // agents' reach, until a mission is started for them.
  const ATTACH = { maxFile: 15 * 1024 * 1024, maxBatch: 40 * 1024 * 1024, maxFiles: 40 };
  const attachmentsDir = path.join(paths.dir, 'attachments');
  const batchFolder = (batch: string) => (/^[a-z0-9]{8,40}$/.test(batch) ? path.join(attachmentsDir, batch) : null);
  /** A path as sent, made safe: no climbing out, no odd characters, not too deep. Null if nothing usable is left. */
  const safePath = (wanted: string): string | null => {
    const parts = wanted
      .split(/[\\/]+/)
      .map((part) => part.replace(/[^\p{L}\p{N}._ -]/gu, '_').replace(/^\.+/, '').trim().slice(0, 80))
      .filter(Boolean);
    return parts.length > 0 && parts.length <= 6 ? parts.join('/') : null;
  };
  const filesIn = (dir: string, prefix = ''): Array<{ file: string; bytes: number }> =>
    fs.existsSync(dir)
      ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
          entry.isDirectory() ? filesIn(path.join(dir, entry.name), `${prefix}${entry.name}/`) : [{ file: `${prefix}${entry.name}`, bytes: fs.statSync(path.join(dir, entry.name)).size }],
        )
      : [];

  app.post('/attachments/:batch', async (c) => {
    const origin = c.req.header('origin');
    if (origin && !allowedOrigin(origin)) return c.json({ error: 'Files are only accepted from this machine.' }, 403);
    // Not a type a plain web form can send, so a page on another site cannot post here without asking first (and being refused).
    if (!(c.req.header('content-type') ?? '').includes('application/octet-stream')) return c.json({ error: 'Send the file as its bytes, with the content type application/octet-stream.' }, 415);
    const folder = batchFolder(c.req.param('batch'));
    const name = safePath(c.req.query('path') ?? '');
    if (!folder || !name) return c.json({ error: 'That is not a usable name for an attachment.' }, 400);
    if (Number(c.req.header('content-length') ?? 0) > ATTACH.maxFile) return c.json({ error: `Each file can be up to ${ATTACH.maxFile / 1024 / 1024} MB.` }, 413);
    const bytes = Buffer.from(await c.req.arrayBuffer());
    if (bytes.length > ATTACH.maxFile) return c.json({ error: `Each file can be up to ${ATTACH.maxFile / 1024 / 1024} MB.` }, 413);
    const already = filesIn(folder);
    if (already.length >= ATTACH.maxFiles) return c.json({ error: `Up to ${ATTACH.maxFiles} files can go with one request.` }, 413);
    if (already.reduce((sum, entry) => sum + entry.bytes, 0) + bytes.length > ATTACH.maxBatch) return c.json({ error: `Up to ${ATTACH.maxBatch / 1024 / 1024} MB can go with one request.` }, 413);
    const target = path.join(folder, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, bytes);
    return c.json({ ok: true, path: name, bytes: bytes.length });
  });

  app.post('/command', async (c) => {
    // Only this machine's own pages may give commands. A page on another site cannot even try:
    // the JSON content type forces the browser to ask permission first, and it is refused.
    const origin = c.req.header('origin');
    if (origin && !allowedOrigin(origin)) return c.json({ error: 'Commands are only accepted from this machine.' }, 403);
    if (!(c.req.header('content-type') ?? '').includes('application/json')) return c.json({ error: 'Send the command as JSON: {"text": "..."}' }, 415);

    let text: unknown;
    let attached: Attached | undefined;
    try {
      const body = (await c.req.json()) as { text?: unknown; attachments?: unknown };
      text = body.text;
      if (typeof body.attachments === 'string') {
        const folder = batchFolder(body.attachments);
        const files = folder ? filesIn(folder).map((entry) => entry.file) : [];
        if (folder && files.length > 0) attached = { dir: folder, files };
      }
    } catch {
      return c.json({ error: 'The request body is not valid JSON.' }, 400);
    }
    if (typeof text !== 'string' || !text.trim()) return c.json({ error: 'The command is empty.' }, 400);
    if (text.length > COMMAND_MAX_LENGTH) return c.json({ error: `Keep the command under ${COMMAND_MAX_LENGTH} characters.` }, 400);
    if (commander.busy()) return c.json({ error: 'Sophia is still working on the previous request. Try again in a moment.' }, 409);

    try {
      const { finished, ...result } = await commander.run(text.trim(), attached);
      void finished;
      return c.json(result);
    } catch (error) {
      return c.json({ error: (error as Error).message }, 502);
    }
  });

  return {
    app,
    paths,
    snapshot: () => snapshot,
    replayed: { events: initial.events.length, skipped: initial.skipped },
    clients: () => listeners.size,
    workers,
    projects,
    poll() {
      rotateIfNewDay();
      follower.poll();
    },
    stop() {
      clearInterval(calendar);
      workers?.stop();
      follower.stop();
      listeners.clear();
    },
  };
}
