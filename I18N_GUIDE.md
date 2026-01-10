# 🌍 Multilingual System Guide

## Overview

**Maelstrom Global Website** supports **4 languages** with full internationalization:
- 🇬🇧 **English** (en) - Default
- 🇸🇦 **Arabic** (ar) - RTL support
- 🇮🇳 **Hindi** (hi)
- 🇮🇳 **Malayalam** (ml)

## 🎯 Features

- ✅ **4 Languages**: English, Arabic, Hindi, Malayalam
- ✅ **RTL Support**: Automatic RTL for Arabic
- ✅ **Language Switcher**: Dropdown with flag icons (ideal UX)
- ✅ **Auto Detection**: Detects browser language preference
- ✅ **Cookie Persistence**: Remembers user's language choice
- ✅ **SEO Friendly**: Locale-based URLs (/en/, /ar/, /hi/, /ml/)
- ✅ **Categorized Services**: Services dropdown with headings and items

## 📁 Navigation Structure

### Services Dropdown Structure

**Services** dropdown includes **4 categories** with headings and items:

1. **Digital Marketing** (Heading)
   - Social Media Marketing
   - SEO
   - Performance Marketing
   - Influencer Marketing

2. **Branding & Creative** (Heading)
   - Branding
   - Print Design
   - Package Design

3. **Media & Production** (Heading)
   - Production Page (Photo & Video)
   - AI and Motion

4. **Web & Technology** (Heading)
   - Web Development

## 🧩 Components

### Language Switcher

**Ideal UX**: Dropdown with flag icons for easy selection

```tsx
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';

<LanguageSwitcher 
  currentLocale={locale} 
  variant="dropdown" // 'dropdown' | 'buttons' | 'select'
/>
```

**Variants**:
- `dropdown` (default) - Ideal UX with flag icons and names
- `buttons` - Button group for each language
- `select` - Native select dropdown

### Navigation Component

**Ready for design implementation** - structure prepared with categorized Services:

```tsx
import { Navigation } from '@/components/navigation/Navigation';

<Navigation locale={locale} />
```

**Features**:
- ✅ Categorized Services dropdown with headings
- ✅ Mobile-responsive menu
- ✅ Active state highlighting
- ✅ Multilingual labels
- ✅ Smooth animations (ready for GSAP)
- ✅ Sticky navigation

## 🔧 Usage Examples

### Using Translations

```tsx
import { t } from '@/lib/i18n/utils';

const title = t(locale, 'common.home');
const serviceName = t(locale, 'services.seo');
```

### Using Navigation Items

```tsx
import { getNavigationItems } from '@/lib/i18n/navigation';

const navItems = getNavigationItems();
// Returns navigation with Services populated with categories
```

### Language Switching

Language switcher automatically:
1. Saves preference to cookie
2. Updates URL with locale prefix
3. Refreshes page content
4. Applies RTL if Arabic selected

## 📐 RTL Support (Arabic)

**Automatic RTL** when Arabic is selected:

- ✅ Direction set to `rtl` in HTML
- ✅ CSS classes adjust automatically
- ✅ Navigation aligns right
- ✅ Text alignment reverses
- ✅ Layout mirrors properly

## 🚀 Implementation Notes

### App Router Structure (When Ready)

When implementing pages, use this structure:

```
app/
├── [locale]/
│   ├── layout.tsx      # Locale-specific layout
│   ├── page.tsx        # Homepage
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── seo/
│   │   │   └── page.tsx
│   │   └── ...
│   └── ...
```

### Locale Detection

1. **Browser Language** - Detected from Accept-Language header
2. **Cookie** - Remembers user choice (1 year expiry)
3. **URL** - Locale prefix in path (/en/, /ar/, /hi/, /ml/)
4. **Default** - Falls back to English

### Middleware

The `middleware.ts` file handles:
- ✅ Locale detection
- ✅ URL rewriting
- ✅ Cookie management
- ✅ Redirects to locale-prefixed URLs

## 📊 Translation Files

Translations are stored in `lib/i18n/messages.ts`:

```typescript
messages: {
  en: { common: { home: 'Home' }, services: { ... } },
  ar: { common: { home: 'الرئيسية' }, services: { ... } },
  hi: { common: { home: 'होम' }, services: { ... } },
  ml: { common: { home: 'ഹോം' }, services: { ... } },
}
```

**Add new translations** by extending the `messages` object.

## ✅ Navigation Implementation Status

### ✅ Completed

- ✅ Navigation structure with categorized Services
- ✅ Language switcher component
- ✅ Translation system
- ✅ RTL support for Arabic
- ✅ Middleware for locale routing
- ✅ Responsive mobile menu
- ✅ Services dropdown with headings

### ⏳ Waiting For

- ⏳ Navigation bar design (screenshot)
- ⏳ Logo/Assets
- ⏳ Final styling preferences
- ⏳ Animation preferences

## 🎨 Navigation Features (Ready)

- ✅ **Sticky Navigation** - Fixed at top
- ✅ **Responsive** - Mobile menu with hamburger
- ✅ **Services Dropdown** - Categorized with headings
- ✅ **Language Switcher** - Integrated in navbar
- ✅ **Active States** - Highlights current page
- ✅ **Smooth Animations** - Ready for GSAP
- ✅ **RTL Support** - Automatic for Arabic
- ✅ **SEO Friendly** - Proper link structure

## 📝 Next Steps

1. ✅ **i18n system is ready**
2. ✅ **Navigation structure is ready**
3. ⏳ **Wait for navigation bar design**
4. 🔨 **Apply design to Navigation component**
5. 🚀 **Test all languages and RTL**

---

**Status**: ✅ **MULTILINGUAL SYSTEM READY**

The navigation component is **prepared and ready** for design implementation. Once you share the navigation bar design, we'll style it accordingly while maintaining all the functionality! 🎨🌍

