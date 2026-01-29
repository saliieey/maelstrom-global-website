/**
 * WordPress API Type Definitions
 * TypeScript interfaces for WordPress REST API responses
 */

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, unknown>;
  categories: number[];
  tags: number[];
  _links: Record<string, unknown>;
}

export interface WordPressPage extends WordPressPost {
  parent: number;
  menu_order: number;
}

export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  media_type: string;
  mime_type: string;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, {
      file: string;
      width: number;
      height: number;
      mime_type: string;
      source_url: string;
    }>;
  };
}

/**
 * Work Category Types
 */
export type WorkCategory = 
  | "Social Media"
  | "Performance Marketing"
  | "SEO"
  | "Influencer Marketing"
  | "Web Development & UI/UX"
  | "Production"
  | "Branding & Creative";

/**
 * Work Item Interface
 */
export interface WorkItem {
  id: number;
  title: string;
  description: string;
  category: WorkCategory;
  image1: string;
  image2: string;
  image1Alt?: string;
  image2Alt?: string;
  featured: boolean; // For home page highlights
  order: number; // For sorting
  slug: string;
  date?: string;
}

