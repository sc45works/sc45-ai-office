/**
 * SC45 AI Office: alerts.
 *
 * Two things are worth being called over for, and each has its own sound:
 *
 *   a sign-off is needed    two falling notes
 *   a mission has finished  three rising notes and a high one
 *   something went wrong    two low notes, falling, twice: a task came back not done
 *
 * With each comes a desktop notification, when the browser has been allowed to show them
 * and the office is not the window being looked at (when it is, the card is already on
 * screen). The bell beside the clock switches both off and on; pressing it also asks the
 * browser for permission the first time, and plays the two sounds so they can be told apart.
 *
 * The sounds are made here, by the browser, from a few sine waves: there are no audio files.
 * A browser will not make a sound for a page nobody has touched yet, so the first chime
 * can only come after the first click or key press in the office.
 */

export type AlertKind = 'approval' | 'finished' | 'problem';

export interface Alerts {
  /** Play the sound for this, and show a notification if the office is in the background. */
  raise(kind: AlertKind, title: string, detail: string): void;
}

const KEY = 'sc45.alerts';

/** Each note: frequency in hertz, and when it starts, in seconds. */
const TUNES: Record<AlertKind, Array<[frequency: number, at: number]>> = {
  approval: [[880, 0], [659.25, 0.2]],
  finished: [[523.25, 0], [659.25, 0.13], [783.99, 0.26], [1046.5, 0.42]],
  problem: [[392, 0], [311.13, 0.22], [392, 0.55], [311.13, 0.77]],
};

const BELL =
  '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Zm4 4.5a2 2 0 0 0 4 0"/><path class="alerts-slash" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 4l16 16"/></svg>';

export function createAlerts(hud: HTMLElement): Alerts {
  let on = true;
  try {
    on = window.localStorage.getItem(KEY) !== 'off';
  } catch {
    /* no storage here: on, and not remembered */
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'alerts-toggle';
  button.innerHTML = BELL;
  hud.querySelector('.brand-meta')?.append(button);

  const canNotify = 'Notification' in window;
  const describe = () => {
    button.dataset.on = String(on);
    button.setAttribute('aria-pressed', String(on));
    const notices = !canNotify ? 'This browser cannot show notifications.' : Notification.permission === 'granted' ? 'Notifications are allowed.' : Notification.permission === 'denied' ? 'Notifications are blocked in the browser settings.' : 'Press to allow notifications too.';
    button.title = on ? `Alerts are on: a sound when a sign-off is needed, another when a mission finishes. ${notices}` : 'Alerts are off. Press to turn them on.';
    button.setAttribute('aria-label', on ? 'Alerts on. Press to mute.' : 'Alerts muted. Press to turn on.');
  };
  describe();

  // Sound ---------------------------------------------------------------------

  let audio: AudioContext | null = null;
  function context(): AudioContext | null {
    const Context = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Context) return null;
    try {
      audio ??= new Context();
      if (audio.state === 'suspended') void audio.resume();
      return audio;
    } catch {
      return null;
    }
  }
  // The browser allows sound only once the page has been touched: get ready at the first touch.
  const unlock = () => {
    context();
    window.removeEventListener('pointerdown', unlock, true);
    window.removeEventListener('keydown', unlock, true);
  };
  window.addEventListener('pointerdown', unlock, true);
  window.addEventListener('keydown', unlock, true);

  function chime(kind: AlertKind, delay = 0) {
    const output = context();
    if (!output) return;
    const start = output.currentTime + 0.03 + delay;
    for (const [frequency, at] of TUNES[kind]) {
      // A bell-like note: a sine, with a quieter one an octave up, struck and left to ring.
      for (const [multiple, level] of [[1, 0.2], [2, 0.05]] as const) {
        const oscillator = output.createOscillator();
        const gain = output.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency * multiple;
        gain.gain.setValueAtTime(0.0001, start + at);
        gain.gain.exponentialRampToValueAtTime(level, start + at + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + at + 0.9);
        oscillator.connect(gain).connect(output.destination);
        oscillator.start(start + at);
        oscillator.stop(start + at + 0.95);
      }
    }
  }

  // Notifications -------------------------------------------------------------

  function notify(kind: AlertKind, title: string, detail: string) {
    if (!canNotify || Notification.permission !== 'granted') return;
    // Looking at the office already: the card and the feed say it.
    if (!document.hidden && document.hasFocus()) return;
    try {
      const notice = new Notification(title, { body: detail, tag: `sc45-${kind}-${title}` });
      notice.onclick = () => {
        window.focus();
        notice.close();
      };
    } catch {
      /* some browsers only allow notifications from a service worker: the sound still plays */
    }
  }

  button.addEventListener('click', () => {
    on = !on;
    try {
      window.localStorage.setItem(KEY, on ? 'on' : 'off');
    } catch {
      /* not remembered, that is all */
    }
    describe();
    if (!on) return;
    // Turned on: ask for notifications if that has never been answered, and play the three sounds, one after the other.
    if (canNotify && Notification.permission === 'default') void Notification.requestPermission().then(describe, describe);
    chime('approval');
    chime('finished', 1.1);
    chime('problem', 2.6);
  });

  return {
    raise(kind, title, detail) {
      if (!on) return;
      chime(kind);
      notify(kind, title, detail);
    },
  };
}
