/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { CloseIcon } from '@icons';

/** Popover 루트 props */
interface PopoverProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
  /**
   * 팝오버 내부에 들어갈 트리거 및 콘텐츠 요소들
   */
  children?: React.ReactNode;
  /**
   * 추가적인 CSS 클래스명
   */
  className?: string;
}

/**
 * 팝오버 루트 컴포넌트 (Popover)
 * - 특정 트리거 요소를 기준으로 떠오르는 컨텍스트 팝업 컨테이너입니다. Radix UI Popover Primitive를 기반으로 작동합니다.
 */
const Popover: React.FC<PopoverProps> = ({ children, ...props }) => (
  <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
);

/**
 * 팝오버 트리거 컴포넌트 (PopoverTrigger)
 * - 팝오버를 띄우기 위해 상호작용하는 요소(보통 버튼 등)입니다.
 */
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

/** 콘텐츠 오픈/클로즈 모션 타입 */
type PopoverMotion = 'fade' | 'scale' | 'none';

/** Popover 콘텐츠 props */
interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /**
   * 팝오버 콘텐츠의 스타일 변형 프리셋
   * - default: 흰색 배경 테마
   * - dark: 어두운 회색 테마
   * - light: 밝은 테마
   * @default 'default'
   */
  variant?: string;
  /**
   * 커스텀 스타일 변형 프리셋 맵. 기본 프리셋(defaultPopoverVariantStyles) 외에 스타일을 동적으로 추가하거나 재정의하고 싶을 때 전달합니다.
   */
  variantStyles?: Record<string, string>;
  /**
   * 팝오버가 열리고 닫힐 때의 애니메이션 모션 타입
   * - fade: 부드럽게 밝아짐/어두워짐 효과
   * - scale: 크기 줌인/줌아웃 효과
   * - none: 애니메이션 없음
   * @default 'fade'
   */
  motion?: PopoverMotion;
  /**
   * 팝오버를 문서의 특정 DOM 노드 하위에 렌더링하기 위한 컨테이너 요소 (React Portal)
   */
  portalContainer?: HTMLElement | null;
  /**
   * Radix UI가 동적으로 생성하는 포퍼 래퍼(`data-radix-popper-content-wrapper`)에 커스텀으로 추가할 CSS 클래스명
   */
  classWrap?: string;
  /**
   * 팝오버 내부 우측 상단에 강제로 닫기(X) 버튼을 노출할지 여부
   * @default false
   */
  closeButton?: boolean;
}

/** 기본 제공되는 팝오버 스타일 변형 프리셋 */
export const defaultPopoverVariantStyles: Record<string, string> = {
  default: 'bg-[#fff] text-popover-foreground',
  dark: 'bg-gray-900 text-white',
  light: 'bg-white text-gray-900',
};

/** 모션 타입별 클래스 매핑 */
const motionClassMap: Record<PopoverMotion, string> = {
  fade: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  scale:
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  none: '',
};

/**
 * 팝오버 콘텐츠 본체 (PopoverContent)
 * - 실제로 뜨는 컨텍스트 팝업 영역입니다. 모션 애니메이션, 포탈 컨테이너 연동, 닫기 버튼 기능을 제공합니다.
 */
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
          }}
          {...rest}
        >
          {/* 우측 상단 닫기 버튼(옵션) */}
          {closeButton && (
            <PopoverPrimitive.Close
              aria-label="Close"
              className="absolute z-1 -top-2 -right-2 p-1 hover:bg-[var(--color-gray-90)] focus:outline-none w-[1.8rem] h-[1.8rem] flex items-center justify-center bg-[var(--color-gray-70)] rounded-full"
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
