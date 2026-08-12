import Link from "next/link";

export const metadata = {
  title: "Typing Practice | Free Exercises to Improve Typing WPM | TypeBrush",
  description: "Improve your typing with free typing practice. Exercises include paragraphs and passages categorized by easy, medium, and hard difficulties.",
  alternates: {
    canonical: "https://typebrush.in/typing-practice"
  }
};

export default function TypingPracticeLanding() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Typing Practice Programs</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Practice makes perfect. Unlike our timed typing speed tests, the practice section offers unlimited/untimed exercise formats designed to help you concentrate on posture, rhythm, and accuracy.
        </p>
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>English Paragraph Practice</h2>
            <p style={{ opacity: 0.7, fontSize: "0.95rem", lineHeight: "1.5rem" }}>
              Focus on short to medium paragraphs categorized by Easy, Medium, and Hard difficulties. Great for quick daily routines.
            </p>
          </div>
          <Link href="/typing-practice/english-paragraph" className="cta-button" style={{ marginTop: "1.5rem", width: "fit-content" }}>
            Select Paragraph →
          </Link>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>English Passage Practice</h2>
            <p style={{ opacity: 0.7, fontSize: "0.95rem", lineHeight: "1.5rem" }}>
              Practice longer cohesive articles, historical excerpts, and stories. Designed to build endurance and continuous rhythm.
            </p>
          </div>
          <Link href="/typing-practice/english-passage" className="cta-button" style={{ marginTop: "1.5rem", width: "fit-content" }}>
            Select Passage →
          </Link>
        </div>
      </section>

      <section className="card">
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>💡 Tips for Effective Practice</h2>
        <ul style={{ color: "var(--text-color)", opacity: 0.75, fontSize: "0.95rem", paddingLeft: "1.25rem", lineHeight: "1.8" }}>
          <li>Keep your wrists flat and do not rest them on the desk while actively typing.</li>
          <li>Look at the screen, not your fingers. Rely on your touch typing muscle memory.</li>
          <li>If you notice yourself making errors on specific keys, slow down and repeat typing them cleanly.</li>
          <li>Practice for 10-15 minutes daily rather than hours once a week.</li>
        </ul>
      </section>
    </div>
  );
}
