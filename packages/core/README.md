# @doo-iconik/core

Framework-agnostic shared icon data and utilities: 595 hand-drawn doodle-style SVG icons.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @doo-iconik/core
```

## Usage

```js
import { getIcon, getAllIconNames } from '@doo-iconik/core';

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

All framework wrappers built on `@doo-iconik/core` accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
