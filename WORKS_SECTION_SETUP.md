# Our Works Section - Setup Guide

## ✅ What's Been Created

1. **OurWorksSection Component** (`sections/OurWorksSection.tsx`)
   - Displays 6 featured works on the home page
   - Each work shows: title, description, and two images
   - "See more works" button that navigates to `/works` page
   - Responsive design matching the reference screenshots

2. **Works Page** (`app/works/page.tsx`)
   - Full works showcase page with category filtering
   - Sidebar with category filters (matching service categories)
   - Grid layout displaying all works
   - Responsive design

3. **Type Definitions** (`types/wordpress.ts`)
   - `WorkItem` interface for work data structure
   - `WorkCategory` type for work categories

4. **Works API Utilities** (`lib/works.ts`)
   - Functions to fetch works from WordPress
   - Mock data for development
   - Category filtering functions

5. **Image Directory** (`public/assets/images/works/`)
   - Directory created for work images

## 📋 Work Categories

The works are categorized based on your services:

- **Social Media**
- **Performance Marketing**
- **SEO**
- **Influencer Marketing**
- **Web Development & UI/UX**
- **Production**
- **Branding & Creative**

## 🎨 Design Features

### Home Page Section
- Dark background (`#0a0a0a`)
- Large section title "Our Works"
- Each work displays:
  - Title (e.g., "Partnering with Amend Dental")
  - Description/tagline (e.g., "Where modern care meets confident smiles")
  - Two images side by side (3:4 aspect ratio)
- Hover effects on images
- "See more works" button at the bottom

### Works Page
- Full page layout with sidebar
- Category filter sidebar (sticky on desktop)
- Grid layout for works (3 columns on desktop, 2 on tablet, 1 on mobile)
- Hover effects showing work details
- Active category highlighting

## 🔌 WordPress Integration

The section is set up to work with WordPress Headless CMS:

1. **Custom Post Type**: Create a custom post type called "works" in WordPress
2. **Fields Required**:
   - Title
   - Description
   - Category (taxonomy matching the categories above)
   - Featured Image 1
   - Featured Image 2
   - Featured flag (for home page highlights)
   - Order (for sorting)

3. **API Endpoint**: `/wp-json/wp/v2/works`

The code will automatically:
- Fetch works from WordPress when available
- Fall back to mock data during development
- Handle errors gracefully

## 📝 Adding Works

### Via WordPress (Production)
1. Log into WordPress admin
2. Navigate to Works → Add New
3. Fill in:
   - Title
   - Description
   - Select category
   - Upload Image 1
   - Upload Image 2
   - Check "Featured" if it should appear on home page
   - Set order number
4. Publish

### Via Mock Data (Development)
Edit `lib/works.ts` and add to the `MOCK_WORKS` array:

```typescript
{
  id: 7,
  title: "Your Work Title",
  description: "Your work description",
  category: "Branding & Creative", // or any category from the list
  image1: "/assets/images/works/your-work-1.jpg",
  image2: "/assets/images/works/your-work-2.jpg",
  image1Alt: "Alt text for image 1",
  image2Alt: "Alt text for image 2",
  featured: true, // Set to true to show on home page
  order: 7, // For sorting
  slug: "your-work-slug",
}
```

## 🖼️ Adding Images

1. Place images in `public/assets/images/works/`
2. Use descriptive filenames (e.g., `amend-dental-1.jpg`)
3. Recommended size: 600x800px (3:4 aspect ratio)
4. Optimize images for web

## 🔗 Navigation

The navigation has been updated to link to `/works` page.

## 🚀 Next Steps

1. **Add Images**: Place work images in `public/assets/images/works/`
2. **Update Mock Data**: Edit `lib/works.ts` with your actual works
3. **WordPress Setup**: When ready, set up WordPress custom post type
4. **Content Management**: Content editors can manage works through WordPress admin

## 📱 Responsive Design

- **Mobile**: Single column, stacked images
- **Tablet**: Two columns for images
- **Desktop**: Full layout with sidebar on works page

## 🎯 Features

- ✅ Dynamic content management (WordPress ready)
- ✅ Category filtering
- ✅ Featured works on home page
- ✅ Responsive design
- ✅ Hover effects and animations
- ✅ Image error handling with placeholders
- ✅ SEO-friendly structure


