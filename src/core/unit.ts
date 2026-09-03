/**
 * Converts a numeric or string value to a clean decimal string without scientific notation.
 */
export function numberToDecimalString(val: number | string): string {
  if (typeof val === 'string') {
    val = val.trim();
    if (!val) return '0';
    if (!/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(val)) {
      throw new Error(`Invalid numeric value: ${val}`);
    }
  } else {
    if (!Number.isFinite(val)) {
      throw new Error(`Invalid numeric value: ${val}`);
    }
    val = val.toString();
  }

  if (val.includes('e') || val.includes('E')) {
    const [mantissa, exponentStr] = val.toLowerCase().split('e');
    const exponent = parseInt(exponentStr, 10);
    const isNegative = mantissa.startsWith('-');
    const cleanMantissa = isNegative ? mantissa.slice(1) : mantissa;
    const [intPart, fracPart = ''] = cleanMantissa.split('.');

    if (exponent > 0) {
      let result: string;
      if (fracPart.length <= exponent) {
        result = intPart + fracPart.padEnd(exponent, '0');
      } else {
        result = intPart + fracPart.slice(0, exponent) + '.' + fracPart.slice(exponent);
      }
      return (isNegative ? '-' : '') + result;
    } else if (exponent < 0) {
      const absExp = Math.abs(exponent);
      if (absExp < intPart.length) {
        const cut = intPart.length - absExp;
        const result = intPart.slice(0, cut) + '.' + intPart.slice(cut) + fracPart;
        return (isNegative ? '-' : '') + result;
      } else {
        const leadingZeros = '0'.repeat(absExp - intPart.length);
        const result = `0.${leadingZeros}${intPart}${fracPart}`;
        return (isNegative ? '-' : '') + result;
      }
    }
  }

  return val;
}

/**
 * Converts a human-readable decimal amount (e.g. 0.005) into an integer BigInt of base units (e.g. wei).
 */
export function parseDecimalToBigInt(value: number | string, decimals: number): bigint {
  const str = numberToDecimalString(value);
  const isNegative = str.startsWith('-');
  const cleanStr = isNegative ? str.slice(1) : str;
  const parts = cleanStr.split('.');
  const whole = parts[0] || '0';
  let frac = parts[1] || '';

  if (frac.length > decimals) {
    frac = frac.slice(0, decimals);
  } else {
    frac = frac.padEnd(decimals, '0');
  }

  const combined = (whole === '0' && frac.length > 0) ? frac.replace(/^0+/, '') || '0' : whole + frac;
  const result = BigInt(combined);
  return isNegative ? -result : result;
}

/**
 * Formats a numeric or string value as a precise decimal string with up to maxDecimals,
 * without scientific notation or floating-point rounding errors.
 */
export function formatDecimalAmount(value: number | string, maxDecimals: number): string {
  const bi = parseDecimalToBigInt(value, maxDecimals);
  if (bi === 0n) return '0';

  const isNeg = bi < 0n;
  const absBi = isNeg ? -bi : bi;
  const str = absBi.toString().padStart(maxDecimals + 1, '0');
  const wholePart = str.slice(0, str.length - maxDecimals);
  let fracPart = str.slice(str.length - maxDecimals);

  // Strip trailing zeros
  fracPart = fracPart.replace(/0+$/, '');

  const formatted = fracPart.length > 0 ? `${wholePart}.${fracPart}` : wholePart;
  return isNeg ? `-${formatted}` : formatted;
}
