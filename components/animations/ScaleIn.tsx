'use client';

/**
 * Scale In Animation Component
 * Reusable component for scale-in animations on scroll
 */

import { useEffect, useRef } from 'react';
import { scaleInOnScroll } from '@/lib/animations/gsap-utils';
import { useAnimation } from '@/contexts/AnimationContext';

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  scale?: number;
}

export const ScaleIn = ({
  children,
  className = '',
  delay = 0,
  duration = 1,
  scale = 0.8,
}: ScaleInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationEnabled } = useAnimation();

  useEffect(() => {
    if (!animationEnabled || !ref.current) return;

    const animation = scaleInOnScroll(ref.current, {
      duration,
      delay,
      scale,
    });

    return () => {
      animation?.kill?.();
    };
  }, [animationEnabled, delay, duration, scale]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

