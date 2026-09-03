import { describe, it, expect, vi } from 'vitest';
import {
  validateEvmAddress,
  validateBtcAddress,
  validateSolAddress,
  validateTonAddress,
} from '../src/core/validation';

describe('Address validators', () => {
  describe('EVM (ETH, BSC)', () => {
    it('accepts valid EVM addresses (lowercase, uppercase, checksummed)', () => {
      expect(validateEvmAddress('0x71c849432858b763137d2de347a6b1c945678abc')).toBe(true);
      expect(validateEvmAddress('0x71C849432858B763137D2DE347A6B1C945678ABC')).toBe(true);
      expect(validateEvmAddress('0x0000000000000000000000000000000000000000')).toBe(true);
    });

    it('warns on mixed-case EVM addresses', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const result = validateEvmAddress('0x71C849432858b763137D2DE347A6B1C945678AbC');
      expect(result).toBe(true);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it('rejects invalid EVM addresses', () => {
      expect(validateEvmAddress('71c849432858b763137d2de347a6b1c945678abc')).toBe(false); // missing 0x
      expect(validateEvmAddress('0x123')).toBe(false); // too short
      expect(validateEvmAddress('0x71c849432858b763137d2de347a6b1c945678abc1234')).toBe(false); // too long
      expect(validateEvmAddress('0xZZZZ49432858b763137d2de347a6b1c945678abc')).toBe(false); // non-hex
      expect(validateEvmAddress('')).toBe(false);
    });
  });

  describe('BTC (Bech32 & Base58)', () => {
    it('accepts valid Bech32 SegWit and Taproot addresses', () => {
      expect(validateBtcAddress('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')).toBe(true);
      expect(validateBtcAddress('bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqzk5jj0')).toBe(true);
      expect(validateBtcAddress('BC1QW508D6QEJXTDG4Y5R3ZARV935SLLE3GD426T79')).toBe(true);
    });

    it('accepts valid Base58 P2PKH (starts with 1) and P2SH (starts with 3)', () => {
      expect(validateBtcAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')).toBe(true);
      expect(validateBtcAddress('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy')).toBe(true);
    });

    it('rejects invalid BTC addresses', () => {
      expect(validateBtcAddress('2A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')).toBe(false); // invalid prefix
      expect(validateBtcAddress('bc1q0invalid')).toBe(false); // too short
      expect(validateBtcAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf0')).toBe(false); // '0' not in base58
      expect(validateBtcAddress('')).toBe(false);
    });
  });

  describe('SOL (Base58, 32-44 chars)', () => {
    it('accepts valid Solana addresses', () => {
      expect(validateSolAddress('7cvgVjHqX48fSg6PGB3X2j3VvW5bFfKKnQ5N4D4Q7R9S')).toBe(true);
      expect(validateSolAddress('So11111111111111111111111111111111111111112')).toBe(true);
      expect(validateSolAddress('4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R')).toBe(true);
    });

    it('rejects invalid Solana addresses', () => {
      expect(validateSolAddress('short')).toBe(false); // < 32
      expect(validateSolAddress('4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R00000000000000000000')).toBe(false); // > 44
      expect(validateSolAddress('4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX0O')).toBe(false); // '0' and 'O' not in base58
      expect(validateSolAddress('')).toBe(false);
    });
  });

  describe('TON (User-friendly EQ/UQ and Raw)', () => {
    it('accepts valid user-friendly EQ and UQ addresses', () => {
      expect(validateTonAddress('EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N')).toBe(true);
      expect(validateTonAddress('UQBKgXCNLPexWhs2L79kiqaoxhttYr5C8Te3NkWlocEkfVq7')).toBe(true);
      expect(validateTonAddress('EQBvW8m54dddOpSovuaNYvi53YdAwYjUntzvYsp51vdnuXXm')).toBe(true);
    });

    it('accepts valid raw workchain addresses', () => {
      expect(validateTonAddress('0:427dfd54bb290947671cd728e5e896cb58f6236b56778f6737e1ba403a0f31a8')).toBe(true);
      expect(validateTonAddress('-1:427dfd54bb290947671cd728e5e896cb58f6236b56778f6737e1ba403a0f31a8')).toBe(true);
    });

    it('rejects invalid TON addresses', () => {
      expect(validateTonAddress('EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2')).toBe(false); // 47 chars
      expect(validateTonAddress('AQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N')).toBe(false); // starts with AQ
      expect(validateTonAddress('1:427dfd54bb290947671cd728e5e896cb58f6236b56778f6737e1ba403a0f31a8')).toBe(false); // invalid workchain 1
      expect(validateTonAddress('')).toBe(false);
    });
  });
});
