"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import RestartButton from "./RestartButton";
import ScorecardDialog from "@/components/scorecard/ScorecardDialog";
import ShareDialog from "@/components/sharing/ShareDialog";
import { buildShareContent } from "@/lib/sharing/buildShareContent";
import { saveResult, getHistory } from "@/lib/gym/typingHistoryStorage";
import { analyzeTypingHistory } from "@/lib/gym/analysisEngine";

const emptySubscribe = () => () => {};

export default function TypingResult({
  wpm = 0,
  accuracy = 100,
  errors = 0,
  correctChars = 0,
  incorrectChars = 0,
  duration = 0,
  testName = "Typing Test",
  canonicalPath = "/typing-test",
  onRestart
}) {
  const [isScorecardOpen, setIsScorecardOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Save result on mount as a side-effect to local storage
  useEffect(() => {
    saveResult({
      wpm,
      accuracy,
      errors,
      correctChars,
      duration,
      testName
    });
  }, [wpm, accuracy, errors, correctChars, duration, testName]);

  // Read history snapshot safely via useSyncExternalStore
  const historyJson = useSyncExternalStore(
    emptySubscribe,
    () => (typeof window !== "undefined" ? JSON.stringify(getHistory()) : "[]"),
    () => "[]"
  );

  const history = JSON.parse(historyJson);
  const profile = analyzeTypingHistory(history);
  const weakKeysRecommendation = profile.recommendations?.[0] || null;

  const shareContent = buildShareContent({
    wpm,
    accuracy,
    errors,
    testName,
    canonicalPath
  });

  const handleShareClick = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.15rem", textAlign: "center" }}>
          Test Complete
        </h2>
        <p style={{ color: "var(--sub-color)", textAlign: "center" }}>Here is your performance summary</p>
      </div>

      <div className="results-container" style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}>
        <div className="result-card" style={{ textAlign: "center", alignItems: "center" }}>
          <span className="material-icons-outlined" style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}>speed</span>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>Speed</span>
          <div className="wpm-large">
            {wpm} <span style={{ fontSize: "1.2rem", fontWeight: "normal" }}>WPM</span>
          </div>
        </div>

        <div className="result-card" style={{ textAlign: "center", alignItems: "center" }}>
          <span className="material-icons-outlined" style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}>track_changes</span>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>Accuracy</span>
          <div className="accuracy-large">{accuracy}%</div>
        </div>
      </div>

      <div className="result-card result-breakdown-grid" style={{ marginTop: "1rem" }}>
        <div>
          <p style={{ color: "var(--sub-color)", fontSize: "1.05rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span className="material-icons-outlined" style={{ fontSize: "1.35rem", color: "#ef4444" }}>error_outline</span>
            Errors
          </p>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#ef4444" }}>{errors}</p>
        </div>
        <div>
          <p style={{ color: "var(--sub-color)", fontSize: "1.05rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span className="material-icons-outlined" style={{ fontSize: "1.35rem", color: "var(--accent-color)" }}>keyboard</span>
            Characters Typed
          </p>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--main-color)" }}>{correctChars + incorrectChars}</p>
        </div>
        <div>
          <p style={{ color: "var(--sub-color)", fontSize: "1.05rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span className="material-icons-outlined" style={{ fontSize: "1.35rem", color: "var(--accent-color)" }}>timer</span>
            Time Elapsed
          </p>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--main-color)" }}>{duration}s</p>
        </div>
        <div>
          <p style={{ color: "var(--sub-color)", fontSize: "1.05rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span className="material-icons-outlined" style={{ fontSize: "1.35rem", color: "var(--accent-color)" }}>check_circle_outline</span>
            Correct Characters
          </p>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--main-color)" }}>{correctChars}</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
        <button
          onClick={() => setIsScorecardOpen(true)}
          className="control-btn"
          style={{ fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          aria-label="Download typing test scorecard"
        >
          <span className="material-icons-outlined">file_download</span>
          Download Scorecard
        </button>

        <button
          onClick={handleShareClick}
          className="control-btn"
          style={{ fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          aria-label="Share typing test result"
        >
          <span className="material-icons-outlined">share</span>
          Share Result
        </button>

        <RestartButton onRestart={onRestart} />
      </div>

      {/* Personalized Practice Recommendation Box */}
      {weakKeysRecommendation && (
        <div style={{ marginTop: "1.5rem", padding: "1.25rem", border: "1px solid var(--border-color)", borderRadius: "12px", backgroundColor: "var(--surface-color)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ maxWidth: "560px" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--accent-color)", fontWeight: "700", letterSpacing: "0.02em" }}>
              Personalized Practice Recommendation
            </span>
            <h4 style={{ margin: "0.25rem 0", fontSize: "1.05rem", color: "var(--main-color)" }}>
              {weakKeysRecommendation.title}
            </h4>
            <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8, lineHeight: "1.4rem" }}>
              {weakKeysRecommendation.reason}
            </p>
          </div>

          <Link href="/typing-gym" className="control-btn primary" style={{ fontSize: "0.9rem", padding: "0.6rem 1.4rem" }}>
            <span className="material-icons-outlined">fitness_center</span>
            Practice My Mistakes
          </Link>
        </div>
      )}

      <ScorecardDialog
        isOpen={isScorecardOpen}
        onClose={() => setIsScorecardOpen(false)}
        resultData={{
          wpm,
          accuracy,
          errors,
          correctChars,
          incorrectChars,
          duration,
          testName
        }}
      />

      <ShareDialog
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareContent={shareContent}
      />
    </div>
  );
}
