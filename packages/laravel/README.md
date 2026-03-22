# ajentik/doo-iconik-laravel

Laravel Blade component: 595 hand-drawn doodle-style SVG icons for Laravel 10/11/12.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
composer require ajentik/doo-iconik-laravel
```

## Usage

### Blade Component

```blade
<x-doo-iconik name="heart" />
<x-doo-iconik name="heart" size="lg" />
<x-doo-iconik name="star" size="md" spin />
<x-doo-iconik name="arrow-right" flip-horizontal />
```

### Blade Directive

```blade
@dooIconik('heart', ['size' => 'lg'])
```

## Publishing Config

```bash
php artisan vendor:publish --tag=doo-iconik-config
```

## Props

All components accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
