/**
 * SC45 AI Office: work for review.
 *
 * When a mission's work is finished, a glowing folder appears on Stephen's desk (scene.ts).
 * Pressing it opens this card: what was asked, who did what, and every file they left, each
 * a link that opens the file itself. "Mark as reviewed" takes the folder off the desk; closing
 * the card leaves it there for later.
 */

export interface ReviewFile {
  /** The file, as a path inside the projects folder. */
  path: string;
  /** "Wrote", "Edited", "Report"… */
  label: string;
  by: string;
  /** Where to open it, or null when there is no server to ask for it. */
  url: string | null;
}

export interface ReviewCard {
  missionId: string;
  title: string;
  /** Short facts: the project, whether it is closed, what it cost. */
  facts: string[];
  people: Array<{ name: string; role: string; accent: string; task: string; problem?: string }>;
  /** True when some of it did not come out done. */
  troubled: boolean;
  files: ReviewFile[];
  /** The page to open first, if the work has an obvious front door. */
  home: string | null;
}

export interface ReviewUi {
  /** Everything waiting for review, newest first. */
  set(cards: ReviewCard[]): void;
  open(): void;
  isOpen(): boolean;
  onReviewed(handler: (missionId: string) => void): void;
}

export function createReview(root: HTMLElement): ReviewUi {
  const scrim = document.createElement('div');
  scrim.className = 'approval-scrim review-scrim';
  scrim.hidden = true;
  scrim.innerHTML = `
    <section class="panel approval-card review-card" role="dialog" aria-modal="true" aria-labelledby="review-title">
      <header class="approval-head">
        <span class="approval-label">For your review</span>
        <span class="approval-count" id="review-count"></span>
        <button class="review-step" id="review-previous" type="button" aria-label="Previous">‹</button>
        <button class="review-step" id="review-next" type="button" aria-label="Next">›</button>
        <button class="approval-close" type="button" aria-label="Close, and leave the folder on the desk"><span aria-hidden="true">×</span></button>
      </header>
      <h2 class="approval-ask" id="review-title"></h2>
      <p class="approval-facts" id="review-facts"></p>
      <ul class="approval-items" id="review-people"></ul>
      <h3 class="review-heading">Files</h3>
      <ul class="review-files" id="review-files"></ul>
      <p class="review-note" id="review-note" hidden></p>
      <div class="approval-actions">
        <button class="approval-button" id="review-done" type="button">Mark as reviewed</button>
        <a class="approval-button approval-approve" id="review-home" target="_blank" rel="noopener">Open the work</a>
      </div>
    </section>`;
  root.append(scrim);
  const $ = <T extends HTMLElement>(selector: string) => scrim.querySelector<T>(selector)!;
  const card = $('.review-card');

  let cards: ReviewCard[] = [];
  let index = 0;
  let open = false;
  let reviewed: (missionId: string) => void = () => {};

  function render() {
    if (cards.length === 0) {
      close();
      return;
    }
    index = Math.min(index, cards.length - 1);
    const current = cards[index];
    $('#review-count').textContent = cards.length > 1 ? `${index + 1} of ${cards.length}` : '';
    $('#review-previous').hidden = $('#review-next').hidden = cards.length < 2;
    $('#review-title').textContent = `${current.missionId} · ${current.title}`;
    $('#review-facts').replaceChildren(
      ...current.facts.map((fact) => {
        const chip = document.createElement('span');
        chip.textContent = fact;
        return chip;
      }),
    );
    $('#review-people').replaceChildren(
      ...current.people.map((person) => {
        const row = document.createElement('li');
        row.className = 'approval-item';
        row.style.setProperty('--accent', person.accent);
        const who = document.createElement('div');
        who.className = 'approval-item-who';
        const name = document.createElement('span');
        name.className = 'approval-item-name';
        name.textContent = person.name;
        const role = document.createElement('span');
        role.className = 'approval-item-role';
        role.textContent = person.role;
        who.append(name, role);
        const task = document.createElement('div');
        task.className = 'approval-item-task';
        task.textContent = person.task;
        row.append(who, task);
        if (person.problem) {
          const problem = document.createElement('div');
          problem.className = 'approval-item-risk';
          const flag = document.createElement('span');
          flag.textContent = 'Not done';
          problem.append(flag, document.createTextNode(person.problem));
          row.append(problem);
        }
        return row;
      }),
    );
    card.dataset.troubled = String(current.troubled);
    $('.approval-label').textContent = current.troubled ? 'For your review · not completed' : 'For your review';
    $('#review-people').hidden = current.people.length === 0;
    $('#review-files').replaceChildren(
      ...current.files.map((file) => {
        const row = document.createElement('li');
        const link = document.createElement(file.url ? 'a' : 'span');
        link.className = 'review-file';
        if (file.url) {
          (link as HTMLAnchorElement).href = file.url;
          (link as HTMLAnchorElement).target = '_blank';
          (link as HTMLAnchorElement).rel = 'noopener';
        }
        const path = document.createElement('span');
        path.className = 'review-file-path';
        path.textContent = file.path;
        const meta = document.createElement('span');
        meta.className = 'review-file-meta';
        meta.textContent = `${file.label} · ${file.by}`;
        link.append(path, meta);
        row.append(link);
        return row;
      }),
    );
    const note = $('#review-note');
    const linked = current.files.some((file) => file.url);
    note.hidden = linked && current.files.length > 0;
    note.textContent = current.files.length === 0 ? 'No files were recorded for this mission.' : 'This is the demo: the files are only listed. With the server running, each one opens.';
    const home = $<HTMLAnchorElement>('#review-home');
    home.hidden = !current.home;
    if (current.home) home.href = current.home;
  }

  function close() {
    if (!open) return;
    open = false;
    scrim.hidden = true;
  }

  $('.approval-close').addEventListener('click', close);
  scrim.addEventListener('pointerdown', (event) => {
    if (event.target === scrim) close();
  });
  $('#review-previous').addEventListener('click', () => {
    index = (index + cards.length - 1) % cards.length;
    render();
  });
  $('#review-next').addEventListener('click', () => {
    index = (index + 1) % cards.length;
    render();
  });
  $('#review-done').addEventListener('click', () => {
    const current = cards[index];
    if (current) reviewed(current.missionId);
  });
  card.addEventListener('keydown', (event) => {
    event.stopPropagation();
    if (event.key === 'Escape') close();
  });
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
      cards = next;
      if (open) render();
    },
    open() {
      if (cards.length === 0) return;
      open = true;
      index = 0;
      scrim.hidden = false;
      render();
      $<HTMLButtonElement>('.approval-close').focus();
    },
    isOpen: () => open,
    onReviewed(handler) {
      reviewed = handler;
    },
  };
}
