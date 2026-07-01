/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/shared/lib/shadcn/utils';
import { Gcol, Grow, Grid, Typo } from '@atoms';
import { CheckIcon, ExMarkIcon, BadgeCheckIcon } from '@icons';
import { Button } from '@uiux/Button';

// TaskStatusBoard 입력 타입
// - T를 제네릭으로 받아, 기본 필드(id/status/label)를 만족하면 추가 필드도 함께 전달 가능
type TaskStatusBoardProps<
  T extends {
    id: number;
    status: '정상' | '경고' | '중지' | '없음';
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
    status: '정상' | '경고' | '중지' | '없음';
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
          // 상태값별 원형 아이콘 배경색 매핑
          const statusColors = {
            정상: 'bg-[var(--color-success-50)]',
            경고: 'bg-[var(--color-warning-40)]',
            중지: 'bg-[var(--color-danger-50)]',
            없음: 'bg-[var(--color-gray-20)]', // 상태가 '없음'인 경우 회색 배경 설정
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
                <Typo variant={'body-xs'} className={cn(item.status !== '없음' && 'underline underline-offset-4')}>
                  {item.label}
                </Typo>
              </span>
              <span
                className={cn(
                  'w-[1.6rem] h-[1.6rem] shrink-0 rounded-full flex items-center justify-center',
                  statusColors[item.status]
                )}
              >
                {/* 정상은 체크, 경고/중지는 느낌표 아이콘 사용, 없으면 빈 원형 */}
                {item.status === '정상' && <CheckIcon color={'#fff'} size={14} />}
                {(item.status === '경고' || item.status === '중지') && <ExMarkIcon color={'#fff'} size={14} />}
                {item.status === '없음' && <div className="w-[1rem] h-[0.2rem] rounded-[0.2rem] bg-[#fff]" />}
              </span>
            </Button>
          );
        })}
      </Grid>
    </Gcol>
  );
}
