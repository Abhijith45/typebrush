<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` - verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# TypeBrush - AI Agent Guidelines & Architecture Rules

This document outlines core principles, project standards, and codebase rules for any AI agent or automated developer working on **TypeBrush**.

---

## 1. Project Overview & Build Constraints
- **Target Domain**: [https://typebrush.netlify.app](https://typebrush.netlify.app)
- **Deployment Mode**: **Static HTML Export** (`output: 'export'` in [`next.config.mjs`](file:///c:/Users/Abhijeet%20Rawat/Desktop/typebrush/next.config.mjs)).
- **CRITICAL**: Because the project is exported statically to `out/`, dynamic server-side runtime APIs (such as `next/headers`, `cookies()`, SSR API routes with dynamic request parameters, or unconfigured dynamic route metadata) **cannot be used**.
- Any metadata route handlers (e.g., [`src/app/manifest.js`](file:///c:/Users/Abhijeet%20Rawat/Desktop/typebrush/src/app/manifest.js) or [`src/app/sitemap.js`](file:///c:/Users/Abhijeet%20Rawat/Desktop/typebrush/src/app/sitemap.js)) **MUST** specify `export const dynamic = "force-static";`.

---

## 2. Tech Stack Conventions
- **Framework**: Next.js 15.3 (App Router)
- **UI Library**: React 19 + Material UI (MUI v6) + Emotion
- **Styling Architecture**:
  - Global CSS variables and utility classes are declared in [`src/app/globals.css`](file:///c:/Users/Abhijeet%20Rawat/Desktop/typebrush/src/app/globals.css).
  - Component styling should use MUI's styled API or sx props via the unified theme in `src/theme/`.
  - Avoid adding arbitrary modular CSS files unless isolated to a single component.
- **Client Components**: Any component utilizing hooks (`useState`, `useEffect`, `useCallback`), DOM event listeners, or browser APIs (IndexedDB, LocalStorage, `window`, `navigator`) must have the `"use client";` directive at the top.

---

## 3. Storage & State Management
TypeBrush operates client-side with **zero mandatory authentication**:
1. **IndexedDB (`src/lib/storage/indexedDbService.js`)**:
   - Primary high-volume store: `typebrush-db` (Stores: `practice_history`, `gym_progress`).
   - Use for storing historical test scorecards, detailed keystroke metrics, and drill level unlocks.
2. **LocalStorage & Storage Wrapper (`src/lib/storage/storageService.js`)**:
   - Used for quick preferences (current theme, audio feedback settings, test timer presets).
   - Always access storage via the abstraction layer to ensure graceful fallback when private browsing or storage quota restrictions occur.

---

## 4. Keystroke & Typing Math Rules
When updating or introducing typing tests or drill routines in `src/lib/typing/` or `src/hooks/`:
- **Standard Word Definition**: 1 Word = 5 physical key presses (including spaces).
- **Gross WPM**: `(Total Keystrokes / 5) / (Elapsed Time in Minutes)`.
- **Net WPM**: `((Total Keystrokes - Uncorrected Errors) / 5) / (Elapsed Time in Minutes)`.
- **Net Accuracy**: `(Correct Characters Typed / Total Characters Typed) * 100`.
- Do not alter mathematical calculation formulas without explicit confirmation, as this impacts historical consistency and user scorecards.

---

## 5. File Organization Standards
Follow the established directory structure:
- `src/app/`: App router page endpoints, route error boundaries (`error.js`), layouts, and SEO files.
- `src/components/common/`: Generic UI elements (buttons, modals, tooltips).
- `src/components/typing/`: Core typing engines, caret handlers, and character stream displays.
- `src/components/gym/`: Typing gym curriculum, drill levels, and progression trees.
- `src/components/scorecard/`: Results display, analytics charts, PDF and social sharing cards.
- `src/lib/`: Pure calculation logic, storage managers, and data transformers (keep free of React hooks).

---

## 6. Pre-Commit / Pre-PR Verification
Before marking any task as complete or opening a pull request:
1. Run `npm run lint` and ensure there are 0 ESLint errors.
2. Run `npm run build` to verify that Next.js static page generation and export (`out/`) compiles without errors.
