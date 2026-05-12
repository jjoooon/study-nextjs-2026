/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

/**
 * Spinner Root Container
 *
 * @description
 * - Redux Store의 spinner 상태를 감지하여 전역 spinner 렌더링
 * - Portal로 렌더링하여 DOM 계층구조 분리
 * - DialogRoot와 동일한 패턴 사용
 * - 투명 배경 및 로딩 이미지 숨김 옵션 지원
 *
 * @location
 * src/app/layout.tsx에 추가하여 전역 spinner 관리
 *
 * @usage
 * // src/app/layout.tsx
 * import { SpinnerRoot } from '@common/SpinnerRoot';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <SpinnerRoot />
 *       </body>
 *     </html>
 *   );
 * }
 */

import { Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '@/redux';
import {
  selectIsSpinnerVisible,
  selectSpinnerMessage,
  selectIsTransparentBackground,
  selectIsHideLoadingIndicator,
} from '@/shared/store/spinnerSlice';

export function SpinnerRoot() {
  const isVisible = useAppSelector(selectIsSpinnerVisible);
  const message = useAppSelector(selectSpinnerMessage);
  const transparentBackground = useAppSelector(selectIsTransparentBackground);
  const hideLoadingIndicator = useAppSelector(selectIsHideLoadingIndicator);

  // spinner가 표시 중이 아니면 렌더링하지 않음
  if (!isVisible) return null;

  // SSR 안전장치
  if (typeof window === 'undefined') return null;

  // 배경 스타일 결정
  const backgroundStyle = transparentBackground
    ? {}
    : {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
      };

  // Portal로 body 하단에 렌더링
  return createPortal(
    <div
      role="dialog"
      aria-busy="true"
      aria-label={message ?? '로딩 중'}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...backgroundStyle,
      }}
    >
      {/* Spinner Icon */}
      {!hideLoadingIndicator && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Loader2
            style={{
              width: '48px',
              height: '48px',
              color: 'white',
              animation: 'spin 1s linear infinite',
            }}
            strokeWidth={2.5}
          />

          {/* Message */}
          {message && (
            <p
              style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: '500',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            >
              {message}
            </p>
          )}
        </div>
      )}

      {/* Close Button (개발용) */}
      <button
        type="button"
        onClick={() => window.location.reload()}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          color: 'rgba(255, 255, 255, 0.5)',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '8px',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
        aria-label="스피너 닫기"
      >
        ✕
      </button>

      {/* Inline Animations */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>,
    document.body
  );
}
