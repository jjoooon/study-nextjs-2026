'use client';

import React from 'react';
import { useTabsPagination } from '@/shared/hooks/useTabs';
import { Grow, Typo } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { ArrowIcon, ListIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Popover, PopoverTrigger, PopoverContent } from '@uiux/Popover';
import { Tabs, TabsList, TabsContent, TabsTrigger, TabsLine } from '@uiux/Tabs';
import { cn } from '@/shared/lib/shadcn/utils';

interface TabPagerProps<T> {
  data: T[];
  visibleCount?: number;
  children?: React.ReactNode;
  variant?: string;
  hasTableBelow?: boolean;
  removable?: boolean;
  error?: boolean;
  errorMsg?: string;
  active?: string;
  setActive: (value: string) => void;
  onRemove?: (value: string) => void;
  renderButtons?: React.ReactNode;
  renderAfter?: React.ReactNode;
  renderTab?: (tab: T) => React.ReactNode;
  renderDropdownItem?:
    | false
    | ((
        tab: T,
        setActive: (value: string) => void,
        setVisibleStart: (start: number) => void,
        data: T[],
        visibleCount: number
      ) => React.ReactNode);
  getValue: (tab: T) => string;
  className?: string;
  contentClass?: string;
}

export function TabPager<T>({
  data,
  active,
  setActive,
  hasTableBelow = false,
  removable,
  onRemove,
  visibleCount = 6,
  children,
  variant = 'default',
  renderTab,
  error = false,
  errorMsg = '입력하세요.',
  renderDropdownItem,
  renderButtons,
  renderAfter,
  getValue,
  className,
  contentClass,
}: TabPagerProps<T>) {
  // const [active, setActive] = React.useState<string>(
  //   data.length > 0 ? String(getValue(data[0])) : ''
  // );

  // tab pagination 훅 사용
  const { visibleStart, end, handlePrev, handleNext, isLastPage, setVisibleStart } = useTabsPagination(
    data, // T[]: data의 타입이 자동으로 T로 추론됨
    visibleCount,
    variant,
    active ?? '',
    getValue
  );

  // removable이 true일 때만 onRemove 전달
  const tabsProps = {
    variant,
    value: active ?? '',
    removable,
    onValueChange: setActive,
    className: cn('w-full h-full grid grid-rows-[auto_1fr] content-start', className),
    ...(removable && onRemove ? { onRemove } : {}),
  };

  return (
    <>
      <Tabs {...tabsProps}>
        <TabsLine hasTableBelow={hasTableBelow}>
          <TabsList>
            {data.slice(visibleStart, end).map((tab) => {
              // error 속성이 없는 타입도 허용
              const tabHasError =
                typeof tab === 'object' &&
                tab !== null &&
                'error' in tab &&
                Boolean((tab as { error?: unknown }).error);
              return (
                <TabsTrigger
                  key={getValue(tab)}
                  value={getValue(tab)}
                  data-tab-error={error && tabHasError ? 'true' : 'false'}
                >
                  {renderTab?.(tab)}
                  {error && tabHasError && (
                    <ErrorMsg aria-live="polite" show={true} position="tl">
                      {errorMsg}
                    </ErrorMsg>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <Grow gap={2.5} className="mb-[0.2rem]" placement={'es'}>
            {renderButtons}
            {Math.ceil(data.length / visibleCount) > 1 && (
              <Grow placement="cc" gap={1}>
                <Grow className="gap-[0.1rem] pt-[0.1rem]">
                  <Typo className="tracking-[0]!" color={'default'} weight={'bold'}>
                    {Math.ceil((visibleStart + visibleCount) / visibleCount)}
                  </Typo>
                  <Typo className="tracking-[0]! text-[var(--color-gray-50)]" weight={'bold'}>
                    /
                  </Typo>
                  <Typo className="tracking-[0]! text-[var(--color-gray-30)]" weight={'bold'}>
                    {Math.ceil(data.length / visibleCount)}
                  </Typo>
                </Grow>
                <Button
                  variant={'outlined'}
                  color={'gray'}
                  only={'icon'}
                  size={'md'}
                  onClick={handlePrev}
                  disabled={visibleStart === 0}
                >
                  <ArrowIcon />
                </Button>
                <Button
                  variant={'outlined'}
                  color={'gray'}
                  only={'icon'}
                  size={'md'}
                  onClick={handleNext}
                  disabled={isLastPage}
                >
                  <ArrowIcon className="rotate-180" />
                </Button>
                {renderDropdownItem && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={'outlined'} color={'gray'} only={'icon'} size={'md'}>
                        <ListIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3 flex flex-col gap-1 overflow-auto" align={'end'}>
                      {data.map((tab) => renderDropdownItem(tab, setActive, setVisibleStart, data, visibleCount))}
                    </PopoverContent>
                  </Popover>
                )}
              </Grow>
            )}
            {renderAfter}
          </Grow>
        </TabsLine>
        {children && <TabsContent value={active ?? ''} className={contentClass}>{children}</TabsContent>}
        
      </Tabs>
    </>
  );
}
