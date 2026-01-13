import { Suspense } from 'react';

import { UserList } from '@/features/users';
import { ContentLoader, Navigation } from '@/shared/components';

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">🚀 Next.js 16.1.1 + Redux Toolkit + MSW</h1>
            <p className="text-lg text-gray-600">대규모 프로젝트를 위한 현대적인 Next.js 아키텍처</p>
          </div>

          <div className="space-y-8">
            {/* Features Section */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">✨ 주요 기능</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Next.js 16.1.1</h3>
                  <p className="text-sm text-blue-700">App Router, React Server Components, Turbopack</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">TypeScript 5.7.3</h3>
                  <p className="text-sm text-purple-700">엄격한 타입 안전성과 최상의 DX</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Redux Toolkit 2.5.0</h3>
                  <p className="text-sm text-green-700">RTK Query로 서버 상태 관리 최적화</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">MSW 2.7.0</h3>
                  <p className="text-sm text-orange-700">공식 패턴으로 API 목킹</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h3 className="font-semibold text-pink-900 mb-2">테스트 인프라</h3>
                  <p className="text-sm text-pink-700">Jest, Playwright, Storybook 완비</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-semibold text-indigo-900 mb-2">성능 최적화</h3>
                  <p className="text-sm text-indigo-700">코드 분할, 캐싱, 리패칭 전략</p>
                </div>
              </div>
            </section>

            {/* User Data Section */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                👥 사용자 데이터
                <span className="text-sm font-normal text-gray-500 ml-2">(MSW로 목킹된 API)</span>
              </h2>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <ContentLoader type="skeleton" />
                  </div>
                }
              >
                <UserList />
              </Suspense>
            </section>

            {/* Quick Links Section */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">🔗 빠른 링크</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/about"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="font-semibold text-gray-900 mb-1">소개</div>
                  <div className="text-sm text-gray-600">서비스 알아보기</div>
                </a>
                <a
                  href="/pricing"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="font-semibold text-gray-900 mb-1">가격</div>
                  <div className="text-sm text-gray-600">요금제 확인</div>
                </a>
                <a
                  href="/dashboard"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="font-semibold text-gray-900 mb-1">대시보드</div>
                  <div className="text-sm text-gray-600">기능 체험하기</div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
