import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "var(--accent-color)" }}>🖌️ TypeBrush</h3>
          <p style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            TypeBrush is a clean, browser-based typing practice platform built for speed and precision. Improve your accuracy and WPM with targeted lessons.
          </p>
        </div>

        <div>
          <h4 style={{ color: "var(--main-color)", fontSize: "0.95rem", marginBottom: "0.75rem" }}>Typing Tests</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem" }}>
            <li><Link href="/typing-test/1-minute">1 Minute Typing Test</Link></li>
            <li><Link href="/typing-test/2-minute">2 Minute Typing Test</Link></li>
            <li><Link href="/typing-test/5-minute">5 Minute Typing Test</Link></li>
            <li><Link href="/typing-test/10-minute">10 Minute Typing Test</Link></li>
            <li><Link href="/typing-test/number">Number Typing Test</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: "var(--main-color)", fontSize: "0.95rem", marginBottom: "0.75rem" }}>Practice Programs</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem" }}>
            <li><Link href="/typing-practice/english-paragraph">Paragraph Practice</Link></li>
            <li><Link href="/typing-practice/english-passage">Passage Practice</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: "var(--main-color)", fontSize: "0.95rem", marginBottom: "0.75rem" }}>Company</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem" }}>
            <li><span style={{ cursor: "not-allowed", opacity: 0.6 }}>About Us</span></li>
            <li><span style={{ cursor: "not-allowed", opacity: 0.6 }}>Privacy Policy</span></li>
            <li><span style={{ cursor: "not-allowed", opacity: 0.6 }}>Terms of Service</span></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.8rem" }}>
        <span>© {currentYear} TypeBrush. All rights reserved.</span>
        <span>Domain: <Link href="/" style={{ color: "var(--accent-color)" }}>typebrush.in</Link></span>
      </div>
    </footer>
  );
}
