# TypeBrush - Application Architecture Specification

This specification documents the frontend, storage, analytics, and styling architecture of TypeBrush.

---

## 1. Storage Architecture

TypeBrush utilizes a unified storage layer combining LocalStorage (for lightweight, synchronous global preferences) and IndexedDB (for high-volume historical and progression data).

### IndexedDB Schema
Managed via `src/lib/storage/indexedDbService.js`:
- **Database Name**: `typebrush-db`
- **Version**: `1`
- **Stores**:
  - `practice_history`: Holds all completed session runs.
    - Key Path: `id` (Auto-incrementing)
    - Indexes: `timestamp`, `testName`, `wpm`
  - `gym_progress`: Stores completed programs and level unlocks.
    - Key Path: `levelKey`
    - Indexes: `programId`, `status`

### Storage Abstraction Wrapper
Implemented in `src/lib/storage/storageService.js`:
- Dispatches state persists to IndexedDB with automatic local storage sync fallbacks if browser indexing permissions are blocked.

---

## 2. Gym Progression & Accuracy Model

- **Curriculum Engine**: Handles typing exercise lock states. Completing Level N with Net Accuracy $\ge 95\%$ automatically dispatches a complete action to IndexedDB to unlock Level N+1.
- **Diagnostics Calculations**:
  - **Raw Accuracy**: Total Correct Keystrokes / Total Physical Input Keystrokes.
  - **Net Accuracy**: Final Correct Output Characters / Final Output Length.
  - **Correction Overhead**: Measures Backspaces hit relative to output volume.

---

## 3. Analytics Tracking Architecture

- **GA4 Hook**: Route switches trigger automatic page view dispatches.
- **Clarity Integration**: Hotjar-style heatmaps log click paths to evaluate dashboard interactions.
- **Performance Thresholds**: Target Largest Contentful Paint (LCP) $\le 1.5$s.
