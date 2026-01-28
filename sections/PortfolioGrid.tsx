"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Portfolio Item Types with Aspect Ratios
 */
interface PortfolioItem {
  id: string;
  aspectRatio: "1:1" | "9:16" | "16:9" | "4:5";
  src: string;
  title?: string;
}

/**
 * PortfolioGrid Component
 * Grid layout matching reference design with mixed aspect ratios
 */
export const PortfolioGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // Portfolio items organized by rows to match reference layout exactly
  // Reference shows: Top row (1:1, 9:16, 9:16, 16:9), Middle row (16:9, 4:5, 9:16, 4:5), Bottom row (1:1, 1:1, 16:9)
  const topRow: PortfolioItem[] = [
    {
      id: "item-1",
      aspectRatio: "1:1",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1080&fit=crop",
    },
    {
      id: "item-2",
      aspectRatio: "9:16",
      src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1080&h=1920&fit=crop",
    },
    {
      id: "item-3",
      aspectRatio: "9:16",
      src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1080&h=1920&fit=crop",
    },
    {
      id: "item-4",
      aspectRatio: "16:9",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop",
    },
  ];

  const middleRow: PortfolioItem[] = [
    {
      id: "item-5",
      aspectRatio: "16:9",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    },
    {
      id: "item-6",
      aspectRatio: "4:5",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1350&fit=crop",
    },
    {
      id: "item-7",
      aspectRatio: "9:16",
      src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1080&h=1920&fit=crop",
    },
    {
      id: "item-8",
      aspectRatio: "4:5",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1080&h=1350&fit=crop",
    },
  ];

  const bottomRow: PortfolioItem[] = [
    {
      id: "item-9",
      aspectRatio: "1:1",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1080&fit=crop",
    },
    {
      id: "item-10",
      aspectRatio: "1:1",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1080&h=1080&fit=crop",
    },
    {
      id: "item-11",
      aspectRatio: "16:9",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    },
  ];

  // GSAP scroll animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop and Tablet (>= 768px)
    mm.add("(min-width: 768px)", () => {
      gsap.set(items, {
        autoAlpha: 0,
        y: 50,
      });

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        onEnter: () => {
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            force3D: true,
          });
        },
        once: true,
      });
      scrollTriggersRef.current.push(trigger);
    });

    // Mobile (< 768px)
    mm.add("(max-width: 767px)", () => {
      gsap.set(items, {
        autoAlpha: 0,
        y: 30,
      });

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        onEnter: () => {
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            force3D: true,
          });
        },
        once: true,
      });
      scrollTriggersRef.current.push(trigger);
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

  // Hover animations (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const items = itemsRef.current.filter(Boolean);
    const hoverHandlers: Array<{
      element: HTMLElement;
      tween: gsap.core.Tween;
      enterHandler: () => void;
      leaveHandler: () => void;
    }> = [];

    items.forEach((item) => {
      if (!item) return;

      const hoverTween = gsap.to(item, {
        scale: 1.03,
        duration: 0.4,
        ease: "power2.out",
        paused: true,
        force3D: true,
      });

      const handleMouseEnter = () => hoverTween.play();
      const handleMouseLeave = () => hoverTween.reverse();

      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);

      hoverHandlers.push({
        element: item,
        tween: hoverTween,
        enterHandler: handleMouseEnter,
        leaveHandler: handleMouseLeave,
      });
    });

    return () => {
      hoverHandlers.forEach(({ element, tween, enterHandler, leaveHandler }) => {
        element.removeEventListener("mouseenter", enterHandler);
        element.removeEventListener("mouseleave", leaveHandler);
        tween.kill();
      });
    };
  }, []);

  // Combine all items for mobile - use same items as desktop
  // Arrange items in a masonry pattern matching the reference gallery layout
  // Pattern: 16:9 (full width), then pairs of items side-by-side
  const allItems = [...topRow, ...middleRow, ...bottomRow];
  
  // Reorder items for mobile masonry layout to match reference gallery pattern
  // Extract items by type
  const items16_9 = allItems.filter(item => item.aspectRatio === "16:9");
  const items1_1 = allItems.filter(item => item.aspectRatio === "1:1");
  const items9_16 = allItems.filter(item => item.aspectRatio === "9:16");
  const items4_5 = allItems.filter(item => item.aspectRatio === "4:5");
  
  // Create mobile layout pattern matching reference gallery (3-column layout):
  // Pattern: 16:9 (full width spans 3 cols), then 3 items per row
  // Add duplicates on mobile only to fill gaps
  const mobileItems: PortfolioItem[] = [];
  
  // Row 1: 16:9 full width (spans all 3 columns)
  if (items16_9.length > 0) mobileItems.push(items16_9[0]);
  
  // Row 2: Three 1:1 squares (3 items per row)
  items1_1.forEach(item => mobileItems.push(item));
  
  // Row 3: Three 9:16 portraits (3 items per row)
  items9_16.forEach(item => mobileItems.push(item));
  
  // Row 4: Three 4:5 items (add duplicate to fill gap - mobile only)
  items4_5.forEach(item => mobileItems.push(item));
  // Add duplicate of first 4:5 item to fill the third column
  if (items4_5.length > 0) {
    mobileItems.push({ ...items4_5[0], id: `${items4_5[0].id}-mobile-duplicate` });
  }
  
  // Row 5: 16:9 full width (spans all 3 columns)
  if (items16_9.length > 1) mobileItems.push(items16_9[1]);
  
  // Row 6: Remaining items continue in 3-column pattern
  // Any remaining 16:9 items
  for (let i = 2; i < items16_9.length; i++) {
    mobileItems.push(items16_9[i]);
  }

  let itemIndex = 0;
  let mobileItemIndex = allItems.length; // Mobile items start after desktop items

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-neutral-900 py-16 md:py-24 lg:py-32 portfolio-section"
      style={{
        position: "relative",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        contain: "layout style",
      }}
    >
      {/* Mobile-specific styles - only applies below 768px */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 767px) {
            .portfolio-section {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            .portfolio-grid-container-desktop {
              display: none !important;
            }
            .portfolio-grid-container-mobile {
              display: grid !important;
              grid-template-columns: repeat(3, 1fr) !important;
              grid-auto-flow: dense !important;
              gap: 0 !important;
              width: 100% !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            .portfolio-item-mobile {
              width: 100% !important;
              height: auto !important;
              border-radius: 0 !important;
              border: none !important;
              box-shadow: none !important;
            }
            .portfolio-item-mobile-16-9 {
              aspect-ratio: 16 / 9 !important;
              grid-column: 1 / -1 !important;
            }
            .portfolio-item-mobile-1-1 {
              aspect-ratio: 1 / 1 !important;
              grid-column: span 1 !important;
            }
            .portfolio-item-mobile-9-16 {
              aspect-ratio: 9 / 16 !important;
              grid-column: span 1 !important;
            }
            .portfolio-item-mobile-4-5 {
              aspect-ratio: 4 / 5 !important;
              grid-column: span 1 !important;
            }
          }
          @media (min-width: 768px) {
            .portfolio-grid-container-mobile {
              display: none !important;
            }
          }
        `
      }} />
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16 text-center px-4 md:px-0">
        Our Portfolios
      </h2>

      {/* Mobile Grid Container - Only visible on mobile */}
      <div className="portfolio-grid-container-mobile">
        {mobileItems.map((item, idx) => {
          const index = mobileItemIndex++;
          // Determine class based on aspect ratio
          let aspectClass = "";
          if (item.aspectRatio === "16:9") {
            aspectClass = "portfolio-item-mobile-16-9";
          } else if (item.aspectRatio === "1:1") {
            aspectClass = "portfolio-item-mobile-1-1";
          } else if (item.aspectRatio === "9:16") {
            aspectClass = "portfolio-item-mobile-9-16";
          } else if (item.aspectRatio === "4:5") {
            aspectClass = "portfolio-item-mobile-4-5";
          }
          
          return (
            <div
              key={`mobile-${item.id}`}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className={`relative overflow-hidden bg-neutral-800 cursor-pointer group portfolio-item-mobile ${aspectClass}`}
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={item.src}
                  alt={item.title || `Portfolio item ${idx + 1}`}
                  className="w-full h-full object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Grid Container - Matches reference layout exactly */}
      {/* Organized by rows to ensure correct placement */}
      <div
        className="portfolio-grid-container-desktop portfolio-grid-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {/* Top Row - Fixed height for consistent row height */}
        <div
          className="portfolio-row"
          style={{
            display: "flex",
            gap: "24px",
            height: "clamp(180px, 22vw, 320px)", // Fixed row height
            alignItems: "stretch", // All items stretch to row height
            width: "100%",
            justifyContent: "flex-start", // Align items to start
          }}
        >
          {topRow.map((item, idx) => {
            const index = itemIndex++;
            const isLastItem = idx === topRow.length - 1;
            
            // Calculate width based on aspect ratio - use same widths as middle row
            let width: string;
            if (item.aspectRatio === "16:9") {
              width = "clamp(320px, 44vw, 640px)"; // Standard 16:9 width
            } else if (item.aspectRatio === "1:1") {
              width = "clamp(180px, 22vw, 320px)"; // Square
            } else if (item.aspectRatio === "9:16") {
              width = "clamp(101px, 12.4vw, 180px)"; // Narrow
            } else if (item.aspectRatio === "4:5") {
              width = "clamp(144px, 17.6vw, 256px)"; // Slightly narrow
            } else {
              width = "clamp(180px, 22vw, 320px)"; // Default to square
            }
            
            // Add mobile-specific class based on aspect ratio
            const aspectClass = item.aspectRatio === "16:9" ? "portfolio-item-16-9" 
              : item.aspectRatio === "1:1" ? "portfolio-item-1-1"
              : item.aspectRatio === "9:16" ? "portfolio-item-9-16"
              : item.aspectRatio === "4:5" ? "portfolio-item-4-5"
              : "";
            
            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className={`relative overflow-hidden bg-neutral-800 border border-white/10 cursor-pointer group portfolio-item ${aspectClass}`}
                style={{
                  width: width,
                  height: "100%", // Fill row height exactly
                  flexShrink: 0, // Don't shrink
                  flex: isLastItem ? "1 1 auto" : "0 0 auto", // Last item can grow to match row 2
                  minWidth: width, // Maintain minimum width
                  borderRadius: "16px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  willChange: "transform",
                  position: "relative", // Ensure positioning context
                }}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={item.src}
                    alt={item.title || `Portfolio item ${idx + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Row - Fixed height for consistent row height */}
        <div
          className="portfolio-row"
          style={{
            display: "flex",
            gap: "24px",
            height: "clamp(180px, 22vw, 320px)", // Fixed row height
            alignItems: "stretch", // All items stretch to row height
            width: "100%",
            justifyContent: "flex-start", // Align items to start
          }}
        >
          {middleRow.map((item, idx) => {
            const index = itemIndex++;
            const isFirstItem = idx === 0;
            const isLastItem = idx === middleRow.length - 1;
            
            // Calculate width based on aspect ratio
            let width: string;
            if (item.aspectRatio === "16:9") {
              // First item should be slightly wider to extend the row to match rows 1 and 3
              width = isFirstItem 
                ? "clamp(360px, 50vw, 720px)" // Slightly wider for first item to align rows
                : "clamp(320px, 44vw, 640px)"; // Standard 16:9 width
            } else if (item.aspectRatio === "1:1") {
              width = "clamp(180px, 22vw, 320px)"; // Square
            } else if (item.aspectRatio === "9:16") {
              width = "clamp(101px, 12.4vw, 180px)"; // Narrow
            } else if (item.aspectRatio === "4:5") {
              width = "clamp(144px, 17.6vw, 256px)"; // Slightly narrow
            } else {
              width = "clamp(180px, 22vw, 320px)"; // Default
            }
            
            // Add mobile-specific class based on aspect ratio
            const aspectClass = item.aspectRatio === "16:9" 
              ? (isFirstItem ? "portfolio-item-first-16-9" : "portfolio-item-16-9")
              : item.aspectRatio === "1:1" ? "portfolio-item-1-1"
              : item.aspectRatio === "9:16" ? "portfolio-item-9-16"
              : item.aspectRatio === "4:5" ? "portfolio-item-4-5"
              : "";
            
            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className={`relative overflow-hidden bg-neutral-800 border border-white/10 cursor-pointer group portfolio-item ${aspectClass}`}
                style={{
                  width: width,
                  height: "100%", // Fill row height exactly
                  flexShrink: 0, // Don't shrink
                  flex: isLastItem ? "1 1 auto" : "0 0 auto", // Last item can grow to match rows 1 and 3
                  minWidth: isLastItem ? width : undefined, // Maintain minimum width for last item
                  borderRadius: "16px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  willChange: "transform",
                  position: "relative", // Ensure positioning context
                }}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={item.src}
                    alt={item.title || `Portfolio item ${idx + 5}`}
                    className="w-full h-full object-cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Row - Fixed height for consistent row height */}
        <div
          className="portfolio-row"
          style={{
            display: "flex",
            gap: "24px",
            height: "clamp(180px, 22vw, 320px)", // Fixed row height
            alignItems: "stretch", // All items stretch to row height
            width: "100%",
            justifyContent: "flex-start", // Align items to start
          }}
        >
          {bottomRow.map((item, idx) => {
            const index = itemIndex++;
            const isLastItem = idx === bottomRow.length - 1;
            
            // Calculate width based on aspect ratio - use same widths as middle row
            let width: string;
            if (item.aspectRatio === "16:9") {
              width = "clamp(320px, 44vw, 640px)"; // Standard 16:9 width
            } else if (item.aspectRatio === "1:1") {
              width = "clamp(180px, 22vw, 320px)"; // Square
            } else if (item.aspectRatio === "9:16") {
              width = "clamp(101px, 12.4vw, 180px)"; // Narrow
            } else if (item.aspectRatio === "4:5") {
              width = "clamp(144px, 17.6vw, 256px)"; // Slightly narrow
            } else {
              width = "clamp(180px, 22vw, 320px)"; // Default
            }
            
            // Add mobile-specific class based on aspect ratio
            const aspectClass = item.aspectRatio === "16:9" ? "portfolio-item-16-9" 
              : item.aspectRatio === "1:1" ? "portfolio-item-1-1"
              : item.aspectRatio === "9:16" ? "portfolio-item-9-16"
              : item.aspectRatio === "4:5" ? "portfolio-item-4-5"
              : "";
            
            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className={`relative overflow-hidden bg-neutral-800 border border-white/10 cursor-pointer group portfolio-item ${aspectClass}`}
                style={{
                  width: width,
                  height: "100%", // Fill row height exactly
                  flexShrink: 0, // Don't shrink
                  flex: isLastItem ? "1 1 auto" : "0 0 auto", // Last item can grow to match row 2
                  minWidth: width, // Maintain minimum width
                  borderRadius: "16px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  willChange: "transform",
                  position: "relative", // Ensure positioning context
                }}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={item.src}
                    alt={item.title || `Portfolio item ${idx + 9}`}
                    className="w-full h-full object-cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
