"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Project data structure
 */
interface Project {
  id: string;
  type: "image" | "video";
  size: "wide" | "tall" | "standard";
  title: string;
  category: string;
  src: string;
}

/**
 * VideoCard Component - Reusable video card with autoplay
 */
const VideoCard = ({ src, className = "" }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure video plays when in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {
                // Autoplay may fail, ignore silently
              });
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={`w-full h-full object-cover ${className}`}
      muted
      playsInline
      loop
      autoPlay
    />
  );
};

/**
 * PortfolioGrid Component
 * Features two distinct Bento Grid layouts with GSAP scroll animations and hover effects
 */
export const PortfolioGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutARef = useRef<HTMLDivElement>(null);
  const layoutBRef = useRef<HTMLDivElement>(null);
  const layoutAItemsRef = useRef<HTMLDivElement[]>([]);
  const layoutBItemsRef = useRef<HTMLDivElement[]>([]);

  // Dummy project data for Layout A
  const layoutAProjects: Project[] = [
    {
      id: "a1",
      type: "video",
      size: "wide",
      title: "Project Alpha",
      category: "Branding",
      src: "/assets/videos/portfolio-dummy.mp4",
    },
    {
      id: "a2",
      type: "image",
      size: "tall",
      title: "Project Beta",
      category: "Design",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
    },
    {
      id: "a3",
      type: "image",
      size: "standard",
      title: "Project Gamma",
      category: "Development",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop",
    },
    {
      id: "a4",
      type: "image",
      size: "standard",
      title: "Project Delta",
      category: "Marketing",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=800&fit=crop",
    },
  ];

  // Dummy project data for Layout B
  const layoutBProjects: Project[] = [
    {
      id: "b1",
      type: "image",
      size: "tall",
      title: "Project Epsilon",
      category: "Branding",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
    },
    {
      id: "b2",
      type: "video",
      size: "wide",
      title: "Project Zeta",
      category: "Design",
      src: "/assets/videos/portfolio-dummy.mp4",
    },
    {
      id: "b3",
      type: "image",
      size: "standard",
      title: "Project Eta",
      category: "Development",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop",
    },
    {
      id: "b4",
      type: "image",
      size: "standard",
      title: "Project Theta",
      category: "Marketing",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=800&fit=crop",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin only on client side
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const container = containerRef.current;
    const layoutA = layoutARef.current;
    const layoutB = layoutBRef.current;

    // Ensure we're on client side
    if (typeof window === "undefined") return;

    if (!container || !layoutA || !layoutB) return;

    // Use matchMedia for responsive breakpoints
    const mm = gsap.matchMedia();

    // Desktop and Tablet (>= 768px)
    mm.add("(min-width: 768px)", () => {
      // Filter out null refs
      const layoutAItems = layoutAItemsRef.current.filter(Boolean);
      const layoutBItems = layoutBItemsRef.current.filter(Boolean);

      // Set initial state for Layout A items
      gsap.set(layoutAItems, {
        autoAlpha: 0,
        y: 50,
      });

      // Set initial state for Layout B items
      gsap.set(layoutBItems, {
        autoAlpha: 0,
        y: 50,
      });

      // Set initial state - PortfolioGrid container hidden until TextReveal finishes
      const portfolioContainer = containerRef.current;
      if (portfolioContainer) {
        gsap.set(portfolioContainer, {
          autoAlpha: 0,
        });
      }

      // Animate Layout A - Start only when section is well into view
      ScrollTrigger.create({
        trigger: layoutA,
        start: "top 90%", // Start later to ensure TextReveal is gone
        end: "bottom 20%",
        onEnter: () => {
          // Show PortfolioGrid container first
          if (portfolioContainer) {
            gsap.to(portfolioContainer, {
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
              force3D: true,
            });
          }
          // Then animate items
          gsap.to(layoutAItems, {
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

      // Animate Layout B - Start only when section is well into view
      ScrollTrigger.create({
        trigger: layoutB,
        start: "top 90%", // Start later to ensure TextReveal is gone
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(layoutBItems, {
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

    // Mobile (< 768px) - Simplified animation
    mm.add("(max-width: 767px)", () => {
      const layoutAItems = layoutAItemsRef.current.filter(Boolean);
      const layoutBItems = layoutBItemsRef.current.filter(Boolean);

      // Set initial state
      gsap.set([...layoutAItems, ...layoutBItems], {
        autoAlpha: 0,
        y: 30,
      });

      // Animate Layout A
      ScrollTrigger.create({
        trigger: layoutA,
        start: "top 85%",
        onEnter: () => {
          gsap.to(layoutAItems, {
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

      // Animate Layout B
      ScrollTrigger.create({
        trigger: layoutB,
        start: "top 85%",
        onEnter: () => {
          gsap.to(layoutBItems, {
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

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mm.revert();
    };
  }, []);

  // Separate useEffect for smooth hover animations (runs after items are rendered)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let hoverHandlers: Array<{
      element: HTMLElement;
      tween: gsap.core.Tween;
      enterHandler: () => void;
      leaveHandler: () => void;
    }> = [];

    // Wait a tick to ensure refs are populated
    const timeoutId = setTimeout(() => {
      const layoutAItems = layoutAItemsRef.current.filter(Boolean);
      const layoutBItems = layoutBItemsRef.current.filter(Boolean);
      const allItems = [...layoutAItems, ...layoutBItems];

      // Only add hover on desktop/tablet (not mobile)
      if (window.innerWidth < 768) return;

      // Add smooth hover animations for all items
      allItems.forEach((item) => {
        if (!item) return;

        const hoverTween = gsap.to(item, {
          scale: 1.03,
          filter: "brightness(1.15)",
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
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      hoverHandlers.forEach(({ element, tween, enterHandler, leaveHandler }) => {
        element.removeEventListener("mouseenter", enterHandler);
        element.removeEventListener("mouseleave", leaveHandler);
        tween.kill();
      });
      hoverHandlers = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-neutral-900 py-16 md:py-24 lg:py-32"
      style={{
        zIndex: 10, // Higher than TextReveal - slides over it like a curtain
        position: "relative",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16 text-left">
          Our Portfolios
        </h2>

        {/* Layout A - First Bento Grid */}
        <div
          ref={layoutARef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24"
        >
          {/* Item 1: Wide Landscape (Span 2 columns) */}
          <div
            ref={(el) => {
              if (el) layoutAItemsRef.current[0] = el;
            }}
            className="md:col-span-2 md:row-span-1 w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            {layoutAProjects[0].type === "video" ? (
              <VideoCard src={layoutAProjects[0].src} />
            ) : (
              <img
                src={layoutAProjects[0].src}
                alt={layoutAProjects[0].title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Item 2: Tall Vertical (Span 1 column, 2 rows) */}
          <div
            ref={(el) => {
              if (el) layoutAItemsRef.current[1] = el;
            }}
            className="md:col-span-1 md:row-span-2 w-full aspect-[3/4] md:aspect-auto md:h-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            {layoutAProjects[1].type === "video" ? (
              <VideoCard src={layoutAProjects[1].src} />
            ) : (
              <img
                src={layoutAProjects[1].src}
                alt={layoutAProjects[1].title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Item 3: Standard Square */}
          <div
            ref={(el) => {
              if (el) layoutAItemsRef.current[2] = el;
            }}
            className="md:col-span-1 md:row-span-1 w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            {layoutAProjects[2].type === "video" ? (
              <VideoCard src={layoutAProjects[2].src} />
            ) : (
              <img
                src={layoutAProjects[2].src}
                alt={layoutAProjects[2].title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Item 4: Standard Square */}
          <div
            ref={(el) => {
              if (el) layoutAItemsRef.current[3] = el;
            }}
            className="md:col-span-1 md:row-span-1 w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            {layoutAProjects[3].type === "video" ? (
              <VideoCard src={layoutAProjects[3].src} />
            ) : (
              <img
                src={layoutAProjects[3].src}
                alt={layoutAProjects[3].title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Layout B - Second Bento Grid */}
        <div
          ref={layoutBRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {/* Item 1: Tall Vertical (Span 1 column, 2 rows) */}
          <div
            ref={(el) => {
              if (el) layoutBItemsRef.current[0] = el;
            }}
            className="md:col-span-1 md:row-span-2 w-full aspect-[3/4] md:aspect-auto md:h-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            {layoutBProjects[0].type === "video" ? (
              <VideoCard src={layoutBProjects[0].src} />
            ) : (
              <img
                src={layoutBProjects[0].src}
                alt={layoutBProjects[0].title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Item 2: Wide Landscape (Span 2 columns) */}
          <div
            ref={(el) => {
              if (el) layoutBItemsRef.current[1] = el;
            }}
            className="md:col-span-2 md:row-span-1 w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            {layoutBProjects[1].type === "video" ? (
              <VideoCard src={layoutBProjects[1].src} />
            ) : (
              <img
                src={layoutBProjects[1].src}
                alt={layoutBProjects[1].title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Item 3: Standard Square */}
          <div
            ref={(el) => {
              if (el) layoutBItemsRef.current[2] = el;
            }}
            className="md:col-span-1 md:row-span-1 w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            {layoutBProjects[2].type === "video" ? (
              <VideoCard src={layoutBProjects[2].src} />
            ) : (
              <img
                src={layoutBProjects[2].src}
                alt={layoutBProjects[2].title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Item 4: Standard Square */}
          <div
            ref={(el) => {
              if (el) layoutBItemsRef.current[3] = el;
            }}
            className="md:col-span-1 md:row-span-1 w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            {layoutBProjects[3].type === "video" ? (
              <VideoCard src={layoutBProjects[3].src} />
            ) : (
              <img
                src={layoutBProjects[3].src}
                alt={layoutBProjects[3].title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

