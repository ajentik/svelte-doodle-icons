# Package Metadata & Publishing Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add missing npm/pub metadata fields to all 12 JS/TS packages and Angular's `files` field so every package is fully publish-ready.

**Architecture:** All 12 JS/TS packages need `homepage`, `author`, `bugs`, and `sideEffects` fields in `package.json`. Angular additionally needs a `files` field. These are independent edits with no cross-dependencies.

**Tech Stack:** package.json (JSON editing)

---

### Task 1: Add metadata to `@ajentik/doo-iconik`

**Files:**
- Modify: `packages/core/package.json`

- [ ] **Step 1: Add missing fields**

Add these fields to `packages/core/package.json`:

```json
"author": "Ajentik",
"homepage": "https://github.com/ajentik/doo-iconik/tree/main/packages/core",
"bugs": {
  "url": "https://github.com/ajentik/doo-iconik/issues"
},
"sideEffects": false,
```

- [ ] **Step 2: Validate JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('packages/core/package.json','utf-8')); console.log('valid')"`
Expected: `valid`

- [ ] **Step 3: Commit**

```bash
git add packages/core/package.json
git commit -m "chore(core): add homepage, author, bugs, sideEffects metadata"
```

---

### Task 2: Add metadata to all 10 framework packages (react, vue, svelte, solid, lit, preact, qwik, alpine, vanilla, astro)

**Files:**
- Modify: `packages/react/package.json`
- Modify: `packages/vue/package.json`
- Modify: `packages/svelte/package.json`
- Modify: `packages/solid/package.json`
- Modify: `packages/lit/package.json`
- Modify: `packages/preact/package.json`
- Modify: `packages/qwik/package.json`
- Modify: `packages/alpine/package.json`
- Modify: `packages/vanilla/package.json`
- Modify: `packages/astro/package.json`

- [ ] **Step 1: Add fields to each package**

For each package, add these fields (replace `{pkg}` with the package directory name):

```json
"author": "Ajentik",
"homepage": "https://github.com/ajentik/doo-iconik/tree/main/packages/{pkg}",
"bugs": {
  "url": "https://github.com/ajentik/doo-iconik/issues"
},
"sideEffects": false,
```

- [ ] **Step 2: Validate all JSON files**

Run: `for pkg in react vue svelte solid lit preact qwik alpine vanilla astro; do node -e "JSON.parse(require('fs').readFileSync('packages/$pkg/package.json','utf-8')); console.log('$pkg: valid')"; done`
Expected: all `valid`

- [ ] **Step 3: Commit**

```bash
git add packages/react/package.json packages/vue/package.json packages/svelte/package.json packages/solid/package.json packages/lit/package.json packages/preact/package.json packages/qwik/package.json packages/alpine/package.json packages/vanilla/package.json packages/astro/package.json
git commit -m "chore: add homepage, author, bugs, sideEffects to all framework packages"
```

---

### Task 3: Fix Angular package — add `files` field and metadata

**Files:**
- Modify: `packages/angular/package.json`

- [ ] **Step 1: Add `files` and metadata fields**

Add to `packages/angular/package.json`:

```json
"author": "Ajentik",
"homepage": "https://github.com/ajentik/doo-iconik/tree/main/packages/angular",
"bugs": {
  "url": "https://github.com/ajentik/doo-iconik/issues"
},
"sideEffects": false,
"files": ["dist"],
```

Note: Angular uses `ng-packagr` which outputs to `dist/` by default.

- [ ] **Step 2: Validate JSON**

Run: `node -e "const j=JSON.parse(require('fs').readFileSync('packages/angular/package.json','utf-8')); console.log('valid, files:', j.files)"`
Expected: `valid, files: [ 'dist' ]`

- [ ] **Step 3: Commit**

```bash
git add packages/angular/package.json
git commit -m "chore(angular): add files field and publishing metadata"
```
