/**
 * Calculates typing speed in Words Per Minute (WPM).
 * WPM = (totalTypedCharacters / 5) / (elapsedSeconds / 60)
 * 
 * @param {Object} params
 * @param {number} params.typedCharacters - Total characters typed (or correct characters as per standard).
 * @param {number} params.elapsedSeconds - Number of seconds elapsed since test started.
 * @returns {number} Round WPM value.
 */
export function calculateWpm({ typedCharacters = 0, elapsedSeconds = 0 }) {
  if (elapsedSeconds <= 0 || typedCharacters <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  const words = typedCharacters / 5;
  const wpm = words / minutes;
  return Math.round(wpm);
}
