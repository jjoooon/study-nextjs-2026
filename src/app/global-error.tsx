/**
 * Global Error Boundary - 전역 에러 핸들링 컴포넌트
 *
 * @description
 * Next.js App Router의 최후 에러 방어선으로, 루트 layout을 포함한 전체 애플리케이션에서
 * 발생하는 치명적 에러를 캐치합니다. layout.tsx 자체에서 에러가 발생할 때만 활성화되며,
 * 전체 HTML을 새로 렌더링합니다.
 *
 * @architecture
 * - 활성화 범위: 전체 애플리케이션 (layout.tsx 포함)
 * - 최후의 방어선: error.tsx로 처리되지 않는 치명적 에러만 담당
 * - 완전한 리셋: <html>, <body> 태그를 직접 제공해야 함
 *
 * @usage
 * 자동으로 에러를 캐치하므로 직접 호출할 필요가 없습니다.
 * - layout.tsx에서 발생한 에러만 처리
 * - 일반 페이지 에러는 error.tsx가 우선 처리
 * - 거의 발생하지 않는 상황 대비 (레이아웃 시스템 crash 등)
 *
 * @props
 * - error: Error 객체와 digest(에러 해시값)
 * - reset: 에러 상태를 초기화하고 전체 앱을 재시작하는 함수
 *
 * @important
 * 이 컴포넌트는 반드시 <html> 및 <body> 태그를 포함해야 합니다.
 * 루트 layout을 완전히 대체하므로 전체 HTML 구조를 제공해야 합니다.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */

'use client';

import { useEffect } from 'react';

import log from '@/shared/utils/logger';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const logger = log.getLogger('Global');

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log critical errors to error reporting service
    logger.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center border-2 border-red-200">
            <div className="mb-6">
              <svg
                className="mx-auto h-20 w-20 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-red-900 mb-4">Critical Error</h1>

            <p className="text-red-700 mb-6">
              A critical error has occurred. The application cannot recover. Please refresh the page or contact support
              if the problem persists.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-xs text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reload Application
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-xs text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Go to Homepage
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-red-700">Technical details</summary>
                <pre className="mt-2 text-xs bg-red-50 p-4 rounded overflow-auto text-red-900">
                  {error.stack || error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
