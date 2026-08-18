# TypeBrush - Production Deployment Guide

This guide documents the procedures for compiling and launching TypeBrush.

---

## 1. Production Build Commands

To build the application locally or in CI environments:
```bash
# Verify ESLint syntax compliance
npm run lint

# Compile production bundles
npm run build
```

---

## 2. Environment Variables Configuration

Ensure the following variables are declared inside `.env.local` before building:
- `NEXT_PUBLIC_FEEDBACK_API_URL`: Targets the Google Apps Script Web App API endpoint.

---

## 3. Post-Deployment Verification
1. Verify `https://typebrush.netlify.app/sitemap.xml` returns valid sitemap XML content.
2. Confirm robots access triggers are allowing search crawler indexes.
3. Validate client-side feedback submission dispatches.
