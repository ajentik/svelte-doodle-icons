import React, { forwardRef, useEffect, useRef } from 'react';
import {
  iconData,
  resolveSize,
  buildTransform,
  buildAnimationClasses,
  buildVariantClass,
  animationCSS,
} from '@ajentik/doo-iconik';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@ajentik/doo-iconik';

let cssInjected = false;

function injectCSS() {
  if (cssInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.setAttribute('data-doo-iconik', '');
  style.textContent = animationCSS;
  document.head.appendChild(style);
  cssInjected = true;
}

export interface DooIconikProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
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

export const DooIconik = forwardRef<SVGSVGElement, DooIconikProps>(function DooIconik(
  {
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
    className,
    style,
    ...rest
  },
  ref
) {
  useEffect(() => {
    injectCSS();
  }, []);

  const icon = iconData[name];
  if (!icon) return null;

  const pixelSize = resolveSize(size);
  const transform = buildTransform(flipHorizontal, flipVertical);
  const animClasses = buildAnimationClasses(spin, pulse, bounce, animation);
  const variantClass = buildVariantClass(variant);

  const combinedClassName = [variantClass, animClasses, className].filter(Boolean).join(' ') || undefined;

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(transform ? { transform } : {}),
  };

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      width={pixelSize}
      height={pixelSize}
      fill={icon.stroke ? 'none' : 'currentColor'}
      stroke={icon.stroke ? 'currentColor' : undefined}
      strokeWidth={icon.stroke ? 2 : undefined}
      strokeLinecap={icon.stroke ? 'round' : undefined}
      strokeLinejoin={icon.stroke ? 'round' : undefined}
      className={combinedClassName}
      style={combinedStyle}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel || undefined}
      role={ariaLabel ? 'img' : undefined}
      {...rest}
    >
      {icon.paths.map((d, i) => (
        <path key={`p-${i}`} d={d} />
      ))}
      {icon.circles?.map((c, i) => (
        <circle key={`c-${i}`} cx={c.cx} cy={c.cy} r={c.r} />
      ))}
      {icon.lines?.map((l, i) => (
        <line key={`l-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
      ))}
    </svg>
  );
});
