import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { UIUXposition } from '@/shared/types/uiTypes';

type LayoutPlacement = Extract<
  UIUXposition,
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
  | 'eve'
>;

type Variant =
  | 'default'
  | 'box'
  | 'box-line'
  | 'box-info'
  | 'box-info-line'
  | 'box-warning'
  | 'box-detail'
  | 'box-round-b'
  | 'box-round';

interface GroupProps {
  children?: ReactNode;
  placement?: LayoutPlacement;
  variant?: Variant;
  gap?: number | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
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
  box: 'px-2.5 py-2.5 bg-[var(--color-gray-5)] gap-1.5',
  'box-line':
    'p-2 bg-[#FFF] border border-[var(--color-blue-gray-20)] rounded-[0.6rem] shadow-[0_0.4rem_0.8rem_0_rgba(0,0,0,0.04)]',
  'box-info': 'px-2.5 py-2 bg-[var(--color-information-5)] gap-1.5 rounded-[0.6rem]',
  'box-warning': 'px-2.5 py-2 bg-[var(--color-danger-5)] gap-1.5 rounded-[0.6rem]',
  'box-detail': 'px-2.5 py-2 bg-[var(--color-warning-5)] gap-1.5 rounded-[0.6rem]',
  'box-round': 'px-2.5 py-2.5 bg-[#F3F4F6] gap-1.5 rounded-[0.6rem]',
  'box-round-b': 'px-2.5 pt-2 pb-2.5 bg-[#F3F4F6] gap-1.5 rounded-b-[0.6rem]',

  'box-info-line':
    'px-2.5 py-2.5 bg-[var(--color-information-5)] gap-1.5 rounded-[0.6rem] border! border-[var(--color-information-15)]',
};

export const Gcol = ({
  children,
  placement = 'cc',
  variant = 'default',
  gap = 1,
  className,
  style,
  onClick,
}: GroupProps) => {
  return (
    <div
      data-group="col"
      className={cn(
        'flex flex-col relative w-full tracking-[-0.13rem]',
        VARIANT_MAP[variant],
        COL_PLACEMENT_MAP[placement],
        `gap-${gap}`,
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export const Grow = ({ children, placement = 'cc', variant = 'default', gap = 1, className, style }: GroupProps) => {
  return (
    <div
      data-group="row"
      className={cn(
        'flex flex-row relative tracking-[-0.13rem]',
        VARIANT_MAP[variant],
        ROW_PLACEMENT_MAP[placement],
        `gap-${gap}`,
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export const Grid = ({ children, variant = 'default', gap = 1, className, style }: GroupProps) => {
  return (
    <div
      data-group="row"
      className={cn('grid relative tracking-[-0.13rem]', `gap-${gap}`, VARIANT_MAP[variant], className)}
      style={style}
    >
      {children}
    </div>
  );
};

export const FormItem = ({
  children,
  placement = 'sc',
  variant = 'default',
  gap = 1,
  className,
  style,
}: GroupProps) => {
  return (
    <div
      data-group="row"
      className={cn(
        'relative flex flex-row flex-wrap w-full',
        `gap-${gap}`,
        VARIANT_MAP[variant],
        ROW_PLACEMENT_MAP[placement],
        className
      )}
      style={style}
    >
      {children}
    </div>
  ); 
};
export const Separator = ({ children, style }: GroupProps) => {
  return (
    <div className="translate-y-[-.2rem]" style={style}>
      {children}
    </div>
  );
};

interface DividerProps {
  variant?: 'default' | 'dot';
  className?: string;
  dir?: 'col' | 'row';
  color?: 'gray' | 'gray-light';
}


export const Divider = ({
  className,
  variant = 'default',
  dir = 'col',
  color = 'gray',
}: DividerProps) => {
  const colorMap: Record<string, string> = {
    gray: 'var(--color-gray-15)',
    'gray-light': 'var(--color-gray-10)',
  };

  return (
    <hr
      className={cn(
        'shrink-0 border-0 inline-block',
        (variant ===  'default' && (dir === 'col' ? `border-[${colorMap[color]}] h-[1rem] w-[0.1rem] border-l` : `border-[${colorMap[color]}] h-[0.1rem] w-[1rem] border-t`)),
        (variant === 'dot' && `relative w-[0.3rem] h-[100%] flex before:block  before:absolute  before:top-1/2 before:content-[''] before:w-[0.3rem] before:h-[0.3rem] 
        before:rounded-full  before:bg-[#777]`), 
        className
      )}
    />
  );
};
