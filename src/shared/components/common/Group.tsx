import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

type LayoutPlacement =
  | 'ts'
  | 'tc'
  | 'te'
  | 'tsb'
  | 'tsa'
  | 'tse'
  | 'tst'
  | 'ms'
  | 'mc'
  | 'me'
  | 'msb'
  | 'msa'
  | 'mse'
  | 'mst'
  | 'bs'
  | 'bc'
  | 'be'
  | 'bsb'
  | 'bsa'
  | 'bse'
  | 'bst'
  | 'sbs'
  | 'sbc'
  | 'sbe'
  | 'sas'
  | 'sac'
  | 'sae'
  | 'ses'
  | 'sec'
  | 'see'
  | 'sts'
  | 'stc'
  | 'ste';

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
  ts: 'justify-start items-start',
  tc: 'justify-center items-start',
  te: 'justify-end items-start',
  tsb: 'w-full justify-between items-start',
  tsa: 'w-full justify-around items-start',
  tse: 'w-full justify-evenly items-start',
  ms: 'justify-start items-center',
  mc: 'justify-center items-center',
  me: 'justify-end items-center',
  msb: 'w-full justify-between items-center',
  msa: 'w-full justify-around items-center',
  mse: 'w-full justify-evenly items-center',
  bs: 'justify-start items-end',
  bc: 'justify-center items-end',
  be: 'justify-end items-end',
  bsb: 'w-full justify-between items-end',
  bsa: 'w-full justify-around items-end',
  bse: 'w-full justify-evenly items-end',
};

// 세로 정렬(Col)용 매핑
const COL_PLACEMENT_MAP: Record<string, string> = {
  ts: 'justify-start items-start',
  tc: 'justify-start items-center',
  te: 'justify-start items-end',
  ms: 'justify-center items-start',
  mc: 'justify-center items-center',
  me: 'justify-center items-end',
  bs: 'justify-end items-start',
  bc: 'justify-end items-center',
  be: 'justify-end items-end',
  sbs: 'justify-between items-start',
  sbc: 'justify-between items-center',
  sbe: 'justify-between items-end',
  sas: 'justify-around items-start',
  sac: 'justify-around items-center',
  sae: 'justify-around items-end',
  ses: 'justify-evenly items-start',
  sec: 'justify-evenly items-center',
  see: 'justify-evenly items-end',
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

export const Gcol = ({ children, placement = 'mc', variant = 'default', className }: GroupProps) => {
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

export const Grow = ({ children, placement = 'mc', variant = 'default', className }: GroupProps) => {
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

export const FormItem = ({ children, placement = 'ms', variant = 'default', className }: GroupProps) => {
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
export const ButtonGroup = ({ children, placement = 'ms', variant = 'default', className }: GroupProps) => {
  return (
    <div
      data-group="row"
      className={cn('relative flex flex-row gap-1', VARIANT_MAP[variant], ROW_PLACEMENT_MAP[placement], className)}
    >
      {children}
    </div>
  );
};
