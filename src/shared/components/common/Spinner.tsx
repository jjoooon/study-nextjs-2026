import { SpinnerAIcon } from '@/shared/components/icons';
import { cn } from '@/shared/lib/shadcn/utils';

export const SpinnerA = ({ className }: { className?: string }) => {
  return (
    <SpinnerAIcon className={cn("animate-[spinner-step-rotate_1s_steps(8,end)_infinite]", className)} />
  );
};
