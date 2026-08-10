"use client";

import { useState } from "react";
import TypingTest from "./TypingTest";
import { passages } from "@/data/passages";

export default function PassagePracticeContainer() {
  const [length, setLength] = useState("Short");
  const filtered = passages.filter((p) => p.length === length);
  const [selectedId, setSelectedId] = useState(filtered[0]?.id || "");

  const activeList = filtered.length > 0 ? filtered : passages;
  const currentSelectedId = activeList.some((p) => p.id === selectedId)
    ? selectedId
    : activeList[0]?.id || "";

  const activePassage = passages.find((p) => p.id === currentSelectedId) || passages[0];

  const handleLengthChange = (len) => {
    setLength(len);
    const firstOfLen = passages.find((p) => p.length === len);
    if (firstOfLen) {
      setSelectedId(firstOfLen.id);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>1. Select Passage Length:</label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {["Short", "Medium", "Long"].map((len) => (
              <button
                key={len}
                onClick={() => handleLengthChange(len)}
                className="cta-button"
                style={{
                  backgroundColor: length === len ? "var(--accent-color)" : "var(--sub-alt-color)",
                  color: length === len ? "#1e1e24" : "var(--text-color)",
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem"
                }}
              >
                {len}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="passage-select" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>2. Select Passage Exercise:</label>
          <select
            id="passage-select"
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
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {activePassage && (
        <div key={activePassage.id}>
          <h3 style={{ marginBottom: "1rem" }}>Selected: {activePassage.title} ({activePassage.difficulty})</h3>
          <TypingTest
            customPassage={activePassage}
            isPractice={true}
            duration={null}
          />
        </div>
      )}
    </div>
  );
}
