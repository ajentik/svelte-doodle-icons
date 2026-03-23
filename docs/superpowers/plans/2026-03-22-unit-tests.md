# Unit Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add unit test coverage for `@ajentik/doo-iconik` utilities, icon data integrity, and the React component as a representative framework adapter.

**Architecture:** Use Vitest as the test runner — it's fast, ESM-native, and works with TypeScript out of the box. Tests live alongside source in `packages/{pkg}/src/__tests__/`. Core tests cover all utility functions + icon data validation. React tests use `@testing-library/react` for component rendering. No tests for every framework adapter — React serves as the reference; other frameworks are structurally identical.

**Tech Stack:** Vitest, @testing-library/react, @testing-library/jest-dom, TypeScript

---

### Task 1: Install Vitest and configure workspace

**Files:**
- Modify: `package.json` (root)
- Create: `vitest.workspace.ts`

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest @vitest/coverage-v8
```

- [ ] **Step 2: Add test scripts to root package.json**

Add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

- [ ] **Step 3: Create Vitest workspace config**

Create `vitest.workspace.ts`:
```typescript
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/core',
  'packages/react',
]);
```

- [ ] **Step 4: Commit**

```bash
git add package.json vitest.workspace.ts
git commit -m "chore: add Vitest test runner and workspace config"
```

---

### Task 2: Core utility tests

**Files:**
- Create: `packages/core/src/__tests__/utils.test.ts`
- Create: `packages/core/vitest.config.ts`

- [ ] **Step 1: Create Vitest config for core**

Create `packages/core/vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/__tests__/**/*.test.ts'],
  },
});
```

- [ ] **Step 2: Write tests for `escapeAttr`**

Create `packages/core/src/__tests__/utils.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { escapeAttr, sizeMap, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass } from '../utils.js';

describe('escapeAttr', () => {
  it('escapes ampersands', () => {
    expect(escapeAttr('a&b')).toBe('a&amp;b');
  });

  it('escapes double quotes', () => {
    expect(escapeAttr('a"b')).toBe('a&quot;b');
  });

  it('escapes single quotes', () => {
    expect(escapeAttr("a'b")).toBe('a&#39;b');
  });

  it('escapes angle brackets', () => {
    expect(escapeAttr('<script>')).toBe('&lt;script&gt;');
  });

  it('returns empty string unchanged', () => {
    expect(escapeAttr('')).toBe('');
  });

  it('handles string with no special chars', () => {
    expect(escapeAttr('hello world')).toBe('hello world');
  });
});
```

- [ ] **Step 3: Write tests for `resolveSize`**

Append to the same file:
```typescript
describe('resolveSize', () => {
  it('resolves named sizes to pixels', () => {
    expect(resolveSize('xs')).toBe(12);
    expect(resolveSize('sm')).toBe(16);
    expect(resolveSize('md')).toBe(24);
    expect(resolveSize('lg')).toBe(32);
    expect(resolveSize('xl')).toBe(48);
    expect(resolveSize('2xl')).toBe(64);
  });

  it('passes through numeric sizes', () => {
    expect(resolveSize(100)).toBe(100);
    expect(resolveSize(0)).toBe(0);
  });

  it('defaults to 24 for unknown string sizes', () => {
    expect(resolveSize('unknown' as any)).toBe(24);
  });
});

describe('sizeMap', () => {
  it('has exactly 6 entries', () => {
    expect(Object.keys(sizeMap)).toHaveLength(6);
  });
});
```

- [ ] **Step 4: Write tests for `buildTransform`**

```typescript
describe('buildTransform', () => {
  it('returns undefined when no flips', () => {
    expect(buildTransform(false, false)).toBeUndefined();
  });

  it('returns scaleX(-1) for horizontal flip', () => {
    expect(buildTransform(true, false)).toBe('scaleX(-1)');
  });

  it('returns scaleY(-1) for vertical flip', () => {
    expect(buildTransform(false, true)).toBe('scaleY(-1)');
  });

  it('returns both transforms for both flips', () => {
    expect(buildTransform(true, true)).toBe('scaleX(-1) scaleY(-1)');
  });
});
```

- [ ] **Step 5: Write tests for `buildAnimationClasses`**

```typescript
describe('buildAnimationClasses', () => {
  it('returns empty string with no animations', () => {
    expect(buildAnimationClasses(false, false, false)).toBe('');
  });

  it('returns spin class', () => {
    expect(buildAnimationClasses(true, false, false)).toBe('doo-iconik-spin');
  });

  it('returns multiple boolean classes', () => {
    expect(buildAnimationClasses(true, true, false)).toBe('doo-iconik-spin doo-iconik-pulse');
  });

  it('returns all three boolean classes', () => {
    expect(buildAnimationClasses(true, true, true)).toBe('doo-iconik-spin doo-iconik-pulse doo-iconik-bounce');
  });

  it('animation prop overrides booleans', () => {
    expect(buildAnimationClasses(true, true, true, 'wiggle')).toBe('doo-iconik-wiggle');
  });

  it('animation prop works alone', () => {
    expect(buildAnimationClasses(false, false, false, 'heartbeat')).toBe('doo-iconik-heartbeat');
  });
});
```

- [ ] **Step 6: Write tests for `buildVariantClass`**

```typescript
describe('buildVariantClass', () => {
  it('returns empty string for undefined', () => {
    expect(buildVariantClass()).toBe('');
  });

  it('returns empty string for default', () => {
    expect(buildVariantClass('default')).toBe('');
  });

  it('returns class for glow', () => {
    expect(buildVariantClass('glow')).toBe('doo-iconik-glow');
  });

  it('returns class for neon', () => {
    expect(buildVariantClass('neon')).toBe('doo-iconik-neon');
  });
});
```

- [ ] **Step 7: Run tests**

Run: `npx vitest run --workspace packages/core`
Expected: All tests PASS

- [ ] **Step 8: Commit**

```bash
git add packages/core/vitest.config.ts packages/core/src/__tests__/utils.test.ts
git commit -m "test(core): add unit tests for all utility functions"
```

---

### Task 3: Icon data integrity tests

**Files:**
- Create: `packages/core/src/__tests__/icon-data.test.ts`

- [ ] **Step 1: Write icon data validation tests**

Create `packages/core/src/__tests__/icon-data.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { iconData } from '../icon-data.js';

describe('iconData', () => {
  const names = Object.keys(iconData);

  it('has 595 icons', () => {
    expect(names.length).toBe(595);
  });

  it('every icon has a viewBox string', () => {
    for (const name of names) {
      expect(iconData[name].viewBox).toMatch(/^\d+ \d+ \d+ \d+$/);
    }
  });

  it('every icon has at least one path', () => {
    for (const name of names) {
      expect(iconData[name].paths.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('every path is a non-empty string', () => {
    for (const name of names) {
      for (const p of iconData[name].paths) {
        expect(typeof p).toBe('string');
        expect(p.length).toBeGreaterThan(0);
      }
    }
  });

  it('circles have required properties when present', () => {
    for (const name of names) {
      if (iconData[name].circles) {
        for (const c of iconData[name].circles!) {
          expect(typeof c.cx).toBe('number');
          expect(typeof c.cy).toBe('number');
          expect(typeof c.r).toBe('number');
        }
      }
    }
  });

  it('lines have required properties when present', () => {
    for (const name of names) {
      if (iconData[name].lines) {
        for (const l of iconData[name].lines!) {
          expect(typeof l.x1).toBe('number');
          expect(typeof l.y1).toBe('number');
          expect(typeof l.x2).toBe('number');
          expect(typeof l.y2).toBe('number');
        }
      }
    }
  });

  it('stroke is boolean when present', () => {
    for (const name of names) {
      if (iconData[name].stroke !== undefined) {
        expect(typeof iconData[name].stroke).toBe('boolean');
      }
    }
  });

  it('icon names are kebab-case', () => {
    for (const name of names) {
      expect(name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});
```

- [ ] **Step 2: Run tests**

Run: `npx vitest run --workspace packages/core`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/__tests__/icon-data.test.ts
git commit -m "test(core): add icon data integrity tests (595 icons)"
```

---

### Task 4: React component tests

**Files:**
- Create: `packages/react/src/__tests__/DooIconik.test.tsx`
- Create: `packages/react/vitest.config.ts`

- [ ] **Step 1: Install test deps**

```bash
npm install -D @testing-library/react @testing-library/jest-dom jsdom --workspace=packages/react
```

- [ ] **Step 2: Create Vitest config for React**

Create `packages/react/vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/__tests__/**/*.test.tsx'],
    environment: 'jsdom',
    setupFiles: [],
  },
});
```

- [ ] **Step 3: Write React component tests**

Create `packages/react/src/__tests__/DooIconik.test.tsx`:
```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DooIconik } from '../DooIconik';

describe('DooIconik', () => {
  it('renders an SVG element', () => {
    const { container } = render(<DooIconik name="heart" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('returns null for unknown icon name', () => {
    const { container } = render(<DooIconik name={'nonexistent' as any} />);
    expect(container.innerHTML).toBe('');
  });

  it('applies default size (24px)', () => {
    const { container } = render(<DooIconik name="heart" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('applies named size', () => {
    const { container } = render(<DooIconik name="heart" size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
  });

  it('applies numeric size', () => {
    const { container } = render(<DooIconik name="heart" size={64} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('64');
  });

  it('is aria-hidden by default', () => {
    const { container } = render(<DooIconik name="heart" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies aria-label and role="img" when ariaLabel set', () => {
    const { container } = render(<DooIconik name="heart" ariaLabel="Favorite" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-label')).toBe('Favorite');
    expect(svg?.getAttribute('role')).toBe('img');
    expect(svg?.hasAttribute('aria-hidden')).toBe(false);
  });

  it('applies animation class', () => {
    const { container } = render(<DooIconik name="heart" spin />);
    const svg = container.querySelector('svg');
    expect(svg?.className.baseVal || svg?.getAttribute('class')).toContain('doo-iconik-spin');
  });

  it('applies variant class', () => {
    const { container } = render(<DooIconik name="heart" variant="glow" />);
    const svg = container.querySelector('svg');
    expect(svg?.className.baseVal || svg?.getAttribute('class')).toContain('doo-iconik-glow');
  });

  it('applies transform for flipHorizontal', () => {
    const { container } = render(<DooIconik name="heart" flipHorizontal />);
    const svg = container.querySelector('svg');
    expect(svg?.style.transform).toContain('scaleX(-1)');
  });

  it('renders path elements', () => {
    const { container } = render(<DooIconik name="heart" />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(1);
  });
});
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run --workspace packages/react`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/react/vitest.config.ts packages/react/src/__tests__/DooIconik.test.tsx packages/react/package.json
git commit -m "test(react): add component tests for DooIconik"
```

---

### Task 5: Add test step to CI workflow

**Files:**
- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Add test step**

After the build step in `.github/workflows/ci.yml`, add:

```yaml
      - name: Run tests
        run: npx vitest run
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add test step to CI workflow"
```
