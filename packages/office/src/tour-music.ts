/**
 * SC45 AI Office: the tour's score.
 *
 * A slow, warm piece made in the browser from sine and triangle waves: a pad that moves
 * through four chords, a soft bass note under each, and bell notes that begin once the camera
 * reaches the office and thicken as it rises at the end. It is a placeholder to cut a film to,
 * not a soundtrack: for the published video, lay a licensed track over it (M mutes this one).
 *
 * Everything is scheduled when the tour starts, against the audio clock, so it keeps time with
 * the picture however busy the page is.
 */

export interface TourMusic {
  start(): void;
  stop(): void;
  /** Music on or off, without stopping the tour. */
  toggle(): void;
}

const note = (semitonesFromA4: number) => 440 * 2 ** (semitonesFromA4 / 12);
/** Fmaj7, Am7, Cmaj7, G6: each as semitones from A4, low to high. */
const CHORDS: ReadonlyArray<{ bass: number; pad: readonly number[] }> = [
  { bass: -28, pad: [-16, -12, -9, -5] },
  { bass: -24, pad: [-12, -9, -5, -2] },
  { bass: -33, pad: [-21, -17, -14, -10] },
  { bass: -26, pad: [-14, -10, -7, -5] },
];
/** Bell notes: A minor pentatonic, across two octaves. */
const BELLS = [0, 3, 5, 7, 10, 12, 15, 17];
const BAR = 8; // seconds a chord lasts

export function createTourMusic(seconds: number): TourMusic {
  let audio: AudioContext | null = null;
  let master: GainNode | null = null;
  let on = true;
  const LEVEL = 0.5;

  function start() {
    const Context = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Context) return;
    try {
      audio = new Context();
    } catch {
      return;
    }
    const output = audio;
    const t0 = output.currentTime + 0.1;
    master = output.createGain();
    master.gain.setValueAtTime(0.0001, t0);
    master.gain.exponentialRampToValueAtTime(on ? LEVEL : 0.0001, t0 + 3);
    master.gain.setValueAtTime(on ? LEVEL : 0.0001, t0 + seconds - 5);
    master.gain.exponentialRampToValueAtTime(0.0001, t0 + seconds - 0.2);
    master.connect(output.destination);

    // The pad goes through a filter that opens slowly, widest for the rise at the end.
    const filter = output.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 0.6;
    filter.frequency.setValueAtTime(500, t0);
    filter.frequency.linearRampToValueAtTime(1100, t0 + seconds * 0.6);
    filter.frequency.linearRampToValueAtTime(2600, t0 + seconds * 0.85);
    filter.frequency.linearRampToValueAtTime(900, t0 + seconds);
    filter.connect(master);

    // The bells go through an echo.
    const echo = output.createDelay(1);
    echo.delayTime.value = 0.42;
    const feedback = output.createGain();
    feedback.gain.value = 0.38;
    echo.connect(feedback).connect(echo);
    echo.connect(master);

    const voice = (type: OscillatorType, frequency: number, at: number, attack: number, hold: number, release: number, level: number, to: AudioNode, detune = 0) => {
      const oscillator = output.createOscillator();
      const gain = output.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      oscillator.detune.value = detune;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(level, at + attack);
      gain.gain.setValueAtTime(level, at + attack + hold);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + attack + hold + release);
      oscillator.connect(gain).connect(to);
      oscillator.start(at);
      oscillator.stop(at + attack + hold + release + 0.05);
    };

    const bars = Math.ceil(seconds / BAR);
    for (let bar = 0; bar < bars; bar++) {
      const chord = CHORDS[bar % CHORDS.length];
      const at = t0 + bar * BAR;
      // The last quarter is fuller: the pad is doubled an octave up.
      const lift = bar * BAR > seconds * 0.72;
      for (const [i, semitone] of chord.pad.entries()) {
        voice('triangle', note(semitone), at, 2.6, BAR - 3.2, 3.6, 0.075, filter, i % 2 ? 7 : -7);
        voice('sine', note(semitone), at + 0.2, 3, BAR - 3.6, 3.6, 0.05, filter, i % 2 ? -5 : 5);
        if (lift) voice('sine', note(semitone + 12), at + 0.4, 3, BAR - 4, 3.4, 0.03, filter);
      }
      // A bass note at the start of the bar, and a softer one half-way.
      voice('sine', note(chord.bass), at, 0.08, 1.4, 2.6, 0.22, master);
      voice('sine', note(chord.bass), at + BAR / 2, 0.08, 0.8, 2, 0.13, master);
    }

    // Bells: none over the sea, a few in the office, more as the camera climbs. The same every time.
    let seed = 45;
    const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let at = 0; at < seconds - 6; at += 0.5) {
      const progress = at / seconds;
      const chance = progress < 0.26 ? 0 : progress < 0.72 ? 0.22 : 0.55;
      if (random() > chance) continue;
      const chord = CHORDS[Math.floor(at / BAR) % CHORDS.length];
      // Mostly notes of the chord, raised; now and then one from the scale.
      const semitone = random() < 0.7 ? chord.pad[Math.floor(random() * chord.pad.length)] + 24 : BELLS[Math.floor(random() * BELLS.length)] + 12;
      voice('sine', note(semitone), t0 + at, 0.012, 0.02, 1.6, 0.06, echo);
      voice('sine', note(semitone) * 2.01, t0 + at, 0.012, 0.02, 0.7, 0.015, echo);
    }
  }

  function stop() {
    const output = audio;
    const gain = master;
    audio = null;
    master = null;
    if (!output || !gain) return;
    try {
      gain.gain.cancelScheduledValues(output.currentTime);
      gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), output.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, output.currentTime + 0.6);
    } catch {
      /* already gone */
    }
    window.setTimeout(() => void output.close().catch(() => {}), 800);
  }

  return {
    start,
    stop,
    toggle() {
      on = !on;
      if (!audio || !master) return;
      master.gain.cancelScheduledValues(audio.currentTime);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), audio.currentTime);
      master.gain.exponentialRampToValueAtTime(on ? LEVEL : 0.0001, audio.currentTime + 0.4);
    },
  };
}
