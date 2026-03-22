# README Badges Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add status badges (CI, license, icon count, npm version) to the root README and per-package READMEs for discoverability and trust signals.

**Architecture:** Use shields.io static and dynamic badges. Root README gets a full badge row. Per-package READMEs get an npm version badge. Badges are purely Markdown image links — no code changes.

**Tech Stack:** Markdown, shields.io

---

### Task 1: Add badges to root README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add badge row after the title**

Replace the first two lines of `README.md`:

```markdown
# doo-iconik

595 hand-drawn doodle style SVG icons for any framework.
```

With:

```markdown
# doo-iconik

[![CI](https://github.com/ajentik/doo-iconik/actions/workflows/ci.yml/badge.svg)](https://github.com/ajentik/doo-iconik/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Icons](https://img.shields.io/badge/icons-595-blueviolet)](https://ajentik.github.io/doo-iconik/)
[![Frameworks](https://img.shields.io/badge/frameworks-15-blue)](https://github.com/ajentik/doo-iconik#packages)

595 hand-drawn doodle style SVG icons for any framework.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add CI, license, icon count, and framework badges to README"
```

---

### Task 2: Add npm badges to per-package READMEs

**Files:**
- Modify: `packages/core/README.md`
- Modify: `packages/react/README.md`
- Modify: `packages/vue/README.md`
- Modify: `packages/svelte/README.md`
- Modify: `packages/angular/README.md`
- Modify: `packages/solid/README.md`
- Modify: `packages/lit/README.md`
- Modify: `packages/preact/README.md`
- Modify: `packages/qwik/README.md`
- Modify: `packages/alpine/README.md`
- Modify: `packages/vanilla/README.md`
- Modify: `packages/astro/README.md`

- [ ] **Step 1: Add npm version badge to each package README**

For each JS/TS package, add a badge line after the `# @doo-iconik/{name}` heading:

```markdown
# @doo-iconik/{name}

[![npm version](https://img.shields.io/npm/v/@doo-iconik/{name}.svg)](https://www.npmjs.com/package/@doo-iconik/{name})
```

Replace `{name}` with each package name: core, react, vue, svelte, angular, solid, lit, preact, qwik, alpine, vanilla, astro.

- [ ] **Step 2: Add badges to Flutter, Laravel, Rails READMEs**

For `packages/flutter/README.md`:
```markdown
[![pub version](https://img.shields.io/pub/v/doo_iconik.svg)](https://pub.dev/packages/doo_iconik)
```

For `packages/laravel/README.md`:
```markdown
[![Packagist Version](https://img.shields.io/packagist/v/ajentik/doo-iconik-laravel.svg)](https://packagist.org/packages/ajentik/doo-iconik-laravel)
```

For `packages/rails/README.md`:
```markdown
[![Gem Version](https://img.shields.io/gem/v/doo_iconik.svg)](https://rubygems.org/gems/doo_iconik)
```

- [ ] **Step 3: Commit**

```bash
git add packages/*/README.md
git commit -m "docs: add version badges to all per-package READMEs"
```
