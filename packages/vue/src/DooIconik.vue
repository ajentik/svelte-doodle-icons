<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { iconData, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass, animationCSS } from '@ajentik/doo-iconik';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@ajentik/doo-iconik';

const props = withDefaults(defineProps<{
  name: DooIconikName;
  size?: DooIconikSize | number;
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  variant?: DooIconikVariant;
  animation?: DooIconikAnimation;
  ariaLabel?: string;
}>(), {
  size: 'md',
  spin: false,
  pulse: false,
  bounce: false,
  flipHorizontal: false,
  flipVertical: false,
  variant: undefined,
  animation: undefined,
});

const icon = computed(() => iconData[props.name]);
const pixelSize = computed(() => resolveSize(props.size));
const transforms = computed(() => buildTransform(props.flipHorizontal, props.flipVertical));
const animClass = computed(() => buildAnimationClasses(props.spin, props.pulse, props.bounce, props.animation));
const variantClass = computed(() => buildVariantClass(props.variant));

// Inject animation CSS once
onMounted(() => {
  if (!document.getElementById('doo-iconik-styles')) {
    const style = document.createElement('style');
    style.id = 'doo-iconik-styles';
    style.textContent = animationCSS;
    document.head.appendChild(style);
  }
});
</script>

<template>
  <svg
    v-if="icon"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="icon.viewBox"
    :width="pixelSize"
    :height="pixelSize"
    :fill="icon.stroke ? 'none' : 'currentColor'"
    :stroke="icon.stroke ? 'currentColor' : undefined"
    :stroke-width="icon.stroke ? 2 : undefined"
    :stroke-linecap="icon.stroke ? 'round' : undefined"
    :stroke-linejoin="icon.stroke ? 'round' : undefined"
    :class="[variantClass, animClass].filter(Boolean).join(' ')"
    :style="transforms ? { transform: transforms } : undefined"
    :aria-hidden="ariaLabel ? undefined : true"
    :aria-label="ariaLabel || undefined"
    :role="ariaLabel ? 'img' : undefined"
  >
    <path v-for="(d, i) in icon.paths" :key="'p' + i" :d="d" />
    <circle
      v-for="(c, i) in icon.circles"
      :key="'c' + i"
      :cx="c.cx"
      :cy="c.cy"
      :r="c.r"
    />
    <line
      v-for="(l, i) in icon.lines"
      :key="'l' + i"
      :x1="l.x1"
      :y1="l.y1"
      :x2="l.x2"
      :y2="l.y2"
    />
  </svg>
</template>
