# TypeBrush

[![CI Pipeline](https://github.com/Abhijith45/typebrush/actions/workflows/ci.yml/badge.svg)](https://github.com/Abhijith45/typebrush/actions)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![Material UI](https://img.shields.io/badge/MUI-v6-007FFF?logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/License-Private-red)](#)

> **TypeBrush** is a lightweight, privacy-focused, browser-based typing platform engineered for checking typing speed (WPM), accuracy, and deliberate practice. No account or login required.

- **Live URL**: [https://typebrush.netlify.app](https://typebrush.netlify.app)
- **Framework**: Next.js 15 (App Router, Static HTML Export) + React 19 + Material UI v6

---

## Key Features

1. **Timed Typing Speed Tests**
   - 1-minute, 2-minute, 5-minute, 10-minute, and custom duration tests (`/typing-test`, `/typing-speed-test`).
   - Real-time WPM, Net WPM, accuracy %, raw CPM, and keystroke calculation.
   - Live visual feedback (correct letters, typo highlights, backspace penalty indicators).

2. **Typing Gym & Targeted Practice**
   - Progressive muscle memory drills for weak keys, number rows, and punctuation (`/typing-gym`).
   - Real-world English paragraphs and passages practice (`/typing-practice`).
   - Touch typing home-row training guides (`/touch-typing`).

3. **Performance Scorecards & Analytics**
   - Detailed post-test diagnostic breakdown: weak keys, consistency score, and mistake clusters.
   - Shareable graphical scorecards and PDF exports (via `jspdf`).
   - Local-first client storage: session runs and unlock progressions stored in **IndexedDB** (`typebrush-db`) with synchronous **LocalStorage** fallbacks.

4. **WPM Calculator**
   - Interactive calculation tool to determine words per minute, gross vs. net speed, and character error tolerances (`/wpm-calculator`).

5. **Production & SEO Optimization**
   - 100% static HTML export (`output: 'export'`) optimized for edge CDNs (Netlify).
   - Automated XML sitemap, `robots.txt`, and dynamic Web App Manifest (`/manifest.webmanifest`).
   - Accessible dark/light themes with zero-flash client initialization.

---

## Tech Stack & Architecture

- **Core Framework**: [Next.js 15.3](https://nextjs.org/) (App Router, static prerendering)
- **UI & Design System**: [React 19](https://react.dev/), [MUI v6](https://mui.com/), `@emotion/react`, Material Icons
- **State & Local Storage**: IndexedDB (custom `indexedDbService`), LocalStorage wrapper (`storageService`)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **Linting & Quality**: ESLint 9 + `eslint-config-next`
- **CI/CD**: GitHub Actions pipeline for automated lint and export validation

---

## Getting Started

### Prerequisites
- Node.js `20.x` or higher
- npm `10.x` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhijith45/typebrush.git
   cd typebrush
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy the example environment configuration:
   ```bash
   cp .env.example .env.local
   ```
   Configure any optional endpoint keys in `.env.local` (e.g. `NEXT_PUBLIC_FEEDBACK_API_URL`).

4. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Launches local Next.js dev server with Hot Module Replacement |
| **Lint** | `npm run lint` | Runs ESLint 9 across all JS/JSX files |
| **Build** | `npm run build` | Compiles and outputs static production build to `out/` |
| **Start** | `npm run start` | Serves production Next.js build (when not using static export) |

---

## Project Structure

```
typebrush/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions lint & build workflow
├── docs/                          # Architectural & PRD specifications
│   ├── ARCHITECTURE.md            # Storage & diagnostic calculation spec
│   ├── PRD.md                     # Product requirements document
│   └── SEO_GUIDE.md               # Search engine optimization guidelines
├── public/                        # Static public assets (favicons, icons)
│   ├── icon.svg                   # Vector brand logo & PWA icon
│   └── googlec1e082fbdd13ed9c.html# Search console verification
├── src/
│   ├── app/                       # Next.js App Router routes & pages
│   │   ├── layout.js              # Global layout, fonts, and theme wrapper
│   │   ├── page.js                # TypeBrush homepage
│   │   ├── error.js               # Client error boundary
│   │   ├── global-error.js        # Root error fallback
│   │   ├── loading.js             # Route streaming loader
│   │   ├── manifest.js            # PWA web manifest route
│   │   ├── sitemap.js             # Dynamic XML sitemap generator
│   │   ├── robots.js              # Search crawler directives
│   │   ├── typing-test/           # 1m, 2m, 5m, 10m & number tests
│   │   ├── typing-gym/            # Targeted drill programs
│   │   ├── typing-practice/       # Paragraph & passage exercises
│   │   └── wpm-calculator/        # Interactive WPM calculator
│   ├── components/                # Reusable React components
│   │   ├── common/                # Shared buttons, modals, cards
│   │   ├── gym/                   # Drill session & progression components
│   │   ├── layout/                # Header, Footer, Bottom Navigation
│   │   ├── scorecard/             # Result cards, charts, export buttons
│   │   └── typing/                # Main typing test engine & display
│   ├── hooks/                     # Custom hooks (timer, keystroke handler)
│   ├── lib/                       # Pure logic, scoring & storage
│   │   ├── gym/                   # Curriculum engines & unlock logic
│   │   ├── storage/               # IndexedDB and LocalStorage services
│   │   └── typing/                # WPM, Net WPM, accuracy math
│   └── theme/                     # MUI theme providers and palettes
├── .env.example                   # Template environment variables
├── next.config.mjs                # Next.js configuration (static export)
└── package.json                   # Dependencies and scripts
```

---

## Deployment

The application is configured for **Static HTML Export** (`output: 'export'` in [`next.config.mjs`](file:///c:/Users/Abhijeet%20Rawat/Desktop/typebrush/next.config.mjs)), which generates production assets into the `out/` directory.

- Hosted and distributed through **Netlify**.
- Any push to `main` triggers automated CI builds and atomic edge deploys.

---

## Contributing & Development Guidelines

1. Ensure all code passes ESLint: `npm run lint`.
2. Ensure static exports compile cleanly before opening a pull request: `npm run build`.
3. Adhere to the established storage abstraction layer (`src/lib/storage/`) for all client-side persistence.
