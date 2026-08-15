# TypeBrush — Internal Linking Strategy

This document defines the anchor text protocols and page-level transitions designed to build internal authority silos and improve crawling efficiency.

---

## 1. Silo Anchors & Target Pages

To pass authority up to critical pages without dilution, all layouts and educational sections use specific target anchor strings:

| Target Page | Primary Anchor Text | Secondary Anchor Text | Context / Source Locations |
| :--- | :--- | :--- | :--- |
| `/` | `free typing test` | `online typing test` | Footer links, touch-typing guides, WPM calculator. |
| `/typing-gym` | `typing exercises` | `improve typing speed` | Practice landing pages, WPM results recommendation boxes. |
| `/typing-practice` | `typing practice` | `typing paragraphs` | Homepage footer, Gym landing descriptions. |
| `/touch-typing` | `touch typing guide` | `touch typing exercises` | Homepage guides, Gym headers. |
| `/wpm-calculator` | `WPM calculator` | `calculate WPM` | Results pages, sidebar cards. |

---

## 2. Decoupled Page-Level Transitions

We enforce a strict linking path between categories to keep crawl patterns clean:

```
[Typing Test / results] ──► "Practice My Mistakes" ──► [Typing Gym Workspace]
                                                             │
[Touch Typing Page] ◄──── "Learn Finger Positions" ◄─────────┘
        │
        └─────────────────► "Test Your Cadence" ────► [Typing Speed Test]
```

---

## 3. SEO Footer Optimizations
Ensure the footer in `Footer.js` includes direct, crawlable links to:
- `/`
- `/typing-speed-test`
- `/typing-gym`
- `/typing-practice`
- `/touch-typing`
- `/wpm-calculator`
This guarantees search bots discover all landing pages within a single hop from any page on the site.
