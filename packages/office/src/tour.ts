/**
 * SC45 AI Office: the tour.
 *
 * A scripted flight of about a hundred seconds, made to be screen-recorded: morning over the
 * sea, along the boardwalk, past the volleyball and the gym, across the road and in through
 * the front door, a pass over each department, then up and away to a high view of the whole
 * coast as the sun goes down and the neon comes on, ending on the sign.
 *
 * It is a list of shots. Each shot moves the camera from one place and aim to another, and the
 * time of day from one hour to another; between shots the picture dips through black. While it
 * plays the interface is hidden, the picture is letterboxed, there are a few captions, and a
 * score made here in the browser plays under it (tour-music.ts).
 *
 *   Esc  stop        M  music on/off        C  captions on/off
 *
 * The tour moves the camera and the sun, and for as long as it plays the office is staged for
 * the picture (main.ts): half the agents at work, the rest up and about, Stephen on a round with
 * Cash. That is on screen only; when the tour ends everyone is back where they really are.
 */
import * as THREE from 'three';
import { createTourMusic } from './tour-music';

type Triple = readonly [x: number, y: number, z: number];

interface Shot {
  seconds: number;
  /** Camera position, start and end. */
  from: Triple;
  to: Triple;
  /** What it looks at, start and end. */
  lookFrom: Triple;
  lookTo: Triple;
  /** Hour of the day, start and end. */
  hours: readonly [number, number];
  /** Circle a point instead of flying a line: the camera goes round `centre`, looking at it. Angles in radians. */
  orbit?: { centre: Triple; radius: readonly [number, number]; height: readonly [number, number]; angle: readonly [number, number] };
  /** Open the company sphere for this shot (and show its labels). */
  core?: boolean;
  /** A line at the lower left for this shot: a small label over a larger one. */
  caption?: readonly [label: string, text: string];
  /** Stephen and Sophia wave at the camera between these seconds of the shot. */
  wave?: readonly [number, number];
  /** The drone show over the city starts this many seconds into the shot. */
  drones?: number;
  /** Shown large in the middle instead: the opening title and the end card. With no title, the line sits low, under whatever the picture shows. */
  title?: readonly [title: string, line: string];
}

/**
 * The film. Distances are metres; the office floor is 60 by 40 about the origin, its front
 * (the glass, the door, the road, then the beach) towards +z.
 */
const SHOTS: readonly Shot[] = [
  // Dawn, high over the water and well back, drifting in: the whole beach, the office behind it, the city and the mountains beyond.
  { seconds: 9, from: [-44, 34, 176], to: [-14, 24, 132], lookFrom: [0, 6, 30], lookTo: [0, 10, 0], hours: [7.6, 8.2], title: ['SC45Works', 'Solo Creator · Solo Creative'] },
  // Along the sand, on the sea side of everything so nothing stands in the way: the restaurant's deck, the barbecue hut, people out early, the office behind.
  { seconds: 10, from: [-60, 4.4, 60], to: [-8, 4.2, 60.5], lookFrom: [-42, 2.4, 46], lookTo: [6, 2.6, 40], hours: [8.2, 8.8], caption: ['Across the road', 'Golden beach, a boardwalk, breakfast by the sea'] },
  // Round the volleyball game to the gym.
  { seconds: 9, from: [-2, 5, 69], to: [42, 6.5, 62], lookFrom: [9, 1.6, 55.4], lookTo: [31, 1.6, 50.4], hours: [8.8, 9.4], caption: ['Before work', 'Volleyball, and a gym on the sand'] },
  // Back across the road and up to the front door.
  { seconds: 8, from: [1.5, 7, 56], to: [0, 2.7, 22.5], lookFrom: [4, 2.4, 21], lookTo: [0, 2.4, 0], hours: [9.4, 10.2], caption: ['The office', 'One founder. Sixteen AI agents.'] },
  // In through the door and round to the left of the mission board, towards the executive platform.
  { seconds: 8, from: [-2.2, 2.8, 18.2], to: [-7, 3.8, 5.6], lookFrom: [0, 2, 6], lookTo: [0, 1.6, 0.2], hours: [10.2, 11], wave: [2.4, 7], caption: ['Executive', 'Stephen, and Sophia, his Chief of Staff'] },
  // The departments, one pass each.
  { seconds: 6.5, from: [-8, 3.3, -3.5], to: [-13.5, 3.6, -5.5], lookFrom: [-19, 1.3, -11.5], lookTo: [-21, 1.3, -12.5], hours: [11, 12], caption: ['Design', 'Interfaces, motion and 3D'] },
  { seconds: 6.5, from: [-7, 3.4, -4.6], to: [7, 3.4, -4.6], lookFrom: [-2.5, 1.3, -12.5], lookTo: [2.5, 1.3, -12.5], hours: [12, 13], caption: ['Development', 'Frontend, integrations, quality'] },
  { seconds: 6.5, from: [9.5, 3.4, -4.4], to: [14.5, 3.4, -4], lookFrom: [19, 1.3, -11.5], lookTo: [21, 1.3, -12.5], hours: [13, 14], caption: ['Content & Marketing', 'Scripts, titles, social'] },
  // One long look across the width of the floor: Research on one side, Sales on the other.
  { seconds: 8, from: [10, 4.4, 5.4], to: [-10, 4.4, 5.4], lookFrom: [22, 1.2, 0.6], lookTo: [-22, 1.2, 0.6], hours: [14, 15.6], caption: ['Research · Sales', 'Finding the work, and looking after it'] },
  // The café corner and the lounge.
  { seconds: 7, from: [1.5, 3.2, 9.6], to: [3.4, 3.6, 17.6], lookFrom: [10, 1.4, 13], lookTo: [14, 1.3, 15], hours: [15.6, 16.6], caption: ['Time off', 'Coffee, table tennis, the sofa'] },
  // Up and away over the beach, as the sun goes down and the lights come on: the office, the city behind it, Taipei 101, the mountains.
  { seconds: 18, from: [8, 5, 25], to: [48, 42, 112], lookFrom: [0, 2, 8], lookTo: [-6, 60, -70], hours: [17.2, 19.6], drones: 8.5, caption: ['Taipei', 'Made in Taipei'] },
  // Night. The company sphere rises over the platform and opens: every agent and mission, joined up.
  { seconds: 7.5, from: [0, 0, 0], to: [0, 0, 0], lookFrom: [0, 0, 0], lookTo: [0, 0, 0], orbit: { centre: [0, 10.2, 0], radius: [31, 25], height: [11, 15], angle: [0.55, 1.5] }, core: true, hours: [20, 20.4], caption: ['Headquarters', 'Every agent and every mission, connected'] },
  // The sign, at night.
  { seconds: 9, from: [-3.5, 1.9, 34], to: [-6.5, 1.5, 30], lookFrom: [-7.9, 0.9, 22.6], lookTo: [-7.9, 0.7, 22.6], hours: [20.5, 21], title: ['', 'Start creating · sc45works.com'] },
];

/** How long the picture takes to go to black, and to come back, between shots. */
const DIP = 0.45;
export const TOUR_SECONDS = SHOTS.reduce((sum, shot) => sum + shot.seconds, 0);

export interface TourFrame {
  position: THREE.Vector3;
  look: THREE.Vector3;
  hour: number;
  /** Whether the company sphere should be open. */
  core: boolean;
  /** Seconds since the drone show began, or -1 when there is none. */
  drones: number;
  /** True while Stephen and Sophia should be waving at the camera. */
  wave: boolean;
}

export interface Tour {
  isActive(): boolean;
  /** Play it; `fromSeconds` starts part-way in (for looking at one shot). */
  start(fromSeconds?: number): void;
  stop(): void;
  /** Where the camera and the sun are now, or null when no tour is playing. Call once a frame. */
  frame(nowMs: number): TourFrame | null;
  /** Called when a tour ends, whether it ran out or was stopped. */
  onEnd(handler: () => void): void;
  /** Called as a tour starts. */
  onStart(handler: () => void): void;
}

const ease = (t: number) => t * t * (3 - 2 * t);

export function createTour(app: HTMLElement, bottomBar: HTMLElement | null): Tour {
  // The title's script face is fetched now, so that it is there when the tour opens.
  void document.fonts?.load("64px 'Mr Dafoe'").catch(() => undefined);
  // The button: beside "Reset view".
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'panel reset tour-button';
  button.innerHTML = 'Tour <kbd aria-hidden="true">T</kbd>';
  button.title = `Play the ${Math.round(TOUR_SECONDS)}-second tour of the office and the coast. Esc stops it.`;
  bottomBar?.querySelector('#hud-reset')?.after(button);

  // What lies over the picture while it plays.
  const layer = document.createElement('div');
  layer.className = 'tour-layer';
  layer.hidden = true;
  layer.innerHTML = `
    <div class="tour-bar tour-bar-top"></div>
    <div class="tour-bar tour-bar-bottom"></div>
    <div class="tour-black"></div>
    <div class="tour-title"><h1 aria-label="SC45WORKS"></h1><p></p></div>
    <div class="tour-caption"><span></span><strong></strong></div>
    <p class="tour-keys">Esc stop · M music · C captions</p>`;
  app.append(layer);
  const black = layer.querySelector<HTMLElement>('.tour-black')!;
  const title = layer.querySelector<HTMLElement>('.tour-title')!;
  const caption = layer.querySelector<HTMLElement>('.tour-caption')!;
  const keys = layer.querySelector<HTMLElement>('.tour-keys')!;

  const music = createTourMusic(TOUR_SECONDS);
  let startedAt = -1; // -1: not playing; 0: start at the next frame
  let ended: () => void = () => {};
  let began: () => void = () => {};
  let shownShot = -1;
  let captions = true;
  let wentFullscreen = false;
  const position = new THREE.Vector3();
  const look = new THREE.Vector3();

  let skip = 0;
  function start(fromSeconds = 0) {
    if (startedAt !== -1) return;
    startedAt = 0;
    skip = Math.max(0, Math.min(fromSeconds, TOUR_SECONDS - 1));
    shownShot = -1;
    captions = true;
    layer.hidden = false;
    layer.dataset.captions = 'on';
    app.dataset.tour = 'on';
    black.style.opacity = '1';
    began();
    music.start();
    // Fill the screen, for recording; if the browser will not, the tour plays in the window.
    wentFullscreen = false;
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(
        () => (wentFullscreen = true),
        () => {},
      );
    }
  }

  function stop() {
    if (startedAt === -1) return;
    startedAt = -1;
    layer.hidden = true;
    delete app.dataset.tour;
    delete app.dataset.tourLabels;
    music.stop();
    if (wentFullscreen && document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    ended();
  }

  button.addEventListener('click', () => {
    button.blur();
    // `?tourFrom=60` starts the tour a minute in: for looking at one shot without sitting through the rest.
    start(Number(new URLSearchParams(window.location.search).get('tourFrom')) || 0);
  });
  // While it plays, the keyboard is the tour's.
  window.addEventListener(
    'keydown',
    (event) => {
      if (startedAt === -1) {
        const typing = event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName));
        if ((event.key === 't' || event.key === 'T') && !typing && !event.metaKey && !event.ctrlKey && !event.altKey && !document.querySelector('.approval-scrim:not([hidden])')) start();
        return;
      }
      event.stopPropagation();
      if (event.key === 'Escape') stop();
      else if (event.key === 'm' || event.key === 'M') music.toggle();
      else if (event.key === 'c' || event.key === 'C') {
        captions = !captions;
        layer.dataset.captions = captions ? 'on' : 'off';
      }
    },
    true,
  );

  return {
    isActive: () => startedAt !== -1,
    start,
    stop,
    onEnd(handler) {
      ended = handler;
    },
    onStart(handler) {
      began = handler;
    },
    frame(nowMs) {
      if (startedAt === -1) return null;
      if (startedAt === 0) startedAt = nowMs - skip * 1000;
      let t = (nowMs - startedAt) / 1000;
      if (t >= TOUR_SECONDS) {
        stop();
        return null;
      }
      const total = t;
      let index = 0;
      while (index < SHOTS.length - 1 && t >= SHOTS[index].seconds) t -= SHOTS[index++].seconds;
      const shot = SHOTS[index];
      const along = ease(Math.min(t / shot.seconds, 1));
      position.set(shot.from[0] + (shot.to[0] - shot.from[0]) * along, shot.from[1] + (shot.to[1] - shot.from[1]) * along, shot.from[2] + (shot.to[2] - shot.from[2]) * along);
      look.set(
        shot.lookFrom[0] + (shot.lookTo[0] - shot.lookFrom[0]) * along,
        shot.lookFrom[1] + (shot.lookTo[1] - shot.lookFrom[1]) * along,
        shot.lookFrom[2] + (shot.lookTo[2] - shot.lookFrom[2]) * along,
      );
      if (shot.orbit) {
        const { centre, radius, height, angle } = shot.orbit;
        const around = angle[0] + (angle[1] - angle[0]) * along;
        const out = radius[0] + (radius[1] - radius[0]) * along;
        position.set(centre[0] + Math.sin(around) * out, height[0] + (height[1] - height[0]) * along, centre[2] + Math.cos(around) * out);
        look.set(centre[0], centre[1], centre[2]);
      }
      app.dataset.tourLabels = shot.core ? 'on' : 'off';
      // The hour runs evenly through the shot: the sun does not ease.
      const hour = shot.hours[0] + (shot.hours[1] - shot.hours[0]) * Math.min(t / shot.seconds, 1);

      // Through black at each end of a shot; a longer rise at the very start and fall at the very end.
      const rise = index === 0 ? 2.2 : DIP;
      const fall = index === SHOTS.length - 1 ? 2.4 : DIP;
      const dark = Math.max(1 - t / rise, 1 - (shot.seconds - t) / fall, 0);
      black.style.opacity = dark.toFixed(3);

      if (index !== shownShot) {
        shownShot = index;
        title.dataset.show = 'off';
        caption.dataset.show = 'off';
        if (shot.title) {
          // The name is a neon sign: one tube to a letter, so that each can flicker on in its turn.
          title.querySelector('h1')!.replaceChildren(
            ...[...shot.title[0]].map((letter, i) => {
              const tube = document.createElement('span');
              tube.textContent = letter;
              tube.setAttribute('aria-hidden', 'true');
              tube.style.setProperty('--i', String(i));
              return tube;
            }),
          );
          title.querySelector('p')!.textContent = shot.title[1];
          title.dataset.low = String(shot.title[0] === '');
        } else if (shot.caption) {
          caption.querySelector('span')!.textContent = shot.caption[0];
          caption.querySelector('strong')!.textContent = shot.caption[1];
        }
      }
      // Words come in once the picture is up, and go before it dips.
      const wordsOn = t > rise + 0.3 && t < shot.seconds - fall - 0.5;
      title.dataset.show = shot.title && wordsOn ? 'on' : 'off';
      caption.dataset.show = shot.caption && wordsOn ? 'on' : 'off';
      keys.dataset.show = total < 3.5 ? 'on' : 'off';

      return { position, look, hour, core: Boolean(shot.core), drones: shot.drones !== undefined && t >= shot.drones ? t - shot.drones : -1, wave: Boolean(shot.wave && t >= shot.wave[0] && t <= shot.wave[1]) };
    },
  };
}
