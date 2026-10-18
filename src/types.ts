export type Accent = "green" | "cyan";

/** Global site copy + boot sequence. */
export interface SiteConfig {
  /** Browser tab title. */
  title: string;
  /** Big landing title. Split on the first "." to colour the extension. */
  handle: string;
  /** Small line above the title. */
  eyebrow: string;
  /** Line under the title. */
  tagline: string;
  /** Lines printed during the boot animation. */
  bootLines: string[];
}

export interface Fact {
  label: string;
  value: string;
}

export interface PlayerProfile {
  name: string;
  title: string;
  /** One string per paragraph. */
  bio: string[];
  facts: Fact[];
}

export interface Skill {
  name: string;
  /** 1–3 characters shown on the inventory slot, e.g. "TS". */
  glyph: string;
  note?: string;
  /** Optional self-rating, 1–5. Leave undefined to hide it. */
  level?: 1 | 2 | 3 | 4 | 5;
}

export interface InventoryCategory {
  id: string;
  label: string;
  accent: Accent;
  skills: Skill[];
  /** Extra empty slots rendered after the skills. */
  emptySlots: number;
}

export interface ProjectLink {
  label: string;
  /** Leave "" until the link exists; the UI shows it as locked. */
  href: string;
}

export interface Project {
  id: string;
  codename: string;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  status: string;
  links: ProjectLink[];
  accent: Accent;
}

export interface MissionTask {
  label: string;
  done: boolean;
}

export interface CurrentMission {
  title: string;
  objective: string;
  status: string;
  tasks: MissionTask[];
  /** 0–100. Leave undefined to hide the progress bar. */
  progress?: number;
}

export interface SocialLink {
  id: string;
  label: string;
  /** Leave "" until you have the URL. */
  href: string;
  handle: string;
}

export interface ContactInfo {
  /** Leave "" until set. */
  email: string;
  message: string;
  socials: SocialLink[];
}

/** One entry per scroll section; drives the nav, the main menu and the terminal. */
export interface SectionDef {
  id: string;
  number: string;
  label: string;
  menuLabel: string;
  hint: string;
}
