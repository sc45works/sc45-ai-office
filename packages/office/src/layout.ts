/**
 * SC45 AI Office: layout data.
 *
 * This file is the single source of truth for where everything sits. The scene
 * (src/scene.ts) is built entirely from ZONES, so later milestones can place an
 * agent by desk id (`deskWorldPosition`, `seatWorldPosition`) or send it to a
 * shared spot in the meeting room or lounge (`spotWorldPosition`).
 *
 * Axes, seen from above: x runs right, z runs down (towards the default camera).
 * Units are metres-ish; the floor is 60 x 40 and centred on the origin.
 * Desk and spot positions are local to their zone's centre.
 */

export const FLOOR = { width: 60, depth: 40 } as const;

/**
 * How much larger than their plan dimensions the furniture, the people, the animals and the
 * plants are drawn. Desks keep their places; each is scaled about its own centre, and the
 * meeting room and lounge about theirs. One number, so the office can be made fuller or airier.
 */
export const FURNITURE_SCALE = 1.2;

/** The walls round the office: how thick, how high, and how high the part that is always shown. */
export const WALLS = { thickness: 0.5, height: 4.2, sill: 0.9 } as const;

/**
 * The SC45WORKS palette, taken from the live site and logo files.
 * The brand lives on near-black; the spark gradient (orange, pink, violet) is its accent.
 */
export const PALETTE = {
  /** Page and scene background. */
  void: '#020202',
  white: '#FFFFFF',
  // Spark gradient
  orange: '#FF4A12',
  pink: '#FF2E88',
  violet: '#7B5CFF',
  lightViolet: '#8F75FF',
  // Text greys
  soft: '#C9C9D1',
  mist: '#B4B4BE',
  steel: '#8E8E99',
  // Small accents
  peach: '#FFB08F',
  ember: '#FF6A3A',
  green: '#2BD576',
  /** Status only (a blocked agent, from Milestone 2). Not a brand colour: the brand palette has no red. */
  alert: '#FF3B5C',
} as const;

/** The spark gradient's stops, in order: `linear-gradient(90deg, #FF4A12, #FF2E88 50%, #8F75FF)`. */
export const SPARK = [PALETTE.orange, PALETTE.pink, PALETTE.lightViolet] as const;

export interface Point {
  x: number;
  z: number;
}

export type ZoneKind = 'executive' | 'coordinator' | 'department' | 'meeting' | 'lounge' | 'cafe';
export type DeskSize = 'standard' | 'executive';

export interface Desk {
  /** Stable id, `<zone>.<role>`. Milestone 2 assigns agents by this id. */
  id: string;
  /** Role from docs/org-chart.md. */
  role: string;
  /** Desk centre, local to the zone centre. */
  position: Point;
  /** Rotation around the vertical axis, in radians. 0 = the seat is on the +z side, screen facing the default camera. */
  /** Desks are turned a little, each by a different amount and mostly towards the middle of their zone, so the room does not look ruled. */
  rotation?: number;
  size?: DeskSize;
  /** A spare desk with no role in the org chart yet: screen off, strip dimmed. */
  vacant?: boolean;
}

/** A place an agent can stand or sit that is not a desk (meeting-room stool, lounge seat, a spot to report from). */
export interface Spot {
  id: string;
  position: Point;
  /** Defaults to 'sit'. */
  posture?: 'sit' | 'stand';
}

export interface Zone {
  id: string;
  name: string;
  /** Compact name for the floating label on narrow (phone) screens. */
  shortName: string;
  kind: ZoneKind;
  /** Accent colour for the zone's light strips and screens, or null for an area that deliberately has none (the lounge). */
  accent: string | null;
  /** Zone centre on the floor. */
  position: Point;
  size: { width: number; depth: number };
  /** Height of the zone's floor above the main floor (the executive platform is raised). */
  elevation?: number;
  desks: Desk[];
  spots?: Spot[];
  /** A doorway in the zone's east wall, centred on it. Only the glass meeting room has walls all round. */
  door?: { side: 'east'; width: number };
}

/** Six stools evenly spaced around the meeting table. */
const MEETING_SPOTS: Spot[] = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
  return {
    id: `meeting.seat-${i + 1}`,
    position: { x: +(Math.cos(angle) * 2.45).toFixed(3), z: +(Math.sin(angle) * 2.45).toFixed(3) },
  };
});

export const ZONES: Zone[] = [
  // Centre platform
  {
    id: 'executive',
    name: 'Executive Office',
    shortName: 'Exec',
    kind: 'executive',
    accent: PALETTE.white,
    position: { x: 0, z: 0 },
    size: { width: 12, depth: 7 },
    elevation: 0.3,
    desks: [
      { id: 'exec.ceo', role: 'CEO · Stephen', position: { x: -2.9, z: 0.1 }, rotation: 0.14, size: 'executive' },
      { id: 'exec.chief-of-staff', role: 'Chief of Staff', position: { x: 3.1, z: 0.1 }, rotation: -0.14 },
    ],
    // Where agents stand to report to the Chief of Staff.
    spots: [
      { id: 'exec.report-1', position: { x: 1.45, z: 1.15 }, posture: 'stand' },
      { id: 'exec.report-2', position: { x: 1.7, z: 2.35 }, posture: 'stand' },
      { id: 'exec.report-3', position: { x: 3.1, z: 2.75 }, posture: 'stand' },
    ],
  },
  {
    id: 'coordination',
    name: 'Project Coordination',
    shortName: 'PM',
    kind: 'coordinator',
    accent: PALETTE.white,
    position: { x: 0, z: 8.4 },
    size: { width: 7, depth: 4.6 },
    desks: [{ id: 'exec.project-coordinator', role: 'Project Coordinator', position: { x: 0, z: 0.5 }, rotation: -0.12 }],
  },

  // Departments
  {
    id: 'design',
    name: 'Design',
    shortName: 'Design',
    kind: 'department',
    accent: PALETTE.pink,
    position: { x: -20, z: -12.5 },
    size: { width: 15, depth: 10 },
    desks: [
      { id: 'design.lead', role: 'Design Lead', position: { x: 0, z: -2.4 }, rotation: 0.1 },
      { id: 'design.ui-ux', role: 'UI/UX Designer', position: { x: -3.7, z: 1.4 }, rotation: 0.3 },
      { id: 'design.motion-3d', role: '3D / Motion Designer', position: { x: 3.7, z: 1.4 }, rotation: -0.24 },
    ],
  },
  {
    id: 'development',
    name: 'Development',
    shortName: 'Dev',
    kind: 'department',
    accent: PALETTE.violet,
    position: { x: 0, z: -13 },
    size: { width: 15, depth: 10 },
    desks: [
      { id: 'dev.lead', role: 'Dev Lead / Architect', position: { x: 0, z: -2.6 }, rotation: -0.09 },
      { id: 'dev.frontend', role: 'Frontend Developer', position: { x: -4.6, z: 1.4 }, rotation: 0.27 },
      { id: 'dev.integrations', role: 'Integrations Engineer', position: { x: 0, z: 1.4 }, rotation: 0.07 },
      { id: 'dev.qa', role: 'QA Tester', position: { x: 4.6, z: 1.4 }, rotation: -0.31 },
    ],
  },
  {
    id: 'content',
    name: 'Content & Marketing',
    shortName: 'Content',
    kind: 'department',
    accent: PALETTE.orange,
    position: { x: 20, z: -12.5 },
    size: { width: 15, depth: 10 },
    desks: [
      { id: 'content.manager', role: 'Content Manager', position: { x: 0, z: -2.6 }, rotation: 0.12 },
      { id: 'content.script-writer', role: 'Video Script Writer', position: { x: -4.6, z: 1.4 }, rotation: 0.22 },
      { id: 'content.title-thumbnail', role: 'Title & Thumbnail Specialist', position: { x: 0, z: 1.4 }, rotation: -0.1 },
      { id: 'content.social-copy', role: 'Social / Copywriter', position: { x: 4.6, z: 1.4 }, rotation: -0.28 },
    ],
  },
  {
    id: 'sales',
    name: 'Sales & Client Care',
    shortName: 'Sales',
    kind: 'department',
    accent: PALETTE.peach,
    position: { x: -21.5, z: 2.6 },
    size: { width: 13, depth: 9 },
    desks: [
      { id: 'sales.manager', role: 'Sales Manager', position: { x: 0, z: -2 }, rotation: -0.14 },
      { id: 'sales.client-success', role: 'Client Success', position: { x: -3.3, z: 1.4 }, rotation: 0.29 },
      { id: 'sales.open', role: 'Open desk', position: { x: 3.3, z: 1.4 }, rotation: -0.2, vacant: true },
    ],
  },
  {
    id: 'research',
    name: 'Research & Intelligence',
    shortName: 'Research',
    kind: 'department',
    accent: PALETTE.green,
    position: { x: 21.5, z: 2.6 },
    size: { width: 13, depth: 9 },
    desks: [
      { id: 'research.scout', role: 'Research Scout', position: { x: 0, z: -2 }, rotation: 0.11 },
      { id: 'research.analyst', role: 'Competitor / Market Analyst', position: { x: -3.3, z: 1.4 }, rotation: 0.24 },
      { id: 'research.open', role: 'Open desk', position: { x: 3.3, z: 1.4 }, rotation: -0.3, vacant: true },
    ],
  },

  // Shared spaces
  {
    id: 'meeting',
    name: 'Meeting Room',
    shortName: 'Meeting',
    kind: 'meeting',
    accent: PALETTE.soft,
    position: { x: -20, z: 13.6 },
    size: { width: 10, depth: 7 },
    desks: [],
    spots: MEETING_SPOTS,
    door: { side: 'east', width: 1.8 },
  },
  {
    id: 'lounge',
    name: 'Lounge',
    shortName: 'Lounge',
    kind: 'lounge',
    accent: null,
    position: { x: 21, z: 14 },
    size: { width: 11, depth: 7 },
    desks: [],
    spots: [
      { id: 'lounge.sofa-1', position: { x: -2.6, z: -1.3 } },
      { id: 'lounge.sofa-2', position: { x: -0.4, z: -1.3 } },
      { id: 'lounge.sofa-3', position: { x: 1.8, z: -1.3 } },
      { id: 'lounge.side-1', position: { x: 3.0, z: 0.7 } },
      { id: 'lounge.ottoman-1', position: { x: -3.2, z: 1.5 } },
      { id: 'lounge.ottoman-2', position: { x: -1.1, z: 2.3 } },
    ],
  },
];

// The café corner, beside the lounge: a coffee and drinks bar with stools, and a table-tennis table.
// Unlike the lounge it is laid out at the size it is drawn, so nothing here is scaled again.
ZONES.push({
  id: 'cafe',
  name: 'Café & Bar',
  shortName: 'Café',
  kind: 'cafe',
  accent: PALETTE.peach,
  position: { x: 8.6, z: 14.6 },
  size: { width: 8.4, depth: 8.2 },
  desks: [],
  spots: [
    ...[-2.4, -1.2, 0, 1.2, 2.4].map((x, i): Spot => ({ id: `cafe.stool-${i + 1}`, position: { x, z: -0.9 } })),
    { id: 'cafe.pong-1', position: { x: -2.35, z: 2.1 }, posture: 'stand' },
    { id: 'cafe.pong-2', position: { x: 2.35, z: 2.1 }, posture: 'stand' },
  ],
});
/** Where the table-tennis table stands, relative to the café's centre. */
export const PONG_TABLE = { x: 0, z: 2.1, length: 3.2, width: 1.76, height: 0.92 } as const;

// The roster (who works here) is part of the shared contract, because the server and the
// emit command need it too. It is re-exported here so the office has one place to look.
export { AGENTS, CHIEF_OF_STAFF_ID, COORDINATOR_ID, type AgentProfile } from '@sc45/shared';

export type PlantKind = 'tree' | 'shrub';

export interface Plant {
  id: string;
  kind: PlantKind;
  /** Position on the main floor, in world space. */
  position: Point;
  /** Size multiplier; 1 is a tree of about 3.3 or a shrub of about 1.2 high. */
  scale?: number;
}

/**
 * Indoor trees and shrubs in oak planters, placed by the partitions rather than scattered:
 *
 *   each department   a tree at the far end of its slat wall (the near end has its banner);
 *                     its sides are flower beds now (PLANTERS, below), not shrubs
 *   the platform      a shrub at each corner
 *   meeting room      a tree at the corner nearest the middle of the office
 *   lounge            a tree at its far corner: the near side is open to the café
 *   the way in        a tree on the meeting-room side; the other side is the way to the café
 */
export const PLANTS: Plant[] = (() => {
  const plants: Plant[] = [];
  const add = (id: string, kind: PlantKind, x: number, z: number, scale = 1) => plants.push({ id, kind, position: { x: +x.toFixed(2), z: +z.toFixed(2) }, scale });
  for (const zone of ZONES) {
    const { x, z } = zone.position;
    const halfWidth = zone.size.width / 2;
    const halfDepth = zone.size.depth / 2;
    if (zone.kind === 'department') {
      add(`tree.${zone.id}`, 'tree', x + halfWidth + 0.7, z - halfDepth + 0.7, 1.05);
    } else if (zone.kind === 'executive') {
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(`shrub.${zone.id}-${sx < 0 ? 'w' : 'e'}${sz < 0 ? 'n' : 's'}`, 'shrub', x + sx * (halfWidth + 0.9), z + sz * (halfDepth + 0.8), 0.9);
    } else if (zone.kind === 'coordinator') {
      for (const sx of [-1, 1]) add(`shrub.${zone.id}-${sx < 0 ? 'west' : 'east'}`, 'shrub', x + sx * (halfWidth + 0.9), z + 0.6);
    } else if (zone.kind === 'meeting' || zone.kind === 'lounge') {
      // Both are drawn larger than their plan (FURNITURE_SCALE): stand clear of that. Each tree is on the side away from the café.
      add(`tree.${zone.id}`, 'tree', x + (halfWidth * FURNITURE_SCALE + 1.1), z - halfDepth * FURNITURE_SCALE + 0.9);
    }
  }
  add('tree.entrance-west', 'tree', -10.6, FLOOR.depth / 2 - 2.6, 1.05);
  return plants;
})();

/** A long, low planter full of flowers: a garden wall. `along` is the axis it runs on; `length` is in metres. */
export interface Planter {
  id: string;
  /** Its centre, in world space. */
  position: Point;
  length: number;
  along: 'x' | 'z';
}

/** How wide a planter is, and how high its box stands; the planting adds about half a metre. */
export const PLANTER = { width: 0.56, height: 0.5 } as const;

/**
 * The flower beds that divide the floor. Each department is enclosed on three sides: the slat
 * wall behind, and a bed down each side that turns the corner at the front and stops, leaving
 * the front open as the way in. Two more beds line the walk from the entrance to the
 * Project Coordinator, and keep the café to one side of it.
 */
export const PLANTERS: Planter[] = (() => {
  const planters: Planter[] = [];
  const inset = PLANTER.width / 2 + 0.08;
  const RETURN = 2.4; // how far each bed comes across the front
  for (const zone of ZONES) {
    if (zone.kind !== 'department') continue;
    const { x, z } = zone.position;
    const halfWidth = zone.size.width / 2;
    const halfDepth = zone.size.depth / 2;
    const from = z - halfDepth + 1.3; // clear of the slat wall, the banner pole and the tree
    const to = z + halfDepth - inset - PLANTER.width / 2;
    for (const side of [-1, 1]) {
      const name = side < 0 ? 'west' : 'east';
      planters.push({ id: `${zone.id}.${name}`, position: { x: x + side * (halfWidth - inset), z: (from + to) / 2 }, length: to - from, along: 'z' });
      planters.push({ id: `${zone.id}.${name}-front`, position: { x: x + side * (halfWidth - inset + PLANTER.width / 2 - RETURN / 2), z: z + halfDepth - inset }, length: RETURN, along: 'x' });
    }
  }
  for (const side of [-1, 1]) planters.push({ id: `entry.${side < 0 ? 'west' : 'east'}`, position: { x: side * 3.3, z: 15 }, length: 4.8, along: 'z' });
  return planters;
})();

/** Footprint and height of each desk size, as planned: what is drawn is FURNITURE_SCALE times this. */
export const DESK_DIMENSIONS: Record<DeskSize, { width: number; depth: number; height: number }> = {
  standard: { width: 2.8, depth: 1.3, height: 0.74 },
  executive: { width: 3.4, depth: 1.4, height: 0.76 },
};

/** Distance from the desk's front edge to where its occupant sits. */
export const SEAT_GAP = 0.6;

export interface WorldPoint {
  x: number;
  y: number;
  z: number;
}

export function deskDimensions(desk: Desk) {
  return DESK_DIMENSIONS[desk.size ?? 'standard'];
}

/** Desk centre in world space; y is the floor the desk stands on. */
export function deskWorldPosition(zone: Zone, desk: Desk): WorldPoint {
  return { x: zone.position.x + desk.position.x, y: zone.elevation ?? 0, z: zone.position.z + desk.position.z };
}

/** Where the desk's occupant sits, in world space. */
export function seatWorldPosition(zone: Zone, desk: Desk): WorldPoint {
  const base = deskWorldPosition(zone, desk);
  const reach = (deskDimensions(desk).depth / 2 + SEAT_GAP) * FURNITURE_SCALE;
  const rotation = desk.rotation ?? 0;
  return { x: base.x + Math.sin(rotation) * reach, y: base.y, z: base.z + Math.cos(rotation) * reach };
}

/** How much a zone's own furniture is enlarged about the zone's centre: the two shared rooms are, the rest are not. */
export function zoneScale(zone: Zone): number {
  return zone.kind === 'meeting' || zone.kind === 'lounge' ? FURNITURE_SCALE : 1;
}

export function spotWorldPosition(zone: Zone, spot: Spot): WorldPoint {
  // The meeting room and lounge are drawn larger about their centres, and their seats with them.
  const scale = zoneScale(zone);
  return { x: zone.position.x + spot.position.x * scale, y: zone.elevation ?? 0, z: zone.position.z + spot.position.z * scale };
}

export function findDesk(deskId: string): { zone: Zone; desk: Desk } | undefined {
  for (const zone of ZONES) {
    const desk = zone.desks.find((d) => d.id === deskId);
    if (desk) return { zone, desk };
  }
  return undefined;
}
