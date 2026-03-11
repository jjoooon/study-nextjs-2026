'use client';

import { Gcol, Grow, Grid, Typo } from '@atoms';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@uiux/Dialog';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { CheckIcon, ExMarkIcon, BadgeCheckIcon } from '@icons';
import { Button } from '@uiux/Button';
import { cn } from '@/shared/lib/shadcn/utils';

type TaskStatusBoardProps<T extends { 
  id: number; 
  status: 
  '정상' | '경고' | '중지'; 
  label: string 
}> = {
  state: T[];
};

export default function TaskStatusBoard<T extends { 
  id: number; 
  status: '정상' | '경고' | '중지'; 
  label: string 
}>({ state }: TaskStatusBoardProps<T>) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<{ label: string; sum?: number } | null>(null);

  return (
    <Gcol
      variant={'box'}
      placement={'ss'}
      className="bg-[var(--color-coolgray-20)] rounded-[0.8rem] w-full gap-[0.6rem] px-2.5rem py-2 w-[19.8rem]"
    >
      <Grow className="gap-[0.2rem]">
        <BadgeCheckIcon />
        <Typo tag={'h4'} variant={'heading-sm'}>
          꼭 확인해야 할 일!
        </Typo>
      </Grow>

      <Grid className="grid-cols-2 gap-1 w-full">
        {state.map((item) => {
          const statusColors = {
            "정상": 'bg-[var(--color-success-50)]',
            "경고": 'bg-[var(--color-warning-40)]',
            "중지": 'bg-[var(--color-danger-50)]',
          };
          return (
            <Button
              key={item.id}
              variant="none"
              className={twMerge(
                "bg-[var(--color-gray-0)] text-[var(--color-gray-100)] border-[var(--color-gray-0)] px-1.5 justify-between text-[1.2rem] h-[3.1rem] rounded-[0.6rem]"
              )}
              onClick={() => {
                setDialogContent({ label: item.label, sum: 'sum' in item && typeof item.sum === 'number' ? item.sum : undefined });
                setDialogOpen(true);
              }}
            >
              <span className="flex items-center gap-1">
                <Typo className="underline-offset-4 underline">
                  {item.label}
                </Typo>
                {'sum' in item && typeof item.sum === 'number' && item.sum > 0 && (
                  <span className={twMerge("block text-[1.1rem] font-bold bg-[var(--color-coolgray-20)] pl-1 pr-[0.6rem] h-[1.5rem] rounded-full leading-1 pt-[0.5rem]", "no-underline")}>{item.sum}</span>
                )}
              </span>
              <span className={cn(
                'w-[1.8rem] h-[1.8rem] rounded-full flex items-center justify-center',
                statusColors[item.status as keyof typeof statusColors]
              )}>
                {item.status === '정상' ? <CheckIcon color={'#fff'} /> : <ExMarkIcon color={'#fff'} />}
              </span>
            </Button>
          );
        })}
      </Grid>

      {/* Dialog Component */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="h-[80vh] w-[90rem] max-w-[90%] min-w-[80rem] min-h-[60rem]" resizable={true}>
          <DialogHeader>
            <DialogTitle>꼭 확인해야 할 일! (AAA000)</DialogTitle>
          </DialogHeader>

          {/* 모달 내용 - FormTable 사용 */}
          <div className="gap-8 flex-1 grid grid-rows-[auto_1fr] w-full px-[3.2rem]">
            ㅁㅁㅁㅁㅁ
          </div>

          <DialogFooter>
            <Button variant="outlined" size="lg" color="gray" onClick={() => setDialogOpen(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Gcol>
  );
}
