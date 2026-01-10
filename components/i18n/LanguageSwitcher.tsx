'use client';

/**
 * Language Switcher Component
 * Ideal UX: Dropdown with flag icons for easy language selection
 * Stores preference in cookie for persistence
 */

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
  /** Display style: 'dropdown' | 'buttons' | 'select' */
  variant?: 'dropdown' | 'buttons' | 'select';
}

export const LanguageSwitcher = ({
  currentLocale,
  className = '',
  variant = 'dropdown',
}: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const switchLanguage = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Save preference to cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`; // 1 year

    // Get current path without locale prefix
    const pathWithoutLocale = pathname.replace(/^\/[^/]+/, '') || '/';
    
    // Navigate to new locale path
    router.push(`/${locale}${pathWithoutLocale}`);
    
    // Refresh to apply new locale
    router.refresh();
    setIsOpen(false);
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              locale === currentLocale
                ? 'bg-primary text-black font-semibold'
                : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
            aria-label={`Switch to ${localeNames[locale]}`}
          >
            <span className="text-xl">{localeFlags[locale]}</span>
            <span className="hidden sm:inline">{localeNames[locale]}</span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'select') {
    return (
      <select
        value={currentLocale}
        onChange={(e) => switchLanguage(e.target.value as Locale)}
        className={`px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 ${className}`}
        aria-label="Select language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeFlags[locale]} {localeNames[locale]}
          </option>
        ))}
      </select>
    );
  }

  // Default: Professional Sleek Dropdown (No Flags/Country Codes)
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/85 hover:to-orange-600/85 hover:shadow-md hover:shadow-orange-500/25 border border-transparent hover:border-orange-400/30 transition-all duration-300 hover:scale-105 active:scale-100"
        style={{ 
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.6)',
        }}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="uppercase font-bold tracking-wide min-w-[32px] text-center">
          {currentLocale.toUpperCase()}
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full mt-2 right-0 w-44 rounded-xl shadow-2xl z-50 overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        >
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 ${
                locale === currentLocale
                  ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-gray-900 font-semibold'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/60'
              }`}
              aria-label={`Switch to ${localeNames[locale]}`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="uppercase font-bold text-xs tracking-wider text-gray-500 flex-shrink-0 w-8">
                  {locale.toUpperCase()}
                </span>
                <span className="text-sm font-medium truncate flex-1" title={localeNames[locale]}>
                  {localeNames[locale]}
                </span>
              </div>
              {locale === currentLocale && (
                <svg
                  className="w-4 h-4 text-orange-600 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

