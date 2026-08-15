"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getHistory, clearHistory } from "@/lib/gym/typingHistoryStorage";
import { analyzeTypingHistory } from "@/lib/gym/analysisEngine";
import { getGoals, saveGoals } from "@/lib/gym/goalsStorage";
import { evaluateProgress } from "@/lib/gym/progressEngine";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const emptySubscribe = () => () => {};

export default function PersonalizedProfileCard({ onStartRecommendedPractice }) {
  const [mounted, setMounted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Async state for history & goals
  const [history, setHistory] = useState([]);
  const [goals, setGoals] = useState({ targetWpm: 60, targetAccuracy: 95 });

  useEffect(() => {
    let isCurrent = true;
    async function loadData() {
      try {
        const hist = await getHistory();
        const gls = getGoals();
        if (isCurrent) {
          setHistory(hist);
          setGoals(gls);
        }
      } catch (err) {
        console.warn("PersonalizedProfileCard: Failed to load data", err);
      }
    }
    loadData();
    return () => {
      isCurrent = false;
    };
  }, []);

  const historyJson = JSON.stringify(history);
  const goalsJson = JSON.stringify(goals);

  const profile = analyzeTypingHistory(history);
  const progress = evaluateProgress(history, goals);

  const [tempTargetWpm, setTempTargetWpm] = useState(60);
  const [tempTargetAccuracy, setTempTargetAccuracy] = useState(95);

  const handleOpenGoalModal = () => {
    if (goals) {
      setTempTargetWpm(goals.targetWpm || 60);
      setTempTargetAccuracy(goals.targetAccuracy || 95);
    }
    setShowGoalModal(true);
  };

  const handleClear = () => {
    clearHistory();
    setShowClearConfirm(false);
  };

  const handleSaveGoal = () => {
    saveGoals({ targetWpm: Number(tempTargetWpm), targetAccuracy: Number(tempTargetAccuracy) });
    setShowGoalModal(false);
  };

  // 1. Zero history state
  if (!mounted || profile.testCount === 0) {
    return (
      <Box
        className="card"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          borderLeft: "4px solid var(--accent-color)"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Box
            component="span"
            className="icon-badge icon-badge-emerald"
            sx={{ width: "36px", height: "36px" }}
          >
            <span className="material-icons-outlined">insights</span>
          </Box>
          <Box>
            <Typography component="h3" sx={{ fontSize: "1.25rem", margin: 0, fontWeight: "600" }}>
              Build Your Personalized Profile
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: 0 }}>
              No local history found on this device
            </Typography>
          </Box>
        </Box>
        <Typography
          component="p"
          sx={{ fontSize: "0.95rem", opacity: 0.85, lineHeight: "1.6rem", margin: 0 }}
        >
          Complete a typing test to let TypeBrush analyze your keystrokes, track WPM trends, and recommend custom drills.
        </Typography>
        <Box>
          <Link
            href="/typing-test"
            className="control-btn primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span className="material-icons-outlined">speed</span>
            Take a Typing Test
          </Link>
        </Box>
      </Box>
    );
  }

  // 2. Initial insights state (1-2 tests or insufficient character data)
  if (profile.testCount < 3 || !profile.hasSufficientData) {
    return (
      <Box className="card" sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Box
              component="span"
              className="icon-badge icon-badge-emerald"
              sx={{ width: "36px", height: "36px" }}
            >
              <span className="material-icons-outlined">insights</span>
            </Box>
            <Box>
              <Typography component="h3" sx={{ fontSize: "1.25rem", margin: 0, fontWeight: "600" }}>
                Your Typing Profile
              </Typography>
              <Typography component="p" sx={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: 0 }}>
                {profile.testCount} {profile.testCount === 1 ? "test" : "tests"} completed (Building Character
                Intelligence)
              </Typography>
            </Box>
          </Box>

          <Box
            component="button"
            type="button"
            onClick={() => setShowClearConfirm(true)}
            sx={{
              background: "none",
              border: "none",
              color: "var(--sub-color)",
              fontSize: "0.8rem",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            Clear History
          </Box>
        </Box>

        <Box className="result-breakdown-grid">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              component="span"
              sx={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", display: "block" }}
            >
              Average Speed
            </Typography>
            <Box sx={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--accent-color)" }}>
              {profile.averageWpm} WPM
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              component="span"
              sx={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", display: "block" }}
            >
              Average Accuracy
            </Typography>
            <Box sx={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--main-color)" }}>
              {profile.averageAccuracy}%
            </Box>
          </Box>
        </Box>

        {profile.recommendations.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              backgroundColor: "var(--surface-color)",
              padding: "1rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)"
            }}
          >
            <Box>
              <Typography
                component="span"
                sx={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  color: "var(--sub-color)",
                  fontWeight: "600",
                  display: "block"
                }}
              >
                Starter Recommendation
              </Typography>
              <Typography
                component="h4"
                sx={{ margin: "0.25rem 0 0 0", fontSize: "1rem", color: "var(--accent-color)", fontWeight: "600" }}
              >
                {profile.recommendations[0].title}
              </Typography>
              <Typography component="p" sx={{ margin: 0, fontSize: "0.85rem", opacity: 0.8 }}>
                {profile.recommendations[0].reason}
              </Typography>
            </Box>
            {onStartRecommendedPractice && (
              <Box
                component="button"
                type="button"
                onClick={() => onStartRecommendedPractice(profile.recommendations[0])}
                className="control-btn primary"
                sx={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}
              >
                Start Practice
              </Box>
            )}
          </Box>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <Box className="start-overlay" sx={{ padding: "2rem", textAlign: "center" }}>
            <Typography component="h4" sx={{ fontSize: "1.2rem", margin: 0, fontWeight: "600" }}>
              Clear Typing History?
            </Typography>
            <Typography
              component="p"
              sx={{ fontSize: "0.9rem", opacity: 0.8, maxWidth: "340px", margin: "0.5rem auto 1rem auto" }}
            >
              This will permanently delete your locally stored typing test results and reset your profile.
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button type="button" onClick={() => setShowClearConfirm(false)} className="control-btn">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="control-btn"
                style={{ backgroundColor: "#ef4444", color: "#ffffff", border: "none" }}
              >
                Clear History
              </button>
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  // 3. Full evidence-based profile & progress state (3+ tests with sufficient character statistics)
  const topRec = profile.recommendations[0];

  return (
    <Box
      className="card"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
        borderLeft: "4px solid var(--accent-color)",
        position: "relative"
      }}
    >
      {/* Header & Goal Settings Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Box
            component="span"
            className="icon-badge icon-badge-emerald"
            sx={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
          >
            <span className="material-icons-outlined">insights</span>
          </Box>
          <Box>
            <Typography component="h3" sx={{ fontSize: "1.35rem", margin: 0, fontWeight: "600" }}>
              Your Typing Profile & Progress
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: 0 }}>
              Based on {profile.testCount} locally completed typing tests
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Box
            component="button"
            type="button"
            onClick={handleOpenGoalModal}
            className="control-btn"
            sx={{ fontSize: "0.8rem", padding: "0.4rem 0.85rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
          >
            <span className="material-icons-outlined" style={{ fontSize: "0.95rem" }}>
              flag
            </span>
            Set Goal
          </Box>
          <Box
            component="button"
            type="button"
            onClick={() => setShowClearConfirm(true)}
            sx={{
              background: "none",
              border: "none",
              color: "var(--sub-color)",
              fontSize: "0.8rem",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            Clear History
          </Box>
        </Box>
      </Box>

      {/* Metrics & Goal Progress Row */}
      <Box className="result-breakdown-grid">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="span"
            sx={{
              fontSize: "0.8rem",
              color: "var(--sub-color)",
              textTransform: "uppercase",
              fontWeight: "600",
              display: "block"
            }}
          >
            Average Speed
          </Typography>
          <Box sx={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--accent-color)" }}>
            {profile.averageWpm} WPM
          </Box>
          {progress.wpmDiff !== 0 && (
            <Typography
              component="span"
              sx={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: progress.wpmDiff > 0 ? "var(--accent-color)" : "#ef4444",
                display: "block"
              }}
            >
              {progress.wpmDiff > 0 ? `↑ +${progress.wpmDiff}` : `↓ ${progress.wpmDiff}`} WPM recent trend
            </Typography>
          )}
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="span"
            sx={{
              fontSize: "0.8rem",
              color: "var(--sub-color)",
              textTransform: "uppercase",
              fontWeight: "600",
              display: "block"
            }}
          >
            Average Accuracy
          </Typography>
          <Box sx={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--main-color)" }}>
            {profile.averageAccuracy}%
          </Box>
          {progress.accuracyDiff !== 0 && (
            <Typography
              component="span"
              sx={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: progress.accuracyDiff > 0 ? "var(--accent-color)" : "#ef4444",
                display: "block"
              }}
            >
              {progress.accuracyDiff > 0 ? `↑ +${progress.accuracyDiff}%` : `↓ ${progress.accuracyDiff}%`}{" "}
              recent trend
            </Typography>
          )}
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="span"
            sx={{
              fontSize: "0.8rem",
              color: "var(--sub-color)",
              textTransform: "uppercase",
              fontWeight: "600",
              display: "block"
            }}
          >
            Personal Goal
          </Typography>
          <Box sx={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--main-color)" }}>
            {goals.targetWpm} WPM
          </Box>
          <Typography
            component="span"
            sx={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: progress.isGoalReached ? "var(--accent-color)" : "var(--sub-color)",
              display: "block"
            }}
          >
            {progress.isGoalReached ? "🎯 Target Reached!" : `${progress.wpmGap} WPM remaining`}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="span"
            sx={{
              fontSize: "0.8rem",
              color: "var(--sub-color)",
              textTransform: "uppercase",
              fontWeight: "600",
              display: "block"
            }}
          >
            Best Speed
          </Typography>
          <Box sx={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--main-color)" }}>
            {profile.bestWpm} WPM
          </Box>
        </Box>
      </Box>

      {/* Weakness Progress Tracker */}
      {profile.weakKeys.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            borderTop: "1px solid var(--border-color)",
            paddingTop: "1rem"
          }}
        >
          <Typography
            component="h4"
            sx={{ fontSize: "0.95rem", color: "var(--main-color)", margin: 0, fontWeight: "600" }}
          >
            Verified Weak Key Precision
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {profile.weakKeys.map((item) => (
              <Box
                key={item.key}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "8px",
                  backgroundColor: "var(--surface-color)",
                  border: "1px solid var(--border-color)",
                  fontSize: "0.85rem"
                }}
              >
                <strong style={{ color: "var(--accent-color)" }}>Key &quot;{item.key}&quot;</strong>
                <span style={{ color: "var(--sub-color)" }}>•</span>
                <span>
                  {item.accuracyPct}% Acc ({item.attempts} attempts)
                </span>
                <span style={{ color: "var(--sub-color)" }}>•</span>
                <span style={{ color: item.errorRate <= 0.08 ? "var(--accent-color)" : "#ef4444", fontWeight: "600" }}>
                  {item.errorRate <= 0.08 ? "✓ Improving" : "Needs Practice"}
                </span>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Primary Opportunity Banner */}
      {topRec && (
        <Box
          sx={{
            backgroundColor: "var(--surface-color)",
            border: "1px solid var(--border-color)",
            padding: "1.25rem",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <Box sx={{ maxWidth: "520px" }}>
            <span
              className="hero-pill"
              style={{ marginBottom: "0.4rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem" }}
            >
              {topRec.isFallback ? "Starter Recommendation" : "Evidence-Based Recommendation"}
            </span>
            <Typography
              component="h4"
              sx={{ fontSize: "1.15rem", margin: "0.25rem 0", color: "var(--accent-color)", fontWeight: "600" }}
            >
              {topRec.title}
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.85rem", opacity: 0.8, margin: 0, lineHeight: "1.4rem" }}>
              {topRec.reason}
            </Typography>
          </Box>

          {onStartRecommendedPractice && (
            <Box
              component="button"
              type="button"
              onClick={() => onStartRecommendedPractice(topRec)}
              className="control-btn primary"
              sx={{
                padding: "0.75rem 1.75rem",
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              <span className="material-icons-outlined">play_arrow</span>
              Practice My Mistakes
            </Box>
          )}
        </Box>
      )}

      {/* Set Goal Modal Dialog */}
      {showGoalModal && (
        <Box className="start-overlay" sx={{ padding: "2rem", textAlign: "center" }}>
          <Typography component="h4" sx={{ fontSize: "1.25rem", margin: 0, fontWeight: "600" }}>
            Set Your Personal Typing Goal
          </Typography>
          <Typography component="p" sx={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: "0.25rem 0 1rem 0" }}>
            Target WPM and accuracy goals will adjust your personalized progress tracking.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxWidth: "300px",
              margin: "0 auto",
              textAlign: "left"
            }}
          >
            <Box>
              <Typography
                component="label"
                sx={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}
              >
                Target Speed (WPM)
              </Typography>
              <select
                value={tempTargetWpm}
                onChange={(e) => setTempTargetWpm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--surface-color)",
                  color: "var(--main-color)"
                }}
              >
                <option value={40}>40 WPM (Casual)</option>
                <option value={50}>50 WPM (Fluent)</option>
                <option value={60}>60 WPM (Proficient)</option>
                <option value={70}>70 WPM (Fast)</option>
                <option value={80}>80 WPM (Master)</option>
              </select>
            </Box>
            <Box>
              <Typography
                component="label"
                sx={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}
              >
                Target Accuracy (%)
              </Typography>
              <select
                value={tempTargetAccuracy}
                onChange={(e) => setTempTargetAccuracy(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--surface-color)",
                  color: "var(--main-color)"
                }}
              >
                <option value={90}>90% Accuracy</option>
                <option value={95}>95% Accuracy (Recommended)</option>
                <option value={97}>97% Accuracy (High Precision)</option>
                <option value={99}>99% Accuracy (Mastery)</option>
              </select>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "1rem", marginTop: "1.25rem", justifyContent: "center" }}>
            <button type="button" onClick={() => setShowGoalModal(false)} className="control-btn">
              Cancel
            </button>
            <button type="button" onClick={handleSaveGoal} className="control-btn primary">
              Save Goal
            </button>
          </Box>
        </Box>
      )}

      {/* Clear Confirmation Modal Overlay */}
      {showClearConfirm && (
        <Box className="start-overlay" sx={{ padding: "2rem", textAlign: "center" }}>
          <Typography component="h4" sx={{ fontSize: "1.2rem", margin: 0, fontWeight: "600" }}>
            Clear Typing History?
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: "0.9rem", opacity: 0.8, maxWidth: "340px", margin: "0.5rem auto 1rem auto" }}
          >
            This will permanently delete your locally stored typing test results and reset your profile.
          </Typography>
          <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button type="button" onClick={() => setShowClearConfirm(false)} className="control-btn">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="control-btn"
              style={{ backgroundColor: "#ef4444", color: "#ffffff", border: "none" }}
            >
              Clear History
            </button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
