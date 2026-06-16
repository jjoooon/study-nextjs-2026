/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { cn } from '@/shared/lib/shadcn/utils';
import { SpinnerAIcon } from '@icons';

export const SpinnerA = ({ className }: { className?: string }) => {
  return <SpinnerAIcon className={cn('animate-[spinner-step-rotate_1s_steps(8,end)_infinite]', className)} />;
};
