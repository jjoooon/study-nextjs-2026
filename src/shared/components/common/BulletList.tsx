'use client';

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

interface BulletListProps {
  children?: ReactNode;
  position?: 'col' | 'row';
  type?: 'dot' | 'dash' | 'square';
  className?: string;
}

export const BulletList = ({ children, position = 'col', className }: BulletListProps) => {
  return (
    <ul className={cn(position === 'row' ? 'flex flex-row flex-wrap items-center' : 'flex flex-col', className)}>
      {children}
    </ul>
  );
};
export const BulletListItem = ({ children, type = 'dot', className }: BulletListProps) => {
  const bulletStyles = {
    dot: "after:content-[''] after:block after:w-[.4rem] after:h-[.4rem] after:rounded-full after:bg-(--color-icon-primary)",
    dash: "after:content-[''] after:block after:w-[.8rem] after:h-[.2rem] after:bg-(--color-icon-primary)",
    square: "after:content-[''] after:block after:w-[.4rem] after:h-[.4rem] after:bg-(--color-icon-primary)",
  };
  return (
    <li
      className={cn(
        `relative text-[1.3rem] text-(--color-secondary-70) pl-[1rem] after:absolute after:top-[50%] after:left-0 after:translate-y-[-50%]`,
        bulletStyles[type],
        className
      )}
    >
      {children}
    </li>
  );
};
