/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Typo } from '@atoms';
import type { CSSProperties, KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { UIUXposition } from '@/shared/types/uiTypes';

/**
 * Group 계열 컴포넌트에서 허용하는 정렬 포지션 집합.
 *
 * 네이밍 규칙(2글자):
 * - 첫 글자: 주축 정렬(start/center/end)
 * - 둘째 글자: 교차축 정렬(start/center/end)
 *
 * 확장 포지션:
 * - bw*: between
 * - ar*: around
 * - ev*: evenly
 */
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

/**
 * 박스/배경/테두리 등 스타일 프리셋 키.
 *
 * 운영 화면에서 동일한 레이아웃 컨테이너를
 * 용도(정보/경고/상세 등)에 따라 빠르게 재사용하기 위한 토큰이다.
 */
type Variant =
  | 'default'
  | 'box'
  | 'box-line'
  | 'box-info'
  | 'box-info-line'
  | 'box-warning'
  | 'box-warning-line'
  | 'box-detail'
  | 'box-round-b'
  | 'box-round';

/**
 * Group 계열 공통 props.
 *
 * 대상 컴포넌트:
 * - Gcol, Grow, Grid, FormItem, Separator
 *
 * 공통 원칙:
 * - `placement`로 정렬
 * - `variant`로 시각 스타일
 * - `gap`으로 내부 간격
 * - `onClick`이 있으면 접근성 가능한 클릭 블록으로 동작
 */
interface GroupProps {
  children?: ReactNode;
  placement?: LayoutPlacement;
  variant?: Variant;
  gap?: number | string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

/**
 * div를 버튼처럼 사용할 때 키보드 접근성을 보완.
 * - Enter/Space 입력 시 click 트리거
 */
const handleDivKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    event.currentTarget.click();
  }
};

/**
 * onClick 존재 여부에 따라 클릭 가능한 속성을 조건부 부여.
 *
 * 목적:
 * - 불필요한 role/tabIndex 남발 방지
 * - 클릭 가능한 컨테이너는 키보드 포커스/조작 가능하게 처리
 */
const getClickableProps = (onClick?: MouseEventHandler<HTMLDivElement>) => {
  if (!onClick) {
    return {};
  }

  return {
    onClick,
    onKeyDown: handleDivKeyDown,
    role: 'button' as const,
    tabIndex: 0,
  };
};

/**
 * 가로 배치(Row) 컨테이너용 정렬 클래스 매핑.
 * key는 `LayoutPlacement`와 동일 의미를 가진다.
 */
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
/**
 * 세로 배치(Col) 컨테이너용 정렬 클래스 매핑.
 * Row와 달리 축이 반대이므로 높이 기준 클래스가 포함된다.
 */
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

/**
 * Variant별 시각 스타일 매핑.
 *
 * 운영 관점:
 * - 반복되는 박스 스타일을 문자열 토큰으로 표준화
 * - 화면 간 색/여백 일관성 유지
 */
const VARIANT_MAP: Record<Variant, string> = {
  default: '',
  box: 'px-2.5 py-2.5 bg-[var(--color-gray-5)] gap-1.5',
  'box-line':
    'p-2 bg-[#FFF] border border-[var(--color-blue-gray-20)] rounded-[0.6rem] shadow-[0_0.4rem_0.8rem_0_rgba(0,0,0,0.04)]',
  'box-info': 'px-2.5 py-2 bg-[var(--color-information-5)] gap-1.5 rounded-[0.6rem]', // 푸른색 안내박스
  'box-warning': 'px-2.5 py-2 bg-[var(--color-danger-5)] gap-1.5 rounded-[0.6rem]', // 붉은색 경고박스
  'box-detail': 'px-2.5 py-2 bg-[var(--color-warning-5)] gap-1.5 rounded-[0.6rem]', // 노란색 박스
  'box-round': 'px-2.5 py-2.5 bg-[#F3F4F6] gap-1.5 rounded-[0.6rem]', // 상단 회색라운드 박스
  'box-round-b': 'px-2.5 pt-2 pb-2.5 bg-[#F3F4F6] gap-1.5 rounded-b-[0.6rem]', // 택과 붙어있는 회색박스일 하단만 라운드 처리 사용
  'box-warning-line':
    'px-2.5 py-2.5 bg-[var(--color-danger-5)] gap-1.5 rounded-[0.6rem] border! border-[var(--color-gray-15)]', // 붉은색 경고박스 체크박스
  'box-info-line':
    'px-2.5 py-2.5 bg-[var(--color-information-5)] gap-1.5 rounded-[0.6rem] border! border-[var(--color-information-15)]', // 상단 회색라운드 박스 대신 강조가 필요한경우 푸른색상
};

/**
 * Column 기반 레이아웃 컨테이너.
 *
 * 특징:
 * - `flex-col` + full width 기본값
 * - 정렬(`placement`) / 스타일(`variant`) / 간격(`gap`) 조합
 * - 클릭 핸들러 제공 시 접근성 속성 자동 부여
 */
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
      {...getClickableProps(onClick)}
    >
      {children}
    </div>
  );
};

/**
 * Row 기반 레이아웃 컨테이너.
 *
 * 특징:
 * - `flex-row` 기본
 * - 버튼/아이콘/텍스트 수평 조합에서 주로 사용
 */
export const Grow = ({
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
      data-group="row"
      className={cn(
        'flex flex-row relative tracking-[-0.13rem]',
        VARIANT_MAP[variant],
        ROW_PLACEMENT_MAP[placement],
        `gap-${gap}`,
        className
      )}
      style={style}
      {...getClickableProps(onClick)}
    >
      {children}
    </div>
  );
};

/**
 * Grid 기반 레이아웃 컨테이너.
 *
 * 특징:
 * - 내부 grid-template 클래스는 호출부에서 추가 지정
 * - 공통적으로 gap, variant, clickable 처리만 제공
 */
export const Grid = ({ children, variant = 'default', gap = 1, className, style, onClick }: GroupProps) => {
  return (
    <div
      data-group="row"
      className={cn('grid relative tracking-[-0.13rem]', `gap-${gap}`, VARIANT_MAP[variant], className)}
      style={style}
      {...getClickableProps(onClick)}
    >
      {children}
    </div>
  );
};

/**
 * 폼 영역 전용 Row 컨테이너.
 *
 * 특징:
 * - `flex-wrap` 기본 적용으로 반응형 줄바꿈 대응
 * - 라벨/필드 묶음 등 폼 블록 구성에 최적화
 */
export const FormItem = ({
  children,
  placement = 'sc',
  variant = 'default',
  gap = 1,
  className,
  style,
  onClick,
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
      {...getClickableProps(onClick)}
    >
      {children}
    </div>
  );
};

/**
 * 단순 간격/시각 분리용 래퍼.
 * - 기본적으로 y축 미세 이동(`translate-y`) 적용
 */
export const Separator = ({ children, style, onClick }: GroupProps) => {
  return (
    <div className="translate-y-[-.2rem]" style={style} {...getClickableProps(onClick)}>
      {children}
    </div>
  );
};

/** Divider 전용 props */
interface DividerProps {
  /** 선형(default) 또는 점형(dot) 구분 */
  variant?: 'default' | 'dot';
  className?: string;
  /** 선 방향: 세로(col) / 가로(row) */
  dir?: 'col' | 'row';
  /** 색상 토큰 */
  color?: 'gray' | 'gray-light' | 'gray-dark';
}
/**
 * 구분선 컴포넌트.
 *
 * 제공 형태:
 * - default: 1px 선
 * - dot: 점 마커
 */
export const Divider = ({ className, variant = 'default', dir = 'col', color = 'gray' }: DividerProps) => {
  /** 색상 키 -> CSS 변수 매핑 */
  const colorMap: Record<string, string> = {
    gray: 'var(--color-gray-15)',
    'gray-light': 'var(--color-gray-10)',
    'gray-dark': 'var(--color-gray-60)',
  };

  return (
    <span
      className={cn(
        'shrink-0 border-0 inline-block',
        variant === 'default' &&
          (dir === 'col'
            ? `border-[${colorMap[color]}] h-[1rem] w-[0.1rem] border-l`
            : `border-[${colorMap[color]}] h-[0.1rem] w-[1rem] border-t`),
        variant === 'dot' &&
          `block relative w-[0.3rem] h-[100%] flex before:block  before:absolute  before:top-1/2 before:content-[''] before:w-[0.3rem] before:h-[0.3rem] before:shrink-0 
        before:rounded-full  before:bg-[#777]`,
        className
      )}
    />
  );
};

/**
 * 콘텐츠 타이틀 영역 래퍼.
 * - 가로 정렬 between + 가운데 정렬 프리셋 사용
 */
export function ConTit({ children }: { children: React.ReactNode }) {
  return (
    <Grow placement={'bwc'} className="w-full">
      {children}
    </Grow>
  );
}

/**
 * 콘텐츠 타이틀 텍스트 컴포넌트.
 * - heading-md 타이포를 표준으로 강제
 */
export function ConTitName({ children }: { children: React.ReactNode }) {
  return <Typo variant="heading-md">{children}</Typo>;
}
