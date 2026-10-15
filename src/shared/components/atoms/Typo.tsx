/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode, createElement, useState, useRef, useCallback } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { InfoBoxWarningIcon, InfoBoxInfoIcon, DotIcon, RefIcon, StarIcon, DashIcon, HashIcon } from '@icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

/**
 * Typo 디자인 토큰(variant/weight/color/icon)을 class-variance-authority로 선언.
 *
 * 운영 관점:
 * - 화면 전체 텍스트 스타일을 토큰으로 표준화해 일관성을 유지한다.
 * - 호출부는 토큰만 선택하면 되므로 스타일 오타/중복을 줄인다.
 * - 신규 타이포 정책은 이 매핑만 보강하면 확장 가능하다.
 */
const typoVariants = cva('', {
  variants: {
    variant: {
      /** 제목 계열(Heading): 섹션/카드 타이틀 */
      'heading-xl': 'heading-xl block text-[1.8rem] font-bold leading-[normal] tracking-[-0.08rem]',
      'heading-lg': 'heading-lg block text-[1.6rem] font-bold leading-[normal] tracking-[-0.08rem]',
      'heading-md': 'heading-md block text-[1.4rem] font-bold leading-[normal] tracking-[-0.08rem]',
      'heading-sm': 'heading-sm block text-[1.3rem] font-bold leading-[normal] tracking-[-0.08rem]',
      'heading-xs': 'heading-xs block text-[1.1rem] font-normal leading-[normal] tracking-[-0.08rem]',

      /** 본문 계열(Body): 일반 텍스트/라벨 */
      'body-xl': 'body-xl text-[1.5rem] leading-[normal] tracking-[-0.13rem]',
      'body-lg': 'body-lg text-[1.4rem] leading-[normal] tracking-[-0.13rem]',
      'body-md': 'body-md text-[1.3rem] leading-[normal] tracking-[-0.13rem]',
      'body-sm': 'body-sm text-[1.2rem] leading-[normal] tracking-[-0.13rem]',
      'body-xs': 'body-xs text-[1.1rem] leading-[normal] tracking-[-0.13rem]',

      /** 버튼 계열(Button): CTA/보조 버튼 텍스트 */
      'button-lg': 'button-lg text-[1.4rem] leading-[normal] tracking-[-0.13rem]',
      'button-md': 'button-md text-[1.3rem] leading-[normal] tracking-[-0.13rem]',
      'button-sm': 'button-sm text-[1.2rem] leading-[normal] tracking-[-0.13rem]',
      'button-xs': 'button-xs text-[1.1rem] leading-[normal] tracking-[-0.13rem]',

      /** 금액 강조 계열 */
      'amount-lg':
        'block text-[1.5rem] font-bold leading-[normal] tracking-[-0.08rem] underline underline-offset-[0.3rem]',
      'amount-md':
        'block text-[1.3rem] font-bold leading-[normal] tracking-[-0.08rem] underline underline-offset-[0.3rem]',
      'amount-sm':
        'block text-[1.2rem] font-bold leading-[normal] tracking-[-0.08rem] underline underline-offset-[0.3rem]',
      'amount-xs':
        'block text-[1.1rem] font-bold leading-[normal] tracking-[-0.08rem] underline underline-offset-[0.3rem]',
    },

    /** 아이콘 토큰 (실제 렌더링은 하단 분기에서 처리) */
    icon: {
      info: 'InfoBoxInfoIcon',
      warning: 'InfoBoxWarningIcon',
      detail: 'RefIcon',
      dot: 'DotIcon',
      hash: 'HashIcon',
      ref: 'RefIcon',
      dash: 'DashIcon',
      star: 'StarIcon',
      dotBig: 'DotBigIcon',
    },

    /** 폰트 굵기 토큰 */
    weight: {
      normal: 'font-normal!',
      bold: 'font-bold!',
      semibold: 'font-semibold!',
    },

    /** 텍스트 컬러 토큰 */
    color: {
      default: 'text-[var(--color-gray-100)]',
      'gray-light': 'text-[var(--color-gray-50)]',
      gray: 'text-[var(--color-gray-70)]',
      blueGray: 'text-[var(--color-blue-gray-50)]',
      danger: 'text-[var(--color-danger-50)]',
      primary: 'text-[var(--color-primary-50)]',
      secondary: 'text-[var(--color-secondary-50)]',
      information: 'text-[var(--color-information-50)]',
      green: 'text-[var(--color-success-50)]',
    },
  },
  defaultVariants: {
    /** 운영 기본값: 본문 중간 크기 + 기본색 */
    variant: 'body-md',
    color: 'default',
  },
});

/**
 * `typoVariants`에서 파생된 타입 + Typo 확장 props.
 */
interface TypoProps extends VariantProps<typeof typoVariants> {
  /**
   * 동적 태그명 (HTML element tag)
   * - 렌더링될 실제 HTML 태그를 지정합니다. (예: 'span', 'p', 'strong', 'h1', 'div' 등)
   * @default 'span'
   */
  tag?: string;
  /**
   * 텍스트 영역 내부에 들어갈 콘텐츠
   */
  children?: ReactNode;
  /**
   * 추가적인 CSS 클래스명
   */
  className?: string;
  /**
   * 텍스트 앞머리에 렌더링할 아이콘 타입
   * - info: 파란색 안내 느낌표 아이콘
   * - warning: 빨간색 경고 삼각형 아이콘
   * - detail: 세부 정보 화살표 아이콘
   * - dot: 기본 글머리 점 아이콘
   * - hash: 샵(#) 모양 아이콘
   * - ref: 참조용 별표/화살표 아이콘
   * - dash: 하이픈(-) 글머리 아이콘
   * - star: 빨간색 필수입력 별표(*) 아이콘
   * - dotBig: 큰 글머리 점 아이콘
   */
  icon?: 'info' | 'warning' | 'detail' | 'dot' | 'hash' | 'ref' | 'dash' | 'star' | 'dotBig';
  /**
   * 커스텀 인라인 스타일 객체
   */
  style?: React.CSSProperties;
  /**
   * 말줄임 줄 수 및 마우스 호버 시 전체 내용 툴팁 노출 여부
   * - '1' 또는 1: 1줄 말줄임(line-clamp-1) 후 호버 시 전체 내용 툴팁 표시
   * - '2' 또는 2: 2줄 말줄임(line-clamp-2) 후 호버 시 전체 내용 툴팁 표시
   */
  tooltip?: '1' | '2' | 1 | 2;
  /**
   * 툴팁에 별도로 표시할 콘텐츠 (미지정 시 children 전체 내용 표시)
   */
  tooltipContent?: ReactNode;
  /**
   * 툴팁 표시 위치
   * @default 'top'
   */
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * 툴팁 트리거와의 간격
   */
  tooltipSideOffset?: number;
}

/**
 * 말줄임(overflow)이 실제로 발생했을 때만 툴팁을 표시하는 내부 컴포넌트.
 */
interface TypoWithTooltipProps extends TypoProps {
  effectiveColor?: string;
  iconNode: ReactNode;
  indentClass: string;
}

const TypoWithTooltip = ({
  tag = 'span',
  variant,
  weight,
  children,
  className,
  style,
  tooltip,
  tooltipContent,
  tooltipSide = 'top',
  tooltipSideOffset,
  effectiveColor,
  iconNode,
  indentClass,
}: TypoWithTooltipProps) => {
  const [open, setOpen] = useState(false);
  const textRef = useRef<HTMLElement | null>(null);

  /** tooltip 옵션에 따른 말줄임(line-clamp) 스타일 */
  const tooltipClass =
    tooltip === '1' || tooltip === 1
      ? 'min-w-0 line-clamp-1 break-all'
      : tooltip === '2' || tooltip === 2
        ? 'min-w-0 line-clamp-2 break-all'
        : '';

  /** 실제 텍스트가 잘렸는지(말줄임이 발생했는지) 감지 */
  const checkOverflow = useCallback(() => {
    const el = textRef.current;
    if (!el) return false;
    // 수평 또는 수직 오버플로우 감지 (서브픽셀 렌더링 오차 방지를 위해 1px 여유)
    return el.scrollHeight - el.clientHeight > 1 || el.scrollWidth - el.clientWidth > 1;
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      if (checkOverflow()) {
        setOpen(true);
        return;
      }
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  /** 본문 텍스트 요소 생성 */
  const typoElement = createElement(
    tag,
    {
      ref: textRef,
      className: cn(typoVariants({ variant, weight, color: effectiveColor }), indentClass, tooltipClass, className),
      style,
      onMouseEnter: () => {
        if (!checkOverflow()) {
          setOpen(false);
        }
      },
    },
    <>
      {iconNode}
      {children}
    </>
  );

  return (
    <Tooltip open={open} onOpenChange={handleOpenChange}>
      <TooltipTrigger asChild>{typoElement}</TooltipTrigger>
      <TooltipContent side={tooltipSide} sideOffset={tooltipSideOffset} variant="default">
        {tooltipContent ?? children}
      </TooltipContent>
    </Tooltip>
  );
};

/**
 * 공통 타이포 컴포넌트.
 *
 * 역할:
 * - 디자인 토큰 기반 텍스트 스타일 적용
 * - 아이콘 + 들여쓰기(indent) 패턴 일괄 제공
 * - 1줄/2줄 말줄임 발생 시에만 호버 시 전체 내용을 보여주는 툴팁 기능 제공
 * - `createElement`를 통해 동적 태그 렌더링
 */
export const Typo = ({
  tag = 'span',
  variant,
  weight,
  color,
  children,
  className,
  icon,
  style,
  tooltip,
  tooltipContent,
  tooltipSide = 'top',
  tooltipSideOffset,
}: TypoProps) => {
  /** 선택된 icon 토큰에 대응하는 실제 아이콘 노드 */
  let IconComponent: ReactNode = null;
  const iconSize = variant === 'heading-lg' ? 20 : 16;

  if (icon === 'info')
    IconComponent = (
      <InfoBoxInfoIcon
        className="inline-flex -translate-y-[0.2rem] mr-1"
        color="var(--color-information-50)"
        size={iconSize}
      />
    );
  if (icon === 'warning')
    IconComponent = (
      <InfoBoxWarningIcon
        className="inline-flex -translate-y-[0.1rem] mr-1"
        color="var(--color-danger-50)"
        size={iconSize}
      />
    );
  if (icon === 'detail')
    IconComponent = (
      <RefIcon className="inline-flex -translate-y-[0.1rem] mr-1" color="var(--color-primary-50)" size={10} />
    );

  if (icon === 'ref') IconComponent = <RefIcon className="inline-flex -translate-y-[0.1rem] mr-1" size={10} />;
  if (icon === 'dot') IconComponent = <DotIcon className="inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-1" />;
  if (icon === 'dotBig')
    IconComponent = <DotIcon className="inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.5rem]" size={10} />;
  if (icon === 'hash') IconComponent = <HashIcon className="inline-flex -translate-y-[0.1rem]" size={4} />;
  if (icon === 'dash')
    IconComponent = <DashIcon className="inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.4rem]" size={4} />;
  if (icon === 'star') IconComponent = <StarIcon className="inline-flex -translate-y-[0.15rem] mr-1" size={10} />;

  /**
   * 아이콘 종류별 들여쓰기/강조 규칙.
   * - 아이콘 존재 시 텍스트 시작점 정렬
   * - info/warning/detail은 `em` 강조 색과 굵기를 표준화
   */
  const indentStyle = {
    info: 'inline-block relative -indent-[2rem] ml-[2rem] [&>em]:text-[var(--color-information-50)] [&>em]:font-bold [&>em]:not-italic!',
    warning:
      'inline-block relative -indent-[2rem] ml-[2rem] [&>em]:text-[var(--color-danger-50)] [&>em]:font-bold [&>em]:not-italic!',
    detail:
      'inline-block relative -indent-[1.4rem] ml-[1.4rem] [&>em]:text-[var(--color-primary-50)] [&>em]:font-bold [&>em]:not-italic!',
    dot: 'inline-block relative -indent-[0.9rem] ml-[0.9rem]',
    dotBig: 'inline-block relative -indent-[1.2rem] ml-[1.2rem]',
    hash: 'inline-block relative -indent-[1.4rem] ml-[1.4rem]',
    dash: 'inline-block relative -indent-[1rem] ml-[1rem]',
    star: 'inline-block relative -indent-[1.4rem] ml-[1.4rem]',
    ref: 'inline-block relative -indent-[1.4rem] ml-[1.4rem]',
  };

  /** info/warning/detail 의 기본색은 gray 이지만, color Prop이 명시되면 해당 color 가 우선 */
  const effectiveColor = color ?? (icon === 'info' || icon === 'warning' || icon === 'detail' ? 'gray' : undefined);
  const indentClass = icon ? indentStyle[icon] : '';

  /** tooltip prop이 지정된 경우 말줄임 오버플로우 감지 툴팁 컴포넌트 렌더링 */
  if (tooltip && (tooltipContent !== undefined ? tooltipContent : children)) {
    return (
      <TypoWithTooltip
        tag={tag}
        variant={variant}
        weight={weight}
        color={color}
        className={className}
        style={style}
        tooltip={tooltip}
        tooltipContent={tooltipContent}
        tooltipSide={tooltipSide}
        tooltipSideOffset={tooltipSideOffset}
        effectiveColor={effectiveColor}
        iconNode={IconComponent}
        indentClass={indentClass}
      >
        {children}
      </TypoWithTooltip>
    );
  }

  /** 기본 렌더: variants + 아이콘 들여쓰기 + 외부 className 병합 */
  return createElement(
    tag,
    {
      className: cn(typoVariants({ variant, weight, color: effectiveColor }), indentClass, className),
      style,
    },
    <>
      {IconComponent}
      {children}
    </>
  );
};
