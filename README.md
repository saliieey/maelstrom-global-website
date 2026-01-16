# Maelstrom Global Website

Official company website built with Next.js (App Router) and WordPress Headless CMS.

## 🚀 Project Status

- ✅ Next.js project initialized
- ✅ GitHub repository connected
- ✅ Vercel CI/CD pipeline configured
- ✅ Live deployment: https://maelstrom-global-website.vercel.app
- ✅ Project structure prepared
- ⏳ Awaiting homepage design from graphic design team

## 📁 Project Structure

```
maelstrom-global-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage (ready for design implementation)
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── sections/              # Page sections (Hero, About, Services, etc.)
├── lib/                   # Utility functions and API helpers
│   └── wordpress.ts       # WordPress API integration utilities
├── types/                 # TypeScript type definitions
│   └── wordpress.ts       # WordPress API types
└── public/                # Static assets

```

## 🛠️ Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your WordPress API credentials:
     ```
     WORDPRESS_API_URL=your_wordpress_api_url
     WORDPRESS_AUTH_TOKEN=your_auth_token
     ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📋 Development Phases

- **Phase 1:** ✅ Structure setup and homepage implementation (awaiting design)
- **Phase 2:** Add subpages and components
- **Phase 3:** Connect WordPress Headless CMS
- **Phase 4:** SEO optimization and final polish
- **Phase 5:** Final review and production deployment

## 🔗 Links

- **Live Site:** https://maelstrom-global-website.vercel.app
- **Repository:** https://github.com/saliieey/maelstrom-global-website

## 📝 Notes

- The project uses Next.js 16.1.1 with App Router
- TypeScript is configured for type safety
- Tailwind CSS v4 is set up for styling
- WordPress integration utilities are prepared in `/lib/wordpress.ts`

## ⚡ Performance & SEO

- ✅ **Performance Optimized**: Lazy loading for heavy animation libraries
- ✅ **SEO Friendly**: Fast initial load, Core Web Vitals tracking
- ✅ **Device Adaptive**: Automatically reduces animations on low-end devices
- ✅ **Accessibility**: Respects `prefers-reduced-motion`

**See** `PERFORMANCE_SUMMARY.md` for complete performance strategy.

## 📱 Responsive Design

- ✅ **Pixel Perfect**: Responsive on ALL devices (mobile, tablet, desktop)
- ✅ **No Layout Collapse**: ResponsiveContainer ensures proper spacing
- ✅ **No Horizontal Scroll**: Mandatory prevention implemented
- ✅ **Mobile Optimized**: Touch targets, viewport fixes, safe areas
- ✅ **Device Detection**: Real-time responsive hooks available
- ✅ **Responsive Components**: Container, Image, Text, Animations

**See** `RESPONSIVE_GUIDE.md` for complete responsive strategy.

## 📐 Consistent Alignment (MANDATORY)

- ✅ **Global Alignment System**: Consistent alignment across ENTIRE PROJECT
- ✅ **No Random Alignments**: Mandatory alignment components and classes
- ✅ **Consistent Spacing**: 8px base unit system (no random values)
- ✅ **Section Padding**: Consistent responsive padding for all sections
- ✅ **Container Max-Widths**: Consistent max-widths for all containers
- ✅ **Grid Gap**: Consistent responsive gap for all grids
- ✅ **Text Alignment**: Consistent rules (headings center, body left, CTA center)
- ✅ **Global Application**: Applied to every page, every component

**See** `ALIGNMENT_GUIDE.md` for complete alignment strategy.

## 🎨 Animations

- ✅ **GSAP** - Advanced scroll animations (lazy loaded)
- ✅ **Three.js** - 3D graphics (lazy loaded)
- ✅ **Framer Motion** - React animations
- ✅ **Lenis** - Smooth scrolling
- ✅ **Lottie** - Complex animations (lazy loaded)

**See** `ANIMATION_SETUP.md` for animation documentation.
