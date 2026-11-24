# SC45 AI Office: the full guide

Everything the office does and how to run, change and extend it. For the short version, see the [README](../README.md).

A virtual office for your AI agents. Agents write events to a plain text log, a small local
server streams the log, and a 3D office in the browser shows who is doing what.

```
agents ──emit──▶ data/events.jsonl ──▶ server (127.0.0.1:4545) ──SSE──▶ 3D office (browser)
   Layer 1            Layer 2                  Layer 3                      Layer 4
```

Events flow one way, left to right. The office never calls an agent.

You give the Chief of Staff a request in the office; she turns it into a mission and tasks for
the team; and the agents do those tasks for real, with Claude Code, in a project folder.

## Set up (once)

Needs Node 22.12 or newer. Works the same on macOS and Windows.

```bash
npm install -g pnpm     # if you do not have pnpm yet
pnpm install
```

## Run it

```bash
pnpm dev
```

That starts the server and the office together. Open http://localhost:5173.
The badge beside SC45WORKS says **Live**. Everyone is idle, because nothing has happened yet.

In a second terminal, make something happen:

```bash
pnpm emit mission created M-1 "Pixel Bytes homepage refresh"
pnpm emit working dev.frontend "Building hero section" --mission M-1
pnpm emit collaborating design.lead "Launch sync" --at meeting
pnpm emit blocked dev.qa "Staging URL returns 404"
pnpm emit output dev.frontend site/src/Hero.tsx "Hero component"
pnpm emit reporting dev.frontend "Hero section is live"
pnpm emit idle dev.frontend
pnpm emit mission closed M-1
```

Or play a whole scripted session through the real pipeline:

```bash
pnpm demo            # loops; Ctrl+C to stop
pnpm demo --once --speed 2
```

Click (or tap) an agent to follow it. A panel shows its state, task, mission, the files it has
reported and its recent tasks, and a sphere above it maps the same things as a graph.
Press Escape, the close button or Reset view to go back.

Moving round: drag to orbit, scroll to zoom, or use the keyboard.

| Key | Does |
| --- | --- |
| Arrow keys | Slide across the floor |
| `+` / `-`, or `W` / `S` | Zoom in / out |
| `Q` / `E` | Turn round the room |
| `R` | Back to the overview |
| `Escape` | Let go of the selected agent, or close the company sphere |

The screen has two sidebars with the office between them. Both are a fixed width, so nothing
shifts as their contents change, and each folds away with the arrow in its corner (the office
re-centres in the space that is left; the choice is remembered).

- **Left: the work in hand**, three ways: by **Mission** (who is on each, which stage it is at, and
  who comes next), by **Department** (how many of each are busy), and by **Agent** (everyone and
  their task, the busy first).
- **Right: the activity feed**: how many are working, blocked and idle, then everything that has
  happened, newest first. A worker's line shows how long it has been going, and when it finishes,
  how long it took and what it cost. The total spent on real work is beside the heading.

Press a name anywhere to go to that agent; its panel then stands where the feed was. A badge beside
each agent's name shows the mission it is on (`M-3`), `busy` if it is working on something with no
mission, or `blocked`. On a narrow window or a phone the sidebars start folded and open over the
office.

## The building, and how hard it works your machine

The office has solid walls with windows on the left, back and right, and glass in oak frames
along the front, either side of the entrance. A solid wall between you and the room would hide
the room, so whichever wall the camera is outside of sinks to a low sill, and rises again when
you turn the view round.

The view can be pulled a long way out, far enough to take in the city, Taipei 101 to its tip and
the mountains; carried back over the city as far as the tower; and lifted (drag with the right
mouse button, or with two fingers) as high as its top.

Furniture, people, animals and plants are drawn 1.2 times their plan size, so the floor reads as
furnished rather than empty. That is one number, `FURNITURE_SCALE` in
`packages/office/src/layout.ts`: raise it for a fuller office, lower it for an airier one. Plants
stand by the partitions: a tree at the end of each department's slat wall, a shrub at each of its
front corners.

Desks are turned a little, each by its own amount (`rotation` on each desk in `layout.ts`), so
the room does not look ruled. What lies on a desk says whose it is: worksheets, swatches and a
drawing tablet in Design; printed code and manuals in Development; a camera, microphone and
clapperboard in Content; a calculator, phone and call headset in Sales; books and charts in
Research (`deskProps` in `scene.ts`).

To keep it light on the processor and graphics chip:

- Everything that never moves (desks, chairs, walls, plants, about 600 boxes) is merged into a few
  dozen meshes when the office is built, which roughly halves the draw calls per frame.
- While nobody is moving the view, the office is drawn 30 times a second, not 60; it goes back
  to every frame the moment you drag, scroll or press a key. A hidden tab draws nothing.
- The canvas is capped at 1.75 pixels per CSS pixel (1.5 on a phone), and drops to 1 by itself
  if the device cannot keep up.
- In full daylight the glow pass and the lamps over each zone are switched off, since neither
  shows; they come back at dusk.
- By day the sun shines in from over the sea, across the beach and the office and on over the
  town, and casts soft shadows from everything that stands still: palms, the beach huts, walls,
  window frames, furniture, plants, the towers. People, cars and surf do not cast one, so the
  shadows are only drawn again when the sun has moved (about a third of a degree), not every
  frame. On phones and tablets there are no shadows at all.
- As the view is pulled back, the nearest distance the camera draws is pushed out with it. That
  keeps surfaces that lie close together (a mat on the sand, a rim on a tower) from flickering
  when seen from far off.

### Name tags on and off

**Labels** in the bottom bar (or the **L** key) puts away everything that floats over the office
to say who or what it is: people's names and tasks, their mission badges, the department and
desk signs, the pets' names and the count on the review folder. Press it again to bring them
back. The choice is remembered. Clicking a person still opens their panel, and the words round
the company sphere and in an agent's graph stay, since there the words are the picture.

### After dark

Press the time-of-day button until it says **Night** (or wait for the evening):

- **The city** lights up: most windows in the towers, a line of light round many of the roofs.
- **Taipei 101** is lit as it is for the New Year: each of its eight sections banded in its own
  colour, red at the bottom and climbing through the rainbow to pink, with the brightness
  running up the tower in waves.
- **The beach** has strings of bulbs the length of the boardwalk, torches along the water's
  edge, lanterns under the parasols and awnings, lamps over the volleyball court and the gym,
  and three floodlights over the sand. On a computer the floodlights are real lights, so the
  sand and the people on it can be seen; phones keep only the painted pools of light.
- **The party**: on the sand between the barbecue and the water there is a fire pit with logs
  round it and a DJ's booth with speakers and a lighting rig. By day they stand empty. Once it
  is dark the fire is lit, the DJ is behind the decks, a dozen people walk down from the
  barbecue and dance (some with glow sticks), four more sit by the fire, and the rig's lamps
  turn through the colours and throw them on the sand. At dawn they walk back.
- **The surfers** paddle in and leave the water as the light goes, and paddle back out in the
  morning.
- **The gulls** (ten, white, in two loose lines crossing the bay over the water, one each way)
  climb away at dusk and are back in the morning.

Where the party is: `party` in `packages/office/src/outdoors.ts`. Who comes and how they dance:
the party section of `life.ts`.

## Time off, and Stephen's rounds

Beside the lounge is the café corner: a coffee and drinks bar with an espresso machine, shelves
of bottles and a small fridge, low stools along the counter, and a table-tennis table.

An agent with nothing to do sleeps at its desk. After about two minutes of that it may get up
for a break: a stool at the bar, a seat in the lounge, or a game of table tennis if someone else
is idle too (the ball only flies while there is a player at each end). A few minutes later it
walks back. At most five are away at once, and Sophia never leaves her desk. None of this is an
event and nothing records it: the moment a task arrives, the agent goes straight to where the
task sends it.

Every few minutes Stephen gets up and walks round the office: the front of each department in
turn, then the café, then back to his desk. Cash gets up and follows a couple of paces behind,
sits when Stephen stops, and finds somewhere to lie down again when the round is over.

To see either without waiting, add `?pace=10` to the address: breaks and rounds come round ten
times sooner.

The floor is divided by planting, not partitions. Each department has its slat wall behind and
a flower bed down each side that turns the corner at the front and stops, so the front stays
open as the way in. The flowers come in drifts of orange, yellow, red, pink and purple, in four
kinds: tulips, low blossom, tall spikes and daisies. Two more beds line the walk from the
entrance to the Project Coordinator; there is a bench in each of the two passages that run back
between the departments; and open shelving stands between the café and the lounge. The beds are
`PLANTERS` in `packages/office/src/layout.ts`.

## The tour

The **Tour** button beside Reset view (or the `T` key) plays a scripted flight of about a hundred
seconds, made to be screen-recorded: morning from high over the sea, along the sand past the
restaurant and the barbecue hut, round the volleyball game to the gym, across the road and in
through the front door, a pass over each department and the café, then up and away as the sun
goes down and the city lights come on, with Taipei 101 and the mountains behind; at night the
company sphere rises and opens, the camera circling it; and it ends on the sign.

It opens on the name as a neon sign: a flowing script in hot pink, each letter flickering on in
turn, a cyan stroke drawn under it (the script face, Mr Dafoe, comes from Google Fonts; without
a connection the browser's own cursive is used). As night falls over the city a drone show goes
up beside Taipei 101: about 240 lights rise from the streets and form a red heart, which beats,
and TAIPEI in white, then scatter (`packages/office/src/drones.ts`). The day runs from early morning, already light, to night as it plays.

While it plays the interface and the name tags are hidden, the picture is cropped to 2.39:1
with black bars, shots dip through black, and there are a title, a caption for each place and
an end card. The browser is asked to go full screen. `Esc` stops it, `C` hides the captions
(for your own voiceover or titles), `M` mutes the music.

The music is made in the browser: a slow pad over four chords, a soft bass, and bell notes
that come in at the office and thicken as the camera climbs. It is there to cut to. For the
published video, mute it and lay a licensed track over the recording.

While the tour plays the office is staged for the picture: nobody is asleep; Sophia and one agent in three are
shown at work at their desks with their screens lit, the rest go to the café, the sofa and the
table-tennis table (bats in hand, swinging as the ball arrives). Stephen is at his desk when the
camera reaches the executive office; he and Sophia turn and wave to it, and then he sets off on a
round with Cash. This is on screen only. No event
is written and nothing real changes. Tasks that arrive while it plays are still recorded and still
run, but nobody moves for them until the tour ends, when everyone is put back where they really are. Adding `?tourFrom=60` to the address starts the tour a minute in, to look at
one shot without sitting through the rest. The shots are a list at the top of `packages/office/src/tour.ts`: each is a
start and end position, a start and end aim, the hours of the day it covers and its caption.

## The hero: the office on a web page

`hero/office-hero/` is the office packaged as a page background for the SC45WORKS site: a React
component (`OfficeHero.tsx`) over a single script, with no panels, a slowly swaying camera, the
time of day from the visitor's clock, and a poster for phones. Its own README has the import
lines and the props. It is built from `packages/office/src/hero.ts`; after changing the office,
`pnpm build:hero` rebuilds it into that folder.

## Change how people look

Select anyone, press **Edit** in their panel, and it becomes a character sheet: name, build,
skin, hair style and colour, glasses, beard, and the colours of their top and trousers. The
figure changes as you choose. Reset puts back the look they started with.

With the server running, a change is saved as an `agent.profile` event, so it reaches every open
office and survives a restart, and Sophia uses the new name. With no server (Demo), it is kept in
that browser only.

Three pets live in the office: Cash the Rottweiler sleeps beside the executive deck and now and
then moves to another spot, Milo the Jack Russell trots from department to department, and Tom
the cat settles on an empty desk or in the lounge. They are scenery: nothing about them is saved,
and each browser's pets wander separately.

A working agent's monitor shows what it is doing: its task, and under it the files it has reported
and the tasks it has finished, with a blinking cursor. An idle agent's screen is off.

The neon is for the night. By day and at dusk the light strips in the floor are dull lines and the
figures have no glow; both come on as it gets dark.

In the lounge there is a television (playing a small runner game) with a console and two
controllers. Just inside the entrance is a vending machine, and a small robot that waits in front
of it: every minute or so it takes a drink to someone who is at their desk with work in hand.
The robot, like the pets, is scenery.

The whole place is built of blocks: cube-headed figures, square posts, stacked-cube trees, and a
faint pixel texture on wood, grass and roads. The texture is generated in the shaders
(`packages/office/src/pixel.ts`); there are no image files.

An agent with nothing to do puts its head down on its desk and sleeps, and sits up the moment
it is given a task. (Sophia stays awake: she is the one listening.)

Each zone is marked by a banner on a pole, the entrance says "Start Creating.", and the office
stands in a piece of city by the sea, a Taipei that has been given a beach: office towers and
shopping malls behind and to the sides (lower near the office, taller further off, their windows
lighting up at night), Taipei 101 standing over them, and mountain ranges behind that. Stephen's
white convertible has its own bay by the front door. Across the front
road is a golden beach with a boardwalk, two restaurants, a barbecue hut, a volleyball game, an outdoor
gym, a pier, people walking, scooters on the roads and surf coming in. Drag or use the arrow keys
to carry the view out to the beach. All of it is scenery only.

Click the glowing core on the executive deck and it rises into one large sphere of the whole
company: every mission, the people on each, and the files they have reported. It holds still while the
pointer is over it; press a person's ball or name to go to them. Escape closes it.

The sky follows your computer's clock: night, sunrise, day, sunset. The small button beside the
clock steps through Auto, Day, Dusk and Night if you want to see another time; it remembers your choice.

## Ask the Chief of Staff

Type a request in the box at the bottom of the office, or use the microphone where the browser
offers one:

- "We just signed Relay. Build them a landing page with a contact form."
- "Who is busy right now?"
- "Relay is live, close that mission."
- 「幫我研究一下台灣網頁設計工作室的報價」

Sophia reads it, answers, opens or closes missions and gives agents their tasks. You see it
play out in the office and on the mission board.

Who does the planning:

| Brain | When | What it needs |
| --- | --- | --- |
| Claude Code | By default, if the `claude` command is installed and signed in | Nothing else. It runs once per request with every tool switched off, on the `haiku` model |
| Built-in rules | If Claude Code is not found, and always in Demo mode | Nothing. Keyword matching: it works, but it does not understand |

Sophia's instructions are in `company/chief-of-staff.md`. Edit that file to change how she plans.

Whatever a brain answers is checked before anything happens. A plan can only open and close
missions and set agents' states, for agents that exist; anything else in it is dropped.

Settings: `SC45_BRAIN` (`auto`, `claude-code` or `built-in`), `SC45_BRAIN_MODEL` (default `haiku`),
`SC45_CLAUDE_COMMAND` (default `claude`).

### Attaching files

The paperclip in the command bar attaches files or a whole folder to a request; so does
dropping them on the bar. They are listed above the bar until you send. When the request starts
a mission, they are copied into its project folder under `attachments/`, and every agent on
the mission is told they are there and to read what bears on its task. Sophia herself only sees
their names: she plans from those and from what you say. If she asks a question first (which
project?), the files wait for your answer. Up to 40 files, 15 MB each, 40 MB in all. Needs the
server: the demo has nowhere to send a file.

### Alerts, and work for review

The bell beside the clock switches alerts on and off. Two things sound: two falling notes when
a sign-off is needed, and three rising notes and a high one when a mission's work is finished.
With each comes a desktop notification if the office is not the window in front (the browser
asks once for permission, when you press the bell). The tab's title shows how many sign-offs are
waiting. A browser will not play a sound for a page nobody has clicked yet, so click anywhere in
the office once after loading it.

A finished mission that left files is put on Stephen's desk as a glowing folder, with a marker
turning above it. Press it to see who did what and every file; each file is a link that opens
it, and "Open the work" opens the page a visitor would land on. "Mark as reviewed" takes the
folder away (remembered in this browser); closing the card leaves it there. Pages agents built
are shown sandboxed, so nothing in them can give commands to the office.

### Sophia's voice

A request made with the microphone is answered aloud. The speaker button beside the microphone
chooses how: any voice installed on this computer (grouped by language, yours first), with a
Play button to hear it, and sliders for speed and pitch. The choice is kept in this browser.
Better voices can be downloaded in System Settings › Accessibility › Spoken Content › System
Voice › Manage Voices, and appear in the list after a reload. If Sophia answers in Chinese and
the chosen voice is an English one (or the other way round), a voice for that language is used
for that answer. The speech is made by the browser: nothing is sent anywhere.

## The agents do the work

When Claude Code is planning (the default, if it is installed), each task Sophia gives out is
done by a **worker**: Claude Code, run once for that agent, in the mission's project folder.

1. You ask for something. If you have not said which project it is for, Sophia asks: a new one
   (and its name), or one of the existing ones. Answer in your next message.
2. She opens the mission in that project and briefs the team.
3. The mission runs in **stages**: work the others build on first (plan, research, copy, design),
   then building, then checking. Agents in the same stage work at the same time; a stage starts
   when the one before has finished, so its files are there to read. Sophia orders the stages by
   what depends on what ("QA reviews, then the developer fixes" is QA first).
4. Each agent works by itself. Files it writes or edits appear as its outputs: on its monitor,
   in its panel, in the graph.
5. When it finishes it reports (and leaves the report in the project's `reports/` folder), then
   goes idle. When everyone on the mission has finished, Theo closes the mission.

Projects are folders in `projects/` (set `SC45_PROJECTS_DIR` to keep them somewhere else).
The folder is not part of this repository.

**Each agent's skill** is a file: `company/agents/<agent id>.md`. It says what that agent makes,
where it puts it and to what standard. Edit a file and the agent follows it from its next task.

**What a worker can and cannot do**

- It has five tools: read, write and edit files, and search by name and by content. It has no
  shell, no web access and no MCP servers.
- Claude Code refuses to let it read or write outside the project folder. On top of that, the
  server stops any worker that reaches for another tool, and only reports files inside the project.
- It may run for 10 minutes (`SC45_WORKER_MINUTES`). At the limit it is stopped, says so, and
  goes idle; ask Sophia to send it back for another round.
- Two work at once (`SC45_WORKERS_MAX`); the rest wait their turn, shown as working.
- It uses the `sonnet` model (`SC45_WORKER_MODEL`). This is real usage on your Claude account:
  a mission with four agents is four runs.
- Closing a mission stops its workers. `SC45_WORKERS=off` switches real work off altogether,
  and Sophia goes back to planning only.

Because workers have no web access, the two research agents write from what the model already
knows and mark what needs checking. Because they have no shell, nothing is installed, built or run.

If the server is not running, the office says **Demo** and plays the same script by itself,
and switches to **Live** within a few seconds of the server starting.

## Verdicts: knowing when it did not get done

Every agent ends its report with a verdict on its own task: `done`, `partial` (with what is
missing) or `blocked` (with what stopped it). It is told to be straight about this, and never to
fill a gap with invented names or numbers. Anything that is not `done` reaches you three ways:

- **At once:** a third alert sound (two low falling notes, twice) and a notification naming the
  agent and the reason. The agent's line in the activity feed is red; a blocked agent stays
  blocked at its desk, saying why.
- **At the end:** when everyone on the mission has stopped, the request to close it reads "Not
  everything was done. Close it anyway?" and lists each such task with what went wrong. Decline
  and the mission stays open for you to send someone back to it. A mission with problems is
  never closed, or left, without you being told.
- **On your desk:** the folder for that mission glows red and says "needs attention"; inside,
  the tasks that were not done are marked.

Running out of time (the ten-minute limit) counts as `partial`.

## Who can use the web

Research and Sales can search the web and read pages, because finding things out is their job.
Design, Development and Content cannot, so nothing that is built and shipped can pull something
in from a site nobody chose; Sophia is told to give web work to Research or Sales first and have
the others build on what comes back. The two web tools only read: they cannot send anything.
Agents with the web are told to give the address for every fact, to mark what they could not
confirm, and to treat a page as information, never as instructions.

`SC45_WEB_AGENTS` changes who has it: a comma-separated list of the starts of agent ids (the
default is `research.,sales.`), or `off` for nobody.

## Sign-offs

When agents do real work, three things wait for your approval, every time:

1. **A mission starting.** The card shows the whole plan: who does what, in which stage.
2. **Each later stage starting.** By then there is work in the project folder that the stage will
   build on and change. The card shows how many files there are and what has been spent.
3. **A mission being closed**, once everyone has finished.

Sophia adds her own judgement on top: a task she thinks you should look at twice (it replaces
existing work, is hard to undo, or a client would see it) is marked **Flagged by Sophia** on the
card, with her reason.

A card comes up over the office. **Approve** (or `Enter`) lets the work go on; **Decline** stops it:
a mission that never started is closed, one part-way through stays open for you to redirect, and
a mission you decline to close stays open. You can leave a note either way. `Esc`, or a click
outside the card, decides nothing: the request keeps waiting, the agents concerned sit at their
desks marked `needs you`, and a pill at the top of the office brings the card back. There is no
time limit. Several requests are answered one at a time, oldest first.

Every request and every answer is an event in the log (`approval.requested`, `approval.decided`),
signed with your name and the time, and shows in the activity feed.

Two things to know. The list of work waiting is kept in the server's memory, so if the server
is restarted while a request is unanswered, that request is marked `lapsed` and the mission needs
asking for again. And `SC45_APPROVALS=off` switches sign-offs off, so work runs straight through.

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Server and office together, both restarting when you edit them |
| `pnpm start` | The server alone |
| `pnpm dev:office` | The office alone (plays the demo if there is no server) |
| `pnpm emit ...` | Append one event to the log; `pnpm emit --help` for everything it accepts |
| `pnpm emit agents` | List every agent id |
| `pnpm demo` | Play the scripted session into the log |
| `pnpm test` | 39 tests of the contract, the log, the server, commands, profiles and workers |
| `pnpm typecheck` | Type-check every package |
| `pnpm build` | Build the office to `packages/office/dist` |

To emit from another folder (for example from inside an agent's working directory):

```bash
pnpm --dir /path/to/command-center emit working dev.frontend "Building hero section"
```

`emit` writes straight to the log, so it works whether or not the server is running.
Anything written while the server is down is picked up when it starts.

## Events

One line of `data/events.jsonl`:

```json
{"ts":"2026-11-14T01:32:32.297Z","type":"agent.state","agentId":"dev.frontend","state":"working","task":"Building hero section","missionId":"M-1"}
```

| Field | Meaning |
| --- | --- |
| `ts` | When, ISO 8601 |
| `type` | `agent.state`, `agent.moved`, `mission.created`, `mission.updated`, `mission.closed`, `agent.output`, `agent.profile` |
| `agentId` | The agent's id, which is its home desk, e.g. `dev.frontend` |
| `state` | `idle`, `working`, `collaborating`, `blocked`, `reporting` |
| `task` | The label above the agent, or a mission's title |
| `deskId` | Where, if not the agent's own desk: another desk, a spot (`meeting.seat-2`) or a zone (`meeting`, `lounge`) |
| `missionId` | The mission this belongs to |
| `meta.status` | For missions: `queued`, `active`, `done` |
| `meta.path` | For `agent.output`: the file the agent produced |
| `meta.name`, `meta.appearance` | For `agent.profile`: a new name, a new look, or both |

Where an agent goes when no place is given: its own desk, or beside the Chief of Staff when reporting.
A collaborating agent stays where it is; an idle agent in the lounge stays in the lounge.

An `agent.output` with no mission of its own is filed under the mission the agent is working on.
The office remembers each agent's last 10 files, 6 tasks and 4 missions.

## Layout

```
company/           the Chief of Staff's instructions, and a skill file for each agent (Markdown)
projects/          what the agents make, one folder per project  (created on first use; not in git)
packages/shared/   the contract: event types, roster, state reducer, agent graph, plans, demo script
packages/bus/      Layer 2: append to, read, follow and rotate data/events.jsonl
packages/server/   Layer 3: replay the log, follow it, serve /events, /state, /health; take commands
packages/office/   Layer 4: the 3D office (Vite, TypeScript, Three.js)
scripts/emit.ts    the command agents call
scripts/demo.ts    plays the scripted session into the log
tests/             contract, log and server tests
docs/              brief, org chart, architecture
data/              events.jsonl, archive/, snapshot.json  (created on first use; not in git)
```

Each layer imports only `@sc45/shared` and the layer directly below it:
the office imports shared; the server imports shared and bus; `emit` imports shared and bus.

To rename an agent or add one, edit `packages/shared/src/roster.ts`; to give it a desk,
add the desk in `packages/office/src/layout.ts`.

## The server

| Route | Returns |
| --- | --- |
| `GET /health` | `{ ok, seq, clients, log }` |
| `GET /state` | The current snapshot: every agent's state, the missions, the roster |
| `GET /events` | Server-Sent Events: one `snapshot`, then an `event` per new line of the log |
| `GET /agents/:id/graph` | What one agent has touched: missions, tasks, folders and files, as nodes and links |
| `POST /agents/:id/profile` | Body `{"name": "...", "appearance": {...}}` (either or both). Checks it and writes an `agent.profile` event |
| `POST /command` | Body `{"text": "..."}`. Plans the request, writes the events, starts the work, returns `{ reply, summary, brain }` |
| `GET /projects` | The project folders, and whether real work is on |
| `GET /workers` | Who is working right now, and who is waiting |

It listens on `127.0.0.1` only, and answers browsers on `localhost` only.
Commands are refused from any other site's pages, and must be sent as JSON.
It keeps no state of its own: stop it, start it, and it rebuilds everything from the log.

When the date changes it saves the current state to `data/snapshot.json` and moves the
finished day's log to `data/archive/events-YYYY-MM-DD.jsonl`, so the live log stays small.

Settings, all optional, as environment variables: `SC45_PORT` (default 4545),
`SC45_DATA_DIR` (default `./data`), `SC45_QUIET=1` (do not print each event).
The office looks for the server at `http://127.0.0.1:4545`; point it elsewhere with
`?server=http://host:port` in the address, or turn it off with `?server=off`.

## Known limits

- Agents avoid furniture and walls but not each other, so two can pass through one another mid-walk.
- At most three agents can report and six can meet at once; a further one goes to its desk instead.
- An event written in the instant the log is being archived at midnight could be filed under the old day
  without being shown. The window is a few milliseconds.
- With real work off (or Claude Code not installed), Sophia only plans: agents given a task stay "working" until the mission is closed.
- Sophia remembers the last six exchanges, and forgets them when the server restarts.
- Agents in the same stage work at the same time and do not see each other's files until they are written. Agents in a later stage do.
- One request at a time: a second one sent while she is still briefing the team is refused.
- Voice uses the browser's own speech recognition. It has not been tested here, and is missing in some browsers.
- The graph only knows the files agents report with `emit output`; it does not scan any folders.
- `emit` takes about half a second, most of it starting Node. Fine for hooks; too slow for a tight loop.
- A copy of the office hosted on the web cannot reach a server on your machine, so it always shows the demo.

## Milestones

1. Static office. Done.
2. Avatars and the state machine, on a mock feed. Done.
3. Event log, server and `emit`: the office goes live. Done.
4. Click an agent: side panel and a graph of the files and tasks it touched. Done.
5. Chief of Staff: type or speak a request, watch it dispatch, and the agents do the work. Done.
6. Scheduled routines, and the mission board filling itself.
