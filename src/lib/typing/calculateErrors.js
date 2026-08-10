/**
 * Calculates typing errors.
 * 
 * @param {Object} params
 * @param {number} params.incorrectCharacters - Count of incorrect characters in final state or typed.
 * @returns {number} Errors count.
 */
export function calculateErrors({ incorrectCharacters = 0 }) {
  return Math.max(0, incorrectCharacters);
}
