/**
 * SC45 AI Office: the snack robot.
 *
 * A small wheeled robot that waits in front of the vending machine by the entrance. Every
 * minute or so, if someone is at their desk with work in hand, it takes a drink from the
 * machine, drives it to them, leaves it on the desk and goes home.
 *
 * Like the pets it is scenery: nothing it does is an event, and nothing is saved. It only
 * reads who is busy (from the agents) and how to get there (from the navigator).
 */
import * as THREE from 'three';
import type { Agents } from './agents';
import { FURNITURE_SCALE, PALETTE } from './layout';
import type { Navigator } from './navigation';
import type { Office } from './scene';

export interface Robot {
  update(delta: number, time: number): void;
}

const BOX = new THREE.BoxGeometry(1, 1, 1);
const SPEED = 2.3;
const DRINKS = [PALETTE.orange, PALETTE.pink, PALETTE.lightViolet, PALETTE.green, PALETTE.peach, '#f4c542'];
/** How long a delivered drink stays on a desk. */
const DRINK_LASTS = 150;

const between = (low: number, high: number) => low + Math.random() * (high - low);

export function createRobot(office: Office, routes: Navigator, agents: Agents, options: { still?: () => boolean } = {}): Robot {
  const still = options.still ?? (() => false);
  const dock = office.vending.dock.clone();

  const root = new THREE.Group();
  root.name = 'snack-robot';
  root.position.copy(dock);
  root.rotation.y = Math.PI / 2;
  root.scale.setScalar(FURNITURE_SCALE);
  office.scene.add(root);

  const shell = new THREE.MeshStandardMaterial({ color: '#dfe2ea', roughness: 0.5, metalness: 0.1, flatShading: true });
  const dark = new THREE.MeshStandardMaterial({ color: '#1d1e24', roughness: 0.6, metalness: 0.2, flatShading: true });
  const eyes = new THREE.MeshBasicMaterial({ color: PALETTE.peach });
  const piece = (parent: THREE.Object3D, material: THREE.Material, w: number, h: number, d: number, x: number, y: number, z: number) => {
    const mesh = new THREE.Mesh(BOX, material);
    mesh.scale.set(w, h, d);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const body = new THREE.Group();
  root.add(body);
  piece(body, shell, 0.46, 0.36, 0.5, 0, 0.3, 0);
  piece(body, dark, 0.5, 0.05, 0.54, 0, 0.5, 0); // the tray
  piece(body, dark, 0.34, 0.16, 0.02, 0, 0.34, 0.255); // its face: a dark screen with two lit eyes
  for (const side of [-1, 1]) piece(body, eyes, 0.06, 0.06, 0.02, side * 0.08, 0.35, 0.262);
  piece(body, new THREE.MeshBasicMaterial({ color: PALETTE.orange }), 0.47, 0.04, 0.51, 0, 0.16, 0); // a stripe of the brand's orange
  for (const [x, z] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) piece(root, dark, 0.08, 0.16, 0.16, x * 0.25, 0.08, z * 0.16); // wheels
  piece(body, dark, 0.02, 0.18, 0.02, 0.16, 0.6, -0.18);
  const beacon = piece(body, new THREE.MeshBasicMaterial({ color: PALETTE.green }), 0.05, 0.05, 0.05, 0.16, 0.71, -0.18);
  const drinkMaterial = new THREE.MeshStandardMaterial({ color: DRINKS[0], roughness: 0.4, metalness: 0.3 });
  const drink = piece(body, drinkMaterial, 0.1, 0.17, 0.1, 0, 0.61, 0.05);
  drink.visible = false;

  // One place for a drink on each desk, made when it is first needed.
  const served = new Map<string, { mesh: THREE.Mesh; left: number }>();
  function serve(deskId: string, color: string) {
    const desk = office.desks.get(deskId);
    if (!desk) return;
    let slot = served.get(deskId);
    if (!slot) {
      const mesh = new THREE.Mesh(BOX, new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.3 }));
      mesh.scale.set(0.1, 0.17, 0.1);
      mesh.position.set(0.82, 0.74 + 0.1, 0.22); // on the desk top, by the agent's right hand
      desk.group.add(mesh);
      served.set(deskId, (slot = { mesh, left: 0 }));
    }
    (slot.mesh.material as THREE.MeshStandardMaterial).color.set(color);
    slot.mesh.visible = true;
    slot.left = DRINK_LASTS;
  }

  type Mode = 'docked' | 'loading' | 'out' | 'serving' | 'back';
  let mode: Mode = 'docked';
  let wait = between(8, 16);
  let path: THREE.Vector3[] = [];
  let step = 0;
  let customer: string | null = null;
  let heading = root.rotation.y;

  /** Someone at their own desk with work in hand, who has no drink already. */
  function pickCustomer(): string | null {
    const waiting = agents.list().filter((agent) => {
      if (agent.state === 'idle' || !agent.settled || served.get(agent.id)?.mesh.visible) return false;
      const desk = office.desks.get(agent.id);
      const position = agents.get(agent.id)?.position;
      return Boolean(desk && position && position.distanceTo(desk.seat) < 0.6);
    });
    return waiting.length ? waiting[Math.floor(Math.random() * waiting.length)].id : null;
  }

  /** A route that stops beside the chair, not in it. */
  function routeTo(target: THREE.Vector3): THREE.Vector3[] {
    const route = routes.findPath(root.position.clone().setY(0), target.clone().setY(0));
    const last = route.at(-1);
    const before = route.at(-2) ?? root.position;
    if (last) {
      const back = new THREE.Vector3().subVectors(before, last).setY(0);
      if (back.length() > 0.9) last.add(back.normalize().multiplyScalar(0.8));
      else route.pop();
    }
    return route;
  }

  return {
    update(delta, time) {
      for (const slot of served.values()) {
        if (!slot.mesh.visible) continue;
        slot.left -= delta;
        if (slot.left <= 0) slot.mesh.visible = false;
      }
      beacon.visible = mode === 'docked' || Math.floor(time * 3) % 2 === 0; // steady at home, blinking on a run

      if (mode === 'docked') {
        wait -= delta;
        if (wait <= 0 && !still()) {
          customer = pickCustomer();
          if (customer) {
            mode = 'loading';
            wait = 1.4;
            drinkMaterial.color.set(DRINKS[Math.floor(Math.random() * DRINKS.length)]);
            heading = -Math.PI / 2; // turn to the machine
          } else wait = between(10, 20);
        }
      } else if (mode === 'loading') {
        wait -= delta;
        if (wait <= 0.7) drink.visible = true;
        if (wait <= 0) {
          const seat = customer ? office.desks.get(customer)?.seat : undefined;
          if (!seat) mode = 'docked';
          else {
            path = routeTo(seat);
            step = 0;
            mode = 'out';
          }
        }
      } else if (mode === 'out' || mode === 'back') {
        const target = path[step];
        if (!target) {
          if (mode === 'out') {
            mode = 'serving';
            wait = 1.6;
            const desk = customer ? office.desks.get(customer) : undefined;
            if (desk) heading = Math.atan2(desk.position.x - root.position.x, desk.position.z - root.position.z);
          } else {
            mode = 'docked';
            wait = between(35, 80);
            heading = Math.PI / 2;
          }
        } else {
          const dx = target.x - root.position.x;
          const dz = target.z - root.position.z;
          const distance = Math.hypot(dx, dz);
          const move = SPEED * delta;
          if (distance <= move) {
            root.position.x = target.x;
            root.position.z = target.z;
            step += 1;
          } else {
            root.position.x += (dx / distance) * move;
            root.position.z += (dz / distance) * move;
            heading = Math.atan2(dx, dz);
          }
          root.position.y = office.floorHeightAt(root.position.x, root.position.z);
        }
      } else if (mode === 'serving') {
        wait -= delta;
        if (wait <= 0.8 && drink.visible && customer) {
          drink.visible = false;
          serve(customer, `#${drinkMaterial.color.getHexString()}`);
        }
        if (wait <= 0) {
          path = routes.findPath(root.position.clone().setY(0), dock);
          step = 0;
          mode = 'back';
          customer = null;
        }
      }

      const turn = Math.atan2(Math.sin(heading - root.rotation.y), Math.cos(heading - root.rotation.y));
      root.rotation.y += turn * (1 - Math.exp(-8 * delta));
      // It bobs a little on the move, and sits still otherwise.
      body.position.y = mode === 'out' || mode === 'back' ? Math.abs(Math.sin(time * 14)) * 0.012 : 0;
    },
  };
}
