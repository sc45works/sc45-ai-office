/**
 * SC45 AI Office: walking routes.
 *
 * The floor is rasterised into a grid of small cells. Every obstacle the scene
 * reports (desks, walls, planters, the glass room, the raised deck's edge) blocks
 * the cells it covers, grown by an agent's shoulder width. Routes are found with
 * A* and then straightened, so agents walk in a few clean legs instead of a
 * staircase of grid steps.
 *
 * Because the grid is built from the scene's own obstacle list, moving a desk or
 * a tree in layout.ts moves the routes with it.
 */
import * as THREE from 'three';
import type { Obstacle } from './scene';

const CELL = 0.4;
/** How far an agent's centre stays from any obstacle. */
const CLEARANCE = 0.32;
/** Agents keep this far inside the edge of the floor. */
const EDGE_MARGIN = 0.6;

export interface Navigator {
  /**
   * A walkable route from `from` to `to`, as a short list of points ending exactly at `to`.
   * `from` and `to` may sit inside an obstacle (a sofa seat, a chair): the route then leaves
   * from, or arrives at, the nearest free point and takes one last short step.
   */
  findPath(from: THREE.Vector3, to: THREE.Vector3): THREE.Vector3[];
  isBlocked(x: number, z: number): boolean;
}

export function createNavigator(
  obstacles: readonly Obstacle[],
  floor: { width: number; depth: number },
  floorHeightAt: (x: number, z: number) => number,
): Navigator {
  const cols = Math.ceil(floor.width / CELL);
  const rows = Math.ceil(floor.depth / CELL);
  const count = cols * rows;
  const originX = -floor.width / 2;
  const originZ = -floor.depth / 2;

  const blocked = new Uint8Array(count);
  const cellX = (col: number) => originX + (col + 0.5) * CELL;
  const cellZ = (row: number) => originZ + (row + 0.5) * CELL;
  const toCol = (x: number) => Math.floor((x - originX) / CELL);
  const toRow = (z: number) => Math.floor((z - originZ) / CELL);
  const inGrid = (col: number, row: number) => col >= 0 && row >= 0 && col < cols && row < rows;

  // Rasterise: the floor's edge first, then every obstacle over just the cells it can reach.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = cellX(col);
      const z = cellZ(row);
      if (Math.abs(x) > floor.width / 2 - EDGE_MARGIN || Math.abs(z) > floor.depth / 2 - EDGE_MARGIN) blocked[row * cols + col] = 1;
    }
  }
  for (const obstacle of obstacles) {
    const minX = obstacle.shape === 'rect' ? obstacle.minX - CLEARANCE : obstacle.x - obstacle.radius - CLEARANCE;
    const maxX = obstacle.shape === 'rect' ? obstacle.maxX + CLEARANCE : obstacle.x + obstacle.radius + CLEARANCE;
    const minZ = obstacle.shape === 'rect' ? obstacle.minZ - CLEARANCE : obstacle.z - obstacle.radius - CLEARANCE;
    const maxZ = obstacle.shape === 'rect' ? obstacle.maxZ + CLEARANCE : obstacle.z + obstacle.radius + CLEARANCE;
    for (let row = Math.max(0, toRow(minZ)); row <= Math.min(rows - 1, toRow(maxZ)); row++) {
      for (let col = Math.max(0, toCol(minX)); col <= Math.min(cols - 1, toCol(maxX)); col++) {
        const x = cellX(col);
        const z = cellZ(row);
        const inside =
          obstacle.shape === 'rect'
            ? x >= minX && x <= maxX && z >= minZ && z <= maxZ
            : Math.hypot(x - obstacle.x, z - obstacle.z) <= obstacle.radius + CLEARANCE;
        if (inside) blocked[row * cols + col] = 1;
      }
    }
  }

  function isBlocked(x: number, z: number): boolean {
    const col = toCol(x);
    const row = toRow(z);
    return !inGrid(col, row) || blocked[row * cols + col] === 1;
  }

  /** The free cell closest to a point, searching outward in rings. */
  function nearestFree(x: number, z: number): number {
    const col = THREE.MathUtils.clamp(toCol(x), 0, cols - 1);
    const row = THREE.MathUtils.clamp(toRow(z), 0, rows - 1);
    if (!blocked[row * cols + col]) return row * cols + col;
    let best = -1;
    let bestDistance = Infinity;
    for (let radius = 1; radius <= 16 && best < 0; radius++) {
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          if (Math.max(Math.abs(dr), Math.abs(dc)) !== radius) continue;
          const c = col + dc;
          const r = row + dr;
          if (!inGrid(c, r) || blocked[r * cols + c]) continue;
          const distance = Math.hypot(cellX(c) - x, cellZ(r) - z);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = r * cols + c;
          }
        }
      }
    }
    return best;
  }

  /** True when the straight line between two points crosses no blocked cell. */
  function clearLine(ax: number, az: number, bx: number, bz: number): boolean {
    const steps = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / (CELL * 0.2)));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      if (isBlocked(ax + (bx - ax) * t, az + (bz - az) * t)) return false;
    }
    return true;
  }

  // A* working memory, reused between searches. `stamp` marks which search last touched a cell.
  const cost = new Float32Array(count);
  const estimate = new Float32Array(count);
  const parent = new Int32Array(count);
  const seen = new Uint32Array(count);
  const closed = new Uint32Array(count);
  let stamp = 0;

  // Binary min-heap of cell indices, ordered by `estimate`.
  const heap: number[] = [];
  function push(index: number) {
    heap.push(index);
    let i = heap.length - 1;
    while (i > 0) {
      const up = (i - 1) >> 1;
      if (estimate[heap[up]] <= estimate[heap[i]]) break;
      [heap[up], heap[i]] = [heap[i], heap[up]];
      i = up;
    }
  }
  function pop(): number {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const left = i * 2 + 1;
        const right = left + 1;
        let smallest = i;
        if (left < heap.length && estimate[heap[left]] < estimate[heap[smallest]]) smallest = left;
        if (right < heap.length && estimate[heap[right]] < estimate[heap[smallest]]) smallest = right;
        if (smallest === i) break;
        [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
        i = smallest;
      }
    }
    return top;
  }

  const STEPS: Array<[number, number, number]> = [
    [1, 0, 1],
    [-1, 0, 1],
    [0, 1, 1],
    [0, -1, 1],
    [1, 1, Math.SQRT2],
    [1, -1, Math.SQRT2],
    [-1, 1, Math.SQRT2],
    [-1, -1, Math.SQRT2],
  ];

  /** Cell indices from start to goal, or null when the goal cannot be reached. */
  function search(start: number, goal: number): number[] | null {
    stamp += 1;
    heap.length = 0;
    const goalCol = goal % cols;
    const goalRow = (goal - goalCol) / cols;
    const heuristic = (index: number) => {
      const dc = Math.abs((index % cols) - goalCol);
      const dr = Math.abs(Math.floor(index / cols) - goalRow);
      return Math.max(dc, dr) + (Math.SQRT2 - 1) * Math.min(dc, dr);
    };

    cost[start] = 0;
    estimate[start] = heuristic(start);
    parent[start] = -1;
    seen[start] = stamp;
    push(start);

    while (heap.length > 0) {
      const current = pop();
      if (closed[current] === stamp) continue;
      closed[current] = stamp;
      if (current === goal) {
        const cells: number[] = [];
        for (let at = goal; at !== -1; at = parent[at]) cells.push(at);
        return cells.reverse();
      }
      const col = current % cols;
      const row = (current - col) / cols;
      for (const [dc, dr, stepCost] of STEPS) {
        const c = col + dc;
        const r = row + dr;
        if (!inGrid(c, r)) continue;
        const neighbour = r * cols + c;
        if (blocked[neighbour] || closed[neighbour] === stamp) continue;
        // No cutting a corner between two blocked cells.
        if (dc !== 0 && dr !== 0 && (blocked[row * cols + c] || blocked[r * cols + col])) continue;
        const nextCost = cost[current] + stepCost;
        if (seen[neighbour] === stamp && nextCost >= cost[neighbour]) continue;
        seen[neighbour] = stamp;
        cost[neighbour] = nextCost;
        estimate[neighbour] = nextCost + heuristic(neighbour);
        parent[neighbour] = current;
        push(neighbour);
      }
    }
    return null;
  }

  const point = (x: number, z: number) => new THREE.Vector3(x, floorHeightAt(x, z), z);

  function findPath(from: THREE.Vector3, to: THREE.Vector3): THREE.Vector3[] {
    const end = point(to.x, to.z);
    if (!isBlocked(from.x, from.z) && clearLine(from.x, from.z, to.x, to.z)) return [end];
    const start = nearestFree(from.x, from.z);
    const goal = nearestFree(to.x, to.z);
    if (start < 0 || goal < 0) return [end];
    const cells = search(start, goal);
    if (!cells) return [end];

    // Straighten: from each kept point, jump to the farthest later point in clear line of sight.
    const xs = cells.map((index) => cellX(index % cols));
    const zs = cells.map((index) => cellZ(Math.floor(index / cols)));
    const route: THREE.Vector3[] = [];
    let anchor = 0;
    route.push(point(xs[0], zs[0]));
    while (anchor < cells.length - 1) {
      let reach = anchor + 1;
      for (let candidate = cells.length - 1; candidate > anchor + 1; candidate--) {
        if (clearLine(xs[anchor], zs[anchor], xs[candidate], zs[candidate])) {
          reach = candidate;
          break;
        }
      }
      route.push(point(xs[reach], zs[reach]));
      anchor = reach;
    }

    // Skip the first grid point when the agent can walk straight to the second.
    if (route.length > 1 && clearLine(from.x, from.z, route[1].x, route[1].z)) route.shift();
    // Likewise drop the last grid point when the one before it sees the destination.
    if (route.length > 1 && clearLine(route[route.length - 2].x, route[route.length - 2].z, end.x, end.z)) route.pop();
    route.push(end);
    return route;
  }

  return { findPath, isBlocked };
}
