import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { iconData, resolveSize, buildTransform, buildAnimationClasses, buildVariantClass, animationCSS, escapeAttr } from '@doo-iconik/core';
import type { DooIconikName, DooIconikSize, DooIconikVariant, DooIconikAnimation } from '@doo-iconik/core';

@Component({
  selector: 'doo-iconik',
  standalone: true,
  imports: [CommonModule],
  template: `<span [innerHTML]="svgContent"></span>`,
  styles: []
})
export class DooIconikComponent implements OnInit, OnChanges {
  @Input({ required: true }) name!: DooIconikName;
  @Input() size: DooIconikSize | number = 'md';
  @Input() spin = false;
  @Input() pulse = false;
  @Input() bounce = false;
  @Input() flipHorizontal = false;
  @Input() flipVertical = false;
  @Input() variant?: DooIconikVariant;
  @Input() animation?: DooIconikAnimation;
  @Input() ariaLabel?: string;

  svgContent: SafeHtml = '';

  private stylesInjected = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.injectStyles();
    this.updateSvg();
  }

  ngOnChanges() {
    this.updateSvg();
  }

  private injectStyles() {
    if (this.stylesInjected) return;
    if (typeof document !== 'undefined' && !document.getElementById('doo-iconik-styles')) {
      const style = document.createElement('style');
      style.id = 'doo-iconik-styles';
      style.textContent = animationCSS;
      document.head.appendChild(style);
    }
    this.stylesInjected = true;
  }

  private updateSvg() {
    const icon = iconData[this.name];
    if (!icon) { this.svgContent = ''; return; }

    const px = resolveSize(this.size);
    const animCls = buildAnimationClasses(this.spin, this.pulse, this.bounce, this.animation);
    const variantCls = buildVariantClass(this.variant);
    const cls = [variantCls, animCls].filter(Boolean).join(' ');
    const transform = buildTransform(this.flipHorizontal, this.flipVertical);

    const strokeAttrs = icon.stroke
      ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
      : 'fill="currentColor"';

    const paths = icon.paths.map(d => `<path d="${d}"/>`).join('');
    const circles = (icon.circles || []).map(c => `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}"/>`).join('');
    const lines = (icon.lines || []).map(l => `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}"/>`).join('');

    const ariaAttrs = this.ariaLabel
      ? `aria-label="${escapeAttr(this.ariaLabel)}" role="img"`
      : 'aria-hidden="true"';

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" width="${px}" height="${px}" ${strokeAttrs} class="${cls}" ${transform ? `style="transform: ${transform}"` : ''} ${ariaAttrs}>${paths}${circles}${lines}</svg>`;

    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
