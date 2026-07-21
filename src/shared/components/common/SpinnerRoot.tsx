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
  type?: 'SpinnerRoot' | 'BaseSpinnerRoot' | 'AiSpinner' | 'DnaSpinnerRoot' | 'HpSpinnerRoot';
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

export interface AiSpinnerProps {
  className?: string;
  size?: string; // 기본값: 'min(46vmin, 360px)'
  text?: string; // 기본값: 'AI'
  srText?: string; // 기본값: 'Loading'
  texts?: React.ReactNode[];
  interval?: number; // 텍스트 변경 주기 (ms)
}
export function AiSpinner({
  className,
  size = 'min(46vmin, 360px)',
  text = 'AI',
  srText = 'Loading',
  texts,
  interval = 2000,
}: AiSpinnerProps) {
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

  return (
    <Gcol className={`flex items-center justify-center ${className ?? ''}`}>
      <div className="ai-loader" role="status" aria-live="polite" style={{ '--size': size } as React.CSSProperties}>
        <span className="orb" />
        <span className="orb" />
        <span className="orb" />
        <span className="orb" />
        <span className="ai-text" aria-hidden="true">
          {text}
        </span>
        <span className="sr-only">{srText}</span>
      </div>

      {texts && texts.length > 0 && (
        <div className="ai-spinner-text-container">
          {texts.map((t, idx) => (
            <div key={idx} className={`ai-spinner-text ${idx === currentIndex ? 'active' : ''}`}>
              {t}
            </div>
          ))}
        </div>
      )}

      {/* Inline Animations */}
      <style>
        {`
          .ai-spinner-text-container {
            display: grid;
            grid-template-areas: "overlay";
            width: 100%;
            margin-top: 1rem;
            place-items: center;
          }
          .ai-spinner-text {
            grid-area: overlay;
            transition: opacity 0.4s ease-in-out;
            opacity: 0;
            pointer-events: none;
            width: 100%;
            text-align: center;
          }
          .ai-spinner-text.active {
            opacity: 1;
            pointer-events: auto;
          }

          .ai-loader {
            --core: #fffaf3;
            --orange-1: 255 183 132;
            --orange-2: 255 92 46;
            --orange-3: 255 92 46;
            --animation-scale: 0.76;

            position: relative;
            width: var(--size);
            aspect-ratio: 1;
            display: grid;
            place-items: center;
            filter: drop-shadow(0 26px 32px rgb(212 120 42 / 0.12));
          }

          .ai-loader::before {
            content: "";
            position: absolute;
            width: calc(58% * var(--animation-scale));
            aspect-ratio: 1;
            border-radius: 999px;
            background: radial-gradient(circle, var(--core) 0 44%, rgb(255 239 213 / 0.86) 62%, rgb(255 173 78 / 0.28) 100%);
            z-index: 4;
            box-shadow:
              0 0 34px rgb(255 255 255 / 0.9) inset,
              0 0 54px rgb(255 145 54 / 0.28);
          }

          .ai-text {
            position: relative;
            z-index: 5;
            color: #FF5C2E;
            font-size: calc(var(--size) * 0.18);
            font-weight: 800;
            line-height: 1;
            letter-spacing: 0;
          }

          .ai-loader::after {
            content: "";
            position: absolute;
            width: calc(68% * var(--animation-scale));
            aspect-ratio: 1;
            border-radius: 999px;
            background: radial-gradient(circle, transparent 54%, rgb(var(--orange-2) / 0.48) 72%, transparent 100%);
            z-index: 3;
            animation: breathe 2.8s ease-in-out infinite;
          }

          .ai-loader .orb {
            position: absolute;
            inset: calc((100% - (100% * var(--animation-scale))) / 2);
            border-radius: 999px;
            mix-blend-mode: multiply;
            transform-origin: 50% 50%;
            animation: orbit var(--speed) ease-in-out infinite;
            opacity: var(--opacity);
          }

          .ai-loader .orb::before {
            content: "";
            position: absolute;
            inset: var(--offset);
            border-radius: 48% 52% 47% 53% / 56% 44% 58% 42%;
            background: radial-gradient(circle at 50% 48%, transparent 0 42%, rgb(var(--tone) / 0.38) 62%, rgb(var(--tone) / 0.2) 100%);
            transform: rotate(var(--tilt)) scaleX(var(--stretch-x)) scaleY(var(--stretch-y));
            filter: blur(0.2px);
          }

          .ai-loader .orb:nth-child(1) {
            --tone: var(--orange-1);
            --speed: 5.8s;
            --opacity: 0.7;
            --offset: 4%;
            --tilt: 18deg;
            --stretch-x: 0.92;
            --stretch-y: 1.08;
          }

          .ai-loader .orb:nth-child(2) {
            --tone: var(--orange-2);
            --speed: 4.9s;
            --opacity: 0.64;
            --offset: 8%;
            --tilt: -35deg;
            --stretch-x: 1.05;
            --stretch-y: 0.94;
            animation-direction: reverse;
          }

          .ai-loader .orb:nth-child(3) {
            --tone: var(--orange-3);
            --speed: 6.7s;
            --opacity: 0.46;
            --offset: 12%;
            --tilt: 64deg;
            --stretch-x: 0.96;
            --stretch-y: 1.03;
          }

          .ai-loader .orb:nth-child(4) {
            --tone: 255 220 166;
            --speed: 7.6s;
            --opacity: 0.54;
            --offset: 0%;
            --tilt: -8deg;
            --stretch-x: 1.1;
            --stretch-y: 0.9;
            animation-direction: reverse;
          }

          .ai-loader .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }

          @keyframes orbit {
            0% {
              transform: rotate(0deg) scale(0.98);
            }
            45% {
              transform: rotate(185deg) scale(1.03);
            }
            100% {
              transform: rotate(360deg) scale(0.98);
            }
          }

          @keyframes breathe {
            0%, 100% {
              transform: scale(0.95);
              opacity: 0.7;
            }
            50% {
              transform: scale(1.06);
              opacity: 1;
            }
          }

          @keyframes text-fade-in-translate {
            from {
              opacity: 0;
              transform: translateY(0.3rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
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

export function DnaSpinnerRoot(props?: SpinnerRootProps) {
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
          <div>
            <div className="row rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>

            <div className="row2 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row3 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row4 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row5 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row6 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row7 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row8 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row9 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row10 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row11 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row12 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
            <div className="row13 rowc">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
            </div>
          </div>
        </Gcol>
      )}

      {/* Inline Animations */}
      <style>
        {`
          
.circle{
  border-radius:50%;
  width:10px;
  height:10px;
  background-color:#FF9F6E;
  margin-bottom:25px;
  position:relative;
}

.rowc{
  display:inline-block;
  margin-left:2px;
}

.c1{
  animation: c1 1.5s linear infinite;
}

.c2{
  animation: c2 1.5s linear infinite;
  background-color:#FF5C2E;
}

@keyframes c1{
  0%{transform:translateY(0px) scale(1);}
  25%{transform:translateY(12px) scale(1.5);background-color:#FF5C2E;z-index:10;}
  50%{transform:translateY(34px) scale(1);}
  75%{transform:translateY(12px) scale(.6);background-color:#FF9F6E;z-index:1;opacity:.1}
  100%{transform:translateY(0px) scale(1);}
}

@keyframes c2{
  0%{transform:translateY(0px) scale(1);}
  25%{transform:translateY(-12px) scale(.6);background-color:#FFD187;z-index:1;opacity:.1}
  50%{transform:translateY(-34px) scale(1);}
  75%{transform:translateY(-12px) scale(1.5);background-color:#FFD900;z-index:10;}
  100%{transform:translateY(0px) scale(1);}
}

.row2 .c1{animation-delay:.1s;}.row2 .c2{animation-delay:.1s;}
.row3 .c1{animation-delay:.22s;}.row3 .c2{animation-delay:.22s;}
.row4 .c1{animation-delay:.37s;}.row4 .c2{animation-delay:.37s;}
.row5 .c1{animation-delay:.49s;}.row5 .c2{animation-delay:.49s;}
.row6 .c1{animation-delay:.67s;}.row6 .c2{animation-delay:.67s;}
.row7 .c1{animation-delay:.89s;}.row7 .c2{animation-delay:.89s;}
.row8 .c1{animation-delay:.95s;}.row8 .c2{animation-delay:.95s;}
.row9 .c1{animation-delay:1.2s;}.row9 .c2{animation-delay:1.2s;}
.row10 .c1{animation-delay:1.45s;}.row10 .c2{animation-delay:1.45s;}
.row11 .c1{animation-delay:1.62s;}.row11 .c2{animation-delay:1.62s;}
.row12 .c1{animation-delay:1.88s;}.row12 .c2{animation-delay:1.88s;}
.row13 .c1{animation-delay:2s;}.row13 .c2{animation-delay:2s;}

        `}
      </style>
    </div>,
    document.body
  );
}

export function HpSpinnerRoot(props?: SpinnerRootProps) {
  const isVisible = useAppSelector(selectIsSpinnerVisible);
  const message = useAppSelector(selectSpinnerMessage);
  const transparentBackground = useAppSelector(selectIsTransparentBackground);
  const hideLoadingIndicator = useAppSelector(selectIsHideLoadingIndicator);

  const [isMounted, setIsMounted] = React.useState(false);
  // 물결 위치 애니메이션용 state (jQuery의 .wave:before, .wave:after top 위치)
  const [waveTop, setWaveTop] = React.useState<number>(50);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // jQuery changeVal 로직을 React / TypeScript로 전환 (속도 단축 반영)
  React.useEffect(() => {
    if (!isVisible) return;

    let timerId: NodeJS.Timeout;

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('itemquantity', '50');
    }

    const changeVal = (val: number) => {
      const nextVal = val - 1;
      setWaveTop(nextVal);

      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('itemquantity', String(nextVal));
      }

      if (nextVal > -55) {
        timerId = setTimeout(() => {
          changeVal(nextVal);
        }, 60); // 파도 차오르는 속도: 500ms -> 60ms
      } else {
        setWaveTop(50);
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('itemquantity', '50');
        }
        timerId = setTimeout(() => {
          changeVal(50);
        }, 200); // 리셋 후 재시작 대기: 1000ms -> 200ms
      }
    };

    timerId = setTimeout(() => {
      changeVal(50);
    }, 100);

    return () => {
      clearTimeout(timerId);
    };
  }, [isVisible]);

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
          <div className="hp-wave-circle">
            <div className="hp-wave"></div>
          </div>
        </Gcol>
      )}

      {/* Inline Animations */}
      <style>
        {`
.hp-wave-circle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid #fff;
  box-shadow: 0 0 0 5px #FF5C2E;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}

.hp-wave {
  position: relative;
  width: 100%;
  height: 100%;
  background: #FF8D02;
  border-radius: 50%;
  box-shadow: inset 0 0 50px rgba(255, 92, 46, 1);
}

.hp-wave:before,
.hp-wave:after {
  position: absolute;
  width: 200%;
  height: 200%;
  content: '';
  top: ${waveTop}%;
  left: 50%;
  transform: translate(-50%, -75%);
  transition: all 0.1s linear;
}

.hp-wave:before {
  border-radius: 45%;
  background: rgba(255, 255, 255, 1);
  animation: hpWaveAnimate 5s linear infinite;
}

.hp-wave:after {
  border-radius: 40%;
  background: rgba(255, 255, 255, 0.5);
  animation: hpWaveAnimate 10s linear infinite;
}

@keyframes hpWaveAnimate {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}

        `}
      </style>
    </div>,
    document.body
  );
}
