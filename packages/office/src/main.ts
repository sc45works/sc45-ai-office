/**
 * SC45 AI Office: entry point.
 *
 * Owns the renderer, the camera rig (default view, orbit, reset) and the frame loop,
 * and connects the event feed to the agents, the mission board and the overlay.
 * The scene lives in scene.ts, the agents in agents.ts, events in events.ts,
 * routes in navigation.ts, post-processing in postfx.ts, the overlay in ui.ts.
 */
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CHIEF_OF_STAFF_ID, COORDINATOR_ID, activeMissionCount, applyEvent, buildAgentGraph, buildCompanyGraph, defaultAppearance, parseProfileChange, type ProfileChange, builtInPlan, emptySnapshot, parsePlan, planToEvents, type OfficeEvent } from '@sc45/shared';
import { createAgents } from './agents';
import { createAlerts } from './alerts';
import { createApprovals, type ApprovalCard } from './approvals';
import { createCommandBar, type AttachedFile, type CommandAnswer } from './command';
import { createMockFeed, createServerFeed, serverIsUp, serverUrlFromPage, type FeedListener, type OfficeFeed } from './events';
import { easeSky, nightLevel, skyAt, skyFor, type SkyMode } from './daylight';
import { FLOOR } from './layout';
import { createGraphView } from './graph';
import { createNavigator } from './navigation';
import { createAgentPanel } from './panel';
import { createPets } from './pets';
import { createReview, type ReviewCard } from './review';
import { createTour } from './tour';
import { buildDrones } from './drones';
import { createRobot } from './robot';
import { createOffice } from './scene';
import { BLOOM, createPostFX } from './postfx';
import { createHud } from './ui';

/**
 * The canvas is never drawn at more than this many pixels per CSS pixel. A phone's screen is
 * dense enough that 1.5 looks sharp, and every step up costs its square in work for the GPU.
 */
const MAX_PIXEL_RATIO = window.matchMedia('(pointer: coarse)').matches ? 1.5 : 1.75;
/** With nobody touching the view, the office is drawn this often; while it is being moved, every frame. */
const IDLE_FRAME_MS = 1000 / 30;
/** Camera pitch below the horizon, from docs/brief.md. */
const VIEW_ELEVATION = THREE.MathUtils.degToRad(35);
/** Desk role labels appear once the camera is closer than this to its target. */
const DETAIL_DISTANCE = 34;

const app = document.getElementById('app');
if (!app) throw new Error('Missing #app element');

const stage = document.createElement('div');
stage.className = 'stage';
app.append(stage);

const hud = createHud(app);
const approvals = createApprovals(app);
const alerts = createAlerts(hud.element);
const review = createReview(app);
const tour = createTour(app, hud.element.querySelector('.hud-bottom'));
const PAGE_TITLE = document.title;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function createRenderer(): THREE.WebGLRenderer | null {
  try {
    // Anti-aliasing happens in the post-processing target (postfx.ts), not on the canvas.
    // No preference for the fastest graphics chip: on a laptop with two, the frugal one is enough and spares the battery.
    return new THREE.WebGLRenderer({ antialias: false, powerPreference: 'default' });
  } catch {
    return null;
  }
}

const renderer = createRenderer();
if (!renderer) {
  hud.showNotice('3D view unavailable', 'This browser could not start WebGL. Try a current version of Chrome, Edge, Safari or Firefox.');
} else {
  start(renderer);
}

function start(renderer: THREE.WebGLRenderer) {
  renderer.toneMapping = THREE.NeutralToneMapping;
  // Sun shadows, of the things that stand still, drawn again only when the sun has moved. Not on
  // phones and tablets, where every extra pass counts.
  renderer.shadowMap.enabled = !window.matchMedia('(pointer: coarse)').matches;
  renderer.shadowMap.type = THREE.PCFShadowMap; // filtered, so the edges are soft
  renderer.shadowMap.autoUpdate = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.domElement.setAttribute('aria-label', '3D view of the SC45 AI Office');
  renderer.domElement.setAttribute('role', 'img');
  stage.append(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = 'labels';
  labelRenderer.domElement.dataset.detail = 'off';
  stage.append(labelRenderer.domElement);

  const office = createOffice();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 800);
  const postfx = createPostFX(renderer, office.scene, camera);
  const drones = buildDrones(office.scene);

  // Agents, driven only by events ---------------------------------------------

  const routes = createNavigator(office.obstacles, FLOOR, office.floorHeightAt);
  // `?pace=10` brings breaks and Stephen's rounds round ten times sooner, to see them without waiting.
  const agents = createAgents(office, routes, { instant: () => reducedMotion.matches, pace: Number(new URLSearchParams(window.location.search).get('pace')) || 1 });
  const pets = createPets(office, routes, { still: () => reducedMotion.matches, leader: () => agents.leading() });
  const robot = createRobot(office, routes, agents, { still: () => reducedMotion.matches });

  // The office keeps its own snapshot of the current state, built with the same `applyEvent`
  // the server uses, so the two can never disagree about what an event means.
  let snapshot = emptySnapshot();

  // Selection: click an agent to follow it, with a side panel and a graph of what it has touched.
  const panel = createAgentPanel(hud.element);
  const graphView = createGraphView(office.scene);
  let selectedId: string | null = null;

  // The company core: click the hologram on the executive deck and it rises and opens into one
  // large sphere of every mission, the people on each, and what they have produced.
  const coreView = createGraphView(office.scene, {
    scale: 2.7,
    nodeScale: 0.5,
    dotted: true,
    height: 8.6,
    labelAgents: true,
    colorOf: (node) => (node.agentId ? agents.get(node.agentId)?.accent : undefined),
    onPickAgent: (agentId) => select(agentId),
  });
  let coreOpen = false;
  function renderCore() {
    if (coreOpen) coreView.show(buildCompanyGraph(snapshot), '#ffffff');
  }

  /** Redraw the panel and the graph for the selected agent from the current snapshot. */
  function renderSelection() {
    if (!selectedId) return;
    const details = agents.get(selectedId);
    if (!details) return;
    const status = snapshot.agents[selectedId];
    const activity = snapshot.activity?.[selectedId];
    const missionId = status?.missionId ?? activity?.missions.at(-1);
    const mission = snapshot.missions.find((item) => item.id === missionId);
    panel.show({
      id: selectedId,
      name: details.name,
      appearance: details.appearance,
      original: { name: details.profile.name, appearance: defaultAppearance(selectedId) },
      role: details.profile.role,
      accent: details.accent,
      state: status?.state ?? 'idle',
      task: status?.task,
      since: status?.since ?? null,
      mission: mission && { id: mission.id, title: mission.title, status: mission.status },
      outputs: [...(activity?.outputs ?? [])].reverse(),
      tasks: [...(activity?.tasks ?? [])].reverse(),
    });
    graphView.show(buildAgentGraph(snapshot, selectedId), details.accent);
  }

  /**
   * Each working agent's monitor shows what it is doing: its task, and under it the files it has
   * reported and the tasks it has finished for the same mission. An idle agent's screen is off.
   */
  /** While the tour plays: the agents shown working, whose screens are lit to match. Empty otherwise. */
  let stagedWorking = new Set<string>();
  function renderScreens() {
    for (const agent of agents.list()) {
      const status = snapshot.agents[agent.id];
      if (stagedWorking.has(agent.id) && (!status || status.state === 'idle')) {
        office.setDeskScreen(agent.id, { title: 'Working', lines: [], blocked: false });
        continue;
      }
      if (!status || status.state === 'idle') {
        office.setDeskScreen(agent.id, null);
        continue;
      }
      const activity = snapshot.activity?.[agent.id];
      const title = status.task ?? status.state;
      const lines = [
        ...(activity?.tasks ?? []).filter((task) => task.label !== title && task.missionId === status.missionId).map((task) => ({ ts: task.ts, text: task.label })),
        ...(activity?.outputs ?? []).filter((output) => !status.missionId || output.missionId === status.missionId).map((output) => ({ ts: output.ts, text: output.path })),
      ]
        .sort((a, b) => a.ts.localeCompare(b.ts))
        .map((line) => line.text);
      office.setDeskScreen(agent.id, { title, missionId: status.missionId, lines, blocked: status.state === 'blocked' });
    }
  }

  function renderMissions() {
    office.setMissions(snapshot.missions);
    hud.setActiveMissions(activeMissionCount(snapshot));
    renderMissionList();
  }

  /** The departments, in the order they are shown, by the first part of an agent's id. */
  const DEPARTMENTS: Array<[prefix: string, name: string]> = [
    ['exec', 'Executive'],
    ['design', 'Design'],
    ['dev', 'Development'],
    ['content', 'Content & Marketing'],
    ['sales', 'Sales & Client Care'],
    ['research', 'Research & Intelligence'],
  ];

  /**
   * The panel under the counter, three ways: each open mission (newest first) with who is on it
   * and who comes next; each department's load; and everyone with their task, the busy first.
   */
  function renderMissionList() {
    const lead = (id: string) => (id === COORDINATOR_ID ? 0 : id === CHIEF_OF_STAFF_ID ? 1 : 2);
    const everyone = agents.list();
    const person = (id: string) => ({ id, name: agents.nameOf(id) ?? id, accent: agents.get(id)?.accent ?? '#ffffff' });
    const busy = (id: string) => (snapshot.agents[id]?.state ?? 'idle') !== 'idle';

    const missions = snapshot.missions
      .filter((mission) => mission.status !== 'done')
      .reverse()
      .map((mission) => {
        const active = everyone.filter((agent) => snapshot.agents[agent.id]?.missionId === mission.id && busy(agent.id)).sort((a, b) => lead(a.id) - lead(b.id));
        // Someone given a task in a later stage has not touched the mission yet.
        const waiting = (mission.assignments ?? []).filter((entry) => !snapshot.activity?.[entry.agentId]?.missions.includes(mission.id) && agents.get(entry.agentId));
        const stages = [...new Set((mission.assignments ?? []).map((entry) => entry.stage))].sort((a, b) => a - b);
        const current = Math.min(...(mission.assignments ?? []).filter((entry) => active.some((agent) => agent.id === entry.agentId)).map((entry) => entry.stage));
        return {
          id: mission.id,
          title: mission.title,
          status: mission.status,
          project: mission.project,
          people: active.map((agent) => person(agent.id)),
          next: waiting.sort((a, b) => a.stage - b.stage).map((entry) => person(entry.agentId)),
          stage: stages.length > 1 && Number.isFinite(current) ? `Stage ${stages.indexOf(current) + 1} of ${stages.length}` : undefined,
        };
      });

    const departments = DEPARTMENTS.map(([prefix, name]) => {
      const members = everyone.filter((agent) => agent.id.startsWith(`${prefix}.`) && !agents.get(agent.id)?.profile.human);
      return {
        name,
        accent: agents.get(members[0]?.id ?? '')?.accent ?? '#ffffff',
        total: members.length,
        busy: members.filter((agent) => busy(agent.id)).map((agent) => ({ ...person(agent.id), task: snapshot.agents[agent.id]?.task ?? snapshot.agents[agent.id]?.state ?? '' })),
      };
    }).filter((department) => department.total > 0);

    const rows = everyone
      .filter((agent) => !agents.get(agent.id)?.profile.human)
      .map((agent) => {
        const status = snapshot.agents[agent.id];
        return { ...person(agent.id), role: agents.get(agent.id)?.profile.role ?? '', state: status?.state ?? 'idle', task: status?.task, missionId: status?.missionId };
      });
    rows.sort((a, b) => Number(a.state === 'idle') - Number(b.state === 'idle'));

    hud.setBoard({ missions, departments, agents: rows });
  }

  /**
   * The activity feed: the last things that happened, newest first, and three counts. Finished
   * real work carries how long it took and what it cost; work still going shows its time so far.
   */
  function renderActivity() {
    const money = (usd: number) => `$${usd < 0.995 ? usd.toFixed(2) : usd.toFixed(usd < 100 ? 2 : 0)}`;
    const states = agents
      .list()
      .filter((agent) => !agents.get(agent.id)?.profile.human)
      .map((agent) => snapshot.agents[agent.id]?.state ?? 'idle');
    const blocked = states.filter((state) => state === 'blocked').length;
    const idle = states.filter((state) => state === 'idle').length;
    const rows = [...(snapshot.recent ?? [])]
      .reverse()
      .slice(0, 40)
      .map((entry) => {
        const time = new Date(entry.ts);
        const base = { time: `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`, accent: agents.get(entry.agentId)?.accent ?? '#ffffff' };
        if (entry.type.startsWith('mission.')) {
          const verb = entry.type === 'mission.created' ? 'opened' : entry.type === 'mission.closed' ? 'closed' : 'updated';
          const title = entry.task ?? snapshot.missions.find((mission) => mission.id === entry.missionId)?.title ?? '';
          return { ...base, who: entry.missionId ?? 'Mission', verb, text: title, tone: entry.type === 'mission.closed' ? ('good' as const) : undefined };
        }
        const who = agents.nameOf(entry.agentId) ?? entry.agentId;
        if (entry.type === 'approval.requested') return { ...base, agentId: entry.agentId, who, verb: 'asks you', text: entry.task ?? '', tone: 'alert' as const };
        if (entry.type === 'approval.decided') {
          const decision = entry.decision ?? 'decided';
          return { ...base, who, verb: decision, text: [entry.missionId, entry.task].filter(Boolean).join(' · '), tone: decision === 'approved' ? ('good' as const) : decision === 'declined' ? ('alert' as const) : ('quiet' as const) };
        }
        if (entry.type === 'agent.output') return { ...base, agentId: entry.agentId, who, verb: (entry.task ?? 'file').toLowerCase(), text: entry.path ?? '', tone: 'quiet' as const };
        // A state: still the agent's current one if nothing has replaced it since.
        const status = snapshot.agents[entry.agentId];
        const current = status?.state === entry.state && status.since === entry.ts;
        const unfinished = entry.verdict !== undefined && entry.verdict !== 'done';
        const verb = entry.state === 'working' ? 'started' : entry.state === 'reporting' ? (unfinished ? 'not finished' : 'reports') : (entry.state ?? '');
        return {
          ...base,
          agentId: entry.agentId,
          who,
          verb,
          text: entry.task ?? '',
          tone: entry.state === 'blocked' || unfinished ? ('alert' as const) : entry.state === 'reporting' ? ('good' as const) : undefined,
          durationMs: entry.durationMs,
          cost: entry.costUsd !== undefined ? money(entry.costUsd) : undefined,
          since: current && entry.state === 'working' ? entry.ts : undefined,
        };
      });
    const usage = snapshot.usage;
    hud.setActivity({
      tiles: [
        { label: 'working', value: states.length - idle - blocked, tone: 'good' },
        { label: 'blocked', value: blocked, tone: blocked ? 'alert' : 'quiet' },
        { label: 'idle', value: idle, tone: 'quiet' },
        // Only when something is: what is waiting for Stephen himself.
        ...(snapshot.approvals?.length ? [{ label: 'need you', value: snapshot.approvals.length, tone: 'alert' as const }] : []),
      ],
      rows,
      cost: usage && usage.runs > 0 ? `${money(usage.costUsd)} · ${usage.runs} run${usage.runs === 1 ? '' : 's'}` : null,
    });
  }

  // Work for review ---------------------------------------------------------
  // A mission whose work is done (closed, or waiting only for the signature that closes it) and
  // which left files is put on Stephen's desk as a folder, until he marks it reviewed. Which he
  // has reviewed is kept in this browser.
  const REVIEWED_KEY = 'sc45.reviewed';
  let reviewed: string[] = [];
  try {
    const kept = JSON.parse(window.localStorage.getItem(REVIEWED_KEY) ?? '[]') as unknown;
    if (Array.isArray(kept)) reviewed = kept.filter((id): id is string => typeof id === 'string');
  } catch {
    /* nothing kept, or no storage here */
  }
  function renderReviews() {
    const money = (usd: number) => `$${usd.toFixed(2)}`;
    const cards: ReviewCard[] = [];
    for (const mission of [...snapshot.missions].reverse()) {
      const closing = (snapshot.approvals ?? []).some((approval) => approval.missionId === mission.id && approval.kind === 'close');
      if ((mission.status !== 'done' && !closing) || reviewed.includes(`${mission.id}@${mission.createdAt}`)) continue;
      const files: ReviewCard['files'] = [];
      for (const [agentId, activity] of Object.entries(snapshot.activity ?? {})) {
        for (const output of activity.outputs) {
          if (output.missionId !== mission.id || files.some((file) => file.path === output.path)) continue;
          const url = feedStatus === 'live' && serverUrl && mission.project ? `${serverUrl}/files/${output.path.split('/').map(encodeURIComponent).join('/')}` : null;
          files.push({ path: output.path, label: output.label ?? 'File', by: agents.nameOf(agentId) ?? agentId, url });
        }
      }
      if (files.length === 0) continue; // nothing was made: nothing to review
      // Reports last; the page a visitor would land on, if there is one, is what "Open the work" opens.
      files.sort((a, b) => Number(a.path.includes('/reports/')) - Number(b.path.includes('/reports/')) || a.path.localeCompare(b.path));
      const front = files.find((file) => /(^|\/)index\.html?$/i.test(file.path)) ?? files.find((file) => /\.html?$/i.test(file.path));
      const cost = (snapshot.recent ?? []).filter((entry) => entry.missionId === mission.id && entry.costUsd !== undefined).reduce((sum, entry) => sum + (entry.costUsd ?? 0), 0);
      const problems = mission.problems ?? [];
      const facts = [mission.project ? `Project ${mission.project}` : 'No project', closing ? 'Waiting for your sign-off to close' : 'Closed', `${files.length} file${files.length === 1 ? '' : 's'}`];
      if (problems.length > 0) facts.push(`${problems.length} task${problems.length === 1 ? '' : 's'} not done`);
      if (cost > 0) facts.push(`${money(cost)} spent`);
      cards.push({
        missionId: mission.id,
        title: mission.title,
        facts,
        troubled: problems.length > 0,
        people: (mission.assignments ?? []).map((entry) => {
          const problem = problems.find((item) => item.agentId === entry.agentId);
          return { name: agents.nameOf(entry.agentId) ?? entry.agentId, role: agents.get(entry.agentId)?.profile.role ?? '', accent: agents.get(entry.agentId)?.accent ?? '#ffffff', task: entry.task, ...(problem ? { problem: problem.note } : {}) };
        }),
        files,
        home: front?.url ?? null,
      });
    }
    review.set(cards);
    office.setReviews(cards.map((card) => card.missionId), cards.some((card) => card.troubled));
  }
  review.onReviewed((missionId) => {
    const mission = snapshot.missions.find((item) => item.id === missionId);
    // Mission numbers start again when the log does, so the date it was opened goes with the number.
    reviewed = [...reviewed, `${missionId}@${mission?.createdAt ?? ''}`].slice(-200);
    try {
      window.localStorage.setItem(REVIEWED_KEY, JSON.stringify(reviewed));
    } catch {
      /* not remembered, that is all */
    }
    renderReviews();
  });

  /** What is waiting for Stephen's sign-off, as the card shows it. */
  function renderApprovals() {
    const money = (usd: number) => `$${usd.toFixed(2)}`;
    const cards: ApprovalCard[] = (snapshot.approvals ?? []).map((approval) => {
      const mission = snapshot.missions.find((item) => item.id === approval.missionId);
      const severalStages = new Set(approval.items.map((item) => item.stage)).size > 1;
      const facts: string[] = [];
      if (approval.project) facts.push(`Project ${approval.project}`);
      if (approval.kind === 'stage' && approval.stage && approval.stages) facts.push(`Stage ${approval.stage} of ${approval.stages}`);
      if (approval.kind === 'start' && approval.stages && approval.stages > 1) facts.push(`${approval.stages} stages`);
      if (approval.files !== undefined && approval.kind !== 'start') facts.push(`${approval.files} file${approval.files === 1 ? '' : 's'} so far`);
      if (approval.costUsd !== undefined && approval.costUsd > 0) facts.push(`${money(approval.costUsd)} spent`);
      if (approval.problems) facts.push(approval.kind === 'close' ? `${approval.problems} task${approval.problems === 1 ? '' : 's'} not done` : `${approval.problems} earlier task${approval.problems === 1 ? '' : 's'} not done`);
      return {
        id: approval.id,
        kind: approval.kind,
        missionId: approval.missionId,
        mission: mission?.title ?? approval.title,
        askedBy: agents.nameOf(approval.requestedBy) ?? approval.requestedBy,
        askedAt: approval.requestedAt,
        facts,
        troubled: Boolean(approval.problems),
        items: approval.items.map((item) => ({
          name: agents.nameOf(item.agentId) ?? item.agentId,
          role: agents.get(item.agentId)?.profile.role ?? '',
          accent: agents.get(item.agentId)?.accent ?? '#ffffff',
          task: item.task,
          ...(severalStages && item.stage ? { stage: `Stage ${item.stage}` } : {}),
          ...(item.risk ? { risk: item.risk } : {}),
          // On a request to close, what is marked on a task is what went wrong with it.
          ...(approval.kind === 'close' ? { flag: 'Not done' } : {}),
        })),
      };
    });
    approvals.set(cards);
    // The tab says how many are waiting, for when the office is behind another window.
    document.title = cards.length > 0 ? `(${cards.length}) ${PAGE_TITLE}` : PAGE_TITLE;
  }

  /**
   * Call Stephen over, with a sound and a notification, for the two things that need him: a
   * sign-off, and a mission whose work is done. Only for the real office: the demo's script
   * closes a mission every minute or so, and nobody wants a bell for that.
   */
  const finishedAnnounced = new Set<string>();
  function announce(event: OfficeEvent) {
    if (feedStatus !== 'live' || !event.missionId) return;
    const mission = snapshot.missions.find((item) => item.id === event.missionId);
    const name = mission ? `${mission.id}: ${mission.title}` : event.missionId;
    if (event.type === 'approval.requested') {
      if (event.meta?.kind === 'close') {
        finishedAnnounced.add(event.missionId);
        const problems = typeof event.meta.problems === 'number' ? event.meta.problems : 0;
        // Everyone has stopped. With everything done, this is the "it is finished" moment; with problems, it is the opposite.
        if (problems > 0) alerts.raise('problem', `Not completed: ${name}`, `${problems} task${problems === 1 ? '' : 's'} did not get done. Open the office to see what happened.`);
        else alerts.raise('finished', `Finished: ${name}`, 'Everyone has reported. Sign off to close the mission.');
      } else {
        alerts.raise('approval', 'Sign-off needed', event.task ?? name);
      }
    } else if (event.type === 'mission.closed' && !finishedAnnounced.has(event.missionId) && !declined.has(event.missionId)) {
      // Closed some other way (by a request to Sophia, or with sign-offs switched off).
      alerts.raise('finished', `Finished: ${name}`, 'The mission has been closed.');
    } else if (event.type === 'agent.state' && typeof event.meta?.verdict === 'string' && event.meta.verdict !== 'done') {
      // An agent has come back with its task not done: say so now, not when the mission ends.
      alerts.raise('problem', `${agents.nameOf(event.agentId) ?? event.agentId} could not finish`, event.task ?? name);
    } else if (event.type === 'approval.decided' && event.meta?.decision === 'declined') {
      declined.add(event.missionId); // a mission closed because its start was declined did not finish
    }
  }
  const declined = new Set<string>();

  const listener: FeedListener = {
    onSnapshot(next) {
      snapshot = next;
      snapshot.profiles ??= {};
      snapshot.approvals ??= [];
      // With no server, names and looks are kept in this browser, and put back each time the demo restarts.
      if (feedStatus !== 'live') Object.assign(snapshot.profiles, localProfiles);
      agents.sync(snapshot);
      renderMissions();
      renderSelection();
      renderCore();
      renderScreens();
      renderActivity();
      renderApprovals();
      renderReviews();
    },
    onEvent(event) {
      applyEvent(snapshot, event);
      agents.apply(event);
      announce(event);
      if (event.type.startsWith('mission.') && event.missionId) {
        renderMissions();
      } else if (event.type === 'agent.state' || event.type === 'agent.profile') {
        renderMissionList(); // who is on which mission, or what they are called, may have changed
      }
      renderActivity();
      if (event.type.startsWith('approval.')) renderApprovals();
      if (event.type.startsWith('approval.') || event.type === 'mission.closed' || event.type === 'agent.output') renderReviews();
      if (event.agentId === selectedId || event.type.startsWith('mission.')) renderSelection();
      renderCore();
      if (event.type === 'agent.state' || event.type === 'agent.output') renderScreens();
    },
    onStatus: (status) => {
      feedStatus = status;
      hud.setFeedStatus(status);
    },
  };

  let feedStatus: 'demo' | 'live' | 'reconnecting' = 'demo';

  // Editing someone: the change shows at once, and is saved a moment later, so dragging through
  // colours does not write an event per colour. Live, it is saved by the server (and so reaches
  // every open office); with no server, it is kept in this browser.
  const PROFILES_KEY = 'sc45.profiles';
  let localProfiles: Record<string, ProfileChange> = {};
  try {
    // Checked like anything else read from outside: a damaged entry is dropped, not believed.
    for (const [agentId, kept] of Object.entries(JSON.parse(window.localStorage.getItem(PROFILES_KEY) ?? '{}') as Record<string, unknown>)) {
      const checked = parseProfileChange(kept);
      if (checked.ok) localProfiles[agentId] = checked.change;
    }
  } catch {
    /* nothing kept, or no storage here */
  }
  const unsaved = new Map<string, ProfileChange>();
  let saveTimer = 0;
  panel.onEdit((agentId, change) => {
    agents.setProfile(agentId, change.name, change.appearance);
    snapshot.profiles ??= {};
    snapshot.profiles[agentId] = { ...snapshot.profiles[agentId], ...change };
    renderSelection();
    renderMissionList();
    renderCore();
    unsaved.set(agentId, { ...unsaved.get(agentId), ...change });
    panel.setSaveNote('Saving…');
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveProfiles, 450);
  });
  async function saveProfiles() {
    const changes = [...unsaved];
    unsaved.clear();
    if (feedStatus === 'live' && serverUrl) {
      try {
        for (const [agentId, change] of changes) {
          const response = await fetch(`${serverUrl}/agents/${encodeURIComponent(agentId)}/profile`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(change) });
          if (!response.ok) throw new Error(((await response.json().catch(() => ({}))) as { error?: string }).error ?? `The server answered ${response.status}.`);
        }
        panel.setSaveNote('Saved');
      } catch (error) {
        panel.setSaveNote(`Not saved: ${(error as Error).message || 'the server did not answer.'}`, true);
      }
      return;
    }
    for (const [agentId, change] of changes) localProfiles[agentId] = { ...localProfiles[agentId], ...change };
    try {
      window.localStorage.setItem(PROFILES_KEY, JSON.stringify(localProfiles));
      panel.setSaveNote('Saved in this browser');
    } catch {
      panel.setSaveNote('Changed for now; this browser cannot keep it.', true);
    }
  }

  // Start with the built-in demo, and switch to the local server as soon as it answers.
  let feed: OfficeFeed = createMockFeed();
  feed.start(listener);
  const serverUrl = serverUrlFromPage();
  if (serverUrl) {
    const lookForServer = async () => {
      if (await serverIsUp(serverUrl)) {
        feed.stop();
        feed = createServerFeed(serverUrl);
        feed.start(listener);
      } else {
        window.setTimeout(lookForServer, 5000);
      }
    };
    void lookForServer();
  }


  // Commands to the Chief of Staff ---------------------------------------------

  /** Live: the server plans the request (with Claude Code, if it is installed) and writes the events. */
  async function commandServer(text: string, attached: AttachedFile[]): Promise<CommandAnswer> {
    // Anything attached is sent first, a file at a time, under one made-up name the command then quotes.
    let batch: string | undefined;
    if (attached.length > 0) {
      batch = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
      for (const { file, path } of attached) {
        let sent: Response;
        try {
          sent = await fetch(`${serverUrl}/attachments/${batch}?path=${encodeURIComponent(path)}`, { method: 'POST', headers: { 'content-type': 'application/octet-stream' }, body: file });
        } catch {
          throw new Error(`"${file.name}" could not be sent: the server did not answer.`);
        }
        if (!sent.ok) throw new Error(((await sent.json().catch(() => ({}))) as { error?: string }).error ?? `"${file.name}" could not be sent.`);
      }
    }
    let response: Response;
    try {
      response = await fetch(`${serverUrl}/command`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, ...(batch ? { attachments: batch } : {}) }) });
    } catch {
      throw new Error('The server did not answer. Is it still running?');
    }
    const body = (await response.json().catch(() => ({}))) as Partial<CommandAnswer> & { error?: string; dropped?: string[] };
    if (!response.ok || !body.reply) throw new Error(body.error ?? `The server answered ${response.status}.`);
    return { reply: body.reply, summary: body.summary ?? [], note: body.note };
  }

  /** Demo: no server, so the built-in planner runs here and its events stay in this tab. */
  async function commandLocally(text: string): Promise<CommandAnswer> {
    const checked = parsePlan(builtInPlan(text, snapshot), snapshot);
    if (!checked.ok) throw new Error(checked.error);
    const work = planToEvents(checked.plan, snapshot);
    const chief = 'exec.chief-of-staff';
    const play = (event: Omit<OfficeEvent, 'ts'>, afterMs: number) => window.setTimeout(() => listener.onEvent({ ts: new Date().toISOString(), ...event }), afterMs);
    if (work.events.length > 0) play({ type: 'agent.state', agentId: chief, state: 'working', task: 'Briefing the team' }, 0);
    work.events.forEach((event, index) => play(event, 650 * (index + 1)));
    if (work.events.length > 0) play({ type: 'agent.state', agentId: chief, state: 'idle' }, 650 * (work.events.length + 1));
    return { reply: checked.plan.reply, summary: work.summary, note: 'Demo mode: planned by the built-in rules, in this tab only.' };
  }

  // Sign-offs. Live, the answer goes to the server, which records it and lets the work go on (or
  // not). In the demo there is nothing behind the request, so the answer is only shown.
  approvals.onDecide(async (id, decision, note) => {
    if (feedStatus === 'live' && serverUrl) {
      let response: Response;
      try {
        response = await fetch(`${serverUrl}/approvals/${encodeURIComponent(id)}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision, ...(note ? { note } : {}) }) });
      } catch {
        throw new Error('the server did not answer. Is it still running?');
      }
      if (!response.ok) throw new Error(((await response.json().catch(() => ({}))) as { error?: string }).error ?? `the server answered ${response.status}.`);
      return;
    }
    const request = snapshot.approvals?.find((approval) => approval.id === id);
    listener.onEvent({ ts: new Date().toISOString(), type: 'approval.decided', agentId: 'exec.ceo', ...(request ? { missionId: request.missionId } : {}), ...(note ? { task: note } : {}), meta: { approvalId: id, decision } });
  });

  createCommandBar(hud.commandSlot).onCommand((text, attached) => {
    if (feedStatus === 'live' && serverUrl) return commandServer(text, attached);
    // In the demo there is nowhere to send a file and nobody to read it.
    if (attached.length > 0) return Promise.reject(new Error('Attachments need the office server running. Remove them, or start the server.'));
    return commandLocally(text);
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.screenSpacePanning = false; // pan along the floor, not the screen
  controls.minDistance = 7;
  controls.maxPolarAngle = Math.PI / 2 - 0.09; // never below the floor
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 0.9;

  // In development only: a handle for poking at the office from the browser console, e.g.
  //   __office.emit({ type: 'agent.state', agentId: 'dev.qa', state: 'blocked', task: 'Staging is down' })
  // It changes this browser tab only; to change the real office, use `pnpm emit`.
  if (import.meta.env.DEV) {
    const handle = {
      office,
      renderer,
      agents,
      routes,
      camera,
      controls,
      get feed() {
        return feed;
      },
      get snapshot() {
        return snapshot;
      },
      select,
      emit: (event: Omit<OfficeEvent, 'ts'>) => listener.onEvent({ ts: new Date().toISOString(), ...event }),
    };
    Object.assign(window, { __office: handle });
  }

  // Default view ------------------------------------------------------------

  const UP = new THREE.Vector3(0, 1, 0);
  const VIEW_TARGET = new THREE.Vector3(0, 0.6, 0.4);
  const OFFICE_CORNERS: THREE.Vector3[] = [];
  for (const x of [-FLOOR.width / 2, FLOOR.width / 2]) {
    for (const y of [0, 3.6]) {
      for (const z of [-FLOOR.depth / 2, FLOOR.depth / 2]) OFFICE_CORNERS.push(new THREE.Vector3(x, y, z));
    }
  }

  /**
   * The overview: the isometric diagonal, 35 degrees down and turned 45 degrees, so the front of
   * the office and one side are both in view. It is pulled back just far enough that the whole
   * office fits the part of the viewport the sidebars leave (`aspect` is that part's shape).
   * Only when the window itself is tall (a phone) does the camera swing round to look along the
   * floor's long side, which keeps the office about a third larger on screen.
   */
  function defaultView(aspect: number, tall = false) {
    const azimuth = THREE.MathUtils.degToRad(tall ? 84 : 45);
    const direction = new THREE.Vector3(
      Math.sin(azimuth) * Math.cos(VIEW_ELEVATION),
      Math.sin(VIEW_ELEVATION),
      Math.cos(azimuth) * Math.cos(VIEW_ELEVATION),
    );
    const forward = direction.clone().negate();
    const right = new THREE.Vector3().crossVectors(forward, UP).normalize();
    const up = new THREE.Vector3().crossVectors(right, forward);

    // Leave room for the HUD panels at the top and bottom.
    const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.84;
    const tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect * 0.95;

    // Find the distance that fits every corner, then slide the target along the floor until
    // the office is centred on screen. A few passes are enough for the two to settle.
    const target = VIEW_TARGET.clone();
    const groundForward = new THREE.Vector3(forward.x, 0, forward.z).normalize();
    const offset = new THREE.Vector3();
    let distance = 0;
    for (let pass = 0; pass < 4; pass++) {
      distance = 0;
      for (const corner of OFFICE_CORNERS) {
        offset.subVectors(corner, target);
        const depth = offset.dot(forward);
        distance = Math.max(distance, Math.abs(offset.dot(right)) / tanH - depth, Math.abs(offset.dot(up)) / tanV - depth);
      }
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const corner of OFFICE_CORNERS) {
        offset.subVectors(corner, target);
        const reach = distance + offset.dot(forward);
        const sx = offset.dot(right) / reach;
        const sy = offset.dot(up) / reach;
        minX = Math.min(minX, sx);
        maxX = Math.max(maxX, sx);
        minY = Math.min(minY, sy);
        maxY = Math.max(maxY, sy);
      }
      target.addScaledVector(right, ((minX + maxX) / 2) * distance);
      target.addScaledVector(groundForward, (((minY + maxY) / 2) * distance) / Math.sin(VIEW_ELEVATION));
    }
    return {
      target,
      position: target.clone().addScaledVector(direction, distance),
      distance,
    };
  }

  let home = defaultView(1);
  let userMovedCamera = false;
  controls.addEventListener('start', () => {
    userMovedCamera = true;
    tween = null;
  });

  function applyView(view: { position: THREE.Vector3; target: THREE.Vector3 }) {
    camera.position.copy(view.position);
    controls.target.copy(view.target);
    controls.update();
  }

  // Reset (R key or the button): ease back to the overview along an arc.
  interface Tween {
    startedAt: number;
    duration: number;
    fromTarget: THREE.Vector3;
    fromOffset: THREE.Spherical;
    toOffset: THREE.Spherical;
    /** Where the camera ends up looking. For a selected agent this vector is live: it moves with the agent. */
    toTarget: THREE.Vector3;
    /** True when the tween ends at the overview. */
    toHome: boolean;
  }
  let tween: Tween | null = null;

  /** Ease the camera to look at `toTarget` from the given offset, turning the short way round. */
  function easeTo(toTarget: THREE.Vector3, toOffset: THREE.Spherical, toHome: boolean) {
    const fromOffset = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    while (toOffset.theta - fromOffset.theta > Math.PI) toOffset.theta -= Math.PI * 2;
    while (toOffset.theta - fromOffset.theta < -Math.PI) toOffset.theta += Math.PI * 2;
    if (reducedMotion.matches) {
      controls.target.copy(toTarget);
      camera.position.setFromSpherical(toOffset).add(toTarget);
      controls.update();
      userMovedCamera = !toHome;
      return;
    }
    tween = { startedAt: performance.now(), duration: 900, fromTarget: controls.target.clone(), fromOffset, toOffset, toTarget, toHome };
  }

  /** Back to the overview. Also lets go of any selected agent. */
  function resetView() {
    closeCore();
    if (selectedId) {
      selectedId = null;
      agents.setSelected(null);
      panel.hide();
      hud.setAgentPanelOpen(false);
      graphView.hide();
    }
    easeTo(home.target.clone(), new THREE.Spherical().setFromVector3(home.position.clone().sub(home.target)), true);
  }

  // Following a selected agent -------------------------------------------------

  /** The point the camera looks at while following: between the agent and its graph. */
  const followPoint = new THREE.Vector3();
  const FOLLOW_HEIGHT = 3.1;
  /** Far enough back that the agent and the whole graph above it fit the viewport, however narrow. */
  const followDistance = () => (camera.aspect >= 1 ? 16 : 16 / Math.max(camera.aspect * 1.45, 0.6));

  /** Open the company sphere and bring the camera round to it. */
  function openCore() {
    if (selectedId) {
      selectedId = null;
      agents.setSelected(null);
      panel.hide();
      hud.setAgentPanelOpen(false);
      graphView.hide();
    }
    coreOpen = true;
    userMovedCamera = true;
    agents.setSelected(null); // every name tag steps back while the sphere is open
    renderCore();
    const centre = office.core.position.clone().setY(office.core.position.y + 7.6);
    const offset = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    offset.radius = camera.aspect >= 1 ? 34 : 34 / Math.max(camera.aspect * 1.3, 0.6);
    offset.phi = THREE.MathUtils.clamp(offset.phi, 1.05, 1.3);
    easeTo(centre, offset, false);
  }
  function closeCore() {
    if (!coreOpen) return;
    coreOpen = false;
    coreView.hide();
  }

  function select(agentId: string) {
    const details = agents.get(agentId);
    if (!details) return;
    closeCore();
    selectedId = agentId;
    userMovedCamera = true;
    agents.setSelected(agentId);
    hud.setAgentPanelOpen(true);
    renderSelection();
    followPoint.copy(details.position).setY(details.position.y + FOLLOW_HEIGHT);
    // Keep the direction the viewer is looking from; come closer and a little lower.
    const offset = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    offset.radius = THREE.MathUtils.clamp(offset.radius, followDistance() * 0.85, followDistance());
    offset.phi = THREE.MathUtils.clamp(offset.phi, 1.0, 1.22);
    easeTo(followPoint, offset, false);
  }

  const followStep = new THREE.Vector3();
  function follow(deltaSeconds: number) {
    const details = selectedId ? agents.get(selectedId) : undefined;
    if (!details) return;
    followPoint.copy(details.position).setY(details.position.y + FOLLOW_HEIGHT);
    if (tween) return; // the tween is already heading for followPoint
    // Move the camera and its target together, so the viewer's own orbit and zoom are kept.
    followStep.subVectors(followPoint, controls.target).multiplyScalar(1 - Math.exp(-5 * deltaSeconds));
    controls.target.add(followStep);
    camera.position.add(followStep);
  }

  // The side panel covers part of the stage. While an agent is selected the picture is slid across,
  // so the agent sits in the middle of what is left: to the left of the panel on a wide screen,
  // above it on a phone, where the panel is a sheet along the bottom.
  const viewShift = new THREE.Vector2();
  function frameAroundPanel(deltaSeconds: number) {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    // Sideways: so that the picture's middle is the middle of what the sidebars (or the agent's panel) leave free.
    const { left, right } = hud.insets();
    const wantedX = (right - left) / 2;
    const wantedY = selectedId && width <= 520 ? height * 0.2 : 0;
    const ease = reducedMotion.matches ? 1 : 1 - Math.exp(-6 * deltaSeconds);
    viewShift.x += (wantedX - viewShift.x) * ease;
    viewShift.y += (wantedY - viewShift.y) * ease;
    if (Math.abs(viewShift.x) < 0.5 && Math.abs(viewShift.y) < 0.5) {
      if (camera.view) camera.clearViewOffset();
    } else {
      camera.setViewOffset(width, height, viewShift.x, viewShift.y, width, height);
    }
  }

  // Clicking: a press and release in (almost) the same place, so a drag to orbit never selects.
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  function agentAt(clientX: number, clientY: number): string | null {
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.set(((clientX - bounds.left) / bounds.width) * 2 - 1, -((clientY - bounds.top) / bounds.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(agents.pickTargets(), false)[0];
    return (hit?.object.userData.agentId as string | undefined) ?? null;
  }

  /** The agent whose ball in the open company sphere is under the pointer, if any. */
  function coreAgentAt(clientX: number, clientY: number): string | null {
    if (!coreOpen) return null;
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.set(((clientX - bounds.left) / bounds.width) * 2 - 1, -((clientY - bounds.top) / bounds.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return coreView.pickAgent(raycaster.ray);
  }
  function coreAt(clientX: number, clientY: number): boolean {
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.set(((clientX - bounds.left) / bounds.width) * 2 - 1, -((clientY - bounds.top) / bounds.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObject(office.core.pick, false).length > 0;
  }

  function reviewAt(clientX: number, clientY: number): boolean {
    const targets = office.reviewTargets();
    if (targets.length === 0) return false;
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.set(((clientX - bounds.left) / bounds.width) * 2 - 1, -((clientY - bounds.top) / bounds.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(targets, false).length > 0;
  }

  let pressed: { x: number; y: number } | null = null;
  renderer.domElement.addEventListener('pointerdown', (event) => {
    pressed = event.button === 0 ? { x: event.clientX, y: event.clientY } : null;
  });
  renderer.domElement.addEventListener('pointerup', (event) => {
    if (!pressed || Math.hypot(event.clientX - pressed.x, event.clientY - pressed.y) > 6) return;
    // The folders on Stephen's desk come first: he sits right behind them.
    if (reviewAt(event.clientX, event.clientY)) {
      review.open();
      return;
    }
    const agentId = coreAgentAt(event.clientX, event.clientY) ?? agentAt(event.clientX, event.clientY);
    if (agentId) {
      if (agentId !== selectedId) select(agentId);
    } else if (coreAt(event.clientX, event.clientY)) {
      if (coreOpen) resetView();
      else openCore();
    }
  });
  renderer.domElement.addEventListener('pointerleave', () => coreView.hover(null));
  renderer.domElement.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || event.buttons !== 0) return;
    if (coreOpen) {
      coreAt(event.clientX, event.clientY); // aims the ray at the pointer
      coreView.hover(raycaster.ray);
    }
    renderer.domElement.style.cursor = reviewAt(event.clientX, event.clientY) || coreAgentAt(event.clientX, event.clientY) || agentAt(event.clientX, event.clientY) || coreAt(event.clientX, event.clientY) ? 'pointer' : '';
  });
  panel.onClose(resetView);
  hud.onPickAgent((agentId) => select(agentId));

  function stepTween(now: number) {
    if (!tween) return;
    const t = Math.min((now - tween.startedAt) / tween.duration, 1);
    const k = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // ease in-out cubic
    const offset = new THREE.Spherical(
      THREE.MathUtils.lerp(tween.fromOffset.radius, tween.toOffset.radius, k),
      THREE.MathUtils.lerp(tween.fromOffset.phi, tween.toOffset.phi, k),
      THREE.MathUtils.lerp(tween.fromOffset.theta, tween.toOffset.theta, k),
    );
    controls.target.lerpVectors(tween.fromTarget, tween.toTarget, k);
    camera.position.setFromSpherical(offset).add(controls.target);
    if (t >= 1) {
      if (tween.toHome) userMovedCamera = false;
      tween = null;
    }
  }

  hud.onResetView(resetView);

  // Time of day: follows the clock unless a fixed one was chosen, and the choice is remembered.
  const SKY_KEY = 'sc45.sky';
  let skyMode: SkyMode = 'auto';
  try {
    const saved = window.localStorage.getItem(SKY_KEY);
    if (saved === 'day' || saved === 'dusk' || saved === 'night') skyMode = saved;
  } catch {
    /* no storage here: it follows the clock */
  }
  const sky = skyFor(skyMode);
  let skyStarted = false;
  hud.onSkyMode((mode) => {
    skyMode = mode;
    try {
      window.localStorage.setItem(SKY_KEY, mode);
    } catch {
      /* not remembered, that is all */
    }
  });
  // Name tags: everything that floats over the office to say who or what it is (people, their
  // missions, departments, desks, pets, the folder on Stephen's desk) can be put away, to see the
  // place as it would look. The choice is remembered. What the sphere and an agent's graph say
  // stays: there the words are the picture.
  const LABELS_KEY = 'sc45.labels';
  let labelsOn = true;
  try {
    labelsOn = window.localStorage.getItem(LABELS_KEY) !== 'off';
  } catch {
    /* no storage here: they start on */
  }
  function setLabels(on: boolean) {
    labelsOn = on;
    labelRenderer.domElement.dataset.labels = on ? 'on' : 'off';
    hud.setLabels(on);
    try {
      window.localStorage.setItem(LABELS_KEY, on ? 'on' : 'off');
    } catch {
      /* not remembered, that is all */
    }
  }
  setLabels(labelsOn);
  hud.onLabels(() => setLabels(!labelsOn));

  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (approvals.isOpen() || review.isOpen() || tour.isActive() || typing(event.target)) return; // the card, a field or the tour has the keyboard
    if (event.key === 'r' || event.key === 'R') resetView();
    if (event.key === 'l' || event.key === 'L') setLabels(!labelsOn);
    if (event.key === 'Escape' && (selectedId || coreOpen)) resetView();
  });

  // Keyboard navigation --------------------------------------------------------
  // Arrow keys slide across the floor, + and - (or W and S) zoom, Q and E turn round the room.
  // Keys are read as held, not as presses, so movement is smooth; nothing happens while typing.

  const NAV_KEYS = new Set(['arrowup', 'arrowdown', 'arrowleft', 'arrowright', '+', '=', '-', '_', 'w', 's', 'q', 'e']);
  const held = new Set<string>();
  const typing = (target: EventTarget | null) => target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey || typing(event.target) || tour.isActive()) return;
    const key = event.key.toLowerCase();
    if (!NAV_KEYS.has(key)) return;
    held.add(key);
    if (key.startsWith('arrow')) event.preventDefault(); // or the page, or a focused list, would scroll as well
  });
  window.addEventListener('keyup', (event) => held.delete(event.key.toLowerCase()));
  window.addEventListener('blur', () => held.clear());

  const navOffset = new THREE.Spherical();
  const navMove = new THREE.Vector3();
  function keyboardNavigate(deltaSeconds: number) {
    if (held.size === 0 || tween) return;
    const on = (...keys: string[]) => (keys.some((key) => held.has(key)) ? 1 : 0);
    const across = on('arrowright') - on('arrowleft');
    const along = on('arrowup') - on('arrowdown');
    const zoom = on('-', '_', 's') - on('+', '=', 'w');
    const turn = on('q') - on('e');
    if (!across && !along && !zoom && !turn) return;

    navOffset.setFromVector3(navMove.subVectors(camera.position, controls.target));
    // Sliding is along the floor, relative to where the camera is looking, and faster from further out.
    // While an agent is being followed the view stays on them, so only zooming and turning apply.
    if ((across || along) && !selectedId) {
      const sin = Math.sin(navOffset.theta);
      const cos = Math.cos(navOffset.theta);
      const speed = navOffset.radius * 0.6 * deltaSeconds;
      controls.target.x += (cos * across - sin * along) * speed;
      controls.target.z += (-sin * across - cos * along) * speed;
    }
    navOffset.radius = THREE.MathUtils.clamp(navOffset.radius * Math.exp(zoom * 1.3 * deltaSeconds), controls.minDistance, controls.maxDistance);
    navOffset.theta += turn * 1.2 * deltaSeconds;
    camera.position.setFromSpherical(navOffset).add(controls.target);
    userMovedCamera = true;
  }

  // Sizing ------------------------------------------------------------------

  let pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);

  function resize() {
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    postfx.setSize(width, height, pixelRatio);
    labelRenderer.setSize(width, height);

    // The office is fitted to the width the sidebars leave, not to the whole window.
    const { left, right } = hud.insets();
    home = defaultView(Math.max(width - left - right, 200) / height, width < height);
    // Far enough out to take in the city behind, Taipei 101 to its tip, and the mountains.
    controls.maxDistance = home.distance * 3.4;
    if (!userMovedCamera && !tween && !selectedId) applyView(home);
  }
  new ResizeObserver(resize).observe(stage);
  resize();
  hud.onLayout(resize); // folding a sidebar changes how much room the office has

  // Canvas text is first drawn with fallback fonts; redraw once the web fonts arrive.
  Promise.all([document.fonts.load('600 32px "Space Grotesk"'), document.fonts.load('500 20px "JetBrains Mono"')])
    .then(() => office.redrawText())
    .catch(() => {
      /* Fallback fonts stay; nothing else to do. */
    });

  // Frame loop --------------------------------------------------------------

  let slowFrames = 0;
  let lastFrame = performance.now();
  const startedAt = performance.now();

  // When the view was last being moved: by pointer, wheel, touch or key.
  let lastInput = -Infinity;
  for (const type of ['pointerdown', 'pointermove', 'wheel', 'keydown', 'touchmove'] as const) {
    window.addEventListener(type, () => (lastInput = performance.now()), { passive: true, capture: true });
  }

  // When the tour ends, the controls come back and the view returns to where it starts.
  // For the tour the office is staged, on screen only: a third at work with their screens lit, the
  // rest about the place. When it ends, everyone is put back where the events say they are.
  tour.onStart(() => {
    stagedWorking = new Set(agents.stage(true));
    renderScreens();
  });
  tour.onEnd(() => {
    controls.enabled = true;
    held.clear();
    agents.stage(false);
    stagedWorking = new Set();
    agents.sync(snapshot);
    renderScreens();
    resetView();
  });

  function frame(now: number) {
    requestAnimationFrame(frame);

    // Nothing is drawn while the page is hidden. And while nobody is moving the view, half the
    // frames are skipped: people walking at 30 frames a second look the same, for half the work.
    if (document.hidden) return;
    const moving = now - lastInput < 1200 || tween !== null || held.size > 0 || tour.isActive();
    if (!moving && now - lastFrame < IDLE_FRAME_MS - 2) return;

    // If a device cannot hold the frame rate at high pixel density, drop to 1x once.
    const delta = now - lastFrame;
    lastFrame = now;
    if (moving && pixelRatio > 1 && delta < 250) {
      slowFrames = delta > 30 ? slowFrames + 1 : Math.max(0, slowFrames - 2);
      if (slowFrames > 90) {
        pixelRatio = 1;
        resize();
      }
    }

    // The tour flies the camera itself; otherwise it is wherever the controls, the keys or a selection put it.
    const shot = tour.frame(now);
    drones.update(shot ? shot.drones : -1, now / 1000);
    agents.wave(shot?.wave ? shot.position : null);
    if (shot) {
      controls.enabled = false;
      // The sphere opens for its own shot and closes after it.
      if (shot.core && !coreOpen) openCore();
      else if (!shot.core && coreOpen) closeCore();
      tween = null;
      camera.position.copy(shot.position);
      controls.target.copy(shot.look);
      camera.lookAt(shot.look);
      if (camera.view) camera.clearViewOffset();
    } else {
    follow(Math.min(delta / 1000, 0.1));
    keyboardNavigate(Math.min(delta / 1000, 0.1));
    if (tween) stepTween(now);
    else {
      // Panning cannot lose the neighbourhood: the view can be carried to the beach in front, the city behind, and up the tower.
      controls.target.x = THREE.MathUtils.clamp(controls.target.x, -FLOOR.width / 2 - 70, FLOOR.width / 2 + 70);
      controls.target.z = THREE.MathUtils.clamp(controls.target.z, -FLOOR.depth / 2 - 120, FLOOR.depth / 2 + 52); // back as far as Taipei 101
      // Up as far as the top of the tower (drag with the right button, or two fingers, to lift the view).
      controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0, 110);
    }
    controls.update();
    }

    // Fog follows the zoom level: far zones soften but never disappear.
    const distance = camera.position.distanceTo(controls.target);
    // From far away, surfaces that lie close together (a mat on the sand, a rim on a tower) can no
    // longer be told apart in depth, and flicker. Pushing the nearest thing the camera draws
    // further off as it pulls back gives that precision back; up close it stays where it was.
    const near = THREE.MathUtils.clamp(distance * 0.04, 0.5, 8);
    if (Math.abs(camera.near - near) > 0.02) {
      camera.near = near;
      camera.updateProjectionMatrix();
    }
    // By day the haze is thinned, or the whole office takes on the colour of the sky.
    office.fog.density = THREE.MathUtils.clamp(0.42 / distance, 0.0025, 0.012) * THREE.MathUtils.lerp(1, 0.18, sky.daylight);
    labelRenderer.domElement.dataset.detail = distance < DETAIL_DISTANCE ? 'on' : 'off';
    labelRenderer.domElement.dataset.focus = selectedId || coreOpen ? 'on' : 'off';

    // Bloom is tuned for the overview. Up close the neon strips cover far more of the screen,
    // so the glow is eased back to keep surfaces dark instead of washing them out.
    // Time of day. Changes ease in, so pressing the button is a sunrise, not a light switch.
    const target = skyFor(skyMode);
    if (shot) Object.assign(sky, skyAt(shot.hour)); // the tour brings its own sun
    else if (skyStarted) easeSky(sky, target, Math.min(delta / 1000, 0.1));
    else Object.assign(sky, target);
    skyStarted = true;
    office.setSky(sky);
    agents.setNight(nightLevel(sky.daylight));
    hud.setSky(skyMode, sky.daylight > 0.5);

    // By day everything is bright, so the glow is confined to what is truly luminous and turned well down.
    // In full daylight there is nothing left for it to pick out, so the whole pass (a dozen
    // full-screen draws) is skipped.
    postfx.bloom.enabled = sky.daylight < 0.97;
    postfx.bloom.threshold = THREE.MathUtils.lerp(BLOOM.threshold, 1.6, sky.daylight);
    postfx.bloom.strength =
      BLOOM.strength * THREE.MathUtils.lerp(0.3, 1, THREE.MathUtils.smoothstep(distance, 12, 60)) * THREE.MathUtils.lerp(1, 0.32, sky.daylight);

    const seconds = (now - startedAt) / 1000;
    const step = Math.min(delta / 1000, 0.1); // a long pause (hidden tab) never becomes one giant step
    feed.update(step);
    agents.update(step, seconds);
    pets.update(step, seconds);
    robot.update(step, seconds);
    graphView.update(step, reducedMotion.matches ? 0 : seconds, selectedId ? (agents.get(selectedId)?.position ?? null) : null, camera);
    coreView.update(step, reducedMotion.matches ? 0 : seconds, office.core.position, camera);
    if (!shot) frameAroundPanel(step);
    office.update(reducedMotion.matches ? 0 : seconds, camera);
    if (office.shadowsStale()) renderer.shadowMap.needsUpdate = true;
    postfx.render();
    labelRenderer.render(office.scene, camera);
  }
  requestAnimationFrame(frame);
}
