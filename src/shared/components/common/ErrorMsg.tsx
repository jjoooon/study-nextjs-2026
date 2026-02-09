'use client';

import { useEffect, useRef } from 'react';
import { Typo } from '@/shared/components/common';
import { cn } from '@/shared/lib/shadcn/utils';

type ErrorMsgPosition = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

const positionStyles: Record<ErrorMsgPosition, string> = {
  tl: 'bottom-[calc(100%+0.6rem)] left-0 after:top-full after:left-[0.4rem] after:rotate-[45deg] after:translate-y-[-0.4rem]',
  tc: 'bottom-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2 after:top-full after:left-1/2 after:-translate-x-1/2 after:rotate-[45deg] after:translate-y-[-0.4rem]',
  tr: 'bottom-[calc(100%+0.6rem)] right-0 after:top-full after:right-[0.4rem] after:rotate-[45deg] after:translate-y-[-0.4rem]',
  bl: 'top-[calc(100%+0.6rem)] left-0 after:bottom-full after:left-[0.4rem] after:rotate-[225deg] after:translate-y-[0.4rem]',
  bc: 'top-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2 after:bottom-full after:left-1/2 after:-translate-x-1/2 after:rotate-[225deg] after:translate-y-[0.4rem]',
  br: 'top-[calc(100%+0.6rem)] right-0 after:bottom-full after:right-[0.4rem] after:rotate-[225deg] after:translate-y-[0.4rem]',
};

type ErrorMsgProps = {
  id?: string;
  children: React.ReactNode;
  show?: boolean;
  position?: ErrorMsgPosition;
  onClose?: () => void;
  closeOnOutsideClick?: boolean;
};

export function ErrorMsg({
  id,
  children,
  show = true,
  position = 'tl',
  onClose,
  closeOnOutsideClick = true,
}: ErrorMsgProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!show || !closeOnOutsideClick) return;

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
          const activeDescribedBy = activeElement.getAttribute('aria-describedby');
          if (activeDescribedBy?.split(' ').includes(id)) return;
        }
      }

      onClose?.();
    };

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

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('focusout', handleFocusOut, true);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('focusout', handleFocusOut, true);
    };
  }, [show, closeOnOutsideClick, onClose, id]);

  if (!show) return null;

  return (
    <div
      id={id}
      ref={containerRef}
      className={cn(
        'absolute z-10 shadow-md border border-(--color-input-border-error) rounded-DEFAULT',
        'after:w-2 after:h-2 after:absolute after:border after:border-(--color-input-border-error)',
        'after:bg-(--color-input-surface-error) after:z-0 after:rounded-1 ',
        positionStyles[position]
      )}
    >
      <Typo
        variant="body-s"
        tag="div"
        className="relative text-(--color-text-danger) bg-(--color-input-surface-error) px-2 py-[0.2rem] rounded-DEFAULT z-1 whitespace-nowrap"
      >
        {children}
      </Typo>
    </div>
  );
}
