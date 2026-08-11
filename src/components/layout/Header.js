import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--main-color)", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="icon-badge icon-badge-emerald" style={{ width: "36px", height: "36px", fontSize: "1.2rem", margin: 0 }}>
              <span className="material-icons-outlined">keyboard</span>
            </span>
            <span>Type<span className="highlight-emerald">Brush</span></span>
          </Link>
        </div>

        <nav className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link href="/" style={{ fontWeight: "600", fontSize: "0.95rem" }}>
            Home
          </Link>
          <Link href="/typing-test" style={{ fontWeight: "600", fontSize: "0.95rem" }}>
            Typing Test
          </Link>
          <Link href="/typing-practice" style={{ fontWeight: "600", fontSize: "0.95rem" }}>
            Practice
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
