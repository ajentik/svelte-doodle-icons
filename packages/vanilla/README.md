# @ajentik/doo-iconik-vanilla

[![npm version](https://img.shields.io/npm/v/@ajentik/doo-iconik-vanilla.svg)](https://www.npmjs.com/package/@ajentik/doo-iconik-vanilla)

Vanilla JS / Web Components: 595 hand-drawn doodle-style SVG icons for Vanilla JS.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @ajentik/doo-iconik-vanilla
```

## Usage

### Web Component

```js
import { register } from '@ajentik/doo-iconik-vanilla';

// Register the <doo-iconik> custom element
register();
```

```html
<doo-iconik name="heart" size="lg"></doo-iconik>
<doo-iconik name="star" size="md" spin></doo-iconik>
```

### Programmatic API

```js
import { createIcon } from '@ajentik/doo-iconik-vanilla';

const icon = createIcon('heart', { size: 'lg', spin: true });
document.body.appendChild(icon);
```

## Props

All components accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
