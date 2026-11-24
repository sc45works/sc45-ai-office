/**
 * SC45 AI Office: the drone show.
 *
 * For a few seconds of the tour, as night falls over the city, a few hundred lit drones rise
 * from the streets beside Taipei 101 and form a red heart with TAIPEI in white beside it;
 * the heart beats; then they scatter and go out.
 *
 * Every drone is one point of light in a single draw call. Nothing is drawn, and nothing is
 * computed, except while the show is on.
 */
import * as THREE from 'three';

export interface Drones {
  /** Seconds since the show began; a negative number when there is no show. `time` is the scene's clock. */
  update(show: number, time: number): void;
}

/** Where the middle of the formation hangs, and how big it is, in metres. It faces the sea (+z). */
const CENTRE = { x: -28, y: 58, z: -40 };
const HEART = { width: 17, height: 15.5, across: -21.5 }; // its middle is this far to the left of the centre
const TEXT = { word: 'TAIPEI', pitch: 1.16, across: 10 }; // dots this far apart; its middle is this far to the right

/** How the show runs, in seconds from its start. */
const RISE = 3.2;
const HOLD_UNTIL = 7.4;
const GONE = 9.2;

/** Five-by-seven dot letters: only the ones the word needs. */
const LETTERS: Record<string, string[]> = {
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
};

function dot(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const g = canvas.getContext('2d')!;
  const gradient = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(0.6, 'rgba(255,255,255,0.22)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gradient;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function buildDrones(scene: THREE.Scene): Drones {
  // Where each drone ends up, and whether it is part of the heart.
  const places: Array<{ x: number; y: number; heart: boolean }> = [];
  // The heart: its outline, and two smaller ones inside it, so it reads as filled.
  for (const [scale, count] of [[1, 56], [0.68, 36], [0.36, 18]] as const) {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const hx = 16 * Math.sin(a) ** 3; // -16..16
      const hy = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a); // about -17..12
      places.push({ x: HEART.across + (hx / 32) * HEART.width * scale, y: ((hy + 2.5) / 29) * HEART.height * scale, heart: true });
    }
  }
  const columns = TEXT.word.length * 6 - 1;
  [...TEXT.word].forEach((letter, index) => {
    LETTERS[letter].forEach((row, r) => {
      [...row].forEach((cell, c) => {
        if (cell === '#') places.push({ x: TEXT.across + (index * 6 + c - (columns - 1) / 2) * TEXT.pitch, y: (3 - r) * TEXT.pitch, heart: false });
      });
    });
  });

  const count = places.length;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ size: 1.9, map: dot(), vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, sizeAttenuation: true }),
  );
  points.name = 'drones';
  points.frustumCulled = false;
  points.visible = false;
  scene.add(points);

  // Each drone: where it takes off from (the streets below), when it leaves, and which way it flies off at the end.
  let seed = 101;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const drones = places.map((place) => ({
    place,
    from: { x: CENTRE.x + (random() - 0.5) * 70, z: CENTRE.z - 6 - random() * 26 },
    delay: random() * 0.9 + (place.heart ? 0 : 0.5),
    away: { x: (random() - 0.5) * 2, y: 0.4 + random(), z: (random() - 0.5) * 1.2 },
    phase: random() * 6,
  }));
  const RED = new THREE.Color('#ff2a4f');
  const WHITE = new THREE.Color('#fff4e6');
  const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

  return {
    update(show, time) {
      if (show < 0 || show > GONE) {
        points.visible = false;
        return;
      }
      points.visible = true;
      // The heart beats twice, quickly, then rests.
      const beat = 1 + 0.06 * (Math.max(0, Math.sin(time * 5.2)) ** 6 + Math.max(0, Math.sin(time * 5.2 - 0.9)) ** 6);
      const leaving = smooth((show - HOLD_UNTIL) / (GONE - HOLD_UNTIL));
      drones.forEach((drone, i) => {
        const up = smooth((show - drone.delay) / (RISE - 0.9));
        const scale = drone.place.heart ? beat : 1;
        // The heart swells about its own middle.
        const tx = CENTRE.x + (drone.place.heart ? HEART.across + (drone.place.x - HEART.across) * scale : drone.place.x);
        const ty = CENTRE.y + drone.place.y * scale;
        // Up from the street, drifting into place; holding there with the small wander of something hovering.
        const wander = 0.16 * up;
        let x = drone.from.x + (tx - drone.from.x) * up + Math.sin(time * 1.3 + drone.phase) * wander;
        let y = 2 + (ty - 2) * smooth(up * 1.15) + Math.sin(time * 1.7 + drone.phase * 2) * wander;
        let z = drone.from.z + (CENTRE.z - drone.from.z) * up;
        x += drone.away.x * leaving * 46;
        y += drone.away.y * leaving * 30;
        z += drone.away.z * leaving * 40;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        // Lit a moment after take-off; brighter on the beat; out as they scatter.
        const lit = smooth((show - drone.delay) / 0.5) * (1 - leaving) * (drone.place.heart ? 2.1 + (beat - 1) * 10 : 2.2);
        const color = drone.place.heart ? RED : WHITE;
        colors[i * 3] = color.r * lit;
        colors[i * 3 + 1] = color.g * lit;
        colors[i * 3 + 2] = color.b * lit;
      });
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
    },
  };
}
