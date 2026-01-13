import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ REQUIRED for static export
  output: "export",

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Optimize images
  images: {
    unoptimized: true, // ✅ REQUIRED for static export
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Experimental features
  experimental: {
    // TEMPORARILY DISABLED: "three" removed to fix production build TypeScript errors
    // Not used in homepage or navigation render path
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

export default nextConfig;
