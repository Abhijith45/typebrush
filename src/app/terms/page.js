export const metadata = {
  title: "Terms of Service | TypeBrush",
  description: "Review the Terms of Service for TypeBrush. Clean, free, browser-based typing tests and practice under simple user terms.",
  alternates: {
    canonical: "https://typebrush.in/terms"
  }
};

export default function TermsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Terms of Service</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.85 }}>
          Last updated: August 10, 2026
        </p>
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>1. Acceptable Use</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          TypeBrush provides free, browser-based typing software for personal and educational practice. You agree to access the services using a standard web browser interface. Automated scraping, DDoS scripts, or keylogger insertion is strictly prohibited.
        </p>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem" }}>2. Intellectual Property</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          All source layouts, UI designs, code elements, text passages, and graphics are the property of TypeBrush. You may not repackage or resell our interactive typing test engines without prior written authorization.
        </p>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem" }}>3. Disclaimer of Warranties</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          The software is provided &ldquo;as is&rdquo; without warranties of any kind. While we do our best to ensure accurate WPM calculators and high uptime, we do not guarantee error-free diagnostics or compliance with specific school or civil service criteria.
        </p>
      </section>
    </div>
  );
}
