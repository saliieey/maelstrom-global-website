"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Section } from "@/components/alignment/Section";
import { Container } from "@/components/alignment/Container";
import { WorkItem } from "@/types/wordpress";
import { MOCK_WORKS, fetchFeaturedWorks } from "@/lib/works";

/**
 * OurWorksSection Component
 * Displays 6 featured works on the home page
 * Based on the reference design with image pairs and descriptions
 */
export const OurWorksSection = () => {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Try to fetch from WordPress, fallback to mock data
    const loadWorks = async () => {
      try {
        const featuredWorks = await fetchFeaturedWorks(6);
        if (featuredWorks.length > 0) {
          setWorks(featuredWorks);
        } else {
          // Use mock data for development
          setWorks(MOCK_WORKS.slice(0, 6));
        }
      } catch (error) {
        // Fallback to mock data
        setWorks(MOCK_WORKS.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };

    loadWorks();
  }, []);

  if (loading) {
    return (
      <Section id="works" padding="lg" className="bg-[#0a0a0a]">
        <Container maxWidth="xl" align="center">
          <div className="text-white text-center py-20">Loading works...</div>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      ref={sectionRef}
      id="works"
      padding="lg"
      className="bg-[#0a0a0a] relative overflow-hidden !px-0"
      style={{
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10, 10, 10, 0.95) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(10, 10, 10, 0.95) 100%)",
        }}
      />

      <Container maxWidth="xl" align="center" padding={true} className="relative z-10">
        {/* Section Title */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white text-center tracking-tight">
            Our Works
          </h2>
        </div>

        {/* Works Grid - 3 columns on desktop, 1 column on mobile - Centered and aligned */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[40px] gap-y-[60px] md:gap-x-[60px] md:gap-y-[80px] lg:gap-x-[80px] lg:gap-y-[100px] w-full max-w-[1400px] mx-auto">
            {works.map((work) => (
              <div
                key={work.id}
                className="flex flex-col h-full w-full"
                style={{ minHeight: 'fit-content' }}
              >
                {/* Work Image Container - Match Haris&Co exact styling (534.14 x 300.45) */}
                <div className="relative w-full mb-[10px] overflow-hidden flex items-center justify-center bg-transparent">
                  <img
                    src={work.image1}
                    alt={work.image1Alt || work.title}
                    className="w-full h-auto object-contain"
                    style={{
                      aspectRatio: '534.14 / 300.45',
                      maxWidth: '100%',
                      display: 'block',
                    }}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to Unsplash image if placeholder fails
                      const target = e.target as HTMLImageElement;
                      const unsplashIds = [
                        '1519681393784-d120267933ba',
                        '1611162617474-5b21e879e113',
                        '1611162616305-c69b3fa7fbe0',
                        '1505142468610-359e7d316be0',
                        '1506905925346-21bda4d32df4',
                        '1519681393784-d120267933ba',
                      ];
                      const id = unsplashIds[work.id - 1] || unsplashIds[0];
                      target.src = `https://images.unsplash.com/photo-${id}?w=534&h=300&fit=crop`;
                      target.style.display = 'block';
                    }}
                  />
                </div>

                {/* Work Title - Fixed height to prevent layout shift */}
                <h3 className="font-medium text-white tracking-wide text-[15px] md:text-[22px] lg:text-[25px] my-[10px] text-left leading-tight line-clamp-2">
                  {work.title}
                </h3>

                {/* Work Description - Fixed height to prevent layout shift */}
                <p className="text-white opacity-55 tracking-wide font-[thin] text-left text-[14px] md:text-[18px] leading-relaxed line-clamp-2">
                  {work.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* See More Works Button */}
        <div className="mt-16 md:mt-20 lg:mt-24 text-center">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 px-8 py-4 md:px-10 md:py-5 text-base md:text-lg font-medium text-white bg-transparent border-2 border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 hover:bg-white/5 group"
          >
            <span>See more works</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

