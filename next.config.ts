import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

// Bundle analyzer configuration (Next.js 16.1)
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Performance optimizations
  reactStrictMode: true,

  // Speed optimizations
  compiler: {
    // Remove console in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Experimental features
  experimental: {
    // Optimize CSS
    optimizeCss: true,

    // Optimize package imports (Next.js 16)
    optimizePackageImports: ['@reduxjs/toolkit', 'react-redux', 'lucide-react'],
  },
};

// Export with bundle analyzer
export default withBundleAnalyzer(nextConfig);
