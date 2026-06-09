import { describe, it, expect } from 'vitest';
import { toRoman } from './roman';

describe('toRoman', () => {
  it('convertit les unites', () => {
    expect(toRoman(1)).toBe('I');
    expect(toRoman(3)).toBe('III');
    expect(toRoman(4)).toBe('IV');
    expect(toRoman(9)).toBe('IX');
  });

  it('convertit les dizaines et centaines', () => {
    expect(toRoman(40)).toBe('XL');
    expect(toRoman(90)).toBe('XC');
    expect(toRoman(2024)).toBe('MMXXIV');
  });

  it('rejette les valeurs hors plage', () => {
    expect(() => toRoman(0)).toThrow(RangeError);
    expect(() => toRoman(4000)).toThrow(RangeError);
    expect(() => toRoman(1.5)).toThrow(RangeError);
  });
});
