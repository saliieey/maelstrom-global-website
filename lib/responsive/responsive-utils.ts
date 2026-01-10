/**
 * Responsive Utility Functions
 * Helper functions for responsive design patterns
 */

import { breakpoints, type BreakpointName } from './breakpoints';

/**
 * Get responsive value based on breakpoint
 * Returns value for current breakpoint or fallback
 */
export function getResponsiveValue<T>(
  values: Partial<Record<BreakpointName, T>>,
  width: number,
  fallback: T
): T {
  // Check breakpoints from largest to smallest
  const breakpointOrder: BreakpointName[] = [
    'desktopLarge',
    'desktop',
    'tabletLandscape',
    'tabletPortrait',
    'tablet',
    'mobile',
  ];

  for (const bp of breakpointOrder) {
    if (values[bp] !== undefined && width >= breakpoints[bp].min) {
      return values[bp]!;
    }
  }

  return fallback;
}

/**
 * Clamp value between min and max based on viewport width
 * Useful for fluid typography and spacing
 */
export function clampValue(
  min: number,
  preferred: number,
  max: number,
  minWidth: number = 320,
  maxWidth: number = 1920
): string {
  const slope = (max - min) / (maxWidth - minWidth);
  const yIntercept = min - slope * minWidth;
  const clamped = `clamp(${min}px, ${yIntercept + slope * 100}vw, ${max}px)`;
  return clamped;
}

/**
 * Fluid typography helper
 */
export function fluidTypography(
  minSize: number,
  maxSize: number,
  minWidth: number = 320,
  maxWidth: number = 1920
): string {
  return clampValue(minSize, (minSize + maxSize) / 2, maxSize, minWidth, maxWidth);
}

/**
 * Get responsive spacing value
 */
export function getResponsiveSpacing(
  base: number,
  multiplier: Partial<Record<BreakpointName, number>> = {}
): string {
  const multipliers = {
    mobile: multiplier.mobile ?? 1,
    tablet: multiplier.tablet ?? 1.25,
    tabletPortrait: multiplier.tabletPortrait ?? 1.5,
    tabletLandscape: multiplier.tabletLandscape ?? 1.75,
    desktop: multiplier.desktop ?? 2,
    desktopLarge: multiplier.desktopLarge ?? 2.25,
  };

  // Return CSS custom property or calculate on client
  return `var(--spacing-responsive, ${base}px)`;
}

/**
 * Check if touch device
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

/**
 * Get safe area insets (for notched devices)
 */
export function getSafeAreaInsets(): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  if (typeof window === 'undefined') {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  const style = getComputedStyle(document.documentElement);
  return {
    top: parseFloat(style.getPropertyValue('--safe-area-inset-top') || '0'),
    right: parseFloat(style.getPropertyValue('--safe-area-inset-right') || '0'),
    bottom: parseFloat(style.getPropertyValue('--safe-area-inset-bottom') || '0'),
    left: parseFloat(style.getPropertyValue('--safe-area-inset-left') || '0'),
  };
}

/**
 * Viewport height fix for mobile browsers
 * Sets CSS custom property for actual viewport height
 */
export function setViewportHeight(): void {
  if (typeof window === 'undefined') return;

  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
}

/**
 * Get device pixel ratio
 */
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
}

/**
 * Check if high DPI display
 */
export function isHighDPI(): boolean {
  return getDevicePixelRatio() >= 2;
}

/**
 * Responsive container max-widths
 */
export const containerMaxWidths = {
  mobile: '100%',
  tablet: '640px',
  tabletPortrait: '768px',
  tabletLandscape: '1024px',
  desktop: '1280px',
  desktopLarge: '1536px',
} as const;

/**
 * Get container max-width for breakpoint
 */
export function getContainerMaxWidth(breakpoint: BreakpointName): string {
  return containerMaxWidths[breakpoint];
}

