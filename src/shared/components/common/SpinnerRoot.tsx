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

import { createPortal } from 'react-dom';
import { useAppSelector } from '@/redux';
import {
  selectIsSpinnerVisible,
  selectSpinnerMessage,
  selectIsTransparentBackground,
  selectIsHideLoadingIndicator,
} from '@/shared/store/spinnerSlice';
import { Gcol, Typo } from '@atoms';

export function BaseSpinnerRoot() {
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
        background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0) 100%)',
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
        <Gcol className="flex items-center justify-center min-h-screen gap-6">
          <div className="relative w-[3rem] h-[3rem] flex items-center justify-center animate-gather-rotate">
            <div
              className="absolute w-[3rem] h-[3rem]  bg-[var(--color-danger-50)] rounded-full z-10 animate-gather-move"
              style={{ '--tx': '0px', '--ty': '-1.5rem' } as React.CSSProperties}
            />

            <div
              className="absolute w-[3rem] h-[3rem] bg-[var(--color-warning-40)] rounded-full z-20 animate-gather-move"
              style={{ '--tx': '-1.3rem', '--ty': '0.75rem' } as React.CSSProperties}
            />

            <div
              className="absolute w-[3rem] h-[3rem] bg-[var(--color-primary-50)] rounded-full z-30 animate-gather-move"
              style={{ '--tx': '1.3rem', '--ty': '0.75rem' } as React.CSSProperties}
            />
          </div>
          <Typo variant={'body-md'}>Loading...</Typo>
        </Gcol>
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
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(0.4rem)',
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
        <Gcol className="flex items-center justify-center min-h-screen gap-[5rem]">
          <div className="w-full h-full relative flex items-center justify-center animate-rotate-move [filter:url(#goo)]">
            <div className="absolute w-[1rem] h-[1rem] z-40 rounded-full bg-[var(--color-primary-50)] top-[50%] left[50%] translate-[-50%,-50%]"></div>
            <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-danger-50)] rounded-[80%] z-10 animate-dot-1-move" />
            <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-warning-40)] rounded-[80%] z-20 animate-dot-2-move" />
            <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-primary-50)] rounded-[80%] z-30 animate-dot-3-move" />
          </div>
          <Typo variant={'body-md'}>AI가 분석중입니다.</Typo>

          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
              </filter>
            </defs>
          </svg>
        </Gcol>
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
