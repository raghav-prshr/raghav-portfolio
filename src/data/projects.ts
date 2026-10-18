
import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "codeatlas",
    codename: "MISSION 01",
    title: "CodeAtlas",
    category: "Developer tooling",
    summary:
      "A Java codebase intelligence tool planned to inspect source code, map dependencies, and help developers understand the impact of code changes.",
    stack: ["Java", "JavaParser", "Spring Boot", "PostgreSQL"],
    status: "In development",
    links: [],
    accent: "green",
  },
  {
    id: "impactlens",
    codename: "MISSION 02",
    title: "ImpactLens",
    category: "Java CLI / developer tooling",
    summary:
      "A standalone Java CLI and reusable core library planned for code impact analysis, dependency analysis, and Git-aware workflows.",
    stack: ["Java", "CLI", "Git"],
    status: "In development",
    links: [],
    accent: "cyan",
  },
  {
    id: "ids",
    codename: "MISSION 03",
    title: "Anomaly-Based Intrusion Detection System",
    category: "Cybersecurity · Machine learning",
    summary:
      "A machine-learning project for network intrusion detection. The implementation and research are progressing toward an academic research paper.",
    stack: [
      "Python",
      "pandas",
      "scikit-learn",
      "Random Forest",
      "XGBoost",
      "CIC-IDS2018",
    ],
    status: "Project completed · Research paper phase",
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/raghav-prshr/IDS_Project",
      },
    ],
    accent: "green",
  },
  {
    id: "fraud",
    codename: "MISSION 04",
    title: "Credit Card Fraud Detection",
    category: "Machine learning",
    summary:
      "A completed machine-learning project focused on detecting fraudulent transactions in a highly imbalanced dataset.",
    stack: [
      "Python",
      "pandas",
      "scikit-learn",
      "imbalanced-learn",
    ],
    status: "Completed",
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/raghav-prshr/CodSoft",
      },
    ],
    accent: "cyan",
  },
];
