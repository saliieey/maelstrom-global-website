'use client';

/**
 * Stagger Container Animation Component
 * Animates children with stagger effect on scroll
 */

import { useEffect, useRef, Children } from 'react';
import { staggerFadeIn } from '@/lib/animations/gsap-utils';
import { useAnimation } from '@/contexts/AnimationContext';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  y?: number;
}

export const StaggerContainer = ({
  children,
  className = '',
  duration = 0.8,
  stagger = 0.1,
  delay = 0,
  y = 30,
}: StaggerContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { animationEnabled } = useAnimation();

  useEffect(() => {
    if (!animationEnabled || !containerRef.current) return;

    // Use GSAP's selector to find direct children
    const childElements = containerRef.current.querySelectorAll(
      ':scope > *'
    ) as NodeListOf<HTMLElement>;

    if (childElements.length === 0) return;

    const animation = staggerFadeIn(Array.from(childElements), {
      duration,
      stagger,
      delay,
      y,
    });

    return () => {
      animation?.kill?.();
    };
  }, [animationEnabled, duration, stagger, delay, y]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

