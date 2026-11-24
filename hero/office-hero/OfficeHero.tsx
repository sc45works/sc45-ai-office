'use client';
/**
 * <OfficeHero />: the SC45 AI Office as a page background.
 *
 * The 3D scene is not loaded until the component is near the screen, and not at all where it
 * cannot run or (by default) on phones: there the poster or the video shows instead.
 *
 *   <OfficeHero height="100svh" poster="/office-poster.jpg" video="/office-loop.mp4">
 *     <h1>Solo Creator · Solo Creative</h1>
 *   </OfficeHero>
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { OfficeHero as Hero, OfficeHeroOptions } from './office-hero';

// The site already has three.js: this build shares that copy. If the site's three is too old
// for it (see README), change both './office-hero' above and here to './office-hero.standalone'.
const load = () => import('./office-hero');

export interface OfficeHeroProps extends Omit<OfficeHeroOptions, 'onReady'> {
  /** Height of the hero: any CSS length. Default '100svh'. */
  height?: string;
  /** A still image shown until the scene is ready, and wherever the scene does not run. */
  poster?: string;
  /** A short muted loop shown in place of the scene on phones (and where WebGL is missing). */
  video?: string;
  /** Run the live scene on phones and tablets too. Default false: they get the video or the poster. */
  liveOnMobile?: boolean;
  /** A wash over the picture so words stay readable: any CSS background. Default: a soft dark fade from the left. */
  scrim?: string | false;
  className?: string;
  style?: CSSProperties;
  /** The headline and whatever else sits over the office. */
  children?: ReactNode;
}

const fill: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%' };

export default function OfficeHero({ height = '100svh', poster, video, liveOnMobile = false, scrim, className, style, children, ...options }: OfficeHeroProps) {
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'waiting' | 'live' | 'fallback'>('waiting');
  const [ready, setReady] = useState(false);
  // The options are read once, when the scene starts: changing them later means remounting (give the component a new `key`).
  const settings = useRef(options);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const phone = window.matchMedia('(pointer: coarse)').matches;
    if (phone && !liveOnMobile) {
      setMode('fallback');
      return;
    }
    let hero: Hero | null = null;
    let cancelled = false;
    // Start loading a screen's height before it scrolls into view.
    const watcher = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        watcher.disconnect();
        load()
          .then(({ mountOfficeHero, officeHeroSupported }) => {
            if (cancelled) return;
            if (!officeHeroSupported()) return setMode('fallback');
            hero = mountOfficeHero(element, { ...settings.current, onReady: () => !cancelled && setReady(true) });
            setMode('live');
          })
          .catch(() => !cancelled && setMode('fallback'));
      },
      { rootMargin: '100% 0px' },
    );
    watcher.observe(element);
    return () => {
      cancelled = true;
      watcher.disconnect();
      hero?.dispose();
    };
  }, [liveOnMobile]);

  const wash = scrim === false ? null : (scrim ?? 'linear-gradient(90deg, rgba(4,4,8,0.72) 0%, rgba(4,4,8,0.35) 45%, rgba(4,4,8,0) 75%)');
  return (
    <section className={className} style={{ position: 'relative', height, overflow: 'hidden', background: '#07070b', ...style }}>
      {poster && <img src={poster} alt="" aria-hidden="true" style={{ ...fill, objectFit: 'cover', opacity: ready ? 0 : 1, transition: 'opacity 0.8s ease' }} />}
      {mode === 'fallback' && video && <video src={video} poster={poster} autoPlay muted loop playsInline aria-hidden="true" style={{ ...fill, objectFit: 'cover' }} />}
      <div ref={stage} style={{ ...fill, opacity: ready ? 1 : 0, transition: 'opacity 0.8s ease' }} />
      {wash && <div aria-hidden="true" style={{ ...fill, background: wash, pointerEvents: 'none' }} />}
      <div style={{ position: 'relative', height: '100%' }}>{children}</div>
    </section>
  );
}
