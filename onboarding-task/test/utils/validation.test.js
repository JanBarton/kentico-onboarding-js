import { isNullOrWhitespace } from '../../src/utils/validation';

describe('validation', () => {
  describe('isNullOrWhitespace', () => {
    it('returns true on null input', () => {
      expect(isNullOrWhitespace(null)).toBe(true);
    });

    it('returns true on undefined', () => {
      expect(isNullOrWhitespace(undefined)).toBe(true);
    });

    it('returns true on whitespace', () => {
      expect(isNullOrWhitespace(' ')).toBe(true);
    });

    it('returns true on empty string', () => {
      expect(isNullOrWhitespace('')).toBe(true);
    });

    it('returns false on a valid string', () => {
      expect(isNullOrWhitespace('abc')).toBe(false);
    });
  });
});
