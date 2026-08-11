import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link href="/" style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--main-color)", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="icon-badge icon-badge-emerald" style={{ width: "34px", height: "34px", fontSize: "1.1rem", margin: 0 }}>
                <span className="material-icons-outlined">keyboard</span>
              </span>
              <span>Type<span className="highlight-emerald">Brush</span></span>
            </Link>
            <p style={{ fontSize: "0.85rem", opacity: 0.75, maxWidth: "320px", lineHeight: "1.5rem" }}>
              The fastest way to master touch typing and improve your WPM with real-time statistics and targeted practice sessions.
            </p>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <a href="#" className="social-circle" aria-label="Social Link 1">
                <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>public</span>
              </a>
              <a href="#" className="social-circle" aria-label="Social Link 2">
                <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>code</span>
              </a>
              <a href="#" className="social-circle" aria-label="Social Link 3">
                <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>groups</span>
              </a>
            </div>
          </div>

          {/* Typing Tests Column */}
          <div>
            <h4 style={{ color: "var(--main-color)", fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem" }}>Typing Tests</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
              <li><Link href="/typing-test">Standard Test</Link></li>
              <li><Link href="/typing-test/1-minute">1 Minute Test</Link></li>
              <li><Link href="/typing-test/2-minute">2 Minute Test</Link></li>
              <li><Link href="/typing-test/5-minute">5 Minute Test</Link></li>
              <li><Link href="/typing-test/10-minute">10 Minute Test</Link></li>
              <li><Link href="/typing-test/number">Number Test</Link></li>
            </ul>
          </div>

          {/* Practice Programs Column */}
          <div>
            <h4 style={{ color: "var(--main-color)", fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem" }}>Gym & Practice</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
              <li><Link href="/typing-gym" style={{ fontWeight: "700", color: "var(--accent-color)" }}>Typing Gym</Link></li>
              <li><Link href="/typing-practice">Practice Overview</Link></li>
              <li><Link href="/typing-practice/english-paragraph">Paragraph Practice</Link></li>
              <li><Link href="/typing-practice/english-passage">Passage Practice</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 style={{ color: "var(--main-color)", fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem" }}>Legal & Trust</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem" }}>
          <span>© {currentYear} TypeBrush. Made for typists worldwide.</span>
          <span>Free typing tool for all | <Link href="/" style={{ color: "var(--accent-color)" }}>typebrush.in</Link></span>
        </div>
      </div>
    </footer>
  );
}
