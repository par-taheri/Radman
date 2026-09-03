import { DonationConfig, DonationModalInstance, Coin, Theme, CustomTheme, Locale } from './core/types';
import { validateConfig, SUPPORTED_COINS } from './core/validation';
import { COIN_REGISTRY } from './core/registry';
import { createModal } from './ui/modal';

/**
 * Initializes and mounts the Radman crypto donation modal.
 *
 * @param config Configuration options including recipient addresses, amounts, and theme.
 * @returns An instance control object to open, close, or destroy the modal.
 */
export function initDonateModal(config: DonationConfig): DonationModalInstance {
  try {
    validateConfig(config);
    return createModal(config);
  } catch (error) {
    if (config && typeof config === 'object' && config.onError && error instanceof Error) {
      config.onError(error);
    }
    throw error;
  }
}

/**
 * Alias for `initDonateModal`.
 */
export const initRadman = initDonateModal;

// Browser global bindings
if (typeof window !== 'undefined') {
  const globalObj = Object.assign(initDonateModal, {
    initDonateModal,
    initRadman,
    SUPPORTED_COINS,
    COIN_REGISTRY,
  });
  (window as any).Radman = globalObj;
  (window as any).DonateModal = globalObj;
}

export type {
  Coin,
  DonationConfig,
  DonationModalInstance,
  Theme,
  CustomTheme,
  Locale,
};

export {
  SUPPORTED_COINS,
  COIN_REGISTRY,
};

export default initDonateModal;
