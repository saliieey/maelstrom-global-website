/**
 * Responsive Breakpoints System
 * Comprehensive breakpoint definitions for pixel-perfect responsiveness
 * Mobile-first approach - all breakpoints defined as min-width
 */

export const breakpoints = {
  // Mobile devices (default - no media query needed)
  mobile: {
    min: 0,
    max: 639,
    name: 'mobile',
  },
  
  // Small tablets and large phones
  tablet: {
    min: 640,
    max: 767,
    name: 'tablet',
  },
  
  // Tablets in portrait mode
  tabletPortrait: {
    min: 768,
    max: 1023,
    name: 'tabletPortrait',
  },
  
  // Tablets in landscape / Small laptops
  tabletLandscape: {
    min: 1024,
    max: 1279,
    name: 'tabletLandscape',
  },
  
  // Laptops and small desktops
  desktop: {
    min: 1280,
    max: 1535,
    name: 'desktop',
  },
  
  // Large desktops
  desktopLarge: {
    min: 1536,
    max: Infinity,
    name: 'desktopLarge',
  },
} as const;

export type BreakpointName = keyof typeof breakpoints;

/**
 * Tailwind CSS breakpoint values (for consistency)
 */
export const tailwindBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Get breakpoint CSS value
 */
export const getBreakpointValue = (breakpoint: BreakpointName): string => {
  return `${breakpoints[breakpoint].min}px`;
};

/**
 * Get media query string for min-width
 */
export const getMediaQuery = (breakpoint: BreakpointName): string => {
  return `(min-width: ${getBreakpointValue(breakpoint)})`;
};

/**
 * Get media query string for max-width
 */
export const getMaxMediaQuery = (breakpoint: BreakpointName): string => {
  return `(max-width: ${breakpoints[breakpoint].max}px)`;
};

/**
 * Get current breakpoint range
 */
export const getBreakpointRange = (width: number): BreakpointName => {
  if (width < breakpoints.tablet.min) return 'mobile';
  if (width < breakpoints.tabletPortrait.min) return 'tablet';
  if (width < breakpoints.tabletLandscape.min) return 'tabletPortrait';
  if (width < breakpoints.desktop.min) return 'tabletLandscape';
  if (width < breakpoints.desktopLarge.min) return 'desktop';
  return 'desktopLarge';
};

/**
 * Check if screen size matches breakpoint
 */
export const matchesBreakpoint = (
  breakpoint: BreakpointName,
  width: number
): boolean => {
  const bp = breakpoints[breakpoint];
  return width >= bp.min && width <= bp.max;
};

/**
 * Check if screen is mobile
 */
export const isMobile = (width: number): boolean => {
  return width < breakpoints.tablet.min;
};

/**
 * Check if screen is tablet
 */
export const isTablet = (width: number): boolean => {
  return width >= breakpoints.tablet.min && width < breakpoints.desktop.min;
};

/**
 * Check if screen is desktop
 */
export const isDesktop = (width: number): boolean => {
  return width >= breakpoints.desktop.min;
};

/**
 * Device orientation helpers
 */
export const getOrientation = (): 'portrait' | 'landscape' => {
  if (typeof window === 'undefined') return 'portrait';
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

