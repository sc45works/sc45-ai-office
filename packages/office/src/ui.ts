/**
 * SC45 AI Office: the HTML overlay (thin glass panels over the 3D stage).
 *
 * Left, a fixed-width sidebar: the company name and clock, and under it the work in hand, shown
 * by mission, by department or by agent. Right, another: the activity feed, with how long
 * finished work took and what it cost. Between them the office, and along the bottom of it the
 * reset-view control, the command bar and a one-line hint. Either sidebar can be folded away.
 */

/** One row of the mission list. */
export interface MissionRow {
  id: string;
  title: string;
  status: 'queued' | 'active' | 'done';
  /** The project folder its work goes in, if it has one. */
  project?: string;
  /** Who is on it right now, lead first. */
  people: Person[];
  /** Who has been given a task on it in a stage that has not begun. */
  next?: Person[];
  /** "Stage 2 of 3", when the mission runs in stages. */
  stage?: string;
}

export interface Person {
  id: string;
  name: string;
  accent: string;
}

/** One department's load. */
export interface DepartmentRow {
  name: string;
  accent: string;
  /** Everyone in it with a task in hand. */
  busy: Array<Person & { task: string }>;
  /** How many people it has. */
  total: number;
}

/** One person and what they are doing. */
export interface AgentRow extends Person {
  role: string;
  state: string;
  task?: string;
  missionId?: string;
}

/** The work in hand, for the panel's three views. */
export interface Board {
  missions: MissionRow[];
  departments: DepartmentRow[];
  agents: AgentRow[];
}

type BoardView = 'mission' | 'department' | 'agent';

/** One line of the activity feed. */
export interface ActivityRow {
  /** The agent to go to when the row is pressed, if it is about one. */
  agentId?: string;
  who: string;
  accent: string;
  /** "started", "done", "wrote", "blocked", "opened" … */
  verb: string;
  text: string;
  /** Clock time, HH:MM. */
  time: string;
  tone?: 'good' | 'alert' | 'quiet';
  /** For finished work: how long it took. */
  durationMs?: number;
  /** For finished work: what it cost, already formatted. */
  cost?: string;
  /** For work still going: when it started (ISO), so the time so far can be shown. */
  since?: string;
}

export interface Activity {
  tiles: Array<{ label: string; value: number | string; tone?: 'good' | 'alert' | 'quiet' }>;
  /** Newest first. */
  rows: ActivityRow[];
  /** The total cost so far, formatted, or null when there has been none. */
  cost: string | null;
}

import { SKY_MODES, type SkyMode } from './daylight';

export interface Hud {
  element: HTMLElement;
  /** Where the command bar goes: the middle of the bottom row. */
  commandSlot: HTMLElement;
  /** Update the "Active missions" counter. */
  setActiveMissions(count: number): void;
  /** Fill the panel under the counter: the open missions, each department's load, and everyone's task. */
  setBoard(board: Board): void;
  /** Called when a person in the mission list is pressed. */
  onPickAgent(handler: (agentId: string) => void): void;
  /** The activity feed steps aside while an agent's panel is open in its place. */
  setAgentPanelOpen(open: boolean): void;
  /** Fill the activity feed. */
  setActivity(activity: Activity): void;
  /** How much of the stage each open sidebar covers, in pixels: the office is framed in what is left. */
  insets(): { left: number; right: number };
  /** Called when a sidebar is folded or unfolded, or the agent's panel opens or closes. */
  onLayout(handler: () => void): void;
  /** Show where events are coming from: the built-in demo, or the live server. */
  setFeedStatus(status: 'demo' | 'live' | 'reconnecting'): void;
  /** Show which time-of-day mode is on, and whether it is light out right now (sun or moon). */
  setSky(mode: SkyMode, light: boolean): void;
  /** Called when the time-of-day button is pressed, with the next mode. */
  onSkyMode(handler: (mode: SkyMode) => void): void;
  /** Called when the reset-view button is pressed. */
  onResetView(handler: () => void): void;
  /** Show whether the name tags over the office are on. */
  setLabels(on: boolean): void;
  /** Called when the labels button is pressed. */
  onLabels(handler: () => void): void;
  /** Show a message in place of the 3D stage (e.g. WebGL unavailable). */
  showNotice(title: string, detail: string): void;
}

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const pad = (value: number) => String(value).padStart(2, '0');

export function createHud(root: HTMLElement): Hud {
  const hud = document.createElement('div');
  hud.className = 'hud';
  hud.innerHTML = `
    <aside class="side side-left" id="hud-left" data-open="true">
      <section class="panel brand" aria-label="Company and local time">
        <div class="brand-row">
          <div class="brand-name" aria-label="SC45WORKS">SC45<span class="spark-text">WORKS</span></div>
          <span class="feed-status" id="hud-feed" data-status="demo">Demo</span>
          <button class="side-toggle" id="hud-left-toggle" type="button" aria-expanded="true" aria-controls="hud-missions"><span aria-hidden="true"></span></button>
        </div>
        <div class="brand-meta">
          <span class="live-dot" aria-hidden="true"></span>
          <time class="clock" id="hud-clock">--:--:--</time>
          <span class="date" id="hud-date"></span>
          <button class="sky-toggle" id="hud-sky" type="button" data-mode="auto" data-light="false">
            <span class="sky-icon" aria-hidden="true"></span><span id="hud-sky-label">Auto</span>
          </button>
        </div>
      </section>
      <section class="panel missions" id="hud-missions" aria-label="Active missions: 0">
        <div class="missions-row">
          <span class="missions-label">Active missions</span>
          <span class="missions-count" id="hud-missions-count">0</span>
        </div>
        <div class="missions-tabs" role="tablist" aria-label="Show work by">
          <button class="missions-tab" type="button" role="tab" data-view="mission">Mission</button>
          <button class="missions-tab" type="button" role="tab" data-view="department">Department</button>
          <button class="missions-tab" type="button" role="tab" data-view="agent">Agent</button>
        </div>
        <ul class="missions-list" id="hud-missions-list"></ul>
      </section>
    </aside>
    <div class="hud-centre">
      <div class="hud-bottom">
        <div class="hud-tools">
          <button class="panel reset" id="hud-reset" type="button">
            Reset view <kbd aria-hidden="true">R</kbd>
          </button>
          <button class="panel reset labels-toggle" id="hud-labels" type="button" aria-label="Name tags" aria-pressed="true" data-on="true">
            <span class="labels-icon" aria-hidden="true"></span><span class="labels-text">Labels</span> <kbd aria-hidden="true">L</kbd>
          </button>
        </div>
        <div class="command-slot" id="hud-command"></div>
        <p class="hint">
Click an agent or the core · drag or arrow keys to move
        </p>
      </div>
    </div>
    <aside class="side side-right" id="hud-right" data-open="true">
      <section class="panel activity" aria-label="Activity">
        <div class="activity-head">
          <h2 class="activity-title">Activity</h2>
          <span class="activity-cost" id="hud-cost"></span>
          <button class="side-toggle" id="hud-right-toggle" type="button" aria-expanded="true" aria-controls="hud-activity"><span aria-hidden="true"></span></button>
        </div>
        <div class="activity-body" id="hud-activity">
          <div class="activity-tiles" id="hud-tiles"></div>
          <ul class="activity-feed" id="hud-feed-list"></ul>
        </div>
      </section>
    </aside>
  `;
  root.append(hud);

  const clock = hud.querySelector<HTMLElement>('#hud-clock')!;
  const date = hud.querySelector<HTMLElement>('#hud-date')!;
  const missions = hud.querySelector<HTMLElement>('#hud-missions')!;
  const missionsCount = hud.querySelector<HTMLElement>('#hud-missions-count')!;
  const feed = hud.querySelector<HTMLElement>('#hud-feed')!;
  const FEED_LABELS = {
    demo: ['Demo', 'Playing the built-in demo. Start the server to see live events.'],
    live: ['Live', 'Connected to the local server: these are real events.'],
    reconnecting: ['Offline', 'Lost the server. Trying to reconnect.'],
  } as const;
  const reset = hud.querySelector<HTMLButtonElement>('#hud-reset')!;
  const labels = hud.querySelector<HTMLButtonElement>('#hud-labels')!;
  const sky = hud.querySelector<HTMLButtonElement>('#hud-sky')!;
  const skyLabel = hud.querySelector<HTMLElement>('#hud-sky-label')!;
  const SKY_LABELS: Record<SkyMode, string> = { auto: 'Auto', day: 'Day', dusk: 'Dusk', night: 'Night' };

  // The two sidebars. On a wide screen both are open and the office sits between them; on a narrow
  // one they start folded, and opening one folds the other, since there is room for one at most.
  // The choice is remembered.
  const list = hud.querySelector<HTMLUListElement>('#hud-missions-list')!;
  const wide = window.matchMedia('(min-width: 900px)');
  const sides = {
    left: { element: hud.querySelector<HTMLElement>('#hud-left')!, toggle: hud.querySelector<HTMLButtonElement>('#hud-left-toggle')!, key: 'sc45.side.left', open: wide.matches, what: 'work panel' },
    right: { element: hud.querySelector<HTMLElement>('#hud-right')!, toggle: hud.querySelector<HTMLButtonElement>('#hud-right-toggle')!, key: 'sc45.side.right', open: wide.matches, what: 'activity feed' },
  };
  let layoutChanged: () => void = () => {};
  function applySides() {
    for (const side of Object.values(sides)) {
      side.element.dataset.open = String(side.open);
      side.toggle.setAttribute('aria-expanded', String(side.open));
      side.toggle.setAttribute('aria-label', `${side.open ? 'Hide' : 'Show'} the ${side.what}`);
    }
    layoutChanged();
  }
  for (const [name, side] of Object.entries(sides) as Array<['left' | 'right', (typeof sides)['left']]>) {
    try {
      const saved = window.localStorage.getItem(side.key);
      if (saved !== null && wide.matches) side.open = saved === '1';
    } catch {
      /* no storage here: the default stands */
    }
    side.toggle.addEventListener('click', () => {
      side.open = !side.open;
      if (side.open && !wide.matches) sides[name === 'left' ? 'right' : 'left'].open = false;
      try {
        window.localStorage.setItem(side.key, side.open ? '1' : '0');
      } catch {
        /* not remembered, that is all */
      }
      applySides();
    });
  }
  wide.addEventListener('change', () => {
    if (!wide.matches) sides.left.open = sides.right.open = false;
    applySides();
  });
  const tabs = [...hud.querySelectorAll<HTMLButtonElement>('.missions-tab')];
  const VIEW_KEY = 'sc45.missions.view';
  let view: BoardView = 'mission';
  try {
    const saved = window.localStorage.getItem(VIEW_KEY);
    if (saved === 'department' || saved === 'agent') view = saved;
  } catch {
    /* no storage here: by mission */
  }
  let board: Board = { missions: [], departments: [], agents: [] };
  let pickAgent: (agentId: string) => void = () => {};

  const make = <K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text?: string): HTMLElementTagNameMap[K] => {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  /** A person, as a small button that takes the camera to them. */
  function chip(person: Person, dim = false): HTMLButtonElement {
    const button = make('button', dim ? 'mission-person is-next' : 'mission-person', person.name);
    button.type = 'button';
    button.style.setProperty('--accent', person.accent);
    button.setAttribute('aria-label', `Show ${person.name}`);
    button.addEventListener('click', () => pickAgent(person.id));
    return button;
  }

  function missionItems(): HTMLElement[] {
    if (board.missions.length === 0) return [make('li', 'mission-nobody', 'No open missions.')];
    return board.missions.map((row) => {
      const item = make('li', 'mission-item');
      item.dataset.status = row.status;
      const head = make('div', 'mission-item-head');
      const title = make('span', 'mission-item-title', row.title);
      title.title = row.title;
      head.append(make('span', 'mission-item-id', row.id), title);
      if (row.project) {
        const project = make('span', 'mission-item-project', row.project);
        project.title = `Project folder: ${row.project}`;
        head.append(project);
      }
      const people = make('div', 'mission-people');
      if (row.stage) people.append(make('span', 'mission-stage', row.stage));
      if (row.people.length === 0 && !row.next?.length) people.append(make('span', 'mission-nobody', row.status === 'queued' ? 'Queued · no one yet' : 'No one on it right now'));
      for (const person of row.people) people.append(chip(person));
      if (row.next?.length) {
        people.append(make('span', 'mission-then', 'then'));
        for (const person of row.next) people.append(chip(person, true));
      }
      item.append(head, people);
      return item;
    });
  }

  function departmentItems(): HTMLElement[] {
    return board.departments.map((row) => {
      const item = make('li', 'mission-item');
      item.style.setProperty('--accent', row.accent);
      const head = make('div', 'mission-item-head');
      head.append(make('span', 'mission-item-title', row.name), make('span', 'department-count', `${row.busy.length} of ${row.total}`));
      const bar = make('div', 'department-bar');
      bar.setAttribute('role', 'img');
      bar.setAttribute('aria-label', `${row.busy.length} of ${row.total} busy`);
      const fill = make('span', 'department-fill');
      fill.style.width = `${row.total ? (row.busy.length / row.total) * 100 : 0}%`;
      bar.append(fill);
      item.append(head, bar);
      if (row.busy.length > 0) {
        const people = make('div', 'mission-people');
        for (const person of row.busy) {
          const button = chip(person);
          button.title = person.task;
          people.append(button);
        }
        item.append(people);
      }
      return item;
    });
  }

  function agentItems(): HTMLElement[] {
    return board.agents.map((row) => {
      const item = make('li', 'agent-row');
      const button = make('button', 'agent-row-button');
      button.type = 'button';
      button.style.setProperty('--accent', row.accent);
      button.dataset.state = row.state;
      button.setAttribute('aria-label', `Show ${row.name}: ${row.task ?? row.state}`);
      button.addEventListener('click', () => pickAgent(row.id));
      const name = make('span', 'agent-row-name', row.name);
      const what = make('span', 'agent-row-task', row.task ?? (row.state === 'idle' ? 'idle' : row.state));
      what.title = row.task ?? row.role;
      button.append(name, what);
      if (row.missionId) button.append(make('span', 'mission-item-id', row.missionId));
      item.append(button);
      return item;
    });
  }

  function renderBoard() {
    for (const tab of tabs) tab.setAttribute('aria-selected', String(tab.dataset.view === view));
    const scroll = list.scrollTop;
    list.dataset.view = view;
    list.replaceChildren(...(view === 'mission' ? missionItems() : view === 'department' ? departmentItems() : agentItems()));
    list.scrollTop = scroll;
  }
  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      view = tab.dataset.view as BoardView;
      try {
        window.localStorage.setItem(VIEW_KEY, view);
      } catch {
        /* not remembered, that is all */
      }
      renderBoard();
    });
  }
  renderBoard();
  applySides();

  // The activity feed.
  const tiles = hud.querySelector<HTMLElement>('#hud-tiles')!;
  const feedList = hud.querySelector<HTMLUListElement>('#hud-feed-list')!;
  const cost = hud.querySelector<HTMLElement>('#hud-cost')!;
  let activity: Activity = { tiles: [], rows: [], cost: null };
  const elapsed = (ms: number) => {
    const seconds = Math.max(0, Math.round(ms / 1000));
    return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;
  };
  function renderActivity() {
    cost.textContent = activity.cost ?? '';
    cost.title = activity.cost ? 'What the agents\' real work has cost so far, at API prices, as Claude Code reports it' : '';
    tiles.replaceChildren(
      ...activity.tiles.map((tile) => {
        const item = make('div', 'activity-tile');
        item.dataset.tone = tile.tone ?? '';
        item.append(make('span', 'activity-tile-value', String(tile.value)), make('span', 'activity-tile-label', tile.label));
        return item;
      }),
    );
    const scroll = feedList.scrollTop;
    feedList.replaceChildren(
      ...(activity.rows.length === 0 ? [make('li', 'mission-nobody', 'Nothing has happened yet.')] : []),
      ...activity.rows.map((row) => {
        const item = make('li', 'activity-row');
        const button = make('button', 'activity-row-button');
        button.type = 'button';
        button.style.setProperty('--accent', row.accent);
        button.dataset.tone = row.tone ?? '';
        const head = make('span', 'activity-row-head');
        head.append(make('span', 'activity-row-who', row.who), make('span', 'activity-row-verb', row.verb), make('span', 'activity-row-time', row.time));
        const text = make('span', 'activity-row-text', row.text);
        text.title = row.text;
        button.append(head, text);
        // How long it took and what it cost, or how long it has been going.
        const facts = [row.durationMs !== undefined ? elapsed(row.durationMs) : row.since ? `${elapsed(Date.now() - Date.parse(row.since))} so far` : '', row.cost ?? ''].filter(Boolean).join(' · ');
        if (facts) button.append(make('span', 'activity-row-facts', facts));
        if (row.agentId) {
          const agentId = row.agentId;
          button.setAttribute('aria-label', `Show ${row.who}: ${row.verb} ${row.text}`);
          button.addEventListener('click', () => pickAgent(agentId));
        } else button.disabled = true;
        item.append(button);
        return item;
      }),
    );
    feedList.scrollTop = scroll;
  }
  renderActivity();
  // "So far" times move on by themselves.
  window.setInterval(() => {
    if (activity.rows.some((row) => row.since)) renderActivity();
  }, 10_000);

  return {
    element: hud,
    commandSlot: hud.querySelector<HTMLElement>('#hud-command')!,
    setActiveMissions(count) {
      missionsCount.textContent = String(count);
      missions.setAttribute('aria-label', `Active missions: ${count}`);
      missions.classList.toggle('is-active', count > 0);
    },
    setBoard(next) {
      board = next;
      renderBoard();
    },
    onPickAgent(handler) {
      pickAgent = handler;
    },
    setAgentPanelOpen(open) {
      // The agent's panel takes the activity feed's place while it is open.
      hud.dataset.agent = open ? 'open' : 'closed';
      layoutChanged();
    },
    setActivity(next) {
      activity = next;
      renderActivity();
    },
    insets() {
      if (!wide.matches) return { left: 0, right: 0 };
      const taken = (element: HTMLElement) => Math.round(element.getBoundingClientRect().width) + 12;
      function tick() {
    const now = new Date();
    clock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    clock.setAttribute('datetime', now.toISOString());
    date.textContent = `${WEEKDAYS[now.getDay()]} ${pad(now.getDate())} ${MONTHS[now.getMonth()]}`;
  }
  tick();
  // Re-sync to the top of each second so the display never skips or stalls.
  (function schedule() {
    window.setTimeout(() => {
      tick();
      schedule();
    }, 1000 - (Date.now() % 1000) + 5);
  })();

  return { left: sides.left.open ? taken(sides.left.element) : 0, right: sides.right.open || hud.dataset.agent === 'open' ? taken(sides.right.element) : 0 };
    },
    onLayout(handler) {
      layoutChanged = handler;
    },
    setFeedStatus(status) {
      const [label, explanation] = FEED_LABELS[status];
      feed.dataset.status = status;
      feed.textContent = label;
      feed.title = explanation;
    },
    setSky(mode, light) {
      if (sky.dataset.mode === mode && sky.dataset.light === String(light)) return;
      sky.dataset.mode = mode;
      sky.dataset.light = String(light);
      skyLabel.textContent = SKY_LABELS[mode];
      sky.setAttribute('aria-label', `Time of day: ${SKY_LABELS[mode]}${mode === 'auto' ? ' (follows your clock)' : ''}. Press to change.`);
      sky.title = mode === 'auto' ? 'Follows your clock. Press to preview day, dusk or night.' : 'Press to change the time of day.';
    },
    onSkyMode(handler) {
      sky.addEventListener('click', () => {
        const current = (sky.dataset.mode ?? 'auto') as SkyMode;
        handler(SKY_MODES[(SKY_MODES.indexOf(current) + 1) % SKY_MODES.length]);
      });
    },
    onResetView(handler) {
      reset.addEventListener('click', handler);
    },
    setLabels(on) {
      labels.dataset.on = String(on);
      labels.setAttribute('aria-pressed', String(on));
      labels.title = on ? 'Hide every name tag over the office (L)' : 'Show the name tags again (L)';
    },
    onLabels(handler) {
      labels.addEventListener('click', handler);
    },
    showNotice(title, detail) {
      const notice = document.createElement('div');
      notice.className = 'panel notice';
      notice.setAttribute('role', 'alert');
      const heading = document.createElement('strong');
      heading.textContent = title;
      const body = document.createElement('p');
      body.textContent = detail;
      notice.append(heading, body);
      hud.append(notice);
    },
  };
}
