import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  reactStrictMode: true, // Enable React strict mode

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Optimize font loading
  optimizeFonts: true,

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'three'],
  },
};

export default nextConfig;
