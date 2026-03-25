/**
 * Group Components - Layout Utility Components
 * 
 * @description
 * Flexbox 기반의 다목적 레이아웃 컴포넌트 모음
 * 다양한 배치(placement)와 스타일(variant) 옵션을 지원하여
 * 공통적인 레이아웃 패턴을 쉽게 구현할 수 있음
 * 
 * @components
 * - **Gcol**: 세로(Column) 방향 Flex 컨테이너
 * - **Grow**: 가로(Row) 방향 Flex 컨테이너
 * - **Grid**: CSS Grid 컨테이너
 * - **FormItem**: 폼 아이템용 Row 컨테이너
 * - **Separator**: 간단한 구분선
 * - **ButtonGroup**: 버튼 그룹용 Row 컨테이너
 * 
 * @placement 옵션 (위치 정렬)
 * - `ss/sc/se`: justify-start + (items-start/center/end)
 * - `cs/cc/ce`: justify-center + (items-start/center/end)
 * - `es/ec/ee`: justify-end + (items-start/center/end)
 * - `bws/bwc/bwe`: justify-between + (items-start/center/end) (전체 너비/높이)
 * - `ars/arc/are`: justify-around + (items-start/center/end) (전체 너비/높이)
 * - `evs/evc/eve`: justify-evenly + (items-start/center/end) (전체 너비/높이)
 * 
 * @variant 옵션 (시각적 스타일)
 * - `default`: 기본 스타일 없음
 * - `box`: 박스 스타일 (패딩 + 배경)
 * - `box-line`: 보더 박스 스타일 (그림자 포함)
 * 
 * @example
 * // 기본 세로 배치 (중앙 정렬)
 * <Gcol placement="cc">
 *   <h1>Title</h1>
 *   <p>Content</p>
 * </Gcol>
 * 
 * // 가로 배치 (양쪽 정렬)
 * <Grow placement="bwc">
 *   <span>Left</span>
 *   <span>Right</span>
 * </Grow>
 * 
 * // 스타일 적용
 * <Gcol variant="box" placement="cc">
 *   <div>Styled Container</div>
 * </Gcol>
 * 
 * // 폼 아이템
 * <FormItem placement="sc">
 *   <label>Label</label>
 *   <input type="text" />
 * </FormItem>
 * 
 * // 버튼 그룹
 * <ButtonGroup placement="ec">
 *   <button>Cancel</button>
 *   <button>Submit</button>
 * </ButtonGroup>
 * 
 * @version 1.0.0
 * @since 2026-03-05
 * @lastModified 2026-03-05
 */

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { UIUXposition } from '@/shared/types/uiuxTypes';

type LayoutPlacement = Extract<UIUXposition, 'ss' | 'sc' | 'se' | 'cs' | 'cc' | 'ce' | 'es' | 'ec' | 'ee' | 'bws' | 'bwc' | 'bwe' | 'ars' | 'arc' | 'are' | 'evs' | 'evc' | 'eve'>;

type Variant =
  | 'default'
  | 'box'
  | 'box-line'
  | 'box-round';

interface GroupProps {
  children?: ReactNode;
  placement?: LayoutPlacement;
  variant?: Variant;
  gap?: number | string;
  className?: string;
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
  'default': '',
  'box': 'px-2.5 py-2.5 bg-[var(--color-gray-5)] gap-1.5',
  'box-line': 'p-2 bg-[#FFF] border border-[var(--color-blue-gray-20)] rounded-[0.6rem] shadow-[0_0.4rem_0.8rem_0_rgba(0,0,0,0.04)]',
  'box-round': 'px-2.5 py-2.5 bg-[#F3F4F6] gap-1.5 rounded-[0.6rem]',
};

export const Gcol = ({ 
  children, 
  placement = 'cc', 
  variant = 'default', 
  gap = 1,
  className, 
  style 
}: GroupProps) => {
  return (
    <div
      data-group="col"
      className={cn(
        'flex flex-col relative',
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

export const Grow = ({ 
  children, 
  placement = 'cc', 
  variant = 'default', 
  gap = 1,
  className, 
  style 
}: GroupProps) => {
  return (
    <div
      data-group="row"
      className={cn(
        'flex flex-row relative', 
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

export const Grid = ({ 
  children, 
  variant = 'default',
  gap = 1,
  className, 
  style 
}: GroupProps) => {
  return (
    <div 
      data-group="row" 
      className={cn(
        'grid relative', 
        `gap-${gap}`,
        VARIANT_MAP[variant],
        className
      )} 
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
  style 
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
export const Separator = ({ 
  children, 
  style 
}: GroupProps) => {
  return <div className="translate-y-[-.2rem]" style={style}>{children}</div>;
};


export const Divider = ({
  className
}: GroupProps) => {
  return <hr className={cn("flex flex-col border-t w-full", className)} />;
}