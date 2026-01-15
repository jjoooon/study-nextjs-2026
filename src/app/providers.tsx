'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import log from '@/shared/utils/logger';
import { persistor, store } from '@/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const logger = log.getLogger('Global');

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    /**
     * Enable MSW mocking in development.
     * This follows the official MSW browser integration pattern:
     * https://mswjs.io/docs/integrations/browser/
     */
    async function enableMocking() {
      // In production, MSW is not used
      if (process.env.NODE_ENV !== 'development') {
        setIsReady(true);
        return;
      }

      logger.log('[MSW] Initializing...');

      // Dynamically import MSW worker to avoid bundling in production
      const { worker } = await import('@/mocks/browser');

      logger.log('[MSW] Worker loaded, starting...');

      // Start the worker and wait for it to be ready
      // This is CRITICAL to prevent race conditions
      try {
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
        logger.log('[MSW] ✅ Mocking enabled - Service worker active');
        logger.log('[MSW] Registered handlers:', worker.listHandlers());
      } catch (error) {
        logger.error('[MSW] ❌ Failed to start worker:', error);
      }

      // Mark as ready regardless of MSW success/failure
      setIsReady(true);
    }

    enableMocking();
  }, []);

  // Show loading while MSW initializes (development only)
  if (!isReady) {
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

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
