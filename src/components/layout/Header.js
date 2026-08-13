"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Box from "@mui/material/Box";

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      style={{
        fontWeight: "600",
        fontSize: "0.95rem",
        color: isActive ? "var(--accent-color)" : "inherit",
        transition: "color 0.2s ease"
      }}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        backgroundColor: "var(--bg-color)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-color)",
        padding: {
          xs: "0.7rem 0",
          md: "0.85rem 0"
        },
        transition: "background-color 0.3s ease, border-color 0.3s ease",
        opacity: 0.95 // Matches the glass opacity look
      }}
    >
      <Box
        className="header-inner"
        sx={{
          maxWidth: "var(--max-width)",
          width: "100%",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link
            href="/"
            style={{
              fontSize: "1.35rem",
              fontWeight: "800",
              color: "var(--main-color)",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <Box
              className="icon-badge icon-badge-emerald"
              sx={{
                width: "36px",
                height: "36px",
                fontSize: "1.2rem",
                margin: 0,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span className="material-icons-outlined">keyboard</span>
            </Box>
            <span>
              Type<span className="highlight-emerald">Brush</span>
            </span>
          </Link>
        </Box>

        <Box
          component="nav"
          className="desktop-nav"
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center"
          }}
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/typing-test">Typing Test</NavLink>
          <NavLink href="/typing-gym">Typing Gym</NavLink>
          <NavLink href="/typing-practice">Practice</NavLink>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ThemeToggle />
        </Box>
      </Box>
    </Box>
  );
}
