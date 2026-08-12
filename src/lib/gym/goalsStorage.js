/**
 * Client-side storage engine for personal typing goals.
 * Key: `typebrush:goals:v1`.
 */

const GOALS_STORAGE_KEY = "typebrush:goals:v1";

export function getGoals() {
  if (typeof window === "undefined") {
    return { targetWpm: 60, targetAccuracy: 95 };
  }

  try {
    const raw = localStorage.getItem(GOALS_STORAGE_KEY);
    if (!raw) return { targetWpm: 60, targetAccuracy: 95 };
    const parsed = JSON.parse(raw);
    return {
      targetWpm: typeof parsed.targetWpm === "number" ? parsed.targetWpm : 60,
      targetAccuracy: typeof parsed.targetAccuracy === "number" ? parsed.targetAccuracy : 95
    };
  } catch (err) {
    console.warn("TypeBrush: Unable to read goals", err);
    return { targetWpm: 60, targetAccuracy: 95 };
  }
}

export function saveGoals(newGoals) {
  if (typeof window === "undefined") return false;

  try {
    const current = getGoals();
    const updated = {
      targetWpm: typeof newGoals.targetWpm === "number" ? newGoals.targetWpm : current.targetWpm,
      targetAccuracy: typeof newGoals.targetAccuracy === "number" ? newGoals.targetAccuracy : current.targetAccuracy
    };
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn("TypeBrush: Failed to save goals", err);
    return false;
  }
}
