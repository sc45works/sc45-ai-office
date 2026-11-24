# Office hero

The SC45 AI Office as a background for the top of a web page: the office, the beach and the
city, alive, with no panels, name tags or controls over it. It turns slowly, follows the
visitor's clock for its time of day (the party and the lit city come out at night), and stops
drawing whenever it is off screen or the tab is hidden. It needs nothing from the command
centre's server.

## What is in this folder

| File | What it is |
| --- | --- |
| `OfficeHero.tsx` | The React component. This is what you import. |
| `office-hero.js` (194 kB, 61 kB gzipped) | The scene, using the copy of three.js your site already has. |
| `office-hero.standalone.js` (889 kB, 215 kB gzipped) | The same with three.js built in, for a page that has none or an older one. |
| `office-hero.d.ts`, `office-hero.standalone.d.ts` | Types for the two files above. |
| `office-poster.jpg` | A still of the opening view (1920 by 1080), shown while the scene loads and on phones. |
| `demo.html` | A plain-HTML page that runs it, to see it before wiring it in. |

## Put it on the site (React)

1. Copy this folder into the site's source, for example `src/components/office-hero/`.
2. Copy `office-poster.jpg` into the site's `public/` folder.
3. Make sure three.js is installed: `npm install three`. This was built and tested against
   three 0.187. If the site pins a much older three and the scene fails to start, switch to the
   standalone file: in `OfficeHero.tsx`, change `./office-hero` to `./office-hero.standalone`
   in the two places marked.
4. Use it:

```tsx
import OfficeHero from './components/office-hero/OfficeHero';

export default function Hero() {
  return (
    <OfficeHero height="100svh" poster="/office-poster.jpg" offset={{ x: 0.16 }}>
      <div style={{ height: '100%', display: 'grid', alignContent: 'center', padding: '0 7vw', maxWidth: '34rem' }}>
        <h1>Solo Creator. Solo Creative.</h1>
        <p>One founder and sixteen AI agents.</p>
      </div>
    </OfficeHero>
  );
}
```

The component is marked `'use client'`, so it works as it is in the Next.js app router. The
scene's code is only downloaded when the hero is within a screen of being visible.

## Props

| Prop | Default | |
| --- | --- | --- |
| `height` | `'100svh'` | Any CSS length. |
| `poster` | none | Image shown until the scene is ready, and wherever it does not run. |
| `video` | none | A short muted loop for phones: see below. |
| `liveOnMobile` | `false` | Run the live scene on phones and tablets too. |
| `sky` | `'auto'` | `'auto'` follows the visitor's clock; or hold `'day'`, `'dusk'` or `'night'`. |
| `motion` | `'sway'` | `'sway'` swings either side of the starting angle, `'orbit'` goes all the way round, `'still'` does not move. |
| `period` | `90` | Seconds for one swing or one turn. |
| `swing` | `28` | Degrees either side, for `'sway'`. |
| `angle` | `45` | Starting angle round the office: 0 is square on to the front, 45 the front corner. |
| `elevation` | `33` | Degrees above the horizon. |
| `zoom` | `1` | 1 fits the whole office; more is closer, less shows more beach and city. |
| `offset` | none | `{ x: 0.16 }` moves the office right by 16% of the width, leaving the left for words. |
| `scrim` | a dark fade from the left | Any CSS background laid over the picture so words stay readable; `false` for none. |
| `lively` | `true` | Everybody up and about, as in the tour; `false` plays the quieter demo day. |
| `maxPixelRatio` | `1.5` (1.25 on phones) | Lower it if the page feels heavy. |

The options are read when the scene starts. To change them afterwards, give the component a new `key`.

Visitors who have asked their system for reduced motion get a still, living picture: the camera
does not move and people are placed, not walked.

## Phones, and the video

By default phones and tablets do not run the 3D scene: they show `video` if you give one, and the
poster otherwise. To make the video, record the tour or the hero on a computer, cut about fifteen
seconds that loops cleanly, export it as a muted MP4 (H.264, 1280 wide, around 1 to 2 MB), put
it in `public/` and pass `video="/office-loop.mp4"`.

## Without React

```html
<div id="hero" style="height: 100svh"></div>
<script type="module">
  import { mountOfficeHero } from './office-hero.standalone.js';
  const hero = mountOfficeHero(document.querySelector('#hero'), { sky: 'auto', offset: { x: 0.16 } });
  // hero.pause(), hero.resume(), hero.setSky('night'), hero.dispose()
</script>
```

To try `demo.html`, serve this folder over http (for example `npx serve` here) and open it; a
browser will not load a module from a page opened straight off the disk.

## Fonts

The signs inside the scene (the name over the door, the mission board) are drawn with Space
Grotesk and JetBrains Mono when the page has them, and with the browser's own fonts when it
does not.

## Rebuilding it

This folder is built from the command centre's source (`packages/office/src/hero.ts`). After
changing the office, run `pnpm build:hero` there and copy the two `.js` files from
`packages/office/dist-hero/` over the ones here.
