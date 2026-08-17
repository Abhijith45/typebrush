# TypeBrush — Keyword Mapping & Search Intent Matrix

This document maps targeted keywords to specific pages, detailing search intent, difficulty rating, and recommended content layout.

---

## 1. Keyword Matrix

| Targeted Page Slug | Primary Keyword | Search Intent | KD (Est.) | Priority | Recommended Layout & Elements |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `typing test` | Transactional / Tool | High | P1 | Minimalist standard test runner, quick links to practice clusters. |
| `/typing-speed-test` | `typing speed test` | Informational / Tool | High | P1 | Renders test runner, details WPM performance benchmarks. |
| `/typing-gym` | `typing exercises` | Informational / Learning | Medium | P1 | Touch-typing guided levels, progress maps, weak-key drills. |
| `/typing-practice` | `typing practice` | Transactional / Tool | Medium | P2 | Exercise catalogs, select-and-type workouts directories. |
| `/touch-typing` | `touch typing` | Informational / Educational | Medium | P2 | Standard home-row finger chart, touch-typing posture diagrams. |
| `/wpm-calculator` | `wpm calculator` | Informational / Tool | Low | P2 | Interactive calculator, character-to-word conversions. |

---

## 2. Content Cluster Silos

To rank for highly competitive terms (like "typing test"), TypeBrush groups pages into semantic siloing clusters:

```
                  [Silo Parent: Homepage /]
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   [Silo Category A: Test]         [Silo Category B: Gym]
     ├── /typing-speed-test          ├── /touch-typing
     └── /wpm-calculator             └── /typing-practice
```
- **Internal Anchor Linking**: Child pages link back to the parent using parent-targeted anchor texts (e.g. "free typing test"), passes crawl authority up the silo.
