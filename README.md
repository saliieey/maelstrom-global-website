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
