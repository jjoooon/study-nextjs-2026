/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { CloseIcon } from '@icons';

// Popover 루트 props
interface PopoverProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
  className?: string;
}

// Popover 루트 래퍼
// - Radix Root를 그대로 감싸 프로젝트 공통 인터페이스로 제공
const Popover: React.FC<PopoverProps> = ({ children, ...props }) => (
  <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
);

// Popover 트리거 래퍼
const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Trigger ref={ref} className={cn(className)} {...props}>
    {children}
  </PopoverPrimitive.Trigger>
));
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

const PopoverAnchor = PopoverPrimitive.Anchor;

// 콘텐츠 오픈/클로즈 모션 타입
type PopoverMotion = 'fade' | 'scale' | 'none';

// Popover 콘텐츠 props
// - variant/variantStyles: 테마 스타일 확장
// - portalContainer: 특정 DOM에 Portal 렌더링
// - classWrap: Radix wrapper(data-radix-popper-content-wrapper)에 동적 클래스 적용
interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  variant?: string;
  variantStyles?: Record<string, string>;
  motion?: PopoverMotion;
  portalContainer?: HTMLElement | null;
  classWrap?: string;
  closeButton?: boolean;
}

// 기본 variant 스타일(필요 시 variantStyles로 확장/재정의 가능)
export const defaultPopoverVariantStyles: Record<string, string> = {
  default: 'bg-[#fff] text-popover-foreground',
  dark: 'bg-gray-900 text-white',
  light: 'bg-white text-gray-900',
};

// 모션 타입별 클래스 매핑
const motionClassMap: Record<PopoverMotion, string> = {
  fade: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  scale:
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  none: '',
};

const PopoverContent = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
  (props, ref) => {
    const {
      className,
      classWrap,
      align = 'center',
      sideOffset = 4,
      motion = 'fade',
      closeButton = false,
      portalContainer,
      variant = 'default',
      variantStyles = defaultPopoverVariantStyles,
      ...rest
    } = props;

    // motion 문자열을 실제 클래스 문자열로 변환
    let motionClass = '';
    if (motion === 'fade') {
      motionClass = motionClassMap.fade;
    } else if (motion === 'scale') {
      motionClass = motionClassMap.scale;
    } else {
      motionClass = '';
    }

    React.useEffect(() => {
      // portalContainer를 사용하는 경우에만
      // Radix wrapper의 position을 강제하고(classWrap 적용을 위해)
      // wrapper에 classWrap 클래스를 동적으로 추가한다.
      if (portalContainer) {
        const styleId = 'popover-content-wrapper-absolute-style';
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.innerHTML = '[data-radix-popper-content-wrapper]{position:absolute !important;}';
          document.head.appendChild(style);
        }
        // classWrap을 data-radix-popper-content-wrapper에 동적으로 추가
        const wrapper = portalContainer.querySelector('[data-radix-popper-content-wrapper]');
        if (wrapper && classWrap) {
          wrapper.classList.add(...classWrap.split(' '));
        }
      }
    }, [portalContainer, classWrap]);
    return (
      <PopoverPrimitive.Portal {...(portalContainer ? { container: portalContainer } : {})}>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          tabIndex={-1}
          className={cn(
            'z-150 w-auto border border-[var(--color-gray-10)] rounded-[.6rem] px-2.5 py-2 shadow-md outline-none',
            variantStyles[variant] ?? variantStyles.default,
            motionClass,
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]',
            className
          )}
          onOpenAutoFocus={(e) => {
            // 기본 자동 포커스를 막아, 필요한 경우 외부에서 포커스 위치를 제어한다.
            e.preventDefault();
            // inputRef.current?.focus(); // trigger input ref를 여기서 받아서 focus
          }}
          {...rest}
        >
          {/* 우측 상단 닫기 버튼(옵션) */}
          {closeButton && (
            <PopoverPrimitive.Close
              aria-label="Close"
              className="absolute -top-2 -right-2 p-1 hover:bg-[var(--color-gray-90)] focus:outline-none w-[1.8rem] h-[1.8rem] flex items-center justify-center bg-[var(--color-gray-70)] rounded-full"
            >
              <CloseIcon color={'var(--color-gray-0)'} size={10} />
            </PopoverPrimitive.Close>
          )}
          {props.children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
