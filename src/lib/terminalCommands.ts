import { currentMission, missionProjectId } from "../data/mission";
import { contact, player, site } from "../data/profile";
import { projects } from "../data/projects";
import { inventory } from "../data/skills";
import { getContactChannels } from "./contactChannels";
import { displayUrl, externalUrl } from "./safeLinks";
import { firstText } from "./text";

export type LineTone = "out" | "muted" | "accent" | "error" | "input";

export interface TerminalLine {
  tone: LineTone;
  text: string;
  href?: string;
  hrefLabel?: string;
}

export type ExecuteResult = { type: "clear" } | { type: "output"; lines: TerminalLine[] };

interface Command {
  description: string;
  clears?: boolean;
  run: () => TerminalLine[];
}

const out = (text = ""): TerminalLine => ({ tone: "out", text });
const muted = (text: string): TerminalLine => ({ tone: "muted", text });
const accent = (text: string): TerminalLine => ({ tone: "accent", text });
const link = (text: string, href: string, hrefLabel: string): TerminalLine => ({ tone: "out", text, href, hrefLabel });

/* ───────── commands ───────── */

function help(): TerminalLine[] {
  const lines: TerminalLine[] = [accent("Available commands")];
  for (const [name, command] of COMMANDS) {
    lines.push(out(`  ${name.padEnd(10)}${command.description}`));
  }
  lines.push(
    blank(),
    muted("Tab completes a command · ↑/↓ browse history."),
    muted("Simulated terminal: it only reads portfolio data and never runs real shell commands."),
  );
  return lines;
}

function whoami(): TerminalLine[] {
  const lines: TerminalLine[] = [accent(`${player.name} — ${player.title}`)];
  const bio = player.bio.map((p) => firstText(p)).filter((p): p is string => p !== undefined);
  if (bio.length > 0) bio.forEach((p) => lines.push(out(p)));
  else lines.push(muted("Bio not written yet."));

  const facts = player.facts.filter((f) => firstText(f.value) !== undefined);
  if (facts.length > 0) {
    lines.push(blank());
    facts.forEach((f) => lines.push(out(`  ${f.label}: ${f.value}`)));
  }
  return lines;
}

function skills(): TerminalLine[] {
  const filled = inventory.filter((category) => category.skills.length > 0);
  if (filled.length === 0) return [muted("No skills equipped yet.")];
  const lines: TerminalLine[] = [];
  filled.forEach((category, i) => {
    if (i > 0) lines.push(blank());
    lines.push(accent(category.label), out(`  ${category.skills.map((s) => s.name).join(", ")}`));
  });
  return lines;
}

function projectList(): TerminalLine[] {
  if (projects.length === 0) return [muted("No missions logged yet.")];
  const lines: TerminalLine[] = [muted(`${projects.length} missions logged. Open a card in the Missions section for the full briefing.`)];
  for (const p of projects) {
    lines.push(blank(), accent(`${p.codename} // ${p.title}`));
    const category = firstText(p.category);
    const status = firstText(p.status);
    const summary = firstText(p.summary);
    if (category) lines.push(out(`  category: ${category}`));
    if (status) lines.push(out(`  status:   ${status}`));
    if (summary) lines.push(out(`  summary:  ${summary}`));
    if (p.stack.length > 0) lines.push(out(`  stack:    ${p.stack.join(", ")}`));
    for (const l of p.links) {
      const href = externalUrl(l.href);
      if (href) lines.push(link(`  ${l.label}: `, href, displayUrl(href)));
    }
  }
  return lines;
}

function focus(): TerminalLine[] {
  const focusFact = player.facts.find((f) => f.label.toLowerCase() === "focus");
  const areas = firstText(focusFact?.value);
  const project = projects.find((p) => p.id === missionProjectId);
  const status = firstText(currentMission.status, project?.status);
  const purpose = firstText(currentMission.objective, project?.summary);
  const real = currentMission.tasks.filter((t) => firstText(t.label) !== undefined);
  const done = real.filter((t) => t.done).length;

  const lines: TerminalLine[] = [accent("Focus")];
  lines.push(areas ? out(`  areas:           ${areas}`) : muted("  areas:           not set yet"));
  lines.push(out(`  current mission: ${currentMission.title}`));
  if (status) lines.push(out(`  status:          ${status}`));
  if (purpose) lines.push(out(`  purpose:         ${purpose}`));
  if (real.length > 0) lines.push(out(`  tasks:           ${done} done · ${real.length - done} planned`));
  return lines;
}

function github(): TerminalLine[] {
  const profile = externalUrl(contact.socials.find((s) => s.id === "github")?.href);
  const lines: TerminalLine[] = [accent("GitHub")];
  lines.push(profile ? link("  profile: ", profile, displayUrl(profile)) : muted("  Profile link not configured yet."));

  const repoLabel = /repo|source|github|code/i;
  for (const p of projects) {
    for (const l of p.links) {
      const href = externalUrl(l.href);
      if (href && repoLabel.test(l.label)) lines.push(link(`  ${p.title}: `, href, displayUrl(href)));
    }
  }
  return lines;
}

function contactInfo(): TerminalLine[] {
  const channels = getContactChannels();
  if (channels.length === 0) return [muted("No contact channels are configured yet.")];
  const lines: TerminalLine[] = [accent("Contact channels")];
  const message = firstText(contact.message);
  if (message) lines.push(out(message));
  channels.forEach((c) => lines.push(link(`  ${c.label.padEnd(9)}`, c.href, c.display)));
  return lines;
}

function blank(): TerminalLine {
  return out("");
}

const COMMANDS: ReadonlyMap<string, Command> = new Map<string, Command>([
  ["help", { description: "list available commands", run: help }],
  ["whoami", { description: "who is behind the controller", run: whoami }],
  ["skills", { description: "equipped tools and tech", run: skills }],
  ["projects", { description: "list project missions", run: projectList }],
  ["focus", { description: "current focus and mission", run: focus }],
  ["github", { description: "GitHub profile and repositories", run: github }],
  ["contact", { description: "open contact channels", run: contactInfo }],
  ["clear", { description: "clear the screen", clears: true, run: () => [] }],
]);

export const COMMAND_NAMES: readonly string[] = [...COMMANDS.keys()];

export function bannerLines(): TerminalLine[] {
  return [accent(`${site.handle} terminal`), muted("Type 'help' to list commands.")];
}

/* ───────── helpers ───────── */

function distance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min((prev[j] ?? 0) + 1, (row[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
    }
    prev = row;
  }
  return prev[b.length] ?? 0;
}

function closest(name: string): string | undefined {
  let best: string | undefined;
  let bestDistance = 3; // accept distance <= 2
  for (const candidate of COMMANDS.keys()) {
    const d = distance(name, candidate);
    if (d < bestDistance) {
      best = candidate;
      bestDistance = d;
    }
  }
  return best;
}

export function completeCommand(input: string): string | null {
  const prefix = input.trim().toLowerCase();
  if (!prefix || /\s/.test(prefix)) return null;
  const matches = COMMAND_NAMES.filter((name) => name.startsWith(prefix));
  return matches.length === 1 ? (matches[0] ?? null) : null;
}

export function execute(raw: string): ExecuteResult {
  const name = (raw.trim().split(/\s+/)[0] ?? "").toLowerCase();
  if (!name) return { type: "output", lines: [] };

  const command = COMMANDS.get(name);
  if (!command) {
    const lines: TerminalLine[] = [{ tone: "error", text: `command not found: ${name}` }];
    const suggestion = closest(name);
    lines.push(muted(suggestion ? `Did you mean '${suggestion}'? Type 'help' for all commands.` : "Type 'help' for the list of commands."));
    return { type: "output", lines };
  }
  if (command.clears) return { type: "clear" };
  return { type: "output", lines: command.run() };
}
