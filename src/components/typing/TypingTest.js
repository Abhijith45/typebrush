"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import TypingStats from "./TypingStats";
import TypingPassage from "./TypingPassage";
import TypingInput from "./TypingInput";
import TypingResult from "./TypingResult";
import RestartButton from "./RestartButton";
import { calculateWpm } from "@/lib/typing/calculateWpm";
import { calculateAccuracy } from "@/lib/typing/calculateAccuracy";
import { getPassage, getCurrentTime } from "@/lib/typing/typingUtils";

export default function TypingTest({ duration = 60, mode = "standard" }) {
  const [passage, setPassage] = useState(() => getPassage(mode));
  const [typedText, setTypedText] = useState("");
  const [testState, setTestState] = useState("IDLE"); // IDLE | RUNNING | COMPLETED
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(duration);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const inputRef = useRef(null);

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
      const elapsed = Math.floor((getCurrentTime() - startTimeRef.current) / 1000);
      setSecondsElapsed(elapsed);
      
      const remaining = duration - elapsed;
      if (remaining <= 0) {
        setSecondsRemaining(0);
        finishTest(elapsed);
      } else {
        setSecondsRemaining(remaining);
      }
    }, 200);
  }, [duration, finishTest]);

  const restartTest = () => {
    setTypedText("");
    setSecondsElapsed(0);
    setSecondsRemaining(duration);
    setMistakeCount(0);
    setTestState("IDLE");
    startTimeRef.current = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const nextPassage = getPassage(mode, passage.id);
    setPassage(nextPassage);
    
    // Focus after layout updates
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  const handleInputChange = (e) => {
    if (testState === "COMPLETED") return;
    const value = e.target.value;

    // Start timer on first keystroke
    if (testState === "IDLE" && value.length > 0) {
      startTest();
    }

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
    // Prevent default scroll behaviors inside typing area on Space key
    if (e.key === " " && testState !== "COMPLETED") {
      e.preventDefault();
      
      const nextVal = typedText + " ";
      if (nextVal.length <= passage.text.length) {
        if (testState === "IDLE") {
          startTest();
        }
        
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
    if (inputRef.current && testState !== "COMPLETED") {
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

  const currentAccuracy = calculateAccuracy({
    correctCharacters: correctCount,
    totalTypedCharacters: typedText.length
  });

  if (testState === "COMPLETED") {
    return (
      <TypingResult
        wpm={currentWpm}
        accuracy={currentAccuracy}
        errors={mistakeCount}
        correctChars={correctCount}
        incorrectChars={incorrectCount}
        duration={secondsElapsed || 1}
        onRestart={restartTest}
      />
    );
  }

  return (
    <div className="typing-container" onClick={handleWrapperClick}>
      <TypingStats
        wpm={currentWpm}
        accuracy={currentAccuracy}
        seconds={secondsRemaining}
      />

      <div style={{ position: "relative", padding: "1.5rem", backgroundColor: "var(--sub-alt-color)", borderRadius: "var(--border-radius)", border: isFocused ? "1px solid var(--accent-color)" : "1px solid transparent", cursor: "text" }}>
        <TypingInput
          value={typedText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          isFinished={testState === "COMPLETED"}
          inputRef={inputRef}
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        <TypingPassage
          text={passage.text}
          typedText={typedText}
          isFocused={isFocused}
        />

        {!isFocused && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(1px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "var(--accent-color)",
              fontWeight: "bold",
              fontSize: "1.1rem",
              pointerEvents: "none",
              userSelect: "none",
              borderRadius: "var(--border-radius)"
            }}
          >
            🖱️ Click here to focus & start typing
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <RestartButton onRestart={restartTest} />
      </div>
    </div>
  );
}
