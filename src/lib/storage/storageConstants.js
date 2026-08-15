/**
 * Centralized Storage Constants for TypeBrush
 */

// LocalStorage Keys (Lightweight settings)
export const THEME_KEY = "theme";
export const GOALS_KEY = "typebrush:typing-goals:v1";
export const LAST_TIMER_KEY = "typebrush:last-timer:v1";
export const LAST_MODE_KEY = "typebrush:last-mode:v1";

// Legacy LocalStorage Keys (for migration)
export const LEGACY_TYPING_HISTORY_KEY = "typebrush:typing-history:v1";
export const LEGACY_PRACTICE_HISTORY_KEY = "typebrush:practice-history:v1";
export const LEGACY_GYM_PROGRESS_KEY = "typebrush:gym-progress:v1";

// IndexedDB Specifications
export const DB_NAME = "TypeBrushDB";
export const DB_VERSION = 1;

export const STORES = {
  TYPING_RESULTS: "typing_results",
  GYM_SESSIONS: "gym_sessions",
  PROGRESS_TRACKING: "progress_tracking",
  WEAK_KEY_ANALYSIS: "weak_key_analysis",
  USER_ACHIEVEMENTS: "user_achievements",
  SCORECARDS: "scorecards",
  FUTURE_AI_CACHE: "future_ai_cache"
};

// LocalStorage fallback keys for IndexedDB stores
export const FALLBACK_KEYS = {
  [STORES.TYPING_RESULTS]: "typebrush:backup:typing_results",
  [STORES.GYM_SESSIONS]: "typebrush:backup:gym_sessions",
  [STORES.PROGRESS_TRACKING]: "typebrush:backup:progress_tracking",
  [STORES.WEAK_KEY_ANALYSIS]: "typebrush:backup:weak_key_analysis",
  [STORES.USER_ACHIEVEMENTS]: "typebrush:backup:user_achievements",
  [STORES.SCORECARDS]: "typebrush:backup:scorecards",
  [STORES.FUTURE_AI_CACHE]: "typebrush:backup:future_ai_cache"
};
