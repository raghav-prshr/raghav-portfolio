# Raghav Parashar — Interactive Developer Portfolio

An interactive, game-inspired developer portfolio built to showcase my projects, technical skills, current development work, and contact information through a distinctive, mission-based interface.

## Overview

Rather than a conventional static portfolio, this project uses a dark, game-inspired interface with terminal-style interactions, HUD elements, and mission-oriented sections to present my developer profile.

## Features

- **Interactive landing screen** — A game-inspired introduction and navigation experience.
- **Player profile** — An overview of my background and developer identity.
- **Skills and inventory** — A structured presentation of technical skills.
- **Project missions** — Project descriptions, development status, and repository links where available.
- **Current mission** — A dedicated section for ongoing development work.
- **Interactive terminal** — A terminal-style interface for exploring supported commands.
- **Contact section** — Quick access to contact channels and relevant links.
- **Responsive interface** — Designed for an interactive browsing experience across supported screen sizes.

## Tech Stack

- React
- TypeScript
- Vite
- Framer Motion
- CSS

## Projects Featured

The portfolio includes selected projects such as:

- **CodeAtlas** — A Java codebase intelligence project in development.
- **ImpactLens** — A Java-based CLI and reusable core library in development.
- **Anomaly-Based Intrusion Detection System** — Completed project, currently in the research-paper phase.
- **Credit Card Fraud Detection** — A machine-learning project focused on identifying fraudulent transactions.

Project status and repository links are maintained in the portfolio's project data.

## Getting Started

### Prerequisites

Install a current Node.js version compatible with the Vite version specified in `package.json`, along with npm.

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build the production site |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Production Build

Create a production build:

```bash
npm run build
```

Vite generates the production-ready website in the `dist/` directory.

## Deployment

This project can be deployed to platforms that support Vite static sites, including Vercel and Netlify.

Typical configuration:

- **Build command:** `npm run build`
- **Output directory:** `dist`

The exact deployment configuration may depend on the hosting platform and any routing requirements.

## Project Structure

```text
raghav-portfolio/
├── public/          # Public static assets
├── scripts/         # Project utility scripts, if retained
├── src/
│   ├── assets/      # Imported assets
│   ├── components/  # Shared UI components
│   ├── data/        # Portfolio and project data
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utilities and helpers
│   ├── sections/    # Portfolio sections
│   ├── styles/      # Stylesheets
│   ├── App.tsx      # Main application
│   └── main.tsx     # Application entry point
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Author

**Raghav Parashar**

- GitHub: https://github.com/raghav-prshr

Additional professional links can be added to the portfolio's contact section.

## License

This project is distributed under the MIT License. See the `LICENSE` file for details, subject to the rights and licenses applicable to third-party components and assets.
