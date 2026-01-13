/**
 * i18n Export
 * Centralized export for all i18n utilities
 */

export * from './config';
export * from './navigation';
// Explicit exports to avoid 't' function name conflict
// Export utils.t as the main translation function, messages.t is for nested keys
export { messages, getTranslation, type Messages, type TranslationKey } from './messages';
export { getLocaleFromPath, removeLocaleFromPath, addLocaleToPath, t } from './utils';

