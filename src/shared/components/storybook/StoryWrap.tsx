/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Grow } from '@atoms';
import { cn } from '@/shared/lib/shadcn/utils';

export function StoryWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 w-full h-full items-center justify-center bg-[var(--color-gray-5)] p-6 rounded-[1rem]',
        className
      )}
    >
      {children}
    </div>
  );
}

export function StoryBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Grow
      placement="sc"
      className={cn(
        'gap-3 rounded-[1rem] border border-[var(--color-gray-10)] border-dashed flex-wrap bg-[var(--color-gray-0)] p-6 w-full',
        className
      )}
    >
      {children}
    </Grow>
  );
}
