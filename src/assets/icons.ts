import { Coin } from '../core/types';

export const COIN_ICONS: Record<Coin, string> = {
  ETH: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#627EEA"/><path d="M16 4.5l-6.8 11.3 6.8 4 6.8-4L16 4.5z" fill="#fff" fill-opacity=".6"/><path d="M16 4.5v15.3l6.8-4L16 4.5z" fill="#fff"/><path d="M16 21l-6.8-4 6.8 9.5 6.8-9.5-6.8 4z" fill="#fff" fill-opacity=".6"/><path d="M16 21v5.5l6.8-9.5-6.8 4z" fill="#fff"/><path d="M16 18.6l-6.8-4 6.8 2.8 6.8-2.8-6.8 4z" fill="#fff" fill-opacity=".2"/><path d="M16 18.6v2.8l6.8-4-6.8 1.2z" fill="#fff" fill-opacity=".6"/></svg>`,

  BSC: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#F3BA2F"/><path d="M16 6l2.9 2.9-2.9 2.9-2.9-2.9L16 6zm-7.1 7.1l2.9-2.9 2.9 2.9-2.9 2.9-2.9-2.9zm14.2 0l2.9-2.9 2.9 2.9-2.9 2.9-2.9-2.9zM16 13.1l2.9 2.9-2.9 2.9-2.9-2.9 2.9-2.9zm0 7.8l2.9 2.9-2.9 2.9-2.9-2.9 2.9-2.9z" fill="#fff"/></svg>`,

  BTC: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#F7931A"/><path d="M22.3 13.8c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.6 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.6-1.7-.4-.7 2.7c-.4-.1-.7-.2-1.1-.2l-2.3-.6-.5 1.8s1.2.3 1.2.3c.7.2.8.6.8.9l-.8 3.3c.1 0 .1 0 .2.1l-.2-.1-1.2 4.6c-.1.2-.3.6-.8.4 0 0-1.2-.3-1.2-.3l-.8 2 2.2.5c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.7 1.7.4.7-2.8c2.8.5 4.9.3 5.8-2.2.7-2-.1-3.2-1.5-3.9 1.1-.2 1.8-1 2-2.4zm-3.6 5.3c-.5 2-3.9.9-5 .6l.9-3.6c1.1.3 4.6.8 4.1 3zm.5-5.4c-.5 1.8-3.3.9-4.3.6l.8-3.3c1 .2 3.9.7 3.5 2.7z" fill="#fff"/></svg>`,

  SOL: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#14151a"/><path d="M8 21.2a.8.8 0 0 1 .6-.3h14.8a.8.8 0 0 1 .6 1.4l-2.7 2.7a.8.8 0 0 1-.6.3H5.9a.8.8 0 0 1-.6-1.4l2.7-2.7zm0-10.4a.8.8 0 0 1 .6-.3h14.8a.8.8 0 0 1 .6 1.4L21.3 14.6a.8.8 0 0 1-.6.3H5.9a.8.8 0 0 1-.6-1.4L8 10.8zm16 5.2a.8.8 0 0 1-.6.3H8.6a.8.8 0 0 1-.6-1.4l2.7-2.7a.8.8 0 0 1 .6-.3h14.8a.8.8 0 0 1 .6 1.4L24 16z" fill="url(#solG)"/><defs><linearGradient id="solG" x1="5.3" y1="6.5" x2="26.7" y2="25.5" gradientUnits="userSpaceOnUse"><stop stop-color="#00FFA3"/><stop offset="1" stop-color="#DC1FFF"/></linearGradient></defs></svg>`,

  TON: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#0088CC"/><path d="M22.8 9.5H9.2c-.7 0-1.1.7-.8 1.3l6.8 13.5c.3.7 1.3.7 1.6 0l6.8-13.5c.3-.6-.1-1.3-.8-1.3zm-6.8 11.7l-4.5-9.7h9l-4.5 9.7z" fill="#fff"/></svg>`,
};

export const UI_ICONS = {
  close: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5l10 10M15 5L5 15"/></svg>`,
  copy: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M3 13V5a2 2 0 0 1 2-2h8"/></svg>`,
  check: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4L16 6"/></svg>`,
};
