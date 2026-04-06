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
 * - Auth Guard: 라우트 보호 적용 (로그인 필수)
 *
 * @features
 * - SEO: 기본 메타데이터 제공 (개별 페이지에서 확장 가능)
 * - 스타일링: Tailwind CSS 및 글로벌 CSS 로드
 * - 상태 관리: Redux Toolkit Provider 통합
 * - 라우트 보호: AuthGuard로 인증되지 않은 사용자 차단
 * - 일관성: 모든 페이지에 동일한 레이아웃 구조 적용
 *
 * @security
 * - 모든 페이지(로그인 제외)는 인증 필요
 * - 인증되지 않은 사용자는 자동으로 /login으로 리다이렉트
 * - Redux 상태(isAuthenticated)를 신뢰하여 판단
 * - 즉시 리다이렉트로 보호된 컨텐츠 노출 방지
 *
 * @usage
 * 자동으로 모든 페이지에 적용됩니다:
 * - /, /about, /dashboard 등 모든 경로
 * - 개별 경로의 layout.tsx가 이 레이아웃을 중첩
 * - Providers > AuthGuard 순서로 컴포넌트 래핑
 *
 * @important
 * - 'use client' 지시어 없이 Server Component로 동작
 * - 파일 시스템 라우팅의 기준점
 * - 필수 html 및 body 태그 포함
 * - AuthGuard가 모든 자식 컴포넌트를 감싸 라우트 보호 적용
 *
 * @see
 * - AuthGuard: @/shared/components/auth/AuthGuard - 라우트 보호 로직
 * - Providers: @/app/providers.tsx - Redux, MSW 설정
 * - Next.js Layouts: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout
 */

import type { Metadata, Viewport } from 'next';

import '@/shared/styles/globals.css';
import { AuthGuard } from '@/shared/components/AuthGuard';
import { SpinnerRoot } from '@common/SpinnerRoot';
import { DialogRoot } from '@/shared/components/popups/DialogRoot';
import { Providers } from './providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

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
    <html lang="ko">
      <body>
        <Providers>
          <AuthGuard>{children}</AuthGuard>
          <DialogRoot />
          <SpinnerRoot />
        </Providers>
      </body>
    </html>
  );
}
