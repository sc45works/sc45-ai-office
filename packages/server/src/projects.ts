/**
 * Project folders: where agents' real work goes.
 *
 * Each project is one folder inside the projects folder (by default `<repo>/projects`,
 * or wherever SC45_PROJECTS_DIR points). A mission names its project; the agents on that
 * mission work in that folder and nowhere else.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectSlug } from '@sc45/shared';

const here = path.dirname(fileURLToPath(import.meta.url));
export const DEFAULT_PROJECTS_DIR = path.join(here, '..', '..', '..', 'projects');

export interface Projects {
  dir: string;
  /** The names of the project folders, in alphabetical order. */
  list(): string[];
  /** The folder for a project, created if it is not there. Throws for a name that is not a plain folder name. */
  ensure(slug: string): string;
  /** `file` as a path inside the project, `slug/…` with forward slashes, or null if it is outside it. */
  relative(slug: string, file: string): string | null;
}

export function projectsIn(dir: string = process.env.SC45_PROJECTS_DIR ?? DEFAULT_PROJECTS_DIR): Projects {
  const root = path.resolve(dir);
  const folder = (slug: string) => {
    // Only a name `projectSlug` would itself produce is accepted, so no dots, slashes or drive letters.
    if (!slug || projectSlug(slug) !== slug) throw new Error(`"${slug}" is not a usable project name`);
    return path.join(root, slug);
  };
  return {
    dir: root,
    list() {
      if (!fs.existsSync(root)) return [];
      return fs
        .readdirSync(root, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && projectSlug(entry.name) === entry.name)
        .map((entry) => entry.name)
        .sort();
    },
    ensure(slug) {
      const target = folder(slug);
      fs.mkdirSync(target, { recursive: true });
      return target;
    },
    relative(slug, file) {
      const base = folder(slug);
      const inside = path.relative(base, path.resolve(base, file));
      if (!inside || inside.startsWith('..') || path.isAbsolute(inside)) return null;
      return `${slug}/${inside.split(path.sep).join('/')}`;
    },
  };
}
