"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Client Logo Interface
 */
interface ClientLogo {
  id: string;
  name: string;
  src: string;
  alt: string;
}

/**
 * ClientsSection Component
 * Professional section with sticky scroll animation
 * Elegant gradient background with animated client logos grid
 */
export const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Client logos - Only visible logos (removed problematic ones showing as white circles)
  const clientLogos: ClientLogo[] = [
    { id: "client-1", name: "Client 1", src: "/assets/images/clients/1@4x.png", alt: "Client 1 Logo" },
    { id: "client-2", name: "Client 2", src: "/assets/images/clients/Asset 2@4x.png", alt: "Client 2 Logo" },
    { id: "client-3", name: "Client 3", src: "/assets/images/clients/Asset 3@4x.png", alt: "Client 3 Logo" },
    { id: "client-4", name: "Client 4", src: "/assets/images/clients/Asset 4@4x.png", alt: "Client 4 Logo" },
    { id: "client-5", name: "Client 5", src: "/assets/images/clients/Asset 7@4x.png", alt: "Client 5 Logo" },
    { id: "client-6", name: "Client 6", src: "/assets/images/clients/Asset 8@4x.png", alt: "Client 6 Logo" },
    { id: "client-7", name: "Client 7", src: "/assets/images/clients/Asset 10@4x.png", alt: "Client 7 Logo" },
    { id: "client-8", name: "Client 8", src: "/assets/images/clients/Asset 11@4x.png", alt: "Client 8 Logo" },
    { id: "client-9", name: "Client 9", src: "/assets/images/clients/Asset 12@4x.png", alt: "Client 9 Logo" },
    { id: "client-10", name: "Client 10", src: "/assets/images/clients/Asset 13@4x.png", alt: "Client 10 Logo" },
    { id: "client-11", name: "Client 11", src: "/assets/images/clients/Asset 14@4x.png", alt: "Client 11 Logo" },
    { id: "client-12", name: "Client 12", src: "/assets/images/clients/Asset 15@4x.png", alt: "Client 12 Logo" },
    { id: "client-13", name: "Client 13", src: "/assets/images/clients/Asset 16@4x.png", alt: "Client 13 Logo" },
    { id: "client-14", name: "Client 14", src: "/assets/images/clients/Asset 17@4x.png", alt: "Client 14 Logo" },
    { id: "client-15", name: "Client 15", src: "/assets/images/clients/Asset 18@4x.png", alt: "Client 15 Logo" },
    { id: "client-16", name: "Client 16", src: "/assets/images/clients/Asset 19@4x.png", alt: "Client 16 Logo" },
    { id: "client-17", name: "Client 17", src: "/assets/images/clients/Asset 20@4x.png", alt: "Client 17 Logo" },
    { id: "client-18", name: "Client 18", src: "/assets/images/clients/Asset 21@4x.png", alt: "Client 18 Logo" },
  ];

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      
      // Get section's absolute position
      const sectionTop = rect.top + scrollY;
      const sectionHeight = rect.height;
      
      // Calculate progress based on scroll position relative to section
      // Progress: 0 when section top reaches viewport top
      // Progress: 1 when section bottom reaches viewport bottom
      const viewportTop = scrollY;
      const viewportBottom = scrollY + windowHeight;
      
      let progress = 0;
      
      if (viewportTop < sectionTop + sectionHeight && viewportBottom > sectionTop) {
        // Section is in viewport
        const sectionStart = sectionTop;
        const sectionEnd = sectionTop + sectionHeight;
        const scrollRange = sectionHeight + windowHeight;
        const scrolled = viewportTop - sectionStart + windowHeight;
        progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      } else if (viewportBottom <= sectionTop) {
        // Section is below viewport
        progress = 0;
      } else {
        // Section is above viewport
        progress = 1;
      }

      setScrollProgress(progress);
    };

    // Throttle scroll for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Calculate transform for each logo based on scroll progress
  const getLogoTransform = (index: number) => {
    // Reduce or disable animation on mobile for better UX
    if (isMobile) {
      return {
        transform: `translateY(0px) translateX(0px) rotate(0deg)`,
        opacity: 0.9,
      };
    }
    
    const row = Math.floor(index / 5);
    const col = index % 5;
    
    // Create subtle wave movement that responds to scroll direction
    const wavePhase = scrollProgress * Math.PI * 2;
    const rowWave = Math.sin(row * 0.5 + wavePhase) * 10; // Reduced from 20
    const colWave = Math.cos(col * 0.7 + wavePhase * 0.6) * 8; // Reduced from 15
    
    // Vertical movement - more subtle
    const baseTranslateY = (scrollProgress - 0.5) * 50; // Reduced from 100
    const translateY = baseTranslateY + rowWave;
    
    // Horizontal parallax movement - subtle
    const translateX = colWave * scrollProgress * 0.5;
    
    // Very subtle rotation for depth
    const rotate = (scrollProgress - 0.5) * col * 0.5; // Reduced from 1.5
    
    // Consistent opacity
    const opacity = 0.9;
    
    return {
      transform: `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg)`,
      opacity: opacity,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 lg:py-28 home-accomplish-client overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #5a3c6a 0%, #4a2c4a 25%, #3d1f3d 45%, #2a1a1a 60%, #1f1414 75%, #1a0f0a 90%, #0f0a0a 100%)",
        position: "relative",
        zIndex: 40,
        minHeight: "100vh",
      }}
    >
      {/* Subtle overlay pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Section Title */}
      <div className="relative z-10 mb-10 md:mb-16 lg:mb-20">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white text-center px-4 md:px-0 tracking-tight">
          Our Clients
        </h2>
      </div>

      {/* Client Logos Grid */}
      <div ref={containerRef} className="relative w-full px-4 md:px-6 lg:px-8 z-10">
        <div
          className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            columnGap: "clamp(1.5rem, 4vw, 2.5rem)",
            rowGap: "0",
          }}
        >
          {clientLogos.map((client, index) => {
            // Encode spaces in file paths for proper URL handling
            const encodedSrc = client.src.replace(/ /g, '%20');
            const logoStyle = getLogoTransform(index);
            
            return (
              <div
                key={client.id}
                className="relative flex items-center justify-center"
                style={{
                  aspectRatio: "1 / 1",
                  transform: logoStyle.transform,
                  opacity: logoStyle.opacity,
                  willChange: "transform",
                  marginBottom: "-1.5rem",
                }}
                data-client-index={index}
                data-client-src={client.src}
              >
                <img
                  src={encodedSrc}
                  alt={client.alt}
                  className="object-contain w-full h-full grayscale brightness-0 invert max-w-[80%] max-h-[80%] md:max-w-[65%] md:max-h-[65%]"
                  style={{
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1) opacity(0.95)",
                  }}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const container = img.closest('div[data-client-index]') as HTMLElement;
                    console.error(`❌ Failed to load: ${client.src} - hiding container`);
                    if (container) {
                      container.style.display = 'none';
                    }
                  }}
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    const container = img.closest('div[data-client-index]') as HTMLElement;
                    
                    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                      // Responsive logo sizing - larger on mobile
                      const isMobile = window.innerWidth < 768;
                      const logoSize = isMobile ? '80%' : '65%';
                      
                      img.style.width = 'auto';
                      img.style.height = 'auto';
                      img.style.maxWidth = logoSize;
                      img.style.maxHeight = logoSize;
                      img.style.objectFit = 'contain';
                      img.style.display = 'block';
                      
                      requestAnimationFrame(() => {
                        const rect = img.getBoundingClientRect();
                        
                        if (rect.width === 0 || rect.height === 0) {
                          console.warn(`⚠️ ${client.src} loaded but not visible - hiding container`);
                          if (container) {
                            container.style.display = 'none';
                          }
                        } else {
                          console.log(`✅ ${client.src} - ${img.naturalWidth}x${img.naturalHeight}px - visible`);
                        }
                      });
                    } else {
                      console.error(`❌ ${client.src} has zero dimensions - hiding container`);
                      if (container) {
                        container.style.display = 'none';
                      }
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
