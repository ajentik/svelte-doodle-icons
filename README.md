# doo-iconik

595 hand-drawn doodle style SVG icons for any framework.

## Packages

| Package | Framework | Install |
|---------|-----------|---------|
| `@doo-iconik/core` | None (shared data) | `npm i @doo-iconik/core` |
| `@doo-iconik/react` | React 18/19 | `npm i @doo-iconik/react` |
| `@doo-iconik/vue` | Vue 3 | `npm i @doo-iconik/vue` |
| `@doo-iconik/svelte` | Svelte 5 | `npm i @doo-iconik/svelte` |
| `@doo-iconik/solid` | SolidJS | `npm i @doo-iconik/solid` |
| `@doo-iconik/angular` | Angular 16+ | `npm i @doo-iconik/angular` |
| `@doo-iconik/preact` | Preact 10 | `npm i @doo-iconik/preact` |
| `@doo-iconik/qwik` | Qwik | `npm i @doo-iconik/qwik` |
| `@doo-iconik/astro` | Astro 3/4 | `npm i @doo-iconik/astro` |
| `@doo-iconik/lit` | Lit 3 | `npm i @doo-iconik/lit` |
| `@doo-iconik/vanilla` | Vanilla JS / Web Components | `npm i @doo-iconik/vanilla` |
| `@doo-iconik/alpine` | Alpine.js 3 | `npm i @doo-iconik/alpine` |
| `doo_iconik` | Ruby on Rails | `gem 'doo_iconik'` |
| `ajentik/doo-iconik-laravel` | Laravel 10/11/12 | `composer require ajentik/doo-iconik-laravel` |
| `doo_iconik` | Flutter 3.10+ | `flutter pub add doo_iconik` |

## Usage

### React

```jsx
import { DooIconik } from '@doo-iconik/react';

function App() {
  return <DooIconik name="heart" size="lg" spin />;
}
```

### Vue

```vue
<script setup>
import { DooIconik } from '@doo-iconik/vue';
</script>

<template>
  <DooIconik name="heart" size="lg" spin />
</template>
```

### Svelte

```svelte
<script>
  import { DooIconik } from '@doo-iconik/svelte';
</script>

<DooIconik name="heart" size="lg" spin />
```

### SolidJS

```jsx
import { DooIconik } from '@doo-iconik/solid';

function App() {
  return <DooIconik name="heart" size="lg" spin />;
}
```

### Angular

```typescript
import { DooIconikComponent } from '@doo-iconik/angular';

@Component({
  standalone: true,
  imports: [DooIconikComponent],
  template: `<doo-iconik name="heart" size="lg" [spin]="true" />`
})
export class AppComponent {}
```

### Preact

```jsx
import { DooIconik } from '@doo-iconik/preact';

function App() {
  return <DooIconik name="heart" size="lg" spin />;
}
```

### Qwik

```jsx
import { DooIconik } from '@doo-iconik/qwik';

export default component$(() => {
  return <DooIconik name="heart" size="lg" spin />;
});
```

### Astro

```astro
---
import { DooIconik } from '@doo-iconik/astro';
---

<DooIconik name="heart" size="lg" spin />
```

### Lit

```js
import '@doo-iconik/lit';
```

```html
<doo-iconik-lit name="heart" size="lg" spin></doo-iconik-lit>
```

### Vanilla JS

```js
// Web Component
import { register } from '@doo-iconik/vanilla';
register();
```

```html
<doo-iconik name="heart" size="lg" spin></doo-iconik>
```

```js
// Or programmatic usage
import { createIcon } from '@doo-iconik/vanilla';
const svg = createIcon('heart', { size: 'lg', spin: true });
document.body.appendChild(svg);
```

### Alpine.js

```js
import Alpine from 'alpinejs';
import dooIconikPlugin from '@doo-iconik/alpine';

Alpine.plugin(dooIconikPlugin);
Alpine.start();
```

```html
<!-- Directive with modifiers -->
<div x-data x-doo-iconik.lg.spin="'heart'"></div>

<!-- Or with options object -->
<div x-data x-doo-iconik="{ name: 'heart', size: 'lg', spin: true }"></div>
```

### Ruby on Rails

```ruby
# Gemfile
gem 'doo_iconik'
```

```bash
rails generate doo_iconik:install
```

```erb
<%= doo_iconik 'heart', size: :lg, spin: true %>
```

### Laravel

```bash
composer require ajentik/doo-iconik-laravel
php artisan vendor:publish --tag=doo-iconik-assets
```

```blade
{{-- Blade component --}}
<x-doo-iconik name="heart" size="lg" :spin="true" />

{{-- Or Blade directive --}}
@dooiconik('heart', 'lg', spin: true)
```

### Flutter

```yaml
# pubspec.yaml
dependencies:
  doo_iconik: ^1.0.0
```

```dart
import 'package:doo_iconik/doo_iconik.dart';

DooIconik(name: 'heart', size: DooIconikSize.lg, spin: true)
```

## Props

All framework components share the same props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `DooIconikName` | required | Icon name (e.g. `'heart'`, `'arrow-right'`) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| number` | `'md'` | Icon size (preset or pixel value) |
| `spin` | `boolean` | `false` | Continuous rotation animation |
| `pulse` | `boolean` | `false` | Fade in/out animation |
| `bounce` | `boolean` | `false` | Bounce animation |
| `flipHorizontal` | `boolean` | `false` | Mirror horizontally |
| `flipVertical` | `boolean` | `false` | Mirror vertically |
| `variant` | `DooIconikVariant` | `undefined` | Visual style variant (see table below) |
| `animation` | `DooIconikAnimation` | `undefined` | Animation preset (see table below) |
| `ariaLabel` | `string` | `undefined` | Accessible label — makes the icon meaningful to screen readers |

### Size presets

| Preset | Pixels |
|--------|--------|
| `xs` | 12px |
| `sm` | 16px |
| `md` | 24px |
| `lg` | 32px |
| `xl` | 48px |
| `2xl` | 64px |

### Style variants

Apply visual effects via the `variant` prop:

| Variant | Effect |
|---------|--------|
| `default` | No effect |
| `glow` | Soft glow using current color |
| `neon` | Intense neon sign effect (4-layer glow) |
| `shadow` | Drop shadow for depth |
| `embossed` | Light + dark opposing shadows |
| `glass` | Semi-transparent with subtle shadow |
| `outline` | Forces stroke-only rendering |
| `retro` | Sepia-toned vintage look |

```jsx
<DooIconik name="heart" variant="glow" />
<DooIconik name="star" variant="neon" />
<DooIconik name="shield" variant="embossed" />
```

### Animation presets

Use the `animation` prop for expanded animation options. When set, it takes precedence over the boolean `spin`/`pulse`/`bounce` props.

| Animation | Effect |
|-----------|--------|
| `spin` | Continuous 360° rotation |
| `pulse` | Fade in/out |
| `bounce` | Vertical bounce |
| `wiggle` | Gentle rotation wiggle |
| `shake` | Horizontal shake |
| `float` | Smooth floating motion |
| `heartbeat` | Double-beat scaling |
| `tada` | Attention-grabbing entrance |
| `rubber` | Rubber band stretch |
| `swing` | Pendulum swing from top |
| `jello` | Jelly-like skew |

```jsx
// New animation prop
<DooIconik name="heart" animation="heartbeat" />
<DooIconik name="bell" animation="swing" />

// Boolean props still work (backward compatible)
<DooIconik name="loader" spin />

// Combine variant + animation
<DooIconik name="star" variant="neon" animation="tada" />
```

### Accessibility

By default, icons are decorative (`aria-hidden="true"`) and invisible to screen readers. Set `ariaLabel` to make an icon meaningful:

```jsx
// Decorative — hidden from assistive tech (default)
<DooIconik name="heart" />

// Meaningful — announced by screen readers
<DooIconik name="heart" ariaLabel="Favorite" />
```

When `ariaLabel` is provided, the icon receives `role="img"` and `aria-label` and `aria-hidden` is removed. In Flutter, the equivalent prop is `semanticLabel` which wraps the icon in a `Semantics` widget. In Rails, use `aria_label:`.

## Icon categories

Icons span 19 categories: arrow, currency, ecommerce, elderlycare, emojis, files, finance, food, gendersymbols, handgestures, health, healthcare, interfaces, logos, misc, objects, technology, userinterface, weather.

## Development

```bash
# Generate icon data from raw JSON
npm run generate

# Build all packages
npm run build
```

## License

MIT
