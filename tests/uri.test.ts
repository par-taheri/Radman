import { describe, it, expect } from 'vitest';
import { buildEthUri, buildBscUri, buildBtcUri, buildSolUri, buildTonUri } from '../src/core/uri';

describe('URI builders per coin specification', () => {
  const ETH_ADDR = '0x71C849432858b763137D2DE347A6B1C945678AbC';
  const BTC_ADDR = 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq';
  const SOL_ADDR = '7cvgVjHqX48fSg6PGB3X2j3VvW5bFfKKnQ5N4D4Q7R9S';
  const TON_ADDR = 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N';

  describe('ETH (EIP-681 @ chainId 1)', () => {
    it('builds URI without amount', () => {
      expect(buildEthUri(ETH_ADDR)).toBe(`ethereum:${ETH_ADDR}@1`);
      expect(buildEthUri(ETH_ADDR, '')).toBe(`ethereum:${ETH_ADDR}@1`);
    });

    it('builds URI with amount converted to wei (18 decimals)', () => {
      expect(buildEthUri(ETH_ADDR, 0.005)).toBe(`ethereum:${ETH_ADDR}@1?value=5000000000000000`);
      expect(buildEthUri(ETH_ADDR, '1')).toBe(`ethereum:${ETH_ADDR}@1?value=1000000000000000000`);
      expect(buildEthUri(ETH_ADDR, 0.001)).toBe(`ethereum:${ETH_ADDR}@1?value=1000000000000000`);
    });
  });

  describe('BSC (EIP-681 @ chainId 56)', () => {
    it('builds URI without amount', () => {
      expect(buildBscUri(ETH_ADDR)).toBe(`ethereum:${ETH_ADDR}@56`);
      expect(buildBscUri(ETH_ADDR, '')).toBe(`ethereum:${ETH_ADDR}@56`);
    });

    it('builds URI with amount converted to wei (18 decimals)', () => {
      expect(buildBscUri(ETH_ADDR, 0.01)).toBe(`ethereum:${ETH_ADDR}@56?value=10000000000000000`);
      expect(buildBscUri(ETH_ADDR, '0.5')).toBe(`ethereum:${ETH_ADDR}@56?value=500000000000000000`);
    });
  });

  describe('BTC (BIP-21)', () => {
    it('builds URI without amount', () => {
      expect(buildBtcUri(BTC_ADDR)).toBe(`bitcoin:${BTC_ADDR}`);
      expect(buildBtcUri(BTC_ADDR, '')).toBe(`bitcoin:${BTC_ADDR}`);
    });

    it('builds URI with decimal string BTC amount without floating-point errors', () => {
      expect(buildBtcUri(BTC_ADDR, 0.0001)).toBe(`bitcoin:${BTC_ADDR}?amount=0.0001`);
      expect(buildBtcUri(BTC_ADDR, '0.005')).toBe(`bitcoin:${BTC_ADDR}?amount=0.005`);
      expect(buildBtcUri(BTC_ADDR, 1)).toBe(`bitcoin:${BTC_ADDR}?amount=1`);
    });
  });

  describe('SOL (Solana Pay)', () => {
    it('builds URI without amount', () => {
      expect(buildSolUri(SOL_ADDR)).toBe(`solana:${SOL_ADDR}`);
      expect(buildSolUri(SOL_ADDR, '')).toBe(`solana:${SOL_ADDR}`);
    });

    it('builds URI with decimal string SOL amount', () => {
      expect(buildSolUri(SOL_ADDR, 0.5)).toBe(`solana:${SOL_ADDR}?amount=0.5`);
      expect(buildSolUri(SOL_ADDR, '1.25')).toBe(`solana:${SOL_ADDR}?amount=1.25`);
    });
  });

  describe('TON', () => {
    it('builds URI without amount', () => {
      expect(buildTonUri(TON_ADDR)).toBe(`ton://transfer/${TON_ADDR}`);
      expect(buildTonUri(TON_ADDR, '')).toBe(`ton://transfer/${TON_ADDR}`);
    });

    it('builds URI with amount converted to nanoton (9 decimals)', () => {
      expect(buildTonUri(TON_ADDR, 0.5)).toBe(`ton://transfer/${TON_ADDR}?amount=500000000`);
      expect(buildTonUri(TON_ADDR, 1)).toBe(`ton://transfer/${TON_ADDR}?amount=1000000000`);
      expect(buildTonUri(TON_ADDR, '0.1')).toBe(`ton://transfer/${TON_ADDR}?amount=100000000`);
    });
  });
});
