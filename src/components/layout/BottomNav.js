"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", path: "/", icon: "home" },
    { label: "Test", path: "/typing-test", icon: "speed" },
    { label: "Gym", path: "/typing-gym", icon: "fitness_center" },
    { label: "Practice", path: "/typing-practice", icon: "edit_note" },
    { label: "About", path: "/about", icon: "info" }
  ];

  return (
    <Box className="bottom-nav-wrapper">
      <Box
        component="nav"
        className="bottom-nav"
        aria-label="Mobile navigation bar"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`bottom-nav-item ${isActive ? "active" : ""}`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Box
                component="span"
                className="material-icons-outlined bottom-nav-icon"
                sx={{ display: "block" }}
              >
                {item.icon}
              </Box>
              <Box
                component="span"
                className="bottom-nav-label"
                sx={{ display: "block" }}
              >
                {item.label}
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
