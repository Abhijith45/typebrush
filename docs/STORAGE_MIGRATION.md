# TypeBrush — Storage Migration Strategy

This document describes the data migration logic implemented to transfer user records from legacy LocalStorage schemes to the hardened IndexedDB database model.

---

## 1. Migration Flow

The migration script runs once during the application root layout initialization (`muiThemeProvider.js` mount effect):

```
[App Mounts]
     │
     ▼
[Check LocalStorage V1 Legacy Keys]
     │
     ├── Legacy Keys Detected?
     │     ├── YES ──► [Begin Transactional Migrations] ──► [Verify Writes] ──► [Delete LocalStorage Keys]
     │     └── NO  ──► [Skip Migration]
     ▼
[IndexedDB Active & Running]
```

---

## 2. Legacy Keys & Target Object Stores

The migration maps legacy strings to database collections as follows:

| Legacy LocalStorage Key | Target IndexedDB Store | Parsing & Normalization |
| :--- | :--- | :--- |
| `typebrush:typing-history:v1` | `typing_results` | Filters empty objects; maps fields (e.g. `testName` to `testType`); enforces **FIFO rotation limit of 50 records**. |
| `typebrush:practice-history:v1` | `gym_sessions` | Maps training session runs; enforces **FIFO rotation limit of 100 records**. |
| `typebrush:gym-progress:v1` | `progress_tracking` | Parses `{ [programId]: levelNum }` map and creates flat store records. |

---

## 3. Quota Safety & Integrity Checks

- **Validation Check**: Before deleting legacy LocalStorage keys, the migration coordinator calls `getTypingHistory()` and `getGymSessionHistory()` to confirm that the exact count of imported items exists in IndexedDB.
- **Idempotency**: Once the migration completes successfully, the legacy LocalStorage keys are deleted, preventing redundant migrations on future app launches.
- **Transactional Safety**: Database operations are written using `"readwrite"` transactional scopes. If any single write fails, the transaction aborts, leaving the legacy LocalStorage data intact for recovery.
