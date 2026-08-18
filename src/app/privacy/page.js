export const metadata = {
  title: "Privacy Policy | TypeBrush",
  description: "Read the TypeBrush Privacy Policy. We do not track, collect, or store your typing logs or personal information. All tests run client-side.",
  alternates: {
    canonical: "https://typebrush.netlify.app/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Privacy Policy</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.85 }}>
          Last updated: August 10, 2026
        </p>
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>No Tracking, Just Typing</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          At TypeBrush, privacy is not a feature—it is our architecture. We do not require account registration, and we do not maintain database records of your name, email, or typing performance.
        </p>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          All calculation processes, keystroke validations, speed tracking (WPM), and mistake counts are computed locally in your web browser. No key logging data is transmitted to our servers.
        </p>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem" }}>Analytics & Third-Party Cookies</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          We do not display targeted tracking ads or integrate aggressive marketing cookies. The site runs statically, utilizing clean web tokens for layout state management.
        </p>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem" }}>Contact Us</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6rem" }}>
          If you have questions regarding this privacy statement, you can consult our public codebase or contact us at contact@typebrush.netlify.app.
        </p>
      </section>
    </div>
  );
}
