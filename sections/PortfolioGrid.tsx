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

  // Portfolio items organized by rows to match Bootstrap example layout
  // Row 1: 1:1, 9:16, 9:16, 16:9, 4:5
  // Row 2: 16:9, 9:16, 4:5, 9:16, 1:1
  // Row 3: 4:5, 16:9 (tunable), 9:16, 4:5, 4:5
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
    {
      id: "item-5",
      aspectRatio: "4:5",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1350&fit=crop",
    },
  ];

  const middleRow: PortfolioItem[] = [
    {
      id: "item-6",
      aspectRatio: "16:9",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
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
    {
      id: "item-9",
      aspectRatio: "9:16",
      src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1080&h=1920&fit=crop",
    },
    {
      id: "item-10",
      aspectRatio: "1:1",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1080&fit=crop",
    },
  ];

  const bottomRow: PortfolioItem[] = [
    {
      id: "item-11",
      aspectRatio: "4:5",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1350&fit=crop",
    },
    {
      id: "item-12",
      aspectRatio: "16:9",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop",
    },
    {
      id: "item-13",
      aspectRatio: "9:16",
      src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1080&h=1920&fit=crop",
    },
    {
      id: "item-14",
      aspectRatio: "4:5",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1080&h=1350&fit=crop",
    },
    {
      id: "item-15",
      aspectRatio: "4:5",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1350&fit=crop",
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

      // Ensure item has proper positioning to prevent overflow
      const originalTransform = item.style.transform || '';
      
      const hoverTween = gsap.to(item, {
        scale: 1.02, // Reduced scale to prevent overflow
        duration: 0.4,
        ease: "power2.out",
        paused: true,
        force3D: true,
        transformOrigin: "center center", // Scale from center
      });

      const handleMouseEnter = () => {
        // Ensure parent can contain the scaled item
        const parent = item.parentElement;
        if (parent) {
          parent.style.overflow = "visible";
        }
        hoverTween.play();
      };
      
      const handleMouseLeave = () => {
        hoverTween.reverse();
        // Reset parent overflow after animation
        setTimeout(() => {
          const parent = item.parentElement;
          if (parent && parent.classList.contains('portfolio-row')) {
            parent.style.overflow = "hidden";
          }
        }, 400);
      };

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
  // Arrange items to match the hand-drawn mobile layout exactly:
  // Row 1: Three 1:1 squares side by side
  // Row 2: 16:9 spans 2 columns on left, 4:5 and 9:16 stacked vertically on right (masonry)
  // Row 3: 1:1, 1:1, 16:9 side by side
  // Row 4: 9:16, 4:5, 1:1 side by side
  const allItems = [...topRow, ...middleRow, ...bottomRow];
  
  // Extract items by type for mobile layout
  // Available: 1:1 (item-1, item-9, item-10), 9:16 (item-2, item-3, item-7), 4:5 (item-6, item-8), 16:9 (item-4, item-5, item-11)
  const items16_9 = allItems.filter(item => item.aspectRatio === "16:9");
  const items1_1 = allItems.filter(item => item.aspectRatio === "1:1");
  const items9_16 = allItems.filter(item => item.aspectRatio === "9:16");
  const items4_5 = allItems.filter(item => item.aspectRatio === "4:5");
  
  // Create mobile layout pattern matching the hand-drawn design exactly
  // Based on user description and screenshot:
  // Row 1: Big 1:1 (col 1, spans 2 rows), two small 1:1 (cols 2-3)
  // Right column: Two 9:16 stacked (col 3, rows 1-2) - these are above/beside the two 1:1
  // Row 2: (big 1:1 continues), two small 1:1 continue in col 2
  // Row 3: 16:9 below big 1:1 (spans cols 1-2, same height as big 1:1)
  // Row 4: Two small 1:1 below 16:9 (cols 1-2)
  // Row 5: 9:16, 4:5, big 1:1 (cols 1, 2, 3)
  const mobileItems: Array<PortfolioItem & { gridRow?: string; gridColumn?: string; uniqueKey?: string }> = [];
  
  // Big 1:1 on left, spans rows 1-2, column 1
  if (items1_1.length >= 1) {
    const big1_1 = { ...items1_1[0], gridRow: "1 / 3", gridColumn: "1", uniqueKey: "mobile-big-1-1-row1-2" };
    mobileItems.push(big1_1); // item-1 (1:1) - big, spans rows 1-2, column 1
  }
  
  // Two small 1:1 in column 2, rows 1-2
  if (items1_1.length >= 2) {
    const small1_1_col2_row1 = { ...items1_1[1], gridRow: "1", gridColumn: "2", uniqueKey: "mobile-1-1-col2-row1" };
    mobileItems.push(small1_1_col2_row1); // item-9 (1:1) - column 2, row 1
  }
  if (items1_1.length >= 3) {
    const small1_1_col2_row2 = { ...items1_1[2], gridRow: "2", gridColumn: "2", uniqueKey: "mobile-1-1-col2-row2" };
    mobileItems.push(small1_1_col2_row2); // item-10 (1:1) - column 2, row 2
  }
  
  // Two 9:16 stacked in column 3, rows 1-2 (these are the tall items on the right)
  if (items9_16.length >= 2) {
    const item9_16_row1 = { ...items9_16[0], gridRow: "1", gridColumn: "3", uniqueKey: "mobile-9-16-col3-row1" };
    mobileItems.push(item9_16_row1); // First 9:16 - column 3, row 1
    const item9_16_row2 = { ...items9_16[1], gridRow: "2", gridColumn: "3", uniqueKey: "mobile-9-16-col3-row2" };
    mobileItems.push(item9_16_row2); // Second 9:16 - column 3, row 2
  } else if (items9_16.length >= 1) {
    const item9_16_row1 = { ...items9_16[0], gridRow: "1 / 3", gridColumn: "3", uniqueKey: "mobile-9-16-col3-row1-2" };
    mobileItems.push(item9_16_row1); // Single 9:16 spans rows 1-2
  }
  
  // 16:9 below big 1:1 (row 3, spans columns 1-2, same height as big 1:1)
  if (items16_9.length > 0) {
    const item16_9 = { ...items16_9[0], gridRow: "3", gridColumn: "1 / 3", uniqueKey: "mobile-16-9-row3" };
    mobileItems.push(item16_9); // item-4 (16:9) - spans columns 1-2, row 3
  }
  
  // Two small 1:1 below 16:9 (row 4, columns 1-2)
  // Reuse items if needed - but with unique keys
  if (items1_1.length >= 1) {
    const small1_1_row4_col1 = { ...items1_1[0], gridRow: "4", gridColumn: "1", uniqueKey: "mobile-1-1-row4-col1" };
    mobileItems.push(small1_1_row4_col1); // Reuse item-1 (1:1) - column 1, row 4
  }
  if (items1_1.length >= 2) {
    const small1_1_row4_col2 = { ...items1_1[1], gridRow: "4", gridColumn: "2", uniqueKey: "mobile-1-1-row4-col2" };
    mobileItems.push(small1_1_row4_col2); // Reuse item-9 (1:1) - column 2, row 4
  }
  
  // Row 5: 9:16, 4:5, and big 1:1
  if (items9_16.length >= 3) {
    const item9_16_row5 = { ...items9_16[2], gridRow: "5", gridColumn: "1", uniqueKey: "mobile-9-16-row5-col1" };
    mobileItems.push(item9_16_row5); // item-3 (9:16) - column 1, row 5
  } else if (items9_16.length >= 1) {
    // Reuse if needed - but with unique key
    const item9_16_row5 = { ...items9_16[0], gridRow: "5", gridColumn: "1", uniqueKey: "mobile-9-16-row5-col1-reuse" };
    mobileItems.push(item9_16_row5);
  }
  if (items4_5.length > 0) {
    const item4_5_row5 = { ...items4_5[0], gridRow: "5", gridColumn: "2", uniqueKey: "mobile-4-5-row5-col2" };
    mobileItems.push(item4_5_row5); // item-6 (4:5) - column 2, row 5
  }
  // Big 1:1 next to them (column 3, row 5)
  if (items1_1.length >= 3) {
    const big1_1_row5 = { ...items1_1[2], gridRow: "5", gridColumn: "3", uniqueKey: "mobile-1-1-row5-col3" };
    mobileItems.push(big1_1_row5); // item-10 (1:1) - column 3, row 5
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
        contain: "layout style paint",
        overflowX: "hidden",
        overflowY: "visible",
        maxWidth: "100vw",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Mobile-specific styles - only applies below 768px */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Global overflow prevention */
          body {
            overflow-x: hidden !important;
          }
          html {
            overflow-x: hidden !important;
          }
          @media (max-width: 767px) {
            .portfolio-section {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
              overflow-x: hidden !important;
            }
            .portfolio-grid-container-desktop {
              display: none !important;
            }
            .portfolio-grid-container-mobile {
              display: grid !important;
              grid-template-columns: repeat(3, 1fr) !important;
              grid-auto-rows: min-content !important;
              grid-auto-flow: dense !important;
              gap: 0 !important;
              width: 100% !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
              overflow: hidden !important;
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
            }
            .portfolio-item-mobile-1-1 {
              aspect-ratio: 1 / 1 !important;
            }
            .portfolio-item-mobile-9-16 {
              aspect-ratio: 9 / 16 !important;
            }
            .portfolio-item-mobile-4-5 {
              aspect-ratio: 4 / 5 !important;
            }
            /* Ensure items with gridRow spanning work correctly */
            .portfolio-item-mobile[style*="grid-row"] {
              height: 100% !important;
            }
          }
          @media (min-width: 768px) {
            .portfolio-grid-container-mobile {
              display: none !important;
            }
            .portfolio-grid-container-desktop {
              display: flex !important;
              overflow-x: hidden !important;
              max-width: 100% !important;
              width: 100% !important;
            }
            /* Prevent overflow and scrollbars - comprehensive fix */
            .portfolio-section {
              overflow-x: hidden !important;
              max-width: 100vw !important;
              width: 100% !important;
            }
            .portfolio-row {
              overflow: hidden !important;
              max-width: 100% !important;
              width: 100% !important;
              box-sizing: border-box !important;
              /* Ensure all rows align by using same max-content width */
              max-width: min(100%, 1310px) !important;
            }
            .portfolio-item {
              box-sizing: border-box !important;
              max-width: 100% !important;
            }
            /* Prevent hover effects from causing overflow */
            .portfolio-item {
              transform-origin: center center !important;
            }
            .portfolio-item:hover {
              z-index: 10 !important;
            }
            /* Ensure rows stay within bounds */
            .portfolio-row {
              contain: layout style !important;
            }
            /* Prevent any horizontal scroll */
            .portfolio-section * {
              max-width: 100% !important;
            }
          }
          @media (max-width: 1400px) {
            .portfolio-item.portfolio-item-16-9 {
              width: 420px !important;
            }
            .portfolio-item.portfolio-item-1-1 {
              width: 220px !important;
            }
            .portfolio-item.portfolio-item-9-16 {
              width: 125px !important;
            }
            .portfolio-item.portfolio-item-4-5 {
              width: 175px !important;
            }
          }
          @media (max-width: 1200px) {
            .portfolio-item.portfolio-item-16-9 {
              width: 360px !important;
            }
            .portfolio-item.portfolio-item-1-1 {
              width: 200px !important;
            }
            .portfolio-item.portfolio-item-9-16 {
              width: 110px !important;
            }
            .portfolio-item.portfolio-item-4-5 {
              width: 160px !important;
            }
          }
          @media (max-width: 992px) {
            .portfolio-row {
              flex-wrap: wrap !important;
              justify-content: center !important;
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
          
          // Apply explicit grid positioning if specified (for masonry layout)
          const gridStyle: React.CSSProperties = {};
          if ('gridRow' in item && item.gridRow) {
            gridStyle.gridRow = item.gridRow;
          }
          if ('gridColumn' in item && item.gridColumn) {
            gridStyle.gridColumn = item.gridColumn;
          }
          
          // Use uniqueKey if available, otherwise fall back to item.id with index
          const uniqueKey = 'uniqueKey' in item && item.uniqueKey 
            ? item.uniqueKey 
            : `mobile-${item.id}-${idx}`;
          
          return (
            <div
              key={uniqueKey}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className={`relative overflow-hidden bg-neutral-800 cursor-pointer group portfolio-item-mobile ${aspectClass}`}
              style={gridStyle}
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

      {/* Desktop Grid Container - Bootstrap-style flexbox layout with fixed widths */}
      <div
        className="portfolio-grid-container-desktop portfolio-grid-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "100%",
          alignItems: "center",
          overflowX: "hidden",
          overflowY: "visible",
          boxSizing: "border-box",
        }}
      >
        {/* Top Row */}
        <div
          className="portfolio-row"
          style={{
            display: "flex",
            gap: "15px",
            width: "100%",
            maxWidth: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {topRow.map((item, idx) => {
            const index = itemIndex++;
            
            // Fixed widths based on aspect ratio (matching Bootstrap example)
            let width: string;
            if (item.aspectRatio === "16:9") {
              width = "490px"; // 16:9 width
            } else if (item.aspectRatio === "1:1") {
              width = "260px"; // Square
            } else if (item.aspectRatio === "9:16") {
              width = "146px"; // Narrow portrait
            } else if (item.aspectRatio === "4:5") {
              width = "208px"; // Slightly narrow
            } else {
              width = "260px"; // Default to square
            }
            
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
                  height: "260px", // Fixed height for all items
                  flexShrink: 0,
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  willChange: "transform",
                  position: "relative",
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

        {/* Middle Row */}
        <div
          className="portfolio-row"
          style={{
            display: "flex",
            gap: "15px",
            width: "100%",
            maxWidth: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {middleRow.map((item, idx) => {
            const index = itemIndex++;
            
            // Fixed widths based on aspect ratio
            let width: string;
            if (item.aspectRatio === "16:9") {
              width = "490px"; // 16:9 width
            } else if (item.aspectRatio === "1:1") {
              width = "260px"; // Square
            } else if (item.aspectRatio === "9:16") {
              width = "146px"; // Narrow portrait
            } else if (item.aspectRatio === "4:5") {
              width = "208px"; // Slightly narrow
            } else {
              width = "260px"; // Default
            }
            
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
                  height: "260px", // Fixed height for all items
                  flexShrink: 0,
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  willChange: "transform",
                  position: "relative",
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

        {/* Bottom Row - With tunable 16:9 */}
        <div
          className="portfolio-row"
          style={{
            display: "flex",
            gap: "15px",
            width: "100%",
            maxWidth: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {bottomRow.map((item, idx) => {
            const index = itemIndex++;
            
            // Fixed widths based on aspect ratio
            // Match row 2 total width exactly for perfect alignment
            // Row 2 total: 490 + 146 + 208 + 146 + 260 + 60(gaps) = 1310px
            // Row 3 total needed: 1310px
            // Current row 3: 208 + 490 + 146 + 208 + 208 + 60 = 1320px
            // Need to reduce by 10px - adjust last 4:5 item
            let width: string;
            if (item.aspectRatio === "16:9") {
              width = "490px"; // Same as row 2 for alignment
            } else if (item.aspectRatio === "1:1") {
              width = "260px"; // Square
            } else if (item.aspectRatio === "9:16") {
              width = "146px"; // Narrow portrait
            } else if (item.aspectRatio === "4:5") {
              // Last item in row 3 needs to be 10px smaller to match row 2 total width
              width = idx === bottomRow.length - 1 ? "198px" : "208px";
            } else {
              width = "260px"; // Default
            }
            
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
                  height: "260px", // Fixed height for all items
                  flexShrink: 0,
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  willChange: "transform",
                  position: "relative",
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
