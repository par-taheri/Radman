import { I18nDictionary, I18nKey } from './types';
import { en } from './en';
import { fa } from './fa';
import { Locale } from '../core/types';

export const DICTIONARIES: Record<Locale, I18nDictionary> = {
  en,
  fa,
};

export function getTranslation(locale: Locale = 'en'): I18nDictionary {
  return DICTIONARIES[locale] || DICTIONARIES.en;
}

export function formatString(template: string, params: Record<string, string> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return params[key] !== undefined ? params[key] : `{${key}}`;
  });
}

export * from './types';
