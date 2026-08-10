import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <h1 style={{ fontSize: "3rem", color: "var(--accent-color)" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem" }}>Page not found.</h2>
      <p style={{ maxWidth: "450px", opacity: 0.8, margin: "0 auto 1.5rem auto" }}>
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to practicing!
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="cta-button">
          Go to TypeBrush
        </Link>
        <Link href="/typing-test" className="cta-button" style={{ backgroundColor: "var(--sub-alt-color)", color: "var(--text-color)" }}>
          Take a Typing Test
        </Link>
      </div>
    </div>
  );
}
