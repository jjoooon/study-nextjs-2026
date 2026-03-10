'use client';

import React from 'react';

import { Grow, Typo } from '@atoms';
import { ArrowLightIcon, ListIcon } from '@icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@uiux/DropdownMenu';
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
  TabsLine,
} from '@uiux/Tabs';
import { ErrorMsg } from '@common/ErrorMsg';
import {
  Button,
} from '@uiux/Button';

import { useTabsPagination } from '@/shared/hooks/useTabsPagination';

interface TabPagerProps<T> {
  data: T[];
  visibleCount: number;
  children: React.ReactNode;
  variant?: string;
  removable?: boolean;
  error?: boolean;
  errorMsg?: string;
  active?: string;
  setActive: (value: string) => void;
  onRemove?: (value: string) => void;
  renderButtons?: React.ReactNode;
  renderTab?: (tab: T) => React.ReactNode;
  renderDropdownItem?: false | ((
    tab: T,
    setActive: (value: string) => void,
    setVisibleStart: (start: number) => void,
    data: T[],
    visibleCount: number
  ) => React.ReactNode);
  getValue: (tab: T) => string;
}

export function TabPager<T>({ 
  data, 
  active, 
  setActive,
  removable,
  onRemove,
  visibleCount = 6, 
  children, 
  variant = 'default',
  renderTab,
  error = false,
  errorMsg = "입력하세요.",
  renderDropdownItem,
  renderButtons,
  getValue,
}: TabPagerProps<T>) {
  // const [active, setActive] = React.useState<string>(
  //   data.length > 0 ? String(getValue(data[0])) : ''
  // );

  // tab pagination 훅 사용
  const { visibleStart, end, handlePrev, handleNext, isLastPage, setVisibleStart } = useTabsPagination(
    data,                // T[]: data의 타입이 자동으로 T로 추론됨
    visibleCount,
    variant,
    active ?? "",
    getValue
  );

  // removable이 true일 때만 onRemove 전달
  const tabsProps = {
    variant,
    value: active ?? "",
    removable,
    onValueChange: setActive,
    className: "w-full h-full grid grid-rows-[auto_1fr] content-start",
    ...(removable && onRemove ? { onRemove } : {}),
  };

  return (
    <>
      <Tabs {...tabsProps}>
        <TabsLine>
          <TabsList activeValue={active ?? ""}>
            {data.slice(visibleStart, end).map((tab) => {
              // error 속성이 없는 타입도 허용
              const tabHasError = typeof (tab as any).error !== 'undefined' ? Boolean((tab as any).error) : false;
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
          {Math.ceil(data.length / visibleCount) > 1 && (
            <Grow className="gap-[.4rem] mb-[0.1rem]">
              {renderButtons}
              <Grow className="gap-[0.1rem]">
                <Typo className="tracking-[0]!" color="default" weight="bold">
                  {Math.ceil((visibleStart + visibleCount) / visibleCount)}
                </Typo>
                <Typo className="tracking-[0]!" color="gray-light" weight="bold">
                  /
                </Typo>
                <Typo className="tracking-[0]!" color="gray-light" weight="bold">
                  {Math.ceil(data.length / visibleCount)}
                </Typo>
              </Grow>
              <Button
                variant="outlined"
                color="gray"
                only="icon" size="md"
                onClick={handlePrev}
                disabled={visibleStart === 0}
              >
                <ArrowLightIcon className="rotate-180" />
              </Button>
              <Button 
                variant="outlined" 
                color="gray" 
                only="icon" 
                size="md" 
                onClick={handleNext} 
                disabled={isLastPage}
              >
                <ArrowLightIcon />
              </Button>
              {renderDropdownItem && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outlined" color="gray" only="icon" size="md">
                      <ListIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto p-3 flex flex-col gap-1 overflow-auto" align="end">
                    {data.map(tab =>
                      renderDropdownItem(tab, setActive, setVisibleStart, data, visibleCount)
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </Grow>
          )}
        </TabsLine>
        <TabsContent value={active ?? ""}>{children}</TabsContent>
      </Tabs>
    </>
  );
}
