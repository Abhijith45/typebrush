import { storageService } from "@/lib/storage/storageService";

/**
 * Client-side local storage engine for TypeBrush practice session history.
 * Delegates to central storageService.
 */

const MAX_PRACTICE_LIMIT = 100;

export async function getPracticeHistory() {
  try {
    const history = await storageService.getGymSessionHistory();
    return history.filter(
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

export async function savePracticeSession(session) {
  if (!session) return null;

  try {
    const existing = await getPracticeHistory();

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
    
    // Clear and rewrite history to IndexedDB to maintain strict limit
    await storageService.clearGymSessionHistory();
    for (const item of updated) {
      await storageService.saveGymSession(item);
    }
    
    return newRecord;
  } catch (err) {
    console.warn("TypeBrush: Failed to save practice session", err);
    return null;
  }
}

export async function clearPracticeHistory() {
  try {
    await storageService.clearGymSessionHistory();
    return true;
  } catch (err) {
    console.warn("TypeBrush: Failed to clear practice history", err);
    return false;
  }
}
