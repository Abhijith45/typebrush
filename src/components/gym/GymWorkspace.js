"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";
import { GYM_PROGRAMS } from "@/lib/gym/gymProgramsData";
import { getGymProgress, completeGymLevel } from "@/lib/gym/gymProgressStorage";
import { getGymRecommendation } from "@/lib/gym/recommendationEngine";
import { getHistory } from "@/lib/gym/typingHistoryStorage";
import { WEAK_KEYS_WORDS } from "@/lib/gym/gymData";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import DesktopRequiredDialog from "@/components/common/DesktopRequiredDialog";

export default function GymWorkspace() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const device = useDeviceCapability();
  const [isDesktopRequiredOpen, setIsDesktopRequiredOpen] = useState(false);

  // Defer showing client-only state to prevent hydration mismatches
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // State machine: "LANDING" | "PRACTICING" | "COMPLETED"
  const [sessionState, setSessionState] = useState("LANDING");

  // Async state for typing history & progress
  const [history, setHistory] = useState([]);
  const [progress, setProgress] = useState({
    "finger-placement": 0,
    "weak-key-recovery": 0,
    "accuracy-builder": 0,
    "speed-builder": 0,
    "numbers-symbols": 0
  });

  // Load history & progress asynchronously
  useEffect(() => {
    let isCurrent = true;
    async function loadData() {
      try {
        const hist = await getHistory();
        const prog = await getGymProgress();
        if (isCurrent) {
          setHistory(hist);
          setProgress(prog);
        }
      } catch (err) {
        console.warn("TypeBrush Gym: Error loading data from IndexedDB", err);
      }
    }
    loadData();
    return () => {
      isCurrent = false;
    };
  }, [sessionState]);

  // Read URL params or local state to determine training mode
  const modeParam = searchParams.get("mode");
  const isPersonalizedModeActive = modeParam === "personalized";
  const practiceKeyParam = searchParams.get("practiceKey");
  
  // Selection states
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [activeDifficulty, setActiveDifficulty] = useState("medium");

  // Completed stats from active gym session
  const [completedStats, setCompletedStats] = useState(null);

  // Run recommendation engine
  const recommendation = useMemo(() => {
    if (isPersonalizedModeActive && practiceKeyParam) {
      const keyUpper = practiceKeyParam.toUpperCase();
      return {
        programId: "weak-key-recovery",
        level: 1,
        title: `Key "${keyUpper}" Practice`,
        difficulty: "medium",
        duration: 60,
        weakKeys: [keyUpper],
        reason: `Focused training session generated specifically for Key "${keyUpper}".`
      };
    }
    return getGymRecommendation(history);
  }, [history, isPersonalizedModeActive, practiceKeyParam]);

  // Get active workout passage configuration
  const activeWorkout = useMemo(() => {
    if (!selectedProgram || !selectedLevel) return null;

    // If weak key recovery in personalized mode, build dynamic text based on user's actual weak keys
    if (selectedProgram.id === "weak-key-recovery" && isPersonalizedModeActive && recommendation.weakKeys?.length > 0) {
      const keys = recommendation.weakKeys;
      const words = [];
      keys.forEach((key) => {
        const dict = WEAK_KEYS_WORDS[key.toUpperCase()] || WEAK_KEYS_WORDS["R"];
        words.push(...dict);
      });

      // Filter words based on difficulty level
      let wordCount = 18;
      if (activeDifficulty === "easy") wordCount = 10;
      if (activeDifficulty === "hard") wordCount = 28;

      const dynamicText = words.slice(0, wordCount).join(" ");
      return {
        title: `Weak Keys Recovery (${keys.join(", ")})`,
        text: dynamicText,
        duration: selectedLevel.duration || 60,
        focusedKeys: keys
      };
    }

    // Default static curriculum text mapping
    return {
      title: `${selectedProgram.title} — ${selectedLevel.title}`,
      text: selectedLevel.text,
      duration: selectedLevel.duration,
      focusedKeys: selectedProgram.id === "weak-key-recovery" ? ["O", "P", "R"] : []
    };
  }, [selectedProgram, selectedLevel, isPersonalizedModeActive, recommendation, activeDifficulty]);

  if (!mounted) {
    // Render matching Guided landing skeleton using standard HTML elements to prevent style hydration mismatch
    return (
      <div style={{ minHeight: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "var(--sub-color)" }}>Loading Typing Gym...</p>
      </div>
    );
  }

  // Action: Launch a curriculum level
  const handleStartLevel = (program, level) => {
    if (!device.canStartTypingExperience) {
      setIsDesktopRequiredOpen(true);
      return;
    }
    setSelectedProgram(program);
    setSelectedLevel(level);
    setActiveDifficulty("medium");
    setSessionState("PRACTICING");
  };

  // Action: Launch personalized recommended workout
  const handleStartPersonalized = () => {
    if (!device.canStartTypingExperience) {
      setIsDesktopRequiredOpen(true);
      return;
    }
    const program = GYM_PROGRAMS.find((p) => p.id === recommendation.programId) || GYM_PROGRAMS[0];
    const level = program.levels.find((l) => l.level === recommendation.level) || program.levels[0];
    
    setSelectedProgram(program);
    setSelectedLevel(level);
    setActiveDifficulty(recommendation.difficulty);
    setSessionState("PRACTICING");
  };

  // Callback: Exercise Completed
  const handleTestComplete = (results) => {
    setCompletedStats(results);
    setSessionState("COMPLETED");

    // Persist level completion in progress storage
    if (selectedProgram && selectedLevel) {
      completeGymLevel(selectedProgram.id, selectedLevel.level);
    }
  };

  // Action: Move to next step or go back to curriculum
  const handleContinue = () => {
    if (!selectedProgram || !selectedLevel) {
      setSessionState("LANDING");
      return;
    }

    const nextLevelNum = selectedLevel.level + 1;
    const nextLevel = selectedProgram.levels.find((l) => l.level === nextLevelNum);

    if (nextLevel) {
      // Load next level directly
      setSelectedLevel(nextLevel);
      setSessionState("PRACTICING");
    } else {
      // Completed last level of this program, return to landing
      setSessionState("LANDING");
      setSelectedProgram(null);
      setSelectedLevel(null);
      // Clean query parameter if returning
      if (isPersonalizedModeActive) {
        router.push("/typing-gym", { scroll: false });
      }
    }
  };

  // Action: Switch back to Guided curriculum from Personalized Mode
  const handleExitPersonalized = () => {
    router.push("/typing-gym", { scroll: false });
  };

  // =========================================================
  // VIEW: ACTIVE DRILL SESSION SCREEN
  // =========================================================
  if (sessionState === "PRACTICING" && activeWorkout) {
    const displayLevel = selectedLevel.level;
    const estDuration = activeWorkout.duration ? `${activeWorkout.duration}s` : "2 Minutes";

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} id="gym-active-session">
        {/* Context Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            backgroundColor: "var(--surface-color)",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            border: "1px solid var(--border-color)"
          }}
        >
          <Box>
            <span className="hero-pill" style={{ marginBottom: "0.25rem" }}>
              <span className="material-icons-outlined" style={{ fontSize: "0.9rem" }}>fitness_center</span>
              Active Exercise Session
            </span>
            <Typography component="h2" sx={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--main-color)", margin: 0 }}>
              {activeWorkout.title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1.5rem", fontSize: "0.9rem", color: "var(--sub-color)" }}>
            <Box>
              <strong>Program:</strong> <span style={{ color: "var(--main-color)" }}>{selectedProgram.title}</span>
            </Box>
            <Box>
              <strong>Level:</strong> <span style={{ color: "var(--main-color)" }}>{displayLevel} of 3</span>
            </Box>
            <Box>
              <strong>Difficulty:</strong> <span style={{ color: "var(--main-color)", textTransform: "capitalize" }}>{activeDifficulty}</span>
            </Box>
            <Box>
              <strong>Est. Time:</strong> <span style={{ color: "var(--main-color)" }}>{estDuration}</span>
            </Box>
          </Box>
        </Box>

        {/* Typing Engine */}
        <TypingTest
          customPassage={{
            id: `gym-${selectedProgram.id}-l${selectedLevel.level}`,
            title: activeWorkout.title,
            text: activeWorkout.text,
            type: "passage"
          }}
          isPractice={!activeWorkout.duration}
          duration={activeWorkout.duration || 60}
          onTestComplete={handleTestComplete}
        />
      </Box>
    );
  }

  // =========================================================
  // VIEW: CUSTOM GYM COMPLETION SCREEN
  // =========================================================
  if (sessionState === "COMPLETED" && completedStats) {
    const isLevel3 = selectedLevel?.level === 3;
    const nextStepTitle = isLevel3
      ? "Gym curriculum completed!"
      : `${selectedProgram?.title} — Level ${selectedLevel?.level + 1}`;

    // Compute dynamic improvement insights
    let insights = [];
    const recentWpm = completedStats.wpm;
    const recentAcc = completedStats.accuracy;
    const recentErrors = completedStats.errors;

    if (history.length > 1) {
      const wpmSum = history.reduce((s, r) => s + r.wpm, 0);
      const accSum = history.reduce((s, r) => s + r.accuracy, 0);
      const avgWpm = Math.round(wpmSum / history.length);
      const avgAcc = Math.round(accSum / history.length);

      if (recentAcc > avgAcc) {
        insights.push(`Your overall accuracy of ${recentAcc}% in this session is higher than your historical average of ${avgAcc}%. Excellent precision!`);
      }
      if (recentWpm > avgWpm) {
        insights.push(`You typed at ${recentWpm} WPM, exceeding your historical average speed of ${avgWpm} WPM. Nice speed burst!`);
      }
    }

    if (recentErrors === 0) {
      insights.push("Flawless! Zero errors made. Continue to maintain this posture for faster typing.");
    } else if (recentAcc >= 97) {
      insights.push("Excellent accuracy! Slow and steady coordination is building strong muscle memory.");
    }

    // Default static recommendation fallback if no dynamic insights generated
    if (insights.length === 0) {
      insights.push("Good workout! Daily drills build steady muscle memory. Keep repeating clean transitions.");
    }

    if (!isLevel3) {
      insights.push(`Continue with Level ${selectedLevel?.level + 1} to strengthen consistency.`);
    } else {
      insights.push("Curriculum complete! Try other programs to balance your speed and accuracy profile.");
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "720px",
          margin: "0 auto",
          animation: "fadeIn 0.4s ease-out"
        }}
        id="gym-completion-screen"
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="h2"
            sx={{
              fontSize: "2rem",
              color: "var(--accent-color)",
              fontWeight: "800",
              marginBottom: "0.25rem"
            }}
          >
            Training Completed
          </Typography>
          <Typography component="p" sx={{ color: "var(--sub-color)", margin: 0 }}>
            Practice session completed successfully. Review your metrics below.
          </Typography>
        </Box>

        {/* Program context info */}
        <Box
          className="result-card"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: "1rem",
            padding: "1rem 1.5rem",
            textAlign: "center"
          }}
        >
          <Box>
            <Typography component="span" sx={{ fontSize: "0.75rem", color: "var(--sub-color)", textTransform: "uppercase", display: "block" }}>
              Program
            </Typography>
            <Typography component="strong" sx={{ fontSize: "1.1rem", color: "var(--main-color)" }}>
              {selectedProgram?.title}
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={{ fontSize: "0.75rem", color: "var(--sub-color)", textTransform: "uppercase", display: "block" }}>
              Level Completed
            </Typography>
            <Typography component="strong" sx={{ fontSize: "1.1rem", color: "var(--main-color)" }}>
              {selectedLevel?.level} of 3
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={{ fontSize: "0.75rem", color: "var(--sub-color)", textTransform: "uppercase", display: "block" }}>
              Difficulty
            </Typography>
            <Typography component="strong" sx={{ fontSize: "1.1rem", color: "var(--main-color)", textTransform: "capitalize" }}>
              {activeDifficulty}
            </Typography>
          </Box>
        </Box>

        {/* Focused Keys (if Weak Keys mode) */}
        {selectedProgram?.id === "weak-key-recovery" && activeWorkout?.focusedKeys?.length > 0 && (
          <Box
            className="result-card"
            sx={{
              padding: "0.75rem 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography component="span" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Focused Recovery Keys:
            </Typography>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              {activeWorkout.focusedKeys.map((k) => (
                <Box
                  key={k}
                  sx={{
                    backgroundColor: "var(--bg-color)",
                    border: "1px solid var(--border-color)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    color: "var(--accent-color)"
                  }}
                >
                  {k}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Performance Metrics Row */}
        <Box
          className="results-container"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem"
          }}
        >
          <Box className="result-card" sx={{ textAlign: "center", padding: "1rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--sub-color)" }}>Speed</span>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent-color)" }}>{completedStats.wpm} <span style={{ fontSize: "0.85rem" }}>WPM</span></div>
          </Box>
          <Box className="result-card" sx={{ textAlign: "center", padding: "1rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--sub-color)" }}>Accuracy</span>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--main-color)" }}>{completedStats.accuracy}%</div>
          </Box>
          <Box className="result-card" sx={{ textAlign: "center", padding: "1rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--sub-color)" }}>Errors</span>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ef4444" }}>{completedStats.errors}</div>
          </Box>
          <Box className="result-card" sx={{ textAlign: "center", padding: "1rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--sub-color)" }}>Time</span>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--main-color)" }}>{completedStats.duration}s</div>
          </Box>
        </Box>

        {/* Improvement Insights */}
        <Box className="result-card" sx={{ borderLeft: "4px solid var(--accent-color)" }}>
          <Typography component="h4" sx={{ fontSize: "1rem", fontWeight: "600", margin: "0 0 0.5rem 0", color: "var(--main-color)" }}>
            Improvement Insights
          </Typography>
          <Box component="ul" sx={{ paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {insights.map((insight, idx) => (
              <Box component="li" key={idx} sx={{ fontSize: "0.85rem", opacity: 0.85, lineHeight: "1.4rem" }}>
                {insight}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Next Recommended Step & CTAs */}
        <Box
          className="result-card"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.25rem"
          }}
        >
          <Box>
            <Typography component="span" sx={{ fontSize: "0.75rem", color: "var(--sub-color)", display: "block", textTransform: "uppercase" }}>
              Next Recommended Step
            </Typography>
            <Typography component="strong" sx={{ fontSize: "1rem", color: "var(--main-color)" }}>
              {nextStepTitle}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setSessionState("LANDING")}
              className="control-btn"
              style={{ padding: "0.6rem 1.25rem" }}
            >
              All Exercises
            </button>
            <button
              onClick={handleContinue}
              className="control-btn primary"
              style={{ padding: "0.6rem 1.5rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
            >
              <span className="material-icons-outlined">play_arrow</span>
              {isLevel3 ? "Back to Gym" : "Continue Training"}
            </button>
          </Box>
        </Box>
      </Box>
    );
  }

  // =========================================================
  // VIEW: PERSONALIZED MODE RECOMMENDATION LANDING SCREEN
  // =========================================================
  if (isPersonalizedModeActive) {
    const weakKeys = recommendation.weakKeys;

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} id="gym-personalized-landing">
        {/* Dynamic Context Header */}
        <Box sx={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <Typography
            component="h1"
            sx={{
              fontSize: "2.25rem",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              color: "var(--main-color)"
            }}
          >
            Personalized <span className="highlight-emerald">Training</span>
          </Typography>
          <Typography component="p" sx={{ fontSize: "1.1rem", color: "var(--sub-color)", margin: "0.25rem 0 0 0" }}>
            Exercises selected from your recent typing performance.
          </Typography>
        </Box>

        <Box
          className="card"
          sx={{
            maxWidth: "680px",
            width: "100%",
            margin: "0 auto",
            borderLeft: "4px solid var(--accent-color)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Box
              className="icon-badge icon-badge-emerald"
              sx={{ width: "42px", height: "42px", fontSize: "1.25rem" }}
            >
              <span className="material-icons-outlined">insights</span>
            </Box>
            <Box>
              <Typography
                component="span"
                sx={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  color: "var(--accent-color)",
                  fontWeight: "700"
                }}
              >
                Recommended Training Workout
              </Typography>
              <Typography component="h3" sx={{ fontSize: "1.4rem", margin: "0.15rem 0 0 0", fontWeight: "700" }}>
                {recommendation.title}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              backgroundColor: "var(--bg-color)",
              border: "1px solid var(--border-color)",
              padding: "1rem",
              borderRadius: "8px",
              fontSize: "0.9rem"
            }}
          >
            <Box>
              <span style={{ color: "var(--sub-color)", display: "block", fontSize: "0.75rem", textTransform: "uppercase" }}>Difficulty</span>
              <strong style={{ textTransform: "capitalize", color: "var(--main-color)" }}>{recommendation.difficulty}</strong>
            </Box>
            <Box>
              <span style={{ color: "var(--sub-color)", display: "block", fontSize: "0.75rem", textTransform: "uppercase" }}>Est. Duration</span>
              <strong style={{ color: "var(--main-color)" }}>{recommendation.duration}</strong>
            </Box>
          </Box>

          {weakKeys?.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.9rem", color: "var(--sub-color)" }}>Weak Keys Detected:</span>
              <Box sx={{ display: "flex", gap: "0.4rem" }}>
                {weakKeys.map((k) => (
                  <Box
                    key={k}
                    sx={{
                      backgroundColor: "var(--bg-color)",
                      border: "1px solid var(--border-color)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      color: "var(--accent-color)"
                    }}
                  >
                    {k}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Typography
            component="p"
            sx={{ fontSize: "1rem", color: "var(--main-color)", margin: 0, lineHeight: "1.6rem" }}
          >
            &ldquo;{recommendation.reason}&rdquo;
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              borderTop: "1px solid var(--border-color)",
              paddingTop: "1.25rem",
              marginTop: "0.5rem"
            }}
          >
            <button
              onClick={handleExitPersonalized}
              className="control-btn"
              style={{ padding: "0.7rem 1.5rem" }}
            >
              Choose Another Exercise
            </button>
            <button
              onClick={handleStartPersonalized}
              className="control-btn primary"
              style={{
                padding: "0.7rem 2rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem"
              }}
            >
              <span className="material-icons-outlined">play_arrow</span>
              Start Recovery Session
            </button>
          </Box>
        </Box>
      </Box>
    );
  }

  // =========================================================
  // VIEW: GUIDED TRAINING MODE LANDING SCREEN (CURRICULUM)
  // =========================================================
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }} id="gym-guided-landing">
      {/* Dynamic Context Header */}
      <Box sx={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <Typography
          component="h1"
          sx={{
            fontSize: "2.25rem",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            color: "var(--main-color)"
          }}
        >
          Typing <span className="highlight-emerald">Gym</span>
        </Typography>
        <Typography component="p" sx={{ fontSize: "1.1rem", color: "var(--sub-color)", margin: "0.25rem 0 0 0" }}>
          Choose a training program and improve your typing skills.
        </Typography>
      </Box>

      {/* Program Selection Card Header */}
      <div>
        <Typography
          component="h2"
          sx={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--main-color)", marginBottom: "0.25rem" }}
        >
          Choose Your Training Goal
        </Typography>
        <Typography component="p" sx={{ color: "var(--text-color)", opacity: 0.8, margin: 0 }}>
          Build speed, accuracy, and muscle memory with structured typing exercises.
        </Typography>
      </div>

      {/* Curriculum Grid */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {GYM_PROGRAMS.map((program) => {
          const completedMax = progress[program.id] || 0;

          return (
            <Box
              key={program.id}
              className="card"
              sx={{
                padding: "1.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                position: "relative"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}
              >
                <Box>
                  <Typography
                    component="h3"
                    sx={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--main-color)", margin: "0 0 0.25rem 0" }}
                  >
                    {program.title}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ fontSize: "0.9rem", color: "var(--accent-color)", fontWeight: "600", margin: "0 0 0.5rem 0" }}
                  >
                    Goal: {program.goal}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", fontSize: "0.8rem", color: "var(--sub-color)" }}>
                    <span>Includes:</span>
                    {program.includes.map((inc, i) => (
                      <span key={inc}>
                        {inc}
                        {i < program.includes.length - 1 ? " • " : ""}
                      </span>
                    ))}
                  </Box>
                </Box>

                {/* Progress bar info */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>
                    Completion
                  </span>
                  <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "var(--main-color)" }}>
                    {Math.round((completedMax / 3) * 100)}%
                  </span>
                </Box>
              </Box>

              {/* Levels Row */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                  gap: "1rem",
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "1rem",
                  marginTop: "0.5rem"
                }}
              >
                {program.levels.map((level) => {
                  const levelNum = level.level;
                  
                  // Compute level status
                  let status = "LOCKED";
                  if (completedMax >= levelNum) {
                    status = "COMPLETED";
                  } else if (completedMax === levelNum - 1) {
                    status = "IN_PROGRESS";
                  }

                  const isLocked = status === "LOCKED";

                  return (
                    <Box
                      key={levelNum}
                      sx={{
                        backgroundColor: isLocked ? "rgba(var(--bg-color), 0.5)" : "var(--bg-color)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "1rem",
                        opacity: isLocked ? 0.6 : 1,
                        transition: "all 0.2s ease"
                      }}
                    >
                      <Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                          <Typography
                            component="span"
                            sx={{
                              fontSize: "0.85rem",
                              fontWeight: "700",
                              color: isLocked ? "var(--sub-color)" : "var(--main-color)"
                            }}
                          >
                            Level {levelNum}: {level.title}
                          </Typography>

                          {/* Lock / Status Icon */}
                          {status === "COMPLETED" && (
                            <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>
                              check_circle
                            </span>
                          )}
                          {status === "IN_PROGRESS" && (
                            <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>
                              play_circle
                            </span>
                          )}
                          {status === "LOCKED" && (
                            <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--sub-color)" }}>
                              lock
                            </span>
                          )}
                        </Box>
                        <Typography component="p" sx={{ fontSize: "0.8rem", color: "var(--sub-color)", margin: 0, lineHeight: "1.2rem" }}>
                          {level.description}
                        </Typography>
                      </Box>

                      {/* Action Button */}
                      <button
                        onClick={() => handleStartLevel(program, level)}
                        disabled={isLocked}
                        className={`control-btn ${status === "IN_PROGRESS" ? "primary" : ""}`}
                        style={{
                          fontSize: "0.8rem",
                          padding: "0.45rem",
                          width: "100%",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.25rem",
                          cursor: isLocked ? "not-allowed" : "pointer"
                        }}
                      >
                        {status === "COMPLETED" && "Practice Again"}
                        {status === "IN_PROGRESS" && "Start Practice"}
                        {status === "LOCKED" && (
                          <>
                            <span className="material-icons-outlined" style={{ fontSize: "0.95rem" }}>lock</span>
                            Locked
                          </>
                        )}
                      </button>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>

      <DesktopRequiredDialog
        isOpen={isDesktopRequiredOpen}
        onClose={() => setIsDesktopRequiredOpen(false)}
      />
    </Box>
  );
}
