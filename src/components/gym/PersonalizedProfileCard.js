"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { getHistory, clearHistory } from "@/lib/gym/typingHistoryStorage";
import { analyzeTypingHistory } from "@/lib/gym/analysisEngine";
import { getGoals, saveGoals } from "@/lib/gym/goalsStorage";
import { evaluateProgress } from "@/lib/gym/progressEngine";

const emptySubscribe = () => () => {};

export default function PersonalizedProfileCard({ onStartRecommendedPractice }) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Sync external stores for history & goals safely
  const historyJson = useSyncExternalStore(
    emptySubscribe,
    () => (typeof window !== "undefined" ? JSON.stringify(getHistory()) : "[]"),
    () => "[]"
  );

  const goalsJson = useSyncExternalStore(
    emptySubscribe,
    () => (typeof window !== "undefined" ? JSON.stringify(getGoals()) : '{"targetWpm":60,"targetAccuracy":95}'),
    () => '{"targetWpm":60,"targetAccuracy":95}'
  );

  const history = JSON.parse(historyJson);
  const goals = JSON.parse(goalsJson);
  const profile = analyzeTypingHistory(history);
  const progress = evaluateProgress(history, goals);

  const [tempTargetWpm, setTempTargetWpm] = useState(goals.targetWpm);
  const [tempTargetAccuracy, setTempTargetAccuracy] = useState(goals.targetAccuracy);

  const handleClear = () => {
    clearHistory();
    setShowClearConfirm(false);
  };

  const handleSaveGoal = () => {
    saveGoals({ targetWpm: Number(tempTargetWpm), targetAccuracy: Number(tempTargetAccuracy) });
    setShowGoalModal(false);
  };

  // 1. Zero history state
  if (profile.testCount === 0) {
    return (
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem", borderLeft: "4px solid var(--accent-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="icon-badge icon-badge-emerald" style={{ width: "36px", height: "36px" }}>
            <span className="material-icons-outlined">insights</span>
          </span>
          <div>
            <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Build Your Personalized Profile</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: 0 }}>No local history found on this device</p>
          </div>
        </div>
        <p style={{ fontSize: "0.95rem", opacity: 0.85, lineHeight: "1.6rem" }}>
          Complete a typing test to let TypeBrush analyze your keystrokes, track WPM trends, and recommend custom drills.
        </p>
        <div>
          <Link href="/typing-test" className="control-btn primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="material-icons-outlined">speed</span>
            Take a Typing Test
          </Link>
        </div>
      </div>
    );
  }

  // 2. Initial insights state (1-2 tests or insufficient character data)
  if (profile.testCount < 3 || !profile.hasSufficientData) {
    return (
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="icon-badge icon-badge-emerald" style={{ width: "36px", height: "36px" }}>
              <span className="material-icons-outlined">insights</span>
            </span>
            <div>
              <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Your Typing Profile</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: 0 }}>
                {profile.testCount} {profile.testCount === 1 ? "test" : "tests"} completed (Building Character Intelligence)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            style={{ background: "none", border: "none", color: "var(--sub-color)", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }}
          >
            Clear History
          </button>
        </div>

        <div className="result-breakdown-grid">
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase" }}>Average Speed</span>
            <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--accent-color)" }}>{profile.averageWpm} WPM</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase" }}>Average Accuracy</span>
            <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--main-color)" }}>{profile.averageAccuracy}%</div>
          </div>
        </div>

        {profile.recommendations.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", backgroundColor: "var(--surface-color)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>Starter Recommendation</span>
              <h4 style={{ margin: "0.25rem 0 0 0", fontSize: "1rem", color: "var(--accent-color)" }}>{profile.recommendations[0].title}</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8 }}>{profile.recommendations[0].reason}</p>
            </div>
            {onStartRecommendedPractice && (
              <button
                type="button"
                onClick={() => onStartRecommendedPractice(profile.recommendations[0])}
                className="control-btn primary"
                style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}
              >
                Start Practice
              </button>
            )}
          </div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="start-overlay" style={{ padding: "2rem", textAlign: "center" }}>
            <h4 style={{ fontSize: "1.2rem", margin: 0 }}>Clear Typing History?</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, maxWidth: "340px" }}>
              This will permanently delete your locally stored typing test results and reset your profile.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="button" onClick={() => setShowClearConfirm(false)} className="control-btn">
                Cancel
              </button>
              <button type="button" onClick={handleClear} className="control-btn" style={{ backgroundColor: "#ef4444", color: "#ffffff", border: "none" }}>
                Clear History
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. Full evidence-based profile & progress state (3+ tests with sufficient character statistics)
  const topRec = profile.recommendations[0];

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.75rem", borderLeft: "4px solid var(--accent-color)", position: "relative" }}>
      {/* Header & Goal Settings Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="icon-badge icon-badge-emerald" style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}>
            <span className="material-icons-outlined">insights</span>
          </span>
          <div>
            <h3 style={{ fontSize: "1.35rem", margin: 0 }}>Your Typing Profile & Progress</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: 0 }}>
              Based on {profile.testCount} locally completed typing tests
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setShowGoalModal(true)}
            className="control-btn"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.85rem" }}
          >
            <span className="material-icons-outlined" style={{ fontSize: "0.95rem" }}>flag</span>
            Set Goal
          </button>
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            style={{ background: "none", border: "none", color: "var(--sub-color)", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }}
          >
            Clear History
          </button>
        </div>
      </div>

      {/* Metrics & Goal Progress Row */}
      <div className="result-breakdown-grid">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", fontWeight: "600" }}>Average Speed</span>
          <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--accent-color)" }}>{profile.averageWpm} WPM</div>
          {progress.wpmDiff !== 0 && (
            <span style={{ fontSize: "0.75rem", fontWeight: "600", color: progress.wpmDiff > 0 ? "var(--accent-color)" : "#ef4444" }}>
              {progress.wpmDiff > 0 ? `↑ +${progress.wpmDiff}` : `↓ ${progress.wpmDiff}`} WPM recent trend
            </span>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", fontWeight: "600" }}>Average Accuracy</span>
          <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--main-color)" }}>{profile.averageAccuracy}%</div>
          {progress.accuracyDiff !== 0 && (
            <span style={{ fontSize: "0.75rem", fontWeight: "600", color: progress.accuracyDiff > 0 ? "var(--accent-color)" : "#ef4444" }}>
              {progress.accuracyDiff > 0 ? `↑ +${progress.accuracyDiff}%` : `↓ ${progress.accuracyDiff}%`} recent trend
            </span>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", fontWeight: "600" }}>Personal Goal</span>
          <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--main-color)" }}>{goals.targetWpm} WPM</div>
          <span style={{ fontSize: "0.75rem", fontWeight: "600", color: progress.isGoalReached ? "var(--accent-color)" : "var(--sub-color)" }}>
            {progress.isGoalReached ? "🎯 Target Reached!" : `${progress.wpmGap} WPM remaining`}
          </span>
        </div>

        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", fontWeight: "600" }}>Best Speed</span>
          <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--main-color)" }}>{profile.bestWpm} WPM</div>
        </div>
      </div>

      {/* Weakness Progress Tracker */}
      {profile.weakKeys.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
          <h4 style={{ fontSize: "0.95rem", color: "var(--main-color)", margin: 0 }}>Verified Weak Key Precision</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {profile.weakKeys.map((item) => (
              <div
                key={item.key}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", borderRadius: "8px", backgroundColor: "var(--surface-color)", border: "1px solid var(--border-color)", fontSize: "0.85rem" }}
              >
                <strong style={{ color: "var(--accent-color)" }}>Key &quot;{item.key}&quot;</strong>
                <span style={{ color: "var(--sub-color)" }}>•</span>
                <span>{item.accuracyPct}% Acc ({item.attempts} attempts)</span>
                <span style={{ color: "var(--sub-color)" }}>•</span>
                <span style={{ color: item.errorRate <= 0.08 ? "var(--accent-color)" : "#ef4444", fontWeight: "600" }}>
                  {item.errorRate <= 0.08 ? "✓ Improving" : "Needs Practice"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Primary Opportunity Banner */}
      {topRec && (
        <div style={{ backgroundColor: "var(--surface-color)", border: "1px solid var(--border-color)", padding: "1.25rem", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ maxWidth: "520px" }}>
            <span className="hero-pill" style={{ marginBottom: "0.4rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem" }}>
              {topRec.isFallback ? "Starter Recommendation" : "Evidence-Based Recommendation"}
            </span>
            <h4 style={{ fontSize: "1.15rem", margin: "0.25rem 0", color: "var(--accent-color)" }}>{topRec.title}</h4>
            <p style={{ fontSize: "0.85rem", opacity: 0.8, margin: 0, lineHeight: "1.4rem" }}>{topRec.reason}</p>
          </div>

          {onStartRecommendedPractice && (
            <button
              type="button"
              onClick={() => onStartRecommendedPractice(topRec)}
              className="control-btn primary"
              style={{ padding: "0.75rem 1.75rem", fontSize: "0.95rem" }}
            >
              <span className="material-icons-outlined">play_arrow</span>
              Practice My Mistakes
            </button>
          )}
        </div>
      )}

      {/* Set Goal Modal Dialog */}
      {showGoalModal && (
        <div className="start-overlay" style={{ padding: "2rem", textAlign: "center" }}>
          <h4 style={{ fontSize: "1.25rem", margin: 0 }}>Set Your Personal Typing Goal</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: "0.25rem 0 1rem 0" }}>
            Target WPM and accuracy goals will adjust your personalized progress tracking.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px", margin: "0 auto", textAlign: "left" }}>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Target Speed (WPM)</label>
              <select
                value={tempTargetWpm}
                onChange={(e) => setTempTargetWpm(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--surface-color)", color: "var(--main-color)" }}
              >
                <option value={40}>40 WPM (Casual)</option>
                <option value={50}>50 WPM (Fluent)</option>
                <option value={60}>60 WPM (Proficient)</option>
                <option value={70}>70 WPM (Fast)</option>
                <option value={80}>80 WPM (Master)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Target Accuracy (%)</label>
              <select
                value={tempTargetAccuracy}
                onChange={(e) => setTempTargetAccuracy(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--surface-color)", color: "var(--main-color)" }}
              >
                <option value={90}>90% Accuracy</option>
                <option value={95}>95% Accuracy (Recommended)</option>
                <option value={97}>97% Accuracy (High Precision)</option>
                <option value={99}>99% Accuracy (Mastery)</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem", justifyContent: "center" }}>
            <button type="button" onClick={() => setShowGoalModal(false)} className="control-btn">
              Cancel
            </button>
            <button type="button" onClick={handleSaveGoal} className="control-btn primary">
              Save Goal
            </button>
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal Overlay */}
      {showClearConfirm && (
        <div className="start-overlay" style={{ padding: "2rem", textAlign: "center" }}>
          <h4 style={{ fontSize: "1.2rem", margin: 0 }}>Clear Typing History?</h4>
          <p style={{ fontSize: "0.9rem", opacity: 0.8, maxWidth: "340px" }}>
            This will permanently delete your locally stored typing test results and reset your profile.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="button" onClick={() => setShowClearConfirm(false)} className="control-btn">
              Cancel
            </button>
            <button type="button" onClick={handleClear} className="control-btn" style={{ backgroundColor: "#ef4444", color: "#ffffff", border: "none" }}>
              Clear History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
