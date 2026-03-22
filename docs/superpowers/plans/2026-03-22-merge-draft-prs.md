# Merge Draft Icon Refinement PRs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Review, finalize, and merge the 3 draft icon refinement PRs (#15, #16, #17), then re-sync all framework icon data to ensure consistency.

**Architecture:** The 3 draft PRs modify `icon-data-raw.json` and `categories.json` with refined SVG path data. They were created on March 16 and may have merge conflicts with main. After merging, we must re-run all sync scripts (generate, flutter, laravel, rails) to propagate changes to every framework.

**Tech Stack:** Git, Node.js (sync scripts)

---

### Task 1: Review and merge PR #15 (health icons)

**Files touched by PR:** `icon-data-raw.json`, `categories.json` (2 files, 155 additions, 155 deletions)

- [ ] **Step 1: Check for merge conflicts**

```bash
git fetch origin
gh pr view 15 --json mergeable --jq '.mergeable'
```

If `CONFLICTING`, checkout the branch and rebase:
```bash
git checkout icons-health-suite
git rebase main
# Resolve conflicts in icon-data-raw.json if any
git push --force-with-lease
```

- [ ] **Step 2: Review changes**

```bash
gh pr diff 15 | head -100
```

Verify: changes are only to icon path data (no structural changes to JSON schema).

- [ ] **Step 3: Mark ready and merge**

```bash
gh pr ready 15
gh pr merge 15 --merge --delete-branch
```

---

### Task 2: Review and merge PR #16 (tech/logo icons)

**Files touched by PR:** `icon-data-raw.json`, `categories.json` (2 files, 50 additions, 94 deletions)

- [ ] **Step 1: Check for merge conflicts and rebase if needed**

```bash
gh pr view 16 --json mergeable --jq '.mergeable'
```

If conflicting, rebase `icons-tech-logos` onto latest main (which now includes PR #15).

- [ ] **Step 2: Review and merge**

```bash
gh pr ready 16
gh pr merge 16 --merge --delete-branch
```

---

### Task 3: Review and merge PR #17 (commerce/finance/object icons)

**Files touched by PR:** `icon-data-raw.json`, `categories.json` (2 files, 119 additions, 119 deletions)

- [ ] **Step 1: Check for merge conflicts and rebase if needed**

Same pattern as above — rebase `icons-commerce-data` onto latest main.

- [ ] **Step 2: Review and merge**

```bash
gh pr ready 17
gh pr merge 17 --merge --delete-branch
```

---

### Task 4: Re-sync all frameworks after icon changes

**Files:**
- Regenerated: `packages/core/src/types.ts`
- Regenerated: `packages/core/src/icon-data.ts`
- Regenerated: `packages/flutter/lib/src/icon_data.dart`
- Regenerated: `packages/laravel/data/icon-data.json`
- Regenerated: `packages/rails/data/icon-data.json`

- [ ] **Step 1: Pull latest main and regenerate**

```bash
git checkout main
git pull
node generate.mjs
node packages/flutter/scripts/generate-dart-icons.mjs
node packages/laravel/scripts/sync-icons.mjs
node packages/rails/scripts/sync-icons.mjs
```

- [ ] **Step 2: Verify icon counts still match**

```bash
node -e "
const raw = Object.keys(JSON.parse(require('fs').readFileSync('icon-data-raw.json','utf-8'))).length;
const core = require('fs').readFileSync('packages/core/src/icon-data.ts','utf-8').match(/\"[^\"]+\":\s*\{/g)?.length||0;
const dart = require('fs').readFileSync('packages/flutter/lib/src/icon_data.dart','utf-8').match(/'[^']+':\s*DooIconikData\(/g)?.length||0;
const laravel = Object.keys(JSON.parse(require('fs').readFileSync('packages/laravel/data/icon-data.json','utf-8'))).length;
const rails = Object.keys(JSON.parse(require('fs').readFileSync('packages/rails/data/icon-data.json','utf-8'))).length;
console.log('raw:', raw, '| core:', core, '| flutter:', dart, '| laravel:', laravel, '| rails:', rails);
const allMatch = [core,dart,laravel,rails].every(n=>n===raw);
console.log(allMatch ? '✅ All synced' : '❌ MISMATCH');
"
```

- [ ] **Step 3: Commit and push**

```bash
git checkout -b chore/resync-after-icon-refinement
git add packages/core/src/types.ts packages/core/src/icon-data.ts packages/flutter/lib/src/icon_data.dart packages/laravel/data/icon-data.json packages/rails/data/icon-data.json
git commit -m "chore: re-sync all framework icon data after refinement merges"
git push -u origin chore/resync-after-icon-refinement
gh pr create --title "chore: re-sync all framework icon data after refinement merges" --body "Re-generated icon data for all frameworks after merging PRs #15, #16, #17." --base main
gh pr merge --merge --delete-branch
```
