# @doo-iconik/alpine

[![npm version](https://img.shields.io/npm/v/@doo-iconik/alpine.svg)](https://www.npmjs.com/package/@doo-iconik/alpine)

Alpine.js plugin: 595 hand-drawn doodle-style SVG icons for Alpine.js 3.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @doo-iconik/alpine
```

## Usage

```js
import Alpine from 'alpinejs';
import { dooIconikPlugin } from '@doo-iconik/alpine';

Alpine.plugin(dooIconikPlugin);
Alpine.start();
```

```html
<div x-data>
  <i x-doo-iconik="'heart'" data-size="lg"></i>
  <i x-doo-iconik="'star'" data-size="md" data-spin></i>
  <i x-doo-iconik="'arrow-right'" data-flip-horizontal></i>
</div>
```

## Props

All components accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
