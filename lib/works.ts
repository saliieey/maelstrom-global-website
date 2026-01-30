/**
 * Works API utilities
 * Functions to fetch and manage works data
 */

import { WorkItem, WorkCategory } from "@/types/wordpress";
import { fetchWordPressData } from "./wordpress";

/**
 * Work Categories List
 */
export const WORK_CATEGORIES: WorkCategory[] = [
  "Social Media",
  "Performance Marketing",
  "SEO",
  "Influencer Marketing",
  "Web Development & UI/UX",
  "Production",
  "Branding & Creative",
];

/**
 * WordPress Works API Response Interface
 */
interface WordPressWorkResponse {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified: string;
  featured_media: number;
  work_details?: {
    description?: string;
    image1?: string;
    image1_alt?: string;
    image2?: string;
    image2_alt?: string;
    featured?: boolean;
    order?: number;
  };
  work_category_names?: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

/**
 * Map WordPress API response to WorkItem interface
 */
function mapWordPressWorkToWorkItem(wpWork: WordPressWorkResponse): WorkItem {
  const workDetails = wpWork.work_details || {};
  const featuredMedia = wpWork._embedded?.["wp:featuredmedia"]?.[0];

  // Get category - use work_category_names if available, otherwise default
  const category = (wpWork.work_category_names as WorkCategory) || "Branding & Creative";

  // Get images - prefer custom meta fields, fallback to featured media
  const image1 = workDetails.image1 || featuredMedia?.source_url || "";
  const image1Alt = workDetails.image1_alt || featuredMedia?.alt_text || wpWork.title.rendered;
  const image2 = workDetails.image2 || "";
  const image2Alt = workDetails.image2_alt || wpWork.title.rendered;

  // Get description - prefer custom meta field, fallback to excerpt
  const description = workDetails.description || 
    wpWork.excerpt?.rendered?.replace(/<[^>]*>/g, "").trim() || 
    "";

  return {
    id: wpWork.id,
    title: wpWork.title.rendered,
    description: description,
    category: category as WorkCategory,
    image1: image1,
    image2: image2,
    image1Alt: image1Alt,
    image2Alt: image2Alt,
    featured: workDetails.featured || false,
    order: workDetails.order || wpWork.id,
    slug: wpWork.slug,
    date: wpWork.date,
  };
}

/**
 * Fetch all works from WordPress
 */
export async function fetchWorks(): Promise<WorkItem[]> {
  try {
    // Fetch works with embedded media and custom fields
    const wpWorks = await fetchWordPressData<WordPressWorkResponse[]>(
      "/wp-json/wp/v2/works?per_page=100&_embed=1&status=publish"
    );
    
    // Map WordPress responses to WorkItem interface
    const works = wpWorks.map(mapWordPressWorkToWorkItem);
    
    return works;
  } catch (error) {
    console.warn("Failed to fetch works from WordPress:", error);
    // Return empty array if WordPress is not configured
    return [];
  }
}

/**
 * Fetch featured works (for home page)
 */
export async function fetchFeaturedWorks(limit: number = 6): Promise<WorkItem[]> {
  try {
    const works = await fetchWorks();
    return works
      .filter((work) => work.featured)
      .sort((a, b) => a.order - b.order)
      .slice(0, limit);
  } catch (error) {
    console.warn("Failed to fetch featured works:", error);
    return [];
  }
}

/**
 * Fetch works by category
 */
export async function fetchWorksByCategory(
  category: WorkCategory | "All Works"
): Promise<WorkItem[]> {
  try {
    const works = await fetchWorks();
    if (category === "All Works") {
      return works.sort((a, b) => a.order - b.order);
    }
    return works
      .filter((work) => work.category === category)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.warn("Failed to fetch works by category:", error);
    return [];
  }
}

/**
 * Mock data for development (remove when WordPress is connected)
 */
export const MOCK_WORKS: WorkItem[] = [
  {
    id: 1,
    title: "Partnering with Amend Dental",
    description: "Where modern care meets confident smiles",
    category: "Branding & Creative",
    image1: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=534&h=300&fit=crop",
    image2: "/assets/images/works/amend-2.jpg",
    image1Alt: "Amend Dental NRI Fest Campaign",
    image2Alt: "Amend Dental Professional Photography",
    featured: true,
    order: 1,
    slug: "amend-dental",
  },
  {
    id: 2,
    title: "Partnering with Tajriba Foods",
    description: "Serving tradition on every plate, with love at its core",
    category: "Branding & Creative",
    image1: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=534&h=300&fit=crop",
    image2: "/assets/images/works/tajriba-2.jpg",
    image1Alt: "Tajriba Peanut Butter Advertisement",
    image2Alt: "Tajriba Brand Photography",
    featured: true,
    order: 2,
    slug: "tajriba-foods",
  },
  {
    id: 3,
    title: "Partnering with Koyikoden Qissa",
    description: "A taste of Malabar heritage, told through every dish",
    category: "Branding & Creative",
    image1: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=534&h=300&fit=crop",
    image2: "/assets/images/works/koyikoden-2.jpg",
    image1Alt: "Koyikoden Qissa Food Advertisement",
    image2Alt: "Koyikoden Qissa Brand Story",
    featured: true,
    order: 3,
    slug: "koyikoden-qissa",
  },
  {
    id: 4,
    title: "Partnering with RISO Detergents",
    description: "Keeping clothes bright, clean, and full of life",
    category: "Social Media",
    image1: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=534&h=300&fit=crop",
    image2: "/assets/images/works/riso-2.jpg",
    image1Alt: "RISO Detergents Product Photography",
    image2Alt: "RISO Detergents Display",
    featured: true,
    order: 4,
    slug: "riso-detergents",
  },
  {
    id: 5,
    title: "Partnering with Sanford India",
    description: "Redesigning convenience for every kitchen",
    category: "Branding & Creative",
    image1: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=534&h=300&fit=crop",
    image2: "/assets/images/works/sanford-2.jpg",
    image1Alt: "Sanford Electric Kettle Advertisement",
    image2Alt: "Sanford Mixer Grinder Campaign",
    featured: true,
    order: 5,
    slug: "sanford-india",
  },
  {
    id: 6,
    title: "Partnering with Dr.Cafe",
    description: "Brewing moments that last forever",
    category: "Production",
    image1: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=534&h=300&fit=crop",
    image2: "/assets/images/works/drcafe-2.jpg",
    image1Alt: "Dr.Cafe Grape Mule Cocktail",
    image2Alt: "Dr.Cafe Beef Stroganoff",
    featured: true,
    order: 6,
    slug: "dr-cafe",
  },
];

