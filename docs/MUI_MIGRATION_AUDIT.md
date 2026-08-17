# TypeBrush — MUI Migration Audit

This document inventories the existing design system, colors, typography, spacing rules, and components of the TypeBrush application to prepare for a pixel-perfect migration to Material UI.

---

## 1. Existing Design System

### Colors

| Token Name | Light Theme Value (Default) | Dark Theme Value | Purpose |
| :--- | :--- | :--- | :--- |
| `bg-color` | `#f8fafc` (slate-50) | `#0b1120` | Root background |
| `surface-color`| `#ffffff` | `#151e32` | Cards, navbar, footer base |
| `text-color` | `#475569` | `#94a3b8` | General description paragraphs |
| `main-color` | `#0f172a` | `#f8fafc` | Primary headings, titles |
| `accent-color` | `#059669` (emerald-600) | `#10b981` (emerald-500) | Main action button bases, links, active elements |
| `accent-hover` | `#047857` (emerald-700) | `#34d399` (emerald-400) | Hover button states |
| `accent-sec` | `#ecfdf5` | `rgba(16, 185, 129, 0.12)` | Pill backgrounds, hover states |
| `accent-sec-hover` | `#d1fae5` | `rgba(16, 185, 129, 0.2)` | Secondary hover highlights |
| `border-color` | `#e2e8f0` | `#1e293b` | Form inputs, divider lines |
| `sub-color` | `#64748b` | `#64748b` | Sub-labels, inactive links |
| `sub-alt-color`| `#f1f5f9` | `#1b2438` | Alternating rows, input fields background |

### Shadows

- **Light Mode**:
  - `shadow-sm`: `0 1px 3px rgba(0, 0, 0, 0.05)`
  - `shadow-md`: `0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.04)`
  - `shadow-lg`: `0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.04)`
  - `shadow-hover`: `0 20px 30px -10px rgba(5, 150, 105, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)`
- **Dark Mode**:
  - `shadow-sm`, `shadow-md`, `shadow-lg`: `none`
  - `shadow-hover`: `0 10px 25px -5px rgba(16, 185, 129, 0.15)`

---

## 2. Typography

- **Font Families**:
  - Sans-serif: System font scale (`var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...`)
  - Monospace: `'JetBrains Mono', monospace` (applied to typing engine elements)
- **Scale**:
  - `h1`: `3.00rem` (Desktop) / `2.25rem` (Mobile <= 768px), font-weight: `800`, line-height: `1.15`, letter-spacing: `-0.03em`
  - `h2`: `1.75rem` (Desktop/Mobile), font-weight: `700`, margin-bottom: `0.75rem`, letter-spacing: `-0.02em`
  - `h3`: `1.15rem`, font-weight: `600`, margin-bottom: `0.5rem`
  - `p`: `1.00rem`, line-height: `1.6`, margin-bottom: `0.5rem`

---

## 3. Spacing & Layout

- **Widths**: Root content bound to `max-width: 86%` on desktop and centered.
- **Margins & Paddings**:
  - Desktop container padding: `2.5rem 1rem`
  - Mobile container padding: `1.5rem 0.75rem`
  - Grid gaps: `1.75rem` for `.grid-cards`
- **Border Radius**: `16px` for cards, custom dialogs, and panels.

---

## 4. Components Inventory

### Layout
- **Header**: Sticky glassmorphism header (`backdrop-filter: blur(12px)`), logo on left, theme switcher + desktop links on right.
- **Footer**: Static surface-colored footer with 4 columns: Brand column (2fr), Links column (1fr), Links column (1fr), Links column (1fr).
- **BottomNav**: Glassmorphism float pill for mobile devices (`position: fixed; bottom: 0.75rem; backdrop-filter: blur(20px)`).

### Buttons
- **CTA Button (`.cta-button`)**: Pill shape (`border-radius: 9999px`), background color `accent-color`, shadow offsets on hover, slight translateY transition.
- **Secondary Button (`.secondary-button`)**: Outlined pill button with border.
- **Control Button (`.control-btn`)**: Square-ish pill button for dialog actions.

### Interactive Widgets
- **Interactive Keyboard**: Grid of key caps with color-coded finger highlights. Displays active tooltip panel when clicked.
- **Personalized Profile Card**: Card containing 4-column metric stats, weakness progress chips, and recommended exercise banners.
- **Typing Engine Passage Display**: Custom characters wrapping text inside `span` elements with correct, incorrect, and current active blinking caret styling.
- **Dialogs (Scorecard, Share)**: Dialog modals overlaying background, capturing form name inputs, validating name length, and rendering responsive intent link buttons.
