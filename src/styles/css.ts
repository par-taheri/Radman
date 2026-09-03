import { Theme } from '../core/types';

export const MODAL_STYLES = `.dm-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:999999;padding:16px;box-sizing:border-box;opacity:0;transition:opacity 0.2s cubic-bezier(0.16,1,0.3,1)}.dm-overlay.dm-visible{opacity:1}.dm-overlay *,.dm-overlay *::before,.dm-overlay *::after{box-sizing:border-box}.dm-modal{background:var(--dm-bg,#0d1117);color:var(--dm-text,#f0f6fc);border:1px solid var(--dm-border,#212836);border-radius:var(--dm-radius,22px);box-shadow:0 25px 50px -12px rgba(0,0,0,0.6),0 0 0 1px var(--dm-border,#212836);width:100%;max-width:440px;padding:24px;position:relative;transform:scale(0.95) translateY(8px);transition:transform 0.2s cubic-bezier(0.16,1,0.3,1);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Vazirmatn",sans-serif;line-height:1.5}.dm-overlay.dm-visible .dm-modal{transform:scale(1) translateY(0)}.dm-rtl{direction:rtl;text-align:right}.dm-header{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:16px}.dm-title{margin:0;font-size:1.125rem;font-weight:700;color:var(--dm-text,#f0f6fc)}.dm-description{margin:4px 0 0;font-size:0.8125rem;color:var(--dm-text-muted,#8b949e)}.dm-close-btn{background:var(--dm-close-bg,#161c24);border:1px solid var(--dm-close-border,#212836);cursor:pointer;padding:6px;color:var(--dm-close-color,#8b949e);border-radius:10px;display:flex;align-items:center;justify-content:center;transition:all 0.15s ease;flex-shrink:0}.dm-close-btn:hover{background:var(--dm-close-hover-bg,#1f2937);color:var(--dm-text,#f0f6fc)}.dm-close-btn svg{width:18px;height:18px}.dm-tabs{display:flex;background:var(--dm-tabs-bg,#11161d);border:1px solid var(--dm-tabs-border,#1e2633);border-radius:14px;padding:4px;gap:4px;margin-bottom:20px;overflow-x:auto;scrollbar-width:none}.dm-tabs::-webkit-scrollbar{display:none}.dm-tab{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;padding:8px 8px;background:transparent;border:none;border-radius:10px;cursor:pointer;font-size:0.8125rem;font-weight:600;color:var(--dm-text-muted,#8b949e);transition:all 0.15s ease;white-space:nowrap}.dm-tab:hover{color:var(--dm-text,#f0f6fc)}.dm-tab.dm-active{background:var(--dm-tab-active-bg,#f59e0b);color:var(--dm-tab-active-color,#000000);box-shadow:0 2px 6px rgba(0,0,0,0.15);font-weight:700}.dm-tab-icon{width:18px;height:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.dm-tab-icon svg{width:100%;height:100%}.dm-content{display:flex;flex-direction:column;align-items:center;text-align:center}.dm-qr-wrapper{background:#fff;padding:14px;border-radius:16px;border:1px solid var(--dm-border,#212836);box-shadow:0 4px 12px -2px rgba(0,0,0,0.25);display:inline-flex;justify-content:center;align-items:center}.dm-qr-svg{width:180px;height:180px;display:block}.dm-caption{font-size:0.75rem;color:var(--dm-text-muted,#8b949e);margin-top:10px;margin-bottom:0}.dm-amounts{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:14px;width:100%}.dm-amount-chip{background:var(--dm-chip-bg,#11161d);border:1px solid var(--dm-border,#212836);color:var(--dm-text,#f0f6fc);padding:5px 12px;border-radius:20px;font-size:0.75rem;font-weight:600;cursor:pointer;transition:all 0.15s ease}.dm-amount-chip:hover{border-color:var(--dm-primary,#f59e0b);color:var(--dm-primary,#f59e0b)}.dm-amount-chip.dm-active{background:var(--dm-primary,#f59e0b);color:var(--dm-primary-text,#000000);border-color:var(--dm-primary,#f59e0b)}.dm-address-box{width:100%;background:var(--dm-input-bg,#090d12);border:1px solid var(--dm-input-border,#1e2633);border-radius:10px;padding:10px 14px;margin-top:16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:border-color 0.15s}.dm-address-box:hover{border-color:var(--dm-primary,#f59e0b)}.dm-address-text{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:0.8125rem;color:var(--dm-address-color,#fbbf24);font-weight:600;direction:ltr;text-align:left;user-select:all;letter-spacing:0.5px}.dm-address-hint{font-size:0.6875rem;color:var(--dm-text-muted,#8b949e);margin-left:8px;display:flex;align-items:center}.dm-rtl .dm-address-hint{margin-left:0;margin-right:8px}.dm-copy-btn{width:100%;background:var(--dm-primary,#f59e0b);color:var(--dm-primary-text,#000000);border:none;border-radius:10px;padding:12px 16px;font-size:0.875rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:12px;transition:all 0.15s ease}.dm-copy-btn:hover{background:var(--dm-primary-hover,#d97706)}.dm-copy-btn.dm-copied{background:#10b981;color:#fff}.dm-copy-btn svg{width:18px;height:18px}.dm-close-btn:focus-visible,.dm-tab:focus-visible,.dm-amount-chip:focus-visible,.dm-address-box:focus-visible,.dm-copy-btn:focus-visible{outline:2px solid var(--dm-primary,#f59e0b);outline-offset:2px}`;

/**
 * Computes CSS custom property values for the specified theme.
 */
export function getThemeStyles(theme: Theme = 'dark'): Record<string, string> {
  const vars: Record<string, string> = {};

  if (theme === 'light') {
    vars['--dm-bg'] = '#ffffff';
    vars['--dm-text'] = '#111827';
    vars['--dm-text-muted'] = '#6b7280';
    vars['--dm-border'] = '#e5e7eb';
    vars['--dm-tabs-bg'] = '#f3f4f6';
    vars['--dm-tabs-border'] = 'transparent';
    vars['--dm-tab-active-bg'] = '#ffffff';
    vars['--dm-tab-active-color'] = '#111827';
    vars['--dm-input-bg'] = '#f9fafb';
    vars['--dm-input-border'] = '#e5e7eb';
    vars['--dm-chip-bg'] = '#f9fafb';
    vars['--dm-primary'] = '#2563eb';
    vars['--dm-primary-hover'] = '#1d4ed8';
    vars['--dm-primary-text'] = '#ffffff';
    vars['--dm-address-color'] = '#111827';
    vars['--dm-close-bg'] = 'transparent';
    vars['--dm-close-border'] = 'transparent';
    vars['--dm-close-color'] = '#6b7280';
    vars['--dm-close-hover-bg'] = '#f3f4f6';
    vars['--dm-radius'] = '16px';
  } else if (typeof theme === 'object' && theme !== null) {
    vars['--dm-bg'] = '#0d1117';
    vars['--dm-text'] = '#f0f6fc';
    vars['--dm-text-muted'] = '#8b949e';
    vars['--dm-border'] = '#212836';
    vars['--dm-tabs-bg'] = '#11161d';
    vars['--dm-tabs-border'] = '#1e2633';
    vars['--dm-tab-active-bg'] = theme.primaryColor;
    vars['--dm-tab-active-color'] = '#000000';
    vars['--dm-input-bg'] = '#090d12';
    vars['--dm-input-border'] = '#1e2633';
    vars['--dm-chip-bg'] = '#11161d';
    vars['--dm-primary'] = theme.primaryColor;
    vars['--dm-primary-hover'] = theme.primaryColor;
    vars['--dm-primary-text'] = '#000000';
    vars['--dm-address-color'] = theme.primaryColor;
    vars['--dm-close-bg'] = '#161c24';
    vars['--dm-close-border'] = '#212836';
    vars['--dm-close-color'] = '#8b949e';
    vars['--dm-close-hover-bg'] = '#1f2937';
    vars['--dm-radius'] = theme.borderRadius !== undefined ? `${theme.borderRadius}px` : '22px';
  } else {
    // Default: 'dark'
    vars['--dm-bg'] = '#0d1117';
    vars['--dm-text'] = '#f0f6fc';
    vars['--dm-text-muted'] = '#8b949e';
    vars['--dm-border'] = '#212836';
    vars['--dm-tabs-bg'] = '#11161d';
    vars['--dm-tabs-border'] = '#1e2633';
    vars['--dm-tab-active-bg'] = '#f59e0b';
    vars['--dm-tab-active-color'] = '#000000';
    vars['--dm-input-bg'] = '#090d12';
    vars['--dm-input-border'] = '#1e2633';
    vars['--dm-chip-bg'] = '#11161d';
    vars['--dm-primary'] = '#f59e0b';
    vars['--dm-primary-hover'] = '#d97706';
    vars['--dm-primary-text'] = '#000000';
    vars['--dm-address-color'] = '#fbbf24';
    vars['--dm-close-bg'] = '#161c24';
    vars['--dm-close-border'] = '#212836';
    vars['--dm-close-color'] = '#8b949e';
    vars['--dm-close-hover-bg'] = '#1f2937';
    vars['--dm-radius'] = '22px';
  }

  return vars;
}

export function injectStyles(): void {
  if (typeof document === 'undefined') return;
  const styleId = 'dm-styles';
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = MODAL_STYLES;
    document.head.appendChild(styleEl);
  }
}
