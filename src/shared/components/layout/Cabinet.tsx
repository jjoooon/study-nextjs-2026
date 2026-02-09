import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

interface LayoutProps {
  children?: ReactNode;
  size?: string;
  className?: string;
  state?: boolean;
  isFlowExpanded?: boolean;
}

// body
export const LayoutBody = ({ children, className }: LayoutProps) => {
  return (
    <div data-cabinet="body" className={cn('flex h-screen w-full bg-white overflow-hidden', className)}>
      {children}
    </div>
  );
};

// flow
export const LayoutFlow = ({ children, className }: LayoutProps) => {
  return (
    <div
      data-cabinet="flow-status"
      className={cn('relative border-r border-gray-200 shrink-0 transition-all duration-300', className)}
    >
      {children}
    </div>
  );
};

// folder
export const LayoutFolder = ({ children, className }: LayoutProps) => {
  return (
    <div data-cabinet="folder" className={cn('grid grid-rows-[auto_1fr_auto] overflow-auto flex-1', className)}>
      {children}
    </div>
  );
};

// document
export const LayoutDocument = ({ children, className }: LayoutProps) => {
  return (
    <div data-cabinet="document" className={cn(`col-start-1 px-8 grid gap-4`, className)}>
      {children}
    </div>
  );
};

// label
export const LayoutLabel = ({ children, className }: LayoutProps) => {
  return (
    <div data-cabinet="label" className={cn('col-start-1 px-8 pt-8', className)}>
      {children}
    </div>
  );
};

// main
export const LayoutMain = ({ children, className }: LayoutProps) => {
  return (
    <div data-cabinet="main" className={cn('bg-white grid', className)}>
      {children}
    </div>
  );
};

// aside
export const LayoutAside = ({ children, className }: LayoutProps) => {
  return (
    <div data-cabinet="aside" className={cn('bg-white', className)}>
      {children}
    </div>
  );
};

// controls
export const LayoutControls = ({ children, className }: LayoutProps) => {
  return (
    <div data-cabinet="controls" className={cn('col-start-1 sticky bottom-0 bg-white z-1', className)}>
      {children}
    </div>
  );
};
