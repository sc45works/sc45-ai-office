/**
 * Who works at SC45WORKS.
 *
 * An agent's id is the id of its home desk in the office layout, and it is the
 * `agentId` on every event. Roles come from docs/org-chart.md.
 */

export const CHIEF_OF_STAFF_ID = 'exec.chief-of-staff';
export const COORDINATOR_ID = 'exec.project-coordinator';

export interface AgentProfile {
  /** The agent's id in events. By convention it is the id of its home desk. */
  id: string;
  /** Shown on the name tag. */
  name: string;
  /** Shown under the name while the agent is idle. */
  role: string;
  /** Stephen is a person, not an agent: he has a figure in the office, but no events move him. */
  human?: boolean;
}

/** The names are placeholders, apart from Stephen and Sophia: change them freely. */
export const AGENTS: readonly AgentProfile[] = [
  { id: 'exec.ceo', name: 'Stephen', role: 'CEO', human: true },
  { id: CHIEF_OF_STAFF_ID, name: 'Sophia', role: 'Chief of Staff' },
  { id: COORDINATOR_ID, name: 'Theo', role: 'Project Coordinator' },
  { id: 'design.lead', name: 'Mika', role: 'Design Lead' },
  { id: 'design.ui-ux', name: 'Noor', role: 'UI/UX Designer' },
  { id: 'design.motion-3d', name: 'Kai', role: '3D / Motion Designer' },
  { id: 'dev.lead', name: 'Ada', role: 'Dev Lead / Architect' },
  { id: 'dev.frontend', name: 'Leo', role: 'Frontend Developer' },
  { id: 'dev.integrations', name: 'Ravi', role: 'Integrations Engineer' },
  { id: 'dev.qa', name: 'Tess', role: 'QA Tester' },
  { id: 'content.manager', name: 'Maya', role: 'Content Manager' },
  { id: 'content.script-writer', name: 'Jun', role: 'Video Script Writer' },
  { id: 'content.title-thumbnail', name: 'Zoe', role: 'Title & Thumbnail Specialist' },
  { id: 'content.social-copy', name: 'Lin', role: 'Social / Copywriter' },
  { id: 'sales.manager', name: 'Marco', role: 'Sales Manager' },
  { id: 'sales.client-success', name: 'Hana', role: 'Client Success' },
  { id: 'research.scout', name: 'Iris', role: 'Research Scout' },
  { id: 'research.analyst', name: 'Otto', role: 'Competitor / Market Analyst' },
];

/** Agents that events can move: everyone except the human. */
export const EMITTING_AGENTS: readonly AgentProfile[] = AGENTS.filter((agent) => !agent.human);

export function findAgent(id: string): AgentProfile | undefined {
  return AGENTS.find((agent) => agent.id === id);
}
