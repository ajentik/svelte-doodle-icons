import type { Alpine as AlpineType } from 'alpinejs';
import { iconData, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass, animationCSS, escapeAttr } from '@ajentik/doo-iconik';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@ajentik/doo-iconik';

// Inject animation styles once
function injectStyles() {
  if (typeof document !== 'undefined' && !document.getElementById('doo-iconik-styles')) {
    const style = document.createElement('style');
    style.id = 'doo-iconik-styles';
    style.textContent = animationCSS;
    document.head.appendChild(style);
  }
}

function renderIcon(el: HTMLElement, name: DooIconikName, options: {
  size?: DooIconikSize | number;
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  variant?: DooIconikVariant;
  animation?: DooIconikAnimation;
  ariaLabel?: string;
} = {}) {
  const icon = iconData[name];
  if (!icon) { el.innerHTML = ''; return; }

  const px = resolveSize(options.size ?? 'md');
  const cls = buildAnimationClasses(options.spin ?? false, options.pulse ?? false, options.bounce ?? false, options.animation);
  const variantCls = buildVariantClass(options.variant);
  const allClasses = [variantCls, cls].filter(Boolean).join(' ');
  const transform = buildTransform(options.flipHorizontal ?? false, options.flipVertical ?? false);

  const strokeAttrs = icon.stroke
    ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
    : 'fill="currentColor"';

  const paths = icon.paths.map(d => `<path d="${d}"/>`).join('');
  const circles = (icon.circles || []).map(c => `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}"/>`).join('');
  const lines = (icon.lines || []).map(l => `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}"/>`).join('');

  const ariaAttrs = options.ariaLabel
    ? `aria-label="${escapeAttr(options.ariaLabel)}" role="img"`
    : 'aria-hidden="true"';

  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" width="${px}" height="${px}" ${strokeAttrs} class="${allClasses}" ${transform ? `style="transform: ${transform}"` : ''} ${ariaAttrs}>${paths}${circles}${lines}</svg>`;
}

/**
 * Alpine.js plugin for doo-iconik
 *
 * Usage:
 *   <div x-data x-doo-iconik="'heart'"></div>
 *   <div x-data x-doo-iconik.lg.spin="'heart'"></div>
 *   <div x-data x-doo-iconik="{ name: 'heart', size: 'lg', spin: true }"></div>
 */
export default function dooIconikPlugin(Alpine: AlpineType) {
  injectStyles();

  Alpine.directive('doo-iconik', (el: HTMLElement, { expression, modifiers }: { expression: string; modifiers: string[] }, { evaluate }: { evaluate: (expr: string) => unknown }) => {
    const value = evaluate(expression);

    let name: DooIconikName;
    let options: any = {};

    if (typeof value === 'string') {
      name = value as DooIconikName;
    } else if (typeof value === 'object' && value !== null) {
      name = (value as any).name;
      options = value;
    } else {
      return;
    }

    // Parse modifiers as options: x-doo-iconik.lg.spin="'heart'"
    for (const mod of modifiers) {
      if (['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(mod)) options.size = mod;
      else if (mod === 'spin') options.spin = true;
      else if (mod === 'pulse') options.pulse = true;
      else if (mod === 'bounce') options.bounce = true;
      else if (mod === 'flip-horizontal' || mod === 'fliph') options.flipHorizontal = true;
      else if (mod === 'flip-vertical' || mod === 'flipv') options.flipVertical = true;
      else if (['glow', 'neon', 'shadow', 'embossed', 'glass', 'outline', 'retro'].includes(mod)) options.variant = mod;
      else if (['wiggle', 'shake', 'float', 'heartbeat', 'tada', 'rubber', 'swing', 'jello'].includes(mod)) options.animation = mod;
    }

    renderIcon(el as HTMLElement, name, options);
  });

  // Magic helper: $dooIconik('heart', { size: 'lg' })
  Alpine.magic('dooIconik', () => {
    return (name: DooIconikName, options?: any) => {
      const icon = iconData[name];
      if (!icon) return '';

      const px = resolveSize(options?.size ?? 'md');
      const cls = buildAnimationClasses(options?.spin ?? false, options?.pulse ?? false, options?.bounce ?? false, options?.animation);
      const variantCls = buildVariantClass(options?.variant);
      const allClasses = [variantCls, cls].filter(Boolean).join(' ');
      const transform = buildTransform(options?.flipHorizontal ?? false, options?.flipVertical ?? false);

      const strokeAttrs = icon.stroke
        ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
        : 'fill="currentColor"';

      const paths = icon.paths.map((d: string) => `<path d="${d}"/>`).join('');
      const circles = (icon.circles || []).map((c: any) => `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}"/>`).join('');
      const lines = (icon.lines || []).map((l: any) => `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}"/>`).join('');

      const ariaAttrs = options?.ariaLabel
        ? `aria-label="${escapeAttr(options.ariaLabel)}" role="img"`
        : 'aria-hidden="true"';

      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" width="${px}" height="${px}" ${strokeAttrs} class="${allClasses}" ${transform ? `style="transform: ${transform}"` : ''} ${ariaAttrs}>${paths}${circles}${lines}</svg>`;
    };
  });
}

// Re-export for convenience
export { iconData, resolveSize } from '@ajentik/doo-iconik';
export type { DooIconikName, DooIconikSize, DooIconikCategory, DooIconikVariant, DooIconikAnimation, IconData } from '@ajentik/doo-iconik';
