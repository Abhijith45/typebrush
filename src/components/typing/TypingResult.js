"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import RestartButton from "./RestartButton";
import ScorecardDialog from "@/components/scorecard/ScorecardDialog";
import ShareDialog from "@/components/sharing/ShareDialog";
import FeedbackDialog from "@/components/feedback/FeedbackDialog";
import { buildShareContent } from "@/lib/sharing/buildShareContent";
import { saveResult, getHistory } from "@/lib/gym/typingHistoryStorage";
import { analyzeTypingHistory } from "@/lib/gym/analysisEngine";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function TypingResult({
  wpm = 0,
  accuracy = 100,
  rawAccuracy = 100,
  errors = 0,
  correctChars = 0,
  incorrectChars = 0,
  duration = 0,
  totalKeystrokes = 0,
  correctedErrors = 0,
  uncorrectedErrors = 0,
  backspacesUsed = 0,
  testName = "Typing Test",
  canonicalPath = "/typing-test",
  keyStats = {},
  mistakePairs = {},
  onRestart
}) {
  const [isScorecardOpen, setIsScorecardOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackSnackbar, setFeedbackSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Async state for history
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let isCurrent = true;
    async function loadData() {
      try {
        const hist = await getHistory();
        if (isCurrent) setHistory(hist);
      } catch (err) {
        console.warn("TypingResult: Failed to load history", err);
      }
    }
    loadData();
    return () => {
      isCurrent = false;
    };
  }, []);

  // Save result on mount as a side-effect to local storage
  useEffect(() => {
    saveResult({
      wpm,
      accuracy,
      rawAccuracy,
      errors,
      correctChars,
      incorrectChars,
      duration,
      totalKeystrokes,
      correctedErrors,
      uncorrectedErrors,
      backspacesUsed,
      testName,
      keyStats,
      mistakePairs
    });
  }, [wpm, accuracy, rawAccuracy, errors, correctChars, incorrectChars, duration, totalKeystrokes, correctedErrors, uncorrectedErrors, backspacesUsed, testName, keyStats, mistakePairs]);

  // Compute advanced metrics
  const advancedMetrics = useMemo(() => {
    const errorRate = totalKeystrokes > 0 ? (errors / totalKeystrokes) * 100 : 0;
    const correctionRate = totalKeystrokes > 0 ? (correctedErrors / totalKeystrokes) * 100 : 0;
    const typingEfficiency = totalKeystrokes > 0 ? (correctChars / totalKeystrokes) * 100 : 0;
    const consistencyScore = Math.max(0, Math.min(100, Math.round(100 - (errorRate * 1.5) - (correctionRate * 0.5))));

    let difficulty = "Medium";
    if (testName.toLowerCase().includes("number") || testName.toLowerCase().includes("symbol")) {
      difficulty = "Hard";
    } else if (wpm < 30) {
      difficulty = "Easy";
    }

    return {
      errorRate: Math.round(errorRate * 10) / 10,
      correctionRate: Math.round(correctionRate * 10) / 10,
      typingEfficiency: Math.round(typingEfficiency * 10) / 10,
      consistencyScore,
      difficulty
    };
  }, [totalKeystrokes, errors, correctedErrors, correctChars, testName, wpm]);

  // Progress Comparison and Factual Achievements Calculations
  const progressComparison = useMemo(() => {
    if (!history || history.length <= 1) return null;
    const previousRuns = history.filter(h => h.wpm !== wpm || h.accuracy !== accuracy || h.errors !== errors);
    if (previousRuns.length === 0) return null;

    const count = previousRuns.length;
    const avgWpm = previousRuns.reduce((s, r) => s + r.wpm, 0) / count;
    const avgAcc = previousRuns.reduce((s, r) => s + r.accuracy, 0) / count;
    const avgErrors = previousRuns.reduce((s, r) => s + r.errors, 0) / count;

    const wpmDiff = Math.round(wpm - avgWpm);
    const accDiff = Math.round((accuracy - avgAcc) * 10) / 10;
    const errDiff = Math.round(errors - avgErrors);

    return {
      wpmDiff,
      accDiff,
      errDiff,
      hasImprovement: wpmDiff > 0 || accDiff > 0 || errDiff < 0
    };
  }, [history, wpm, accuracy, errors]);

  const achievements = useMemo(() => {
    const list = [];
    if (!history || history.length === 0) return list;
    const previousRuns = history.filter(h => h.wpm !== wpm || h.accuracy !== accuracy || h.errors !== errors);
    if (previousRuns.length > 0) {
      const bestPrevWpm = Math.max(...previousRuns.map(h => h.wpm));
      if (wpm > bestPrevWpm) {
        list.push({ title: "Personal Best!", desc: `You beat your previous high speed of ${bestPrevWpm} WPM.`, icon: "emoji_events", color: "#f59e0b" });
      }
      const avgPrevWpm = previousRuns.reduce((s, r) => s + r.wpm, 0) / previousRuns.length;
      if (wpm >= avgPrevWpm + 5) {
        list.push({ title: "Strong Progress", desc: `Speed is ${Math.round(wpm - avgPrevWpm)} WPM above your average.`, icon: "trending_up", color: "var(--accent-color)" });
      }
    }
    if (accuracy >= 99) {
      list.push({ title: "Great Accuracy", desc: "Superb precision! You typed with near-flawless execution.", icon: "check_circle", color: "#10b981" });
    }
    return list;
  }, [history, wpm, accuracy, errors]);

  const currentSessionWeakKeys = useMemo(() => {
    return Object.entries(keyStats)
      .map(([key, stats]) => {
        const attempts = stats.attempts || 0;
        const errorsCount = stats.errors || 0;
        const errorRate = attempts > 0 ? (errorsCount / attempts) * 100 : 0;
        const impactScore = Math.round(errorsCount * errorRate * 10) / 10;
        return {
          key: key.toUpperCase(),
          attempts,
          errors: errorsCount,
          errorRate: Math.round(errorRate * 10) / 10,
          impactScore
        };
      })
      .filter((k) => k.attempts >= 2 && k.errors > 0)
      .sort((a, b) => b.impactScore - a.impactScore || b.errorRate - a.errorRate);
  }, [keyStats]);



  const profile = useMemo(() => analyzeTypingHistory(history), [history]);
  const weakKeysRecommendation = useMemo(() => profile.recommendations?.[0] || null, [profile]);

  const shareContent = buildShareContent({
    wpm,
    accuracy,
    errors,
    testName,
    canonicalPath
  });

  const handleShareClick = async () => {
    const isMobileDevice = typeof window !== "undefined" &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) || window.innerWidth < 768);

    if (isMobileDevice && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareContent.title,
          text: shareContent.text,
          url: shareContent.url
        });
        return;
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        console.warn("Native Web Share API failed, opening fallback dialog:", err);
      }
    }
    setIsShareOpen(true);
  };

  // Performance Rating Classification
  let performanceLevel = "Beginner Typist";
  if (wpm >= 80) performanceLevel = "Expert Typist";
  else if (wpm >= 61) performanceLevel = "Professional Typist";
  else if (wpm >= 41) performanceLevel = "Advanced Typist";
  else if (wpm >= 21) performanceLevel = "Intermediate Typist";

  // Dynamic Motivational Insight Block
  let motivationalInsight = "Consistent practice will help you build speed and precision. Keep training!";

  const weakKeysList = Object.entries(keyStats)
    .filter(([_, stats]) => {
      const attempts = stats.attempts || 0;
      const errors = stats.errors || 0;
      return attempts > 2 && (errors / attempts) > 0.08;
    })
    .map(([key]) => key.toUpperCase());

  if (accuracy >= 97 && wpm >= 60) {
    motivationalInsight = "Great work! You maintained high speed and high accuracy.";
  } else if (accuracy >= 97 && wpm < 40) {
    motivationalInsight = "Excellent accuracy. Focus on increasing typing speed.";
  } else if (wpm >= 50 && accuracy < 90) {
    motivationalInsight = "Strong speed. Reducing mistakes will improve overall performance.";
  } else if (weakKeysList.length > 0) {
    motivationalInsight = `Most errors occurred on: ${weakKeysList.slice(0, 3).join(", ")}. Practice Weak Key Recovery.`;
  } else if (accuracy < 90) {
    motivationalInsight = "Prioritize accuracy over speed. Slow down to build steady muscle memory.";
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          component="h2"
          sx={{
            fontSize: "2rem",
            color: "var(--accent-color)",
            marginBottom: "0.15rem",
            textAlign: "center",
            fontWeight: "700"
          }}
        >
          Typing Test Completed
        </Typography>
        <Typography component="p" sx={{ color: "var(--sub-color)", textAlign: "center", margin: 0 }}>
          Review your typing performance and identify areas for improvement.
        </Typography>
      </Box>

      {/* Primary Metrics Row */}
      <Box
        className="results-container"
        sx={{
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: "1.5rem"
        }}
      >
        <Box
          className="result-card"
          sx={{
            textAlign: "center",
            alignItems: "center"
          }}
        >
          <span
            className="material-icons-outlined"
            style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}
          >
            speed
          </span>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>
            Speed
          </span>
          <div className="wpm-large">
            {wpm} <span style={{ fontSize: "1.2rem", fontWeight: "normal" }}>WPM</span>
          </div>
        </Box>

        <Box
          className="result-card"
          title="Accuracy of the final output text after corrected backspaces. Formula: Final Correct Characters / Final Typed Characters"
          sx={{
            textAlign: "center",
            alignItems: "center",
            cursor: "help"
          }}
        >
          <span
            className="material-icons-outlined"
            style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}
          >
            track_changes
          </span>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>
            Accuracy (Net)
          </span>
          <div className="accuracy-large">{accuracy}%</div>
        </Box>

        <Box
          className="result-card"
          title="Precision of overall key strokes, including backspaced mistakes. Formula: Correct Keystrokes / Total Keystrokes"
          sx={{
            textAlign: "center",
            alignItems: "center",
            cursor: "help"
          }}
        >
          <span
            className="material-icons-outlined"
            style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}
          >
            fact_check
          </span>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>
            Raw Accuracy
          </span>
          <div className="accuracy-large">{rawAccuracy}%</div>
        </Box>
      </Box>

      {/* Progress Trends & Achievements (only shown if historical comparisons exist) */}
      {progressComparison && (
        <Box
          sx={{
            maxWidth: "900px",
            width: "100%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: achievements.length > 0 ? "1fr 1fr" : "1fr" },
            gap: "1.5rem"
          }}
        >
          {/* Progress Comparison */}
          <Box className="result-card" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1.25rem" }}>
            <Typography component="span" sx={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "700" }}>
              Session Progress Comparison
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
              <Box sx={{ flex: 1, minWidth: "80px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--sub-color)" }}>Speed:</span>
                <div style={{ fontSize: "1.15rem", fontWeight: "bold", color: progressComparison.wpmDiff >= 0 ? "#10b981" : "#ef4444" }}>
                  {progressComparison.wpmDiff >= 0 ? `+${progressComparison.wpmDiff}` : progressComparison.wpmDiff} WPM
                </div>
              </Box>
              <Box sx={{ flex: 1, minWidth: "80px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--sub-color)" }}>Accuracy:</span>
                <div style={{ fontSize: "1.15rem", fontWeight: "bold", color: progressComparison.accDiff >= 0 ? "#10b981" : "#ef4444" }}>
                  {progressComparison.accDiff >= 0 ? `+${progressComparison.accDiff}%` : `${progressComparison.accDiff}%`}
                </div>
              </Box>
              <Box sx={{ flex: 1, minWidth: "80px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--sub-color)" }}>Errors:</span>
                <div style={{ fontSize: "1.15rem", fontWeight: "bold", color: progressComparison.errDiff <= 0 ? "#10b981" : "#ef4444" }}>
                  {progressComparison.errDiff <= 0 ? `${progressComparison.errDiff}` : `+${progressComparison.errDiff}`} mistakes
                </div>
              </Box>
            </Box>
          </Box>

          {/* Achievements list */}
          {achievements.length > 0 && (
            <Box className="result-card" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1.25rem" }}>
              <Typography component="span" sx={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "700" }}>
                Achievements & Badges
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.25rem" }}>
                {achievements.map((ach, idx) => (
                  <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: ach.color }}>
                      {ach.icon}
                    </span>
                    <div style={{ fontSize: "0.8rem", color: "var(--main-color)" }}>
                      <strong>{ach.title}</strong> - {ach.desc}
                    </div>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Weak Key Analysis Grid */}
      <Box sx={{ maxWidth: "900px", width: "100%", margin: "0 auto" }}>
        <Typography component="h3" sx={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--main-color)", marginBottom: "0.75rem" }}>
          Weak Key Diagnostics
        </Typography>
        <Box className="result-card" sx={{ padding: "1.5rem" }}>
          {currentSessionWeakKeys.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
                The following keys fell below the 92% accuracy target during this session and are creating friction in your typing flow.
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: "1rem", marginTop: "0.5rem" }}>
                {currentSessionWeakKeys.slice(0, 3).map((wk) => (
                  <Box
                    key={wk.key}
                    sx={{
                      backgroundColor: "var(--bg-color)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "8px",
                      padding: "1rem",
                      textAlign: "center"
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                        backgroundColor: "var(--surface-color)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "6px",
                        padding: "0.2rem 0.6rem",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "var(--accent-color)",
                        marginBottom: "0.5rem"
                      }}
                    >
                      {wk.key}
                    </Box>
                    <Box sx={{ fontSize: "0.8rem", color: "var(--sub-color)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <span>Errors: <strong>{wk.errors}</strong></span>
                      <span>Error Rate: <strong>{wk.errorRate}%</strong></span>
                      <span>Impact Score: <strong style={{ color: "#ef4444" }}>{wk.impactScore}</strong></span>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span className="material-icons-outlined" style={{ fontSize: "2rem", color: "#10b981" }}>
                check_circle
              </span>
              <Box>
                <Typography component="strong" sx={{ display: "block", color: "var(--main-color)", fontSize: "1rem" }}>
                  Perfect Execution!
                </Typography>
                <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.85rem", margin: 0 }}>
                  No weak keys detected. You maintained excellent precision on all typed characters.
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Performance Classification & Motivational Insight Card */}
      <Box
        className="result-card"
        sx={{
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          borderLeft: "4px solid var(--accent-color)"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <Typography component="span" sx={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "700" }}>
            Performance Level
          </Typography>
          <Box
            sx={{
              backgroundColor: "var(--accent-color)",
              color: "var(--bg-color)",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.85rem",
              fontWeight: "700"
            }}
          >
            {performanceLevel}
          </Box>
        </Box>
        <Typography component="p" sx={{ fontSize: "1.1rem", color: "var(--main-color)", fontWeight: "500", margin: 0 }}>
          {motivationalInsight}
        </Typography>
      </Box>

      {/* Secondary Metrics Breakdown Grid */}
      <Box sx={{ maxWidth: "900px", width: "100%", margin: "0 auto" }}>
        <Typography component="h3" sx={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--main-color)", marginBottom: "0.75rem" }}>
          Detailed Typing Breakdown
        </Typography>
        <Box className="result-card result-breakdown-grid">
          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>keyboard</span>
              Total Keystrokes
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {totalKeystrokes}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>check_circle</span>
              Correct Keystrokes
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {totalKeystrokes - errors}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "#ef4444" }}>error</span>
              Incorrect Keystrokes
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "#ef4444", margin: 0 }}>
              {errors}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>backspace</span>
              Backspaces Used
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {backspacesUsed}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>build</span>
              Corrected Errors
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {correctedErrors}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "#f59e0b" }}>warning</span>
              Uncorrected Errors
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "#f59e0b", margin: 0 }}>
              {uncorrectedErrors}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>text_fields</span>
              Characters Typed
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {correctChars + incorrectChars}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>task_alt</span>
              Correct Characters
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {correctChars}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "#ef4444" }}>cancel</span>
              Incorrect Characters
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "#ef4444", margin: 0 }}>
              {incorrectChars}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>description</span>
              Words Typed
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {Math.round(totalKeystrokes / 5)}
            </Typography>
          </Box>

          <Box>
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>timer</span>
              Time Elapsed
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {duration}s
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Advanced Performance Intelligence Metrics */}
      <Box sx={{ maxWidth: "900px", width: "100%", margin: "0 auto" }}>
        <Typography component="h3" sx={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--main-color)", marginBottom: "0.75rem" }}>
          Performance Intelligence Insights
        </Typography>
        <Box className="result-card result-breakdown-grid">
          <Box title="Typing rhythm regularity index based on mistake penalty values.">
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>bar_chart</span>
              Consistency Score
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--accent-color)", margin: 0 }}>
              {advancedMetrics.consistencyScore}%
            </Typography>
          </Box>

          <Box title="Percentage of key presses directly resulting in correct characters of output text.">
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>electric_bolt</span>
              Typing Efficiency
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {advancedMetrics.typingEfficiency}%
            </Typography>
          </Box>

          <Box title="Keystrokes dedicated to correcting errors relative to total input volume.">
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>construction</span>
              Correction Rate
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {advancedMetrics.correctionRate}%
            </Typography>
          </Box>

          <Box title="Keystroke mistakes relative to total input volume.">
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "#ef4444" }}>analytics</span>
              Error Rate
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "#ef4444", margin: 0 }}>
              {advancedMetrics.errorRate}%
            </Typography>
          </Box>

          <Box title="Difficulty rating determined based on text layout patterns.">
            <Typography component="p" sx={{ color: "var(--sub-color)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
              <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>class</span>
              Session Difficulty
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}>
              {advancedMetrics.difficulty}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Buttons / Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          marginTop: "0.5rem",
          flexWrap: "wrap"
        }}
      >
        <Box
          component="button"
          onClick={() => setIsScorecardOpen(true)}
          className="control-btn"
          sx={{
            fontSize: "0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem"
          }}
          aria-label="Download typing test scorecard"
        >
          <span className="material-icons-outlined">file_download</span>
          Download Scorecard
        </Box>

        <Box
          component="button"
          onClick={handleShareClick}
          className="control-btn"
          sx={{
            fontSize: "0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem"
          }}
          aria-label="Share typing test result"
        >
          <span className="material-icons-outlined">share</span>
          Share Result
        </Box>

        <Box
          component="button"
          onClick={() => setIsFeedbackOpen(true)}
          className="control-btn"
          sx={{
            fontSize: "0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem"
          }}
          aria-label="Submit user feedback"
        >
          <span className="material-icons-outlined">chat</span>
          Feedback
        </Box>

        <RestartButton onRestart={onRestart} />
      </Box>

      {/* Personalized Practice Recommendation Box */}
      {weakKeysRecommendation && (
        <Box
          sx={{
            marginTop: "1.5rem",
            padding: "1.25rem",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            backgroundColor: "var(--surface-color)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <Box sx={{ maxWidth: "560px" }}>
            <Typography
              component="span"
              sx={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                color: "var(--accent-color)",
                fontWeight: "700",
                letterSpacing: "0.02em",
                display: "block"
              }}
            >
              Personalized Practice Recommendation
            </Typography>
            <Typography
              component="h4"
              sx={{ margin: "0.25rem 0", fontSize: "1.05rem", color: "var(--main-color)", fontWeight: "600" }}
            >
              {weakKeysRecommendation.title}
            </Typography>
            <Typography component="p" sx={{ margin: 0, fontSize: "0.85rem", opacity: 0.8, lineHeight: "1.4rem" }}>
              {weakKeysRecommendation.reason}
            </Typography>
          </Box>

          <Link
            href="/typing-gym?mode=personalized"
            className="control-btn primary"
            style={{ fontSize: "0.9rem", padding: "0.6rem 1.4rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
          >
            <span className="material-icons-outlined">fitness_center</span>
            Practice My Mistakes
          </Link>
        </Box>
      )}

      <ScorecardDialog
        isOpen={isScorecardOpen}
        onClose={() => setIsScorecardOpen(false)}
        resultData={{
          wpm,
          accuracy,
          rawAccuracy,
          errors,
          correctChars,
          incorrectChars,
          duration,
          testName,
          performanceLevel,
          weakKeys: weakKeysList.length > 0 ? weakKeysList.slice(0, 3).join(", ") : "None detected",
          recommendation: weakKeysRecommendation?.title || "Focus on speed and accuracy"
        }}
      />

      <ShareDialog
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareContent={shareContent}
      />

      <FeedbackDialog
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSuccess={() => setFeedbackSnackbar({ open: true, message: "Thank you for helping improve TypeBrush!", severity: "success" })}
        onFailure={(msg) => setFeedbackSnackbar({ open: true, message: msg || "Unable to submit feedback. Please try again later.", severity: "error" })}
      />

      <Snackbar
        open={feedbackSnackbar.open}
        autoHideDuration={5000}
        onClose={() => setFeedbackSnackbar({ ...feedbackSnackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setFeedbackSnackbar({ ...feedbackSnackbar, open: false })} severity={feedbackSnackbar.severity} sx={{ width: "100%", borderRadius: "8px" }}>
          {feedbackSnackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
