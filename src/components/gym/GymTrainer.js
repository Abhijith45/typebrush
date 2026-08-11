"use client";

import { useState, useMemo } from "react";
import TypingTest from "@/components/typing/TypingTest";
import {
  WEAK_KEYS_WORDS,
  FINGER_DRILLS,
  FINGER_KEYS_LIST,
  KEY_PAIRS_DRILLS,
  NUMBER_DRILLS,
  SYMBOL_DRILLS,
  SPEED_BURST_DRILLS
} from "@/lib/gym/gymData";

export default function GymTrainer({ initialKeyToPractice = null }) {
  const [activeMode, setActiveMode] = useState("weak-keys");
  
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

  // Construct active passage text and title based on mode configuration
  const activeExercise = useMemo(() => {
    switch (activeMode) {
      case "weak-keys": {
        const keys = selectedWeakKeys.length > 0 ? selectedWeakKeys : ["R"];
        const words = [];
        keys.forEach((key) => {
          const dict = WEAK_KEYS_WORDS[key.toUpperCase()] || WEAK_KEYS_WORDS["R"];
          words.push(...dict);
        });
        const passageText = words.slice(0, 18).join(" ");
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
        if (prev.length === 1) return prev; // Keep at least 1 key
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
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
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="hero-pill" style={{ marginBottom: "0.5rem" }}>
              <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>fitness_center</span>
              Typing Gym Training Session
            </span>
            <h2 style={{ fontSize: "1.75rem", margin: 0 }}>{activeExercise.title}</h2>
          </div>

          <button
            type="button"
            onClick={() => setIsPracticing(false)}
            className="control-btn"
            style={{ fontSize: "0.85rem" }}
          >
            <span className="material-icons-outlined">arrow_back</span>
            Change Gym Drill
          </button>
        </div>

        <TypingTest
          customPassage={{
            id: `gym-${activeMode}`,
            title: activeExercise.title,
            text: activeExercise.text,
            type: "passage"
          }}
          isPractice={activeMode !== "speed"}
          duration={activeExercise.duration}
        />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }} id="training-modes">
      {/* Category Selection Cards */}
      <div>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>Choose a Training Category</h2>
        <p style={{ color: "var(--text-color)", opacity: 0.8, marginBottom: "1.5rem" }}>
          Select a targeted workout below to train specific keyboard mechanics.
        </p>

        <div className="grid-cards">
          {categories.map((cat) => {
            const isSelected = activeMode === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setActiveMode(cat.id)}
                className={`card ${isSelected ? "gym-cat-active" : ""}`}
                style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                    <span className="icon-badge icon-badge-emerald" style={{ width: "32px", height: "32px", fontSize: "1rem" }}>
                      <span className="material-icons-outlined">{cat.icon}</span>
                    </span>
                    <h3 style={{ fontSize: "1.1rem", margin: 0 }}>{cat.label}</h3>
                  </div>
                  <p style={{ fontSize: "0.85rem", opacity: 0.75, lineHeight: "1.4rem" }}>{cat.desc}</p>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", fontWeight: "600", color: isSelected ? "var(--accent-color)" : "var(--sub-color)" }}>
                  <span>Configure</span>
                  <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mode Configuration Card */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h3 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>
          Configuration: {categories.find((c) => c.id === activeMode)?.label}
        </h3>

        {/* 1. Weak Keys Configuration */}
        {activeMode === "weak-keys" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select target keys you want to practice. The workout will build word drills containing your selected keys.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
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
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "600" }}>
              Selected Keys ({selectedWeakKeys.length}): {selectedWeakKeys.join(", ")}
            </p>
          </div>
        )}

        {/* 2. Finger Training Configuration */}
        {activeMode === "finger" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select a finger to practice its assigned touch-typing keys and build finger independence.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.keys(FINGER_KEYS_LIST).map((finger) => (
                <button
                  key={finger}
                  type="button"
                  onClick={() => setSelectedFinger(finger)}
                  className={`cta-button ${selectedFinger === finger ? "primary" : ""}`}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    backgroundColor: selectedFinger === finger ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedFinger === finger ? "#ffffff" : "var(--text-color)"
                  }}
                >
                  {finger}
                </button>
              ))}
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "600" }}>
              Assigned Keys: {(FINGER_KEYS_LIST[selectedFinger] || []).join(", ")}
            </p>
          </div>
        )}

        {/* 3. Key Pairs Configuration */}
        {activeMode === "pair" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select a 2-letter pair to build fluidity and transition speed across key pairs.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.keys(KEY_PAIRS_DRILLS).map((pairKey) => (
                <button
                  key={pairKey}
                  type="button"
                  onClick={() => setSelectedPairKey(pairKey)}
                  className={`cta-button ${selectedPairKey === pairKey ? "primary" : ""}`}
                  style={{
                    padding: "0.5rem 1.2rem",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    backgroundColor: selectedPairKey === pairKey ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedPairKey === pairKey ? "#ffffff" : "var(--text-color)"
                  }}
                >
                  {pairKey}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Number Practice Configuration */}
        {activeMode === "number" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select a numeric drill type to train number row positioning and decimal entry.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {NUMBER_DRILLS.map((drill) => (
                <button
                  key={drill.id}
                  type="button"
                  onClick={() => setSelectedNumberDrillId(drill.id)}
                  className={`cta-button ${selectedNumberDrillId === drill.id ? "primary" : ""}`}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    backgroundColor: selectedNumberDrillId === drill.id ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedNumberDrillId === drill.id ? "#ffffff" : "var(--text-color)"
                  }}
                >
                  {drill.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 5. Symbol Practice Configuration */}
        {activeMode === "symbol" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Select a symbol category to master special characters and Shift-key combinations.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.entries(SYMBOL_DRILLS).map(([key, drill]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedSymbolGroupKey(key)}
                  className={`cta-button ${selectedSymbolGroupKey === key ? "primary" : ""}`}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    backgroundColor: selectedSymbolGroupKey === key ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedSymbolGroupKey === key ? "#ffffff" : "var(--text-color)"
                  }}
                >
                  {drill.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 6. Speed Burst Configuration */}
        {activeMode === "speed" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Choose a short burst duration to push your maximum WPM cadence.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SPEED_BURST_DRILLS.map((drill) => (
                <button
                  key={drill.id}
                  type="button"
                  onClick={() => setSelectedSpeedBurstId(drill.id)}
                  className={`cta-button ${selectedSpeedBurstId === drill.id ? "primary" : ""}`}
                  style={{
                    padding: "0.6rem 1.5rem",
                    fontSize: "0.9rem",
                    backgroundColor: selectedSpeedBurstId === drill.id ? "var(--accent-color)" : "var(--sub-alt-color)",
                    color: selectedSpeedBurstId === drill.id ? "#ffffff" : "var(--text-color)"
                  }}
                >
                  {drill.title} ({drill.duration}s)
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Start Workout Button */}
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-start" }}>
          <button
            type="button"
            onClick={() => setIsPracticing(true)}
            className="control-btn primary"
            style={{ padding: "0.8rem 2rem", fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span className="material-icons-outlined">play_arrow</span>
            Start Training Session
          </button>
        </div>
      </div>
    </div>
  );
}
