'use client';

/**
 * Parallax Component
 * Creates parallax scrolling effect
 */

import { useEffect, useRef } from 'react';
import { parallaxScroll } from '@/lib/animations/gsap-utils';
import { useAnimation } from '@/contexts/AnimationContext';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  start?: string;
  end?: string;
}

export const Parallax = ({
  children,
  className = '',
  speed = 0.5,
  start,
  end,
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationEnabled } = useAnimation();

  useEffect(() => {
    if (!animationEnabled || !ref.current) return;

    const animation = parallaxScroll(ref.current, speed, {
      start,
      end,
    });

    return () => {
      animation?.kill?.();
    };
  }, [animationEnabled, speed, start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

