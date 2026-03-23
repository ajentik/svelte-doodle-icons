# NPM Publish Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GitHub Actions workflow to publish all JS/TS packages to npm when a GitHub Release is created, with manual trigger support.

**Architecture:** A single workflow `.github/workflows/publish.yml` triggered on GitHub Release creation or manual `workflow_dispatch`. It builds all packages, then publishes each to npm using `npm publish --workspace=packages/{name}`. Uses `NPM_TOKEN` secret for authentication. Non-JS packages (Flutter, Laravel, Rails) are out of scope — they publish to pub.dev, Packagist, and RubyGems respectively and need separate workflows.

**Tech Stack:** GitHub Actions, npm

---

### Task 1: Create publish workflow

**Files:**
- Create: `.github/workflows/publish.yml`

- [ ] **Step 1: Create the workflow file**

```yaml
name: Publish to npm

on:
  release:
    types: [published]
  workflow_dispatch:
    inputs:
      dry-run:
        description: 'Dry run (no actual publish)'
        required: false
        default: 'false'
        type: boolean

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          registry-url: 'https://registry.npmjs.org'

      - run: npm install

      - name: Generate icon data
        run: node generate.mjs

      - name: Build all packages
        run: npm run build

      - name: Publish packages
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: |
          DRYRUN=""
          if [ "${{ inputs.dry-run }}" = "true" ]; then
            DRYRUN="--dry-run"
          fi

          for pkg in core react vue svelte angular solid lit preact qwik alpine vanilla astro; do
            if [ "$pkg" = "core" ]; then PKG_NAME="@ajentik/doo-iconik"; else PKG_NAME="@ajentik/doo-iconik-$pkg"; fi
            echo "Publishing $PKG_NAME..."
            npm publish --workspace=packages/$pkg --access public $DRYRUN || echo "Failed to publish $pkg (may already exist)"
          done
```

- [ ] **Step 2: Document the publish process**

Add to `CONTRIBUTING.md` a "Releasing" section:

```markdown
## Releasing

1. Update version in all `packages/*/package.json` files
2. Update `CHANGELOG.md`
3. Create a GitHub Release with the version tag (e.g., `v1.0.1`)
4. The publish workflow will automatically publish to npm
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/publish.yml
git commit -m "ci: add npm publish workflow on GitHub Release"
```

---

### Future: Additional publish workflows

These would be separate plans:

- **pub.dev** — `dart pub publish` for Flutter package
- **Packagist** — auto-publish via GitHub webhook for Laravel package
- **RubyGems** — `gem build && gem push` for Rails gem
- **Changesets** — automated version bumping and coordinated multi-package releases
