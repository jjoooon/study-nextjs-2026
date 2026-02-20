import { Grow } from '@/shared/components/common';
import { cn } from '@/shared/lib/shadcn/utils';

export function StoryWrap({ children, className }: { children: React.ReactNode, className?: string }) {
  return <Grow
          placement="sc"
          className={cn("gap-3 rounded-[.8rem] border border-[var(--color-gray-10)] border-dashed flex-wrap bg-[var(--color-gray-0)] p-6", className)}
        >{children}</Grow>;
}