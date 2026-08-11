"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <div className="bottom-nav-wrapper">
      <nav className="bottom-nav" aria-label="Mobile navigation bar">
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
              <span className="material-icons-outlined bottom-nav-icon">
                {item.icon}
              </span>
              <span className="bottom-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
