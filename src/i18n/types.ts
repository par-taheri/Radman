export interface I18nDictionary {
  title: string;
  description: string;
  scanCaption: string;
  copyAddress: string;
  copied: string;
  amountLabel: string;
  closeAria: string;
  dialogAria: string;
  qrAria: string;
  tabAria: string;
}

export type I18nKey = keyof I18nDictionary;
