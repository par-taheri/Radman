import { renderSVG } from 'uqr';
import { Coin, DonationConfig, DonationModalInstance } from '../core/types';
import { COIN_REGISTRY, DEFAULT_COIN_ORDER } from '../core/registry';
import { getTranslation, formatString } from '../i18n';
import { UI_ICONS } from '../assets/icons';
import { getThemeStyles, injectStyles } from '../styles/css';
import { copyToClipboard, truncateAddress } from './dom';

/**
 * Creates and initializes a Radman crypto donation modal instance.
 */
export function createModal(config: DonationConfig): DonationModalInstance {
  injectStyles();

  const locale = config.locale || 'en';
  const dict = getTranslation(locale);
  const isRtl = locale === 'fa';

  // Determine available coins in requested or default order
  const coinOrder = config.coins && config.coins.length > 0 ? config.coins : DEFAULT_COIN_ORDER;
  const availableCoins: Coin[] = coinOrder.filter(
    (coin): coin is Coin => Boolean(config.recipients[coin] && config.recipients[coin]!.trim().length > 0)
  );

  let selectedCoin: Coin = availableCoins[0];
  let selectedAmounts: Partial<Record<Coin, number | undefined>> = {};
  if (config.defaultAmount) {
    selectedAmounts = { ...config.defaultAmount };
  }

  let isOpen = false;
  let isAddressExpanded = false;
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;
  let previousActiveElement: HTMLElement | null = null;

  // Track event listeners for teardown
  const attachedTriggers: Array<{ el: Element; handler: EventListener }> = [];

  // Modal overlay element
  const overlay = document.createElement('div');
  overlay.className = 'dm-overlay';
  overlay.style.display = 'none';

  // Dialog container element
  const modal = document.createElement('div');
  modal.className = `dm-modal${isRtl ? ' dm-rtl' : ''}`;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', dict.dialogAria);

  if (isRtl) {
    modal.setAttribute('dir', 'rtl');
  }

  // Apply theme CSS custom properties (default: 'dark')
  const themeVars = getThemeStyles(config.theme || 'dark');
  for (const [prop, val] of Object.entries(themeVars)) {
    modal.style.setProperty(prop, val);
  }

  // Header element
  const header = document.createElement('div');
  header.className = 'dm-header';

  const headerMain = document.createElement('div');
  headerMain.className = 'dm-header-main';

  if (config.logo && config.logo.trim().length > 0) {
    const logoEl = document.createElement('div');
    logoEl.className = 'dm-logo';
    const trimmedLogo = config.logo.trim();
    if (trimmedLogo.startsWith('<svg')) {
      logoEl.innerHTML = trimmedLogo;
    } else {
      const img = document.createElement('img');
      img.src = trimmedLogo;
      img.alt = config.title || dict.title;
      logoEl.appendChild(img);
    }
    headerMain.appendChild(logoEl);
  }

  const titleBlock = document.createElement('div');
  const titleEl = document.createElement('h2');
  titleEl.className = 'dm-title';
  titleEl.textContent = config.title || dict.title;

  const descEl = document.createElement('p');
  descEl.className = 'dm-description';
  descEl.textContent = config.description || dict.description;

  titleBlock.appendChild(titleEl);
  titleBlock.appendChild(descEl);
  headerMain.appendChild(titleBlock);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'dm-close-btn';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', dict.closeAria);
  closeBtn.innerHTML = UI_ICONS.close;

  header.appendChild(headerMain);
  header.appendChild(closeBtn);
  modal.appendChild(header);

  // Recipient message / note callout (rendered when configured)
  if (config.message && config.message.trim().length > 0) {
    const messageEl = document.createElement('div');
    messageEl.className = 'dm-message';
    messageEl.textContent = config.message.trim();
    modal.appendChild(messageEl);
  }

  // Tab navigation bar (rendered when multiple coins are configured)
  let tabsContainer: HTMLElement | null = null;
  const tabButtons: Map<Coin, HTMLButtonElement> = new Map();

  if (availableCoins.length > 1) {
    tabsContainer = document.createElement('div');
    tabsContainer.className = 'dm-tabs';
    tabsContainer.setAttribute('role', 'tablist');

    availableCoins.forEach((coin) => {
      const meta = COIN_REGISTRY[coin];
      const tabBtn = document.createElement('button');
      tabBtn.className = `dm-tab${coin === selectedCoin ? ' dm-active' : ''}`;
      tabBtn.type = 'button';
      tabBtn.setAttribute('role', 'tab');
      tabBtn.setAttribute('aria-selected', coin === selectedCoin ? 'true' : 'false');
      tabBtn.setAttribute('aria-label', formatString(dict.tabAria, { name: meta.name }));

      const iconSpan = document.createElement('span');
      iconSpan.className = 'dm-tab-icon';
      iconSpan.innerHTML = meta.icon;

      const labelSpan = document.createElement('span');
      labelSpan.textContent = meta.symbol;

      tabBtn.appendChild(iconSpan);
      tabBtn.appendChild(labelSpan);

      tabBtn.addEventListener('click', () => {
        if (selectedCoin !== coin) {
          selectCoin(coin);
        }
      });

      tabButtons.set(coin, tabBtn);
      tabsContainer.appendChild(tabBtn);
    });

    modal.appendChild(tabsContainer);
  }

  // Main modal content container
  const content = document.createElement('div');
  content.className = 'dm-content';

  // QR code SVG wrapper
  const qrWrapper = document.createElement('div');
  qrWrapper.className = 'dm-qr-wrapper';
  qrWrapper.setAttribute('role', 'img');

  const captionEl = document.createElement('p');
  captionEl.className = 'dm-caption';
  captionEl.textContent = dict.scanCaption;

  // Suggested amount selector chips
  const amountsContainer = document.createElement('div');
  amountsContainer.className = 'dm-amounts';

  // Wallet address container
  const addressBox = document.createElement('div');
  addressBox.className = 'dm-address-box';
  addressBox.setAttribute('role', 'button');
  addressBox.setAttribute('tabindex', '0');

  const addressText = document.createElement('span');
  addressText.className = 'dm-address-text';

  const addressHint = document.createElement('span');
  addressHint.className = 'dm-address-hint';
  addressHint.innerHTML = UI_ICONS.copy;

  addressBox.appendChild(addressText);
  addressBox.appendChild(addressHint);

  // Copy action button
  const copyBtn = document.createElement('button');
  copyBtn.className = 'dm-copy-btn';
  copyBtn.type = 'button';

  const copyIconSpan = document.createElement('span');
  copyIconSpan.innerHTML = UI_ICONS.copy;

  const copyLabelSpan = document.createElement('span');

  copyBtn.appendChild(copyIconSpan);
  copyBtn.appendChild(copyLabelSpan);

  content.appendChild(qrWrapper);
  content.appendChild(captionEl);
  content.appendChild(amountsContainer);
  content.appendChild(addressBox);
  content.appendChild(copyBtn);
  modal.appendChild(content);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Re-render QR code and details for active coin
  function renderView() {
    const meta = COIN_REGISTRY[selectedCoin];
    const address = config.recipients[selectedCoin]!;
    const activeAmount = selectedAmounts[selectedCoin];

    // Build URI
    const uri = meta.buildUri(address, activeAmount);

    // QR Code SVG
    qrWrapper.setAttribute('aria-label', formatString(dict.qrAria, { name: meta.name }));
    const svgString = renderSVG(uri, { ecc: 'H', border: 2 });
    qrWrapper.innerHTML = svgString;
    const svgEl = qrWrapper.querySelector('svg');
    if (svgEl) {
      svgEl.classList.add('dm-qr-svg');
    }

    // Amount chips
    amountsContainer.innerHTML = '';
    const coinPresets = config.presetAmounts?.[selectedCoin];
    if (coinPresets && coinPresets.length > 0) {
      amountsContainer.style.display = 'flex';
      coinPresets.forEach((amt) => {
        const chip = document.createElement('button');
        chip.className = `dm-amount-chip${amt === activeAmount ? ' dm-active' : ''}`;
        chip.type = 'button';
        chip.textContent = `${amt} ${meta.symbol}`;
        chip.addEventListener('click', () => {
          if (selectedAmounts[selectedCoin] === amt) {
            delete selectedAmounts[selectedCoin];
          } else {
            selectedAmounts[selectedCoin] = amt;
          }
          renderView();
        });
        amountsContainer.appendChild(chip);
      });
    } else {
      amountsContainer.style.display = 'none';
    }

    // Address text
    addressBox.title = address;
    addressText.textContent = isAddressExpanded ? address : truncateAddress(address, 8, 6);

    // Reset copy button feedback
    resetCopyButtonState();
  }

  function resetCopyButtonState() {
    if (copyTimeout) {
      clearTimeout(copyTimeout);
      copyTimeout = null;
    }
    copyBtn.classList.remove('dm-copied');
    copyIconSpan.innerHTML = UI_ICONS.copy;
    copyLabelSpan.textContent = formatString(dict.copyAddress, { symbol: selectedCoin });
  }

  function selectCoin(coin: Coin) {
    selectedCoin = coin;
    isAddressExpanded = false;

    // Update tab bar state
    tabButtons.forEach((btn, c) => {
      const isActive = c === coin;
      btn.classList.toggle('dm-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    renderView();
  }

  async function handleCopy() {
    const address = config.recipients[selectedCoin]!;
    const success = await copyToClipboard(address);

    if (success) {
      copyBtn.classList.add('dm-copied');
      copyIconSpan.innerHTML = UI_ICONS.check;
      copyLabelSpan.textContent = dict.copied;

      if (copyTimeout) clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        resetCopyButtonState();
      }, 2000);
    } else {
      const err = new Error('[Radman] Clipboard copy failed.');
      if (config.onError) {
        config.onError(err);
      } else if (typeof console !== 'undefined' && console.error) {
        console.error(err);
      }
    }
  }

  // Address box interactions
  addressBox.addEventListener('click', () => {
    isAddressExpanded = !isAddressExpanded;
    const address = config.recipients[selectedCoin]!;
    addressText.textContent = isAddressExpanded ? address : truncateAddress(address, 8, 6);
  });

  addressBox.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addressBox.click();
    }
  });

  copyBtn.addEventListener('click', () => {
    handleCopy();
  });

  // Modal dismissal handlers
  function handleClose() {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove('dm-visible');

    setTimeout(() => {
      if (!isOpen) {
        overlay.style.display = 'none';
        if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
          previousActiveElement.focus();
        }
        config.onClose?.();
      }
    }, 200);
  }

  function handleOpen() {
    if (isOpen) return;
    isOpen = true;
    previousActiveElement = document.activeElement as HTMLElement | null;

    renderView();
    overlay.style.display = 'flex';

    // Trigger reflow to initiate smooth transition
    void overlay.offsetWidth;
    overlay.classList.add('dm-visible');

    // Shift focus to active tab or close button for accessibility
    const focusTarget = modal.querySelector<HTMLElement>('.dm-tab.dm-active') || closeBtn;
    if (focusTarget) {
      focusTarget.focus();
    }

    config.onOpen?.();
  }

  closeBtn.addEventListener('click', handleClose);

  overlay.addEventListener('click', (e: MouseEvent) => {
    if (e.target === overlay) {
      handleClose();
    }
  });

  // Accessible keyboard navigation and modal focus trap
  function handleKeyDown(e: KeyboardEvent) {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
      return;
    }

    if (e.key === 'Tab') {
      const focusableEls = modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length === 0) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  // Element trigger binding
  function attach(selectorOrElement: string | HTMLElement) {
    const attachHandler = (el: Element) => {
      const listener: EventListener = (e: Event) => {
        e.preventDefault();
        handleOpen();
      };
      el.addEventListener('click', listener);
      attachedTriggers.push({ el, handler: listener });
    };

    if (typeof selectorOrElement === 'string') {
      const nodes = document.querySelectorAll(selectorOrElement);
      nodes.forEach(attachHandler);
    } else if (selectorOrElement && selectorOrElement.nodeType === 1) {
      attachHandler(selectorOrElement);
    }
  }

  // Auto attach if requested
  if (config.autoAttach) {
    attach('[radman-donate], [data-radman-donate], [data-donate]');
  }

  const instance: DonationModalInstance = {
    open: handleOpen,
    close: handleClose,
    destroy() {
      handleClose();
      if (copyTimeout) clearTimeout(copyTimeout);
      window.removeEventListener('keydown', handleKeyDown);

      // Remove trigger listeners
      attachedTriggers.forEach(({ el, handler }) => {
        el.removeEventListener('click', handler);
      });
      attachedTriggers.length = 0;

      // Remove DOM node
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    },
    attach,
  };

  return instance;
}
