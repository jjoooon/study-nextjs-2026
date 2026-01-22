'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/redux';
import log from '@/shared/utils/logger';

const logger = log.getLogger('Global');

export function Providers({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    /**
     * Enable MSW mocking in development.
     *
     * Vercel React Best Practices - async-parallel 규칙 적용
     *
     * @description
     * MSW(Mock Service Worker) 초기화를 비동기로 처리하여
     * UI 렌더링 차단 방지 및 초기 로딩 시간 최적화
     *
     * @optimization
     * - Production: 즉시 ready 상태로 설정 (로딩 스킵)
     * - Development: MSW 초기화를 비차단 방식으로 처리
     * - Error Resilience: MSW 실패해도 앱 계속 실행
     *
     * @see https://mswjs.io/docs/integrations/browser/
     */
    async function enableMocking() {
      // ✅ Production: 즉시 렌더링 (로딩 상태 제거)
      if (process.env.NODE_ENV !== 'development') {
        setIsReady(true);
        return;
      }

      // ✅ Development: MSW 초기화 (비차단)
      try {
        // MSW worker 동적 임포트
        const { worker } = await import('@/mocks/browser');

        // Service Worker 시작 (별도 프로세스로 실행)
        await worker.start({
          onUnhandledRequest: 'bypass',
        }).catch((error) => {
          // MSW 실패해도 앱이 계속 실행되도록 처리
          logger.warn('[MSW] Worker start failed (continuing without mocking):', error);
        });

        // MSW 성공 시에만 로깅
        if (typeof window !== 'undefined' && 'navigator' in window) {
          logger.debug('[MSW] ✅ Mocking enabled');
        }
      } catch (error) {
        // Import 실패 시에도 앱 계속 실행
        logger.error('[MSW] ❌ Failed to initialize (continuing without mocking):', error);
      }

      // MSW 성공/실패와 관계없이 ready 상태로 설정
      setIsReady(true);
    }

    enableMocking();
  }, []);

  // ✅ Production: 즉시 렌더링 (로딩 UI 없음)
  if (process.env.NODE_ENV !== 'development' || isReady) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  }

  // ✅ Development: MSW 초기화 중에만 로딩 표시
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Initializing development environment...</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
