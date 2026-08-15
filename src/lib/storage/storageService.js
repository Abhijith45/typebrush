import { localStorageService } from "./localStorageService";
import { indexedDbService } from "./indexedDbService";
import { storageHealth } from "./storageHealth";
import { storageMigration } from "./storageMigration";
import {
  THEME_KEY,
  GOALS_KEY,
  LAST_TIMER_KEY,
  LAST_MODE_KEY,
  STORES,
  FALLBACK_KEYS
} from "./storageConstants";

/**
 * Consolidated Storage Coordinator for TypeBrush.
 * Orchestrates IndexedDB access, local preferences, legacy migrations, and fallback routines.
 */

/**
 * Internal helper to read records from active store.
 */
async function dbGetAll(storeName) {
  const isOk = await storageHealth.checkLiveness();
  if (!isOk) {
    const fallbackKey = FALLBACK_KEYS[storeName];
    return localStorageService.getItem(fallbackKey, []);
  }
  try {
    return await indexedDbService.getAll(storeName);
  } catch (err) {
    console.warn(`IndexedDB read failed for ${storeName}, using LocalStorage fallback:`, err);
    const fallbackKey = FALLBACK_KEYS[storeName];
    return localStorageService.getItem(fallbackKey, []);
  }
}

/**
 * Internal helper to save a record into active store.
 */
async function dbPut(storeName, data) {
  const isOk = await storageHealth.checkLiveness();
  if (!isOk) {
    const fallbackKey = FALLBACK_KEYS[storeName];
    const current = localStorageService.getItem(fallbackKey, []);
    
    if (storeName === STORES.PROGRESS_TRACKING) {
      const idx = current.findIndex(item => item.programId === data.programId);
      if (idx > -1) current[idx] = data;
      else current.push(data);
    } else {
      const idx = current.findIndex(item => item.id === data.id);
      if (idx > -1) current[idx] = data;
      else current.push(data);
    }
    localStorageService.setItem(fallbackKey, current);
    return;
  }
  try {
    await indexedDbService.put(storeName, data);
  } catch (err) {
    console.warn(`IndexedDB write failed for ${storeName}, saving to fallback:`, err);
    const fallbackKey = FALLBACK_KEYS[storeName];
    const current = localStorageService.getItem(fallbackKey, []);
    if (storeName === STORES.PROGRESS_TRACKING) {
      const idx = current.findIndex(item => item.programId === data.programId);
      if (idx > -1) current[idx] = data;
      else current.push(data);
    } else {
      const idx = current.findIndex(item => item.id === data.id);
      if (idx > -1) current[idx] = data;
      else current.push(data);
    }
    localStorageService.setItem(fallbackKey, current);
  }
}

/**
 * Internal helper to clear an object store.
 */
async function dbClear(storeName) {
  const isOk = await storageHealth.checkLiveness();
  if (!isOk) {
    const fallbackKey = FALLBACK_KEYS[storeName];
    localStorageService.removeItem(fallbackKey);
    return;
  }
  try {
    await indexedDbService.clear(storeName);
  } catch (err) {
    console.warn(`IndexedDB clear failed for ${storeName}:`, err);
    const fallbackKey = FALLBACK_KEYS[storeName];
    localStorageService.removeItem(fallbackKey);
  }
}

export const storageService = {
  /**
   * Probes active database health. Delegates to storageHealth module.
   */
  async healthCheck() {
    return await storageHealth.check();
  },

  /**
   * Migrate legacy V1 LocalStorage keys into IndexedDB object stores.
   * Delegates to storageMigration module.
   */
  async migrateLegacyData() {
    await storageMigration.run(dbPut);
  },

  // =========================================================
  // STORE: TYPING RESULTS
  // =========================================================
  async saveTypingResult(result) {
    const id = result.id || `test-${result.timestamp || Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await dbPut(STORES.TYPING_RESULTS, { ...result, id });
    return id;
  },

  async getTypingHistory() {
    const results = await dbGetAll(STORES.TYPING_RESULTS);
    // Sort chronological ascending
    return results.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  },

  async clearTypingHistory() {
    await dbClear(STORES.TYPING_RESULTS);
  },

  // =========================================================
  // STORE: GYM SESSIONS
  // =========================================================
  async saveGymSession(session) {
    const id = session.id || `prac-${session.timestamp || Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await dbPut(STORES.GYM_SESSIONS, { ...session, id });
    return id;
  },

  async getGymSessionHistory() {
    return await dbGetAll(STORES.GYM_SESSIONS);
  },

  async clearGymSessionHistory() {
    await dbClear(STORES.GYM_SESSIONS);
  },

  // =========================================================
  // STORE: PROGRESS TRACKING
  // =========================================================
  async saveGymProgress(programId, levelNumber) {
    await dbPut(STORES.PROGRESS_TRACKING, { programId, level: levelNumber });
  },

  async getGymProgress() {
    const records = await dbGetAll(STORES.PROGRESS_TRACKING);
    const progressMap = {};
    records.forEach((rec) => {
      progressMap[rec.programId] = rec.level;
    });
    return progressMap;
  },

  // =========================================================
  // STORE: LIGHTWEIGHT PREFERENCES (LOCALSTORAGE)
  // =========================================================
  saveGoals(goals) {
    localStorageService.setItem(GOALS_KEY, goals);
  },

  getGoals() {
    return localStorageService.getItem(GOALS_KEY, { targetWpm: 60, targetAccuracy: 95 });
  },

  saveTheme(theme) {
    localStorageService.setItem(THEME_KEY, theme);
  },

  getTheme() {
    return localStorageService.getItem(THEME_KEY, "light");
  },

  saveLastTimer(seconds) {
    localStorageService.setItem(LAST_TIMER_KEY, seconds);
  },

  getLastTimer() {
    return localStorageService.getItem(LAST_TIMER_KEY, 60);
  },

  saveLastMode(mode) {
    localStorageService.setItem(LAST_MODE_KEY, mode);
  },

  getLastMode() {
    return localStorageService.getItem(LAST_MODE_KEY, "time");
  },

  // =========================================================
  // EXPORT / IMPORT FOUNDATION
  // =========================================================
  /**
   * Export all user data as a JSON string (for backups).
   */
  async exportData() {
    try {
      const typingResults = await dbGetAll(STORES.TYPING_RESULTS);
      const gymSessions = await dbGetAll(STORES.GYM_SESSIONS);
      const progressRecords = await dbGetAll(STORES.PROGRESS_TRACKING);
      
      const goals = this.getGoals();
      const theme = this.getTheme();
      const lastTimer = this.getLastTimer();
      const lastMode = this.getLastMode();

      const backupObj = {
        version: 1,
        exportedAt: Date.now(),
        data: {
          typingResults,
          gymSessions,
          progressRecords,
          preferences: {
            goals,
            theme,
            lastTimer,
            lastMode
          }
        }
      };
      return JSON.stringify(backupObj);
    } catch (err) {
      console.error("TypeBrush Storage: Export failed:", err);
      throw new Error("Failed to compile user data backup.");
    }
  },

  /**
   * Import all user data from a JSON string (restores backups).
   */
  async importData(jsonString) {
    if (!jsonString) return false;
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || parsed.version !== 1 || !parsed.data) {
        throw new Error("Invalid backup data format.");
      }

      const { typingResults, gymSessions, progressRecords, preferences } = parsed.data;

      // 1. Restore Preferences
      if (preferences) {
        if (preferences.goals) this.saveGoals(preferences.goals);
        if (preferences.theme) this.saveTheme(preferences.theme);
        if (preferences.lastTimer) this.saveLastTimer(preferences.lastTimer);
        if (preferences.lastMode) this.saveLastMode(preferences.lastMode);
      }

      // 2. Restore typing results to IndexedDB
      if (Array.isArray(typingResults)) {
        await dbClear(STORES.TYPING_RESULTS);
        for (const item of typingResults) {
          if (item && item.id) {
            await dbPut(STORES.TYPING_RESULTS, item);
          }
        }
      }

      // 3. Restore gym sessions
      if (Array.isArray(gymSessions)) {
        await dbClear(STORES.GYM_SESSIONS);
        for (const item of gymSessions) {
          if (item && item.id) {
            await dbPut(STORES.GYM_SESSIONS, item);
          }
        }
      }

      // 4. Restore gym progress
      if (Array.isArray(progressRecords)) {
        await dbClear(STORES.PROGRESS_TRACKING);
        for (const item of progressRecords) {
          if (item && item.programId) {
            await dbPut(STORES.PROGRESS_TRACKING, item);
          }
        }
      }
      return true;
    } catch (err) {
      console.error("TypeBrush Storage: Import failed:", err);
      throw new Error("Failed to restore user data backup: " + err.message);
    }
  }
};
