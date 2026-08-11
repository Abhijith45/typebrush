export default function RestartButton({ onRestart }) {
  return (
    <button
      onClick={onRestart}
      className="control-btn primary"
      style={{ fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
      aria-label="Start another typing test"
    >
      <span className="material-icons-outlined">refresh</span>
      New Test
    </button>
  );
}
