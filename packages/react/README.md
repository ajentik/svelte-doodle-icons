# @doo-iconik/react

React component library: 595 hand-drawn doodle-style SVG icons for React 18/19.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @doo-iconik/react
```

## Usage

```jsx
import { DooIconik } from '@doo-iconik/react';

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
