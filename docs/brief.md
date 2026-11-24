# SC45 AI Office — Visual Direction Brief

The SC45WORKS studio at night: a warm wooden floor floating in near-black, wood furniture, indoor trees, and thin light in the brand's spark colours. Every agent's state is readable at a glance. Built in Three.js. Calm by default, glowing where work happens.

This replaces the first, cyberpunk direction (navy floor, grid, cyan primary).

## Mood in one line

A design studio after dark: walnut floor, oak desks, slat walls, greenery, and light strips in orange, pink and violet. Warm and premium, not cold or cluttered.

## Colour system

The SC45WORKS palette, taken from the live site and logo files.

| Use | Colour | Hex |
| --- | --- | --- |
| Background, the void round the floor | Void | #020202 |
| Headlines, HUD numbers, executive light strips | White | #FFFFFF |
| Spark start; Content & Marketing | Orange | #FF4A12 |
| Spark middle; Design | Pink | #FF2E88 |
| Spark end; Development | Violet | #7B5CFF |
| Spark end on text and holograms | Light violet | #8F75FF |
| Sales & Client Care; lounge lamp; focus outline | Peach | #FFB08F |
| Research & Intelligence; "online" status | Online green | #2BD576 |
| Centre of the live dot | Ember | #FF6A3A |
| Meeting room edges, labels | Soft | #C9C9D1 |
| Body text | Mist | #B4B4BE |
| Small labels, quiet notes | Steel | #8E8E99 |
| Blocked agent (status only, not a brand colour) | Alert red | #FF3B5C |

Spark gradient: `linear-gradient(90deg, #FF4A12, #FF2E88 50%, #8F75FF)`.

Rules:

- The spark gradient is used once per composition: the trim round the executive deck in 3D, one accent word in the HUD.
- One accent per department, used on its floor strip, desk edges, screens and (later) avatar outline and task labels.
- Glass surfaces are white at low opacity over the void, with borders at 10 to 16 percent white.

## Materials and lighting

- Floor: walnut planks, staggered, each with its own tone and fine grain. A finite slab in the void.
- Executive platform: lighter oak decking, raised 0.3, planks running front to back.
- Furniture: oak tops on charcoal metal frames; dark upholstery; oak planters.
- Walls: a wooden slat wall behind each department, 2 high, so it never hides a desk from the overview.
- Greenery: stylised indoor trees and shrubs in the gaps between zones. Leaves move a little.
- Light: low warm ambient, plus one soft warm spotlight per zone, tinted slightly towards the zone's accent.
- Accent light: thin strips inlaid in the floor round each zone and round each desk top.
- Post-processing: bloom on light strips and screens only (threshold 0.42, strength 0.8, radius 0.4, eased back up close), slight vignette.
- Atmosphere: thin fog to black, so distant zones soften.

## Camera

- Default: tilted isometric-style perspective, about 35 degrees down, whole office in frame.
- Orbit and zoom with mouse or touch; smooth damped movement.
- Click an agent: camera eases in and follows them; Escape returns to the overview.

## Office layout

- Centre platform: CEO desk and Chief of Staff on the oak deck, white light strips, spark gradient trim.
- Project Coordinator desk beside the centre, with a floating mission board on smoked glass.
- Five department zones round the centre, each with its accent colour, a slat wall and three to four desks.
- Meeting room: glass box with a round oak table, where collaborating agents gather.
- Lounge: dim corner with soft seating, a peach lamp and trees, where idle agents sit.
- Entrance: SC45WORKS lettering inlaid in the floor, a tree either side.

## Agent avatars

- Simple stylised humanoid, low-poly, dark body with a thin outline of light in the department colour.
- Floating name tag above the head; a second line shows the current task when working.
- Chief of Staff slightly taller, white, with a subtle animated halo in the spark gradient.
- Walking animation between desks; typing or gesturing animation when working.

## State language

| State | Where | Visual cue |
| --- | --- | --- |
| Idle | Own desk or lounge | Outline dimmed, no label |
| Working | Own desk | Outline bright, task label pulsing slowly |
| Collaborating | Another zone or meeting room | Walks there, light trail in own colour |
| Blocked | Own desk | Alert red ring, Coordinator walks over |
| Reporting | Chief of Staff platform | Walks to centre, spark gradient beam between them |

## Interface overlay

- Glass panels, rounded, Space Grotesk and JetBrains Mono until the brand fonts are confirmed.
- Top left: SC45WORKS (WORKS in the spark gradient), the live dot and a clock. Top right: active missions count.
- Side panel on agent click: role, current task, recent outputs, and the agent's sphere of connected files and tasks.
- Voice indicator for the Chief of Staff: waveform in the spark gradient when listening or speaking.

## Motion principles

- Slow and deliberate: nothing flashes; pulses breathe at two to three seconds.
- Every state change is a walk or a fade, never an instant jump.
- Idle office stays alive: leaves sway, the hologram flickers now and then, the live dot pulses.

## Prototype milestones

1. Static office: floor, zones, desks, wood, trees, lighting, bloom.
2. Avatars at desks with name tags and department colours.
3. State machine: idle, working, collaborating, blocked, reporting, driven by a mock event feed.
4. Camera follow and side panel.
5. Connect to real Claude Code agent events.
