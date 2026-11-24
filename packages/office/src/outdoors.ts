/**
 * SC45 AI Office: the neighbourhood round the office.
 *
 * A low-poly piece of city by the sea: roads on three sides and the coast road along the
 * front; office towers and shopping malls behind and to the sides, lower near the office and
 * taller further off; Taipei 101 standing over them at the back; and mountain ranges behind
 * that, ridge after ridge. A Taipei that has been given a beach. Across the coast road is the golden beach: a boardwalk, two restaurants, a
 * barbecue hut, a volleyball court, an outdoor gym, a pier, and then the sea. Everything
 * on the camera's side is kept low so nothing stands between the viewer and the office.
 *
 * Everything static is merged into one mesh per material (about two dozen draw calls for
 * the whole neighbourhood). The moving cars are separate objects; the people, scooters
 * and surf are in life.ts.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { FLOOR, PALETTE } from './layout';
import { buildLife, type Seat } from './life';
import { pixelate } from './pixel';

export interface Outdoors {
  /** Advance the moving cars. Time in seconds. */
  update(time: number): void;
  /** 0 at night, 1 by day: windows, street lamps, headlights and stars go out as it gets light. */
  setDaylight(daylight: number): void;
}

/** The ground outside. The office floor is a slab whose top is at 0, so it stands half a metre proud. */
const GROUND = -0.5;
/** How far the roads run before the fog has swallowed them. */
const REACH = 150;

const ROADS = {
  /** Along the front (the camera's side) and the back of the office: centre line z, width. */
  front: { z: 30, width: 9 },
  back: { z: -31, width: 8 },
  /** Down each side: centre line x. */
  side: { x: 44, width: 8 },
} as const;
const WALK = 1.9; // pavement width

type Glow = (hex: string, gain?: number) => THREE.Color;

/** A soft round falloff, for the pool of light under each street lamp. */
function poolTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const g = canvas.getContext('2d')!;
  const gradient = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gradient;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

/** Phones and tablets: fewer real lights. */
const LEAN = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches === true;

export function buildOutdoors(scene: THREE.Scene, glow: Glow): Outdoors {
  /** A matt, pixel-mottled material. `blocks` is pixels per metre: coarse for ground, finer for things. */
  const flat = (color: string, roughness = 1, blocks = 3, strength = 0.12) =>
    pixelate(new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, flatShading: true }), blocks, strength);
  const lit = (color: THREE.Color | string) => new THREE.MeshBasicMaterial({ color });

  const materials = {
    // Hex values look bright here because the only light outdoors is the dim ambient one.
    grass: flat('#3d6a4a', 1, 2, 0.16),
    park: flat('#4f8a5e', 1, 2, 0.16),
    road: flat('#34343c', 1, 2, 0.14),
    walk: flat('#8d8d98', 1, 2, 0.1),
    // Road markings: white paint, lit like everything else, so it is plain by day and quiet at night.
    line: flat('#cfcfc8', 0.9, 4, 0.04),
    wallA: flat('#b3a898'),
    wallB: flat('#8f99a6'),
    wallC: flat('#b89a7c'),
    roofA: flat('#4a3f46'),
    roofB: flat('#8a4e3a'),
    wood: flat('#7a5232'),
    dark: flat('#26262c', 0.6),
    window: lit(glow('#ffc887', 0.78)),
    windowOff: lit('#0d1016'),
    leafA: flat('#3f9a62', 1, 3, 0.2),
    leafB: flat('#2f8055', 1, 3, 0.2),
    palm: flat('#3a9460', 1, 3, 0.18),
    water: new THREE.MeshStandardMaterial({ color: '#2a7fa8', roughness: 0.3, metalness: 0.1 }),
    lamp: lit(glow(PALETTE.peach, 0.95)),
    hill: flat('#2a3a3c'),
    // Mountain ranges, nearer to further: each paler and bluer, as distance makes them.
    ridgeNear: flat('#2f4a42', 1, 0.5, 0.1),
    ridgeMid: flat('#476560', 1, 0.5, 0.08),
    ridgeFar: flat('#64818a', 1, 0.5, 0.06),
    // The city: concrete, the tower that stands over it, mall signs that light up, and Stephen's car.
    concrete: flat('#8c8f96', 1, 1, 0.08),
    jade: flat('#3f8a86', 0.5, 1, 0.1),
    jadeDark: flat('#2a5f60', 0.5, 1, 0.1),
    signPink: lit(glow(PALETTE.pink, 0.9)),
    signTeal: lit(glow('#3fe0d0', 0.85)),
    carWhite: flat('#d4d4d0', 0.35, 6, 0.03),
    leather: flat('#6a1422', 0.7), // maroon
    /** The car's windscreen: pale, clear and shiny. */
    carGlass: new THREE.MeshStandardMaterial({ color: '#cfe4f2', transparent: true, opacity: 0.42, roughness: 0.04, metalness: 0.35, depthWrite: false }),
    carA: flat('#7d2f2a', 0.5),
    carB: flat('#2f4f7d', 0.5),
    carC: flat('#8a8a92', 0.5),
    // The coast.
    sand: flat('#b8975c', 1, 2, 0.1),
    wetSand: flat('#8f7a52', 1, 2, 0.1),
    // Matt enough that a low sun leaves a soft sheen on it, not one enormous white patch.
    sea: new THREE.MeshStandardMaterial({ color: '#1f86ad', roughness: 0.82, metalness: 0 }),
    deck: flat('#8f6a42', 1, 2, 0.16),
    white: flat('#b9b6ae'),
    coral: flat('#b5503c'),
    teal: flat('#2c8a86'),
    sun: flat('#c2962a'),
    thatch: flat('#9a8048', 1, 3, 0.22),
    steel: flat('#6c7078', 0.5),
    ember: lit('#ff7a2a'),
    /** A torch's flame: lit after dark, a dull wick by day. */
    flame: lit(glow('#ff9a3c', 0.95)),
    net: new THREE.MeshBasicMaterial({ color: '#e8e8e8', transparent: true, opacity: 0.45, depthWrite: false }),
    pool: new THREE.MeshBasicMaterial({ color: '#ffb877', map: poolTexture(), transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false }),
    /** The same, stronger, for the sand: pale ground shows lamplight more than a road does. */
    poolBeach: new THREE.MeshBasicMaterial({ color: '#ffb066', map: poolTexture(), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
  };
  type Key = keyof typeof materials;

  // Base shapes, all non-indexed so they can be merged together.
  const BOX = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
  /** A box whose origin is at one end, for things that hinge (palm fronds). */
  const ARM = new THREE.BoxGeometry(1, 1, 1).translate(0.5, 0, 0).toNonIndexed();
  /** A four-sided pyramid with a square base one unit wide: a hip roof. */
  const ROOF = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4).rotateY(Math.PI / 4).toNonIndexed();
  /** Posts and trunks are square, like everything else. */
  const POST = BOX;
  const DISC = new THREE.CircleGeometry(1, 20).rotateX(-Math.PI / 2).toNonIndexed();

  const batches = new Map<Key, THREE.BufferGeometry[]>();
  const local = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const euler = new THREE.Euler(0, 0, 0, 'YXZ');

  /** A placer for one object: positions are local to (x, z) on the ground, turned by `heading`. */
  function at(x: number, z: number, heading = 0, y = GROUND) {
    const parent = new THREE.Matrix4().makeRotationY(heading).setPosition(x, y, z);
    return (key: Key, shape: THREE.BufferGeometry, px: number, py: number, pz: number, sx: number, sy: number, sz: number, ry = 0, rz = 0, rx = 0) => {
      quaternion.setFromEuler(euler.set(rx, ry, rz));
      local.compose(new THREE.Vector3(px, py, pz), quaternion, new THREE.Vector3(sx, sy, sz));
      const geometry = shape.clone().applyMatrix4(local.premultiply(parent));
      let list = batches.get(key);
      if (!list) batches.set(key, (list = []));
      list.push(geometry);
    };
  }
  const world = at(0, 0);

  // Towers -------------------------------------------------------------------
  //
  // An office tower is a box wrapped in a picture of windows, which repeats up and round it.
  // The same picture, in black and warm yellow, says which windows are lit: by day it is not
  // used at all, and as it gets dark it is turned up, so the offices light up floor by floor
  // in the pattern of whoever is working late. Three kinds of glass, three materials, three
  // draw calls for the whole skyline.
  const PANE = { across: 8, up: 8, width: 3.2, height: 3.6 }; // one tile of the picture: 8 by 8 windows, each this many metres
  function windowTextures(glass: string, frame: string, litShare: number, seedFrom: number): { map: THREE.CanvasTexture; emissive: THREE.CanvasTexture } {
    let state = seedFrom;
    const next = () => (state = (state * 16807) % 2147483647) / 2147483647;
    const make = (paint: (g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, lit: boolean) => void, ground: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 128;
      const g = canvas.getContext('2d')!;
      g.fillStyle = ground;
      g.fillRect(0, 0, 128, 128);
      return { canvas, g, paint };
    };
    const day = make((g, x, y, w, h) => {
      g.fillStyle = glass;
      g.fillRect(x, y, w, h);
      g.fillStyle = 'rgba(255,255,255,0.10)';
      g.fillRect(x, y, w, h / 3);
    }, frame);
    const night = make((g, x, y, w, h, on) => {
      if (!on) return;
      g.fillStyle = next() < 0.8 ? '#e0b070' : '#a8c4e0';
      g.fillRect(x, y, w, h);
    }, '#000000');
    const cell = 128 / PANE.across;
    for (let row = 0; row < PANE.up; row++) {
      // Some floors are mostly lit, some mostly dark: that is how offices look at night.
      const floorShare = litShare * (0.55 + next() * 0.9);
      for (let column = 0; column < PANE.across; column++) {
        const on = next() < floorShare;
        for (const layer of [day, night]) layer.paint(layer.g, column * cell + 2, row * cell + 3, cell - 4, cell - 6, on);
      }
    }
    const texture = (canvas: HTMLCanvasElement) => {
      const made = new THREE.CanvasTexture(canvas);
      made.wrapS = made.wrapT = THREE.RepeatWrapping;
      made.magFilter = THREE.NearestFilter;
      made.colorSpace = THREE.SRGBColorSpace;
      return made;
    };
    return { map: texture(day.canvas), emissive: texture(night.canvas) };
  }
  const towerKinds = [
    windowTextures('#5f86a8', '#2c3a48', 0.8, 11),
    windowTextures('#7a6a58', '#3a322c', 0.72, 23),
    windowTextures('#6a8a8c', '#8c8f96', 0.66, 37),
  ].map(({ map, emissive }) => new THREE.MeshStandardMaterial({ map, emissiveMap: emissive, emissive: new THREE.Color('#ffffff'), emissiveIntensity: 0, roughness: 0.45, metalness: 0.1 }));
  const towerParts: THREE.BufferGeometry[][] = towerKinds.map(() => []);

  /** A box of windows standing on (x, z): `kind` picks the glass. Its roof and underside are left plain. */
  function glassBox(kind: number, x: number, z: number, width: number, height: number, depth: number, base = 0) {
    const geometry = BOX.clone();
    const uv = geometry.getAttribute('uv') as THREE.BufferAttribute;
    // A box's faces come in the order +x, -x, +y, -y, +z, -z, six corners each.
    for (let face = 0; face < 6; face++) {
      const span = face < 2 ? depth : width;
      for (let corner = 0; corner < 6; corner++) {
        const index = face * 6 + corner;
        if (face === 2 || face === 3) uv.setXY(index, 0.01, 0.01); // roof and underside: one dark corner of the picture
        else uv.setXY(index, (uv.getX(index) * span) / (PANE.across * PANE.width), (uv.getY(index) * height) / (PANE.up * PANE.height));
      }
    }
    geometry.applyMatrix4(new THREE.Matrix4().makeScale(width, height, depth).setPosition(x, GROUND + base + height / 2, z));
    towerParts[kind % towerKinds.length].push(geometry);
  }

  let seed = 20261114;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pick = <T>(items: readonly T[]): T => items[Math.floor(random() * items.length)];

  // Ground, roads, pavements ---------------------------------------------------

  world('grass', BOX, 0, -0.5, 0, 1800, 1, 1800);

  const { front, back, side } = ROADS;
  for (const road of [front, back]) world('road', BOX, 0, 0.025, road.z, REACH * 2, 0.05, road.width);
  // The side roads end at the coast road: beyond it is the beach.
  for (const sx of [-1, 1]) world('road', BOX, sx * side.x, 0.02, (front.z - REACH) / 2, side.width, 0.04, REACH + front.z);

  /** Split a run along one axis into the stretches that are not road. */
  function between(crossings: Array<{ centre: number; width: number }>): Array<[number, number]> {
    const cuts = crossings.map((c) => [c.centre - c.width / 2 - WALK, c.centre + c.width / 2 + WALK] as const).sort((a, b) => a[0] - b[0]);
    const runs: Array<[number, number]> = [];
    let start = -REACH;
    for (const [from, to] of cuts) {
      runs.push([start, from]);
      start = to;
    }
    runs.push([start, REACH]);
    return runs;
  }
  const alongX = between([{ centre: -side.x, width: side.width }, { centre: side.x, width: side.width }]);
  const alongZ = between([{ centre: back.z, width: back.width }, { centre: front.z, width: front.width }]).slice(0, 2);

  // Pavements on both sides of every road, stopping at the crossings (corners are filled by the other road's run).
  for (const road of [front, back]) {
    for (const edge of [-1, 1]) {
      const z = road.z + edge * (road.width / 2 + WALK / 2);
      if (road === front && edge === 1) {
        // The seaward kerb of the coast road runs unbroken.
        world('walk', BOX, 0, 0.06, z, REACH * 2, 0.12, WALK);
        continue;
      }
      for (const [from, to] of between([{ centre: -side.x, width: side.width - WALK * 2 }, { centre: side.x, width: side.width - WALK * 2 }])) {
        world('walk', BOX, (from + to) / 2, 0.06, z, to - from, 0.12, WALK);
      }
    }
  }
  for (const sx of [-1, 1]) {
    for (const edge of [-1, 1]) {
      const x = sx * side.x + edge * (side.width / 2 + WALK / 2);
      for (const [from, to] of alongZ) world('walk', BOX, x, 0.06, (from + to) / 2, WALK, 0.12, to - from);
    }
  }

  // Centre-line dashes.
  for (const road of [front, back]) {
    for (const [from, to] of alongX) {
      for (let x = from + 2; x < to - 2; x += 6) world('line', BOX, x, 0.07, road.z, 2.6, 0.04, 0.24);
    }
  }
  for (const sx of [-1, 1]) {
    for (const [from, to] of alongZ) {
      for (let z = from + 2; z < to - 2; z += 6) world('line', BOX, sx * side.x, 0.06, z, 0.24, 0.04, 2.6);
    }
  }

  // The way in: steps down from the office floor, and a path to the pavement.
  const edge = FLOOR.depth / 2;
  for (let step = 0; step < 3; step++) {
    const height = 0.5 - (step + 1) * 0.125;
    world('walk', BOX, 0, height / 2, edge + 0.3 + step * 0.6, 7 + step * 0.5, height, 0.6);
  }
  const pathEnd = front.z - front.width / 2 - WALK;
  world('walk', BOX, 0, 0.05, (edge + 1.8 + pathEnd) / 2, 5, 0.1, pathEnd - edge - 1.8);

  // Things ------------------------------------------------------------------

  function tree(x: number, z: number, scale = 1) {
    const put = at(x, z, Math.floor(random() * 4) * (Math.PI / 2));
    const trunk = (1.6 + random() * 0.8) * scale;
    put('wood', POST, 0, trunk / 2, 0, 0.32 * scale, trunk, 0.32 * scale);
    // A stack of three leaf blocks, widest at the bottom.
    const radius = (1.5 + random() * 0.5) * scale;
    const leaves = ['leafA', 'leafB'] as const;
    const first = Math.floor(random() * 2);
    put(leaves[first], BOX, 0, trunk + radius * 0.35, 0, radius * 2.1, radius * 0.9, radius * 2.1);
    put(leaves[1 - first], BOX, (random() - 0.5) * radius * 0.3, trunk + radius * 1.1, (random() - 0.5) * radius * 0.3, radius * 1.5, radius * 0.7, radius * 1.5);
    put(leaves[first], BOX, (random() - 0.5) * radius * 0.3, trunk + radius * 1.7, (random() - 0.5) * radius * 0.3, radius * 0.85, radius * 0.55, radius * 0.85);
  }

  function shrub(x: number, z: number, scale = 1) {
    const put = at(x, z, 0);
    put(pick(['leafA', 'leafB'] as const), BOX, 0, 0.45 * scale, 0, 1.6 * scale, 0.9 * scale, 1.4 * scale);
    put(pick(['leafA', 'leafB'] as const), BOX, 0.1 * scale, 1.05 * scale, -0.1 * scale, 0.9 * scale, 0.4 * scale, 0.8 * scale);
  }

  function palm(x: number, z: number, height = 7) {
    const put = at(x, z, random() * Math.PI * 2);
    const lean = (random() - 0.5) * 0.12;
    put('wood', POST, lean * height * 0.5, height / 2, 0, 0.3, height, 0.3, 0, -lean);
    const fronds = 7;
    for (let i = 0; i < fronds; i++) {
      const heading = (i / fronds) * Math.PI * 2;
      put('palm', ARM, lean * height, height, 0, 2.3 + random() * 0.6, 0.07, 0.55, heading, -0.38 - random() * 0.25);
    }
  }

  function lamp(x: number, z: number, heading: number) {
    const put = at(x, z, heading);
    put('dark', POST, 0, 2.1, 0, 0.14, 4.2, 0.14);
    put('dark', BOX, 0, 4.2, 0.6, 0.1, 0.1, 1.3);
    put('lamp', BOX, 0, 4.12, 1.1, 0.34, 0.07, 0.5);
    put('pool', DISC, 0, 0.14, 1.4, 5.5, 1, 5.5);
  }

  function parkedCar(x: number, z: number, heading: number) {
    const put = at(x, z, heading);
    put(pick(['carA', 'carB', 'carC'] as const), BOX, 0, 0.62, 0, 4.1, 0.7, 1.8);
    put('dark', BOX, -0.2, 1.2, 0, 2.2, 0.55, 1.6);
    put('dark', BOX, 0, 0.2, 0, 3.4, 0.4, 1.9);
  }

  // The block ---------------------------------------------------------------

  const frontFar = front.z + front.width / 2 + WALK; // far kerb of the front road
  const backFar = back.z - back.width / 2 - WALK;
  const sideFar = side.x + side.width / 2 + WALK;

  // The city -----------------------------------------------------------------
  //
  // Behind the office and to both sides, never in front. Nearest the office the buildings are
  // low (a mall, mid-rise offices), so that from any angle the room can still be seen; each row
  // back is taller. Taipei 101 stands behind them all, a little to one side.

  // Lights along the tops of some towers. They draw from their own run of numbers, so adding
  // them moved no building.
  let crownSeed = 4545;
  const crownRandom = () => (crownSeed = (crownSeed * 16807) % 2147483647) / 2147483647;

  /** An office tower: a shaft of windows on a concrete base, with a plant room and sometimes a mast on top. */
  function tower(x: number, z: number, width: number, depth: number, height: number) {
    const kind = Math.floor(random() * towerKinds.length);
    const put = at(x, z, 0);
    put('concrete', BOX, 0, 1.6, 0, width + 1.2, 3.2, depth + 1.2);
    put('windowOff', BOX, 0, 1.5, depth / 2 + 0.62, width * 0.5, 2.4, 0.06); // the lobby glass, front and back
    put('windowOff', BOX, 0, 1.5, -depth / 2 - 0.62, width * 0.5, 2.4, 0.06);
    // Taller towers step in once, part of the way up.
    const step = height > 26 && random() < 0.7 ? height * (0.55 + random() * 0.2) : height;
    glassBox(kind, x, z, width, step - 3.2, depth, 3.2);
    if (step < height) glassBox(kind, x, z, width * 0.74, height - step, depth * 0.74, step);
    const top = step < height ? 0.74 : 1;
    put('concrete', BOX, 0, height + 0.25, 0, width * top + 0.4, 0.5, depth * top + 0.4);
    // A line of light round the roof of most of them, and round the step of the taller ones.
    const crown = crownRandom();
    if (crown < 0.75) {
      const key = crown < 0.4 ? 'lamp' : crown < 0.58 ? 'signTeal' : 'signPink';
      // Four strips, not a slab: seen from above, a roof should not be one sheet of light.
      const ring = (y: number, w: number, d: number) => {
        for (const sz of [-1, 1]) put(key, BOX, 0, y, (sz * d) / 2, w + 0.3, 0.3, 0.3);
        for (const sx of [-1, 1]) put(key, BOX, (sx * w) / 2, y, 0, 0.3, 0.3, d - 0.3);
      };
      ring(height + 0.72, width * top + 0.4, depth * top + 0.4);
      if (step < height) ring(step + 0.2, width + 0.3, depth + 0.3);
    }
    put('dark', BOX, (random() - 0.5) * width * 0.3, height + 1.5, (random() - 0.5) * depth * 0.3, width * top * 0.4, 2, depth * top * 0.4);
    if (height > 30 && random() < 0.6) {
      put('steel', POST, 0, height + 5.5, 0, 0.3, 7, 0.3);
      put('ember', BOX, 0, height + 9.2, 0, 0.5, 0.5, 0.5); // a red light for aircraft
    }
  }

  /** A shopping mall: long and low, a glass front under a canopy, signs that light at night, plant on the roof. Its front faces local +z. */
  function mall(x: number, z: number, heading: number, width: number, depth: number) {
    const put = at(x, z, heading);
    const height = 11;
    put('white', BOX, 0, height / 2, 0, width, height, depth);
    put('concrete', BOX, 0, height + 0.3, 0, width + 0.8, 0.6, depth + 0.8);
    // The front: two storeys of glass, a canopy over the doors, and a band of sign above.
    put('window', BOX, 0, 3.4, depth / 2 + 0.04, width * 0.86, 5.6, 0.08);
    for (let i = 0; i <= 8; i++) put('dark', BOX, -width * 0.43 + (i * width * 0.86) / 8, 3.4, depth / 2 + 0.1, 0.24, 5.6, 0.1);
    put('dark', BOX, 0, 3.4, depth / 2 + 0.1, width * 0.86, 0.22, 0.1);
    put('dark', BOX, 0, 6.5, depth / 2 + 1.6, width * 0.5, 0.3, 3.2);
    put('signPink', BOX, -width * 0.2, 8.6, depth / 2 + 0.1, width * 0.3, 1.5, 0.16);
    put('signTeal', BOX, width * 0.24, 8.6, depth / 2 + 0.1, width * 0.2, 1.5, 0.16);
    put('lamp', BOX, 0, 6.3, depth / 2 + 3.1, width * 0.5, 0.1, 0.1);
    // A sign tower at one corner, lit on two faces.
    put('concrete', BOX, width / 2 - 2, height + 4, depth / 2 - 2, 3, 8, 3);
    put('signPink', BOX, width / 2 - 2, height + 5, depth / 2 - 0.44, 2.2, 4.4, 0.12);
    put('signTeal', BOX, width / 2 - 0.44, height + 5, depth / 2 - 2, 0.12, 4.4, 2.2);
    // Windows down the sides, and plant on the roof.
    for (const side of [-1, 1]) put('windowOff', BOX, side * (width / 2 + 0.04), 6.2, 0, 0.08, 2, depth * 0.7);
    for (let i = 0; i < 4; i++) put('steel', BOX, -width * 0.3 + i * width * 0.18, height + 1.3, -depth * 0.2, 3, 1.4, 2.4);
    // Planting and a row of trees along the front.
    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue;
      const dx = (i * width) / 6;
      tree(x + Math.cos(heading) * dx + Math.sin(heading) * (depth / 2 + 5), z - Math.sin(heading) * dx + Math.cos(heading) * (depth / 2 + 5), 0.9);
    }
  }

  // Behind the office. First row: a mall in the middle, mid-rise offices either side of it.
  mall(-4, backFar - 17, 0, 46, 24);
  for (const x of [-104, -84, -64, 62, 82, 102, 122]) tower(x + (random() - 0.5) * 3, backFar - 13, 13 + random() * 3, 12 + random() * 3, 12 + random() * 8);
  // Second row: taller.
  for (const x of [-118, -96, -74, -30, 30, 54, 76, 98, 120]) tower(x + (random() - 0.5) * 4, backFar - 46 - random() * 6, 15 + random() * 4, 14 + random() * 4, 24 + random() * 20);
  // Third row, and a scatter beyond it: the tallest, standing clear of Taipei 101.
  for (const x of [-132, -108, -84, -58, 38, 62, 88, 112, 136]) tower(x + (random() - 0.5) * 5, backFar - 80 - random() * 10, 16 + random() * 5, 16 + random() * 5, 34 + random() * 28);
  for (let i = 0; i < 12; i++) {
    const x = -150 + i * 27 + (random() - 0.5) * 8;
    if (Math.abs(x + 6) < 34) continue;
    tower(x, backFar - 118 - random() * 24, 16 + random() * 6, 16 + random() * 6, 28 + random() * 36);
  }
  // To the east, a second mall facing the side road; to the west, mid-rise offices. Taller behind both.
  mall(sideFar + 15, -4, -Math.PI / 2, 40, 22);
  for (const z of [-19, -1, 16]) tower(-sideFar - 11, z, 14 + random() * 2, 13 + random() * 2, 11 + random() * 6);
  for (const sx of [-1, 1]) {
    for (const z of [-22, 0, 20]) tower(sx * (sideFar + 44 + random() * 4), z + (random() - 0.5) * 4, 15 + random() * 4, 15 + random() * 4, 20 + random() * 18);
    for (const z of [-30, -4, 22]) tower(sx * (sideFar + 74 + random() * 8), z + (random() - 0.5) * 6, 16 + random() * 5, 16 + random() * 5, 30 + random() * 26);
  }

  // Taipei 101: a podium, a base that narrows as it rises, eight sections that each widen as
  // they rise (stacked like the joints of bamboo), a crown and a spire.
  //
  // After dark it is lit the way it is for the New Year: every section banded in its own colour,
  // red at the bottom and climbing through the rainbow, with the brightness running up the
  // tower in waves. The bands are one mesh; each box in it remembers which level it belongs to.
  const NEON = ['#ffc887', '#ff3b30', '#ff8a1e', '#ffd21e', '#3ddc62', '#22d3ee', '#4b8dff', '#9b6cff', '#ff4fa3', '#fff1d6'];
  const neonParts: THREE.BufferGeometry[] = [];
  const neonLevels: number[] = []; // one entry per box: an index into NEON
  {
    const origin = { x: -6, z: backFar - 96 };
    /** A band of light round the tower, `width` across, centred `y` above the ground. */
    const band = (level: number, y: number, width: number, height: number) => {
      neonParts.push(BOX.clone().applyMatrix4(new THREE.Matrix4().makeScale(width, height, width).setPosition(origin.x, GROUND + y, origin.z)));
      neonLevels.push(level);
    };
    const put = at(origin.x, origin.z, 0);
    put('concrete', BOX, 0, 4, 0, 40, 8, 40);
    put('window', BOX, 0, 3.4, 20.05, 26, 4.4, 0.1);
    let y = 8;
    for (let i = 0; i < 5; i++) {
      const width = 27 - i * 1.5;
      put(i % 2 ? 'jadeDark' : 'jade', BOX, 0, y + 2.6, 0, width, 5.2, width);
      y += 5.2;
      band(0, y - 0.55, width + 0.6, 0.5);
    }
    for (let section = 0; section < 8; section++) {
      for (let slab = 0; slab < 3; slab++) {
        const width = 17.2 + slab * 1.7;
        put(slab === 1 ? 'jadeDark' : 'jade', BOX, 0, y + 1.6, 0, width, 3.2, width);
        y += 3.2;
        // A thin line of the section's colour under the top of each of its lower slabs.
        if (slab < 2) band(section + 1, y - 0.5, width + 0.6, 0.5);
      }
      // The rim of each section: a broad band of light just under its top (not at it: two surfaces
      // at one height flicker), and a gold medallion on each face.
      band(section + 1, y - 0.9, 21.6, 1.2);
      for (const [dx, dz] of [[0, 1], [0, -1], [1, 0], [-1, 0]] as const) put('sun', BOX, dx * 10.4, y - 4.6, dz * 10.4, dx ? 0.4 : 2.2, 2.2, dz ? 0.4 : 2.2);
    }
    for (const [width, height, key] of [[14, 6, 'jade'], [10.5, 5, 'jadeDark'], [7, 5, 'jade'], [4, 6, 'jadeDark']] as const) {
      put(key, BOX, 0, y + height / 2, 0, width, height, width);
      y += height;
      band(9, y - 0.4, width + 0.4, 0.34);
    }
    // The spire: a line of light up each stage of it.
    band(9, y + 7, 1.9, 13);
    band(9, y + 18, 0.9, 7.6);
    put('steel', POST, 0, y + 7, 0, 1.6, 14, 1.6);
    put('steel', POST, 0, y + 18, 0, 0.6, 8, 0.6);
    put('ember', BOX, 0, y + 22.4, 0, 1, 1, 1);
  }

  // Stephen's car, in its own bay by the front door: a white two-door convertible with the roof down.
  {
    const S = 1.2; // drawn to the same scale as the people
    const bay = { x: 8.8, z: edge + 1.95 };
    world('walk', BOX, bay.x, 0.04, bay.z, 7.2, 0.08, 3.3);
    world('line', BOX, bay.x, 0.1, bay.z - 1.55, 7.2, 0.04, 0.12);
    for (const sx of [-1, 1]) world('line', BOX, bay.x + sx * 3.54, 0.1, bay.z, 0.12, 0.04, 3.3);
    world('walk', BOX, bay.x + 2.4, 0.04, bay.z + 2.2, 2.6, 0.08, 1.2); // the way out to the road
    // The sign for the bay: a post and a plate.
    world('dark', POST, bay.x - 3.9, 0.8, bay.z - 1.3, 0.1, 1.6, 0.1);
    world('white', BOX, bay.x - 3.9, 1.5, bay.z - 1.24, 0.6, 0.5, 0.05);
    world('coral', BOX, bay.x - 3.9, 1.66, bay.z - 1.21, 0.6, 0.14, 0.02);
    const place = at(bay.x, bay.z, 0, GROUND + 0.08);
    const put = (key: Key, x: number, y: number, z: number, sx: number, sy: number, sz: number, rz = 0) => place(key, BOX, x * S, y * S, z * S, sx * S, sy * S, sz * S, 0, rz);
    // Body: sills, a long bonnet with a raised centre, a short boot, and the doors.
    put('carWhite', 0, 0.46, 0, 4.56, 0.44, 1.8);
    put('carWhite', 1.42, 0.76, 0, 1.6, 0.16, 1.72);
    put('carWhite', 1.36, 0.86, 0, 1.0, 0.07, 0.56);
    put('carWhite', -1.78, 0.76, 0, 1.0, 0.16, 1.72);
    put('carWhite', -1.12, 0.8, 0, 0.36, 0.16, 1.66); // the cover the roof folds under
    for (const side of [-1, 1]) {
      put('carWhite', -0.12, 0.78, side * 0.82, 1.7, 0.2, 0.16);
      put('carWhite', 0.74, 0.92, side * 0.98, 0.14, 0.1, 0.2); // mirror
      // Wheels: dark, wide, with a bright centre.
      for (const end of [-1.42, 1.44]) {
        put('dark', end, 0.33, side * 0.84, 0.68, 0.66, 0.26);
        put('steel', end, 0.33, side * 0.98, 0.34, 0.34, 0.03);
      }
      put('dark', 0, 0.26, side * 0.9, 2.1, 0.1, 0.06); // side skirt
    }
    // Inside: leather, four seats, a wheel on the left.
    put('leather', -0.14, 0.7, 0, 1.72, 0.08, 1.46);
    for (const side of [-1, 1]) {
      put('leather', 0.1, 0.86, side * 0.38, 0.5, 0.26, 0.5);
      put('leather', -0.12, 1.08, side * 0.38, 0.14, 0.62, 0.48);
      put('leather', -0.14, 1.44, side * 0.38, 0.12, 0.16, 0.26);
      put('leather', -0.72, 0.96, side * 0.38, 0.14, 0.44, 0.5);
    }
    put('dark', 0.66, 0.84, 0, 0.3, 0.3, 1.5); // dashboard
    put('dark', 0.44, 1.0, -0.38, 0.05, 0.3, 0.3); // steering wheel
    // Windscreen: clear glass in a slim frame, raked back towards the driver.
    put('carGlass', 0.78, 1.1, 0, 0.04, 0.56, 1.5, 0.55);
    for (const side of [-1, 1]) put('dark', 0.78, 1.1, side * 0.78, 0.06, 0.6, 0.05, 0.55);
    put('dark', 0.63, 1.35, 0, 0.06, 0.05, 1.6);
    // Nose: two intakes side by side, a wide lower intake, lamps.
    for (const side of [-1, 1]) {
      put('dark', 2.29, 0.62, side * 0.2, 0.04, 0.2, 0.34);
      put('window', 2.27, 0.66, side * 0.66, 0.06, 0.14, 0.36);
      put('coral', -2.29, 0.68, side * 0.62, 0.04, 0.14, 0.44);
      // Four tailpipes, in pairs.
      for (const pipe of [0.42, 0.58]) put('steel', -2.31, 0.3, side * pipe, 0.08, 0.1, 0.1);
    }
    put('dark', 2.3, 0.36, 0, 0.05, 0.2, 1.5);
    put('dark', -2.3, 0.34, 0, 0.05, 0.16, 1.4);
    put('carWhite', -2.22, 0.88, 0, 0.14, 0.05, 1.3); // the lip on the boot
    put('steel', -2.3, 0.72, 0, 0.03, 0.12, 0.12); // a plain round badge on the boot lid
  }

  // A lawn strip round the office: trees behind it and beside it, low planting in front.
  for (const x of [-24, -12, 0, 12, 24]) tree(x + (random() - 0.5) * 3, -FLOOR.depth / 2 - 3.4, 0.95);
  for (const z of [-13, -1, 11]) {
    tree(FLOOR.width / 2 + 4, z + (random() - 0.5) * 3, 0.9);
    tree(-FLOOR.width / 2 - 4, z + (random() - 0.5) * 3, 0.9);
  }
  for (const x of [-27, -21, -15, 15, 21, 27]) shrub(x + (random() - 0.5) * 2, edge + 1.6, 1 + random() * 0.4); // none where Stephen's car stands

  // Palms line the far side of every road, where they stand behind nothing.
  for (let x = -36; x <= 36; x += 12) palm(x, frontFar - WALK / 2, 6.5 + random() * 1.5);
  for (let x = -138; x <= 138; x += 12) {
    if (Math.abs(Math.abs(x) - side.x) < 8) continue;
    palm(x, backFar + WALK / 2, 6.5 + random() * 2);
    if (Math.abs(x) > 50) palm(x, frontFar - WALK / 2, 6.5 + random() * 1.5);
  }
  for (const sx of [-1, 1]) {
    for (let z = -20; z <= 22; z += 10.5) palm(sx * (sideFar - WALK / 2), z, 6.5 + random() * 1.5);
  }

  // Street lamps on the office side of the front road and along the others.
  for (const x of [-30, -10, 10, 30]) lamp(x, front.z - front.width / 2 - WALK / 2, 0);
  for (const x of [-100, -70, 70, 100]) lamp(x, front.z - front.width / 2 - WALK / 2, 0);
  for (let x = -110; x <= 110; x += 22) lamp(x, back.z - back.width / 2 - WALK / 2, 0);
  for (const sx of [-1, 1]) {
    for (const z of [-18, 0, 18]) lamp(sx * (side.x - side.width / 2 - WALK / 2), z, sx * (Math.PI / 2));
  }

  // Parked cars.
  parkedCar(-22, front.z - front.width / 2 + 1, 0);
  parkedCar(17, front.z - front.width / 2 + 1, 0);
  parkedCar(-33, front.z + front.width / 2 - 1, Math.PI);
  parkedCar(-14, back.z + back.width / 2 - 1.2, Math.PI);
  parkedCar(21, back.z - back.width / 2 + 1.2, 0);
  parkedCar(side.x + side.width / 2 - 1.2, -8, Math.PI / 2);
  parkedCar(-side.x - side.width / 2 + 1.2, 9, -Math.PI / 2);

  // The coast across the front road -------------------------------------------
  //
  // From the kerb outwards: a boardwalk, the sand with everything on it, wet sand, the sea.
  const seats: Seat[] = [];
  const near = frontFar;
  const BOARDWALK = 4.6;
  const sandFrom = near + BOARDWALK;
  const SHORE = near + 40; // where the dry sand ends
  const court = { x: 9, z: near + 19, halfLength: 8, halfWidth: 4 };
  const gym = { x: 31, z: near + 14 };
  const grill = { x: -13, z: near + 12.4 };
  // The party, on the sand between the barbecue and the water: where people dance, the booth
  // behind them (towards the road), and the fire in front (towards the sea).
  const party = { x: -13, z: SHORE - 12 };
  const booth = { x: party.x, z: party.z - 5.2 };
  const fire = { x: party.x + 0.5, z: party.z + 6.2 };
  const SAND = 0.14; // the top of the dry sand, above the ground
  const logs: Seat[] = [];
  const rigLamps: Array<{ x: number; y: number; z: number }> = [];
  /** Where the beach's own floodlights hang: real lights, added below. */
  const floods: Array<{ x: number; y: number; z: number }> = [];

  /** A bamboo torch stuck in the sand, with a pool of its light round it. */
  function torch(x: number, z: number, y = SAND) {
    const put = at(x, z, 0, GROUND + y);
    put('wood', POST, 0, 0.95, 0, 0.1, 1.9, 0.1);
    put('dark', BOX, 0, 1.92, 0, 0.24, 0.16, 0.24);
    put('flame', BOX, 0, 2.16, 0, 0.2, 0.34, 0.2);
    put('poolBeach', DISC, 0, 0.06, 0, 5, 1, 5);
  }
  /** Bulbs on a wire slung between two points, sagging in the middle. `kinds` are taken in turn. */
  function stringLights(from: [number, number, number], to: [number, number, number], bulbs: number, sag: number, kinds: readonly Key[] = ['lamp']) {
    for (let i = 1; i <= bulbs; i++) {
      const t = i / (bulbs + 1);
      world(kinds[i % kinds.length], BOX, from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t - sag * 4 * t * (1 - t), from[2] + (to[2] - from[2]) * t, 0.17, 0.17, 0.17);
    }
  }
  {
    world('deck', BOX, 0, 0.1, near + BOARDWALK / 2, REACH * 2, 0.2, BOARDWALK);
    // Plank joints across the boardwalk.
    for (let x = -REACH + 1; x < REACH; x += 2.5) world('wood', BOX, x, 0.203, near + BOARDWALK / 2, 0.08, 0.01, BOARDWALK);
    world('sand', BOX, 0, 0.07, (sandFrom + SHORE) / 2, 900, 0.14, SHORE - sandFrom);
    world('wetSand', BOX, 0, 0.06, SHORE + 2.5, 900, 0.12, 5);
    world('sea', BOX, 0, 0.045, SHORE + 4 + 450, 1800, 0.09, 900);

    const canopies = ['coral', 'teal', 'sun', 'white'] as const;

    /** A round-ish table with a parasol and two or four stools; remembers where people can sit. */
    function table(x: number, z: number, parasol: boolean, y = 0) {
      const put = at(x, z, 0, GROUND + y);
      put('wood', BOX, 0, 0.72, 0, 1.1, 0.08, 1.1);
      put('dark', POST, 0, 0.36, 0, 0.12, 0.72, 0.12);
      if (parasol) {
        put('white', POST, 0, 1.5, 0, 0.07, 1.6, 0.07);
        const canopy = pick(canopies);
        put(canopy, BOX, 0, 2.32, 0, 2.6, 0.12, 2.6);
        put(canopy, BOX, 0, 2.46, 0, 1.4, 0.16, 1.4);
      }
      for (const [dx, dz] of [[-1, 0], [1, 0], [0, -1], [0, 1]] as const) {
        put('wood', BOX, dx * 0.95, 0.24, dz * 0.95, 0.42, 0.48, 0.42);
        if (random() < 0.5) seats.push({ x: x + dx * 0.95, y: GROUND + y + 0.48, z: z + dz * 0.95, heading: Math.atan2(dz, -dx) });
      }
    }

    /** A beach restaurant: a kitchen block at the road end, and a shaded deck of tables facing the sea. */
    function restaurant(x: number, z: number, roof: 'coral' | 'teal', stripes: 'coral' | 'teal' | 'sun') {
      const put = at(x, z, 0);
      const width = 15;
      put('deck', BOX, 0, 0.2, 3.5, width, 0.4, 13);
      // Kitchen and bar.
      put('white', BOX, 0, 1.75, -1.2, width - 1, 3.1, 3.4);
      put(roof, BOX, 0, 3.42, -1, width, 0.24, 4.4);
      put('window', BOX, 0, 3.86, 0.9, 6.4, 0.62, 0.12); // the sign, lit at night
      put('dark', BOX, 0, 3.86, 0.82, 6.8, 0.86, 0.1);
      put('wood', BOX, 0, 0.95, 0.75, width - 3, 1.1, 0.5); // the bar counter
      for (const wx of [-4.6, 0, 4.6]) put('window', BOX, wx, 2.3, 0.52, 2.6, 1, 0.06);
      for (const wx of [-4.6, 4.6]) put('window', BOX, wx, 2.1, -2.92, 2.2, 1, 0.06);
      put('wood', BOX, 0, 1.25, -2.92, 1.1, 2.1, 0.06);
      // A striped awning over the deck, on four posts.
      for (const px of [-width / 2 + 0.5, width / 2 - 0.5]) {
        for (const pz of [1.6, 9.2]) put('white', POST, px, 1.75, pz, 0.16, 3.1, 0.16);
      }
      for (let i = 0; i < 10; i++) put(i % 2 ? 'white' : stripes, BOX, -width / 2 + 0.75 + i * 1.5, 3.3, 5.3, 1.5, 0.1, 8.2);
      // A string of lights round the awning.
      for (let i = 0; i <= 10; i++) {
        put('lamp', BOX, -width / 2 + 0.2 + i * 1.46, 3.14, 9.42, 0.16, 0.16, 0.16);
        if (i < 6) for (const px of [-width / 2 + 0.2, width / 2 - 0.2]) put('lamp', BOX, px, 3.14, 1.6 + i * 1.5, 0.16, 0.16, 0.16);
      }
      for (const tx of [-4.8, 0, 4.8]) {
        table(x + tx, z + 3.4, false, 0.4);
        table(x + tx, z + 7.2, false, 0.4);
      }
      // Two steps down to the sand.
      put('deck', BOX, 0, 0.13, 10.3, 5, 0.26, 0.6);
      // Its light spills out over the sand in front, and lanterns hang under the awning.
      put('poolBeach', DISC, 0, SAND + 0.06, 15, 11, 1, 8);
      for (const lx of [-4.8, 0, 4.8]) for (const lz of [3.4, 7.2]) put('lamp', BOX, lx, 2.9, lz, 0.3, 0.34, 0.3);
    }

    /** The barbecue hut: a thatched roof on posts, a long grill with coals, and picnic tables on the sand. */
    function barbecue(x: number, z: number) {
      const put = at(x, z, 0);
      put('deck', BOX, 0, 0.16, 0, 9, 0.32, 6);
      for (const px of [-4, 4]) for (const pz of [-2.6, 2.6]) put('wood', POST, px, 1.7, pz, 0.24, 3.1, 0.24);
      put('thatch', BOX, 0, 3.35, 0, 10.4, 0.3, 7.4);
      put('thatch', ROOF, 0, 4.4, 0, 9.4, 1.9, 6.6);
      // The grill: a brick counter, a bed of coals, a grate, and a chimney pipe at one end.
      put('roofB', BOX, 0, 0.8, 0.4, 5, 0.96, 1.2);
      put('ember', BOX, 0, 1.3, 0.4, 4.4, 0.06, 0.8);
      for (let i = 0; i < 9; i++) put('dark', BOX, -2 + i * 0.5, 1.36, 0.4, 0.06, 0.04, 0.9);
      for (const [sx, key] of [[-1.4, 'coral'], [-0.5, 'roofB'], [0.6, 'coral'], [1.5, 'roofB']] as const) put(key, BOX, sx, 1.42, 0.4, 0.5, 0.08, 0.3);
      put('dark', BOX, 2.9, 1.5, 0.4, 0.5, 2.4, 0.5);
      put('wood', BOX, 0, 0.9, -1.9, 6, 0.1, 0.8); // serving counter
      put('wood', BOX, 0, 0.6, -1.9, 5.6, 0.6, 0.5);
      put('window', BOX, 0, 2.86, -3.72, 4.2, 0.5, 0.1); // sign
      for (let i = 0; i <= 6; i++) put('lamp', BOX, -4.5 + i * 1.5, 3.1, 3.7, 0.16, 0.16, 0.16);
      for (const sx of [-1, 1]) for (let i = 0; i <= 4; i++) put('lamp', BOX, sx * 5.1, 3.1, -3 + i * 1.5, 0.16, 0.16, 0.16);
      put('lamp', BOX, 0, 2.9, -0.6, 0.34, 0.36, 0.34); // a lantern over the grill
      put('poolBeach', DISC, 0, SAND + 0.06, 0, 12, 1, 9);
      // Picnic tables with benches.
      for (const [tx, tz] of [[-7.4, 3.2], [-7.4, -1], [7.6, 2.4], [-2.4, 6.6], [3, 6.8]] as const) {
        const bench = at(x + tx, z + tz, 0);
        bench('wood', BOX, 0, 0.74, 0, 2.2, 0.08, 0.9);
        for (const side of [-1, 1]) {
          bench('wood', BOX, 0, 0.42, side * 0.75, 2.2, 0.07, 0.34);
          for (const end of [-0.8, 0.8]) bench('dark', BOX, end, 0.36, side * 0.4, 0.1, 0.72, 0.1);
          if (random() < 0.7) seats.push({ x: x + tx + (random() - 0.5) * 1.2, y: GROUND + 0.46, z: z + tz + side * 0.75, heading: side > 0 ? Math.PI / 2 : -Math.PI / 2 });
        }
      }
    }

    restaurant(-36, near + 9.4, 'coral', 'coral');
    barbecue(grill.x, grill.z - 0.4);
    restaurant(56, near + 9.4, 'teal', 'teal');

    // The volleyball court: lines in the sand, a net across the middle, and an umpire's chair.
    {
      const put = at(court.x, court.z, 0);
      const { halfLength: L, halfWidth: W } = court;
      // The lines stand a little proud of the sand: laid flush, the two flicker from a distance.
      for (const sz of [-W, W]) put('white', BOX, 0, 0.16, sz, L * 2, 0.05, 0.14);
      for (const sx of [-L, L]) put('white', BOX, sx, 0.16, 0, 0.14, 0.05, W * 2);
      for (const sz of [-W - 0.5, W + 0.5]) put('dark', POST, 0, 1.3, sz, 0.14, 2.6, 0.14);
      put('net', BOX, 0, 1.95, 0, 0.04, 1, W * 2 + 1);
      put('white', BOX, 0, 2.46, 0, 0.06, 0.06, W * 2 + 1);
      put('white', BOX, 0, 1.44, 0, 0.06, 0.06, W * 2 + 1);
      put('wood', BOX, 0, 0.9, -W - 1.5, 0.8, 1.8, 0.8); // umpire's chair
      put('wood', BOX, 0, 2.1, -W - 1.75, 0.8, 0.7, 0.1);
      put('wood', BOX, -L + 3, 0.4, W + 2, 3, 0.1, 0.5); // a bench for whoever is next
      put('wood', BOX, L - 3, 0.4, W + 2, 3, 0.1, 0.5);
      // Two lamp posts on the road side, so the game goes on after dark.
      for (const sx of [-L - 1.2, L + 1.2]) {
        put('dark', POST, sx, 3.2, -W - 1.4, 0.16, 6.4, 0.16);
        put('dark', BOX, sx, 6.4, -W - 0.9, 0.12, 0.12, 1.1);
        put('lamp', BOX, sx, 6.3, -W - 0.5, 0.7, 0.1, 0.5);
      }
      put('poolBeach', DISC, 0, SAND + 0.07, 0, L + 5, 1, W + 5);
    }

    // The beach gym: a rubber mat on the sand, a pull-up frame, parallel bars, a bench with a barbell, a rack.
    {
      const put = at(gym.x, gym.z, 0);
      // A mat with a coloured border, each at its own height: surfaces that share one flicker.
      put('dark', BOX, 0, 0.185, 0, 13, 0.09, 8);
      put('coral', BOX, 0, 0.16, 0, 13.4, 0.04, 8.4);
      // A punch bag on a stand, where the boxer is.
      put('steel', POST, 2.4, 1.3, 0.2, 0.14, 2.6, 0.14);
      put('steel', BOX, 2.4, 0.26, 0.2, 1, 0.08, 1);
      put('steel', BOX, 1.95, 2.56, 0.2, 1, 0.1, 0.1);
      put('dark', POST, 1.5, 2.36, 0.2, 0.03, 0.34, 0.03);
      put('coral', BOX, 1.5, 1.66, 0.2, 0.38, 1.06, 0.38);
      // Pull-up frame: two posts and a bar, at the seaward edge.
      for (const sx of [-1.2, 1.2]) put('steel', POST, -3.6 + sx, 1.4, 2.4, 0.16, 2.8, 0.16);
      put('steel', BOX, -3.6, 2.72, 2.4, 2.7, 0.08, 0.08);
      // Parallel bars.
      for (const sz of [-0.4, 0.4]) {
        put('steel', BOX, 3.4, 1.3, 2.4 + sz, 2.6, 0.08, 0.08);
        for (const sx of [-1.2, 1.2]) put('steel', POST, 3.4 + sx, 0.65, 2.4 + sz, 0.1, 1.3, 0.1);
      }
      // Bench press: bench, uprights, bar and plates.
      put('dark', BOX, -3.4, 0.55, -1.8, 0.6, 0.14, 2);
      for (const sx of [-0.55, 0.55]) put('steel', POST, -3.4 + sx, 0.75, -2.5, 0.1, 1.2, 0.1);
      put('steel', BOX, -3.4, 1.34, -2.5, 2.4, 0.07, 0.07);
      for (const sx of [-1.05, 1.05]) put('dark', BOX, -3.4 + sx, 1.34, -2.5, 0.12, 0.62, 0.62);
      // Dumbbell rack and a pair of kettlebells.
      put('steel', BOX, 3.6, 0.5, -2.8, 3, 0.08, 0.5);
      put('steel', BOX, 3.6, 0.9, -2.8, 3, 0.08, 0.5);
      for (const sx of [-1.3, 1.3]) put('steel', POST, 3.6 + sx, 0.5, -2.8, 0.1, 1, 0.5);
      for (let i = 0; i < 5; i++) {
        put('dark', BOX, 2.5 + i * 0.55, 0.64, -2.8, 0.3, 0.2, 0.44);
        put('dark', BOX, 2.5 + i * 0.55, 1.04, -2.8, 0.26, 0.2, 0.4);
      }
      for (const sx of [0.2, 0.9]) put('dark', BOX, sx, 0.34, -0.4, 0.34, 0.34, 0.34);
      // A frame over the way in, on the boardwalk side.
      for (const sx of [-2, 2]) put('teal', POST, sx, 1.5, -4.2, 0.2, 3, 0.2);
      put('teal', BOX, 0, 3.1, -4.2, 4.6, 0.6, 0.24);
      put('window', BOX, 0, 3.1, -4.34, 3.4, 0.3, 0.06);
      // Lamps on the frame, and one on a post at each seaward corner.
      put('lamp', BOX, 0, 2.74, -4.0, 3.6, 0.08, 0.2);
      for (const sx of [-6.3, 6.3]) {
        put('dark', POST, sx, 2.4, 3.9, 0.14, 4.8, 0.14);
        put('lamp', BOX, sx, 4.74, 3.7, 0.5, 0.1, 0.5);
      }
      put('poolBeach', DISC, 0, 0.3, 0, 10.5, 1, 7.5);
    }

    // The lifeguard's tower, between the court and the water.
    {
      const put = at(-1, SHORE - 6, 0);
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) put('wood', POST, sx * 0.9, 1.2, sz * 0.9, 0.16, 2.4, 0.16);
      put('wood', BOX, 0, 2.45, 0.2, 2.6, 0.12, 3);
      put('white', BOX, 0, 3.3, -0.2, 2.2, 1.6, 1.8);
      put('coral', BOX, 0, 4.2, -0.1, 2.8, 0.18, 2.6);
      put('window', BOX, 0, 3.4, 0.72, 1.5, 0.7, 0.04);
      put('lamp', BOX, 0, 4.02, 1.1, 0.5, 0.12, 0.3);
      put('poolBeach', DISC, 0, SAND + 0.06, 1.2, 5, 1, 5);
      put('wood', BOX, 0, 1.2, 2.3, 0.9, 0.1, 2.9, 0, 0, 0.72); // the ramp
      put('coral', BOX, 1.5, 3.2, 1.4, 0.06, 1.8, 0.06);
      put('sun', BOX, 1.5, 3.8, 1.72, 0.04, 0.5, 0.7); // flag
    }

    // The pier: out over the water at the west end, a lamp at its head.
    {
      const pier = { x: -62, from: SHORE - 4, to: SHORE + 30 };
      world('deck', BOX, pier.x, 0.9, (pier.from + pier.to) / 2, 3.4, 0.16, pier.to - pier.from);
      world('deck', BOX, pier.x, 0.5, pier.from - 1.4, 3.4, 0.16, 3.4, 0, 0, -0.3);
      for (let z = pier.from + 1; z <= pier.to; z += 5.5) for (const sx of [-1.5, 1.5]) world('wood', POST, pier.x + sx, 0.3, z, 0.24, 1.6, 0.24);
      for (const sx of [-1.6, 1.6]) world('wood', BOX, pier.x + sx, 1.5, (pier.from + pier.to) / 2 + 1, 0.08, 0.08, pier.to - pier.from - 2);
      for (let z = pier.from + 1; z <= pier.to; z += 2.75) for (const sx of [-1.6, 1.6]) world('wood', POST, pier.x + sx, 1.24, z, 0.08, 0.56, 0.08);
      world('deck', BOX, pier.x, 0.9, pier.to + 2, 7, 0.16, 5);
      // A lantern on every other rail post.
      for (let z = pier.from + 1; z <= pier.to; z += 5.5) for (const sx of [-1.6, 1.6]) world('lamp', BOX, pier.x + sx, 1.68, z, 0.2, 0.24, 0.2);
      lamp(pier.x - 2.6, pier.to + 2, -Math.PI / 2);
    }

    // Parasols and sunbeds in rows near the water, in the gaps between everything else.
    for (const [from, to] of [[-52, -24], [18, 44], [66, 100], [-108, -72]] as const) {
      for (let x = from; x <= to; x += 6.5) {
        const z = SHORE - 5 - random() * 3;
        const put = at(x + (random() - 0.5), z, (random() - 0.5) * 0.3);
        const canopy = pick(canopies);
        put('white', POST, 0, 1.2, 0, 0.08, 2.4, 0.08);
        put(canopy, BOX, 0, 2.4, 0, 2.8, 0.12, 2.8);
        put(canopy, BOX, 0, 2.55, 0, 1.5, 0.16, 1.5);
        put('lamp', BOX, 0, 2.16, 0, 0.26, 0.26, 0.26); // a lantern under the canopy
        put('poolBeach', DISC, 0, SAND + 0.05, 0, 3.4, 1, 3.4);
        for (const sx of [-1.1, 1.1]) {
          put('white', BOX, sx, 0.4, 0.3, 0.7, 0.1, 1.9);
          put('white', BOX, sx, 0.62, -0.78, 0.7, 0.1, 0.7, 0, 0, 0.7);
          put(canopy, BOX, sx, 0.47, 0.5, 0.6, 0.04, 1.2);
        }
      }
    }
    // Surfboards stood in the sand by the west restaurant, and a rack of them by the east one.
    for (const [bx, bz, key] of [[-25.6, near + 16, 'coral'], [-24.8, near + 16.4, 'sun'], [-24.1, near + 15.8, 'teal'], [45.4, near + 15, 'white'], [46.2, near + 15.5, 'coral']] as const) {
      const put = at(bx, bz, random() * 0.6);
      put(key, BOX, 0, 1.15, 0, 0.5, 2.1, 0.08, 0, 0, -0.12);
    }

    // A path from the crossing opposite the entrance, down the boardwalk steps to the sand.
    world('walk', BOX, 0, 0.03, front.z, 5, 0.07, front.width);
    world('deck', BOX, 0, 0.1, sandFrom + 0.5, 6, 0.2, 1);

    // Palms along the sand's edge, clear of the buildings; lamps along the boardwalk.
    for (let x = -132; x <= 132; x += 11) {
      const blocked = [[-36, 9], [grill.x, 6], [56, 9], [gym.x, 4]].some(([cx, half]) => Math.abs(x - cx) < half);
      if (!blocked) palm(x + (random() - 0.5) * 2, sandFrom + 1.6 + random() * 1.5, 6 + random() * 2);
    }
    for (let x = -120; x <= 120; x += 20) lamp(x + 10, near + BOARDWALK - 0.5, Math.PI);

    // After dark ------------------------------------------------------------------
    //
    // Strings of bulbs the length of the boardwalk, from lamp post to lamp post with a slim
    // pole between each pair; torches along the water's edge; two floodlights over the sand.
    {
      const z = near + BOARDWALK - 0.2;
      for (let x = -120; x <= 120; x += 20) {
        world('dark', POST, x, 1.95, z, 0.1, 3.7, 0.1);
        stringLights([x, 3.72, z], [x + 10, 3.72, z], 7, 0.5);
        if (x > -120) stringLights([x - 10, 3.72, z], [x, 3.72, z], 7, 0.5);
      }
      for (let x = -108; x <= 108; x += 12) {
        if (Math.abs(x + 62) < 5 || Math.abs(x + 1) < 3) continue; // the pier, and the lifeguard's ramp
        torch(x, SHORE - 0.3);
      }
      for (const [fx, fz] of [[-46, sandFrom + 16.2], [20.5, sandFrom + 16.6], [84, sandFrom + 14]] as const) {
        const put = at(fx, fz, 0, GROUND + SAND);
        put('dark', POST, 0, 4.4, 0, 0.2, 8.8, 0.2);
        put('dark', BOX, 0, 8.8, 0, 1.5, 0.14, 0.3);
        for (const sx of [-0.5, 0.5]) put('lamp', BOX, sx, 8.66, 0.25, 0.7, 0.14, 0.5);
        put('poolBeach', DISC, 0, 0.07, 6, 17, 1, 15);
        floods.push({ x: fx, y: GROUND + SAND + 8.4, z: fz + 2 });
      }
    }

    // The party: a fire pit with logs to sit on, a DJ's booth with speakers and a lighting rig,
    // torches at the corners, and bulbs strung from the rig out over the dancing. By day it is
    // all there, unlit and empty; the fire, the lamps and the people are in life.ts.
    {
      const pit = at(fire.x, fire.z, 0, GROUND + SAND);
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        pit('concrete', BOX, Math.cos(angle) * 0.95, 0.13, Math.sin(angle) * 0.95, 0.44, 0.26, 0.44, -angle);
      }
      pit('dark', DISC, 0, 0.03, 0, 0.85, 1, 0.85);
      for (const [turn, tilt] of [[0.3, 0.42], [1.4, -0.42], [2.5, 0.4]] as const) pit('wood', BOX, 0, 0.28, 0, 1.35, 0.16, 0.16, turn, tilt);
      pit('poolBeach', DISC, 0, 0.08, 0, 6.5, 1, 6.5);
      // Three logs round the seaward side, two places on each.
      for (const angle of [0.42, Math.PI / 2, Math.PI - 0.42]) {
        const lx = Math.cos(angle) * 2.9;
        const lz = Math.sin(angle) * 2.9;
        pit('wood', BOX, lx, 0.22, lz, 2.4, 0.44, 0.5, Math.PI / 2 - angle);
        for (const along of [-0.6, 0.6]) {
          logs.push({ x: fire.x + lx - Math.sin(angle) * along, y: GROUND + SAND + 0.44, z: fire.z + lz + Math.cos(angle) * along, heading: Math.PI - angle });
        }
      }

      // The booth faces the sea. A low stage, a table with two decks and a mixer, lights along its front.
      const put = at(booth.x, booth.z, 0, GROUND + SAND);
      put('deck', BOX, 0, 0.12, -0.5, 6.6, 0.24, 3.2);
      put('dark', BOX, 0, 0.8, 0.5, 3.6, 1.1, 0.16);
      put('signPink', BOX, 0, 1.02, 0.6, 3.2, 0.14, 0.06);
      put('signTeal', BOX, 0, 0.62, 0.6, 3.2, 0.14, 0.06);
      put('dark', BOX, 0, 1.38, 0.1, 3.6, 0.08, 0.95);
      for (const sx of [-0.95, 0.95]) {
        put('steel', BOX, sx, 1.47, 0.05, 0.8, 0.1, 0.7);
        put('dark', BOX, sx, 1.535, 0.05, 0.5, 0.03, 0.5);
      }
      put('steel', BOX, 0, 1.47, 0.05, 0.5, 0.1, 0.6);
      // A stack of speakers either side.
      for (const sx of [-3.9, 3.9]) {
        put('dark', BOX, sx, 1.1, 0.5, 1.2, 2.2, 1);
        put('steel', BOX, sx, 1.62, 1.02, 0.66, 0.66, 0.05);
        put('steel', BOX, sx, 0.66, 1.02, 0.86, 0.86, 0.05);
      }
      // The rig: two posts and a beam over the DJ's head, where the coloured lamps hang.
      for (const sx of [-2.9, 2.9]) put('steel', POST, sx, 2.25, -1.3, 0.16, 4.5, 0.16);
      put('steel', BOX, 0, 4.42, -1.3, 6, 0.18, 0.18);
      for (let i = 0; i < 5; i++) rigLamps.push({ x: booth.x - 2.2 + i * 1.1, y: GROUND + SAND + 4.18, z: booth.z - 1.2 });

      // Bulbs in three colours from the ends of the rig to a pole on either side of the fire, and across between the poles.
      const festive = ['lamp', 'signPink', 'lamp', 'signTeal'] as const;
      const top = SAND + 4.4; // heights passed to `world` are above the ground
      const poles = [-1, 1].map((sx) => ({ x: party.x + sx * 7.6, z: party.z + 4.6 }));
      for (const [i, pole] of poles.entries()) {
        world('dark', POST, pole.x, SAND + 2.1, pole.z, 0.12, 4.2, 0.12);
        stringLights([booth.x + (i ? 2.9 : -2.9), top, booth.z - 1.3], [pole.x, SAND + 4.1, pole.z], 11, 0.7, festive);
      }
      stringLights([poles[0].x, SAND + 4.1, poles[0].z], [poles[1].x, SAND + 4.1, poles[1].z], 13, 0.8, festive);
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) torch(party.x + sx * 8.6, party.z + sz * 2.6 - 0.6);
    }
    for (const [px, pz] of [[-46, SHORE - 14], [-22, SHORE - 13], [20, SHORE - 9], [44, SHORE - 15], [70, SHORE - 12], [-80, SHORE - 16], [96, SHORE - 8]] as const) palm(px, pz, 5.5 + random() * 2);
  }

  // Hills at the edge of sight, behind and to the sides.
  for (let i = 0; i < 14; i++) {
    const angle = Math.PI * (1.02 + (i / 13) * 0.96); // from west, round the back, to east
    const distance = 190 + random() * 60;
    const radius = 45 + random() * 40;
    // Each hill is three stepped slabs.
    const hx = Math.cos(angle) * distance;
    const hz = Math.sin(angle) * distance;
    const height = 10 + random() * 16;
    const depth = radius * (0.7 + random() * 0.5);
    for (let step = 0; step < 3; step++) {
      const shrink = 1 - step * 0.3;
      world('hill', BOX, hx, (height / 3) * (step + 0.5), hz, radius * 2 * shrink, height / 3, depth * 2 * shrink);
    }
  }

  // Mountain ranges behind the city: three, each further, higher and paler than the last, from
  // the west round the back to the east. Every peak is a pile of stepped slabs, like the hills.
  for (const [key, distance, low, high, count] of [['ridgeNear', 300, 40, 95, 20], ['ridgeMid', 385, 70, 150, 18], ['ridgeFar', 480, 110, 215, 16]] as const) {
    for (let i = 0; i < count; i++) {
      const angle = Math.PI * (0.94 + (i / (count - 1)) * 1.12) + (random() - 0.5) * 0.05;
      const away = distance + (random() - 0.5) * 50;
      const height = low + random() * (high - low);
      const width = height * (1.5 + random() * 0.9);
      const mx = Math.cos(angle) * away;
      const mz = Math.sin(angle) * away;
      const steps = 5;
      for (let step = 0; step < steps; step++) {
        const shrink = 1 - (step / steps) * 0.82;
        // Turned to face the middle, and each slab nudged a little, so no two peaks are the same shape.
        at(mx, mz, -angle + Math.PI / 2)(key, BOX, (random() - 0.5) * width * 0.12, (height / steps) * (step + 0.5), 0, width * 2 * shrink, height / steps, width * 1.1 * shrink);
      }
    }
  }

  // Merge: one mesh per material.
  const group = new THREE.Group();
  group.name = 'outdoors';
  for (const [key, geometries] of batches) {
    const mesh = new THREE.Mesh(mergeGeometries(geometries, false), materials[key]);
    mesh.name = `outdoors:${key}`;
    if (key === 'pool' || key === 'poolBeach') mesh.renderOrder = 1;
    group.add(mesh);
    for (const geometry of geometries) geometry.dispose();
  }

  // The towers: one mesh for each kind of glass.
  towerKinds.forEach((material, kind) => {
    if (towerParts[kind].length === 0) return;
    const mesh = new THREE.Mesh(mergeGeometries(towerParts[kind], false), material);
    mesh.name = `outdoors:tower-${kind}`;
    group.add(mesh);
    for (const geometry of towerParts[kind]) geometry.dispose();
  });

  // The bands of light on Taipei 101: one mesh, coloured box by box, so the glow can run up it.
  const neon = new THREE.Mesh(mergeGeometries(neonParts, false), new THREE.MeshBasicMaterial({ vertexColors: true }));
  neon.name = 'outdoors:neon';
  for (const geometry of neonParts) geometry.dispose();
  const CORNERS = 36; // of one box, unindexed
  const neonPaint = new THREE.BufferAttribute(new Float32Array(neonLevels.length * CORNERS * 3), 3);
  neon.geometry.setAttribute('color', neonPaint);
  const neonOn = NEON.map((hex) => glow(hex, 1.1));
  const neonOff = new THREE.Color('#5c5e62');
  const neonNow = new THREE.Color();
  /** Colour every band: unlit grey by day; by night its own colour, brighter as each wave passes up the tower. */
  function paintNeon(time: number, lightsOn: number) {
    for (let box = 0; box < neonLevels.length; box++) {
      const level = neonLevels[box];
      const wave = 0.68 + 0.32 * (0.5 + 0.5 * Math.sin(time * 1.5 - level * 0.75));
      neonNow.copy(neonOn[level]).multiplyScalar(wave).lerp(neonOff, 1 - lightsOn);
      for (let corner = 0; corner < CORNERS; corner++) neonPaint.setXYZ(box * CORNERS + corner, neonNow.r, neonNow.g, neonNow.b);
    }
    neonPaint.needsUpdate = true;
  }
  paintNeon(0, 0);
  group.add(neon);

  // A few stars, for when the camera is low enough to see the sky.
  let stars: THREE.Points | null = null;
  {
    const count = 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const azimuth = random() * Math.PI * 2;
      const elevation = Math.asin(0.1 + random() * 0.9);
      positions.set([Math.cos(azimuth) * Math.cos(elevation) * 620, Math.sin(elevation) * 620, Math.sin(azimuth) * Math.cos(elevation) * 620], i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    stars = new THREE.Points(geometry, new THREE.PointsMaterial({ color: PALETTE.steel, size: 1.4, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.7 }));
    stars.name = 'stars';
    group.add(stars);
  }

  // Moving cars: two along the front road, one up the east side. Slow, and a long way apart.
  const UNIT = new THREE.BoxGeometry(1, 1, 1);
  const headlight = lit(glow('#fff1d6', 1));
  const taillight = lit(glow(PALETTE.ember, 0.8));
  function movingCar(body: THREE.Material): THREE.Group {
    const car = new THREE.Group();
    const part = (material: THREE.Material, w: number, h: number, d: number, x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(UNIT, material);
      mesh.scale.set(w, h, d);
      mesh.position.set(x, y, z);
      car.add(mesh);
    };
    part(body, 4.1, 0.7, 1.8, 0, 0.62, 0);
    part(materials.dark, 2.2, 0.55, 1.6, -0.2, 1.2, 0);
    part(materials.dark, 3.4, 0.4, 1.9, 0, 0.2, 0);
    for (const sz of [-0.6, 0.6]) {
      part(headlight, 0.06, 0.16, 0.36, 2.06, 0.66, sz);
      part(taillight, 0.06, 0.14, 0.36, -2.06, 0.7, sz);
    }
    group.add(car);
    return car;
  }
  const lane = 1.7;
  const sideLane = 1.5;
  /** The third car comes west along the coast road, then turns north up the east side road. */
  const corner = REACH - (side.x + sideLane);
  const traffic = [
    { car: movingCar(materials.carC), speed: 7.5, offset: 40, place: (car: THREE.Group, s: number) => car.position.set(s, GROUND, front.z + lane) },
    { car: movingCar(materials.carA), speed: 6.2, offset: 190, place: (car: THREE.Group, s: number) => car.position.set(-s, GROUND, front.z - lane) },
    {
      car: movingCar(materials.carB),
      speed: 6.8,
      offset: 110,
      place: (car: THREE.Group, s: number) => {
        const along = s + REACH;
        if (along < corner) {
          car.position.set(REACH - along, GROUND, front.z - lane);
          car.rotation.y = Math.PI;
        } else {
          car.position.set(side.x + sideLane, GROUND, front.z - lane - (along - corner));
          car.rotation.y = Math.PI / 2;
        }
      },
    },
  ];
  traffic[1].car.rotation.y = Math.PI;

  // People, scooters and surf.
  const life = buildLife(group, {
    ground: GROUND,
    reach: REACH,
    front: front.z,
    back: back.z,
    side: side.x,
    boardwalk: { from: near + 0.9, to: near + BOARDWALK - 1.2 },
    sand: { from: sandFrom + 17, to: SHORE - 1 },
    shore: SHORE,
    court,
    pullUp: { x: gym.x - 3.6, z: gym.z + 2.4, bar: 2.72 },
    mat: { x: gym.x + 0.4, z: gym.z + 0.4 },
    grill: { x: grill.x, z: grill.z },
    seats,
    party: { x: party.x, z: party.z, dj: { x: booth.x, y: GROUND + SAND + 0.24, z: booth.z - 0.75 }, fire, logs, lamps: rigLamps },
    poolMap: materials.pool.map!,
    lean: LEAN,
  });

  // Floodlights over the sand: real lights, so the beach and the people on it can be seen after
  // dark. Phones do without them, and keep the pools of light painted on the sand.
  const floodLights = LEAN
    ? []
    : floods.map((at) => {
        const light = new THREE.PointLight('#ffd2a0', 0, 70, 1.5);
        light.position.set(at.x, at.y, at.z);
        light.visible = false;
        group.add(light);
        return light;
      });
  const FLOOD = 46;

  scene.add(group);

  // What the lit things look like with the lights on, and with them off.
  const fades: Array<{ material: THREE.MeshBasicMaterial; on: THREE.Color; off: THREE.Color }> = [
    { material: materials.window, on: materials.window.color.clone(), off: new THREE.Color('#2c3c4c') },
    { material: materials.lamp, on: materials.lamp.color.clone(), off: new THREE.Color('#4a4640') },
    { material: headlight, on: headlight.color.clone(), off: new THREE.Color('#6a6a70') },
    { material: taillight, on: taillight.color.clone(), off: new THREE.Color('#4a1a14') },
    { material: materials.signPink, on: materials.signPink.color.clone(), off: new THREE.Color('#8a3a5c') },
    { material: materials.signTeal, on: materials.signTeal.color.clone(), off: new THREE.Color('#3a7f7a') },
    { material: materials.flame, on: materials.flame.color.clone(), off: new THREE.Color('#3a2c22') },
  ];
  let lightsNow = 0;
  let neonLit = false;

  return {
    setDaylight(daylight) {
      // Lights come on a little before it is fully dark.
      const lightsOn = 1 - THREE.MathUtils.smoothstep(daylight, 0.25, 0.7);
      for (const { material, on, off } of fades) material.color.lerpColors(off, on, lightsOn);
      materials.pool.opacity = 0.16 * lightsOn;
      materials.poolBeach.opacity = 0.2 * lightsOn;
      for (const material of towerKinds) material.emissiveIntensity = 0.62 * lightsOn; // the offices light up, without outshining the office
      // The floodlights come on with the office's own lamps (so the renderer rebuilds its shaders once, not twice).
      for (const light of floodLights) {
        light.visible = daylight < 0.96;
        light.intensity = FLOOD * lightsOn;
      }
      // Taipei 101 itself is floodlit: its green glass glows a little after dark.
      materials.jade.emissive.set('#1c7a74').multiplyScalar(0.5 * lightsOn);
      materials.jadeDark.emissive.set('#125e5a').multiplyScalar(0.5 * lightsOn);
      lightsNow = lightsOn;
      life.setNight(lightsOn);
      if (stars) (stars.material as THREE.PointsMaterial).opacity = 0.7 * (1 - THREE.MathUtils.smoothstep(daylight, 0, 0.4));
    },
    update(time) {
      for (const { car, speed, offset, place } of traffic) {
        // Each car runs the length of its road and comes round again.
        const s = ((time * speed + offset) % (REACH * 2)) - REACH;
        place(car, s);
      }
      // Taipei 101's bands: alive while they are lit, painted grey once when they go out.
      if (lightsNow > 0.01) {
        paintNeon(time, lightsNow);
        neonLit = true;
      } else if (neonLit) {
        paintNeon(0, 0);
        neonLit = false;
      }
      life.update(time);
    },
  };
}
