<div align="center">

# Radman

**Lightweight, 100% Client-Side Crypto Donation Modal Library for the Modern Web**

A zero-dependency (single sub-3KB micro-QR dependency), framework-agnostic JavaScript/TypeScript library to accept cryptocurrency contributions with zero external network requests, zero telemetry, and zero wallet connection risks.

---

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/badge/Bundle%20Size-7.5%20KB%20gzipped-success.svg)](#-bundle-size-report)
[![Zero Network](https://img.shields.io/badge/Network%20Requests-0%20(Pure%20Client--Side)-10b981.svg)](#-security--privacy-architecture)

</div>

---

## 🌐 Live Demo & Instant Access

- **Official Web App / Live Demo:** [https://radman.garothmana.ir](https://radman.garothmana.ir)

---

## 📖 Overview

**Radman** is designed for developers, content creators, and open-source maintainers who want to accept cryptocurrency contributions without compromising user privacy, bundle weight, or web performance.

Unlike traditional Web3 donation widgets that load heavyweight SDKs (Web3Modal, ethers.js, wagmi), track user analytics, or require donors to connect their browser extensions, **Radman is purely informational**:
- Donors select their network (Ethereum, BNB Chain, Bitcoin, Solana, or TON).
- An advisory QR code and recipient address are rendered instantly on-screen.
- The donor scans the QR code with their mobile wallet or copies the address and executes the transfer independently.

---

## ⚡ Key Features

### 🛡️ 1. Zero External Network Requests & Pure Client-Side Execution
- **No Icon CDNs:** All cryptocurrency logos and UI action icons are embedded directly as optimized SVG vectors.
- **No Third-Party QR Services:** QR codes are generated locally in browser memory via [`uqr`](https://github.com/unjs/uqr). No requests are ever made to Google Charts or external imaging APIs.
- **Zero Telemetry:** No analytics scripts, pixel trackers, cookies, or remote logging.

### 🌐 2. Multi-Chain Support (5 Major Networks)
- **Ethereum (ETH):** EIP-681 standard URI format with exact wei precision.
- **BNB Smart Chain (BSC):** EIP-681 standard URI format (`chainId=56`) with wei precision.
- **Bitcoin (BTC):** BIP-21 standard URI format (`bitcoin:<address>?amount=<btc>`).
- **Solana (SOL):** Solana Pay standard URI format (`solana:<address>?amount=<sol>`).
- **The Open Network (TON):** TON Transfer URI format (`ton://transfer/<address>?amount=<nanoton>`).

### 🎨 3. Modern Dark & Light Theming
- **Default Dark Palette:** Deep charcoal background (`#0d1117`), amber-gold accent tabs (`#f59e0b`), monospace address container (`#090d12`), and subtle border outlines (`#212836`).
- **Light Palette:** Clean white background with neutral slate borders and crisp accents.
- **Custom Theming:** Easily override primary colors and border radius via the `theme` configuration property.

### 🌍 4. Native Internationalization & Full RTL
- **English (`en`):** Default locale with left-to-right (LTR) layout.
- **Persian (`fa`):** Complete right-to-left (RTL) layout with localized typography and terminology.

### ♿ 5. Accessible Dialog Semantics
- Strict WAI-ARIA compliance: `role="dialog"`, `aria-modal="true"`, and descriptive `aria-label` attributes.
- Built-in keyboard focus trap (`Tab` / `Shift+Tab`) and escape key dismissal (`Escape`).
- Restores focus to the triggering element upon dismissal.

---

## 📦 Bundle Size Report

| Format | Distribution File | Raw Size | Gzipped Size | Target Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **ESM** | `dist/index.js` | 23.01 KB | **7.49 KB** | Modern bundlers (Vite, Webpack, Rollup, Next.js) |
| **CJS** | `dist/index.cjs` | 23.10 KB | **7.53 KB** | Node.js CommonJS server environments |
| **IIFE** | `dist/index.global.js` | 33.74 KB | **11.48 KB** | Standalone `<script>` tag (`uqr` fully bundled) |

---

## 🚀 Installation

### Via Package Manager

```bash
npm install radman
# or
yarn add radman
# or
pnpm add radman
```

### Via Direct Script Tag (IIFE)

```html
<script src="https://cdn.jsdelivr.net/npm/radman/dist/index.global.js"></script>
```

---

## 💡 Quick Start

### Modern Bundlers / Frameworks (React, Vue, Svelte, Vite, Next.js)

```ts
import { initDonateModal } from 'radman';

const donationModal = initDonateModal({
  recipients: {
    ETH: '0x71C849432858b763137D2DE347A6B1C945678AbC',
    BSC: '0x71C849432858b763137D2DE347A6B1C945678AbC',
    BTC: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    SOL: '7cvgVjHqX48fSg6PGB3X2j3VvW5bFfKKnQ5N4D4Q7R9S',
    TON: 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N',
  },
  presetAmounts: {
    ETH: [0.005, 0.01, 0.05],
    BTC: [0.0005, 0.001, 0.005],
    SOL: [0.1, 0.5, 1],
    TON: [0.5, 1, 5],
  },
  autoAttach: true, // Binds open trigger to all elements with [radman-donate]
});

// Programmatic control:
// donationModal.open();
// donationModal.close();
// donationModal.destroy();
```

### Vanilla HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Donate</title>
</head>
<body>
  <!-- Trigger button -->
  <button radman-donate>Donate Crypto</button>

  <script src="dist/index.global.js"></script>
  <script>
    Radman.initDonateModal({
      recipients: {
        ETH: '0x71C849432858b763137D2DE347A6B1C945678AbC',
        BTC: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
        SOL: '7cvgVjHqX48fSg6PGB3X2j3VvW5bFfKKnQ5N4D4Q7R9S',
      },
      autoAttach: true,
    });
  </script>
</body>
</html>
```

---

## 📋 Supported Networks Specification

| Symbol | Network | URI Standard Format | Amount Unit | Decimals |
| :--- | :--- | :--- | :--- | :--- |
| **ETH** | Ethereum | EIP-681: `ethereum:<address>@1?value=<wei>` | wei | 18 |
| **BSC** | BNB Smart Chain | EIP-681: `ethereum:<address>@56?value=<wei>` | wei | 18 |
| **BTC** | Bitcoin | BIP-21: `bitcoin:<address>?amount=<btc>` | BTC | 8 |
| **SOL** | Solana | Solana Pay: `solana:<address>?amount=<sol>` | SOL | 9 |
| **TON** | The Open Network | TON Transfer: `ton://transfer/<address>?amount=<nanoton>` | nanoton | 9 |

*Note:* When no contribution amount is specified or when a selected chip is deselected, the amount query parameter is omitted (`bitcoin:<address>`, `ethereum:<address>@1`), allowing donors to define their contribution directly in their wallet software.

---

## ⚙️ Configuration Reference

### `DonationConfig`

```ts
interface DonationConfig {
  recipients: Partial<Record<Coin, string>>;
  coins?: Coin[];
  presetAmounts?: Partial<Record<Coin, number[]>>;
  defaultAmount?: Partial<Record<Coin, number>>;
  title?: string;
  description?: string;
  logo?: string;
  message?: string;
  theme?: 'dark' | 'light' | { primaryColor: string; borderRadius?: number };
  locale?: 'en' | 'fa';
  autoAttach?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Error) => void;
}
```

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `recipients` | `Partial<Record<Coin, string>>` | **Required** | Recipient wallet addresses per network. Only configured networks appear in the tabs. |
| `coins` | `Coin[]` | `['ETH', 'BSC', 'SOL', 'BTC', 'TON']` | Custom tab display order. |
| `presetAmounts` | `Partial<Record<Coin, number[]>>` | `undefined` | Advisory contribution options displayed as interactive chips. |
| `defaultAmount` | `Partial<Record<Coin, number>>` | `undefined` | Preselected amount per coin. |
| `title` | `string` | Localized default | Modal header title. |
| `description` | `string` | Localized default | Short instructional subtitle below the title. |
| `logo` | `string` | `undefined` | Recipient avatar or logo: image URL, base64 data URI, or raw `<svg>` string. |
| `message` | `string` | `undefined` | Personal note, announcement, or thank you message from the recipient. |
| `theme` | `'dark' \| 'light' \| CustomTheme` | `'dark'` | Visual theme mode or custom theme object. |
| `locale` | `'en' \| 'fa'` | `'en'` | UI language. Set to `'fa'` for complete Persian RTL layout. |
| `autoAttach` | `boolean` | `false` | Automatically attaches `.open()` to all DOM elements with the `[radman-donate]` attribute. |
| `onOpen` | `() => void` | `undefined` | Callback invoked when the modal finishes opening. |
| `onClose` | `() => void` | `undefined` | Callback invoked when the modal is closed. |
| `onError` | `(err: Error) => void` | `undefined` | Callback invoked on validation or clipboard failure. |

### `DonationModalInstance`

```ts
interface DonationModalInstance {
  open(): void;
  close(): void;
  destroy(): void;
  attach(selectorOrElement: string | HTMLElement): void;
}
```

| Method | Description |
| :--- | :--- |
| `open()` | Opens the modal dialog and shifts focus to the active interactive element. |
| `close()` | Closes the modal dialog and restores previous focus. |
| `destroy()` | Dismounts the modal from the DOM and removes all associated event listeners. |
| `attach(target)` | Attaches the open handler to a CSS selector string or HTMLElement node. |

---

## 🔒 Security & Privacy Architecture

1. **Non-Custodial & Informational:** Radman never requests private keys, never asks to connect a browser wallet, and never signs transactions. This completely eliminates phishing attack vectors.
2. **Deterministic Offline Generation:** All QR matrices are generated mathematically in memory without external web requests.
3. **Strict Validation:** Addresses are checked at initialization to prevent deployment of broken or corrupted addresses.
4. **Scoped Styles:** CSS is injected under strict `.dm-*` selectors, preventing stylesheet conflicts with the host application.

---

## 🛠️ Local Development & Testing

```bash
# Clone repository
git clone https://github.com/par-taheri/radman.git
cd radman

# Install dependencies
npm install

# Run automated tests (Vitest)
npm test

# Build distribution bundles (ESM, CJS, IIFE, TypeScript DTS)
npm run build

# Run local sample showcase
npm run sample
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
