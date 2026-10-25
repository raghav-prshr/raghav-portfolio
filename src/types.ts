export type Accent = "green" | "cyan";
export interface SiteConfig {
  title: string;
  handle: string;
  eyebrow: string;
  tagline: string;
  bootLines: string[];
}

export interface Fact {
  label: string;
  value: string;
}

export interface PlayerProfile {
  name: string;
  title: string;
  bio: string[];
  facts: Fact[];
}

export interface Skill {
  name: string;
 
  glyph: string;
  note?: string;

  level?: 1 | 2 | 3 | 4 | 5;
}

export interface InventoryCategory {
  id: string;
  label: string;
  accent: Accent;
  skills: Skill[];
 
  emptySlots: number;
}

export interface ProjectLink {
  label: string;

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
  
  progress?: number;
}

export interface SocialLink {
  id: string;
  label: string;

  href: string;
  handle: string;
}

export interface ContactInfo {

  email: string;
  message: string;
  socials: SocialLink[];
}
export interface SectionDef {
  id: string;
  number: string;
  label: string;
  menuLabel: string;
  hint: string;
}
