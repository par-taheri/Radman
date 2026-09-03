import { describe, it, expect } from 'vitest';
import { parseDecimalToBigInt, numberToDecimalString, formatDecimalAmount } from '../src/core/unit';

describe('unit conversions and decimal formatting', () => {
  describe('numberToDecimalString', () => {
    it('converts integers and standard decimals', () => {
      expect(numberToDecimalString(1)).toBe('1');
      expect(numberToDecimalString(0.5)).toBe('0.5');
      expect(numberToDecimalString('0.005')).toBe('0.005');
      expect(numberToDecimalString('123.456')).toBe('123.456');
    });

    it('handles scientific notation with negative exponents', () => {
      expect(numberToDecimalString(1e-4)).toBe('0.0001');
      expect(numberToDecimalString('1e-7')).toBe('0.0000001');
      expect(numberToDecimalString(5e-8)).toBe('0.00000005');
      expect(numberToDecimalString(1.25e-3)).toBe('0.00125');
    });

    it('handles scientific notation with positive exponents', () => {
      expect(numberToDecimalString(1e4)).toBe('10000');
      expect(numberToDecimalString(1.5e3)).toBe('1500');
      expect(numberToDecimalString(1.2345e2)).toBe('123.45');
    });

    it('handles negative numbers', () => {
      expect(numberToDecimalString(-0.05)).toBe('-0.05');
      expect(numberToDecimalString('-1e-3')).toBe('-0.001');
    });

    it('throws on invalid numeric input', () => {
      expect(() => numberToDecimalString('invalid')).toThrow();
      expect(() => numberToDecimalString(NaN)).toThrow();
      expect(() => numberToDecimalString(Infinity)).toThrow();
    });
  });

  describe('parseDecimalToBigInt', () => {
    it('converts ETH / BSC values to wei (18 decimals)', () => {
      expect(parseDecimalToBigInt('1', 18)).toBe(1000000000000000000n);
      expect(parseDecimalToBigInt(1, 18)).toBe(1000000000000000000n);
      expect(parseDecimalToBigInt('0.005', 18)).toBe(5000000000000000n);
      expect(parseDecimalToBigInt('0.000000000000000001', 18)).toBe(1n);
      expect(parseDecimalToBigInt('0', 18)).toBe(0n);
    });

    it('converts TON values to nanoton (9 decimals)', () => {
      expect(parseDecimalToBigInt('1', 9)).toBe(1000000000n);
      expect(parseDecimalToBigInt('0.5', 9)).toBe(500000000n);
      expect(parseDecimalToBigInt('0.000000001', 9)).toBe(1n);
    });

    it('converts BTC values to satoshis (8 decimals)', () => {
      expect(parseDecimalToBigInt('1', 8)).toBe(100000000n);
      expect(parseDecimalToBigInt('0.0001', 8)).toBe(10000n);
      expect(parseDecimalToBigInt('0.00000001', 8)).toBe(1n);
    });

    it('truncates beyond max supported decimals safely', () => {
      // 0.123456789 with 8 decimals truncates to 0.12345678
      expect(parseDecimalToBigInt('0.123456789', 8)).toBe(12345678n);
    });
  });

  describe('formatDecimalAmount', () => {
    it('formats BTC amounts for BIP-21 decimal string without float errors', () => {
      expect(formatDecimalAmount('0.005', 8)).toBe('0.005');
      expect(formatDecimalAmount(0.0005, 8)).toBe('0.0005');
      expect(formatDecimalAmount('1.00000000', 8)).toBe('1');
      expect(formatDecimalAmount(1.23, 8)).toBe('1.23');
      expect(formatDecimalAmount('0', 8)).toBe('0');
    });

    it('formats SOL amounts for Solana Pay', () => {
      expect(formatDecimalAmount('0.5', 9)).toBe('0.5');
      expect(formatDecimalAmount('1.25', 9)).toBe('1.25');
      expect(formatDecimalAmount(1e-4, 9)).toBe('0.0001');
    });
  });
});
