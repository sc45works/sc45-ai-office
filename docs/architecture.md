# AI Virtual Office Command Center — Architecture

The repository's copy of the architecture, updated to match what is built (Milestone 5, 14 November 2026).

Four layers, one direction of data flow: agents emit events, a local server streams them, the 3D office renders them.
No layer reaches past its neighbour, so each can be rebuilt or swapped on its own.
Runs on macOS and Windows alike (Node 22 and a browser).

## Design rules

1. Events only flow upward: Runtime → Event Bus → Server → Front end. The one thing that flows down is a request to the Chief of Staff, and its only effect is more events in the log.
2. Everything on disk is plain text: JSON lines for events, Markdown for memory and roles.
3. One schema is the contract. `packages/shared` defines every event type, the roster and the state reducer; all layers import it.
4. Mock first. Each layer runs against a fake version of the layer below, so the front end can be developed with no agents running.
5. No secrets in code. API keys live in `.env` files on the machine, never in the repo or chat.

## Layer 1 — Agent Runtime (Claude Code). Built: the Chief of Staff plans, and workers do the tasks.

- `company/chief-of-staff.md` holds the Chief of Staff's instructions, and `company/agents/<id>.md` each agent's skill. Still to come in `company/`: `memory/` for long-term notes.
- The Chief of Staff is the only agent the user talks to. A request goes to `POST /command`; a brain (Claude Code with all tools off, or built-in rules) answers with a plan; the plan is checked and becomes events.
- Workers (`packages/server/src/workers.ts`): for each task on a mission with a project, Claude Code is run once in that project's folder, briefed with `company/agents/<id>.md`. It has five file tools and nothing else; what it writes becomes `agent.output` events, and it ends by reporting.
- Projects (`projects/<name>/`): one folder per project. A mission names its project; Sophia asks when it is not clear.
- Agents report progress by calling `emit`: `pnpm --dir <repo> emit working dev.frontend "Building hero section"`.

## Layer 2 — Event Bus. Built: `packages/bus`.

- Append-only file `data/events.jsonl`, one JSON event per line.
- Event shape: `{ ts, type, agentId, deskId?, missionId?, state?, task?, meta? }`.
- Event types: `mission.created`, `mission.updated`, `mission.closed`, `agent.state` (idle, working, collaborating, blocked, reporting), `agent.moved`, `agent.output`.
- Rotated daily by the server: the finished day moves to `data/archive/events-YYYY-MM-DD.jsonl` and the state is saved to `data/snapshot.json`.
- Doubles as the audit log, and later the source for the per-agent graph.

## Layer 3 — Local Server (Node + Hono). Built: `packages/server`.

- Replays the log on start, then follows it and pushes new lines to the browser over Server-Sent Events at `/events`.
- `GET /state`: the current snapshot (agents, missions, roster). `GET /health`.
- `GET /agents/:id/graph`: what one agent has touched, built from events only.
- `POST /command`: a request to the Chief of Staff. The only route that causes events to be written.
- Stateless beyond an in-memory snapshot rebuilt from the log on start.
- Runs on `127.0.0.1:4545`; the same command on Mac and Windows.

## Layer 4 — Front end (Vite + TypeScript + Three.js). Built: `packages/office`.

- `layout.ts` is the single source of placement.
- `events.ts` (server feed and built-in demo feed), `agents.ts` (avatars, state machine, walking), `navigation.ts` (routes).
- `panel.ts` (side panel on click) and `graph.ts` (hologram of connected missions, tasks, folders and files per agent).
- `command.ts`: the command bar. It sends requests to the server when live, and plans them locally in demo mode.

## Repository layout (pnpm workspaces)

```
command-center/
  packages/shared/      event schema, roster, state reducer, demo script; used by all layers
  packages/bus/         the event log: append, read, follow, rotate
  packages/server/      local SSE + REST server
  packages/office/      the Three.js front end
  company/              agents, missions, memory (Markdown): arrives with Layer 1
  data/                 events.jsonl, archive/, snapshot.json (git-ignored)
  scripts/emit.ts       the command agents call to log events
  scripts/demo.ts       plays a scripted session into the log
  tests/                contract, log and server tests
  docs/                 brief, org chart, this architecture
```

Two things differ from the first draft of this document:

- `packages/bus` is its own package, because both the server and `emit` need to read and write the log, and neither should depend on the other.
- The scripts are TypeScript run with `tsx` (`scripts/emit.ts`), not plain `.js`, so they import the same contract as everything else.

## Cross-platform notes

- Node 22.12 or newer, pnpm, and a Chromium or Safari browser cover both machines.
- Paths go through `path.join`, never hard-coded slashes. Line endings are normalised by `.gitattributes`.
- The log is followed by checking its size on a timer, not with a file-system watcher, because watchers behave differently on macOS and Windows.
- Voice (Milestone 5): the Web Speech API in the browser works on both.

## Milestones

1. Static office. Done.
2. Avatars and state machine driven by a mock event feed in the browser. Done.
3. Event bus and server: real `events.jsonl`, SSE stream, office goes live with the `emit` CLI. Done.
4. Click an agent: side panel and hologram graph of connected files and tasks. Done.
5. Chief of Staff: type or speak a request, watch it dispatch across the office, and the agents do the work. Done.
6. Pulse routines and the mission board filling itself.

## Decisions made

- Server framework: Hono.
- Avatar style: low-poly humanoid.
- A brain never acts directly: it returns a plan, which the server checks and turns into events. For planning, Claude Code runs with every tool switched off.
- A worker is Claude Code with file tools only, confined to one project folder, with a time limit. No shell, no web.

- The graph is built from events only: agents report files with an `agent.output` event. No folder scanning.

## Open decisions

- None at the moment.
