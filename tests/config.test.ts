import { describe, it, expect, vi } from 'vitest';
import { validateConfig } from '../src/core/validation';
import { initDonateModal } from '../src/index';
import { getThemeStyles } from '../src/styles/css';

describe('Config validation', () => {
  const validRecipients = {
    ETH: '0x71c849432858b763137d2de347a6b1c945678abc',
    BTC: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  };

  it('passes on valid minimum configuration', () => {
    expect(() => validateConfig({ recipients: validRecipients })).not.toThrow();
  });

  it('throws when config is not an object', () => {
    expect(() => validateConfig(null as any)).toThrow();
    expect(() => validateConfig(undefined as any)).toThrow();
  });

  it('throws when recipients is missing or empty', () => {
    expect(() => validateConfig({} as any)).toThrow(/recipients/);
    expect(() => validateConfig({ recipients: {} })).toThrow(/At least one valid recipient/);
  });

  it('throws when recipient address format is invalid', () => {
    expect(() =>
      validateConfig({
        recipients: {
          ETH: 'invalid-address',
        },
      })
    ).toThrow(/Invalid ETH recipient address format/);
  });

  it('throws when preset amounts are invalid', () => {
    expect(() =>
      validateConfig({
        recipients: validRecipients,
        presetAmounts: {
          ETH: [-1, 0.5],
        },
      })
    ).toThrow(/Preset amounts for ETH must contain only positive finite numbers/);

    expect(() =>
      validateConfig({
        recipients: validRecipients,
        presetAmounts: {
          ETH: 'not-an-array' as any,
        },
      })
    ).toThrow(/Preset amounts for ETH must be an array of numbers/);
  });

  it('throws when default amount is invalid', () => {
    expect(() =>
      validateConfig({
        recipients: validRecipients,
        defaultAmount: {
          ETH: -5,
        },
      })
    ).toThrow(/Default amount for ETH must be a positive finite number/);
  });

  it('throws when coins contains an unsupported coin', () => {
    expect(() =>
      validateConfig({
        recipients: validRecipients,
        coins: ['ETH', 'DOGE' as any],
      })
    ).toThrow(/Unsupported coin symbol in "coins": "DOGE"/);
  });

  it('calls onError callback when initDonateModal fails validation', () => {
    const onError = vi.fn();
    expect(() =>
      initDonateModal({
        recipients: {
          ETH: 'bad-address',
        },
        onError,
      })
    ).toThrow();
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('defaults theme to dark with dark css variables', () => {
    const defaultStyles = getThemeStyles();
    expect(defaultStyles['--dm-bg']).toBe('#0d1117');
    expect(defaultStyles['--dm-primary']).toBe('#f59e0b');

    const darkStyles = getThemeStyles('dark');
    expect(darkStyles['--dm-bg']).toBe('#0d1117');

    const lightStyles = getThemeStyles('light');
    expect(lightStyles['--dm-bg']).toBe('#ffffff');
  });

  it('validates logo and message fields', () => {
    expect(() =>
      validateConfig({
        recipients: validRecipients,
        logo: 'https://example.com/avatar.png',
        message: 'Thank you for supporting our project!',
      })
    ).not.toThrow();

    expect(() =>
      validateConfig({
        recipients: validRecipients,
        logo: 123 as any,
      })
    ).toThrow(/logo/);

    expect(() =>
      validateConfig({
        recipients: validRecipients,
        message: {} as any,
      })
    ).toThrow(/message/);
  });
});
