import { parseDecimalToBigInt, formatDecimalAmount } from './unit';

export function buildEthUri(address: string, amount?: number | string): string {
  const base = `ethereum:${address}@1`;
  if (amount === undefined || amount === null || amount === '') {
    return base;
  }
  const wei = parseDecimalToBigInt(amount, 18).toString();
  return `${base}?value=${wei}`;
}

export function buildBscUri(address: string, amount?: number | string): string {
  const base = `ethereum:${address}@56`;
  if (amount === undefined || amount === null || amount === '') {
    return base;
  }
  const wei = parseDecimalToBigInt(amount, 18).toString();
  return `${base}?value=${wei}`;
}

export function buildBtcUri(address: string, amount?: number | string): string {
  const base = `bitcoin:${address}`;
  if (amount === undefined || amount === null || amount === '') {
    return base;
  }
  const btc = formatDecimalAmount(amount, 8);
  return `${base}?amount=${btc}`;
}

export function buildSolUri(address: string, amount?: number | string): string {
  const base = `solana:${address}`;
  if (amount === undefined || amount === null || amount === '') {
    return base;
  }
  const sol = formatDecimalAmount(amount, 9);
  return `${base}?amount=${sol}`;
}

export function buildTonUri(address: string, amount?: number | string): string {
  const base = `ton://transfer/${address}`;
  if (amount === undefined || amount === null || amount === '') {
    return base;
  }
  const nanoton = parseDecimalToBigInt(amount, 9).toString();
  return `${base}?amount=${nanoton}`;
}
