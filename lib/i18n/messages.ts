/**
 * Translation Messages
 * Central translation file for all languages
 * Structure: messages[locale][key] = translation
 */

import { Locale } from './config';

export type TranslationKey = string;

export interface Messages {
  [key: string]: string | Messages;
}

export const messages: Record<Locale, Messages> = {
  en: {
    common: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      work: 'Work',
      blog: 'Blog and News',
      careers: 'Careers',
      contact: 'Contact',
      language: 'Language',
      selectLanguage: 'Select Language',
    },
    services: {
      digitalMarketing: 'Digital Marketing',
      brandingCreative: 'Branding & Creative',
      mediaProduction: 'Media & Production',
      webTechnology: 'Web & Technology',
      socialMediaMarketing: 'Social Media Marketing',
      seo: 'SEO',
      performanceMarketing: 'Performance Marketing',
      influencerMarketing: 'Influencer Marketing',
      branding: 'Branding',
      printDesign: 'Print Design',
      packageDesign: 'Package Design',
      production: 'Production Page (Photo & Video)',
      aiMotion: 'AI and Motion',
      webDevelopment: 'Web Development',
    },
  },
  ar: {
    common: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      work: 'أعمالنا',
      blog: 'المدونة والأخبار',
      careers: 'الوظائف',
      contact: 'اتصل بنا',
      language: 'اللغة',
      selectLanguage: 'اختر اللغة',
    },
    services: {
      digitalMarketing: 'التسويق الرقمي',
      brandingCreative: 'العلامة التجارية والإبداع',
      mediaProduction: 'الوسائط والإنتاج',
      webTechnology: 'الويب والتكنولوجيا',
      socialMediaMarketing: 'التسويق عبر وسائل التواصل الاجتماعي',
      seo: 'تحسين محركات البحث',
      performanceMarketing: 'التسويق بالأداء',
      influencerMarketing: 'التسويق المؤثر',
      branding: 'العلامة التجارية',
      printDesign: 'تصميم الطباعة',
      packageDesign: 'تصميم العبوات',
      production: 'صفحة الإنتاج (الصور والفيديو)',
      aiMotion: 'الذكاء الاصطناعي والحركة',
      webDevelopment: 'تطوير المواقع',
    },
  },
  hi: {
    common: {
      home: 'होम',
      about: 'हमारे बारे में',
      services: 'सेवाएं',
      work: 'काम',
      blog: 'ब्लॉग और समाचार',
      careers: 'करियर',
      contact: 'संपर्क करें',
      language: 'भाषा',
      selectLanguage: 'भाषा चुनें',
    },
    services: {
      digitalMarketing: 'डिजिटल मार्केटिंग',
      brandingCreative: 'ब्रांडिंग और क्रिएटिव',
      mediaProduction: 'मीडिया और प्रोडक्शन',
      webTechnology: 'वेब और प्रौद्योगिकी',
      socialMediaMarketing: 'सोशल मीडिया मार्केटिंग',
      seo: 'एसईओ',
      performanceMarketing: 'परफॉर्मेंस मार्केटिंग',
      influencerMarketing: 'इन्फ्लुएंसर मार्केटिंग',
      branding: 'ब्रांडिंग',
      printDesign: 'प्रिंट डिज़ाइन',
      packageDesign: 'पैकेज डिज़ाइन',
      production: 'प्रोडक्शन पेज (फोटो और वीडियो)',
      aiMotion: 'एआई और मोशन',
      webDevelopment: 'वेब डेवलपमेंट',
    },
  },
  ml: {
    common: {
      home: 'ഹോം',
      about: 'ഞങ്ങളെക്കുറിച്ച്',
      services: 'സേവനങ്ങൾ',
      work: 'ജോലി',
      blog: 'ബ്ലോഗും വാർത്തകളും',
      careers: 'കരിയർ',
      contact: 'ബന്ധപ്പെടുക',
      language: 'ഭാഷ',
      selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    },
    services: {
      digitalMarketing: 'ഡിജിറ്റൽ മാർക്കറ്റിംഗ്',
      brandingCreative: 'ബ്രാൻഡിംഗ് & ക്രിയേറ്റീവ്',
      mediaProduction: 'മീഡിയ & പ്രൊഡക്ഷൻ',
      webTechnology: 'വെബ് & ടെക്നോളജി',
      socialMediaMarketing: 'സോഷ്യൽ മീഡിയ മാർക്കറ്റിംഗ്',
      seo: 'എസ്ഇഓ',
      performanceMarketing: 'പെർഫോമൻസ് മാർക്കറ്റിംഗ്',
      influencerMarketing: 'ഇൻഫ്ലുവെൻസർ മാർക്കറ്റിംഗ്',
      branding: 'ബ്രാൻഡിംഗ്',
      printDesign: 'പ്രിന്റ് ഡിസൈൻ',
      packageDesign: 'പാക്കേജ് ഡിസൈൻ',
      production: 'പ്രൊഡക്ഷൻ പേജ് (ഫോട്ടോ & വീഡിയോ)',
      aiMotion: 'എഐ & മോഷൻ',
      webDevelopment: 'വെബ് ഡെവലപ്മെന്റ്',
    },
  },
};

/**
 * Get translation for a key
 */
export const getTranslation = (
  locale: Locale,
  key: string,
  params?: Record<string, string>
): string => {
  const keys = key.split('.');
  let value: any = messages[locale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if translation not found
      value = messages.en;
      for (const k2 of keys) {
        if (value && typeof value === 'object' && k2 in value) {
          value = value[k2];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }

  if (typeof value !== 'string') {
    return key;
  }

  // Replace parameters if provided
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] || match;
    });
  }

  return value;
};

/**
 * Get nested translation
 */
export const t = (
  locale: Locale,
  namespace: string,
  key: string
): string => {
  return getTranslation(locale, `${namespace}.${key}`);
};

