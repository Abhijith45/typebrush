import { localStorageService } from "./localStorageService";
import {
  LEGACY_TYPING_HISTORY_KEY,
  LEGACY_PRACTICE_HISTORY_KEY,
  LEGACY_GYM_PROGRESS_KEY,
  STORES
} from "./storageConstants";

export const storageMigration = {
  /**
   * Migrate legacy LocalStorage keys into IndexedDB stores.
   * Accepts the dbPut transactional writer as a parameter to avoid circular imports.
   */
  async run(dbPut) {
    if (typeof window === "undefined") return;

    // 1. Migrate Typing history
    const oldTyping = localStorageService.getItem(LEGACY_TYPING_HISTORY_KEY);
    if (Array.isArray(oldTyping) && oldTyping.length > 0) {
      try {
        for (const item of oldTyping) {
          const id = item.id || `test-${item.timestamp || Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          await dbPut(STORES.TYPING_RESULTS, { ...item, id });
        }
        localStorageService.removeItem(LEGACY_TYPING_HISTORY_KEY);
        console.info("TypeBrush Storage: Migrated legacy typing history to IndexedDB.");
      } catch (err) {
        console.warn("TypeBrush Storage: Legacy typing history migration error:", err);
      }
    }

    // 2. Migrate Practice history
    const oldPractice = localStorageService.getItem(LEGACY_PRACTICE_HISTORY_KEY);
    if (Array.isArray(oldPractice) && oldPractice.length > 0) {
      try {
        for (const item of oldPractice) {
          const id = item.id || `prac-${item.timestamp || Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          await dbPut(STORES.GYM_SESSIONS, { ...item, id });
        }
        localStorageService.removeItem(LEGACY_PRACTICE_HISTORY_KEY);
        console.info("TypeBrush Storage: Migrated legacy practice history to IndexedDB.");
      } catch (err) {
        console.warn("TypeBrush Storage: Legacy practice history migration error:", err);
      }
    }

    // 3. Migrate Gym levels progress
    const oldProgress = localStorageService.getItem(LEGACY_GYM_PROGRESS_KEY);
    if (oldProgress && typeof oldProgress === "object" && !Array.isArray(oldProgress)) {
      try {
        for (const [programId, level] of Object.entries(oldProgress)) {
          await dbPut(STORES.PROGRESS_TRACKING, { programId, level: Number(level) || 0 });
        }
        localStorageService.removeItem(LEGACY_GYM_PROGRESS_KEY);
        console.info("TypeBrush Storage: Migrated legacy gym progress to IndexedDB.");
      } catch (err) {
        console.warn("TypeBrush Storage: Legacy gym progress migration error:", err);
      }
    }
  }
};
