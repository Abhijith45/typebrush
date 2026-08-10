export default function TypingTimer({ seconds = 0 }) {
  const formatTime = (totalSeconds) => {
    if (totalSeconds < 0) return "0:00";
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <span>Timer:</span>
      <span style={{ color: "var(--accent-color)", fontWeight: "bold" }}>
        {formatTime(seconds)}
      </span>
    </div>
  );
}
