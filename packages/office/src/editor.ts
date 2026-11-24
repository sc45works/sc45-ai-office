/**
 * SC45 AI Office: the character sheet.
 *
 * The form that replaces the side panel's contents while someone is being edited: their
 * name, build, skin, hair, face and clothes. Every change is reported at once through
 * `onChange`, so the figure in the office changes as the form does; what happens to the
 * change after that (saving it) is not this file's business.
 */
import {
  BOTTOM_COLORS,
  BUILDS,
  HAIR_COLORS,
  HAIR_STYLES,
  NAME_MAX_LENGTH,
  SKIN_TONES,
  TOP_COLORS,
  parseName,
  type Appearance,
  type ProfileChange,
} from '@sc45/shared';

export interface EditorValue {
  name: string;
  appearance: Appearance;
}

export interface Editor {
  element: HTMLElement;
  /** Fill the form. Called when editing starts, and after a reset. */
  set(value: EditorValue): void;
  /** A line under the form: "Saved", or why it could not be. */
  setNote(text: string, isError?: boolean): void;
}

const BUILD_LABEL: Record<Appearance['build'], string> = { masculine: 'Masculine', feminine: 'Feminine' };
const HAIR_LABEL: Record<Appearance['hair'], string> = { short: 'Short', long: 'Long', bun: 'Bun', ponytail: 'Ponytail', curly: 'Curly', bald: 'None' };
const COLOR_NAMES: Record<string, string> = {};

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

let fieldCount = 0;

export function createEditor(handlers: { onChange(change: ProfileChange): void; onReset(): void; onDone(): void }): Editor {
  const form = el('form', 'editor');
  form.autocomplete = 'off';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handlers.onDone();
  });

  let value: EditorValue | null = null;
  const refreshers: Array<() => void> = [];

  function change(next: Partial<Appearance>) {
    if (!value) return;
    value.appearance = { ...value.appearance, ...next };
    for (const refresh of refreshers) refresh();
    handlers.onChange({ appearance: value.appearance });
  }

  function field(label: string): { wrapper: HTMLElement; labelId: string } {
    const wrapper = el('div', 'editor-field');
    const heading = el('div', 'editor-label', label);
    heading.id = `editor-label-${++fieldCount}`;
    wrapper.append(heading);
    form.append(wrapper);
    return { wrapper, labelId: heading.id };
  }

  // Name
  {
    const wrapper = el('div', 'editor-field');
    const label = el('label', 'editor-label', 'Name');
    const input = el('input', 'editor-input');
    input.type = 'text';
    input.id = 'editor-name';
    input.maxLength = NAME_MAX_LENGTH;
    label.htmlFor = input.id;
    wrapper.append(label, input);
    form.append(wrapper);
    input.addEventListener('input', () => {
      const name = parseName(input.value);
      input.setAttribute('aria-invalid', String(!name));
      if (name && value) {
        value.name = name;
        handlers.onChange({ name });
      }
    });
    // Typing a name must not also drive the office (R resets the view, Escape deselects).
    input.addEventListener('keydown', (event) => event.stopPropagation());
    refreshers.push(() => {
      if (value && document.activeElement !== input) input.value = value.name;
    });
  }

  /** A row of buttons of which exactly one is pressed. */
  function choice<T extends string>(label: string, options: readonly T[], labels: Record<T, string>, key: 'build' | 'hair') {
    const { wrapper, labelId } = field(label);
    const row = el('div', 'editor-choice');
    row.setAttribute('role', 'group');
    row.setAttribute('aria-labelledby', labelId);
    const buttons = options.map((option) => {
      const button = el('button', 'editor-option', labels[option]);
      button.type = 'button';
      button.addEventListener('click', () => change({ [key]: option } as Partial<Appearance>));
      row.append(button);
      return [option, button] as const;
    });
    wrapper.append(row);
    refreshers.push(() => {
      for (const [option, button] of buttons) button.setAttribute('aria-pressed', String(value?.appearance[key] === option));
    });
  }

  /** A row of colour swatches, and a picker for any other colour. */
  function colour(label: string, swatches: readonly string[], key: 'skin' | 'hairColor' | 'top' | 'bottom', custom = true) {
    const { wrapper, labelId } = field(label);
    const row = el('div', 'editor-swatches');
    row.setAttribute('role', 'group');
    row.setAttribute('aria-labelledby', labelId);
    const buttons = swatches.map((hex, index) => {
      const button = el('button', 'editor-swatch');
      button.type = 'button';
      button.style.setProperty('--swatch', hex);
      button.setAttribute('aria-label', COLOR_NAMES[hex] ?? `${label} ${index + 1}`);
      button.addEventListener('click', () => change({ [key]: hex } as Partial<Appearance>));
      row.append(button);
      return [hex, button] as const;
    });
    let picker: HTMLInputElement | null = null;
    if (custom) {
      picker = el('input', 'editor-picker');
      picker.type = 'color';
      picker.setAttribute('aria-label', `${label}: any colour`);
      picker.addEventListener('input', () => change({ [key]: picker!.value.toLowerCase() } as Partial<Appearance>));
      row.append(picker);
    }
    wrapper.append(row);
    refreshers.push(() => {
      const current = value?.appearance[key];
      for (const [hex, button] of buttons) button.setAttribute('aria-pressed', String(current === hex));
      if (picker && current) {
        picker.value = current;
        picker.dataset.active = String(!swatches.includes(current));
      }
    });
  }

  choice('Build', BUILDS, BUILD_LABEL, 'build');
  colour('Skin', SKIN_TONES, 'skin');
  choice('Hair', HAIR_STYLES, HAIR_LABEL, 'hair');
  colour('Hair colour', HAIR_COLORS, 'hairColor');

  // Face: two switches.
  {
    const { wrapper, labelId } = field('Face');
    const row = el('div', 'editor-choice');
    row.setAttribute('role', 'group');
    row.setAttribute('aria-labelledby', labelId);
    for (const [key, text] of [['glasses', 'Glasses'], ['beard', 'Beard']] as const) {
      const button = el('button', 'editor-option', text);
      button.type = 'button';
      button.addEventListener('click', () => change({ [key]: !value?.appearance[key] } as Partial<Appearance>));
      row.append(button);
      refreshers.push(() => button.setAttribute('aria-pressed', String(Boolean(value?.appearance[key]))));
    }
    wrapper.append(row);
  }

  colour('Top', TOP_COLORS, 'top');
  colour('Trousers', BOTTOM_COLORS, 'bottom');

  const footer = el('div', 'editor-footer');
  const note = el('span', 'editor-note');
  note.setAttribute('role', 'status');
  const reset = el('button', 'editor-button', 'Reset');
  reset.type = 'button';
  reset.addEventListener('click', () => handlers.onReset());
  const done = el('button', 'editor-button editor-done', 'Done');
  done.type = 'submit';
  footer.append(note, reset, done);
  form.append(footer);

  return {
    element: form,
    set(next) {
      value = { name: next.name, appearance: { ...next.appearance } };
      for (const refresh of refreshers) refresh();
      const input = form.querySelector<HTMLInputElement>('#editor-name')!;
      input.value = value.name;
      input.setAttribute('aria-invalid', 'false');
    },
    setNote(text, isError = false) {
      note.textContent = text;
      note.dataset.error = String(isError);
    },
  };
}
