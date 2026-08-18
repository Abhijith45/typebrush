# TypeBrush - User Experience & User Flow Guide

This document specification outlines core user flows, keyboard navigation rules, and responsive layouts checkups.

---

## 1. Mapped User Flows

### Flow 1: Typing Test Loop
```
[Home /] ──► [Typing Test /typing-test] ──► [Finish Test] ──► [Results Grid]
```

### Flow 2: Practice Mistakes Redirection
```
[Results Grid] ──► Click "Practice My Mistakes" ──► [Gym Workspace /typing-gym?mode=personalized]
```

---

## 2. Keyboard Navigation & Focus Guidelines

- **Focus Rings outline**: All interactive elements (CTA links, text areas, input fields) must display custom outline highlight styles (`outline: 3px solid var(--accent-color); outline-offset: 4px;`) when focused using keyboard-only Tab inputs.
- **Form triggers**: Submission actions should lock keyboard focus inside dialog fields during API POST queries.

---

## 3. Responsive Screen Layout Rules

- **Bottom Navigation padding**: Elements must have a bottom padding of `7.5rem` on viewports under `768px` to ensure the floating bar doesn't overlay legends or buttons.
- **Horizontal Viewport constraints**: Keyboard boxes must isolate overflow-x scroll indicators locally to lock full-page vertical scaling.
