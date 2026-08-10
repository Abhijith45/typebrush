/**
 * Calculates typing accuracy percentage.
 * 
 * @param {Object} params
 * @param {number} params.correctCharacters - Total correct characters typed.
 * @param {number} params.totalTypedCharacters - Total typed characters including mistakes.
 * @returns {number} Round percentage (e.g. 96).
 */
export function calculateAccuracy({ correctCharacters = 0, totalTypedCharacters = 0 }) {
  if (totalTypedCharacters <= 0) return 100;
  const accuracy = (correctCharacters / totalTypedCharacters) * 100;
  return Math.round(accuracy * 10) / 10; // returns 1 decimal precision, e.g. 96.4
}
