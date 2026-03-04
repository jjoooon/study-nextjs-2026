'use client';

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { RefIcon } from '@/shared/components/icons';

interface BulletListProps {
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  position?: 'col' | 'row';
  type?: 'dot' | 'dash' | 'square' | 'hash' | 'ref';
  className?: string;
  onClick?: () => void;
}

export const BulletList = ({ children, position = 'col', className }: BulletListProps) => {
  return (
    <ul className={cn(position === 'row' ? 'flex flex-row flex-wrap items-center' : 'flex flex-col', className)}>
      {children}
    </ul>
  );
};
export const BulletListItem = ({ children, type = 'dot', size = 'md', className, onClick }: BulletListProps) => {
  // dot 타입에 사이즈별 블릿 크기 적용
  const dotSizeMap = {
    sm: 'pl-[0.6rem] before:top-[0.8rem] before:w-[.2rem] before:h-[.2rem] before:rounded-full before:bg-current tracking-[-0.08rem]',
    md: 'pl-[1rem] before:top-[50%] before:w-[.4rem] before:h-[.4rem] before:rounded-full before:bg-current',
    lg: 'pl-[1rem] before:top-[50%] before:top-[50%] before:w-[.5rem] before:h-[.5rem] before:rounded-full before:bg-current',
  };
  const bulletStyles = {
    dot: `before:absolute before:left-0 before:translate-y-[-50%] before:content-[''] before:block  ${dotSizeMap[size]}`,
    dash: "pl-[1rem] before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:content-[''] before:block before:w-[.8rem] before:h-[.2rem] before:bg-[var(--color-icon-primary)]",
    square:
      "pl-[1rem] before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:content-[''] before:block before:w-[.4rem] before:h-[.4rem] before:bg-[var(--color-icon-primary)]",
    hash: "before:content-['#'] before:block before:text-[var(--color-coolgray-50)] before:text-[1.3rem] before:font-bold text-[1.3rem] font-bold flex items-center text-[var(--color-coolgray-60)]",
    ref: "pl-[1.2rem]",
  };
  const itemSize = {
    sm: 'text-[1.1rem]',
    md: 'py-[0.4rem] text-[1.3rem]',
    lg: 'py-[0.6rem] text-[1.5rem]',
  }
  return (
    <li
      className={cn(`relative text-[var(--color-secondary-70)]`, bulletStyles[type], itemSize[size], className)}
      {...(type === 'hash' && onClick ? { onClick } : {})}
      style={type === 'hash' && onClick ? { cursor: 'pointer' } : undefined}
    >
       {type === 'ref' && <RefIcon className="absolute left-0 top-[0.9rem]" />}
      {children}
    </li>
  );
};

export const BulletItem = ({ children, type = 'dot', size = 'md', className, onClick }: BulletListProps) => {
  // dot 타입에 사이즈별 블릿 크기 적용
  const dotSizeMap = {
    sm: 'pl-[0.6rem] before:top-[0.8rem] before:w-[.2rem] before:h-[.2rem] before:rounded-full before:bg-current tracking-[-0.08rem]',
    md: 'pl-[1rem] before:top-[50%] before:w-[.4rem] before:h-[.4rem] before:rounded-full before:bg-current',
    lg: 'pl-[1rem] before:top-[50%] before:top-[50%] before:w-[.5rem] before:h-[.5rem] before:rounded-full before:bg-current',
  };
  const bulletStyles = {
    dot: `before:absolute before:left-0 before:translate-y-[-50%] before:content-[''] before:block  ${dotSizeMap[size]}`,
    dash: "pl-[1rem] before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:content-[''] before:block before:w-[.8rem] before:h-[.2rem] before:bg-[var(--color-icon-primary)]",
    square:
      "pl-[1rem] before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:content-[''] before:block before:w-[.4rem] before:h-[.4rem] before:bg-[var(--color-icon-primary)]",
    hash: "before:content-['#'] before:block before:text-[var(--color-coolgray-50)] before:text-[1.3rem] before:font-bold text-[1.3rem] font-bold flex items-center text-[var(--color-coolgray-60)]",
    ref: "pl-[1.2rem]",
  };
  const itemSize = {
    sm: 'text-[1.1rem]',
    md: 'py-[0.4rem] text-[1.3rem]',
    lg: 'py-[0.6rem] text-[1.5rem]',
  }
  return (
    <div
      className={cn(`relative text-[var(--color-secondary-70)]`, bulletStyles[type], itemSize[size], className)}
      {...(type === 'hash' && onClick ? { onClick } : {})}
      style={type === 'hash' && onClick ? { cursor: 'pointer' } : undefined}
    >
      {type === 'ref' && <RefIcon className="absolute left-0 top-[0.9rem]" />}
      {children}
    </div>
  );
};
