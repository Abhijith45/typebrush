import { KEY_FINGER_MAP } from "./gymData";

/**
 * Deterministic analysis engine that evaluates typing history to construct
 * a personalized typing profile and ranked practice recommendations.
 */
export function analyzeTypingHistory(history) {
  if (!Array.isArray(history) || history.length === 0) {
    return {
      testCount: 0,
      averageWpm: 0,
      averageAccuracy: 0,
      bestWpm: 0,
      bestAccuracy: 0,
      recentWpm: 0,
      recentAccuracy: 0,
      wpmTrend: 0,
      accuracyTrend: 0,
      weakKeys: [],
      weakFingers: [],
      recommendations: [],
      speedAccuracyBalance: "no-data"
    };
  }

  const testCount = history.length;
  const totalWpm = history.reduce((sum, item) => sum + item.wpm, 0);
  const totalAccuracy = history.reduce((sum, item) => sum + item.accuracy, 0);
  const averageWpm = Math.round(totalWpm / testCount);
  const averageAccuracy = Math.round((totalAccuracy / testCount) * 10) / 10;

  const bestWpm = Math.max(...history.map((item) => item.wpm));
  const bestAccuracy = Math.max(...history.map((item) => item.accuracy));

  // Recent 5 tests trend
  const recentTests = history.slice(-5);
  const recentCount = recentTests.length;
  const recentWpm = Math.round(recentTests.reduce((sum, item) => sum + item.wpm, 0) / recentCount);
  const recentAccuracy = Math.round((recentTests.reduce((sum, item) => sum + item.accuracy, 0) / recentCount) * 10) / 10;

  const wpmTrend = recentWpm - averageWpm;
  const accuracyTrend = Math.round((recentAccuracy - averageAccuracy) * 10) / 10;

  // Aggregate key-level errors and attempts across history
  const keyMap = {}; // key -> { attempts, errors }

  history.forEach((record) => {
    if (record.keyStats && typeof record.keyStats === "object") {
      Object.entries(record.keyStats).forEach(([k, stats]) => {
        const keyUpper = k.toUpperCase();
        if (!keyMap[keyUpper]) {
          keyMap[keyUpper] = { attempts: 0, errors: 0 };
        }
        keyMap[keyUpper].attempts += stats.attempts || 0;
        keyMap[keyUpper].errors += stats.errors || 0;
      });
    }
  });

  // Calculate error rates for keys
  const weakKeys = [];
  Object.entries(keyMap).forEach(([key, stats]) => {
    if (stats.attempts >= 5 && stats.errors > 0) {
      const errorRate = stats.errors / stats.attempts;
      weakKeys.push({
        key,
        errorRate: Math.round(errorRate * 100) / 100,
        errors: stats.errors,
        attempts: stats.attempts,
        priority: errorRate >= 0.15 ? "high" : errorRate >= 0.08 ? "medium" : "low"
      });
    }
  });

  // Sort weak keys descending by error rate and errors
  weakKeys.sort((a, b) => b.errorRate - a.errorRate || b.errors - a.errors);

  // Map weak keys to finger weaknesses
  const fingerErrors = {};
  weakKeys.forEach((item) => {
    const fingerInfo = KEY_FINGER_MAP[item.key];
    if (fingerInfo) {
      const finger = fingerInfo.finger;
      fingerErrors[finger] = (fingerErrors[finger] || 0) + item.errors;
    }
  });

  const weakFingers = Object.entries(fingerErrors)
    .map(([finger, errorCount]) => ({ finger, errorCount }))
    .sort((a, b) => b.errorCount - a.errorCount);

  // Speed vs Accuracy balance evaluation
  let speedAccuracyBalance = "balanced";
  if (averageWpm >= 50 && averageAccuracy < 92) {
    speedAccuracyBalance = "accuracy-first";
  } else if (averageWpm < 40 && averageAccuracy >= 96) {
    speedAccuracyBalance = "speed-first";
  } else if (averageWpm < 35 && averageAccuracy < 90) {
    speedAccuracyBalance = "build-foundation";
  }

  // Generate top 3 ranked recommendations
  const recommendations = [];

  // Recommendation 1: Weak Keys (if weak keys detected)
  if (weakKeys.length > 0) {
    const topKeys = weakKeys.slice(0, 3).map((k) => k.key);
    recommendations.push({
      type: "weak-keys",
      title: `${topKeys.join(", ")} Key Training`,
      reason: `These keys account for a significant portion of your recent typing mistakes.`,
      config: { keys: topKeys }
    });
  } else {
    // Default fallback weak keys recommendation
    recommendations.push({
      type: "weak-keys",
      title: "O, P & R Key Workout",
      reason: "Build accuracy on top-row corner keys commonly prone to hesitation.",
      config: { keys: ["O", "P", "R"] }
    });
  }

  // Recommendation 2: Finger Training (if weak finger detected)
  if (weakFingers.length > 0) {
    const topFinger = weakFingers[0].finger;
    recommendations.push({
      type: "finger",
      title: `${topFinger} Conditioning`,
      reason: `Keys controlled by your ${topFinger} show lower accuracy across tests.`,
      config: { finger: topFinger }
    });
  } else {
    recommendations.push({
      type: "finger",
      title: "Left Index Finger Drill",
      reason: "Train precision across R, F, V, T, G, and B key transitions.",
      config: { finger: "Left Index" }
    });
  }

  // Recommendation 3: Speed or Accuracy specific recommendation
  if (speedAccuracyBalance === "accuracy-first") {
    recommendations.push({
      type: "pair",
      title: "Key Pair Fluency (TH & ER)",
      reason: "Your speed is strong, but focusing on smooth key transitions will boost accuracy.",
      config: { pair: "th" }
    });
  } else if (speedAccuracyBalance === "speed-first") {
    recommendations.push({
      type: "speed",
      title: "15-Second Speed Burst",
      reason: "Your accuracy is excellent! Use short sprints to push your maximum WPM cadence.",
      config: { id: "sb-15" }
    });
  } else {
    recommendations.push({
      type: "pair",
      title: "Key Pair Transition (ER)",
      reason: "Mastering common two-letter pairs builds natural typing momentum.",
      config: { pair: "er" }
    });
  }

  return {
    testCount,
    averageWpm,
    averageAccuracy,
    bestWpm,
    bestAccuracy,
    recentWpm,
    recentAccuracy,
    wpmTrend,
    accuracyTrend,
    weakKeys: weakKeys.slice(0, 5),
    weakFingers: weakFingers.slice(0, 3),
    recommendations: recommendations.slice(0, 3),
    speedAccuracyBalance
  };
}
