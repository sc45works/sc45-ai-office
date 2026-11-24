# @sc45/office

The 3D office: Layer 4 of the command center. It renders the event stream and nothing else.
Run it from the repository root with `pnpm dev`; see the root README for everything else.

## Controls

- Drag to orbit, scroll or pinch to zoom, right-drag or two-finger drag to pan.
- `R` (or the Reset view button) eases back to the overview.
- Zoom in to see every agent's name, with its role or current task underneath.
- Click or tap an agent to follow it, with a side panel and a graph of what it has touched. Escape goes back.

## What the five states look like

| State | Where the agent goes | How it looks |
| --- | --- | --- |
| `idle` | Own desk, or the lounge | Outline dimmed; name tag shows the role |
| `working` | Own desk | Typing; outline bright; task label pulsing slowly |
| `collaborating` | Another desk or the meeting room | Walks there leaving a trail of light; gestures |
| `blocked` | Own desk | Slumped; outline and a ring on the floor turn red |
| `reporting` | Beside the Chief of Staff | A beam in the spark gradient joins them; she turns to look |

## Files

```
src/layout.ts        ALL placement data: zones, desks, seats, plants, palette
src/events.ts        where events come from: the server feed and the built-in demo feed
src/scene.ts         builds the 3D office from layout.ts; reports obstacles and floor heights
src/navigation.ts    walking routes: a grid built from the scene's obstacles, A*, straightened
src/agents.ts        the figures, the five states, walking, trails, beams
src/panel.ts         the side panel for a selected agent
src/graph.ts         the hologram graph above a selected agent
src/postfx.ts        bloom, vignette, output
src/ui.ts            HTML overlay
src/main.ts          renderer, camera rig, frame loop; connects feed -> agents, board, overlay
src/style.css        overlay, label and name tag styles
```

Data flows one way: `events.ts` -> `main.ts` -> `agents.ts` / `scene.ts` / `ui.ts`.
`agents.ts` never reads a feed directly and `scene.ts` knows nothing about agents.

The scene is data driven. To move a desk or a tree, or add a zone, edit `src/layout.ts` only;
walking routes follow automatically, because the route grid is built from whatever the scene placed.

## Colours

`PALETTE` in `src/layout.ts` is the SC45WORKS palette. Department accents are set per zone in `ZONES`.
Wood tones are the `WOOD` constant at the top of `src/scene.ts`. Fonts are Space Grotesk and JetBrains Mono;
swap them in `index.html` and the two `--font-*` variables in `src/style.css` once the brand fonts are confirmed.

## Poke at it from the browser console (dev server only)

```js
__office.emit({ type: 'agent.state', agentId: 'dev.qa', state: 'blocked', task: 'Staging is down' })
__office.select('dev.frontend')
__office.agents.list()
__office.snapshot
```

That changes this browser tab only. To change the real office, use `pnpm emit`.
