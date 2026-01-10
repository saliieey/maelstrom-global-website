/**
 * i18n Configuration
 * Multilingual support for Maelstrom Global Website
 * Languages: English, Arabic, Hindi, Malayalam
 */

export const locales = ['en', 'ar', 'hi', 'ml'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية', // Arabic
  hi: 'हिन्दी', // Hindi
  ml: 'മലയാളം', // Malayalam
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  ar: '🇸🇦',
  hi: '🇮🇳',
  ml: '🇮🇳',
};

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export const isRTL = (locale: Locale): boolean => {
  return rtlLocales.includes(locale);
};

// Locale detection from browser
export const detectLocale = (): Locale => {
  if (typeof window === 'undefined') return defaultLocale;

  const browserLang = navigator.language.split('-')[0];
  
  if (locales.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }
  
  return defaultLocale;
};

