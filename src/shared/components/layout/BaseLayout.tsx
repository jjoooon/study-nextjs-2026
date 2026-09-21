/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

// 공통 레이아웃 props
// - children: 하위 UI
// - className: 기본 레이아웃 클래스에 추가로 합칠 사용자 클래스
// - isPopup: 팝업 여부 (미지정 시 URL 파라미터 isPopup=true / popup=true 기준 자동 감지)
interface LayoutProps {
  children?: ReactNode;
  size?: string;
  className?: string;
  state?: boolean;
  isFlowExpanded?: boolean;
  isPopup?: boolean;
}

// 팝업 여부 판별 훅 (URL 파라미터 isPopup=true / popup=true / popup=y / popup=1 또는 prop 기준)
export const useIsPopup = (propIsPopup?: boolean) => {
  const searchParams = useSearchParams();

  if (typeof propIsPopup === 'boolean') {
    return propIsPopup;
  }

  // 1. Next.js searchParams 훅 검사
  const searchParamVal = searchParams?.get('isPopup') ?? searchParams?.get('popup');
  if (searchParamVal === 'true' || searchParamVal === 'y' || searchParamVal === '1') {
    return true;
  }

  // 2. 브라우저 window.location.search 검사 (Storybook iframe / 외부 iframe 환경 호환)
  if (typeof window !== 'undefined') {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const winParamVal = urlParams.get('isPopup') ?? urlParams.get('popup');
      if (winParamVal === 'true' || winParamVal === 'y' || winParamVal === '1') {
        return true;
      }

      // 3. Hash URL (예: #/?isPopup=true) 감지
      if (window.location.hash.includes('isPopup=true') || window.location.hash.includes('popup=true')) {
        return true;
      }
    } catch {
      // ignore
    }
  }

  return false;
};

// 문서 전체 래퍼: 상단(head) + 본문(body) 2행 구조 (팝업 모드일 경우 본문 1행 구조)
export const LayoutDoc = ({ children, className, isPopup: propIsPopup }: LayoutProps) => {
  const isPopup = useIsPopup(propIsPopup);

  return (
    <div
      data-layout="doc"
      data-is-popup={isPopup}
      className={cn(
        'relative grid h-full min-h-[51rem] bg-[#fff]',
        // 기본 2개 구조 (Head + Body), 팝업일 경우 1개 구조
        isPopup ? 'grid-rows-[minmax(0,1fr)]' : 'grid-rows-[auto_minmax(0,1fr)]',
        // 직계 자식(>) 중 3번째 자식이 존재하고 팝업이 아닌 경우 3행 구조 (Head + Body + Foot)로 변경
        !isPopup && '[&:has(>*:nth-child(3))]:grid-rows-[auto_minmax(0,1fr)_auto]',
        className
      )}
    >
      {children}
    </div>
  );
};

// 문서 상단 영역
export const LayoutHead = ({ children, className, isPopup: propIsPopup }: LayoutProps) => {
  const isPopup = useIsPopup(propIsPopup);

  if (isPopup) return null;

  return (
    <header
      data-layout="head"
      className={cn('relative flex justify-between items-center flex-col px-[1rem] ', className)}
    >
      {children}
    </header>
  );
};

// 문서 본문 영역: 좌측 보조영역 + 우측 메인영역 2열 구조
export const LayoutBody = ({ children, className, ...rest }: LayoutProps) => {
  return (
    <div
      data-layout="body"
      className={cn('relative grid grid-cols-[auto_minmax(0,1fr)] pr-[1rem] pt-[.4rem] gap-3', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

// 문서 하단 영역
export const LayoutFoot = ({ children, className, isPopup: propIsPopup }: LayoutProps) => {
  const isPopup = useIsPopup(propIsPopup);

  if (isPopup) return null;

  return (
    <footer data-layout="foot" className={cn('relative flex justify-between items-center', className)}>
      {children}
    </footer>
  );
};

export const LayoutProcess = ({ children, className }: LayoutProps) => {
  // 좌측 프로세스(스텝바) 영역
  // - 최소 너비를 유지해 단계 UI가 줄바꿈되지 않도록 한다.
  return (
    <div data-layout="process" className={cn('relative grid grid-cols-[minmax(0,1fr)] min-w-[4rem]', className)}>
      {children}
    </div>
  );
};

// 폴더형 콘텐츠 래퍼: 헤더 + 본문
export const LayoutFolder = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="folder" className={cn('relative grid grid-rows-[auto_minmax(0,1fr)] gap-2.5', className)}>
      {children}
    </div>
  );
};

// 폴더 헤더: 좌/우 액션 배치
export const LayoutFolderHead = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="folder-head" className={cn('relative flex justify-between gap-3', className)}>
      {children}
    </div>
  );
};

// 폴더 본문: 메인(좌) + 보조(우)
export const LayoutFolderBody = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="folder-body" className={cn('relative grid grid-cols-[minmax(0,1fr)_auto]', className)}>
      {children}
    </div>
  );
};

// 폴더 하단 액션 바
export const LayoutFolderFoot = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="folder-foot" className={cn('w-full flex justify-between gap-3', className)}>
      {children}
    </div>
  );
};

// 메인 영역 래퍼
export const LayoutMain = ({ children, className }: LayoutProps) => {
  return (
    <main data-layout="main" className={cn('relative overflow-hidden', className)}>
      {children}
    </main>
  );
};

// 메인 상단/본문/하단 분리 컴포넌트
export const LayoutMainHead = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="main-head" className={cn('relative w-full flex shrink-0', className)}>
      {children}
    </div>
  );
};

export const LayoutMainBody = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="main-body" className={cn('relative w-full flex flex-1', className)}>
      {children}
    </div>
  );
};

export const LayoutMainFoot = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="main-foot" className={cn('relative w-full flex shrink-0', className)}>
      {children}
    </div>
  );
};

// 우측/좌측 보조(Aside) 영역 래퍼
export const LayoutAside = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="aside" className={cn('relative flex flex-col h-full w-[19.8rem] gap-2', className)}>
      {children}
    </div>
  );
};

export const LayoutAsideHead = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="aside-head" className={cn('relative w-full flex shrink-0 w-[19.8rem]', className)}>
      {children}
    </div>
  );
};

export const LayoutAsideBody = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="aside-body" className={cn('relative w-full flex flex-1', className)}>
      {children}
    </div>
  );
};

export const LayoutAsideFoot = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="aside-foot" className={cn('relative w-full flex shrink-0', className)}>
      {children}
    </div>
  );
};

// 절대 위치 스크롤 래퍼
// - 부모 컨테이너를 꽉 채우고, 내부 스크롤 아이템을 배치한다.
export const LayoutScrollWrap = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="scroll-wrap" className={cn('grid w-full h-full absolute top-0 left-0 w-full h-full', className)}>
      {children}
    </div>
  );
};

// 실제 스크롤 영역
export const LayoutScrollItem = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="scroll-item" className={cn('overflow-auto w-full', className)}>
      {children}
    </div>
  );
};
