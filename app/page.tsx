/**
 * Homepage - Maelstrom Global Website
 * This page will be implemented once the design is ready from the graphic design team.
 * Content scrolls below the fixed glassmorphism navigation bar.
 */
// TEMPORARILY REMOVED: dynamic/revalidate conflicts with static export
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

import { HeroScroll } from "@/sections/HeroScroll";
import { TextReveal } from "@/sections/TextReveal";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Hero Section - Video and Text as Single Cohesive Section */}
      <div className="relative z-0">
        <HeroScroll />
      </div>
      
      {/* Text Reveal Section - Read Along Effect - Starts after hero with proper gap */}
      <div className="relative z-10 -mt-0">
        <TextReveal />
      </div>
      
      {/* Next Section - Flows naturally below hero with proper spacing */}
      <section className="pt-24 pb-20 px-4 md:pt-32 md:pb-24 relative z-20 bg-transparent">
        <div className="container mx-auto space-y-16">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Section {i + 1}
              </h2>
              <p className="text-white/80 leading-relaxed text-lg">
                This is dummy content to allow scrolling and test the HeroScroll animation. 
                Scroll down to see the video transform from full-screen to a card shape.
                The animation will trigger as you scroll through this content area.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
