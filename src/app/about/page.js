import Link from "next/link";

export const metadata = {
  title: "About TypeBrush — Free Typing Test & Typing Practice Platform",
  description: "TypeBrush is a free, privacy-first typing platform. Measure your WPM, practice with targeted drills, and improve your typing speed — no account, no ads, no tracking.",
  alternates: {
    canonical: "https://typebrush.in/about"
  }
};

export default function AboutPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>About TypeBrush</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.85 }}>
          TypeBrush is a free, privacy-first typing platform built for anyone who wants to type faster and more accurately. No accounts. No ads. No tracking. Just a clean, focused environment where your skill actually improves.
        </p>
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Our Mission</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          In today&apos;s digital economy, typing is a core professional skill. Whether you&apos;re applying for a government job, preparing for SSC CHSL, working as a data entry operator, or simply trying to be more productive at work — your typing speed and accuracy directly affect your output.
        </p>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          TypeBrush was built to give everyone access to high-quality, distraction-free typing practice without paywalls, mandatory sign-ups, or intrusive ads. Every test runs entirely in your browser — your keystrokes never leave your device.
        </p>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem" }}>What TypeBrush Offers</h2>
        <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.95rem" }}>
          <li>
            <strong>Timed Typing Tests:</strong> Choose from 1, 2, 5, or 10-minute tests to measure your WPM and accuracy.
          </li>
          <li>
            <strong>Number Typing Test:</strong> Specialized numeric practice for billing, data entry, and accounting operations.
          </li>
          <li>
            <strong>Paragraph & Passage Practice:</strong> Untimed exercises in Easy, Medium, and Hard difficulty for deliberate skill-building.
          </li>
          <li>
            <strong>Typing Gym:</strong> Targeted drills for weak keys, finger placement, key pairs, symbols, and speed bursts. Personalized recommendations based on your actual typing behavior.
          </li>
          <li>
            <strong>Privacy-First Design:</strong> All typing data is evaluated in your browser. Nothing is sent to a server. No account required.
          </li>
        </ul>
      </section>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.95rem", marginTop: "1rem" }}>
        <span>Get started with TypeBrush:</span>
        <Link href="/typing-test" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Typing Tests</Link>
        <Link href="/typing-gym" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Typing Gym</Link>
        <Link href="/typing-practice" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Practice Exercises</Link>
      </div>
    </div>
  );
}
