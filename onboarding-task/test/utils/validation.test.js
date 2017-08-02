import { isNullOrWhitespace } from '../../src/utils/validation.ts';

describe('validation', () => {
  describe('isNullOrWhitespace', () => {
    it('returns true on null input', () => {
      const actualValue = isNullOrWhitespace(null);

      expect(actualValue).toBeTruthy();
    });

    it('returns true on undefined', () => {
      const actualValue = isNullOrWhitespace(undefined);

      expect(actualValue).toBeTruthy();
    });

    it('returns true on whitespace', () => {
      const actualValue = isNullOrWhitespace(' ');

      expect(actualValue).toBeTruthy();
    });

    it('returns true on empty string', () => {
      const actualValue = isNullOrWhitespace('');

      expect(actualValue).toBeTruthy();
    });

    it('returns false on a valid string', () => {
      const actualValue = isNullOrWhitespace('abc');

      expect(actualValue).toBeFalsy();
    });
  });
});
