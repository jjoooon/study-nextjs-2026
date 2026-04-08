import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

// 번들 분석 도구 설정
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // 디버깅을 위해 프로덕션 환경에서 소스 맵 활성화
  productionBrowserSourceMaps: process.env.ENABLE_SOURCE_MAP === 'true',

  // React Strict Mode: 개발 모드에서 잠재적 문제 감지
  reactStrictMode: true,

  // React Compiler: 자동 메모이제이션 최적화
  reactCompiler: true,

  compiler: {
    // 프로덕션 환경에서 console 제거
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    // 이미지 형식 최적화 (AVIF, WebP 지원)
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  experimental: {
    // CSS 최적화
    optimizeCss: true,

    // 패키지 임포트 최적화
    optimizePackageImports: [
      // 상태 관리
      '@reduxjs/toolkit',
      'react-redux',

      // 아이콘
      'lucide-react',

      // Radix UI 컴포넌트들
      '@radix-ui/react-*',

      // 유틸리티
      'date-fns',
      'clsx',

      // 폼 & 검증
      'react-hook-form',
      'zod',

      // 차트 라이브러리
      'recharts',
      'echarts',
      'echarts-for-react',

      // 그리드
      'ag-grid-react',
      'ag-grid-community',

      // 기타 UI
      'react-day-picker',
      'sonner',
      'embla-carousel-react',
    ],
  },
};

// 번들 분석 도구와 함께 내보내기
export default withBundleAnalyzer(nextConfig);
