# SC45WORKS AI Company — Org Chart

A personal AI operating system run like a company. Stephen is CEO. One voice interface (the Chief of Staff) delegates missions to department managers and their agents. Every agent has a desk in a 3D office; its state (idle, working, visiting another department) drives its avatar.

## Executive office

**CEO — Stephen.** Sets direction, approves, talks only to the Chief of Staff (and anyone else when he wants to).

**Chief of Staff (voice interface).** The single agent Stephen talks to. Understands goals, asks clarifying questions, turns intent into missions, assigns them to departments, and briefs Stephen on outcomes and decisions needed. Strategic, not operational.

**Project Coordinator.** The operator under the Chief of Staff. Keeps the task board: breaks missions into tasks, tracks status, deadlines, blockers and dependencies, chases agents, and reports progress upward. In the 3D office this is the agent constantly walking between desks.

## Design department

**Design Lead.** Owns visual direction for client sites and SC45 brand. Reviews layouts, typography, color, motion.

**UI/UX Designer.** Wireframes, component specs, user flows, Figma-style handoff notes.

**3D / Motion Designer.** Three.js scenes, animations, interaction ideas; also builds the office itself.

## Development department

**Dev Lead / Architect.** Chooses stack, structures repos, reviews code, owns deployment.

**Frontend Developer.** Builds pages and components from design specs.

**Integrations Engineer.** APIs, automations, MCP connections, forms, CMS, payments.

**QA Tester.** Checks builds across devices, writes bug reports.

## Content & marketing department

**Content Manager.** Owns the content calendar for the YouTube channel, iamstephen.com and social.

**Video Script Writer.** Takes a topic or rough voice note and drafts hook, structure, talking points and call to action in Stephen's voice.

**Title & Thumbnail Specialist.** Title variants, thumbnail concepts, packaging tests.

**Social / Copywriter.** Posts, newsletter, website copy, bilingual (Mandarin / English).

## Sales & client care department

**Sales Manager.** Lead follow-up, proposals, quotes, pipeline.

**Client Success.** Onboarding, status updates, revisions, invoices, after-launch care.

## Research & intelligence

**Research Scout.** Feeds the daily inspiration dashboard: X, Dribbble, Pinterest, Three.js showcases, AI tool news; summarizes what is worth Stephen's attention.

**Competitor / Market Analyst.** Watches other studios, pricing, positioning in Taiwan and the US.

## Office layout (first draft)

- Center: CEO desk and Chief of Staff beside it.
- Project Coordinator desk near the center with a visible task board.
- Five zones around the edge: Design, Development, Content, Sales, Research.
- Meeting room: agents gather here when collaborating on one mission.
- Lounge: idle agents sit here, so activity is visible at a glance.

## Agent states to visualize

- Idle — at own desk or lounge.
- Working — at own desk, with a task label above.
- Collaborating — walks to another department or the meeting room.
- Blocked — waiting icon; Coordinator walks over.
- Reporting — walks to the Chief of Staff.

## Build order

1. Org chart and agent roles (this document).
2. 3D office in Three.js with hard-coded agents and states.
3. Event stream: Claude Code agents emit state changes; office reacts.
4. Chief of Staff with voice in and out.
5. Memory, scheduling (Pulse) and dashboard layer.
