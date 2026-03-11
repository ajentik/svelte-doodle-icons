import { Component, createMemo, onMount, splitProps, JSX } from 'solid-js';
import { For, Show } from 'solid-js/web';
import { iconData, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass, animationCSS } from '@doo-iconik/core';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@doo-iconik/core';

export interface DooIconikProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  name: DooIconikName;
  size?: DooIconikSize | number;
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  variant?: DooIconikVariant;
  animation?: DooIconikAnimation;
}

export const DooIconik: Component<DooIconikProps> = (props) => {
  const [local, svgProps] = splitProps(props, ['name', 'size', 'spin', 'pulse', 'bounce', 'flipHorizontal', 'flipVertical', 'variant', 'animation', 'class']);

  const icon = createMemo(() => iconData[local.name]);
  const pixelSize = createMemo(() => resolveSize(local.size ?? 'md'));
  const transforms = createMemo(() => buildTransform(local.flipHorizontal ?? false, local.flipVertical ?? false));
  const animClass = createMemo(() => buildAnimationClasses(local.spin ?? false, local.pulse ?? false, local.bounce ?? false, local.animation));
  const variantClass = createMemo(() => buildVariantClass(local.variant));

  onMount(() => {
    if (typeof document !== 'undefined' && !document.getElementById('doo-iconik-styles')) {
      const style = document.createElement('style');
      style.id = 'doo-iconik-styles';
      style.textContent = animationCSS;
      document.head.appendChild(style);
    }
  });

  return (
    <Show when={icon()}>
      {(iconData) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={iconData().viewBox}
          width={pixelSize()}
          height={pixelSize()}
          fill={iconData().stroke ? 'none' : 'currentColor'}
          stroke={iconData().stroke ? 'currentColor' : undefined}
          stroke-width={iconData().stroke ? 2 : undefined}
          stroke-linecap={iconData().stroke ? 'round' : undefined}
          stroke-linejoin={iconData().stroke ? 'round' : undefined}
          class={[variantClass(), animClass(), local.class].filter(Boolean).join(' ') || undefined}
          style={transforms() ? { transform: transforms() } : undefined}
          aria-hidden="true"
          {...svgProps}
        >
          <For each={iconData().paths}>{(d) => <path d={d} />}</For>
          <For each={iconData().circles || []}>{(c) => <circle cx={c.cx} cy={c.cy} r={c.r} />}</For>
          <For each={iconData().lines || []}>{(l) => <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />}</For>
        </svg>
      )}
    </Show>
  );
};
