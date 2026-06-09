/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { SpinnerAIcon } from '@icons';
import { cn } from '@/shared/lib/shadcn/utils';

export const SpinnerA = ({ className }: { className?: string }) => {
  return <SpinnerAIcon className={cn('animate-[spinner-step-rotate_1s_steps(8,end)_infinite]', className)} />;
};
