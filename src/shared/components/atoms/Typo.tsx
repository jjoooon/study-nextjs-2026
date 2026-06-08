/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { InfoBoxWarningIcon, InfoBoxInfoIcon, DotIcon, RefIcon, StarIcon, DashIcon, HashIcon } from '@icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode, createElement } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

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
      'amount-md':
        'block text-[1.4rem] font-bold leading-[normal] tracking-[-0.08rem] underline underline-offset-[0.3rem]',
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
  /** 동적 태그명(`span`, `p`, `strong` 등) */
  tag?: string;
  children?: ReactNode;
  className?: string;
  /** 앞머리 아이콘 타입 */
  icon?: 'info' | 'warning' | 'detail' | 'dot' | 'hash' | 'ref' | 'dash' | 'star' | 'dotBig';
  style?: React.CSSProperties;
}

/**
 * 공통 타이포 컴포넌트.
 *
 * 역할:
 * - 디자인 토큰 기반 텍스트 스타일 적용
 * - 아이콘 + 들여쓰기(indent) 패턴 일괄 제공
 * - `createElement`를 통해 동적 태그 렌더링
 */
export const Typo = ({ tag = 'span', variant, weight, color, children, className, icon, style }: TypoProps) => {
  /** 선택된 icon 토큰에 대응하는 실제 아이콘 노드 */
  let IconComponent: ReactNode = null;

  if (icon === 'info')
    IconComponent = (
      <InfoBoxInfoIcon
        className="inline-flex -translate-y-[0.1rem] mr-1"
        color="var(--color-information-50)"
        size={16}
      />
    );
  if (icon === 'warning')
    IconComponent = (
      <InfoBoxWarningIcon className="inline-flex -translate-y-[0.1rem] mr-1" color="var(--color-danger-50)" size={16} />
    );
  if (icon === 'detail')
    IconComponent = (
      <RefIcon className="inline-flex -translate-y-[0.1rem] mr-1" color="var(--color-primary-50)" size={10} />
    );

  if (icon === 'ref') IconComponent = <RefIcon className="inline-flex -translate-y-[0.1rem] mr-1" size={10} />;
  if (icon === 'dot') IconComponent = <DotIcon className="inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-1" />;
  if (icon === 'dotBig')
    IconComponent = <DotIcon className="inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.5rem]" size={10} />;
  if (icon === 'hash') IconComponent = <HashIcon className="inline-flex -translate-y-[0.1rem]" size={10} />;
  if (icon === 'dash')
    IconComponent = <DashIcon className="inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.5rem]" size={10} />;
  if (icon === 'star') IconComponent = <StarIcon className="inline-flex -translate-y-[0.15rem] mr-1" size={10} />;

  /**
   * 아이콘 종류별 들여쓰기/강조 규칙.
   * - 아이콘 존재 시 텍스트 시작점 정렬
   * - info/warning/detail은 `em` 강조 색과 굵기를 표준화
   */
  const indentStyle = {
    info: 'inline-block relative -indent-[2rem] ml-[2rem] text-[var(--color-gray-70)] [&>em]:text-[var(--color-information-50)] [&>em]:font-bold [&>em]:not-italic!',
    warning:
      'inline-block relative -indent-[2rem] ml-[2rem] text-[var(--color-gray-70)] [&>em]:text-[var(--color-danger-50)] [&>em]:font-bold [&>em]:not-italic!',
    detail:
      'inline-block relative -indent-[1.4rem] ml-[1.4rem] text-[var(--color-gray-70)] [&>em]:text-[var(--color-primary-50)] [&>em]:font-bold [&>em]:not-italic!',
    dot: 'inline-block relative -indent-[0.9rem] ml-[0.9rem]',
    dotBig: 'inline-block relative -indent-[1.2rem] ml-[1.2rem]',
    hash: 'inline-block relative -indent-[1.4rem] ml-[1.4rem]',
    dash: 'inline-block relative -indent-[1.6rem] ml-[1.6rem]',
    star: 'inline-block relative -indent-[1.4rem] ml-[1.4rem]',
    ref: 'inline-block relative -indent-[1.4rem] ml-[1.4rem]',
  };

  /** 최종 렌더: variants + 아이콘 들여쓰기 + 외부 className 병합 */
  return createElement(
    tag,
    {
      className: cn(typoVariants({ variant, weight, color }), icon ? indentStyle[icon] : '', className),
      style,
    },
    <>
      {IconComponent}
      {children}
    </>
  );
};
