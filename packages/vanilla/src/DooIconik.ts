import { iconData, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass, animationCSS, escapeAttr } from '@doo-iconik/core';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@doo-iconik/core';

export class DooIconikElement extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'size', 'spin', 'pulse', 'bounce', 'flip-horizontal', 'flip-vertical', 'variant', 'animation', 'aria-label'];
  }

  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const name = this.getAttribute('name') as DooIconikName;
    if (!name) return;

    const icon = iconData[name];
    if (!icon) return;

    const size = this.getAttribute('size') || 'md';
    const pixelSize = resolveSize(isNaN(Number(size)) ? size as DooIconikSize : Number(size));
    const spin = this.hasAttribute('spin');
    const pulse = this.hasAttribute('pulse');
    const bounce = this.hasAttribute('bounce');
    const flipH = this.hasAttribute('flip-horizontal');
    const flipV = this.hasAttribute('flip-vertical');
    const variant = (this.getAttribute('variant') || undefined) as DooIconikVariant | undefined;
    const animation = (this.getAttribute('animation') || undefined) as DooIconikAnimation | undefined;

    const animClass = buildAnimationClasses(spin, pulse, bounce, animation);
    const variantClass = buildVariantClass(variant);
    const cls = [variantClass, animClass].filter(Boolean).join(' ');
    const transform = buildTransform(flipH, flipV);

    const strokeAttrs = icon.stroke
      ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
      : 'fill="currentColor"';

    const paths = icon.paths.map(d => `<path d="${d}" />`).join('');
    const circles = (icon.circles || []).map(c => `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" />`).join('');
    const lines = (icon.lines || []).map(l => `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" />`).join('');

    const ariaLabel = this.getAttribute('aria-label');
    const ariaAttrs = ariaLabel
      ? `aria-label="${escapeAttr(ariaLabel)}" role="img"`
      : 'aria-hidden="true"';

    this.shadow.innerHTML = `
      <style>${animationCSS}</style>
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="${icon.viewBox}"
        width="${pixelSize}" height="${pixelSize}"
        ${strokeAttrs}
        class="${cls}"
        ${transform ? `style="transform: ${transform}"` : ''}
        ${ariaAttrs}>
        ${paths}${circles}${lines}
      </svg>
    `;
  }
}
