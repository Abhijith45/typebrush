/**
 * Client-side local storage engine for TypeBrush typing test history.
 * 100% private, browser-bound storage under versioned key `typebrush:typing-history:v1`.
 */

const STORAGE_KEY = "typebrush:typing-history:v1";
const MAX_HISTORY_LIMIT = 50;

export function getHistory() {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter valid records
    return parsed.filter(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.wpm === "number" &&
        typeof item.accuracy === "number"
    );
  } catch (err) {
    console.warn("TypeBrush: Unable to read typing history from localStorage", err);
    return [];
  }
}

export function saveResult(record) {
  if (typeof window === "undefined" || !record) return null;

  try {
    const existing = getHistory();

    const newRecord = {
      id: record.id || `rec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: record.timestamp || Date.now(),
      testType: record.testType || "standard",
      wpm: Math.round(record.wpm || 0),
      accuracy: Math.round((record.accuracy || 0) * 10) / 10,
      duration: record.duration || 60,
      errors: record.errors || 0,
      correctChars: record.correctChars || 0,
      totalChars: (record.correctChars || 0) + (record.errors || 0),
      keyStats: record.keyStats || {},
      mistakePairs: record.mistakePairs || {}
    };

    // FIFO rotation: keep last 50 items
    const updated = [...existing, newRecord].slice(-MAX_HISTORY_LIMIT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  } catch (err) {
    console.warn("TypeBrush: Failed to save result to localStorage", err);
    return null;
  }
}

export function getLatestResult() {
  const history = getHistory();
  return history.length > 0 ? history[history.length - 1] : null;
}

export function clearHistory() {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.warn("TypeBrush: Failed to clear history", err);
    return false;
  }
}
