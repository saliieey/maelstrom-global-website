"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/alignment/Section";
import { Container } from "@/components/alignment/Container";
import { WorkItem, WorkCategory } from "@/types/wordpress";
import { MOCK_WORKS, WORK_CATEGORIES, fetchWorksByCategory } from "@/lib/works";

/**
 * Works Page
 * Displays all works with category filtering
 * Based on the reference design with sidebar categories
 */
export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory | "All Works">("All Works");
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorks = async () => {
      setLoading(true);
      try {
        const fetchedWorks = await fetchWorksByCategory(selectedCategory);
        if (fetchedWorks.length > 0) {
          setWorks(fetchedWorks);
        } else {
          // Use mock data for development
          if (selectedCategory === "All Works") {
            setWorks(MOCK_WORKS);
          } else {
            setWorks(MOCK_WORKS.filter((work) => work.category === selectedCategory));
          }
        }
      } catch (error) {
        // Fallback to mock data
        if (selectedCategory === "All Works") {
          setWorks(MOCK_WORKS);
        } else {
          setWorks(MOCK_WORKS.filter((work) => work.category === selectedCategory));
        }
      } finally {
        setLoading(false);
      }
    };

    loadWorks();
  }, [selectedCategory]);

  return (
    <main className="min-h-screen text-white">
      {/* Title and Categories Section - Home page theme background */}
      <Section id="works-page-header" padding="lg" className="relative overflow-hidden !px-0">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10, 10, 10, 0.95) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(10, 10, 10, 0.95) 100%)",
          }}
        />
        <Container maxWidth="xl" align="left" className="relative z-10">
          {/* Top Row: Title (Left) + Categories (Right) - Same Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Page Title - Left Side */}
            <div className="lg:col-span-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Explore all our works below
              </h1>
            </div>

            {/* Sidebar - Categories - Right Side */}
            <div className="lg:col-span-4">
              <h2 className="text-lg md:text-xl font-semibold text-white/60 mb-6 uppercase tracking-wider">
                Categories
              </h2>
              <nav className="space-y-2">
                {/* All Works */}
                <button
                  onClick={() => setSelectedCategory("All Works")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedCategory === "All Works"
                      ? "text-white font-semibold bg-white/10"
                      : "text-white/60 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  All Works
                </button>

                {/* Category Filters */}
                {WORK_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === category
                        ? "text-white font-semibold bg-white/10"
                        : "text-white/60 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </Container>
      </Section>

      {/* Works Grid Section - Black background */}
      <Section id="works-page-content" padding="lg" className="bg-[#0a0a0a] !px-0">
        <Container maxWidth="xl" align="left" className="relative">

          {/* Works Grid - Full Width Below Title/Categories Row */}
          {loading ? (
            <div className="text-center py-20 text-white/60">
              Loading works...
            </div>
          ) : works.length === 0 ? (
            <div className="text-center py-20 text-white/60">
              No works found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[60px] md:gap-x-[60px] md:gap-y-[80px] lg:gap-x-[80px] lg:gap-y-[100px]">
              {works.map((work) => (
                <div
                  key={work.id}
                  className="flex flex-col h-full w-full"
                >
                  {/* Work Image Container - Match home page exact styling */}
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

                  {/* Work Title - Always visible, left-aligned */}
                  <h3 className="font-medium text-white tracking-wide text-[15px] md:text-[22px] lg:text-[25px] my-[10px] text-left leading-tight">
                    {work.title}
                  </h3>

                  {/* Work Description - Always visible, left-aligned */}
                  <p className="text-white opacity-55 tracking-wide font-[thin] text-left text-[14px] md:text-[18px] leading-relaxed">
                    {work.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}


