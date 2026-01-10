'use client';

/**
 * Slide In Animation Component
 * Reusable component for slide-in animations on scroll
 */

import { useEffect, useRef } from 'react';
import { slideInOnScroll } from '@/lib/animations/gsap-utils';
import { useAnimation } from '@/contexts/AnimationContext';

interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  distance?: number;
}

export const SlideIn = ({
  children,
  className = '',
  direction = 'left',
  delay = 0,
  duration = 1,
  distance = 100,
}: SlideInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationEnabled } = useAnimation();

  useEffect(() => {
    if (!animationEnabled || !ref.current) return;

    const animation = slideInOnScroll(ref.current, direction, {
      duration,
      delay,
      distance,
    });

    return () => {
      animation?.kill?.();
    };
  }, [animationEnabled, direction, delay, duration, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

