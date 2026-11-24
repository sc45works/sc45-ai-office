/**
 * SC45 AI Office: the side panel for a selected agent.
 *
 * It shows who the agent is, what it is doing now, and what it has recently done:
 * the mission, the files it reported and the tasks it worked on. All of it comes from
 * the snapshot; the panel holds no state of its own beyond what is on screen.
 *
 * Its Edit button turns it into the character sheet (editor.ts) for that person.
 */
import { fileNameOf, folderOf, type AgentOutput, type AgentState, type AgentTask, type Appearance, type MissionStatus, type ProfileChange } from '@sc45/shared';
import { createEditor } from './editor';

export interface PanelData {
  /** Whose panel this is. */
  id: string;
  name: string;
  appearance: Appearance;
  /** What Reset goes back to. */
  original: { name: string; appearance: Appearance };
  role: string;
  /** Department colour, as a hex string. */
  accent: string;
  state: AgentState;
  task?: string;
  /** When the agent entered its current state, or null if it has not changed since the office opened. */
  since: string | null;
  mission?: { id: string; title: string; status: MissionStatus };
  /** Newest first. */
  outputs: AgentOutput[];
  /** Newest first. */
  tasks: AgentTask[];
}

export interface AgentPanel {
  show(data: PanelData): void;
  hide(): void;
  onClose(handler: () => void): void;
  /** Called with each change made in the character sheet, as it is made. */
  onEdit(handler: (agentId: string, change: ProfileChange) => void): void;
  /** Say how saving went, under the character sheet. */
  setSaveNote(text: string, isError?: boolean): void;
}

const STATE_LABEL: Record<AgentState, string> = {
  idle: 'Idle',
  working: 'Working',
  collaborating: 'Collaborating',
  blocked: 'Blocked',
  reporting: 'Reporting',
};

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/** "just now", "4 min", "2 h 10 min". */
function elapsed(since: string | null, now = Date.now()): string | null {
  if (!since) return null;
  const minutes = Math.floor((now - Date.parse(since)) / 60_000);
  if (Number.isNaN(minutes) || minutes < 0) return null;
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return minutes % 60 ? `${hours} h ${minutes % 60} min` : `${hours} h`;
}

export function createAgentPanel(root: HTMLElement): AgentPanel {
  const panel = el('aside', 'panel agent-panel');
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Selected agent');

  const header = el('header', 'agent-panel-header');
  const title = el('div', 'agent-panel-title');
  const name = el('h2', 'agent-panel-name');
  const role = el('p', 'agent-panel-role');
  title.append(name, role);
  const close = el('button', 'agent-panel-close');
  close.type = 'button';
  close.id = 'agent-panel-close';
  close.setAttribute('aria-label', 'Close and return to the overview');
  close.append(el('span', undefined, '×'));
  const edit = el('button', 'agent-panel-edit', 'Edit');
  edit.type = 'button';
  edit.setAttribute('aria-pressed', 'false');
  header.append(title, edit, close);

  const status = el('div', 'agent-panel-status');
  const chip = el('span', 'state-chip');
  const since = el('span', 'agent-panel-since');
  status.append(chip, since);

  const body = el('div', 'agent-panel-body');
  panel.append(header, status, body);
  root.append(panel);

  let current: PanelData | null = null;

  // The character sheet. While it is open it owns the body of the panel; the header above
  // it keeps following the snapshot, so a new name shows there as it is typed.
  let editing = false;
  let onEdit: (agentId: string, change: ProfileChange) => void = () => {};
  const editor = createEditor({
    onChange: (change) => current && onEdit(current.id, change),
    onReset: () => {
      if (!current) return;
      editor.set(current.original);
      onEdit(current.id, { name: current.original.name, appearance: current.original.appearance });
    },
    onDone: () => setEditing(false),
  });
  function setEditing(next: boolean) {
    editing = next;
    edit.setAttribute('aria-pressed', String(next));
    edit.textContent = next ? 'Editing' : 'Edit';
    panel.dataset.editing = String(next);
    if (!current) return;
    if (next) {
      editor.set(current);
      editor.setNote('');
      body.replaceChildren(editor.element);
      body.scrollTop = 0;
    } else render(current);
  }
  edit.addEventListener('click', () => setEditing(!editing));

  function section(heading: string): HTMLElement {
    const wrapper = el('section', 'agent-panel-section');
    wrapper.append(el('h3', undefined, heading));
    body.append(wrapper);
    return wrapper;
  }

  function render(data: PanelData) {
    panel.style.setProperty('--accent', data.accent);
    name.textContent = data.name;
    role.textContent = data.role;
    chip.textContent = STATE_LABEL[data.state];
    chip.dataset.state = data.state;
    const time = elapsed(data.since);
    since.textContent = time ? (time === 'just now' ? time : `for ${time}`) : '';
    if (editing) return; // the character sheet is in the body; leave it alone

    body.replaceChildren();

    const now = section('Now');
    now.append(el('p', data.task ? 'agent-panel-task' : 'agent-panel-empty', data.task ?? 'Nothing in hand.'));

    if (data.mission) {
      const mission = section('Mission');
      const line = el('p', 'agent-panel-mission');
      line.append(el('span', 'mission-id', data.mission.id), el('span', undefined, data.mission.title));
      if (data.mission.status === 'done') line.append(el('span', 'mission-done', 'Done'));
      mission.append(line);
    }

    const outputs = section(data.outputs.length ? `Files (${data.outputs.length})` : 'Files');
    if (data.outputs.length === 0) {
      outputs.append(el('p', 'agent-panel-empty', 'No files reported yet.'));
    } else {
      const list = el('ul', 'agent-panel-list');
      for (const output of data.outputs) {
        const item = el('li');
        item.title = output.path;
        item.append(el('span', 'file-name', fileNameOf(output.path)));
        const folder = folderOf(output.path);
        item.append(el('span', 'file-detail', output.label ? `${output.label}${folder ? ` · ${folder}` : ''}` : folder));
        list.append(item);
      }
      outputs.append(list);
    }

    if (data.tasks.length > 0) {
      const tasks = section('Recent tasks');
      const list = el('ul', 'agent-panel-list');
      for (const task of data.tasks) {
        const item = el('li');
        item.append(el('span', 'task-name', task.label));
        if (task.missionId) item.append(el('span', 'file-detail', task.missionId));
        list.append(item);
      }
      tasks.append(list);
    }
  }

  // Keep "for 4 min" honest while the panel stays open.
  window.setInterval(() => {
    if (!current || panel.hidden) return;
    const time = elapsed(current.since);
    since.textContent = time ? (time === 'just now' ? time : `for ${time}`) : '';
  }, 20_000);

  return {
    show(data) {
      const same = current?.id === data.id;
      const scroll = same ? body.scrollTop : 0;
      current = data;
      if (!same && editing) setEditing(false); // someone else was picked: back to their ordinary panel
      render(data);
      panel.hidden = false;
      body.scrollTop = scroll;
    },
    hide() {
      if (editing) setEditing(false);
      current = null;
      panel.hidden = true;
    },
    onEdit(handler) {
      onEdit = handler;
    },
    setSaveNote(text, isError) {
      editor.setNote(text, isError);
    },
    onClose(handler) {
      close.addEventListener('click', handler);
    },
  };
}
