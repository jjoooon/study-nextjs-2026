/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import log from '@/shared/utils/logger';
import { Typo } from '@atoms';

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
 * 위치 토큰 -> Tailwind class 매핑.
 *
 * 구성:
 * - 본문 박스 위치(top/bottom + left/center/right)
 * - 꼬리(after pseudo element) 위치/회전
 */
const positionStyles: Record<ErrorMsgPosition, string> = {
  tl: 'bottom-[calc(100%+0.6rem)] left-0 after:top-full after:left-[0.4rem] after:rotate-[45deg] after:translate-y-[-0.4rem]',
  tc: 'bottom-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2 after:top-full after:left-1/2 after:-translate-x-1/2 after:rotate-[45deg] after:translate-y-[-0.4rem]',
  tr: 'bottom-[calc(100%+0.6rem)] right-0 after:top-full after:right-[0.4rem] after:rotate-[45deg] after:translate-y-[-0.4rem]',
  bl: 'top-[calc(100%+0.6rem)] left-0 after:bottom-full after:left-[0.4rem] after:rotate-[225deg] after:translate-y-[0.4rem]',
  bc: 'top-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2 after:bottom-full after:left-1/2 after:-translate-x-1/2 after:rotate-[225deg] after:translate-y-[0.4rem]',
  br: 'top-[calc(100%+0.6rem)] right-0 after:bottom-full after:right-[0.4rem] after:rotate-[225deg] after:translate-y-[0.4rem]',
};

/**
 * ErrorMsg props.
 *
 * 사용 시나리오:
 * - 폼 필드/버튼 등 트리거 요소에 `aria-describedby={id}` 연결
 * - 검증 실패 시 `show=true`로 에러 노출
 * - 외부 클릭/포커스 이탈 시 `onClose`로 닫힘 처리
 */
type ErrorMsgProps = {
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
};

const logger = log.getLogger('Pub');

export function ErrorMsg({
  id,
  children,
  show = true,
  position = 'tl',
  onClose,
  closeOnOutsideClick = true,
}: ErrorMsgProps) {
  /** 말풍선 DOM 참조(내부 클릭 판별용) */
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /** 표시 중이 아니거나 외부 클릭 닫기가 비활성화면 리스너 미등록 */
    if (!show || !closeOnOutsideClick) return;

    /**
     * 외부 포인터 입력으로 닫힘 처리.
     * 닫지 않는 예외 케이스:
     * 1) ErrorMsg 내부 클릭
     * 2) `aria-describedby`로 연결된 트리거 요소 클릭
     * 3) 현재 포커스 요소가 해당 ErrorMsg와 연결된 경우
     */
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // ErrorMsg 자체를 클릭한 경우
      if (containerRef.current?.contains(target)) return;

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

  /** 비표시 상태면 DOM 미렌더(접근성/성능 측면에서 명확) */
  if (!show) return null;

  return (
    <span
      id={id}
      /** 디버깅/자동화 선택자용 식별 데이터 속성 */
      data-component="error-msg"
      ref={containerRef}
      className={cn(
        // 말풍선 본체 스타일
        'block absolute z-10 shadow-md border border-[var(--color-input-border-error)] rounded-DEFAULT',
        // 말풍선 꼬리(after) 기본 스타일
        "after:content-[''] after:w-2 after:h-2 after:absolute after:border after:border-[var(--color-input-border-error)]",
        'after:bg-[var(--color-input-surface-error)] after:z-0 after:rounded-1 ',
        // 위치 토큰 적용
        positionStyles[position]
      )}
    >
      <Typo
        variant={'body-sm'}
        tag={'span'}
        className="block relative text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] px-2 py-[0.2rem] rounded-DEFAULT z-1 whitespace-nowrap"
      >
        {children}
      </Typo>
    </span>
  );
}
