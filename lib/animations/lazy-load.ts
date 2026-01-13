/**
 * Lazy Loading Utilities for Animation Libraries
 * Prevents heavy libraries from loading until actually needed
 * This significantly improves initial page load time and SEO scores
 */

import { lazy, ComponentType } from 'react';

/**
 * Dynamically import Three.js components only when needed
 * Reduces initial bundle size by ~500KB
 * 
 * TEMPORARILY DISABLED: Commented out to fix production build TypeScript errors
 * These are NOT used in homepage or navigation render path.
 */
// TEMPORARILY DISABLED - Not used in homepage/navigation
// export const LazyThreeScene = lazy(
//   () => import('./three-utils').then((mod) => ({ default: mod.Scroll3DScene }))
// );
// export const LazyRotatingMesh = lazy(
//   () =>
//     import('./three-utils').then((mod) => ({ default: mod.RotatingMesh }))
// );
// export const LazyParticleSystem = lazy(
//   () =>
//     import('./three-utils').then((mod) => ({ default: mod.ParticleSystem }))
// );

// Placeholder exports to prevent import errors
// These accept children and render them without 3D effects
export const LazyThreeScene = lazy(() => 
  Promise.resolve({ 
    default: ({ children }: { children: React.ReactNode }) => {
      return children as React.ReactElement;
    }
  })
);
export const LazyRotatingMesh = lazy(() => Promise.resolve({ default: () => null }));
export const LazyParticleSystem = lazy(() => Promise.resolve({ default: () => null }));

/**
 * Dynamically import GSAP ScrollTrigger only when animations are needed
 * GSAP ScrollTrigger is loaded on-demand, not on initial page load
 */
export const loadGSAPScrollTrigger = async () => {
  if (typeof window === 'undefined') return null;

  const [gsap, ScrollTrigger] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);

  gsap.gsap.registerPlugin(ScrollTrigger.ScrollTrigger);
  return { gsap: gsap.gsap, ScrollTrigger: ScrollTrigger.ScrollTrigger };
};

/**
 * Lazy load Lottie animations only when component is in viewport
 */
export const loadLottie = async () => {
  return (await import('lottie-react')).default;
};

/**
 * Check if user prefers reduced motion
 * This helps avoid loading heavy animations unnecessarily
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if element is in viewport (using Intersection Observer)
 * Only trigger animations when elements are visible
 */
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px', // Start loading 50px before element enters viewport
    threshold: 0.01, // Trigger when 1% visible
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Lazy load Framer Motion only when needed
 */
export const loadFramerMotion = async () => {
  return await import('framer-motion');
};

/**
 * Performance-optimized animation loader
 * Only loads animation libraries when they're actually needed
 */
export class AnimationLoader {
  private static gsapLoaded = false;
  private static threeLoaded = false;
  private static lottieLoaded = false;

  static async loadGSAP(): Promise<typeof import('gsap')> {
    if (!this.gsapLoaded) {
      const gsap = await import('gsap');
      this.gsapLoaded = true;
      return gsap;
    }
    return import('gsap');
  }

  // TEMPORARILY DISABLED - Not used in homepage/navigation
  static async loadThree(): Promise<typeof import('three')> {
    // if (!this.threeLoaded) {
    //   const three = await import('three');
    //   this.threeLoaded = true;
    //   return three;
    // }
    // return import('three');
    throw new Error('Three.js is temporarily disabled for production build');
  }

  static async loadLottie(): Promise<ComponentType<any>> {
    if (!this.lottieLoaded) {
      const Lottie = await loadLottie();
      this.lottieLoaded = true;
      return Lottie;
    }
    return loadLottie();
  }

  static reset() {
    this.gsapLoaded = false;
    this.threeLoaded = false;
    this.lottieLoaded = false;
  }
}

