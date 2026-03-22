# doo_iconik

Flutter widget library: 595 hand-drawn doodle-style SVG icons for Flutter 3.10+.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
flutter pub add doo_iconik
```

Or add to `pubspec.yaml`:

```yaml
dependencies:
  doo_iconik: ^1.0.0
```

## Usage

```dart
import 'package:doo_iconik/doo_iconik.dart';

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        DooIconik(name: 'heart', size: DooIconikSize.lg),
        DooIconik(name: 'star', size: DooIconikSize.md, spin: true),
        DooIconik(name: 'arrow-right', flipHorizontal: true),
      ],
    );
  }
}
```

## Props

All widgets accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
