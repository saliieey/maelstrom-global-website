'use client';

/**
 * Responsive Hook
 * Provides real-time responsive breakpoint and device information
 * Essential for pixel-perfect responsiveness across all devices
 */

import { useState, useEffect } from 'react';
import { breakpoints, getBreakpointRange, isMobile, isTablet, isDesktop, type BreakpointName } from '@/lib/responsive/breakpoints';

interface ResponsiveState {
  width: number;
  height: number;
  breakpoint: BreakpointName;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

/**
 * Main responsive hook
 * Returns current screen dimensions and breakpoint information
 */
export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 1920,
        height: 1080,
        breakpoint: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isPortrait: false,
        isLandscape: true,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
      breakpoint: getBreakpointRange(width),
      isMobile: isMobile(width),
      isTablet: isTablet(width),
      isDesktop: isDesktop(width),
      isPortrait: height > width,
      isLandscape: width > height,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setState({
        width,
        height,
        breakpoint: getBreakpointRange(width),
        isMobile: isMobile(width),
        isTablet: isTablet(width),
        isDesktop: isDesktop(width),
        isPortrait: height > width,
        isLandscape: width > height,
      });
    };

    // Debounce resize events for better performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateState, 150); // Debounce 150ms
    };

    // Initial call
    updateState();

    // Listen to resize
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Listen to orientation change
    window.addEventListener('orientationchange', updateState);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateState);
    };
  }, []);

  return state;
};

/**
 * Hook to check specific breakpoint
 */
export const useBreakpoint = (breakpoint: BreakpointName): boolean => {
  const { width } = useResponsive();
  const bp = breakpoints[breakpoint];
  return width >= bp.min && width <= bp.max;
};

/**
 * Hook to check if mobile
 */
export const useIsMobile = (): boolean => {
  const { isMobile } = useResponsive();
  return isMobile;
};

/**
 * Hook to check if tablet
 */
export const useIsTablet = (): boolean => {
  const { isTablet } = useResponsive();
  return isTablet;
};

/**
 * Hook to check if desktop
 */
export const useIsDesktop = (): boolean => {
  const { isDesktop } = useResponsive();
  return isDesktop;
};

/**
 * Hook to get current width
 */
export const useWidth = (): number => {
  const { width } = useResponsive();
  return width;
};

/**
 * Hook to check orientation
 */
export const useOrientation = (): 'portrait' | 'landscape' => {
  const { isPortrait } = useResponsive();
  return isPortrait ? 'portrait' : 'landscape';
};

