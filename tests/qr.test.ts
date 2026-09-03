import { describe, it, expect } from 'vitest';
import { encode } from 'uqr';
import jsQR from 'jsqr';
import { COIN_REGISTRY, DEFAULT_COIN_ORDER } from '../src/core/registry';
import { Coin } from '../src/core/types';

function decodeQrData(uri: string): string | null {
  const qr = encode(uri, { ecc: 'H', border: 4 });
  const scale = 4;
  const size = qr.size * scale;
  const data = new Uint8ClampedArray(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const modX = Math.floor(x / scale);
      const modY = Math.floor(y / scale);
      const isDark = qr.data[modY][modX];
      const idx = (y * size + x) * 4;
      const color = isDark ? 0 : 255;
      data[idx] = color;
      data[idx + 1] = color;
      data[idx + 2] = color;
      data[idx + 3] = 255;
    }
  }

  const result = jsQR(data, size, size);
  return result ? result.data : null;
}

describe('QR code decoding tests for all 5 coins', () => {
  const testAddresses: Record<Coin, string> = {
    ETH: '0x71C849432858b763137D2DE347A6B1C945678AbC',
    BSC: '0x71C849432858b763137D2DE347A6B1C945678AbC',
    BTC: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    SOL: '7cvgVjHqX48fSg6PGB3X2j3VvW5bFfKKnQ5N4D4Q7R9S',
    TON: 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N',
  };

  const testAmounts: Record<Coin, number> = {
    ETH: 0.005,
    BSC: 0.01,
    BTC: 0.0005,
    SOL: 0.5,
    TON: 1.5,
  };

  DEFAULT_COIN_ORDER.forEach((coin) => {
    describe(`Coin: ${coin}`, () => {
      const addr = testAddresses[coin];
      const meta = COIN_REGISTRY[coin];

      it('decodes QR without amount to exact plain address URI', () => {
        const expectedUri = meta.buildUri(addr);
        const decoded = decodeQrData(expectedUri);
        expect(decoded).toBe(expectedUri);
      });

      it('decodes QR with amount to exact URI with unit conversion and amount parameter', () => {
        const amt = testAmounts[coin];
        const expectedUri = meta.buildUri(addr, amt);
        const decoded = decodeQrData(expectedUri);
        expect(decoded).toBe(expectedUri);
      });
    });
  });
});
