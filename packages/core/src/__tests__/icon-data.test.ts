import { describe, it, expect } from 'vitest';
import { iconData } from '../icon-data.js';

describe('iconData', () => {
  const iconNames = Object.keys(iconData);

  it('has 595 icons', () => {
    expect(iconNames).toHaveLength(595);
  });

  it('every icon has a viewBox string matching /^\\d+ \\d+ \\d+ \\d+$/', () => {
    for (const name of iconNames) {
      expect(iconData[name].viewBox).toMatch(/^\d+ \d+ \d+ \d+$/);
    }
  });

  it('every icon has at least one path', () => {
    for (const name of iconNames) {
      expect(iconData[name].paths.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('every path is a non-empty string', () => {
    for (const name of iconNames) {
      for (const path of iconData[name].paths) {
        expect(typeof path).toBe('string');
        expect(path.length).toBeGreaterThan(0);
      }
    }
  });

  it('circles have cx, cy, r (number) when present', () => {
    for (const name of iconNames) {
      const icon = iconData[name];
      if (icon.circles) {
        for (const circle of icon.circles) {
          expect(typeof circle.cx).toBe('number');
          expect(typeof circle.cy).toBe('number');
          expect(typeof circle.r).toBe('number');
        }
      }
    }
  });

  it('lines have x1, y1, x2, y2 (number) when present', () => {
    for (const name of iconNames) {
      const icon = iconData[name];
      if (icon.lines) {
        for (const line of icon.lines) {
          expect(typeof line.x1).toBe('number');
          expect(typeof line.y1).toBe('number');
          expect(typeof line.x2).toBe('number');
          expect(typeof line.y2).toBe('number');
        }
      }
    }
  });

  it('stroke is boolean when present', () => {
    for (const name of iconNames) {
      const icon = iconData[name];
      if (icon.stroke !== undefined) {
        expect(typeof icon.stroke).toBe('boolean');
      }
    }
  });

  it('icon names are kebab-case', () => {
    for (const name of iconNames) {
      expect(name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});
