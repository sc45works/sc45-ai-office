/**
 * SC45 AI Office: sign-offs.
 *
 * When something is waiting for Stephen's approval, a card comes up over the office: what is
 * being asked, on which mission, who would do what, anything the Chief of Staff flagged, and
 * two answers. Approve or decline, with an optional note; either is recorded in the log
 * under his name. Closing the card (Escape) decides nothing: the request keeps waiting, for
 * as long as it takes, and a pill at the top of the office brings the card back.
 *
 * Requests are answered one at a time, oldest first.
 *
 * So that an answer is never given by accident, the card does not take the keyboard from a
 * field being typed in, and its buttons do nothing for the first moment after it appears.
 */

export interface ApprovalItem {
  name: string;
  role: string;
  accent: string;
  task: string;
  /** "Stage 2", when the request covers more than one stage. */
  stage?: string;
  /** Why the Chief of Staff flagged this task; or, on a request to close, what went wrong with it. */
  risk?: string;
  /** The label on that: "Flagged by Sophia" unless said otherwise. */
  flag?: string;
}

export interface ApprovalCard {
  id: string;
  kind: 'start' | 'stage' | 'close';
  missionId: string;
  /** The mission's title. */
  mission: string;
  /** Who is asking, and when (ISO). */
  askedBy: string;
  askedAt: string;
  items: ApprovalItem[];
  /** Short facts under the heading: the project, the stage, the cost so far, files in the folder. */
  facts: string[];
  /** True when some of the mission's tasks did not come out done. */
  troubled?: boolean;
}

export type Decision = 'approved' | 'declined';

export interface ApprovalsUi {
  /** Everything waiting, oldest first. */
  set(cards: ApprovalCard[]): void;
  /** Called with the answer. Reject to show why it could not be recorded. */
  onDecide(handler: (id: string, decision: Decision, note: string) => Promise<void>): void;
  /** True while the card is up. */
  isOpen(): boolean;
}

const HEADINGS: Record<ApprovalCard['kind'], { ask: string; consequence: string; declined: string }> = {
  start: { ask: 'Start this mission?', consequence: 'Approve, and the first stage begins.', declined: 'Decline, and the mission is closed with nothing done.' },
  stage: { ask: 'Start the next stage?', consequence: 'Approve, and this stage begins, working from the files already in the project.', declined: 'Decline, and work stops here; the mission stays open.' },
  close: { ask: 'Close this mission?', consequence: 'Everyone has finished. Approve, and the mission is closed.', declined: 'Decline, and it stays open for more work.' },
};

/** A mission whose agents have all stopped, but not all of them with the work done. */
const TROUBLED_CLOSE = { ask: 'Not everything was done. Close it anyway?', consequence: 'Approve, and the mission is closed as it stands.', declined: 'Decline, and it stays open, so you can send someone back to it.' };

/** How long after the card appears before it will take an answer. */
const ARM_MS = 600;

const typing = (element: Element | null) => element instanceof HTMLElement && (element.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName));

export function createApprovals(root: HTMLElement): ApprovalsUi {
  const pill = document.createElement('button');
  pill.type = 'button';
  pill.className = 'approval-pill';
  pill.hidden = true;
  pill.innerHTML = `<span class="approval-pill-dot" aria-hidden="true"></span><span class="approval-pill-text"></span>`;

  const scrim = document.createElement('div');
  scrim.className = 'approval-scrim';
  scrim.hidden = true;
  scrim.innerHTML = `
    <section class="panel approval-card" role="dialog" aria-modal="true" aria-labelledby="approval-ask">
      <header class="approval-head">
        <span class="approval-label">Sign-off needed</span>
        <span class="approval-count" id="approval-count"></span>
        <button class="approval-close" type="button" aria-label="Leave it waiting"><span aria-hidden="true">×</span></button>
      </header>
      <h2 class="approval-ask" id="approval-ask"></h2>
      <p class="approval-mission"><span class="approval-mission-id"></span><span class="approval-mission-title"></span></p>
      <p class="approval-facts"></p>
      <ul class="approval-items"></ul>
      <p class="approval-consequence"></p>
      <label class="approval-note-label" for="approval-note">Note <span>optional, goes in the log with your answer</span></label>
      <textarea class="approval-note" id="approval-note" rows="2" maxlength="300" placeholder="Anything they should know"></textarea>
      <p class="approval-error" role="alert" hidden></p>
      <div class="approval-actions">
        <button class="approval-button approval-decline" type="button">Decline</button>
        <button class="approval-button approval-approve" type="button">Approve <kbd>Enter</kbd></button>
      </div>
      <p class="approval-foot"><span class="approval-asked"></span><span>Signed as Stephen · <kbd>Esc</kbd> leaves it waiting</span></p>
    </section>`;
  root.append(pill, scrim);

  const $ = <T extends HTMLElement>(selector: string) => scrim.querySelector<T>(selector)!;
  const card = $('.approval-card');
  const note = $<HTMLTextAreaElement>('.approval-note');
  const approve = $<HTMLButtonElement>('.approval-approve');
  const decline = $<HTMLButtonElement>('.approval-decline');
  const error = $('.approval-error');
  const pillText = pill.querySelector<HTMLElement>('.approval-pill-text')!;

  let cards: ApprovalCard[] = [];
  /** Requests the card has already come up for by itself: it does not push itself forward twice. */
  const announced = new Set<string>();
  let shownId: string | null = null;
  let open = false;
  let busy = false;
  let armedAt = 0;
  let decide: (id: string, decision: Decision, note: string) => Promise<void> = async () => {};

  const clock = (iso: string) => {
    const time = new Date(iso);
    return Number.isNaN(time.getTime()) ? '' : `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
  };

  function fill(current: ApprovalCard) {
    const heading = current.kind === 'close' && current.troubled ? TROUBLED_CLOSE : HEADINGS[current.kind];
    card.dataset.troubled = String(Boolean(current.troubled));
    $('.approval-label').textContent = current.troubled ? 'Needs your attention' : 'Sign-off needed';
    $('.approval-count').textContent = cards.length > 1 ? `1 of ${cards.length}` : '';
    $('.approval-ask').textContent = heading.ask;
    $('.approval-mission-id').textContent = current.missionId;
    $('.approval-mission-title').textContent = current.mission;
    const facts = $('.approval-facts');
    facts.replaceChildren(
      ...current.facts.map((fact) => {
        const chip = document.createElement('span');
        chip.textContent = fact;
        return chip;
      }),
    );
    facts.hidden = current.facts.length === 0;

    const list = $('.approval-items');
    list.replaceChildren(
      ...current.items.map((item) => {
        const row = document.createElement('li');
        row.className = 'approval-item';
        row.style.setProperty('--accent', item.accent);
        const who = document.createElement('div');
        who.className = 'approval-item-who';
        const name = document.createElement('span');
        name.className = 'approval-item-name';
        name.textContent = item.name;
        const role = document.createElement('span');
        role.className = 'approval-item-role';
        role.textContent = item.stage ? `${item.role} · ${item.stage}` : item.role;
        who.append(name, role);
        const task = document.createElement('div');
        task.className = 'approval-item-task';
        task.textContent = item.task;
        row.append(who, task);
        if (item.risk) {
          const risk = document.createElement('div');
          risk.className = 'approval-item-risk';
          const flag = document.createElement('span');
          flag.textContent = item.flag ?? 'Flagged by Sophia';
          risk.append(flag, document.createTextNode(item.risk));
          row.append(risk);
        }
        return row;
      }),
    );
    list.hidden = current.items.length === 0;
    $('.approval-consequence').textContent = `${heading.consequence} ${heading.declined}`;
    $('.approval-asked').textContent = `Asked by ${current.askedBy}${clock(current.askedAt) ? ` at ${clock(current.askedAt)}` : ''}`;
  }

  function setBusy(value: boolean) {
    busy = value;
    approve.disabled = decline.disabled = note.disabled = value;
    card.dataset.busy = String(value);
  }

  function render() {
    const current = cards[0];
    pill.hidden = open || cards.length === 0;
    pillText.textContent = cards.length === 1 ? '1 sign-off waiting for you' : `${cards.length} sign-offs waiting for you`;
    if (!current) {
      close();
      return;
    }
    if (!open) return;
    if (current.id !== shownId) {
      // A different request from the one that was showing: start clean, and make it wait a moment for an answer.
      shownId = current.id;
      note.value = '';
      error.hidden = true;
      setBusy(false);
      armedAt = performance.now() + ARM_MS;
    }
    fill(current);
  }

  function show(takeFocus: boolean) {
    if (cards.length === 0) return;
    open = true;
    scrim.hidden = false;
    shownId = null;
    render();
    if (takeFocus) approve.focus();
  }

  function close() {
    if (!open) return;
    open = false;
    scrim.hidden = true;
    shownId = null;
    if (card.contains(document.activeElement)) (document.activeElement as HTMLElement).blur();
    pill.hidden = cards.length === 0;
  }

  async function answer(decision: Decision) {
    const current = cards[0];
    if (!open || busy || !current || performance.now() < armedAt) return;
    setBusy(true);
    error.hidden = true;
    try {
      await decide(current.id, decision, note.value.trim());
      // The request leaves the list when the decision comes back through the event feed.
    } catch (reason) {
      error.textContent = `Not recorded: ${(reason as Error).message || 'the server did not answer.'}`;
      error.hidden = false;
      setBusy(false);
    }
  }

  approve.addEventListener('click', () => void answer('approved'));
  decline.addEventListener('click', () => void answer('declined'));
  $('.approval-close').addEventListener('click', close);
  pill.addEventListener('click', () => show(true));
  // A press on the dimmed office outside the card leaves the request waiting.
  scrim.addEventListener('pointerdown', (event) => {
    if (event.target === scrim) close();
  });

  // Keys pressed in the card belong to the card: the office must not also turn or reset its view.
  card.addEventListener('keydown', (event) => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Enter' && !event.shiftKey && !event.altKey) {
      const inNote = event.target === note;
      // In the note, Enter is a new line; Ctrl or Cmd with Enter approves from there.
      if (inNote && !(event.ctrlKey || event.metaKey)) return;
      if (!inNote && (event.target as HTMLElement).tagName === 'BUTTON') return; // the button's own click handles it
      event.preventDefault();
      void answer('approved');
    }
  });
  // Escape closes the card wherever the keyboard happens to be.
  window.addEventListener(
    'keydown',
    (event) => {
      if (!open || event.key !== 'Escape' || card.contains(event.target as Node)) return;
      event.stopPropagation();
      close();
    },
    true,
  );

  return {
    set(next) {
      const fresh = next.filter((item) => !announced.has(item.id));
      for (const item of next) announced.add(item.id);
      cards = next;
      // Something new is waiting: come up, unless Stephen is in the middle of typing somewhere,
      // in which case the pill shows and the card waits to be asked for.
      if (fresh.length > 0 && !open) {
        const midSentence = typing(document.activeElement);
        if (!midSentence) show(true);
      }
      render();
    },
    onDecide(handler) {
      decide = handler;
    },
    isOpen: () => open,
  };
}
