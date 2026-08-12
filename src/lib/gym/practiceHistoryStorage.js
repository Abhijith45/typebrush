/**
 * Client-side local storage engine for TypeBrush practice session history.
 * Bounded to max 100 sessions under key `typebrush:practice-history:v1`.
 */

const PRACTICE_STORAGE_KEY = "typebrush:practice-history:v1";
const MAX_PRACTICE_LIMIT = 100;

export function getPracticeHistory() {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(PRACTICE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.wpm === "number" &&
        typeof item.accuracy === "number"
    );
  } catch (err) {
    console.warn("TypeBrush: Unable to read practice history", err);
    return [];
  }
}

export function savePracticeSession(session) {
  if (typeof window === "undefined" || !session) return null;

  try {
    const existing = getPracticeHistory();

    const newRecord = {
      id: session.id || `prac-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: session.timestamp || Date.now(),
      trainingType: session.trainingType || "general",
      target: session.target || "",
      difficulty: session.difficulty || "medium",
      duration: session.duration || 60,
      wpm: Math.round(session.wpm || 0),
      accuracy: Math.round((session.accuracy || 0) * 10) / 10,
      errors: session.errors || 0
    };

    const updated = [...existing, newRecord].slice(-MAX_PRACTICE_LIMIT);
    localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  } catch (err) {
    console.warn("TypeBrush: Failed to save practice session", err);
    return null;
  }
}

export function clearPracticeHistory() {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(PRACTICE_STORAGE_KEY);
    return true;
  } catch (err) {
    console.warn("TypeBrush: Failed to clear practice history", err);
    return false;
  }
}
