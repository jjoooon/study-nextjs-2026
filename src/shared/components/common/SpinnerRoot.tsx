/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

/**
 * Spinner Root Container & Common Loading Spinners
 *
 * @description
 * - Redux Store의 spinner 상태를 감지하여 전역 spinner 렌더링
 * - Portal로 렌더링하여 DOM 계층구조 분리
 * - DialogRoot와 동일한 패턴 사용
 * - 투명 배경 및 로딩 이미지 숨김 옵션 지원
 * - 세로 롤링, AI 스피너, 퍼즐 스피너, 인라인 스피너 등 공통 로딩 컴포넌트 포함
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

import Image from 'next/image';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '@/redux';
import AiLoadingAi from '@/shared/components/icons/AI-loading/ai.svg';
import StaticAiLoadingAi from '@/shared/components/icons/AI-loading/n-ai.svg';
import StaticAiLoadingPlan from '@/shared/components/icons/AI-loading/n-plan.svg';
import StaticAiLoadingSearch from '@/shared/components/icons/AI-loading/n-search.svg';
import StaticAiLoadingSetting from '@/shared/components/icons/AI-loading/n-setting.svg';
import StaticAiLoadingTypeCheck from '@/shared/components/icons/AI-loading/n-type-check.svg';
import AiLoadingPlan from '@/shared/components/icons/AI-loading/plan.svg';
import AiLoadingPuzzle from '@/shared/components/icons/AI-loading/puzzle.svg';
import AiLoadingSearch from '@/shared/components/icons/AI-loading/search.svg';
import AiLoadingSetting from '@/shared/components/icons/AI-loading/setting.svg';
import AiLoadingTypeCheck from '@/shared/components/icons/AI-loading/type-check.svg';
import {
  selectIsSpinnerVisible,
  selectSpinnerMessage,
  selectIsTransparentBackground,
  selectIsHideLoadingIndicator,
} from '@/shared/store/spinnerSlice';
import { Gcol, Typo } from '@atoms';

/* ==========================================================================
 * Helper Utilities & Custom Hooks
 * ========================================================================== */

/**
 * 텍스트가 문자열이고 HTML 태그(<b>, <span>, <strong> 등)를 포함하고 있을 경우 태그를 해석하여 렌더링하고,
 * React Element/JSX인 경우 그대로 렌더링하는 헬퍼 함수
 */
export function renderTextWithHtml(text: React.ReactNode): React.ReactNode {
  if (typeof text === 'string') {
    if (/<[a-z][\s\S]*>/i.test(text)) {
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    }
  }
  return text;
}

/**
 * 텍스트 배열을 지정된 interval(ms) 간격으로 롤링/순환시키는 커스텀 훅
 */
function useTextLoop<T>(texts: T[] | undefined, interval = 2000, defaultText?: T) {
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

  const fallback = defaultText ?? ('' as unknown as T);
  const currentText = texts && texts.length > 0 ? (texts[currentIndex] ?? fallback) : fallback;

  return { currentIndex, currentText };
}

/**
 * ReactNode에서 순수 텍스트 문자열만 추출하는 헬퍼 함수
 */
function getPlainText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getPlainText).join('');
  }
  if (React.isValidElement(node)) {
    const children = (node.props as { children?: React.ReactNode }).children;
    return getPlainText(children);
  }
  return '';
}

/**
 * HTML 문자열에서 태그 구조는 유효하게 보존하면서 순수 텍스트 글자 수만 visibleLength 만큼 자르는 함수
 */
function sliceHtmlText(html: string, visibleLength: number): React.ReactNode {
  let count = 0;
  let result = '';
  let inTag = false;

  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    if (char === '<') {
      inTag = true;
      result += char;
    } else if (char === '>') {
      inTag = false;
      result += char;
    } else if (inTag) {
      result += char;
    } else {
      if (count < visibleLength) {
        result += char;
        count++;
      } else {
        break;
      }
    }
  }

  return renderTextWithHtml(result);
}

/**
 * React Element / ReactNode 구조에서 visibleLength 만큼 텍스트를 슬라이싱하는 함수
 */
function sliceReactNode(node: React.ReactNode, visibleLength: number): React.ReactNode {
  let currentCount = 0;

  function traverse(n: React.ReactNode): React.ReactNode {
    if (currentCount >= visibleLength) return null;

    if (typeof n === 'string' || typeof n === 'number') {
      const str = String(n);
      const remaining = visibleLength - currentCount;
      if (str.length <= remaining) {
        currentCount += str.length;
        return str;
      } else {
        const sliced = str.slice(0, remaining);
        currentCount += remaining;
        return sliced;
      }
    }

    if (React.isValidElement(n)) {
      const children = (n.props as { children?: React.ReactNode }).children;
      const slicedChildren = React.Children.map(children, (child) => traverse(child));
      return React.cloneElement(n, undefined, slicedChildren);
    }

    return n;
  }

  return traverse(node);
}

/* ==========================================================================
 * Interfaces
 * ========================================================================== */

export interface SpinnerRootProps {
  type?: 'SpinnerRoot' | 'BaseSpinnerRoot' | 'AiSpinner' | 'CircleSpinner' | 'PuzzleSpinner';
  isVisible?: boolean;
  message?: string | null;
  transparentBackground?: boolean;
  hideLoadingIndicator?: boolean;
  texts?: string[];
  interval?: number; // 텍스트 변경 주기 (ms)
}

export interface CircleSpinnerProps {
  className?: string;
  size?: number | string;
  texts?: (string | React.ReactNode)[];
  interval?: number;
  strokeColor?: string;
  bgColor?: string;
  isVisible?: boolean;
}

export interface TypingTextProps {
  texts?: (string | React.ReactNode)[];
  typingSpeed?: number; // 한 글자당 타이핑 속도 (ms, 기본 100ms)
  pauseDuration?: number; // 문장 완료 후 대기 시간 (ms, 기본 1000ms = 1초)
  className?: string;
}

export interface PuzzleSpinnerProps {
  className?: string;
  texts?: (string | React.ReactNode)[];
  typingSpeed?: number;
  pauseDuration?: number;
  isVisible?: boolean;
}

export interface LocalSpinnerProps {
  className?: string;
  texts?: string[];
  interval?: number; // 텍스트 변경 주기 (ms)
}

export interface AiSpinnerProps {
  className?: string;
  size?: string; // 기본값: 'min(46vmin, 360px)'
  text?: string; // 기본값: 'AI'
  srText?: string; // 기본값: 'Loading'
  texts?: React.ReactNode[];
  interval?: number; // 텍스트 변경 주기 (ms)
}

/* ==========================================================================
 * 1. CircleSpinner & CircleSpinnerRoot
 * ========================================================================== */

export function CircleSpinner({
  className,
  size = 52,
  texts,
  interval = 2000,
  strokeColor = '#B3B3B3',
  bgColor = '#EBEBEB',
  isVisible = true,
}: CircleSpinnerProps) {
  const { currentIndex, currentText } = useTextLoop(texts, interval, '조회중 입니다.');

  if (!isVisible) return null;

  const svgSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <Gcol
      className={`w-full h-full flex flex-col items-center justify-center gap-4 py-4 ${className ?? ''}`}
      placement="cc"
    >
      <div className="relative flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={svgSize}
          height={svgSize}
          viewBox="0 0 52 52"
          fill="none"
          className="animate-spin"
        >
          <circle cx="26.0001" cy="26.0002" r="20.4714" stroke={bgColor} strokeWidth="2.55892" />
          <path
            d="M32.6331 45.367C28.753 46.6959 24.5632 46.8287 20.6067 45.7481C16.6502 44.6676 13.1095 42.4235 10.4435 39.3068C7.77756 36.1901 6.10923 32.3445 5.65477 28.2683C5.20032 24.1922 5.9807 20.0736 7.89476 16.4462C9.80883 12.8189 12.7683 9.85011 16.3897 7.92469C20.011 5.99927 24.1272 5.20599 28.2047 5.64768C32.2822 6.08937 36.1331 7.74565 39.2581 10.4019C42.3831 13.0581 44.6383 16.5917 45.7312 20.5448"
            stroke={strokeColor}
            strokeWidth="2.55892"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {Boolean(currentText) && (
        <Typo key={currentIndex} variant={'body-md'} className="animate-text-change text-center font-bold">
          {renderTextWithHtml(currentText)}
        </Typo>
      )}
    </Gcol>
  );
}

export const CircleSpinnerRoot = CircleSpinner;

/* ==========================================================================
 * 2. TypingText
 * ========================================================================== */

/**
 * TypingText
 * - texts 목록을 전달받아 한 글자씩 타이핑되듯 생성되는 애니메이션 모션을 출력하고,
 * - 문장이 모두 타이핑되면 지정된 대기 시간 동안 유지된 후 다음 글자로 전환됩니다.
 */
export function TypingText({
  texts,
  typingSpeed = 100,
  pauseDuration = 1000,
  className = 'text-[1.6em] font-bold text-[var(--color-gray-90,#111)]',
}: TypingTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [charCount, setCharCount] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const rawItem = texts && texts.length > 0 ? texts[currentIndex] : '';

  const fullTextLength = React.useMemo(() => {
    if (typeof rawItem === 'string') {
      return rawItem.replace(/<[^>]*>/g, '').length;
    }
    return getPlainText(rawItem).length;
  }, [rawItem]);

  React.useEffect(() => {
    if (!texts || texts.length === 0) return;

    if (isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
        setCharCount(0);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }, pauseDuration);
      return () => clearTimeout(timer);
    }

    if (charCount < fullTextLength) {
      const timer = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      setIsPaused(true);
    }
  }, [charCount, isPaused, fullTextLength, texts, typingSpeed, pauseDuration]);

  const slicedContent = React.useMemo(() => {
    if (typeof rawItem === 'string') {
      return sliceHtmlText(rawItem, charCount);
    }
    return sliceReactNode(rawItem, charCount);
  }, [rawItem, charCount]);

  if (!texts || texts.length === 0) return null;

  return (
    <Typo variant="body-md" className={className}>
      {slicedContent}
    </Typo>
  );
}

/* ==========================================================================
 * 3. PuzzleSpinner & PuzzleSpinnerRoot
 * ========================================================================== */

/**
 * PuzzleSpinner
 * - 퍼즐 애니메이션 아이콘과 타이핑 효과 텍스트가 나란히 배치되는 로딩 스피너 컴포넌트입니다.
 */
export function PuzzleSpinner({
  className,
  texts = [
    <>
      AI가 <span className="text-[var(--color-primary-50,#ff5000)] font-bold">최적의 설계</span>를 찾고 있어요!
    </>,
    <>
      잠시만요. <span className="text-[var(--color-primary-50,#ff5000)] font-bold">답변</span>을 정리하고 있어요.
    </>,
    <>
      곧 <span className="text-[var(--color-primary-50,#ff5000)] font-bold">결과</span>를 보여드릴게요.
    </>,
  ],
  typingSpeed = 100,
  pauseDuration = 1000,
  isVisible = true,
}: PuzzleSpinnerProps) {
  if (!isVisible) return null;

  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-2 px-4 ${className ?? ''}`}>
      <div className="shrink-0 flex items-center justify-center">
        <Image src={AiLoadingPuzzle} alt="" width={36} height={36} className="w-[3.6rem] h-[3.6rem] object-contain" />
      </div>
      <div className="h-[3rem]">
        <TypingText
          texts={texts}
          typingSpeed={typingSpeed}
          pauseDuration={pauseDuration}
          className="text-[1.6em] font-bold text-[var(--color-gray-90,#111)]"
        />
      </div>
    </div>
  );
}

export const PuzzleSpinnerRoot = PuzzleSpinner;

/* ==========================================================================
 * 4. Internal Component: GooeyDots (스피너 공통 3-Dot Gooey 애니메이션)
 * ========================================================================== */

interface GooeyDotsProps {
  wrapperClassName?: string;
  innerClassName?: string;
}

function GooeyDots({
  wrapperClassName = 'w-[12rem] h-[5rem] absolute flex items-center justify-center animate-rotate-move [filter:url(#goo)] scale-[0.7]',
  innerClassName = '',
}: GooeyDotsProps) {
  return (
    <div className={`${wrapperClassName} ${innerClassName}`}>
      <div className="absolute w-[1rem] h-[1rem] z-40 rounded-full bg-[var(--color-primary-50)] top-[50%] left-[50%] translate-[-50%,-50%]" />
      <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-danger-50)] rounded-[80%] z-10 animate-dot-1-move" />
      <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-warning-40)] rounded-[80%] z-20 animate-dot-2-move" />
      <div className="absolute w-[2.4rem] h-[2.4rem] bg-[var(--color-primary-50)] rounded-[80%] z-30 animate-dot-3-move" />
    </div>
  );
}

function GooeySvgFilter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
        </filter>
      </defs>
    </svg>
  );
}

/* ==========================================================================
 * 5. Internal Component: GlobalSpinnerPortal (전역 스피너 공통 포탈 오버레이)
 * ========================================================================== */

interface GlobalSpinnerPortalProps {
  props?: SpinnerRootProps;
  backgroundStyle?: React.CSSProperties;
  translateYClass?: string;
  renderIndicator: (currentText: React.ReactNode, currentIndex: number) => React.ReactNode;
  animationStyle?: React.ReactNode;
}

function GlobalSpinnerPortal({
  props,
  backgroundStyle = {},
  renderIndicator,
  animationStyle,
}: GlobalSpinnerPortalProps) {
  const isVisibleFromStore = useAppSelector(selectIsSpinnerVisible);
  const isVisible = props?.isVisible ?? (props?.texts && props.texts.length > 0 ? true : isVisibleFromStore);
  const message = useAppSelector(selectSpinnerMessage);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const texts = props?.texts ?? (message ? [message] : undefined);
  const interval = props?.interval ?? 2000;
  const { currentIndex, currentText } = useTextLoop(texts, interval, '조회중입니다.');

  if (!isMounted || !isVisible) return null;

  return createPortal(
    <div
      role="dialog"
      tabIndex={-1}
      aria-busy="true"
      aria-label={typeof currentText === 'string' ? currentText : undefined}
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
      {renderIndicator(currentText, currentIndex)}
      {animationStyle}
    </div>,
    document.body
  );
}

/* ==========================================================================
 * 6. BaseSpinnerRoot
 * ========================================================================== */

export function BaseSpinnerRoot(props?: SpinnerRootProps) {
  const transparentBackground = useAppSelector(selectIsTransparentBackground);
  const hideLoadingIndicator = useAppSelector(selectIsHideLoadingIndicator);

  const backgroundStyle: React.CSSProperties = transparentBackground
    ? {}
    : {
        background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0) 100%)',
        backdropFilter: 'blur(0)',
      };

  return (
    <GlobalSpinnerPortal
      props={props}
      backgroundStyle={backgroundStyle}
      renderIndicator={(currentText, currentIndex) => (
        <>
          {!hideLoadingIndicator && (
            <Gcol className="flex items-center justify-center min-h-screen gap-0">
              <div className="absolute w-[3rem] h-[3rem] flex items-center justify-center animate-gather-rotate">
                <div
                  className="absolute w-[3rem] h-[3rem] bg-[var(--color-danger-50)] rounded-full z-10 animate-gather-move"
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
              {Boolean(currentText) && (
                <Typo key={currentIndex} variant={'body-md'} className="animate-text-change">
                  {renderTextWithHtml(currentText)}
                </Typo>
              )}
            </Gcol>
          )}
        </>
      )}
      animationStyle={
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
                transform: translateY(3.3rem);
              }
              to {
                opacity: 1;
                transform: translateY(3rem);
              }
            }
            .animate-text-change {
              animation: text-fade-in-translate 0.3s ease-out forwards;
            }
          `}
        </style>
      }
    />
  );
}

/* ==========================================================================
 * 7. SpinnerRoot (전역 스피너 루트)
 * ========================================================================== */

export function SpinnerRoot(props?: SpinnerRootProps) {
  const hideLoadingIndicator = useAppSelector(selectIsHideLoadingIndicator);

  return (
    <GlobalSpinnerPortal
      props={props}
      renderIndicator={(currentText, currentIndex) => (
        <>
          {!hideLoadingIndicator && (
            <Gcol className="items-center justify-center min-h-screen gap-[5rem] -translate-y-[2rem]">
              <Gcol
                className="items-center justify-center w-[20rem] h-[20rem] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 35%, rgba(255, 255, 255, 0) 70%)',
                }}
              >
                <GooeyDots wrapperClassName="w-full h-full absolute flex items-center justify-center animate-rotate-move [filter:url(#goo)] scale-[0.8] translate-y-[-3rem]" />
                {Boolean(currentText) && (
                  <Typo
                    tag={'div'}
                    key={currentIndex}
                    variant={'heading-md'}
                    className="animate-text-change translate-y-[-3.6rem]"
                  >
                    {renderTextWithHtml(currentText)}
                  </Typo>
                )}
                <GooeySvgFilter />
              </Gcol>
            </Gcol>
          )}
        </>
      )}
      animationStyle={
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
      }
    />
  );
}

/* ==========================================================================
 * 8. Spinner (독립형 로컬 인라인 스피너)
 * ========================================================================== */

/**
 * Spinner
 * - Portal이나 Redux 스토어 상태에 구애받지 않고 특정 영역(Grid 등) 내부에서 인라인으로 직접 돌아가는 독립형 로컬 스피너 컴포넌트입니다.
 * - 복수의 텍스트 배열을 전달받은 경우 설정된 interval 간격(기본 2000ms)으로 텍스트를 순환하며 출력합니다.
 */
export function Spinner({ className, texts = ['조회중입니다.'], interval = 2000 }: LocalSpinnerProps) {
  const { currentIndex, currentText } = useTextLoop(texts, interval, '조회중입니다.');

  return (
    <Gcol className={`flex items-center justify-center gap-[5rem] -translate-y-[2rem] ${className ?? ''}`}>
      <GooeyDots />
      <Typo key={currentIndex} variant={'body-md'} className="animate-text-change">
        {renderTextWithHtml(currentText)}
      </Typo>
      <GooeySvgFilter />

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

/* ==========================================================================
 * 9. AiSpinner
 * ========================================================================== */

export function AiSpinner({
  className,
  size = 'min(46vmin, 360px)',
  text = 'AI',
  srText = 'Loading',
  texts,
  interval = 2000,
}: AiSpinnerProps) {
  const { currentIndex } = useTextLoop(texts, interval);

  return (
    <Gcol className={`flex items-center justify-center relative ${className ?? ''}`}>
      <div className="ai-loader" role="status" aria-live="polite" style={{ '--size': size } as React.CSSProperties}>
        <span className="orb" />
        <span className="orb" />
        <span className="orb" />
        <span className="orb" />
        {Boolean(text) && (
          <span className="ai-text" aria-hidden="true">
            {renderTextWithHtml(text)}
          </span>
        )}
        <span className="sr-only">{srText}</span>
      </div>

      {texts && texts.length > 0 && (
        <div className="ai-spinner-text-container">
          {texts.map((t, idx) => (
            <div
              key={idx}
              className={`text-[1.6rem] font-bold ai-spinner-text ${idx === currentIndex ? 'active' : ''}`}
            >
              {renderTextWithHtml(t)}
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
            place-items: center;
            transform: translateY(-0.8rem);
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
            animation: ai-text-pulse 2.2s ease-in-out infinite;
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

          @keyframes ai-text-pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.35;
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

/* ==========================================================================
 * 10. VerticalRollingSpinner (세로 무한 롤링 스피너)
 * ========================================================================== */

/** 아이콘 컴포넌트 Props 규격 */
export interface RollingIconProps {
  /** 중앙(Active) 위치 여부 (true일 경우 애니메이션 동작) */
  isActive?: boolean;
  className?: string;
  size?: number | string;
}

/** 롤링 스피너 아이템 규격 */
export interface RollingSpinnerItem {
  id: string | number;
  /** 표시할 텍스트 (문자열 또는 JSX) */
  text: React.ReactNode;
  /**
   * 아이콘 컴포넌트 (또는 ReactNode).
   * ComponentType일 경우 { isActive?: boolean } 프로퍼티가 전달되어 중앙 활성화 시 애니메이션을 제어합니다.
   */
  icon?: React.ComponentType<RollingIconProps> | React.ReactNode;
}

export interface VerticalRollingSpinnerProps {
  className?: string;
  /** 롤링할 아이템 목록 (기본값: 5개 샘플 아이템) */
  items?: RollingSpinnerItem[];
  /** 아이템 1개의 높이 (rem 단위, 기본값: 4.8rem = 48px) */
  itemHeightRem?: number;
  /** 다음 아이템으로 스크롤되는 주기 (ms 단위, 기본값: 2500ms) */
  interval?: number;
}

/* --------------------------------------------------------------------------
 * 샘플 아이콘 5종
 * -------------------------------------------------------------------------- */

/** 1. 톱니바퀴 (설계 조건 확인) */
export function RollingIconSettings({ isActive = false, className = '' }: RollingIconProps) {
  return (
    <Image
      src={isActive ? AiLoadingSetting : StaticAiLoadingSetting}
      alt="설계 조건 확인"
      width={24}
      height={24}
      className={`w-full h-full object-contain ${className}`}
    />
  );
}

/** 2. 돋보기 (담보 조합 탐색) */
export function RollingIconSearch({ isActive = false, className = '' }: RollingIconProps) {
  return (
    <Image
      src={isActive ? AiLoadingSearch : StaticAiLoadingSearch}
      alt="최적 담보 조합 탐색"
      width={24}
      height={24}
      className={`w-full h-full object-contain ${className}`}
    />
  );
}

/** 3. 시뮬레이션 (보장 금액 시뮬레이션) */
export function RollingIconSimulate({ isActive = false, className = '' }: RollingIconProps) {
  return (
    <Image
      src={isActive ? AiLoadingTypeCheck : StaticAiLoadingTypeCheck}
      alt="보장 금액 시뮬레이션"
      width={24}
      height={24}
      className={`w-full h-full object-contain ${className}`}
    />
  );
}

/** 4. 추천 설계안 (AI 추천 설계안 구성) */
export function RollingIconCheck({ isActive = false, className = '' }: RollingIconProps) {
  return (
    <Image
      src={isActive ? AiLoadingPlan : StaticAiLoadingPlan}
      alt="AI 추천 설계안 구성"
      width={24}
      height={24}
      className={`w-full h-full object-contain ${className}`}
    />
  );
}

/** 5. AI 별/반짝이 (답변 불러오는 중) */
export function RollingIconSparkles({ isActive = false, className = '' }: RollingIconProps) {
  return (
    <Image
      src={isActive ? AiLoadingAi : StaticAiLoadingAi}
      alt="답변 불러오는 중"
      width={24}
      height={24}
      className={`w-full h-full object-contain ${className}`}
    />
  );
}

/** 기본 롤링 스피너 샘플 5개 데이터 세트 */
export const defaultRollingSpinnerItems: RollingSpinnerItem[] = [
  {
    id: 1,
    text: (
      <>
        분석 결과를 바탕으로 AI가{' '}
        <span className="text-[var(--color-primary-50,#ff5000)] font-bold">최적의 추천 설계안을 구성</span>하고 있어요.
      </>
    ),
    icon: RollingIconCheck,
  },
  {
    id: 2,
    text: (
      <>
        거의 다 되었어요! <span className="text-[var(--color-primary-50,#ff5000)] font-bold">정리된 답변</span>을 화면에
        불러오는 중이에요.
      </>
    ),
    icon: RollingIconSparkles,
  },
  {
    id: 3,
    text: (
      <>
        입력하신 정보를 분석하여{' '}
        <span className="text-[var(--color-primary-50,#ff5000)] font-bold">설계 조건을 확인</span>하고 있어요.
      </>
    ),
    icon: RollingIconSettings,
  },
  {
    id: 4,
    text: (
      <>
        조건에 꼭 맞는 <span className="text-[var(--color-primary-50,#ff5000)] font-bold">최적의 담보 조합을 탐색</span>
        하고 있어요.
      </>
    ),
    icon: RollingIconSearch,
  },
  {
    id: 5,
    text: (
      <>
        가성비와 보장 금액을 꼼꼼하게{' '}
        <span className="text-[var(--color-primary-50,#ff5000)] font-bold">시뮬레이션</span>하는 중이에요.
      </>
    ),
    icon: RollingIconSimulate,
  },
];

/** 아이콘 렌더링 헬퍼 함수 */
function renderRollingIcon(
  icon: React.ComponentType<RollingIconProps> | React.ReactNode | undefined,
  isActive: boolean
) {
  if (!icon) return null;

  const playStateStyle: React.CSSProperties = {
    animationPlayState: isActive ? 'running' : 'paused',
  };

  // React 컴포넌트인 경우
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null && '$$typeof' in (icon as object))) {
    const IconComponent = icon as React.ComponentType<RollingIconProps>;
    return (
      <div
        className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
          isActive
            ? 'is-active opacity-100 grayscale-0 [&_*]:[animation-play-state:running]'
            : 'is-inactive opacity-40 grayscale [&_*]:[animation-play-state:paused]'
        }`}
        style={playStateStyle}
      >
        <IconComponent isActive={isActive} className={isActive ? 'is-active' : 'is-inactive'} />
      </div>
    );
  }

  // 일반 JSX Element인 경우
  return (
    <div
      className={`w-full h-full transition-all duration-300 flex items-center justify-center ${
        isActive
          ? 'is-active opacity-100 grayscale-0 [&_*]:[animation-play-state:running]'
          : 'is-inactive opacity-40 grayscale [&_*]:[animation-play-state:paused]'
      }`}
      style={playStateStyle}
    >
      {icon}
    </div>
  );
}

/**
 * VerticalRollingSpinner
 *
 * - 아래에서 위로 무한 롤링되는 로딩 스피너 컴포넌트입니다.
 * - 5개 항목이 세로로 나열되며, 중앙에 위치할 때 원래 색상과 아이콘 애니메이션이 가동됩니다.
 * - 위/아래 항목은 회색 처리(grayscale 100%, opacity 0.35)되며 애니메이션이 정지됩니다.
 */
export function VerticalRollingSpinner({
  className = '',
  items = defaultRollingSpinnerItems,
  itemHeightRem = 4.8,
  interval = 3000,
}: VerticalRollingSpinnerProps) {
  // 5개 뷰포트 기준, 중앙 3번째 포지션 offset = 2 (0, 1, [2], 3, 4)
  const centerSlotOffset = 2;
  const visibleCount = 5;

  // 무한 연속 롤링을 위해 아이템 배열을 3번 연속 복제
  const tripleItems = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    return [...items, ...items, ...items];
  }, [items]);

  const baseLength = items?.length || 5;

  // 현재 뷰포트 맨 위 포지션의 인덱스 (기본 baseLength에서 시작)
  const [currentIndex, setCurrentIndex] = React.useState(baseLength);
  const [isTransitioning, setIsTransitioning] = React.useState(true);

  React.useEffect(() => {
    if (!items || items.length === 0) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [items, interval]);

  // 트랜지션이 끝났을 때 2번째 세트의 끝에 도달하면 1번째 세트로 감쪽같이 조용히 순간이동(무한 루프)
  const handleTransitionEnd = () => {
    if (currentIndex >= baseLength * 2) {
      setIsTransitioning(false);
      setCurrentIndex(baseLength);
      // 브라우저 렌더링 리플로우 후 다음 프레임에서 애니메이션 복원
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  if (!items || items.length === 0) return null;

  const totalHeightRem = itemHeightRem * visibleCount;

  return (
    <Gcol className="h-full" placement="cc">
      <div
        className={`relative w-full max-w-[50rem] mx-auto overflow-hidden select-none ${className}`}
        style={{
          height: `${totalHeightRem}rem`,
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 15%, #000000 35%, #000000 65%, rgba(0,0,0,0.85) 85%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 15%, #000000 35%, #000000 65%, rgba(0,0,0,0.85) 85%, transparent 100%)',
        }}
      >
        <div
          className="w-full flex flex-col items-start"
          style={{
            transform: `translateY(-${currentIndex * itemHeightRem}rem)`,
            transition: isTransitioning ? 'transform 0.61s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {tripleItems.map((item, idx) => {
            // 중앙 포지션(3번째 위치) 판단
            const isCenter = idx === currentIndex + centerSlotOffset;

            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-full flex items-center justify-start gap-[1.2rem] px-[1.6rem]"
                style={{
                  height: `${itemHeightRem}rem`,
                  opacity: isCenter ? 1 : 0.35,
                  filter: isCenter ? 'grayscale(0%)' : 'grayscale(100%)',
                  transform: isCenter ? 'scale(1)' : 'scale(0.96)',
                  transformOrigin: 'left center',
                  fontWeight: isCenter ? 700 : 400,
                  color: isCenter ? 'var(--color-gray-90, #171717)' : 'var(--color-gray-50, #8e95a3)',
                  transition: isTransitioning ? 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                }}
              >
                {/* 아이콘 영역 (중앙일 때 isActive=true 로 애니메이션 동작) */}
                <div className="shrink-0 flex items-center justify-center w-[2.8rem] h-[2.8rem]">
                  {renderRollingIcon(item.icon, isCenter)}
                </div>

                {/* 텍스트 영역 */}
                <Typo variant={'body-xl'} className="font-bold">
                  {renderTextWithHtml(item.text)}
                </Typo>
              </div>
            );
          })}
        </div>
      </div>
    </Gcol>
  );
}
