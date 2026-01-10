'use client';

/**
 * Responsive Provider
 * Initializes responsive utilities on mount (viewport height fix, etc.)
 */

import { useEffect, ReactNode } from 'react';
import { setViewportHeight } from '@/lib/responsive/responsive-utils';

interface ResponsiveProviderProps {
  children: ReactNode;
}

export const ResponsiveProvider = ({ children }: ResponsiveProviderProps) => {
  useEffect(() => {
    // Fix viewport height for mobile browsers
    setViewportHeight();

    // Prevent zoom on input focus (iOS Safari)
    const preventZoom = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute(
            'content',
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          );
          
          // Restore after blur
          target.addEventListener(
            'blur',
            () => {
              viewport.setAttribute(
                'content',
                'width=device-width, initial-scale=1.0'
              );
            },
            { once: true }
          );
        }
      }
    };

    document.addEventListener('focusin', preventZoom);

    return () => {
      document.removeEventListener('focusin', preventZoom);
    };
  }, []);

  return <>{children}</>;
};

