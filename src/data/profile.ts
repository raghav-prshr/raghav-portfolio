import type { ContactInfo, PlayerProfile, SiteConfig } from "../types";

export const site: SiteConfig = {
  title: "RAGHAV.EXE // Developer Portfolio",
  handle: "RAGHAV.EXE",
  eyebrow: "JAVA • BACKEND • SYSTEMS",
  tagline: "Computer science student. Building useful software, one mission at a time.",
  bootLines: [
    "INITIALISING RAGHAV.EXE",
    "LOADING PLAYER PROFILE",
    "EQUIPPING INVENTORY",
    "UNLOCKING MISSIONS",
    "MOUNTING LOCAL TERMINAL",
    "READY",
  ],
};

export const player: PlayerProfile = {
  name: "Raghav Parashar",
  title: "B.Tech CSE Student · Backend Engineering Focus",
  bio: [
    "I am a Computer Science and Engineering student building my foundations in software development, with a particular focus on Java and backend engineering.",
    "I am learning to design APIs, work with databases, strengthen my DSA skills, and build projects that solve concrete engineering problems. My current projects span Java developer tooling and machine-learning-based security work.",
  ],
  facts: [
    { label: "Education", value: "B.Tech · Computer Science and Engineering" },
    { label: "Institution", value: "Manav Rachna International Institute Of Research & Studies" },
    { label: "Focus", value: "Java · C++ · Backend · Databases · DSA · Competitive Programming" },
    { label: "Current goal", value: "Prepare for software engineering internships" },
  ],
};

export const contact: ContactInfo = {
  email: "praghav1106@gmail.com",
  message: "Have a project, idea, or engineering opportunity? Connect with me through my public profiles.",
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/raghav-prshr", handle: "@raghav-prshr" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/raghav-prshr", handle: "@raghav-parashar" },
  ],
};
