/**
 * Error Boundary - 루트 에러 핸들링 컴포넌트
 *
 * @description
 * Next.js App Router의 에러 바운더리로, 루트 layout 하위에서 발생하는 에러를 캐치하여
 * 사용자에게 친화적인 에러 UI를 제공합니다. layout.tsx는 유지되며 page.tsx 및
 * 그 하위 컴포넌트에서 발생한 에러만 처리합니다.
 *
 * @architecture
 * - 활성화 범위: layout.tsx 하위의 모든 페이지 및 컴포넌트
 * - Layout 유지: 에러 발생 시에도 루트 layout은 정상 렌더링
 * - 계층적 처리: 하위 경로의 error.tsx가 우선적용됨
 *
 * @usage
 * 자동으로 에러를 캐치하므로 직접 호출할 필요가 없습니다.
 * - page.tsx에서 throw new Error() 발생 시 자동 활성화
 * - 데이터 fetching 에러 자동 처리
 * - 컴포넌트 렌더링 에러 자동 처리
 *
 * @props
 * - error: Error 객체와 digest(에러 해시값)
 * - reset: 에러 상태를 초기화하고 페이지를 재시도하는 함수
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import log from '@/shared/utils/logger';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const logger = log.getLogger('Global');

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    logger.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
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

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h1>

        <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred. Please try again.'}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try again
          </button>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go home
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && error.digest && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">Error details</summary>
            <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">{error.stack}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
