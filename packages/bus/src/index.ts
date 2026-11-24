/**
 * @sc45/bus: the event bus.
 *
 * The bus is a plain text file, `data/events.jsonl`, with one JSON event per line.
 * Writers only ever append to it; readers follow it. Because it is just a file, agents
 * can log events whether or not the server is running, and the log doubles as the audit
 * trail.
 *
 * Node only (it uses the file system). Paths are built with `path.join`, so the same code
 * runs on macOS and Windows.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseEvent, type OfficeEvent, type OfficeSnapshot } from '@sc45/shared';

export interface BusPaths {
  dir: string;
  /** The live log: today's events. */
  log: string;
  /** Finished days, one file each. */
  archiveDir: string;
  /** The office's state at the last rotation, so earlier days need not be replayed. */
  snapshot: string;
}

/** `<repo>/data`, or wherever `SC45_DATA_DIR` points. */
export function defaultDataDir(): string {
  if (process.env.SC45_DATA_DIR) return path.resolve(process.env.SC45_DATA_DIR);
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.join(here, '..', '..', '..', 'data');
}

export function busPaths(dir: string = defaultDataDir()): BusPaths {
  return {
    dir,
    log: path.join(dir, 'events.jsonl'),
    archiveDir: path.join(dir, 'archive'),
    snapshot: path.join(dir, 'snapshot.json'),
  };
}

/** A calendar day in local time, `YYYY-MM-DD`. Rotation follows the clock on the wall, not UTC. */
export function localDay(date: Date = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Append one event to the log. Throws if the event is not well formed, so a bad event
 * never reaches the file.
 */
export function appendEvent(event: OfficeEvent, paths: BusPaths = busPaths()): OfficeEvent {
  const parsed = parseEvent(event);
  if (!parsed.ok) throw new Error(`Not a valid event: ${parsed.error}`);
  fs.mkdirSync(paths.dir, { recursive: true });
  fs.appendFileSync(paths.log, `${JSON.stringify(parsed.event)}\n`, 'utf8');
  return parsed.event;
}

export interface ReadResult {
  events: OfficeEvent[];
  /** How many bytes of the file were read as complete lines. A follower starts from here. */
  bytes: number;
  /** Lines that were not valid events, and so were ignored. */
  skipped: number;
}

/** Split a chunk of the log into events, leaving any unfinished last line unread. */
function readLines(buffer: Buffer): ReadResult {
  const events: OfficeEvent[] = [];
  let skipped = 0;
  let start = 0;
  for (;;) {
    const end = buffer.indexOf(0x0a, start);
    if (end === -1) break; // no newline yet: the writer is mid-line, so wait for the rest
    const line = buffer.toString('utf8', start, end).trim();
    start = end + 1;
    if (!line) continue;
    try {
      const parsed = parseEvent(JSON.parse(line));
      if (parsed.ok) events.push(parsed.event);
      else skipped += 1;
    } catch {
      skipped += 1;
    }
  }
  return { events, bytes: start, skipped };
}

/** Read every complete event currently in the log. A missing log is an empty one. */
export function readLog(paths: BusPaths = busPaths()): ReadResult {
  if (!fs.existsSync(paths.log)) return { events: [], bytes: 0, skipped: 0 };
  return readLines(fs.readFileSync(paths.log));
}

export interface Follower {
  /** Look for new events now, rather than waiting for the next tick. */
  poll(): void;
  /** Start again from the top of the file (after it has been rotated away). */
  rewind(): void;
  stop(): void;
}

/**
 * Call `onEvents` with each batch of events appended to the log after byte `from`.
 *
 * The file is checked on a timer rather than with a file-system watcher: watchers behave
 * differently on macOS, Windows and network drives, and a few stat calls a second cost nothing.
 */
export function followLog(
  paths: BusPaths,
  onEvents: (events: OfficeEvent[], skipped: number) => void,
  options: { from?: number; intervalMs?: number } = {},
): Follower {
  let offset = options.from ?? 0;

  function poll() {
    let size: number;
    try {
      size = fs.statSync(paths.log).size;
    } catch {
      offset = 0; // no file (yet, or any more): the next one starts from the top
      return;
    }
    if (size < offset) offset = 0; // the file was replaced by a shorter one
    if (size === offset) return;

    const chunk = Buffer.alloc(size - offset);
    const handle = fs.openSync(paths.log, 'r');
    try {
      fs.readSync(handle, chunk, 0, chunk.length, offset);
    } finally {
      fs.closeSync(handle);
    }
    const result = readLines(chunk);
    offset += result.bytes;
    if (result.events.length > 0 || result.skipped > 0) onEvents(result.events, result.skipped);
  }

  const timer = setInterval(poll, options.intervalMs ?? 200);
  return {
    poll,
    rewind() {
      offset = 0;
    },
    stop() {
      clearInterval(timer);
    },
  };
}

/** The local day of the first event in the log, or null when the log is empty or missing. */
export function logDay(paths: BusPaths = busPaths()): string | null {
  const first = readLog(paths).events[0];
  return first ? localDay(new Date(first.ts)) : null;
}

/**
 * Close a finished day: save the office's state, then move the log into the archive
 * under its date. The next event starts a fresh `events.jsonl`.
 */
export function rotateLog(paths: BusPaths, day: string, snapshot: OfficeSnapshot): string | null {
  if (!fs.existsSync(paths.log)) return null;
  fs.mkdirSync(paths.archiveDir, { recursive: true });
  saveSnapshot(paths, snapshot);

  // Never overwrite an archive: a second rotation for the same day gets a numbered name.
  let target = path.join(paths.archiveDir, `events-${day}.jsonl`);
  for (let copy = 2; fs.existsSync(target); copy++) target = path.join(paths.archiveDir, `events-${day}-${copy}.jsonl`);
  fs.renameSync(paths.log, target);
  return target;
}

export function saveSnapshot(paths: BusPaths, snapshot: OfficeSnapshot): void {
  fs.mkdirSync(paths.dir, { recursive: true });
  // Write to a temporary file and rename it, so a crash cannot leave half a snapshot behind.
  const temporary = `${paths.snapshot}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  fs.renameSync(temporary, paths.snapshot);
}

export function loadSnapshot(paths: BusPaths = busPaths()): OfficeSnapshot | null {
  try {
    const value = JSON.parse(fs.readFileSync(paths.snapshot, 'utf8')) as OfficeSnapshot;
    return value && typeof value === 'object' && value.agents && Array.isArray(value.missions) ? value : null;
  } catch {
    return null;
  }
}
