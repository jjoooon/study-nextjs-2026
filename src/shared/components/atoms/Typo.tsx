/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { InfoBoxWarningIcon, InfoBoxInfoIcon, DotIcon, RefIcon, StarIcon, DashIcon, HashIcon } from '@icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode, createElement } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

// M1. 수정

const typoVariants = cva('', {
  variants: {
    // 2026-05-21 class 수정
    variant: {
      'heading-xl': 'heading-xl block text-[1.8rem] font-bold leading-[normal] tracking-[-0.08rem]',
      'heading-lg': 'heading-lg block text-[1.6rem] font-bold leading-[normal] tracking-[-0.08rem]',
      'heading-md': 'heading-md block text-[1.4rem] font-bold leading-[normal] tracking-[-0.08rem]',
      'heading-sm': 'heading-sm block text-[1.3rem] font-bold leading-[normal] tracking-[-0.08rem]',
      'heading-xs': 'heading-xs block text-[1.1rem] font-normal leading-[normal] tracking-[-0.08rem]',

      'body-xl': 'body-xl text-[1.5rem] leading-[normal] tracking-[-0.13rem]',
      'body-lg': 'body-lg text-[1.4rem] leading-[normal] tracking-[-0.13rem]',
      'body-md': 'body-md text-[1.3rem] leading-[normal] tracking-[-0.13rem]',
      'body-sm': 'body-sm text-[1.2rem] leading-[normal] tracking-[-0.13rem]',
      'body-xs': 'body-xs text-[1.1rem] leading-[normal] tracking-[-0.13rem]',

      'button-lg': 'button-lg text-[1.4rem] leading-[normal] tracking-[-0.13rem]',
      'button-md': 'button-md text-[1.3rem] leading-[normal] tracking-[-0.13rem]',
      'button-sm': 'button-sm text-[1.2rem] leading-[normal] tracking-[-0.13rem]',
      'button-xs': 'button-xs text-[1.1rem] leading-[normal] tracking-[-0.13rem]',

      'amount-md':
        'block text-[1.4rem] font-bold leading-[normal] tracking-[-0.08rem] underline underline-offset-[0.3rem]',
      'amount-xs':
        'block text-[1.1rem] font-bold leading-[normal] tracking-[-0.08rem] underline underline-offset-[0.3rem]',
    },
    icon: {
      info: 'InfoBoxInfoIcon',
      warning: 'InfoBoxWarningIcon',
      detail: 'RefIcon',
      dot: 'DotIcon',
      hash: 'HashIcon',
      ref: 'RefIcon',
      dash: 'DashIcon',
      star: 'StarIcon',
      dotBig: 'DotBigIcon',
    },
    weight: {
      normal: 'font-normal!',
      bold: 'font-bold!',
      semibold: 'font-semibold!',
    },
    color: {
      default: 'text-[var(--color-gray-100)]',
      'gray-light': 'text-[var(--color-gray-50)]',
      gray: 'text-[var(--color-gray-70)]',
      blueGray: 'text-[var(--color-blue-gray-50)]',
      danger: 'text-[var(--color-danger-50)]',
      primary: 'text-[var(--color-primary-50)]',
      secondary: 'text-[var(--color-secondary-50)]',
      information: 'text-[var(--color-information-50)]',
      green: 'text-[var(--color-success-50)]',
    },
  },
  defaultVariants: {
    variant: 'body-md',
    color: 'default',
  },
});

// VariantProps로 타입 자동 추출
interface TypoProps extends VariantProps<typeof typoVariants> {
  tag?: string;
  children?: ReactNode;
  className?: string;
  icon?: 'info' | 'warning' | 'detail' | 'dot' | 'hash' | 'ref' | 'dash' | 'star' | 'dotBig';
  style?: React.CSSProperties;
}

export const Typo = ({ tag = 'span', variant, weight, color, children, className, icon, style }: TypoProps) => {
  let IconComponent: ReactNode = null;

  if (icon === 'info')
    IconComponent = (
      <InfoBoxInfoIcon
        className="inline-flex -translate-y-[0.1rem] mr-1"
        color="var(--color-information-50)"
        size={16}
      />
    );
  if (icon === 'warning')
    IconComponent = (
      <InfoBoxWarningIcon className="inline-flex -translate-y-[0.1rem] mr-1" color="var(--color-danger-50)" size={16} />
    );
  if (icon === 'detail')
    IconComponent = (
      <RefIcon className="inline-flex -translate-y-[0.1rem] mr-1" color="var(--color-primary-50)" size={10} />
    );

  if (icon === 'ref') IconComponent = <RefIcon className="inline-flex -translate-y-[0.1rem] mr-1" size={10} />;
  if (icon === 'dot') IconComponent = <DotIcon className="inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-1" />;
  if (icon === 'dotBig')
    IconComponent = <DotIcon className="inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.5rem]" size={10} />;
  if (icon === 'hash') IconComponent = <HashIcon className="inline-flex -translate-y-[0.1rem]" size={10} />;
  if (icon === 'dash')
    IconComponent = <DashIcon className="inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.5rem]" size={10} />;
  if (icon === 'star') IconComponent = <StarIcon className="inline-flex -translate-y-[0.15rem] mr-1" size={10} />;

  const indentStyle = {
    info: 'inline-block relative -indent-[2rem] ml-[2rem] text-[var(--color-gray-70)] [&>em]:text-[var(--color-information-50)] [&>em]:font-bold [&>em]:not-italic!',
    warning:
      'inline-block relative -indent-[2rem] ml-[2rem] text-[var(--color-gray-70)] [&>em]:text-[var(--color-danger-50)] [&>em]:font-bold [&>em]:not-italic!',
    detail:
      'inline-block relative -indent-[1.4rem] ml-[1.4rem] [&>em]:text-[var(--color-primary-50)] [&>em]:font-bold [&>em]:not-italic!',
    dot: 'inline-block relative -indent-[0.9rem] ml-[0.9rem]',
    dotBig: 'inline-block relative -indent-[1.6rem] ml-[1.6rem]',
    hash: 'inline-block relative -indent-[1.4rem] ml-[1.4rem]',
    dash: 'inline-block relative -indent-[1.6rem] ml-[1.6rem]',
    star: 'inline-block relative -indent-[1.4rem] ml-[1.4rem]',
    ref: 'inline-block relative -indent-[1.4rem] ml-[1.4rem]',
  };

  return createElement(
    tag,
    {
      className: cn(typoVariants({ variant, weight, color }), icon ? indentStyle[icon] : '', className),
      style,
    },
    <>
      {IconComponent}
      {children}
    </>
  );
};
