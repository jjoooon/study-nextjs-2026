/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/shared/lib/shadcn/utils';
import { Gcol, Grow, Grid, Typo } from '@atoms';
import { Button } from '@uiux/Button';

// TaskStatusBoard 입력 타입
type TaskStatus = '정상' | '경고' | '중지' | '없음';

const colorMap = {
  정상: '3',
  중지: '2',
  경고: '1',
  없음: '0',
};

type TaskStatusBoardProps<
  T extends {
    id: number;
    status: TaskStatus;
    label: string;
  },
> = {
  /** 각 작업의 상태 정보 배열 (id, status, label 포함 필수) */
  state: T[];
  /** 항목 클릭 시 호출되는 콜백 함수 */
  onItemClick?: (item: T) => void;
};

// "꼭 해야할 일" 상태 보드
// - 각 항목을 버튼으로 렌더링하고, 클릭 시 원본 item을 그대로 콜백으로 전달
export function TaskStatusBoard<
  T extends {
    id: number;
    status: TaskStatus;
    label: string;
  },
>({ state, onItemClick }: TaskStatusBoardProps<T>) {
  return (
    <Gcol placement={'bws'} className="w-full gap-[0.2rem] min-h-[7.8rem]">
      <Grow className="gap-[0.2rem]">
        <Typo tag={'h4'} variant={'heading-sm'}>
          꼭 해야할 일
        </Typo>
      </Grow>

      <Grid className="grid-cols-4 gap-0 w-full h-[5.4rem] bg-[var(--color-danger-5)] px-1.5 rounded-[0.6rem]">
        {state.map((item) => {
          const status = item.status;
          const isUnderline = status !== '없음';

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
                <Typo variant={'body-xs'} className={cn(isUnderline && 'underline underline-offset-3', 'font-bold')}>
                  {item.label}
                </Typo>
              </span>
              <span
                className={cn(
                  'w-[1.6rem] h-[1.6rem] shrink-0 rounded-full flex items-center justify-center',
                  `traffic-light-${colorMap[status]}`
                )}
              ></span>
            </Button>
          );
        })}
      </Grid>
    </Gcol>
  );
}
