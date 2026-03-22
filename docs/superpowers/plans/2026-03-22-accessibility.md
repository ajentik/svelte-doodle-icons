# Accessibility Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `aria-label` and `role="img"` support to all framework components so icons can be used as both decorative (`aria-hidden="true"`) and semantic (accessible with screen readers) elements.

**Architecture:** When no `aria-label` is provided, icons remain `aria-hidden="true"` (current behavior — decorative). When `aria-label` is set, the icon becomes `role="img"` with the label and `aria-hidden` is removed. This follows the WAI-ARIA pattern for SVG icons and matches how Heroicons, Lucide, and Phosphor handle it.

**Tech Stack:** TypeScript, React, Vue, Svelte, Solid, Lit, Preact, Qwik, Angular, Astro, Alpine, Vanilla, Flutter (Dart), Laravel (PHP), Rails (Ruby)

---

### Task 1: Update React component

**Files:**
- Modify: `packages/react/src/DooIconik.tsx`

- [ ] **Step 1: Add `ariaLabel` to props interface**

In `packages/react/src/DooIconik.tsx`, add to the `DooIconikProps` interface:

```typescript
export interface DooIconikProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  name: DooIconikName;
  size?: DooIconikSize | number;
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  variant?: DooIconikVariant;
  animation?: DooIconikAnimation;
  ariaLabel?: string;
}
```

- [ ] **Step 2: Destructure `ariaLabel` and update SVG attributes**

In the component function, destructure `ariaLabel` alongside other props. Then update the `<svg>` element:

Replace:
```tsx
      aria-hidden="true"
```

With:
```tsx
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel || undefined}
      role={ariaLabel ? 'img' : undefined}
```

- [ ] **Step 3: Commit**

```bash
git add packages/react/src/DooIconik.tsx
git commit -m "feat(react): add ariaLabel prop for accessible icons"
```

---

### Task 2: Update Vue component

**Files:**
- Modify: `packages/vue/src/DooIconik.vue`

- [ ] **Step 1: Add `ariaLabel` prop**

In the `defineProps` block, add:
```typescript
ariaLabel?: string;
```

With default `undefined`.

- [ ] **Step 2: Update template SVG attributes**

Replace:
```html
    aria-hidden="true"
```

With:
```html
    :aria-hidden="ariaLabel ? undefined : true"
    :aria-label="ariaLabel || undefined"
    :role="ariaLabel ? 'img' : undefined"
```

- [ ] **Step 3: Commit**

```bash
git add packages/vue/src/DooIconik.vue
git commit -m "feat(vue): add ariaLabel prop for accessible icons"
```

---

### Task 3: Update Svelte component

**Files:**
- Modify: `packages/svelte/src/DooIconik.svelte`

- [ ] **Step 1: Add `ariaLabel` to Props interface and destructure**

Add `ariaLabel?: string;` to the `Props` interface. Destructure it with default `undefined`.

- [ ] **Step 2: Update SVG attributes**

Replace:
```svelte
  aria-hidden="true"
```

With:
```svelte
  aria-hidden={ariaLabel ? undefined : true}
  aria-label={ariaLabel || undefined}
  role={ariaLabel ? 'img' : undefined}
```

- [ ] **Step 3: Commit**

```bash
git add packages/svelte/src/DooIconik.svelte
git commit -m "feat(svelte): add ariaLabel prop for accessible icons"
```

---

### Task 4: Update Angular component

**Files:**
- Modify: `packages/angular/src/doo-iconik.component.ts`

- [ ] **Step 1: Add `ariaLabel` Input**

Add to the component class:
```typescript
@Input() ariaLabel?: string;
```

- [ ] **Step 2: Update SVG string generation**

In the `updateSvg()` method, replace:
```typescript
aria-hidden="true"
```

With:
```typescript
${this.ariaLabel ? `aria-label="${this.ariaLabel}" role="img"` : 'aria-hidden="true"'}
```

- [ ] **Step 3: Commit**

```bash
git add packages/angular/src/doo-iconik.component.ts
git commit -m "feat(angular): add ariaLabel input for accessible icons"
```

---

### Task 5: Update Solid component

**Files:**
- Modify: `packages/solid/src/DooIconik.tsx`

- [ ] **Step 1: Add `ariaLabel` to props interface and splitProps**

Add `ariaLabel?: string;` to `DooIconikProps`. Add `'ariaLabel'` to the `splitProps` array.

- [ ] **Step 2: Update SVG attributes**

Replace:
```tsx
          aria-hidden="true"
```

With:
```tsx
          aria-hidden={local.ariaLabel ? undefined : true}
          aria-label={local.ariaLabel || undefined}
          role={local.ariaLabel ? 'img' : undefined}
```

- [ ] **Step 3: Commit**

```bash
git add packages/solid/src/DooIconik.tsx
git commit -m "feat(solid): add ariaLabel prop for accessible icons"
```

---

### Task 6: Update Lit component

**Files:**
- Modify: `packages/lit/src/DooIconik.ts`

- [ ] **Step 1: Add `ariaLabel` property**

Add to the class:
```typescript
@property({ type: String, attribute: 'aria-label' }) ariaLabel?: string;
```

- [ ] **Step 2: Update render method**

Replace:
```typescript
        aria-hidden="true"
```

With:
```typescript
        aria-hidden=${this.ariaLabel ? nothing : 'true'}
        aria-label=${this.ariaLabel || nothing}
        role=${this.ariaLabel ? 'img' : nothing}
```

- [ ] **Step 3: Commit**

```bash
git add packages/lit/src/DooIconik.ts
git commit -m "feat(lit): add ariaLabel property for accessible icons"
```

---

### Task 7: Update Preact component

**Files:**
- Modify: `packages/preact/src/DooIconik.tsx`

- [ ] **Step 1: Add `ariaLabel` to props and destructure**

Add `ariaLabel?: string;` to `DooIconikProps`. Destructure it.

- [ ] **Step 2: Update SVG creation**

Replace:
```typescript
    'aria-hidden': 'true',
```

With:
```typescript
    'aria-hidden': ariaLabel ? undefined : 'true',
    'aria-label': ariaLabel || undefined,
    role: ariaLabel ? 'img' : undefined,
```

- [ ] **Step 3: Commit**

```bash
git add packages/preact/src/DooIconik.tsx
git commit -m "feat(preact): add ariaLabel prop for accessible icons"
```

---

### Task 8: Update Qwik component

**Files:**
- Modify: `packages/qwik/src/DooIconik.tsx`

- [ ] **Step 1: Add `ariaLabel` to props and destructure**

Add `ariaLabel?: string;` to `DooIconikProps`. Destructure it.

- [ ] **Step 2: Update SVG attributes**

Replace:
```tsx
      aria-hidden="true"
```

With:
```tsx
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel || undefined}
      role={ariaLabel ? 'img' : undefined}
```

- [ ] **Step 3: Commit**

```bash
git add packages/qwik/src/DooIconik.tsx
git commit -m "feat(qwik): add ariaLabel prop for accessible icons"
```

---

### Task 9: Update Astro component

**Files:**
- Modify: `packages/astro/src/DooIconik.astro`

- [ ] **Step 1: Add `ariaLabel` to Props and destructure**

Add `ariaLabel?: string;` to the `Props` interface. Destructure it.

- [ ] **Step 2: Update SVG attributes**

Replace:
```astro
    aria-hidden="true"
```

With:
```astro
    aria-hidden={ariaLabel ? undefined : true}
    aria-label={ariaLabel || undefined}
    role={ariaLabel ? 'img' : undefined}
```

- [ ] **Step 3: Commit**

```bash
git add packages/astro/src/DooIconik.astro
git commit -m "feat(astro): add ariaLabel prop for accessible icons"
```

---

### Task 10: Update Alpine plugin

**Files:**
- Modify: `packages/alpine/src/index.ts`

- [ ] **Step 1: Add `ariaLabel` to options and update SVG generation**

In both `renderIcon()` and the `$dooIconik` magic, update the SVG string to handle `ariaLabel`:

Replace:
```typescript
aria-hidden="true"
```

With:
```typescript
${options.ariaLabel ? `aria-label="${options.ariaLabel}" role="img"` : 'aria-hidden="true"'}
```

- [ ] **Step 2: Commit**

```bash
git add packages/alpine/src/index.ts
git commit -m "feat(alpine): add ariaLabel option for accessible icons"
```

---

### Task 11: Update Vanilla component

**Files:**
- Modify: `packages/vanilla/src/DooIconik.ts`
- Modify: `packages/vanilla/src/index.ts`

- [ ] **Step 1: Update Web Component**

In `DooIconik.ts`, add `'aria-label'` to `observedAttributes`. In the `render()` method:

```typescript
const ariaLabel = this.getAttribute('aria-label');
```

Replace:
```typescript
        aria-hidden="true">
```

With:
```typescript
        ${ariaLabel ? `aria-label="${ariaLabel}" role="img"` : 'aria-hidden="true"'}>
```

- [ ] **Step 2: Update `createIcon` function**

In `index.ts`, add `ariaLabel?: string;` to options. Replace:

```typescript
  svg.setAttribute('aria-hidden', 'true');
```

With:

```typescript
  if (opts.ariaLabel) {
    svg.setAttribute('aria-label', opts.ariaLabel);
    svg.setAttribute('role', 'img');
  } else {
    svg.setAttribute('aria-hidden', 'true');
  }
```

- [ ] **Step 3: Commit**

```bash
git add packages/vanilla/src/DooIconik.ts packages/vanilla/src/index.ts
git commit -m "feat(vanilla): add ariaLabel for accessible icons"
```

---

### Task 12: Update Flutter widget

**Files:**
- Modify: `packages/flutter/lib/src/doo_iconik_widget.dart`

- [ ] **Step 1: Add `semanticLabel` parameter**

In the `DooIconik` widget class, add:

```dart
final String? semanticLabel;
```

And to the constructor:
```dart
this.semanticLabel,
```

- [ ] **Step 2: Wrap with Semantics widget when label is set**

At the end of the `build()` method, before `return SizedBox(...)`, wrap:

```dart
Widget result = SizedBox(width: _pixelSize, height: _pixelSize, child: icon);

if (semanticLabel != null) {
  return Semantics(
    label: semanticLabel,
    child: ExcludeSemantics(child: result),
  );
}

return result;
```

- [ ] **Step 3: Commit**

```bash
git add packages/flutter/lib/src/doo_iconik_widget.dart
git commit -m "feat(flutter): add semanticLabel for accessible icons"
```

---

### Task 13: Update Laravel component

**Files:**
- Modify: `packages/laravel/src/DooIconikComponent.php`
- Modify: `packages/laravel/src/IconRepository.php`

- [ ] **Step 1: Add `ariaLabel` to component**

In `DooIconikComponent.php`, add to constructor:
```php
public ?string $ariaLabel = null,
```

Pass it to `render()` call.

- [ ] **Step 2: Update IconRepository::render()**

Add `?string $ariaLabel = null` parameter. Replace:
```php
aria-hidden="true"
```

With:
```php
{$ariaLabel ? "aria-label=\"" . e($ariaLabel) . "\" role=\"img\"" : "aria-hidden=\"true\""}
```

- [ ] **Step 3: Commit**

```bash
git add packages/laravel/src/DooIconikComponent.php packages/laravel/src/IconRepository.php
git commit -m "feat(laravel): add ariaLabel for accessible icons"
```

---

### Task 14: Update Rails helper

**Files:**
- Modify: `packages/rails/lib/doo_iconik/helper.rb`

- [ ] **Step 1: Add `aria_label` parameter**

Add `aria_label: nil` to the `doo_iconik` method signature. Update `svg_attrs`:

Replace:
```ruby
        'aria-hidden': 'true'
```

With:
```ruby
        'aria-hidden': aria_label ? nil : 'true',
        'aria-label': aria_label,
        role: aria_label ? 'img' : nil
```

The existing `svg_attrs.compact!` call will remove nil values.

- [ ] **Step 2: Commit**

```bash
git add packages/rails/lib/doo_iconik/helper.rb
git commit -m "feat(rails): add aria_label for accessible icons"
```

---

### Task 15: Update README documentation

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add `ariaLabel` to the Props table**

Add a row to the props table:

```markdown
| `ariaLabel` | `string` | `undefined` | When set, makes the icon accessible to screen readers with `role="img"`. Omit for decorative icons. |
```

- [ ] **Step 2: Add accessibility section**

After the "Animation presets" section, add:

```markdown
### Accessibility

By default, icons are decorative (`aria-hidden="true"`). To make an icon meaningful for screen readers, add `ariaLabel`:

\```jsx
{/* Decorative — hidden from screen readers */}
<DooIconik name="heart" />

{/* Semantic — announced by screen readers */}
<DooIconik name="heart" ariaLabel="Favorite" />
\```
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add accessibility/ariaLabel to props documentation"
```
