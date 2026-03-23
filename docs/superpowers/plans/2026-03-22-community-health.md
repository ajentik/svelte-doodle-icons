# Community Health Files Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add all standard open-source community health files: CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, issue templates, PR template, and FUNDING.yml.

**Architecture:** All files are independent of each other and live at the repo root or under `.github/`. No code changes needed — pure documentation.

**Tech Stack:** Markdown, YAML

---

### Task 1: Create CONTRIBUTING.md

**Files:**
- Create: `CONTRIBUTING.md`

- [ ] **Step 1: Create the file**

Create `CONTRIBUTING.md` with the following content:

```markdown
# Contributing to doo-iconik

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
# Clone the repo
git clone https://github.com/ajentik/doo-iconik.git
cd doo-iconik

# Install dependencies (requires Node.js 24+)
npm install

# Generate core icon data
npm run generate

# Build all packages
npm run build
```

## Project Structure

- `icon-data-raw.json` — Source of truth for all 595 icon SVG paths
- `generate.mjs` — Generates TypeScript types and icon data from raw JSON
- `packages/core/` — Framework-agnostic icon data, types, and utilities
- `packages/{framework}/` — Framework-specific component adapters
- `docs/` — GitHub Pages demo site

## Adding Icons

1. Add icon data to `icon-data-raw.json` with `viewBox`, `paths`, and `category`
2. Run `npm run generate` to update core types and data
3. Run sync scripts for non-JS frameworks:
   - `node packages/flutter/scripts/generate-dart-icons.mjs`
   - `node packages/laravel/scripts/sync-icons.mjs`
   - `node packages/rails/scripts/sync-icons.mjs`

## Making Changes

1. Fork the repo and create a feature branch
2. Make your changes following existing code conventions
3. Ensure `npm run generate` and `npm run build` succeed
4. Submit a pull request

## Framework Packages

All JS/TS framework packages depend on `@ajentik/doo-iconik`. The component in each package:
- Imports icon data and utilities from core
- Renders SVGs using the framework's native patterns
- Supports all shared props (name, size, spin, variant, animation, etc.)

When modifying a component, check the equivalent in other frameworks to keep behavior consistent.

## Code Style

- Follow existing patterns in the file you're editing
- Use TypeScript for all JS/TS packages
- No external runtime dependencies beyond framework peer deps

## Reporting Issues

Use [GitHub Issues](https://github.com/ajentik/doo-iconik/issues) with a clear description and reproduction steps.
```

- [ ] **Step 2: Commit**

```bash
git add CONTRIBUTING.md
git commit -m "docs: add CONTRIBUTING.md"
```

---

### Task 2: Create CODE_OF_CONDUCT.md

**Files:**
- Create: `CODE_OF_CONDUCT.md`

- [ ] **Step 1: Create the file**

Create `CODE_OF_CONDUCT.md` using the Contributor Covenant v2.1 (standard for open-source projects). Use the full text from https://www.contributor-covenant.org/version/2/1/code_of_conduct/ with contact email `ajentik@users.noreply.github.com`.

- [ ] **Step 2: Commit**

```bash
git add CODE_OF_CONDUCT.md
git commit -m "docs: add CODE_OF_CONDUCT.md (Contributor Covenant v2.1)"
```

---

### Task 3: Create SECURITY.md

**Files:**
- Create: `SECURITY.md`

- [ ] **Step 1: Create the file**

```markdown
# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT open a public issue**
2. Email: ajentik@users.noreply.github.com
3. Include a description of the vulnerability and steps to reproduce

We will acknowledge receipt within 48 hours and aim to release a fix within 7 days for critical issues.

## Scope

doo-iconik is a client-side SVG icon library. The primary security considerations are:
- SVG path data injection (mitigated: all icon data is static and bundled at build time)
- XSS via innerHTML in Angular, Alpine, Vanilla, Laravel, and Rails adapters (mitigated: icon data is never user-supplied at runtime)
```

- [ ] **Step 2: Commit**

```bash
git add SECURITY.md
git commit -m "docs: add SECURITY.md"
```

---

### Task 4: Create GitHub Issue Templates

**Files:**
- Create: `.github/ISSUE_TEMPLATE/bug_report.md`
- Create: `.github/ISSUE_TEMPLATE/feature_request.md`
- Create: `.github/ISSUE_TEMPLATE/new_icon_request.md`

- [ ] **Step 1: Create bug report template**

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug Report
about: Report a bug in a doo-iconik package
labels: bug
---

## Package

Which package? (e.g., `@ajentik/doo-iconik-react`, `@ajentik/doo-iconik-vue`, `doo_iconik` gem)

## Version



## Description

What happened?

## Expected Behavior

What should have happened?

## Steps to Reproduce

1.
2.
3.

## Environment

- Node.js version:
- Framework version:
- Browser (if applicable):
```

- [ ] **Step 2: Create feature request template**

Create `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
---
name: Feature Request
about: Suggest a new feature or improvement
labels: enhancement
---

## Description

What would you like to see added or changed?

## Use Case

Why is this needed? What problem does it solve?

## Proposed API

How would this be used? (code example appreciated)
```

- [ ] **Step 3: Create icon request template**

Create `.github/ISSUE_TEMPLATE/new_icon_request.md`:

```markdown
---
name: New Icon Request
about: Request a new icon to be added
labels: new-icon
---

## Icon Name

Suggested name (kebab-case):

## Description

What should the icon depict?

## Category

Which category? (arrow, currency, ecommerce, emojis, files, food, health, healthcare, interfaces, logos, misc, objects, technology, userinterface, weather, etc.)

## Reference

Any reference images or existing icons to base it on?
```

- [ ] **Step 4: Commit**

```bash
git add .github/ISSUE_TEMPLATE/
git commit -m "docs: add GitHub issue templates (bug, feature, icon request)"
```

---

### Task 5: Create PR Template

**Files:**
- Create: `.github/PULL_REQUEST_TEMPLATE.md`

- [ ] **Step 1: Create the file**

```markdown
## Description

What does this PR do?

## Changes

-

## Checklist

- [ ] `npm run generate` succeeds
- [ ] Icon counts match across all frameworks (if icon data changed)
- [ ] Framework component behavior is consistent (if component code changed)
- [ ] README updated (if public API changed)
```

- [ ] **Step 2: Commit**

```bash
git add .github/PULL_REQUEST_TEMPLATE.md
git commit -m "docs: add pull request template"
```

---

### Task 6: Create FUNDING.yml

**Files:**
- Create: `.github/FUNDING.yml`

- [ ] **Step 1: Create the file**

```yaml
github: ajentik
```

- [ ] **Step 2: Commit**

```bash
git add .github/FUNDING.yml
git commit -m "docs: add FUNDING.yml"
```
