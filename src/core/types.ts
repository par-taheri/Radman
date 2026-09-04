export type Coin = 'ETH' | 'BSC' | 'SOL' | 'BTC' | 'TON';

export interface CustomTheme {
  primaryColor: string;
  borderRadius?: number;
}

export type Theme = 'light' | 'dark' | CustomTheme;

export type Locale = 'en' | 'fa';

export interface DonationConfig {
  /** Mapping of supported coin symbols to recipient wallet addresses. Only specified coins appear in modal tabs. */
  recipients: Partial<Record<Coin, string>>;
  /** Custom display order for coin tabs. Defaults to ETH, BSC, SOL, BTC, TON. */
  coins?: Coin[];
  /** Optional suggested donation amounts per coin, encoded in payment URIs where supported. */
  presetAmounts?: Partial<Record<Coin, number[]>>;
  /** Optional preselected donation amount per coin. */
  defaultAmount?: Partial<Record<Coin, number>>;
  /** Custom modal header title. Defaults to localized string. */
  title?: string;
  /** Custom modal header description. Defaults to localized string. */
  description?: string;
  /** Optional recipient logo or avatar: image URL, base64 data URI, or raw inline SVG string. */
  logo?: string;
  /** Optional personal message, note, or announcement from the recipient. */
  message?: string;
  /** Visual theme: 'dark' (default), 'light', or custom theme object. */
  theme?: Theme;
  /** User interface locale: 'en' (default) or 'fa' (with RTL support). */
  locale?: Locale;
  /** When true, automatically attaches open triggers to all elements matching [radman-donate]. */
  autoAttach?: boolean;
  /** Lifecycle callback invoked when the modal opens. */
  onOpen?: () => void;
  /** Lifecycle callback invoked when the modal closes. */
  onClose?: () => void;
  /** Error callback invoked on validation or runtime errors. */
  onError?: (error: Error) => void;
}

export interface DonationModalInstance {
  open(): void;
  close(): void;
  destroy(): void;
  attach(selectorOrElement: string | HTMLElement): void;
}

export interface CoinMeta {
  name: string;
  symbol: Coin;
  decimals: number;
  amountUnit: string;
  supportsAmount: boolean;
  explorerUrl: (address: string) => string;
  buildUri: (address: string, amount?: number | string) => string;
  validateAddress: (address: string) => boolean;
  icon: string;
}
