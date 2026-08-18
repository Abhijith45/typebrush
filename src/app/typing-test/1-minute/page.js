import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "1-Minute Typing Test — Free WPM Speed Test | TypeBrush",
  description: "Take a free 1-minute typing test and get your WPM instantly. No sign-up required. Ideal for a quick daily warm-up or checking your baseline typing speed.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-test/1-minute"
  },
  openGraph: {
    title: "1-Minute Typing Test — Free WPM Speed Test | TypeBrush",
    description: "Take a free 1-minute typing test and get your WPM instantly. No sign-up required.",
    url: "https://typebrush.netlify.app/typing-test/1-minute",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function OneMinuteTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>1-Minute Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          A free 60-second test to check your current WPM and accuracy. Keep your eyes on the screen, type steadily, and see your result the moment you finish.
        </p>
      </div>

      <div>
        <TypingTest duration={60} mode="standard" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Why Take a 1-Minute Typing Test?</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          The 1-minute test is the most widely used format for measuring raw typing speed. It&apos;s short enough to repeat several times in a session without fatigue, making it ideal for warming up, tracking daily progress, and identifying which keys slow you down. It&apos;s also the standard warm-up format used before government and corporate typing assessments.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/2-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>2-Minute Test</Link>
          <Link href="/typing-test/5-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>5-Minute Test</Link>
          <Link href="/typing-test/number" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Numbers Test</Link>
        </div>
      </section>
    </div>
  );
}
