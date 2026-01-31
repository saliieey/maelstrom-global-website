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
import { PortfolioGrid } from "@/sections/PortfolioGrid";
import { ServicesExpandable } from "@/sections/ServicesExpandable";
import { StatsScroll } from "@/sections/StatsScroll";
import { ClientsSection } from "@/sections/ClientsSection";
import { OurWorksSection } from "@/sections/OurWorksSection";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Hero Section - Video and Text as Single Cohesive Section */}
      <div className="relative z-0">
        <HeroScroll />
      </div>
      
      {/* Text Reveal Section - Read Along Effect - Starts after hero with proper gap */}
      <div className="relative z-0">
        <TextReveal />
      </div>
      
      {/* Portfolio Grid Section - Bento Grid Layouts - Appears below TextReveal with natural scroll */}
      <div className="relative z-0">
        <PortfolioGrid />
      </div>
      
      {/* Services Expandable Section - Expandable service cards with slide-up overlay */}
      <div className="relative z-20">
        <ServicesExpandable />
      </div>
      
      {/* Stats Scroll Section - Scroll-triggered counter reel animation */}
      <div className="relative z-30 -mt-0">
        <StatsScroll />
      </div>
      
      {/* Clients Section - Client logos with hover effects */}
      <div className="relative z-40">
        <ClientsSection />
      </div>
      
      {/* Our Works Section - Featured works showcase */}
      <div className="relative z-0">
        <OurWorksSection />
      </div>
      
      {/* Footer Section */}
      <Footer />
    </main>
  );
}
