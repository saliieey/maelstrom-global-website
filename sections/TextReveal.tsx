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
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

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
      
      // Calculate equal spacing once - store it for reuse
      let equalSpacing = 0;
      const calculateSpacing = () => {
        if (textElement && sticky) {
          // Use getBoundingClientRect for accurate measurement
          const containerHeight = window.innerHeight - gap;
          const textRect = textElement.getBoundingClientRect();
          const textHeight = textRect.height;
          equalSpacing = Math.max(32, (containerHeight - textHeight) / 2); // Minimum 2rem (32px)
        }
      };

      // Pin the sticky container during scroll - releases after animation completes so text scrolls away with section
      // Animation completes at ~75% of timeline, pin releases after completion so entire section scrolls naturally
      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: "+=160%", // Pin ends when timeline completes - ensures text is fully revealed before pin releases
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onLeave: () => {
          // Pin releases - maintain exact same visual position
          // Recalculate spacing to ensure accuracy (text might have changed)
          calculateSpacing();
          
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            // Maintain container height
            gsap.set(sticky, {
              willChange: "auto",
              height: `calc(100vh - ${gap}px)`, // Maintain same height
              minHeight: `calc(100vh - ${gap}px)`, // Maintain same min-height
              paddingTop: "0", // Remove padding - use margin on text instead
              paddingBottom: "0", // Remove padding - use margin on text instead
              alignItems: "flex-start", // Use flex-start to control exact position
              justifyContent: "center", // Maintain horizontal centering
            });
            
            // Position text with equal top and bottom margins using stored spacing
            if (textElement && equalSpacing > 0) {
              gsap.set(textElement, {
                minHeight: "auto", // Remove full height constraint
                marginTop: `${equalSpacing}px`, // Equal spacing from top
                marginBottom: `${equalSpacing}px`, // Equal spacing from bottom
              });
            }
          });
          // Ensure black background extends to cover any remaining space
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { 
              opacity: 1,
              height: "100%",
            });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { 
              opacity: 1,
              height: "100%",
            });
          }
        },
        onEnter: () => {
          // Set exact height for perfect centering (viewport minus navbar gap)
          gsap.set(sticky, { 
            top: `${gap}px`, 
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            paddingTop: "2rem", // Consistent top padding
            paddingBottom: "2rem", // Consistent bottom padding
            alignItems: "center", // Ensure center alignment
            justifyContent: "center", // Maintain horizontal centering
            willChange: "transform" 
          });
          // Reset text container to centered state - clear any margins
          if (textElement) {
            gsap.set(textElement, {
              minHeight: "100%", // Full height for centering
              marginTop: "0", // Clear any margin
              marginBottom: "0", // Clear any margin
            });
          }
          // Calculate spacing when entering - ensures accurate measurement
          setTimeout(() => {
            calculateSpacing();
          }, 100);
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
            paddingTop: "2rem", // Consistent top padding
            paddingBottom: "2rem", // Consistent bottom padding
            alignItems: "center", // Ensure center alignment
            justifyContent: "center", // Maintain horizontal centering
            willChange: "transform" 
          });
          // Reset text container to centered state - clear any margins
          if (textElement) {
            gsap.set(textElement, {
              minHeight: "100%", // Full height for centering
              marginTop: "0", // Clear any margin
              marginBottom: "0", // Clear any margin
            });
          }
          // Recalculate spacing when entering back (for future use)
          setTimeout(() => {
            calculateSpacing();
          }, 100);
          // Ensure black background stays solid
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
        onLeaveBack: () => {
          // When scrolling back, reset to centered state with padding
          gsap.set(sticky, {
            willChange: "auto",
            position: "sticky",
            top: `${gap}px`,
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            paddingTop: "2rem", // Reset to padding for centered state
            paddingBottom: "2rem", // Reset to padding for centered state
            alignItems: "center", // Reset to center alignment
            justifyContent: "center", // Maintain horizontal centering
          });
          // Reset text container
          if (textElement) {
            gsap.set(textElement, {
              minHeight: "100%", // Reset to full height for centering
              marginTop: "0", // Remove margin
              marginBottom: "0", // Remove margin
            });
          }
          // Ensure black background stays solid when scrolling back
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
      });
      scrollTriggersRef.current.push(pinTrigger);

      // Create timeline for smooth word reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: "+=160%", // Animation completes at ~75% of this (~120% viewport) - pin ends at 120%
          scrub: 1, // Smooth scrubbing
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }

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
      
      // Use the same gap value for top and bottom spacing to match the gap at the top of black background
      // This ensures equal spacing above and below the text, matching the desktop behavior
      const topBottomGap = gap; // Match the gap from navbar (88px) for consistent spacing

      // Pin the sticky container - releases after animation completes so text scrolls away with section
      // Animation completes at ~70% of timeline, pin releases after completion so entire section scrolls naturally
      const pinTriggerMobile = ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: "+=157%", // Pin ends when timeline completes - ensures text is fully revealed before pin releases
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
            paddingTop: `${topBottomGap}px`, // Use gap value for top padding to match top spacing
            paddingBottom: `${topBottomGap}px`, // Use gap value for bottom padding to match bottom spacing
            alignItems: "center", // Ensure center alignment
            justifyContent: "center", // Maintain horizontal centering
            willChange: "transform" 
          });
          // Reset text container to centered state - clear any margins
          if (textElement) {
            gsap.set(textElement, {
              minHeight: "100%", // Full height for centering
              marginTop: "0", // Clear any margin
              marginBottom: "0", // Clear any margin
            });
          }
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
            paddingTop: `${topBottomGap}px`, // Use gap value for top padding
            paddingBottom: `${topBottomGap}px`, // Use gap value for bottom padding
            alignItems: "center", // Ensure center alignment
            justifyContent: "center", // Maintain horizontal centering
            willChange: "transform" 
          });
          // Reset text container to centered state - clear any margins
          if (textElement) {
            gsap.set(textElement, {
              minHeight: "100%", // Full height for centering
              marginTop: "0", // Clear any margin
              marginBottom: "0", // Clear any margin
            });
          }
          // Ensure black background stays solid
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
        onLeave: () => {
          // Pin releases - maintain exact same visual position with equal top and bottom gaps
          // Use synchronous update to prevent jump
          gsap.set(sticky, {
            willChange: "auto",
            height: `calc(100vh - ${gap}px)`, // Maintain same height
            minHeight: `calc(100vh - ${gap}px)`, // Maintain same min-height
            paddingTop: `${topBottomGap}px`, // Keep same top padding to match top gap
            paddingBottom: `${topBottomGap}px`, // Keep same bottom padding to match bottom gap
            alignItems: "flex-start", // Use flex-start to control exact position
            justifyContent: "center", // Maintain horizontal centering
          });
          
          // Position text with equal top and bottom margins matching the gap
          if (textElement) {
            gsap.set(textElement, {
              minHeight: "auto", // Remove full height constraint
              marginTop: `${topBottomGap}px`, // Equal spacing from top matching the gap
              marginBottom: `${topBottomGap}px`, // Equal spacing from bottom matching the gap
            });
          }
          
          // Ensure black background extends to cover any remaining space
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { 
              opacity: 1,
              height: "100%",
            });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { 
              opacity: 1,
              height: "100%",
            });
          }
        },
        onLeaveBack: () => {
          // When scrolling back, reset to centered state with padding
          gsap.set(sticky, {
            willChange: "auto",
            position: "sticky",
            top: `${gap}px`,
            height: `calc(100vh - ${gap}px)`, // Maintain height
            minHeight: `calc(100vh - ${gap}px)`, // Maintain min-height
            paddingTop: `${topBottomGap}px`, // Reset to gap value for top padding
            paddingBottom: `${topBottomGap}px`, // Reset to gap value for bottom padding
            alignItems: "center", // Reset to center alignment
            justifyContent: "center", // Maintain horizontal centering
          });
          // Reset text container
          if (textElement) {
            gsap.set(textElement, {
              minHeight: "100%", // Reset to full height for centering
              marginTop: "0", // Remove margin
              marginBottom: "0", // Remove margin
            });
          }
          // Ensure black background stays solid when scrolling back
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 1 });
          }
          if (containerBackgroundRef.current) {
            gsap.set(containerBackgroundRef.current, { opacity: 1 });
          }
        },
      });
      scrollTriggersRef.current.push(pinTriggerMobile);

      // Create timeline for mobile
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: "+=157%", // Animation completes at ~70% of this (~110% viewport) - pin ends at 110%
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }

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
      // Only kill ScrollTriggers created by this component
      scrollTriggersRef.current.forEach((trigger) => {
        if (trigger) {
          trigger.kill();
        }
      });
      scrollTriggersRef.current = [];
      mm.revert();
    };
  }, [words.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full md:mt-[300px] md:pb-[300px] z-0"
      style={{ 
        height: "250vh", // Height allows pin to work and section (with text) to scroll away completely naturally
        minHeight: "250vh",
        marginTop: "0px", // No gap on mobile - flows directly after hero section
      }}
    >
      {/* Container black background - covers entire section including bottom gap */}
      <div
        ref={containerBackgroundRef}
        className="absolute inset-0 bg-black z-0"
        style={{
          opacity: 1,
          height: "100%", // Ensure full coverage
          minHeight: "100%", // Ensure minimum coverage
          bottom: "0", // Ensure it extends to bottom
        }}
      />
      {/* Solid black background - stays opaque until pin releases */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-black z-0"
        style={{
          opacity: 1, // Always solid black - no fade
          height: "100%", // Ensure full coverage
          minHeight: "100%", // Ensure minimum coverage
          bottom: "0", // Ensure it extends to bottom
        }}
      />
      <div
        ref={stickyRef}
        className="sticky top-[88px] lg:top-[96px] w-full flex items-center justify-center px-4 md:px-6 lg:px-8 md:py-[300px] z-10 relative"
        style={{
          height: "calc(100vh - 88px)", // Mobile: viewport height minus navbar (88px)
          minHeight: "calc(100vh - 88px)",
          paddingTop: "2rem", // Consistent top padding to match bottom spacing
          paddingBottom: "2rem", // Consistent bottom padding to prevent jump and maintain spacing
          willChange: "transform",
          isolation: "isolate",
        }}
      >
        {/* Perfect vertical and horizontal centering - text container */}
        <div
          ref={textRef}
          className="text-center max-w-7xl mx-auto w-full flex flex-col items-center justify-center"
          style={{
            fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
            opacity: 1, // Text stays visible - no fade
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

