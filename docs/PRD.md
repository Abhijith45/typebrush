# TypeBrush — Product Requirements Document

**Version:** 1.0
**Status:** Locked for MVP development
**Product:** TypeBrush
**Domain:** typebrush.in
**Tagline:** Free Typing Tests & Practice

---

## 1. Product Vision

TypeBrush is a lightweight, free, browser-based typing platform focused on helping users:

* Measure typing speed and accuracy.
* Practice typing.
* Improve weak typing skills.
* Practice numbers and paragraphs.
* Eventually prepare for programming and competitive-exam typing tests.

The primary acquisition strategy is **organic Google search**, while the product itself must provide enough interactive value to encourage repeat usage.

The product should be fast, mobile-friendly, privacy-friendly, and usable without registration.

---

## 2. Target Users

### Primary

1. Students
2. Job seekers
3. People improving typing speed
4. Users searching for online typing tests
5. Users preparing for typing-related examinations

### Secondary / Future

* Programmers practicing code typing
* Indian competitive-exam candidates
* Teachers/trainers
* Users practicing Hindi/English typing

---

## 3. Core SEO Strategy

TypeBrush should target **search intent + useful interactive experiences**, not create thin pages for every keyword.

### Primary keyword cluster

* typing test
* typing speed test
* typing practice
* online typing test
* WPM test

These have very large search demand but strong competition.

### Initial long-tail targets

* number typing test
* numeric typing test
* 1 minute typing test
* 2 minute typing test
* 5 minute typing test
* 10 minute typing test
* English typing paragraph
* English passage for typing
* coding typing practice
* programming typing test

Existing traffic data shows that smaller typing websites can receive meaningful traffic from specific long-tail terms such as `number typing test`, `2 minute typing test`, and `10 minute typing test`.

### Future SEO clusters

* Hindi typing test
* English typing test
* SSC typing test
* SSC CHSL typing test
* SSC CGL typing test
* Kruti Dev typing
* Mangal typing
* Inscript typing
* programming typing
* JavaScript typing test
* Python typing test

---

## 4. MVP Scope

### 4.1 Homepage

URL:

`/`

Purpose:

* Clearly explain TypeBrush.
* Present the primary typing test.
* Provide links to major typing-test categories.
* Establish SEO relevance for typing-related searches.

Main CTA:

**Start Typing Test**

---

### 4.2 Standard Typing Test

URL:

`/typing-test`

Features:

* Random typing passage.
* Start / pause / restart.
* Timer.
* Real-time character validation.
* Correct characters.
* Incorrect characters.
* WPM.
* Accuracy.
* Errors.
* Completion state.
* Final result screen.
* Retry test.

Default test should be simple and fast.

---

### 4.3 Duration Tests

Create genuinely distinct test configurations:

`/typing-test/1-minute`

`/typing-test/2-minute`

`/typing-test/5-minute`

`/typing-test/10-minute`

Each page must have:

* Appropriate duration.
* Relevant introductory content.
* Actual working test.
* Results.
* Internal links to related tests.

Do not create pages that only change the title while providing identical content.

---

### 4.4 Number Typing Test

URL:

`/typing-test/number`

Purpose:

Practice typing numbers and numeric sequences.

Metrics:

* WPM/KPM where appropriate.
* Accuracy.
* Correct numbers.
* Incorrect numbers.
* Errors.

This is one of the priority long-tail opportunities.

---

### 4.5 Typing Practice

URL:

`/typing-practice`

Provide:

* Beginner practice.
* Intermediate practice.
* Advanced practice.
* Word practice.
* Sentence practice.
* Paragraph practice.

---

### 4.6 English Paragraph Practice

URLs:

`/typing-practice/english-paragraph`

`/typing-practice/english-passage`

Provide meaningful passages grouped by difficulty/length.

---

### 4.7 Results

Results should show:

* WPM
* Accuracy
* Correct characters
* Incorrect characters
* Errors
* Test duration
* Performance message
* Retry button
* Practice recommendation

Future versions may add historical statistics.

---

## 5. Differentiating Feature

### Weak-Key Practice — MVP-lite

After a typing test, identify frequently mistyped characters.

Example:

```text
Your WPM: 58
Accuracy: 94%

Weak keys:
R
T
H
I

Recommended:
Practice these keys
```

The first implementation can simply identify frequently incorrect characters.

Future versions can generate targeted exercises automatically.

This is intended to make TypeBrush more than another basic WPM calculator.

---

## 6. Future Product Roadmap

### V1 (Current)
- **Framework**: Next.js App Router static export, CDN hosted.
- **Storage Layer**: Local preferences in LocalStorage. Performance analytics, typing history, and progress levels stored client-side in **IndexedDB** (`TypeBrushDB`) with atomic fallback support.
- **Typing Engine**: Timed tests, real-time typing analysis, Net/Raw accuracy metrics.
- **Typing Gym**: Guided training (Curriculum goals, finger positioning, level progression) and Personalized training (error recommendation coach).
- **Tooling**: Scorecards generation (PDF reports), custom responsive sharing.

### V2 (Cloud Integration)
- **User Accounts**: Authentication layer via Supabase Auth.
- **Cross-Device Sync**: Synchronize local IndexedDB history and progress levels to the cloud.
- **Dashboard**: Advanced profile statistics, growth trends, historical records from all devices.

### V3 (AI Typing Coach)
- **Personalized Plans**: Local WebLLM-powered analysis of weak keys and error frequency to generate customized learning exercises.
- **Weekly AI Reports**: Direct diagnostic coaching suggestions and progress emails.
- **Monetization**: Introduce premium subscriptions for AI coaching and advanced insights.

### V4 (Gamification & Enterprise)
- **Achievements & Leaderboards**: Global multiplayer typing challenges and certificates.
- **Institutions**: College and school dashboards, team progress trackers, and classroom training mode.

---

## 7. SEO Architecture

Use clean, indexable URLs.

Initial routes:

```text
/
 /typing-test
 /typing-test/1-minute
 /typing-test/2-minute
 /typing-test/5-minute
 /typing-test/10-minute
 /typing-test/number
 /typing-practice
 /typing-practice/english-paragraph
 /typing-practice/english-passage
```

Every indexable page must have:

* Unique `<title>`
* Unique meta description
* Canonical URL
* One clear H1
* Semantic HTML
* Useful explanatory content
* Internal links
* Open Graph metadata
* Structured data where appropriate
* Mobile-friendly layout

Do not generate hundreds of thin keyword-targeted pages.

---

## 8. Technical Architecture

### Framework
**Next.js App Router**

### Rendering Strategy
Static HTML generation (`output: 'export'`) served via Netlify CDN.

### Components
- **Server Components**: SEO layout, page structure, metadata configurations, indexable articles.
- **Client Components**: Interactive QWERTY keyboard, typing test engine, results analytics grid, share modals, GymWorkspace state coordinator.

### Database (Browser-bound)
**IndexedDB** serves as the primary local database (`TypeBrushDB`) version 1. Exposes transactional stores for `typing_results`, `gym_sessions`, `progress_tracking`, `weak_key_analysis`, `user_achievements`, `scorecards`, and `future_ai_cache`.

### Fallback Layer
If IndexedDB permissions are denied or unavailable (e.g. private browsing modes), the storage coordinator automatically redirects calls to LocalStorage under localized backup keys (`typebrush:backup:*`) ensuring zero application crashes.

### Legacy Data Migration
Upon app load, V1 LocalStorage keys are parsed, records are imported into corresponding IndexedDB stores, and old LocalStorage keys are safely deleted.

---

## 9. Deployment

### Platform

**Netlify**

Deployment should be static/CDN-first.

Requirements:

* Production HTTPS.
* Custom domain: `typebrush.in`
* `www` handling/redirect.
* `robots.txt`
* `sitemap.xml`
* Proper 404 page.
* Production build optimization.

No server/database should be required for the initial product.

---

## 10. Performance Requirements

TypeBrush is intended to be extremely lightweight.

Targets:

* Fast initial page load.
* Minimal JavaScript on SEO/content pages.
* Lazy-load non-critical client functionality where practical.
* Avoid unnecessary third-party libraries.
* Avoid large UI frameworks unless justified.
* Avoid unnecessary API requests.
* Typing engine must remain responsive on low-end mobile devices.
* No external request should be required to perform a basic typing test.

The typing test should work even with unreliable connectivity after the page has loaded.

---

## 11. UI / UX Direction

Design should be:

* Clean
* Minimal
* Modern
* Friendly
* Fast
* Mobile-first
* Keyboard-focused

Avoid:

* Excessive animations.
* Heavy gradients.
* Large hero illustrations.
* Clutter.
* Aggressive advertisements.
* Login/signup requirements.
* Popups before the user can start typing.

The primary action should always be obvious:

**Start Test → Type → View Result → Try Again / Practice**

---

## 12. Analytics & SEO Monitoring

Install:

* Google Search Console
* Google Analytics 4

Track:

* Organic sessions.
* Search impressions.
* Click-through rate.
* Ranking keywords.
* Test starts.
* Test completions.
* Average test duration.
* Retry rate.
* Practice-page usage.

Search Console data should guide future pages and features.

---

## 13. Monetization

### V1-V2 (Growth Phase)
- Fully free, privacy-friendly typing tests.
- Non-intrusive advertisements on results screens.

### V3-V4 (Monetization Phase)
- **AI Coach Premium Subscriptions**: Subscriptions for custom learning plans and local LLM diagnostics.
- **Official Certification**: Pay-to-print verified typing speed certificates.
- **SaaS / Institution Accounts**: B2B licenses for schools, colleges, and corporations to track user speeds.

---

## 14. MVP Success Criteria

The MVP is complete when:

* All initial routes work.
* Typing engine works reliably.
* WPM calculation is correct.
* Accuracy calculation is correct.
* Results are reliable.
* Mobile keyboard interaction works.
* Pages are statically generated/indexable.
* Sitemap and robots.txt are available.
* Canonical URLs are correct.
* Internal linking is implemented.
* Lighthouse/Core Web Vitals are optimized as far as reasonably possible.
* Site is deployed successfully on `typebrush.in`.
* Google Search Console can discover the sitemap.
* No backend/database is required.

---

## 15. Explicit Non-Goals for MVP

Do **not** implement initially:

* User accounts.
* Authentication.
* Database.
* Cloud synchronization.
* Multiplayer.
* Leaderboards.
* Payments.
* AI-generated typing content.
* Large blog section.
* Hundreds of SEO landing pages.
* Native mobile application.
* Complex admin panel.

Build the smallest excellent product first.

---

## 16. Product Principle

The central principle for TypeBrush is:

> **Every SEO page must also be a genuinely useful product page.**

We are not building an SEO content farm.

We are building a real typing product whose interactive functionality naturally creates search-worthy pages.

The long-term goal is:

**Google search → TypeBrush → Typing test → Useful result → Practice → Return visit.**
