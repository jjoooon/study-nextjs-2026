/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

/**
 * Spinner Root Container
 *
 * @description
 * - Redux Store의 spinner 상태를 감지하여 전역 spinner 렌더 링
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

import * as React from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '@/redux';
import {
  selectIsSpinnerVisible,
  selectSpinnerMessage,
  selectIsTransparentBackground,
  selectIsHideLoadingIndicator,
} from '@/shared/store/spinnerSlice';
import { Gcol, Typo } from '@atoms';

export interface SpinnerRootProps {
  type?: 'SpinnerRoot' | 'BaseSpinnerRoot';
  isVisible?: boolean;
  message?: string | null;
  transparentBackground?: boolean;
  hideLoadingIndicator?: boolean;
  texts?: string[];
  interval?: number; // 텍스트 변경 주기 (ms)
}

export function BaseSpinnerRoot(props?: SpinnerRootProps) {
  const isVisible = useAppSelector(selectIsSpinnerVisible);
  const message = useAppSelector(selectSpinnerMessage);
  const transparentBackground = useAppSelector(selectIsTransparentBackground);
  const hideLoadingIndicator = useAppSelector(selectIsHideLoadingIndicator);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // texts 및 interval 처리
  const texts = props?.texts ?? (message ? [message] : ['Loading...']);
  const interval = props?.interval ?? 2000;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!texts || texts.length <= 1) {
      setCurrentIndex(0);
      return;
    }
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  const currentText = texts[currentIndex] ?? '';

  // Hydration 불일치 방지 및 spinner 상태 검사
  if (!isMounted || !isVisible) return null;

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
      aria-label={currentText}
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
        <Gcol className="flex items-center justify-center min-h-screen gap-6 -translate-y-[2rem]">
          <div className="absoulte w-[3rem] h-[3rem] flex items-center justify-center animate-gather-rotate">
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
          <Typo key={currentIndex} variant={'body-md'} className="animate-text-change">
            {currentText}
          </Typo>
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
          @keyframes text-fade-in-translate {
            from {
              opacity: 0;
              transform: translateY(5.3rem);
            }
            to {
              opacity: 1;
              transform: translateY(5rem);
            }
          }
          .animate-text-change {
            animation: text-fade-in-translate 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>,
    document.body
  );
}

export function SpinnerRoot(props?: SpinnerRootProps) {
  const isVisible = useAppSelector(selectIsSpinnerVisible);
  const message = useAppSelector(selectSpinnerMessage);
  const transparentBackground = useAppSelector(selectIsTransparentBackground);
  const hideLoadingIndicator = useAppSelector(selectIsHideLoadingIndicator);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // texts 및 interval 처리
  const texts = props?.texts ?? (message ? [message] : ['AI가 분석중입니다.']);
  const interval = props?.interval ?? 2000;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!texts || texts.length <= 1) {
      setCurrentIndex(0);
      return;
    }
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  const currentText = texts[currentIndex] ?? '';

  // Hydration 불일치 방지 및 spinner 상태 검사
  if (!isMounted || !isVisible) return null;

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
      aria-label={currentText}
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
        <Gcol className="flex items-center justify-center min-h-screen gap-[5rem] -translate-y-[2rem]">
          <div className="w-full h-full absolute flex items-center justify-center animate-rotate-move [filter:url(#goo)] scale-[0.8]">
            <div className="absolute w-[1rem] h-[1rem] z-40 rounded-full bg-[var(--color-primary-50)] top-[50%] left-[50%] translate-[-50%,-50%]"></div>
            <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-danger-50)] rounded-[80%] z-10 animate-dot-1-move" />
            <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-warning-40)] rounded-[80%] z-20 animate-dot-2-move" />
            <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-primary-50)] rounded-[80%] z-30 animate-dot-3-move" />
          </div>
          <Typo key={currentIndex} variant={'body-md'} className="animate-text-change">
            {currentText}
          </Typo>

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
          @keyframes text-fade-in-translate {
            from {
              opacity: 0;
              transform: translateY(5.3rem);
            }
            to {
              opacity: 1;
              transform: translateY(5rem);
            }
          }
          .animate-text-change {
            animation: text-fade-in-translate 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>,
    document.body
  );
}

export interface LocalSpinnerProps {
  className?: string;
  texts?: string[];
  interval?: number; // 텍스트 변경 주기 (ms)
}

/**
 * Spinner
 * - Portal이나 Redux 스토어 상태에 구애받지 않고 특정 영역(Grid 등) 내부에서 인라인으로 직접 돌아가는 독립형 로컬 스피너 컴포넌트입니다.
 * - 복수의 텍스트 배열을 전달받은 경우 설정된 interval 간격(기본 2000ms)으로 텍스트를 순환하며 출력합니다.
 */
export function Spinner({ className, texts = ['AI가 분석중입니다.'], interval = 2000 }: LocalSpinnerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!texts || texts.length <= 1) {
      setCurrentIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  const currentText = texts[currentIndex] ?? '';

  return (
    <Gcol className={`flex items-center justify-center gap-[5rem] -translate-y-[2rem] ${className ?? ''}`}>
      <div className="w-[12rem] h-[5rem] absolute flex items-center justify-center animate-rotate-move [filter:url(#goo)] scale-[0.7]">
        <div className="absolute w-[1rem] h-[1rem] z-40 rounded-full bg-[var(--color-primary-50)] top-[50%] left-[50%] translate-[-50%,-50%]"></div>
        <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-danger-50)] rounded-[80%] z-10 animate-dot-1-move" />
        <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-warning-40)] rounded-[80%] z-20 animate-dot-2-move" />
        <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-primary-50)] rounded-[80%] z-30 animate-dot-3-move" />
      </div>
      <Typo key={currentIndex} variant={'body-md'} className="animate-text-change">
        {currentText}
      </Typo>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
          </filter>
        </defs>
      </svg>

      {/* Inline Animations */}
      <style>
        {`
          @keyframes text-fade-in-translate {
            from {
              opacity: 0;
              transform: translateY(5.3rem);
            }
            to {
              opacity: 1;
              transform: translateY(5rem);
            }
          }
          .animate-text-change {
            animation: text-fade-in-translate 0.3s ease-out forwards;
          }
        `}
      </style>
    </Gcol>
  );
}
