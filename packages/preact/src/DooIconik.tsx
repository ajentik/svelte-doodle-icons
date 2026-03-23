import { h, FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { iconData, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass, animationCSS } from '@ajentik/doo-iconik';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@ajentik/doo-iconik';
import type { JSX } from 'preact';

export interface DooIconikProps extends Omit<JSX.SVGAttributes<SVGSVGElement>, 'size'> {
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
}

let stylesInjected = false;

export const DooIconik: FunctionComponent<DooIconikProps> = ({
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
  class: className,
  ...rest
}) => {
  useEffect(() => {
    if (!stylesInjected && typeof document !== 'undefined') {
      if (!document.getElementById('doo-iconik-styles')) {
        const style = document.createElement('style');
        style.id = 'doo-iconik-styles';
        style.textContent = animationCSS;
        document.head.appendChild(style);
      }
      stylesInjected = true;
    }
  }, []);

  const icon = iconData[name];
  if (!icon) return null;

  const px = resolveSize(size);
  const animClass = buildAnimationClasses(spin, pulse, bounce, animation);
  const variantClass = buildVariantClass(variant);
  const transforms = buildTransform(flipHorizontal, flipVertical);
  const classes = [variantClass, animClass, className].filter(Boolean).join(' ');

  return h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: icon.viewBox,
    width: px,
    height: px,
    fill: icon.stroke ? 'none' : 'currentColor',
    stroke: icon.stroke ? 'currentColor' : undefined,
    'stroke-width': icon.stroke ? 2 : undefined,
    'stroke-linecap': icon.stroke ? 'round' : undefined,
    'stroke-linejoin': icon.stroke ? 'round' : undefined,
    class: classes || undefined,
    style: transforms ? { transform: transforms } : undefined,
    'aria-hidden': ariaLabel ? undefined : 'true',
    'aria-label': ariaLabel || undefined,
    role: ariaLabel ? 'img' : undefined,
    ...rest,
  },
    ...icon.paths.map(d => h('path', { d })),
    ...(icon.circles || []).map(c => h('circle', { cx: c.cx, cy: c.cy, r: c.r })),
    ...(icon.lines || []).map(l => h('line', { x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2 }))
  );
};
