'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/redux';
import useMounted from '@/shared/hooks/useMounted';
import { initializeI18n } from '@/shared/lib/i18n';
import { setHeader } from '@/shared/store/authSlice';
import type { AuthHeader } from '@/shared/types/authTypes';
import log from '@/shared/utils/logger';

const logger = log.getLogger('Global');

export function Providers({ children, authHeader }: { children: React.ReactNode; authHeader?: AuthHeader }) {
  const [isReady, setIsReady] = useState(false);

  useMounted(() => {
    // persist/REHYDRATE 이후에 서버 사이드 header 값으로 덮어쓰기
    if (authHeader) {
      store.dispatch(setHeader({ header: authHeader }));
    }
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
      // ✅ i18n 초기화 (messageUtils 기반으로 전환)
      try {
        initializeI18n();
        logger.debug('[i18n] ✅ Initialized (messageUtils mode)');
      } catch (error) {
        logger.error('[i18n] ❌ Failed to initialize:', error);
      }

      // ✅ MSW 비활성화 시 즉시 렌더링 (로딩 상태 제거)
      const mswEnabled = process.env.NEXT_PUBLIC_MSW_ENABLED === 'true';

      if (!mswEnabled) {
        setIsReady(true);
        return;
      }

      // ✅ MSW 초기화 (비차단)
      try {
        // MSW worker 동적 임포트
        const { worker } = await import('@/mocks/browser');

        // Service Worker 시작 (별도 프로세스로 실행)
        await worker
          .start({
            onUnhandledRequest: 'bypass',
          })
          .catch((error) => {
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
  });

  // ✅ MSW 비활성화 또는 준비 완료 시 렌더링
  const mswEnabled = process.env.NEXT_PUBLIC_MSW_ENABLED === 'true';
  if (!mswEnabled || isReady) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  }

  return null; // 또는 로딩 스피너 등 원하는 로딩 UI 반환
}
