import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Performance optimizations
  reactStrictMode: true,

  // Speed optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Bundle analysis
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@reduxjs/toolkit', 'react-redux'],
  },
};

export default nextConfig;
