"use client";

import { useState } from "react";
import TypingTest from "./TypingTest";
import { paragraphs } from "@/data/paragraphs";

export default function ParagraphPracticeContainer() {
  const [difficulty, setDifficulty] = useState("Beginner");
  const filtered = paragraphs.filter((p) => p.difficulty === difficulty);
  const [selectedId, setSelectedId] = useState(filtered[0]?.id || "");

  // Auto-correct selectedId if difficulty changes
  const activeList = filtered.length > 0 ? filtered : paragraphs;
  const currentSelectedId = activeList.some((p) => p.id === selectedId)
    ? selectedId
    : activeList[0]?.id || "";

  const activeParagraph = paragraphs.find((p) => p.id === currentSelectedId) || paragraphs[0];

  const handleDifficultyChange = (diff) => {
    setDifficulty(diff);
    const firstOfDiff = paragraphs.find((p) => p.difficulty === diff);
    if (firstOfDiff) {
      setSelectedId(firstOfDiff.id);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>1. Select Difficulty:</label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {["Beginner", "Intermediate", "Advanced"].map((diff) => (
              <button
                key={diff}
                onClick={() => handleDifficultyChange(diff)}
                className="cta-button"
                style={{
                  backgroundColor: difficulty === diff ? "var(--accent-color)" : "var(--sub-alt-color)",
                  color: difficulty === diff ? "#1e1e24" : "var(--text-color)",
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem"
                }}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="paragraph-select" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>2. Select Paragraph Exercise:</label>
          <select
            id="paragraph-select"
            value={currentSelectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
              border: "1px solid var(--sub-color)",
              borderRadius: "var(--border-radius)",
              fontSize: "1rem",
              outline: "none"
            }}
          >
            {activeList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeParagraph && (
        <div key={activeParagraph.id}>
          <h3 style={{ marginBottom: "1rem" }}>Selected: {activeParagraph.title}</h3>
          <TypingTest
            customPassage={activeParagraph}
            isPractice={true}
            duration={null}
          />
        </div>
      )}
    </div>
  );
}
