import type { InventoryCategory } from "../types";

/** Skill descriptions reflect current learning/work, not invented proficiency scores. */
export const inventory: InventoryCategory[] = [
  {
    id: "languages", label: "Programming", accent: "green",
    skills: [
      { name: "Java", glyph: "Jv", note: "Primary learning focus" },
      { name: "Python", glyph: "Py", note: "Used in ML projects" },
      { name: "C++", glyph: "C+", note: "DSA practice" },
      { name: "JavaScript", glyph: "JS", note: "Web fundamentals" },
      { name: "TypeScript", glyph: "TS", note: "Used in this portfolio" },
    ], emptySlots: 2,
  },
  {
    id: "backend", label: "Backend & Data", accent: "cyan",
    skills: [
      { name: "Spring Boot", glyph: "SB", note: "Learning" },
      { name: "REST APIs", glyph: "API", note: "Backend learning focus" },
      { name: "SQL", glyph: "SQL", note: "Database fundamentals" },
      { name: "PostgreSQL", glyph: "PG", note: "Planned project stack / learning" },
    ], emptySlots: 3,
  },
  {
    id: "tooling", label: "Developer Tools", accent: "green",
    skills: [
      { name: "Git", glyph: "Gt", note: "Version control" },
      { name: "GitHub", glyph: "GH", note: "Repositories and collaboration" },
      { name: "Linux", glyph: "Lx", note: "Fedora development environment" },
      { name: "Vite", glyph: "Vi", note: "Used for this portfolio" },
      { name: "React", glyph: "Re", note: "Used for this portfolio" },
    ], emptySlots: 2,
  },
  {
    id: "ml-security", label: "Machine Learning & Security", accent: "cyan",
    skills: [
      { name: "pandas", glyph: "pd", note: "Data preparation and EDA" },
      { name: "scikit-learn", glyph: "sk", note: "ML coursework/projects" },
      { name: "Random Forest", glyph: "RF", note: "Used in project work" },
      { name: "XGBoost", glyph: "XG", note: "Explored for IDS research" },
    ], emptySlots: 3,
  },
];
