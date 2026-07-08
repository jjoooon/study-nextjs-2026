/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';
import { CloseIcon, SelectArrowIcon } from '@icons';

// Context 생성
interface TabsContextProps {
  variant?: string;
  removable?: boolean;
  onRemove?: (value: string) => void;
  // [key: string]: any;
  // 필요한 명확한 속성을 여기에 추가하세요. 인덱스 시그니처([key: string]: any)는 타입 안정성을 위해 제거되었습니다.
}
const TabsContext = React.createContext<TabsContextProps>({});
export const useTabsContext = (): TabsContextProps => React.useContext(TabsContext);

// Tabs 컴포넌트에서 Context Provider로 감싸기
interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: string;
  removable?: boolean;
  onRemove?: (value: string) => void;
  // [key: string]: any;
}
const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ children, variant, removable, onRemove, ...props }, ref) => (
    <TabsContext.Provider value={{ variant, removable, onRemove }}>
      <TabsPrimitive.Root ref={ref} {...props}>
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  )
);
Tabs.displayName = TabsPrimitive.Root.displayName;

const tabsListVariants = cva('inline-flex items-start', {
  variants: {
    variant: {
      default: 'bg-transparent',
      box: 'w-full bg-[#E5E7EB] rounded-[0.8rem] p-[0.2rem] [&>div]:flex-1',
      vertical: 'flex-col gap-1 bg-transparent', // vertical일 때 gap 추가
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center relative whitespace-nowrap font-normal tracking-[-0.039rem] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30',
  {
    variants: {
      variant: {
        default:
          "h-[3rem] px-2.5 py-[0.6rem] text-[1.2rem] -mr-px gap-1 bg-(--color-element-inverse) border-t border-l border-r border-[var(--color-gray-15)] rounded-tl-[0.3rem] rounded-tr-[0.3rem] text-[var(--color-gray-100)] data-[state=active]:border-[var(--color-primary-50)] data-[state=active]:border-t-[0.3rem]! data-[state=active]:z-1 data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:[font-variation-settings:'wght'_700] data-[state=active]:opacity-100",
        box: 'h-[3rem] flex items-center justify-center text-[1.3rem] font-bold text-[#9CA3AF] bg-transparent rounded-[0.6rem] px-2 flex-1 w-full data-[state=active]:bg-[var(--color-gray-0)] data-[state=active]:shadow-[0_0.4rem_0.8rem_0_rgba(0,0,0,0.12)] data-[state=active]:text-[#374151]',
        vertical:
          'w-[calc(100%-1.2rem)] h-[4.4rem] px-0 py-2 bg-white border border-[var(--color-border-gray-light,#d8d8d8)] border-r-0 rounded-bl-[2.2rem] rounded-tl-[2.2rem] text-[1.2rem] text-[color:var(--color-text-gray,#414141)] text-center font-normal leading-none tracking-[-0.1rem] data-[state=active]:w-[100%] data-[state=active]:bg-[#f3f4f6] data-[state=active]:border-0 data-[state=active]:text-[1.3rem] data-[state=active]:font-bold data-[state=active]:text-[color:var(--color-button-text-primary,#ff5c2e)] [&_svg]:display-none data-[state=active]:[&_svg]:display-block',
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

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant: _variant, children, ...props }, ref) => {
    const { variant, removable, onRemove }: TabsContextProps = useTabsContext();
    const totalTabs = React.Children.count(children);
    return (
      <TabsPrimitive.List
        className={cn(tabsListVariants({ variant: variant as 'default' | 'box' | undefined }), className)}
        ref={ref}
        {...props}
      >
        {React.Children.map(children, (child: React.ReactNode) => {
          if (React.isValidElement<{ value: string }>(child)) {
            const value = child.props.value;
            return React.cloneElement(child as React.ReactElement<TabsTriggerProps>, {
              totalTabs,
              removable,
              onRemove: removable && onRemove ? () => onRemove(value) : undefined,
            });
          }
          return child;
        })}
      </TabsPrimitive.List>
    );
  }
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  (
    {
      className,
      variant: _variant,
      children,
      removable,
      onRemove,
      activeValue: _activeValue,
      totalTabs: _totalTabs,
      ...rest
    },
    ref
  ) => {
    const { variant } = useTabsContext();
    // vertical일 때만 적용할 스타일
    const verticalTabWrapClass =
      variant === 'vertical' ? 'w-[100%] h-[100%] p-0 flex items-center justify-end' : 'relative';
    return (
      <div data-tabs="tab-trigger-wrap" className={verticalTabWrapClass}>
        <TabsPrimitive.Trigger
          ref={ref}
          className={cn(
            tabsTriggerVariants({ variant: variant as 'default' | 'box' | 'vertical' | undefined }),
            removable ? 'isRemovable' : '',
            '[&[data-tab-error=true]:not([data-state=active])]:text-[var(--color-danger-50)]!',
            '[&[data-tab-error=true]:not([data-state=active])]:border-[var(--color-danger-50)]!',
            '[&[data-tab-error=true]:not([data-state=active])]:border!',
            '[&[data-tab-error=true]:not([data-state=active])]:z-1!',
            '[&[data-tab-error=true]:not([data-state=active])]:bg-[var(--color-danger-5)]!',
            className,
            'items-center shadow-[0_0.1rem_0_#ffff]!'
          )}
          onClick={(e) => {
            e.currentTarget.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
            });
          }}
          {...rest}
        >
          {variant === 'vertical' && <SelectArrowIcon className="rotate-270 vertical-icon-hide" />}
          <span className="flex items-center">{children}</span>
        </TabsPrimitive.Trigger>
        {removable && (
          <button
            type="button"
            className="absolute top-[calc(50%-0.6rem)] right-[0.9rem] z-10"
            aria-label="탭 삭제"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(e);
            }}
            tabIndex={-1}
          >
            <CloseIcon
              size={14}
              color={
                variant === 'sub' || variant === 'box' || variant === 'default'
                  ? 'var(--color-secondary-50)'
                  : 'var(--color-gray-0)'
              }
            />
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
>(({ className, ...props }, ref) => {
  const { variant } = useTabsContext();
  return (
    <TabsPrimitive.Content
      ref={ref}
      forceMount
      className={cn(
        'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'data-[state=inactive]:h-0 data-[state=inactive]:overflow-hidden',
        className
      )}
      data-variant={variant}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

const TabsPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    activeValue: string;
  }
>(({ value, activeValue, className, ...props }, ref) => {
  const { variant } = useTabsContext();
  return (
    <div
      ref={ref}
      role="tabpanel"
      style={{ display: activeValue === value ? 'block' : 'none' }}
      className={cn(
        'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      data-variant={variant}
      {...props}
    />
  );
});
TabsPanel.displayName = 'TabsPanel';

const TabsLine = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    borderColor?: string;
    hasTableBelow?: boolean;
  }
>(({ className, children, hasTableBelow = false, ...props }, ref) => {
  const { variant } = useTabsContext();
  const style = variant === 'box' ? 'after:opacity-0 rounded-[0.8rem]' : '';
  const lineHeightClass =
    variant === 'default' || !variant ? (hasTableBelow ? 'after:!h-[0.2rem]' : 'after:h-[0.1rem]') : 'after:h-[0.2rem]';
  return (
    <div
      data-tabs="tablist-wrap"
      ref={ref}
      className={cn(
        style,
        'hide-scrollbar grid grid-cols-[1fr_auto] gap-2 relative after:absolute after:content-[""] after:w-full after:bg-[#FF5C2E] after:bottom-0 after:left-0',
        lineHeightClass,
        className
      )}
      data-variant={variant}
      style={{ scrollBehavior: 'smooth', ...(props.style || {}) }}
      {...props}
    >
      {children}
    </div>
  );
});
TabsLine.displayName = 'TabsLine';

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsPanel, TabsLine };
