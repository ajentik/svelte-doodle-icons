# @ajentik/doo-iconik-angular

[![npm version](https://img.shields.io/npm/v/@ajentik/doo-iconik-angular.svg)](https://www.npmjs.com/package/@ajentik/doo-iconik-angular)

Angular component library: 595 hand-drawn doodle-style SVG icons for Angular 16+.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @ajentik/doo-iconik-angular
```

## Usage

```typescript
import { DooIconikComponent } from '@ajentik/doo-iconik-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DooIconikComponent],
  template: `
    <doo-iconik name="heart" size="lg" />
    <doo-iconik name="star" size="md" [spin]="true" />
    <doo-iconik name="arrow-right" [flipHorizontal]="true" />
  `,
})
export class AppComponent {}
```

## Props

All components accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
