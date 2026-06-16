/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

// ⚠️ CLONED & CUSTOM MODIFIED VERSION - DO NOT OVERWRITE
// 이 파일은 shadcn/ui accordion에서 복제한 후 커스텀 수정된 버전입니다.
// shadcn/ui 업데이트 시 수동으로 반영해야 합니다.
//
// 수정 내역:
// 1. VariantType 타입 추가 ("default" | "box" | "line" | "minimal")
// 2. AccordionContext 추가
// 3. variant prop 추가
// 4. 각 컴포넌트에 스타일 분기 로직 추가
// 5. AccordionTrigger: Header 구조 변경, 절대 위치 제어
//
// 수정일: 2025-11-18
// Last synced: 2025-12-17

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Typo } from '@atoms';
import { ChevronDownIcon, SelectArrowIcon } from '@icons';

/** 아코디언 시각적 스타일 프리셋 유형 */
type VariantType = 'default' | 'box' | 'line' | 'minimal' | 'tableHead';

const AccordionContext = React.createContext<VariantType>('default');

interface AccordionProps {
  /**
   * 아코디언의 시각적 스타일 변형
   * - default: 기본 스타일 (구분선 위주의 깔끔한 디자인)
   * - box: 개별 아이템이 둥근 흰색 배경 박스로 감싸지며 회색 배경 영역에 정렬되는 스타일
   * - line: 아코디언 왼쪽에 파란색 세로 강조선이 생기며 좌측 패딩이 추가되는 스타일
   * - minimal: 패딩과 보더를 최소화하여 콤팩트하게 배치하는 스타일
   * - tableHead: 테이블 헤더 내부나 밀접한 곳에 특화된 정렬 및 스타일
   * @default 'default'
   */
  variant?: VariantType;
}

/**
 * 아코디언 컴포넌트 (Root)
 * - Radix UI Accordion Primitive를 기반으로 확장한 아코디언 컨테이너입니다.
 */
function Accordion({
  variant = 'default',
  className,
  ...props
}: AccordionProps & React.ComponentProps<typeof AccordionPrimitive.Root>) {
  const accordionStyles = {
    default: '',
    box: 'bg-[#F4F4F4] p-[0.5rem]',
    line: 'border-l-[0.2rem] border-blue-500 pl-[0.4rem]',
    minimal: 'space-y-1',
    tableHead: 'w-full',
  };

  return (
    <AccordionContext.Provider value={variant}>
      <AccordionPrimitive.Root data-slot="accordion" className={cn(accordionStyles[variant], className)} {...props} />
    </AccordionContext.Provider>
  );
}

/**
 * 아코디언 아이템 컴포넌트 (Item)
 * - 아코디언의 개별 콘텐츠 섹션을 정의합니다.
 */
function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const variant = React.useContext(AccordionContext);

  const itemStyles = {
    default: '',
    box: 'bg-white rounded-xl mb-[0.2rem] overflow-hidden',
    line: 'border-b-[0.2rem] border-gray-200 last:border-b-0 py-[0.2rem]',
    minimal: 'py-[0.1rem]',
    tableHead: 'w-full',
  };

  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cn(itemStyles[variant], className)} {...props} />
  );
}

/**
 * 아코디언 트리거 컴포넌트 (Trigger)
 * - 아코디언 접기/펼치기를 수행하는 헤더 버튼 영역입니다.
 */
function AccordionTrigger({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  /** tableHead 변형 사용 시 노출되는 헤더의 텍스트 제목 */
  title?: string;
}) {
  const variant = React.useContext(AccordionContext);

  const triggerStyles = {
    default:
      'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-base font-medium transition-all outline-none hover:underline focus-visible:ring-[.3rem] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
    box: 'flex flex-1 items-center justify-between gap-4 p-4 h-full text-base text-left font-medium transition-all [&[data-state=open]>svg]:rotate-180 ',
    line: 'flex flex-1 items-center justify-between gap-4 py-3 text-base text-left font-semibold text-blue-600 transition-all hover:text-blue-800 [&[data-state=open]>svg]:rotate-180',
    minimal:
      'flex flex-1 items-center justify-between gap-4 py-2 text-base text-left font-medium transition-all hover:text-gray-600 [&[data-state=open]>svg]:rotate-180',
    tableHead:
      'flex items-center justify-start gap-1 py-0 text-base text-left font-medium transition-all hover:text-gray-600 [&[data-state=open]>svg]:rotate-0',
  };

  return (
    <>
      {variant === 'tableHead' ? (
        <AccordionPrimitive.Header className="flex relative items-center w-full justify-between  ">
          <AccordionPrimitive.Trigger
            data-slot="accordion-trigger"
            aria-label=""
            className={cn(triggerStyles[variant])}
            {...props}
          >
            <SelectArrowIcon size={14} color={'var(--color-primary-50)'} className="-rotate-90" />
            <Typo variant={'heading-md'}>{title}</Typo>
          </AccordionPrimitive.Trigger>
          <div className="flex justify-end items-center">{children}</div>
        </AccordionPrimitive.Header>
      ) : (
        <AccordionPrimitive.Header className="flex relative min-h-[2.5rem] p-0">
          <AccordionPrimitive.Trigger
            data-slot="accordion-trigger"
            aria-label=""
            className={cn('flex justify-between items-center w-full !m-0 !p-0', triggerStyles[variant], className)}
            {...props}
          >
            {children}
            <ChevronDownIcon
              size={16}
              color={'var(--color-gray-50)'}
              className="text-muted-foreground pointer-events-none shrink-0 translate-y-0 transition-transform duration-200"
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
      )}
    </>
  );
}

/**
 * 아코디언 콘텐츠 컴포넌트 (Content)
 * - 아코디언이 펼쳐졌을 때 슬라이딩 효과와 함께 드러나는 본문 콘텐츠 영역입니다.
 */
function AccordionContent({ children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden h-full"
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  );
}

// 타입 시스템 한계로 인한 static property 확장 허용 (storybook/JSX에서 Accordion.Item 등 사용 목적)
type AccordionComponentType = typeof Accordion & {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
};

const AccordionWithStatics = Accordion as unknown as AccordionComponentType;
AccordionWithStatics.Item = AccordionItem;
AccordionWithStatics.Trigger = AccordionTrigger;
AccordionWithStatics.Content = AccordionContent;

export { AccordionWithStatics as Accordion };
