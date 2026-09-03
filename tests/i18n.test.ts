import { describe, it, expect } from 'vitest';
import { en } from '../src/i18n/en';
import { fa } from '../src/i18n/fa';
import { formatString, getTranslation } from '../src/i18n';
import { I18nKey } from '../src/i18n/types';

describe('i18n completeness and formatting', () => {
  const enKeys = Object.keys(en) as I18nKey[];
  const faKeys = Object.keys(fa) as I18nKey[];

  it('has identical key sets in English and Persian dictionaries', () => {
    expect(enKeys.sort()).toEqual(faKeys.sort());
  });

  it('has non-empty translations for all keys in English and Persian', () => {
    enKeys.forEach((key) => {
      expect(en[key], `en.${key} is empty`).toBeTruthy();
      expect(fa[key], `fa.${key} is empty`).toBeTruthy();
    });
  });

  it('has matching interpolation placeholders in English and Persian', () => {
    const extractPlaceholders = (str: string) => {
      const matches = str.match(/\{(\w+)\}/g) || [];
      return matches.sort();
    };

    enKeys.forEach((key) => {
      const enTokens = extractPlaceholders(en[key]);
      const faTokens = extractPlaceholders(fa[key]);
      expect(enTokens, `Placeholder mismatch on key: ${key}`).toEqual(faTokens);
    });
  });

  it('replaces tokens using formatString correctly', () => {
    const res = formatString('Copy {symbol} Address', { symbol: 'BTC' });
    expect(res).toBe('Copy BTC Address');

    const multi = formatString('{name} {symbol}', { name: 'Ethereum', symbol: 'ETH' });
    expect(multi).toBe('Ethereum ETH');
  });

  it('getTranslation returns en by default or fa when requested', () => {
    expect(getTranslation('en')).toBe(en);
    expect(getTranslation('fa')).toBe(fa);
    expect(getTranslation(undefined as any)).toBe(en);
  });
});
