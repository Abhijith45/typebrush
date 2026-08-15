import { indexedDbService } from "./indexedDbService";

let isFallbackActive = false;
let hasProbed = false;

export const storageHealth = {
  /**
   * Check browser IndexedDB availability and update fallback active state.
   */
  async checkLiveness() {
    if (hasProbed) return !isFallbackActive;
    hasProbed = true;
    try {
      const ok = await indexedDbService.probe();
      isFallbackActive = !ok;
    } catch {
      isFallbackActive = true;
    }
    return !isFallbackActive;
  },

  /**
   * Expose active state fallback flag.
   */
  isFallbackActive() {
    return isFallbackActive;
  },

  /**
   * Force fallback state activation (recovery mode).
   */
  activateFallback() {
    isFallbackActive = true;
  },

  /**
   * Checks storage permissions, quotas, and availability.
   */
  async check() {
    const isOk = await this.checkLiveness();
    return {
      indexedDbAvailable: isOk,
      fallbackActive: isFallbackActive,
      storageAvailable: typeof window !== "undefined"
    };
  }
};
