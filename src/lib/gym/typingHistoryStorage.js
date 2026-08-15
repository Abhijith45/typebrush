import { storageService } from "@/lib/storage/storageService";

/**
 * Client-side local storage engine for TypeBrush typing test history.
 * Delegates to central storageService.
 */

const MAX_HISTORY_LIMIT = 50;

export async function getHistory() {
  try {
    const history = await storageService.getTypingHistory();
    // Filter valid records and sanitize keyStats
    return history.filter(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.wpm === "number" &&
        typeof item.accuracy === "number"
    ).map((item) => ({
      ...item,
      keyStats: item.keyStats && typeof item.keyStats === "object" ? item.keyStats : {},
      mistakePairs: item.mistakePairs && typeof item.mistakePairs === "object" ? item.mistakePairs : {}
    }));
  } catch (err) {
    console.warn("TypeBrush: Unable to read typing history", err);
    return [];
  }
}

export async function saveResult(record) {
  if (!record) return null;

  try {
    const existing = await getHistory();

    const sanitizedKeyStats = {};
    if (record.keyStats && typeof record.keyStats === "object") {
      Object.entries(record.keyStats).forEach(([char, stats]) => {
        if (stats && typeof stats === "object") {
          sanitizedKeyStats[char] = {
            attempts: Math.max(0, Number(stats.attempts) || 0),
            errors: Math.max(0, Number(stats.errors) || 0),
            correct: Math.max(0, Number(stats.correct) || 0)
          };
        }
      });
    }

    const sanitizedMistakePairs = {};
    if (record.mistakePairs && typeof record.mistakePairs === "object") {
      Object.entries(record.mistakePairs).forEach(([pair, count]) => {
        sanitizedMistakePairs[pair] = Math.max(0, Number(count) || 0);
      });
    }

    const newRecord = {
      id: record.id || `rec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: record.timestamp || Date.now(),
      testType: record.testName || record.testType || "standard",
      wpm: Math.round(record.wpm || 0),
      accuracy: Math.round((record.accuracy || 0) * 10) / 10,
      duration: record.duration || 60,
      errors: record.errors || 0,
      correctChars: record.correctChars || 0,
      totalChars: (record.correctChars || 0) + (record.errors || 0),
      keyStats: sanitizedKeyStats,
      mistakePairs: sanitizedMistakePairs
    };

    // FIFO rotation: keep last 50 items
    const updated = [...existing, newRecord].slice(-MAX_HISTORY_LIMIT);
    
    // Clear and rewrite history to IndexedDB to maintain strict limit
    await storageService.clearTypingHistory();
    for (const item of updated) {
      await storageService.saveTypingResult(item);
    }
    
    return newRecord;
  } catch (err) {
    console.warn("TypeBrush: Failed to save result", err);
    return null;
  }
}

export async function getLatestResult() {
  const history = await getHistory();
  return history.length > 0 ? history[history.length - 1] : null;
}

export async function clearHistory() {
  try {
    await storageService.clearTypingHistory();
    return true;
  } catch (err) {
    console.warn("TypeBrush: Failed to clear history", err);
    return false;
  }
}
