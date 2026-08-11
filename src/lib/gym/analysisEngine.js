import { KEY_FINGER_MAP } from "./gymData";

/**
 * Deterministic analysis engine that evaluates typing history to construct
 * a personalized typing profile, character-level error rates, and evidence-based recommendations.
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
      recommendations: [
        {
          type: "weak-keys",
          title: "O, P & R Key Workout",
          reason: "Complete a few typing tests to unlock personalized weak-key insights.",
          config: { keys: ["O", "P", "R"] },
          isFallback: true
        },
        {
          type: "finger",
          title: "Left Index Finger Drill",
          reason: "Train precision across R, F, V, T, G, and B key transitions.",
          config: { finger: "Left Index" },
          isFallback: true
        },
        {
          type: "speed",
          title: "15-Second Speed Burst",
          reason: "Build initial cadence and finger coordination.",
          config: { id: "sb-15" },
          isFallback: true
        }
      ],
      speedAccuracyBalance: "no-data",
      hasSufficientData: false
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

  // Aggregate character-level errors and attempts across history
  const keyMap = {}; // key -> { attempts, errors, correct }
  let totalTrackedAttempts = 0;

  history.forEach((record) => {
    if (record.keyStats && typeof record.keyStats === "object") {
      Object.entries(record.keyStats).forEach(([k, stats]) => {
        if (!stats || typeof stats !== "object") return;
        const keyUpper = k.toUpperCase();
        if (!keyMap[keyUpper]) {
          keyMap[keyUpper] = { attempts: 0, errors: 0, correct: 0 };
        }
        const attempts = Math.max(0, Number(stats.attempts) || 0);
        const errors = Math.max(0, Number(stats.errors) || 0);
        const correct = Math.max(0, Number(stats.correct) || 0);

        keyMap[keyUpper].attempts += attempts;
        keyMap[keyUpper].errors += errors;
        keyMap[keyUpper].correct += correct;
        totalTrackedAttempts += attempts;
      });
    }
  });

  // Sample Threshold: Require minimum 5 attempts for a key to qualify for weak-key ranking
  const MIN_ATTEMPTS_THRESHOLD = 5;
  const weakKeys = [];

  Object.entries(keyMap).forEach(([key, stats]) => {
    if (stats.attempts >= MIN_ATTEMPTS_THRESHOLD && stats.errors > 0) {
      const errorRate = stats.errors / stats.attempts;
      const accuracyPct = Math.round(((stats.attempts - stats.errors) / stats.attempts) * 100);
      weakKeys.push({
        key,
        errorRate: Math.round(errorRate * 100) / 100,
        accuracyPct,
        errors: stats.errors,
        attempts: stats.attempts,
        priority: errorRate >= 0.15 ? "high" : errorRate >= 0.08 ? "medium" : "low"
      });
    }
  });

  // Sort weak keys descending by error rate (primary) and error count (secondary)
  weakKeys.sort((a, b) => b.errorRate - a.errorRate || b.errors - a.errors);

  // Aggregate finger performance based on actual attempt & error totals for assigned keys
  const fingerMap = {}; // finger -> { attempts, errors }
  Object.entries(keyMap).forEach(([key, stats]) => {
    const fingerInfo = KEY_FINGER_MAP[key];
    if (fingerInfo && fingerInfo.finger) {
      const finger = fingerInfo.finger;
      if (!fingerMap[finger]) {
        fingerMap[finger] = { attempts: 0, errors: 0 };
      }
      fingerMap[finger].attempts += stats.attempts;
      fingerMap[finger].errors += stats.errors;
    }
  });

  const weakFingers = Object.entries(fingerMap)
    .filter(([_, stats]) => stats.attempts >= MIN_ATTEMPTS_THRESHOLD && stats.errors > 0)
    .map(([finger, stats]) => ({
      finger,
      attempts: stats.attempts,
      errors: stats.errors,
      errorRate: Math.round((stats.errors / stats.attempts) * 100) / 100,
      accuracyPct: Math.round(((stats.attempts - stats.errors) / stats.attempts) * 100)
    }))
    .sort((a, b) => b.errorRate - a.errorRate || b.errors - a.errors);

  const hasSufficientData = totalTrackedAttempts >= 15 && (weakKeys.length > 0 || weakFingers.length > 0);

  // Speed vs Accuracy balance evaluation
  let speedAccuracyBalance = "balanced";
  if (averageWpm >= 50 && averageAccuracy < 92) {
    speedAccuracyBalance = "accuracy-first";
  } else if (averageWpm < 40 && averageAccuracy >= 96) {
    speedAccuracyBalance = "speed-first";
  } else if (averageWpm < 35 && averageAccuracy < 90) {
    speedAccuracyBalance = "build-foundation";
  }

  // Generate top 3 ranked recommendations based on evidence
  const recommendations = [];

  // Recommendation 1: Weak Keys
  if (hasSufficientData && weakKeys.length > 0) {
    const topKeys = weakKeys.slice(0, 3).map((k) => k.key);
    const topKeyObj = weakKeys[0];
    recommendations.push({
      type: "weak-keys",
      title: `${topKeys.join(", ")} Key Training`,
      reason: `Based on your recent typing: Key "${topKeyObj.key}" has an error rate of ${Math.round(topKeyObj.errorRate * 100)}% across ${topKeyObj.attempts} attempts.`,
      config: { keys: topKeys },
      isFallback: false
    });
  } else {
    recommendations.push({
      type: "weak-keys",
      title: "O, P & R Key Workout",
      reason: "Complete a few typing tests to unlock personalized weak-key insights.",
      config: { keys: ["O", "P", "R"] },
      isFallback: true
    });
  }

  // Recommendation 2: Finger Training
  if (hasSufficientData && weakFingers.length > 0) {
    const topFingerObj = weakFingers[0];
    recommendations.push({
      type: "finger",
      title: `${topFingerObj.finger} Conditioning`,
      reason: `Keys controlled by your ${topFingerObj.finger} show a ${Math.round(topFingerObj.errorRate * 100)}% error rate.`,
      config: { finger: topFingerObj.finger },
      isFallback: false
    });
  } else {
    recommendations.push({
      type: "finger",
      title: "Left Index Finger Drill",
      reason: "Train precision across R, F, V, T, G, and B key transitions.",
      config: { finger: "Left Index" },
      isFallback: true
    });
  }

  // Recommendation 3: Speed vs Accuracy
  if (speedAccuracyBalance === "accuracy-first") {
    recommendations.push({
      type: "pair",
      title: "Key Pair Fluency (TH & ER)",
      reason: "Your speed is strong, but focusing on smooth key transitions will boost accuracy.",
      config: { pair: "th" },
      isFallback: false
    });
  } else if (speedAccuracyBalance === "speed-first") {
    recommendations.push({
      type: "speed",
      title: "15-Second Speed Burst",
      reason: "Your accuracy is excellent! Use short sprints to push your maximum WPM cadence.",
      config: { id: "sb-15" },
      isFallback: false
    });
  } else {
    recommendations.push({
      type: "pair",
      title: "Key Pair Transition (ER)",
      reason: "Mastering common two-letter pairs builds natural typing momentum.",
      config: { pair: "er" },
      isFallback: false
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
    speedAccuracyBalance,
    hasSufficientData
  };
}
