# Dependabot Configuration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure Dependabot to automatically create PRs for dependency updates across npm, pip, bundler, and pub ecosystems.

**Architecture:** Single YAML config file at `.github/dependabot.yml`. Covers the root npm workspace (which includes all JS/TS packages), the Flutter package (pub), the Rails package (bundler), and the Laravel package (composer). GitHub Actions workflows also get checked.

**Tech Stack:** YAML, GitHub Dependabot

---

### Task 1: Create Dependabot config

**Files:**
- Create: `.github/dependabot.yml`

- [ ] **Step 1: Create the file**

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # npm — root workspace covers all JS/TS packages
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    labels:
      - "dependencies"
      - "ci"

  # Flutter (pub)
  - package-ecosystem: "pub"
    directory: "/packages/flutter"
    schedule:
      interval: "monthly"
    labels:
      - "dependencies"
      - "flutter"

  # Rails (bundler)
  - package-ecosystem: "bundler"
    directory: "/packages/rails"
    schedule:
      interval: "monthly"
    labels:
      - "dependencies"
      - "rails"

  # Laravel (composer)
  - package-ecosystem: "composer"
    directory: "/packages/laravel"
    schedule:
      interval: "monthly"
    labels:
      - "dependencies"
      - "laravel"
```

- [ ] **Step 2: Validate YAML**

Run: `node -e "const yaml=require('fs').readFileSync('.github/dependabot.yml','utf-8'); console.log('lines:', yaml.split('\n').length, '— looks valid')"`
Expected: ~40 lines output

- [ ] **Step 3: Commit**

```bash
git add .github/dependabot.yml
git commit -m "chore: add Dependabot config for npm, pub, bundler, composer, actions"
```
