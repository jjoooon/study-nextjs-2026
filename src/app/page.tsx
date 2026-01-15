/**
 * Home Page - 애플리케이션 메인 페이지
 *
 * @description
 * 애플리케이션의 진입 페이지로, 간단한 인사말과 대시보드로의
 * 빠른 링크를 제공합니다. Next.js 16 App Router의 Server Component로
 * 구현되어 최적의 성능을 제공합니다.
 *
 * @architecture
 * - Server Component: 서버 사이드 렌더링으로 빠른 초기 로딩
 * - 간결한 구조: 최소한의 UI 요소로 복잡성 감소
 * - 공통 컴포넌트 활용: Shared의 Navigation 컴포넌트 사용
 *
 * @sections
 * 1. Hero Section: 페이지 제목 및 환영 메시지
 * 2. Quick Links Section: 메뉴 빠른 이동
 *
 * @features
 * - 반응형 디자인: Tailwind CSS로 모든 화면 크기 지원
 * - 접근성: 시맨틱 HTML 태그 사용 (main, section, h1, h2)
 * - 간편한 내비게이션: 대시보드로의 직관적인 링크 제공
 * - 상태 유지: Next.js Link 컴포넌트로 Client-side Navigation 지원
 *
 * @routing
 * - / (현재 페이지): 메인 페이지
 * - /dashboard: Link 컴포넌트로 이동 (상태 유지)
 * - /products: Link 컴포넌트로 이동 (상태 유지)
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */

import Link from 'next/link';
import { Navigation } from '@/shared/components/layout/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">🚀 메인 페이지</h1>
            <p className="text-lg text-gray-600">안녕하세요.</p>
          </div>

          <div className="space-y-8">
            {/* Quick Links Section */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">🔗 링크</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/dashboard"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="font-semibold text-gray-900 mb-1">대시보드</div>
                  <div className="text-sm text-gray-600">상세 설명</div>
                </Link>
                <Link
                  href="/products"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="font-semibold text-gray-900 mb-1">상품</div>
                  <div className="text-sm text-gray-600">상세 설명</div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
