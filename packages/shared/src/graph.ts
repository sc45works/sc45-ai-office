/**
 * What an agent has touched, as a small graph: the agent in the middle, the missions it
 * worked on, the tasks it did for each, and the files it produced, grouped by folder.
 *
 * It is built only from the snapshot, which is built only from events. The server serves
 * it at `GET /agents/:id/graph`; the office builds the same graph locally with this function.
 */
import { AGENTS, findAgent } from './roster.ts';
import type { OfficeSnapshot } from './state.ts';

export type GraphNodeKind = 'agent' | 'mission' | 'task' | 'folder' | 'file';

export interface GraphNode {
  id: string;
  kind: GraphNodeKind;
  /** Short text shown beside the node. */
  label: string;
  /** Longer text for a tooltip or a list: a mission's title, a file's full path. */
  detail?: string;
  /** The agent this node stands for, when it stands for one. */
  agentId?: string;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface AgentGraph {
  agentId: string;
  nodes: GraphNode[];
  links: GraphLink[];
}

/** `packages/office/src/hero.ts` -> `packages/office/src`; a bare file name has no folder. */
export function folderOf(path: string): string {
  const cut = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
  return cut > 0 ? path.slice(0, cut) : '';
}

/** `packages/office/src/hero.ts` -> `hero.ts`. */
export function fileNameOf(path: string): string {
  const cut = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
  return cut >= 0 ? path.slice(cut + 1) : path;
}

/** The last two parts of a folder path, enough to recognise it: `office/src`. */
function shortFolder(folder: string): string {
  return folder.split(/[\\/]/).filter(Boolean).slice(-2).join('/');
}

export function buildAgentGraph(snapshot: OfficeSnapshot, agentId: string): AgentGraph {
  const root = `agent:${agentId}`;
  const nodes: GraphNode[] = [{ id: root, kind: 'agent', label: snapshot.profiles?.[agentId]?.name ?? findAgent(agentId)?.name ?? agentId }];
  const links: GraphLink[] = [];
  const seen = new Set<string>([root]);
  const activity = snapshot.activity?.[agentId];
  if (!activity) return { agentId, nodes, links };

  const add = (node: GraphNode, parent: string) => {
    if (!seen.has(node.id)) {
      seen.add(node.id);
      nodes.push(node);
    }
    if (!links.some((link) => link.source === parent && link.target === node.id)) links.push({ source: parent, target: node.id });
  };
  /** The node a task or file hangs from: its mission if it has one, otherwise the agent. */
  const parentFor = (missionId: string | undefined) => {
    if (!missionId) return root;
    const title = snapshot.missions.find((mission) => mission.id === missionId)?.title;
    add({ id: `mission:${missionId}`, kind: 'mission', label: missionId, detail: title }, root);
    return `mission:${missionId}`;
  };

  for (const missionId of activity.missions) parentFor(missionId);
  for (const task of activity.tasks) {
    add({ id: `task:${task.missionId ?? ''}:${task.label}`, kind: 'task', label: task.label }, parentFor(task.missionId));
  }
  for (const output of activity.outputs) {
    const parent = parentFor(output.missionId);
    const folder = folderOf(output.path);
    let holder = parent;
    if (folder) {
      holder = `folder:${folder}`;
      add({ id: holder, kind: 'folder', label: shortFolder(folder), detail: folder }, parent);
    }
    add({ id: `file:${output.path}`, kind: 'file', label: fileNameOf(output.path), detail: output.label ?? output.path }, holder);
  }
  return { agentId, nodes, links };
}

/** How much of the company fits in one sphere before it stops being readable. */
export const COMPANY_GRAPH_LIMITS = { missions: 6, agentsPerMission: 6, filesPerAgent: 2 } as const;

/**
 * The whole company as one graph: SC45WORKS in the middle, every open mission round it
 * (then the most recently finished, while there is room), the agents on each mission, and
 * the files each of them produced for it. Agents busy with something that has no mission
 * hang from the centre.
 */
export function buildCompanyGraph(snapshot: OfficeSnapshot): AgentGraph {
  const root = 'company';
  const nodes: GraphNode[] = [{ id: root, kind: 'agent', label: 'SC45WORKS' }];
  const links: GraphLink[] = [];
  const limits = COMPANY_GRAPH_LIMITS;

  const open = snapshot.missions.filter((mission) => mission.status !== 'done').reverse();
  const done = snapshot.missions.filter((mission) => mission.status === 'done').reverse();
  for (const mission of [...open, ...done].slice(0, limits.missions)) {
    const missionNode = `mission:${mission.id}`;
    nodes.push({ id: missionNode, kind: 'mission', label: mission.id, detail: mission.title });
    links.push({ source: root, target: missionNode });

    // Everyone who is on it now or has worked on it, in roster order.
    const people = AGENTS.filter((agent) => snapshot.agents[agent.id]?.missionId === mission.id || snapshot.activity?.[agent.id]?.missions.includes(mission.id));
    for (const agent of people.slice(0, limits.agentsPerMission)) {
      const agentNode = `agent:${mission.id}:${agent.id}`;
      const status = snapshot.agents[agent.id];
      nodes.push({ id: agentNode, kind: 'agent', label: snapshot.profiles?.[agent.id]?.name ?? agent.name, detail: status?.missionId === mission.id ? status.task : undefined, agentId: agent.id });
      links.push({ source: missionNode, target: agentNode });
      const outputs = (snapshot.activity?.[agent.id]?.outputs ?? []).filter((output) => output.missionId === mission.id);
      for (const output of outputs.slice(-limits.filesPerAgent)) {
        const fileNode = `file:${mission.id}:${agent.id}:${output.path}`;
        nodes.push({ id: fileNode, kind: 'file', label: fileNameOf(output.path), detail: output.label ?? output.path });
        links.push({ source: agentNode, target: fileNode });
      }
    }
  }
  for (const agent of AGENTS) {
    const status = snapshot.agents[agent.id];
    if (!status || status.state === 'idle' || status.missionId) continue;
    const agentNode = `agent::${agent.id}`;
    nodes.push({ id: agentNode, kind: 'agent', label: snapshot.profiles?.[agent.id]?.name ?? agent.name, detail: status.task, agentId: agent.id });
    links.push({ source: root, target: agentNode });
  }
  return { agentId: root, nodes, links };
}
