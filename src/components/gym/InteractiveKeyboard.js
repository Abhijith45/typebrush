"use client";

import { useState } from "react";
import { QWERTY_ROWS, KEY_FINGER_MAP, FINGER_COLOR_MAP } from "@/lib/gym/gymData";

export default function InteractiveKeyboard({ onSelectKeyForPractice }) {
  const [selectedKey, setSelectedKey] = useState("R");
  const [hoveredKey, setHoveredKey] = useState(null);

  const activeKeySymbol = hoveredKey || selectedKey;
  const activeKeyInfo = KEY_FINGER_MAP[activeKeySymbol] || KEY_FINGER_MAP["R"];
  const activeFingerColor = FINGER_COLOR_MAP[activeKeyInfo.finger] || "finger-emerald";

  const handleKeyClick = (keySymbol) => {
    setSelectedKey(keySymbol);
  };

  const handlePracticeClick = () => {
    if (onSelectKeyForPractice && selectedKey) {
      onSelectKeyForPractice(selectedKey);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
      {/* Visual QWERTY Keyboard */}
      <div className="gym-keyboard-container">
        <div className="gym-keyboard">
          {QWERTY_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="gym-keyboard-row">
              {row.map((keySymbol) => {
                const info = KEY_FINGER_MAP[keySymbol] || { finger: "Thumbs" };
                const colorClass = FINGER_COLOR_MAP[info.finger] || "finger-slate";
                const isSelected = selectedKey === keySymbol;
                const isHovered = hoveredKey === keySymbol;
                const isSpace = keySymbol === "Space";

                return (
                  <button
                    key={keySymbol}
                    type="button"
                    onClick={() => handleKeyClick(keySymbol)}
                    onMouseEnter={() => setHoveredKey(keySymbol)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onFocus={() => setHoveredKey(keySymbol)}
                    onBlur={() => setHoveredKey(null)}
                    className={`gym-key ${colorClass} ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""} ${isSpace ? "space-key" : ""}`}
                    aria-label={`Key ${keySymbol}, assigned to ${info.finger}`}
                  >
                    <span className="gym-key-symbol">{keySymbol}</span>
                    <span className="gym-key-dot" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend Row */}
        <div className="gym-keyboard-legend">
          {Object.entries(FINGER_COLOR_MAP).map(([fingerName, colorClass]) => (
            <div key={fingerName} className="legend-item">
              <span className={`legend-dot ${colorClass}`} aria-hidden="true" />
              <span className="legend-label">{fingerName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Key Information Panel */}
      <div className="card gym-info-panel">
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          <div className={`gym-key-preview ${activeFingerColor}`}>
            {activeKeySymbol}
          </div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Key: {activeKeySymbol}</h3>
              <span className={`finger-badge ${activeFingerColor}`}>
                {activeKeyInfo.finger}
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: 0 }}>
              Position: <strong>{activeKeyInfo.row}</strong> ({activeKeyInfo.hand} Hand)
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={handlePracticeClick}
              className="control-btn primary"
              style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
            >
              <span className="material-icons-outlined">fitness_center</span>
              Practice Key &quot;{selectedKey}&quot;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
