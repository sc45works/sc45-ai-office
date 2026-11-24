/**
 * A scripted working session, used wherever real agents are not running:
 * the office's built-in demo, and `pnpm demo`, which writes it to the event log
 * so the whole pipeline can be watched end to end.
 */
import type { AgentState, OfficeEvent } from './events.ts';
import { CHIEF_OF_STAFF_ID as CHIEF, COORDINATOR_ID as COORDINATOR } from './roster.ts';

export type ScriptEvent = Omit<OfficeEvent, 'ts'>;

export interface ScriptStep {
  /** Seconds from the start of the loop. */
  at: number;
  event: ScriptEvent;
}

/** An agent finishes a file. It belongs to whichever mission the agent is working on. */
function output(at: number, agentId: string, path: string, label: string): ScriptStep {
  return { at, event: { type: 'agent.output', agentId, task: label, meta: { path } } };
}

function state(at: number, agentId: string, value: AgentState, task?: string, extra: Partial<ScriptEvent> = {}): ScriptStep {
  const event: ScriptEvent = { type: 'agent.state', agentId, state: value, ...extra };
  if (task) event.task = task;
  return { at, event };
}

/**
 * About a minute and a half at SC45WORKS, then it repeats. Three missions run side by
 * side: a client homepage, a YouTube episode and a sales lead. `{1}`, `{2}`, `{3}` stand
 * for mission ids, which `resolveDemoEvent` numbers afresh on every loop.
 */
export const DEMO_SCRIPT: readonly ScriptStep[] = [
  // The Chief of Staff opens the first mission and the Coordinator breaks it down.
  { at: 1.5, event: { type: 'mission.created', agentId: CHIEF, missionId: '{1}', task: 'Pixel Bytes homepage refresh' } },
  state(1.6, CHIEF, 'working', 'Briefing: homepage refresh', { missionId: '{1}' }),
  state(3, COORDINATOR, 'working', 'Breaking the mission into tasks', { missionId: '{1}' }),
  state(5, 'design.lead', 'working', 'Moodboard and hero direction', { missionId: '{1}' }),
  state(6.5, 'design.ui-ux', 'working', 'Wireframe: homepage sections', { missionId: '{1}' }),
  state(8, 'dev.lead', 'working', 'Repo and deploy setup', { missionId: '{1}' }),

  // Second mission: content.
  { at: 10, event: { type: 'mission.created', agentId: CHIEF, missionId: '{2}', task: 'YouTube: AI office build log' } },
  state(10.2, 'content.manager', 'working', 'Outline: build log episode', { missionId: '{2}' }),
  state(12, 'content.script-writer', 'working', 'Drafting hook and intro', { missionId: '{2}' }),
  state(14, 'research.scout', 'working', 'Scanning Three.js showcases', { missionId: '{2}' }),
  state(16, 'dev.frontend', 'working', 'Building hero section', { missionId: '{1}' }),
  output(9, 'design.lead', 'clients/pixel-bytes/design/moodboard.fig', 'Moodboard'),
  output(11, 'design.ui-ux', 'clients/pixel-bytes/design/wireframes.fig', 'Homepage wireframes'),
  output(12.5, 'dev.lead', 'clients/pixel-bytes/site/README.md', 'Repo set up'),
  output(15, 'content.manager', 'content/build-log/outline.md', 'Episode outline'),
  output(17, COORDINATOR, 'missions/M-homepage/tasks.md', 'Task breakdown'),

  // A designer walks over to a developer's desk.
  state(18, 'design.motion-3d', 'collaborating', 'Hero animation handoff', { missionId: '{1}', deskId: 'dev.frontend' }),
  state(18.4, CHIEF, 'idle'),

  // Third mission: sales.
  { at: 22, event: { type: 'mission.created', agentId: CHIEF, missionId: '{3}', task: 'Lead follow-up: Relay' } },
  state(22.2, 'sales.manager', 'working', 'Proposal draft: Relay', { missionId: '{3}' }),
  state(24, 'research.analyst', 'working', 'Pricing benchmarks: Taiwan studios', { missionId: '{3}' }),

  // QA gets stuck; the Coordinator walks over.
  state(27, 'dev.qa', 'blocked', 'Staging URL returns 404', { missionId: '{1}' }),
  state(28.5, COORDINATOR, 'collaborating', 'Unblocking QA', { missionId: '{1}', deskId: 'dev.qa' }),
  output(21, 'dev.frontend', 'clients/pixel-bytes/site/src/Hero.tsx', 'Hero component'),
  output(23, 'content.script-writer', 'content/build-log/script.md', 'Hook and intro draft'),
  output(26, 'research.scout', 'research/threejs-showcases.md', 'Showcase notes'),
  output(30, 'dev.frontend', 'clients/pixel-bytes/site/src/hero.css', 'Hero styles'),
  output(31, 'sales.manager', 'sales/relay/proposal.md', 'Proposal draft'),
  state(32, 'content.title-thumbnail', 'working', 'Title and thumbnail variants', { missionId: '{2}' }),
  state(34, 'design.motion-3d', 'working', 'Hero animation: scroll timeline', { missionId: '{1}' }),
  state(37, 'dev.qa', 'working', 'Testing hero on mobile', { missionId: '{1}' }),
  state(37.5, COORDINATOR, 'working', 'Updating the mission board', { missionId: '{1}' }),

  // Three leads meet in the glass room.
  state(40, 'design.lead', 'collaborating', 'Sync: homepage launch plan', { missionId: '{1}', deskId: 'meeting' }),
  state(41, 'dev.lead', 'collaborating', 'Sync: homepage launch plan', { missionId: '{1}', deskId: 'meeting' }),
  state(42, 'content.manager', 'collaborating', 'Sync: homepage launch plan', { missionId: '{1}', deskId: 'meeting' }),
  output(36, 'research.analyst', 'research/pricing-taiwan-studios.md', 'Pricing benchmarks'),
  output(39, 'design.motion-3d', 'clients/pixel-bytes/design/hero-timeline.json', 'Scroll timeline'),
  output(44, 'content.title-thumbnail', 'content/build-log/titles.md', 'Title variants'),
  output(46, 'dev.qa', 'clients/pixel-bytes/qa/mobile-report.md', 'Mobile test report'),
  state(47, 'sales.client-success', 'working', 'Onboarding checklist: Relay', { missionId: '{3}' }),
  state(50, 'dev.integrations', 'working', 'Contact form to CRM', { missionId: '{1}' }),
  state(52, 'content.social-copy', 'working', 'Launch posts, Mandarin and English', { missionId: '{2}' }),

  output(53, 'dev.frontend', 'clients/pixel-bytes/site/src/Hero.test.tsx', 'Hero tests'),
  output(54, 'dev.integrations', 'clients/pixel-bytes/site/src/contact-form.ts', 'Form to CRM'),
  output(55, 'content.social-copy', 'content/build-log/launch-posts.md', 'Launch posts'),

  // The meeting ends: one reports to the Chief of Staff, two go back to work.
  state(56, 'design.lead', 'reporting', 'Hero direction approved', { missionId: '{1}' }),
  state(56.5, 'dev.lead', 'working', 'Reviewing pull request', { missionId: '{1}' }),
  state(57, 'content.manager', 'working', 'Episode outline, second pass', { missionId: '{2}' }),
  state(63, 'design.lead', 'idle'),
  state(64, 'content.script-writer', 'reporting', 'Script draft ready for review', { missionId: '{2}' }),
  state(66, 'research.scout', 'idle', undefined, { deskId: 'lounge' }),
  state(70, 'content.script-writer', 'idle', undefined, { deskId: 'lounge' }),
  state(71, 'sales.manager', 'reporting', 'Proposal sent: Relay', { missionId: '{3}' }),
  state(72, 'research.analyst', 'idle'),
  state(73, 'sales.client-success', 'idle'),

  // Missions close one by one and the office winds down.
  { at: 77, event: { type: 'mission.closed', agentId: CHIEF, missionId: '{3}' } },
  state(77.2, 'sales.manager', 'idle'),
  state(79, 'dev.frontend', 'reporting', 'Hero section live on staging', { missionId: '{1}' }),
  state(80, 'design.ui-ux', 'idle'),
  state(81, 'design.motion-3d', 'idle', undefined, { deskId: 'lounge' }),
  state(82, 'dev.integrations', 'idle'),
  state(83, 'dev.qa', 'idle'),
  { at: 85, event: { type: 'mission.closed', agentId: CHIEF, missionId: '{1}' } },
  state(85.2, 'dev.frontend', 'idle'),
  state(85.6, 'dev.lead', 'idle'),
  state(86, COORDINATOR, 'idle'),
  state(87, 'content.title-thumbnail', 'idle'),
  state(88, 'content.social-copy', 'idle'),
  { at: 90, event: { type: 'mission.closed', agentId: CHIEF, missionId: '{2}' } },
  state(90.2, 'content.manager', 'idle'),

  // Everyone is back at a desk before the next loop.
  state(93, 'research.scout', 'idle', undefined, { deskId: 'research.scout' }),
  state(93.5, 'content.script-writer', 'idle', undefined, { deskId: 'content.script-writer' }),
  state(94, 'design.motion-3d', 'idle', undefined, { deskId: 'design.motion-3d' }),
];

export const DEMO_LOOP_SECONDS = 99;

/** Turn a script step into a real event: stamp the time and number the mission for this loop. */
/**
 * A request for sign-off, for the office's built-in demo only. It is not part of the script,
 * so `pnpm demo` never writes to the real log a request that nothing is waiting behind.
 */
export const DEMO_APPROVAL: ScriptStep = {
  at: 27,
  event: {
    type: 'approval.requested',
    agentId: COORDINATOR,
    missionId: '{1}',
    task: 'Start stage 2: Pixel Bytes homepage refresh',
    meta: {
      approvalId: 'demo-stage-2',
      kind: 'stage',
      project: 'pixel-bytes',
      stage: 2,
      stages: 3,
      files: 4,
      costUsd: 0.38,
      items: [
        { agentId: 'dev.frontend', task: 'Build the homepage from the wireframes', stage: 2, risk: 'Replaces the current home page' },
        { agentId: 'dev.integrations', task: 'Wire the contact form to the inbox', stage: 2 },
      ],
    },
  },
};

export function resolveDemoEvent(step: ScriptStep, loop: number, now: Date = new Date()): OfficeEvent {
  const event: OfficeEvent = { ...step.event, ts: now.toISOString() };
  if (step.event.missionId) {
    event.missionId = step.event.missionId.replace(/\{(\d)\}/, (_match, digit: string) => `M-${101 + loop * 3 + (Number(digit) - 1)}`);
  }
  return event;
}
