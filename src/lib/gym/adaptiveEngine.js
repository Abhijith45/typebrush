/**
 * Deterministic Adaptive Difficulty Engine.
 * Evaluates recent accuracy and performance to scale training difficulty.
 */

export function getAdaptiveDifficulty(recentAccuracy = 95, recentErrors = 0) {
  if (recentAccuracy >= 97 && recentErrors <= 2) {
    return {
      difficulty: "hard",
      label: "Hard (Phrase & Mixed Context)",
      reason: "High accuracy detected. Advanced phrases will challenge your finger coordination."
    };
  }

  if (recentAccuracy < 92) {
    return {
      difficulty: "easy",
      label: "Easy (Foundational Words)",
      reason: "Focus on foundational key repetition and accuracy before pushing speed."
    };
  }

  return {
    difficulty: "medium",
    label: "Medium (Standard Vocabulary)",
    reason: "Balanced difficulty to maintain steady WPM and high precision."
  };
}
