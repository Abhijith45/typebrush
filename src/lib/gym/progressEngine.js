/**
 * Progress Engine that evaluates trends, weakness resolution, and goal gap.
 */

export function evaluateProgress(history, goals = { targetWpm: 60, targetAccuracy: 95 }) {
  if (!Array.isArray(history) || history.length === 0) {
    return {
      status: "insufficient-data",
      wpmState: "insufficient",
      accuracyState: "insufficient",
      wpmDiff: 0,
      accuracyDiff: 0,
      wpmGap: goals.targetWpm,
      accuracyGap: goals.targetAccuracy,
      isGoalReached: false
    };
  }

  const recent = history.slice(-5);
  const previous = history.length >= 10 ? history.slice(-10, -5) : history.slice(0, Math.max(1, history.length - 5));

  const recentWpm = Math.round(recent.reduce((sum, i) => sum + i.wpm, 0) / recent.length);
  const prevWpm = Math.round(previous.reduce((sum, i) => sum + i.wpm, 0) / previous.length);

  const recentAcc = Math.round((recent.reduce((sum, i) => sum + i.accuracy, 0) / recent.length) * 10) / 10;
  const prevAcc = Math.round((previous.reduce((sum, i) => sum + i.accuracy, 0) / previous.length) * 10) / 10;

  const wpmDiff = recentWpm - prevWpm;
  const accuracyDiff = Math.round((recentAcc - prevAcc) * 10) / 10;

  let wpmState = "stable";
  if (wpmDiff >= 3) wpmState = "improving";
  else if (wpmDiff <= -3) wpmState = "declining";

  let accuracyState = "stable";
  if (accuracyDiff >= 1.5) accuracyState = "improving";
  else if (accuracyDiff <= -1.5) accuracyState = "declining";

  const wpmGap = Math.max(0, goals.targetWpm - recentWpm);
  const isGoalReached = recentWpm >= goals.targetWpm && recentAcc >= goals.targetAccuracy;

  return {
    status: history.length >= 3 ? "sufficient" : "early",
    wpmState,
    accuracyState,
    wpmDiff,
    accuracyDiff,
    recentWpm,
    recentAcc,
    wpmGap,
    isGoalReached
  };
}
