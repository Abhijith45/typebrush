import Link from "next/link";

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        fontSize: "0.85rem",
        color: "var(--sub-color)",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }}
    >
      <Link href="/" style={{ color: "var(--sub-color)", textDecoration: "none" }}>
        Home
      </Link>
      {items.map((item, idx) => (
        <span key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>/</span>
          {item.url ? (
            <Link href={item.url} style={{ color: "var(--sub-color)", textDecoration: "none" }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "var(--accent-color)", fontWeight: "500" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
