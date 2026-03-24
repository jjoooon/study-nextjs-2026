'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

type TableVariant = 'default' | 'sub' | 'message';

interface TableProps extends React.ComponentProps<'table'> {
  variant?: TableVariant;
}

const TableVariantContext = React.createContext<TableVariant>('default');

function Table({ className, variant = 'default', ...props }: TableProps) {
  // 스타일 variant별로 분리
  const variantClass =
    variant === 'default'
      ? 'w-full rounded-0'
      : variant === 'message'
        ? 'w-full rounded-0 border-t-[.2rem] border-t-[#61554F]'
      : 'w-full caption-bottom text-sm border border-[#E5E5E5] rounded-[.8rem] overflow-hidden';
  return (
    <TableVariantContext.Provider value={variant}>
      <div data-slot="table-container" className="relative w-full">
        <table data-slot="table" className={cn(variantClass, className)} {...props} />
      </div>
    </TableVariantContext.Provider>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <thead
      data-slot="table-header"
      className={cn(
        variant === 'default'
          ? '[&_tr]:bg-(--color-table-th-surface-gray) [&_th]:h-[3rem] [&_th]:py-[.2rem]'
          : variant === 'message'
            ? '[&_tr]:bg-[#F4F4F4] [&_th]:h-18'
          : '[&_tr]:bg-[#F4F4F4] [&_tr]:border-none [&_th]:py-[.6rem] [&_th]:first:rounded-tl-[.8rem] [&_th]:first:rounded-bl-[.8rem] [&_th]:last:rounded-tr-[.8rem] [&_th]:last:rounded-br-[.8rem] [&_th]:text-[1.3rem] [&_th]:font-semibold [&_th]:text-center',
        className
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <tbody
      data-slot="table-body"
      className={cn(variant === 'default' ? '[&_tr:last-child]:border-b' : '', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(variant === 'default' ? '' : 'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <tr
      data-slot="table-row"
      className={cn(
        variant === 'default' || variant === 'message'
          ? ''
          : 'hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-[#E5E5E5] transition-colors',
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <th
      data-slot="table-head"
      className={cn(
        variant === 'default'
          ? 'text-[1.3rem] border border-(--color-table-border-border-gray)'
          : variant === 'message'
            ? 'bg-[#F4F4F4] border-b border-r border-[#E5E5E5] last:border-r-0 font-bold px-[1rem] py-[1.2rem] text-center text-[1.3rem]'
          : 'text-foreground h-[1rem] px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[0.2rem]',
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <td
      data-slot="table-cell"
      className={cn(
        variant === 'default'
          ? 'border border-(--color-table-border-border-gray) px-[.6rem] py-[.4rem] text-[1.3rem]'
          : variant === 'message'
            ? 'border-b border-[#E5E5E5] px-[1rem] py-[0.8rem] text-center text-[1.3rem]'
          : 'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[0.2rem]',
        className
      )}
      {...props}
    />
  );
}

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
