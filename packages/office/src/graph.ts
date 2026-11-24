/**
 * SC45 AI Office: the hologram graph.
 *
 * When an agent is selected, a small sphere of connected nodes floats above it: the
 * agent in the middle, then the missions it worked on, the tasks it did, and the files
 * it produced, grouped by folder. The data is an `AgentGraph` from @sc45/shared; this
 * file only lays it out and draws it.
 */
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import type { AgentGraph, GraphNode, GraphNodeKind } from '@sc45/shared';
import { PALETTE } from './layout';
import { neonColor } from './scene';

/** How far the graph's centre floats above the agent's feet. */
const HEIGHT_ABOVE_AGENT = 4.5;
/** Distance from the centre for each level of the tree: agent, its children, theirs, and so on. */
const RING = [0, 0.7, 1.25, 1.65];
/** How widely a node's children fan out round it, per level. */
const SPREAD = [0, 0.9, 0.75, 0.55];
const SHELL_RADIUS = 1.82;

const SPHERE = new THREE.IcosahedronGeometry(1, 1);
const OCTA = new THREE.OctahedronGeometry(1, 0);
const CUBE = new THREE.BoxGeometry(1, 1, 1);

const NODE_STYLE: Record<GraphNodeKind, { geometry: THREE.BufferGeometry; size: number }> = {
  agent: { geometry: SPHERE, size: 0.11 },
  mission: { geometry: OCTA, size: 0.085 },
  task: { geometry: SPHERE, size: 0.042 },
  folder: { geometry: CUBE, size: 0.085 },
  file: { geometry: CUBE, size: 0.05 },
};

export interface GraphViewOptions {
  /** Size multiplier. 1 is the sphere above an agent. */
  scale?: number;
  /** How far the centre floats above the anchor, in world units. */
  height?: number;
  /** Multiplier on node size, for a large sphere whose nodes should not grow with it. */
  nodeScale?: number;
  /** The company sphere's look: a shell of fine dots, bright thin links, and a dot travelling along each link. */
  dotted?: boolean;
  /** Label agent nodes too. Off above an agent, which already has its name tag. */
  labelAgents?: boolean;
  /** The colour for a node that stands for an agent (its department's), if not the graph's accent. */
  colorOf?: (node: GraphNode) => string | undefined;
  /** Called when the label of a node that stands for an agent is pressed. Makes those labels clickable. */
  onPickAgent?: (agentId: string) => void;
}

export interface GraphView {
  /** Show this graph. Calling it again with the same nodes is free; new nodes redraw it. */
  show(graph: AgentGraph, accent: string): void;
  hide(): void;
  /** The agent whose node the ray passes closest to, if it passes near one. For clicking the balls. */
  pickAgent(ray: THREE.Ray): string | null;
  /** Tell the sphere where the pointer is. While the pointer is over it, it stops turning, so its nodes can be pressed. */
  hover(ray: THREE.Ray | null): void;
  /** Follow the agent and animate. `anchor` is the selected agent's position. */
  update(delta: number, time: number, anchor: THREE.Vector3 | null, camera: THREE.Camera): void;
}

/** A soft round dot, so points are discs and not squares. */
let dotTexture: THREE.CanvasTexture | null = null;
function roundDot(): THREE.CanvasTexture {
  if (dotTexture) return dotTexture;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const g = canvas.getContext('2d')!;
  const gradient = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.55, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gradient;
  g.fillRect(0, 0, 64, 64);
  return (dotTexture = new THREE.CanvasTexture(canvas));
}

function dots(positions: number[], color: THREE.Color, size: number, opacity = 1): THREE.Points {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.Points(geometry, new THREE.PointsMaterial({ color, size, map: roundDot(), transparent: true, opacity, depthWrite: false, sizeAttenuation: true }));
}

/** Points along a segment, `gap` apart, not counting its two ends. */
function along(a: THREE.Vector3, b: THREE.Vector3, gap: number, into: number[]) {
  const steps = Math.max(2, Math.round(a.distanceTo(b) / gap));
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    into.push(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
  }
}

function shorten(text: string, max = 22): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** The agent's direct children sit round it in a ring, alternately a little above and below the middle. */
function ringDirection(index: number, count: number): THREE.Vector3 {
  const angle = (index / count) * Math.PI * 2 + 0.6;
  const lift = count > 2 ? (index % 2 ? 0.32 : -0.32) : 0;
  return new THREE.Vector3(Math.cos(angle), lift, Math.sin(angle)).normalize();
}

/** Lay the tree out on nested shells: each node's children fan out in a cone round its own direction. */
function layout(graph: AgentGraph): Map<string, THREE.Vector3> {
  const children = new Map<string, string[]>();
  for (const link of graph.links) {
    if (!children.has(link.source)) children.set(link.source, []);
    children.get(link.source)!.push(link.target);
  }
  const positions = new Map<string, THREE.Vector3>();
  const root = graph.nodes[0]?.id;
  if (!root) return positions;
  positions.set(root, new THREE.Vector3());

  const place = (id: string, direction: THREE.Vector3, depth: number) => {
    const kids = (children.get(id) ?? []).filter((kid) => !positions.has(kid));
    const level = Math.min(depth, RING.length - 1);
    // Two axes at right angles to the parent's direction, to fan the children out round it.
    const u = new THREE.Vector3().crossVectors(direction, Math.abs(direction.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)).normalize();
    const v = new THREE.Vector3().crossVectors(direction, u).normalize();
    kids.forEach((kid, index) => {
      let kidDirection: THREE.Vector3;
      if (depth === 1) {
        kidDirection = ringDirection(index, kids.length);
      } else {
        const angle = (index / kids.length) * Math.PI * 2 + depth;
        const spread = kids.length === 1 ? SPREAD[level] * 0.35 : SPREAD[level];
        kidDirection = direction.clone().addScaledVector(u, Math.cos(angle) * spread).addScaledVector(v, Math.sin(angle) * spread).normalize();
      }
      positions.set(kid, kidDirection.clone().multiplyScalar(RING[level]));
      place(kid, kidDirection, depth + 1);
    });
  };
  place(root, new THREE.Vector3(0, 1, 0), 1);
  return positions;
}

export function createGraphView(scene: THREE.Scene, options: GraphViewOptions = {}): GraphView {
  const size = options.scale ?? 1;
  const height = options.height ?? HEIGHT_ABOVE_AGENT;
  const nodeScale = options.nodeScale ?? 1;
  const group = new THREE.Group();
  group.name = 'agent-graph';
  group.visible = false;
  scene.add(group);

  // The part that turns: nodes and links. Labels turn with it but always face the viewer.
  const spinner = new THREE.Group();
  group.add(spinner);

  // A faint shell, so the cluster reads as one sphere: fine lines, or a web of dots.
  const shellEdges = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(SHELL_RADIUS, options.dotted ? 2 : 1));
  let shell: THREE.Object3D;
  if (options.dotted) {
    const edge = shellEdges.getAttribute('position');
    const points: number[] = [];
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    for (let i = 0; i < edge.count; i += 2) {
      a.fromBufferAttribute(edge, i);
      b.fromBufferAttribute(edge, i + 1);
      points.push(a.x, a.y, a.z);
      along(a, b, 0.14, points);
    }
    shell = dots(points, new THREE.Color('#ffffff'), 0.065 * size, 0.7);
    shellEdges.dispose();
  } else {
    shell = new THREE.LineSegments(shellEdges, new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.07, depthWrite: false }));
  }
  group.add(shell);

  // A thin thread of light from the agent up to its graph.
  const tetherMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
  const tether = new THREE.Mesh(CUBE, tetherMaterial);
  const tetherLength = Math.max(0.2, height / size - SHELL_RADIUS - 2.25 / size); // starts just above the name tag
  tether.scale.set(0.012, tetherLength, 0.012);
  tether.position.y = -SHELL_RADIUS - tetherLength / 2;
  group.add(tether);

  let signature = '';
  let wanted = false;
  let amount = 0;
  const labels: CSS2DObject[] = [];
  const centre = new THREE.Vector3();
  const towardsCamera = new THREE.Vector3();
  const labelPosition = new THREE.Vector3();

  // What is needed to move a dot along each link, and to find the node under a click.
  let pulses: THREE.Points | null = null;
  let pulseLinks: Array<[THREE.Vector3, THREE.Vector3]> = [];
  let agentNodes: Array<{ agentId: string; mesh: THREE.Mesh }> = [];
  let held = false;
  let spin = 0;
  const nodePosition = new THREE.Vector3();

  function clear() {
    for (const child of [...spinner.children]) {
      spinner.remove(child);
      if (child instanceof THREE.LineSegments || child instanceof THREE.Points) child.geometry.dispose();
    }
    pulses = null;
    pulseLinks = [];
    agentNodes = [];
  }

  function build(graph: AgentGraph, accent: string) {
    clear();
    labels.length = 0;
    const positions = layout(graph);
    const accentColor = neonColor(accent);
    const colors: Record<GraphNodeKind, THREE.Color> = {
      agent: accentColor.clone().multiplyScalar(1.2),
      mission: neonColor(PALETTE.white, 0.95),
      task: accentColor,
      folder: neonColor(PALETTE.steel, 0.75),
      file: neonColor(PALETTE.soft, 0.9),
    };
    const materials = new Map<string, THREE.MeshBasicMaterial>();
    const material = (node: GraphNode) => {
      const own = options.colorOf?.(node);
      const key = own ?? node.kind;
      if (!materials.has(key)) materials.set(key, new THREE.MeshBasicMaterial({ color: own ? neonColor(own, 0.85) : colors[node.kind] }));
      return materials.get(key)!;
    };

    const addNode = (node: GraphNode, position: THREE.Vector3) => {
      const style = NODE_STYLE[node.kind];
      const mesh = new THREE.Mesh(style.geometry, material(node));
      mesh.scale.setScalar(style.size * nodeScale);
      mesh.position.copy(position);
      if (node.kind !== 'task' && node.kind !== 'agent') mesh.rotation.set(0.6, 0.8, 0);
      spinner.add(mesh);
      if (node.agentId) agentNodes.push({ agentId: node.agentId, mesh });
      if (node.kind === 'agent' && !options.labelAgents) return; // the agent already has its name tag

      const element = document.createElement('div');
      element.className = 'graph-label';
      element.dataset.kind = node.kind;
      element.style.setProperty('--accent', options.colorOf?.(node) ?? accent);
      element.textContent = shorten(node.label);
      const agentId = node.agentId;
      if (agentId && options.onPickAgent) {
        element.dataset.pick = 'true';
        element.addEventListener('click', () => options.onPickAgent?.(agentId));
      }
      if (node.detail) element.title = node.detail;
      const label = new CSS2DObject(element);
      label.center.set(0.5, 0);
      label.position.copy(position).y -= style.size * nodeScale + 0.03;
      spinner.add(label);
      labels.push(label);
    };

    const points: number[] = [];
    for (const node of graph.nodes) {
      const position = positions.get(node.id);
      if (position) addNode(node, position);
    }
    for (const link of graph.links) {
      const a = positions.get(link.source);
      const b = positions.get(link.target);
      if (!a || !b) continue;
      points.push(a.x, a.y, a.z, b.x, b.y, b.z);
      if (options.dotted) pulseLinks.push([a, b]);
    }
    if (options.dotted) {
      // Inside: thin bright lines, with a small dot travelling outwards along each. (The dots are the shell.)
      const linkGeometry = new THREE.BufferGeometry();
      linkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      spinner.add(new THREE.LineSegments(linkGeometry, new THREE.LineBasicMaterial({ color: neonColor(PALETTE.white, 0.95), transparent: true, opacity: 0.9, depthWrite: false })));
      pulses = dots(new Array(pulseLinks.length * 3).fill(0), neonColor(PALETTE.peach, 1.2), 0.2 * size);
      spinner.add(pulses);
      tetherMaterial.color.copy(accentColor).multiplyScalar(0.6);
      return;
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({ color: accentColor.clone().multiplyScalar(0.55), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    spinner.add(lines);
    tetherMaterial.color.copy(accentColor).multiplyScalar(0.6);
  }

  return {
    show(graph, accent) {
      const next = `${graph.agentId}|${graph.nodes.map((node) => `${node.id}=${node.detail ?? ''}`).join('|')}`;
      if (next !== signature) {
        if (!signature.startsWith(`${graph.agentId}|`)) amount = 0; // a different agent: grow in from nothing
        signature = next;
        build(graph, accent);
      }
      wanted = true;
      group.visible = true;
    },
    hide() {
      wanted = false;
    },
    hover(ray) {
      held = Boolean(ray) && group.visible && ray!.distanceSqToPoint(group.getWorldPosition(nodePosition)) < (SHELL_RADIUS * size * 1.05) ** 2;
    },
    pickAgent(ray) {
      if (!group.visible || !wanted) return null;
      // The ball the ray passes nearest to, if that is near enough. Generous, because the balls are small.
      const reach = (0.34 * Math.max(size * 0.5, 0.6)) ** 2;
      let best: { agentId: string; distance: number } | null = null;
      for (const { agentId, mesh } of agentNodes) {
        const distance = ray.distanceSqToPoint(mesh.getWorldPosition(nodePosition));
        if (distance <= reach && (!best || distance < best.distance)) best = { agentId, distance };
      }
      return best?.agentId ?? null;
    },
    update(delta, time, anchor, camera) {
      if (!group.visible) return;
      amount += ((wanted ? 1 : 0) - amount) * (1 - Math.exp(-7 * delta));
      if (!wanted && amount < 0.02) {
        group.visible = false;
        signature = '';
        clear();
        return;
      }
      // It rises from its anchor as it opens, and sinks back as it closes.
      if (anchor) group.position.set(anchor.x, anchor.y + height * (0.35 + 0.65 * amount), anchor.z);
      group.scale.setScalar((0.25 + 0.75 * amount) * size);
      // Turns slowly, and holds still while the pointer is over it. (No turning at all with reduced motion.)
      if (time === 0) spin = 0;
      else if (!held) spin += delta * 0.16;
      spinner.rotation.y = spin;
      if (pulses) {
        const position = pulses.geometry.getAttribute('position') as THREE.BufferAttribute;
        pulseLinks.forEach(([a, b], index) => {
          const t = (time * 0.35 + index * 0.37) % 1;
          position.setXYZ(index, a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
        });
        position.needsUpdate = true;
      }
      shell.rotation.y = -spin * 0.3;
      shell.rotation.x = Math.sin(time * 0.2) * 0.15;

      // Labels on the far side of the sphere step back, so the near ones stay readable.
      group.getWorldPosition(centre);
      towardsCamera.subVectors(camera.position, centre);
      for (const label of labels) {
        label.getWorldPosition(labelPosition).sub(centre);
        label.element.dataset.far = String(labelPosition.dot(towardsCamera) < 0);
      }
    },
  };
}
