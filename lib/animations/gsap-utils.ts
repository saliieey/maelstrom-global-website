/**
 * GSAP Animation Utilities
 * Advanced scroll-triggered animations and utilities for consistent animations throughout the site
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade in animation on scroll
 */
export const fadeInOnScroll = (
  element: string | HTMLElement,
  options?: {
    duration?: number;
    delay?: number;
    y?: number;
    stagger?: number;
    ease?: string;
  }
) => {
  const {
    duration = 1,
    delay = 0,
    y = 50,
    stagger = 0,
    ease = 'power3.out',
  } = options || {};

  return gsap.fromTo(
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
      stagger: stagger,
      ease: ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Scale in animation on scroll
 */
export const scaleInOnScroll = (
  element: string | HTMLElement,
  options?: {
    duration?: number;
    delay?: number;
    scale?: number;
    ease?: string;
  }
) => {
  const { duration = 1, delay = 0, scale = 0.8, ease = 'back.out(1.7)' } =
    options || {};

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration: duration,
      delay: delay,
      ease: ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Slide in from direction
 */
export const slideInOnScroll = (
  element: string | HTMLElement,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  options?: {
    duration?: number;
    delay?: number;
    distance?: number;
    ease?: string;
  }
) => {
  const { duration = 1, delay = 0, distance = 100, ease = 'power3.out' } =
    options || {};

  const directions = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    top: { x: 0, y: -distance },
    bottom: { x: 0, y: distance },
  };

  const { x, y } = directions[direction];

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: x,
      y: y,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: duration,
      delay: delay,
      ease: ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Parallax effect for elements
 */
export const parallaxScroll = (
  element: string | HTMLElement,
  speed: number = 0.5,
  options?: {
    start?: string;
    end?: string;
  }
) => {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: options?.start || 'top bottom',
      end: options?.end || 'bottom top',
      scrub: true,
    },
  });
};

/**
 * Text reveal animation (character/word splitting)
 */
export const textReveal = (
  element: string | HTMLElement,
  options?: {
    duration?: number;
    stagger?: number;
    delay?: number;
  }
) => {
  const { duration = 0.05, stagger = 0.02, delay = 0 } = options || {};

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Rotate on scroll
 */
export const rotateOnScroll = (
  element: string | HTMLElement,
  rotation: number = 360
) => {
  return gsap.to(element, {
    rotation: rotation,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

/**
 * Pin element on scroll
 */
export const pinOnScroll = (
  element: string | HTMLElement,
  options?: {
    start?: string;
    end?: string;
    pinSpacing?: boolean;
  }
) => {
  return ScrollTrigger.create({
    trigger: element,
    start: options?.start || 'top top',
    end: options?.end || '+=100%',
    pin: true,
    pinSpacing: options?.pinSpacing ?? true,
  });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerFadeIn = (
  elements: string | HTMLElement[],
  options?: {
    duration?: number;
    stagger?: number;
    delay?: number;
    y?: number;
  }
) => {
  const {
    duration = 0.8,
    stagger = 0.1,
    delay = 0,
    y = 30,
  } = options || {};

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: y,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: Array.isArray(elements)
          ? elements[0]
          : (elements as string),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Smooth reveal with clip-path
 */
export const clipPathReveal = (
  element: string | HTMLElement,
  direction: 'up' | 'down' | 'left' | 'right' = 'up'
) => {
  const clipPaths = {
    up: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
    down: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
    left: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
    right: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
  };

  const { from, to } = clipPaths[direction];

  return gsap.fromTo(
    element,
    {
      clipPath: from,
      opacity: 0,
    },
    {
      clipPath: to,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Clean up all ScrollTriggers (call on unmount)
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

