# TypeBrush — Performance Intelligence Analytics Architecture

This document describes the modular architecture of the TypeBrush analytics engine, detail decoupling layers, and hooks prepared for future AI Coaching expansion.

---

## 1. decouple Architecture Design

To keep pages light and maintainable, calculations and visual templates are strictly segregated:

```
[Typing Runner / Gym Exercise] (Captures Raw Keystrokes)
             │
             ▼
    [lib/typing/ Calculators] (Pure Functions: WPM, Net/Raw Acc, Errors)
             │
             ▼
     [storageService] (Asynchronous persistence to IndexedDB)
             │
             ├───► [TypingResult.js] (Timed Test metrics grid, progress comparison, badges)
             │
             └───► [GymWorkspace.js / Completion Screen] (Decoupled Program/Level context)
```

---

## 2. Decoupled Gym vs Test Analytics

- **Standard Typing Test results** render `TypingResult.js` with comprehensive statistics (WPM, Net/Raw Accuracy, detailed secondary grids, comparative progress charts, and print scorecards).
- **Typing Gym completion** renders inside `GymWorkspace.js`'s completion view, bypassing timed test components. It displays exercise program names, unlocked level indicators, focused keys, and targeted level progression recommendations, avoiding metrics overload for learning drills.

---

## 3. Future AI Coaching Readiness (Phase 18)

Every typing session result written to IndexedDB store `typing_results` is formatted as a standardized JSON record. This structures data to feed client-side AI analysis (e.g. WebLLM loading Llama-3 client-side) or backend API calls:

### Standardized Record Schema
- **`keyStats`**: A character map of attempts, errors, and corrects. An AI coach can map this to detect finger transition hesitation patterns (e.g. index-to-pinky lags).
- **`mistakePairs`**: A map recording exact letter swaps (e.g. `r->t`, `n->m`). Replaces broad assumptions with target keyboard coordinates to generate custom layouts.
- **`backspacesUsed`**: Shows correction overhead. High backspace volumes indicate muscle memory hesitation.

An AI coach can process these three JSON hashes to output:
1. **Session Summary**: `"You have high raw speed, but index-finger coordination lags on row transitions."`
2. **Weak Key Summary**: `"Focus on ring finger reach to keys O and L."`
3. **Target Drills Recommendation**: `"Unlocking custom Home Row practice row 2."`
These outputs are designed to write directly to the `future_ai_cache` IndexedDB store.
