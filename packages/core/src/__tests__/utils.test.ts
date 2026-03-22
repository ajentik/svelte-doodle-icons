import { describe, it, expect } from 'vitest';
import {
  escapeAttr,
  resolveSize,
  sizeMap,
  buildTransform,
  buildAnimationClasses,
  buildVariantClass,
} from '../utils.js';

describe('escapeAttr', () => {
  it('escapes ampersand', () => {
    expect(escapeAttr('a&b')).toBe('a&amp;b');
  });

  it('escapes double quote', () => {
    expect(escapeAttr('a"b')).toBe('a&quot;b');
  });

  it('escapes single quote', () => {
    expect(escapeAttr("a'b")).toBe('a&#39;b');
  });

  it('escapes less-than', () => {
    expect(escapeAttr('a<b')).toBe('a&lt;b');
  });

  it('escapes greater-than', () => {
    expect(escapeAttr('a>b')).toBe('a&gt;b');
  });

  it('returns empty string unchanged', () => {
    expect(escapeAttr('')).toBe('');
  });

  it('returns string with no special chars unchanged', () => {
    expect(escapeAttr('hello world')).toBe('hello world');
  });
});

describe('resolveSize', () => {
  it('resolves xs to 12', () => {
    expect(resolveSize('xs')).toBe(12);
  });

  it('resolves sm to 16', () => {
    expect(resolveSize('sm')).toBe(16);
  });

  it('resolves md to 24', () => {
    expect(resolveSize('md')).toBe(24);
  });

  it('resolves lg to 32', () => {
    expect(resolveSize('lg')).toBe(32);
  });

  it('resolves xl to 48', () => {
    expect(resolveSize('xl')).toBe(48);
  });

  it('resolves 2xl to 64', () => {
    expect(resolveSize('2xl')).toBe(64);
  });

  it('passes through numeric size', () => {
    expect(resolveSize(128)).toBe(128);
  });

  it('defaults unknown string to 24', () => {
    expect(resolveSize('unknown' as any)).toBe(24);
  });
});

describe('sizeMap', () => {
  it('has exactly 6 entries', () => {
    expect(Object.keys(sizeMap)).toHaveLength(6);
  });
});

describe('buildTransform', () => {
  it('returns undefined when no flips', () => {
    expect(buildTransform(false, false)).toBeUndefined();
  });

  it('returns scaleX(-1) for flipH', () => {
    expect(buildTransform(true, false)).toBe('scaleX(-1)');
  });

  it('returns scaleY(-1) for flipV', () => {
    expect(buildTransform(false, true)).toBe('scaleY(-1)');
  });

  it('returns both transforms for flipH and flipV', () => {
    expect(buildTransform(true, true)).toBe('scaleX(-1) scaleY(-1)');
  });
});

describe('buildAnimationClasses', () => {
  it('returns empty string with no animations', () => {
    expect(buildAnimationClasses(false, false, false)).toBe('');
  });

  it('returns spin class when spin is true', () => {
    expect(buildAnimationClasses(true, false, false)).toBe('doo-iconik-spin');
  });

  it('returns multiple classes for multiple booleans', () => {
    const result = buildAnimationClasses(true, true, true);
    expect(result).toBe('doo-iconik-spin doo-iconik-pulse doo-iconik-bounce');
  });

  it('animation prop overrides boolean flags', () => {
    const result = buildAnimationClasses(true, true, true, 'wiggle');
    expect(result).toBe('doo-iconik-wiggle');
  });
});

describe('buildVariantClass', () => {
  it('returns empty string for undefined', () => {
    expect(buildVariantClass(undefined)).toBe('');
  });

  it('returns empty string for default', () => {
    expect(buildVariantClass('default')).toBe('');
  });

  it('returns doo-iconik-glow for glow', () => {
    expect(buildVariantClass('glow')).toBe('doo-iconik-glow');
  });

  it('returns doo-iconik-neon for neon', () => {
    expect(buildVariantClass('neon')).toBe('doo-iconik-neon');
  });
});
