/**
 * i18n Utility Functions
 * Helper functions for internationalization
 */

import { Locale, defaultLocale, isRTL } from './config';
import { getTranslation } from './messages';

/**
 * Get locale from URL path
 */
export const getLocaleFromPath = (pathname: string): Locale => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && ['en', 'ar', 'hi', 'ml'].includes(firstSegment)) {
    return firstSegment as Locale;
  }
  
  return defaultLocale;
};

/**
 * Remove locale from pathname
 */
export const removeLocaleFromPath = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && ['en', 'ar', 'hi', 'ml'].includes(firstSegment)) {
    return '/' + segments.slice(1).join('/') || '/';
  }
  
  return pathname;
};

/**
 * Add locale to pathname
 */
export const addLocaleToPath = (pathname: string, locale: Locale): string => {
  const cleanPath = removeLocaleFromPath(pathname);
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
};

/**
 * Get direction for locale (LTR or RTL)
 */
export const getDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return isRTL(locale) ? 'rtl' : 'ltr';
};

/**
 * Format translation with parameters
 */
export const formatTranslation = (
  locale: Locale,
  key: string,
  params?: Record<string, string | number>
): string => {
  return getTranslation(locale, key, params as Record<string, string>);
};

/**
 * Shortcut for translation
 */
export const t = (locale: Locale, key: string, params?: Record<string, string | number>): string => {
  return formatTranslation(locale, key, params);
};

