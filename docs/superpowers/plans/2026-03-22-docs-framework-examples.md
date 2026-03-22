# Docs Site Framework Examples Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Usage" section to the docs site (`docs/index.html`) with framework-specific code snippets showing how to use doo-iconik in each of the 15 supported frameworks.

**Architecture:** Add a collapsible/tabbed code snippet section to the existing single-page demo site. The section appears between the header and the icon grid. Uses vanilla HTML/CSS/JS only (no build tools — the docs site is static). Tabs for: React, Vue, Svelte, Angular, Solid, Preact, Qwik, Astro, Lit, Vanilla, Alpine, Laravel, Rails, Flutter.

**Tech Stack:** HTML, CSS, vanilla JS

---

### Task 1: Add framework usage section to docs site

**Files:**
- Modify: `docs/index.html`

- [ ] **Step 1: Add CSS for code tabs**

Add these styles inside the existing `<style>` block, before the closing `</style>` tag:

```css
.usage-section {
  max-width: 900px;
  margin: 0 auto var(--spacing-8);
  padding: 0 var(--spacing-4);
}

.usage-section h2 {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-4);
  color: var(--text-primary);
}

.usage-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-3);
}

.usage-tab {
  padding: var(--spacing-1) var(--spacing-3);
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.usage-tab:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.usage-tab.active {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.usage-code {
  display: none;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  overflow-x: auto;
}

.usage-code.active {
  display: block;
}

.usage-code pre {
  margin: 0;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--text-primary);
  white-space: pre;
}

.usage-code .install {
  color: var(--text-muted);
  margin-bottom: var(--spacing-2);
  font-size: 0.75rem;
}
```

- [ ] **Step 2: Add HTML for usage section**

Insert after the controls section and before the icon grid `<div id="grid">`. Add a section like:

```html
<section class="usage-section">
  <h2>Quick Start</h2>
  <div class="usage-tabs" id="usageTabs">
    <button class="usage-tab active" data-tab="react">React</button>
    <button class="usage-tab" data-tab="vue">Vue</button>
    <button class="usage-tab" data-tab="svelte">Svelte</button>
    <button class="usage-tab" data-tab="angular">Angular</button>
    <button class="usage-tab" data-tab="solid">Solid</button>
    <button class="usage-tab" data-tab="lit">Lit</button>
    <button class="usage-tab" data-tab="preact">Preact</button>
    <button class="usage-tab" data-tab="qwik">Qwik</button>
    <button class="usage-tab" data-tab="astro">Astro</button>
    <button class="usage-tab" data-tab="vanilla">Vanilla</button>
    <button class="usage-tab" data-tab="alpine">Alpine</button>
    <button class="usage-tab" data-tab="laravel">Laravel</button>
    <button class="usage-tab" data-tab="rails">Rails</button>
    <button class="usage-tab" data-tab="flutter">Flutter</button>
  </div>
  <!-- One <div class="usage-code" data-tab="react"> block per framework with install + usage -->
</section>
```

Each `usage-code` div contains a `<div class="install">` with the install command and a `<pre>` with a minimal usage example. Use the same code examples from the root README.md.

- [ ] **Step 3: Add tab switching JS**

Inside the existing `<script>` block, add:

```javascript
// Usage tabs
document.querySelectorAll('.usage-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.usage-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.usage-code').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.usage-code[data-tab="${tab.dataset.tab}"]`).classList.add('active');
  });
});
```

- [ ] **Step 4: Verify locally**

Open `docs/index.html` in a browser and confirm:
- Tabs switch correctly
- All 14 framework examples are visible
- Code is readable and properly formatted

- [ ] **Step 5: Commit**

```bash
git add docs/index.html
git commit -m "docs: add framework usage examples to demo site"
```
