import TypingTimer from "./TypingTimer";

export default function TypingStats({ wpm = 0, accuracy = 100, seconds = 0 }) {
  return (
    <div className="stats-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderBottom: "1px solid var(--sub-alt-color)", paddingBottom: "0.5rem" }}>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          WPM: <span style={{ color: "var(--accent-color)", fontWeight: "bold" }}>{wpm}</span>
        </div>
        <div>
          Accuracy: <span style={{ color: "var(--accent-color)", fontWeight: "bold" }}>{accuracy}%</span>
        </div>
      </div>
      <TypingTimer seconds={seconds} />
    </div>
  );
}
