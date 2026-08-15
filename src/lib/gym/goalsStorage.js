import { storageService } from "@/lib/storage/storageService";

/**
 * Client-side storage engine for personal typing goals.
 * Delegates to central storageService.
 */

export function getGoals() {
  return storageService.getGoals();
}

export function saveGoals(newGoals) {
  const current = getGoals();
  const updated = {
    targetWpm: typeof newGoals.targetWpm === "number" ? newGoals.targetWpm : current.targetWpm,
    targetAccuracy: typeof newGoals.targetAccuracy === "number" ? newGoals.targetAccuracy : current.targetAccuracy
  };
  storageService.saveGoals(updated);
  return updated;
}
