/**
 * Navigation Structure
 * Categorized Services with headings and sub-items
 * Multilingual navigation structure
 */

import { Locale } from './config';

export interface NavigationItem {
  label: Record<Locale, string>;
  href: string;
  children?: NavigationItem[];
}

export interface ServiceCategory {
  heading: Record<Locale, string>;
  items: {
    label: Record<Locale, string>;
    href: string;
  }[];
}

/**
 * Main Navigation Structure
 */
export const navigationItems: NavigationItem[] = [
  {
    label: {
      en: 'Home',
      ar: 'الرئيسية',
      hi: 'होम',
      ml: 'ഹോം',
    },
    href: '/',
  },
  {
    label: {
      en: 'About',
      ar: 'من نحن',
      hi: 'हमारे बारे में',
      ml: 'ഞങ്ങളെക്കുറിച്ച്',
    },
    href: '/about',
  },
  {
    label: {
      en: 'Services',
      ar: 'خدماتنا',
      hi: 'सेवाएं',
      ml: 'സേവനങ്ങൾ',
    },
    href: '/services',
    children: [], // Will be populated with service categories
  },
  {
    label: {
      en: 'Work',
      ar: 'أعمالنا',
      hi: 'काम',
      ml: 'ജോലി',
    },
    href: '/work',
  },
  {
    label: {
      en: 'Blog and News',
      ar: 'المدونة والأخبار',
      hi: 'ब्लॉग और समाचार',
      ml: 'ബ്ലോഗും വാർത്തകളും',
    },
    href: '/blog',
  },
  {
    label: {
      en: 'Careers',
      ar: 'الوظائف',
      hi: 'करियर',
      ml: 'കരിയർ',
    },
    href: '/careers',
  },
  {
    label: {
      en: 'Contact',
      ar: 'اتصل بنا',
      hi: 'संपर्क करें',
      ml: 'ബന്ധപ്പെടുക',
    },
    href: '/contact',
  },
];

/**
 * Service Categories with Headings and Items
 * Based on website structure: Digital Marketing, Branding & Creative, Media & Production, Web & Technology
 */
export const serviceCategories: ServiceCategory[] = [
  {
    heading: {
      en: 'Digital Marketing',
      ar: 'التسويق الرقمي',
      hi: 'डिजिटल मार्केटिंग',
      ml: 'ഡിജിറ്റൽ മാർക്കറ്റിംഗ്',
    },
    items: [
      {
        label: {
          en: 'Social Media Marketing',
          ar: 'التسويق عبر وسائل التواصل الاجتماعي',
          hi: 'सोशल मीडिया मार्केटिंग',
          ml: 'സോഷ്യൽ മീഡിയ മാർക്കറ്റിംഗ്',
        },
        href: '/services/social-media-marketing',
      },
      {
        label: {
          en: 'SEO',
          ar: 'تحسين محركات البحث',
          hi: 'एसईओ',
          ml: 'എസ്ഇഓ',
        },
        href: '/services/seo',
      },
      {
        label: {
          en: 'Performance Marketing',
          ar: 'التسويق بالأداء',
          hi: 'परफॉर्मेंस मार्केटिंग',
          ml: 'പെർഫോമൻസ് മാർക്കറ്റിംഗ്',
        },
        href: '/services/performance-marketing',
      },
      {
        label: {
          en: 'Influencer Marketing',
          ar: 'التسويق المؤثر',
          hi: 'इन्फ्लुएंसर मार्केटिंग',
          ml: 'ഇൻഫ്ലുവെൻസർ മാർക്കറ്റിംഗ്',
        },
        href: '/services/influencer-marketing',
      },
    ],
  },
  {
    heading: {
      en: 'Branding & Creative',
      ar: 'العلامة التجارية والإبداع',
      hi: 'ब्रांडिंग और क्रिएटिव',
      ml: 'ബ്രാൻഡിംഗ് & ക്രിയേറ്റീവ്',
    },
    items: [
      {
        label: {
          en: 'Branding',
          ar: 'العلامة التجارية',
          hi: 'ब्रांडिंग',
          ml: 'ബ്രാൻഡിംഗ്',
        },
        href: '/services/branding',
      },
      {
        label: {
          en: 'Print Design',
          ar: 'تصميم الطباعة',
          hi: 'प्रिंट डिज़ाइन',
          ml: 'പ്രിന്റ് ഡിസൈൻ',
        },
        href: '/services/print-design',
      },
      {
        label: {
          en: 'Package Design',
          ar: 'تصميم العبوات',
          hi: 'पैकेज डिज़ाइन',
          ml: 'പാക്കേജ് ഡിസൈൻ',
        },
        href: '/services/package-design',
      },
    ],
  },
  {
    heading: {
      en: 'Media & Production',
      ar: 'الوسائط والإنتاج',
      hi: 'मीडिया और प्रोडक्शन',
      ml: 'മീഡിയ & പ്രൊഡക്ഷൻ',
    },
    items: [
      {
        label: {
          en: 'Production Page (Photo & Video)',
          ar: 'صفحة الإنتاج (الصور والفيديو)',
          hi: 'प्रोडक्शन पेज (फोटो और वीडियो)',
          ml: 'പ്രൊഡക്ഷൻ പേജ് (ഫോട്ടോ & വീഡിയോ)',
        },
        href: '/services/production',
      },
      {
        label: {
          en: 'AI and Motion',
          ar: 'الذكاء الاصطناعي والحركة',
          hi: 'एआई और मोशन',
          ml: 'എഐ & മോഷൻ',
        },
        href: '/services/ai-motion',
      },
    ],
  },
  {
    heading: {
      en: 'Web & Technology',
      ar: 'الويب والتكنولوجيا',
      hi: 'वेब और प्रौद्योगिकी',
      ml: 'വെബ് & ടെക്നോളജി',
    },
    items: [
      {
        label: {
          en: 'Web Development',
          ar: 'تطوير المواقع',
          hi: 'वेब डेवलपमेंट',
          ml: 'വെബ് ഡെവലപ്മെന്റ്',
        },
        href: '/services/web-development',
      },
    ],
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

