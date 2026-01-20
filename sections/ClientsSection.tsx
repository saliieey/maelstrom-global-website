"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
 * Displays client logos in a grid with hover effects
 * Similar to digitalbuddha.in design with dark gradient background
 */
export const ClientsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);

  // Client logos - All 21 logos from the clients folder
  const clientLogos: ClientLogo[] = [
    { id: "client-1", name: "Client 1", src: "/assets/images/clients/1@4x.png", alt: "Client 1 Logo" },
    { id: "client-2", name: "Client 2", src: "/assets/images/clients/Asset 2@4x.png", alt: "Client 2 Logo" },
    { id: "client-3", name: "Client 3", src: "/assets/images/clients/Asset 3@4x.png", alt: "Client 3 Logo" },
    { id: "client-4", name: "Client 4", src: "/assets/images/clients/Asset 4@4x.png", alt: "Client 4 Logo" },
    { id: "client-5", name: "Client 5", src: "/assets/images/clients/Asset 6@4x.png", alt: "Client 5 Logo" },
    { id: "client-6", name: "Client 6", src: "/assets/images/clients/Asset 7@4x.png", alt: "Client 6 Logo" },
    { id: "client-7", name: "Client 7", src: "/assets/images/clients/Asset 8@4x.png", alt: "Client 7 Logo" },
    { id: "client-8", name: "Client 8", src: "/assets/images/clients/Asset 9@4x.png", alt: "Client 8 Logo" },
    { id: "client-9", name: "Client 9", src: "/assets/images/clients/Asset 10@4x.png", alt: "Client 9 Logo" },
    { id: "client-10", name: "Client 10", src: "/assets/images/clients/Asset 11@4x.png", alt: "Client 10 Logo" },
    { id: "client-11", name: "Client 11", src: "/assets/images/clients/Asset 12@4x.png", alt: "Client 11 Logo" },
    { id: "client-12", name: "Client 12", src: "/assets/images/clients/Asset 13@4x.png", alt: "Client 12 Logo" },
    { id: "client-13", name: "Client 13", src: "/assets/images/clients/Asset 14@4x.png", alt: "Client 13 Logo" },
    { id: "client-14", name: "Client 14", src: "/assets/images/clients/Asset 15@4x.png", alt: "Client 14 Logo" },
    { id: "client-15", name: "Client 15", src: "/assets/images/clients/Asset 16@4x.png", alt: "Client 15 Logo" },
    { id: "client-16", name: "Client 16", src: "/assets/images/clients/Asset 17@4x.png", alt: "Client 16 Logo" },
    { id: "client-17", name: "Client 17", src: "/assets/images/clients/Asset 18@4x.png", alt: "Client 17 Logo" },
    { id: "client-18", name: "Client 18", src: "/assets/images/clients/Asset 19@4x.png", alt: "Client 18 Logo" },
    { id: "client-19", name: "Client 19", src: "/assets/images/clients/Asset 20@4x.png", alt: "Client 19 Logo" },
    { id: "client-20", name: "Client 20", src: "/assets/images/clients/Asset 21@4x.png", alt: "Client 20 Logo" },
    { id: "client-21", name: "Client 21", src: "/assets/images/clients/Asset 21@4x.png", alt: "Client 21 Logo" },
  ];

  // GSAP scroll animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const logos = logosRef.current.filter(Boolean);
    if (logos.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop and Tablet (>= 768px)
    mm.add("(min-width: 768px)", () => {
      // Animate title
      gsap.set(title, {
        autoAlpha: 0,
        y: 30,
      });

      // Animate logos
      gsap.set(logos, {
        autoAlpha: 0,
        y: 50,
        scale: 0.9,
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        onEnter: () => {
          // Animate title first
          gsap.to(title, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });

          // Then animate logos with stagger
          gsap.to(logos, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.05,
            delay: 0.2,
            force3D: true,
          });
        },
        once: true,
      });
    });

    // Mobile (< 768px)
    mm.add("(max-width: 767px)", () => {
      gsap.set(title, {
        autoAlpha: 0,
        y: 20,
      });

      gsap.set(logos, {
        autoAlpha: 0,
        y: 30,
        scale: 0.95,
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        onEnter: () => {
          gsap.to(title, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(logos, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.03,
            delay: 0.15,
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

    const logos = logosRef.current.filter(Boolean);
    const hoverHandlers: Array<{
      element: HTMLElement;
      scaleTween: gsap.core.Tween;
      enterHandler: () => void;
      leaveHandler: () => void;
    }> = [];

    logos.forEach((logo) => {
      if (!logo) return;

      const bgElement = logo.querySelector(".client-logo-bg") as HTMLElement;
      const imgElement = logo.querySelector(".client-logo-img") as HTMLElement;

      const scaleTween = gsap.to(logo, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
        paused: true,
        force3D: true,
      });

      const bgTween = bgElement
        ? gsap.to(bgElement, {
            background: "rgba(30, 30, 30, 0.6)",
            borderColor: "rgba(255, 107, 53, 0.2)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 107, 53, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            duration: 0.4,
            ease: "power2.out",
            paused: true,
          })
        : null;

      const imgTween = imgElement
        ? gsap.to(imgElement, {
            filter: "drop-shadow(0 4px 12px rgba(255, 107, 53, 0.3)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))",
            duration: 0.4,
            ease: "power2.out",
            paused: true,
          })
        : null;

      const handleMouseEnter = () => {
        scaleTween.play();
        bgTween?.play();
        imgTween?.play();
      };

      const handleMouseLeave = () => {
        scaleTween.reverse();
        bgTween?.reverse();
        imgTween?.reverse();
      };

      logo.addEventListener("mouseenter", handleMouseEnter);
      logo.addEventListener("mouseleave", handleMouseLeave);

      hoverHandlers.push({
        element: logo,
        scaleTween,
        enterHandler: handleMouseEnter,
        leaveHandler: handleMouseLeave,
      });
    });

    return () => {
      hoverHandlers.forEach(
        ({ element, scaleTween, enterHandler, leaveHandler }) => {
          element.removeEventListener("mouseenter", enterHandler);
          element.removeEventListener("mouseleave", leaveHandler);
          scaleTween.kill();
        }
      );
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 md:py-24 lg:py-32 clients-section"
      style={{
        background: "linear-gradient(180deg, #1a0f1a 0%, #0a0a0a 50%, #000000 100%)",
        zIndex: 40,
        position: "relative",
      }}
    >
      {/* Section Title */}
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16 text-center px-4 md:px-0"
      >
        Our Clients
      </h2>

      {/* Client Logos Grid */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {clientLogos.map((client, index) => (
            <div
              key={client.id}
              ref={(el) => {
                logosRef.current[index] = el;
              }}
              className="relative flex items-center justify-center p-4 md:p-6 cursor-pointer group client-logo-container"
              style={{
                aspectRatio: "1 / 1",
                willChange: "transform",
              }}
            >
              {/* Subtle dark glassmorphism background */}
              <div 
                className="absolute inset-0 rounded-xl transition-all duration-300 client-logo-bg"
                style={{
                  background: "rgba(26, 26, 26, 0.4)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                }}
              />
              
              {/* Subtle orange glow on hover */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 client-logo-glow"
                style={{
                  background: "radial-gradient(circle at center, rgba(255, 107, 53, 0.15) 0%, transparent 70%)",
                  boxShadow: "0 0 20px rgba(255, 107, 53, 0.2), inset 0 0 20px rgba(255, 107, 53, 0.1)",
                }}
              />
              
              <div className="relative w-full h-full flex items-center justify-center z-10">
                <img
                  src={client.src}
                  alt={client.alt}
                  className="w-full h-full object-contain transition-all duration-300 client-logo-img"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

