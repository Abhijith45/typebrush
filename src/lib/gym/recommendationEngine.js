import { analyzeTypingHistory } from "./analysisEngine";

/**
 * Custom recommendation engine for TypeBrush Typing Gym.
 * Analyzes past history metrics to recommend targeted Guided Training programs.
 */
export function getGymRecommendation(history) {
  const profile = analyzeTypingHistory(history);
  
  // Case 1: No history exists
  if (!history || history.length === 0 || profile.testCount === 0) {
    return {
      programId: "finger-placement",
      level: 1,
      title: "Finger Placement",
      weakKeys: [],
      difficulty: "easy",
      duration: "3 Minutes",
      reason: "Start here to learn proper finger mapping and home-row positioning for a solid foundation."
    };
  }

  const avgWpm = profile.averageWpm;
  const avgAcc = profile.averageAccuracy;
  const weakKeysList = profile.weakKeys.map(k => k.key);

  // Case 2: Accuracy < 90%
  if (avgAcc < 90) {
    return {
      programId: "accuracy-builder",
      level: 1,
      title: "Accuracy Builder",
      weakKeys: weakKeysList.slice(0, 3),
      difficulty: "easy",
      duration: "3 Minutes",
      reason: `Your average accuracy is ${avgAcc}%, which is below the recommended 90%. Focus on typing cleanly before building speed.`
    };
  }

  // Case 3: Specific weak keys exist
  if (profile.hasSufficientData && weakKeysList.length > 0) {
    const keysToShow = weakKeysList.slice(0, 3);
    return {
      programId: "weak-key-recovery",
      level: 1,
      title: "Weak Key Recovery",
      weakKeys: keysToShow,
      difficulty: "medium",
      duration: "3 Minutes",
      reason: `These keys (${keysToShow.join(", ")}) produced the highest error rate during your recent typing sessions.`
    };
  }

  // Case 4: WPM is low but accuracy is high
  if (avgWpm < 45 && avgAcc >= 93) {
    return {
      programId: "speed-builder",
      level: 1,
      title: "Speed Builder",
      weakKeys: [],
      difficulty: "medium",
      duration: "3 Minutes",
      reason: `Your accuracy is high (${avgAcc}%), but speed can be improved from ${avgWpm} WPM. Train rhythm and burst sprints.`
    };
  }

  // Case 5: Default (Balanced)
  return {
    programId: "accuracy-builder",
    level: 2,
    title: "Accuracy Builder",
    weakKeys: weakKeysList.slice(0, 3),
    difficulty: "medium",
    duration: "3 Minutes",
    reason: "Maintain high precision and focus on clean finger transitions to consolidate muscle memory."
  };
}
