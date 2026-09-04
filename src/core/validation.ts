import { Coin, DonationConfig } from './types';

const EVM_REGEX = /^0x[0-9a-fA-F]{40}$/;
const BTC_BECH32_REGEX = /^(bc1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{39,87}|BC1[QPZRY9X8GF2TVDW0S3JN54KHCE6MUA7L]{39,87})$/;
const BTC_BASE58_REGEX = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
const SOL_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const TON_USER_FRIENDLY_REGEX = /^[EU]Q[a-zA-Z0-9_\-\+\/]{46}(={0,2})?$/;
const TON_RAW_REGEX = /^(-1|0):[0-9a-fA-F]{64}$/;

/**
 * Validates whether a given string is a valid EVM (Ethereum / BSC) hexadecimal address.
 */
export function validateEvmAddress(address: string): boolean {
  if (typeof address !== 'string') return false;
  const trimmed = address.trim();
  if (!EVM_REGEX.test(trimmed)) return false;

  const hex = trimmed.slice(2);
  const hasUpper = /[A-F]/.test(hex);
  const hasLower = /[a-f]/.test(hex);
  if (hasUpper && hasLower) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(`[Radman] Mixed-case EVM address "${trimmed}" detected. Verify checksum before deployment.`);
    }
  }

  return true;
}

/**
 * Validates whether a given string is a valid Bitcoin address (Bech32 or Base58).
 */
export function validateBtcAddress(address: string): boolean {
  if (typeof address !== 'string') return false;
  const trimmed = address.trim();
  return BTC_BECH32_REGEX.test(trimmed) || BTC_BASE58_REGEX.test(trimmed);
}

/**
 * Validates whether a given string is a valid Solana public key (Base58).
 */
export function validateSolAddress(address: string): boolean {
  if (typeof address !== 'string') return false;
  const trimmed = address.trim();
  return SOL_REGEX.test(trimmed);
}

/**
 * Validates whether a given string is a valid TON address (User-friendly or Raw format).
 */
export function validateTonAddress(address: string): boolean {
  if (typeof address !== 'string') return false;
  const trimmed = address.trim();
  return TON_USER_FRIENDLY_REGEX.test(trimmed) || TON_RAW_REGEX.test(trimmed);
}

export const ADDRESS_VALIDATORS: Record<Coin, (address: string) => boolean> = {
  ETH: validateEvmAddress,
  BSC: validateEvmAddress,
  BTC: validateBtcAddress,
  SOL: validateSolAddress,
  TON: validateTonAddress,
};

export const SUPPORTED_COINS: Coin[] = ['ETH', 'BSC', 'SOL', 'BTC', 'TON'];

/**
 * Validates the donation configuration object during initialization.
 * Throws descriptive errors if any mandatory field is missing or malformed.
 */
export function validateConfig(config: DonationConfig): void {
  if (!config || typeof config !== 'object') {
    throw new Error('[Radman] Configuration must be an object.');
  }

  if (!config.recipients || typeof config.recipients !== 'object') {
    throw new Error('[Radman] "recipients" is required and must be an object.');
  }

  const entries = Object.entries(config.recipients) as [Coin, string][];
  const validEntries = entries.filter(([coin, addr]) => SUPPORTED_COINS.includes(coin) && typeof addr === 'string' && addr.trim().length > 0);

  if (validEntries.length === 0) {
    throw new Error('[Radman] At least one valid recipient address must be provided.');
  }

  for (const [coin, address] of validEntries) {
    const validator = ADDRESS_VALIDATORS[coin];
    if (!validator(address)) {
      throw new Error(`[Radman] Invalid ${coin} recipient address format: "${address}".`);
    }
  }

  if (config.presetAmounts) {
    for (const [coin, amounts] of Object.entries(config.presetAmounts)) {
      if (amounts && !Array.isArray(amounts)) {
        throw new Error(`[Radman] Preset amounts for ${coin} must be an array of numbers.`);
      }
      if (amounts && amounts.some(a => typeof a !== 'number' || !Number.isFinite(a) || a <= 0)) {
        throw new Error(`[Radman] Preset amounts for ${coin} must contain only positive finite numbers.`);
      }
    }
  }

  if (config.defaultAmount) {
    for (const [coin, amount] of Object.entries(config.defaultAmount)) {
      if (amount !== undefined && (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0)) {
        throw new Error(`[Radman] Default amount for ${coin} must be a positive finite number.`);
      }
    }
  }

  if (config.coins) {
    if (!Array.isArray(config.coins)) {
      throw new Error('[Radman] "coins" must be an array of Coin symbols.');
    }
    for (const coin of config.coins) {
      if (!SUPPORTED_COINS.includes(coin)) {
        throw new Error(`[Radman] Unsupported coin symbol in "coins": "${coin}". Supported: ${SUPPORTED_COINS.join(', ')}.`);
      }
    }
  }

  if (config.logo !== undefined && typeof config.logo !== 'string') {
    throw new Error('[Radman] "logo" must be a string.');
  }

  if (config.message !== undefined && typeof config.message !== 'string') {
    throw new Error('[Radman] "message" must be a string.');
  }
}
