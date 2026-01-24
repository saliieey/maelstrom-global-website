"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const HeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    // Register ScrollTrigger plugin only on client side
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;
    const leftContent = leftContentRef.current;
    const rightContent = rightContentRef.current;

    // Ensure we're on client side
    if (typeof window === "undefined") return;

    if (!container || !sticky || !videoWrapper || !video || !leftContent || !rightContent) return;

    // Use matchMedia for responsive breakpoints
    const mm = gsap.matchMedia();
    
    // Immediately set mobile styles to prevent flash of incorrect layout
    // This ensures consistent alignment on first render before matchMedia runs
    if (window.innerWidth < 768) {
      // Set container padding immediately to prevent layout shift
      gsap.set(sticky, {
        paddingLeft: "0",
        paddingRight: "0",
      });
      // Set video wrapper and content widths immediately
      gsap.set(videoWrapper, {
        width: "90vw",
        margin: "0 auto",
        position: "relative",
      });
      gsap.set(leftContent, {
        width: "90vw",
        margin: "1.5rem auto",
      });
      gsap.set(rightContent, {
        width: "90vw",
        margin: "1.5rem auto",
      });
    }

    // Tablet (768px - 1023px) - Similar to desktop but with reduced sizes
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      // Calculate gap for tablet: Matches top gap (24px) for symmetry
      const gap = 88;
      
      // Calculate viewport height minus navbar gap to ensure full video visibility
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - gap;
      
      // Set initial state: video wrapper centered vertically (Mastercard style)
      gsap.set(videoWrapper, {
        width: "100%",
        height: `${availableHeight}px`,
        borderRadius: "20px",
        position: "absolute",
        top: "50%", // Center vertically
        left: "50%",
        xPercent: -50,
        yPercent: -50, // Center vertically
        overflow: "hidden",
        scale: 1,
      });

      // Set initial state for text content - starts from below, animates up to center position beside video card
      gsap.set(leftContent, {
        position: "absolute",
        left: "3%",
        top: "50%", // Center vertically with video card
        yPercent: -50, // Center vertically (like video card)
        width: "25%",
        maxWidth: "300px",
        zIndex: 10,
        y: 200, // Start from below (positive y moves down from center)
        autoAlpha: 0,
      });

      gsap.set(rightContent, {
        position: "absolute",
        right: "3%",
        top: "50%", // Center vertically with video card
        yPercent: -50, // Center vertically (like video card)
        width: "25%",
        maxWidth: "300px",
        zIndex: 10,
        y: 200, // Start from below (positive y moves down from center)
        autoAlpha: 0,
      });
      
      // Increased scroll distance to ensure animation completes fully before next section
      // Extended significantly to give proper hold time after text reaches center
      const scrollDistance = "+=300%";
      
      // Create timeline for smooth animation FIRST
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: scrollDistance,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }

      // Pin the sticky container - AFTER timeline
      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: scrollDistance,
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.set(sticky, { top: `${gap}px`, willChange: "transform" });
        },
        onEnterBack: () => {
          gsap.set(sticky, { top: `${gap}px`, willChange: "transform" });
        },
        onLeave: () => {
          // Smooth transition when leaving pinned state - lock final states
          gsap.set(sticky, { 
            willChange: "auto",
            clearProps: "transform"
          });
          // Lock final states for video and text
          gsap.set([leftContent, rightContent], {
            autoAlpha: 1,
            y: 0,
            clearProps: "willChange"
          });
          gsap.set(videoWrapper, {
            clearProps: "willChange"
          });
        },
        onLeaveBack: () => {
          gsap.set(sticky, { 
            willChange: "auto",
            position: "sticky",
            top: `${gap}px`
          });
        },
        onUpdate: (self) => {
          if (self.isActive) {
            gsap.set(sticky, { top: `${gap}px` });
          }
        },
      });
      scrollTriggersRef.current.push(pinTrigger);

      // Step 1: Shrink video wrapper - smaller scale for tablet (40%)
      // Video shrinks first, completes around 50% of scroll
      tl.to(videoWrapper, {
        scale: 0.4,
        borderRadius: "24px",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        top: "50%",
        ease: "none",
        force3D: true,
        willChange: "transform",
        duration: 0.5, // Video animation completes at 50% of timeline
      }, 0);

      // Ensure final state is locked at the end to prevent jump
      tl.call(() => {
        gsap.set(videoWrapper, { clearProps: "willChange" });
      }, undefined, 1);

      // Step 2: Reveal text content - animate from below to center position beside video card
      // Text animation starts after video finishes shrinking (45%) and completes at 65% of scroll
      // Then holds from 65% to 90% before next section starts
      tl.to(leftContent, {
        autoAlpha: 1,
        y: 0, // Move up to exact center position (from y: 200) - centered vertically with video card
        ease: "none", // Smooth scrubbing tied to scroll
        force3D: true,
        duration: 0.2, // Text animation completes at 65% (45% + 20%)
      }, 0.45); // Start at 45% - slightly before video fully completes for smoother transition

      tl.to(rightContent, {
        autoAlpha: 1,
        y: 0, // Move up to exact center position (from y: 200) - centered vertically with video card
        ease: "none", // Smooth scrubbing tied to scroll
        force3D: true,
        duration: 0.2, // Text animation completes at 65% (45% + 20%)
      }, 0.45); // Start at 45% - slightly before video fully completes for smoother transition
      
      // Lock final position at 65% - ensures text is completely centered beside video card
      // Text animation completes at 65% (45% start + 20% duration)
      // Hold from 65% to 90% (25% of scroll) before allowing next section to start
      tl.set([leftContent, rightContent], {
        y: 0,
        autoAlpha: 1,
      }, 0.65); // Lock final position - text fully reached at exact center beside video card
      
      // Maintain hold state from 65% to 90% - ensures hero section is completely finished
      tl.to([leftContent, rightContent], {
        y: 0,
        autoAlpha: 1,
        duration: 0.25, // Hold for 25% of scroll (65% to 90%)
      }, 0.65);
    });

    // Desktop (>= 1024px) - Full desktop experience
    mm.add("(min-width: 1024px)", () => {
      // Calculate gap for desktop: Navbar at top-6 (24px) + navbar height (48px) + gap (24px) = 96px
      const gap = 96;
      
      // Calculate viewport height minus navbar gap to ensure full video visibility
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - gap;
      
      // Set initial state: video wrapper centered vertically in viewport (Mastercard style)
      gsap.set(videoWrapper, {
        width: "100%",
        height: `${availableHeight}px`,
        borderRadius: "20px",
        position: "absolute",
        top: "50%", // Center vertically
        left: "50%",
        xPercent: -50,
        yPercent: -50, // Center vertically
        overflow: "hidden",
        scale: 1,
      });

      // Set initial state for text content - starts from below, animates up to center position beside video card
      gsap.set(leftContent, {
        position: "absolute",
        left: "5%",
        top: "50%", // Center vertically with video card
        yPercent: -50, // Center vertically (like video card)
        width: "28%",
        maxWidth: "400px",
        zIndex: 10,
        y: 250, // Start from below (positive y moves down from center)
        autoAlpha: 0,
      });

      gsap.set(rightContent, {
        position: "absolute",
        right: "5%",
        top: "50%", // Center vertically with video card
        yPercent: -50, // Center vertically (like video card)
        width: "28%",
        maxWidth: "400px",
        zIndex: 10,
        y: 250, // Start from below (positive y moves down from center)
        autoAlpha: 0,
      });

      // Increased scroll distance to ensure animation completes fully before next section
      // Extended significantly to give proper hold time after text reaches center
      const scrollDistance = "+=300%";
      
      // Update video height on resize to maintain proper fit
      const updateVideoHeight = () => {
        const newViewportHeight = window.innerHeight;
        const newAvailableHeight = newViewportHeight - gap;
        gsap.set(videoWrapper, {
          height: `${newAvailableHeight}px`,
        });
        ScrollTrigger.refresh();
      };
      
      const resizeHandler = () => updateVideoHeight();
      resizeHandlerRef.current = resizeHandler;
      window.addEventListener("resize", resizeHandler);
      
      // Create timeline for smooth animation FIRST (before pinning)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: scrollDistance,
          scrub: 1, // Smooth scrubbing with slight delay for better performance
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculate on resize
        },
      });
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }

      // Pin the sticky container during animation - AFTER timeline to avoid conflicts
      const pinTriggerDesktop = ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: scrollDistance,
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.set(sticky, { top: `${gap}px`, willChange: "transform" });
        },
        onEnterBack: () => {
          gsap.set(sticky, { top: `${gap}px`, willChange: "transform" });
        },
        onLeave: () => {
          // Smooth transition when leaving pinned state - ensure final state is set
          // Keep sticky positioning but remove transform to prevent jump
          gsap.set(sticky, { 
            willChange: "auto",
            clearProps: "transform"
          });
        },
        onLeaveBack: () => {
          gsap.set(sticky, { 
            willChange: "auto",
            position: "sticky",
            top: `${gap}px`
          });
        },
        onUpdate: (self) => {
          if (self.isActive) {
            gsap.set(sticky, { top: `${gap}px` });
          }
        },
      });
      scrollTriggersRef.current.push(pinTriggerDesktop);

      // Step 1: Shrink video wrapper and position it in center - smooth animation
      // Video shrinks first, completes around 50% of scroll
      tl.to(videoWrapper, {
        scale: 0.316703,
        clipPath: "inset(12px 153.718px round 26px)",
        borderRadius: "26px",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        top: "50%",
        ease: "none",
        force3D: true, // Use GPU acceleration for smoother animation
        willChange: "transform, clip-path",
        duration: 0.5, // Video animation completes at 50% of timeline
      }, 0);

      // Ensure final state is locked at the end to prevent jump
      tl.call(() => {
        // Lock final positions to prevent any jump when pinning ends
        gsap.set(videoWrapper, { clearProps: "willChange" });
      }, undefined, 1);

      // Step 2: Reveal text content - animate from below to center position beside video card
      // Text animation starts after video finishes shrinking (45%) and completes at 65% of scroll
      // Then holds from 65% to 90% before next section starts
      tl.to(leftContent, {
        autoAlpha: 1,
        y: 0, // Move up to exact center position (from y: 200) - centered vertically with video card
        ease: "none", // Smooth scrubbing tied to scroll
        force3D: true,
        duration: 0.2, // Text animation completes at 65% (45% + 20%)
      }, 0.45); // Start at 45% - slightly before video fully completes for smoother transition

      tl.to(rightContent, {
        autoAlpha: 1,
        y: 0, // Move up to exact center position (from y: 200) - centered vertically with video card
        ease: "none", // Smooth scrubbing tied to scroll
        force3D: true,
        duration: 0.2, // Text animation completes at 65% (45% + 20%)
      }, 0.45); // Start at 45% - slightly before video fully completes for smoother transition
      
      // Lock final position at 65% - ensures text is completely centered beside video card
      // Text animation completes at 65% (45% start + 20% duration)
      // Hold from 65% to 90% (25% of scroll) before allowing next section to start
      tl.set([leftContent, rightContent], {
        y: 0,
        autoAlpha: 1,
      }, 0.65); // Lock final position - text fully reached at exact center beside video card
      
      // Maintain hold state from 65% to 90% - ensures hero section is completely finished
      tl.to([leftContent, rightContent], {
        y: 0,
        autoAlpha: 1,
        duration: 0.25, // Hold for 25% of scroll (65% to 90%)
      }, 0.65);
    });

    // Mobile (< 768px) - Static layout like Mastercard (no scroll animation)
    mm.add("(max-width: 767px)", () => {
      // Video wrapper: Static card size from the start (no animation) - Match navbar width (90vw)
      gsap.set(videoWrapper, {
        width: "90vw",
        height: "auto",
        borderRadius: "24px",
        position: "relative",
        margin: "0 auto",
        top: "auto",
        left: "auto",
        xPercent: 0,
        overflow: "hidden",
        scale: 1,
      });

      // Left content: Visible above video, static position with standard spacing - Match navbar width (90vw)
      gsap.set(leftContent, {
        position: "relative",
        display: "block",
        width: "90vw",
        maxWidth: "none",
        margin: "1.5rem auto 1.5rem auto", // 24px top and bottom to match navbar gap
        paddingTop: "0",
        paddingBottom: "0",
        top: "auto",
        left: "auto",
        yPercent: 0,
        y: 0,
        autoAlpha: 1,
        zIndex: 1,
      });

      // Right content: Visible below video, static position with standard spacing - Match navbar width (90vw)
      gsap.set(rightContent, {
        position: "relative",
        display: "block",
        width: "90vw",
        maxWidth: "none",
        margin: "1.5rem auto 1.5rem auto", // 24px top and bottom to match navbar gap
        paddingTop: "0",
        paddingBottom: "0",
        top: "auto",
        left: "auto",
        xPercent: 0,
        y: 0,
        autoAlpha: 1,
        zIndex: 1,
        textAlign: "left", // Left align on mobile for better readability
      });

      // No ScrollTrigger animation on mobile - static layout only
      // Matches top gap (24px) for perfect symmetry: navbar at top-6 (24px) + height (40px) + gap (24px) = 88px
      const mobileGap = 88; // Navbar bottom (24px top + 40px height) + 24px gap = 88px - matches top gap
      gsap.set(sticky, { top: `${mobileGap}px` });
    });

    // Refresh ScrollTrigger after setup to ensure proper calculations
    ScrollTrigger.refresh();
    
    // Store original resize handler (from desktop section) and combine with mobile handler
    const originalResizeHandler = resizeHandlerRef.current;
    
    // Create combined resize handler
    const combinedResizeHandler = () => {
      // Call original desktop handler if it exists
      if (originalResizeHandler) {
        originalResizeHandler();
      }
      
      // Maintain mobile alignment on resize
      if (window.innerWidth < 768) {
        gsap.set(sticky, {
          paddingLeft: "0",
          paddingRight: "0",
        });
        gsap.set(videoWrapper, {
          width: "90vw",
          margin: "0 auto",
        });
        gsap.set(leftContent, {
          width: "90vw",
          margin: "1.5rem auto",
        });
        gsap.set(rightContent, {
          width: "90vw",
          margin: "1.5rem auto",
        });
      }
    };
    
    // Replace or add resize handler
    if (originalResizeHandler) {
      // Remove old handler and add combined one
      window.removeEventListener("resize", originalResizeHandler);
    }
    window.addEventListener("resize", combinedResizeHandler);
    resizeHandlerRef.current = combinedResizeHandler;

    // Cleanup on unmount
    return () => {
      // Remove resize listener if it exists
      if (resizeHandlerRef.current) {
        window.removeEventListener("resize", resizeHandlerRef.current);
      }
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

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-transparent h-auto md:h-[300vh] md:min-h-[300vh]"
    >
      {/* Responsive height styles for sticky container */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Mobile: Allow container to expand to fit all content */
          @media (max-width: 1023px) {
            .hero-sticky-container {
              height: auto !important;
              min-height: calc(100vh - 88px) !important;
              padding-top: 0 !important;
              padding-bottom: 1.5rem !important; /* 24px to match consistent gap spacing */
              padding-left: 0 !important; /* Remove padding to align with navbar (90vw centered) */
              padding-right: 0 !important; /* Remove padding to align with navbar (90vw centered) */
            }
            /* Ensure all 90vw elements are properly centered on initial render */
            @media (max-width: 1023px) {
              .hero-sticky-container > div[class*="w-[90vw]"] {
                width: 90vw !important;
                margin-left: auto !important;
                margin-right: auto !important;
              }
            }
          }
          /* Desktop: Fixed height for scroll animation */
          @media (min-width: 1024px) {
            .hero-sticky-container {
              height: calc(100vh - 96px) !important;
              min-height: calc(100vh - 96px) !important;
              padding-bottom: 180px !important;
              padding-left: 1rem !important; /* Desktop: Restore padding */
              padding-right: 1rem !important; /* Desktop: Restore padding */
            }
          }
        `
      }} />
      <div
        ref={stickyRef}
        className="sticky top-[88px] lg:top-[96px] w-full overflow-visible relative z-0 hero-sticky-container"
        style={{ 
          paddingLeft: "0", // Mobile: No left padding - content is 90vw centered to match navbar
          paddingRight: "0", // Mobile: No right padding - content is 90vw centered to match navbar
          height: "auto", // Mobile: Auto height to fit all content (overridden by CSS for desktop)
          minHeight: "calc(100vh - 88px)", // Mobile: Minimum viewport height minus navbar and gap
          paddingTop: "0", // Mobile: No top padding - gap is handled by sticky positioning
          paddingBottom: "1.5rem", // Mobile: 24px bottom padding to match consistent gap spacing
          willChange: "transform", // Optimize for smooth scrolling
          isolation: "isolate", // Create new stacking context
          pointerEvents: "auto", // Ensure proper interaction
        }}
      >
        {/* Video Wrapper - This is what we animate - Mobile: w-[90vw] to match navbar */}
        <div
          ref={videoWrapperRef}
          className="relative w-[90vw] md:w-full md:h-full overflow-hidden mx-auto md:mx-0 border border-white/10"
          style={{ 
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            willChange: "transform, clip-path", // Optimize for smooth animation
          }}
        >
          {/* Video Element - Always maintains aspect ratio */}
          <video
            ref={videoRef}
            src="/assets/videos/hero-intro.mp4"
            className="w-full h-full object-cover"
            style={{ borderRadius: "inherit" }}
            muted
            playsInline
            loop
            autoPlay
          />
        </div>

        {/* Left Text Content - Hidden initially with CSS classes - Mobile: w-[90vw] to match navbar */}
        <div
          ref={leftContentRef}
          className="text-white text-left opacity-0 invisible w-[90vw] md:w-auto mx-auto"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#ff6b35] flex-shrink-0" />
            <div className="text-xs uppercase tracking-[0.2em] font-medium opacity-90">
              IMMERSIVE JOURNEY
            </div>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.3]">
            Discover what drives us to power economies and empower people.
          </div>
        </div>

        {/* Right Text Content - Hidden initially with CSS classes - Mobile: w-[90vw] to match navbar */}
        <div
          ref={rightContentRef}
          className="text-white text-left md:text-right opacity-0 invisible w-[90vw] md:w-auto mx-auto"
        >
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#ff6b35]">
                Trust
              </div>
              <div className="text-xs sm:text-sm md:text-base leading-relaxed opacity-90">
                Globally reliable, recognized, and rewarded
              </div>
            </div>
            <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
              <div className="text-xl md:text-2xl font-bold mb-2 text-[#ff6b35]">
                Inclusion
              </div>
              <div className="text-sm md:text-base leading-relaxed opacity-90">
                Diversity's boon, benefiting us all
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold mb-2 text-[#ff6b35]">
                Innovation
              </div>
              <div className="text-sm md:text-base leading-relaxed opacity-90">
                Elevating tech, sustainable solutions
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer at the end for proper gap before next section - Mastercard style spacing */}
      <div 
        className="w-full bg-transparent md:h-[600px] md:min-h-[600px]"
        style={{
          height: "40px", // Minimal gap for mobile - professional spacing
          minHeight: "40px",
        }}
      />
    </div>
  );
};
