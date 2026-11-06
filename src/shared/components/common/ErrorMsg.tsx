/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useMounted from '@/shared/hooks/useMounted';
import { cn } from '@/shared/lib/shadcn/utils';
import log from '@/shared/utils/logger';
import { Typo } from '@atoms';
import { useDialogPortalContainer } from '@uiux/DialogContainerContext';

/**
 * 에러 메시지 말풍선(anchor) 위치 토큰.
 *
 * 네이밍 규칙:
 * - t/b: 트리거 요소의 위(top) / 아래(bottom)
 * - l/c/r: 좌(left) / 중앙(center) / 우(right)
 *
 * 예)
 * - `tl`: 트리거 위-좌측
 * - `bc`: 트리거 아래-중앙
 */
type ErrorMsgPosition = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

/**
 * 기본(인라인) 모드 위치 토큰 -> Tailwind class 매핑.
 * 부모 relative 컨테이너 기준으로 배치되어 스크롤/이동 시 부모와 함께 자연스럽게 움직입니다.
 */
const positionStyles: Record<ErrorMsgPosition, string> = {
  tl: 'bottom-[calc(100%+0.6rem)] left-0',
  tc: 'bottom-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2',
  tr: 'bottom-[calc(100%+0.6rem)] right-0',
  bl: 'top-[calc(100%+0.6rem)] left-0',
  bc: 'top-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2',
  br: 'top-[calc(100%+0.6rem)] right-0',
};

/**
 * 위치 토큰 -> 말풍선 꼬리(after pseudo element) Tailwind class 매핑.
 */
const arrowStyles: Record<ErrorMsgPosition, string> = {
  tl: 'top-full left-[0.4rem] rotate-[45deg] translate-y-[-0.4rem]',
  tc: 'top-full left-1/2 -translate-x-1/2 rotate-[45deg] translate-y-[-0.4rem]',
  tr: 'top-full right-[0.4rem] rotate-[45deg] translate-y-[-0.4rem]',
  bl: 'bottom-full left-[0.4rem] rotate-[225deg] translate-y-[0.4rem]',
  bc: 'bottom-full left-1/2 -translate-x-1/2 rotate-[225deg] translate-y-[0.4rem] w-auto text-center',
  br: 'bottom-full right-[0.4rem] rotate-[225deg] translate-y-[0.4rem]',
};

/**
 * 포탈 모드용 위치 토큰 -> absolute 포지션 transform Tailwind class 매핑.
 */
const transformStyles: Record<ErrorMsgPosition, string> = {
  tl: 'translate-y-[-100%]',
  tc: 'translate-x-[-50%] translate-y-[-100%]',
  tr: 'translate-x-[-100%] translate-y-[-100%]',
  bl: '',
  bc: 'translate-x-[-50%]',
  br: 'translate-x-[-100%]',
};

/**
 * ErrorMsg props.
 *
 * 사용 시나리오:
 * - 폼 필드/버튼 등 트리거 요소에 `aria-describedby={id}` 연결
 * - 검증 실패 시 `show=true`로 에러 노출
 * - 외부 클릭/포커스 이탈 시 `onClose`로 닫힘 처리
 */
type ErrorMsgProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** 접근성 연결 id (`aria-describedby`와 동일값 권장) */
  id?: string;
  children: React.ReactNode;
  /** 표시 여부 */
  show?: boolean;
  /** 말풍선 위치 */
  position?: ErrorMsgPosition;
  /** 닫힘 이벤트 핸들러 */
  onClose?: () => void;
  /** 외부 클릭/터치 시 자동 닫기 여부 */
  closeOnOutsideClick?: boolean;
  /**
   * 포탈(Portal) 렌더링 여부.
   * - 기본값 `false`: 해당 영역(부모 relative 컨테이너) 내부의 absolute 위치에 렌더링되어 스크롤/이동 시 함께 자연스럽게 움직입니다.
   * - `true`: overflow: hidden이나 z-index 간섭을 피해야 하는 특별한 경우에만 포탈로 렌더링합니다.
   *          (모달 내부인 경우 모달 컨테이너 안으로, 그 외에는 document.body로 마운트됨)
   */
  usePortal?: boolean;
  /** usePortal의 축약형 prop (호환성) */
  portal?: boolean;
  /** 포탈을 마운트할 특정 DOM 컨테이너 (미지정 시 자동 감지) */
  portalContainer?: HTMLElement | null;
};

const logger = log.getLogger('Pub');

export function ErrorMsg({
  id,
  children,
  show = true,
  position = 'tl',
  onClose,
  closeOnOutsideClick = true,
  usePortal = false,
  portal,
  portalContainer: portalContainerProp,
  className,
  style,
  ...props
}: ErrorMsgProps) {
  const isPortal = portal ?? usePortal;
  const contextDialogContainer = useDialogPortalContainer();

  /** 앵커(원래 배치 위치) DOM 참조 */
  const anchorRef = useRef<HTMLSpanElement | null>(null);
  /** 말풍선 DOM 참조 (내부 클릭 판별용) */
  const containerRef = useRef<HTMLSpanElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const [resolvedPortalTarget, setResolvedPortalTarget] = useState<HTMLElement | null>(null);

  useMounted(() => {
    setMounted(true);
  });

  // 포탈 타겟 컨테이너 결정 (포탈 모드일 때만)
  useEffect(() => {
    if (!isPortal) {
      setResolvedPortalTarget(null);
      return;
    }

    if (portalContainerProp) {
      setResolvedPortalTarget(portalContainerProp);
      return;
    }

    if (contextDialogContainer) {
      setResolvedPortalTarget(contextDialogContainer);
      return;
    }

    // Context가 없는 다이얼로그나 팝업인 경우 DOM 트리 상위에서 다이얼로그 컨테이너 탐색
    const modalEl = anchorRef.current?.closest(
      '[data-slot="dialog-content"], [role="dialog"], .dialog-content'
    ) as HTMLElement | null;

    if (modalEl) {
      setResolvedPortalTarget(modalEl);
      return;
    }

    if (typeof document !== 'undefined') {
      setResolvedPortalTarget(document.body);
    }
  }, [isPortal, portalContainerProp, contextDialogContainer, mounted]);

  /** 포탈 모드일 때의 대상 기준 위치 계산 */
  const updatePosition = () => {
    if (!anchorRef.current || !resolvedPortalTarget) return;
    const targetElement = anchorRef.current.parentElement || anchorRef.current;
    const rect = targetElement.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;

    const gap = 6; // 0.6rem = 6px

    if (resolvedPortalTarget === document.body) {
      // document.body 기준 포탈 좌표 계산
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      let top = 0;
      let left = 0;

      switch (position) {
        case 'tl':
          top = rect.top + scrollTop - gap;
          left = rect.left + scrollLeft;
          break;
        case 'tc':
          top = rect.top + scrollTop - gap;
          left = rect.left + scrollLeft + rect.width / 2;
          break;
        case 'tr':
          top = rect.top + scrollTop - gap;
          left = rect.right + scrollLeft;
          break;
        case 'bl':
          top = rect.bottom + scrollTop + gap;
          left = rect.left + scrollLeft;
          break;
        case 'bc':
          top = rect.bottom + scrollTop + gap;
          left = rect.left + scrollLeft + rect.width / 2;
          break;
        case 'br':
          top = rect.bottom + scrollTop + gap;
          left = rect.right + scrollLeft;
          break;
      }

      setCoords({ top, left });
    } else {
      // 모달/특정 컨테이너 내부 기준 상대 좌표 계산
      const containerRect = resolvedPortalTarget.getBoundingClientRect();
      const baseTop = rect.top - containerRect.top + resolvedPortalTarget.scrollTop;
      const baseLeft = rect.left - containerRect.left + resolvedPortalTarget.scrollLeft;

      let top = 0;
      let left = 0;

      switch (position) {
        case 'tl':
          top = baseTop - gap;
          left = baseLeft;
          break;
        case 'tc':
          top = baseTop - gap;
          left = baseLeft + rect.width / 2;
          break;
        case 'tr':
          top = baseTop - gap;
          left = baseLeft + rect.width;
          break;
        case 'bl':
          top = baseTop + rect.height + gap;
          left = baseLeft;
          break;
        case 'bc':
          top = baseTop + rect.height + gap;
          left = baseLeft + rect.width / 2;
          break;
        case 'br':
          top = baseTop + rect.height + gap;
          left = baseLeft + rect.width;
          break;
      }

      setCoords({ top, left });
    }
  };

  useLayoutEffect(() => {
    if (!show || !isPortal) return;
    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    let resizeObserver: ResizeObserver | null = null;
    if (anchorRef.current) {
      const targetElement = anchorRef.current.parentElement || anchorRef.current;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          updatePosition();
        });
        resizeObserver.observe(targetElement);
      }
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [show, position, isPortal, resolvedPortalTarget, children]);

  useEffect(() => {
    /** 표시 중이 아니거나 외부 클릭 닫기가 비활성화면 리스너 미등록 */
    if (!show || !closeOnOutsideClick) return;

    /**
     * 외부 포인터 입력으로 닫힘 처리.
     * 닫지 않는 예외 케이스:
     * 1) ErrorMsg 내부 또는 앵커 부모 요소 클릭
     * 2) `aria-describedby`로 연결된 트리거 요소 클릭
     * 3) 현재 포커스 요소가 해당 ErrorMsg와 연결된 경우
     */
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // ErrorMsg 자체 또는 앵커 부모를 클릭한 경우
      if (containerRef.current?.contains(target) || anchorRef.current?.parentElement?.contains(target)) return;

      // aria-describedby로 연결된 요소를 클릭한 경우
      if (id && target instanceof Element) {
        const describedBy = target.getAttribute('aria-describedby');

        if (describedBy?.split(' ').includes(id)) return;

        // 포커스된 요소가 aria-describedby로 연결되어 있는지 확인
        const activeElement = document.activeElement;
        if (activeElement) {
          logger.log('handlePointerDown3', activeElement);

          const activeDescribedBy = activeElement.getAttribute('aria-describedby');
          if (activeDescribedBy?.split(' ').includes(id)) return;
        }
      }

      onClose?.();
    };

    /**
     * 포커스 이동 기반 닫힘 처리.
     * - 연결된 요소에서 포커스가 벗어나면 닫기
     * - 단, 포커스가 ErrorMsg 내부로 이동하면 유지
     */
    const handleFocusOut = (event: FocusEvent) => {
      const relatedTarget = event.relatedTarget as Element | null;

      // 연결된 요소에서 포커스가 빠진 경우
      if (event.target instanceof Element) {
        const describedBy = event.target.getAttribute('aria-describedby');
        if (id && describedBy?.split(' ').includes(id)) {
          // ErrorMsg 자체로 포커스가 이동하는 경우는 닫지 않음
          if (relatedTarget && containerRef.current?.contains(relatedTarget)) return;

          onClose?.();
        }
      }
    };

    // 마우스/터치/키보드 포커스 이동을 모두 커버하기 위해 3종 이벤트 등록
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('focusout', handleFocusOut, true);

    // 언마운트/의존성 변경 시 리스너 정리
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('focusout', handleFocusOut, true);
    };
  }, [show, closeOnOutsideClick, onClose, id]);

  const formattedChildren =
    typeof children === 'string'
      ? children
          .replace(/\\n/g, '\n')
          .split('\n')
          .map((line, index) => (
            <Fragment key={index}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))
      : children;

  // 1) 특별한 경우: 포탈 모드 (usePortal={true})
  // overflow: hidden이나 z-index 문제로 부모를 탈출해야 할 때 사용
  // 모달 내부이면 모달 컨테이너 안으로, 그 외에는 document.body로 마운트
  if (isPortal) {
    const tooltipPortal =
      mounted && show && coords && resolvedPortalTarget
        ? createPortal(
            <span
              id={id}
              /** 디버깅/자동화 선택자용 식별 데이터 속성 */
              data-component="error-msg"
              ref={containerRef}
              style={{
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                ...style,
              }}
              className={cn(
                // 말풍선 본체 스타일 (Portal rendering via absolute positioning)
                'absolute z-[9999] shadow-md border border-[var(--color-input-border-error)] rounded-DEFAULT pointer-events-auto break-keep',
                // 위치 및 transform 매핑
                transformStyles[position],
                className
              )}
              {...props}
            >
              <Typo
                variant={'body-sm'}
                tag={'span'}
                className="block relative text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] px-2 py-[0.2rem] rounded-DEFAULT z-1 whitespace-nowrap"
              >
                {formattedChildren}
              </Typo>
              <span
                className={cn(
                  'w-2 h-2 absolute border border-[var(--color-input-border-error)] bg-[var(--color-input-surface-error)] z-0 rounded-1',
                  arrowStyles[position]
                )}
              />
            </span>,
            resolvedPortalTarget
          )
        : null;

    return (
      <>
        <span ref={anchorRef} className="hidden" aria-hidden="true" />
        {tooltipPortal}
      </>
    );
  }

  // 2) 기본 모드: 해당 영역(부모 relative 컨테이너) 내부의 absolute 위치에 렌더링
  // 스크롤 및 모달 이동 시 부모와 함께 자연스럽게 이동하며 모달 내부에서는 당연히 모달 안에 뜸
  if (!show) {
    return null;
  }

  return (
    <span
      id={id}
      /** 디버깅/자동화 선택자용 식별 데이터 속성 */
      data-component="error-msg"
      ref={containerRef}
      style={style}
      className={cn(
        // 말풍선 본체 스타일 (부모 relative 컨테이너 기준 absolute 배치)
        'block absolute z-20 shadow-md border border-[var(--color-input-border-error)] rounded-DEFAULT pointer-events-auto break-keep',
        // 위치 토큰 적용
        positionStyles[position],
        className
      )}
      {...props}
    >
      <span ref={anchorRef} className="hidden" aria-hidden="true" />
      <Typo
        variant={'body-sm'}
        tag={'span'}
        className="block relative text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] px-2 py-[0.2rem] rounded-DEFAULT z-1 whitespace-nowrap"
      >
        {formattedChildren}
      </Typo>
      <span
        className={cn(
          'w-2 h-2 absolute border border-[var(--color-input-border-error)] bg-[var(--color-input-surface-error)] z-0 rounded-1',
          arrowStyles[position]
        )}
      />
    </span>
  );
}
