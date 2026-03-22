# @doo-iconik/svelte

[![npm version](https://img.shields.io/npm/v/@doo-iconik/svelte.svg)](https://www.npmjs.com/package/@doo-iconik/svelte)

Svelte component library: 595 hand-drawn doodle-style SVG icons for Svelte 5.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @doo-iconik/svelte
```

## Usage

```svelte
<script>
  import { DooIconik } from '@doo-iconik/svelte';
</script>

<DooIconik name="heart" size="lg" />
<DooIconik name="star" size="md" spin />
<DooIconik name="arrow-right" flipHorizontal />
```

## Props

All components accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
