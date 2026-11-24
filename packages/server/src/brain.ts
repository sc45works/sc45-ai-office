/**
 * The Chief of Staff's brain: something that turns a request into a plan.
 *
 * Two are built in:
 *
 *   claude-code   runs Claude Code on this machine, once per request, with every tool
 *                 switched off. It can only answer with text, which is then checked.
 *   built-in      keyword rules from @sc45/shared. Needs nothing installed.
 *
 * `SC45_BRAIN` picks one: `claude-code`, `built-in`, or `auto` (the default), which uses
 * Claude Code when it is installed and falls back to the built-in planner when it is not.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { builtInPlan, describeOffice, extractJson, type OfficeSnapshot } from '@sc45/shared';

export interface BrainAnswer {
  /** The unchecked plan, as the brain gave it. */
  plan: unknown;
  /** Which brain answered, for showing in the office. */
  brain: 'claude-code' | 'built-in';
  /** Why a fallback was used, if it was. */
  note?: string;
}

/** What a brain is told besides the request and the state of the office. */
export interface BrainContext {
  /** The project folders that exist, when agents do real work. Absent when they do not. */
  projects?: readonly string[];
  /** The last few requests and replies, oldest first, so an answer to a question can be understood. */
  history?: ReadonlyArray<{ request: string; reply: string }>;
  /** Names of the files Stephen attached to this request. */
  attachments?: readonly string[];
}

export type Brain = (request: string, snapshot: OfficeSnapshot, context?: BrainContext) => Promise<BrainAnswer>;

/** The extra part of the prompt that `context` adds. */
export function describeContext(context: BrainContext = {}): string {
  const parts: string[] = [];
  if (context.projects) {
    parts.push(
      `Projects: agents do real work in project folders. Existing projects: ${context.projects.length ? context.projects.join(', ') : 'none yet'}.\n` +
        'Every create_mission needs "project": {"name": "...", "new": true} for a new folder or {"name": "<an existing project>", "new": false}.\n' +
        'If Stephen has not said which project the work is for and it is not plain from the conversation, take no action: ask him whether it is a new project (and what to call it) or one of the existing ones, naming them.',
    );
  }
  if (context.attachments?.length) {
    parts.push(
      `Stephen attached ${context.attachments.length === 1 ? 'a file' : `${context.attachments.length} files`} to this request: ${context.attachments.slice(0, 30).join(', ')}${context.attachments.length > 30 ? ', and more' : ''}.\n` +
        'You cannot open them. When you start a mission they are copied into its project folder, under "attachments/", and every agent on the mission is told they are there: write tasks that say what to do with them ("Build the page from the attached brief"). If the request is only a question, say that you cannot read attachments yourself and offer to put someone on it.',
    );
  }
  if (context.history?.length) {
    parts.push(`Earlier in this conversation (oldest first):\n${context.history.map((turn) => `Stephen: ${turn.request}\nYou: ${turn.reply}`).join('\n')}`);
  }
  return parts.length ? `\n\n${parts.join('\n\n')}` : '';
}

const here = path.dirname(fileURLToPath(import.meta.url));
const BRIEF_FILE = path.join(here, '..', '..', '..', 'company', 'chief-of-staff.md');

export const builtInBrain: Brain = async (request, snapshot) => ({ plan: builtInPlan(request, snapshot), brain: 'built-in' });

export interface ClaudeCodeOptions {
  /** The command to run. Default `claude`. */
  command?: string;
  /** Model alias or id. Default `haiku`: planning is a small job and it answers in about a second. */
  model?: string;
  timeoutMs?: number;
  briefFile?: string;
}

export class ClaudeCodeMissing extends Error {}

/**
 * Where Claude Code's installers put it. A server started from a terminal whose PATH lacks
 * these folders would otherwise not find a perfectly good install.
 */
export function usualLocations(): string[] {
  if (process.platform === 'win32') return [];
  const home = os.homedir();
  return [
    path.join(home, '.local', 'bin', 'claude'), // the native installer
    path.join(home, '.claude', 'local', 'claude'),
    path.join(home, '.npm-global', 'bin', 'claude'),
    '/opt/homebrew/bin/claude',
    '/usr/local/bin/claude',
  ].filter((file) => fs.existsSync(file));
}

/** Run Claude Code once, headless, with the prompt on standard input. Resolves with its JSON result. */
function runClaudeCode(command: string, args: string[], prompt: string, timeoutMs: number): Promise<{ result?: string; is_error?: boolean }> {
  return new Promise((resolve, reject) => {
    // On Windows the command is a .cmd shim, which needs a shell to run, and a shell needs each
    // argument quoted. The arguments are fixed strings and a file path from this file, never text
    // from the request: that only ever goes in on standard input.
    const windows = process.platform === 'win32';
    const child = spawn(command, windows ? args.map((arg) => `"${arg}"`) : args, { stdio: ['pipe', 'pipe', 'pipe'], shell: windows, windowsHide: true });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Claude Code did not answer within ${Math.round(timeoutMs / 1000)} seconds`));
    }, timeoutMs);

    child.stdout.on('data', (chunk) => (stdout += chunk));
    child.stderr.on('data', (chunk) => (stderr += chunk));
    child.on('error', (error: NodeJS.ErrnoException) => {
      clearTimeout(timer);
      reject(error.code === 'ENOENT' ? new ClaudeCodeMissing('Claude Code is not installed, or is not on the PATH') : error);
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      // A missing command shows up differently when run through a shell.
      if (code === 127 || /not recognized as an internal or external command|command not found/i.test(stderr)) {
        reject(new ClaudeCodeMissing('Claude Code is not installed, or is not on the PATH'));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch {
        reject(new Error(`Claude Code exited with code ${code}: ${(stderr || stdout).trim().slice(0, 300) || 'no output'}`));
      }
    });
    child.stdin.on('error', () => {
      /* the process went away before reading; `close` reports why */
    });
    child.stdin.end(prompt);
  });
}

export function claudeCodeBrain(options: ClaudeCodeOptions = {}): Brain {
  const chosen = options.command ?? process.env.SC45_CLAUDE_COMMAND;
  const model = options.model ?? process.env.SC45_BRAIN_MODEL ?? 'haiku';
  const timeoutMs = options.timeoutMs ?? 90_000;
  const briefFile = options.briefFile ?? BRIEF_FILE;

  return async (request, snapshot, context) => {
    if (!fs.existsSync(briefFile)) throw new Error(`The Chief of Staff's brief is missing: ${briefFile}`);
    const prompt = `${describeOffice(snapshot)}${describeContext(context)}\n\nRequest from Stephen:\n${request}`;
    const args = [
      '-p',
      '--output-format', 'json',
      '--tools', '', // no tools at all: it cannot run commands or touch files
      '--strict-mcp-config', // and no MCP servers from this machine's settings
      '--max-turns', '2',
      '--no-session-persistence',
      '--model', model,
      '--system-prompt-file', briefFile, // company/chief-of-staff.md: edit it to change how she plans
    ];
    // A command named in the settings is used as given. Otherwise try the PATH, then the usual places.
    const commands = chosen ? [chosen] : ['claude', ...usualLocations()];
    let answer: { result?: string; is_error?: boolean } | undefined;
    for (const [index, command] of commands.entries()) {
      try {
        answer = await runClaudeCode(command, args, prompt, timeoutMs);
        break;
      } catch (error) {
        if (!(error instanceof ClaudeCodeMissing) || index === commands.length - 1) throw error;
      }
    }
    if (!answer) throw new ClaudeCodeMissing('Claude Code is not installed, or is not on the PATH');
    if (answer.is_error || typeof answer.result !== 'string') throw new Error(`Claude Code reported an error: ${String(answer.result ?? 'no result').slice(0, 300)}`);
    return { plan: extractJson(answer.result), brain: 'claude-code' };
  };
}

/** Claude Code when it is installed; the built-in planner, with a note saying why, when it is not. */
export function autoBrain(options: ClaudeCodeOptions = {}): Brain {
  const claude = claudeCodeBrain(options);
  return async (request, snapshot, context) => {
    // Looked for on every request (it fails at once when missing), so installing Claude Code
    // takes effect without restarting the server.
    try {
      return await claude(request, snapshot, context);
    } catch (error) {
      if (!(error instanceof ClaudeCodeMissing)) throw error;
    }
    return { ...(await builtInBrain(request, snapshot)), note: 'Claude Code was not found on this machine, so the built-in planner answered.' };
  };
}

export function brainFromEnvironment(): Brain {
  const choice = (process.env.SC45_BRAIN ?? 'auto').toLowerCase();
  if (choice === 'built-in' || choice === 'builtin' || choice === 'mock') return builtInBrain;
  if (choice === 'claude-code' || choice === 'claude') return claudeCodeBrain();
  return autoBrain();
}
