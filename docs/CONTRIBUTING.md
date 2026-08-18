# TypeBrush — Code Contribution Guidelines

Thank you for contributing to TypeBrush! Follow these steps to submit clean code changes.

---

## 1. Code Style Guidelines

- **Next.js & React Conventions**: Use Client Components only when UI state updates are required. Keep static header/footer components lightweight.
- **Form States**: Avoid calling setState synchronously within `useEffect` bodies to prevent cascading renders.
- **CSS Classes**: Enforce theme-token mappings using CSS properties like `var(--accent-color)` inside components.

---

## 2. Testing Checklist

Before opening pull requests, verify the following steps:
1. Run syntax verification checks (`npm run lint`).
2. Verify production compiles cleanly (`npm run build`).
3. Check responsive grids scale down to 375px without layout overflows.
