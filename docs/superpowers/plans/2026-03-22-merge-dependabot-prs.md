# Merge Dependabot PRs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Review and merge the 6 open Dependabot PRs (#28–#33) to update dependencies and resolve known vulnerabilities.

**Architecture:** Dependabot PRs are independent and auto-generated. GitHub Actions bumps (#28–#31) are safe to merge immediately. Dev dependency bumps (#32 `@types/react`, #33 `astro`) need a quick compatibility check. Merge in order: actions first, then dev deps.

**Tech Stack:** Git, GitHub CLI

---

### Task 1: Merge GitHub Actions bumps (safe, no code impact)

- [ ] **Step 1: Merge actions/checkout v4 → v6**

```bash
gh pr merge 30 --merge --delete-branch
```

- [ ] **Step 2: Merge actions/setup-node v4 → v6**

```bash
gh pr merge 31 --merge --delete-branch
```

- [ ] **Step 3: Merge actions/upload-pages-artifact v3 → v4**

```bash
gh pr merge 29 --merge --delete-branch
```

- [ ] **Step 4: Merge peter-evans/repository-dispatch v3 → v4**

```bash
gh pr merge 28 --merge --delete-branch
```

---

### Task 2: Review and merge dev dependency bumps

- [ ] **Step 1: Review @types/react bump (#32)**

`@types/react` 18.3.28 → 19.2.14 — this is a major version bump. Check compatibility:

```bash
gh pr diff 32 | head -30
```

Since React types v19 are needed for React 19 peer dep support (already declared in our `peerDependencies`), this is compatible.

```bash
gh pr merge 32 --merge --delete-branch
```

- [ ] **Step 2: Review Astro bump (#33)**

`astro` 4.16.19 → 6.0.8 — major version bump in devDependencies. Check:

```bash
gh pr diff 33 | head -30
```

Since Astro is only a devDependency/peerDependency, and our component uses standard `.astro` syntax, this should be compatible. However, check if our `peerDependencies` need updating:

Currently: `"astro": "^3.0.0 || ^4.0.0"` — needs to add `|| ^5.0.0 || ^6.0.0`.

If the PR only bumps `devDependencies`, also update `peerDependencies` in `packages/astro/package.json`:

```json
"peerDependencies": {
  "astro": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0"
}
```

```bash
gh pr merge 33 --merge --delete-branch
```

If peerDependencies needs updating, do it in a separate commit after merging:

```bash
git checkout main && git pull
# Edit packages/astro/package.json peerDependencies
git checkout -b chore/astro-peer-dep-range
git add packages/astro/package.json
git commit -m "chore(astro): extend peerDependencies to support Astro 5 and 6"
git push -u origin chore/astro-peer-dep-range
gh pr create --title "chore(astro): extend peerDependencies to support Astro 5 and 6" --base main
gh pr merge --merge --delete-branch
```

---

### Task 3: Pull latest main

- [ ] **Step 1: Update local main**

```bash
git checkout main
git pull
```

- [ ] **Step 2: Verify no remaining vulnerability alerts**

Check: https://github.com/ajentik/doo-iconik/security/dependabot
