'use client';

/**
 * Animation Context Provider
 * Global animation control and preferences
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSmoothScroll } from '@/lib/animations/smooth-scroll';
import { cleanupScrollTriggers } from '@/lib/animations/gsap-utils';
import { isLowEndDevice } from '@/lib/performance/performance-utils';

interface AnimationContextType {
  prefersReducedMotion: boolean;
  animationEnabled: boolean;
  isLowEndDevice: boolean;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
  enableSmoothScroll?: boolean;
}

export const AnimationProvider = ({
  children,
  enableSmoothScroll = true,
}: AnimationProviderProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [lowEndDevice, setLowEndDevice] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Check for low-end device
    setLowEndDevice(isLowEndDevice());

    // Listen for preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Initialize smooth scroll (skip on low-end devices or reduced motion)
  const shouldEnableSmoothScroll =
    !prefersReducedMotion && !lowEndDevice && enableSmoothScroll;

  useSmoothScroll({
    duration: prefersReducedMotion || lowEndDevice ? 0 : 1.2,
    smoothWheel: shouldEnableSmoothScroll,
    wheelMultiplier: lowEndDevice ? 0.5 : 1, // Reduce scroll speed on low-end devices
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupScrollTriggers();
    };
  }, []);

  const toggleAnimations = () => {
    // Can be used to programmatically disable animations
  };

  // Disable heavy animations on low-end devices or reduced motion
  const animationEnabled = !prefersReducedMotion && !lowEndDevice;

  const value: AnimationContextType = {
    prefersReducedMotion,
    animationEnabled,
    isLowEndDevice: lowEndDevice,
    toggleAnimations,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

