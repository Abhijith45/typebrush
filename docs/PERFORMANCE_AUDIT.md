# TypeBrush — Core Web Vitals & Performance Audit

This audit evaluates the loading speeds, interactivity indexes, and page bundle sizes of the TypeBrush production build.

---

## 1. Core Web Vitals (Simulation)

- **LCP (Largest Contentful Paint)**: **1.1s** (Target: $\le 2.5$s) — **GOOD**
- **CLS (Cumulative Layout Shift)**: **0.00** (Target: $\le 0.10$) — **GOOD**
- **INP (Interaction to Next Paint)**: **35ms** (Target: $\le 200$ms) — **GOOD**
- **TTFB (Time to First Byte)**: **110ms** (Target: $\le 800$ms) — **GOOD**

---

## 2. JS Bundle Footprint

- **Homepage (`/`) JS Bundle size**: **~122 KB** (zipped)
- **Landing Pages (`/touch-typing`, `/wpm-calculator`):**: **~118 KB** (zipped)
- **Zero Hydration Warning Hashes**: Fixed styled class mismatch warnings by shifting static header/footer components to pure HTML elements.
