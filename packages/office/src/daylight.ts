/**
 * SC45 AI Office: the time of day.
 *
 * The sky follows the clock of the machine the office is shown on: dark at night, light by
 * day, warm for an hour or so round sunrise and sunset. `skyAt` turns an hour into three
 * numbers; the scene (scene.ts, outdoors.ts) turns those into light and colour.
 */

export type SkyMode = 'auto' | 'day' | 'dusk' | 'night';
export const SKY_MODES: readonly SkyMode[] = ['auto', 'day', 'dusk', 'night'];

export interface Sky {
  /** 0 at night, 1 in full daylight. */
  daylight: number;
  /** 0..1: how golden the light is. Peaks at sunrise and sunset. */
  warmth: number;
  /** Where the sun is on its arc: 0 on the eastern horizon, pi on the western. */
  sunAngle: number;
}

const SUNRISE = 6.5;
const SUNSET = 18;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number, from: number, to: number) => {
  const t = clamp01((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};
/** 1 at `centre`, falling to 0 at `width` hours either side. */
const bump = (value: number, centre: number, width: number) => clamp01(1 - Math.abs(value - centre) / width);

/** The sky at an hour of the day (0..24, fractions allowed). */
export function skyAt(hours: number): Sky {
  return {
    daylight: smooth(hours, SUNRISE - 1, SUNRISE + 1) * (1 - smooth(hours, SUNSET - 1, SUNSET + 1)),
    warmth: Math.max(bump(hours, SUNRISE, 1.6), bump(hours, SUNSET, 1.6)),
    sunAngle: (0.06 + 0.88 * clamp01((hours - SUNRISE) / (SUNSET - SUNRISE))) * Math.PI,
  };
}

/**
 * How much the office's own lights are on: 1 at night, 0 by day and at dusk.
 * The neon strips in the floor and the glow round working agents follow this.
 */
export function nightLevel(daylight: number): number {
  const t = clamp01((daylight - 0.08) / (0.35 - 0.08));
  return 1 - t * t * (3 - 2 * t);
}

/** The sky for a mode: the real time for `auto`, a fixed hour otherwise. */
export function skyFor(mode: SkyMode, now = new Date()): Sky {
  if (mode === 'day') return skyAt(12.5);
  if (mode === 'dusk') return skyAt(SUNSET - 0.1);
  if (mode === 'night') return skyAt(0);
  return skyAt(now.getHours() + now.getMinutes() / 60);
}

/** Move `current` a step towards `target`, in place. `rate` is per second; a large value snaps. */
export function easeSky(current: Sky, target: Sky, delta: number, rate = 1.6): Sky {
  const k = 1 - Math.exp(-delta * rate);
  current.daylight += (target.daylight - current.daylight) * k;
  current.warmth += (target.warmth - current.warmth) * k;
  current.sunAngle += (target.sunAngle - current.sunAngle) * k;
  return current;
}
