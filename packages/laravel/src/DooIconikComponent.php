<?php

namespace DooIconik\Laravel;

use Illuminate\View\Component;

class DooIconikComponent extends Component
{
    public function __construct(
        public string $name,
        public string|int $size = 'md',
        public bool $spin = false,
        public bool $pulse = false,
        public bool $bounce = false,
        public bool $flipHorizontal = false,
        public bool $flipVertical = false,
        public string $variant = 'default',
        public ?string $animation = null,
        public ?string $ariaLabel = null,
    ) {}

    public function render()
    {
        return app(IconRepository::class)->render(
            name: $this->name,
            size: $this->size,
            spin: $this->spin,
            pulse: $this->pulse,
            bounce: $this->bounce,
            flipHorizontal: $this->flipHorizontal,
            flipVertical: $this->flipVertical,
            variant: $this->variant,
            animation: $this->animation,
            ariaLabel: $this->ariaLabel,
            class: $this->attributes->get('class', ''),
            attributes: $this->attributes->except(['name', 'size', 'spin', 'pulse', 'bounce', 'flip-horizontal', 'flip-vertical', 'variant', 'animation', 'aria-label', 'class'])->getAttributes()
        );
    }
}
