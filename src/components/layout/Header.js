import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--accent-color)", letterSpacing: "0.03em" }}>
          🖌️ TypeBrush
        </Link>
      </div>

      <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link href="/typing-test" style={{ fontWeight: "500" }}>
          Typing Test
        </Link>
        <Link href="/typing-practice" style={{ fontWeight: "500" }}>
          Practice
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
