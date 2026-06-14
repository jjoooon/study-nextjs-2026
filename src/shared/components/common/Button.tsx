/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';
import { hasButtonAuth } from '@/shared/utils/authUtils';

const buttonVariants = cva(
  `relative inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md font-normal transition-all outline-none cursor-pointer leading-[100%] tracking-[-0.13rem] 
  disabled:pointer-events-none disabled:opacity-100 shrik-0 [&:disabled_svg]:opacity-50 
  focus-visible:ring-2 focus-visible:ring-offset-2 
  has-[>svg]:inline-flex has-[>svg]:items-center has-[>svg]:justify-center`,
  {
    variants: {
      variant: {
        contained: '',
        outlined: `disabled:text-[var(--color-gray-30)]
        disabled:bg-[var(--color-gray-5)]
        disabled:border-[var(--color-gray-10)]`,
        text: `px-0! text-[var(--color-secondary-70)] bg-transparent border-none 
        underline underline-offset-3 
        hover:underline 
        focus-visible:underline`,
        none: 'bg-transparent border-none disabled:opacity-20',
        rounded: 'rounded-full!',
        banner:
          'bg-[var(--color-blue-gray-20)] text-[var(--color-gray-100)] border border-[var(--color-blue-gray-40)] px-2.5! py-[0.5rem]! justify-between text-[1.3rem] font-bold! h-[3.1rem]! rounded-[0.8rem]! ',
        state:
          'bg-[var(--color-gray-0)] text-[var(--color-gray-100)] border-[var(--color-gray-0)] px-1.5! justify-between text-[1.2rem] h-[3.1rem]! underline-offset-4 underline rounded-[0.6rem]!',
      },
      only: {
        default: '',
        icon: 'p-0! aspect-square',
      },
      color: {
        primary: '',
        secondary: '',
        gray: '',
        'gray-light': '',
        coolgray: '',
        'coolgray-light': '',
        success: '',
        link: 'text-[var(--color-information-50)]',
        transparent: `bg-transparent text-[var(--color-text-primary)] border-transparent`,
      },
      size: {
        xl: `h-[3.2rem] rounded-[0.6rem] text-[1.4rem] font-normal px-2 gap-1 min-w-[6rem] `,
        lg: `h-[2.8rem] rounded-[0.4rem] text-[1.3rem] font-normal pb-[0.15rem] px-2.5 gap-1`,
        md: `h-[2.5rem] rounded-[0.4rem] text-[1.3rem] font-normal pt-[0rem] px-1.5 gap-[0.2rem]`,
        sm: `h-[2.2rem] rounded-[0.3rem] text-[1.2rem] font-normal px-1.5 gap-[0.2rem] leading-[2rem]`,
        xs: `h-[1.6rem] rounded-[0.3rem] text-[1.1rem] font-normal p-1 gap-[0.2rem]`,
      },
    },
    compoundVariants: [
      {
        only: 'icon',
        size: 'xl',
        className: 'min-w-[0]! h-[3.2rem] rounded-[0.6rem] px-0! aspect-square',
      },
      {
        only: 'icon',
        size: 'lg',
        className: 'h-[2.8rem] rounded-[0.6rem] px-0! aspect-square',
      },
      {
        only: 'icon',
        size: 'md',
        className: 'h-[2.5rem] rounded-[0.4rem] px-0! aspect-square',
      },
      {
        only: 'icon',
        size: 'sm',
        className: 'h-[2.2rem] rounded-[0.4rem] px-0! aspect-square',
      },
      {
        only: 'icon',
        size: 'xs',
        className: 'h-[1.6rem] rounded-[0.3rem] px-0! aspect-square',
      },

      {
        variant: ['contained', 'rounded'],
        color: 'primary',
        className: `border border-[var(--color-primary-50)] 
        bg-[var(--color-primary-50)] 
        text-[var(--color-gray-0)] 
        font-bold 
        hover:bg-[var(--color-primary-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-primary-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)]
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]!`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'gray',
        className: `border border-[var(--color-gray-50)] 
        bg-[var(--color-gray-50)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-gray-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-gray-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'coolgray',
        className: `border border-[var(--color-blue-gray-70)] 
        bg-[var(--color-blue-gray-70)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-blue-gray-80)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-blue-gray-80)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'coolgray-light',
        className: `border border-[var(--color-blue-gray-50)] 
        bg-[var(--color-blue-gray-50)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-blue-gray-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-blue-gray-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'gray-light',
        className: `border border-[var(--color-gray-20)] 
        bg-[var(--color-gray-20)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-gray-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-gray-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'success',
        className: `border border-[var(--color-success-50)] 
        bg-[var(--color-success-50)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-success-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-success-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'link',
        className: `border border-[var(--color-information-50)] 
        bg-[var(--color-information-50)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-information-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-information-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-information-20)]
        disabled:border-[var(--color-information-20)]`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'secondary',
        className: `border border-[var(--color-secondary-50)] 
        bg-[var(--color-secondary-50)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-secondary-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-secondary-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'primary',
        size: 'xl',
        className: `disabled:text-[var(--color-gray-30)]
        disabled:bg-[var(--color-gray-5)]
        font-bold 
        disabled:border-[var(--color-gray-5)]!`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'secondary',
        size: 'xl',
        className: `disabled:text-[var(--color-gray-30)]
        disabled:bg-[var(--color-gray-5)]
        disabled:border-[var(--color-gray-5)]`,
      },
      {
        variant: ['contained', 'rounded'],
        color: 'gray',
        size: 'xl',
        className: `disabled:text-[var(--color-gray-30)]
        disabled:bg-[var(--color-gray-5)]
        disabled:border-[var(--color-gray-5)]`,
      },

      {
        variant: 'outlined',
        color: 'primary',
        className: `border border-[var(--color-primary-50)] 
        bg-[var(--color-primary-5)] 
        text-[var(--color-primary-50)] 
        hover:bg-[var(--color-primary-10)] 
        hover:border-dashed 
        hover:border-[var(--color-primary-50)] 
        focus-visible:ring-[var(--color-primary-50)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-primary-50)]
        disabled:text-[var(--color-gray-30)]
        disabled:bg-[var(--color-gray-5)]
        disabled:border-[var(--color-gray-10)]`,
      },
      {
        variant: 'outlined',
        color: 'primary',
        size: 'sm',
        className: `border border-[var(--color-primary-50)] 
        bg-[var(--color-primary-5)] 
        text-[var(--color-primary-50)] 
        hover:bg-[var(--color-primary-10)] 
        hover:border-dashed 
        hover:border-[var(--color-primary-50)] 
        focus-visible:ring-[var(--color-primary-50)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-primary-50)]`,
      },
      {
        variant: 'outlined',
        color: 'secondary',
        className: `border border-[var(--color-gray-60)] 
        bg-[var(--color-gray-0)] 
        text-[var(--color-gray-100)] 
        hover:bg-[var(--color-gray-5)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-100)] 
        focus-visible:ring-[var(--color-gray-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-100)]
        disabled:bg-[var(--color-gray-5)]`,
      },
      {
        variant: 'outlined',
        color: 'gray',
        className: `border border-[var(--color-gray-60)] 
        bg-[var(--color-gray-0)] 
        text-[var(--color-gray-100)] 
        [&_svg]:!text-[var(--color-gray-60)]
        hover:bg-[var(--color-gray-5)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-100)] 
        focus-visible:ring-[var(--color-gray-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-100)]
        disabled:bg-[var(--color-gray-5)]`,
      },
      {
        variant: 'outlined',
        color: 'coolgray',
        className: `border border-[var(--color-blue-gray-70)] 
        bg-[var(--color-gray-0)] 
        text-[var(--color-blue-gray-70)] 
        hover:bg-[var(--color-blue-gray-5)] 
        hover:border-dashed 
        hover:border-[var(--color-blue-gray-70)] 
        focus-visible:ring-[var(--color-blue-gray-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-blue-gray-70)]`,
      },
      {
        variant: 'outlined',
        color: 'coolgray-light',
        className: `border border-[var(--color-blue-gray-50)] 
        bg-[var(--color-gray-0)] 
        text-[var(--color-blue-gray-50)] 
        hover:bg-[var(--color-blue-gray-5)] 
        hover:border-dashed 
        hover:border-[var(--color-blue-gray-60)] 
        focus-visible:ring-[var(--color-blue-gray-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-blue-gray-60)]`,
      },
      {
        variant: 'outlined',
        color: 'gray-light',
        className: `border border-[var(--color-gray-20)] 
        bg-[var(--color-gray-0)] 
        text-[var(--color-gray-100)] 
        hover:bg-[var(--color-gray-5)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-100)] 
        focus-visible:ring-[var(--color-gray-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-100)]`,
      },
      {
        variant: 'outlined',
        color: 'success',
        className: `border border-[var(--color-success-60)] 
        bg-[var(--color-success-5)] 
        text-[var(--color-success-60)] 
        hover:bg-[var(--color-success-10)] 
        hover:border-dashed 
        hover:border-[var(--color-success-60)] 
        focus-visible:ring-[var(--color-success-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-success-60)]`,
      },
      {
        variant: 'outlined',
        color: 'link',
        className: `border border-[var(--color-information-60)] 
        bg-[var(--color-gray-0)] 
        text-[var(--color-information-50)] 
        hover:bg-[var(--color-information-5)] 
        hover:border-dashed 
        hover:border-[var(--color-information-50)] 
        focus-visible:ring-[var(--color-information-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-information-100)]`,
      },

      {
        variant: 'text',
        color: 'success',
        className: `text-[var(--color-success-60)]`,
      },
      {
        variant: 'text',
        color: 'primary',
        className: `text-[var(--color-primary-50)]`,
      },
      {
        variant: 'text',
        color: 'gray',
        className: `text-[var(--color-gray-70)]`,
      },
      {
        variant: 'text',
        color: 'coolgray',
        className: `text-[var(--color-blue-gray-70)]`,
      },
      {
        variant: 'text',
        color: 'coolgray-light',
        className: `text-[var(--color-blue-gray-50)]`,
      },
      {
        variant: 'text',
        color: 'gray-light',
        className: `text-[var(--color-gray-30)]`,
      },
      {
        variant: 'text',
        color: 'link',
        className: `text-[var(--color-information-50)]`,
      },
    ],
    defaultVariants: {
      variant: 'contained',
      color: 'primary',
      size: 'md',
      only: 'default',
    },
  }
);

interface UIButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, VariantProps<typeof buttonVariants> {
  /**
   * 버튼 스타일 변형
   * - `contained`: 배경색이 채워진 스타일
   * - `outlined`: 테두리가 있는 스타일
   * - `text`: 텍스트 형태 스타일 (밑줄 포함)
   * - `none`: 기본 스타일 없음
   * - `rounded`: 둥근 모서리 스타일
   * - `banner`: 배너 형태 스타일
   * - `state`: 상태 표시용 스타일
   * @default 'contained'
   */
  variant?: 'contained' | 'outlined' | 'text' | 'none' | 'rounded' | 'banner' | 'state';
  /**
   * 버튼 색상 테마
   * - `primary`: 기본 주황색/브랜드 색상
   * - `secondary`: 보조 회색 테마
   * - `gray`: 일반 회색 테마
   * - `gray-light`: 밝은 회색 테마
   * - `coolgray`: 차가운 회색 테마
   * - `coolgray-light`: 차가운 밝은 회색 테마
   * - `success`: 초록색 성공 테마
   * - `link`: 파란색 링크 테마
   * - `transparent`: 투명 테마
   * @default 'primary'
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'gray-light'
    | 'coolgray'
    | 'coolgray-light'
    | 'success'
    | 'link'
    | 'transparent';
  /**
   * 버튼 크기
   * - `xl`: 3.2rem (가장 큼)
   * - `lg`: 2.8rem
   * - `md`: 2.5rem (기본)
   * - `sm`: 2.2rem
   * - `xs`: 1.6rem (가장 작음)
   * @default 'md'
   */
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  /**
   * 버튼 렌더링 모드 (아이콘 전용 여부)
   * - `default`: 일반 버튼 (텍스트 혹은 텍스트+아이콘)
   * - `icon`: 아이콘 전용 버튼 (가로세로 비율 1:1)
   * @default 'default'
   */
  only?: 'default' | 'icon';
  /** 버튼 텍스트 또는 내부 요소 */
  children?: React.ReactNode;
  /** Radix UI Slot 사용 여부 (true일 경우 자식 컴포넌트를 버튼으로 대체) */
  asChild?: boolean;
  /**
   * 버튼 클릭 시 연출할 애니메이션 효과
   * - `flash`: 깜빡이는 연출 효과
   */
  effect?: 'flash';
}

// Flash animation style (opacity blink)
const flashKeyframes = `
@keyframes button-flash {
  0% { opacity: 1; }
  25% { opacity: 0.2; }
  50% { opacity: 1; }
  75% { opacity: 0.2; }
  100% { opacity: 1; }
}`;
if (typeof window !== 'undefined' && !document.getElementById('button-flash-style')) {
  const style = document.createElement('style');
  style.id = 'button-flash-style';
  style.innerHTML = flashKeyframes;
  document.head.appendChild(style);
}

const Button = React.forwardRef<HTMLButtonElement, UIButtonProps>(
  (
    {
      children,
      variant = 'contained',
      color = 'primary',
      size = 'md',
      className,
      asChild = false,
      only = 'default',
      type,
      id,
      effect,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const effectClass = effect === 'flash' ? 'button-flash-animate' : '';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        data-only={only}
        className={cn(buttonVariants({ variant, color, size, only }), effectClass, className)}
        type={Comp === 'button' ? (type ?? 'button') : undefined}
        disabled={!hasButtonAuth(id)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

// Add flash animation class
if (typeof window !== 'undefined' && !document.getElementById('button-flash-animate-style')) {
  const style = document.createElement('style');
  style.id = 'button-flash-animate-style';
  style.innerHTML = `.button-flash-animate { animation: button-flash 1s linear 2; }`;
  document.head.appendChild(style);
}

Button.displayName = 'Button';

export { Button, buttonVariants };
