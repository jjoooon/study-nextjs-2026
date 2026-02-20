import { Grow } from '@/shared/components/common';
import { cn } from '@/shared/lib/shadcn/utils';

export function StoryWrap({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className='flex w-full h-full items-center justify-center bg-[var(--color-gray-5)] p-6 rounded-[1rem]'>
      <Grow
          placement="sc"
          className={cn("gap-3 rounded-[1rem] border border-[var(--color-gray-10)] border-dashed flex-wrap bg-[var(--color-gray-0)] p-6 w-full", className)}
        >{children}</Grow>
    </div>
  );
}