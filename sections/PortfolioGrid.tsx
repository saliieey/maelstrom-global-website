"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Portfolio Item Types
 */
interface PortfolioItem {
  id: string;
  type: "story" | "meta-ad" | "poster" | "highlight-video";
  title: string;
  src: string;
}

/**
 * PortfolioGrid Component
 * Professional Digital Agency Portfolio Grid
 * Structured grid layout with clear visual hierarchy
 */
export const PortfolioGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  // Portfolio items organized by rows for better structure
  const portfolioItems: PortfolioItem[] = [
    // Row 1: 2 stories (9:16) + 2 meta ads (1:1)
    {
      id: "story-1",
      type: "story",
      title: "Social Media Story",
      src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1080&h=1920&fit=crop",
    },
    {
      id: "story-2",
      type: "story",
      title: "Instagram Reel",
      src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1080&h=1920&fit=crop",
    },
    {
      id: "meta-1",
      type: "meta-ad",
      title: "Facebook Ad Creative",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1080&fit=crop",
    },
    {
      id: "meta-2",
      type: "meta-ad",
      title: "Instagram Ad",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1080&h=1080&fit=crop",
    },
    // Row 2: 2 posters (4:5)
    {
      id: "poster-1",
      type: "poster",
      title: "Event Poster",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1350&fit=crop",
    },
    {
      id: "poster-2",
      type: "poster",
      title: "Marketing Poster",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1080&h=1350&fit=crop",
    },
    // Row 3: Highlight video (16:9) - Full width
    {
      id: "highlight-1",
      type: "highlight-video",
      title: "Brand Campaign Highlight",
      src: "/assets/videos/hero-intro.mp4",
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

      ScrollTrigger.create({
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
    });

    // Mobile (< 768px)
    mm.add("(max-width: 767px)", () => {
      gsap.set(items, {
        autoAlpha: 0,
        y: 30,
      });

      ScrollTrigger.create({
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
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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

  // Get column span classes based on type
  const getColumnSpan = (type: PortfolioItem["type"]) => {
    switch (type) {
      case "story":
        return "col-span-1 md:col-span-1 lg:col-span-3";
      case "meta-ad":
        return "col-span-1 md:col-span-1 lg:col-span-3";
      case "poster":
        return "col-span-1 md:col-span-2 lg:col-span-4";
      case "highlight-video":
        return "col-span-2 md:col-span-6 lg:col-span-12";
      default:
        return "col-span-1";
    }
  };

  // Get aspect ratio class based on type
  const getAspectRatio = (type: PortfolioItem["type"]) => {
    switch (type) {
      case "story":
        return "aspect-[9/16]";
      case "meta-ad":
        return "aspect-square";
      case "poster":
        return "aspect-[4/5]";
      case "highlight-video":
        return "aspect-video";
      default:
        return "aspect-square";
    }
  };

  let itemIndex = 0;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-neutral-900 py-16 md:py-24 lg:py-32"
      style={{
        zIndex: 10,
        position: "relative",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16 text-left">
          Our Portfolios
        </h2>

        {/* Main Grid Container - Structured Layout */}
        <div
          className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12"
          style={{
            gap: "24px",
          }}
        >
          {/* Row 1: Stories + Meta Ads - Structured grouping */}
          <div className="col-span-2 md:col-span-6 lg:col-span-12 grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12" style={{ gap: "24px" }}>
            {portfolioItems.slice(0, 4).map((item) => {
              const index = itemIndex++;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) itemsRef.current[index] = el;
                  }}
                  className={`relative ${getColumnSpan(item.type)} ${getAspectRatio(
                    item.type
                  )} overflow-hidden bg-neutral-800 border border-white/10 cursor-pointer group`}
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    willChange: "transform",
                  }}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end justify-start p-4 md:p-6">
                    <h3 className="text-white text-sm md:text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: Posters - Structured grouping */}
          <div className="col-span-2 md:col-span-6 lg:col-span-12 grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12" style={{ gap: "24px" }}>
            {portfolioItems.slice(4, 6).map((item) => {
              const index = itemIndex++;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) itemsRef.current[index] = el;
                  }}
                  className={`relative ${getColumnSpan(item.type)} ${getAspectRatio(
                    item.type
                  )} overflow-hidden bg-neutral-800 border border-white/10 cursor-pointer group`}
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    willChange: "transform",
                  }}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end justify-start p-4 md:p-6">
                    <h3 className="text-white text-sm md:text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 3: Highlight Video - Full width showcase */}
          <div className="col-span-2 md:col-span-6 lg:col-span-12 grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 justify-items-center" style={{ gap: "24px" }}>
            {portfolioItems.slice(6, 7).map((item) => {
              const index = itemIndex++;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) itemsRef.current[index] = el;
                  }}
                  className={`relative ${getColumnSpan(item.type)} ${getAspectRatio(
                    item.type
                  )} overflow-hidden bg-neutral-800 border border-white/10 cursor-pointer group w-full`}
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    willChange: "transform",
                  }}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      loop
                      autoPlay
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end justify-start p-4 md:p-6">
                    <h3 className="text-white text-sm md:text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
