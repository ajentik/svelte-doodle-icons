# @ajentik/doo-iconik-preact

[![npm version](https://img.shields.io/npm/v/@ajentik/doo-iconik-preact.svg)](https://www.npmjs.com/package/@ajentik/doo-iconik-preact)

Preact component library: 595 hand-drawn doodle-style SVG icons for Preact 10.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @ajentik/doo-iconik-preact
```

## Usage

```jsx
import { DooIconik } from '@ajentik/doo-iconik-preact';

function App() {
  return (
    <div>
      <DooIconik name="heart" size="lg" />
      <DooIconik name="star" size="md" spin />
      <DooIconik name="arrow-right" flipHorizontal />
    </div>
  );
}
```

## Props

All components accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
