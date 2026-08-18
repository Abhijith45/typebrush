import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "2-Minute Typing Test — Free Online Speed Test | TypeBrush",
  description: "Take a free 2-minute typing test and measure your WPM and accuracy. Build consistency and typing stamina with this popular practice format.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-test/2-minute"
  },
  openGraph: {
    title: "2-Minute Typing Test — Free Online Speed Test | TypeBrush",
    description: "Take a free 2-minute typing test and measure your WPM and accuracy. No sign-up required.",
    url: "https://typebrush.netlify.app/typing-test/2-minute",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function TwoMinuteTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>2-Minute Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          A 120-second test that reveals how well your typing speed holds up over sustained effort. Focus on consistency rather than maximum speed.
        </p>
      </div>

      <div>
        <TypingTest duration={120} mode="standard" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Why the 2-Minute Test?</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          The 2-minute test challenges you to maintain a consistent rhythm without burning out. It&apos;s long enough to expose accuracy drops that don&apos;t appear in quick sprints, but short enough to repeat several times. This makes it the ideal daily practice format for improving real-world typing speed.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/1-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>1-Minute Test</Link>
          <Link href="/typing-test/5-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>5-Minute Test</Link>
          <Link href="/typing-test/10-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>10-Minute Test</Link>
        </div>
      </section>
    </div>
  );
}
