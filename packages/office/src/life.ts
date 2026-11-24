/**
 * SC45 AI Office: the life outside.
 *
 * People strolling the boardwalk and the sand, a game of volleyball, the regulars at the
 * beach gym, diners at the tables, surfers riding the swell in and paddling back out, scooters on the roads, smoke off the grill,
 * surf rolling in, a couple of boats out on the water, and gulls crossing the bay.
 *
 * After dark the gulls go home and there is a party on the sand: a fire, a DJ, coloured
 * lights and a crowd dancing. They walk down as the light goes and leave at dawn.
 *
 * Every moving thing here is made of boxes, and every box is one instance of a single
 * InstancedMesh: the whole lot is one draw call, re-posed each frame. Things that give off
 * light (flames, the party's lamps) are a second one, and the pools of colour on the sand a third.
 */
import * as THREE from 'three';

/** Somewhere to sit: the top of the seat, and which way the sitter faces. */
export interface Seat {
  x: number;
  y: number;
  z: number;
  heading: number;
}

export interface LifePlan {
  /** Height of the ground outside. */
  ground: number;
  /** Half the length of the roads. */
  reach: number;
  /** Centre lines of the coast road, the back road (z) and the east side road (x). */
  front: number;
  back: number;
  side: number;
  /** The strips people walk along, as z ranges. */
  boardwalk: { from: number; to: number };
  sand: { from: number; to: number };
  /** Where the dry sand ends. */
  shore: number;
  court: { x: number; z: number; halfLength: number; halfWidth: number };
  pullUp: { x: number; z: number; bar: number };
  mat: { x: number; z: number };
  grill: { x: number; z: number };
  seats: Seat[];
  /** The beach party: the middle of the dancing, where the DJ stands, the fire, the logs round it, and the lamps on the rig. */
  party: {
    x: number;
    z: number;
    dj: { x: number; y: number; z: number };
    fire: { x: number; z: number };
    logs: Seat[];
    lamps: Array<{ x: number; y: number; z: number }>;
  };
  /** A soft round falloff, for pools of light on the sand. */
  poolMap: THREE.Texture;
  /** Only the fire lights the sand, not the DJ's lamps as well: for phones. */
  lean: boolean;
}

export interface Life {
  update(time: number): void;
  /** 0 by day, 1 once it is dark: the gulls leave and the party starts. */
  setNight(level: number): void;
}

const SKIN = ['#c99a74', '#a8744e', '#75492e', '#d4ae8a', '#8e5f40'];
const TOPS = ['#b8443a', '#2f78b0', '#c9a02a', '#c8c4b8', '#2a9068', '#7560cc', '#d0652a', '#27303c', '#c05a84'];
const BOTTOMS = ['#27323f', '#34507c', '#b3a583', '#6a2a26', '#1e5f5c', '#3c3c44'];
const HAIR = ['#1a1410', '#2e1c12', '#5a3e1e', '#a8843c', '#4a4a4e'];
const SCOOTERS = ['#b8443a', '#c9a02a', '#2a9068', '#c8c4b8', '#2f78b0', '#d0652a'];
const DARK = '#1c1c22';

const CAPACITY = 860;

export function buildLife(parent: THREE.Object3D, plan: LifePlan): Life {
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ roughness: 1, metalness: 0, flatShading: true }),
    CAPACITY,
  );
  mesh.name = 'life';
  // The instances are spread over the whole coast: culling by the unit box's bounds would hide them all.
  mesh.frustumCulled = false;

  let seed = 45;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pick = <T>(items: readonly T[]): T => items[Math.floor(random() * items.length)];
  const between = (from: number, to: number) => from + random() * (to - from);

  const color = new THREE.Color();
  let used = 0;
  /** Take the next few instances, coloured as given; returns the first one's index. */
  function claim(colors: string[]): number {
    const first = used;
    for (const hex of colors) {
      if (used >= CAPACITY) throw new Error('life: out of instances');
      mesh.setColorAt(used++, color.set(hex));
    }
    return first;
  }

  // Posing ------------------------------------------------------------------

  const root = new THREE.Matrix4();
  const matrix = new THREE.Matrix4();
  const hinge = new THREE.Matrix4();
  const vector = new THREE.Vector3();

  /** Everything placed after this is local to (x, y, z), facing `heading` (0 is +x). */
  function stand(x: number, y: number, z: number, heading: number, scale = 1) {
    root.makeRotationY(heading).scale(vector.set(scale, scale, scale)).setPosition(x, y, z);
  }
  function box(index: number, px: number, py: number, pz: number, sx: number, sy: number, sz: number) {
    matrix.makeScale(sx, sy, sz).setPosition(px, py, pz).premultiply(root);
    mesh.setMatrixAt(index, matrix);
  }
  /** A limb hanging from (hx, hy, hz), swung forward by `angle`. */
  function limb(index: number, hx: number, hy: number, hz: number, angle: number, length: number, thickness: number) {
    matrix.makeTranslation(0, -length / 2, 0).scale(vector.set(thickness, length, thickness));
    matrix.premultiply(hinge.makeRotationZ(angle)).premultiply(hinge.makeTranslation(hx, hy, hz)).premultiply(root);
    mesh.setMatrixAt(index, matrix);
  }
  function hide(index: number, count = 1) {
    matrix.makeScale(0, 0, 0);
    for (let i = 0; i < count; i++) mesh.setMatrixAt(index + i, matrix);
  }
  /** A box turned about the x axis by `angle`: a slope facing the beach or the sea. */
  function slab(index: number, px: number, py: number, pz: number, sx: number, sy: number, sz: number, angle: number) {
    matrix.makeRotationX(angle).scale(vector.set(sx, sy, sz)).setPosition(px, py, pz).premultiply(root);
    mesh.setMatrixAt(index, matrix);
  }

  // Things that shine: flames, sparks, the lamps on the DJ's rig, glow sticks. Unlit, so they
  // are as bright at midnight as at noon; the whole mesh is hidden by day.
  const GLOW_CAPACITY = 40;
  const glow = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial(), GLOW_CAPACITY);
  glow.name = 'life-glow';
  glow.frustumCulled = false;
  let glowUsed = 0;
  function claimGlow(count: number): number {
    const first = glowUsed;
    if (glowUsed + count > GLOW_CAPACITY) throw new Error('life: out of glowing instances');
    glowUsed += count;
    return first;
  }
  function glowBox(index: number, px: number, py: number, pz: number, sx: number, sy: number, sz: number) {
    matrix.makeScale(sx, sy, sz).setPosition(px, py, pz).premultiply(root);
    glow.setMatrixAt(index, matrix);
  }

  interface Person {
    at: number;
    scale: number;
  }
  function person(scale = 1, top = pick(TOPS)): Person {
    const skin = pick(SKIN);
    const bottom = pick(BOTTOMS);
    // torso, head, hair, two legs, two arms. Short sleeves: bare arms.
    return { at: claim([top, skin, pick(HAIR), bottom, bottom, skin, skin]), scale };
  }
  /** Pose a person standing at (x, y, z). Angles swing each limb forward; π is straight up. */
  function pose(who: Person, x: number, y: number, z: number, heading: number, legLeft: number, legRight: number, armLeft: number, armRight: number) {
    const i = who.at;
    stand(x, y, z, heading, who.scale);
    box(i, 0, 1.12, 0, 0.26, 0.6, 0.5);
    box(i + 1, 0, 1.6, 0, 0.34, 0.34, 0.34);
    // Hair: a cap over the top and back of the head. It stops short of the face, so the two never share a surface.
    box(i + 2, -0.05, 1.79, 0, 0.36, 0.1, 0.4);
    limb(i + 3, 0, 0.84, -0.13, legLeft, 0.84, 0.21);
    limb(i + 4, 0, 0.84, 0.13, legRight, 0.84, 0.21);
    limb(i + 5, 0, 1.4, -0.33, armLeft, 0.58, 0.15);
    limb(i + 6, 0, 1.4, 0.33, armRight, 0.58, 0.15);
  }

  /** Back and forth between 0 and 1; also which way it is currently going. */
  function pingPong(value: number): { at: number; forward: boolean } {
    const phase = ((value % 2) + 2) % 2;
    return phase < 1 ? { at: phase, forward: true } : { at: 2 - phase, forward: false };
  }

  const { ground } = plan;

  // Walkers -----------------------------------------------------------------

  interface Walker {
    who: Person;
    /** Walks along x between `from` and `to` at a fixed z, or along z at a fixed x. */
    along: 'x' | 'z';
    fixed: number;
    from: number;
    to: number;
    speed: number;
    phase: number;
    y: number;
  }
  const walkers: Walker[] = [];
  const deckY = ground + 0.2;
  const sandY = ground + 0.14;
  for (let i = 0; i < 7; i++) {
    const from = between(-110, -20);
    walkers.push({ who: person(), along: 'x', fixed: between(plan.boardwalk.from, plan.boardwalk.to), from, to: from + between(60, 130), speed: between(1, 1.5), phase: random() * 2, y: deckY });
  }
  for (let i = 0; i < 8; i++) {
    const from = between(-90, -10);
    walkers.push({ who: person(), along: 'x', fixed: between(plan.sand.from, plan.sand.to), from, to: from + between(50, 110), speed: between(0.9, 1.35), phase: random() * 2, y: sandY });
  }
  // A runner on the boardwalk, a child tearing about on the sand, and two people going down to the water and back.
  walkers.push({ who: person(1, '#c8c4b8'), along: 'x', fixed: plan.boardwalk.to, from: -120, to: 120, speed: 3.3, phase: 0.3, y: deckY });
  walkers.push({ who: person(0.62), along: 'x', fixed: plan.sand.to - 2, from: -8, to: 22, speed: 2.5, phase: 1.1, y: sandY });
  walkers.push({ who: person(), along: 'z', fixed: 2.5, from: plan.boardwalk.to + 2, to: plan.shore + 1.5, speed: 1.1, phase: 0.2, y: sandY });
  walkers.push({ who: person(), along: 'z', fixed: 46, from: plan.boardwalk.to + 14, to: plan.shore + 1, speed: 1, phase: 1.4, y: sandY });

  // A dog trotting beside the first of the beach walkers.
  const dog = { at: claim(['#6a4a2a', '#6a4a2a', '#4a3018', '#4a3018', '#4a3018', '#4a3018', '#4a3018']), owner: walkers[7] };

  // Surfers: one to each line of swell. Each stands up and rides its wave in, then paddles back out for the next.
  // The boards are bright, so they show against the water; each throws up a little spray when it is ridden.
  const surfers = [0, 1, 2].map((line) => ({
    who: person(1, pick(['#27303c', '#2f78b0', '#b8443a'])),
    board: claim([['#e8e4d6', '#e0b02a', '#e0702a'][line]]),
    spray: claim(['#eef4f4', '#eef4f4', '#eef4f4']),
    line,
    way: line % 2 ? -1 : 1,
  }));

  // Volleyball --------------------------------------------------------------

  const { court } = plan;
  const players = [
    { who: person(1, '#b8443a'), x: court.x - 4.6, z: court.z - 1.8, heading: 0 },
    { who: person(1, '#2f78b0'), x: court.x + 4.6, z: court.z + 1.7, heading: Math.PI },
    { who: person(1, '#b8443a'), x: court.x - 3.4, z: court.z + 2, heading: 0 },
    { who: person(1, '#2f78b0'), x: court.x + 3.5, z: court.z - 2.1, heading: Math.PI },
  ];
  const ball = claim(['#d8cf8a']);
  const RALLY = 1.9; // seconds from one pair of hands to the next

  // The gym -----------------------------------------------------------------

  const puller = person(1, '#27303c');
  // The one in the middle presses a barbell overhead: the bar and its two plates move with his hands.
  const lifter = person(1, '#c9a02a');
  const barbell = claim(['#6c7078', DARK, DARK]);
  const boxer = person(1, '#2a9068');

  // Diners ------------------------------------------------------------------

  const diners = plan.seats.slice(0, 20).map((seat, i) => ({ who: person(), seat, phase: i * 1.7 }));

  // Smoke off the grill -----------------------------------------------------

  const smoke = claim(['#8e8e92', '#9a9a9e', '#8e8e92', '#a4a4a8', '#9a9a9e']);

  // Scooters ----------------------------------------------------------------

  interface Scooter {
    at: number;
    /** Runs the length of a road: along x at a fixed z, in direction `sign`. */
    z: number;
    sign: 1 | -1;
    speed: number;
    offset: number;
  }
  function scooter(z: number, sign: 1 | -1, speed: number, offset: number): Scooter {
    const paint = pick(SCOOTERS);
    const skin = pick(SKIN);
    const top = pick(TOPS);
    const bottom = pick(BOTTOMS);
    return {
      // footboard, rear body, seat, shield, handlebar, headlight, two wheels; then the rider: torso, head, helmet, legs, arms.
      at: claim([paint, paint, DARK, paint, DARK, '#d8d0a8', DARK, DARK, top, skin, pick(SCOOTERS), bottom, bottom, top, top]),
      z,
      sign,
      speed,
      offset,
    };
  }
  const scooters = [
    scooter(plan.front + 0.45, 1, 10.5, 20),
    scooter(plan.front + 0.45, 1, 8.6, 170),
    scooter(plan.front - 0.45, -1, 11.4, 90),
    scooter(plan.front - 0.45, -1, 9.2, 240),
    scooter(plan.back + 1, 1, 9.8, 130),
    scooter(plan.back - 1, -1, 10.8, 60),
  ];

  // Surf and boats ----------------------------------------------------------

  const SEGMENTS = 14;
  /** Foam lapping at the sand, and swells further out that roll in and fade. */
  const foam = [0, 1].map((line) => ({ at: claim(Array.from({ length: SEGMENTS }, () => '#d4dcdc')), line }));
  const swells = [0, 1, 2].map((line) => ({
    at: claim(Array.from({ length: SEGMENTS }, () => '#5aa6c0')),
    // The face of the wave: a slope down to the flat water on the beach side, which is what a surfer rides.
    face: claim(Array.from({ length: SEGMENTS }, () => '#6cb4cc')),
    crest: claim(Array.from({ length: SEGMENTS }, () => '#dfe8e8')),
    line,
  }));
  const boats = [
    { at: claim(['#c8c4b8', '#8a5a34', '#d8d4c8', '#b8443a']), z: plan.shore + 58, speed: 0.9, offset: 40 },
    { at: claim(['#2f78b0', '#8a5a34', '#d8d4c8', '#c9a02a']), z: plan.shore + 84, speed: -0.6, offset: 150 },
  ];

  // Gulls --------------------------------------------------------------------
  //
  // Ten of them, white, in two loose lines over the water: one crossing the bay from left to
  // right, the other, further out and higher, from right to left. They keep to the sea, and
  // at dusk they go home. Each is a body and two wings that beat.
  interface Bird {
    at: number;
    /** Where it is at a given time, and which way it is heading. */
    fly(time: number): { x: number; y: number; z: number; heading: number };
    beat: number;
    size: number;
  }
  const birds: Bird[] = [];
  const HALF_PI = Math.PI / 2;
  const BAY = 360; // from out of sight at one end to out of sight at the other
  for (const flock of [
    { way: 1, speed: 8.5, offset: 60, z: plan.shore + 13, height: 10.5 },
    { way: -1, speed: 7.4, offset: 215, z: plan.shore + 25, height: 14.5 },
  ]) {
    for (let k = 0; k < 5; k++) {
      // Each trails the one ahead by a few metres, a little to one side and not quite level.
      const behind = k * 3.4 + between(-0.6, 0.6);
      const aside = between(-1.6, 1.6);
      const above = between(-0.7, 0.7);
      const drift = random() * 6;
      birds.push({
        at: claim(['#e2e2dc', '#c6c9cc', '#c6c9cc']),
        beat: random() * 6,
        size: 1.25,
        fly: (time) => {
          const along = ((time * flock.speed + flock.offset - behind + BAY * 4) % BAY) - BAY / 2;
          return {
            x: along * flock.way,
            y: ground + flock.height + above + Math.sin(time * 0.31 + flock.offset) * 1.6 + Math.sin(time * 0.9 + drift) * 0.25,
            z: flock.z + aside + Math.sin(time * 0.17 + flock.offset) * 3.5,
            heading: flock.way > 0 ? 0 : Math.PI,
          };
        },
      });
    }
  }

  // The party ----------------------------------------------------------------
  //
  // Once it is dark: a fire, a DJ behind the booth, a dozen people dancing in front of it and a
  // few sitting on the logs round the fire. They come down from the barbecue as night falls,
  // and go back the way they came at dawn. The booth, the logs and the fire pit are scenery
  // (outdoors.ts); what moves and what shines is here.
  const { party } = plan;
  interface Guest {
    who: Person;
    size: number;
    /** Where they come from, the corner they turn at (clear of the speakers), and where they end up. */
    from: { x: number; z: number };
    via: { x: number; z: number };
    spot: { x: number; z: number };
    heading: number;
    phase: number;
    /** How they dance: jumping with both arms up, swaying, or turning with one arm in the air. */
    style: number;
    /** When they set off, as a share of the time it takes the party to gather. */
    order: number;
    /** Sitting on a log, not dancing. */
    seat?: Seat;
    /** A glow stick in one hand. */
    stick?: number;
  }
  const guests: Guest[] = [];
  const STICKS = ['#ff4fa3', '#3fe0d0', '#ffd21e', '#7cff6a', '#8b7cff', '#ff8a1e'];
  const sticks: Array<{ at: number; hex: string }> = [];
  /** They come round whichever end of the booth is nearer to where they are going. */
  const way = (spot: { x: number; z: number }) => {
    const side = spot.x < party.x ? -1 : 1;
    return { from: { x: party.x + side * between(7.6, 10.4), z: party.dj.z - between(0.6, 3) }, via: { x: party.x + side * between(6.4, 7.4), z: party.dj.z + between(2.6, 3.4) } };
  };
  for (let i = 0; i < 12; i++) {
    // Rows across the sand in front of the booth, nobody quite in line.
    const spot = { x: party.x + ((i % 4) - 1.5) * 2.5 + between(-0.7, 0.7), z: party.z - 2.2 + Math.floor(i / 4) * 2.1 + between(-0.5, 0.5) };
    const who = person(between(0.94, 1.04));
    const guest: Guest = { who, size: who.scale, ...way(spot), spot, heading: HALF_PI + between(-0.7, 0.7), phase: random() * 6, style: i % 3, order: random() };
    if (i % 2 === 0) {
      guest.stick = claimGlow(1);
      sticks.push({ at: guest.stick, hex: STICKS[(i / 2) % STICKS.length] });
    }
    guests.push(guest);
  }
  for (const seat of party.logs.slice(0, 4)) {
    const who = person();
    const spot = { x: seat.x, z: seat.z };
    guests.push({ who, size: who.scale, ...way(spot), spot, heading: seat.heading, phase: random() * 6, style: 0, order: random(), seat });
  }
  const dj = person(1, '#27303c');

  // The fire: flames that flicker and sparks that go up; and the lamps on the rig over the booth.
  const FLAMES = ['#ff6a1e', '#ff8a1e', '#ffb02e', '#ff7a1e', '#ffd86a', '#ff9a2e', '#ffe08a'];
  const flames = claimGlow(FLAMES.length);
  const SPARKS = 6;
  const sparks = claimGlow(SPARKS);
  const rig = claimGlow(party.lamps.length);
  for (let i = 0; i < GLOW_CAPACITY; i++) glow.setColorAt(i, color.set('#000000'));
  FLAMES.forEach((hex, i) => glow.setColorAt(flames + i, color.set(hex).multiplyScalar(1.5)));
  for (let i = 0; i < SPARKS; i++) glow.setColorAt(sparks + i, color.set('#ffc45a').multiplyScalar(1.6));
  for (const stick of sticks) glow.setColorAt(stick.at, color.set(stick.hex).multiplyScalar(1.5));
  glow.count = glowUsed;
  matrix.makeScale(0, 0, 0);
  for (let i = 0; i < glowUsed; i++) glow.setMatrixAt(i, matrix);
  glow.visible = false;
  parent.add(glow);

  // Pools of colour that wander over the sand where people are dancing.
  const SWEEPS = 5;
  const sweeps = new THREE.InstancedMesh(
    new THREE.CircleGeometry(1, 20).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: plan.poolMap, transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending, depthWrite: false }),
    SWEEPS,
  );
  sweeps.name = 'life-sweeps';
  sweeps.frustumCulled = false;
  sweeps.renderOrder = 1;
  sweeps.visible = false;
  for (let i = 0; i < SWEEPS; i++) sweeps.setColorAt(i, color.set('#000000'));
  parent.add(sweeps);

  // Real light on the sand and the dancers: the fire, and (not on phones) the colour off the rig.
  const fireLight = new THREE.PointLight('#ff8a3c', 0, 44, 1.5);
  fireLight.position.set(party.fire.x, ground + 2.3, party.fire.z);
  fireLight.visible = false;
  parent.add(fireLight);
  const rigLight = plan.lean ? null : new THREE.PointLight('#ff4fa3', 0, 30, 1.5);
  if (rigLight) {
    rigLight.position.set(party.x, ground + 4.6, party.z - 1.5);
    rigLight.visible = false;
    parent.add(rigLight);
  }

  /** People walking the sand go round the party, not through the booth or the fire. */
  const keepOut = { x: party.x, half: 8.5, run: 14, from: party.dj.z - 1.4, to: party.fire.z + 3.8 };
  function roundParty(x: number, z: number): number {
    if (z <= keepOut.from || z >= keepOut.to) return z;
    const t = THREE.MathUtils.clamp((keepOut.half + keepOut.run - Math.abs(x - keepOut.x)) / keepOut.run, 0, 1);
    if (t <= 0) return z;
    // To whichever side is nearer; and those who were walking further in pass a little further out,
    // so that they go by side by side and not all down one line.
    const middle = (keepOut.from + keepOut.to) / 2;
    const inside = Math.abs(z - middle) / ((keepOut.to - keepOut.from) / 2);
    const edge = z < middle ? keepOut.from - (1 - inside) * 1.2 : keepOut.to + (1 - inside) * 1.2;
    return z + (edge - z) * t * t * (3 - 2 * t);
  }

  mesh.count = used;
  for (let i = 0; i < used; i++) hide(i);
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  parent.add(mesh);

  /** The swell: each line starts `far` out from the shore, rolls `run` metres in, and starts again. */
  const SWELL = { far: 34, run: 30, speed: 1.3 };
  /** The part of its run in which a wave is steep enough to ride. */
  const RIDE = { from: 5, to: 22 };
  /** The face of a wave: it starts this far in front of the wave's middle, and runs this far down to the water. */
  const FACE = { from: 1.05, depth: 1.9 };
  /**
   * Where a wave's foot is: a little under the surface of the sea (which is 0.09 above the ground).
   * A wave grows up through the water from there, so its top is never level with the sea, where
   * the two would flicker; and below a hand's height it is not drawn at all.
   */
  const FOOT = ground + 0.05;
  const SHOWS = 0.07;
  function swellAt(time: number, line: number): { travel: number; z: number; height: number } {
    const travel = (time * SWELL.speed + line * (SWELL.run / 3)) % SWELL.run;
    // It stands up as it comes in, is tallest two-thirds of the way, and falls flat at the sand.
    // It starts and ends at nothing: a wave that jumped back out to sea while still showing would be seen to jump.
    const height = Math.sin(Math.min(1, travel / (SWELL.run * 0.66)) * HALF_PI) * Math.min(1, (SWELL.run - travel) / 5) * 0.67;
    return { travel, z: plan.shore + SWELL.far - travel, height };
  }

  /** How dark it is (0..1), as last told; and how far the party has gathered, which follows it slowly. */
  let night = 0;
  let gathered = -1; // not yet known: the first frame starts wherever the time of day says
  /** How far out the surfers are: 1 surfing, 0 gone home. Follows the light, over ten seconds. */
  let afloat = -1;
  let last = 0;
  const hue = new THREE.Color();
  const GATHER_SECONDS = 12;
  /** How strong the fire and the rig are as lights on the sand and the people. */
  const FIRE_LIGHT = 20;
  const RIG_LIGHT = 34;
  const smooth = (value: number, from: number, to: number) => THREE.MathUtils.smoothstep(value, from, to);

  return {
    setNight(level) {
      night = THREE.MathUtils.clamp(level, 0, 1);
    },
    update(clock) {
      // The first frame can arrive before the clock has a value.
      const time = Number.isFinite(clock) ? Math.max(clock, 0) : 0;
      const step = THREE.MathUtils.clamp(time - last, 0, 0.1);
      last = time;
      // People take a while to arrive and to leave, however fast the sky changes.
      const wanted = night > 0.55 ? 1 : 0;
      gathered = gathered < 0 ? wanted : THREE.MathUtils.clamp(gathered + Math.sign(wanted - gathered) * (step / GATHER_SECONDS), 0, 1);

      // Walkers.
      for (const walker of walkers) {
        const length = walker.to - walker.from;
        const { at, forward } = pingPong((time * walker.speed) / length + walker.phase);
        const position = walker.from + at * length;
        const stride = Math.sin(time * walker.speed * 2.6 + walker.phase * 9) * Math.min(0.75, 0.42 + walker.speed * 0.1);
        const x = walker.along === 'x' ? position : walker.fixed;
        let z = walker.along === 'x' ? walker.fixed : position;
        let heading = walker.along === 'x' ? (forward ? 0 : Math.PI) : forward ? -HALF_PI : HALF_PI;
        if (walker.along === 'x' && walker.y === sandY) {
          // Round the party, turning to face the way they are actually going.
          const ahead = forward ? 0.4 : -0.4;
          z = roundParty(x, walker.fixed);
          heading = Math.atan2(-(roundParty(x + ahead, walker.fixed) - z), ahead);
        }
        pose(walker.who, x, walker.y, z, heading, stride, -stride, -stride * 0.8, stride * 0.8);
        if (walker === dog.owner) {
          // The dog keeps a little to one side and a little ahead.
          const ahead = forward ? 1 : -1;
          stand(x + ahead * 0.9, walker.y, z + 0.8, heading, 1);
          const trot = Math.sin(time * 9) * 0.5;
          box(dog.at, 0, 0.42, 0, 0.7, 0.26, 0.26);
          box(dog.at + 1, 0.42, 0.56, 0, 0.26, 0.24, 0.24);
          limb(dog.at + 2, -0.36, 0.52, 0, -2.2 + Math.sin(time * 7) * 0.3, 0.28, 0.07);
          limb(dog.at + 3, 0.24, 0.32, -0.09, trot, 0.32, 0.08);
          limb(dog.at + 4, 0.24, 0.32, 0.09, -trot, 0.32, 0.08);
          limb(dog.at + 5, -0.24, 0.32, -0.09, -trot, 0.32, 0.08);
          limb(dog.at + 6, -0.24, 0.32, 0.09, trot, 0.32, 0.08);
        }
      }

      // Surfers. While its swell is rolling in, each stands side-on on the board, knees bent, part
      // of the way down the face of the wave and ahead of the white water, so board, rider and
      // wave are all in view; when the wave is spent it sits low and paddles back out in time
      // to meet the next one.
      // Nobody surfs in the dark: as the light goes they paddle in and leave the water, and at
      // first light they paddle back out.
      afloat = THREE.MathUtils.clamp(afloat < 0 ? (night < 0.3 ? 1 : 0) : afloat + (night < 0.3 ? 1 : -1) * (step / 10), 0, 1);
      const offshore = afloat * afloat * (3 - 2 * afloat);
      for (const surfer of surfers) {
        if (afloat <= 0) {
          hide(surfer.who.at, 7);
          hide(surfer.board);
          hide(surfer.spray, 3);
          continue;
        }
        const wave = swellAt(time, surfer.line);
        const riding = afloat >= 1 && wave.travel > RIDE.from && wave.travel < RIDE.to;
        const middle = -21 + surfer.line * 11; // the middle of one stretch of that swell
        surfer.who.scale = Math.min(1, afloat * 5);
        if (riding) {
          const along = (wave.travel - RIDE.from) / (RIDE.to - RIDE.from);
          const x = middle + surfer.way * (along - 0.5) * 16;
          // Where on the face: a little above half way down, carving up and down it as it goes.
          const down = 0.52 + Math.sin(time * 1.1 + surfer.line * 2) * 0.14;
          const z = wave.z - FACE.from - FACE.depth * down;
          const y = FOOT + wave.height * (1 - down) + 0.12;
          const slope = Math.atan2(wave.height, FACE.depth);
          const lean = Math.sin(time * 2.3 + surfer.line) * 0.12;
          // The board points along the wave and lies on its slope, nose a touch up.
          stand(x, y, z, 0);
          slab(surfer.board, 0, 0, 0, 2.5, 0.09, 0.62, -slope);
          // Spray off the tail, behind the way it is going.
          for (let i = 0; i < 3; i++) {
            const puff = (time * 2.6 + i / 3 + surfer.line * 0.37) % 1;
            const size = (0.34 - puff * 0.2) * Math.min(1, wave.height * 2.4);
            box(surfer.spray + i, -surfer.way * (1.25 + puff * 1.5), 0.1 + puff * (0.5 - puff) * 1.6, 0.12 + (i - 1) * 0.16 - puff * 0.3, size, size, size);
          }
          // The rider faces the beach, arms out for balance.
          pose(surfer.who, x, y + 0.04, z, HALF_PI, 0.5 + lean, -0.35 + lean, HALF_PI + 0.3, -HALF_PI - 0.3);
        } else {
          // Back out from where the ride ended to where the next begins, low in the water.
          const lap = wave.travel >= RIDE.to ? (wave.travel - RIDE.to) / (SWELL.run - RIDE.to + RIDE.from) : (wave.travel + SWELL.run - RIDE.to) / (SWELL.run - RIDE.to + RIDE.from);
          const out = lap - Math.floor(lap); // (while they are coming in or going out, a wave may be passing that they would have ridden)
          const x = middle + surfer.way * (0.5 - out) * 16;
          // On the way in or out, that place is drawn towards the water's edge.
          const z = plan.shore + 2 + (SWELL.far - RIDE.to + (RIDE.to - RIDE.from) * out - 2) * offshore;
          const y = ground + 0.15 + Math.sin(time * 1.7 + surfer.line) * 0.04;
          stand(x, y, z, -HALF_PI);
          box(surfer.board, 0, 0, 0, 2.5, 0.09, 0.62);
          hide(surfer.spray, 3);
          const stroke = time * 4 + surfer.line;
          // Sitting on the board, legs in the water either side, arms pulling in turn.
          pose(surfer.who, x, y - 0.72, z, -HALF_PI, 0.5, 0.5, 1.2 + Math.sin(stroke) * 0.7, 1.2 - Math.sin(stroke) * 0.7);
        }
      }

      // Volleyball: the ball goes round the four in turn, and whoever is playing it jumps.
      const turn = Math.floor(time / RALLY);
      const flight = time / RALLY - turn;
      const from = players[turn % 4];
      const to = players[(turn + 1) % 4];
      stand(0, 0, 0, 0);
      box(ball, from.x + (to.x - from.x) * flight, ground + 2.25 + 2.7 * 4 * flight * (1 - flight), from.z + (to.z - from.z) * flight, 0.3, 0.3, 0.3);
      for (const player of players) {
        let jump = 0;
        if (player === to && flight > 0.72) jump = Math.sin(((flight - 0.72) / 0.28) * HALF_PI);
        if (player === from && flight < 0.28) jump = Math.cos((flight / 0.28) * HALF_PI);
        const shuffle = Math.sin(time * 3.1 + player.x) * 0.22 * (1 - jump);
        const arms = jump > 0.05 ? Math.PI - 0.25 : 0.5 + Math.sin(time * 2 + player.z) * 0.15;
        pose(player.who, player.x + Math.sin(time * 0.9 + player.z) * 0.5, sandY + jump * 0.5, player.z, player.heading, shuffle, -shuffle, arms, arms);
      }

      // The gym: pull-ups on the bar, squats and shadow-boxing on the mat.
      const pull = 0.5 - 0.5 * Math.cos(time * 2.4);
      pose(puller, plan.pullUp.x, ground + plan.pullUp.bar - 1.96 + pull * 0.34, plan.pullUp.z, -HALF_PI, -0.25 - pull * 0.3, -0.25 - pull * 0.3, Math.PI, Math.PI);
      // Overhead press: the bar goes from the shoulders to arm's length, and back down slowly.
      const press = 0.5 - 0.5 * Math.cos(time * 1.8);
      const reach = 2.25 + press * (Math.PI - 2.25);
      pose(lifter, plan.mat.x - 1.2, ground + 0.23, plan.mat.z, -HALF_PI, 0.12, -0.12, reach, reach);
      {
        // The hands are at the ends of the arms: 0.58 from the shoulders, which are 1.4 up.
        const handUp = 1.4 - Math.cos(reach) * 0.58;
        const handOut = Math.sin(reach) * 0.58;
        stand(plan.mat.x - 1.2, ground + 0.23, plan.mat.z, -HALF_PI);
        box(barbell, handOut, handUp + 0.04, 0, 0.06, 0.06, 1.7);
        box(barbell + 1, handOut, handUp + 0.04, -0.78, 0.1, 0.42, 0.1);
        box(barbell + 2, handOut, handUp + 0.04, 0.78, 0.1, 0.42, 0.1);
      }
      const jab = Math.sin(time * 6.5);
      pose(boxer, plan.mat.x + 1.6, ground + 0.23 + Math.abs(Math.sin(time * 5)) * 0.06, plan.mat.z + 0.6, Math.PI * 0.75, 0.25, -0.25, jab > 0 ? HALF_PI + 0.2 : 0.9, jab > 0 ? 0.9 : HALF_PI + 0.2);

      // Diners sit, and lift a hand to eat or talk now and then.
      for (const diner of diners) {
        const hand = 1 + Math.max(0, Math.sin(time * 1.3 + diner.phase)) * 0.9;
        pose(diner.who, diner.seat.x, diner.seat.y - 0.74, diner.seat.z, diner.seat.heading, 1.45, 1.45, 0.9, hand);
      }

      // Smoke: blocks that rise from the grill's chimney, swell, drift downwind and thin out.
      stand(0, 0, 0, 0);
      for (let i = 0; i < 5; i++) {
        const age = (time * 0.22 + i / 5) % 1;
        const size = (0.22 + age * 0.75) * (1 - age * age);
        box(smoke + i, plan.grill.x + 2.9 + age * age * 2.2, ground + 2.9 + age * 4.2, plan.grill.z + Math.sin(i * 2.4 + age * 3) * 0.3, size, size, size);
      }

      // Scooters, each with a rider leaning into the bars.
      for (const s of scooters) {
        const along = ((time * s.speed + s.offset) % (plan.reach * 2)) - plan.reach;
        const i = s.at;
        stand(along * s.sign, ground + 0.04, s.z, s.sign > 0 ? 0 : Math.PI);
        box(i, 0.02, 0.32, 0, 0.9, 0.1, 0.36);
        box(i + 1, -0.44, 0.54, 0, 0.62, 0.4, 0.4);
        box(i + 2, -0.38, 0.79, 0, 0.66, 0.1, 0.36);
        box(i + 3, 0.5, 0.66, 0, 0.14, 0.78, 0.42);
        box(i + 4, 0.5, 1.1, 0, 0.1, 0.08, 0.64);
        box(i + 5, 0.59, 0.94, 0, 0.08, 0.14, 0.2);
        box(i + 6, 0.7, 0.22, 0, 0.44, 0.44, 0.14);
        box(i + 7, -0.62, 0.22, 0, 0.44, 0.44, 0.14);
        box(i + 8, -0.32, 1.16, 0, 0.26, 0.58, 0.46);
        box(i + 9, -0.3, 1.62, 0, 0.32, 0.32, 0.32);
        box(i + 10, -0.3, 1.72, 0, 0.38, 0.22, 0.38);
        limb(i + 11, -0.3, 0.92, -0.15, 1.15, 0.66, 0.19);
        limb(i + 12, -0.3, 0.92, 0.15, 1.15, 0.66, 0.19);
        limb(i + 13, -0.26, 1.4, -0.3, 1.25, 0.72, 0.14);
        limb(i + 14, -0.26, 1.4, 0.3, 1.25, 0.72, 0.14);
      }

      // Surf. Foam slides up the wet sand and back; swells roll in from further out and flatten as they arrive.
      stand(0, 0, 0, 0);
      for (const { at, line } of foam) {
        for (let j = 0; j < SEGMENTS; j++) {
          const wash = Math.sin(time * 0.55 + line * 2.2 + j * 0.35);
          const z = plan.shore + 2.2 + line * 2.6 + wash * 1.5;
          // Well clear of the wet sand and the water beneath it: two surfaces at one height flicker.
          box(at + j, -250 + j * 38 + line * 17 + Math.sin(time * 0.1 + j) * 2, ground + 0.17 - line * 0.015, z, 24 + ((j * 7 + line * 3) % 10), 0.04, 0.5 + (wash + 1) * 0.25);
        }
      }
      for (const { at, face, crest, line } of swells) {
        const wave = swellAt(time, line);
        for (let j = 0; j < SEGMENTS; j++) {
          const x = -255 + j * 39 + line * 11;
          const length = 26 + ((j * 5 + line * 4) % 9);
          // The stretch the surfer rides runs straight; the others each sit a little ahead or behind.
          const z = wave.z + (j === 6 ? 0 : Math.sin(j * 1.9 + line) * 0.8);
          if (wave.height < SHOWS) {
            hide(at + j);
            hide(face + j);
            hide(crest + j);
            continue;
          }
          // The body goes well down into the water, so its underside is never near the surface.
          box(at + j, x, FOOT + wave.height / 2 - 0.2, z, length, wave.height + 0.4, 2.2);
          // Its face: a slope from just under the top of the wave down into the flat water in front of it.
          // It is a little shorter than the body, so their ends are not in one plane.
          slab(face + j, x, FOOT + wave.height / 2 - 0.08, z - FACE.from - FACE.depth / 2, length - 0.3, 0.1, Math.hypot(FACE.depth, wave.height) + 0.5, -Math.atan2(wave.height, FACE.depth));
          // A white crest along the top, on the side towards the beach, once the wave has stood up.
          const curl = Math.max(0, wave.height - 0.25);
          if (curl > 0.02) box(crest + j, x, FOOT + wave.height + curl * 0.25, z - 0.62, length * 0.94, curl * 0.5 + 0.06, 0.9);
          else hide(crest + j);
        }
      }

      // Boats drifting along the horizon.
      for (const boat of boats) {
        const span = 420;
        const x = (((time * boat.speed + boat.offset) % span) + span) % span - span / 2;
        stand(x, ground + 0.09 + Math.sin(time * 0.9 + boat.offset) * 0.06, boat.z, boat.speed > 0 ? 0 : Math.PI);
        box(boat.at, 0, 0.3, 0, 4.4, 0.6, 1.5);
        box(boat.at + 1, 0.3, 2.6, 0, 0.12, 4, 0.12);
        box(boat.at + 2, -0.75, 2.5, 0, 1.9, 2.9, 0.06);
        box(boat.at + 3, 0.3, 4.75, 0, 0.5, 0.3, 0.04);
      }

      // Gulls: a few quick beats, then a glide with the wings held out. Gone by nightfall.
      const aloft = 1 - smooth(night, 0.15, 0.55);
      for (const one of birds) {
        if (aloft <= 0.01) {
          hide(one.at, 3);
          continue;
        }
        const { x, y, z, heading } = one.fly(time);
        // As the light goes they climb away and are lost to sight.
        stand(x, y + (1 - aloft) * 26, z, heading, one.size * aloft);
        box(one.at, 0, 0, 0, 0.5, 0.12, 0.14);
        const rhythm = Math.sin(time * 0.7 + one.beat);
        const flap = rhythm > -0.2 ? Math.sin(time * 9 + one.beat) * 0.7 : 0.12;
        for (const side of [-1, 1]) {
          // A wing hinged at the body, lifted and lowered about the line of flight.
          matrix.makeTranslation(0, 0, side * 0.4).scale(vector.set(0.3, 0.035, 0.8));
          matrix.premultiply(hinge.makeRotationX(-side * flap)).premultiply(hinge.makeTranslation(0.02, 0.04, side * 0.06)).premultiply(root);
          mesh.setMatrixAt(one.at + (side < 0 ? 1 : 2), matrix);
        }
      }

      // The party. Everyone sets off in their own time, walks down, and then dances or sits.
      const beat = time * Math.PI * 4; // two beats a second
      const partyOn = gathered > 0;
      for (const guest of guests) {
        const arrived = THREE.MathUtils.clamp(gathered * 1.5 - guest.order * 0.5, 0, 1);
        if (arrived <= 0) {
          hide(guest.who.at, 7);
          if (guest.stick !== undefined) glowBox(guest.stick, 0, -50, 0, 0, 0, 0);
          continue;
        }
        const sand = ground + 0.14;
        let armLeft = 0.5;
        let armRight = 0.5;
        if (arrived < 1) {
          // On the way: out from under the barbecue's roof and across the sand.
          guest.who.scale = guest.size * Math.min(1, arrived * 10);
          // Two legs: to the corner, then to their place. How far along depends on how long each leg is.
          const first = Math.hypot(guest.via.x - guest.from.x, guest.via.z - guest.from.z);
          const second = Math.hypot(guest.spot.x - guest.via.x, guest.spot.z - guest.via.z);
          const gone = arrived * (first + second);
          const [a, b, t] = gone < first ? [guest.from, guest.via, gone / first] : [guest.via, guest.spot, (gone - first) / second];
          const x = a.x + (b.x - a.x) * t;
          const z = a.z + (b.z - a.z) * t;
          const coming = wanted === 1 ? 1 : -1;
          const stride = Math.sin(time * 7 + guest.phase) * 0.6;
          pose(guest.who, x, sand, z, Math.atan2(-(b.z - a.z) * coming, (b.x - a.x) * coming), stride, -stride, -stride * 0.8, stride * 0.8);
          armLeft = -stride * 0.8;
        } else if (guest.seat) {
          guest.who.scale = guest.size;
          // On a log, hands out to the fire, nodding to the music.
          const warm = 1.15 + Math.sin(time * 0.8 + guest.phase) * 0.15;
          pose(guest.who, guest.seat.x, guest.seat.y - 0.74 + Math.abs(Math.sin(beat / 2 + guest.phase)) * 0.03, guest.seat.z, guest.seat.heading, 1.45, 1.45, warm, warm);
          armLeft = warm;
        } else {
          guest.who.scale = guest.size;
          const bounce = Math.abs(Math.sin(beat / 2 + guest.phase));
          const sway = Math.sin(beat / 4 + guest.phase);
          let heading = guest.heading;
          let hop = bounce * 0.08;
          let legs = sway * 0.25;
          if (guest.style === 0) {
            // Jumping, both arms in the air.
            hop = bounce * 0.24;
            armLeft = Math.PI - 0.35 + Math.sin(beat + guest.phase) * 0.25;
            armRight = Math.PI - 0.35 - Math.sin(beat + guest.phase) * 0.25;
            legs = 0.12;
          } else if (guest.style === 1) {
            // Swaying, arms swinging across.
            armLeft = 1 + sway * 0.8;
            armRight = 1 - sway * 0.8;
          } else {
            // Turning on the spot, one fist pumping.
            heading += Math.sin(time * 0.6 + guest.phase) * 1.1;
            armLeft = Math.PI - 0.5 + Math.sin(beat + guest.phase) * 0.4;
            armRight = 0.7 + bounce * 0.3;
          }
          pose(guest.who, guest.spot.x + sway * 0.22, sand + hop, guest.spot.z, heading, legs, -legs, armLeft, armRight);
        }
        // A glow stick in the left hand: at the end of the arm, wherever that is. (pose has just set the frame.)
        if (guest.stick !== undefined) glowBox(guest.stick, Math.sin(armLeft) * 0.74, 1.4 - Math.cos(armLeft) * 0.74, -0.33, 0.07, 0.3, 0.07);
      }
      // The DJ: one hand on the decks, the other in the air, bobbing.
      if (partyOn) {
        dj.scale = Math.min(1, gathered * 6);
        const bob = Math.abs(Math.sin(beat / 2));
        pose(dj, party.dj.x + Math.sin(beat / 8) * 0.25, party.dj.y + bob * 0.05, party.dj.z, -HALF_PI, 0.1, -0.1, Math.PI - 0.6 + Math.sin(beat) * 0.35, 1.25);
      } else hide(dj.at, 7);

      // The fire, the rig's lamps and the colour on the sand: on with the dark, whoever has arrived.
      const lit = smooth(night, 0.35, 0.8);
      const shining = lit > 0.01;
      glow.visible = sweeps.visible = shining;
      fireLight.visible = shining;
      if (rigLight) rigLight.visible = shining;
      if (shining) {
        stand(party.fire.x, ground + 0.3, party.fire.z, 0);
        for (let i = 0; i < FLAMES.length; i++) {
          const flicker = 0.5 + 0.5 * Math.sin(time * (7 + i * 1.3) + i * 2.1);
          const middle = i >= 4;
          const tall = (middle ? 1.0 : 0.55) * (0.55 + flicker * 0.45) * lit;
          const angle = i * 1.57 + time * 0.4;
          const out = middle ? 0.08 * (i - 5) : 0.3;
          glowBox(flames + i, Math.cos(angle) * out, tall / 2, Math.sin(angle) * out, middle ? 0.3 : 0.34, tall, middle ? 0.3 : 0.34);
        }
        for (let i = 0; i < SPARKS; i++) {
          const age = (time * 0.45 + i / SPARKS) % 1;
          const size = 0.09 * (1 - age) * lit;
          glowBox(sparks + i, Math.sin(i * 2.4 + age * 5) * 0.5, 0.9 + age * 3.4, Math.cos(i * 1.7 + age * 4) * 0.5, size, size, size);
        }
        fireLight.intensity = FIRE_LIGHT * lit * (0.86 + 0.14 * Math.sin(time * 11) * Math.sin(time * 7.3));

        // The rig: each lamp its own colour, all of them drifting round the wheel; brighter on the beat.
        const pulse = 0.75 + 0.25 * Math.pow(Math.abs(Math.sin(beat / 2)), 3);
        stand(0, 0, 0, 0);
        party.lamps.forEach((lamp, i) => {
          hue.setHSL((time * 0.07 + i / party.lamps.length) % 1, 1, 0.55);
          glowBox(rig + i, lamp.x, lamp.y, lamp.z, 0.36, 0.3, 0.36);
          glow.setColorAt(rig + i, color.copy(hue).multiplyScalar(1.7 * lit * pulse));
          if (i < SWEEPS) {
            // Its pool of colour, wandering over the sand in front of the booth.
            matrix.makeScale(3.1, 1, 3.1).setPosition(party.x + Math.sin(time * 0.6 + i * 1.26) * 5, ground + 0.2 + i * 0.004, party.z + Math.sin(time * 0.83 + i * 2.1) * 2.8);
            sweeps.setMatrixAt(i, matrix);
            sweeps.setColorAt(i, color.copy(hue).multiplyScalar(lit * pulse));
          }
        });
        if (rigLight) {
          rigLight.color.setHSL((time * 0.07) % 1, 0.85, 0.6);
          rigLight.intensity = RIG_LIGHT * lit * pulse;
        }
        glow.instanceMatrix.needsUpdate = true;
        sweeps.instanceMatrix.needsUpdate = true;
        if (glow.instanceColor) glow.instanceColor.needsUpdate = true;
        if (sweeps.instanceColor) sweeps.instanceColor.needsUpdate = true;
      }

      mesh.instanceMatrix.needsUpdate = true;
    },
  };
}
