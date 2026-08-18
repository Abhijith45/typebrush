# TypeBrush — Search Engine Optimization (SEO) Guide

This guide documents search keywords target mappings, internal link configurations, and indexing requirements.

---

## 1. Target Keywords Mapping

- **`/touch-typing`**: `touch typing`, `touch typing exercises`, `home row finger placement`.
- **`/wpm-calculator`**: `wpm calculator`, `words per minute calculator`, `typing speed formula`.
- **`/typing-speed-test`**: `typing speed test`, `wpm typing test`, `free online typing test`.

---

## 2. Internal Linking Silo Strategy

To flow authority throughout TypeBrush, the link layout is structured in silos:
- **Crawl Gateway**: Footer lists contain a "Guides & Tools" column category redirecting to child landing guides.
- **Contextual In-Paragraph Anchors**:
  - Educational guide `/touch-typing` links directly to `/typing-gym`.
  - Tool page `/wpm-calculator` links back to `/typing-test`.

---

## 3. Crawl & Indexing Audit Rules

- **Sitemap Location**: `https://typebrush.netlify.app/sitemap.xml`
- **Canonical Setup**: Always override layouts with `alternates: { canonical: "/" }` matching the static directory URL mapping.
- **Microdata Scripts**: Deliver BreadcrumbList schemas and WebApplication metadata configurations to optimize search ranking visuals.
