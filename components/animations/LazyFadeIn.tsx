'use client';

/**
 * Performance-Optimized Fade In Component
 * Uses Intersection Observer to only animate when element is in viewport
 * Lazy loads GSAP only when animation is needed
 */

import { useEffect, useRef, useState } from 'react';
import { createIntersectionObserver, prefersReducedMotion } from '@/lib/animations/lazy-load';

interface LazyFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  /** If true, uses CSS animation instead of GSAP (lighter) */
  useCSS?: boolean;
}

export const LazyFadeIn = ({
  children,
  className = '',
  delay = 0,
  duration = 1,
  y = 50,
  useCSS = false,
}: LazyFadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element || isAnimating) return;

    // Use Intersection Observer for performance
    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);

            if (useCSS) {
              // Use lightweight CSS animation
              element.style.opacity = '0';
              element.style.transform = `translateY(${y}px)`;
              element.style.transition = `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`;
              
              // Trigger animation
              requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              });
            } else {
              // Lazy load GSAP only when needed
              import('gsap').then(({ gsap }) => {
                import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                  gsap.registerPlugin(ScrollTrigger);
                  
                  gsap.fromTo(
                    element,
                    {
                      opacity: 0,
                      y: y,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      duration: duration,
                      delay: delay,
                      ease: 'power3.out',
                    }
                  );
                  
                  setIsAnimating(true);
                });
              });
            }

            // Unobserve after animation starts (performance optimization)
            observer?.unobserve(element);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.01,
      }
    );

    if (observer && element) {
      observer.observe(element);
    }

    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [delay, duration, y, useCSS, isVisible, isAnimating]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        prefersReducedMotion() || isVisible
          ? {}
          : { opacity: 0, visibility: 'hidden' }
      }
    >
      {children}
    </div>
  );
};

