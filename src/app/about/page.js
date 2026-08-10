import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata = {
  title: "About Us | TypeBrush Typing Platform",
  description: "Learn more about TypeBrush, a free browser-based typing test and practice platform designed to improve keyboard speed and spelling accuracy.",
  alternates: {
    canonical: "https://typebrush.in/about"
  }
};

export default function AboutPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Breadcrumbs items={[{ label: "About Us" }]} />
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>About TypeBrush</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.85 }}>
          TypeBrush is a free, interactive, browser-based typing platform. Our goal is simple: to help individuals improve their typing speed (WPM) and accuracy without annoying distraction ads, unnecessary accounts, or tracking.
        </p>
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Our Mission</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          In today&apos;s digital economy, typing is a fundamental professional skill. Whether you are coding software, writing copy, entering medical records, or preparing for official government typing exams, your keyboard efficiency directly impacts your productivity.
        </p>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          We design responsive, clean layouts that emphasize focus and readability. By presenting real-time stats alongside high-contrast character states, we train muscle memory so your fingers can type naturally without looking at the keys.
        </p>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem" }}>Core Features</h2>
        <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.95rem" }}>
          <li>
            <strong>Diverse Timed Tests:</strong> Pick from 1-minute, 2-minute, 5-minute, or 10-minute drills.
          </li>
          <li>
            <strong>Numeric Practice:</strong> Specialized number keypad training for billing and data entry operations.
          </li>
          <li>
            <strong>Paragraph & Passage Practice:</strong> Untimed exercises built for endurance training using natural English text.
          </li>
          <li>
            <strong>Client-Side Engine:</strong> Your key logs are evaluated strictly inside the browser. No data ever leaves your device.
          </li>
        </ul>
      </section>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.95rem", marginTop: "1rem" }}>
        <span>Explore TypeBrush:</span>
        <Link href="/typing-test" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Typing Tests</Link>
        <Link href="/typing-practice" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Practice Modules</Link>
      </div>
    </div>
  );
}
