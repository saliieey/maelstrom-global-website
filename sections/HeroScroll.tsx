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

    // Tablet (768px - 1023px) - Similar to desktop but with reduced sizes
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      // Set initial state: video wrapper full screen, centered
      gsap.set(videoWrapper, {
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        position: "absolute",
        top: 0,
        left: "50%",
        xPercent: -50,
        overflow: "hidden",
        scale: 1,
      });

      // Set initial state for text content - smaller widths for tablet
      gsap.set(leftContent, {
        position: "absolute",
        left: "3%",
        top: "50%",
        width: "25%",
        maxWidth: "300px",
        zIndex: 10,
        yPercent: -50,
        y: 200,
        autoAlpha: 0,
      });

      gsap.set(rightContent, {
        position: "absolute",
        right: "3%",
        top: "50%",
        width: "25%",
        maxWidth: "300px",
        zIndex: 10,
        yPercent: -50,
        y: 200,
        autoAlpha: 0,
      });

      // Calculate gap for tablet: Matches top gap (24px) for symmetry
      // Navbar at top-6 (24px) + navbar height (~48px) + gap (24px) = ~96px, using 88px for tighter fit
      const gap = 88;
      
      // Pin the sticky container
      ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: "+=300%",
        pin: sticky,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        onEnter: () => {
          gsap.set(sticky, { top: `${gap}px` });
        },
        onEnterBack: () => {
          gsap.set(sticky, { top: `${gap}px` });
        },
        onUpdate: (self) => {
          if (self.isActive) {
            gsap.set(sticky, { top: `${gap}px` });
          }
        },
      });

      // Create timeline for smooth animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: "+=300%",
          scrub: true,
        },
      });

      // Step 1: Shrink video wrapper - smaller scale for tablet (40% instead of 31.67%)
      tl.to(videoWrapper, {
        scale: 0.4,
        borderRadius: "24px",
        left: "50%",
        xPercent: -50,
        ease: "none",
      }, 0);

      // Step 2: Reveal text content (left and right simultaneously)
      tl.to(leftContent, {
        autoAlpha: 1,
        y: 0,
        ease: "none",
      }, 0.3);

      tl.to(rightContent, {
        autoAlpha: 1,
        y: 0,
        ease: "none",
      }, 0.3);
    });

    // Desktop (>= 1024px) - Full desktop experience
    mm.add("(min-width: 1024px)", () => {
      // Set initial state: video wrapper full screen, centered
      // borderRadius is set in inline style - ensure it's visible
      gsap.set(videoWrapper, {
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        position: "absolute",
        top: 0,
        left: "50%",
        xPercent: -50,
        overflow: "hidden",
        scale: 1,
        // Removed clipPath to ensure borderRadius is visible from start
      });

      // Set initial state for text content
      gsap.set(leftContent, {
        position: "absolute",
        left: "5%",
        top: "50%",
        width: "28%",
        maxWidth: "400px",
        zIndex: 10,
        yPercent: -50,
        y: 200,
        autoAlpha: 0,
      });

      gsap.set(rightContent, {
        position: "absolute",
        right: "5%",
        top: "50%",
        width: "28%",
        maxWidth: "400px",
        zIndex: 10,
        yPercent: -50,
        y: 200,
        autoAlpha: 0,
      });

      // Calculate gap for desktop: Navbar at top-6 (24px) + navbar height (48px) + gap (24px to match top gap) = 96px
      const gap = 96;
      
      // Pin the sticky container - start pinning when container reaches gap position
      ScrollTrigger.create({
        trigger: container,
        start: `top-=${gap} top`,
        end: "+=300%",
        pin: sticky,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        onEnter: () => {
          // Maintain gap when entering pinned state
          gsap.set(sticky, { top: `${gap}px` });
        },
        onEnterBack: () => {
          // Maintain gap when re-entering pinned state  
          gsap.set(sticky, { top: `${gap}px` });
        },
        onUpdate: (self) => {
          // Continuously maintain gap during scroll
          if (self.isActive) {
            gsap.set(sticky, { top: `${gap}px` });
          }
        },
      });

      // Create timeline for smooth animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top-=${gap} top`,
          end: "+=300%",
          scrub: true,
        },
      });

      // Step 1: Shrink video wrapper using scale and clip-path (exact Mastercard values)
      tl.to(videoWrapper, {
        scale: 0.316703,
        clipPath: "inset(12px 153.718px round 26px)",
        borderRadius: "26px",
        left: "50%",
        xPercent: -50,
        ease: "none",
      }, 0);

      // Step 3: Reveal text content (left and right simultaneously)
      tl.to(leftContent, {
        autoAlpha: 1,
        y: 0,
        ease: "none",
      }, 0.3);

      tl.to(rightContent, {
        autoAlpha: 1,
        y: 0,
        ease: "none",
      }, 0.3);
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
        margin: "2rem auto 2rem auto",
        paddingTop: "1rem",
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
        margin: "2rem auto 2rem auto",
        paddingTop: "2rem",
        paddingBottom: "1rem",
        top: "auto",
        left: "auto",
        xPercent: 0,
        y: 0,
        autoAlpha: 1,
        zIndex: 1,
        textAlign: "left", // Left align on mobile for better readability
      });

      // No ScrollTrigger animation on mobile - static layout only
      // Matches top gap (24px) for perfect symmetry: navbar at top-6 (24px) + height (~44px) + gap (24px) = ~92px
      // Using 88px for tighter, cleaner spacing
      const mobileGap = 88; // Matches the visual gap above navbar for symmetry
      gsap.set(sticky, { top: `${mobileGap}px` });
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "300vh" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-[88px] lg:top-[96px] w-full md:h-screen overflow-hidden relative"
        style={{ 
          paddingLeft: "1rem",
          paddingRight: "1rem",
          minHeight: "auto",
        }}
      >
        {/* Video Wrapper - This is what we animate - Mobile: w-[90vw] to match navbar */}
        <div
          ref={videoWrapperRef}
          className="w-[90vw] md:w-full md:h-full overflow-hidden mx-auto md:mx-0"
          style={{ 
            borderRadius: "20px",
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
    </div>
  );
};
