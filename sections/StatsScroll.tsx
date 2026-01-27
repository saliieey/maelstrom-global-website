"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Stat Item Type
 */
interface StatItem {
  id: number;
  value: string;
  label: string;
  desc: string;
}

/**
 * Stats Data
 */
const STATS: StatItem[] = [
  {
    id: 1,
    value: "150+",
    label: "Projects Completed",
    desc: "Delivering excellence across industries worldwide.",
  },
  {
    id: 2,
    value: "95%",
    label: "Client Retention",
    desc: "Building lasting partnerships based on trust.",
  },
  {
    id: 3,
    value: "50+",
    label: "Team Experts",
    desc: "A diverse group of creative minds and tech wizards.",
  },
  {
    id: 4,
    value: "5M+",
    label: "Revenue Generated",
    desc: "Driving tangible growth for our partners.",
  },
];

/**
 * Scroll Indicator Component
 * Professional scroll hint at the bottom
 */
const ScrollIndicator = ({ indicatorRef }: { indicatorRef: React.RefObject<HTMLDivElement | null> }) => {
  useEffect(() => {
    if (!indicatorRef.current) return;

    // Animate the indicator with a subtle bounce
    gsap.to(indicatorRef.current, {
      y: 8,
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, [indicatorRef]);

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
    >
      <div className="text-xs text-white/40 uppercase tracking-widest font-medium">
        Scroll
      </div>
      <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
        <div className="w-1 h-3 rounded-full bg-white/60 animate-pulse" />
      </div>
    </div>
  );
};

/**
 * Number Reel Component
 * Creates a vertical scrolling reel effect inside a white pill container
 */
const NumberReel = ({
  stats,
  reelRef,
  numbersRef,
}: {
  stats: StatItem[];
  reelRef: React.RefObject<HTMLDivElement | null>;
  numbersRef: React.RefObject<HTMLDivElement[] | null>;
}) => {
  return (
    <div className="relative w-full max-w-[560px] md:max-w-[720px] lg:max-w-[840px] mx-auto">
      {/* Orange Capsule Container */}
      <div
        className="relative w-full rounded-[999px] overflow-hidden"
        style={{
          aspectRatio: "2.7 / 1",
          background: "linear-gradient(135deg, #ff6b35 0%, #ff4a16 100%)",
          boxShadow:
            "0 30px 70px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        }}
      >
        {/* Reel Container with Mask */}
        <div
          ref={reelRef}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          {/* Numbers Stack */}
          <div
            className="flex flex-col items-center justify-center"
            data-reel-container="true"
            style={{
              willChange: "transform",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                ref={(el) => {
                  if (el && numbersRef.current) {
                    numbersRef.current[index] = el;
                  }
                }}
                className="font-semibold leading-none select-none text-white tracking-tight"
                style={{
                  height: "clamp(120px, 18vw, 220px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(72px, 12vw, 168px)",
                }}
              >
                {stat.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Left Text Content Component
 * Shows label and progress indicator on the left
 */
const LeftTextContent = ({
  stats,
  activeIndex,
  countRef,
}: {
  stats: StatItem[];
  activeIndex: number;
  countRef: React.RefObject<HTMLSpanElement | null>;
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center md:items-start">
      <div className="text-xs md:text-sm uppercase tracking-wider text-[#ff6b35] font-medium text-center md:text-left">
        Impact Highlights
      </div>
      <div className="mt-3 flex items-center gap-3 text-sm md:text-base text-white/90 font-medium tracking-[0.2em]">
        <span ref={countRef} className="inline-block">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="text-white/50">•</span>
        <span className="text-white/70">
          {String(stats.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

/**
 * Right Text Content Component
 * Shows description on the right
 */
const RightTextContent = ({
  stats,
  rightTextRefs,
}: {
  stats: StatItem[];
  rightTextRefs: React.RefObject<HTMLDivElement[]>;
}) => {
  return (
    <div className="relative w-full h-full" style={{ minHeight: "200px" }}>
      {stats.map((stat, index) => (
        <div
          key={stat.id}
          ref={(el) => {
            if (el && rightTextRefs.current) {
              rightTextRefs.current[index] = el;
            }
          }}
          className="absolute inset-0 w-full flex flex-col justify-center items-center md:items-end opacity-0 pointer-events-none"
          style={{
            zIndex: index,
            visibility: index === 0 ? "visible" : "hidden",
          }}
        >
          {/* Description */}
          <div className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-md text-center md:text-right">
            {stat.desc}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * StatsScroll Component
 * Professional sticky scroll-triggered counter reel animation
 */
export const StatsScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement[]>([]);
  const rightTextRefs = useRef<HTMLDivElement[]>([]);
  const leftCountRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const gridContainer = gridContainerRef.current;
    const reel = reelRef.current;
    const numbers = numbersRef.current.filter(Boolean);
    const rightTexts = rightTextRefs.current.filter(Boolean);

    if (!container || !sticky || !gridContainer || !reel || numbers.length === 0 || rightTexts.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop and Tablet (>= 768px)
    mm.add("(min-width: 768px)", () => {
      const gap = 96; // Navbar gap
      // Match TextReveal scroll distance for natural transition
      const scrollDistance = "+=160%"; // Same as TextReveal for smooth natural scroll

      // Calculate equal spacing for maintaining position when pin releases (like TextReveal)
      let equalSpacing = 0;
      const calculateSpacing = () => {
        if (gridContainer && sticky) {
          const containerHeight = window.innerHeight - gap;
          const gridRect = gridContainer.getBoundingClientRect();
          const gridHeight = gridRect.height;
          equalSpacing = Math.max(32, (containerHeight - gridHeight) / 2); // Minimum 2rem (32px)
        }
      };

      // Calculate the height of each number based on actual layout
      const numberHeight = numbers[0]?.getBoundingClientRect().height || 120;

      const reelContainer = reel.querySelector('[data-reel-container="true"]') as HTMLElement;
      const baseOffset = ((STATS.length - 1) * numberHeight) / 2;

      // Set initial position - first number centered
      if (reelContainer) {
        gsap.set(reelContainer, {
          y: baseOffset,
          force3D: true,
        });
      }

      // Set initial text states - all hidden except first
      rightTexts.forEach((text, idx) => {
        if (!text) return;
        if (idx === 0) {
          // First text - visible
          gsap.set(text, {
            autoAlpha: 1,
            y: 0,
            x: 0,
            pointerEvents: "auto",
            visibility: "visible",
          });
        } else {
          // All other texts - completely hidden
          gsap.set(text, {
            autoAlpha: 0,
            y: 20,
            x: 0,
            pointerEvents: "none",
            visibility: "hidden",
          });
        }
      });

      // Pin the sticky container - starts when section top reaches navbar bottom
      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: scrollDistance,
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
            paddingTop: "0", // No padding - grid has its own padding
            paddingBottom: "0", // No padding - grid has its own padding
            alignItems: "center", // Ensure center alignment
            justifyContent: "center", // Maintain horizontal centering
            willChange: "transform",
          });
          // Reset grid container margins and height (like TextReveal resets text element)
          if (gridContainer) {
            gsap.set(gridContainer, {
              height: "100%", // Reset to full height
              minHeight: "100%", // Reset min-height
              marginTop: "0",
              marginBottom: "0",
            });
          }
          // Calculate spacing when entering
          setTimeout(() => {
            calculateSpacing();
          }, 100);
        },
        onEnterBack: () => {
          // Set exact height for perfect centering (viewport minus navbar gap)
          gsap.set(sticky, {
            top: `${gap}px`,
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            paddingTop: "0", // No padding - grid has its own padding
            paddingBottom: "0", // No padding - grid has its own padding
            alignItems: "center", // Ensure center alignment
            justifyContent: "center", // Maintain horizontal centering
            willChange: "transform",
          });
          // Reset grid container margins and height (like TextReveal resets text element)
          if (gridContainer) {
            gsap.set(gridContainer, {
              height: "100%", // Reset to full height
              minHeight: "100%", // Reset min-height
              marginTop: "0",
              marginBottom: "0",
            });
          }
          // Recalculate spacing when entering back
          setTimeout(() => {
            calculateSpacing();
          }, 100);
        },
        onLeave: () => {
          // Pin releases - maintain exact same visual position (like TextReveal)
          // Recalculate spacing to ensure accuracy
          calculateSpacing();
          
          // Hide scroll indicator to prevent UI overlap with next section
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              autoAlpha: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
          
          // Use requestAnimationFrame to ensure DOM is ready and prevent jumping
          requestAnimationFrame(() => {
            // Maintain container height
          gsap.set(sticky, {
            willChange: "auto",
              height: `calc(100vh - ${gap}px)`, // Maintain same height
              minHeight: `calc(100vh - ${gap}px)`, // Maintain same min-height
              paddingTop: "0", // Remove padding - use margin on grid instead
              paddingBottom: "0", // Remove padding - use margin on grid instead
              alignItems: "flex-start", // Use flex-start to control exact position
              justifyContent: "center", // Maintain horizontal centering
            });
            
            // Position grid with equal top and bottom margins using stored spacing
            // Remove full height constraint (like TextReveal sets minHeight: auto on text element)
            if (gridContainer && equalSpacing > 0) {
              gsap.set(gridContainer, {
                height: "auto", // Remove full height constraint (override h-full class, same as TextReveal sets minHeight: auto)
                minHeight: "auto", // Remove min-height constraint
                marginTop: `${equalSpacing}px`, // Equal spacing from top
                marginBottom: `${equalSpacing}px`, // Equal spacing from bottom
              });
            }
          });
        },
        onLeaveBack: () => {
          // When scrolling back, reset to sticky state (like TextReveal)
          gsap.set(sticky, {
            willChange: "auto",
            position: "sticky",
            top: `${gap}px`,
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            paddingTop: "0", // Reset to no padding
            paddingBottom: "0", // Reset to no padding
            alignItems: "center", // Reset to center alignment
            justifyContent: "center", // Maintain horizontal centering
          });
          // Reset grid container margins and height (like TextReveal resets text element)
          if (gridContainer) {
            gsap.set(gridContainer, {
              height: "100%", // Reset to full height
              minHeight: "100%", // Reset min-height
              marginTop: "0",
              marginBottom: "0",
            });
          }
          // Show scroll indicator again when scrolling back
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              autoAlpha: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
      });
      scrollTriggersRef.current.push(pinTrigger);

      // Create timeline for reel animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: scrollDistance,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }

      // Animate reel movement - keep in sync with text and count
      const reelContainerEl = reel.querySelector('[data-reel-container="true"]') as HTMLElement;
      
      if (reelContainerEl) {
        // Animation completes at ~75% of timeline (like TextReveal)
        const reelEnd = 0.75;
        // Calculate final position (last number centered)
        const lastIndex = STATS.length - 1;
        const finalY = baseOffset - lastIndex * numberHeight;

        // Animation completes at 75% to allow natural scroll transition
        tl.to(reelContainerEl, {
          y: finalY,
          ease: "none",
          force3D: true,
          duration: reelEnd,
        }, 0);
      }

      // Animate text transitions - clean cross-fade with NO overlap
      // Text animations complete at ~75% of timeline (like TextReveal)
      const textAnimationEnd = 0.75;
      const fadeDuration = 0.16; // Duration for fade out/in
      const textStep = textAnimationEnd / (STATS.length - 1);
      
      STATS.forEach((stat, index) => {
        if (index === 0) return; // First text is already visible

        const rightTextElement = rightTexts[index];
        const prevRightText = rightTexts[index - 1];

        if (!rightTextElement || !prevRightText) return;

        // Calculate transition point - each stat gets equal time
        const transitionPoint = textStep * index;
        const fadeOutStart = transitionPoint - fadeDuration; // Start fade out
        const fadeOutEnd = transitionPoint; // Complete fade out (old text 100% gone)
        const fadeInStart = transitionPoint; // Start fade in (new text appears)

        // STEP 1: Fade out previous text completely (old text disappears)
        tl.to(
          prevRightText,
          {
            autoAlpha: 0,
            y: -12,
            duration: fadeDuration,
            ease: "power2.in",
            force3D: true,
          },
          fadeOutStart
        );

        // STEP 2: Ensure previous text is 100% hidden and disabled BEFORE new text appears
        tl.set(
          prevRightText,
          {
            autoAlpha: 0,
            y: -12,
            pointerEvents: "none",
            visibility: "hidden", // Completely remove from rendering
          },
          fadeOutEnd
        );

        // STEP 3: Set new text initial state (ready to fade in, but still hidden)
        tl.set(
          rightTextElement,
          {
            autoAlpha: 0,
            y: 12,
            pointerEvents: "none",
            visibility: "visible", // Make it renderable but transparent
          },
          fadeOutEnd // At the exact moment previous is gone
        );

        // STEP 4: Fade in new text smoothly (new text appears)
        tl.to(
          rightTextElement,
          {
            autoAlpha: 1,
            y: 0,
            duration: fadeDuration,
            ease: "power2.out",
            force3D: true,
            onStart: () => {
              if (rightTextElement) {
                rightTextElement.style.pointerEvents = "auto";
              }
            },
          },
          fadeInStart // Start immediately after previous is gone
        );
      });

      // Ensure last text stays visible during transition period (end hold)
      const lastIndex = STATS.length - 1;
      if (rightTexts[lastIndex]) {
        tl.set(rightTexts[lastIndex], {
          autoAlpha: 1,
          y: 0,
          x: 0,
          pointerEvents: "auto",
          visibility: "visible",
        }, textAnimationEnd);
        
        // Ensure all other texts are completely hidden and disabled
        rightTexts.forEach((text, idx) => {
          if (idx !== lastIndex && text) {
            tl.set(text, {
              autoAlpha: 0,
              y: -12,
              x: 0,
              pointerEvents: "none",
              visibility: "hidden",
            }, textAnimationEnd);
          }
        });
      }
      
      // No fade-out - section scrolls away naturally, just like TextReveal

      // Update active index for tracking (optional, for React state if needed)
      const updateTrigger = ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: scrollDistance,
        scrub: 1.2,
        onUpdate: (self) => {
          if (!reelContainerEl) return;
          const reelY = Number(gsap.getProperty(reelContainerEl, "y")) || 0;
          const newIndex = Math.min(
            Math.round((baseOffset - reelY) / numberHeight),
            STATS.length - 1
          );
          setActiveIndex((prev) => (prev === newIndex ? prev : newIndex));
        },
      });
      scrollTriggersRef.current.push(updateTrigger);
    });

    // Mobile (< 768px)
    mm.add("(max-width: 767px)", () => {
      const gap = 88; // Mobile navbar gap
      // Match TextReveal scroll distance for natural transition
      const scrollDistance = "+=157%"; // Same as TextReveal for smooth natural scroll

      // Calculate equal spacing for maintaining position when pin releases (like TextReveal)
      let equalSpacingMobile = 0;
      const calculateSpacingMobile = () => {
        if (gridContainer && sticky) {
          const containerHeight = window.innerHeight - gap;
          const gridRect = gridContainer.getBoundingClientRect();
          const gridHeight = gridRect.height;
          equalSpacingMobile = Math.max(32, (containerHeight - gridHeight) / 2); // Minimum 2rem (32px)
        }
      };

      const numberHeight = numbers[0]?.getBoundingClientRect().height || 120;

      // Set initial position
      const reelContainerMobile = reel.querySelector('[data-reel-container="true"]') as HTMLElement;
      const baseOffset = ((STATS.length - 1) * numberHeight) / 2;
      if (reelContainerMobile) {
        gsap.set(reelContainerMobile, {
          y: baseOffset,
          force3D: true,
        });
      }

      // Set initial text states - all hidden except first
      rightTexts.forEach((text, idx) => {
        if (!text) return;
        if (idx === 0) {
          // First text - visible
          gsap.set(text, {
            autoAlpha: 1,
            y: 0,
            x: 0,
            pointerEvents: "auto",
            visibility: "visible",
          });
        } else {
          // All other texts - completely hidden
          gsap.set(text, {
            autoAlpha: 0,
            y: 20,
            x: 0,
            pointerEvents: "none",
            visibility: "hidden",
          });
        }
      });

      // Pin the sticky container - starts when section top reaches navbar bottom
      const pinTriggerMobile = ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: scrollDistance,
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
            paddingTop: "0", // No padding - grid has its own padding
            paddingBottom: "0", // No padding - grid has its own padding
            alignItems: "center", // Ensure center alignment
            justifyContent: "center", // Maintain horizontal centering
            willChange: "transform",
          });
          // Reset grid container margins and height (like TextReveal resets text element)
          if (gridContainer) {
            gsap.set(gridContainer, {
              height: "100%", // Reset to full height
              minHeight: "100%", // Reset min-height
              marginTop: "0",
              marginBottom: "0",
            });
          }
          // Calculate spacing when entering
          setTimeout(() => {
            calculateSpacingMobile();
          }, 100);
        },
        onEnterBack: () => {
          // Set exact height for perfect centering (viewport minus navbar gap)
          gsap.set(sticky, {
            top: `${gap}px`,
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            paddingTop: "0", // No padding - grid has its own padding
            paddingBottom: "0", // No padding - grid has its own padding
            alignItems: "center", // Ensure center alignment
            justifyContent: "center", // Maintain horizontal centering
            willChange: "transform",
          });
          // Reset grid container margins and height (like TextReveal resets text element)
          if (gridContainer) {
            gsap.set(gridContainer, {
              height: "100%", // Reset to full height
              minHeight: "100%", // Reset min-height
              marginTop: "0",
              marginBottom: "0",
            });
          }
          // Recalculate spacing when entering back
          setTimeout(() => {
            calculateSpacingMobile();
          }, 100);
        },
        onLeave: () => {
          // Pin releases - maintain exact same visual position (like TextReveal)
          // Recalculate spacing to ensure accuracy
          calculateSpacingMobile();
          
          // Hide scroll indicator to prevent UI overlap with next section
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              autoAlpha: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
          
          // Use requestAnimationFrame to ensure DOM is ready and prevent jumping
          requestAnimationFrame(() => {
            // Maintain container height
          gsap.set(sticky, {
            willChange: "auto",
              height: `calc(100vh - ${gap}px)`, // Maintain same height
              minHeight: `calc(100vh - ${gap}px)`, // Maintain same min-height
              paddingTop: "0", // Remove padding - use margin on grid instead
              paddingBottom: "0", // Remove padding - use margin on grid instead
              alignItems: "flex-start", // Use flex-start to control exact position
              justifyContent: "center", // Maintain horizontal centering
            });
            
            // Position grid with equal top and bottom margins using stored spacing
            // Remove full height constraint (like TextReveal sets minHeight: auto on text element)
            if (gridContainer && equalSpacingMobile > 0) {
              gsap.set(gridContainer, {
                height: "auto", // Remove full height constraint (override h-full class, same as TextReveal sets minHeight: auto)
                minHeight: "auto", // Remove min-height constraint
                marginTop: `${equalSpacingMobile}px`, // Equal spacing from top
                marginBottom: `${equalSpacingMobile}px`, // Equal spacing from bottom
              });
            }
          });
        },
        onLeaveBack: () => {
          // When scrolling back, reset to sticky state (like TextReveal)
          gsap.set(sticky, {
            willChange: "auto",
            position: "sticky",
            top: `${gap}px`,
            height: `calc(100vh - ${gap}px)`,
            minHeight: `calc(100vh - ${gap}px)`,
            paddingTop: "0", // Reset to no padding
            paddingBottom: "0", // Reset to no padding
            alignItems: "center", // Reset to center alignment
            justifyContent: "center", // Maintain horizontal centering
          });
          // Reset grid container margins and height (like TextReveal resets text element)
          if (gridContainer) {
            gsap.set(gridContainer, {
              height: "100%", // Reset to full height
              minHeight: "100%", // Reset min-height
              marginTop: "0",
              marginBottom: "0",
            });
          }
          // Show scroll indicator again when scrolling back
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              autoAlpha: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
      });
      scrollTriggersRef.current.push(pinTriggerMobile);

      // Create timeline for mobile
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: scrollDistance,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }

      // Animate reel movement - keep in sync with text and count (mobile)
      const reelContainerMobileEl = reel.querySelector('[data-reel-container="true"]') as HTMLElement;
      
      if (reelContainerMobileEl) {
        // Animation completes at ~70% of timeline (like TextReveal mobile)
        const reelEnd = 0.7;
        // Calculate final position (last number centered)
        const lastIndex = STATS.length - 1;
        const finalY = baseOffset - lastIndex * numberHeight;
        
        // Animation completes at 70% to allow natural scroll transition
        tl.to(reelContainerMobileEl, {
          y: finalY,
          ease: "none",
          force3D: true,
          duration: reelEnd,
        }, 0);
      }

      // Animate text transitions for mobile - clean cross-fade with NO overlap
      // Text animations complete at ~70% of timeline (like TextReveal mobile)
      const textAnimationEndMobile = 0.7;
      const fadeDurationMobile = 0.16; // Duration for fade out/in
      const textStepMobile = textAnimationEndMobile / (STATS.length - 1);
      
      STATS.forEach((stat, index) => {
        if (index === 0) return; // First text is already visible

        const rightTextElement = rightTexts[index];
        const prevRightText = rightTexts[index - 1];

        if (!rightTextElement || !prevRightText) return;

        // Calculate transition point - each stat gets equal time
        const transitionPoint = textStepMobile * index;
        const fadeOutStart = transitionPoint - fadeDurationMobile; // Start fade out
        const fadeOutEnd = transitionPoint; // Complete fade out (old text 100% gone)
        const fadeInStart = transitionPoint; // Start fade in (new text appears)

        // STEP 1: Fade out previous text completely (old text disappears)
        tl.to(
          prevRightText,
          {
            autoAlpha: 0,
            y: -12,
            duration: fadeDurationMobile,
            ease: "power2.in",
            force3D: true,
          },
          fadeOutStart
        );

        // STEP 2: Ensure previous text is 100% hidden and disabled BEFORE new text appears
        tl.set(
          prevRightText,
          {
            autoAlpha: 0,
            y: -12,
            pointerEvents: "none",
            visibility: "hidden", // Completely remove from rendering
          },
          fadeOutEnd
        );

        // STEP 3: Set new text initial state (ready to fade in, but still hidden)
        tl.set(
          rightTextElement,
          {
            autoAlpha: 0,
            y: 12,
            pointerEvents: "none",
            visibility: "visible", // Make it renderable but transparent
          },
          fadeOutEnd // At the exact moment previous is gone
        );

        // STEP 4: Fade in new text smoothly (new text appears)
        tl.to(
          rightTextElement,
          {
            autoAlpha: 1,
            y: 0,
            duration: fadeDurationMobile,
            ease: "power2.out",
            force3D: true,
            onStart: () => {
              if (rightTextElement) {
                rightTextElement.style.pointerEvents = "auto";
              }
            },
          },
          fadeInStart // Start immediately after previous is gone
        );
      });

      // Ensure last text stays visible during transition period (end hold)
      const lastIndex = STATS.length - 1;
      if (rightTexts[lastIndex]) {
        tl.set(rightTexts[lastIndex], {
          autoAlpha: 1,
          y: 0,
          pointerEvents: "auto",
          visibility: "visible",
        }, textAnimationEndMobile);
        
        // Ensure all other texts are completely hidden and disabled
        rightTexts.forEach((text, idx) => {
          if (idx !== lastIndex && text) {
            tl.set(text, {
              autoAlpha: 0,
              pointerEvents: "none",
              visibility: "hidden",
              y: -12,
            }, textAnimationEndMobile);
          }
        });
      }
      
      // No fade-out - section scrolls away naturally, just like TextReveal

      // Update active index for tracking (optional, for React state if needed)
      const updateTriggerMobile = ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: scrollDistance,
        scrub: 1.2,
        onUpdate: (self) => {
          if (!reelContainerMobileEl) return;
          const reelY = Number(gsap.getProperty(reelContainerMobileEl, "y")) || 0;
          const newIndex = Math.min(
            Math.round((baseOffset - reelY) / numberHeight),
            STATS.length - 1
          );
          setActiveIndex((prev) => (prev === newIndex ? prev : newIndex));
        },
      });
      scrollTriggersRef.current.push(updateTriggerMobile);
    });

    ScrollTrigger.refresh();

    return () => {
      // Only kill ScrollTriggers created by this component
      scrollTriggersRef.current.forEach((trigger) => {
        if (trigger) {
          trigger.kill();
        }
      });
      scrollTriggersRef.current = [];
      mm.revert();
    };
  }, []);

  useEffect(() => {
    if (!leftCountRef.current) return;
    gsap.fromTo(
      leftCountRef.current,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }
    );
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-hidden"
      style={{
        height: "250vh", // Match TextReveal height for natural scroll transition
        minHeight: "250vh",
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-[88px] lg:top-[96px] w-full overflow-hidden bg-[#050505] text-white"
        style={{
          height: "calc(100vh - 88px)",
          minHeight: "calc(100vh - 88px)",
          willChange: "transform",
          isolation: "isolate",
        }}
      >
        {/* Full width container - no side padding */}
        <div className="h-full relative w-full max-w-[1920px] mx-auto">
          {/* Main Content Grid - Full width with internal spacing only */}
          <div 
            ref={gridContainerRef}
            className="h-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 py-12 md:py-16 px-8 md:px-12 lg:px-16 xl:px-20"
          >
            {/* Left Column - Label & Progress (Desktop) / Top (Mobile) */}
            <div className="md:col-span-3 flex items-center justify-center md:justify-start">
              <LeftTextContent
                stats={STATS}
                activeIndex={activeIndex}
                countRef={leftCountRef}
              />
            </div>

            {/* Center Column - Number Reel in White Pill */}
            <div className="md:col-span-6 flex items-center justify-center order-2 md:order-none">
              <NumberReel
                stats={STATS}
                reelRef={reelRef}
                numbersRef={numbersRef}
              />
            </div>

            {/* Right Column - Description (Desktop) / Bottom (Mobile) */}
            <div className="md:col-span-3 flex items-center justify-center md:justify-end order-3">
              <RightTextContent
                stats={STATS}
                rightTextRefs={rightTextRefs}
              />
            </div>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator indicatorRef={scrollIndicatorRef} />
        </div>
      </div>
    </div>
  );
};
