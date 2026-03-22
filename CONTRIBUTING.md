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

All JS/TS framework packages depend on `@doo-iconik/core`. The component in each package:
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

## Releasing

1. Update version in all `packages/*/package.json` files
2. Update `CHANGELOG.md`
3. Create a GitHub Release with the version tag (e.g., `v1.0.1`)
4. The publish workflow will automatically publish to npm
