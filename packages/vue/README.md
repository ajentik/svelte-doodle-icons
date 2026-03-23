# @ajentik/doo-iconik-vue

[![npm version](https://img.shields.io/npm/v/@ajentik/doo-iconik-vue.svg)](https://www.npmjs.com/package/@ajentik/doo-iconik-vue)

Vue component library: 595 hand-drawn doodle-style SVG icons for Vue 3.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

```bash
npm i @ajentik/doo-iconik-vue
```

## Usage

```vue
<script setup>
import { DooIconik } from '@ajentik/doo-iconik-vue';
</script>

<template>
  <DooIconik name="heart" size="lg" />
  <DooIconik name="star" size="md" spin />
  <DooIconik name="arrow-right" flip-horizontal />
</template>
```

## Props

All components accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flipHorizontal`, `flipVertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
