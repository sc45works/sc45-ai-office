export type SkyMode = 'auto' | 'day' | 'dusk' | 'night';

export interface OfficeHeroOptions {
  /** Time of day: follow the visitor's clock (the default), or hold one. */
  sky?: SkyMode;
  /** 'sway' (default) swings gently either side of the starting angle; 'orbit' goes all the way round; 'still' does not move. */
  motion?: 'sway' | 'orbit' | 'still';
  /** Seconds for one full swing or one full turn. Default 90. */
  period?: number;
  /** Degrees either side of the starting angle, for 'sway'. Default 28. */
  swing?: number;
  /** Starting angle in degrees round the office: 0 is square on to the front, 45 the front corner (default). */
  angle?: number;
  /** Degrees above the horizon. Default 33. */
  elevation?: number;
  /** 1 fits the whole office; more comes closer, less shows more of the beach and the city. Default 1. */
  zoom?: number;
  /** Move the picture within its frame, as a share of its size: { x: 0.2 } puts the office to the right. */
  offset?: { x?: number; y?: number };
  /** Most device pixels per CSS pixel. Default 1.5 (1.25 on phones). */
  maxPixelRatio?: number;
  /** Everybody up and about (default); false plays the quieter demo day. */
  lively?: boolean;
  /** Called once the first frame has been drawn. */
  onReady?: () => void;
}

export interface OfficeHero {
  pause(): void;
  resume(): void;
  setSky(mode: SkyMode): void;
  dispose(): void;
}

export function officeHeroSupported(): boolean;
export function mountOfficeHero(container: HTMLElement, options?: OfficeHeroOptions): OfficeHero;
