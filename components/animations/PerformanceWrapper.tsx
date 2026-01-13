'use client';

/**
 * Performance Wrapper for 3D Animations
 * Only loads Three.js when component is in viewport and user hasn't disabled animations
 */

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { createIntersectionObserver, prefersReducedMotion, LazyThreeScene } from '@/lib/animations/lazy-load';

// TEMPORARILY DISABLED: Using placeholder from lazy-load.ts to avoid Three.js imports
// const LazyThreeScene = lazy(() =>
//   import('@/lib/animations/three-utils').then((mod) => ({
//     default: mod.Scroll3DScene,
//   }))
// );

interface PerformanceWrapperProps {
  children: React.ReactNode;
  /** Show 3D animation? If false, only shows fallback */
  enable3D?: boolean;
  fallback?: React.ReactNode;
  className?: string;
}

export const PerformanceWrapper = ({
  children,
  enable3D = true,
  fallback = <div className="h-screen bg-black" />,
  className = '',
}: PerformanceWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Don't load if reduced motion or 3D disabled
    if (prefersReducedMotion() || !enable3D) {
      return;
    }

    const element = ref.current;
    if (!element || hasLoaded) return;

    // Only load 3D when element is about to enter viewport
    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad3D) {
            setShouldLoad3D(true);
            setHasLoaded(true);
            observer?.unobserve(element);
          }
        });
      },
      {
        rootMargin: '200px', // Start loading earlier for smooth experience
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
  }, [enable3D, shouldLoad3D, hasLoaded]);

  // If reduced motion or 3D disabled, just show children
  if (prefersReducedMotion() || !enable3D) {
    return <div className={className}>{children}</div>;
  }

  // If 3D should load, show lazy-loaded component
  if (shouldLoad3D) {
    return (
      <div ref={ref} className={className}>
        <Suspense fallback={fallback}>
          <LazyThreeScene>{children}</LazyThreeScene>
        </Suspense>
      </div>
    );
  }

  // Show fallback until 3D loads
  return (
    <div ref={ref} className={className}>
      {fallback}
    </div>
  );
};

