# Raghav Parashar — Interactive Developer Portfolio

An interactive, game-inspired developer portfolio built with React, TypeScript, and Vite. The portfolio presents my developer profile, technical skills, projects, current development work, and contact information through a mission-based interface inspired by video game HUDs and terminals.

## Overview

Instead of a conventional static portfolio, this project uses a dark, game-inspired interface to make exploring my work more engaging. It combines a player profile, project missions, a simulated terminal, and contact information in one responsive website.

## Features

- **Interactive landing screen** — Game-inspired introduction and navigation.
- **Player profile** — Background, education, interests, and engineering goals.
- **Skills inventory** — Organized presentation of technical skills.
- **Project missions** — Project summaries, development status, and repository links where available.
- **Current mission** — A dedicated view of ongoing development work.
- **Simulated terminal** — Explore supported portfolio commands through a terminal-style interface.
- **Contact section** — Access my public profiles and contact information.
- **Resume configuration** — Supports linking to a locally hosted PDF or an external resume URL.
- **Responsive interface** — Designed for use across desktop and mobile screen sizes.
- **Motion and transitions** — Animations powered by Framer Motion.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Type-safe application development |
| Vite | Development server and production build |
| Framer Motion | Animations and transitions |
| CSS | Layout, styling, and responsive design |
| ESLint | Code-quality checks |

## Featured Projects

### CodeAtlas
A Java codebase intelligence platform in development, focused on understanding Java projects and their dependencies.

### ImpactLens
A Java-based command-line tool and reusable core library in development.

### Anomaly-Based Intrusion Detection System
A machine-learning-based intrusion detection project. The project is completed and currently in the research-paper phase.

### Credit Card Fraud Detection
A machine-learning project focused on identifying potentially fraudulent credit-card transactions.

Project descriptions, statuses, and available repository links are maintained in the portfolio's source code.

## Getting Started

### Prerequisites

- Node.js compatible with the Vite version specified in `package.json`
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/raghav-prshr/raghav-portfolio.git
cd raghav-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint checks |
| `npm run build` | Type-check and build the production site |
| `npm run preview` | Preview the production build locally |

### Production Build

Run:

```bash
npm run lint
npm run build
```

Vite generates the production-ready website in the `dist/` directory.

## Resume Setup

To serve a PDF resume from this website:

1. Place the PDF at `public/resume.pdf`.
2. Open `src/data/resume.ts`.
3. Configure the resume URL:

```ts
export const resume: ResumeConfig = {
  label: "Resume",
  href: "/resume.pdf",
};
```

4. Rebuild the website and verify that the resume link opens the PDF.

Alternatively, configure `href` with a valid external HTTPS URL. The resume action remains hidden when the URL is empty.

**Privacy note:** Only publish a resume you are comfortable sharing publicly. Review it for personal information you do not want exposed.

## Deployment

This project can be deployed to a static hosting platform such as [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

Typical build settings:

- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

Connect the GitHub repository to your chosen hosting platform. The platform can then build and deploy the site when changes are pushed to the configured branch.

## Project Structure

```text
raghav-portfolio/
├── public/          # Public static assets, including the resume PDF
├── src/
│   ├── assets/      # Application assets
│   ├── components/  # Shared UI components
│   ├── data/        # Profile, projects, skills, mission, and resume data
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions and helpers
│   ├── sections/    # Portfolio sections
│   ├── styles/      # Stylesheets
│   ├── App.tsx      # Main application component
│   └── main.tsx     # Application entry point
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Customization

Portfolio content is maintained in the `src/data/` directory. Update the relevant data files when changing profile information, skills, project descriptions, mission details, contact links, or resume configuration.

Keep project statuses accurate, remove unused example values, and verify external URLs before publishing changes.

## Author

**Raghav Parashar**

- GitHub: [@raghav-prshr](https://github.com/raghav-prshr)
- LinkedIn: [raghav-prshr](https://www.linkedin.com/in/raghav-prshr)
- Email: [Contact me](mailto:praghav1106@gmail.com)

## License

This project is distributed under the MIT License. See the [`LICENSE`](LICENSE) file for details.

---

Built with React, TypeScript, and a mission-driven approach to portfolio design.
