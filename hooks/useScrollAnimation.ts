'use client';

/**
 * Custom hook for scroll-triggered animations
 * Provides easy-to-use animation triggers based on scroll position
 */

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (options?: {
  threshold?: number;
  once?: boolean;
  margin?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: options?.threshold ?? 0.1,
    once: options?.once ?? false,
    ...(options?.margin && { margin: options.margin as any }),
  } as any);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    isInView,
    hasAnimated: options?.once ? hasAnimated : isInView,
  };
};

/**
 * Hook for scroll progress tracking
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progressPercent = (scrollTop / scrollableHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progressPercent)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return progress;
};

/**
 * Hook for element scroll position tracking
 */
export const useElementScroll = (elementRef: React.RefObject<HTMLElement>) => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateScrollPosition = () => {
      setScrollPosition({
        x: element.scrollLeft,
        y: element.scrollTop,
      });
    };

    element.addEventListener('scroll', updateScrollPosition);
    updateScrollPosition();

    return () => {
      element.removeEventListener('scroll', updateScrollPosition);
    };
  }, [elementRef]);

  return scrollPosition;
};

