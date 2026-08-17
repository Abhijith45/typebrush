"use client";

import { useState, useMemo } from "react";

export default function WpmCalculator() {
  const [correctChars, setCorrectChars] = useState(300);
  const [incorrectChars, setIncorrectChars] = useState(15);
  const [timeSeconds, setTimeSeconds] = useState(60);

  // Dynamic calculations
  const wpm = useMemo(() => {
    const minutes = timeSeconds / 60;
    if (minutes <= 0) return 0;
    return Math.round((correctChars / 5) / minutes);
  }, [correctChars, timeSeconds]);

  const netAccuracy = useMemo(() => {
    const total = Number(correctChars) + Number(incorrectChars);
    if (total <= 0) return 0;
    return Math.round((correctChars / total) * 1000) / 10;
  }, [correctChars, incorrectChars]);

  const rawAccuracy = useMemo(() => {
    const total = Number(correctChars) + Number(incorrectChars);
    if (total <= 0) return 0;
    return Math.round((correctChars / total) * 1000) / 10;
  }, [correctChars, incorrectChars]);

  return (
    <section className="card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h2 style={{ fontSize: "1.4rem", margin: 0, borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
        Calculate Your Stats
      </h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
        {/* Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label htmlFor="input-correct" style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--sub-color)" }}>
              Correct Characters
            </label>
            <input
              id="input-correct"
              type="number"
              value={correctChars}
              onChange={(e) => setCorrectChars(Math.max(0, Number(e.target.value)))}
              style={{
                padding: "0.6rem",
                fontSize: "1rem",
                borderRadius: "6px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--main-color)"
              }}
            />
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label htmlFor="input-incorrect" style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--sub-color)" }}>
              Incorrect Characters
            </label>
            <input
              id="input-incorrect"
              type="number"
              value={incorrectChars}
              onChange={(e) => setIncorrectChars(Math.max(0, Number(e.target.value)))}
              style={{
                padding: "0.6rem",
                fontSize: "1rem",
                borderRadius: "6px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--main-color)"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label htmlFor="input-time" style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--sub-color)" }}>
              Time Elapsed (Seconds)
            </label>
            <input
              id="input-time"
              type="number"
              value={timeSeconds}
              onChange={(e) => setTimeSeconds(Math.max(1, Number(e.target.value)))}
              style={{
                padding: "0.6rem",
                fontSize: "1rem",
                borderRadius: "6px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--main-color)"
              }}
            />
          </div>
        </div>

        {/* Results Badge */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1.5rem", borderLeft: "1px solid var(--border-color)", paddingLeft: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "700" }}>Calculated speed</span>
            <div style={{ fontSize: "3rem", fontWeight: "800", color: "var(--accent-color)" }}>
              {wpm} <span style={{ fontSize: "1.2rem", fontWeight: "normal" }}>WPM</span>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "2rem", width: "100%", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--sub-color)" }}>Net Accuracy</span>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{netAccuracy}%</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--sub-color)" }}>Raw Accuracy</span>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{rawAccuracy}%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
