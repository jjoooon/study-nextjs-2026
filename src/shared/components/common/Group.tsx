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
  se: 'justify-start items-endt',
  cs: 'justify-center items-start ',
  cc: 'justify-center items-center',
  ce: 'justify-center items-endt',
  es: 'justify-end items-start ',
  ec: 'justify-end items-center',
  ee: 'justify-end items-endt',

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
  se: 'justify-start items-endt',
  cs: 'justify-center items-start ',
  cc: 'justify-center items-center',
  ce: 'justify-center items-endt',
  es: 'justify-end items-start ',
  ec: 'justify-end items-center',
  ee: 'justify-end items-endt',

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
  box: 'px-[2rem] py-[1.2rem] bg-[#F4F4F4] gap-[1.2rem]',
  'box-line': 'px-[2rem] py-[2rem] bg-[#FFF] gap-[1.2rem] border border-[#ECECEC] rounded-[1.6rem] ',
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
