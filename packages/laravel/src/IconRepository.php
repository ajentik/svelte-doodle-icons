<?php

namespace DooIconik\Laravel;

use Illuminate\Support\HtmlString;

class IconRepository
{
    private array $icons;

    private const SIZES = [
        'xs' => 12, 'sm' => 16, 'md' => 24,
        'lg' => 32, 'xl' => 48, '2xl' => 64,
    ];

    public function __construct()
    {
        $this->icons = json_decode(
            file_get_contents(__DIR__ . '/../data/icon-data.json'),
            true
        );
    }

    public function get(string $name): ?array
    {
        return $this->icons[$name] ?? null;
    }

    public function names(): array
    {
        return array_keys($this->icons);
    }

    public function render(
        string $name,
        string|int $size = 'md',
        bool $spin = false,
        bool $pulse = false,
        bool $bounce = false,
        bool $flipHorizontal = false,
        bool $flipVertical = false,
        string $variant = 'default',
        ?string $animation = null,
        ?string $ariaLabel = null,
        string $class = '',
        array $attributes = []
    ): HtmlString {
        $icon = $this->get($name);
        if (!$icon) return new HtmlString('');

        $px = is_numeric($size) ? (int) $size : (self::SIZES[$size] ?? 24);

        $classes = [];
        if ($animation) {
            $classes[] = 'doo-iconik-' . e($animation);
        } else {
            if ($spin) $classes[] = 'doo-iconik-spin';
            if ($pulse) $classes[] = 'doo-iconik-pulse';
            if ($bounce) $classes[] = 'doo-iconik-bounce';
        }
        if ($variant && $variant !== 'default') {
            $classes[] = 'doo-iconik-' . e($variant);
        }
        if ($class) $classes[] = e($class);
        $classStr = implode(' ', $classes);

        $transforms = [];
        if ($flipHorizontal) $transforms[] = 'scaleX(-1)';
        if ($flipVertical) $transforms[] = 'scaleY(-1)';
        $transformStr = $transforms ? 'style="transform: ' . implode(' ', $transforms) . '"' : '';

        $strokeAttrs = !empty($icon['stroke'])
            ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
            : 'fill="currentColor"';

        $paths = implode('', array_map(fn($d) => '<path d="' . e($d) . '"/>', $icon['paths']));
        $circles = implode('', array_map(
            fn($c) => "<circle cx=\"{$c['cx']}\" cy=\"{$c['cy']}\" r=\"{$c['r']}\"/>",
            $icon['circles'] ?? []
        ));
        $lines = implode('', array_map(
            fn($l) => "<line x1=\"{$l['x1']}\" y1=\"{$l['y1']}\" x2=\"{$l['x2']}\" y2=\"{$l['y2']}\"/>",
            $icon['lines'] ?? []
        ));

        $extraAttrs = implode(' ', array_map(
            fn($k, $v) => e($k) . '="' . e($v) . '"',
            array_keys($attributes), array_values($attributes)
        ));

        $ariaAttrs = $ariaLabel
            ? 'aria-label="' . e($ariaLabel) . '" role="img"'
            : 'aria-hidden="true"';

        $svg = <<<SVG
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="{$icon['viewBox']}" width="{$px}" height="{$px}" {$strokeAttrs} class="{$classStr}" {$transformStr} {$ariaAttrs} {$extraAttrs}>{$paths}{$circles}{$lines}</svg>
        SVG;

        return new HtmlString(trim($svg));
    }
}
