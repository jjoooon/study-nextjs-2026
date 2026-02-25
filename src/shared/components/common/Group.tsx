import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

type LayoutPlacement =
  | 'ss'
  | 'sc'
  | 'se'
  | 'cs'
  | 'cc'
  | 'ce'
  | 'es'
  | 'ec'
  | 'ee'
  | 'bws'
  | 'bwc'
  | 'bwe'
  | 'ars'
  | 'arc'
  | 'are'
  | 'evs'
  | 'evc'
  | 'eve';

type Variant =
  | 'default'
  | 'title'
  | 'bg-gray-round'
  | 'th'
  | 'td'
  | 'tr'
  | 'table-header'
  | 'form-table'
  | 'form'
  | 'box'
  | 'box-line';

interface GroupProps {
  children?: ReactNode;
  placement?: LayoutPlacement;
  variant?: Variant;
  className?: string;
}

// 가로 정렬(Row)용 매핑
const ROW_PLACEMENT_MAP: Record<string, string> = {
  ss: 'justify-start items-start ',
  sc: 'justify-start items-center',
  se: 'justify-start items-end',
  cs: 'justify-center items-start ',
  cc: 'justify-center items-center',
  ce: 'justify-center items-end',
  es: 'justify-end items-start ',
  ec: 'justify-end items-center',
  ee: 'justify-end items-end',

  bws: 'w-full justify-between items-start  ',
  bwc: 'w-full justify-between items-center',
  bwe: 'w-full justify-between items-end',
  ars: 'w-full justify-around items-start',
  arc: 'w-full justify-around items-center',
  are: 'w-full justify-around items-end',
  evs: 'w-full justify-evenly items-start',
  evc: 'w-full justify-evenly items-center',
  eve: 'w-full justify-evenly items-end',
};

// 세로 정렬(Col)용 매핑
const COL_PLACEMENT_MAP: Record<string, string> = {
  ss: 'justify-start items-start ',
  sc: 'justify-start items-center',
  se: 'justify-start items-end',
  cs: 'justify-center items-start ',
  cc: 'justify-center items-center',
  ce: 'justify-center items-end',
  es: 'justify-end items-start ',
  ec: 'justify-end items-center',
  ee: 'justify-end items-end',

  bws: 'h-full justify-between items-start  ',
  bwc: 'h-full justify-between items-center',
  bwe: 'h-full justify-between items-end',
  ars: 'h-full justify-around items-start',
  arc: 'h-full justify-around items-center',
  are: 'h-full justify-around items-end',
  evs: 'h-full justify-evenly items-start',
  evc: 'h-full justify-evenly items-center',
  eve: 'h-full justify-evenly items-end',
};

// 스타일 변이(Variant) 매핑
const VARIANT_MAP: Record<Variant, string> = {
  default: '',
  title: 'text-lg font-bold', // 예시 스타일
  'table-header': 'bg-gray-100 font-semibold', // 예시 스타일
  'bg-gray-round': 'bg-gray-50 rounded-lg p-4',
  th: 'bg-gray-50 px-4 py-2 font-medium',
  td: 'px-4 py-2',
  tr: 'border-b border-gray-200',
  'form-table': 'w-full border-collapse',
  form: 'space-y-4',
  box: 'px-2.5 py-2.5 bg-[var(--color-gray-5)] gap-1.5',
  'box-line': 'p-2 bg-[#FFF] border border-[var(--color-coolgray-20)] rounded-[0.6rem] shadow-[0_0.4rem_0.8rem_0_rgba(0,0,0,0.04)]',
};

export const Gcol = ({ children, placement = 'cc', variant = 'default', className }: GroupProps) => {
  return (
    <div
      data-group="col"
      className={cn(
        'flex flex-col relative',
        VARIANT_MAP[variant], // 매핑 객체 사용
        COL_PLACEMENT_MAP[placement], // 매핑 객체 사용
        className
      )}
    >
      {children}
    </div>
  );
};

export const Grow = ({ children, placement = 'cc', variant = 'default', className }: GroupProps) => {
  return (
    <div
      data-group="row"
      className={cn('flex flex-row relative', VARIANT_MAP[variant], ROW_PLACEMENT_MAP[placement], className)}
    >
      {children}
    </div>
  );
};

export const Grid = ({ children, variant = 'default', className }: GroupProps) => {
  return (
    <div data-group="row" className={cn('grid relative', VARIANT_MAP[variant], className)}>
      {children}
    </div>
  );
};

export const FormItem = ({ children, placement = 'sc', variant = 'default', className }: GroupProps) => {
  return (
    <div
      data-group="row"
      className={cn(
        'relative flex flex-row flex-wrap w-full gap-1',
        VARIANT_MAP[variant],
        ROW_PLACEMENT_MAP[placement],
        className
      )}
    >
      {children}
    </div>
  );
};
export const Separator = ({ children }: GroupProps) => {
  return <div className="translate-y-[-.2rem]">{children}</div>;
};
export const ButtonGroup = ({ children, placement = 'sc', variant = 'default', className }: GroupProps) => {
  return (
    <div
      data-group="row"
      className={cn('relative flex flex-row gap-1', VARIANT_MAP[variant], ROW_PLACEMENT_MAP[placement], className)}
    >
      {children}
    </div>
  );
};
