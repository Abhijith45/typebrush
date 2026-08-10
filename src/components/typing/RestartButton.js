export default function RestartButton({ onRestart }) {
  return (
    <button
      onClick={onRestart}
      className="control-btn"
      style={{ fontSize: "1rem", display: "inline-flex", gap: "0.5rem" }}
      aria-label="Restart typing test"
    >
      🔄 Try Again
    </button>
  );
}
