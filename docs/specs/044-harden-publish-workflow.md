# Spec #44 — Harden Publish Workflow

**Issue**: https://github.com/ajentik/doo-iconik/issues/44
**Status**: 🟡 ~30% done — test gate and core-first build added, 4 items remaining

## Summary

Improve `.github/workflows/publish.yml` with provenance, version sync, automatic `file:` dependency rewrite, and icon count verification.

## Current Workflow (after PR #46)

```yaml
steps:
  - checkout
  - setup-node (v24, registry-url: npm)
  - npm install
  - Generate icon data (node generate.mjs)
  - Build core package first              # ✅ Added in PR #46
  - Build all packages (--workspaces)
  - Run tests (npx vitest run)            # ✅ Added in PR #46
  - Publish loop: core → 11 framework packages (--access public)
```

## What's Done

- [x] Build core before other packages
- [x] Test gate (`npx vitest run`) before publish

## Remaining Changes

### 1. Add `--provenance` Flag

npm provenance links published packages to their source commit and build, improving supply-chain security. The workflow already has `id-token: write` permission.

**Change**: In the publish step, add `--provenance` to the `npm publish` command.

```diff
- if ! npm publish --workspace=packages/$pkg --access public $DRYRUN; then
+ if ! npm publish --workspace=packages/$pkg --access public --provenance $DRYRUN; then
```

**Location**: `.github/workflows/publish.yml` line 55

### 2. Add Version Sync Check

Verify all `package.json` versions match the release tag before publishing. This prevents publishing mismatched versions.

**Add step** after "Run tests", before "Publish":

```yaml
      - name: Verify version sync
        if: github.event_name == 'release'
        run: |
          TAG="${GITHUB_REF#refs/tags/v}"
          echo "Release tag version: $TAG"
          FAIL=0
          for pkg in packages/*/package.json; do
            VER=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$pkg','utf8')).version)")
            if [ "$VER" != "$TAG" ]; then
              echo "::error::$pkg version ($VER) does not match tag v$TAG"
              FAIL=1
            fi
          done
          if [ "$FAIL" -eq 1 ]; then exit 1; fi
```

**Note**: This checks all 12 npm packages + laravel/rails/flutter. If non-npm packages version independently, exclude them:
```bash
for pkg in packages/{core,react,vue,svelte,angular,solid,lit,preact,qwik,alpine,vanilla,astro}/package.json; do
```

### 3. Auto-Rewrite `file:../core` → `^<version>`

All 11 framework packages use `"@ajentik/doo-iconik": "file:../core"` for local development. This must be rewritten to a semver range before publishing.

**Add step** after "Verify version sync", before "Publish":

```yaml
      - name: Rewrite core dependency for publish
        run: |
          CORE_VER=$(node -e "console.log(JSON.parse(require('fs').readFileSync('packages/core/package.json','utf8')).version)")
          echo "Core version: $CORE_VER"
          for pkg in react vue svelte angular solid lit preact qwik alpine vanilla astro; do
            FILE="packages/$pkg/package.json"
            node -e "
              const fs = require('fs');
              const p = JSON.parse(fs.readFileSync('$FILE', 'utf8'));
              if (p.dependencies && p.dependencies['@ajentik/doo-iconik'] && p.dependencies['@ajentik/doo-iconik'].startsWith('file:')) {
                p.dependencies['@ajentik/doo-iconik'] = '^$CORE_VER';
                fs.writeFileSync('$FILE', JSON.stringify(p, null, 2) + '\n');
                console.log('Rewrote $FILE: @ajentik/doo-iconik → ^$CORE_VER');
              }
            "
          done
```

**Important**: This rewrites files only in the CI runner, never committed to the repo. Local development continues using `file:../core`.

### 4. Add Icon Count Verification

Mirror the CI workflow's icon count check to ensure data integrity before publishing.

**Add step** after "Build all packages":

```yaml
      - name: Verify icon counts
        run: |
          RAW_COUNT=$(node -e "const d=JSON.parse(require('fs').readFileSync('icon-data-raw.json','utf8')); console.log(Object.keys(d).length)")
          CORE_COUNT=$(grep -c 'viewBox: "' packages/core/src/icon-data.ts)
          echo "Raw: $RAW_COUNT, Core: $CORE_COUNT"
          if [ "$CORE_COUNT" != "$RAW_COUNT" ]; then
            echo "::error::Core icon count ($CORE_COUNT) does not match raw ($RAW_COUNT)"
            exit 1
          fi
```

## Complete Updated Workflow

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
      - uses: actions/checkout@v6

      - uses: actions/setup-node@v6
        with:
          node-version: 24
          registry-url: 'https://registry.npmjs.org'

      - run: npm install

      - name: Generate icon data
        run: node generate.mjs

      - name: Build core package first
        run: npm run build --workspace=packages/core

      - name: Build all packages
        run: npm run build --workspaces

      - name: Verify icon counts
        run: |
          RAW_COUNT=$(node -e "const d=JSON.parse(require('fs').readFileSync('icon-data-raw.json','utf8')); console.log(Object.keys(d).length)")
          CORE_COUNT=$(grep -c 'viewBox: "' packages/core/src/icon-data.ts)
          echo "Raw: $RAW_COUNT, Core: $CORE_COUNT"
          if [ "$CORE_COUNT" != "$RAW_COUNT" ]; then
            echo "::error::Icon count mismatch: core=$CORE_COUNT raw=$RAW_COUNT"
            exit 1
          fi

      - name: Run tests
        run: npx vitest run

      - name: Verify version sync
        if: github.event_name == 'release'
        run: |
          TAG="${GITHUB_REF#refs/tags/v}"
          echo "Release tag version: $TAG"
          FAIL=0
          for pkg in packages/{core,react,vue,svelte,angular,solid,lit,preact,qwik,alpine,vanilla,astro}/package.json; do
            VER=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$pkg','utf8')).version)")
            if [ "$VER" != "$TAG" ]; then
              echo "::error::$pkg version ($VER) != tag v$TAG"
              FAIL=1
            fi
          done
          if [ "$FAIL" -eq 1 ]; then exit 1; fi

      - name: Rewrite core dependency for publish
        run: |
          CORE_VER=$(node -e "console.log(JSON.parse(require('fs').readFileSync('packages/core/package.json','utf8')).version)")
          for pkg in react vue svelte angular solid lit preact qwik alpine vanilla astro; do
            FILE="packages/$pkg/package.json"
            node -e "
              const fs = require('fs');
              const p = JSON.parse(fs.readFileSync('$FILE', 'utf8'));
              if (p.dependencies?.['@ajentik/doo-iconik']?.startsWith('file:')) {
                p.dependencies['@ajentik/doo-iconik'] = '^' + '$CORE_VER';
                fs.writeFileSync('$FILE', JSON.stringify(p, null, 2) + '\n');
                console.log('Rewrote: ' + '$FILE');
              }
            "
          done

      - name: Publish packages
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          DRY_RUN: ${{ inputs.dry-run }}
        run: |
          FLAGS="--access public --provenance"
          if [ "$DRY_RUN" = "true" ]; then FLAGS="$FLAGS --dry-run"; fi

          FAILED=""
          for pkg in core react vue svelte angular solid lit preact qwik alpine vanilla astro; do
            if [ "$pkg" = "core" ]; then PKG_NAME="@ajentik/doo-iconik"; else PKG_NAME="@ajentik/doo-iconik-$pkg"; fi
            echo "Publishing $PKG_NAME..."
            if ! npm publish --workspace=packages/$pkg $FLAGS; then
              echo "::warning::Failed to publish $PKG_NAME (may already exist)"
              FAILED="$FAILED $pkg"
            fi
          done

          if [ -n "$FAILED" ]; then
            echo "::notice::Packages that failed to publish:$FAILED"
          fi
```

## Files Changed

- `.github/workflows/publish.yml` — full replacement with hardened version above

## Acceptance Criteria

- [ ] `--provenance` flag on all npm publish calls
- [ ] Version sync check runs on release trigger (skipped for workflow_dispatch)
- [ ] `file:../core` rewritten to `^<core-version>` before publish
- [ ] Icon count verified before publish
- [ ] Tests still gate the publish
- [ ] Core still published before framework packages
- [ ] Dry-run mode still works via workflow_dispatch
- [ ] Individual package failure does not block remaining packages

## Dependencies

- **Blocks #43**: This workflow must be updated before the first publish.

## Estimated Effort

~30 minutes (single file change, well-defined steps)
