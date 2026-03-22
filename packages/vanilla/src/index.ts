import { iconData, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass, animationCSS } from '@doo-iconik/core';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@doo-iconik/core';
import { DooIconikElement } from './DooIconik.js';

export { DooIconikElement } from './DooIconik.js';

export type { DooIconikName, DooIconikSize, DooIconikCategory, DooIconikVariant, DooIconikAnimation, IconData } from '@doo-iconik/core';
export { iconData, sizeMap, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass, animationCSS, escapeAttr } from '@doo-iconik/core';

/**
 * Register the `<doo-iconik>` custom element.
 * Safe to call multiple times — only registers once.
 */
export function register(): void {
  if (!customElements.get('doo-iconik')) {
    customElements.define('doo-iconik', DooIconikElement);
  }
}

/**
 * Create an SVG element for the given icon without using Web Components.
 * Returns `null` if the icon name is not found.
 */
export function createIcon(
  name: DooIconikName,
  options?: {
    size?: DooIconikSize | number;
    spin?: boolean;
    pulse?: boolean;
    bounce?: boolean;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    variant?: DooIconikVariant;
    animation?: DooIconikAnimation;
    ariaLabel?: string;
    className?: string;
  }
): SVGSVGElement | null {
  const icon = iconData[name];
  if (!icon) return null;

  const opts = options || {};
  const pixelSize = resolveSize(opts.size ?? 'md');
  const animClass = buildAnimationClasses(
    opts.spin ?? false,
    opts.pulse ?? false,
    opts.bounce ?? false,
    opts.animation
  );
  const variantClass = buildVariantClass(opts.variant);
  const transform = buildTransform(
    opts.flipHorizontal ?? false,
    opts.flipVertical ?? false
  );

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('xmlns', NS);
  svg.setAttribute('viewBox', icon.viewBox);
  svg.setAttribute('width', String(pixelSize));
  svg.setAttribute('height', String(pixelSize));
  if (opts.ariaLabel) {
    svg.setAttribute('aria-label', opts.ariaLabel);
    svg.setAttribute('role', 'img');
  } else {
    svg.setAttribute('aria-hidden', 'true');
  }

  if (icon.stroke) {
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
  } else {
    svg.setAttribute('fill', 'currentColor');
  }

  const classes = [variantClass, animClass, opts.className].filter(Boolean).join(' ');
  if (classes) svg.setAttribute('class', classes);
  if (transform) svg.style.transform = transform;

  for (const d of icon.paths) {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  }

  if (icon.circles) {
    for (const c of icon.circles) {
      const circle = document.createElementNS(NS, 'circle');
      circle.setAttribute('cx', String(c.cx));
      circle.setAttribute('cy', String(c.cy));
      circle.setAttribute('r', String(c.r));
      svg.appendChild(circle);
    }
  }

  if (icon.lines) {
    for (const l of icon.lines) {
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', String(l.x1));
      line.setAttribute('y1', String(l.y1));
      line.setAttribute('x2', String(l.x2));
      line.setAttribute('y2', String(l.y2));
      svg.appendChild(line);
    }
  }

  return svg;
}
