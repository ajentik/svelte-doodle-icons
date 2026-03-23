import { LitElement, html, css, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconData, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass } from '@ajentik/doo-iconik';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@ajentik/doo-iconik';

@customElement('doo-iconik-lit')
export class DooIconikElement extends LitElement {
  static styles = css`
    :host { display: inline-flex; }
    @keyframes doo-iconik-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes doo-iconik-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes doo-iconik-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25%); } }
    @keyframes doo-iconik-wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
    @keyframes doo-iconik-shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); } 20%, 40%, 60%, 80% { transform: translateX(2px); } }
    @keyframes doo-iconik-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    @keyframes doo-iconik-heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); } }
    @keyframes doo-iconik-tada { 0% { transform: scale(1) rotate(0deg); } 10%, 20% { transform: scale(0.9) rotate(-3deg); } 30%, 50%, 70% { transform: scale(1.1) rotate(3deg); } 40%, 60% { transform: scale(1.1) rotate(-3deg); } 80%, 100% { transform: scale(1) rotate(0deg); } }
    @keyframes doo-iconik-rubber { from, to { transform: scale3d(1,1,1); } 30% { transform: scale3d(1.25,0.75,1); } 40% { transform: scale3d(0.75,1.25,1); } 50% { transform: scale3d(1.15,0.85,1); } 65% { transform: scale3d(0.95,1.05,1); } 75% { transform: scale3d(1.05,0.95,1); } }
    @keyframes doo-iconik-swing { 20% { transform: rotate3d(0,0,1,15deg); } 40% { transform: rotate3d(0,0,1,-10deg); } 60% { transform: rotate3d(0,0,1,5deg); } 80% { transform: rotate3d(0,0,1,-5deg); } 100% { transform: rotate3d(0,0,1,0deg); } }
    @keyframes doo-iconik-jello { 0%, 100% { transform: skewX(0deg) skewY(0deg); } 11.1% { transform: skewX(0deg) skewY(0deg); } 22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); } 33.3% { transform: skewX(6.25deg) skewY(6.25deg); } 44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); } 55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); } 66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); } 77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); } 88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); } }
    .doo-iconik-spin { animation: doo-iconik-spin 1s linear infinite; }
    .doo-iconik-pulse { animation: doo-iconik-pulse 2s ease-in-out infinite; }
    .doo-iconik-bounce { animation: doo-iconik-bounce 1s ease infinite; }
    .doo-iconik-wiggle { animation: doo-iconik-wiggle 1s ease infinite; }
    .doo-iconik-shake { animation: doo-iconik-shake 0.8s ease infinite; }
    .doo-iconik-float { animation: doo-iconik-float 3s ease-in-out infinite; }
    .doo-iconik-heartbeat { animation: doo-iconik-heartbeat 1.5s ease-in-out infinite; }
    .doo-iconik-tada { animation: doo-iconik-tada 1s ease infinite; }
    .doo-iconik-rubber { animation: doo-iconik-rubber 1s ease infinite; }
    .doo-iconik-swing { animation: doo-iconik-swing 1s ease infinite; transform-origin: top center; }
    .doo-iconik-jello { animation: doo-iconik-jello 1s ease infinite; }
    .doo-iconik-glow { filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor); }
    .doo-iconik-neon { filter: drop-shadow(0 0 2px currentColor) drop-shadow(0 0 4px currentColor) drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor); }
    .doo-iconik-shadow { filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.25)); }
    .doo-iconik-embossed { filter: drop-shadow(1px 1px 0px rgba(0,0,0,0.3)) drop-shadow(-1px -1px 0px rgba(255,255,255,0.4)); }
    .doo-iconik-glass { opacity: 0.55; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.12)); }
    .doo-iconik-outline { fill: none !important; stroke: currentColor !important; stroke-width: 1.5 !important; }
    .doo-iconik-retro { filter: sepia(0.6) saturate(1.4) drop-shadow(1px 1px 0px rgba(0,0,0,0.2)); }
  `;

  @property({ type: String }) name: DooIconikName = '' as DooIconikName;
  @property() size: DooIconikSize | number = 'md';
  @property({ type: Boolean }) spin = false;
  @property({ type: Boolean }) pulse = false;
  @property({ type: Boolean }) bounce = false;
  @property({ type: Boolean, attribute: 'flip-horizontal' }) flipHorizontal = false;
  @property({ type: Boolean, attribute: 'flip-vertical' }) flipVertical = false;
  @property({ type: String }) variant?: DooIconikVariant;
  @property({ type: String }) animation?: DooIconikAnimation;
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

  render() {
    const icon = iconData[this.name];
    if (!icon) return nothing;

    const px = resolveSize(this.size);
    const cls = buildAnimationClasses(this.spin, this.pulse, this.bounce, this.animation);
    const variantCls = buildVariantClass(this.variant);
    const allClasses = [variantCls, cls].filter(Boolean).join(' ');
    const transform = buildTransform(this.flipHorizontal, this.flipVertical);

    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox=${icon.viewBox}
        width=${px}
        height=${px}
        fill=${icon.stroke ? 'none' : 'currentColor'}
        stroke=${icon.stroke ? 'currentColor' : nothing}
        stroke-width=${icon.stroke ? 2 : nothing}
        stroke-linecap=${icon.stroke ? 'round' : nothing}
        stroke-linejoin=${icon.stroke ? 'round' : nothing}
        class=${allClasses || nothing}
        style=${transform ? `transform: ${transform}` : nothing}
        aria-hidden=${this.ariaLabel ? nothing : 'true'}
        aria-label=${this.ariaLabel || nothing}
        role=${this.ariaLabel ? 'img' : nothing}
      >
        ${icon.paths.map(d => svg`<path d=${d} />`)}
        ${(icon.circles || []).map(c => svg`<circle cx=${c.cx} cy=${c.cy} r=${c.r} />`)}
        ${(icon.lines || []).map(l => svg`<line x1=${l.x1} y1=${l.y1} x2=${l.x2} y2=${l.y2} />`)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'doo-iconik-lit': DooIconikElement;
  }
}
