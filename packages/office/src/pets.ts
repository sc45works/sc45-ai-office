/**
 * SC45 AI Office: the office pets.
 *
 *   Cash   a Rottweiler: sleeps beside the executive deck, and now and then gets up and
 *          finds another place to sleep
 *   Milo   a Jack Russell: trots from department to department, stopping only briefly
 *   Tom    a grey-blue cat: settles on an empty desk or in the lounge, and moves when it suits him
 *
 * They are scenery with a mind of their own: no events move them, nothing is saved about
 * them, and each browser's pets wander separately. They walk the same routes the agents
 * do (navigation.ts), so they go round furniture, not through it.
 */
import * as THREE from 'three';
import { FURNITURE_SCALE } from './layout';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import type { Navigator } from './navigation';
import { pixelate } from './pixel';
import type { Office } from './scene';

export interface Pets {
  update(delta: number, time: number): void;
}

const BOX = new THREE.BoxGeometry(1, 1, 1);
const materials = new Map<string, THREE.Material>();
function fur(color: string): THREE.Material {
  let material = materials.get(color);
  if (!material) materials.set(color, (material = pixelate(new THREE.MeshStandardMaterial({ color, roughness: 0.95, metalness: 0, flatShading: true }), 14, 0.14)));
  return material;
}
function piece(parent: THREE.Object3D, color: string, w: number, h: number, d: number, x: number, y: number, z: number): THREE.Mesh {
  const mesh = new THREE.Mesh(BOX, color.startsWith('glow:') ? new THREE.MeshBasicMaterial({ color: color.slice(5) }) : fur(color));
  mesh.scale.set(w, h, d);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

/** The moving parts of an animal. It faces +z; `body` pivots at the hips, so it can sit. */
interface Rig {
  root: THREE.Group;
  body: THREE.Group;
  head: THREE.Group;
  tail: THREE.Group;
  /** Front left, front right, rear left, rear right. */
  legs: THREE.Group[];
  leg: number;
  /** How far `body` is from the ground when standing. */
  hip: number;
}

interface Shape {
  /** Overall size: 1 is a big dog. */
  scale: number;
  coat: string;
  /** Muzzle, socks and other markings. */
  marking: string;
  body: [width: number, height: number, length: number];
  leg: number;
  head: [width: number, height: number, depth: number];
  muzzle: [width: number, height: number, depth: number];
  ears: 'folded' | 'pointed';
  earColor: string;
  tail: [thickness: number, length: number, lift: number];
  socks: boolean;
  eyes: string;
  /** Extra blocks particular to one animal, added to the body or the head. */
  extras?: (parts: { body: THREE.Group; head: THREE.Group; shape: Shape }) => void;
}

function buildAnimal(name: string, shape: Shape): Rig {
  const root = new THREE.Group();
  root.name = `pet:${name}`;
  root.scale.setScalar(shape.scale * FURNITURE_SCALE);
  const [bw, bh, bl] = shape.body;
  const hip = shape.leg;

  // `body` has its origin at the rear hips, so tilting it lifts the chest: that is sitting.
  const body = new THREE.Group();
  body.position.set(0, hip, -bl * 0.32);
  root.add(body);
  const forward = bl * 0.32; // from the hips to the middle of the body
  piece(body, shape.coat, bw, bh, bl, 0, bh / 2, forward);

  const legs: THREE.Group[] = [];
  for (const [x, z] of [[-1, 1], [1, 1], [-1, -1], [1, -1]] as const) {
    const pivot = new THREE.Group();
    pivot.position.set(x * (bw / 2 - 0.06), 0.02, forward + z * (bl / 2 - 0.08));
    piece(pivot, shape.coat, 0.11, shape.leg, 0.11, 0, -shape.leg / 2, 0);
    if (shape.socks) piece(pivot, shape.marking, 0.118, shape.leg * 0.38, 0.118, 0, -shape.leg * 0.81, 0);
    body.add(pivot);
    legs.push(pivot);
  }

  const [hw, hh, hd] = shape.head;
  const head = new THREE.Group();
  head.position.set(0, bh * 0.8, forward + bl / 2 - 0.02);
  body.add(head);
  piece(head, shape.coat, hw, hh, hd, 0, hh * 0.35, hd * 0.4);
  const [mw, mh, md] = shape.muzzle;
  piece(head, shape.marking, mw, mh, md, 0, hh * 0.12, hd * 0.9 + md / 2 - 0.01);
  piece(head, '#0c0c0e', mw * 0.4, mh * 0.34, 0.03, 0, hh * 0.12 + mh * 0.33, hd * 0.9 + md);
  for (const side of [-1, 1]) {
    piece(head, shape.eyes, 0.045, 0.045, 0.02, side * hw * 0.26, hh * 0.5, hd * 0.9 + 0.006);
    if (shape.ears === 'folded') piece(head, shape.earColor, 0.07, hh * 0.5, hd * 0.42, side * (hw / 2 + 0.02), hh * 0.58, hd * 0.25);
    else piece(head, shape.earColor, hw * 0.3, hh * 0.42, 0.05, side * hw * 0.32, hh * 0.85 + hh * 0.2, hd * 0.25);
  }

  const [tt, tl, lift] = shape.tail;
  const tail = new THREE.Group();
  tail.position.set(0, bh * 0.85, forward - bl / 2 + 0.02);
  tail.rotation.x = lift;
  piece(tail, shape.coat, tt, tt, tl, 0, 0, -tl / 2);
  body.add(tail);

  shape.extras?.({ body, head, shape });
  return { root, body, head, tail, legs, leg: shape.leg, hip };
}

type Pose = 'stand' | 'sit' | 'lie';

interface Pet {
  name: string;
  rig: Rig;
  speed: number;
  /** Walking a route, hopping on to or off a perch, or staying put. */
  mode: 'rest' | 'walk' | 'hop';
  path: THREE.Vector3[];
  step: number;
  /** Seconds until it next decides to move. */
  wait: number;
  pose: Pose;
  /** How far into each pose it is, 0..1, so changes ease. */
  sit: number;
  lie: number;
  stride: number;
  heading: number;
  /** For a hop: from, to, and progress. */
  hop: { from: THREE.Vector3; to: THREE.Vector3; t: number; then: () => void } | null;
  /** Where it will go and what it will do there. */
  choose(pet: Pet): void;
  /** What to do on reaching the end of the current walk. */
  arrive?: (pet: Pet) => void;
  wag: number;
}

const damp = (current: number, target: number, rate: number, delta: number) => current + (target - current) * (1 - Math.exp(-rate * delta));
const between = (low: number, high: number) => low + Math.random() * (high - low);

export function createPets(
  office: Office,
  routes: Navigator,
  options: {
    still?: () => boolean;
    /** Where Stephen is while he is walking round the office, or null: Cash goes with him. */
    leader?: () => THREE.Vector3 | null;
  } = {},
): Pets {
  const still = options.still ?? (() => false);
  const leader = options.leader ?? (() => null);
  /** Cash, while he is following Stephen: when he next works out a way to him. */
  let heel = { following: false, rethink: 0 };
  const free = (x: number, z: number) => !routes.isBlocked(x, z);
  const floorPoint = (x: number, z: number) => new THREE.Vector3(x, office.floorHeightAt(x, z), z);

  function tag(rig: Rig, name: string, height: number) {
    const element = document.createElement('div');
    element.className = 'pet-tag';
    element.textContent = name;
    const label = new CSS2DObject(element);
    label.center.set(0.5, 1);
    label.position.set(0, height, 0);
    rig.head.add(label);
  }

  function make(name: string, shape: Shape, at: THREE.Vector3, speed: number, choose: Pet['choose'], pose: Pose): Pet {
    const rig = buildAnimal(name, shape);
    rig.root.position.copy(at);
    office.scene.add(rig.root);
    tag(rig, name, shape.head[1] + 0.34);
    return { name, rig, speed, mode: 'rest', path: [], step: 0, wait: between(6, 20), pose, sit: pose === 'sit' ? 1 : 0, lie: pose === 'lie' ? 1 : 0, stride: Math.random() * 6, heading: Math.random() * 6, hop: null, choose, wag: 0 };
  }

  /** Set off for a point on the floor; `then` runs on arrival. */
  function walkTo(pet: Pet, target: THREE.Vector3, then: (pet: Pet) => void) {
    pet.path = routes.findPath(pet.rig.root.position.clone().setY(0), target.clone().setY(0));
    pet.step = 0;
    pet.mode = 'walk';
    pet.pose = 'stand';
    pet.arrive = then;
  }

  // Cash -----------------------------------------------------------------------
  // Sleeps in one of a few places on the main floor, beginning beside the executive deck.
  const napSpots = [
    [-7.3, 1.2], [7.2, 1.4], [2.8, 15], [-4.2, 13.2], [14.4, 9.2], [-12.5, 5.5],
  ].filter(([x, z]) => free(x, z)).map(([x, z]) => floorPoint(x, z));
  const cash = make(
    'Cash',
    {
      scale: 1,
      coat: '#1c1b1d',
      marking: '#a56a37',
      body: [0.4, 0.38, 0.86],
      leg: 0.34,
      head: [0.32, 0.3, 0.3],
      muzzle: [0.18, 0.14, 0.17],
      ears: 'folded',
      earColor: '#1c1b1d',
      tail: [0.08, 0.14, 0.5],
      socks: true,
      eyes: '#3a2414',
      extras: ({ body, head, shape }) => {
        // The Rottweiler's markings: a tan chest, and a tan spot above each eye.
        piece(body, shape.marking, 0.24, 0.18, 0.02, 0, 0.12, shape.body[2] * 0.82 + 0.005);
        for (const side of [-1, 1]) piece(head, shape.marking, 0.05, 0.035, 0.02, side * 0.083, 0.2, 0.277);
        piece(body, '#b5432e', 0.42, 0.05, 0.06, 0, 0.3, shape.body[2] * 0.76); // a red collar
      },
    },
    napSpots[0] ?? floorPoint(-7.3, 1.2),
    1.25,
    (pet) => {
      const others = napSpots.filter((spot) => spot.distanceTo(pet.rig.root.position) > 2);
      if (others.length === 0) return;
      walkTo(pet, others[Math.floor(Math.random() * others.length)], (arrived) => {
        arrived.pose = 'lie';
        arrived.wait = between(50, 110);
      });
    },
    'lie',
  );
  cash.wait = between(25, 50);
  cash.heading = 0.6;

  // Milo -----------------------------------------------------------------------
  // Does the rounds: the front of each department, the entrance, the lounge, the meeting room door.
  const rounds = [
    [-20, -6.4], [0, -7], [20, -6.4], [-21.5, 8.2], [21.5, 8.2], [4.2, 12.4], [0, 16.4], [-13.6, 13.6], [16.6, 12], [-9.5, 0], [9.5, 0],
  ].filter(([x, z]) => free(x, z)).map(([x, z]) => floorPoint(x, z));
  const milo = make(
    'Milo',
    {
      scale: 0.56,
      coat: '#f2efe8',
      marking: '#f2efe8',
      body: [0.36, 0.34, 0.74],
      leg: 0.32,
      head: [0.3, 0.28, 0.28],
      muzzle: [0.16, 0.13, 0.18],
      ears: 'folded',
      earColor: '#8a5a33',
      tail: [0.07, 0.3, 1.25],
      socks: false,
      eyes: '#1a1310',
      extras: ({ body, head, shape }) => {
        // Brown over one side of the face, and a brown patch on the back.
        piece(head, '#8a5a33', 0.165, 0.2, 0.2, -0.075, 0.2, 0.165);
        piece(body, '#8a5a33', shape.body[0] + 0.01, 0.2, 0.26, 0, shape.body[1] - 0.095, shape.body[2] * 0.12);
        piece(body, '#2b4a7d', shape.body[0] + 0.02, 0.05, 0.06, 0, 0.27, shape.body[2] * 0.76); // a blue collar
      },
    },
    rounds[5] ?? floorPoint(4.2, 12.4),
    2.7,
    (pet) => {
      const others = rounds.filter((spot) => spot.distanceTo(pet.rig.root.position) > 3);
      if (others.length === 0) return;
      walkTo(pet, others[Math.floor(Math.random() * others.length)], (arrived) => {
        arrived.pose = Math.random() < 0.5 ? 'sit' : 'stand';
        arrived.wait = between(3, 10);
      });
    },
    'stand',
  );
  milo.wait = between(2, 5);

  // Tom ------------------------------------------------------------------------
  // Perches: the tops of the empty desks, and two places on the lounge floor. For a perch above
  // the floor he walks to the chair and jumps up.
  interface Perch {
    point: THREE.Vector3;
    /** Where to walk to before jumping up; absent for a place on the floor. */
    from?: THREE.Vector3;
    heading: number;
  }
  const perches: Perch[] = [];
  for (const desk of office.desks.values()) {
    if (!desk.vacant) continue;
    perches.push({ point: new THREE.Vector3(desk.position.x - 0.55, desk.position.y + 0.745, desk.position.z + 0.12), from: desk.seat.clone(), heading: desk.rotation + 0.5 });
  }
  for (const [x, z] of [[18.2, 16.6], [24.6, 12.2], [-25.6, 8.4]]) if (free(x, z)) perches.push({ point: floorPoint(x, z), heading: between(-1, 1) });
  let tomPerch: Perch | null = perches[0] ?? null;
  const tom = make(
    'Tom',
    {
      scale: 0.5,
      coat: '#7d8ba4',
      marking: '#d3dae5',
      body: [0.3, 0.3, 0.7],
      leg: 0.24,
      head: [0.32, 0.27, 0.26],
      muzzle: [0.15, 0.1, 0.06],
      ears: 'pointed',
      earColor: '#7d8ba4',
      tail: [0.07, 0.62, 1.05],
      socks: true,
      eyes: 'glow:#b8e04a',
      extras: ({ body, shape }) => {
        piece(body, shape.marking, 0.2, 0.16, 0.02, 0, 0.1, shape.body[2] * 0.82 + 0.005); // a pale bib
      },
    },
    tomPerch?.point ?? floorPoint(18.2, 16.6),
    1.6,
    (pet) => {
      const others = perches.filter((perch) => perch !== tomPerch);
      if (others.length === 0) return;
      const next = others[Math.floor(Math.random() * others.length)];
      const settle = (arrived: Pet) => {
        tomPerch = next;
        arrived.heading = next.heading;
        arrived.pose = Math.random() < 0.7 ? 'lie' : 'sit';
        arrived.wait = between(50, 120);
      };
      const go = () =>
        walkTo(pet, next.from ?? next.point, (arrived) => {
          if (!next.from) return settle(arrived);
          hop(arrived, next.point, () => settle(arrived));
        });
      // If he is up on something, he jumps down to the chair first.
      if (tomPerch?.from) hop(pet, floorPoint(tomPerch.from.x, tomPerch.from.z), go);
      else go();
    },
    'lie',
  );
  tom.heading = tomPerch?.heading ?? 0;
  tom.wait = between(30, 60);

  function hop(pet: Pet, to: THREE.Vector3, then: () => void) {
    pet.mode = 'hop';
    pet.pose = 'stand';
    pet.hop = { from: pet.rig.root.position.clone(), to: to.clone(), t: 0, then };
    pet.heading = Math.atan2(to.x - pet.rig.root.position.x, to.z - pet.rig.root.position.z);
  }

  const pets: Pet[] = [cash, milo, tom];
  for (const pet of pets) pet.rig.root.rotation.y = pet.heading;

  return {
    update(delta, time) {
      for (const pet of pets) {
        const { rig } = pet;
        const place = rig.root.position;

        // Cash goes where Stephen goes: he gets up when Stephen sets off, keeps a couple of paces
        // behind, sits when Stephen stops, and goes back to a place to sleep when the round is over.
        const lead = pet === cash && pet.mode !== 'hop' ? leader() : null;
        if (pet === cash) {
          if (lead) {
            heel.following = true;
            heel.rethink -= delta;
            const gap = Math.hypot(lead.x - place.x, lead.z - place.z);
            // At heel he walks a shade slower than Stephen, so he never runs into him; he only trots
            // when he has been left well behind.
            pet.speed = gap > 7 ? 2.6 : 1.6;
            if (gap > 3.4 && heel.rethink <= 0) {
              // Stephen keeps moving, so the way to him is worked out afresh every so often.
              pet.path = routes.findPath(place.clone().setY(0), lead.clone().setY(0));
              pet.step = 0;
              pet.mode = 'walk';
              pet.pose = 'stand';
              pet.arrive = (arrived) => {
                arrived.pose = 'sit';
              };
              heel.rethink = 0.7;
            } else if (gap <= 2.6 && pet.mode === 'walk') {
              // Two good paces behind is close enough.
              pet.path = [];
              pet.mode = 'rest';
              pet.pose = 'sit';
            }
            if (pet.mode === 'rest') pet.wait = 30; // he does not wander off while on duty
          } else if (heel.following) {
            heel = { following: false, rethink: 0 };
            pet.speed = 1.25;
            if (pet.mode === 'rest') pet.wait = 2; // then off to find somewhere to lie down
          }
        }

        if (pet.mode === 'rest') {
          pet.wait -= delta;
          if (pet.wait <= 0 && !still()) pet.choose(pet);
          if (pet.wait <= 0 && pet.mode === 'rest') pet.wait = between(10, 20); // nowhere to go just now
        } else if (pet.mode === 'walk') {
          const target = pet.path[pet.step];
          if (!target) {
            pet.mode = 'rest';
            pet.arrive?.(pet);
          } else {
            const dx = target.x - place.x;
            const dz = target.z - place.z;
            const distance = Math.hypot(dx, dz);
            const move = pet.speed * delta;
            if (distance <= move) {
              place.x = target.x;
              place.z = target.z;
              pet.step += 1;
            } else {
              place.x += (dx / distance) * move;
              place.z += (dz / distance) * move;
              pet.heading = Math.atan2(dx, dz);
            }
            place.y = office.floorHeightAt(place.x, place.z);
            pet.stride += delta * pet.speed * 7;
          }
        } else if (pet.hop) {
          // A short arc from one place to the other.
          pet.hop.t = Math.min(1, pet.hop.t + delta / 0.45);
          const t = pet.hop.t;
          place.lerpVectors(pet.hop.from, pet.hop.to, t);
          place.y += Math.sin(t * Math.PI) * 0.35;
          if (t >= 1) {
            const { then } = pet.hop;
            pet.hop = null;
            pet.mode = 'rest';
            pet.wait = 0.4;
            then();
          }
        }

        // Turn towards where it is going, by the short way round.
        const turn = Math.atan2(Math.sin(pet.heading - rig.root.rotation.y), Math.cos(pet.heading - rig.root.rotation.y));
        rig.root.rotation.y += turn * (1 - Math.exp(-9 * delta));

        // Pose: standing, sitting (chest up, haunches down) or lying (legs out, belly on the ground).
        const moving = pet.mode !== 'rest';
        pet.sit = damp(pet.sit, !moving && pet.pose === 'sit' ? 1 : 0, 6, delta);
        pet.lie = damp(pet.lie, !moving && pet.pose === 'lie' ? 1 : 0, 4, delta);
        const swing = moving ? Math.sin(pet.stride) * 0.6 : 0;
        const pitch = -0.52 * pet.sit;
        const breath = Math.sin(time * 1.3 + pet.stride) * 0.012 * pet.lie;
        rig.body.rotation.x = pitch;
        rig.body.position.y = rig.hip * (1 - 0.55 * pet.sit - 0.86 * pet.lie) + breath;
        const front = swing - pitch - 1.45 * pet.lie; // kept upright when sitting; stretched forward when lying
        const rear = -swing - pitch - 1.25 * pet.sit + 1.45 * pet.lie; // tucked under when sitting; stretched back when lying
        rig.legs[0].rotation.x = front;
        rig.legs[1].rotation.x = -swing - pitch - 1.45 * pet.lie;
        rig.legs[2].rotation.x = rear;
        rig.legs[3].rotation.x = swing - pitch - 1.25 * pet.sit + 1.45 * pet.lie;
        // The head stays level when sitting, and rests on the paws when lying.
        rig.head.rotation.x = -pitch + 0.42 * pet.lie + (moving ? Math.sin(pet.stride * 2) * 0.04 : Math.sin(time * 0.5 + pet.stride) * 0.06 * (1 - pet.lie));
        // Tails: a dog wags when it is up and about, a cat's tail sways slowly.
        pet.wag = damp(pet.wag, pet.lie > 0.5 ? 0.1 : 1, 3, delta);
        rig.tail.rotation.y = Math.sin(time * (pet.name === 'Tom' ? 1.1 : 9) + pet.stride) * (pet.name === 'Tom' ? 0.35 : 0.45) * pet.wag;
      }
    },
  };
}
