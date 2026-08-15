/**
 * SSR-safe, error-tolerant LocalStorage wrapper service.
 */

const isBrowser = () => typeof window !== "undefined";

export const localStorageService = {
  /**
   * Reads a value from LocalStorage.
   */
  getItem(key, defaultValue = null) {
    if (!isBrowser()) return defaultValue;
    try {
      const value = window.localStorage.getItem(key);
      if (value === null) return defaultValue;
      
      // Attempt to parse JSON; fallback to raw string if parsing fails
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (err) {
      console.warn(`LocalStorage read error for key "${key}":`, err);
      return defaultValue;
    }
  },

  /**
   * Writes a value to LocalStorage.
   */
  setItem(key, value) {
    if (!isBrowser()) return false;
    try {
      const stringValue = typeof value === "string" ? value : JSON.stringify(value);
      window.localStorage.setItem(key, stringValue);
      return true;
    } catch (err) {
      console.warn(`LocalStorage write error for key "${key}":`, err);
      return false;
    }
  },

  /**
   * Deletes a key from LocalStorage.
   */
  removeItem(key) {
    if (!isBrowser()) return false;
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.warn(`LocalStorage remove error for key "${key}":`, err);
      return false;
    }
  },

  /**
   * Clears all items in LocalStorage.
   */
  clear() {
    if (!isBrowser()) return false;
    try {
      window.localStorage.clear();
      return true;
    } catch (err) {
      console.warn("LocalStorage clear error:", err);
      return false;
    }
  }
};
