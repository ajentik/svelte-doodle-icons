import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { iconData, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass, animationCSS } from '@doo-iconik/core';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@doo-iconik/core';

interface DooIconikProps {
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
  class?: string;
}

export const DooIconik = component$<DooIconikProps>((props) => {
  const {
    name,
    size = 'md',
    spin = false,
    pulse = false,
    bounce = false,
    flipHorizontal = false,
    flipVertical = false,
    variant,
    animation,
    ariaLabel,
    class: className = '',
  } = props;

  useVisibleTask$(() => {
    if (typeof document !== 'undefined' && !document.getElementById('doo-iconik-styles')) {
      const style = document.createElement('style');
      style.id = 'doo-iconik-styles';
      style.textContent = animationCSS;
      document.head.appendChild(style);
    }
  }, { strategy: 'document-ready' });

  const icon = iconData[name];
  if (!icon) return null;

  const px = resolveSize(size);
  const cls = buildAnimationClasses(spin, pulse, bounce, animation);
  const variantCls = buildVariantClass(variant);
  const transform = buildTransform(flipHorizontal, flipVertical);
  const classes = [variantCls, cls, className].filter(Boolean).join(' ');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      width={px}
      height={px}
      fill={icon.stroke ? 'none' : 'currentColor'}
      stroke={icon.stroke ? 'currentColor' : undefined}
      stroke-width={icon.stroke ? 2 : undefined}
      stroke-linecap={icon.stroke ? 'round' : undefined}
      stroke-linejoin={icon.stroke ? 'round' : undefined}
      class={classes || undefined}
      style={transform ? { transform } : undefined}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel || undefined}
      role={ariaLabel ? 'img' : undefined}
    >
      {icon.paths.map((d, i) => <path key={i} d={d} />)}
      {(icon.circles || []).map((c, i) => <circle key={`c${i}`} cx={c.cx} cy={c.cy} r={c.r} />)}
      {(icon.lines || []).map((l, i) => <line key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />)}
    </svg>
  );
});
