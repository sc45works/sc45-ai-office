/**
 * SC45 AI Office: where events come from.
 *
 * The office is driven only by events. The event contract itself lives in
 * `@sc45/shared`; this file is about delivery. There are two feeds, and anything
 * else that implements `OfficeFeed` can be swapped in without touching agents.ts
 * or scene.ts:
 *
 *   server feed   reads the local server's `/events` stream: the real thing
 *   mock feed     plays a scripted session in the browser, for when no server is running
 *
 * Every feed starts by handing over a snapshot (the whole current state), then
 * delivers events one at a time.
 */
import { DEMO_APPROVAL, DEMO_LOOP_SECONDS, DEMO_SCRIPT, emptySnapshot, parseEvent, resolveDemoEvent, type OfficeEvent, type OfficeSnapshot } from '@sc45/shared';

export type { AgentState, MissionStatus, OfficeEvent, OfficeSnapshot } from '@sc45/shared';

/** `demo`: the built-in script. `live`: connected to the server. `reconnecting`: the server went away. */
export type FeedStatus = 'demo' | 'live' | 'reconnecting';

export interface FeedListener {
  /** The whole current state. Sent first, and again after every reconnection. */
  onSnapshot(snapshot: OfficeSnapshot): void;
  onEvent(event: OfficeEvent): void;
  onStatus(status: FeedStatus): void;
}

export interface OfficeFeed {
  readonly kind: 'mock' | 'server';
  start(listener: FeedListener): void;
  /** Advance the feed's clock. Called once per frame with the seconds since the last call. */
  update(deltaSeconds: number): void;
  stop(): void;
}

// Server feed -----------------------------------------------------------------

const DEFAULT_SERVER = 'http://127.0.0.1:4545';

/**
 * Which server, if any, this page should try.
 *
 *   ?server=off              never; always play the demo
 *   ?server=http://host:port that server
 *   VITE_SERVER_URL          set at build time
 *   otherwise                the default local server, but only when the office itself is
 *                            being served from this machine (a hosted copy cannot reach it)
 */
export function serverUrlFromPage(): string | null {
  const requested = new URLSearchParams(window.location.search).get('server');
  if (requested === 'off') return null;
  if (requested) return requested.replace(/\/$/, '');
  const configured = import.meta.env.VITE_SERVER_URL as string | undefined;
  if (configured) return configured.replace(/\/$/, '');
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
  return local ? DEFAULT_SERVER : null;
}

/** True when the server answers its health check within the time limit. */
export async function serverIsUp(baseUrl: string, timeoutMs = 1200): Promise<boolean> {
  try {
    const response = await fetch(`${baseUrl}/health`, { signal: AbortSignal.timeout(timeoutMs) });
    return response.ok;
  } catch {
    return false;
  }
}

/** Live events from the local server, over Server-Sent Events. The browser reconnects by itself. */
export function createServerFeed(baseUrl: string): OfficeFeed {
  let source: EventSource | null = null;
  return {
    kind: 'server',
    start(listener) {
      source = new EventSource(`${baseUrl}/events`);
      source.addEventListener('snapshot', (message) => {
        listener.onSnapshot(JSON.parse((message as MessageEvent<string>).data) as OfficeSnapshot);
        listener.onStatus('live');
      });
      source.addEventListener('event', (message) => {
        const parsed = parseEvent(JSON.parse((message as MessageEvent<string>).data));
        if (parsed.ok) listener.onEvent(parsed.event);
      });
      source.onerror = () => listener.onStatus('reconnecting');
    },
    update() {
      // Nothing to do: the server sets the pace.
    },
    stop() {
      source?.close();
      source = null;
    },
  };
}

// Mock feed -------------------------------------------------------------------

export interface MockFeedOptions {
  /** 1 is real time; 2 plays the script twice as fast. */
  speed?: number;
}

/** Plays the demo script on a loop. Deterministic: the same events in the same order every time. */
export function createMockFeed(options: MockFeedOptions = {}): OfficeFeed {
  const speed = options.speed ?? 1;
  const steps = [...DEMO_SCRIPT].sort((a, b) => a.at - b.at);
  let listener: FeedListener | null = null;
  let clock = 0;
  let next = 0;
  let loop = 0;

  return {
    kind: 'mock',
    start(target) {
      listener = target;
      clock = 0;
      next = 0;
      loop = 0;
      listener.onStatus('demo');
      listener.onSnapshot(emptySnapshot());
    },
    update(deltaSeconds) {
      if (!listener) return;
      clock += deltaSeconds * speed;
      const before = clock - deltaSeconds * speed;
      while (next < steps.length && steps[next].at <= clock) listener.onEvent(resolveDemoEvent(steps[next++], loop));
      // Once, the first time round: a request for sign-off, so the card can be seen without a server.
      if (loop === 0 && before < DEMO_APPROVAL.at && clock >= DEMO_APPROVAL.at) listener.onEvent(resolveDemoEvent(DEMO_APPROVAL, loop));
      if (clock >= DEMO_LOOP_SECONDS) {
        clock -= DEMO_LOOP_SECONDS;
        next = 0;
        loop += 1;
      }
    },
    stop() {
      listener = null;
    },
  };
}
