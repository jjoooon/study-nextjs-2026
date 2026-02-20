'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { CloseIcon } from '@/shared/components/icons';

import { cn } from '@/shared/lib/shadcn/utils';

// Context 생성
interface TabsContextProps {
  variant?: string;
  removable?: boolean;
  onRemove?: (value: string) => void;
  // [key: string]: any;
  // 필요한 명확한 속성을 여기에 추가하세요. 인덱스 시그니처([key: string]: any)는 타입 안정성을 위해 제거되었습니다.
}
const TabsContext = React.createContext<TabsContextProps>({});
export const useTabsContext = () => React.useContext(TabsContext);

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
      sub: 'bg-transparent',
      box: 'w-full bg-[#E5E7EB] rounded-[0.8rem] p-[0.2rem] [&>div]:flex-1',
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
          "h-[2.6rem] px-3 pt-[0.6rem] pb-[.6rem] text-[1.3rem] -mr-px bg-(--color-element-inverse) border-t border-l border-r border-[#e5e5e5] rounded-tl-[0.3rem] rounded-tr-[0.3rem] text-black data-[state=active]:bg-[#ff5c2e] data-[state=active]:border-[#ff5c2e] data-[state=active]:z-1 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:[font-variation-settings:'wght'_700] data-[state=active]:opacity-100",
        sub: "h-[2.6rem] px-2.5 pt-[0.6rem] pb-[.4rem] text-[1.2rem] -mr-px bg-(--color-element-gray-lighterest) border-t border-l border-r border-(--color-border-gray-light) text-black data-[state=active]:bg-(--color-element-inverse) data-[state=active]:border-[#ff5c2e] data-[state=active]:z-1 data-[state=active]:font-bold data-[state=active]:[font-variation-settings:'wght'_700] data-[state=active]:opacity-100",
        box: 'h-[3rem] flex items-center justify-center text-[1.3rem] font-bold text-[#9CA3AF] bg-transparent rounded-[0.6rem] px-2 flex-1 w-full data-[state=active]:bg-[var(--color-gray-0)] data-[state=active]:shadow-[0_0.4rem_0.8rem_0_rgba(0,0,0,0.12)] data-[state=active]:text-[#374151]',
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

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps & { activeValue?: string }>(
  ({ className, variant: _variant, children, ...props }, ref) => {
    const { variant, removable, onRemove } = useTabsContext();
    const totalTabs = React.Children.count(children);
    return (
      <TabsPrimitive.List
        className={cn(tabsListVariants({ variant: variant as 'default' | 'sub' | 'box' | undefined }), className)}
        ref={ref}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const value = (child as React.ReactElement<TabsTriggerProps>).props.value;
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
    { className, variant: _variant, children, removable, onRemove, activeValue: _activeValue, totalTabs, ...rest },
    ref
  ) => {
    const { variant } = useTabsContext();
    // totalTabs는 DOM에 전달하지 않음
    const triggerProps = { ...rest };
    // delete triggerProps.totalTabs; // totalTabs prop을 제거
    return (
      <div data-tabs="tab-trigger-wrap" className="relative">
        <TabsPrimitive.Trigger
          ref={ref}
          className={cn(
            tabsTriggerVariants({ variant: variant as 'default' | 'sub' | 'box' | undefined }),
            removable && totalTabs! > 1 ? 'isRemovable' : '',
            className,
            'items-center'
          )}
          onClick={(e) => {
            e.currentTarget.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
            });
          }}
          {...triggerProps}
        >
          <span className="flex items-center">{children}</span>
        </TabsPrimitive.Trigger>
        {removable && totalTabs! > 1 && (
          <button
            type="button"
            className="absolute top-[calc(50%-0.6rem)] right-[1rem] z-10"
            aria-label="탭 삭제"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(e);
            }}
            tabIndex={-1}
          >
            <CloseIcon
              size={14}
              color={variant === 'sub' || variant === 'box' ? 'var(--color-secondary-50)' : 'var(--color-gray-0)'}
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
      className={cn(
        'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
  }
>(({ className, borderColor = 'border-[#FF5C2E]', children, ...props }, ref) => {
  const { variant } = useTabsContext();
  const style = variant === 'box' ? 'border-none' : 'border-b-[.1rem]';
  return (
    <div
      data-tabs="tablist-wrap"
      ref={ref}
      className={cn(
        style,
        borderColor,
        'hide-scrollbar grid grid-cols-[1fr_auto] overflow-x-auto overflow-y-hidden gap-2',
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
