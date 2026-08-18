import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "5-Minute Typing Test — Build Stamina & Improve WPM | TypeBrush",
  description: "Take a free 5-minute typing test online. Build keyboard stamina and sustained accuracy. Ideal for SSC, banking exam prep, and daily typing practice.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-test/5-minute"
  },
  openGraph: {
    title: "5-Minute Typing Test — Build Stamina & Improve WPM | TypeBrush",
    description: "Take a free 5-minute typing test online. Build keyboard stamina and sustained accuracy.",
    url: "https://typebrush.netlify.app/typing-test/5-minute",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function FiveMinuteTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>5-Minute Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          A 5-minute test designed to build sustained typing stamina and reveal accuracy trends that short sprints can&apos;t show. Take a breath, set your pace, and type steadily.
        </p>
      </div>

      <div>
        <TypingTest duration={300} mode="standard" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Why Take a 5-Minute Typing Test?</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          At five minutes, error compounding becomes clear. If you start too fast, your accuracy will drop in the second half as your fingers tire. The 5-minute test is the best format for detecting this pattern and correcting it. It&apos;s also a common duration used in SSC CHSL, banking, and state government typing exams.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/2-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>2-Minute Test</Link>
          <Link href="/typing-test/10-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>10-Minute Test</Link>
          <Link href="/typing-practice" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Practice Section</Link>
        </div>
      </section>
    </div>
  );
}
