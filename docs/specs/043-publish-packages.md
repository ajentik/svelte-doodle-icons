# Spec #43 — Publish All Packages to Registries

**Issue**: https://github.com/ajentik/doo-iconik/issues/43
**Status**: 🔴 NOT STARTED — all 15 packages unpublished

## Summary

Publish all 15 framework packages to their respective registries (npm, Packagist, RubyGems, pub.dev) so users can install them as documented in the README.

## Current State

All 12 npm packages return 404. The `@ajentik` npm org does not exist. No packages are on any registry.

## Pre-Publish Fixes Required

### 1. Create npm Org

Create the `@ajentik` npm organization at https://www.npmjs.com/org/create.

### 2. Copy LICENSE Into Each Package Directory

npm only includes files listed in the `files` array (plus `package.json`). LICENSE must be present in each package directory.

**Script** (run from repo root):
```bash
for dir in packages/*/; do
  cp LICENSE "$dir"
done
```

**Files created** (13 copies):
- `packages/{core,react,vue,svelte,angular,solid,lit,preact,qwik,alpine,vanilla,astro,flutter}/LICENSE`
- `packages/laravel/LICENSE` (already has MIT in composer.json but file copy is good practice)
- `packages/rails/LICENSE`

### 3. Add LICENSE + README.md to `files` Array

Update every npm package's `package.json`:

| Package | Current `files` | New `files` |
|---------|----------------|-------------|
| core | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| react | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| vue | `["src"]` | `["src", "LICENSE", "README.md"]` |
| svelte | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| angular | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| solid | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| lit | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| preact | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| qwik | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| alpine | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| vanilla | `["dist"]` | `["dist", "LICENSE", "README.md"]` |
| astro | `["src"]` | `["src", "LICENSE", "README.md"]` |

### 4. Fix `file:../core` Dependency for Publishing

All 11 framework packages use `"@ajentik/doo-iconik": "file:../core"` which is invalid in published packages. Two approaches:

**Option A (recommended)**: Auto-rewrite at publish time in the CI workflow (see spec #44). No code changes needed — the workflow rewrites before `npm publish` and never commits the change.

**Option B**: Change to `"@ajentik/doo-iconik": "^1.0.0"` in source. This breaks local `npm install` unless core is published first or workspaces resolves it. Not recommended.

→ **Go with Option A** (handled by #44 workflow improvements).

### 5. Verify Package Metadata

All packages already have correct:
- [x] `name` — `@ajentik/doo-iconik` scoped
- [x] `version` — `1.0.0`
- [x] `license` — `MIT`
- [x] `main` / `module` / `types` / `exports`
- [x] `repository` with `directory`
- [x] `keywords`
- [x] `homepage` and `bugs`
- [x] `sideEffects: false` (or correct value for lit)

## Publish Sequence

### npm (12 packages)

Triggered by creating a GitHub release. The workflow (`.github/workflows/publish.yml`) handles:
1. Generate icon data
2. Build core first, then all packages
3. Run tests
4. Publish `core` first, then all framework packages

**Prerequisite secrets**:
- `NPM_TOKEN` — npm automation token with publish access to `@ajentik` scope

### Packagist — `ajentik/doo-iconik-laravel`

1. Go to https://packagist.org/packages/submit
2. Submit `https://github.com/ajentik/doo-iconik` with path `packages/laravel`
3. Or: create a separate `ajentik/doo-iconik-laravel` repo as a subtree/mirror
4. Add GitHub webhook for auto-update on push

**Note**: Packagist requires the `composer.json` to be at the repo root of the submitted URL. For a monorepo, the recommended approach is a read-only subtree split repo.

### RubyGems — `doo_iconik`

```bash
cd packages/rails
gem build doo_iconik.gemspec
gem push doo_iconik-1.0.0.gem
```

**Prerequisite**: RubyGems.org API key set up locally or as `GEM_HOST_API_KEY` secret.

### pub.dev — `doo_iconik`

```bash
cd packages/flutter
dart pub publish
```

**Prerequisites**:
- Google account verification
- `pubspec.yaml` already has `homepage` ✅

## Files Changed

| File | Change |
|------|--------|
| `packages/*/LICENSE` | New files (copy from root) |
| 12 × `packages/*/package.json` | Add `LICENSE`, `README.md` to `files` array |
| `.github/workflows/publish.yml` | Handled by #44 |

## Acceptance Criteria

- [ ] `@ajentik` npm org exists
- [ ] `NPM_TOKEN` secret added to repo
- [ ] LICENSE file present in each package directory
- [ ] Each npm package's `files` includes `LICENSE` and `README.md`
- [ ] `npm pack --workspace=packages/core --dry-run` shows LICENSE + README in tarball
- [ ] All 12 npm packages published and installable
- [ ] `npm install @ajentik/doo-iconik-react` resolves `@ajentik/doo-iconik` from npm
- [ ] Laravel package documented for Packagist (or published)
- [ ] Rails gem documented for RubyGems (or published)
- [ ] Flutter package documented for pub.dev (or published)

## Dependencies

- **Blocked by #44**: The publish workflow needs the `file:../core` rewrite step before packages can be published successfully.

## Estimated Effort

- npm setup + publish: ~1 hour
- LICENSE/files changes: ~30 minutes
- Non-npm registries: ~1 hour each (or document manual process)
