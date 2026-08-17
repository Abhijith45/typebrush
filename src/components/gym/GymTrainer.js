"use client";

import { useState, useMemo } from "react";
import TypingTest from "@/components/typing/TypingTest";
import { savePracticeSession } from "@/lib/gym/practiceHistoryStorage";
import {
  WEAK_KEYS_WORDS,
  FINGER_DRILLS,
  FINGER_KEYS_LIST,
  KEY_PAIRS_DRILLS,
  NUMBER_DRILLS,
  SYMBOL_DRILLS,
  SPEED_BURST_DRILLS
} from "@/lib/gym/gymData";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function GymTrainer({ initialKeyToPractice = null }) {
  const [activeMode, setActiveMode] = useState("weak-keys");
  const [difficulty, setDifficulty] = useState("medium");

  // Weak keys state
  const [selectedWeakKeys, setSelectedWeakKeys] = useState(() =>
    initialKeyToPractice ? [initialKeyToPractice] : ["O", "P", "R"]
  );

  // Finger mode state
  const [selectedFinger, setSelectedFinger] = useState("Left Index");

  // Key pairs mode state
  const [selectedPairKey, setSelectedPairKey] = useState("th");

  // Number mode state
  const [selectedNumberDrillId, setSelectedNumberDrillId] = useState("num-financial");

  // Symbol mode state
  const [selectedSymbolGroupKey, setSelectedSymbolGroupKey] = useState("brackets");

  // Speed burst mode state
  const [selectedSpeedBurstId, setSelectedSpeedBurstId] = useState("sb-15");

  // State to track if currently in active practice session
  const [isPracticing, setIsPracticing] = useState(() => !!initialKeyToPractice);

  // Construct active passage text and title based on mode configuration and difficulty
  const activeExercise = useMemo(() => {
    switch (activeMode) {
      case "weak-keys": {
        const keys = selectedWeakKeys.length > 0 ? selectedWeakKeys : ["R"];
        const words = [];
        keys.forEach((key) => {
          const dict = WEAK_KEYS_WORDS[key.toUpperCase()] || WEAK_KEYS_WORDS["R"];
          words.push(...dict);
        });

        // Filter word length based on difficulty
        let wordCount = 18;
        if (difficulty === "easy") wordCount = 10;
        if (difficulty === "hard") wordCount = 28;

        const passageText = words.slice(0, wordCount).join(" ");
        return {
          title: `Weak Keys Practice (${keys.join(", ")})`,
          text: passageText,
          duration: null
        };
      }

      case "finger": {
        const drills = FINGER_DRILLS[selectedFinger] || FINGER_DRILLS["Left Index"];
        const keysList = (FINGER_KEYS_LIST[selectedFinger] || []).join(", ");
        return {
          title: `${selectedFinger} Drill (Keys: ${keysList})`,
          text: drills[0].text,
          duration: null
        };
      }

      case "pair": {
        const drill = KEY_PAIRS_DRILLS[selectedPairKey] || KEY_PAIRS_DRILLS["th"];
        return {
          title: `Key Pair Fluency (${drill.pair.toUpperCase()})`,
          text: drill.text,
          duration: null
        };
      }

      case "number": {
        const drill = NUMBER_DRILLS.find((d) => d.id === selectedNumberDrillId) || NUMBER_DRILLS[0];
        return {
          title: `Numeric Training - ${drill.title}`,
          text: drill.text,
          duration: null
        };
      }

      case "symbol": {
        const drill = SYMBOL_DRILLS[selectedSymbolGroupKey] || SYMBOL_DRILLS["brackets"];
        return {
          title: `Symbol Training - ${drill.title}`,
          text: drill.text,
          duration: null
        };
      }

      case "speed": {
        const drill = SPEED_BURST_DRILLS.find((d) => d.id === selectedSpeedBurstId) || SPEED_BURST_DRILLS[0];
        return {
          title: drill.title,
          text: drill.text,
          duration: drill.duration
        };
      }

      default:
        return { title: "Gym Drill", text: "Practice typing with precision.", duration: null };
    }
  }, [
    activeMode,
    difficulty,
    selectedWeakKeys,
    selectedFinger,
    selectedPairKey,
    selectedNumberDrillId,
    selectedSymbolGroupKey,
    selectedSpeedBurstId
  ]);

  const toggleWeakKey = (key) => {
    setSelectedWeakKeys((prev) => {
      if (prev.includes(key)) {
        if (prev.length === 1) return prev;
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  };

  const handleTestComplete = (results) => {
    if (results) {
      savePracticeSession({
        trainingType: activeMode,
        target: selectedWeakKeys.join(", "),
        difficulty,
        duration: results.duration || 60,
        wpm: results.wpm || 0,
        accuracy: results.accuracy || 0,
        errors: results.errors || 0
      });
    }
  };

  const categories = [
    { id: "weak-keys", label: "Weak Keys", icon: "target", desc: "Practice target keys and words containing them" },
    { id: "finger", label: "Finger Training", icon: "pan_tool", desc: "Isolate keys for a specific touch-typing finger" },
    { id: "pair", label: "Key Pairs", icon: "swap_horiz", desc: "Build speed on common 2-letter transitions" },
    { id: "number", label: "Number Practice", icon: "pin", desc: "Train digits, decimals, and financial amounts" },
    { id: "symbol", label: "Symbol Practice", icon: "code", desc: "Master shift symbols, brackets, and punctuation" },
    { id: "speed", label: "Speed Burst", icon: "bolt", desc: "Focused 15s or 30s high-intensity speed sprints" }
  ];

  const availableLetters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  if (isPracticing) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <Box>
            <span className="hero-pill" style={{ marginBottom: "0.5rem" }}>
              <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>
                fitness_center
              </span>
              Typing Gym Session ({difficulty.toUpperCase()})
            </span>
            <Typography component="h2" sx={{ fontSize: "1.75rem", margin: 0, fontWeight: "700" }}>
              {activeExercise.title}
            </Typography>
          </Box>

          <Box
            component="button"
            type="button"
            onClick={() => setIsPracticing(false)}
            className="control-btn"
            sx={{ fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
          >
            <span className="material-icons-outlined">arrow_back</span>
            Change Gym Drill
          </Box>
        </Box>

        <TypingTest
          customPassage={{
            id: `gym-${activeMode}`,
            title: activeExercise.title,
            text: activeExercise.text,
            type: "passage"
          }}
          isPractice={activeMode !== "speed"}
          duration={activeExercise.duration}
          onTestComplete={handleTestComplete}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2.5rem" }} id="training-modes">
      {/* Category Selection Cards */}
      <Box>
        <Typography component="h2" sx={{ fontSize: "1.6rem", marginBottom: "0.5rem", fontWeight: "700" }}>
          Choose a Training Category
        </Typography>
        <Typography component="p" sx={{ color: "var(--text-color)", opacity: 0.8, marginBottom: "1.5rem" }}>
          Select a targeted workout below to train specific keyboard mechanics.
        </Typography>

        <Box className="grid-cards">
          {categories.map((cat) => {
            const isSelected = activeMode === cat.id;
            return (
              <Box
                key={cat.id}
                onClick={() => setActiveMode(cat.id)}
                className={`card ${isSelected ? "gym-cat-active" : ""}`}
                sx={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                    <Box
                      className="icon-badge icon-badge-emerald"
                      sx={{ width: "32px", height: "32px", fontSize: "1rem" }}
                    >
                      <span className="material-icons-outlined">{cat.icon}</span>
                    </Box>
                    <Typography component="h3" sx={{ fontSize: "1.1rem", margin: 0, fontWeight: "600" }}>
                      {cat.label}
                    </Typography>
                  </Box>
                  <Typography component="p" sx={{ fontSize: "0.85rem", opacity: 0.75, lineHeight: "1.4rem", margin: 0 }}>
                    {cat.desc}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: isSelected ? "var(--accent-color)" : "var(--sub-color)"
                  }}
                >
                  <span>Configure</span>
                  <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>
                    arrow_forward
                  </span>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Mode Configuration Card */}
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
          <Typography
            component="h3"
            sx={{ fontSize: "1.25rem", color: "var(--accent-color)", margin: 0, fontWeight: "600" }}
          >
            Configuration: {categories.find((c) => c.id === activeMode)?.label}
          </Typography>

          {/* Adaptive Difficulty Level Selector */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography component="span" sx={{ fontSize: "0.8rem", color: "var(--sub-color)", fontWeight: "600" }}>
              Difficulty:
            </Typography>
            {["easy", "medium", "hard"].map((level) => (
              <Box
                component="button"
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`cta-button ${difficulty === level ? "primary" : ""}`}
                sx={{
                  padding: "0.3rem 0.75rem",
                  fontSize: "0.75rem",
                  textTransform: "capitalize",
                  backgroundColor: difficulty === level ? "var(--accent-color)" : "var(--sub-alt-color)",
                  color: difficulty === level ? "#ffffff" : "var(--text-color)",
                  boxShadow: "none",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "none"
                  }
                }}
              >
                {level}
              </Box>
            ))}
          </Box>
        </Box>

        {/* 1. Weak Keys Configuration */}
        {activeMode === "weak-keys" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select target keys you want to practice. The workout will build word drills containing your selected keys.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {availableLetters.map((letter) => {
                const isSelected = selectedWeakKeys.includes(letter);
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => toggleWeakKey(letter)}
                    className={`gym-key-toggle ${isSelected ? "selected" : ""}`}
                  >
                    {letter}
                  </button>
                );
              })}
            </Box>
            <Typography component="p" sx={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "600", margin: 0 }}>
              Selected Keys ({selectedWeakKeys.length}): {selectedWeakKeys.join(", ")}
            </Typography>
          </Box>
        )}

        {/* 2. Finger Training Configuration */}
        {activeMode === "finger" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select a finger to practice its assigned touch-typing keys and build finger independence.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.keys(FINGER_KEYS_LIST).map((finger) => (
                <Box
                  component="button"
                  key={finger}
                  type="button"
                  onClick={() => setSelectedFinger(finger)}
                  className={`cta-button ${selectedFinger === finger ? "primary" : ""}`}
                  sx={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    backgroundColor: selectedFinger === finger ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedFinger === finger ? "#ffffff" : "var(--text-color)",
                    boxShadow: "none",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "none"
                    }
                  }}
                >
                  {finger}
                </Box>
              ))}
            </Box>
            <Typography component="p" sx={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "600", margin: 0 }}>
              Assigned Keys: {(FINGER_KEYS_LIST[selectedFinger] || []).join(", ")}
            </Typography>
          </Box>
        )}

        {/* 3. Key Pairs Configuration */}
        {activeMode === "pair" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select a 2-letter pair to build fluidity and transition speed across key pairs.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.keys(KEY_PAIRS_DRILLS).map((pairKey) => (
                <Box
                  component="button"
                  key={pairKey}
                  type="button"
                  onClick={() => setSelectedPairKey(pairKey)}
                  className={`cta-button ${selectedPairKey === pairKey ? "primary" : ""}`}
                  sx={{
                    padding: "0.5rem 1.2rem",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    backgroundColor: selectedPairKey === pairKey ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedPairKey === pairKey ? "#ffffff" : "var(--text-color)",
                    boxShadow: "none",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "none"
                    }
                  }}
                >
                  {pairKey}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* 4. Number Practice Configuration */}
        {activeMode === "number" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select a numeric drill type to train number row positioning and decimal entry.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {NUMBER_DRILLS.map((drill) => (
                <Box
                  component="button"
                  key={drill.id}
                  type="button"
                  onClick={() => setSelectedNumberDrillId(drill.id)}
                  className={`cta-button ${selectedNumberDrillId === drill.id ? "primary" : ""}`}
                  sx={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    backgroundColor: selectedNumberDrillId === drill.id ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedNumberDrillId === drill.id ? "#ffffff" : "var(--text-color)",
                    boxShadow: "none",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "none"
                    }
                  }}
                >
                  {drill.title}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* 5. Symbol Practice Configuration */}
        {activeMode === "symbol" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select a symbol category to master special characters and Shift-key combinations.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.entries(SYMBOL_DRILLS).map(([key, drill]) => (
                <Box
                  component="button"
                  key={key}
                  type="button"
                  onClick={() => setSelectedSymbolGroupKey(key)}
                  className={`cta-button ${selectedSymbolGroupKey === key ? "primary" : ""}`}
                  sx={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    backgroundColor: selectedSymbolGroupKey === key ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedSymbolGroupKey === key ? "#ffffff" : "var(--text-color)",
                    boxShadow: "none",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "none"
                    }
                  }}
                >
                  {drill.title}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* 6. Speed Burst Configuration */}
        {activeMode === "speed" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Choose a short burst duration to push your maximum WPM cadence.
            </Typography>
            <Box sx={{ display: "flex", gap: "0.75rem" }}>
              {SPEED_BURST_DRILLS.map((drill) => (
                <Box
                  component="button"
                  key={drill.id}
                  type="button"
                  onClick={() => setSelectedSpeedBurstId(drill.id)}
                  className={`cta-button ${selectedSpeedBurstId === drill.id ? "primary" : ""}`}
                  sx={{
                    padding: "0.6rem 1.5rem",
                    fontSize: "0.9rem",
                    backgroundColor: selectedSpeedBurstId === drill.id ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedSpeedBurstId === drill.id ? "#ffffff" : "var(--text-color)",
                    boxShadow: "none",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "none"
                    }
                  }}
                >
                  {drill.title} ({drill.duration}s)
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Start Workout Button */}
        <Box sx={{ marginTop: "1rem", display: "flex", justifyContent: "flex-start" }}>
          <Box
            component="button"
            type="button"
            onClick={() => setIsPracticing(true)}
            className="control-btn primary"
            sx={{
              padding: "0.8rem 2rem",
              fontSize: "1rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <span className="material-icons-outlined">play_arrow</span>
            Start Training Session
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
