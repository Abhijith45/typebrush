import TypingTimer from "./TypingTimer";

export default function TypingStats({ wpm = 0, accuracy = null, seconds = 0 }) {
  const accuracyText = accuracy === null ? "—" : `${accuracy}%`;

  return (
    <div className="stats-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderBottom: "1px solid var(--sub-alt-color)", paddingBottom: "0.5rem" }}>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          WPM: <span style={{ color: "var(--accent-color)", fontWeight: "bold" }}>{wpm}</span>
        </div>
        <div>
          Accuracy: <span style={{ color: "var(--accent-color)", fontWeight: "bold" }}>{accuracyText}</span>
        </div>
      </div>
      <TypingTimer seconds={seconds} />
    </div>
  );
}
