# Spec #42 — Docs Gallery Improvements

**Issue**: https://github.com/ajentik/doo-iconik/issues/42
**Status**: 🟡 ~95% done — one remaining item

## Summary

Improve the interactive icon gallery at `docs/index.html` with light/dark mode, icon count, URL state, accessibility, and performance.

## What Was Implemented (PR #46)

| Feature | Status | Details |
|---------|--------|---------|
| Light/dark toggle | ✅ | Button in header, `localStorage` persistence, `prefers-color-scheme` detection |
| Icon count badge | ✅ | "Showing **X** of **595**" in controls bar |
| URL state sync | ✅ | `?q=` and `?cat=` params via `history.replaceState` |
| Empty state | ✅ | Friendly message with search icon when no results |
| OG meta tags | ✅ | `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `theme-color` |
| Lazy rendering | ✅ | `IntersectionObserver` for icon SVG rendering |
| Skip-to-content link | ✅ | `<a href="#icon-grid" class="skip-link">Skip to icons</a>` at line 882 |
| Preview panel a11y | ✅ | `role="dialog"` + `aria-modal="true"` + `aria-label` |

## Remaining Work

### 1. Preview Panel Focus Trap

**Current behavior**: When the preview panel opens, focus is not moved into the panel and the user can Tab behind the overlay to the grid and controls.

**Required changes** in `docs/index.html`:

#### a. Move focus on open
In the `openPreview()` function (~line 1585), after `.classList.add('active')`:
```js
// Focus the close button when preview opens
document.getElementById('previewClose').focus();
```

#### b. Trap focus inside panel
Add a keydown listener when panel is open that wraps Tab between the first and last focusable elements inside `#previewPanel`:
```js
function trapFocus(e) {
  if (e.key !== 'Tab') return;
  const panel = document.getElementById('previewPanel');
  const focusable = panel.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
```

#### c. Restore focus on close
In `closePreview()`, restore focus to the card that triggered the preview:
```js
// Store trigger element in openPreview:
previewState.triggerEl = document.activeElement;

// In closePreview:
if (previewState.triggerEl) previewState.triggerEl.focus();
```

#### d. Add/remove trap listener
```js
// In openPreview:
document.addEventListener('keydown', trapFocus);

// In closePreview:
document.removeEventListener('keydown', trapFocus);
```

### Files to Change

- `docs/index.html` — add focus management to `openPreview()` and `closePreview()` functions

### Acceptance Criteria

- [ ] Opening preview moves focus to close button
- [ ] Tab/Shift+Tab cycles within the preview panel only
- [ ] Closing preview returns focus to the triggering icon card
- [ ] Escape still closes the panel (already works)

### Estimated Effort

~20 minutes

## Out of Scope

All other items from the original issue are complete. No further changes needed.
