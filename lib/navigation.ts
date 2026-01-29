/**
 * Navigation Structure
 * English-only navigation with categorized Services
 */

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface ServiceCategory {
  heading: string;
  items: {
    label: string;
    href: string;
  }[];
}

/**
 * Service Categories with Headings and Items
 */
export const serviceCategories: ServiceCategory[] = [
  {
    heading: 'Digital Marketing',
    items: [
      {
        label: 'Social Media Marketing',
        href: '/services/social-media-marketing',
      },
      {
        label: 'SEO',
        href: '/services/seo',
      },
      {
        label: 'Performance Marketing',
        href: '/services/performance-marketing',
      },
      {
        label: 'Influencer Marketing',
        href: '/services/influencer-marketing',
      },
    ],
  },
  {
    heading: 'Branding & Creative',
    items: [
      {
        label: 'Branding',
        href: '/services/branding',
      },
      {
        label: 'Print Design',
        href: '/services/print-design',
      },
      {
        label: 'Package Design',
        href: '/services/package-design',
      },
    ],
  },
  {
    heading: 'Media & Production',
    items: [
      {
        label: 'Production Page (Photo & Video)',
        href: '/services/production',
      },
      {
        label: 'AI and Motion',
        href: '/services/ai-motion',
      },
    ],
  },
  {
    heading: 'Web & Technology',
    items: [
      {
        label: 'Web Development',
        href: '/services/web-development',
      },
    ],
  },
];

/**
 * Main Navigation Structure
 */
export const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Services',
    href: '/services',
    children: [], // Will be populated with service categories
  },
  {
    label: 'Work',
    href: '/works',
  },
  {
    label: 'Blog and News',
    href: '/blog',
  },
  {
    label: 'Careers',
    href: '/careers',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

/**
 * Get navigation items with services populated
 */
export const getNavigationItems = (): NavigationItem[] => {
  const items = [...navigationItems];
  
  // Find Services item and populate children with categories
  const servicesIndex = items.findIndex(
    (item) => item.href === '/services'
  );
  
  if (servicesIndex !== -1) {
    // Create navigation structure with headings and items
    items[servicesIndex].children = serviceCategories.map((category) => ({
      label: category.heading,
      href: '#', // Heading doesn't link
      children: category.items.map((item) => ({
        label: item.label,
        href: item.href,
      })),
    }));
  }
  
  return items;
};

