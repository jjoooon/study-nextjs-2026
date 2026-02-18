'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { CloseIcon } from '@/shared/components/icons';

import { cn } from '@/shared/lib/shadcn/utils';

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva('inline-flex items-start', {
  variants: {
    variant: {
      default: 'bg-transparent',
      sub: 'bg-transparent',
      box: 'w-full bg-[#E5E7EB] rounded-[0.8rem] p-[0.2rem] [&>div]:flex-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center relative whitespace-nowrap text-[1.3rem] font-normal tracking-[-0.039rem] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30',
  {
    variants: {
      variant: {
        default:
          "h-[2.7rem] px-2.5 pt-1.5 pb-1.5 -mr-px bg-[var(--color-element-inverse)] border-t border-l border-r border-[#e5e5e5] rounded-tl-[0.3rem] rounded-tr-[0.3rem] text-black data-[state=active]:bg-[#ff5c2e] data-[state=active]:border-[#ff5c2e] data-[state=active]:z-1 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:[font-variation-settings:'wght'_700] data-[state=active]:opacity-100",
        sub: "h-[2.7rem] px-3 pt-[0.6rem] pb-2 -mr-px bg-[var(--color-element-gray-lighterest)] border-t border-l border-r border-[var(--color-border-gray-light)] text-black data-[state=active]:bg-[var(--color-element-inverse)] data-[state=active]:border-[#ff5c2e] data-[state=active]:z-1 data-[state=active]:font-bold data-[state=active]:[font-variation-settings:'wght'_700] data-[state=active]:opacity-100",
        box: 'h-[3rem] flex items-center justify-center font-bold text-[#9CA3AF] bg-transparent rounded-[0.6rem] flex-1 w-full data-[state=active]:bg-[var(--color-gray-0)] data-[state=active]:shadow-[0_0.4rem_0.8rem_0_rgba(0,0,0,0.12)] data-[state=active]:text-[#374151]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>, VariantProps<typeof tabsListVariants> {}

type InternalTriggerProps = {
  removable?: boolean;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value: string;
  activeValue?: string;
  totalTabs?: number;
};

export interface TabsTriggerProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'removable' | 'onRemove' | 'activeValue'>,
    VariantProps<typeof tabsTriggerVariants>,
    InternalTriggerProps {}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant, children, ...props }, ref) => {
    // children의 개수 파악
    const totalTabs = React.Children.count(children);

    return (
      <TabsPrimitive.List ref={ref} className={cn(tabsListVariants({ variant }), className)} {...props}>
        {/* 각 TabsTrigger에 totalTabs prop 자동 주입 */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { totalTabs } as Partial<TabsTriggerProps>);
          }
          return child;
        })}
      </TabsPrimitive.List>
    );
  }
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ className, variant, children, removable, onRemove, activeValue: _activeValue, totalTabs, ...rest }, ref) => {
    // totalTabs는 DOM에 전달하지 않음
    const triggerProps = { ...rest } as Record<string, unknown>;
    delete triggerProps.totalTabs; // totalTabs prop을 제거
    return (
      <div className="relative">
        <TabsPrimitive.Trigger
          ref={ref}
          value={triggerProps.value as string}
          className={cn(
            tabsTriggerVariants({ variant }),
            removable && totalTabs! > 1 ? 'isRemovable' : '',
            className,
            'items-center'
          )}
          {...triggerProps}
        >
          <span className="flex items-center">{children}</span>
        </TabsPrimitive.Trigger>
        {removable && totalTabs! > 1 && (
          <button
            type="button"
            className="absolute top-[calc(50%-.7rem)] right-[1rem] z-10"
            aria-label="탭 삭제"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(e);
            }}
            tabIndex={-1}
          >
            <CloseIcon size={14} color={variant === 'sub' ? 'var(--color-icon-secondary)' : undefined} />
          </button>
        )}
      </div>
    );
  }
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const TabsPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    activeValue: string;
  }
>(({ value, activeValue, className, ...props }, ref) => (
  <div
    ref={ref}
    role="tabpanel"
    style={{ display: activeValue === value ? 'block' : 'none' }}
    className={cn(
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsPanel.displayName = 'TabsPanel';

const TabsLine = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    borderColor?: string;
  }
>(({ className, borderColor = 'border-[#FF5C2E]', children, ...props }, ref) => (
  <div ref={ref} className={cn('border-b-[.1rem] grid grid-cols-[1fr_auto]', borderColor, className)} {...props}>
    {children}
  </div>
));
TabsLine.displayName = 'TabsLine';

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsPanel, TabsLine };
