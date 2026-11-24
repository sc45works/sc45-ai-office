/**
 * What a person in the office looks like, and what they are called.
 *
 * Everyone starts with a look worked out from their id (so it never changes by itself),
 * and anyone can be changed with an `agent.profile` event, which carries a new name, a
 * new appearance, or both. Like every other event it is checked here before it is
 * written or believed.
 */

export const BUILDS = ['masculine', 'feminine'] as const;
export type Build = (typeof BUILDS)[number];

export const HAIR_STYLES = ['short', 'long', 'bun', 'ponytail', 'curly', 'bald'] as const;
export type HairStyle = (typeof HAIR_STYLES)[number];

/** Suggested colours. Any `#rrggbb` colour is accepted; these are what the editor offers. */
export const SKIN_TONES = ['#f6d7c3', '#eec1a2', '#d9a47c', '#c08a5e', '#a06a44', '#7c4f33', '#5a3825', '#3d2618'] as const;
export const HAIR_COLORS = ['#17130f', '#3a2618', '#6b4226', '#a8703c', '#d8b26a', '#b5432e', '#8e8e99', '#f1efe9', '#ff2e88', '#7b5cff'] as const;
export const TOP_COLORS = ['#f4f4f6', '#1f1f25', '#8e8e99', '#2b4a7d', '#2f7a50', '#b5432e', '#ff4a12', '#ff2e88', '#7b5cff', '#ffb08f', '#d8b26a', '#2bd576'] as const;
export const BOTTOM_COLORS = ['#1b1b20', '#2a3550', '#3e4a5c', '#5a5a64', '#6b5136', '#8a7a62', '#c9c9d1', '#3a2b3f'] as const;

export interface Appearance {
  build: Build;
  skin: string;
  hair: HairStyle;
  hairColor: string;
  glasses: boolean;
  beard: boolean;
  /** Shirt, jumper or jacket. */
  top: string;
  /** Trousers or skirt. */
  bottom: string;
}

/** What an `agent.profile` event may change. */
export interface ProfileChange {
  name?: string;
  appearance?: Appearance;
}

export const NAME_MAX_LENGTH = 24;

const HEX = /^#[0-9a-f]{6}$/i;
const oneOf = <T extends string>(list: readonly T[], value: unknown): value is T => list.includes(value as T);

/** A whole, valid appearance, or null. Nothing is filled in: a partial one is refused. */
export function parseAppearance(input: unknown): Appearance | null {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return null;
  const raw = input as Record<string, unknown>;
  if (!oneOf(BUILDS, raw.build) || !oneOf(HAIR_STYLES, raw.hair)) return null;
  for (const key of ['skin', 'hairColor', 'top', 'bottom'] as const) {
    if (typeof raw[key] !== 'string' || !HEX.test(raw[key] as string)) return null;
  }
  if (typeof raw.glasses !== 'boolean' || typeof raw.beard !== 'boolean') return null;
  return {
    build: raw.build,
    skin: (raw.skin as string).toLowerCase(),
    hair: raw.hair,
    hairColor: (raw.hairColor as string).toLowerCase(),
    glasses: raw.glasses,
    beard: raw.beard,
    top: (raw.top as string).toLowerCase(),
    bottom: (raw.bottom as string).toLowerCase(),
  };
}

/** A usable name: one line, trimmed, not too long. Null if nothing is left. */
export function parseName(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  // eslint-disable-next-line no-control-regex
  const name = input.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!name || name.length > NAME_MAX_LENGTH) return null;
  return name;
}

export type ProfileResult = { ok: true; change: ProfileChange } | { ok: false; error: string };

/** Check a requested change: a name, an appearance, or both. */
export function parseProfileChange(input: unknown): ProfileResult {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return { ok: false, error: 'send an object with "name", "appearance", or both' };
  const raw = input as Record<string, unknown>;
  const change: ProfileChange = {};
  if (raw.name !== undefined) {
    const name = parseName(raw.name);
    if (!name) return { ok: false, error: `"name" must be 1 to ${NAME_MAX_LENGTH} characters` };
    change.name = name;
  }
  if (raw.appearance !== undefined) {
    const appearance = parseAppearance(raw.appearance);
    if (!appearance) return { ok: false, error: '"appearance" is incomplete or has a value that is not allowed' };
    change.appearance = appearance;
  }
  if (change.name === undefined && change.appearance === undefined) return { ok: false, error: 'nothing to change: send "name", "appearance", or both' };
  return { ok: true, change };
}

function hash(text: string): number {
  let value = 2166136261;
  for (let i = 0; i < text.length; i++) value = Math.imul(value ^ text.charCodeAt(i), 16777619);
  return value >>> 0;
}

/** The two people who are not placeholders start with a look chosen for them. */
const GIVEN: Record<string, Appearance> = {
  'exec.ceo': { build: 'masculine', skin: '#eec1a2', hair: 'short', hairColor: '#17130f', glasses: false, beard: false, top: '#1f1f25', bottom: '#1b1b20' },
  'exec.chief-of-staff': { build: 'feminine', skin: '#f6d7c3', hair: 'long', hairColor: '#3a2618', glasses: false, beard: false, top: '#f4f4f6', bottom: '#2a3550' },
};

/** The look someone has until it is changed. Worked out from the id, so it is the same on every machine. */
export function defaultAppearance(agentId: string): Appearance {
  if (GIVEN[agentId]) return { ...GIVEN[agentId] };
  const pick = <T>(list: readonly T[], salt: string): T => list[hash(`${agentId}:${salt}`) % list.length];
  const build = pick(BUILDS, 'build');
  const hair = pick(build === 'feminine' ? (['long', 'bun', 'ponytail', 'curly', 'short'] as const) : (['short', 'short', 'curly', 'bald', 'ponytail'] as const), 'hair');
  return {
    build,
    skin: pick(SKIN_TONES, 'skin'),
    hair,
    hairColor: pick(HAIR_COLORS.slice(0, 7), 'hair-colour'),
    glasses: hash(`${agentId}:glasses`) % 4 === 0,
    beard: build === 'masculine' && hash(`${agentId}:beard`) % 3 === 0,
    top: pick(TOP_COLORS, 'top'),
    bottom: pick(BOTTOM_COLORS, 'bottom'),
  };
}
