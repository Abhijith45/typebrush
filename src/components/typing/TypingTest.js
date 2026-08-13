"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import TypingStats from "./TypingStats";
import TypingPassage from "./TypingPassage";
import TypingInput from "./TypingInput";
import TypingResult from "./TypingResult";
import { calculateWpm } from "@/lib/typing/calculateWpm";
import { calculateAccuracy } from "@/lib/typing/calculateAccuracy";
import { getPassage, getCurrentTime } from "@/lib/typing/typingUtils";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TypingTest({ duration = 60, mode = "standard", isPractice = false, customPassage = null, onTestComplete = null }) {
  const [passage, setPassage] = useState(() => customPassage || getPassage(mode, null, true));
  const [typedText, setTypedText] = useState("");
  const [testState, setTestState] = useState("IDLE"); // IDLE | RUNNING | COMPLETED
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(isPractice ? 0 : duration);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [completedStats, setCompletedStats] = useState(null);

  // Ref to track character-level attempts, errors, and correct counts during keystrokes
  const keyStatsRef = useRef({});
  const mistakePairsRef = useRef({});

  // Randomize passage on client mount after hydration
  useEffect(() => {
    if (!customPassage) {
      setTimeout(() => {
        setPassage(getPassage(mode));
      }, 0);
    }
  }, [mode, customPassage]);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize passage selection logic
  const initializePassage = useCallback(() => {
    if (!customPassage) {
      const selected = getPassage(mode, passage.id);
      setPassage(selected);
    }
  }, [mode, passage.id, customPassage]);

  // Restart function
  const restartTest = useCallback(() => {
    setTypedText("");
    setSecondsElapsed(0);
    setSecondsRemaining(isPractice ? 0 : duration);
    setMistakeCount(0);
    setCompletedStats(null);
    setTestState("IDLE");
    keyStatsRef.current = {};
    mistakePairsRef.current = {};
    startTimeRef.current = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    initializePassage();
  }, [duration, isPractice, initializePassage]);

  // Sync custom passage prop if it updates
  useEffect(() => {
    if (customPassage) {
      setTimeout(() => {
        setPassage(customPassage);
        restartTest();
      }, 0);
    }
  }, [customPassage, restartTest]);

  // Re-sync duration prop when it changes statically
  useEffect(() => {
    setTimeout(() => {
      setSecondsRemaining(duration);
    }, 0);
  }, [duration]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const finishTest = useCallback((finalElapsed = null) => {
    setTestState("COMPLETED");
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (finalElapsed !== null) {
      setSecondsElapsed(finalElapsed);
    }
    setCompletedStats({
      keyStats: { ...keyStatsRef.current },
      mistakePairs: { ...mistakePairsRef.current }
    });
  }, []);

  const startTest = useCallback(() => {
    setTestState("RUNNING");
    setCompletedStats(null);
    keyStatsRef.current = {};
    mistakePairsRef.current = {};
    startTimeRef.current = getCurrentTime();

    // Set up high precision interval using timestamp offsets
    timerRef.current = setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed = Math.max(0, Math.floor((getCurrentTime() - startTimeRef.current) / 1000));
      setSecondsElapsed(elapsed);

      if (isPractice) {
        setSecondsRemaining(elapsed); // Count up for practice modes
      } else {
        const remaining = duration - elapsed;
        if (remaining <= 0) {
          setSecondsRemaining(0);
          finishTest(elapsed);
        } else {
          setSecondsRemaining(remaining);
        }
      }
    }, 200);

    // Auto focus the input textarea immediately
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        setIsFocused(true);
      }
    }, 10);
  }, [duration, isPractice, finishTest]);

  const recordKeystroke = (enteredChar, targetChar) => {
    const normalizedTarget = targetChar.length === 1 && /[A-Za-z]/.test(targetChar)
      ? targetChar.toLowerCase()
      : targetChar;

    if (!keyStatsRef.current[normalizedTarget]) {
      keyStatsRef.current[normalizedTarget] = { attempts: 0, errors: 0, correct: 0 };
    }

    keyStatsRef.current[normalizedTarget].attempts += 1;

    if (enteredChar === targetChar) {
      keyStatsRef.current[normalizedTarget].correct += 1;
    } else {
      keyStatsRef.current[normalizedTarget].errors += 1;
      setMistakeCount((prev) => prev + 1);

      const normalizedEntered = enteredChar.length === 1 && /[A-Za-z]/.test(enteredChar)
        ? enteredChar.toLowerCase()
        : enteredChar;
      const pairKey = `${normalizedTarget}->${normalizedEntered}`;
      mistakePairsRef.current[pairKey] = (mistakePairsRef.current[pairKey] || 0) + 1;
    }
  };

  const handleInputChange = (e) => {
    if (testState !== "RUNNING") return;
    const value = e.target.value;

    if (value.length <= passage.text.length) {
      // Analyze new keystroke errors
      if (value.length > typedText.length) {
        const lastIdx = value.length - 1;
        const enteredChar = value[lastIdx];
        const targetChar = passage.text[lastIdx];
        recordKeystroke(enteredChar, targetChar);
      }
      setTypedText(value);

      // Check early completion
      if (value.length === passage.text.length) {
        const finalTime = startTimeRef.current
          ? Math.max(1, Math.floor((getCurrentTime() - startTimeRef.current) / 1000))
          : 1;
        finishTest(finalTime);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (testState !== "RUNNING") return;
    // Prevent default scroll behaviors inside typing area on Space key
    if (e.key === " ") {
      e.preventDefault();

      const nextVal = typedText + " ";
      if (nextVal.length <= passage.text.length) {
        const lastIdx = nextVal.length - 1;
        const targetChar = passage.text[lastIdx];
        recordKeystroke(" ", targetChar);
        setTypedText(nextVal);

        if (nextVal.length === passage.text.length) {
          const finalTime = startTimeRef.current
            ? Math.max(1, Math.floor((getCurrentTime() - startTimeRef.current) / 1000))
            : 1;
          finishTest(finalTime);
        }
      }
    }
  };

  const handleWrapperClick = () => {
    if (testState === "RUNNING" && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Live stats calculation
  let correctCount = 0;
  let incorrectCount = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === passage.text[i]) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  }

  const currentWpm = calculateWpm({
    typedCharacters: correctCount,
    elapsedSeconds: secondsElapsed || 1
  });

  const currentAccuracy = testState === "IDLE"
    ? null
    : calculateAccuracy({
        correctCharacters: correctCount,
        totalTypedCharacters: typedText.length
      });

  // Derive descriptive test name and canonical path for sharing/scorecard
  let derivedTestName = "Typing Test";
  let derivedCanonicalPath = "/typing-test";

  if (mode === "number") {
    derivedTestName = "Number Typing Test";
    derivedCanonicalPath = "/typing-test/number";
  } else if (isPractice) {
    derivedTestName = customPassage?.title ? `${customPassage.title} Practice` : "English Typing Practice";
    derivedCanonicalPath = customPassage?.type === "passage"
      ? "/typing-practice/english-passage"
      : "/typing-practice/english-paragraph";
  } else if (duration > 0) {
    const mins = Math.round(duration / 60);
    derivedTestName = `${mins} Minute Typing Test`;
    derivedCanonicalPath = `/typing-test/${mins}-minute`;
  }

  useEffect(() => {
    if (testState === "COMPLETED" && onTestComplete && completedStats) {
      onTestComplete({
        wpm: currentWpm,
        accuracy: currentAccuracy === null ? 100 : currentAccuracy,
        errors: mistakeCount,
        correctChars: correctCount,
        incorrectChars: incorrectCount,
        duration: secondsElapsed || 1,
        testName: derivedTestName,
        canonicalPath: derivedCanonicalPath,
        keyStats: completedStats.keyStats,
        mistakePairs: completedStats.mistakePairs
      });
    }
  }, [testState, completedStats, onTestComplete, currentWpm, currentAccuracy, mistakeCount, correctCount, incorrectCount, secondsElapsed, derivedTestName, derivedCanonicalPath]);

  if (testState === "COMPLETED") {
    return (
      <TypingResult
        wpm={currentWpm}
        accuracy={currentAccuracy === null ? 100 : currentAccuracy}
        errors={mistakeCount}
        correctChars={correctCount}
        incorrectChars={incorrectCount}
        duration={secondsElapsed || 1}
        testName={derivedTestName}
        canonicalPath={derivedCanonicalPath}
        keyStats={completedStats?.keyStats || {}}
        mistakePairs={completedStats?.mistakePairs || {}}
        onRestart={restartTest}
      />
    );
  }

  return (
    <Box
      className="typing-container"
      onClick={handleWrapperClick}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <TypingStats
        wpm={testState === "IDLE" ? 0 : currentWpm}
        accuracy={currentAccuracy}
        seconds={secondsRemaining}
      />

      <Box
        sx={{
          position: "relative",
          padding: "1.5rem",
          backgroundColor: "var(--surface-color)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--border-radius)",
          cursor: testState === "RUNNING" ? "text" : "default"
        }}
      >
        <TypingInput
          value={typedText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          isDisabled={testState !== "RUNNING"}
          inputRef={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <TypingPassage
          text={passage.text}
          typedText={typedText}
          isFocused={isFocused && testState === "RUNNING"}
        />

        {testState === "IDLE" && (
          <Box className="start-overlay">
            <span className="material-icons-outlined" style={{ fontSize: "2.5rem", color: "var(--accent-color)" }}>
              play_circle_outline
            </span>
            <Typography component="span" className="start-overlay-title" sx={{ fontWeight: "600" }}>
              Ready to test your skills?
            </Typography>
            <button onClick={startTest} className="cta-button" style={{ padding: "0.6rem 1.75rem" }}>
              <span className="material-icons-outlined">play_arrow</span>
              {isPractice ? "Start Practice" : "Start Test"}
            </button>
          </Box>
        )}
      </Box>

      {testState === "RUNNING" && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          <Box
            component="button"
            onClick={restartTest}
            className="control-btn"
            aria-label="Reset typing test"
            sx={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
          >
            <span className="material-icons-outlined">restart_alt</span>
            Reset
          </Box>
          <Box
            component="button"
            onClick={() => finishTest(secondsElapsed)}
            className="control-btn primary"
            aria-label="Finish typing test"
            sx={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
          >
            <span className="material-icons-outlined">done</span>
            Finish
          </Box>
        </Box>
      )}
    </Box>
  );
}
