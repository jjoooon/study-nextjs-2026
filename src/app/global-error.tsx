'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log critical errors to error reporting service
    console.error('Global application error:', error);
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

            <h1 className="text-3xl font-bold text-red-900 mb-4">
              Critical Error
            </h1>

            <p className="text-red-700 mb-6">
              A critical error has occurred. The application cannot recover.
              Please refresh the page or contact support if the problem persists.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reload Application
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Go to Homepage
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-red-700">
                  Technical details
                </summary>
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
