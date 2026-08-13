/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

// Table 디자인 변형 타입: 기본형, 보조형, 메시지용
type TableVariant = 'default' | 'sub' | 'message';

interface TableProps extends React.ComponentProps<'table'> {
  /** 테이블 디자인 스타일 테마 변형 ('default' | 'sub' | 'message')
   * - 'default': 기본형, 상단 2px 검정 구분선
   * - 'message': 메시지용, 상단 2px 갈색 구분선
   * - 'sub': 서브 보조형, 전체 테두리 박스 형태
   */
  variant?: TableVariant;
}

// 하위 컴포넌트(thead, tr, td 등)에서 상위 Table의 variant를 공유하기 위한 Context
const TableVariantContext = React.createContext<TableVariant>('default');

/**
 * Table 루트 컴포넌트
 * @param variant - 'default'(검정 상단선), 'message'(갈색 상단선), 'sub'(테두리 박스형)
 */
function Table({ className, variant = 'default', ...props }: TableProps) {
  // variant별 컨테이너 스타일 정의
  const variantClass =
    variant === 'default'
      ? // 기본형: 상단 2px 검정 라인
        'w-full rounded-0 border-t-[.2rem] border-t-[#000]'
      : variant === 'message'
        ? 'w-full rounded-0 border-t-[.2rem] border-t-[#61554F]'
        : 'w-full caption-bottom text-sm border border-[#E5E5E5] rounded-[.8rem] overflow-hidden';
  return (
    <TableVariantContext.Provider value={variant}>
      <div data-slot="table-container" className={cn(variantClass, className)}>
        <table data-slot="table" className="w-full cp-thcontext border-separate border-spacing-0" {...props} />
      </div>
    </TableVariantContext.Provider>
  );
}

// 테이블 헤더 영역 (thead)
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <thead
      data-slot="table-header"
      data-variant={variant}
      className={cn(
        variant === 'default'
          ? '[&_tr]:bg-[var(--color-gray-5)]'
          : variant === 'message'
            ? '[&_tr]:bg-[#F4F4F4] [&_th]:h-18'
            : 'border-b-0! [&_tr]:border-b-0! [&_th]:border-b-0! [&_tr]:bg-[#F4F4F4] [&_th]:py-[.6rem] [&_th]:first-child:rounded-tl-[.8rem] [&_th]:first-child:rounded-bl-[.8rem] [&_th]:last:rounded-tr-[.8rem] [&_th]:last:rounded-br-[.8rem] [&_th]:text-[1.3rem] [&_th]:font-semibold [&_th]:text-center',
        className
      )}
      {...props}
    />
  );
}

// 테이블 본문 영역 (tbody)
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <tbody
      data-slot="table-body"
      data-variant={variant}
      className={cn(
        variant === 'default' ? '[&_tr:last-child]:border-b' : 'border-t-0! [&>tr:first-child]:border-t-0!',
        className
      )}
      {...props}
    />
  );
}

// 테이블 푸터 영역 (tfoot)
function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <tfoot
      data-slot="table-footer"
      data-variant={variant}
      className={cn(variant === 'default' ? '' : 'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

// 테이블 행 (tr)
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <tr
      data-slot="table-row"
      data-variant={variant}
      className={cn(
        variant === 'default' || variant === 'message'
          ? ''
          : 'border-b border-[#E5E5E5] last:border-b-0 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  );
}

// 테이블 헤더 셀 (th)
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <th
      data-slot="table-head"
      data-variant={variant}
      className={cn(
        variant === 'default'
          ? 'border text-[1.3rem] bg-[var(--color-gray-5)] py-[.6rem] px-[.6rem] border-[var(--color-gray-10)] first:border-l-0 last:border-r-0 [&+*]:border-l-0 border-t-0'
          : variant === 'message'
            ? 'bg-[#F4F4F4] border-b border-r border-[#E5E5E5] last:border-r-0 font-bold px-[1rem] py-[1.2rem] text-center text-[1.3rem]'
            : 'bg-transparent border-b border-[#E5E5E5] text-foreground text-[1.3rem] font-normal py-[.6rem] px-[.6rem] text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[0.2rem]',
        className
      )}
      {...props}
    />
  );
}

// 테이블 일반 셀 (td)
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <td
      data-slot="table-cell"
      data-variant={variant}
      className={cn(
        variant === 'default'
          ? 'border text-[1.3rem] py-[0.2rem] px-[0.6rem] border-[var(--color-gray-10)] first:border-l-0 last:border-r-0 h-[3.8rem] [&+*]:border-l-0 border-t-0'
          : variant === 'message'
            ? 'border-b border-[#E5E5E5] px-[1rem] py-[0.8rem] text-center text-[1.3rem]'
            : 'border-b border-[#E5E5E5] bg-transparent text-[1.3rem] font-normal py-[.6rem] px-[.6rem] text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[0.2rem]',
        className
      )}
      {...props}
    />
  );
}

// 테이블 캡션 (접근성을 위해 a11y-hidden 클래스 적용 가능)
function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm a11y-hidden', className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
