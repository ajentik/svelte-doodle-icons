import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DooIconik } from '../DooIconik';

describe('DooIconik', () => {
  it('renders an SVG element', () => {
    const { container } = render(<DooIconik name="heart" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('returns null for unknown icon name', () => {
    const { container } = render(<DooIconik name={'nonexistent-icon' as any} />);
    expect(container.innerHTML).toBe('');
  });

  it('applies default size (24px)', () => {
    const { container } = render(<DooIconik name="heart" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('24');
    expect(svg.getAttribute('height')).toBe('24');
  });

  it('applies named size (lg = 32)', () => {
    const { container } = render(<DooIconik name="heart" size="lg" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.getAttribute('height')).toBe('32');
  });

  it('applies numeric size (64)', () => {
    const { container } = render(<DooIconik name="heart" size={64} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('64');
    expect(svg.getAttribute('height')).toBe('64');
  });

  it('is aria-hidden by default', () => {
    const { container } = render(<DooIconik name="heart" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies aria-label and role="img" when ariaLabel set', () => {
    const { container } = render(<DooIconik name="heart" ariaLabel="Heart icon" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('aria-label')).toBe('Heart icon');
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-hidden')).toBeNull();
  });

  it('applies animation class (spin)', () => {
    const { container } = render(<DooIconik name="heart" spin />);
    const svg = container.querySelector('svg')!;
    expect(svg.classList.contains('doo-iconik-spin')).toBe(true);
  });

  it('applies variant class (glow)', () => {
    const { container } = render(<DooIconik name="heart" variant="glow" />);
    const svg = container.querySelector('svg')!;
    expect(svg.classList.contains('doo-iconik-glow')).toBe(true);
  });

  it('applies transform for flipHorizontal', () => {
    const { container } = render(<DooIconik name="heart" flipHorizontal />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.transform).toBe('scaleX(-1)');
  });

  it('renders path elements', () => {
    const { container } = render(<DooIconik name="heart" />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(1);
  });
});
