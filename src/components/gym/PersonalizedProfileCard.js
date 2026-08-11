"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { getHistory, clearHistory } from "@/lib/gym/typingHistoryStorage";
import { analyzeTypingHistory } from "@/lib/gym/analysisEngine";

const emptySubscribe = () => () => {};

export default function PersonalizedProfileCard({ onStartRecommendedPractice }) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const historyJson = useSyncExternalStore(
    emptySubscribe,
    () => (typeof window !== "undefined" ? JSON.stringify(getHistory()) : "[]"),
    () => "[]"
  );

  const history = JSON.parse(historyJson);
  const profile = analyzeTypingHistory(history);

  const handleClear = () => {
    clearHistory();
    setShowClearConfirm(false);
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
          Complete a typing test to let TypeBrush identify your weak keys, accuracy friction, and recommend custom drills.
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

  // 2. Initial insights state (1-2 tests)
  if (profile.testCount < 3) {
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
                {profile.testCount} {profile.testCount === 1 ? "test" : "tests"} completed (Early Insights)
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
              <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--accent-color)" }}>Recommended Workout: {profile.recommendations[0].title}</h4>
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

  // 3. Full personalized profile state (3+ tests)
  const topRec = profile.recommendations[0];

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.75rem", borderLeft: "4px solid var(--accent-color)", position: "relative" }}>
      {/* Header & Clear Option */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="icon-badge icon-badge-emerald" style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}>
            <span className="material-icons-outlined">insights</span>
          </span>
          <div>
            <h3 style={{ fontSize: "1.35rem", margin: 0 }}>Your Typing Profile</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: 0 }}>
              Based on {profile.testCount} locally completed typing tests
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

      {/* Metrics Row */}
      <div className="result-breakdown-grid">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", fontWeight: "600" }}>Average Speed</span>
          <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--accent-color)" }}>{profile.averageWpm} WPM</div>
          {profile.wpmTrend !== 0 && (
            <span style={{ fontSize: "0.75rem", fontWeight: "600", color: profile.wpmTrend > 0 ? "var(--accent-color)" : "#ef4444" }}>
              {profile.wpmTrend > 0 ? `↑ +${profile.wpmTrend}` : `↓ ${profile.wpmTrend}`} WPM recently
            </span>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", fontWeight: "600" }}>Average Accuracy</span>
          <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--main-color)" }}>{profile.averageAccuracy}%</div>
          {profile.accuracyTrend !== 0 && (
            <span style={{ fontSize: "0.75rem", fontWeight: "600", color: profile.accuracyTrend > 0 ? "var(--accent-color)" : "#ef4444" }}>
              {profile.accuracyTrend > 0 ? `↑ +${profile.accuracyTrend}%` : `↓ ${profile.accuracyTrend}%`} recently
            </span>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", fontWeight: "600" }}>Best Speed</span>
          <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--main-color)" }}>{profile.bestWpm} WPM</div>
        </div>

        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--sub-color)", textTransform: "uppercase", fontWeight: "600" }}>Best Accuracy</span>
          <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--main-color)" }}>{profile.bestAccuracy}%</div>
        </div>
      </div>

      {/* Primary Opportunity Banner */}
      {topRec && (
        <div style={{ backgroundColor: "var(--surface-color)", border: "1px solid var(--border-color)", padding: "1.25rem", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ maxWidth: "520px" }}>
            <span className="hero-pill" style={{ marginBottom: "0.4rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem" }}>
              Primary Practice Opportunity
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

      {/* Ranked Recommendations List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h4 style={{ fontSize: "1rem", color: "var(--main-color)", margin: 0 }}>Top Recommended Workouts</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {profile.recommendations.map((rec, index) => (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", border: "1px solid var(--border-color)", borderRadius: "8px", flexWrap: "wrap", gap: "0.5rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--accent-sec)", color: "var(--accent-color)", fontWeight: "700", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyCenter: "center" }}>
                  {index + 1}
                </span>
                <div>
                  <h5 style={{ margin: 0, fontSize: "0.95rem" }}>{rec.title}</h5>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--sub-color)" }}>{rec.reason}</p>
                </div>
              </div>

              {onStartRecommendedPractice && (
                <button
                  type="button"
                  onClick={() => onStartRecommendedPractice(rec)}
                  className="control-btn"
                  style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }}
                >
                  Start
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

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
