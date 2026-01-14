/**
 * Root Layout - 애플리케이션 루트 레이아웃
 *
 * @description
 * Next.js App Router의 필수 루트 레이아웃 컴포넌트입니다. 모든 페이지에 공통적으로 적용되는
 * HTML 구조, 메타데이터, 글로벌 스타일, Context Provider를 정의합니다.
 *
 * @architecture
 * - HTML 구조: 모든 페이지를 감싸는 최상위 html 및 body 태그 제공
 * - 메타데이터: 페이지 기본 메타데이터 정의 (title, description)
 * - 글로벌 스타일: 전체 애플리케이션에 적용되는 CSS import
 * - Provider 설정: Redux, Theme 등 전역 Provider 래핑
 *
 * @features
 * - SEO: 기본 메타데이터 제공 (개별 페이지에서 확장 가능)
 * - 스타일링: Tailwind CSS 및 글로벌 CSS 로드
 * - 상태 관리: Redux Toolkit Provider 통합
 * - 일관성: 모든 페이지에 동일한 레이아웃 구조 적용
 *
 * @usage
 * 자동으로 모든 페이지에 적용됩니다:
 * - /, /about, /dashboard 등 모든 경로
 * - 개별 경로의 layout.tsx가 이 레이아웃을 중첩
 * - Providers 컴포넌트로 모든 컨텍스트 래핑
 *
 * @important
 * - 'use client' 지시어 없이 Server Component로 동작
 * - 파일 시스템 라우팅의 기준점
 * - 필수 html 및 body 태그 포함
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout
 */

import type { Metadata } from 'next';

import '@/shared/styles/globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: '한화손해보험 UI 프레임워크',
  description: '한화손해보험 UI 프레임워크',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
