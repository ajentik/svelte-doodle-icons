# Spec #41 — Bump devDependency Minimums

**Issue**: https://github.com/ajentik/doo-iconik/issues/41
**Status**: ✅ DONE — merged in PR #46

## Summary

Bump outdated devDependency minimum versions in `packages/svelte/package.json` and root `package.json` to document actual tested compatibility.

## Changes Made (PR #46)

| File | Dependency | Before | After |
|------|-----------|--------|-------|
| `packages/svelte/package.json` | `svelte` (dev) | `^5.0.0` | `^5.50.0` |
| `packages/svelte/package.json` | `@sveltejs/package` (dev) | `^2.0.0` | `^2.5.0` |
| `packages/svelte/package.json` | `typescript` (dev) | `^5.0.0` | `^5.8.0` |
| `package.json` | `typescript` (dev) | `^5.0.0` | `^5.8.0` |

`peerDependencies` were correctly left untouched (`svelte: "^5.0.0"`).

## Verification

- [x] `npm install` succeeds
- [x] `npx vitest run` — 47/47 tests pass
- [x] CI passes

## Resolution

Close issue #41 — fully implemented.
