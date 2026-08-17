/**
 * JSDoc Type Definitions for TypeBrush Storage Service
 */

/**
 * @typedef {Object} TypingResult
 * @property {string} id - Unique UUID or timestamp key
 * @property {number} timestamp - Epoch timestamp in milliseconds
 * @property {string} testType - Test category (e.g. "1-minute", "number")
 * @property {number} wpm - Words per minute
 * @property {number} accuracy - Precision percentage (0 to 100)
 * @property {number} duration - Test duration in seconds
 * @property {number} errors - Mistakes count
 * @property {number} correctChars - Total correctly entered characters
 * @property {number} totalChars - Total entered characters (correct + errors)
 * @property {Object.<string, KeyStats>} keyStats - Character-level typing details
 * @property {Object.<string, number>} mistakePairs - Character combination error frequencies
 */

/**
 * @typedef {Object} KeyStats
 * @property {number} attempts - Total keystrokes
 * @property {number} errors - Mistakes made on this character
 * @property {number} correct - Correct keystrokes
 */

/**
 * @typedef {Object} GymSession
 * @property {string} id - Unique UUID key
 * @property {number} timestamp - Epoch timestamp in milliseconds
 * @property {string} trainingType - Program type (e.g. "finger-placement", "weak-key-recovery")
 * @property {string} target - Practice key target focus (optional)
 * @property {string} difficulty - Difficulty tier ("easy" | "medium" | "hard")
 * @property {number} duration - Session length in seconds
 * @property {number} wpm - Words per minute
 * @property {number} accuracy - Precision percentage (0 to 100)
 * @property {number} errors - Mistakes count
 */

/**
 * @typedef {Object} Goals
 * @property {number} targetWpm - Target speed goal
 * @property {number} targetAccuracy - Target accuracy precision percentage
 */

/**
 * @typedef {Object} StorageHealthStatus
 * @property {boolean} indexedDbAvailable - IndexedDB availability
 * @property {boolean} fallbackActive - LocalStorage fallback active state
 * @property {boolean} storageAvailable - Window local storage accessibility
 */
const storageTypes = {};
export default storageTypes;
