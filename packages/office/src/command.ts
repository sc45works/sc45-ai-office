/**
 * SC45 AI Office: the command bar.
 *
 * A text box (and, where the browser offers it, a microphone) for giving the Chief of
 * Staff a request, and a bubble above it for her answer. What happens to the request is
 * not decided here: main.ts sends it to the server when the office is live, and plans it
 * locally in demo mode.
 *
 * Files or a whole folder can go with a request: the paperclip, or drop them on the bar. They
 * are listed above it until the request is sent, and travel with it.
 *
 * A request made aloud is answered aloud, in a voice chosen from those installed on this
 * computer (the speaker button): which voice, how fast, how high. The choice is kept in
 * this browser. Nothing is sent anywhere to make the speech; the browser does it.
 */
import { COMMAND_MAX_LENGTH } from '@sc45/shared';

export interface CommandAnswer {
  reply: string;
  /** One line per thing done. */
  summary: string[];
  /** A remark about how the answer was produced, e.g. that a fallback was used. */
  note?: string;
}

/** One file to go with a request, and where it sat in the folder it came from (just its name, for a loose file). */
export interface AttachedFile {
  file: File;
  path: string;
}

/** What one request may carry. The server holds the same limits. */
export const ATTACH_LIMITS = { files: 40, fileBytes: 15 * 1024 * 1024, totalBytes: 40 * 1024 * 1024 } as const;

export type CommandHandler = (text: string, attached: AttachedFile[]) => Promise<CommandAnswer>;

export interface CommandBar {
  onCommand(handler: CommandHandler): void;
}

// The Web Speech API is not in TypeScript's standard library, and is prefixed in Chromium and Safari.
interface Recognition {
  lang: string;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
type RecognitionConstructor = new () => Recognition;

function recognitionConstructor(): RecognitionConstructor | null {
  const scope = window as unknown as { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor };
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition ?? null;
}

const MIC_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M12 4a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3Zm-6 8a6 6 0 0 0 12 0M12 18v3"/></svg>';
const CLIP_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M20 11.5 12.5 19a5 5 0 0 1-7-7l8-8a3.4 3.4 0 0 1 4.8 4.8l-7.9 7.9a1.8 1.8 0 0 1-2.6-2.6l7.2-7.2"/></svg>';
const VOICE_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 10v4h3l5 4V6L7 10H4Zm12-1a4 4 0 0 1 0 6m2.5-9a8 8 0 0 1 0 12"/></svg>';
const SEND_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6"/></svg>';

export function createCommandBar(slot: HTMLElement): CommandBar {
  slot.innerHTML = `
    <div class="panel command-reply" id="command-reply" role="status" aria-live="polite" hidden>
      <div class="command-reply-head">
        <span class="command-reply-who">Sophia</span>
        <button class="command-reply-close" id="command-reply-close" type="button" aria-label="Dismiss"><span aria-hidden="true">×</span></button>
      </div>
      <p class="command-reply-text" id="command-reply-text"></p>
      <ul class="command-reply-summary" id="command-reply-summary"></ul>
      <p class="command-reply-note" id="command-reply-note" hidden></p>
    </div>
    <div class="panel command-voice" id="command-voice" role="dialog" aria-label="Sophia's voice" hidden>
      <div class="command-reply-head">
        <span class="command-reply-who">Sophia's voice</span>
        <button class="command-reply-close" id="voice-close" type="button" aria-label="Close"><span aria-hidden="true">×</span></button>
      </div>
      <label class="voice-label" for="voice-select">Voice</label>
      <div class="voice-row">
        <select class="voice-select" id="voice-select"></select>
        <button class="voice-play" id="voice-play" type="button">Play</button>
      </div>
      <label class="voice-label" for="voice-rate">Speed <output id="voice-rate-value"></output></label>
      <input class="voice-range" id="voice-rate" type="range" min="0.6" max="1.6" step="0.05" />
      <label class="voice-label" for="voice-pitch">Pitch <output id="voice-pitch-value"></output></label>
      <input class="voice-range" id="voice-pitch" type="range" min="0.5" max="1.6" step="0.05" />
      <p class="voice-note" id="voice-note"></p>
    </div>
    <div class="panel command-attached" id="command-attached" hidden>
      <span class="command-attached-text" id="command-attached-text"></span>
      <button class="command-reply-close" id="command-attached-clear" type="button" aria-label="Remove the attachments"><span aria-hidden="true">×</span></button>
    </div>
    <div class="panel command-attach-menu" id="command-attach-menu" role="menu" hidden>
      <button type="button" role="menuitem" id="attach-files">Files…</button>
      <button type="button" role="menuitem" id="attach-folder">A folder…</button>
    </div>
    <input id="attach-files-input" type="file" multiple hidden />
    <input id="attach-folder-input" type="file" webkitdirectory hidden />
    <form class="panel command-form" id="command-form" autocomplete="off">
      <button class="command-button" id="command-attach" type="button" aria-label="Attach files or a folder" aria-haspopup="menu" aria-expanded="false">${CLIP_ICON}</button>
      <label class="visually-hidden" for="command-input">Ask the Chief of Staff</label>
      <input class="command-input" id="command-input" type="text" maxlength="${COMMAND_MAX_LENGTH}" placeholder="Ask Sophia: build a landing page for Relay" enterkeyhint="send" />
      <button class="command-button" id="command-mic" type="button" aria-label="Speak the request" hidden>${MIC_ICON}</button>
      <button class="command-button" id="command-voice-button" type="button" aria-label="Choose Sophia's voice" aria-expanded="false" aria-controls="command-voice" hidden>${VOICE_ICON}</button>
      <button class="command-button command-send" id="command-send" type="submit" aria-label="Send to the Chief of Staff">${SEND_ICON}</button>
    </form>
  `;
  const form = slot.querySelector<HTMLFormElement>('#command-form')!;
  const input = slot.querySelector<HTMLInputElement>('#command-input')!;
  const send = slot.querySelector<HTMLButtonElement>('#command-send')!;
  const mic = slot.querySelector<HTMLButtonElement>('#command-mic')!;
  const bubble = slot.querySelector<HTMLElement>('#command-reply')!;
  const bubbleText = slot.querySelector<HTMLElement>('#command-reply-text')!;
  const bubbleSummary = slot.querySelector<HTMLElement>('#command-reply-summary')!;
  const bubbleNote = slot.querySelector<HTMLElement>('#command-reply-note')!;
  const bubbleClose = slot.querySelector<HTMLButtonElement>('#command-reply-close')!;

  let handler: CommandHandler | null = null;
  let busy = false;
  let hideTimer = 0;

  function show(state: 'thinking' | 'answer' | 'error', text: string, summary: string[] = [], note?: string) {
    window.clearTimeout(hideTimer);
    bubble.dataset.state = state;
    bubbleText.textContent = text;
    bubbleSummary.replaceChildren(
      ...summary.map((line) => {
        const item = document.createElement('li');
        item.textContent = line;
        return item;
      }),
    );
    bubbleNote.textContent = note ?? '';
    bubbleNote.hidden = !note;
    bubble.hidden = false;
    if (state !== 'thinking') hideTimer = window.setTimeout(() => (bubble.hidden = true), 20_000);
  }

  // Sophia's voice ----------------------------------------------------------

  const VOICE_KEY = 'sc45.voice';
  const voice = { name: '', rate: 1, pitch: 1 };
  try {
    const kept = JSON.parse(window.localStorage.getItem(VOICE_KEY) ?? '{}') as Partial<typeof voice>;
    if (typeof kept.name === 'string') voice.name = kept.name;
    if (typeof kept.rate === 'number' && kept.rate >= 0.6 && kept.rate <= 1.6) voice.rate = kept.rate;
    if (typeof kept.pitch === 'number' && kept.pitch >= 0.5 && kept.pitch <= 1.6) voice.pitch = kept.pitch;
  } catch {
    /* nothing kept, or no storage here */
  }
  const keepVoice = () => {
    try {
      window.localStorage.setItem(VOICE_KEY, JSON.stringify(voice));
    } catch {
      /* not remembered, that is all */
    }
  };
  const canSpeak = 'speechSynthesis' in window;
  let voices: SpeechSynthesisVoice[] = [];
  const chosenVoice = () => voices.find((candidate) => candidate.name === voice.name) ?? null;
  const CHINESE = /[㐀-鿿]/;

  /**
   * Say something in the chosen voice. If the text is in Chinese and the chosen voice is not
   * a Chinese one (or the other way round), a voice for that language is used for this once:
   * an English voice reading Chinese is noise.
   */
  function speak(text: string) {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const chosen = chosenVoice();
    const wantsChinese = CHINESE.test(text);
    const fits = (candidate: SpeechSynthesisVoice) => candidate.lang.toLowerCase().startsWith('zh') === wantsChinese;
    const use =
      chosen && fits(chosen)
        ? chosen
        : wantsChinese
          ? (voices.find((candidate) => /^zh[-_]TW/i.test(candidate.lang)) ?? voices.find(fits) ?? chosen)
          : (chosen ?? null);
    if (use) {
      utterance.voice = use;
      utterance.lang = use.lang;
    }
    utterance.rate = voice.rate;
    utterance.pitch = voice.pitch;
    window.speechSynthesis.speak(utterance);
  }

  const voicePanel = slot.querySelector<HTMLElement>('#command-voice')!;
  const voiceButton = slot.querySelector<HTMLButtonElement>('#command-voice-button')!;
  const voiceSelect = slot.querySelector<HTMLSelectElement>('#voice-select')!;
  const voiceRate = slot.querySelector<HTMLInputElement>('#voice-rate')!;
  const voicePitch = slot.querySelector<HTMLInputElement>('#voice-pitch')!;
  const voiceNote = slot.querySelector<HTMLElement>('#voice-note')!;
  const SAMPLES: Record<string, string> = { zh: '你好，Stephen。我是 Sophia，團隊已經準備好了。', en: 'Hello Stephen. This is Sophia. The team is ready when you are.' };

  function showVoiceNumbers() {
    voiceRate.value = String(voice.rate);
    voicePitch.value = String(voice.pitch);
    slot.querySelector<HTMLElement>('#voice-rate-value')!.textContent = `${voice.rate.toFixed(2)}×`;
    slot.querySelector<HTMLElement>('#voice-pitch-value')!.textContent = voice.pitch.toFixed(2);
  }

  /** Fill the list: this browser's language first, then the rest by language, each voice by name. */
  function listVoices() {
    voices = window.speechSynthesis.getVoices();
    const mine = (navigator.language || 'en').slice(0, 2).toLowerCase();
    const languages = new Intl.DisplayNames([navigator.language || 'en'], { type: 'language' });
    const label = (code: string) => {
      try {
        return languages.of(code.replace('_', '-')) ?? code;
      } catch {
        return code;
      }
    };
    const groups = new Map<string, SpeechSynthesisVoice[]>();
    for (const candidate of voices) groups.set(candidate.lang, [...(groups.get(candidate.lang) ?? []), candidate]);
    const order = [...groups.keys()].sort((a, b) => {
      const rank = (lang: string) => (lang.toLowerCase().startsWith(mine) ? 0 : lang.toLowerCase().startsWith('en') ? 1 : lang.toLowerCase().startsWith('zh') ? 2 : 3);
      return rank(a) - rank(b) || label(a).localeCompare(label(b));
    });
    const standard = document.createElement('option');
    standard.value = '';
    standard.textContent = "The browser's own choice";
    voiceSelect.replaceChildren(standard);
    for (const lang of order) {
      const group = document.createElement('optgroup');
      group.label = label(lang);
      for (const candidate of groups.get(lang)!.sort((a, b) => a.name.localeCompare(b.name))) {
        const option = document.createElement('option');
        option.value = candidate.name;
        option.textContent = candidate.name;
        group.append(option);
      }
      voiceSelect.append(group);
    }
    voiceSelect.value = chosenVoice() ? voice.name : '';
    voiceNote.textContent =
      voices.length === 0
        ? 'This browser has not listed any voices yet. Close this and open it again in a moment.'
        : `${voices.length} voices on this computer. More natural ones can be downloaded in System Settings › Accessibility › Spoken Content › System Voice › Manage Voices; they appear here after the page is reloaded.`;
  }

  if (canSpeak) {
    voiceButton.hidden = false;
    listVoices();
    // Browsers hand over the list late, and again whenever a voice is installed.
    window.speechSynthesis.addEventListener('voiceschanged', listVoices);
    showVoiceNumbers();

    const setOpen = (open: boolean) => {
      voicePanel.hidden = !open;
      voiceButton.setAttribute('aria-expanded', String(open));
      if (open) {
        window.clearTimeout(hideTimer);
        bubble.hidden = true; // the two stand in the same place
        listVoices();
      } else {
        window.speechSynthesis.cancel();
      }
    };
    voiceButton.addEventListener('click', () => setOpen(Boolean(voicePanel.hidden)));
    slot.querySelector<HTMLButtonElement>('#voice-close')!.addEventListener('click', () => setOpen(false));
    const sample = () => speak(SAMPLES[(chosenVoice()?.lang ?? 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en']);
    voiceSelect.addEventListener('change', () => {
      voice.name = voiceSelect.value;
      keepVoice();
      sample(); // hear it at once
    });
    for (const [range, key] of [[voiceRate, 'rate'], [voicePitch, 'pitch']] as const) {
      range.addEventListener('input', () => {
        voice[key] = Number(range.value);
        showVoiceNumbers();
      });
      range.addEventListener('change', () => {
        keepVoice();
        sample();
      });
    }
    slot.querySelector<HTMLButtonElement>('#voice-play')!.addEventListener('click', sample);
    // Keys pressed here are not for the office; Escape closes the panel.
    voicePanel.addEventListener('keydown', (event) => {
      event.stopPropagation();
      if (event.key === 'Escape') {
        setOpen(false);
        voiceButton.focus();
      }
    });
  }

  // Attachments --------------------------------------------------------------

  let attached: AttachedFile[] = [];
  const attachedBar = slot.querySelector<HTMLElement>('#command-attached')!;
  const attachedText = slot.querySelector<HTMLElement>('#command-attached-text')!;
  const attachButton = slot.querySelector<HTMLButtonElement>('#command-attach')!;
  const attachMenu = slot.querySelector<HTMLElement>('#command-attach-menu')!;
  const filesInput = slot.querySelector<HTMLInputElement>('#attach-files-input')!;
  const folderInput = slot.querySelector<HTMLInputElement>('#attach-folder-input')!;
  const megabytes = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

  function setAttached(next: AttachedFile[]) {
    attached = next;
    attachedBar.hidden = next.length === 0;
    attachButton.dataset.has = String(next.length > 0);
    if (next.length === 0) return;
    const total = next.reduce((sum, entry) => sum + entry.file.size, 0);
    const folder = next[0].path.includes('/') ? next[0].path.split('/')[0] : null;
    const everyInFolder = folder !== null && next.every((entry) => entry.path.startsWith(`${folder}/`));
    const what = next.length === 1 ? next[0].path : everyInFolder ? `Folder "${folder}": ${next.length} files` : `${next.length} files: ${next.slice(0, 3).map((entry) => entry.path.split('/').pop()).join(', ')}${next.length > 3 ? '…' : ''}`;
    attachedText.textContent = `${what} · ${megabytes(total)}`;
  }

  /** Add files to what is attached, within the limits; says why if some could not be taken. */
  function attach(more: AttachedFile[]) {
    // Not the clutter every folder carries.
    const wanted = more.filter((entry) => !/(^|\/)(\.DS_Store|Thumbs\.db|\.git|node_modules)(\/|$)/.test(entry.path));
    const next = [...attached];
    let refused = '';
    for (const entry of wanted) {
      if (next.some((existing) => existing.path === entry.path)) continue;
      if (entry.file.size > ATTACH_LIMITS.fileBytes) refused = `"${entry.file.name}" is over ${megabytes(ATTACH_LIMITS.fileBytes)}, so it was left out.`;
      else if (next.length >= ATTACH_LIMITS.files) refused = `Only the first ${ATTACH_LIMITS.files} files were taken.`;
      else if (next.reduce((sum, existing) => sum + existing.file.size, 0) + entry.file.size > ATTACH_LIMITS.totalBytes) refused = `Attachments can be up to ${megabytes(ATTACH_LIMITS.totalBytes)} in all; the rest were left out.`;
      else next.push(entry);
    }
    setAttached(next);
    if (refused) show('error', refused);
    input.focus();
  }

  const fromInput = (list: FileList | null): AttachedFile[] => [...(list ?? [])].map((file) => ({ file, path: file.webkitRelativePath || file.name }));
  for (const picker of [filesInput, folderInput]) {
    picker.addEventListener('change', () => {
      attach(fromInput(picker.files));
      picker.value = ''; // so the same file can be chosen again after being removed
    });
  }
  const setMenu = (open: boolean) => {
    attachMenu.hidden = !open;
    attachButton.setAttribute('aria-expanded', String(open));
  };
  attachButton.addEventListener('click', () => setMenu(Boolean(attachMenu.hidden)));
  slot.querySelector<HTMLButtonElement>('#attach-files')!.addEventListener('click', () => {
    setMenu(false);
    filesInput.click();
  });
  slot.querySelector<HTMLButtonElement>('#attach-folder')!.addEventListener('click', () => {
    setMenu(false);
    folderInput.click();
  });
  slot.querySelector<HTMLButtonElement>('#command-attached-clear')!.addEventListener('click', () => setAttached([]));
  document.addEventListener('pointerdown', (event) => {
    if (!attachMenu.hidden && !attachMenu.contains(event.target as Node) && !attachButton.contains(event.target as Node)) setMenu(false);
  });
  attachMenu.addEventListener('keydown', (event) => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      setMenu(false);
      attachButton.focus();
    }
  });

  // Dropping files or folders on the bar attaches them. A dropped folder is walked, so its files keep their places in it.
  interface Entry {
    isFile: boolean;
    isDirectory: boolean;
    name: string;
    file?(done: (file: File) => void, failed: () => void): void;
    createReader?(): { readEntries(done: (entries: Entry[]) => void, failed: () => void): void };
  }
  async function walk(entry: Entry, prefix: string, into: AttachedFile[]): Promise<void> {
    if (into.length > ATTACH_LIMITS.files * 4) return; // far more than could be sent: stop looking
    if (entry.isFile && entry.file) {
      const file = await new Promise<File | null>((resolve) => entry.file!(resolve, () => resolve(null)));
      if (file) into.push({ file, path: `${prefix}${entry.name}` });
    } else if (entry.isDirectory && entry.createReader) {
      const reader = entry.createReader();
      // A reader hands a folder over in batches: keep asking until it has no more.
      for (;;) {
        const batch = await new Promise<Entry[]>((resolve) => reader.readEntries(resolve, () => resolve([])));
        if (batch.length === 0) break;
        for (const child of batch) await walk(child, `${prefix}${entry.name}/`, into);
      }
    }
  }
  form.addEventListener('dragover', (event) => {
    if (!event.dataTransfer?.types.includes('Files')) return;
    event.preventDefault();
    form.dataset.drop = 'true';
  });
  form.addEventListener('dragleave', () => delete form.dataset.drop);
  form.addEventListener('drop', (event) => {
    if (!event.dataTransfer?.types.includes('Files')) return;
    event.preventDefault();
    delete form.dataset.drop;
    const entries = [...event.dataTransfer.items].map((item) => (item as DataTransferItem & { webkitGetAsEntry?(): Entry | null }).webkitGetAsEntry?.() ?? null);
    if (entries.some(Boolean)) {
      const found: AttachedFile[] = [];
      void Promise.all(entries.map((entry) => (entry ? walk(entry, '', found) : Promise.resolve()))).then(() => attach(found));
    } else {
      attach(fromInput(event.dataTransfer.files));
    }
  });

  async function submit(spoken: boolean) {
    const text = input.value.trim();
    if (!text || busy || !handler) return;
    busy = true;
    form.dataset.busy = 'true';
    send.disabled = true;
    show('thinking', 'Thinking…');
    try {
      const answer = await handler(text, attached);
      input.value = '';
      setAttached([]);
      show('answer', answer.reply, answer.summary, answer.note);
      if (spoken) speak(answer.reply); // answer aloud only when asked aloud
    } catch (error) {
      show('error', (error as Error).message || 'That did not work. Try again.');
    } finally {
      busy = false;
      delete form.dataset.busy;
      send.disabled = false;
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void submit(false);
  });
  bubbleClose.addEventListener('click', () => {
    window.clearTimeout(hideTimer);
    bubble.hidden = true;
  });
  // Typing a request must not also drive the office (R resets the view, Escape deselects).
  input.addEventListener('keydown', (event) => {
    event.stopPropagation();
    if (event.key === 'Escape') input.blur();
  });

  // Voice: shown only where the browser can recognise speech; hidden again if the microphone is refused.
  const Recognition = recognitionConstructor();
  if (Recognition) {
    mic.hidden = false;
    let listening: Recognition | null = null;
    mic.addEventListener('click', () => {
      if (listening) {
        listening.stop();
        return;
      }
      const recognition = new Recognition();
      recognition.lang = navigator.language || 'en-US';
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        input.value = event.results[0][0].transcript;
        void submit(true);
      };
      recognition.onerror = (event) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          mic.hidden = true;
          show('error', 'The microphone is not available here. Type the request instead.');
        }
      };
      recognition.onend = () => {
        listening = null;
        mic.dataset.listening = 'false';
        mic.setAttribute('aria-label', 'Speak the request');
      };
      try {
        recognition.start();
        listening = recognition;
        mic.dataset.listening = 'true';
        mic.setAttribute('aria-label', 'Stop listening');
      } catch {
        mic.hidden = true;
      }
    });
  }

  return {
    onCommand(next) {
      handler = next;
    },
  };
}
