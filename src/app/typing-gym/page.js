import Link from "next/link";
import InteractiveKeyboard from "@/components/gym/InteractiveKeyboard";
import GymTrainer from "@/components/gym/GymTrainer";
import PersonalizedProfileCard from "@/components/gym/PersonalizedProfileCard";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Typing Gym – Improve Typing Speed & Accuracy | TypeBrush",
  description: "Practice keyboard skills, weak keys, finger placement, numbers, symbols, and typing speed with TypeBrush Typing Gym.",
  alternates: {
    canonical: "https://typebrush.in/typing-gym"
  },
  openGraph: {
    title: "Typing Gym – Improve Typing Speed & Accuracy | TypeBrush",
    description: "Train specific keyboard keys, finger placement, key pairs, and numbers to build muscle memory and typing speed.",
    url: "https://typebrush.in/typing-gym",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function TypingGymPage() {
  const gymSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TypeBrush Typing Gym",
    "url": "https://typebrush.in/typing-gym",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "description": "Interactive touch-typing workout tool for weak key drills, finger placement, key pairs, and speed bursts."
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <Schema data={gymSchema} />

      {/* Hero Section */}
      <section style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", paddingTop: "1rem" }}>
        <span className="hero-pill">
          <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>fitness_center</span>
          Targeted Keyboard Conditioning
        </span>

        <h1 style={{ fontSize: "2.75rem", fontWeight: "800", letterSpacing: "-0.03em", lineHeight: "1.15" }}>
          Typing <span className="highlight-emerald">Gym</span>
        </h1>

        <p style={{ fontSize: "1.15rem", color: "var(--text-color)", opacity: 0.85, maxWidth: "680px", lineHeight: "1.7rem" }}>
          Train your keyboard skills, improve accuracy, and build typing speed through focused practice.
        </p>

        {/* Distinctive Concept Positioning Banner */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center", backgroundColor: "var(--surface-color)", padding: "0.8rem 1.5rem", borderRadius: "9999px", border: "1px solid var(--border-color)", fontSize: "0.9rem" }}>
          <span><strong>Typing Test</strong> → Measure performance</span>
          <span style={{ color: "var(--accent-color)" }}>•</span>
          <span><strong>Typing Gym</strong> → Train the mechanics behind speed</span>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
          <a href="#training-modes" className="cta-button primary" style={{ padding: "0.8rem 2rem" }}>
            Start Training
          </a>
          <Link href="/typing-test" className="cta-button" style={{ padding: "0.8rem 2rem", backgroundColor: "var(--sub-alt-color)", color: "var(--main-color)" }}>
            Take a Typing Test
          </Link>
        </div>
      </section>

      {/* Personalized Profile & Insights Section */}
      <section>
        <PersonalizedProfileCard />
      </section>

      {/* Interactive QWERTY Keyboard Section */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <h2 style={{ fontSize: "1.75rem" }}>Interactive Keyboard & Finger Placement</h2>
          <p style={{ color: "var(--text-color)", opacity: 0.8, fontSize: "0.95rem" }}>
            Click or tap any key below to view its finger assignment, row position, and launch a targeted key drill.
          </p>
        </div>

        <InteractiveKeyboard />
      </section>

      {/* Gym Trainer Module Section */}
      <section>
        <GymTrainer />
      </section>

      {/* Educational SEO & Touch Typing Guide Section */}
      <section style={{ display: "flex", flexDirection: "column", gap: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "3rem" }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>What is TypeBrush Typing Gym?</h2>
          <p style={{ color: "var(--text-color)", opacity: 0.85, lineHeight: "1.7rem" }}>
            While standard typing tests measure your overall Words Per Minute (WPM), the <strong>Typing Gym</strong> isolates individual finger movements, problem keys, and symbol combinations. By training isolated key mechanics, you build permanent muscle memory without backspacing errors slowing down your flow.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <div className="card">
            <h3 style={{ fontSize: "1.15rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>Why Practice Specific Keys?</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem" }}>
              Most typists experience friction on specific pinky or ring finger keys like <em>Q, Z, X, P, or brackets</em>. Focusing on small clusters removes hesitation, allowing your hands to move smoothly across the home row.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1.15rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>Touch Typing Finger Placement</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem" }}>
              Rest your fingers lightly on the home row keys (<strong>ASDF</strong> for the left hand and <strong>JKL;</strong> for the right hand). Each finger is color-coded in our visual keyboard to show which keys it controls.
            </p>
          </div>
        </div>

        {/* Internal SEO Navigation Links */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Explore More Typing Modules</h3>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
            <Link href="/typing-test/1-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              Take a 1-Minute Speed Test
            </Link>
            <Link href="/typing-test/number" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              Numeric Keypad Test
            </Link>
            <Link href="/typing-practice/english-paragraph" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              Paragraph Practice
            </Link>
            <Link href="/typing-practice/english-passage" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              Passage Practice
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
