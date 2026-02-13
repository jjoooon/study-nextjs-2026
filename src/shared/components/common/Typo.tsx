import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode, createElement } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

const typoVariants = cva('', {
  variants: {
    variant: {
      'heading-lg': 'block text-[1.6rem] font-bold leading-[150%] tracking-[-0.08rem]',
      'heading-md': 'block text-[1.4rem] font-bold leading-[150%] tracking-[-0.08rem]',
      'heading-sm': 'block text-[1.3rem] font-bold leading-[150%] tracking-[-0.08rem]',

      'body-lg': 'text-[1.5rem] leading-[150%] tracking-[-0.13rem]',
      'body-md': 'text-[1.3rem] leading-[150%] tracking-[-0.13rem]',
      'body-sm': 'text-[1.2rem] leading-[150%] tracking-[-0.13rem]',

      'button-lg': 'text-[1.4rem] leading-[100%] tracking-[-0.13rem]',
      'button-md': 'text-[1.3rem] leading-[100%] tracking-[-0.13rem]',
      'button-sm': 'text-[1.2rem] leading-[100%] tracking-[-0.13rem]',
    },
    weight: {
      normal: 'font-normal!',
      bold: 'font-bold!',
      semibold: 'font-semibold!',
    },
    color: {
      default: 'text-(--color-text-base)',
      'gray-light': 'text-(--color-gray-30)',
      gray: 'text-(--color-text-gray)',
      primary: 'text-(--color-text-primary)',
      secondary: 'text-(--color-text-secondary)',
      information: 'text-(--color-text-information)',
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
}

export const Typo = ({ tag = 'span', variant, weight, color, children, className }: TypoProps) => {
  return createElement(tag, { className: cn(typoVariants({ variant, weight, color }), className) }, children);
};
