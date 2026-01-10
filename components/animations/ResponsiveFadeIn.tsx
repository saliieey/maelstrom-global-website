'use client';

/**
 * Responsive Fade In Animation Component
 * Performance-optimized animation that adapts to device capabilities
 * Reduces animation complexity on mobile for better performance
 */

import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/useResponsive';
import { createIntersectionObserver, prefersReducedMotion } from '@/lib/animations/lazy-load';
import { useAnimation } from '@/contexts/AnimationContext';
import { isLowEndDevice } from '@/lib/performance/performance-utils';

interface ResponsiveFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  /** Disable on mobile */
  disableOnMobile?: boolean;
  /** Use lighter CSS animation on mobile */
  useCSSOnMobile?: boolean;
}

export const ResponsiveFadeIn = ({
  children,
  className = '',
  delay = 0,
  duration = 1,
  y = 50,
  disableOnMobile = false,
  useCSSOnMobile = true,
}: ResponsiveFadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const { isLowEndDevice: contextLowEnd } = useAnimation();
  const deviceIsLowEnd = typeof window !== 'undefined' ? isLowEndDevice() : false;

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    // Disable on mobile if requested
    if (disableOnMobile && isMobile) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Use lighter CSS animation on mobile or low-end devices
    const shouldUseCSS = (useCSSOnMobile && isMobile) || contextLowEnd || deviceIsLowEnd;

    // Use Intersection Observer for performance
    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);

            if (shouldUseCSS) {
              // Lightweight CSS animation for mobile
              element.style.opacity = '0';
              element.style.transform = `translateY(${y * 0.5}px)`; // Less movement on mobile
              element.style.transition = `opacity ${duration * 0.7}s ease-out ${delay}s, transform ${duration * 0.7}s ease-out ${delay}s`;

              requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              });
            } else {
              // GSAP animation for desktop (lazy loaded)
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
                });
              });
            }

            observer?.unobserve(element);
          }
        });
      },
      {
        rootMargin: isMobile ? '50px' : '100px', // Smaller margin on mobile
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
  }, [delay, duration, y, isMobile, disableOnMobile, useCSSOnMobile, isVisible, contextLowEnd, deviceIsLowEnd]);

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

