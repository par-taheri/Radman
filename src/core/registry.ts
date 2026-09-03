import { Coin, CoinMeta } from './types';
import { buildEthUri, buildBscUri, buildBtcUri, buildSolUri, buildTonUri } from './uri';
import { validateEvmAddress, validateBtcAddress, validateSolAddress, validateTonAddress } from './validation';
import { COIN_ICONS } from '../assets/icons';

export const DEFAULT_COIN_ORDER: Coin[] = ['ETH', 'BSC', 'SOL', 'BTC', 'TON'];

export const COIN_REGISTRY: Record<Coin, CoinMeta> = {
  ETH: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    amountUnit: 'wei',
    supportsAmount: true,
    explorerUrl: (addr: string) => `https://etherscan.io/address/${encodeURIComponent(addr)}`,
    buildUri: buildEthUri,
    validateAddress: validateEvmAddress,
    icon: COIN_ICONS.ETH,
  },
  BSC: {
    name: 'BNB Smart Chain',
    symbol: 'BSC',
    decimals: 18,
    amountUnit: 'wei',
    supportsAmount: true,
    explorerUrl: (addr: string) => `https://bscscan.com/address/${encodeURIComponent(addr)}`,
    buildUri: buildBscUri,
    validateAddress: validateEvmAddress,
    icon: COIN_ICONS.BSC,
  },
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    decimals: 8,
    amountUnit: 'BTC',
    supportsAmount: true,
    explorerUrl: (addr: string) => `https://mempool.space/address/${encodeURIComponent(addr)}`,
    buildUri: buildBtcUri,
    validateAddress: validateBtcAddress,
    icon: COIN_ICONS.BTC,
  },
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    amountUnit: 'SOL',
    supportsAmount: true,
    explorerUrl: (addr: string) => `https://solscan.io/account/${encodeURIComponent(addr)}`,
    buildUri: buildSolUri,
    validateAddress: validateSolAddress,
    icon: COIN_ICONS.SOL,
  },
  TON: {
    name: 'TON',
    symbol: 'TON',
    decimals: 9,
    amountUnit: 'nanoton',
    supportsAmount: true,
    explorerUrl: (addr: string) => `https://tonviewer.com/${encodeURIComponent(addr)}`,
    buildUri: buildTonUri,
    validateAddress: validateTonAddress,
    icon: COIN_ICONS.TON,
  },
};
