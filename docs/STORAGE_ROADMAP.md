# TypeBrush — Storage Architecture Expansion Roadmap

This document outlines how the newly implemented V1.5 storage layer scales into future product versions, specifically for V2 (Cloud Sync), V3 (AI Coach), and V4 (Leaderboards & Multiplayer).

---

## 1. V2 Architecture: Supabase Cloud Synchronization

When user accounts and authentication are introduced via Supabase, the offline-first IndexedDB structure will act as a write-through cache:

```
[User Action]
      │
      ▼
[storageService]
      │
      ├── Write Local IndexedDB (Immediate UI update)
      │
      └── User Authenticated?
            ├── YES ──► Write Supabase PostgreSQL (Async Sync)
            └── NO  ──► Push to future_sync_queue Store (Offline Mode)
```

### Sync Queue Strategy
- A database store `future_sync_queue` is prepared to record all offline CRUD transactions.
- Upon restoring internet connectivity or logging in, a sync coordinator processes this queue in FIFO order, resolving conflicts using timestamps.

---

## 2. V3 Architecture: Local AI Coach Caching

- The AI coaching engine will evaluate weak keys, error trends, and typing speed regressions.
- The `future_ai_cache` store is designed to hold these evaluations locally. This avoids reloading recommendations on every navigation and enables full offline operation for the AI tutor.

---

## 3. V4 Architecture: Institutional and Real-time Lobbies

- School and college admin portals will require real-time synchronization of typing session results.
- The transactional schema is version-controlled, allowing student logs to be streamed directly to real-time sync endpoints (WebSockets) without modifying core typing engine logic.
