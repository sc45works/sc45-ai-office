/**
 * SC45 AI Office: the agents.
 *
 * One low-poly humanoid per entry in AGENTS (layout.ts), seated at its home desk.
 * Agents are moved only by events (events.ts). Each `agent.state` event sets one of
 * five states, and the state decides where the agent goes and how it looks:
 *
 *   idle           own desk or the lounge; outline dimmed
 *   working        own desk, typing; outline bright, task label pulsing
 *   collaborating  another desk or the meeting room; walks there with a light trail
 *   blocked        own desk, slumped; red ring on the floor
 *   reporting      walks to the Chief of Staff; a beam in the spark gradient joins them
 *
 * Every change of place is a walk along a route from navigation.ts, never a jump
 * (unless the viewer has asked for reduced motion).
 */
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { defaultAppearance, nextPlace, type Appearance } from '@sc45/shared';
import { AGENTS, CHIEF_OF_STAFF_ID, COORDINATOR_ID, FURNITURE_SCALE, PALETTE, ZONES, type AgentProfile } from './layout';
import type { AgentState, OfficeEvent, OfficeSnapshot } from './events';
import type { Navigator } from './navigation';
import { neonColor, sparkColor, type DeskAnchor, type Office, type SpotAnchor } from './scene';

// Proportions of the figure, in the same units as the office (about metres).
const LEG = 0.78;
const TORSO = { width: 0.4, height: 0.56, depth: 0.22 };
const ARM = { width: 0.15, length: 0.52, depth: 0.15 };
const BAT = {
  wood: new THREE.MeshStandardMaterial({ color: '#b98a54', roughness: 0.8 }),
  rubber: new THREE.MeshStandardMaterial({ color: '#c8372d', roughness: 0.7 }),
};
/** Half the side of the cube head. */
const HEAD_RADIUS = 0.18;
const SEAT_HEIGHT = 0.5;
/** Thickness of the line of light round the body. */
const OUTLINE = 0.024;

const WALK_SPEED = 1.75;
const TRAIL_POINTS = 22;

const BOX = new THREE.BoxGeometry(1, 1, 1);
/** The head is a cube, like everything else here. */
const HEAD = BOX;
const RING = new THREE.RingGeometry(0.66, 0.76, 48);

/** An invisible box round each figure, so clicking near an agent is enough to select it. */
const PICK_MATERIAL = new THREE.MeshBasicMaterial({ visible: false });

/** A matt material for one part of one figure. Each figure has its own, so each can be coloured separately. */
const cloth = () => new THREE.MeshStandardMaterial({ color: '#1a1a1f', roughness: 0.9, metalness: 0, flatShading: true });
const GLASSES_MATERIAL = new THREE.MeshStandardMaterial({ color: '#101014', roughness: 0.4, metalness: 0.2 });

/** How bright the outline is in each state (1 = full accent). */
const OUTLINE_LEVEL: Record<AgentState, number> = { idle: 0.28, working: 1, collaborating: 0.9, blocked: 1, reporting: 1 };

/** Where an agent is, or is heading. */
interface Destination {
  /** Unique per place, so two agents never claim the same seat. */
  key: string;
  point: THREE.Vector3;
  posture: 'sit' | 'stand';
  /** Facing once settled, in radians; 0 looks down the +z axis. */
  heading: number;
  /** True for places only one agent can use at a time (spots, the sides of a desk). */
  exclusive: boolean;
}

interface Rig {
  root: THREE.Group;
  body: THREE.Group;
  legs: [THREE.Group, THREE.Group];
  arms: [THREE.Group, THREE.Group];
  /** A table-tennis bat in the right hand: shown only at the table. */
  bat: THREE.Group;
  head: THREE.Group;
  outline: THREE.MeshBasicMaterial;
  glow: THREE.MeshBasicMaterial;
  ring: THREE.Mesh;
  ringMaterial: THREE.MeshBasicMaterial;
  halo: THREE.Mesh | null;
  /** The parts that an appearance changes. */
  look: {
    skin: THREE.MeshStandardMaterial;
    top: THREE.MeshStandardMaterial;
    bottom: THREE.MeshStandardMaterial;
    hairColor: THREE.MeshStandardMaterial;
    hair: THREE.Group;
    glasses: THREE.Group;
    beard: THREE.Mesh;
    name: HTMLElement;
  };
  tag: HTMLElement;
  /** The little "z z z" that rises from a sleeping agent. */
  zzz: HTMLElement;
  badge: HTMLElement;
  sub: HTMLElement;
  pick: THREE.Mesh;
}

interface Agent {
  profile: AgentProfile;
  /** What it is called now: the roster's name unless it has been renamed. */
  name: string;
  appearance: Appearance;
  accent: THREE.Color;
  accentHex: string;
  rig: Rig;
  home: Destination;
  state: AgentState;
  task: string | null;
  /** The mission the agent is on, shown as a badge beside its name. */
  missionId: string | null;
  /** Where the agent has been sent, when that is not its default place: a desk, spot or zone id. */
  at: string | undefined;
  speed: number;
  /** Per-agent offset so no two figures move in sync. */
  phase: number;

  destination: Destination;
  arrived: boolean;
  path: THREE.Vector3[] | null;
  leg: number;
  heading: number;
  wantHeading: number;
  /** 0 standing, 1 seated. */
  sit: number;
  /** 0 still, 1 walking. */
  walk: number;
  stride: number;

  // Smoothed pose and colour, so nothing snaps.
  armL: number;
  armR: number;
  yaw: number;
  pitch: number;
  roll: number;
  /** 0 awake, 1 asleep with its head on the desk. */
  sleep: number;
  /** 0..1: how far into a wave the right arm is. */
  wave: number;
  /** Seconds spent idle at its own desk, and how many before it next gets up for a break. */
  idleFor: number;
  breakAfter: number;
  /** Seconds of break left, once it has reached the café or the lounge; 0 when it is not on one. */
  breakLeft: number;
  level: number;
  alert: number;

  beam: THREE.Mesh | null;
  beamAmount: number;
  trail: THREE.Mesh;
  trailPoints: THREE.Vector3[];
  trailOn: boolean;
  trailTimer: number;
}

export interface AgentSummary {
  id: string;
  name: string;
  state: AgentState;
  task: string | null;
  /** False while the agent is still walking to where its state sends it. */
  settled: boolean;
}

export interface Agents {
  /** Feed one event in. Events that do not concern an agent's state or place are ignored. */
  apply(event: OfficeEvent): void;
  /** Put everyone where a snapshot says they are, at once, with no walking. */
  sync(snapshot: OfficeSnapshot): void;
  /** Advance walking, poses and light. `delta` and `time` in seconds. */
  update(delta: number, time: number): void;
  list(): AgentSummary[];
  nameOf(agentId: string): string | undefined;
  /** Invisible boxes to raycast against; each carries `userData.agentId`. */
  pickTargets(): THREE.Object3D[];
  /** Details of one agent for the side panel and the camera. `position` is live: it moves with the agent. */
  get(agentId: string): AgentDetails | undefined;
  /** 1 at night, 0 by day and at dusk: the light round each figure is on only at night. */
  setNight(level: number): void;
  /** Rename or re-dress someone at once. Anything left out stays as it is. */
  setProfile(agentId: string, name?: string, appearance?: Appearance): void;
  /** Mark one agent as selected (its name tag stays visible), or none. */
  setSelected(agentId: string | null): void;
  /** Where Stephen is while he is walking round the departments, or null when he is at his desk. Live: it moves with him. */
  leading(): THREE.Vector3 | null;
  /**
   * For filming. On: nobody sleeps; one agent in three is shown at work at its desk and the rest are sent to the
   * café, the lounge and the table-tennis table, and Stephen sets off on a round with Cash.
   * It is picture only: no event is written and nothing real changes. Returns who is shown
   * working, so their screens can be lit. Off: nothing more is staged; call `sync` to put
   * everyone back where they really are.
   */
  stage(on: boolean): string[];
  /** Stephen and Sophia turn and wave towards `at` (the camera); null stops them. */
  wave(at: THREE.Vector3 | null): void;
}

export interface AgentDetails {
  profile: AgentProfile;
  /** What it is called now. */
  name: string;
  appearance: Appearance;
  /** The department colour, as a hex string. */
  accent: string;
  position: THREE.Vector3;
}

export interface AgentsOptions {
  /** Move agents instantly instead of walking them (for viewers who asked for reduced motion). */
  instant?: () => boolean;
  /** How many times faster than life time off and Stephen's rounds come round. 1 unless you want to see them sooner. */
  pace?: number;
}

// Small helpers -------------------------------------------------------------

/** Move `current` towards `target`, quickly at first and gently at the end. Frame-rate independent. */
function damp(current: number, target: number, rate: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-rate * delta));
}

function dampAngle(current: number, target: number, rate: number, delta: number): number {
  const difference = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + difference * (1 - Math.exp(-rate * delta));
}

const smooth = (t: number) => t * t * (3 - 2 * t);

// The figure ------------------------------------------------------------------

/** A body part: a dark solid with a slightly larger back-facing shell that shows as a line of light round it. */
function part(
  parent: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  fill: THREE.Material,
  outline: THREE.Material,
  size: [number, number, number],
  position: [number, number, number],
  grow: number,
) {
  const shell = new THREE.Mesh(geometry, outline);
  shell.scale.set(size[0] + grow, size[1] + grow, size[2] + grow);
  shell.position.set(...position);
  const solid = new THREE.Mesh(geometry, fill);
  solid.scale.set(...size);
  solid.position.set(...position);
  parent.add(shell, solid);
}

/** A limb that swings from a pivot at its top. */
function limb(
  parent: THREE.Object3D,
  outline: THREE.Material,
  x: number,
  y: number,
  size: [number, number, number],
  fill: THREE.Material,
  /** For an arm: the material of the hand at its end. */
  hand?: THREE.Material,
): THREE.Group {
  const pivot = new THREE.Group();
  pivot.position.set(x, y, 0);
  part(pivot, BOX, fill, outline, size, [0, -size[1] / 2, 0], OUTLINE * 2);
  if (hand) {
    // A block of skin over the last of the sleeve, a hair larger so the two never fight for the same pixels.
    const mesh = new THREE.Mesh(BOX, hand);
    mesh.scale.set(size[0] + 0.006, 0.13, size[2] + 0.006);
    mesh.position.set(0, -size[1] + 0.062, 0);
    pivot.add(mesh);
  }
  parent.add(pivot);
  return pivot;
}

/** Where things sit on the cube head. */
const HEAD_TOP = HEAD_RADIUS * 2 + 0.03;
const FACE = HEAD_RADIUS + 0.004;

/** Hair, as a few blocks of the hair colour on the head. */
function buildHair(group: THREE.Group, style: Appearance['hair'], material: THREE.Material) {
  group.clear();
  if (style === 'bald') return;
  const add = (w: number, h: number, d: number, x: number, y: number, z: number) => {
    const block = new THREE.Mesh(BOX, material);
    block.scale.set(w, h, d);
    block.position.set(x, y, z);
    group.add(block);
  };
  const side = HEAD_RADIUS * 2 + 0.03;
  const back = -HEAD_RADIUS - 0.012;
  if (style === 'curly') {
    add(side + 0.1, 0.22, side + 0.1, 0, HEAD_TOP + 0.02, 0);
    add(side + 0.1, 0.2, 0.09, 0, HEAD_TOP - 0.16, back - 0.02);
    return;
  }
  // Everyone else has a cap of hair and a fringe.
  add(side, 0.11, side, 0, HEAD_TOP - 0.02, 0);
  add(side, 0.06, 0.03, 0, HEAD_TOP - 0.055, HEAD_RADIUS + 0.008);
  if (style === 'short') add(side, 0.2, 0.05, 0, HEAD_TOP - 0.13, back);
  if (style === 'long') {
    add(side, 0.46, 0.07, 0, HEAD_TOP - 0.24, back - 0.01);
    for (const x of [-1, 1]) add(0.05, 0.36, 0.3, x * (HEAD_RADIUS + 0.014), HEAD_TOP - 0.2, -0.04);
  }
  if (style === 'bun') {
    add(side, 0.16, 0.05, 0, HEAD_TOP - 0.11, back);
    add(0.15, 0.15, 0.15, 0, HEAD_TOP + 0.08, -0.07);
  }
  if (style === 'ponytail') {
    add(side, 0.16, 0.05, 0, HEAD_TOP - 0.11, back);
    add(0.1, 0.34, 0.1, 0, HEAD_TOP - 0.22, back - 0.07);
  }
}

/** Put an appearance on a figure. Cheap enough to call on every change in the editor. */
function dress(rig: Rig, appearance: Appearance, baseScale: number) {
  const { look } = rig;
  look.skin.color.set(appearance.skin);
  look.top.color.set(appearance.top);
  look.bottom.color.set(appearance.bottom);
  look.hairColor.color.set(appearance.hairColor);
  buildHair(look.hair, appearance.hair, look.hairColor);
  look.glasses.visible = appearance.glasses;
  look.beard.visible = appearance.beard;
  // The second build is a little slighter all round.
  const slight = appearance.build === 'feminine';
  const size = baseScale * FURNITURE_SCALE; // people are drawn to the same scale as the furniture
  rig.root.scale.set(size * (slight ? 0.9 : 1), size * (slight ? 0.96 : 1), size * (slight ? 0.9 : 1));
}

function buildRig(profile: AgentProfile, accentHex: string, isChief: boolean): Rig {
  const outline = new THREE.MeshBasicMaterial({ color: '#000000', side: THREE.BackSide });
  const glow = new THREE.MeshBasicMaterial({ color: '#000000' });
  const skin = cloth();
  const top = cloth();
  const bottom = cloth();
  const hairColor = cloth();

  const root = new THREE.Group();
  root.name = `agent:${profile.id}`;
  const body = new THREE.Group();
  root.add(body);

  part(body, BOX, top, outline, [TORSO.width, TORSO.height, TORSO.depth], [0, LEG + TORSO.height / 2, 0], OUTLINE * 2);
  const legs: [THREE.Group, THREE.Group] = [
    limb(body, outline, -0.1, LEG, [0.18, LEG, 0.18], bottom),
    limb(body, outline, 0.1, LEG, [0.18, LEG, 0.18], bottom),
  ];
  const shoulder = TORSO.width / 2 + ARM.width / 2 + 0.012;
  const arms: [THREE.Group, THREE.Group] = [
    limb(body, outline, -shoulder, LEG + TORSO.height - 0.04, [ARM.width, ARM.length, ARM.depth], top, skin),
    limb(body, outline, shoulder, LEG + TORSO.height - 0.04, [ARM.width, ARM.length, ARM.depth], top, skin),
  ];

  // The bat: a short handle and a red blade, held in the right hand. Hidden except at the table.
  const bat = new THREE.Group();
  const handle = new THREE.Mesh(BOX, BAT.wood);
  handle.scale.set(0.04, 0.13, 0.04);
  handle.position.y = -0.05;
  const blade = new THREE.Mesh(BOX, BAT.rubber);
  blade.scale.set(0.19, 0.2, 0.03);
  blade.position.y = -0.21;
  bat.add(handle, blade);
  bat.position.set(0, -ARM.length + 0.02, 0.03);
  bat.visible = false;
  arms[1].add(bat);

  const head = new THREE.Group();
  head.position.set(0, LEG + TORSO.height, 0);
  body.add(head);
  part(head, HEAD, skin, outline, [HEAD_RADIUS * 2, HEAD_RADIUS * 2, HEAD_RADIUS * 2], [0, HEAD_RADIUS + 0.03, 0], OUTLINE * 2);
  // Two square eyes of light, which also show which way the figure is looking.
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(BOX, glow);
    eye.scale.set(0.07, 0.07, 0.03);
    eye.position.set(side * 0.08, HEAD_RADIUS + 0.07, FACE);
    head.add(eye);
  }

  // Hair, glasses and a beard: all on the head, so they nod and turn with it.
  const hair = new THREE.Group();
  head.add(hair);
  const glasses = new THREE.Group();
  for (const side of [-1, 1]) {
    const lens = new THREE.Mesh(BOX, GLASSES_MATERIAL);
    lens.scale.set(0.125, 0.115, 0.016);
    lens.position.set(side * 0.08, HEAD_RADIUS + 0.07, FACE - 0.008);
    glasses.add(lens);
  }
  const bridge = new THREE.Mesh(BOX, GLASSES_MATERIAL);
  bridge.scale.set(0.05, 0.025, 0.016);
  bridge.position.set(0, HEAD_RADIUS + 0.085, FACE - 0.008);
  glasses.add(bridge);
  head.add(glasses);
  const beard = new THREE.Mesh(BOX, hairColor);
  beard.scale.set(HEAD_RADIUS * 2 + 0.02, 0.13, 0.05);
  beard.position.set(0, 0.03 + 0.07, HEAD_RADIUS - 0.012);
  head.add(beard);

  // The Chief of Staff wears a slow halo in the spark gradient.
  let halo: THREE.Mesh | null = null;
  if (isChief) {
    const geometry = new THREE.TorusGeometry(0.27, 0.016, 6, 64);
    const positions = geometry.getAttribute('position');
    const colors = new Float32Array(positions.count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < positions.count; i++) {
      // Orange to violet and back, so the ring has no seam.
      const around = (Math.atan2(positions.getY(i), positions.getX(i)) / Math.PI + 1) / 2;
      sparkColor(1 - Math.abs(around * 2 - 1), color);
      const boosted = neonColor(`#${color.getHexString()}`);
      colors.set([boosted.r, boosted.g, boosted.b], i * 3);
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    halo = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ vertexColors: true }));
    halo.rotation.x = Math.PI / 2;
    halo.position.y = HEAD_RADIUS * 2 + 0.2;
    head.add(halo);
  }

  // The ring that appears on the floor when the agent is blocked.
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: neonColor(PALETTE.alert),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(RING, ringMaterial);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.05;
  ring.visible = false;
  root.add(ring);

  const pick = new THREE.Mesh(BOX, PICK_MATERIAL);
  pick.scale.set(1, 2, 1);
  pick.position.y = 1;
  pick.userData.agentId = profile.id;
  root.add(pick);

  // Name tag: the name, and under it the role (idle) or the current task.
  const tag = document.createElement('div');
  tag.className = 'agent-tag';
  tag.style.setProperty('--accent', accentHex);
  const name = document.createElement('span');
  name.className = 'agent-name';
  const nameText = document.createElement('span');
  nameText.textContent = profile.name;
  name.append(nameText);
  const badge = document.createElement('span');
  badge.className = 'agent-badge';
  name.append(badge);
  const sub = document.createElement('span');
  sub.className = 'agent-sub';
  tag.append(name, sub);
  const tagObject = new CSS2DObject(tag);
  tagObject.center.set(0.5, 1);
  tagObject.position.y = HEAD_RADIUS * 2 + (isChief ? 0.42 : 0.26);
  head.add(tagObject);

  // Shown only while the agent is asleep at its desk.
  const zzz = document.createElement('div');
  zzz.className = 'agent-zzz';
  zzz.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 3; i++) zzz.append(Object.assign(document.createElement('span'), { textContent: 'z' }));
  const zzzObject = new CSS2DObject(zzz);
  zzzObject.center.set(0, 1);
  zzzObject.position.set(0.16, HEAD_RADIUS * 2 + 0.05, 0);
  head.add(zzzObject);

  return { root, body, legs, arms, bat, head, outline, glow, ring, ringMaterial, halo, look: { skin, top, bottom, hairColor, hair, glasses, beard, name: nameText }, tag, zzz, badge, sub, pick };
}

// Shared geometry for the report beam: a thin bar whose colour runs through the spark gradient.
const BEAM = (() => {
  const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 24);
  const positions = geometry.getAttribute('position');
  const colors = new Float32Array(positions.count * 3);
  const color = new THREE.Color();
  for (let i = 0; i < positions.count; i++) {
    sparkColor(positions.getZ(i) + 0.5, color);
    const boosted = neonColor(`#${color.getHexString()}`);
    colors.set([boosted.r, boosted.g, boosted.b], i * 3);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
})();

function createTrail(): THREE.Mesh {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL_POINTS * 2 * 3), 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(TRAIL_POINTS * 2 * 3), 3).setUsage(THREE.DynamicDrawUsage));
  const index: number[] = [];
  for (let i = 0; i < TRAIL_POINTS - 1; i++) {
    const a = i * 2;
    index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  geometry.setIndex(index);
  geometry.setDrawRange(0, 0);
  const trail = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.DoubleSide }),
  );
  trail.frustumCulled = false;
  trail.renderOrder = 1;
  return trail;
}

// The office's cast ---------------------------------------------------------

export function createAgents(office: Office, navigator: Navigator, options: AgentsOptions = {}): Agents {
  const agents = new Map<string, Agent>();
  /** Which agent holds each exclusive place. */
  const occupied = new Map<string, string>();
  const instant = options.instant ?? (() => false);
  const pace = Math.max(1, options.pace ?? 1);

  // Destinations ------------------------------------------------------------

  function atDesk(anchor: DeskAnchor): Destination {
    return { key: `desk:${anchor.deskId}`, point: anchor.seat.clone(), posture: 'sit', heading: anchor.rotation + Math.PI, exclusive: false };
  }

  function atSpot(spot: SpotAnchor): Destination {
    return {
      key: `spot:${spot.spotId}`,
      point: spot.position.clone(),
      posture: spot.posture,
      heading: Math.atan2(spot.focus.x - spot.position.x, spot.focus.z - spot.position.z),
      exclusive: true,
    };
  }

  /** Standing next to someone else's chair, turned towards them. Takes whichever side is free and nearer. */
  function besideDesk(visitor: Agent, host: DeskAnchor): Destination {
    const facing = host.rotation + Math.PI;
    const right = new THREE.Vector3(Math.cos(facing), 0, -Math.sin(facing));
    const back = new THREE.Vector3(-Math.sin(facing), 0, -Math.cos(facing));
    let best: Destination | null = null;
    let bestScore = Infinity;
    for (const side of [-1, 1]) {
      const key = `beside:${host.deskId}:${side}`;
      const holder = occupied.get(key);
      if (holder && holder !== visitor.profile.id) continue;
      const point = host.seat.clone().addScaledVector(right, side * 1.05).addScaledVector(back, 0.2);
      const score = point.distanceTo(visitor.rig.root.position) + (navigator.isBlocked(point.x, point.z) ? 100 : 0);
      if (score < bestScore) {
        bestScore = score;
        best = { key, point, posture: 'stand', heading: Math.atan2(host.seat.x - point.x, host.seat.z - point.z), exclusive: true };
      }
    }
    return best ?? visitor.home;
  }

  /** A seat in a zone: the one the agent already holds there, or else the first free one. */
  function freeSpotIn(zoneId: string, agent: Agent): Destination | null {
    let free: SpotAnchor | null = null;
    for (const spot of office.spots.values()) {
      if (spot.zoneId !== zoneId) continue;
      const holder = occupied.get(`spot:${spot.spotId}`);
      if (holder === agent.profile.id) return atSpot(spot);
      if (!holder && !free) free = spot;
    }
    return free ? atSpot(free) : null;
  }

  /** Turn an event's `deskId` (a desk, a spot or a zone) into a place for this agent. */
  function resolve(agent: Agent, targetId: string): Destination | null {
    if (targetId === agent.profile.id) return agent.home;
    const desk = office.desks.get(targetId);
    if (desk) return besideDesk(agent, desk);
    const spot = office.spots.get(targetId);
    if (spot) {
      const holder = occupied.get(`spot:${spot.spotId}`);
      return !holder || holder === agent.profile.id ? atSpot(spot) : freeSpotIn(spot.zoneId, agent);
    }
    return freeSpotIn(targetId, agent);
  }

  function travel(agent: Agent, destination: Destination, withTrail: boolean, instantly = instant()) {
    if (destination.key === agent.destination.key) return;
    if (occupied.get(agent.destination.key) === agent.profile.id) occupied.delete(agent.destination.key);
    if (destination.exclusive) occupied.set(destination.key, agent.profile.id);
    agent.destination = destination;
    agent.arrived = false;
    agent.path = null;
    agent.trailOn = withTrail;

    if (instantly) {
      agent.rig.root.position.copy(destination.point);
      agent.arrived = true;
      agent.sit = destination.posture === 'sit' ? 1 : 0;
      agent.heading = agent.wantHeading = destination.heading;
    }
  }

  // State -------------------------------------------------------------------

  function refreshTag(agent: Agent) {
    const { tag, badge, sub } = agent.rig;
    tag.dataset.state = agent.state;
    tag.dataset.active = String(agent.state !== 'idle');
    // The mission it is on, if any; otherwise just that it is busy.
    // Blocked on Stephen's sign-off is not a fault: it says so, and is coloured differently.
    const needsYou = agent.state === 'blocked' && Boolean(agent.task?.startsWith('Waiting for Stephen'));
    tag.dataset.needsYou = String(needsYou);
    const blocked = needsYou ? 'needs you' : 'blocked';
    badge.textContent = agent.state === 'idle' ? 'idle' : agent.state === 'blocked' ? (agent.missionId ? `${agent.missionId} ${blocked}` : blocked) : (agent.missionId ?? 'busy');
    sub.textContent = agent.task ?? agent.profile.role;
    sub.classList.toggle('is-task', agent.task !== null);
  }

  /**
   * Put an agent into a state, at a place. `at` is a desk, spot or zone id, or undefined for
   * the state's default place: beside the Chief of Staff when reporting, otherwise the agent's
   * own desk. (Which `at` follows from an event is decided by `nextPlace` in @sc45/shared, the
   * same rule the server uses.)
   */
  function enter(agent: Agent, state: AgentState, task: string | null, at: string | undefined, instantly = instant()) {
    // Whatever it was doing with its time off, that is over: an event says where it should be.
    agent.breakLeft = 0;
    agent.idleFor = 0;
    agent.state = state;
    agent.task = state === 'idle' ? null : task;
    agent.at = at && at !== agent.profile.id ? at : undefined;

    let destination = agent.at ? resolve(agent, agent.at) : null;
    if (!destination) {
      const reportsElsewhere = state === 'reporting' && agent.profile.id !== CHIEF_OF_STAFF_ID;
      destination = reportsElsewhere ? (freeSpotIn('executive', agent) ?? agent.home) : agent.home;
    }
    travel(agent, destination, state === 'collaborating' || state === 'reporting', instantly);
    refreshTag(agent);
  }

  function setProfile(agent: Agent, name?: string, appearance?: Appearance) {
    if (name && name !== agent.name) {
      agent.name = name;
      agent.rig.look.name.textContent = name;
    }
    if (appearance) {
      agent.appearance = appearance;
      dress(agent.rig, appearance, agent.profile.id === CHIEF_OF_STAFF_ID ? 1.08 : 1);
    }
  }

  // Time off ------------------------------------------------------------------
  //
  // An agent with nothing to do sleeps at its desk. After a couple of minutes of that it may get
  // up and go to the café for a coffee, sit in the lounge, or play table tennis if someone else
  // is free too, and after a few minutes walks back. None of this is an event: it is not work,
  // nothing records it, and the moment a task arrives the agent goes where the task sends it.
  // The Chief of Staff stays put; she is always listening.

  /** How long idle before the first break: about two minutes, different for everyone. */
  const firstBreak = () => 110 + Math.random() * 90;
  const nextBreak = () => 150 + Math.random() * 240;
  /** No more than this many are away from their desks at once, or the office would look deserted. */
  const MAX_ON_BREAK = 5;

  const takesBreaks = (agent: Agent) => !agent.profile.human && agent.profile.id !== CHIEF_OF_STAFF_ID;
  const resting = (agent: Agent) => takesBreaks(agent) && agent.state === 'idle' && !agent.at && agent.breakLeft === 0 && agent.arrived && agent.destination.key === agent.home.key;

  function freeSpot(wanted: (spotId: string) => boolean): Destination | null {
    const free = [...office.spots.values()].filter((spot) => wanted(spot.spotId) && !occupied.has(`spot:${spot.spotId}`));
    return free.length > 0 ? atSpot(free[Math.floor(Math.random() * free.length)]) : null;
  }

  function sendOnBreak(agent: Agent, destination: Destination, seconds: number) {
    travel(agent, destination, false);
    agent.breakLeft = seconds;
    agent.idleFor = 0;
    agent.breakAfter = nextBreak();
  }

  function breaks(delta: number) {
    let away = 0;
    for (const agent of agents.values()) if (agent.breakLeft > 0) away += 1;
    for (const agent of agents.values()) {
      if (!takesBreaks(agent)) continue;
      if (agent.breakLeft > 0) {
        // The break is counted from when it gets there, not from when it set off.
        if (!agent.arrived) continue;
        agent.breakLeft -= delta;
        if (agent.breakLeft <= 0) {
          agent.breakLeft = 0;
          travel(agent, agent.home, false);
        }
        continue;
      }
      if (!resting(agent)) continue;
      agent.idleFor += delta;
      if (agent.idleFor < agent.breakAfter || away >= MAX_ON_BREAK || instant()) continue;

      const choice = Math.random();
      if (choice < 0.3 && away + 2 <= MAX_ON_BREAK) {
        // Table tennis takes two: someone else who has been idle a while, and both ends free.
        const partner = [...agents.values()].find((other) => other !== agent && resting(other) && other.idleFor > 45);
        const near = freeSpot((id) => id === 'cafe.pong-1');
        const far = freeSpot((id) => id === 'cafe.pong-2');
        if (partner && near && far) {
          const seconds = 80 + Math.random() * 70;
          sendOnBreak(agent, near, seconds);
          sendOnBreak(partner, far, seconds);
          away += 2;
          continue;
        }
      }
      const place = choice < 0.68 ? freeSpot((id) => id.startsWith('cafe.stool')) : freeSpot((id) => id.startsWith('lounge.'));
      if (place) {
        sendOnBreak(agent, place, 100 + Math.random() * 140);
        away += 1;
      } else {
        agent.idleFor = agent.breakAfter - 20; // nowhere free: think again in a little while
      }
    }
    // The ball is in play only while there is someone at each end of the table.
    office.setPong(['spot:cafe.pong-1', 'spot:cafe.pong-2'].every((key) => {
      const holder = agents.get(occupied.get(key) ?? '');
      return Boolean(holder && holder.arrived && holder.destination.key === key);
    }));
  }

  // Stephen's rounds ----------------------------------------------------------
  //
  // Now and then Stephen gets up and walks round the office: the front of each department in
  // turn, then the café, then back to his desk. Cash goes with him (pets.ts follows `leading`).

  const ROUND_STOP_SECONDS = 6;
  /** True while the office is staged for filming: Stephen keeps doing rounds, one after another. */
  let staged = false;
  /** Where the camera is, while Stephen and Sophia are waving at it; null when they are not. */
  let waveAt: THREE.Vector3 | null = null;
  let round: { stops: Destination[]; index: number; pause: number } | null = null;
  let untilRound = 50;

  function roundStops(): Destination[] {
    const order = ['sales', 'design', 'development', 'content', 'research'];
    const stops: Destination[] = [];
    for (const id of order) {
      const zone = ZONES.find((candidate) => candidate.id === id);
      if (!zone) continue;
      // In the opening at the front of the department, looking in at the desks.
      const point = new THREE.Vector3(zone.position.x, 0, zone.position.z + zone.size.depth / 2 - 0.7);
      stops.push({ key: `round:${id}`, point, posture: 'stand', heading: Math.PI, exclusive: false });
    }
    const cafe = ZONES.find((candidate) => candidate.id === 'cafe');
    if (cafe) stops.push({ key: 'round:cafe', point: new THREE.Vector3(cafe.position.x - 3.4, 0, cafe.position.z - 0.6), posture: 'stand', heading: Math.PI, exclusive: false });
    return stops;
  }

  function rounds(delta: number) {
    const boss = [...agents.values()].find((agent) => agent.profile.human);
    if (!boss) return;
    if (!round) {
      untilRound -= delta;
      if (untilRound > 0 || instant()) return;
      const stops = roundStops();
      if (stops.length === 0) return;
      round = { stops, index: 0, pause: 0 };
      travel(boss, stops[0], false);
      return;
    }
    if (!boss.arrived) return;
    round.pause += delta;
    if (round.pause < ROUND_STOP_SECONDS) return;
    round.pause = 0;
    round.index += 1;
    if (round.index < round.stops.length) {
      travel(boss, round.stops[round.index], false);
    } else {
      travel(boss, boss.home, false);
      round = null;
      untilRound = staged ? 4 : 200 + Math.random() * 200;
    }
  }

  // Build everyone ------------------------------------------------------------

  AGENTS.forEach((profile, index) => {
    const anchor = office.desks.get(profile.id);
    if (!anchor) {
      console.warn(`[agents] ${profile.id} has no desk in layout.ts; skipped.`);
      return;
    }
    const isChief = profile.id === CHIEF_OF_STAFF_ID;
    const rig = buildRig(profile, anchor.accent, isChief);
    const appearance = defaultAppearance(profile.id);
    dress(rig, appearance, isChief ? 1.08 : 1);
    const home = atDesk(anchor);
    rig.root.position.copy(home.point);
    rig.root.rotation.y = home.heading;
    office.scene.add(rig.root);
    anchor.label.visible = false; // the name tag replaces the desk's role label

    const trail = createTrail();
    office.scene.add(trail);

    const agent: Agent = {
      profile,
      name: profile.name,
      appearance,
      accent: neonColor(anchor.accent),
      accentHex: anchor.accent,
      rig,
      home,
      state: 'idle',
      task: null,
      missionId: null,
      at: undefined,
      speed: WALK_SPEED * (profile.id === COORDINATOR_ID ? 1.25 : 1),
      phase: index * 1.37,
      destination: home,
      arrived: true,
      path: null,
      leg: 0,
      heading: home.heading,
      wantHeading: home.heading,
      sit: 1,
      walk: 0,
      stride: index,
      armL: -0.32,
      armR: -0.32,
      yaw: 0,
      pitch: 0,
      roll: 0,
      sleep: 0,
      wave: 0,
      idleFor: 0,
      breakAfter: firstBreak(),
      breakLeft: 0,
      level: profile.human ? 0.62 : OUTLINE_LEVEL.idle,
      alert: 0,
      beam: null,
      beamAmount: 0,
      trail,
      trailPoints: [],
      trailOn: false,
      trailTimer: 0,
    };
    agents.set(profile.id, agent);
    refreshTag(agent);
  });

  // Per-frame -----------------------------------------------------------------

  const ALERT = neonColor(PALETTE.alert);
  const EYE_BY_DAY = new THREE.Color('#15151a');
  let night = 1;
  const scratch = new THREE.Color();
  const from = new THREE.Vector3();
  const to = new THREE.Vector3();
  const side = new THREE.Vector3();

  function move(agent: Agent, delta: number) {
    const position = agent.rig.root.position;
    let moving = false;

    if (!agent.arrived) {
      if (agent.sit > 0.1) {
        // Stand up before setting off.
        agent.sit = Math.max(0, agent.sit - delta / 0.3);
      } else {
        agent.sit = 0;
        if (!agent.path) {
          agent.path = navigator.findPath(position, agent.destination.point);
          agent.leg = 0;
        }
        let step = agent.speed * delta;
        while (step > 0 && agent.leg < agent.path.length) {
          const target = agent.path[agent.leg];
          const dx = target.x - position.x;
          const dz = target.z - position.z;
          const distance = Math.hypot(dx, dz);
          if (distance <= step) {
            position.x = target.x;
            position.z = target.z;
            step -= distance;
            agent.leg += 1;
          } else {
            position.x += (dx / distance) * step;
            position.z += (dz / distance) * step;
            agent.wantHeading = Math.atan2(dx, dz);
            step = 0;
          }
        }
        agent.stride += agent.speed * delta * 3.4;
        moving = true;
        if (agent.leg >= agent.path.length) {
          agent.arrived = true;
          agent.path = null;
        }
      }
    } else {
      agent.wantHeading = agent.destination.heading;
      // Waving: the whole figure turns in its chair towards whoever it is waving at.
      if (waveAt && (agent.profile.human || agent.profile.id === CHIEF_OF_STAFF_ID)) agent.wantHeading = Math.atan2(waveAt.x - position.x, waveAt.z - position.z);
      const settled = agent.destination.posture === 'sit' ? 1 : 0;
      agent.sit = settled > agent.sit ? Math.min(settled, agent.sit + delta / 0.35) : Math.max(settled, agent.sit - delta / 0.35);
    }

    agent.walk = damp(agent.walk, moving ? 1 : 0, 10, delta);
    agent.heading = dampAngle(agent.heading, agent.wantHeading, moving ? 9 : 6, delta);
    position.y = damp(position.y, office.floorHeightAt(position.x, position.z), 12, delta);
    agent.rig.root.rotation.y = agent.heading;
  }

  /** The reporter the Chief of Staff should look at, if any has arrived. */
  function currentReporter(): Agent | null {
    for (const agent of agents.values()) {
      if (agent.state === 'reporting' && agent.arrived && agent.profile.id !== CHIEF_OF_STAFF_ID) return agent;
    }
    return null;
  }

  function pose(agent: Agent, delta: number, time: number, reporter: Agent | null) {
    const { rig } = agent;
    const seated = smooth(agent.sit);
    const t = time + agent.phase;
    const sitting = agent.sit > 0.5;

    // What the arms and head want to be doing, given the state.
    let armL = 0;
    let armR = 0;
    let yaw = 0;
    let pitch = 0;
    let roll = 0;
    if (agent.arrived) {
      switch (agent.state) {
        case 'working':
          if (sitting) {
            armL = -1.12 + Math.sin(t * 11) * 0.07;
            armR = -1.12 + Math.sin(t * 11 + 2.1) * 0.07;
            pitch = 0.2;
            yaw = Math.sin(t * 0.5) * 0.06;
          }
          break;
        case 'idle':
          armL = armR = sitting ? -0.32 : 0;
          yaw = Math.sin(t * 0.33) * 0.32;
          pitch = Math.sin(t * 0.21) * 0.05;
          if (agent.destination.key.startsWith('spot:cafe.pong')) {
            // At the table, bat in hand. The ball crosses every 0.8 seconds (scene.ts) and reaches this
            // end every other crossing: the arm is drawn back as it comes, and swung through as it arrives.
            const coming = Math.cos((time / 0.8) * Math.PI) * (agent.destination.key.endsWith('1') ? -1 : 1); // 1 when the ball is here
            armR = -0.55 - Math.max(0, coming) ** 3 * 1.25 + Math.max(0, -coming) * 0.15;
            armL = -0.25;
            yaw = Math.sin((time / 0.8) * Math.PI) * 0.2;
            pitch = 0.12;
          } else if (agent.destination.key.startsWith('spot:cafe.stool')) {
            // At the bar: elbows on the counter, and a cup lifted now and then.
            armL = -0.9;
            armR = -0.9 - Math.max(0, Math.sin(t * 0.8)) * 1.1;
            yaw = Math.sin(t * 0.4) * 0.45;
          }
          break;
        case 'collaborating':
          armL = sitting ? -0.35 : 0;
          armR = (sitting ? -0.7 : -0.45) - Math.max(0, Math.sin(t * 1.9)) * 0.55;
          yaw = Math.sin(t * 0.7) * 0.2;
          pitch = Math.sin(t * 2.3) * 0.05;
          break;
        case 'blocked':
          armL = armR = -0.12;
          pitch = 0.3;
          roll = 0.2 + Math.sin(t * 1.3) * 0.05;
          yaw = Math.sin(t * 0.9) * 0.12;
          break;
        case 'reporting':
          armR = -0.5 - Math.max(0, Math.sin(t * 2.1)) * 0.45;
          break;
      }
    }
    // With nothing to do, an agent at its own desk puts its head down and sleeps until a task arrives.
    // (Not the Chief of Staff, who is always listening, nor the human.)
    const asleep =
      !staged && agent.arrived && agent.state === 'idle' && sitting && !agent.profile.human && agent.profile.id !== CHIEF_OF_STAFF_ID && agent.destination.key === agent.home.key;
    if (asleep) {
      armL = armR = -2.45; // folded forward onto the desk
      yaw = 0;
      pitch = 0.45;
      roll = agent.phase % 2 > 1 ? 0.5 : -0.5; // head resting on one side or the other
    }
    agent.sleep = damp(agent.sleep, asleep ? 1 : 0, asleep ? 2.2 : 6, delta); // dozes off slowly, wakes fast
    const lean = smooth(agent.sleep) * (0.9 + Math.sin(t * 1.1) * 0.025); // slumped, and breathing
    rig.zzz.dataset.on = String(agent.sleep > 0.7);

    // The Chief of Staff turns to whoever is reporting.
    if (agent.profile.id === CHIEF_OF_STAFF_ID && reporter && agent.arrived) {
      const other = reporter.rig.root.position;
      const here = rig.root.position;
      const towards = Math.atan2(other.x - here.x, other.z - here.z) - agent.heading;
      yaw = THREE.MathUtils.clamp(Math.atan2(Math.sin(towards), Math.cos(towards)), -1.15, 1.15);
      pitch = 0;
      armL = armR = -0.32;
    }

    // Asked to wave (the tour, as the camera comes to the executive desk): Stephen and Sophia turn
    // their heads to the camera, and the right arm goes up and waves from the elbow's height.
    const greeting = waveAt !== null && agent.arrived && (agent.profile.human || agent.profile.id === CHIEF_OF_STAFF_ID);
    if (greeting && waveAt) {
      const here = rig.root.position;
      const towards = Math.atan2(waveAt.x - here.x, waveAt.z - here.z) - agent.heading;
      yaw = THREE.MathUtils.clamp(Math.atan2(Math.sin(towards), Math.cos(towards)), -1.15, 1.15);
      pitch = -0.08;
      roll = 0;
      armR = -2.75;
      armL = sitting ? -0.32 : 0;
    }
    agent.wave = damp(agent.wave, greeting ? 1 : 0, 7, delta);
    rig.arms[1].rotation.z = agent.wave * (0.35 + Math.sin(t * 8.5) * 0.4);
    rig.bat.visible = agent.arrived && agent.walk < 0.2 && agent.destination.key.startsWith('spot:cafe.pong');

    const swing = Math.sin(agent.stride) * 0.62 * agent.walk;
    agent.armL = damp(agent.armL, armL, 12, delta);
    agent.armR = damp(agent.armR, armR, 12, delta);
    agent.yaw = damp(agent.yaw, yaw, 6, delta);
    agent.pitch = damp(agent.pitch, pitch, 6, delta);
    agent.roll = damp(agent.roll, roll, 6, delta);

    // Leaning the body forward swings it about the feet, so the hips are put back where the chair is
    // and the legs are turned back to level.
    rig.body.rotation.x = lean;
    rig.body.position.z = -LEG * Math.sin(lean);
    rig.legs[0].rotation.x = THREE.MathUtils.lerp(swing, -1.45 - lean, seated);
    rig.legs[1].rotation.x = THREE.MathUtils.lerp(-swing, -1.45 - lean, seated);
    rig.arms[0].rotation.x = THREE.MathUtils.lerp(agent.armL, -swing * 0.75, agent.walk);
    rig.arms[1].rotation.x = THREE.MathUtils.lerp(agent.armR, swing * 0.75, agent.walk);
    rig.head.rotation.set(agent.pitch, agent.yaw, agent.roll);
    rig.body.position.y = -(LEG - SEAT_HEIGHT) * seated + Math.abs(Math.sin(agent.stride)) * 0.035 * agent.walk + LEG * (1 - Math.cos(lean));
    if (rig.halo) {
      rig.halo.rotation.z = time * 0.6;
      rig.halo.position.y = HEAD_RADIUS * 2 + 0.2 + Math.sin(time * 1.4) * 0.015;
    }
  }

  function light(agent: Agent, delta: number, time: number) {
    const { rig } = agent;
    const pulse = Math.sin(time * 2.6);
    let level = OUTLINE_LEVEL[agent.state];
    if (agent.profile.human) level = 0.62;
    else if (agent.state === 'idle' && !agent.arrived) level = 0.5;
    else if (agent.state === 'blocked') level = 0.8 + 0.2 * pulse;
    agent.level = damp(agent.level, level, 4, delta);
    agent.alert = damp(agent.alert, agent.state === 'blocked' ? 1 : 0, 5, delta);

    // The line of light round the figure, and its lit eyes, are for the night. By day and at dusk
    // the outline is gone and the eyes are simply dark; a red ring on the floor still marks a blocked agent.
    scratch.copy(agent.accent).lerp(ALERT, agent.alert).multiplyScalar(agent.level * night);
    rig.outline.color.copy(scratch);
    rig.outline.visible = night > 0.02;
    rig.glow.color.copy(EYE_BY_DAY).lerp(scratch.copy(agent.accent).lerp(ALERT, agent.alert).multiplyScalar(agent.level), night);

    rig.ring.visible = agent.alert > 0.02;
    if (rig.ring.visible) {
      rig.ringMaterial.opacity = agent.alert * (0.55 + 0.3 * pulse);
      rig.ring.scale.setScalar(1 + 0.12 * pulse);
    }
  }

  function beam(agent: Agent, delta: number, time: number, chief: Agent | undefined) {
    const wanted = agent.state === 'reporting' && agent.arrived && chief && agent !== chief ? 1 : 0;
    agent.beamAmount = damp(agent.beamAmount, wanted, 5, delta);
    if (agent.beamAmount < 0.02 || !chief) {
      if (agent.beam) agent.beam.visible = false;
      return;
    }
    if (!agent.beam) {
      agent.beam = new THREE.Mesh(
        BEAM,
        new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
      );
      agent.beam.frustumCulled = false;
      office.scene.add(agent.beam);
    }
    from.copy(agent.rig.root.position).setY(agent.rig.root.position.y + 1.15);
    to.copy(chief.rig.root.position).setY(chief.rig.root.position.y + 1.02);
    agent.beam.visible = true;
    agent.beam.position.lerpVectors(from, to, 0.5);
    agent.beam.lookAt(to);
    agent.beam.scale.set(0.035, 0.035, from.distanceTo(to));
    (agent.beam.material as THREE.MeshBasicMaterial).opacity = agent.beamAmount * (0.6 + 0.25 * Math.sin(time * 3));
  }

  function trail(agent: Agent, delta: number) {
    const points = agent.trailPoints;
    const position = agent.rig.root.position;
    const laying = agent.trailOn && !agent.arrived && agent.walk > 0.4;
    if (laying) {
      const last = points[points.length - 1];
      if (!last || last.distanceTo(position) > 0.2) {
        points.push(new THREE.Vector3(position.x, position.y + 0.05, position.z));
        if (points.length > TRAIL_POINTS) points.shift();
      }
    } else if (points.length > 0) {
      // Once the walk is over the tail catches up and disappears.
      agent.trailTimer += delta;
      while (agent.trailTimer > 0.045 && points.length > 0) {
        points.shift();
        agent.trailTimer -= 0.045;
      }
    }

    const geometry = agent.trail.geometry;
    if (points.length < 2) {
      geometry.setDrawRange(0, 0);
      return;
    }
    const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
    const colors = geometry.getAttribute('color') as THREE.BufferAttribute;
    for (let i = 0; i < points.length; i++) {
      const here = points[i];
      const next = points[Math.min(i + 1, points.length - 1)];
      const previous = points[Math.max(i - 1, 0)];
      side.set(-(next.z - previous.z), 0, next.x - previous.x).normalize().multiplyScalar(0.075);
      positions.setXYZ(i * 2, here.x + side.x, here.y, here.z + side.z);
      positions.setXYZ(i * 2 + 1, here.x - side.x, here.y, here.z - side.z);
      // Brightest at the agent's heels, fading to nothing at the tail.
      const strength = Math.pow(i / (points.length - 1), 1.6) * 0.85;
      colors.setXYZ(i * 2, agent.accent.r * strength, agent.accent.g * strength, agent.accent.b * strength);
      colors.setXYZ(i * 2 + 1, agent.accent.r * strength, agent.accent.g * strength, agent.accent.b * strength);
    }
    positions.needsUpdate = true;
    colors.needsUpdate = true;
    geometry.setDrawRange(0, (points.length - 1) * 6);
  }

  return {
    apply(event) {
      const agent = agents.get(event.agentId);
      if (!agent) return;
      if (event.type === 'agent.profile') {
        setProfile(agent, event.meta?.name, event.meta?.appearance);
        return;
      }
      if (agent.profile.human) return;
      // While the office is staged for the tour nobody is moved by events: `sync` puts everyone right when it ends.
      if (staged) return;
      if (event.type === 'agent.state' && event.state) {
        // The same rule as the shared reducer: going idle leaves the mission, otherwise it carries over.
        agent.missionId = event.state === 'idle' ? null : (event.missionId ?? agent.missionId);
        enter(agent, event.state, event.task ?? agent.task, nextPlace(agent.at, event.state, event.deskId));
      } else if (event.type === 'agent.moved' && event.deskId) {
        enter(agent, agent.state, agent.task, event.deskId);
      }
    },
    sync(snapshot) {
      if (staged) return; // not during the tour: it is called again as the tour ends
      // Clear every seat first, so nobody is refused a place that someone is about to leave.
      occupied.clear();
      for (const agent of agents.values()) {
        agent.destination = { ...agent.home, key: '' }; // forget the old place, so `travel` always moves the agent
        travel(agent, agent.home, false, true);
        agent.breakLeft = 0;
        agent.idleFor = 0;
        agent.trailPoints.length = 0;
      }
      for (const agent of agents.values()) {
        // Names and looks: whatever has been set, or what the agent started with.
        const changed = snapshot.profiles?.[agent.profile.id];
        setProfile(agent, changed?.name ?? agent.profile.name, changed?.appearance ?? defaultAppearance(agent.profile.id));
        if (agent.profile.human) continue;
        const status = snapshot.agents[agent.profile.id];
        agent.missionId = status?.missionId ?? null;
        enter(agent, status?.state ?? 'idle', status?.task ?? null, status?.at, true);
      }
    },
    update(delta, time) {
      const chief = agents.get(CHIEF_OF_STAFF_ID);
      breaks(delta * pace);
      rounds(delta * pace);
      for (const agent of agents.values()) move(agent, delta);
      const reporter = currentReporter();
      for (const agent of agents.values()) {
        pose(agent, delta, time, reporter);
        light(agent, delta, time);
        beam(agent, delta, time, chief);
        trail(agent, delta);
      }
    },
    list() {
      return [...agents.values()].map((agent) => ({
        id: agent.profile.id,
        name: agent.name,
        state: agent.state,
        task: agent.task,
        settled: agent.arrived,
      }));
    },
    nameOf(agentId) {
      return agents.get(agentId)?.name;
    },
    pickTargets() {
      return [...agents.values()].map((agent) => agent.rig.pick);
    },
    get(agentId) {
      const agent = agents.get(agentId);
      return agent && { profile: agent.profile, name: agent.name, appearance: agent.appearance, accent: agent.accentHex, position: agent.rig.root.position };
    },
    setNight(level) {
      night = level;
    },
    setProfile(agentId, name, appearance) {
      const agent = agents.get(agentId);
      if (agent) setProfile(agent, name, appearance);
    },
    setSelected(agentId) {
      for (const agent of agents.values()) agent.rig.tag.dataset.selected = String(agent.profile.id === agentId);
    },
    stage(on) {
      staged = on;
      if (!on) return [];
      // Stephen is at his desk for the camera's visit (cutting short any round he was on), and
      // sets off with Cash when it has been: see `wave`. If the wave never comes, he goes anyway.
      const boss = [...agents.values()].find((agent) => agent.profile.human);
      if (boss) {
        round = null;
        travel(boss, boss.home, false, true);
      }
      untilRound = 46;
      const working: string[] = [];
      // Nobody is asleep, and most are away from their desks: ten of the fifteen at the café and in
      // the lounge. The two ends of the table, stools and sofa seats, in the order they are handed out.
      const places = ['cafe.pong-1', 'cafe.pong-2', 'cafe.stool-2', 'lounge.', 'cafe.stool-4', 'lounge.', 'cafe.stool-1', 'lounge.', 'cafe.stool-5', 'lounge.'];
      let turn = 0;
      for (const agent of agents.values()) {
        if (agent.profile.human) continue;
        // The Chief of Staff and one agent in three are at their desks, working; the rest are up and about.
        const atDesk = agent.profile.id === CHIEF_OF_STAFF_ID || turn++ % 3 === 0;
        const wanted = atDesk ? null : places.shift();
        const place = wanted ? freeSpot((id) => id.startsWith(wanted)) : null;
        if (place) {
          enter(agent, 'idle', null, undefined);
          sendOnBreak(agent, place, 100000);
        } else {
          enter(agent, 'working', agent.task ?? 'Working', undefined);
          working.push(agent.profile.id);
        }
      }
      return working;
    },
    wave(at) {
      // When the waving stops, the round begins.
      if (waveAt && !at && staged) untilRound = Math.min(untilRound, 0.4);
      waveAt = at ? (waveAt ?? new THREE.Vector3()).copy(at) : null;
    },
    leading() {
      if (!round) return null;
      return [...agents.values()].find((agent) => agent.profile.human)?.rig.root.position ?? null;
    },
  };
}
