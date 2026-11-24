/**
 * SC45 AI Office: the 3D scene.
 *
 * Everything here is generated from the data in layout.ts. Nothing is placed by
 * hand, so moving a desk, a tree or a whole zone is a data change only.
 *
 * Look: blocky, like a world built of cubes, in the SC45WORKS colours. A warm wooden floor in a quiet neighbourhood,
 * wood furniture and slat walls, indoor trees, and thin light in the brand's
 * spark colours (orange, pink, violet).
 *
 * Geometry is shared (one unit box, one unit plane, scaled per mesh) and
 * materials are cached per colour, which keeps the scene cheap to draw.
 */
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {
  CHIEF_OF_STAFF_ID,
  FLOOR,
  FURNITURE_SCALE,
  PALETTE,
  PLANTER,
  PLANTERS,
  PONG_TABLE,
  PLANTS,
  SEAT_GAP,
  SPARK,
  ZONES,
  deskDimensions,
  deskWorldPosition,
  seatWorldPosition,
  spotWorldPosition,
  WALLS,
  zoneScale,
  type Desk,
  type Plant,
  type Planter,
  type Zone,
} from './layout';
import { nightLevel, type Sky } from './daylight';
import { buildOutdoors } from './outdoors';
import { pixelate } from './pixel';

/** World-space handle for one desk. Agents are seated and moved with these. */
export interface DeskAnchor {
  deskId: string;
  zoneId: string;
  role: string;
  accent: string;
  vacant: boolean;
  /** Desk centre on its floor. */
  position: THREE.Vector3;
  /** Where the desk's occupant sits. */
  seat: THREE.Vector3;
  rotation: number;
  group: THREE.Group;
  /** The floating role label; hidden once an agent with a name tag sits here. */
  label: CSS2DObject;
}

/** World-space handle for a shared seat or standing spot. */
export interface SpotAnchor {
  spotId: string;
  zoneId: string;
  position: THREE.Vector3;
  posture: 'sit' | 'stand';
  /** What an agent here faces: the table, or the person being reported to. */
  focus: THREE.Vector3;
}

/** Something agents must walk round. Reported by the scene as it builds, read by navigation.ts. */
export type Obstacle =
  | { shape: 'rect'; minX: number; maxX: number; minZ: number; maxZ: number }
  | { shape: 'circle'; x: number; z: number; radius: number };

/** What a working agent's monitor shows: its task, and the latest things it has done. */
export interface ScreenContent {
  /** The task in hand. */
  title: string;
  /** The mission it belongs to, if any. */
  missionId?: string;
  /** Oldest first: files reported and earlier tasks. Only the last few fit. */
  lines: string[];
  /** True when the agent is stuck. */
  blocked?: boolean;
}

/** One card on the Project Coordinator's mission board. */
export interface MissionCard {
  id: string;
  title: string;
  status: 'queued' | 'active' | 'done';
}

export interface Office {
  scene: THREE.Scene;
  fog: THREE.FogExp2;
  desks: ReadonlyMap<string, DeskAnchor>;
  /** Shared seats (meeting room, lounge) and report spots, by spot id. */
  spots: ReadonlyMap<string, SpotAnchor>;
  obstacles: readonly Obstacle[];
  /** Height of the floor at a point: 0, or more on the raised deck and its step. */
  floorHeightAt(x: number, z: number): number;
  /** Where the snack robot waits, in front of the vending machine. */
  vending: { dock: THREE.Vector3 };
  /** Show what an agent is doing on the monitor(s) of its desk, or turn them off with null. */
  setDeskScreen(deskId: string, content: ScreenContent | null): void;
  /** The company core on the executive deck: where it is, and what to raycast against to click it. */
  core: { position: THREE.Vector3; pick: THREE.Object3D };
  /** Redraw the mission board hologram. */
  setMissions(cards: readonly MissionCard[]): void;
  /** Advance ambient motion (leaves, holograms, banners, traffic). Time in seconds. */
  update(time: number, camera: THREE.Camera): void;
  /** Set the time of day: the sky, the sun, and how much the lamps have to do. */
  setSky(sky: Sky): void;
  /** Redraw canvas-based text once web fonts have loaded. */
  redrawText(): void;
  /** Start or stop the rally at the table-tennis table: the ball flies while a game is on. */
  setPong(playing: boolean): void;
  /** Put a glowing folder on Stephen's desk for each mission whose work is waiting for his review (newest first). */
  setReviews(missionIds: readonly string[], troubled?: boolean): void;
  /** What to raycast against to press the folders; nothing when there are none. */
  reviewTargets(): THREE.Object3D[];
  /**
   * True once, each time the shadows the sun casts need drawing again (the sun has moved, or a
   * wall has gone up or down). The shadows are only of things that stand still, so between
   * those times the picture of them is kept and costs nothing.
   */
  shadowsStale(): boolean;
}

const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1);
const UNIT_PLANE = new THREE.PlaneGeometry(1, 1);

const DISPLAY_FONT = '"Space Grotesk", system-ui, sans-serif';
const MONO_FONT = '"JetBrains Mono", ui-monospace, Menlo, monospace';

/** Wood tones (sRGB). The floor is the darkest; furniture is lighter so it reads against it. */
const WOOD = {
  floorDark: '#3b2415',
  floorLight: '#8b5a33',
  deckDark: '#6b4527',
  deckLight: '#a67646',
  oak: '#a87a4b',
  slat: '#9a6b40',
  trunk: '#5a3a22',
} as const;

/** Height of the slat wall behind each department. */
const WALL_HEIGHT = 2.4;

/**
 * An emissive colour bright enough to clear the bloom threshold.
 * Every accent is brought to the same brightness, so dark ones (violet, pink) glow as
 * strongly as light ones, and white does not overpower the rest.
 */
export function neonColor(hex: string, gain = 1): THREE.Color {
  const color = new THREE.Color(hex);
  const luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
  const boost = THREE.MathUtils.clamp(0.62 / Math.max(luminance, 0.05), 0.8, 3.2);
  return color.multiplyScalar(boost * gain);
}

/** Colour at position t (0..1) along the brand's spark gradient: orange, pink, violet. */
export function sparkColor(t: number, target = new THREE.Color()): THREE.Color {
  const stops = SPARK.map((hex) => new THREE.Color(hex));
  const scaled = THREE.MathUtils.clamp(t, 0, 1) * (stops.length - 1);
  const index = Math.min(Math.floor(scaled), stops.length - 2);
  return target.lerpColors(stops[index], stops[index + 1], scaled - index);
}

const WOOD_GLSL = /* glsl */ `
  varying vec2 vWoodXZ;
  uniform vec3 uWoodDark;
  uniform vec3 uWoodLight;
  uniform vec2 uPlank; // x = plank width, y = plank length
  uniform float uAlongZ;

  float woodHash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float woodNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(woodHash(i), woodHash(i + vec2(1.0, 0.0)), f.x),
      mix(woodHash(i + vec2(0.0, 1.0)), woodHash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  // Pixel-art planks: the floor is divided into small squares, and everything (which plank,
  // its tone, its grain, the dark seam along two of its edges) is decided per square.
  // Grain and seams fade out with distance, so the overview stays clean.
  const float WOOD_PIX = 8.0; // squares per metre
  vec3 woodColor(vec2 world) {
    float pixel = max(fwidth(world.x), fwidth(world.y));
    vec2 q = (floor(world * WOOD_PIX) + 0.5) / WOOD_PIX; // the centre of this square
    vec2 p = uAlongZ > 0.5 ? q.yx : q.xy; // p.x runs along the plank
    float row = floor(p.y / uPlank.x);
    float shift = floor(woodHash(vec2(row, 3.7)) * uPlank.y * WOOD_PIX) / WOOD_PIX;
    float along = (p.x + shift) / uPlank.y;
    float tone = woodHash(vec2(floor(along), row));
    vec2 cell = vec2(fract(along) * uPlank.y, fract(p.y / uPlank.x) * uPlank.x);

    // Grain: short streaks running along the plank, and single-square specks.
    float streak = woodHash(vec2(floor(p.x * WOOD_PIX / 4.0), floor(p.y * WOOD_PIX)) + tone * 31.0);
    float speck = woodHash(floor(q * WOOD_PIX) + tone * 17.0);
    float grain = mix(0.5, 0.62 * streak + 0.38 * speck, clamp(0.02 / pixel, 0.0, 1.0));

    vec3 color = mix(uWoodDark, uWoodLight, clamp(0.16 + 0.54 * tone + 0.3 * grain, 0.0, 1.0));

    // The seam is exactly one square wide, along one long edge and one end of each plank.
    float seam = 0.99 / WOOD_PIX;
    float open = step(seam, cell.y) * step(seam, cell.x);
    color *= mix(1.0, mix(0.52, 1.0, open), clamp(0.03 / pixel, 0.0, 1.0));
    return color;
  }
`;

interface PlankOptions {
  dark: string;
  light: string;
  plankWidth: number;
  plankLength: number;
  /** Planks run along z instead of x. */
  alongZ?: boolean;
  roughness?: number;
}

/** A lit standard material whose colour is procedural wood planks, mapped in world space. */
function plankMaterial(options: PlankOptions): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: options.roughness ?? 0.7, metalness: 0 });
  const uniforms = {
    uWoodDark: { value: new THREE.Color(options.dark) },
    uWoodLight: { value: new THREE.Color(options.light) },
    uPlank: { value: new THREE.Vector2(options.plankWidth, options.plankLength) },
    uAlongZ: { value: options.alongZ ? 1 : 0 },
  };
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vWoodXZ;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWoodXZ = (modelMatrix * vec4(position, 1.0)).xz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${WOOD_GLSL}`)
      .replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.rgb = woodColor(vWoodXZ);');
  };
  return material;
}

function box(
  parent: THREE.Object3D,
  material: THREE.Material,
  width: number,
  height: number,
  depth: number,
  x: number,
  y: number,
  z: number,
): THREE.Mesh {
  const mesh = new THREE.Mesh(UNIT_BOX, material);
  mesh.scale.set(width, height, depth);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

/** A flat rectangular outline lying on the floor, made of four thin strips. */
function outline(parent: THREE.Object3D, material: THREE.Material, width: number, depth: number, y: number, thickness: number) {
  box(parent, material, width + thickness, 0.03, thickness, 0, y, -depth / 2);
  box(parent, material, width + thickness, 0.03, thickness, 0, y, depth / 2);
  box(parent, material, thickness, 0.03, depth - thickness, -width / 2, y, 0);
  box(parent, material, thickness, 0.03, depth - thickness, width / 2, y, 0);
}

/** Heavier L-shaped brackets on the four corners of a floor outline. */
function cornerBrackets(parent: THREE.Object3D, material: THREE.Material, width: number, depth: number, y: number) {
  const length = 1.1;
  const thickness = 0.16;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      box(parent, material, length, 0.035, thickness, sx * (width / 2 - length / 2), y, sz * (depth / 2));
      box(parent, material, thickness, 0.035, length, sx * (width / 2), y, sz * (depth / 2 - length / 2));
    }
  }
}

function makeLabel(text: string, className: string, accent?: string | null): CSS2DObject {
  const element = document.createElement('div');
  element.className = className;
  element.textContent = text;
  if (accent) element.style.setProperty('--accent', accent);
  return new CSS2DObject(element);
}

function setLetterSpacing(g: CanvasRenderingContext2D, value: string) {
  if ('letterSpacing' in g) g.letterSpacing = value;
}

/** Shorten text with an ellipsis until it fits the given width. */
function fitText(g: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (g.measureText(text).width <= maxWidth) return text;
  let cut = text.length;
  while (cut > 1 && g.measureText(`${text.slice(0, cut)}\u2026`).width > maxWidth) cut -= 1;
  return `${text.slice(0, cut).trimEnd()}\u2026`;
}

/** The Project Coordinator's hologram: every mission as a card in the column for its status. */
function drawMissionBoard(g: CanvasRenderingContext2D, width: number, height: number, cards: readonly MissionCard[]) {
  const spark = g.createLinearGradient(0, 0, width, 0);
  spark.addColorStop(0, SPARK[0]);
  spark.addColorStop(0.5, SPARK[1]);
  spark.addColorStop(1, SPARK[2]);

  g.clearRect(0, 0, width, height);
  g.globalAlpha = 1;
  g.fillStyle = 'rgba(255, 255, 255, 0.05)';
  g.fillRect(0, 0, width, height);
  g.strokeStyle = spark;
  g.lineWidth = 4;
  g.strokeRect(2, 2, width - 4, height - 4);

  g.textBaseline = 'middle';
  g.textAlign = 'left';
  g.fillStyle = spark;
  g.font = `600 34px ${DISPLAY_FONT}`;
  setLetterSpacing(g, '6px');
  g.fillText('MISSION BOARD', 32, 48);
  g.fillStyle = '#ffffff';
  g.textAlign = 'right';
  g.font = `500 24px ${MONO_FONT}`;
  setLetterSpacing(g, '2px');
  g.fillText(`${cards.filter((card) => card.status === 'active').length} ACTIVE`, width - 32, 48);

  const columns: Array<{ name: string; status: MissionCard['status'] }> = [
    { name: 'QUEUED', status: 'queued' },
    { name: 'IN PROGRESS', status: 'active' },
    { name: 'DONE', status: 'done' },
  ];
  const top = 88;
  const gap = 20;
  const slots = 3;
  const columnWidth = (width - 64 - gap * 2) / columns.length;
  columns.forEach((column, index) => {
    const x = 32 + index * (columnWidth + gap);
    g.globalAlpha = 0.9;
    g.fillStyle = '#ffffff';
    g.strokeStyle = '#ffffff';
    g.textAlign = 'left';
    g.font = `500 20px ${MONO_FONT}`;
    setLetterSpacing(g, '2px');
    g.fillText(column.name, x, top + 14);
    g.globalAlpha = 0.45;
    g.lineWidth = 2;
    g.strokeRect(x, top + 36, columnWidth, height - top - 36 - 30);

    // Newest first; older cards beyond the last slot simply drop off the board.
    const inColumn = cards.filter((card) => card.status === column.status).slice(-slots).reverse();
    for (let slot = 0; slot < slots; slot++) {
      const cardX = x + 12;
      const cardY = top + 50 + slot * 62;
      const cardWidth = columnWidth - 24;
      const card = inColumn[slot];
      if (!card) {
        g.globalAlpha = 0.24;
        g.setLineDash([8, 8]);
        g.strokeStyle = '#ffffff';
        g.strokeRect(cardX, cardY, cardWidth, 48);
        g.setLineDash([]);
        continue;
      }
      g.globalAlpha = column.status === 'done' ? 0.16 : 0.26;
      g.fillStyle = column.status === 'active' ? spark : '#ffffff';
      g.fillRect(cardX, cardY, cardWidth, 48);
      g.globalAlpha = column.status === 'done' ? 0.6 : 1;
      g.fillStyle = '#ffffff';
      setLetterSpacing(g, '0px');
      g.font = `500 14px ${MONO_FONT}`;
      g.fillText(card.id, cardX + 10, cardY + 14);
      g.font = `500 17px ${DISPLAY_FONT}`;
      g.fillText(fitText(g, card.title, cardWidth - 20), cardX + 10, cardY + 33);
    }
  });
  g.globalAlpha = 1;
}

/** The lettering over the entrance: "Start" set light, "Creating" heavy and in the spark gradient, and a full stop in orange. */
function drawEntranceSign(g: CanvasRenderingContext2D, width: number, height: number) {
  g.clearRect(0, 0, width, height);
  g.textBaseline = 'alphabetic';
  g.textAlign = 'left';
  const size = Math.round(height * 0.62);
  const light = `400 ${size}px ${DISPLAY_FONT}`;
  const heavy = `600 ${size}px ${DISPLAY_FONT}`;
  setLetterSpacing(g, `${-Math.round(size * 0.03)}px`);
  g.font = light;
  const first = g.measureText('Start ').width;
  g.font = heavy;
  const second = g.measureText('Creating').width;
  const stop = g.measureText('.').width;
  const left = (width - first - second - stop) / 2;
  const baseline = height * 0.72;

  g.font = light;
  g.fillStyle = '#ffffff';
  g.fillText('Start', left, baseline);
  g.font = heavy;
  const gradient = g.createLinearGradient(left + first, 0, left + first + second, 0);
  SPARK.forEach((hex, index) => gradient.addColorStop(index / (SPARK.length - 1), hex));
  g.fillStyle = gradient;
  g.fillText('Creating', left + first, baseline);
  g.fillStyle = PALETTE.orange;
  g.fillText('.', left + first + second, baseline);
}

/** The street sign: SC45 in white, WORKS in the spark gradient, and a small line with the street number. */
function drawMonument(g: CanvasRenderingContext2D, width: number, height: number) {
  g.clearRect(0, 0, width, height);
  g.textBaseline = 'alphabetic';
  g.textAlign = 'left';
  const size = Math.round(height * 0.46);
  g.font = `600 ${size}px ${DISPLAY_FONT}`;
  setLetterSpacing(g, `${Math.round(size * 0.2)}px`);
  const first = g.measureText('SC45').width;
  const second = g.measureText('WORKS').width;
  const left = (width - first - second) / 2 + size * 0.1;
  const baseline = height * 0.58;
  g.fillStyle = '#ffffff';
  g.fillText('SC45', left, baseline);
  const gradient = g.createLinearGradient(left + first, 0, left + first + second, 0);
  SPARK.forEach((hex, index) => gradient.addColorStop(index / (SPARK.length - 1), hex));
  g.fillStyle = gradient;
  g.fillText('WORKS', left + first, baseline);

  g.font = `500 ${Math.round(height * 0.11)}px ${MONO_FONT}`;
  setLetterSpacing(g, `${Math.round(height * 0.05)}px`);
  g.textAlign = 'center';
  g.fillStyle = PALETTE.steel;
  g.fillText('NO. 45  ·  SOLO CREATOR STUDIO', width / 2, height * 0.84);
}

/** A working agent's monitor: a small terminal with the task at the top and what has been done below it. */
function drawTerminal(g: CanvasRenderingContext2D, width: number, height: number, content: ScreenContent, accent: string, cursorOn: boolean) {
  g.fillStyle = '#0b0c10';
  g.fillRect(0, 0, width, height);
  // Title bar: a dot in the department's colour (red when blocked), the mission, the task.
  g.fillStyle = '#16181f';
  g.fillRect(0, 0, width, 34);
  g.fillStyle = content.blocked ? PALETTE.alert : accent;
  g.fillRect(12, 12, 10, 10);
  g.textBaseline = 'middle';
  g.textAlign = 'left';
  setLetterSpacing(g, '0px');
  g.font = `500 15px ${MONO_FONT}`;
  let x = 32;
  if (content.missionId) {
    g.fillStyle = accent;
    g.fillText(content.missionId, x, 18);
    x += g.measureText(content.missionId).width + 10;
  }
  g.fillStyle = '#ffffff';
  g.fillText(fitText(g, content.title, width - x - 12), x, 18);

  // Body: the last few lines, the newest at the bottom, then the cursor.
  g.font = `400 14px ${MONO_FONT}`;
  const lineHeight = 22;
  const room = Math.floor((height - 34 - 14) / lineHeight) - 1;
  const lines = content.lines.slice(-room);
  let y = 34 + 20;
  for (const line of lines) {
    g.fillStyle = PALETTE.green;
    g.fillText('✓', 12, y);
    g.fillStyle = PALETTE.soft;
    g.fillText(fitText(g, line, width - 44), 32, y);
    y += lineHeight;
  }
  g.fillStyle = content.blocked ? PALETTE.alert : accent;
  g.fillText(content.blocked ? '!' : '>', 12, y);
  g.fillStyle = content.blocked ? PALETTE.alert : '#ffffff';
  const prompt = content.blocked ? 'waiting' : lines.length === 0 ? 'starting' : 'working';
  g.fillText(prompt, 32, y);
  if (cursorOn) g.fillRect(32 + g.measureText(prompt).width + 6, y - 8, 9, 16);
}

/** What is on the lounge television: a little blocky runner game, drawn a frame at a time. */
function drawGame(g: CanvasRenderingContext2D, width: number, height: number, frame: number) {
  g.fillStyle = '#141a3a';
  g.fillRect(0, 0, width, height);
  // Stars that drift slowly, hills that drift faster, ground that runs past.
  g.fillStyle = '#5a6bb8';
  for (let i = 0; i < 14; i++) g.fillRect((i * 37 - Math.floor(frame / 4)) % width + (i * 37 - Math.floor(frame / 4) < 0 ? width : 0), (i * 13) % 22 + 2, 1, 1);
  g.fillStyle = '#2b3a7a';
  for (let i = 0; i < 6; i++) {
    const x = ((i * 24 - Math.floor(frame / 2)) % (width + 24) + width + 24) % (width + 24) - 24;
    g.fillRect(x, 30 - (i % 3) * 4, 18, 14 + (i % 3) * 4);
  }
  g.fillStyle = '#2f7a50';
  g.fillRect(0, 44, width, 10);
  g.fillStyle = '#3f9a62';
  for (let x = -((frame * 2) % 8); x < width; x += 8) g.fillRect(x, 44, 4, 2);
  // Obstacles come from the right; the runner hops over each one as it arrives.
  const lap = 48;
  const phase = (frame * 2) % lap;
  const obstacleX = width - 10 - phase * 2 + 20;
  g.fillStyle = PALETTE.orange;
  g.fillRect(obstacleX, 38, 5, 6);
  const runnerX = 22;
  const distance = obstacleX - runnerX;
  const jump = distance > -8 && distance < 16 ? Math.round(Math.sin(((16 - distance) / 24) * Math.PI) * 11) : 0;
  g.fillStyle = PALETTE.pink;
  g.fillRect(runnerX, 37 - jump, 5, 7);
  g.fillStyle = '#ffffff';
  g.fillRect(runnerX + 3, 38 - jump, 1, 1);
  // Score: one block per obstacle cleared, top left.
  g.fillStyle = PALETTE.peach;
  for (let i = 0; i < (Math.floor((frame * 2) / lap) % 8) + 1; i++) g.fillRect(3 + i * 4, 3, 3, 3);
}

/** The front of the vending machine: a lit window of drinks and snacks, a slot, and a keypad. */
function drawVending(g: CanvasRenderingContext2D, width: number, height: number) {
  g.fillStyle = '#17181d';
  g.fillRect(0, 0, width, height);
  // Header
  g.fillStyle = PALETTE.orange;
  g.fillRect(8, 8, width - 16, 30);
  g.fillStyle = '#16100c';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  setLetterSpacing(g, '3px');
  g.font = `600 17px ${DISPLAY_FONT}`;
  g.fillText('SNACKS', width / 2, 24);
  // The window: four shelves, cans on the upper two, packets on the lower two.
  g.fillStyle = '#e9eef6';
  g.fillRect(8, 46, width - 52, 176);
  const colours = [PALETTE.orange, PALETTE.pink, PALETTE.lightViolet, PALETTE.green, PALETTE.peach, '#2b4a7d', '#f4c542', '#b5432e'];
  for (let row = 0; row < 4; row++) {
    const top = 52 + row * 43;
    for (let col = 0; col < 5; col++) {
      g.fillStyle = colours[(row * 3 + col * 5) % colours.length];
      if (row < 2) {
        g.fillRect(14 + col * 19, top, 13, 30);
        g.fillStyle = 'rgba(255,255,255,0.55)';
        g.fillRect(14 + col * 19, top + 10, 13, 5);
      } else {
        g.fillRect(13 + col * 19, top + 6, 15, 24);
        g.fillStyle = 'rgba(0,0,0,0.25)';
        g.fillRect(13 + col * 19, top + 6, 15, 4);
      }
    }
    g.fillStyle = '#9aa3b2';
    g.fillRect(8, top + 32, width - 52, 4);
  }
  // Keypad and coin slot down the right, the delivery slot along the bottom.
  g.fillStyle = '#2a2c35';
  g.fillRect(width - 38, 46, 30, 176);
  g.fillStyle = PALETTE.green;
  g.fillRect(width - 33, 54, 20, 12);
  g.fillStyle = '#c9c9d1';
  for (let i = 0; i < 9; i++) g.fillRect(width - 33 + (i % 3) * 7, 76 + Math.floor(i / 3) * 8, 5, 5);
  g.fillStyle = '#0b0b0d';
  g.fillRect(width - 28, 112, 10, 3);
  g.fillRect(16, 234, width - 32, 38);
  g.fillStyle = '#3a3d48';
  g.fillRect(20, 238, width - 40, 6);
}

/** One simple line icon per zone, drawn in a 200-unit box centred on the origin. */
const ZONE_ICONS: Record<string, (g: CanvasRenderingContext2D) => void> = {
  // A crown.
  executive(g) {
    g.beginPath();
    for (const [x, y] of [[-72, 52], [-82, -38], [-36, 8], [0, -58], [36, 8], [82, -38], [72, 52]]) g.lineTo(x, y);
    g.closePath();
    g.stroke();
  },
  // A board with three columns of work.
  coordination(g) {
    for (const [x, h] of [[-62, 120], [0, 72], [62, 100]] as const) g.strokeRect(x - 22, -62, 44, h);
  },
  // A pen nib.
  design(g) {
    g.beginPath();
    for (const [x, y] of [[0, -84], [50, -8], [28, 76], [-28, 76], [-50, -8]]) g.lineTo(x, y);
    g.closePath();
    g.moveTo(0, -84);
    g.lineTo(0, 6);
    g.stroke();
    g.beginPath();
    g.arc(0, 20, 12, 0, Math.PI * 2);
    g.fill();
  },
  // </>
  development(g) {
    g.beginPath();
    g.moveTo(-34, -52);
    g.lineTo(-84, 0);
    g.lineTo(-34, 52);
    g.moveTo(34, -52);
    g.lineTo(84, 0);
    g.lineTo(34, 52);
    g.moveTo(16, -70);
    g.lineTo(-16, 70);
    g.stroke();
  },
  // A play button.
  content(g) {
    g.beginPath();
    g.arc(0, 0, 76, 0, Math.PI * 2);
    g.stroke();
    g.beginPath();
    g.moveTo(-22, -36);
    g.lineTo(40, 0);
    g.lineTo(-22, 36);
    g.closePath();
    g.fill();
  },
  // A speech bubble.
  sales(g) {
    g.beginPath();
    g.roundRect(-78, -62, 156, 104, 26);
    g.moveTo(-30, 42);
    g.lineTo(-44, 80);
    g.lineTo(6, 42);
    g.stroke();
    for (const x of [-36, 0, 36]) {
      g.beginPath();
      g.arc(x, -10, 9, 0, Math.PI * 2);
      g.fill();
    }
  },
  // A magnifying glass.
  research(g) {
    g.beginPath();
    g.arc(-14, -14, 52, 0, Math.PI * 2);
    g.moveTo(24, 24);
    g.lineTo(76, 76);
    g.stroke();
  },
  // A round table and six seats.
  meeting(g) {
    g.beginPath();
    g.arc(0, 0, 36, 0, Math.PI * 2);
    g.stroke();
    for (let i = 0; i < 6; i++) {
      g.beginPath();
      g.arc(Math.cos((i / 6) * Math.PI * 2) * 72, Math.sin((i / 6) * Math.PI * 2) * 72, 11, 0, Math.PI * 2);
      g.fill();
    }
  },
  // A cup, with steam.
  // A stemmed glass and a bottle.
  cafe(g) {
    g.beginPath();
    g.moveTo(-70, -60);
    g.lineTo(-10, -60);
    g.lineTo(-40, -6);
    g.closePath();
    g.moveTo(-40, -6);
    g.lineTo(-40, 62);
    g.moveTo(-66, 62);
    g.lineTo(-14, 62);
    g.moveTo(34, -84);
    g.lineTo(34, -44);
    g.lineTo(14, -20);
    g.lineTo(14, 62);
    g.lineTo(70, 62);
    g.lineTo(70, -20);
    g.lineTo(50, -44);
    g.lineTo(50, -84);
    g.closePath();
    g.stroke();
  },
  lounge(g) {
    g.beginPath();
    g.moveTo(-58, -10);
    g.lineTo(-48, 62);
    g.lineTo(28, 62);
    g.lineTo(38, -10);
    g.closePath();
    g.moveTo(38, 4);
    g.bezierCurveTo(86, 0, 86, 46, 32, 44);
    g.moveTo(-30, -36);
    g.bezierCurveTo(-42, -52, -18, -62, -30, -80);
    g.moveTo(8, -36);
    g.bezierCurveTo(-4, -52, 20, -62, 8, -80);
    g.stroke();
  },
};

/** A department banner: dark cloth with a swallow-tail, the zone's icon at the top and its name down the length. */
function drawBanner(g: CanvasRenderingContext2D, width: number, height: number, zone: Zone, accent: string) {
  g.clearRect(0, 0, width, height);
  const notch = width * 0.34;
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(width, 0);
  g.lineTo(width, height);
  g.lineTo(width / 2, height - notch);
  g.lineTo(0, height);
  g.closePath();
  g.fillStyle = '#0d0d11';
  g.fill();
  g.save();
  g.clip();
  // The cloth is the accent, deepened so the white icon and lettering stand out on it.
  // (Zones whose accent is white or grey get charcoal cloth instead, or the whole banner would glare.)
  const colour = new THREE.Color(accent);
  const pale = Math.max(colour.r, colour.g, colour.b) - Math.min(colour.r, colour.g, colour.b) < 0.15;
  g.fillStyle = pale ? '#34343c' : accent;
  g.globalAlpha = pale ? 1 : 0.8;
  g.fillRect(0, 0, width, height);
  g.globalAlpha = 1;
  g.fillStyle = accent;
  g.fillRect(0, 0, width, 14);
  g.restore();

  g.save();
  g.translate(width / 2, 34 + width * 0.36);
  g.scale(width / 300, width / 300);
  g.strokeStyle = '#ffffff';
  g.fillStyle = '#ffffff';
  g.lineWidth = 15;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  ZONE_ICONS[zone.id]?.(g);
  g.restore();

  // The name, reading down the banner.
  g.save();
  g.translate(width / 2, 34 + width * 0.78);
  g.rotate(Math.PI / 2);
  g.fillStyle = '#ffffff';
  g.textAlign = 'left';
  g.textBaseline = 'middle';
  const room = height - notch - (34 + width * 0.78) - 16;
  let size = Math.round(width * 0.3);
  const text = zone.shortName.toUpperCase();
  do {
    g.font = `600 ${size}px ${DISPLAY_FONT}`;
    setLetterSpacing(g, `${Math.round(size * 0.14)}px`);
    size -= 2;
  } while (g.measureText(text).width > room && size > 16);
  g.fillText(text, 0, 4);
  g.restore();
}

/** Colours the time of day moves between. */
const SKY = {
  night: new THREE.Color(PALETTE.void),
  day: new THREE.Color('#7cc8ff'),
  golden: new THREE.Color('#f0a070'),
  roomLight: new THREE.Color('#ffe1c2'),
  dayLight: new THREE.Color('#eaf3ff'),
  goldenLight: new THREE.Color('#ffc79a'),
  roomBounce: new THREE.Color('#1d120a'),
  dayBounce: new THREE.Color('#8a7c6c'),
  sunNoon: new THREE.Color('#fff1d8'),
  sunLow: new THREE.Color('#ffb070'),
};
const skyColor = new THREE.Color();

export function createOffice(): Office {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PALETTE.void);
  const fog = new THREE.FogExp2(PALETTE.void, 0.006);
  scene.fog = fog;

  const tickers: Array<(time: number) => void> = [];
  const redraws: Array<() => void> = [];
  const desks = new Map<string, DeskAnchor>();
  const spots = new Map<string, SpotAnchor>();
  let missionCards: readonly MissionCard[] = [];

  // What agents must walk round, and where the floor is raised. Filled in by the builders below.
  const obstacles: Obstacle[] = [];
  const raised: Array<{ minX: number; maxX: number; minZ: number; maxZ: number; height: number }> = [];
  /**
   * While a zone that is drawn larger than its plan is being built, what it reports as
   * obstacles is enlarged about the zone's centre in the same way as what it draws.
   */
  let enlarge: { x: number; z: number; by: number } | null = null;
  const placed = (value: number, centre: number) => (enlarge ? centre + (value - centre) * enlarge.by : value);
  const sized = (value: number) => (enlarge ? value * enlarge.by : value);
  /** Report a rectangular obstacle by its centre and size, in world space. */
  function blockRect(centerX: number, centerZ: number, width: number, depth: number) {
    const x = placed(centerX, enlarge?.x ?? 0);
    const z = placed(centerZ, enlarge?.z ?? 0);
    obstacles.push({ shape: 'rect', minX: x - sized(width) / 2, maxX: x + sized(width) / 2, minZ: z - sized(depth) / 2, maxZ: z + sized(depth) / 2 });
  }
  function blockCircle(x: number, z: number, radius: number) {
    obstacles.push({ shape: 'circle', x: placed(x, enlarge?.x ?? 0), z: placed(z, enlarge?.z ?? 0), radius: sized(radius) });
  }

  // Materials ---------------------------------------------------------------

  const mat = {
    /** Walnut floor planks, running left to right. */
    floor: plankMaterial({ dark: WOOD.floorDark, light: WOOD.floorLight, plankWidth: 0.625, plankLength: 5, roughness: 0.74 }),
    /** Lighter oak decking for the raised platform, running front to back. */
    deck: plankMaterial({ dark: WOOD.deckDark, light: WOOD.deckLight, plankWidth: 0.375, plankLength: 3.5, alongZ: true, roughness: 0.66 }),
    /** Solid oak: desk and table tops, planters, wall caps. */
    oak: pixelate(new THREE.MeshStandardMaterial({ color: WOOD.oak, roughness: 0.62, metalness: 0 }), 8, 0.13),
    slat: pixelate(new THREE.MeshStandardMaterial({ color: WOOD.slat, roughness: 0.7, metalness: 0 }), 8, 0.14),
    trunk: pixelate(new THREE.MeshStandardMaterial({ color: WOOD.trunk, roughness: 0.85, metalness: 0 }), 8, 0.18),
    /** Charcoal metal: desk frames, monitor housings, wall backing. */
    body: new THREE.MeshStandardMaterial({ color: '#1c1c20', roughness: 0.5, metalness: 0.4 }),
    /** Dark upholstery: chairs, stools, lounge seating. */
    soft: pixelate(new THREE.MeshStandardMaterial({ color: '#26262b', roughness: 0.95, metalness: 0 }), 8, 0.16),
    soil: new THREE.MeshStandardMaterial({ color: '#17110c', roughness: 1, metalness: 0 }),
    /** Warm plaster for the outer walls. */
    plaster: pixelate(new THREE.MeshStandardMaterial({ color: '#b8ad9c', roughness: 0.95, metalness: 0 }), 4, 0.07),
    /** Window and wall glass: one material, so all of it is drawn together. */
    glass: new THREE.MeshPhysicalMaterial({ color: '#ffffff', transparent: true, opacity: 0.09, roughness: 0.08, metalness: 0, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false }),
    screenOff: new THREE.MeshBasicMaterial({ color: '#0b0b0d' }),
    /** Quiet, non-glowing line: floor rim, lounge outline. */
    dimLine: new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.steel).multiplyScalar(0.28) }),
    foliage: ['#3f9a62', '#52b877', '#2f8055'].map(
      (color) => pixelate(new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, flatShading: true }), 5, 0.2),
    ),
  };

  // Light strips. They are lit at night only: by day and at dusk each fades to a dull line of its own colour.
  const neonCache = new Map<string, { material: THREE.MeshBasicMaterial; on: THREE.Color; off: THREE.Color }>();
  function neon(hex: string, gain = 1): THREE.MeshBasicMaterial {
    const key = `${hex}:${gain}`;
    let entry = neonCache.get(key);
    if (!entry) {
      const on = neonColor(hex, gain);
      entry = { material: new THREE.MeshBasicMaterial({ color: on.clone() }), on, off: new THREE.Color(hex).multiplyScalar(0.22).lerp(new THREE.Color('#3a2a1e'), 0.35) };
      neonCache.set(key, entry);
    }
    return entry.material;
  }

  const tintCache = new Map<string, THREE.MeshBasicMaterial>();
  function tint(hex: string): THREE.MeshBasicMaterial {
    let material = tintCache.get(hex);
    if (!material) {
      material = new THREE.MeshBasicMaterial({
        color: hex,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      tintCache.set(hex, material);
    }
    return material;
  }

  // Lighting ----------------------------------------------------------------

  // Low, warm ambient: enough to read the wood everywhere, with the pools of light doing the rest.
  const ambient = new THREE.HemisphereLight('#ffe1c2', '#1d120a', 1.2);
  scene.add(ambient);
  // The sun: off at night. By day it shines in from over the sea, across the front of the office,
  // and casts the shadows of everything that stands still: walls, window frames, furniture, plants.
  // (People do not cast one: then the shadows only need drawing when the sun moves.)
  const sun = new THREE.DirectionalLight('#ffffff', 0);
  sun.castShadow = true;
  // One large, soft shadow picture for the whole place: the beach, the office, and the town
  // behind as far as Taipei 101, whose towers throw long shadows away from the sea.
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.camera.left = -175;
  sun.shadow.camera.right = 175;
  sun.shadow.camera.top = 175;
  sun.shadow.camera.bottom = -175;
  sun.shadow.camera.near = 20;
  sun.shadow.camera.far = 620;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.22;
  sun.shadow.radius = 3.2; // soft at the edges
  sun.target.position.set(0, 0, -35);
  scene.add(sun, sun.target);
  let shadowsStale = true;
  const shadowSun = new THREE.Vector3();

  // The sun itself, and the glare round it: seen when the view is turned towards the sea.
  const sunDisc = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: (() => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 256;
        const g = canvas.getContext('2d')!;
        const glow = g.createRadialGradient(128, 128, 0, 128, 128, 128);
        glow.addColorStop(0, 'rgba(255,255,255,1)');
        glow.addColorStop(0.09, 'rgba(255,255,255,1)');
        glow.addColorStop(0.13, 'rgba(255,244,214,0.55)');
        glow.addColorStop(0.4, 'rgba(255,226,170,0.16)');
        glow.addColorStop(1, 'rgba(255,220,160,0)');
        g.fillStyle = glow;
        g.fillRect(0, 0, 256, 256);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
      })(),
      transparent: true,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  sunDisc.name = 'sun-disc';
  sunDisc.scale.setScalar(260);
  sunDisc.renderOrder = -1;
  scene.add(sunDisc);
  const zoneLights: Array<{ light: THREE.SpotLight; base: number }> = [];
  const signMaterials: THREE.MeshBasicMaterial[] = [];
  let companyCore: Office['core'] | null = null;

  const WARM_LIGHT = new THREE.Color('#ffc999');
  /** One soft, warm spotlight per zone, tinted slightly towards the zone's accent. */
  function spotlight(accent: string | null, x: number, z: number, intensity: number, height = 12) {
    const color = WARM_LIGHT.clone();
    if (accent) color.lerp(new THREE.Color(accent), 0.18);
    const light = new THREE.SpotLight(color, intensity, 36, 0.74, 1, 1.5);
    light.position.set(x, height, z + 1.5);
    light.target.position.set(x, 0, z);
    scene.add(light, light.target);
    zoneLights.push({ light, base: intensity });
  }

  // Floor -------------------------------------------------------------------

  box(scene, mat.floor, FLOOR.width, 0.5, FLOOR.depth, 0, -0.25, 0);
  outline(scene, mat.dimLine, FLOOR.width, FLOOR.depth, 0.012, 0.07);

  // The neighbourhood outside. A backdrop only: nothing out there is walked on or clicked.
  const outdoors = buildOutdoors(scene, neonColor);
  tickers.push((time) => outdoors.update(time));

  // Shared builders ---------------------------------------------------------

  function zoneGroup(zone: Zone): THREE.Group {
    const group = new THREE.Group();
    group.name = `zone:${zone.id}`;
    group.position.set(zone.position.x, 0, zone.position.z);
    group.scale.setScalar(zoneScale(zone));
    scene.add(group);
    return group;
  }

  /**
   * Each zone is marked by a banner on a pole at its back-left corner: the zone's icon and
   * name on dark cloth edged in its accent, and a small name plate at the top of the pole
   * that stays readable however far out the camera is.
   */
  const POLE_HEIGHT = 5.7;
  const BANNER = { width: 1.7, height: 3.5 };
  const poleGeometry = new THREE.BoxGeometry(0.12, 1, 0.12);
  function zoneBanner(zone: Zone) {
    const accent = zone.accent ?? PALETTE.mist;
    // At the corner of the zone as drawn, which for the two shared rooms is larger than the plan.
    const x = zone.position.x - (zone.size.width / 2) * zoneScale(zone) - 0.3;
    const z = zone.position.z - (zone.size.depth / 2) * zoneScale(zone);
    const group = new THREE.Group();
    group.name = `banner:${zone.id}`;
    group.position.set(x, 0, z);
    scene.add(group);
    const enlarging = enlarge;
    enlarge = null; // the pole is where it says it is
    blockCircle(x, z, 0.2);
    enlarge = enlarging;

    const pole = new THREE.Mesh(poleGeometry, mat.body);
    pole.scale.y = POLE_HEIGHT;
    pole.position.y = POLE_HEIGHT / 2;
    group.add(pole);
    box(group, mat.oak, 0.34, 0.12, 0.34, 0, 0.06, 0);
    box(group, neon(accent, 0.9), 0.16, 0.16, 0.16, 0, POLE_HEIGHT + 0.08, 0);
    // The arm the cloth hangs from.
    const armY = POLE_HEIGHT - 0.22;
    box(group, mat.body, BANNER.width + 0.5, 0.07, 0.07, (BANNER.width + 0.5) / 2 - 0.05, armY, 0);

    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = Math.round((300 * BANNER.height) / BANNER.width);
    const g = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    const draw = () => {
      drawBanner(g, canvas.width, canvas.height, zone, accent);
      texture.needsUpdate = true;
    };
    draw();
    redraws.push(draw);
    // Plain cloth: lit by the room like everything else, with just enough of its own light to
    // be read at night, and always under the bloom threshold, so it never glows.
    const material = new THREE.MeshLambertMaterial({ map: texture, alphaTest: 0.5, emissive: '#ffffff', emissiveMap: texture, emissiveIntensity: 0.16 });

    // Two faces back to back, so the banner reads the right way round from either side.
    const cloth = new THREE.Group();
    cloth.position.set(0.3 + BANNER.width / 2, armY - 0.04, 0);
    for (const turn of [0, Math.PI]) {
      const face = new THREE.Mesh(UNIT_PLANE, material);
      face.scale.set(BANNER.width, BANNER.height, 1);
      face.position.set(0, -BANNER.height / 2, turn === 0 ? 0.012 : -0.012);
      face.rotation.y = turn;
      cloth.add(face);
    }
    cloth.userData.dynamic = true;
    group.add(cloth);
    // The cloth stirs a little, each banner on its own rhythm.
    const phase = zone.position.x * 0.37 + zone.position.z * 0.21;
    tickers.push((time) => {
      cloth.rotation.x = Math.sin(time * 0.9 + phase) * 0.035;
      cloth.rotation.y = Math.sin(time * 0.6 + phase * 1.3) * 0.05;
    });

    const plate = makeLabel('', 'zone-label', accent);
    const full = document.createElement('span');
    full.className = 'name-full';
    full.textContent = zone.name;
    const short = document.createElement('span');
    short.className = 'name-short';
    short.textContent = zone.shortName;
    plate.element.append(full, short);
    plate.center.set(0.5, 1);
    plate.position.set(0, POLE_HEIGHT + 0.3, 0);
    group.add(plate);
  }

  /**
   * A vending machine just inside the entrance, to the left of the doors as you come in,
   * facing the way in. Returns where the snack robot waits in front of it.
   */
  function buildVending(): THREE.Vector3 {
    const x = -5.7; // clear of the door leaf that stands open
    const z = FLOOR.depth / 2 - 1.9;
    const group = new THREE.Group();
    group.name = 'vending';
    group.position.set(x, 0, z);
    group.rotation.y = Math.PI / 2; // its front (local +z) faces +x, towards the doorway
    group.scale.setScalar(FURNITURE_SCALE);
    scene.add(group);
    blockRect(x, z, 0.95 * FURNITURE_SCALE, 1.25 * FURNITURE_SCALE);

    box(group, mat.body, 1.15, 2.05, 0.86, 0, 1.025, 0);
    box(group, mat.screenOff, 1.19, 0.1, 0.9, 0, 0.05, 0);
    box(group, neon(PALETTE.orange, 0.9), 1.17, 0.05, 0.88, 0, 2.07, 0);

    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 288;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    const draw = () => {
      drawVending(canvas.getContext('2d')!, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };
    draw();
    redraws.push(draw);
    const front = new THREE.Mesh(UNIT_PLANE, new THREE.MeshBasicMaterial({ map: texture }));
    front.scale.set(1.03, 1.86, 1);
    front.position.set(0, 1.07, 0.432);
    group.add(front);
    return new THREE.Vector3(x + 1.25 * FURNITURE_SCALE, 0, z);
  }

  /**
   * The company's name at the street: a low stone sign on the lawn beside the path, with
   * SC45WORKS on both faces and the street number on its end.
   */
  function buildMonument() {
    const ground = -0.5; // the lawn is half a metre below the office floor
    const width = 6.2;
    const height = 1.5;
    const group = new THREE.Group();
    group.name = 'monument';
    group.position.set(-7.9, ground, FLOOR.depth / 2 + 2.6);
    scene.add(group);

    const stone = new THREE.MeshStandardMaterial({ color: '#2a2a30', roughness: 0.85, metalness: 0.05 });
    box(group, mat.oak, width + 0.5, 0.22, 1, 0, 0.11, 0);
    box(group, stone, width, height, 0.5, 0, 0.22 + height / 2, 0);
    // A line of warm light at its foot, front and back.
    for (const side of [-1, 1]) box(group, neon(PALETTE.peach, 0.85), width - 0.4, 0.04, 0.05, 0, 0.245, side * 0.36);

    const canvas = document.createElement('canvas');
    canvas.width = 1240;
    canvas.height = 300;
    const g = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    const draw = () => {
      drawMonument(g, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };
    draw();
    redraws.push(draw);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, color: new THREE.Color(0.62, 0.62, 0.62) });
    signMaterials.push(material);
    for (const turn of [0, Math.PI]) {
      const face = new THREE.Mesh(UNIT_PLANE, material);
      face.scale.set(width, height, 1);
      face.position.set(0, 0.22 + height / 2, turn === 0 ? 0.256 : -0.256);
      face.rotation.y = turn;
      group.add(face);
    }
  }

  /**
   * The front door, in the middle of the open front edge: oak posts and a canopy, glass to
   * either side, and "Start Creating." in lights on top, facing the street.
   */
  function buildEntrance() {
    const z = FLOOR.depth / 2 - 0.8;
    const group = new THREE.Group();
    group.name = 'entrance';
    group.position.set(0, 0, z);
    scene.add(group);

    const glass = new THREE.MeshPhysicalMaterial({ color: '#ffffff', transparent: true, opacity: 0.08, roughness: 0.08, metalness: 0, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false });
    const doorway = 6.4;
    const postHeight = 3.5;
    for (const side of [-1, 1]) {
      const postX = side * (doorway / 2 + 0.25);
      box(group, mat.oak, 0.5, postHeight, 0.5, postX, postHeight / 2, 0);
      blockRect(postX, z, 0.5, 0.5);
      // Glass out to the planters, in an oak frame.
      const run = 5.6;
      const middle = postX + side * (0.25 + run / 2);
      box(group, glass, run, 2.9, 0.05, middle, 1.45, 0).renderOrder = 2;
      box(group, mat.oak, run, 0.12, 0.18, middle, 2.96, 0);
      box(group, mat.oak, run, 0.1, 0.18, middle, 0.05, 0);
      box(group, mat.oak, 0.18, 3.02, 0.18, postX + side * (0.25 + run), 1.51, 0);
      blockRect(middle, z, run, 0.3);
      // A door leaf standing open against each post.
      const leaf = new THREE.Group();
      leaf.position.set(side * (doorway / 2), 0, 0.25);
      leaf.rotation.y = side * -1.25;
      box(leaf, glass, 1.5, 2.7, 0.04, side * -0.75, 1.4, 0).renderOrder = 2;
      box(leaf, mat.body, 0.05, 0.9, 0.08, side * -1.38, 1.3, 0);
      group.add(leaf);
    }
    // Canopy: oak, with a dark cap and a line of warm light underneath.
    const canopyWidth = doorway + 3.4;
    box(group, mat.oak, canopyWidth, 0.26, 2, 0, postHeight + 0.13, 0.6);
    box(group, mat.slat, canopyWidth + 0.1, 0.08, 2.1, 0, postHeight + 0.3, 0.6);
    box(group, neon(PALETTE.peach, 0.9), doorway - 0.6, 0.04, 0.07, 0, postHeight - 0.03, 1.2);
    // A spark-coloured threshold strip in the floor.
    SPARK.forEach((hex, index) => box(group, neon(hex, 0.9), doorway / SPARK.length, 0.03, 0.08, (index - 1) * (doorway / SPARK.length), 0.016, 0.55));

    // The sign: lettering standing on the canopy's front edge.
    const canvas = document.createElement('canvas');
    canvas.width = 1792;
    canvas.height = 320;
    const g = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    const draw = () => {
      drawEntranceSign(g, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };
    draw();
    redraws.push(draw);
    // A soft glow: the white just clears the bloom threshold, the colours sit under it.
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, color: new THREE.Color(0.62, 0.62, 0.62) });
    signMaterials.push(material);
    const signWidth = canopyWidth - 0.2;
    const signHeight = (signWidth * canvas.height) / canvas.width;
    for (const turn of [0, Math.PI]) {
      const face = new THREE.Mesh(UNIT_PLANE, material);
      face.scale.set(signWidth, signHeight, 1);
      face.position.set(0, postHeight + 0.34 + signHeight / 2, 1.55 + (turn === 0 ? 0.01 : -0.01));
      face.rotation.y = turn;
      face.renderOrder = 3;
      group.add(face);
    }
    box(group, mat.body, signWidth, 0.06, 0.12, 0, postHeight + 0.37, 1.55);
  }

  /** A light strip inlaid in the floor round the zone, in its accent, with corner brackets and a faint tint. */
  function floorMarking(group: THREE.Group, zone: Zone, accent: string, withTint: boolean, gain = 1) {
    const { width, depth } = zone.size;
    outline(group, neon(accent, 0.8 * gain), width, depth, 0.02, 0.06);
    cornerBrackets(group, neon(accent, gain), width, depth, 0.022);
    if (!withTint) return;
    const fill = new THREE.Mesh(UNIT_PLANE, tint(accent));
    fill.scale.set(width, depth, 1);
    fill.rotation.x = -Math.PI / 2;
    fill.position.y = 0.012;
    group.add(fill);
  }

  // Monitors. Each desk's screens share one small canvas, made the first time that desk has something to show.
  interface DeskScreen {
    accent: string;
    displays: THREE.Mesh[];
    content: ScreenContent | null;
    canvas?: HTMLCanvasElement;
    texture?: THREE.CanvasTexture;
    material?: THREE.MeshBasicMaterial;
  }
  const deskScreens = new Map<string, DeskScreen>();
  let cursorOn = true;
  function paintScreen(screen: DeskScreen) {
    if (!screen.content || !screen.canvas || !screen.texture) return;
    drawTerminal(screen.canvas.getContext('2d')!, screen.canvas.width, screen.canvas.height, screen.content, screen.accent, cursorOn);
    screen.texture.needsUpdate = true;
  }
  function setDeskScreen(deskId: string, content: ScreenContent | null) {
    const screen = deskScreens.get(deskId);
    if (!screen) return;
    const same = JSON.stringify(screen.content) === JSON.stringify(content);
    screen.content = content;
    if (!content) {
      for (const display of screen.displays) display.material = mat.screenOff;
      return;
    }
    if (!screen.material) {
      screen.canvas = document.createElement('canvas');
      screen.canvas.width = 288;
      screen.canvas.height = 160;
      screen.texture = new THREE.CanvasTexture(screen.canvas);
      screen.texture.colorSpace = THREE.SRGBColorSpace;
      screen.texture.anisotropy = 4;
      screen.material = new THREE.MeshBasicMaterial({ map: screen.texture });
    }
    for (const display of screen.displays) display.material = screen.material;
    if (!same) paintScreen(screen);
  }
  // The cursor on every lit screen blinks twice a second.
  let lastBlink = -1;
  tickers.push((time) => {
    const blink = Math.floor(time * 2);
    if (blink === lastBlink) return;
    lastBlink = blink;
    cursorOn = blink % 2 === 0;
    for (const screen of deskScreens.values()) paintScreen(screen);
  });
  redraws.push(() => {
    for (const screen of deskScreens.values()) paintScreen(screen);
  });

  // Every slat of every wall is one instance of the same box: a single draw call.
  const slatMatrices: THREE.Matrix4[] = [];

  /** A wooden slat wall along the zone's back (north) edge. */
  function slatWall(group: THREE.Group, zone: Zone) {
    const width = zone.size.width - 1.6;
    const z = -zone.size.depth / 2 + 0.22;
    box(group, mat.body, width, WALL_HEIGHT, 0.06, 0, WALL_HEIGHT / 2, z);
    box(group, mat.oak, width + 0.12, 0.06, 0.22, 0, WALL_HEIGHT + 0.03, z + 0.04);
    blockRect(zone.position.x, zone.position.z + z + 0.04, width, 0.24);

    const pitch = 0.26;
    const count = Math.floor(width / pitch);
    const start = -((count - 1) * pitch) / 2;
    const scale = new THREE.Vector3(0.13, WALL_HEIGHT - 0.06, 0.07);
    const rotation = new THREE.Quaternion();
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(zone.position.x + start + i * pitch, (WALL_HEIGHT - 0.06) / 2, zone.position.z + z + 0.065);
      slatMatrices.push(new THREE.Matrix4().compose(position, rotation, scale));
    }
  }

  // Plain, matt colours for small things on desks: one material per colour, shared by every desk.
  const paints = new Map<string, THREE.MeshStandardMaterial>();
  function paint(hex: string): THREE.MeshStandardMaterial {
    let material = paints.get(hex);
    if (!material) paints.set(hex, (material = new THREE.MeshStandardMaterial({ color: hex, roughness: 0.85, metalness: 0 })));
    return material;
  }

  /**
   * What is lying on a desk says whose desk it is: worksheets and swatches in Design, printed
   * code and manuals in Development, a camera and a microphone in Content, a calculator, phone
   * and headset in Sales, books and charts in Research. Everything is kept to the two ends of
   * the desk, clear of the middle, where its owner's arms (and, asleep, head) go.
   */
  function deskProps(group: THREE.Group, zone: Zone, desk: Desk, w: number, top: number) {
    // Laid out for a standard desk, and spread to suit a wider one. Mirrored on every other desk.
    let hash = 0;
    for (const char of desk.id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    const flip = hash % 2 === 0 ? 1 : -1;
    const spread = w / 2 / 1.4;
    const put = (hex: string, width: number, height: number, depth: number, x: number, z: number, turn = 0, lift = 0) => {
      const mesh = box(group, paint(hex), width, height, depth, x * spread * flip, top + lift + height / 2, z);
      mesh.rotation.y = turn * flip;
      return mesh;
    };
    const PAPER = '#dedbd2';
    const INK = '#30343c';
    const DARK = '#1c1c20';
    /** A sheet of paper with a few short lines on it, in the colours given. */
    const sheet = (x: number, z: number, turn: number, lines: string[], lift = 0) => {
      put(PAPER, 0.4, 0.008, 0.3, x, z, turn, lift);
      lines.forEach((hex, i) => {
        const length = 0.14 + ((hash >> (i + 1)) % 4) * 0.045;
        const dz = -0.1 + i * 0.045;
        // Kept on the sheet as it is turned.
        const cos = Math.cos(turn);
        const sin = Math.sin(turn);
        const dx = -0.15 + length / 2;
        put(hex, length, 0.004, 0.018, x + dx * cos + dz * sin, z - dx * sin + dz * cos, turn, lift + 0.008);
      });
    };

    // Everyone: a keyboard and a mouse.
    put(DARK, 0.5, 0.025, 0.17, 0, 0.1);
    put('#3a3a44', 0.46, 0.006, 0.13, 0, 0.1, 0, 0.025);
    put(DARK, 0.07, 0.03, 0.11, 0.37, 0.12);

    switch (zone.id) {
      case 'design': {
        // Two worksheets with blocks of colour, a fan of swatches, a drawing tablet and pen, a pot of pencils.
        sheet(-0.98, -0.2, -0.18, [PALETTE.pink, INK, INK]);
        put(PAPER, 0.4, 0.008, 0.3, -0.92, 0.2, 0.22, 0.004);
        [PALETTE.pink, PALETTE.violet, PALETTE.orange, '#2bd576'].forEach((hex, i) => put(hex, 0.075, 0.006, 0.075, -1.03 + (i % 2) * 0.11, 0.13 + Math.floor(i / 2) * 0.11, 0.22, 0.012));
        ['#ff2e88', '#ff6a3a', '#ffb08f', '#8f75ff', '#2bd576'].forEach((hex, i) => put(hex, 0.05, 0.008, 0.16, 0.7 + i * 0.045, -0.36, -0.25 + i * 0.12, i * 0.002));
        put(DARK, 0.42, 0.022, 0.3, 0.96, 0.14, -0.12);
        put('#3a3a44', 0.34, 0.004, 0.22, 0.96, 0.14, -0.12, 0.022);
        put(PAPER, 0.014, 0.014, 0.17, 1.24, 0.1, -0.3);
        put('#c2962a', 0.08, 0.11, 0.08, -0.66, -0.46);
        [PALETTE.pink, '#2c8a86', PAPER].forEach((hex, i) => put(hex, 0.014, 0.08, 0.014, -0.685 + i * 0.025, -0.46 + (i - 1) * 0.02, 0, 0.11));
        break;
      }
      case 'development': {
        // A stack of printed code, two thick manuals, a mug, a little board with a green light, sticky notes.
        put(PAPER, 0.4, 0.008, 0.3, -0.98, 0.02, 0.14);
        put(PAPER, 0.4, 0.008, 0.3, -0.95, 0.04, -0.08, 0.008);
        sheet(-0.96, 0.05, 0.05, [PALETTE.violet, INK, '#2bd576', INK, INK, PALETTE.violet], 0.016);
        put('#2f4f7d', 0.32, 0.06, 0.23, 0.98, -0.32, -0.1);
        put(PALETTE.violet, 0.29, 0.05, 0.21, 0.97, -0.31, 0.12, 0.06);
        put(PAPER, 0.085, 0.095, 0.085, 0.72, 0.3);
        put('#3a2416', 0.065, 0.004, 0.065, 0.72, 0.3, 0, 0.095);
        put(DARK, 0.17, 0.045, 0.12, 1.12, 0.22, 0.3);
        put('#2bd576', 0.025, 0.012, 0.025, 1.16, 0.2, 0.3, 0.045);
        put('#d8c23a', 0.08, 0.008, 0.08, -0.68, -0.4, 0.2);
        put('#ff8a5a', 0.08, 0.008, 0.08, -0.6, -0.33, -0.15, 0.002);
        break;
      }
      case 'content': {
        // A camera on a short tripod, a microphone, a clapperboard, a script.
        put(DARK, 0.03, 0.12, 0.03, -0.98, -0.26);
        put(DARK, 0.2, 0.13, 0.11, -0.98, -0.26, 0.3, 0.12);
        put('#3a3a44', 0.09, 0.09, 0.08, -0.955, -0.175, 0.3, 0.14);
        put('#ff3b5c', 0.02, 0.02, 0.02, -1.06, -0.3, 0.3, 0.25);
        put(DARK, 0.11, 0.02, 0.11, 0.82, -0.34);
        put('#6c7078', 0.02, 0.2, 0.02, 0.82, -0.34, 0, 0.02);
        put('#8e8e99', 0.06, 0.1, 0.06, 0.82, -0.34, 0, 0.22);
        put(DARK, 0.28, 0.014, 0.2, 1.0, 0.2, -0.3);
        [0, 1, 2, 3].forEach((i) => put(i % 2 ? DARK : PAPER, 0.07, 0.016, 0.05, 0.92 + i * 0.066, 0.1 - i * 0.02, -0.3, 0.004));
        sheet(-0.9, 0.24, 0.2, [PALETTE.orange, INK, INK, INK]);
        break;
      }
      case 'sales': {
        // A calculator, a phone, a headset for calls, a contract with a pen, a stack of business cards.
        put('#2a2a30', 0.17, 0.024, 0.23, -0.78, 0.2, 0.2);
        put('#9fd8b0', 0.13, 0.004, 0.045, -0.76, 0.115, 0.2, 0.024);
        [0, 1, 2].forEach((i) => put('#b9b6ae', 0.13, 0.008, 0.032, -0.79 + i * 0.011, 0.185 + i * 0.05, 0.2, 0.024));
        put(DARK, 0.085, 0.014, 0.17, -1.1, -0.08, -0.25);
        put('#2f78b0', 0.07, 0.003, 0.14, -1.1, -0.08, -0.25, 0.014);
        // The headset lies on its side: a band between two ear cups, and a boom for the microphone.
        put(DARK, 0.24, 0.025, 0.03, 0.92, 0.2, 0.35, 0.03);
        put(DARK, 0.07, 0.085, 0.085, 0.81, 0.24, 0.35);
        put(DARK, 0.07, 0.085, 0.085, 1.03, 0.16, 0.35);
        put(PALETTE.peach, 0.02, 0.07, 0.07, 0.85, 0.225, 0.35, 0.008);
        put(DARK, 0.012, 0.012, 0.13, 0.78, 0.31, 0.6, 0.03);
        sheet(-0.95, -0.36, -0.1, [PALETTE.peach, INK, INK]);
        put('#2f4f7d', 0.014, 0.014, 0.15, -0.72, -0.34, 0.5, 0.008);
        put(PAPER, 0.095, 0.022, 0.058, 0.74, -0.38, 0.1);
        break;
      }
      case 'research': {
        // Books, a printed chart, a magnifying glass, sticky notes.
        put('#2c8a86', 0.3, 0.055, 0.22, -0.98, -0.28, 0.1);
        put('#7a2f2a', 0.28, 0.05, 0.2, -0.97, -0.27, -0.12, 0.055);
        put('#c2962a', 0.24, 0.04, 0.18, -0.98, -0.28, 0.2, 0.105);
        put(PAPER, 0.4, 0.008, 0.3, 0.95, 0.08, -0.15);
        [0.06, 0.12, 0.09, 0.17].forEach((length, i) => put('#2bd576', 0.045, 0.004, length, 0.84 + i * 0.07, 0.15 - length / 2, -0.15, 0.008));
        put(DARK, 0.12, 0.014, 0.12, -0.8, 0.26, 0.4);
        put('#9fc4d8', 0.085, 0.004, 0.085, -0.8, 0.26, 0.4, 0.014);
        put(DARK, 0.022, 0.014, 0.14, -0.72, 0.36, 0.4);
        put('#d8c23a', 0.08, 0.008, 0.08, 0.7, -0.38, 0.2);
        put('#ff8a5a', 0.08, 0.008, 0.08, 0.79, -0.42, -0.1);
        break;
      }
      default: {
        // The executive desks and the coordinator's: a planner, a pen pot, and a board of sticky notes or a name plate.
        sheet(-0.95, 0.1, 0.12, [INK, INK, PALETTE.pink]);
        put(DARK, 0.08, 0.1, 0.08, -0.7, -0.42);
        put(PAPER, 0.014, 0.07, 0.014, -0.7, -0.42, 0, 0.1);
        if (desk.id === 'exec.ceo') {
          put(WOOD.slat, 0.34, 0.07, 0.06, 0.95, 0.42);
          put('#c2962a', 0.26, 0.035, 0.004, 0.95, 0.452, 0, 0.018);
        } else {
          put('#3a2a1e', 0.36, 0.012, 0.28, 0.95, 0.1, -0.15);
          ['#d8c23a', '#ff8a5a', '#2bd576', '#8f75ff', '#d8c23a', '#ff2e88'].forEach((hex, i) => put(hex, 0.07, 0.006, 0.07, 0.86 + (i % 3) * 0.1, 0.03 + Math.floor(i / 3) * 0.11, -0.15, 0.012));
        }
      }
    }
  }

  function buildDesk(zone: Zone, desk: Desk) {
    const accent = zone.accent ?? PALETTE.soft;
    const { width: w, depth: d, height: h } = deskDimensions(desk);
    const world = deskWorldPosition(zone, desk);
    const seat = seatWorldPosition(zone, desk);
    const rotation = desk.rotation ?? 0;

    const group = new THREE.Group();
    group.name = `desk:${desk.id}`;
    group.position.set(world.x, world.y, world.z);
    group.rotation.y = rotation;
    // Built to its plan dimensions, then enlarged about its own centre, chair and all.
    group.scale.setScalar(FURNITURE_SCALE);
    scene.add(group);

    // The desk's footprint, as an axis-aligned box round its (possibly turned) top.
    blockRect(
      world.x,
      world.z,
      (Math.abs(Math.cos(rotation)) * w + Math.abs(Math.sin(rotation)) * d) * FURNITURE_SCALE,
      (Math.abs(Math.sin(rotation)) * w + Math.abs(Math.cos(rotation)) * d) * FURNITURE_SCALE,
    );

    // Oak top, with the accent strip showing as a thin line of light all the way round its edge.
    box(group, mat.oak, w, 0.11, d, 0, h - 0.055, 0);
    box(group, neon(accent, desk.vacant ? 0.22 : 1), w + 0.04, 0.04, d + 0.04, 0, h - 0.13, 0);

    // Charcoal frame: two side panels and a modesty panel at the back.
    const legHeight = h - 0.15;
    box(group, mat.body, 0.16, legHeight, d - 0.16, -(w / 2 - 0.16), legHeight / 2, 0);
    box(group, mat.body, 0.16, legHeight, d - 0.16, w / 2 - 0.16, legHeight / 2, 0);
    box(group, mat.body, w - 0.32, legHeight * 0.62, 0.08, 0, legHeight * 0.69, -(d / 2 - 0.16));

    // Monitor(s). The executive desk gets two, angled in towards the seat.
    const screenOffsets = desk.size === 'executive' ? [-0.62, 0.62] : [0];
    for (const offset of screenOffsets) {
      const monitor = new THREE.Group();
      monitor.position.set(offset, h, -(d / 2 - 0.3));
      monitor.rotation.y = -offset * 0.3;
      group.add(monitor);
      box(monitor, mat.body, 0.36, 0.05, 0.24, 0, 0.025, 0);
      box(monitor, mat.body, 0.1, 0.3, 0.08, 0, 0.16, -0.03);
      box(monitor, mat.body, 1, 0.6, 0.09, 0, 0.56, -0.025);
      // Dark until the agent here has something in hand: see `setDeskScreen`.
      const display = new THREE.Mesh(UNIT_PLANE, mat.screenOff);
      if (!desk.vacant) (deskScreens.get(desk.id) ?? deskScreens.set(desk.id, { accent, displays: [], content: null }).get(desk.id)!).displays.push(display);
      display.userData.dynamic = true; // its material changes with what the agent is doing
      display.scale.set(0.9, 0.5, 1);
      display.position.set(0, 0.56, 0.021);
      monitor.add(display);
    }

    if (!desk.vacant) deskProps(group, zone, desk, w, h);

    // Chair.
    const chairZ = d / 2 + SEAT_GAP;
    box(group, mat.soft, 0.54, 0.12, 0.52, 0, 0.44, chairZ);
    box(group, mat.body, 0.14, 0.38, 0.14, 0, 0.19, chairZ);
    box(group, mat.body, 0.4, 0.05, 0.4, 0, 0.025, chairZ);
    box(group, mat.soft, 0.54, 0.54, 0.11, 0, 0.77, chairZ + 0.26);

    // Role label. Hidden in the overview, shown when the camera is close (see main.ts).
    const label = makeLabel(desk.role, desk.vacant ? 'desk-label is-vacant' : 'desk-label', accent);
    label.position.set(0, h + 1.2, 0);
    group.add(label);

    desks.set(desk.id, {
      deskId: desk.id,
      zoneId: zone.id,
      role: desk.role,
      accent,
      vacant: Boolean(desk.vacant),
      position: new THREE.Vector3(world.x, world.y, world.z),
      seat: new THREE.Vector3(seat.x, seat.y, seat.z),
      rotation,
      group,
      label,
    });
  }

  // Plants ------------------------------------------------------------------

  const trunkGeometry = new THREE.BoxGeometry(0.17, 1, 0.17);

  /** A stylised indoor tree or shrub in an oak planter. Deterministic per plant, so it never changes between loads. */
  function buildPlant(plant: Plant, index: number) {
    const scale = (plant.scale ?? 1) * FURNITURE_SCALE;
    const isTree = plant.kind === 'tree';
    const group = new THREE.Group();
    group.name = `plant:${plant.id}`;
    group.position.set(plant.position.x, 0, plant.position.z);
    scene.add(group);

    let seed = 101 + index * 37;
    const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    const potSize = (isTree ? 0.95 : 0.72) * scale;
    const potHeight = (isTree ? 0.6 : 0.46) * scale;
    box(group, mat.oak, potSize, potHeight, potSize, 0, potHeight / 2, 0);
    box(group, mat.soil, potSize - 0.12, 0.04, potSize - 0.12, 0, potHeight + 0.005, 0);
    blockRect(plant.position.x, plant.position.z, potSize, potSize);

    const crown = new THREE.Group();
    group.add(crown);
    let crownBase = potHeight;
    if (isTree) {
      const trunkHeight = (1.5 + random() * 0.5) * scale;
      const trunk = new THREE.Mesh(trunkGeometry, mat.trunk);
      trunk.scale.set(scale, trunkHeight, scale);
      trunk.position.y = potHeight + trunkHeight / 2;
      group.add(trunk);
      crownBase = potHeight + trunkHeight;
    }
    crown.position.y = crownBase;

    // The canopy is a stack of leaf blocks, widest at the bottom, each a slightly different green.
    const radius = (isTree ? 0.78 : 0.42) * scale;
    const layers: Array<[side: number, height: number, lift: number]> = isTree
      ? [[2.1, 0.8, 0.5], [1.5, 0.6, 1.2], [0.85, 0.5, 1.75]]
      : [[2, 1.1, 0.75], [1.2, 0.6, 1.6]];
    layers.forEach(([side, height, lift], i) => {
      const block = new THREE.Mesh(UNIT_BOX, mat.foliage[(i + Math.floor(random() * mat.foliage.length)) % mat.foliage.length]);
      block.scale.set(side * radius, height * radius, side * radius);
      // Upper blocks sit a little off centre, so no two trees are quite alike.
      const nudge = i === 0 ? 0 : radius * 0.18;
      block.position.set((random() - 0.5) * 2 * nudge, lift * radius, (random() - 0.5) * 2 * nudge);
      crown.add(block);
    });

    // The plants stand still: that lets every one of them be drawn together, in a handful of draw calls.
  }

  // Flower beds and other dividers --------------------------------------------

  const FLOWERS = ['#e8742a', '#e8c22e', '#c8362e', '#e86aa0', '#8a5cd0'];

  /**
   * A flower bed: an oak box, a low hedge of two greens, and flowers on it in drifts of one
   * colour that change every couple of metres. Four kinds, mixed: tulips on stems, low
   * blossom, tall spikes, and daisies with a dark eye. Decided by the bed's id, so every
   * load plants the same garden.
   */
  function buildPlanter(planter: Planter) {
    const group = new THREE.Group();
    group.name = `planter:${planter.id}`;
    group.position.set(planter.position.x, 0, planter.position.z);
    if (planter.along === 'z') group.rotation.y = Math.PI / 2;
    scene.add(group);
    const { width, height } = PLANTER;
    const { length } = planter;
    blockRect(planter.position.x, planter.position.z, planter.along === 'x' ? length : width, planter.along === 'x' ? width : length);

    let seed = 7;
    for (const char of planter.id) seed = (seed * 31 + char.charCodeAt(0)) % 2147483647;
    const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    box(group, mat.oak, length, height, width, 0, height / 2, 0);
    box(group, mat.slat, length + 0.06, 0.07, width + 0.06, 0, height - 0.035, 0);
    box(group, mat.soil, length - 0.1, 0.02, width - 0.12, 0, height + 0.005, 0);

    const step = 0.6;
    const count = Math.max(1, Math.round((length - 0.1) / step));
    const pitch = (length - 0.1) / count;
    let colour = FLOWERS[Math.floor(random() * FLOWERS.length)];
    let kind = Math.floor(random() * 4);
    for (let i = 0; i < count; i++) {
      // A new drift every three steps or so: another colour, another kind of flower.
      if (i % 3 === 0 && i > 0) {
        colour = FLOWERS[(FLOWERS.indexOf(colour) + 1 + Math.floor(random() * (FLOWERS.length - 1))) % FLOWERS.length];
        kind = (kind + 1 + Math.floor(random() * 3)) % 4;
      }
      const x = -length / 2 + 0.05 + (i + 0.5) * pitch;
      const hedge = 0.2 + random() * 0.14;
      box(group, mat.foliage[i % mat.foliage.length], pitch + 0.02, hedge, width - 0.1, x, height + hedge / 2, 0);
      const top = height + hedge;
      const bloom = (hex: string, w: number, h: number, d: number, dx: number, y: number, dz: number) => box(group, paint(hex), w, h, d, x + dx, y + h / 2, dz);
      if (kind === 0) {
        // Tulips: a cup of colour on a stem.
        for (let n = 0; n < 3; n++) {
          const dx = (n - 1) * 0.18 + (random() - 0.5) * 0.06;
          const dz = (random() - 0.5) * 0.24;
          const stem = 0.14 + random() * 0.12;
          bloom('#3f8a52', 0.03, stem, 0.03, dx, top, dz);
          bloom(colour, 0.11, 0.12, 0.11, dx, top + stem, dz);
        }
      } else if (kind === 1) {
        // Low blossom, scattered across the hedge.
        for (let n = 0; n < 5; n++) bloom(colour, 0.1, 0.06, 0.1, (random() - 0.5) * (pitch - 0.1), top, (random() - 0.5) * 0.3);
      } else if (kind === 2) {
        // Tall spikes.
        for (let n = 0; n < 4; n++) {
          const dx = (n - 1.5) * 0.13;
          const dz = (random() - 0.5) * 0.26;
          const tall = 0.24 + random() * 0.16;
          bloom('#3f8a52', 0.03, 0.08, 0.03, dx, top, dz);
          bloom(colour, 0.07, tall, 0.07, dx, top + 0.08, dz);
        }
      } else {
        // Daisies: a flat head with a dark eye, on a short stem.
        for (let n = 0; n < 2; n++) {
          const dx = (n - 0.5) * 0.26;
          const dz = (random() - 0.5) * 0.2;
          const stem = 0.12 + random() * 0.1;
          bloom('#3f8a52', 0.03, stem, 0.03, dx, top, dz);
          bloom(colour, 0.18, 0.05, 0.18, dx, top + stem, dz);
          bloom('#3a2416', 0.07, 0.03, 0.07, dx, top + stem + 0.05, dz);
        }
      }
    }
  }

  /** A bench to sit on in a passage: an oak seat on dark legs, with a small flower box at one end. */
  function buildBench(x: number, z: number, id: string) {
    const group = new THREE.Group();
    group.name = `bench:${id}`;
    group.position.set(x, 0, z);
    scene.add(group);
    box(group, mat.oak, 0.7, 0.1, 2.6, 0, 0.52, 0.2);
    box(group, mat.oak, 0.08, 0.5, 2.6, -0.34, 0.82, 0.2); // a low back
    for (const dz of [-0.8, 1.2]) box(group, mat.body, 0.6, 0.47, 0.1, 0, 0.235, dz);
    box(group, paint('#b5503c'), 0.5, 0.06, 0.9, 0.02, 0.6, 0.7); // a cushion
    blockRect(x, z + 0.2, 0.8, 2.7);
    buildPlanter({ id: `bench.${id}`, position: { x, z: z - 1.5 }, length: 0.8, along: 'x' });
  }

  /** Open shelving between the café and the lounge: books, boxes, and a few plants on top. Seen through, not a wall. */
  function buildShelving(x: number, z: number, length: number) {
    const group = new THREE.Group();
    group.name = 'shelving:lounge';
    group.position.set(x, 0, z);
    scene.add(group);
    const depth = 0.44;
    const shelves = [0.06, 0.52, 0.98, 1.44];
    for (const y of shelves) box(group, mat.oak, depth, 0.05, length, 0, y, 0);
    for (let i = 0; i <= 4; i++) box(group, mat.oak, depth, 1.44, 0.05, 0, 0.74, -length / 2 + (i * length) / 4);
    blockRect(x, z, depth + 0.1, length);
    let seed = 99;
    const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const spines = ['#2f4f7d', '#b5503c', '#c2962a', '#2c8a86', '#dedbd2', '#5a3a22', '#8a5cd0', '#30343c'];
    for (let bay = 0; bay < 4; bay++) {
      const from = -length / 2 + (bay * length) / 4 + 0.08;
      const bayLength = length / 4 - 0.16;
      for (let level = 0; level < 3; level++) {
        const y = shelves[level] + 0.025;
        const what = (bay * 2 + level * 3) % 5;
        if (what === 4) continue; // some left empty, so the lounge shows through
        if (what < 3) {
          // A run of books standing, leaning on a few lying flat.
          let at = from;
          while (at < from + bayLength - 0.3) {
            const thick = 0.05 + random() * 0.05;
            const tall = 0.26 + random() * 0.1;
            box(group, paint(spines[Math.floor(random() * spines.length)]), depth - 0.14, tall, thick, 0, y + tall / 2, at + thick / 2);
            at += thick + 0.004;
          }
        } else {
          box(group, paint('#b9b6ae'), depth - 0.1, 0.24, 0.4, 0, y + 0.12, from + 0.25);
          box(group, paint('#5a3a22'), depth - 0.12, 0.18, 0.3, 0, y + 0.09, from + bayLength - 0.2);
        }
      }
    }
    // Along the top: three small pots.
    for (const dz of [-length / 2 + 0.5, 0.1, length / 2 - 0.6]) {
      box(group, paint('#dedbd2'), 0.24, 0.2, 0.24, 0, 1.565, dz);
      box(group, mat.foliage[1], 0.36, 0.26, 0.36, 0, 1.79, dz);
      box(group, mat.foliage[0], 0.22, 0.16, 0.22, 0.02, 1.98, dz + 0.02);
    }
  }

  // Drawing things together ---------------------------------------------------

  /**
   * Replace the still meshes under `roots` with one mesh per material, placed in `into`.
   *
   * The office is built from over a thousand small boxes, each of which would be its own
   * draw call. Nearly all of them never move, so once built they are merged. Anything marked
   * `userData.dynamic` (and everything under it) is left alone: banners' cloth, the company
   * core, the mission board, monitor screens. So is anything invisible, which is there to be
   * clicked, not drawn.
   */
  function bake(roots: readonly THREE.Object3D[], into: THREE.Object3D, name: string) {
    into.updateWorldMatrix(true, false);
    const toLocal = new THREE.Matrix4().copy(into.matrixWorld).invert();
    const groups = new Map<string, { material: THREE.Material; renderOrder: number; parts: THREE.BufferGeometry[]; meshes: THREE.Mesh[] }>();
    const visit = (object: THREE.Object3D) => {
      if (object.userData.dynamic || !object.visible) return;
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh && !(mesh as unknown as THREE.InstancedMesh).isInstancedMesh && !Array.isArray(mesh.material) && mesh.material.visible) {
        const attributes = Object.keys(mesh.geometry.attributes).sort().join(',');
        const key = `${mesh.material.uuid}:${mesh.renderOrder}:${attributes}`;
        let group = groups.get(key);
        if (!group) groups.set(key, (group = { material: mesh.material, renderOrder: mesh.renderOrder, parts: [], meshes: [] }));
        mesh.updateWorldMatrix(true, false);
        const part = (mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone()).applyMatrix4(new THREE.Matrix4().multiplyMatrices(toLocal, mesh.matrixWorld));
        group.parts.push(part);
        group.meshes.push(mesh);
      }
      for (const child of [...object.children]) visit(child);
    };
    for (const root of roots) for (const child of [...root.children]) visit(child);
    let index = 0;
    for (const group of groups.values()) {
      if (group.meshes.length < 2) {
        for (const part of group.parts) part.dispose();
        continue;
      }
      const merged = mergeGeometries(group.parts, false);
      for (const part of group.parts) part.dispose();
      if (!merged) continue;
      const mesh = new THREE.Mesh(merged, group.material);
      mesh.name = `${name}:${index++}`;
      mesh.renderOrder = group.renderOrder;
      into.add(mesh);
      // The originals go, but any children they carried (a label, a moving part) stay where they were.
      for (const original of group.meshes) {
        const parent = original.parent;
        if (!parent) continue;
        for (const child of [...original.children]) {
          const world = child.matrixWorld.clone();
          parent.add(child);
          parent.updateWorldMatrix(true, false);
          world.premultiply(new THREE.Matrix4().copy(parent.matrixWorld).invert()).decompose(child.position, child.quaternion, child.scale);
        }
        parent.remove(original);
      }
    }
  }

  // Walls ---------------------------------------------------------------------

  /**
   * Solid walls on the left, the back and the right; glass in oak frames along the front.
   *
   * A solid wall between the camera and the room would hide the room, so each one has a low
   * part that is always there and a tall part (piers, windows, cap) that sinks out of the way
   * while the camera is on its outer side, and rises again when the camera comes round.
   */
  const cutaways: Array<{ tall: THREE.Group; normal: THREE.Vector3; at: THREE.Vector3; shown: number }> = [];
  function buildWalls() {
    const { thickness, height, sill } = WALLS;
    const halfWidth = FLOOR.width / 2;
    const halfDepth = FLOOR.depth / 2;
    const frontZ = halfDepth - 0.8; // the line the entrance stands on

    /** One solid wall, built along its own x axis and then turned into place. */
    const solid = (name: string, length: number, x: number, z: number, turn: number, normal: THREE.Vector3) => {
      const group = new THREE.Group();
      group.name = `wall:${name}`;
      group.position.set(x, 0, z);
      group.rotation.y = turn;
      scene.add(group);
      // Always there: a plaster base with an oak skirting on the inside (local +z is the room side).
      box(group, mat.plaster, length, sill, thickness, 0, sill / 2, 0);
      box(group, mat.oak, length, 0.14, 0.06, 0, 0.07, thickness / 2 + 0.03);
      box(group, mat.oak, length, 0.06, thickness + 0.08, 0, sill + 0.03, 0);

      const tall = new THREE.Group();
      tall.position.y = sill + 0.06;
      tall.userData.dynamic = true;
      group.add(tall);
      const rise = height - sill - 0.06;
      // Piers with windows between them, a band of plaster over the windows, and an oak cap.
      const bays = Math.max(1, Math.round(length / 6));
      const bay = length / bays;
      const pier = 1.5;
      const band = 0.7;
      box(tall, mat.plaster, length, band, thickness, 0, rise - band / 2, 0);
      box(tall, mat.oak, length + 0.1, 0.12, thickness + 0.14, 0, rise + 0.06, 0);
      for (let i = 0; i <= bays; i++) {
        const px = -length / 2 + i * bay;
        const width = i === 0 || i === bays ? pier / 2 : pier;
        box(tall, mat.plaster, width, rise - band, thickness, px + (i === 0 ? width / 2 : i === bays ? -width / 2 : 0), (rise - band) / 2, 0);
      }
      for (let i = 0; i < bays; i++) {
        const cx = -length / 2 + (i + 0.5) * bay;
        const open = bay - pier;
        box(tall, mat.glass, open, rise - band, 0.05, cx, (rise - band) / 2, 0).renderOrder = 2;
        box(tall, mat.oak, 0.08, rise - band, 0.1, cx, (rise - band) / 2, 0); // a mullion
      }
      bake([tall], tall, `wall:${name}`);
      cutaways.push({ tall, normal, at: new THREE.Vector3(x, 0, z), shown: 1 });
    };

    const inset = thickness / 2;
    solid('back', FLOOR.width, 0, -halfDepth + inset, 0, new THREE.Vector3(0, 0, -1));
    solid('left', frontZ + halfDepth - thickness, -halfWidth + inset, (frontZ - halfDepth + thickness) / 2, Math.PI / 2, new THREE.Vector3(-1, 0, 0));
    solid('right', frontZ + halfDepth - thickness, halfWidth - inset, (frontZ - halfDepth + thickness) / 2, -Math.PI / 2, new THREE.Vector3(1, 0, 0));
    blockRect(0, -halfDepth + inset, FLOOR.width, thickness);
    blockRect(-halfWidth + inset, 0, thickness, FLOOR.depth);
    blockRect(halfWidth - inset, 0, thickness, FLOOR.depth);

    // The front: the entrance's glass and oak frame, carried on to both side walls.
    const group = new THREE.Group();
    group.name = 'wall:front';
    group.position.set(0, 0, frontZ);
    scene.add(group);
    const from = 9.14; // where the entrance's own glass ends
    const to = halfWidth - thickness;
    const panels = 4;
    const panel = (to - from) / panels;
    for (const side of [-1, 1]) {
      const middle = side * (from + to) / 2;
      box(group, mat.glass, to - from, 2.9, 0.05, middle, 1.45, 0).renderOrder = 2;
      box(group, mat.oak, to - from, 0.12, 0.18, middle, 2.96, 0);
      box(group, mat.oak, to - from, 0.1, 0.18, middle, 0.05, 0);
      for (let i = 1; i <= panels; i++) box(group, mat.oak, 0.18, 3.02, 0.18, side * (from + i * panel), 1.51, 0);
      blockRect(middle, frontZ, to - from, 0.3);
    }
  }

  // Zones -------------------------------------------------------------------

  let redrawBoard: () => void = () => {};

  function buildDepartment(zone: Zone) {
    const accent = zone.accent ?? PALETTE.soft;
    const group = zoneGroup(zone);
    floorMarking(group, zone, accent, true);
    slatWall(group, zone);
    zone.desks.forEach((desk) => buildDesk(zone, desk));
    spotlight(accent, zone.position.x, zone.position.z, 150);
    zoneBanner(zone);
  }

  function buildExecutive(zone: Zone) {
    const elevation = zone.elevation ?? 0;
    const { width, depth } = zone.size;
    const group = zoneGroup(zone);

    // Raised oak deck, with one step at the front.
    box(group, mat.deck, width, elevation, depth, 0, elevation / 2, 0);
    const stepWidth = 2.6;
    box(group, mat.deck, stepWidth, elevation / 2, 0.7, 0, elevation / 4, depth / 2 + 0.35);

    // Agents can only get on and off the deck by the step: its other edges are a drop.
    const { x: zx, z: zz } = zone.position;
    raised.push({ minX: zx - width / 2, maxX: zx + width / 2, minZ: zz - depth / 2, maxZ: zz + depth / 2, height: elevation });
    raised.push({ minX: zx - stepWidth / 2, maxX: zx + stepWidth / 2, minZ: zz + depth / 2, maxZ: zz + depth / 2 + 0.7, height: elevation / 2 });
    const edge = 0.3;
    blockRect(zx, zz - depth / 2, width, edge);
    blockRect(zx - width / 2, zz, edge, depth);
    blockRect(zx + width / 2, zz, edge, depth);
    const frontRun = (width - stepWidth) / 2;
    blockRect(zx - (stepWidth + frontRun) / 2, zz + depth / 2, frontRun, edge);
    blockRect(zx + (stepWidth + frontRun) / 2, zz + depth / 2, frontRun, edge);

    // The brand's spark gradient runs round the deck as a single line of light:
    // orange on the left, through pink, to violet on the right.
    const trimGeometry = new THREE.BoxGeometry(1, 1, 1, 48, 1, 1);
    const positions = trimGeometry.getAttribute('position');
    const colors = new Float32Array(positions.count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < positions.count; i++) {
      sparkColor(positions.getX(i) + 0.5, color);
      const boosted = neonColor(`#${color.getHexString()}`);
      colors.set([boosted.r, boosted.g, boosted.b], i * 3);
    }
    trimGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const trim = new THREE.Mesh(trimGeometry, new THREE.MeshBasicMaterial({ vertexColors: true }));
    trim.scale.set(width + 0.06, 0.045, depth + 0.06);
    trim.position.y = elevation - 0.06;
    group.add(trim);

    // The company core: a slow wireframe hologram behind the two desks, in the three spark colours.
    const coreX = 0.1;
    const coreZ = -2.2;
    const pedestal = new THREE.Group();
    pedestal.position.set(coreX, elevation, coreZ);
    box(pedestal, mat.body, 1.3, 0.14, 1.3, 0, 0.07, 0);
    box(pedestal, mat.body, 1, 0.1, 1, 0, 0.19, 0);
    const ring = new THREE.Group();
    ring.position.set(coreX, elevation + 0.245, coreZ);
    outline(ring, neon(PALETTE.pink), 0.8, 0.8, 0, 0.05);
    // Two cube frames, one inside the other, turning against each other.
    const frame = (side: number, hex: string, gain: number) =>
      new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(side, side, side)), new THREE.LineBasicMaterial({ color: neonColor(hex, gain), transparent: true, opacity: 0.9 }));
    const core = frame(0.95, PALETTE.lightViolet, 0.6);
    const inner = frame(0.56, PALETTE.pink, 0.6);
    core.add(inner);
    const heart = new THREE.Mesh(UNIT_BOX, neon(PALETTE.orange, 1.1));
    heart.scale.setScalar(0.2);
    const coreHeight = elevation + 1.75;
    core.position.set(coreX, coreHeight, coreZ);
    heart.position.set(coreX, coreHeight, coreZ);
    for (const moving of [core, heart]) moving.userData.dynamic = true;
    group.add(pedestal, ring, core, heart);
    // An invisible ball round it, to click: the wireframe itself is too thin to hit.
    const pick = new THREE.Mesh(new THREE.SphereGeometry(0.95, 12, 8), new THREE.MeshBasicMaterial({ visible: false }));
    pick.position.set(coreX, coreHeight, coreZ);
    group.add(pick);
    companyCore = { position: new THREE.Vector3(zx + coreX, elevation + 0.3, zz + coreZ), pick };
    blockCircle(zx + coreX, zz + coreZ, 0.66);
    tickers.push((time) => {
      const bob = Math.sin(time * 0.9) * 0.06;
      core.position.y = coreHeight + bob;
      heart.position.y = coreHeight + bob;
      core.rotation.set(Math.sin(time * 0.23) * 0.3, time * 0.35, 0);
      inner.rotation.set(time * 0.5, -time * 0.8, 0);
      heart.rotation.set(time * 0.4, -time * 0.6, 0);
    });

    zone.desks.forEach((desk) => buildDesk(zone, desk));
    spotlight(null, zone.position.x, zone.position.z, 165, 13);
    zoneBanner(zone);
  }

  function buildCoordinator(zone: Zone) {
    const accent = zone.accent ?? PALETTE.white;
    const group = zoneGroup(zone);
    floorMarking(group, zone, accent, false, 0.72);
    zone.desks.forEach((desk) => buildDesk(zone, desk));

    // Floating hologram task board, facing the desk (and the default camera).
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const g = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    const draw = () => {
      drawMissionBoard(g, canvas.width, canvas.height, missionCards);
      texture.needsUpdate = true;
    };
    draw();
    redraws.push(draw);
    redrawBoard = draw;

    const boardMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      color: new THREE.Color(1.7, 1.7, 1.7),
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const board = new THREE.Mesh(UNIT_PLANE, boardMaterial);
    const boardZ = -1.5;
    const boardHeight = 2.75;
    board.scale.set(4.4, 2.2, 1);
    board.position.set(0, boardHeight, boardZ);
    board.renderOrder = 4;
    board.userData.dynamic = true;
    group.add(board);

    // Smoked glass behind the light, so the board stays readable over a bright floor.
    const backing = new THREE.Mesh(
      UNIT_PLANE,
      new THREE.MeshBasicMaterial({ color: PALETTE.void, transparent: true, opacity: 0.62, depthWrite: false, side: THREE.DoubleSide }),
    );
    backing.scale.copy(board.scale);
    backing.renderOrder = 3;
    board.add(backing);
    backing.scale.set(1, 1, 1);
    backing.position.z = -0.004;
    box(group, neon(PALETTE.pink), 4.4, 0.04, 0.1, 0, 0.03, boardZ); // emitter bar on the floor
    blockRect(zone.position.x, zone.position.z + boardZ, 4.4, 0.2);

    tickers.push((time) => {
      board.position.y = boardHeight + Math.sin(time * 0.8) * 0.04;
      // An occasional, brief dip in brightness: a hologram flicker.
      const flicker = Math.sin(time * 1.7) + Math.sin(time * 4.3 + 1);
      boardMaterial.opacity = flicker > 1.88 ? 0.7 : 0.92;
    });

    zoneBanner(zone);
  }

  function buildMeetingRoom(zone: Zone) {
    const edgeColor = zone.accent ?? PALETTE.soft;
    const { width, depth } = zone.size;
    const height = 3;
    const group = zoneGroup(zone);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.07,
      roughness: 0.08,
      metalness: 0,
      clearcoat: 1,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const pane = (w: number, h: number, d: number, x: number, y: number, z: number) => {
      box(group, glassMaterial, w, h, d, x, y, z).renderOrder = 2;
    };
    const { x: zx, z: zz } = zone.position;
    const wall = 0.2;

    // Three full glass walls and a roof...
    pane(width, height, 0.02, 0, height / 2, -depth / 2);
    pane(width, height, 0.02, 0, height / 2, depth / 2);
    pane(0.02, height, depth, -width / 2, height / 2, 0);
    pane(width, 0.02, depth, 0, height, 0);
    blockRect(zx, zz - depth / 2, width, wall);
    blockRect(zx, zz + depth / 2, width, wall);
    blockRect(zx - width / 2, zz, wall, depth);

    // ...and the east wall, with a doorway in the middle facing the rest of the office.
    const doorWidth = zone.door?.width ?? 0;
    const doorHeight = 2.2;
    const sideRun = (depth - doorWidth) / 2;
    for (const side of [-1, 1]) {
      const centre = side * (doorWidth / 2 + sideRun / 2);
      pane(0.02, height, sideRun, width / 2, height / 2, centre);
      blockRect(zx + width / 2, zz + centre, wall, sideRun);
    }
    if (doorWidth > 0) pane(0.02, height - doorHeight, doorWidth, width / 2, doorHeight + (height - doorHeight) / 2, 0);

    // Soft white edges: floor, ceiling, four posts and the door frame.
    const edge = neon(edgeColor, 0.6);
    outline(group, edge, width, depth, 0.02, 0.06);
    outline(group, edge, width, depth, height, 0.05);
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        box(group, edge, 0.05, height, 0.05, (sx * width) / 2, height / 2, (sz * depth) / 2);
      }
    }
    if (doorWidth > 0) {
      box(group, edge, 0.05, doorHeight, 0.05, width / 2, doorHeight / 2, -doorWidth / 2);
      box(group, edge, 0.05, doorHeight, 0.05, width / 2, doorHeight / 2, doorWidth / 2);
      box(group, edge, 0.05, 0.05, doorWidth, width / 2, doorHeight, 0);
    }

    // Oak table with a line of light under its edge.
    // (A cross of two slabs: the nearest thing to a round table that can be built from blocks.)
    box(group, mat.oak, 3.4, 0.12, 2.2, 0, 0.72, 0);
    box(group, mat.oak, 2.2, 0.12, 3.4, 0, 0.72, 0);
    box(group, edge, 3.44, 0.03, 2.24, 0, 0.65, 0);
    box(group, edge, 2.24, 0.03, 3.44, 0, 0.65, 0);
    box(group, mat.body, 0.9, 0.66, 0.9, 0, 0.33, 0);
    blockCircle(zx, zz, 1.7);

    for (const spot of zone.spots ?? []) {
      // Each stool is a cube, turned to face the table.
      const stool = box(group, mat.soft, 0.5, 0.46, 0.5, spot.position.x, 0.23, spot.position.z);
      stool.rotation.y = Math.atan2(spot.position.x, spot.position.z);
    }

    spotlight(null, zone.position.x, zone.position.z, 110);
    zoneBanner(zone);
  }

  function buildLounge(zone: Zone) {
    const { width, depth } = zone.size;
    const group = zoneGroup(zone);
    outline(group, mat.dimLine, width, depth, 0.02, 0.06);

    // L-shaped sofa, an oak coffee table and two ottomans. No accent colour here by design.
    box(group, mat.soft, 6.6, 0.42, 1.25, -0.4, 0.21, -1.6);
    box(group, mat.soft, 6.6, 0.85, 0.3, -0.4, 0.425, -2.35);
    box(group, mat.soft, 1.25, 0.42, 3.0, 3.3, 0.21, 0.6);
    box(group, mat.soft, 0.3, 0.85, 3.0, 4.05, 0.425, 0.6);
    box(group, mat.body, 1.8, 0.3, 0.8, -0.4, 0.15, 0.5);
    box(group, mat.oak, 2.2, 0.06, 1.2, -0.4, 0.33, 0.5);
    box(group, mat.soft, 0.9, 0.4, 0.9, -3.2, 0.2, 1.5);
    box(group, mat.soft, 0.9, 0.4, 0.9, -1.1, 0.2, 2.3);
    const { x: zx, z: zz } = zone.position;
    blockRect(zx - 0.4, zz - 1.75, 6.6, 1.55); // long sofa and its back
    blockRect(zx + 3.45, zz + 0.6, 1.55, 3.0); // side sofa and its back
    blockRect(zx - 0.4, zz + 0.5, 2.2, 1.2); // coffee table
    blockRect(zx - 4.7, zz - 2.4, 0.3, 0.3); // lamp

    // A television facing the long sofa, on a low oak cabinet with a games console; two controllers on the table.
    const tvZ = 3.05;
    box(group, mat.oak, 2.8, 0.42, 0.5, -0.4, 0.21, tvZ);
    box(group, mat.body, 2.84, 0.06, 0.54, -0.4, 0.45, tvZ);
    box(group, mat.body, 0.5, 0.1, 0.3, -0.4, 0.53, tvZ);
    box(group, mat.body, 2.3, 1.32, 0.1, -0.4, 1.24, tvZ);
    blockRect(zx - 0.4, zz + tvZ, 2.9, 0.6);
    const game = document.createElement('canvas');
    game.width = 96;
    game.height = 54;
    const gameTexture = new THREE.CanvasTexture(game);
    gameTexture.colorSpace = THREE.SRGBColorSpace;
    gameTexture.magFilter = THREE.NearestFilter; // big square pixels
    const tvScreen = new THREE.Mesh(UNIT_PLANE, new THREE.MeshBasicMaterial({ map: gameTexture }));
    tvScreen.scale.set(2.16, 1.2, 1);
    tvScreen.position.set(-0.4, 1.24, tvZ - 0.052);
    tvScreen.rotation.y = Math.PI; // facing the sofa
    tvScreen.userData.dynamic = true;
    group.add(tvScreen);
    let lastFrame = -1;
    tickers.push((time) => {
      const frame = Math.floor(time * 8);
      if (frame === lastFrame) return;
      lastFrame = frame;
      drawGame(game.getContext('2d')!, game.width, game.height, frame);
      gameTexture.needsUpdate = true;
    });
    // The console, with a light on it, and a controller for each player.
    box(group, mat.screenOff, 0.42, 0.08, 0.3, 0.5, 0.52, tvZ);
    box(group, neon(PALETTE.green, 0.9), 0.05, 0.02, 0.02, 0.36, 0.53, tvZ - 0.155);
    for (const [x, hex] of [[-0.85, '#f4f4f6'], [0.05, '#26262b']] as const) {
      const pad = new THREE.Group();
      pad.position.set(x, 0.385, 0.42);
      pad.rotation.y = x < -0.4 ? 0.3 : -0.25;
      box(pad, new THREE.MeshStandardMaterial({ color: hex, roughness: 0.6 }), 0.3, 0.05, 0.16, 0, 0, 0);
      box(pad, new THREE.MeshStandardMaterial({ color: hex, roughness: 0.6 }), 0.07, 0.05, 0.1, -0.12, -0.005, 0.1);
      box(pad, new THREE.MeshStandardMaterial({ color: hex, roughness: 0.6 }), 0.07, 0.05, 0.1, 0.12, -0.005, 0.1);
      box(pad, mat.screenOff, 0.05, 0.02, 0.05, -0.08, 0.03, -0.01);
      box(pad, new THREE.MeshBasicMaterial({ color: PALETTE.pink }), 0.03, 0.02, 0.03, 0.07, 0.03, 0.01);
      box(pad, new THREE.MeshBasicMaterial({ color: PALETTE.lightViolet }), 0.03, 0.02, 0.03, 0.11, 0.03, -0.03);
      group.add(pad);
    }

    // One low lamp with a warm peach glow.
    box(group, mat.body, 0.06, 1.5, 0.06, -4.7, 0.75, -2.4);
    box(group, neon(PALETTE.peach, 0.75), 0.26, 0.3, 0.26, -4.7, 1.65, -2.4);

    spotlight(PALETTE.peach, zone.position.x, zone.position.z, 80);
    zoneBanner(zone);
  }

  /**
   * The café corner: a back bar with shelves (coffee things on the left, bottles on the right,
   * a small fridge at the end), a counter with low stools in front of it, and beyond the
   * stools a table-tennis table.
   */
  let pongPlaying = false;
  function buildCafe(zone: Zone) {
    const { width, depth } = zone.size;
    const { x: zx, z: zz } = zone.position;
    const group = zoneGroup(zone);
    outline(group, mat.dimLine, width, depth, 0.02, 0.06);
    const item = (hex: string, w: number, h: number, d: number, x: number, y: number, z: number) => box(group, paint(hex), w, h, d, x, y + h / 2, z);
    const STEEL = '#8e8e99';
    const CREAM = '#dedbd2';

    // The back bar: a cabinet, an oak top, a slatted back with two shelves, and a line of warm light under each.
    const backZ = -3.7;
    box(group, mat.body, 6.6, 1, 0.62, -0.3, 0.5, backZ);
    box(group, mat.oak, 6.7, 0.06, 0.7, -0.3, 1.03, backZ);
    box(group, mat.slat, 6.6, 1.55, 0.08, -0.3, 1.83, backZ - 0.3);
    for (const y of [1.62, 2.18]) {
      box(group, mat.oak, 6.5, 0.05, 0.34, -0.3, y, backZ - 0.1);
      box(group, neon(PALETTE.peach, 0.8), 6.3, 0.025, 0.03, -0.3, y - 0.04, backZ + 0.05);
    }
    box(group, mat.oak, 6.8, 0.1, 0.42, -0.3, 2.66, backZ - 0.12);
    blockRect(zx - 0.3, zz + backZ - 0.05, 6.8, 0.9);
    // Bottles on the right half of both shelves, each with a neck.
    const bottles = ['#b5742a', '#2f6e4a', '#c9d6dc', '#8a2f2a', '#2f4f7d', '#c2962a', '#3a2416', '#b9b6ae'];
    for (const [row, y] of [1.645, 2.205].entries()) {
      for (let i = 0; i < 9; i++) {
        const hex = bottles[(i * 3 + row * 5) % bottles.length];
        const tall = 0.24 + ((i + row) % 3) * 0.05;
        const x = 0.25 + i * 0.3;
        item(hex, 0.1, tall, 0.1, x, y, backZ - 0.1);
        item(hex, 0.045, 0.09, 0.045, x, y + tall, backZ - 0.1);
      }
    }
    // Coffee things on the left: stacked cups, jars of beans, a row of syrup bottles.
    for (let i = 0; i < 5; i++) {
      item(CREAM, 0.11, 0.09, 0.11, -3.2 + i * 0.2, 1.645, backZ - 0.1);
      if (i % 2 === 0) item(CREAM, 0.11, 0.09, 0.11, -3.2 + i * 0.2, 1.745, backZ - 0.1);
    }
    for (let i = 0; i < 4; i++) {
      item('#5a3a22', 0.16, 0.22, 0.16, -1.9 + i * 0.3, 1.645, backZ - 0.1);
      item(STEEL, 0.17, 0.03, 0.17, -1.9 + i * 0.3, 1.865, backZ - 0.1);
    }
    for (let i = 0; i < 6; i++) item(['#c2962a', '#8a2f2a', '#3a2416'][i % 3], 0.08, 0.26, 0.08, -3.2 + i * 0.24, 2.205, backZ - 0.1);
    for (let i = 0; i < 4; i++) item(CREAM, 0.2, 0.2, 0.02, -1.5 + i * 0.3, 2.205, backZ - 0.2); // plates on edge

    // The espresso machine, on the back bar: a steel body, two group heads over a drip tray, cups warming on top.
    item(STEEL, 0.95, 0.5, 0.5, -2.5, 1.06, backZ);
    item('#1c1c20', 0.99, 0.08, 0.54, -2.5, 1.56, backZ);
    item('#1c1c20', 0.8, 0.04, 0.2, -2.5, 1.06, backZ + 0.32);
    for (const dx of [-0.22, 0.22]) {
      item('#1c1c20', 0.12, 0.1, 0.12, -2.5 + dx, 1.36, backZ + 0.3);
      item('#3a2416', 0.03, 0.05, 0.2, -2.5 + dx, 1.3, backZ + 0.42);
    }
    for (let i = 0; i < 4; i++) item(CREAM, 0.1, 0.08, 0.1, -2.8 + i * 0.2, 1.64, backZ);
    item('#1c1c20', 0.24, 0.42, 0.26, -1.55, 1.06, backZ); // the grinder
    item('#5a3a22', 0.18, 0.16, 0.18, -1.55, 1.48, backZ);
    // The fridge at the far end: dark, with a lit glass door and rows of cans.
    item('#1c1c20', 0.95, 1.95, 0.7, 3.6, 0, backZ);
    box(group, neon('#cfe6ff', 0.5), 0.75, 1.5, 0.02, 3.6, 1.05, backZ + 0.36);
    for (let row = 0; row < 4; row++) for (let i = 0; i < 5; i++) item(['#b5432e', '#2c8a86', '#c2962a'][(row + i) % 3], 0.09, 0.15, 0.03, 3.33 + i * 0.135, 0.42 + row * 0.36, backZ + 0.375);
    blockRect(zx + 3.6, zz + backZ, 1, 0.8);

    // The counter: a dark base with a slatted front, an oak top, a line of light at its foot, and things left on it.
    const counterZ = -2;
    box(group, mat.body, 6.6, 0.96, 0.7, 0, 0.48, counterZ);
    box(group, mat.slat, 6.6, 0.8, 0.04, 0, 0.5, counterZ + 0.37);
    box(group, mat.oak, 6.9, 0.08, 0.9, 0, 1, counterZ);
    box(group, neon(PALETTE.peach, 0.9), 6.4, 0.03, 0.04, 0, 0.05, counterZ + 0.4);
    blockRect(zx, zz + counterZ, 6.9, 0.95);
    for (const [x, hex] of [[-2.4, '#3a2416'], [-1.1, '#3a2416'], [1.3, '#c2962a']] as const) {
      item(CREAM, 0.2, 0.02, 0.2, x, 1.04, counterZ + 0.12);
      item(CREAM, 0.1, 0.09, 0.1, x, 1.06, counterZ + 0.12);
      item(hex, 0.07, 0.01, 0.07, x, 1.15, counterZ + 0.12);
    }
    item(STEEL, 0.1, 0.26, 0.1, 2.5, 1.04, counterZ - 0.1); // a shaker
    item(STEEL, 0.07, 0.07, 0.07, 2.5, 1.3, counterZ - 0.1);
    for (const x of [0.3, 0.5, 2.9]) item('#c9d6dc', 0.08, 0.14, 0.08, x, 1.04, counterZ - 0.12); // glasses
    item('#1c1c20', 0.5, 0.03, 0.3, -0.2, 1.04, counterZ - 0.1); // a tray
    // Three lamps hanging over it.
    for (const x of [-2.2, 0, 2.2]) {
      box(group, mat.body, 0.02, 1.1, 0.02, x, 3.15, counterZ);
      box(group, mat.body, 0.3, 0.16, 0.3, x, 2.56, counterZ);
      box(group, neon(PALETTE.peach, 1), 0.2, 0.04, 0.2, x, 2.46, counterZ);
    }

    // Low stools along the counter: where the café's seats are (layout.ts).
    for (const spot of zone.spots ?? []) {
      if (!spot.id.includes('stool')) continue;
      const { x, z } = spot.position;
      box(group, mat.body, 0.4, 0.04, 0.4, x, 0.02, z);
      box(group, mat.body, 0.1, 0.48, 0.1, x, 0.26, z);
      box(group, mat.soft, 0.5, 0.1, 0.5, x, 0.53, z);
    }

    // Table tennis: a blue top with white lines, a net, four legs, and a bat left at each end.
    const table = PONG_TABLE;
    const top = table.height;
    box(group, paint('#1f5f8a'), table.length, 0.06, table.width, table.x, top - 0.03, table.z);
    for (const dz of [-1, 1]) item(CREAM, table.length, 0.004, 0.035, table.x, top, table.z + dz * (table.width / 2 - 0.02));
    for (const dx of [-1, 1]) item(CREAM, 0.035, 0.004, table.width, table.x + dx * (table.length / 2 - 0.02), top, table.z);
    item(CREAM, table.length, 0.004, 0.02, table.x, top, table.z);
    item(CREAM, 0.02, 0.17, table.width + 0.16, table.x, top, table.z);
    for (const dz of [-1, 1]) item('#1c1c20', 0.04, 0.2, 0.04, table.x, top, table.z + dz * (table.width / 2 + 0.08));
    for (const dx of [-1, 1]) {
      for (const dz of [-1, 1]) box(group, mat.body, 0.08, top - 0.06, 0.08, table.x + dx * (table.length / 2 - 0.3), (top - 0.06) / 2, table.z + dz * (table.width / 2 - 0.25));
      const bat = item('#b5432e', 0.17, 0.02, 0.17, table.x + dx * 1.2, top, table.z + dx * 0.45);
      bat.rotation.y = 0.5 * dx;
      const handle = item('#a87a4b', 0.035, 0.02, 0.13, table.x + dx * 1.26, top, table.z + dx * 0.45 + 0.14);
      handle.rotation.y = 0.5 * dx;
    }
    blockRect(zx + table.x, zz + table.z, table.length, table.width);

    // The ball: at rest on the table until two people are playing, then back and forth over the net.
    const ball = box(group, paint('#f2efe8'), 0.07, 0.07, 0.07, table.x - 0.6, top + 0.035, table.z + 0.3);
    ball.userData.dynamic = true;
    tickers.push((time) => {
      if (!pongPlaying) {
        ball.position.set(table.x - 0.6, top + 0.035, table.z + 0.3);
        return;
      }
      // One crossing every 0.8 seconds, with a bounce on each side of the net.
      const rally = time / 0.8;
      const across = Math.cos(rally * Math.PI); // -1 at one end, 1 at the other
      const flight = rally - Math.floor(rally);
      ball.position.set(table.x + across * (table.length / 2 + 0.25), top + 0.06 + Math.abs(Math.sin(flight * Math.PI * 2)) * 0.34, table.z + Math.sin(rally * 1.9) * 0.45);
    });

    zoneBanner(zone);
  }

  for (const zone of ZONES) {
    switch (zone.kind) {
      case 'executive':
        buildExecutive(zone);
        break;
      case 'coordinator':
        buildCoordinator(zone);
        break;
      case 'department':
        buildDepartment(zone);
        break;
      case 'meeting':
        enlarge = { x: zone.position.x, z: zone.position.z, by: zoneScale(zone) };
        buildMeetingRoom(zone);
        break;
      case 'cafe':
        buildCafe(zone);
        break;
      case 'lounge':
        enlarge = { x: zone.position.x, z: zone.position.z, by: zoneScale(zone) };
        buildLounge(zone);
        break;
    }
    enlarge = null;
    // What someone at each of the zone's spots faces: the Chief of Staff on the deck, the table elsewhere.
    const chief = desks.get(CHIEF_OF_STAFF_ID);
    const focus =
      zone.kind === 'executive' && chief
        ? chief.seat.clone()
        : zone.kind === 'lounge'
          ? new THREE.Vector3(zone.position.x - 0.4 * zoneScale(zone), 0, zone.position.z + 0.5 * zoneScale(zone))
          : new THREE.Vector3(zone.position.x, zone.elevation ?? 0, zone.position.z);
    for (const spot of zone.spots ?? []) {
      const p = spotWorldPosition(zone, spot);
      // In the café everyone faces what they came for: the bar from a stool, the table from either end of it.
      const facing =
        zone.kind !== 'cafe'
          ? focus
          : spot.id.includes('pong')
            ? new THREE.Vector3(zone.position.x + PONG_TABLE.x, 0, zone.position.z + PONG_TABLE.z)
            : new THREE.Vector3(p.x, 0, p.z - 4);
      spots.set(spot.id, {
        spotId: spot.id,
        zoneId: zone.id,
        position: new THREE.Vector3(p.x, p.y, p.z),
        posture: spot.posture ?? 'sit',
        focus: facing,
      });
    }
  }

  // Work for review: folders on Stephen's desk --------------------------------
  //
  // One folder per finished mission, stacked at the front of his desk, lit from within so it
  // shows by day and glows at night, with a marker turning slowly above the pile so it can be
  // found from across the room. The whole pile is one thing to press.
  const reviewTray = new THREE.Group();
  reviewTray.name = 'review-tray';
  const folderGlow = new THREE.MeshBasicMaterial({ color: neonColor(PALETTE.orange, 1.15) });
  const folderLabel = makeLabel('', 'review-label', PALETTE.orange);
  const reviewPick = new THREE.Mesh(UNIT_BOX, new THREE.MeshBasicMaterial({ visible: false }));
  const reviewMarker = new THREE.Mesh(new THREE.OctahedronGeometry(0.11), folderGlow);
  let reviewCount = 0;
  let reviewTroubled = false;
  {
    const desk = desks.get('exec.ceo');
    if (desk) {
      const { height } = deskDimensions({ id: 'exec.ceo', role: '', position: { x: 0, z: 0 }, size: 'executive' });
      reviewTray.position.copy(desk.position);
      reviewTray.rotation.y = desk.rotation;
      reviewTray.scale.setScalar(FURNITURE_SCALE);
      const pile = new THREE.Group();
      pile.name = 'review-pile';
      pile.position.set(0.72, height, 0.34);
      reviewTray.add(pile);
      reviewPick.scale.set(0.62, 0.7, 0.5);
      reviewPick.position.set(0.72, height + 0.3, 0.34);
      reviewMarker.position.set(0.72, height + 0.62, 0.34);
      folderLabel.position.set(0.72, height + 0.9, 0.34);
      reviewTray.add(reviewPick, reviewMarker, folderLabel);
      reviewTray.visible = false;
      scene.add(reviewTray);
      tickers.push((time) => {
        if (!reviewTray.visible) return;
        reviewMarker.rotation.y = time * 1.6;
        reviewMarker.position.y = height + 0.62 + Math.sin(time * 2.2) * 0.05;
        // Orange for work to look at; red, and quicker, when some of it did not get done.
        const pulse = 1 + Math.sin(time * (reviewTroubled ? 5.5 : 3.1)) * (reviewTroubled ? 0.22 : 0.12);
        folderGlow.color.copy(neonColor(reviewTroubled ? PALETTE.alert : PALETTE.orange, 1.15)).multiplyScalar(pulse);
      });
    }
  }
  function setReviews(missionIds: readonly string[], troubled = false) {
    const pile = reviewTray.getObjectByName('review-pile');
    if (!pile) return;
    reviewCount = missionIds.length;
    reviewTroubled = troubled;
    reviewTray.visible = reviewCount > 0;
    pile.clear();
    // At most five folders are drawn; the label says how many there really are.
    missionIds.slice(0, 5).forEach((_, i) => {
      const folder = new THREE.Group();
      folder.position.y = i * 0.038;
      folder.rotation.y = ((i * 37) % 7) * 0.09 - 0.25;
      box(folder, paint('#d99a3a'), 0.36, 0.03, 0.26, 0, 0.015, 0);
      box(folder, paint('#e8b45a'), 0.13, 0.03, 0.035, -0.09, 0.015, -0.145); // the tab
      box(folder, folderGlow, 0.37, 0.008, 0.27, 0, 0.034, 0); // the lit edge
      box(folder, paint('#dedbd2'), 0.3, 0.006, 0.2, 0.01, 0.031, 0.01); // papers showing
      pile.add(folder);
    });
    const element = folderLabel.element;
    element.textContent = `${reviewCount === 1 ? `${missionIds[0]} · ` : `${reviewCount} `}${troubled ? 'needs attention' : 'for review'}`;
    element.dataset.troubled = String(troubled);
  }

  PLANTS.forEach(buildPlant);
  PLANTERS.forEach(buildPlanter);
  // A bench in each of the two passages that run back between the departments, and shelving
  // between the café and the lounge.
  buildBench(-10, -11, 'west');
  buildBench(10, -11, 'east');
  buildShelving(13.6, 14.4, 4.4);
  buildWalls();
  buildEntrance();
  buildMonument();
  const vendingDock = buildVending();
  if (!companyCore) throw new Error('The layout has no executive zone, so there is no company core');

  if (slatMatrices.length > 0) {
    const slats = new THREE.InstancedMesh(UNIT_BOX, mat.slat, slatMatrices.length);
    slatMatrices.forEach((matrix, index) => slats.setMatrixAt(index, matrix));
    slats.instanceMatrix.needsUpdate = true;
    slats.computeBoundingSphere();
    slats.name = 'slat-walls';
    scene.add(slats);
  }

  // Everything built above that never moves is now drawn together (see `bake`). The neighbourhood
  // already is, and people, animals and the robot are added later and move.
  scene.updateMatrixWorld(true);
  bake(
    scene.children.filter((child) => /^(zone|desk|banner|plant|planter|bench|shelving|entrance|monument|vending|wall):/.test(`${child.name}:`)),
    scene,
    'office',
  );

  // What the sun's shadows fall from and on: everything solid that stands still, indoors and out.
  // Glass and lights do not cast one. Nor do the ground, the sea and the far mountains (they
  // only receive), nor anything that moves: people, cars, surf.
  const flatGround = /^outdoors:(grass|road|walk|sand|wetSand|sea|line|hill|ridge\w+)$/;
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh || Array.isArray(mesh.material) || (mesh as unknown as THREE.InstancedMesh).isInstancedMesh) return;
    const material = mesh.material as THREE.Material;
    if (!(material as THREE.MeshStandardMaterial).isMeshStandardMaterial) return;
    let outside = false;
    for (let parent: THREE.Object3D | null = mesh; parent; parent = parent.parent) if (parent.name === 'outdoors') outside = true;
    // Outdoors only the merged scenery takes part; the moving cars are separate objects.
    if (outside && !mesh.name.startsWith('outdoors:')) return;
    mesh.receiveShadow = true;
    mesh.castShadow = !material.transparent && material.visible && !flatGround.test(mesh.name);
  });

  return {
    scene,
    fog,
    desks,
    spots,
    obstacles,
    core: companyCore,
    vending: { dock: vendingDock },
    setDeskScreen,
    floorHeightAt(x, z) {
      let height = 0;
      for (const area of raised) {
        if (x >= area.minX && x <= area.maxX && z >= area.minZ && z <= area.maxZ) height = Math.max(height, area.height);
      }
      return height;
    },
    setMissions(cards) {
      missionCards = cards;
      redrawBoard();
    },
    update(time, camera) {
      for (const tick of tickers) tick(time);
      // A wall with the camera outside it sinks to its sill; the others stand.
      for (const wall of cutaways) {
        const outside = (camera.position.x - wall.at.x) * wall.normal.x + (camera.position.z - wall.at.z) * wall.normal.z > 0;
        const target = outside ? 0 : 1;
        if (wall.shown === target) continue;
        wall.shown += Math.sign(target - wall.shown) * Math.min(Math.abs(target - wall.shown), 0.08);
        wall.tall.visible = wall.shown > 0.01;
        wall.tall.scale.y = Math.max(wall.shown, 0.001);
        shadowsStale = true; // a wall going up or down changes what the sun falls on
      }
    },
    setSky(sky) {
      const { daylight, warmth } = sky;
      // Sky and haze: near-black at night, blue by day, with orange let in round sunrise and sunset.
      skyColor.lerpColors(SKY.night, SKY.day, daylight).lerp(SKY.golden, warmth * 0.55 * Math.min(1, daylight * 3));
      (scene.background as THREE.Color).copy(skyColor);
      fog.color.copy(skyColor);
      // Ambient light: the warm glow of the room at night, open sky by day.
      ambient.color.lerpColors(SKY.roomLight, SKY.dayLight, daylight).lerp(SKY.goldenLight, warmth * 0.5 * daylight);
      ambient.groundColor.lerpColors(SKY.roomBounce, SKY.dayBounce, daylight);
      // Less from the sky and more from the sun than there used to be: that is what makes shadows, and sunshine.
      ambient.intensity = THREE.MathUtils.lerp(1.2, 2.15, daylight);
      // The sun crosses from east (+x) to west out over the sea, never high: it shines in through the
      // glass front and lies across the floor on the diagonal all day.
      // (Placed well back along that direction, so the whole town lies in front of it.)
      sun.position.set(Math.cos(sky.sunAngle) * 78 + 26, Math.sin(sky.sunAngle) * 62 + 8, 92).multiplyScalar(2.4).add(sun.target.position);
      sun.color.lerpColors(SKY.sunNoon, SKY.sunLow, warmth);
      sun.intensity = daylight * THREE.MathUtils.lerp(5.3, 2.5, warmth);
      // Shadows are drawn again once the sun has moved about half a degree, not every frame.
      if (daylight > 0.02 && shadowSun.angleTo(sun.position) > 0.006) {
        shadowSun.copy(sun.position);
        shadowsStale = true;
      }
      sun.castShadow = daylight > 0.02;
      // The disc hangs far off in the sun's direction, white at noon, orange when low, gone at night.
      sunDisc.position.copy(sun.position).sub(sun.target.position).normalize().multiplyScalar(640);
      sunDisc.material.color.lerpColors(SKY.sunNoon, SKY.sunLow, warmth);
      sunDisc.material.opacity = Math.min(1, daylight * 1.6);
      sunDisc.visible = daylight > 0.02;
      // The lamps over each zone do most of the work at night and little by day.
      const lamps = THREE.MathUtils.lerp(1, 0.22, daylight) * (1 - THREE.MathUtils.smoothstep(daylight, 0.8, 0.96));
      // In full daylight they add nothing to see, and each one is work for every pixel of wood: off.
      const lampsOn = daylight < 0.96;
      for (const { light, base } of zoneLights) {
        light.intensity = base * lamps;
        light.visible = lampsOn;
      }
      // The entrance lettering is a soft glow at night; by day it has to hold its own against the sky.
      for (const material of signMaterials) material.color.setScalar(THREE.MathUtils.lerp(0.62, 1, daylight));
      // The floor strips and other neon: on at night, off by day and at dusk.
      const night = nightLevel(daylight);
      for (const { material, on, off } of neonCache.values()) material.color.lerpColors(off, on, night);
      for (const material of tintCache.values()) material.opacity = 0.06 * night;
      outdoors.setDaylight(daylight);
    },
    redrawText() {
      for (const redraw of redraws) redraw();
    },
    setPong(playing) {
      pongPlaying = playing;
    },
    setReviews,
    reviewTargets: () => (reviewCount > 0 ? [reviewPick] : []),
    shadowsStale() {
      const stale = shadowsStale;
      shadowsStale = false;
      return stale;
    },
  };
}
