# @ajentik/doo-iconik-qwik

[![npm version](https://img.shields.io/npm/v/@ajentik/doo-iconik-qwik.svg)](https://www.npmjs.com/package/@ajentik/doo-iconik-qwik)

Qwik component library: 595 hand-drawn doodle-style SVG icons for Qwik.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @ajentik/doo-iconik-qwik
```

## Usage

```tsx
import { component$ } from '@builder.io/qwik';
import { DooIconik } from '@ajentik/doo-iconik-qwik';

export default component$(() => {
  return (
    <div>
      <DooIconik name="heart" size="lg" />
      <DooIconik name="star" size="md" spin />
      <DooIconik name="arrow-right" flipHorizontal />
    </div>
  );
});
```

## Props

All components accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
