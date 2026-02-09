import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode, createElement } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

const typoVariants = cva('', {
  variants: {
    variant: {
      'heading-l': 'block text-[1.6rem] font-bold leading-[150%] tracking-[-0.08rem]',
      'heading-m': 'block text-[1.4rem] font-bold leading-[150%] tracking-[-0.08rem]',
      'heading-s': 'block text-[1.3rem] font-bold leading-[150%] tracking-[-0.08rem]',

      'body-l': 'text-[1.5rem] font-normal leading-[150%] tracking-[-0.13rem]',
      'body-m': 'text-[1.3rem] font-normal leading-[150%] tracking-[-0.13rem]',
      'body-s': 'text-[1.2rem] font-normal leading-[150%] tracking-[-0.13rem]',

      'button-l': 'text-[1.4rem] font-normal leading-[100%] tracking-[-0.13rem]',
      'button-m': 'text-[1.3rem] font-normal leading-[100%] tracking-[-0.13rem]',
      'button-s': 'text-[1.2rem] font-normal leading-[100%] tracking-[-0.13rem]',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold',
      semibold: 'font-semibold',
    },
    color: {
      default: 'text-black',
      primary: 'text-blue-600',
      secondary: 'text-gray-600',
      error: 'text-red-600',
    },
  },
  defaultVariants: {
    variant: 'body-m',
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
