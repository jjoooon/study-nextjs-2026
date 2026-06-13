/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { DotIcon, RefIcon, StarIcon, DashIcon, HashIcon } from '@icons';
import { ReactNode, HTMLAttributes, createContext, useContext } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

/**
 * 불릿 마커 종류.
 * - `symbols`는 아이콘 대신 `before` 문자열을 직접 출력할 때 사용.
 */
type BulletType = 'dot' | 'hash' | 'ref' | 'dash' | 'star' | 'dotBig' | 'symbols';
/** 텍스트/아이콘 크기 토큰 */
type BulletSize = 'sm' | 'md' | 'lg' | 'xs';
/** 텍스트 색상 토큰 */
type BulletColor = 'default' | 'info' | 'detail' | 'warning';

/**
 * `BulletList` → `BulletListItem`으로 기본값을 전달하기 위한 컨텍스트 값.
 */
interface BulletListContextValue {
  type?: BulletType;
  size?: BulletSize;
  color?: BulletColor;
}

/**
 * 리스트 단위 기본 토큰 제공 컨텍스트.
 * 호출부에서 `BulletListItem`마다 중복 지정하지 않도록 한다.
 */
const BulletListContext = createContext<BulletListContextValue>({});
const useBulletListContext = () => useContext(BulletListContext);

/**
 * `BulletList` props.
 *
 * 주의:
 * - HTML 기본 props는 `li` 기준으로 확장되어 있으나 실제 루트는 `ul` 렌더링이다.
 * - 현재 구현에서는 `children/type/size/color/position/className` 중심으로 사용된다.
 */
interface BulletListProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  size?: BulletSize;
  position?: 'col' | 'row';
  color?: BulletColor;
  type?: BulletType;
  className?: string;
  before?: string;

  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

/** `BulletItem`(단일 아이템 전용) props */
interface BulletItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  size?: BulletSize;
  color?: BulletColor;
  type?: BulletType;
  className?: string;
  before?: string;
}

/** 아이템별 텍스트 크기/행간 토큰 */
const itemSize = {
  lg: 'py-[0.2rem] text-[1.5rem] leading-[2rem]',
  md: 'py-[0.1rem] text-[1.3rem] leading-[1.8rem]',
  sm: 'py-[0.1rem] text-[1.2rem] leading-[1.6rem]',
  xs: 'py-[0.1rem] text-[1.1rem] leading-[1.4rem]',
};

/** 아이콘 컨테이너 높이/정렬 토큰 */
const itemHeight = {
  lg: 'h-[2.2rem] leading-[2rem]',
  md: 'h-[2rem] leading-[1.8rem]',
  sm: 'h-[1.8rem] leading-[1.6rem]',
  xs: 'h-[1.6rem] leading-[1.4rem]',
};

/**
 * 불릿 타입별 아이콘 슬롯 너비.
 * - 마커 폭이 달라도 본문 시작선이 최대한 일정하도록 사용.
 */
const bulletStyles = {
  dot: `w-[0.6rem]`,
  dotBig: `w-[0.6rem]`,
  hash: `w-[1rem]`,
  ref: `w-[1rem]`,
  dash: `w-[0.8rem]`,
  star: `w-[1.1rem]`,
  symbols: `w-[1.4rem]`,
};

/** 색상 토큰 -> 텍스트 클래스 매핑 */
const itemColor = {
  default: 'text-[var(--color-gray-70)]',
  info: 'text-[var(--color-information-50)]',
  detail: 'text-[var(--color-primary-50)]',
  warning: 'text-[var(--color-danger-50)]',
};

/**
 * 불릿 리스트 컨테이너.
 *
 * 역할:
 * - 리스트 방향(row/col) 레이아웃 제공
 * - 기본 `type/size/color`를 하위 아이템에 컨텍스트로 전달
 * - 컬러별 `em` 강조 규칙(색/굵기) 공통 적용
 */
export const BulletList = ({
  children,
  type = 'dot',
  size = 'md',
  color,
  position = 'col',
  className,
}: BulletListProps) => {
  return (
    <BulletListContext.Provider value={{ type, size, color }}>
      <ul
        className={cn(
          position === 'row' ? 'flex flex-row flex-wrap items-center' : 'flex flex-col',
          color === 'warning'
            ? '[&>li_em]:text-[var(--color-danger-50)] [&>li_em]:font-bold [&>li_em]:not-italic!'
            : '',
          color === 'detail'
            ? '[&>li_em]:text-[var(--color-primary-50)] [&>li_em]:font-bold [&>li_em]:not-italic!'
            : '',
          color === 'info'
            ? '[&>li_em]:text-[var(--color-information-50)] [&>li_em]:font-bold [&>li_em]:not-italic!'
            : '',
          className
        )}
      >
        {children}
      </ul>
    </BulletListContext.Provider>
  );
};

/**
 * 리스트 아이템(`li`) 컴포넌트.
 *
 * 특징:
 * - `BulletList` 컨텍스트 기본값 사용 가능
 * - 클릭 시 키보드 접근성(Enter/Space) 지원
 * - 불릿 타입별 아이콘/문자열 마커 렌더링
 */
export const BulletListItem = ({
  children,
  type,
  size,
  color,
  className,
  before,
  onClick,
  onKeyDown,
  ...rest
}: BulletListProps) => {
  const context = useBulletListContext();
  /** 개별 props가 있으면 우선, 없으면 상위 컨텍스트 기본값 사용 */
  const resolvedType = type ?? context.type ?? 'dot';
  const resolvedSize = size ?? context.size ?? 'md';
  /** 현재 구현은 아이템 color 미지정 시 `default`로 고정 (컨텍스트 color 미사용) */
  const resolvedColor = color ?? 'default';

  return (
    <li
      className={cn(
        `relative flex justify-start items-start gap-[0.2rem] w-full ${onClick ? 'cursor-pointer' : ''}`,
        itemColor[resolvedColor],
        itemSize[resolvedSize],
        className
      )}
      onClick={onClick}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        // 클릭 핸들러가 있을 때만 키보드로 click 에뮬레이션
        if (!onClick || event.defaultPrevented) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick(event as unknown as React.MouseEvent<HTMLLIElement>);
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      <div
        className={cn(
          'flex items-center justify-center shrink-0',
          itemColor[resolvedColor],
          itemHeight[resolvedSize],
          // bulletStyles[resolvedType],
          resolvedType === 'symbols' && '-translate-y-[0.2rem] leading-[1.5]'
        )}
      >
        {resolvedType === 'ref' && <RefIcon size={10} />}
        {resolvedType === 'dot' && <DotIcon size={6} />}
        {resolvedType === 'dotBig' && <DotIcon size={9} />}
        {resolvedType === 'dash' && <DashIcon size={8} />}
        {resolvedType === 'star' && (
          <StarIcon size={11} className={resolvedSize === 'xs' ? '-translate-y-[0.2rem]' : undefined} />
        )}
        {resolvedType === 'hash' && <HashIcon size={10} />}
        {resolvedType === 'symbols' && before}
      </div>
      <div className="flex-1 tracking-[-0.06rem] w-full">{children}</div>
    </li>
  );
};

/**
 * 단일 아이템 렌더러.
 * - 컨텍스트 없이 독립적으로 불릿+텍스트 한 줄을 구성할 때 사용.
 */
export const BulletItem = ({
  children,
  type = 'dot',
  size = 'md',
  color = 'default',
  onClick,
  onKeyDown,
  className,
  before,
  ...rest
}: BulletItemProps) => {
  return (
    <div
      className={cn(
        `relative flex justify-start items-start gap-[0.2rem] ${onClick ? 'cursor-pointer' : ''}`,
        itemSize[size],
        itemColor[color],
        className
      )}
      onClick={onClick}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        // 클릭 핸들러가 있을 때만 키보드로 click 에뮬레이션
        if (!onClick || event.defaultPrevented) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      <div className={cn('flex items-center justify-center shrink-0', itemHeight[size], bulletStyles[type])}>
        {type === 'ref' && <RefIcon size={10} />}
        {type === 'dot' && <DotIcon size={6} />}
        {type === 'dotBig' && <DotIcon size={9} />}
        {type === 'dash' && <DashIcon size={8} />}
        {type === 'star' && <StarIcon size={11} />}
        {type === 'hash' && <HashIcon size={10} />}
        {type === 'symbols' && before}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
