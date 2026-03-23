# @ajentik/doo-iconik

[![npm version](https://img.shields.io/npm/v/@ajentik/doo-iconik.svg)](https://www.npmjs.com/package/@ajentik/doo-iconik)

Framework-agnostic shared icon data and utilities: 595 hand-drawn doodle-style SVG icons.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @ajentik/doo-iconik
```

## Usage

```js
import { getIcon, getAllIconNames } from '@ajentik/doo-iconik';

// Get a single icon's SVG data
const heart = getIcon('heart');
console.log(heart.svg); // raw SVG string

// List all available icon names
const names = getAllIconNames();
```

## API

| Export | Description |
| --- | --- |
| `getIcon(name)` | Returns the SVG data for a given icon name |
| `getAllIconNames()` | Returns an array of all 595 icon names |
| `iconData` | The full icon dataset |

## Props

All framework wrappers built on `@ajentik/doo-iconik` accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## Tree-Shaking

Import individual icons for smaller bundles:

```typescript
// Only bundles the heart icon (~200 bytes)
import { heart } from '@ajentik/doo-iconik/icons/heart';

// All icons (~212KB)
import { iconData } from '@ajentik/doo-iconik';
```

## License

MIT
