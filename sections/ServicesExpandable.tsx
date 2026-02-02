"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/alignment/Section";
import { Container } from "@/components/alignment/Container";

/**
 * Service Item Type
 */
interface ServiceItem {
  id: string;
  title: string;
  image: string;
  subLinks: string[];
}

/**
 * Dummy Services Data
 */
const SERVICES: ServiceItem[] = [
  {
    id: "web-development",
    title: "Web Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=1200&fit=crop",
    subLinks: ["Frontend", "Backend", "CMS", "SEO"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=1200&fit=crop",
    subLinks: ["Social Media", "Content Strategy", "PPC", "Analytics"],
  },
  {
    id: "content-creation",
    title: "Content Creation",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=1200&fit=crop",
    subLinks: ["Video Production", "Graphic Design", "Copywriting", "Photography"],
  },
  {
    id: "branding",
    title: "Branding",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1200&fit=crop",
    subLinks: ["Logo Design", "Brand Identity", "Style Guide", "Brand Strategy"],
  },
];

/**
 * Plus Icon Component (SVG)
 */
const PlusIcon = ({ 
  iconRef 
}: { 
  iconRef: React.RefObject<SVGSVGElement | null>;
}) => {
  return (
    <svg
      ref={iconRef}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Arrow Icon Component (SVG)
 */
const ArrowIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Service Card Component
 * Professional expandable card with powerful GSAP animations and orange gradient
 */
const ServiceCard = ({
  service,
  isActive,
  onToggle,
  index,
}: {
  service: ServiceItem;
  isActive: boolean;
  onToggle: () => void;
  index: number;
}) => {
  const detailsSheetRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [cardDimensions, setCardDimensions] = useState({ width: '100%', height: 'clamp(450px, 60vw, 526.81px)' });
  const [isMobile, setIsMobile] = useState(false);

  // Set responsive card dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (window.innerWidth >= 768) {
        // Desktop: Original sizing
        setCardDimensions({
          width: 'clamp(280px, 20vw, 395px)',
          height: 'clamp(373px, 26.67vw, 526.81px)',
        });
      } else {
        // Mobile: Premium professional sizing with ideal proportions
        setCardDimensions({
          width: '100%',
          height: 'clamp(380px, 50vh, 420px)',
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Powerful GSAP animations
  useEffect(() => {
    if (!detailsSheetRef.current || !iconRef.current || !cardRef.current) return;

    const sheetElement = detailsSheetRef.current;
    const iconElement = iconRef.current;
    const cardElement = cardRef.current;
    const linksList = linksRef.current;
    const imageElement = imageRef.current;

    // Set initial state
    gsap.set(sheetElement, {
      yPercent: 100,
      force3D: true,
      immediateRender: true,
    });
    gsap.set(iconElement, {
      rotation: 0,
      immediateRender: true,
    });

    if (isActive) {
      // POWERFUL OPENING ANIMATION
      const tl = gsap.timeline();
      
      // 1. Slide up the sheet with smooth acceleration
      tl.to(sheetElement, {
        yPercent: 0,
        duration: 0.7,
        ease: "power3.out", // Smooth deceleration
        force3D: true,
      }, 0);

      // 2. Rotate icon to X
      tl.to(iconElement, {
        rotation: 45,
        duration: 0.6,
        ease: "back.out(1.5)", // Bouncy spring effect
      }, 0.1);

      // 3. Enhance glassy effect on open - subtle scale with enhanced glow
      tl.to(cardElement, {
        scale: 1.02,
        duration: 0.7,
        ease: "power2.out",
        force3D: true,
      }, 0);
      
      // Add enhanced shadow via CSS class
      cardElement.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)';

      // 4. Subtle image zoom for depth (reduced)
      if (imageElement) {
        tl.to(imageElement, {
          scale: 1.05,
          duration: 0.7,
          ease: "power2.out",
          force3D: true,
        }, 0);
      }

      // 5. Staggered reveal of links with fade and slide
      if (linksList) {
        const links = linksList.querySelectorAll("li");
        gsap.fromTo(
          links,
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.2)",
            stagger: 0.1,
            delay: 0.3,
            force3D: true,
          }
        );
      }

    } else {
      // SMOOTH CLOSING ANIMATION - Top to Bottom (Perfect Mirror of Opening)
      const tl = gsap.timeline();

      // 1. Fade out links smoothly as sheet closes (starts immediately)
      if (linksList) {
        const links = linksList.querySelectorAll("li");
        // Reverse the stagger order for closing (last link fades first)
        const reversedLinks = Array.from(links).reverse();
        tl.to(reversedLinks, {
          opacity: 0,
          y: -20,
          scale: 0.9,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.in",
          force3D: true,
        }, 0); // Start immediately
      }

      // 2. Slide down sheet smoothly from top to bottom (main closing animation)
      // Sheet is currently at yPercent: 0 (visible), animate to yPercent: 100 (hidden)
      tl.to(sheetElement, {
        yPercent: 100,
        duration: 0.7,
        ease: "power3.in", // Smooth acceleration downward (mirror of power3.out)
        force3D: true,
      }, 0); // Start at same time as links fade

      // 3. Rotate icon back smoothly (mirror of opening rotation)
      tl.to(iconElement, {
        rotation: 0,
        duration: 0.6,
        ease: "power2.out",
      }, 0.1);

      // 4. Reset card scale and glassy effect smoothly (mirror of opening scale)
      tl.to(cardElement, {
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        force3D: true,
      }, 0);
      
      // Reset shadow immediately when closing starts
      cardElement.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)';

      // 5. Reset image scale smoothly (mirror of opening zoom)
      if (imageElement) {
        tl.to(imageElement, {
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          force3D: true,
        }, 0);
      }
    }
  }, [isActive]);

  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden group cursor-pointer w-full md:w-auto ${isMobile ? 'rounded-xl' : 'rounded-2xl'}`}
      style={{
        willChange: "transform",
        width: cardDimensions.width,
        maxWidth: "100%",
        height: cardDimensions.height,
        ...(isMobile ? {
          // Mobile: Professional corporate styling
          borderRadius: '12px', // Professional corporate border radius
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.4), 0 4px 16px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        } : {
          // Desktop: Original styling
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        }),
      }}
    >
      {/* Layer 1 (Bottom - z-0): Background Image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full z-0"
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Gradient Overlay at TOP for Title Readability */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-15 pointer-events-none" />

      {/* Layer 2 (Middle - z-10): Details Sheet - Glassy Orange Gradient */}
      <div
        ref={detailsSheetRef}
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(180deg, rgba(255, 107, 53, 0.9) 0%, rgba(255, 74, 22, 0.85) 40%, rgba(45, 26, 15, 0.9) 70%, rgba(10, 10, 10, 0.95) 100%)",
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        }}
      >
        
        {/* Navigation Links - Vertically Centered with Top Spacing (Serienreif Style) */}
        <div className={`h-full flex flex-col items-center justify-center ${isMobile ? 'p-6 pt-20' : 'p-6 md:p-8 pt-16 md:pt-20'}`}>
          <ul ref={linksRef} className={`${isMobile ? 'space-y-3' : 'space-y-4 md:space-y-5'} w-full max-w-xs text-center`}>
            {service.subLinks.map((link, linkIndex) => (
              <li key={linkIndex} className="opacity-0">
                <a
                  href="#"
                  className={`group flex items-center justify-center ${isMobile ? 'text-lg' : 'text-xl'} text-white/90 hover:text-white transition-all duration-300 ${isMobile ? 'py-2' : 'py-2'} font-medium`}
                  style={{
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      x: 6,
                      duration: 0.3,
                      ease: "power2.out",
                      force3D: true,
                    });
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      x: 0,
                      duration: 0.3,
                      ease: "power2.out",
                      force3D: true,
                    });
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  <span>{link}</span>
                  <ArrowIcon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Layer 3 (Top - z-20): Anchors - Always Visible */}
      {/* Title - Top Center (Professional Style) */}
      <div className={`absolute z-20 pointer-events-none flex items-center justify-center ${isMobile ? 'top-5 left-0 right-0 px-5' : 'top-4 left-0 right-0 md:top-5 px-4 md:px-6'}`}>
        <h3 
          className={`${isMobile ? 'text-xl' : 'text-lg md:text-xl lg:text-2xl'} font-semibold text-white leading-tight text-center`}
          style={{
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.6)",
            letterSpacing: "0.01em",
          }}
        >
          {service.title}
        </h3>
      </div>

      {/* Button - Bottom Right (Glassy Style) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onToggle();
        }}
        className={`absolute z-20 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer ${isMobile ? 'bottom-6 right-6 w-12 h-12' : 'bottom-5 right-5 md:bottom-6 md:right-6 w-10 h-10 md:w-11 md:h-11'}`}
        style={{
          ...(isMobile ? {
            // Mobile: Premium button styling
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(24px) saturate(200%)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
            border: '1.5px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
          } : {
            // Desktop: Original styling
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)',
          }),
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            background: 'rgba(255, 255, 255, 0.35)',
            scale: 1.08,
            duration: 0.3,
            ease: "power2.out",
            force3D: true,
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            background: 'rgba(255, 255, 255, 0.25)',
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            force3D: true,
          });
        }}
        aria-label={isActive ? "Close" : "Expand"}
        type="button"
      >
        <PlusIcon iconRef={iconRef} />
      </button>
    </div>
  );
};

/**
 * ServicesExpandable Component
 * Professional expandable service cards with powerful GSAP animations
 */
export const ServicesExpandable = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Toggle card expansion (accordion style - only one open at a time)
  const handleToggle = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };


  // Powerful GSAP scroll animation for cards entrance - Falling from top to bottom
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Animate title falling from top
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        autoAlpha: 0,
        y: -30,
        scale: 0.98,
      });
    }

    // Desktop and Tablet (>= 768px) - Slow and smooth professional falling animation
    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, index) => {
        if (!card) return;
        const staggerIndex = parseInt(card.getAttribute("data-stagger-index") || "0");
        const staggerOffset = staggerIndex > 0 ? staggerIndex * 24 : 0;
        
        // Set initial state: cards start from above with visible positioning
        gsap.set(card, {
          autoAlpha: 0,
          y: -40, // Start from above (falling down) - smoother
          scale: 0.95,
          rotation: 0, // No rotation for professional look
        });
        
        // Preserve CSS stagger transform
        if (staggerOffset > 0) {
          card.style.transform = `translateY(${staggerOffset}px)`;
        }
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 90%",
        onEnter: () => {
          // Animate title first - smooth and professional
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power1.out", // Smooth professional easing
              force3D: true,
            });
          }

          // Then animate cards one by one - smooth falling from top to bottom
          cards.forEach((card, index) => {
            if (!card) return;
            const staggerIndex = parseInt(card.getAttribute("data-stagger-index") || "0");
            const staggerOffset = staggerIndex > 0 ? staggerIndex * 24 : 0;
            
            // Smooth, faster falling animation - one by one
            gsap.to(card, {
              autoAlpha: 1,
              y: staggerOffset, // Final position includes stagger
              scale: 1,
              rotation: 0,
              duration: 0.5, // Faster - smooth and visible
              ease: "power1.out", // Smooth professional easing
              delay: index * 0.05, // Much faster stagger - cards appear almost simultaneously
              force3D: true,
              onComplete: () => {
                // Ensure stagger transform is preserved after animation
                if (staggerOffset > 0) {
                  card.style.transform = `translateY(${staggerOffset}px)`;
                } else {
                  card.style.transform = "none";
                }
              },
            });
          });
        },
        once: true,
      });
    });

    // Mobile (< 768px) - Smooth professional falling animation
    mm.add("(max-width: 767px)", () => {
      gsap.set(cards, {
        autoAlpha: 0,
        y: -30, // Start from above - smoother
        scale: 0.95,
        rotation: 0,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 90%",
        onEnter: () => {
          // Animate title first - smooth and professional
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power1.out",
              force3D: true,
            });
          }

          // Then animate cards one by one - smooth falling from top
          gsap.to(cards, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.4, // Faster - smooth and visible
            ease: "power1.out", // Smooth professional easing
            stagger: 0.03, // Much faster stagger - cards appear almost simultaneously
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

  return (
    <Section 
      id="services" 
      padding="lg" 
      className="bg-neutral-900 services-section"
    >
      <Container maxWidth="xl" padding={false} className="!px-0 md:!px-6 lg:!px-8">
        {/* Mobile-specific styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 767px) {
              .services-section {
                padding-left: 16px !important;
                padding-right: 16px !important;
              }
              .services-container-mobile {
                padding-left: 0 !important;
                padding-right: 0 !important;
                gap: 1.25rem !important;
              }
              .services-title-mobile {
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-bottom: 2rem !important;
              }
            }
          `
        }} />
        
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16 text-center px-0 md:px-0 opacity-0 services-title-mobile"
        >
          Our Services
        </h2>

         {/* Services Grid - Staggered on Desktop (Serienreif Style - Cascading Layout) */}
         <div
           ref={containerRef}
           className="flex flex-col lg:flex-row lg:flex-nowrap lg:justify-center lg:items-start relative w-full px-0 md:px-6 lg:px-8 services-container-mobile"
           style={{
             gap: "1.5rem", // 24px gap between cards on desktop
             overflow: "visible", // No scrollbar - all cards visible
           }}
         >
           {SERVICES.map((service, index) => {
             // Progressive stagger: Each card is progressively lower in a SINGLE ROW
             // Card 1: top (0) - no offset
             // Card 2: down by 24px (subtle)
             // Card 3: down by 48px
             // Card 4: down by 72px
             const staggerOffset = index * 24; // More subtle: 24px, 48px, 72px
             
             return (
               <div
                 key={service.id}
                 ref={(el) => {
                   if (el) cardsRef.current[index] = el;
                 }}
                 className="opacity-0 flex-shrink-0"
                 style={{
                   transform: index > 0 ? `translateY(${staggerOffset}px)` : "none",
                 }}
                 data-stagger-index={index}
               >
                <ServiceCard
                  service={service}
                  isActive={activeCardId === service.id}
                  onToggle={() => handleToggle(service.id)}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
