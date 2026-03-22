# @doo-iconik/astro

[![npm version](https://img.shields.io/npm/v/@doo-iconik/astro.svg)](https://www.npmjs.com/package/@doo-iconik/astro)

Astro component library: 595 hand-drawn doodle-style SVG icons for Astro 3/4.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @doo-iconik/astro
```

## Usage

```astro
---
import { DooIconik } from '@doo-iconik/astro';
---

<DooIconik name="heart" size="lg" />
<DooIconik name="star" size="md" spin />
<DooIconik name="arrow-right" flipHorizontal />
```

## Props

All components accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
