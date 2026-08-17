import { storageService } from "@/lib/storage/storageService";

/**
 * Client-side progress helper for TypeBrush Typing Gym level progression.
 * Delegates to central storageService.
 */

const DEFAULT_PROGRESS = {
  "finger-placement": 0,
  "weak-key-recovery": 0,
  "accuracy-builder": 0,
  "speed-builder": 0,
  "numbers-symbols": 0
};

export async function getGymProgress() {
  try {
    const progress = await storageService.getGymProgress();
    return {
      ...DEFAULT_PROGRESS,
      ...progress
    };
  } catch (err) {
    console.warn("TypeBrush: Unable to read gym progress", err);
    return DEFAULT_PROGRESS;
  }
}

export async function completeGymLevel(programId, levelNumber) {
  try {
    const current = await getGymProgress();
    const currentMaxCompleted = current[programId] || 0;
    
    // If the completed level is greater than what was completed before, update it
    if (levelNumber > currentMaxCompleted) {
      await storageService.saveGymProgress(programId, levelNumber);
    }
  } catch (err) {
    console.warn("TypeBrush: Unable to save gym progress", err);
  }
}
