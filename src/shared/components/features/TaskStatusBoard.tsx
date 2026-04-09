'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/shared/lib/shadcn/utils';
import { Gcol, Grow, Grid, Typo } from '@atoms';
import { CheckIcon, ExMarkIcon, BadgeCheckIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';

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
      className="bg-[var(--color-blue-gray-20)] rounded-[0.8rem] w-full gap-[0.6rem] px-2.5rem py-2 w-[19.8rem]"
    >
      <Grow className="gap-[0.2rem]">
        <BadgeCheckIcon />
        <Typo tag={'h4'} variant={'heading-sm'}>
          꼭 해야할 일!
        </Typo>
      </Grow>

      <Grid className="grid-cols-2 gap-1 w-full">
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
                'bg-[var(--color-gray-0)] text-[var(--color-gray-100)] border-[var(--color-gray-0)] px-1.5 justify-between text-[1.2rem] h-[3.1rem] rounded-[0.6rem]'
              )}
              onClick={() => {
                onItemClick?.(item);
              }}
            >
              <span className="flex items-center gap-1">
                <Typo className="underline-offset-4 underline">{item.label}</Typo>
                {'sum' in item && typeof item.sum === 'number' && item.sum > 0 && (
                  <Badge variant={'rounded'} size={'sm'}>
                    {item.sum}
                  </Badge>
                )}
              </span>
              <span
                className={cn(
                  'w-[1.8rem] h-[1.8rem] rounded-full flex items-center justify-center',
                  statusColors[item.status as keyof typeof statusColors]
                )}
              >
                {item.status === '정상' ? <CheckIcon color={'#fff'} /> : <ExMarkIcon color={'#fff'} />}
              </span>
            </Button>
          );
        })}
      </Grid>
    </Gcol>
  );
}
