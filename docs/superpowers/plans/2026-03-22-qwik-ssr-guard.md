# Qwik SSR Guard Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `typeof document !== 'undefined'` SSR guard to the Qwik component's `useVisibleTask$` to prevent server-side crashes, matching the pattern used in React, Solid, and Preact.

**Architecture:** Single-file fix. The Qwik component at `packages/qwik/src/DooIconik.tsx` calls `document.getElementById` inside `useVisibleTask$` without checking if `document` exists. While `useVisibleTask$` with `strategy: 'document-ready'` should only run client-side, adding the guard is defensive best practice and matches all other framework packages.

**Tech Stack:** TypeScript, Qwik

---

### Task 1: Add SSR guard to Qwik component

**Files:**
- Modify: `packages/qwik/src/DooIconik.tsx:32-39`

- [ ] **Step 1: Add the guard**

In `packages/qwik/src/DooIconik.tsx`, change line 32-39 from:

```typescript
  useVisibleTask$(() => {
    if (!document.getElementById('doo-iconik-styles')) {
      const style = document.createElement('style');
      style.id = 'doo-iconik-styles';
      style.textContent = animationCSS;
      document.head.appendChild(style);
    }
  }, { strategy: 'document-ready' });
```

To:

```typescript
  useVisibleTask$(() => {
    if (typeof document !== 'undefined' && !document.getElementById('doo-iconik-styles')) {
      const style = document.createElement('style');
      style.id = 'doo-iconik-styles';
      style.textContent = animationCSS;
      document.head.appendChild(style);
    }
  }, { strategy: 'document-ready' });
```

- [ ] **Step 2: Verify the guard matches other packages**

Run: `grep "typeof document" packages/react/src/DooIconik.tsx packages/solid/src/DooIconik.tsx packages/preact/src/DooIconik.tsx packages/qwik/src/DooIconik.tsx`
Expected: All 4 files should show the guard pattern.

- [ ] **Step 3: Commit**

```bash
git add packages/qwik/src/DooIconik.tsx
git commit -m "fix(qwik): add SSR guard for document access in useVisibleTask$"
```
