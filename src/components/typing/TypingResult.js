import RestartButton from "./RestartButton";

export default function TypingResult({
  wpm = 0,
  accuracy = 100,
  errors = 0,
  correctChars = 0,
  incorrectChars = 0,
  duration = 0,
  onRestart
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}>
          Test Complete
        </h2>
        <p style={{ color: "var(--sub-color)" }}>Here is your performance summary</p>
      </div>

      <div className="results-container">
        <div className="result-card" style={{ textAlign: "center", alignItems: "center" }}>
          <span className="material-icons-outlined" style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}>speed</span>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>Speed</span>
          <div className="wpm-large">
            {wpm} <span style={{ fontSize: "1.2rem", fontWeight: "normal" }}>WPM</span>
          </div>
        </div>

        <div className="result-card" style={{ textAlign: "center", alignItems: "center" }}>
          <span className="material-icons-outlined" style={{ fontSize: "2rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}>track_changes</span>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sub-color)", fontWeight: "600" }}>Accuracy</span>
          <div className="accuracy-large">{accuracy}%</div>
        </div>
      </div>

      <div className="result-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <p style={{ color: "var(--sub-color)", fontSize: "0.85rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "#ef4444" }}>error_outline</span>
            Errors
          </p>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#ef4444" }}>{errors}</p>
        </div>
        <div>
          <p style={{ color: "var(--sub-color)", fontSize: "0.85rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>keyboard</span>
            Characters Typed
          </p>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--main-color)" }}>{correctChars + incorrectChars}</p>
        </div>
        <div>
          <p style={{ color: "var(--sub-color)", fontSize: "0.85rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>timer</span>
            Time Elapsed
          </p>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--main-color)" }}>{duration}s</p>
        </div>
        <div>
          <p style={{ color: "var(--sub-color)", fontSize: "0.85rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span className="material-icons-outlined" style={{ fontSize: "1.1rem", color: "var(--accent-color)" }}>check_circle_outline</span>
            Correct Characters
          </p>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--main-color)" }}>{correctChars}</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <RestartButton onRestart={onRestart} />
      </div>
    </div>
  );
}
