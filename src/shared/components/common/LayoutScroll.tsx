import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

interface LayoutProps {
  children?: ReactNode;
  size?: string;
  className?: string;
  state?: boolean;
  isFlowExpanded?: boolean;
}
export const LayoutScrollWrap = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="scroll-wrap" className={cn('grid w-full h-full absolute top-0 left-0 w-full h-full', className)}>
      {children}
    </div>
  );
};
export const LayoutScrollItem = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="scroll-item" className={cn('overflow-auto w-full', className)}>
      {children}
    </div>
  );
};
