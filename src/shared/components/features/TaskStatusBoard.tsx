/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Grid, Typo } from '@atoms';
import { CheckIcon, ExMarkIcon, BadgeCheckIcon } from '@icons';
import { Button } from '@uiux/Button';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/shared/lib/shadcn/utils';

type TaskStatusBoardProps<
  T extends {
    id: number;
    status: '정상' | '경고' | '중지';
    label: string;
  },
> = {
  state: T[];
  onItemClick?: (item: T) => void;
};

export function TaskStatusBoard<
  T extends {
    id: number;
    status: '정상' | '경고' | '중지';
    label: string;
  },
>({ state, onItemClick }: TaskStatusBoardProps<T>) {
  return (
    <Gcol
      variant={'box'}
      placement={'ss'}
      className="bg-[var(--color-blue-gray-15)] rounded-[0.8rem] w-full gap-[0.2rem] px-2.5rem pt-1 pb-[0.6rem] min-h-[7.8rem]"
    >
      <Grow className="gap-[0.2rem]">
        <BadgeCheckIcon />
        <Typo tag={'h4'} variant={'heading-sm'}>
          꼭 해야할 일
        </Typo>
      </Grow>

      <Grid className="grid-cols-4 gap-0 w-full h-[4.5rem] bg-[var(--color-gray-0)] px-1.5 rounded-[0.6rem]">
        {state.map((item) => {
          const statusColors = {
            정상: 'bg-[var(--color-success-50)]',
            경고: 'bg-[var(--color-warning-40)]',
            중지: 'bg-[var(--color-danger-50)]',
          };
          return (
            <Button
              key={item.id}
              variant={'none'}
              className={twMerge(
                'flex flex-col-reverse items-center text-[var(--color-gray-100)] border-[var(--color-gray-0)] justify-center text-[1.2rem] h-auto gap-0'
              )}
              onClick={() => {
                onItemClick?.(item);
              }}
            >
              <span className="flex items-center gap-1">
                <Typo variant={'body-xs'} className="underline underline-offset-4">
                  {item.label}
                </Typo>
              </span>
              <span
                className={cn(
                  'w-[1.6rem] h-[1.6rem] shrink-0 rounded-full flex items-center justify-center',
                  statusColors[item.status as keyof typeof statusColors]
                )}
              >
                {item.status === '정상' ? (
                  <CheckIcon color={'#fff'} size={14} />
                ) : (
                  <ExMarkIcon color={'#fff'} size={14} />
                )}
              </span>
            </Button>
          );
        })}
      </Grid>
    </Gcol>
  );
}
