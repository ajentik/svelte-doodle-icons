# Docs Site Interactive Variant/Animation Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the docs site with an interactive preview panel that shows a selected icon with live variant and animation controls, plus a copyable code snippet that updates in real time.

**Architecture:** When a user clicks an icon card, instead of just copying the name, a preview panel slides open showing the icon at large size with controls for size, variant, animation, color, and flip. Below the preview, a code snippet auto-updates showing the React/Vue/etc. import for the selected configuration. This builds on the existing `docs/index.html` single-page app.

**Tech Stack:** HTML, CSS, vanilla JS (no build tools)

---

### Task 1: Add preview panel UI

**Files:**
- Modify: `docs/index.html`

- [ ] **Step 1: Add CSS for preview panel**

Add styles for a slide-out preview panel:
- Fixed/sticky panel on the right (desktop) or bottom sheet (mobile)
- Large icon preview area (128px)
- Controls for: size selector, variant pills, animation pills, color picker, flip toggles
- Code snippet area with syntax highlighting and copy button
- Close button

- [ ] **Step 2: Add HTML structure**

Add a `<div id="preview-panel" class="preview-panel">` after the grid with:
- Close button
- Icon name heading
- Large SVG preview container
- Control rows: size, variant, animation, color, flipH, flipV
- Framework tab selector (React, Vue, Svelte, etc.)
- `<pre>` code block with copy button

- [ ] **Step 3: Add JS logic**

Modify the icon card click handler:
- Instead of copying name directly, open preview panel with selected icon
- Wire up all controls to update the preview SVG live
- Generate code snippet based on selected framework + options
- Copy button copies the code snippet

Example generated snippet:
```jsx
import { DooIconik } from '@ajentik/doo-iconik-react';

<DooIconik name="heart" size="lg" variant="neon" animation="heartbeat" />
```

- [ ] **Step 4: Mobile responsive**

Ensure preview panel works on mobile:
- Full-width bottom sheet on screens < 768px
- Swipe down to close
- Controls wrap properly

- [ ] **Step 5: Commit**

```bash
git add docs/index.html
git commit -m "docs: add interactive preview panel with live code generation"
```

---

### Design Details

**Preview panel layout (desktop):**
```
┌──────────────────────────────────────────┐
│  ✕  heart                                │
│                                          │
│          ┌──────────┐                    │
│          │          │                    │
│          │   ♥      │   128px preview    │
│          │          │                    │
│          └──────────┘                    │
│                                          │
│  Size:   xs  sm  [md]  lg  xl  2xl       │
│  Variant: default glow neon shadow ...   │
│  Animate: none spin pulse bounce ...     │
│  Color:  [████]  FlipH [  ] FlipV [  ]   │
│                                          │
│  ┌─ React ─┬─ Vue ─┬─ Svelte ─┬─ ... ─┐ │
│  │ import { DooIconik }         [Copy] │ │
│  │   from '@ajentik/doo-iconik-react';         │ │
│  │                                     │ │
│  │ <DooIconik                          │ │
│  │   name="heart"                      │ │
│  │   size="md"                         │ │
│  │   variant="neon"                    │ │
│  │ />                                  │ │
│  └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

**State management:**
```javascript
const previewState = {
  icon: null,        // selected icon name
  size: 'md',
  variant: 'default',
  animation: 'none',
  color: '#ffffff',
  flipH: false,
  flipV: false,
  framework: 'react'
};
```

**Code generators (one per framework):**
Each generates a copyable snippet. For example:

- React: `<DooIconik name="heart" size="lg" variant="neon" />`
- Vue: `<DooIconik name="heart" size="lg" variant="neon" />`
- Blade: `<x-doo-iconik name="heart" size="lg" variant="neon" />`
- Rails: `<%= doo_iconik 'heart', size: :lg, variant: :neon %>`
- Flutter: `DooIconik(name: 'heart', size: DooIconikSize.lg, variant: DooIconikVariant.neon)`

Only include non-default props in the generated snippet.
