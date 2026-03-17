import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

interface LayoutProps {
  children?: ReactNode;
  size?: string;
  className?: string;
  state?: boolean;
  isFlowExpanded?: boolean;
}

export const LayoutDoc = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="doc" className={cn('relative grid grid-rows-[auto_1fr] h-screen', className)}>
      {children}
    </div>
  );
};

export const LayoutHead = ({ children, className }: LayoutProps) => {
  return (
    <header data-layout="head" className={cn('relative flex justify-between items-center flex-col px-2.5', className)}>
      {children}
    </header>
  );
};

export const LayoutBody = ({ children, className, ...rest }: LayoutProps) => {
  return (
    <div data-layout="body" className={cn('relative grid grid-cols-[auto_1fr] pr-[1rem] pt-[.4rem] gap-3', className)} {...rest}>
      {children}
    </div>
  );
};

export const LayoutProcess = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="process" className={cn('relative grid grid-cols-[1fr_auto] min-w-[4rem]', className)}>
      {children}
    </div>
  );
};

export const LayoutFolder = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="folder" className={cn('relative grid grid-rows-[auto_1fr] gap-2.5', className)}>
      {children}
    </div>
  );
};

export const LayoutFolderHead = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="folder-head" className={cn('relative flex justify-between gap-3', className)}>
      {children}
    </div>
  );
};
export const LayoutFolderBody = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="folder-body" className={cn('relative grid grid-cols-[1fr_auto]', className)}>
      {children}
    </div>
  );
};
export const LayoutFolderFoot = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="folder-foot" className={cn('w-full flex justify-between gap-3', className)}>
      {children}
    </div>
  );
};

export const LayoutMain = ({ children, className }: LayoutProps) => {
  return (
    <main data-layout="main" className={cn('relative flex flex-col h-full gap-3', className)}>
      {children}
    </main>
  );
};

export const LayoutMainHead = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="main-head" className={cn('relative w-full flex shrink-0', className)}>
      {children}
    </div>
  );
};
export const LayoutMainBody = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="main-body" className={cn('relative w-full flex flex-1', className)}>
      {children}
    </div>
  );
};
export const LayoutMainFoot = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="main-foot" className={cn('relative w-full flex shrink-0', className)}>
      {children}
    </div>
  );
};

export const LayoutAside = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="aside" className={cn('relative flex flex-col h-full w-[19.8rem] gap-2', className)}>
      {children}
    </div>
  );
};
export const LayoutAsideHead = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="aside-head" className={cn('relative w-full flex shrink-0 w-[19.8rem]', className)}>
      {children}
    </div>
  );
};

export const LayoutAsideBody = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="aside-body" className={cn('relative w-full flex flex-1', className)}>
      {children}
    </div>
  );
};

export const LayoutAsideFoot = ({ children, className }: LayoutProps) => {
  return (
    <div data-layout="aside-foot" className={cn('relative w-full flex shrink-0', className)}>
      {children}
    </div>
  );
};

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
