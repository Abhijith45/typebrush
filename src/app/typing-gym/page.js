import Link from "next/link";
import { Suspense } from "react";
import InteractiveKeyboard from "@/components/gym/InteractiveKeyboard";
import GymWorkspace from "@/components/gym/GymWorkspace";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Typing Gym — Train Weak Keys & Build Typing Muscle Memory | TypeBrush",
  description: "TypeBrush Typing Gym helps you practice specific keyboard keys, finger placement, key pairs, numbers, symbols, and speed drills. Fix your weak spots and type faster.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-gym"
  },
  openGraph: {
    title: "Typing Gym — Train Weak Keys & Build Typing Muscle Memory | TypeBrush",
    description: "Don't just test — train. The Typing Gym targets your specific weak keys, finger placement, and key pairs so every practice session counts.",
    url: "https://typebrush.netlify.app/typing-gym",
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
    "url": "https://typebrush.netlify.app/typing-gym",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "description": "Interactive touch-typing workout tool for weak key drills, finger placement, key pairs, and speed bursts."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://typebrush.netlify.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Typing Gym",
        "item": "https://typebrush.netlify.app/typing-gym"
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <Schema data={gymSchema} />
      <Schema data={breadcrumbSchema} />

      {/* Hero Section */}
      <section style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", paddingTop: "1rem" }}>
        <span className="hero-pill">
          <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>fitness_center</span>
          Targeted Keyboard Training
        </span>

        <h1 style={{ fontSize: "2.75rem", fontWeight: "800", letterSpacing: "-0.03em", lineHeight: "1.15" }}>
          Typing <span className="highlight-emerald">Gym</span>
        </h1>

        <p style={{ fontSize: "1.15rem", color: "var(--text-color)", opacity: 0.85, maxWidth: "680px", lineHeight: "1.7rem" }}>
          Stop training what you&apos;re already good at. The Typing Gym identifies your weak keys, finger habits, and problem combinations — then targets them with focused drills that build permanent muscle memory.
        </p>

        {/* Distinctive Concept Positioning Banner */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center", backgroundColor: "var(--surface-color)", padding: "0.8rem 1.5rem", borderRadius: "9999px", border: "1px solid var(--border-color)", fontSize: "0.9rem" }}>
          <span><strong>Typing Test</strong> → Measure your WPM</span>
          <span style={{ color: "var(--accent-color)" }}>•</span>
          <span><strong>Typing Gym</strong> → Train the mechanics behind your speed</span>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
          <a href="#training-workspace" className="cta-button primary" style={{ padding: "0.8rem 2rem" }}>
            Start Training
          </a>
          <Link href="/typing-test" className="cta-button" style={{ padding: "0.8rem 2rem", backgroundColor: "var(--sub-alt-color)", color: "var(--main-color)" }}>
            Take a Typing Test
          </Link>
        </div>
      </section>

      {/* Interactive QWERTY Keyboard Section */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <h2 style={{ fontSize: "1.75rem" }}>Interactive Keyboard & Finger Placement</h2>
          <p style={{ color: "var(--text-color)", opacity: 0.8, fontSize: "0.95rem" }}>
            Click or tap any key below to view its finger assignment, row position, and visual guidelines.
          </p>
        </div>

        <Suspense fallback={<div style={{ minHeight: "450px" }} />}>
          <InteractiveKeyboard />
        </Suspense>
      </section>

      {/* Gym Workspace Section (Guided or Personalized) */}
      <section id="training-workspace">
        <Suspense fallback={
          <div style={{ minHeight: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ color: "var(--sub-color)" }}>Loading Typing Gym...</p>
          </div>
        }>
          <GymWorkspace />
        </Suspense>
      </section>

      {/* Educational SEO & Touch Typing Guide Section */}
      <section style={{ display: "flex", flexDirection: "column", gap: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "3rem" }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>What is TypeBrush Typing Gym?</h2>
          <p style={{ color: "var(--text-color)", opacity: 0.85, lineHeight: "1.7rem" }}>
            Standard typing tests measure your overall Words Per Minute (WPM) — but they don&apos;t tell you <em>why</em> you&apos;re slow on certain keys. The <strong>Typing Gym</strong> goes deeper. It isolates individual finger movements, problem key clusters, and symbol combinations so you can build permanent muscle memory without backspace errors interrupting your flow.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <div className="card">
            <h3 style={{ fontSize: "1.15rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>Why Practice Specific Keys?</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem" }}>
              Most typists hit friction on specific pinky or ring-finger keys like <em>Q, Z, X, P, or brackets</em>. Drilling small clusters of problem keys removes hesitation and allows your hands to move fluidly across the home row.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1.15rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>Touch Typing Finger Placement</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem" }}>
              Rest your fingers lightly on the home row keys (<strong>ASDF</strong> for the left hand and <strong>JKL;</strong> for the right hand). Each finger is color-coded in our visual keyboard to show which keys it controls. Learn the positions in detail on our dedicated <Link href="/touch-typing" style={{ color: "var(--accent-color)" }}>Touch Typing Guide</Link>.
            </p>
          </div>
        </div>

        {/* Internal SEO Navigation Links */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Keep Training</h3>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
            <Link href="/typing-speed-test" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              Typing Speed Test
            </Link>
            <Link href="/wpm-calculator" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              WPM Calculator
            </Link>
            <Link href="/typing-test/1-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              1-Minute Test
            </Link>
            <Link href="/typing-test/5-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              5-Minute Test
            </Link>
            <Link href="/typing-test/10-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              10-Minute Test
            </Link>
            <Link href="/typing-practice" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>
              Typing Practice
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
