# TypeBrush — Indexability & Crawlability Audit

This audit validates robots rules, canonical URLs, and index permissions across indexable paths.

---

## 1. Indexability Verification Log

| Page Path | Indexing Rule | Canonical Target | Robots Access | Blocked status |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `index, follow` | `https://typebrush.in` | Allowed | **No** |
| `/typing-test` | `index, follow` | `https://typebrush.in/typing-test` | Allowed | **No** |
| `/typing-speed-test`| `index, follow` | `https://typebrush.in/typing-speed-test`| Allowed | **No** |
| `/typing-gym` | `index, follow` | `https://typebrush.in/typing-gym` | Allowed | **No** |
| `/touch-typing` | `index, follow` | `https://typebrush.in/touch-typing` | Allowed | **No** |
| `/wpm-calculator` | `index, follow` | `https://typebrush.in/wpm-calculator` | Allowed | **No** |
| `/typing-practice` | `index, follow` | `https://typebrush.in/typing-practice` | Allowed | **No** |

---

## 2. Robots Verification
- **Rules File**: `robots.js` compiled correctly during static exports.
- **Accidental Noindex Check**: Grepped for `noindex` across indexable headers; verified only utility layout sections are barred if appropriate.
- **Crawl Blocks**: None. Googlebot has unrestricted access to all landing pages.
