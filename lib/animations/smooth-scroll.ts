/**
 * Smooth Scroll with Lenis
 * Provides buttery smooth scrolling throughout the website
 */

import Lenis from 'lenis';
import { useEffect } from 'react';

let lenisInstance: Lenis | null = null;

/**
 * Initialize Lenis smooth scroll
 */
export const initSmoothScroll = (options?: {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal' | 'both';
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
}) => {
  if (typeof window === 'undefined') return null;

  const defaultOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
    ...options,
  };

  lenisInstance = new Lenis(defaultOptions);

  // RAF integration
  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenisInstance;
};

/**
 * Get Lenis instance
 */
export const getLenisInstance = () => {
  return lenisInstance;
};

/**
 * Scroll to target element or position
 */
export const scrollTo = (
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
  }
) => {
  if (!lenisInstance) return;

  lenisInstance.scrollTo(target, {
    offset: options?.offset ?? 0,
    duration: options?.duration ?? 1.2,
    easing: options?.easing,
  });
};

/**
 * Stop smooth scroll
 */
export const stopScroll = () => {
  if (lenisInstance) {
    lenisInstance.stop();
  }
};

/**
 * Start smooth scroll
 */
export const startScroll = () => {
  if (lenisInstance) {
    lenisInstance.start();
  }
};

/**
 * React hook for smooth scroll
 */
export const useSmoothScroll = (options?: Parameters<typeof initSmoothScroll>[0]) => {
  useEffect(() => {
    const lenis = initSmoothScroll(options);

    return () => {
      if (lenis) {
        lenis.destroy();
        lenisInstance = null;
      }
    };
  }, []);
};

