/**
 * SC45 AI Office: hero mode.
 *
 * The office, alive, with nothing over it: no panels, no name tags, no controls. Made to sit
 * behind the headline of a web page. It mounts into any element, fills it, turns slowly, follows
 * the visitor's clock for its time of day, stops drawing when it is off screen or the tab is
 * hidden, and cleans up after itself when it is removed.
 *
 *   import { mountOfficeHero } from './office-hero.js';
 *   const hero = mountOfficeHero(document.querySelector('#hero'), { sky: 'auto' });
 *   // later: hero.dispose();
 *
 * Nothing here talks to a server. The people move by the same rules as in the full office,
 * staged as they are for the tour: a few at their desks, most about the place.
 */
import * as THREE from 'three';
import { applyEvent, emptySnapshot } from '@sc45/shared';
import { createAgents } from './agents';
import { easeSky, nightLevel, skyFor, type SkyMode } from './daylight';
import { createMockFeed } from './events';
import { FLOOR } from './layout';
import { createNavigator } from './navigation';
import { createPets } from './pets';
import { BLOOM, createPostFX } from './postfx';
import { createRobot } from './robot';
import { createOffice } from './scene';

export interface OfficeHeroOptions {
  /** Time of day: follow the visitor's clock (the default), or hold one. */
  sky?: SkyMode;
  /**
   * How the camera moves. 'sway' (the default) swings gently either side of the front corner;
   * 'orbit' goes all the way round; 'still' does not move.
   */
  motion?: 'sway' | 'orbit' | 'still';
  /** Seconds for one full swing or one full turn. Default 90. */
  period?: number;
  /** Degrees either side of the starting angle, for 'sway'. Default 28. */
  swing?: number;
  /** Where the camera starts, in degrees round the office: 0 is square on to the front, 45 the front corner (the default). */
  angle?: number;
  /** Degrees above the horizon. Default 33. */
  elevation?: number;
  /** 1 fits the whole office; more comes closer, less shows more of the beach and the city. Default 1. */
  zoom?: number;
  /** Move the picture within its frame, as a share of its width and height: { x: 0.2 } puts the office to the right, leaving the left for words. */
  offset?: { x?: number; y?: number };
  /** Most device pixels per CSS pixel. Default 1.5 (1.25 on phones). */
  maxPixelRatio?: number;
  /** Everybody up and about, as in the tour (the default); false plays the quieter demo day. */
  lively?: boolean;
  /** Called once the first frame has been drawn. */
  onReady?: () => void;
}

export interface OfficeHero {
  /** Stop drawing; `resume` starts again. (Done automatically off screen and in a hidden tab.) */
  pause(): void;
  resume(): void;
  /** Change the time of day. */
  setSky(mode: SkyMode): void;
  /** Stop, remove the canvas, and free everything it held. */
  dispose(): void;
}

/** True where WebGL can be started at all. */
export function officeHeroSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

export function mountOfficeHero(container: HTMLElement, options: OfficeHeroOptions = {}): OfficeHero {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const period = Math.max(options.period ?? 90, 1);
  const motion = options.motion ?? 'sway';
  const startAngle = THREE.MathUtils.degToRad(options.angle ?? 45);
  const swing = THREE.MathUtils.degToRad(options.swing ?? 28);
  const elevation = THREE.MathUtils.degToRad(options.elevation ?? 33);
  const zoom = Math.max(options.zoom ?? 1, 0.2);
  let skyMode: SkyMode = options.sky ?? 'auto';

  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'default' });
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.shadowMap.enabled = !coarse;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  const pixelRatio = () => Math.min(window.devicePixelRatio || 1, options.maxPixelRatio ?? (coarse ? 1.25 : 1.5));
  renderer.setPixelRatio(pixelRatio());
  const canvas = renderer.domElement;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'The SC45 AI Office: a 3D office by the sea, with agents at work');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%', pointerEvents: 'none' });
  container.append(canvas);

  const office = createOffice();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 800);
  const postfx = createPostFX(renderer, office.scene, camera);

  const routes = createNavigator(office.obstacles, FLOOR, office.floorHeightAt);
  const still = () => reducedMotion.matches;
  const agents = createAgents(office, routes, { instant: still });
  const pets = createPets(office, routes, { still, leader: () => agents.leading() });
  const robot = createRobot(office, routes, agents, { still });

  // The same demo day the office plays without a server, for the mission board and the screens.
  let snapshot = emptySnapshot();
  let staged = new Set<string>();
  const lively = options.lively !== false;
  function screens() {
    for (const agent of agents.list()) {
      const status = snapshot.agents[agent.id];
      const busy = status && status.state !== 'idle';
      if (busy) office.setDeskScreen(agent.id, { title: status.task ?? status.state, missionId: status.missionId, lines: [], blocked: status.state === 'blocked' });
      else office.setDeskScreen(agent.id, staged.has(agent.id) ? { title: 'Working', lines: [], blocked: false } : null);
    }
  }
  const feed = createMockFeed();
  feed.start({
    onSnapshot(next) {
      snapshot = next;
      snapshot.profiles ??= {};
      snapshot.approvals ??= [];
      // The demo day starts again from the top every few minutes. In the lively office nobody is
      // sent back to their desk for that: they are placed once, and stay staged.
      if (!lively) agents.sync(snapshot);
      else if (staged.size === 0) {
        agents.sync(snapshot);
        staged = new Set(agents.stage(true));
      }
      office.setMissions(snapshot.missions);
      screens();
    },
    onEvent(event) {
      applyEvent(snapshot, event);
      agents.apply(event);
      if (event.type.startsWith('mission.')) office.setMissions(snapshot.missions);
      if (event.type === 'agent.state') screens();
    },
    onStatus() {},
  });

  // The camera: far enough back for the office to fit the frame, whatever its shape.
  const target = new THREE.Vector3(0, 1, 1.5);
  const reach = Math.hypot(FLOOR.width, FLOOR.depth) / 2; // from the middle of the floor to a corner
  function frameCamera(width: number, height: number) {
    camera.aspect = width / height;
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    // Fit the floor's circle top to bottom and side to side; a tall frame needs more distance.
    const distance = (reach * 1.08) / (tan * Math.min(1, camera.aspect * 0.92)) / zoom;
    camera.userData.distance = distance;
    const dx = options.offset?.x ?? 0;
    const dy = options.offset?.y ?? 0;
    if (dx || dy) camera.setViewOffset(width, height, -dx * width, dy * height, width, height);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }
  function placeCamera(seconds: number) {
    const phase = (seconds / period) * Math.PI * 2;
    const around = motion === 'orbit' ? startAngle + phase : motion === 'sway' ? startAngle + Math.sin(phase) * swing : startAngle;
    const distance = camera.userData.distance as number;
    camera.position.set(target.x + Math.sin(around) * Math.cos(elevation) * distance, target.y + Math.sin(elevation) * distance, target.z + Math.cos(around) * Math.cos(elevation) * distance);
    camera.lookAt(target);
    camera.near = THREE.MathUtils.clamp(distance * 0.04, 0.5, 8);
    camera.updateProjectionMatrix();
  }
  function resize() {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    renderer.setPixelRatio(pixelRatio());
    renderer.setSize(width, height, false);
    postfx.setSize(width, height, renderer.getPixelRatio());
    frameCamera(width, height);
  }
  const resizer = new ResizeObserver(() => {
    resize();
    if (!running) draw(performance.now()); // keep a paused picture the right shape
  });
  resizer.observe(container);
  resize();

  // Signs in the scene are drawn with the page's web fonts, when it has them.
  void document.fonts?.ready.then(() => !disposed && office.redrawText());

  const sky = skyFor(skyMode);
  let skyStarted = false;
  let seconds = 0;
  let last = 0;
  let ready = false;
  function draw(now: number) {
    const step = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    if (!still()) seconds += step;

    placeCamera(still() ? 0 : seconds);
    const distance = camera.userData.distance as number;
    const wanted = skyFor(skyMode);
    if (skyStarted) easeSky(sky, wanted, step);
    else Object.assign(sky, wanted);
    skyStarted = true;
    office.fog.density = THREE.MathUtils.clamp(0.42 / distance, 0.0025, 0.012) * THREE.MathUtils.lerp(1, 0.18, sky.daylight);
    office.setSky(sky);
    agents.setNight(nightLevel(sky.daylight));
    postfx.bloom.enabled = sky.daylight < 0.97;
    postfx.bloom.threshold = THREE.MathUtils.lerp(BLOOM.threshold, 1.6, sky.daylight);
    postfx.bloom.strength = BLOOM.strength * THREE.MathUtils.lerp(0.3, 1, THREE.MathUtils.smoothstep(distance, 12, 60)) * THREE.MathUtils.lerp(1, 0.32, sky.daylight);

    feed.update(step);
    agents.update(step, seconds);
    pets.update(step, seconds);
    robot.update(step, seconds);
    office.update(seconds, camera);
    if (office.shadowsStale()) renderer.shadowMap.needsUpdate = true;
    postfx.render();
    if (!ready) {
      ready = true;
      options.onReady?.();
    }
  }

  // Draw only while it can be seen.
  let running = false;
  let wanted = true; // not paused by the page
  let onScreen = true;
  let frame = 0;
  let disposed = false;
  function loop(now: number) {
    if (!running) return;
    draw(now);
    frame = requestAnimationFrame(loop);
  }
  function settle() {
    const should = wanted && onScreen && !document.hidden && !disposed;
    if (should === running) return;
    running = should;
    if (running) {
      last = 0; // the time away is not played back in one step
      frame = requestAnimationFrame(loop);
    } else cancelAnimationFrame(frame);
  }
  const watcher = new IntersectionObserver((entries) => {
    onScreen = entries.some((entry) => entry.isIntersecting);
    settle();
  });
  watcher.observe(container);
  const onVisibility = () => settle();
  document.addEventListener('visibilitychange', onVisibility);
  // If the graphics context is taken away (a sleeping laptop, too many tabs), stop quietly.
  const onLost = (event: Event) => {
    event.preventDefault();
    wanted = false;
    settle();
  };
  canvas.addEventListener('webglcontextlost', onLost);
  settle();

  return {
    pause() {
      wanted = false;
      settle();
    },
    resume() {
      wanted = true;
      settle();
    },
    setSky(mode) {
      skyMode = mode;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      settle();
      feed.stop();
      watcher.disconnect();
      resizer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      office.scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        for (const material of Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : []) {
          for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.dispose();
          material.dispose();
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
