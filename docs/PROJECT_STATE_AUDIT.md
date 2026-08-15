# TypeBrush — Project State Audit

This document presents a comprehensive audit of the TypeBrush codebase, detailing its component inventory, engines, storage architecture, SEO setup, and readiness for future scaling.

---

## 1. Application Inventory (Phase 1)

### Pages & Routes
TypeBrush is a Next.js App Router application compiling into a static export (`output: 'export'`).
- `/` ([page.js](file:///c:/Users/Abhijeet%20Rawat/Desktop/typebrush/src/app/page.js)): Landing page with SEO copywriting, features list, quick test cards, and FAQ section.
- `/typing-test` ([page.js](file:///c:/Users/Abhijeet%20Rawat/Desktop/typebrush/src/app/typing-test/page.js)): Main typing test client workspace.
- `/typing-test/[duration]` (e.g. `1-minute`, `2-minute`, `5-minute`, `10-minute`, `number`): Parameterized sub-routes for targeted SEO landing pages containing specific test durations and passage generators.
- `/typing-gym` ([page.js](file:///c:/Users/Abhijeet%20Rawat/Desktop/typebrush/src/app/typing-gym/page.js)): Unified curriculum-based Guided Training (finger positions, target WPM goals, level unlocks) and Personalized Training (weak key diagnosis drills).
- `/typing-practice` ([page.js](file:///c:/Users/Abhijeet%20Rawat/Desktop/typebrush/src/app/typing-practice/page.js)): Directory of available paragraph and passage workouts.
- `/typing-practice/english-paragraph`: Workout runner specialized in typing single-sentence character paragraphs.
- `/typing-practice/english-passage`: Long-form passage exercises focusing on stamina and numeric characters.
- `/about`, `/privacy`, `/terms`: Legal, policy, and brand meta pages.

### Components
- **`gym/`**:
  - `GymWorkspace.js`: Core controller managing state machine for Guided vs Personalized training, selected levels, and target recommendations.
  - `GymTrainer.js`: Exercise renderer capturing QWERTY inputs and giving visual keyboard character hints.
  - `InteractiveKeyboard.js`: Interactive SVG-based visual keyboard mapping keys to fingers with on-hover descriptions and selective key practices.
  - `PersonalizedProfileCard.js`: Dead component previously displaying localStorage goals and metrics (de-registered in GymWorkspace).
- **`layout/`**:
  - `Header.js`, `Footer.js`, `BottomNav.js`: Global site shells styled with clean CSS, including same-route smooth scroll-to-top overrides.
  - `ThemeToggle.js`: Standard HSL Hues dark/light toggle persisting selection to `storageService`.
- **`scorecard/`**:
  - `ScorecardDialog.js`: Captures student/candidate names and renders print-ready, high-fidelity PDF typing scorecards.
- **`sharing/`**:
  - `ShareDialog.js`: Modular sharing drawer for desktop viewports (WhatsApp, Twitter/X, Facebook, copy link/summary options).
- **`typing/`**:
  - `TypingTest.js`: Core typing run loop orchestrating test duration timers, keystroke counts, error states, and passage word wraps.
  - `TypingResult.js`: Grid displaying raw/net accuracy, error details, motivational metrics, PDF prints, and share sheets.
  - `TypingInput.js`, `TypingPassage.js`, `TypingStats.js`, `TypingTimer.js`, `RestartButton.js`: Subcomponents for the standard test loop.

### Hooks & Utilities
All state is managed client-side using standard React hooks (`useState`, `useEffect`, `useMemo`, `useRef`). There are no heavy external state libraries (e.g. Redux, Zustand) or server-bound REST integrations.
- **`lib/typing/`**:
  - `calculateWpm.js`: $\text{WPM} = (\text{Correct Characters} \div 5) \div \text{Time in Minutes}$.
  - `calculateAccuracy.js`: $\text{Net Accuracy} = (\text{Final Correct Characters} \div \text{Total Characters Typed}) \times 100$.
  - `calculateErrors.js`: Simple array filters identifying incorrect index coordinates.
- **`lib/storage/`**:
  - `indexedDbService.js`: Transaction-based Promise wrappers around browser IndexedDB database (`TypeBrushDB` v1).
  - `localStorageService.js`: Safe window check helper around browser `localStorage`.
  - `storageService.js`: Master coordinator supporting silent LocalStorage fallbacks in private browsing tabs and executing safe LocalStorage-to-IndexedDB migrations.
- **`lib/gym/`**:
  - `analysisEngine.js`: Parses typing history logs to diagnose character error frequencies and identify "weak keys" (keys with accuracy $< 92\%$).
  - `recommendationEngine.js`: Selects tailored word exercises based on weak keys identified in `analysisEngine`.
- **`lib/scorecard/`**:
  - `generateScorecard.js`: Generates a PDF blob using standard print stylesheets.

---

## 2. Typing Engine Audit (Phase 2)

### Evaluation Logic
- **Execution Loop**: Typing runs are triggered by focusing a hidden text input field and capturing keystrokes via `onChange` events. Real-time characters are compared against the target passage array using character index counters.
- **WPM Calculation**: Calculated strictly using standard 5-character words.
- **Accuracy Calculations**:
  - **Net Accuracy (Primary)**: Shows accuracy of final output after corrected backspaces.
  - **Raw Accuracy (Secondary)**: Shows overall keyboard precision (incorporates backspaced errors).
- **Error Tracking**: Tracks final error indexes alongside raw character coordinates.
- **Weak-Key Mapping**: Logs key-level opportunities (attempts) vs mistakes in a nested hash map (`keyStats`). If a key is typed with an error rate higher than $8\%$, it is flagged as a "weak key".

### Performance Analysis
- **Strengths**: Lightweight (no layout shifts), offline-capable, responsive QWERTY key highlighting, accurate backspace/correction handling.
- **Weaknesses**: Keyboard layout is fixed to standard US QWERTY; does not support alternative layouts like Dvorak, Colemak, or localized layouts (Hindi, Mangal, Inscript) yet.
- **Missing Metrics**: Lack of keystroke latency tracking (flight time, dwell time) to detect hesitations.
- **Opportunities**: Implement standard Indian Competitive Exam layouts (Mangal, Kruti Dev) to capture the civil services test market.

---

## 3. Gym Audit (Phase 3)

### Structure & Progression
- **Exercise Types**: Finger placement exercises, weak-key recovery lines, accuracy builder passages, speed training lines, and numeric rows.
- **Progression**: Guided curriculum features 5 structured levels per program. Completing a level unlocks the next level. Progress is saved asynchronously to IndexedDB.
- **Weak-Key Recovery**: Pulls mistake pairs and character statistics from the typing test results database and dynamically spawns targeted drills (e.g. `O, P, & R Key Workout`) to retrain muscle memory.
- **Broken/Incomplete Flows**:
  - **Dvorak/Colemak Gym**: The visual keyboard and finger maps are hardcoded to QWERTY, preventing alternative layouts from using visual guidance.
  - **Custom Passage Gym**: Users cannot copy/paste their own paragraphs into the gym to drill custom scripts.

---

## 4. Storage Audit (Phase 4)

### Keys & Stores Map
- **LocalStorage Preferences**:
  - `theme`: `"light"` | `"dark"`
  - `typebrush:typing-goals:v1`: `{ targetWpm, targetAccuracy }`
  - `typebrush:last-timer:v1`: `number`
  - `typebrush:last-mode:v1`: `string`
- **IndexedDB Stores (`TypeBrushDB` version 1)**:
  - `typing_results` (KeyPath: `id`): Stores last 50 standard typing test results.
  - `gym_sessions` (KeyPath: `id`): Stores last 100 gym workouts.
  - `progress_tracking` (KeyPath: `programId`): Stores level unlock progression maps.

### Migration & Fallback
- **Legacy Migration**: Checked on mount. Parses old stringified arrays (`typebrush:typing-history:v1`, etc.), converts them into database records, writes them to IndexedDB, and deletes old LocalStorage keys.
- **Quota Fallback**: If browser IndexedDB fails to initialize (private tabs), `storageService` dynamically redirects reads and writes to LocalStorage backup keys (`typebrush:backup:*`), avoiding application failures.

---

## 5. Result Engine Audit (Phase 5)

### Metrics & Classifications
- **Primary Grid**: WPM, Net Accuracy, Raw Accuracy, Time Elapsed.
- **Detailed Stats**: Keystrokes, Mistakes Made, Corrected Errors, Uncorrected Errors, Words Typed.
- **Classification Rating**:
  - $< 20$ WPM: Beginner
  - $20 - 40$ WPM: Intermediate
  - $40 - 60$ WPM: Advanced
  - $60 - 80$ WPM: Professional
  - $80+$ WPM: Expert
- **Insights**: Tells the user to slow down if accuracy is low ($< 90\%$), or to focus on speed if accuracy is high ($\ge 97\%$).
- **Gaps Identified**: WPM trends are not visualized as a line chart over the last 10 tests. Users can view individual scores but cannot see a visual regression/progression timeline.

---

## 6. SEO Audit (Phase 6)

### Optimization Status
- **HTML tags**: The landing page (`page.js`) and footer (`Footer.js`) are fully refactored to standard HTML elements (`h1`, `p`, `section`), bypassing Emotion style hydration conflicts and ensuring search bots index layout content on the first crawl.
- **Metadata**: All pages configure static canonical links (`https://typebrush.in/...`), OpenGraph objects, descriptive titles, and structured JSON-LD (WebSite and FAQPage schemas).
- **Robots & Sitemap**: Statically exported via Next.js `sitemap.js` and `robots.js`.
- **Quick Wins**: Add `coding-typing-test` and `hindi-typing-test` routes with basic passages to capture niche developer and competitive government exam search volume.

---

## 7. Architecture Readiness (Phase 7)

- **V1.5 Readiness (Ready)**: Current storage coordinator, IndexedDB stores, async React loaders, and responsive layouts are hardened and stable.
- **V2 Cloud Authentication (Refactoring Required)**:
  - Transitioning client states (`getHistory()`, `getGymProgress()`) to sync with a Supabase PostgreSQL backend will require wrapping database calls in auth checks.
  - Current storage service is already built with Promise interfaces, allowing a cloud sync service to hook directly into writes.
- **V3 AI Coaching (Scalable)**:
  - The local `analysisEngine` runs key-mistake diagnostics that can be passed directly to local WebLLM script scripts or backend prompts.
- **V4 Institutions (Rebuild Required)**:
  - Admin dashboards, teacher views, class challenges, and multiplayer rooms will require real-time WebSockets (e.g. Supabase Realtime or Socket.io) and complete page state synchronization.
