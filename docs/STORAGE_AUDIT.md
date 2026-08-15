# TypeBrush Browser Storage Audit

This audit documents all current browser storage usage, keys, data sizes, risks, and maps them to target storage media (LocalStorage vs IndexedDB) for TypeBrush.

---

## 1. Current Storage Catalog

| Storage Key | Current Media | Data Structure | Purpose | Est. Size | Target Media |
|---|---|---|---|---|---|
| `theme` | LocalStorage | String (`"light"` / `"dark"`) | Persists active theme toggle preference | ~10 B | LocalStorage |
| `typebrush:typing-goals:v1` | LocalStorage | Object (`{ targetWpm, targetAccuracy }`) | User speed and accuracy goals | ~50 B | LocalStorage |
| `typebrush:gym-progress:v1` | LocalStorage | Object (`{ programId: levelNum }`) | Unlocked levels for curriculum programs | ~100 B | IndexedDB (`progress_tracking`) |
| `typebrush:typing-history:v1` | LocalStorage | Array of Objects (WPM, Acc, keys, history log) | Complete history of typing tests | 100 KB - 5 MB (Grows) | IndexedDB (`typing_results`) |
| `typebrush:practice-history:v1` | LocalStorage | Array of Objects (Drill name, stats, timestamp) | Historical logs of gym practice runs | 100 KB - 5 MB (Grows) | IndexedDB (`gym_sessions`) |

---

## 2. Storage Risks in V1 Architecture

1. **Storage Quota Limits (LocalStorage)**:
   - Browsers enforce a strict 5 MB limit on LocalStorage. As users complete hundreds of typing tests, the keystroke statistics, key-level maps, and history arrays will exceed this limit, leading to write failures (`QuotaExceededError`) and app crashes.
2. **Synchronous Blocking UI (LocalStorage)**:
   - LocalStorage operations are synchronous. Parsing and writing 2 MB of JSON history blocks the browser main thread, causing minor but noticeable UI stutters or input lag during test transitions.
3. **Data Loss & Corruption**:
   - Simultaneous tabs or unexpected exits can easily corrupt stringified JSON stores. LocalStorage lacks atomic transactions or locking mechanisms.

---

## 3. Storage Optimization & Target Schema

To resolve these issues, TypeBrush migrates to a hybrid storage system:

* **LocalStorage** remains in use ONLY for synchronous, lightweight preferences:
  - Theme configurations.
  - Active goal parameters.
  - UI state caches (e.g. last selected timer duration).
* **IndexedDB** is introduced for large, query-heavy historical datasets. It runs asynchronously, handles up to 50% of available disk space, and provides transactional integrity.

### IndexedDB Object Stores (TypeBrushDB)
1. **`typing_results`**: Historical typing test metrics and character keystroke reports.
2. **`gym_sessions`**: Practice logs from the Typing Gym workouts.
3. **`progress_tracking`**: Completed level progression parameters.
4. **`weak_key_analysis`**: Keystroke error aggregates over time.
5. **`user_achievements`**: Badges and practice milestones.
6. **`scorecards`**: Record of generated official scorecard reports.
7. **`future_ai_cache`**: Offline caches for future AI-coaching insights.
