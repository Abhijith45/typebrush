import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Typing Test | Check Your WPM Typing Speed",
  description: "Test your typing speed and accuracy with timed online tests. Select 1-minute, 2-minute, 5-minute, or 10-minute tests, or try our numbers test.",
  alternates: {
    canonical: "https://typebrush.in/typing-test"
  }
};

export default function TypingTestLanding() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is WPM calculated on the typing speed test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WPM is calculated as (total correct characters / 5) / (elapsed time in minutes). This standardizes typing speed metrics across varying word sizes."
        }
      },
      {
        "@type": "Question",
        "name": "How is accuracy calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accuracy is computed as (correct characters / total characters typed) * 100. Incorrect inputs and backspace corrections are accounted for to measure precision."
        }
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <Schema data={faqSchema} />

      <div>
        <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>Online Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Measure your typing speed and accuracy in Words Per Minute (WPM). Click &ldquo;Start Test&rdquo; below to begin, or choose a specific duration.
        </p>
      </div>

      <div>
        <TypingTest duration={60} mode="standard" />
      </div>

      {/* Select Timing configuration */}
      <section style={{ borderTop: "1px solid var(--sub-alt-color)", paddingTop: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>Select a Timing Configuration</h2>
        <div className="grid-cards">
          <Link href="/typing-test/1-minute" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>1 Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>Quick raw-speed test to verify keystroke velocity.</p>
          </Link>
          <Link href="/typing-test/2-minute" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>2 Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>Build consistent typing rhythm and correct spacing.</p>
          </Link>
          <Link href="/typing-test/5-minute" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>5 Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>Improve muscle memory and maintain physical posture.</p>
          </Link>
          <Link href="/typing-test/10-minute" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>10 Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>Standard duration for professional certification prep.</p>
          </Link>
          <Link href="/typing-test/number" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>Number Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>Practice numeric sequence layout drills.</p>
          </Link>
        </div>
      </section>

      {/* Educational Content */}
      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h2 style={{ fontSize: "1.35rem", color: "var(--accent-color)" }}>How to Improve Your Typing Speed (WPM)</h2>
        <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.95rem", lineHeight: "1.5rem" }}>
          <li>
            <strong>Focus on Accuracy First:</strong> Making fewer errors means you spend less time backtracking with the Backspace key, boosting your raw WPM naturally.
          </li>
          <li>
            <strong>Maintain Home Row Positioning:</strong> Rest your fingers gently on the home row keys (ASDF and JKL;). Try to utilize all ten fingers rather than relying on index finger pecking.
          </li>
          <li>
            <strong>Avoid Watching Your Hands:</strong> Looking up at the text passage forces your brain to build visual-spatial muscle memory, allowing you to copy text continuously.
          </li>
          <li>
            <strong>Practice Consistently:</strong> Training for 10-15 minutes daily is far more effective than an hour-long session once a week.
          </li>
        </ul>
      </section>

      {/* WPM & Accuracy Math */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        <div className="card">
          <h3>Words Per Minute (WPM) Formula</h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "0.5rem", lineHeight: "1.5rem" }}>
            To standardize typing speed across long and short words, a &ldquo;word&rdquo; is defined as exactly 5 characters.
          </p>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-color)", backgroundColor: "var(--bg-color)", padding: "0.75rem", borderRadius: "var(--border-radius)", marginTop: "0.75rem", border: "1px solid var(--sub-alt-color)" }}>
            WPM = (Correct Characters / 5) / Minutes
          </div>
        </div>
        <div className="card">
          <h3>Typing Accuracy Formula</h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "0.5rem", lineHeight: "1.5rem" }}>
            Accuracy represents the exactness of key strikes, verifying how many characters entered match the target passage.
          </p>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-color)", backgroundColor: "var(--bg-color)", padding: "0.75rem", borderRadius: "var(--border-radius)", marginTop: "0.75rem", border: "1px solid var(--sub-alt-color)" }}>
            Accuracy = (Correct Chars / Total Typed) * 100
          </div>
        </div>
      </section>
    </div>
  );
}
