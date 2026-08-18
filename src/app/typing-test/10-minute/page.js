import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "10-Minute Typing Test - SSC & Certification Exam Prep | TypeBrush",
  description: "Practice with a free 10-minute typing test. The standard duration for SSC, government, and professional typing certifications. Check your WPM and accuracy.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-test/10-minute"
  },
  openGraph: {
    title: "10-Minute Typing Test - SSC & Certification Exam Prep | TypeBrush",
    description: "Practice with a free 10-minute typing test. Standard format for SSC and professional typing certifications.",
    url: "https://typebrush.netlify.app/typing-test/10-minute",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function TenMinuteTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>10-Minute Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          A full 10-minute typing session to simulate professional exam conditions. Widely used for SSC CHSL, government typing tests, data entry assessments, and professional certifications. No sign-up required.
        </p>
      </div>

      <div>
        <TypingTest duration={600} mode="standard" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Preparing for Typing Exams & Certifications</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          Most government and professional typing exams - including SSC CHSL, court clerkships, banking data entry, and state recruitment tests - require 10 minutes of continuous, accurate typing. Regular practice at this duration trains your brain and fingers to maintain concentration and correct posture throughout the full session.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/5-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>5-Minute Test</Link>
          <Link href="/typing-test/number" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Numbers Test</Link>
          <Link href="/typing-practice/english-passage" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Passage Practice</Link>
        </div>
      </section>
    </div>
  );
}
