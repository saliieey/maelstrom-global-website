'use client';

/**
 * Fade In Animation Component
 * Reusable component for fade-in animations on scroll
 */

import { useEffect, useRef } from 'react';
import { fadeInOnScroll } from '@/lib/animations/gsap-utils';
import { useAnimation } from '@/contexts/AnimationContext';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
}

export const FadeIn = ({
  children,
  className = '',
  delay = 0,
  duration = 1,
  y = 50,
  stagger = 0,
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationEnabled } = useAnimation();

  useEffect(() => {
    if (!animationEnabled || !ref.current) return;

    const animation = fadeInOnScroll(ref.current, {
      duration,
      delay,
      y,
      stagger,
    });

    return () => {
      animation?.kill?.();
    };
  }, [animationEnabled, delay, duration, y, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

