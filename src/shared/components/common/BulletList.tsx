'use client';

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

interface BulletListProps {
  children?: ReactNode;
  position?: 'col' | 'row';
  type?: 'dot' | 'dash' | 'square' | 'tag';
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
export const BulletListItem = ({ children, type = 'dot', className, onClick }: BulletListProps) => {
  const bulletStyles = {
    dot: "pl-[1rem] before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:content-[''] before:block before:w-[.4rem] before:h-[.4rem] before:rounded-full before:bg-[var(--color-icon-primary)]",
    dash: "pl-[1rem] before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:content-[''] before:block before:w-[.8rem] before:h-[.2rem] before:bg-[var(--color-icon-primary)]",
    square:
      "pl-[1rem] before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:content-[''] before:block before:w-[.4rem] before:h-[.4rem] before:bg-[var(--color-icon-primary)]",
    tag: "before:content-['#'] before:block before:text-[var(--color-primary-50)] before:text-[1.3rem] before:font-bold text-[1.3rem] font-bold flex items-center text-[var(--color-secondary-70)]",
  };
  return (
    <li
      className={cn(`relative text-[1.3rem] text-[var(--color-secondary-70)]`, bulletStyles[type], className)}
      {...(type === 'tag' && onClick ? { onClick } : {})}
      style={type === 'tag' && onClick ? { cursor: 'pointer' } : undefined}
    >
      {children}
    </li>
  );
};
