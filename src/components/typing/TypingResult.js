"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import RestartButton from "./RestartButton";
import ScorecardDialog from "@/components/scorecard/ScorecardDialog";
import ShareDialog from "@/components/sharing/ShareDialog";
import { buildShareContent } from "@/lib/sharing/buildShareContent";
import { saveResult, getHistory } from "@/lib/gym/typingHistoryStorage";
import { analyzeTypingHistory } from "@/lib/gym/analysisEngine";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  keyStats = {},
  mistakePairs = {},
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
      testName,
      keyStats,
      mistakePairs
    });
  }, [wpm, accuracy, errors, correctChars, duration, testName, keyStats, mistakePairs]);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
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
          Test Complete
        </Typography>
        <Typography component="p" sx={{ color: "var(--sub-color)", textAlign: "center", margin: 0 }}>
          Here is your performance summary
        </Typography>
      </Box>

      <Box
        className="results-container"
        sx={{
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto"
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
          sx={{
            textAlign: "center",
            alignItems: "center"
          }}
        >
          <span
            className="material-icons-outlined"
            style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}
          >
            track_changes
          </span>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>
            Accuracy
          </span>
          <div className="accuracy-large">{accuracy}%</div>
        </Box>
      </Box>

      <Box className="result-card result-breakdown-grid" sx={{ marginTop: "1rem" }}>
        <Box>
          <Typography
            component="p"
            sx={{
              color: "var(--sub-color)",
              fontSize: "1.05rem",
              marginBottom: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              margin: 0
            }}
          >
            <span className="material-icons-outlined" style={{ fontSize: "1.35rem", color: "#ef4444" }}>
              error_outline
            </span>
            Errors
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: "1.25rem", fontWeight: "bold", color: "#ef4444", margin: 0 }}
          >
            {errors}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="p"
            sx={{
              color: "var(--sub-color)",
              fontSize: "1.05rem",
              marginBottom: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              margin: 0
            }}
          >
            <span className="material-icons-outlined" style={{ fontSize: "1.35rem", color: "var(--accent-color)" }}>
              keyboard
            </span>
            Characters Typed
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}
          >
            {correctChars + incorrectChars}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="p"
            sx={{
              color: "var(--sub-color)",
              fontSize: "1.05rem",
              marginBottom: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              margin: 0
            }}
          >
            <span className="material-icons-outlined" style={{ fontSize: "1.35rem", color: "var(--accent-color)" }}>
              timer
            </span>
            Time Elapsed
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}
          >
            {duration}s
          </Typography>
        </Box>
        <Box>
          <Typography
            component="p"
            sx={{
              color: "var(--sub-color)",
              fontSize: "1.05rem",
              marginBottom: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              margin: 0
            }}
          >
            <span className="material-icons-outlined" style={{
              fontSize: "1.35rem",
              color: "var(--accent-color)"
            }}>
              check_circle_outline
            </span>
            Correct Characters
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--main-color)", margin: 0 }}
          >
            {correctChars}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          marginTop: "1rem",
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
            href="/typing-gym"
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
    </Box>
  );
}
