import { DB_NAME, DB_VERSION, STORES } from "./storageConstants";

/**
 * Promise-based IndexedDB utility wrapper service for TypeBrush.
 */

let dbPromise = null;

/**
 * Open or retrieve the database instance.
 */
function getDB() {
  if (typeof window === "undefined" || !window.indexedDB) {
    return Promise.reject(new Error("IndexedDB is not supported in this environment."));
  }

  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores if they do not exist
        if (!db.objectStoreNames.contains(STORES.TYPING_RESULTS)) {
          db.createObjectStore(STORES.TYPING_RESULTS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORES.GYM_SESSIONS)) {
          db.createObjectStore(STORES.GYM_SESSIONS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORES.PROGRESS_TRACKING)) {
          db.createObjectStore(STORES.PROGRESS_TRACKING, { keyPath: "programId" });
        }
        if (!db.objectStoreNames.contains(STORES.WEAK_KEY_ANALYSIS)) {
          db.createObjectStore(STORES.WEAK_KEY_ANALYSIS, { keyPath: "id", autoIncrement: true });
        }
        if (!db.objectStoreNames.contains(STORES.USER_ACHIEVEMENTS)) {
          db.createObjectStore(STORES.USER_ACHIEVEMENTS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORES.SCORECARDS)) {
          db.createObjectStore(STORES.SCORECARDS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORES.FUTURE_AI_CACHE)) {
          db.createObjectStore(STORES.FUTURE_AI_CACHE, { keyPath: "id" });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error || new Error("Failed to open IndexedDB."));
      };
    } catch (err) {
      reject(err);
    }
  });

  return dbPromise;
}

export const indexedDbService = {
  /**
   * Probes database open liveness.
   */
  async probe() {
    try {
      const db = await getDB();
      return !!db;
    } catch {
      return false;
    }
  },

  /**
   * Retrieves all records from an object store.
   */
  async getAll(storeName) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  /**
   * Retrieves a single record by key.
   */
  async get(storeName, key) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  /**
   * Saves or updates a record.
   */
  async put(storeName, data) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  /**
   * Deletes a record by key.
   */
  async delete(storeName, key) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  /**
   * Clears all records from an object store.
   */
  async clear(storeName) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
};
