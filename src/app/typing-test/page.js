import Link from "next/link";

export const metadata = {
  title: "Typing Test | Check Your WPM Typing Speed",
  description: "Test your typing speed and accuracy with timed online tests. Select 1-minute, 2-minute, 5-minute, or 10-minute tests, or try our numbers test.",
  alternates: {
    canonical: "https://typebrush.in/typing-test"
  }
};

export default function TypingTestLanding() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Online Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8 }}>
          Measure your typing speed and accuracy in Words Per Minute (WPM). Choose an alternative test duration below to begin the drill.
        </p>
      </div>

      <div className="placeholder-box">
        <p className="placeholder-text">⌨️ Typing Test Engine Placeholder</p>
        <p style={{ fontSize: "0.95rem" }}>
          The interactive typing test interface will be available here in V1.2.
        </p>
      </div>

      <section>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>Select a Timing Configuration</h2>
        <div className="grid-cards">
          <Link href="/typing-test/1-minute" className="card">
            <h3 style={{ color: "var(--accent-color)" }}>1 Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem" }}>Quick raw-speed test to verify keystroke velocity.</p>
          </Link>
          <Link href="/typing-test/2-minute" className="card">
            <h3 style={{ color: "var(--accent-color)" }}>2 Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem" }}>Build consistent typing rhythm and correct spacing.</p>
          </Link>
          <Link href="/typing-test/5-minute" className="card">
            <h3 style={{ color: "var(--accent-color)" }}>5 Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem" }}>Improve muscle memory and maintain physical posture.</p>
          </Link>
          <Link href="/typing-test/10-minute" className="card">
            <h3 style={{ color: "var(--accent-color)" }}>10 Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem" }}>Standard duration for professional certification prep.</p>
          </Link>
          <Link href="/typing-test/number" className="card">
            <h3 style={{ color: "var(--accent-color)" }}>Number Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem" }}>Practice numeric sequence layout drills.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
