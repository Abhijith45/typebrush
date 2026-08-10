export default function RestartButton({ onRestart }) {
  return (
    <button
      onClick={onRestart}
      className="control-btn primary"
      style={{ fontSize: "0.95rem" }}
      aria-label="Start another typing test"
    >
      New Test
    </button>
  );
}
