'use client';

import { Group, Panel, Separator } from 'react-resizable-panels';
import { cn } from '@/shared/lib/shadcn/utils';

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof Group>) => (
  <Group className={cn('flex h-full w-full [aria-orientation=vertical]:flex-col', className)} {...props} />
);

const ResizablePanel = Panel;
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}) => (
  <Separator className={cn('resize-separator', className)} {...props}>
    {withHandle && <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"></div>}
  </Separator>
);
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
