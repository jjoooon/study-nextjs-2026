/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { Grid, Grow, Typo } from '@atoms';
import { Badge } from '@uiux/Badge';
import React from 'react';
import { type ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

export const QuestionRadioCardHeader = ({
  bg,
  children,
  className,
}: {
  bg?: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Grow
      className={cn('w-full p-[1rem]', !bg ? 'bg-[#F4F4F4]' : undefined, className)}
      style={bg ? { background: bg } : undefined}
      placement="bwc"
      gap="[1rem]"
    >
      {children}
    </Grow>
  );
};

export const QuestionRadioCardHeaderTitle = ({
  badgeLabel,
  icon,
  children,
  className,
}: {
  badgeLabel?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Grow className={cn('flex items-baseline gap-[0.6rem]', className)}>
      {icon ? (
        <span className="h-[1.8rem] w-[1.8rem] flex items-center justify-center">{icon}</span>
      ) : badgeLabel ? (
        <Badge color="secondary" variant="contained" className="h-[1.8rem] w-[1.8rem]">
          {badgeLabel}
        </Badge>
      ) : null}
      <Typo tag={'h3'} variant={'body-lg'} className={cn('flex', className)} weight={'bold'}>
        {children}
      </Typo>
    </Grow>
  );
};

export const QuestionRadioCardContents = ({
  children,
  className,
}: {
  bg?: string;
  children: ReactNode;
  className?: string;
}) => {
  return <Grid className={cn('w-full p-2.5 gap-2', className)}>{children}</Grid>;
};

type QuestionRadioCardProps = {} & React.HTMLAttributes<HTMLDivElement> & {
    children?: ReactNode;
    className?: string;
    isRadio?: boolean;
    isValue?: string;
    onValueChange?: (value: string) => void;
  };

export const QuestionRadioCard = React.forwardRef<HTMLDivElement, QuestionRadioCardProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col relative w-full tracking-[-0.13rem] justify-start items-start overflow-hidden rounded-[1.2rem] gap-0 border border-solid border-[#D8D8D8] p-0',
          className
        )}
        data-group="col"
        {...restProps}
      >
        {children}
      </div>
    );
  }
);
QuestionRadioCard.displayName = 'QuestionRadioCard';
