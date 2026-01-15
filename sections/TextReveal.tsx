"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Helper function to split text into words
 * Returns an array of word objects with unique keys
 */
const splitTextIntoWords = (text: string): { word: string; key: string }[] => {
  return text.split(/\s+/).map((word, index) => ({
    word: word,
    key: `word-${index}-${word}`,
  }));
};

export const TextReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const containerBackgroundRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const text =
    "We unite Design & Technology to add Value to your business with our all-inclusive services for a complete digital and technological outreach.";

  const words = splitTextIntoWords(text);

  useEffect(() => {
    // Register ScrollTrigger plugin only on client side
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const textElement = textRef.current;

    // Ensure we're on client side
    if (typeof window === "undefined") return;

    if (!container || !sticky || !textElement) return;

    // Use matchMedia for responsive breakpoints
    const mm = gsap.matchMedia();

    // Wait a tick to ensure all refs are set
    const timeoutId = setTimeout(() => {
      // Collect all word spans
      const wordSpans = wordsRef.current.filter(Boolean);

      if (wordSpans.length === 0) {
        mm.revert();
        return;
      }

    // Desktop and Tablet (>= 768px)
    mm.add("(min-width: 768px)", () => {
      // Set initial state: words are dim white (unread)
      gsap.set(wordSpans, {
        opacity: 0.2,
        color: "#ffffff", // White color - starts dim
      });

      // Calculate gap for navbar
      const gap = 96;

      // Pin the sticky container during scroll - STAYS SOLID BLACK until text fully reveals
      ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: "+=350%", // 3.5x viewport height - ensures text fully reveals with proper hold period
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          // Set exact height for perfect centering (viewport minus navbar gap)
          gsap.set(sticky, { 
            top: `${gap}px`, 
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            willChange: "transform" 
          });
          // Ensure black background stays solid
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
        onEnterBack: () => {
          // Set exact height for perfect centering (viewport minus navbar gap)
          gsap.set(sticky, { 
            top: `${gap}px`, 
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            willChange: "transform" 
          });
          // Ensure black background stays solid
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
        onLeave: () => {
          // Pin releases - section scrolls away naturally, revealing PortfolioGrid underneath
          // Black background stays visible until pin releases, then scrolls away with section
          gsap.set(sticky, {
            willChange: "auto",
            clearProps: "transform",
          });
          // Keep backgrounds visible - they scroll away naturally with the section
        },
        onLeaveBack: () => {
          // Set exact height for perfect centering when scrolling back
          gsap.set(sticky, {
            willChange: "auto",
            position: "sticky",
            top: `${gap}px`,
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
          });
          // Ensure black background stays solid when scrolling back
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
      });

      // Create timeline for smooth word reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: "+=350%", // Match pin end - ensures animation completes with proper hold period
          scrub: 1, // Smooth scrubbing
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate words from dim (unread) to bright orange (read) with stagger
      // Animation completes at ~75% of timeline, leaving 25% hold period before next section
      tl.to(
        wordSpans,
        {
          opacity: 1,
          color: "#ff6b35", // Orange color
          ease: "none",
          force3D: true,
          stagger: {
            amount: 2.6, // Ensures ALL words fully reveal including the last word - completes at ~75% of timeline
            from: "start", // Start from beginning
          },
        },
        0
      );

      // Black background stays solid throughout entire pin duration
      // No fade-out - background remains visible until pin releases
      // When pin releases (onLeave), next section appears underneath
    });

    // Mobile (< 768px) - Simplified animation
    mm.add("(max-width: 767px)", () => {
      // Set initial state: words are dim white
      gsap.set(wordSpans, {
        opacity: 0.2,
        color: "#ffffff", // White color - starts dim
      });

      const gap = 88;

      // Pin the sticky container - STAYS SOLID BLACK until text fully reveals
      ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: "+=400%", // 4x viewport height - ensures text fully reveals with proper hold period on mobile
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          // Set exact height for perfect centering (viewport minus navbar gap)
          gsap.set(sticky, { 
            top: `${gap}px`, 
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            willChange: "transform" 
          });
          // Ensure black background stays solid
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
        onEnterBack: () => {
          // Set exact height for perfect centering (viewport minus navbar gap)
          gsap.set(sticky, { 
            top: `${gap}px`, 
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            willChange: "transform" 
          });
          // Ensure black background stays solid
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
        onLeave: () => {
          // Pin releases - section scrolls away naturally, revealing PortfolioGrid underneath
          // Black background stays visible until pin releases, then scrolls away with section
          gsap.set(sticky, {
            willChange: "auto",
            clearProps: "transform",
          });
          // Keep backgrounds visible - they scroll away naturally with the section
        },
        onLeaveBack: () => {
          gsap.set(sticky, {
            willChange: "auto",
            position: "sticky",
            top: `${gap}px`,
          });
          // Ensure black background stays solid when scrolling back
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
      });

      // Create timeline for mobile
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: "+=400%", // Match pin end - ensures animation completes with proper hold period on mobile
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate words with stagger for mobile
      // Animation completes at ~70% of timeline, leaving 30% hold period before next section
      tl.to(
        wordSpans,
        {
          opacity: 1,
          color: "#ff6b35", // Orange color
          ease: "none",
          force3D: true,
          stagger: {
            amount: 2.8, // Increased for mobile - ensures ALL words fully reveal including the last word - completes at ~70% of timeline
            from: "start",
          },
        },
        0
      );

      // Black background stays solid throughout entire pin duration
      // No fade-out - background remains visible until pin releases
      // When pin releases (onLeave), next section appears underneath
    });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 0);

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mm.revert();
    };
  }, [words.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full md:mt-[300px] z-0"
      style={{ 
        height: "400vh", // Container height matches mobile pin duration (400% = 4 viewport heights) - desktop works fine with extra space
        minHeight: "400vh",
        marginTop: "0px", // No gap on mobile - flows directly after hero section
      }}
    >
      {/* Container black background - fades out with animation */}
      <div
        ref={containerBackgroundRef}
        className="absolute inset-0 bg-black z-0"
        style={{
          opacity: 1,
        }}
      />
      {/* Solid black background - stays opaque until pin releases */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-black z-0"
        style={{
          opacity: 1, // Always solid black - no fade
        }}
      />
      <div
        ref={stickyRef}
        className="sticky top-[88px] lg:top-[96px] w-full flex items-center justify-center px-4 md:px-6 lg:px-8 z-10 relative"
        style={{
          height: "calc(100vh - 88px)", // Mobile: viewport height minus navbar (88px)
          minHeight: "calc(100vh - 88px)",
          willChange: "transform",
          isolation: "isolate",
        }}
      >
        {/* Perfect vertical and horizontal centering - text container */}
        <div
          ref={textRef}
          className="text-center max-w-7xl mx-auto w-full"
          style={{
            fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
            opacity: 1, // Text stays visible - no fade
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%", // Take full height for perfect vertical centering
          }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight md:leading-tight">
            {words.map((wordObj, index) => (
              <span
                key={wordObj.key}
                ref={(el) => {
                  if (el) {
                    wordsRef.current[index] = el;
                  }
                }}
                className="inline-block mx-1 md:mx-1.5"
                style={{
                  opacity: 0.2,
                  color: "#ffffff", // White color - starts dim, reveals to orange
                  transition: "opacity 0.1s ease-out, color 0.1s ease-out",
                }}
              >
                {wordObj.word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

