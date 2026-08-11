"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import TypingStats from "./TypingStats";
import TypingPassage from "./TypingPassage";
import TypingInput from "./TypingInput";
import TypingResult from "./TypingResult";
import { calculateWpm } from "@/lib/typing/calculateWpm";
import { calculateAccuracy } from "@/lib/typing/calculateAccuracy";
import { getPassage, getCurrentTime } from "@/lib/typing/typingUtils";

export default function TypingTest({ duration = 60, mode = "standard", isPractice = false, customPassage = null }) {
  const [passage, setPassage] = useState(() => customPassage || getPassage(mode));
  const [typedText, setTypedText] = useState("");
  const [testState, setTestState] = useState("IDLE"); // IDLE | RUNNING | COMPLETED
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(isPractice ? 0 : duration);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

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
    setTestState("IDLE");
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
  }, []);

  const startTest = useCallback(() => {
    setTestState("RUNNING");
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

  const handleInputChange = (e) => {
    if (testState !== "RUNNING") return;
    const value = e.target.value;

    if (value.length <= passage.text.length) {
      // Analyze new keystroke errors
      if (value.length > typedText.length) {
        const lastIdx = value.length - 1;
        const enteredChar = value[lastIdx];
        const targetChar = passage.text[lastIdx];
        if (enteredChar !== targetChar) {
          setMistakeCount((prev) => prev + 1);
        }
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
        // Count space mistake if incorrect
        const lastIdx = nextVal.length - 1;
        const targetChar = passage.text[lastIdx];
        if (targetChar !== " ") {
          setMistakeCount((prev) => prev + 1);
        }
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
    // Only capture focus click when test is active
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

  // Derive descriptive test name for scorecard generator
  let derivedTestName = "Typing Test";
  if (mode === "number") {
    derivedTestName = "Number Typing Test";
  } else if (isPractice) {
    derivedTestName = customPassage?.title ? `${customPassage.title} Practice` : "English Typing Practice";
  } else if (duration > 0) {
    const mins = Math.round(duration / 60);
    derivedTestName = `${mins} Minute Typing Test`;
  }

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
        onRestart={restartTest}
      />
    );
  }

  return (
    <div className="typing-container" onClick={handleWrapperClick}>
      <TypingStats
        wpm={testState === "IDLE" ? 0 : currentWpm}
        accuracy={currentAccuracy}
        seconds={secondsRemaining}
      />

      <div style={{ position: "relative", padding: "1.5rem", backgroundColor: "var(--surface-color)", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius)", cursor: testState === "RUNNING" ? "text" : "default" }}>
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
          <div className="start-overlay">
            <span className="material-icons-outlined" style={{ fontSize: "2.5rem", color: "var(--accent-color)" }}>play_circle_outline</span>
            <span className="start-overlay-title">Ready to test your skills?</span>
            <button onClick={startTest} className="cta-button" style={{ padding: "0.6rem 1.75rem" }}>
              <span className="material-icons-outlined">play_arrow</span>
              {isPractice ? "Start Practice" : "Start Test"}
            </button>
          </div>
        )}
      </div>

      {testState === "RUNNING" && (
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={restartTest} className="control-btn" aria-label="Reset typing test">
            <span className="material-icons-outlined">restart_alt</span>
            Reset
          </button>
          <button onClick={() => finishTest(secondsElapsed)} className="control-btn primary" aria-label="Finish typing test">
            <span className="material-icons-outlined">done</span>
            Finish
          </button>
        </div>
      )}
    </div>
  );
}
