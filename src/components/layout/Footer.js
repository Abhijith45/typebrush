"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const handleLinkClick = (e, href) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        width: "100%",
        borderTop: "1px solid var(--border-color)",
        backgroundColor: "var(--surface-color)",
        color: "var(--sub-color)",
        fontSize: "0.9rem",
        marginTop: "auto",
        position: "relative",
        zIndex: 1
      }}
    >
      <div
        className="footer-inner"
        style={{
          maxWidth: "var(--max-width)",
          width: "100%",
          margin: "0 auto",
          padding: "2.5rem 1rem 3rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem"
        }}
      >
        {/* Columns Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "space-between"
          }}
        >
          {/* Brand Info Column */}
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              style={{
                fontSize: "1.35rem",
                fontWeight: "800",
                color: "var(--main-color)",
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none"
              }}
            >
              <div
                className="icon-badge icon-badge-emerald"
                style={{
                  width: "34px",
                  height: "34px",
                  fontSize: "1.1rem",
                  margin: 0,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <span className="material-icons-outlined">keyboard</span>
              </div>
              <span>
                Type<span className="highlight-emerald">Brush</span>
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.85rem",
                opacity: 0.75,
                maxWidth: "415px",
                lineHeight: "1.5rem",
                margin: 0
              }}
            >
              Free typing test and practice platform. Improve your WPM and accuracy with targeted drills — no account or sign-up required.
            </p>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <a href="#" className="social-circle" aria-label="Social Link 1">
                <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>
                  public
                </span>
              </a>
              <a href="#" className="social-circle" aria-label="Social Link 2">
                <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>
                  code
                </span>
              </a>
              <a href="#" className="social-circle" aria-label="Social Link 3">
                <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>
                  groups
                </span>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div
            style={{
              flex: "2 1 400px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "2rem"
            }}
          >
            {/* Typing Tests Column */}
            <div>
              <h4
                style={{
                  color: "var(--main-color)",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  margin: "0 0 1rem 0"
                }}
              >
                Typing Tests
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  fontSize: "0.85rem",
                  padding: 0,
                  margin: 0
                }}
              >
                <li>
                  <Link href="/typing-test" onClick={(e) => handleLinkClick(e, "/typing-test")}>Standard Test</Link>
                </li>
                <li>
                  <Link href="/typing-test/1-minute" onClick={(e) => handleLinkClick(e, "/typing-test/1-minute")}>1 Minute Test</Link>
                </li>
                <li>
                  <Link href="/typing-test/2-minute" onClick={(e) => handleLinkClick(e, "/typing-test/2-minute")}>2 Minute Test</Link>
                </li>
                <li>
                  <Link href="/typing-test/5-minute" onClick={(e) => handleLinkClick(e, "/typing-test/5-minute")}>5 Minute Test</Link>
                </li>
                <li>
                  <Link href="/typing-test/10-minute" onClick={(e) => handleLinkClick(e, "/typing-test/10-minute")}>10 Minute Test</Link>
                </li>
                <li>
                  <Link href="/typing-test/number" onClick={(e) => handleLinkClick(e, "/typing-test/number")}>Number Test</Link>
                </li>
              </ul>
            </div>

            {/* Practice Programs Column */}
            <div>
              <h4
                style={{
                  color: "var(--main-color)",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  margin: "0 0 1rem 0"
                }}
              >
                Gym & Practice
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  fontSize: "0.85rem",
                  padding: 0,
                  margin: 0
                }}
              >
                <li>
                  <Link href="/typing-gym" onClick={(e) => handleLinkClick(e, "/typing-gym")} style={{ fontWeight: "700", color: "var(--accent-color)" }}>
                    Typing Gym
                  </Link>
                </li>
                <li>
                  <Link href="/typing-practice" onClick={(e) => handleLinkClick(e, "/typing-practice")}>Practice Overview</Link>
                </li>
                <li>
                  <Link href="/typing-practice/english-paragraph" onClick={(e) => handleLinkClick(e, "/typing-practice/english-paragraph")}>Paragraph Practice</Link>
                </li>
                <li>
                  <Link href="/typing-practice/english-passage" onClick={(e) => handleLinkClick(e, "/typing-practice/english-passage")}>Passage Practice</Link>
                </li>
              </ul>
            </div>

            {/* Guides & Resources Column */}
            <div>
              <h4
                style={{
                  color: "var(--main-color)",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  margin: "0 0 1rem 0"
                }}
              >
                Guides & Tools
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  fontSize: "0.85rem",
                  padding: 0,
                  margin: 0
                }}
              >
                <li>
                  <Link href="/touch-typing" onClick={(e) => handleLinkClick(e, "/touch-typing")}>Touch Typing Guide</Link>
                </li>
                <li>
                  <Link href="/wpm-calculator" onClick={(e) => handleLinkClick(e, "/wpm-calculator")}>WPM Calculator</Link>
                </li>
                <li>
                  <Link href="/typing-speed-test" onClick={(e) => handleLinkClick(e, "/typing-speed-test")}>Typing Speed Test</Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4
                style={{
                  color: "var(--main-color)",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  margin: "0 0 1rem 0"
                }}
              >
                Legal & Trust
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  fontSize: "0.85rem",
                  padding: 0,
                  margin: 0
                }}
              >
                <li>
                  <Link href="/about" onClick={(e) => handleLinkClick(e, "/about")}>About Us</Link>
                </li>
                <li>
                  <Link href="/privacy" onClick={(e) => handleLinkClick(e, "/privacy")}>Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" onClick={(e) => handleLinkClick(e, "/terms")}>Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div
          style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.85rem"
          }}
        >
          <p style={{ margin: 0 }}>© {currentYear} TypeBrush. All rights reserved.</p>
          <p style={{ margin: 0 }}>
            Free online typing test &amp; practice |{" "}
            <Link href="/" onClick={(e) => handleLinkClick(e, "/")} style={{ color: "inherit" }}>
              typebrush.in
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
