'use client';

import { Typo, Grow, Gcol } from '@atoms';
import { InfoBoxInfoIcon, InfoBoxWarningIcon, RefIcon } from '@icons';
import { cn } from '@/shared/lib/shadcn/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export type InfoboxVariant = 'info' | 'warning' | 'detail';

export type InfoListItem = {
  text: string;
  /** 아이템 개별 색상 강조 */
  highlight?: boolean;
  /** 아이템에 추가로 적용할 클래스 이름 */
  className?: string;
};

export type InfoBoxProps = {
  variant?: InfoboxVariant;
  bg?: boolean;
  title?: string;
  subTitle?: string;
  items?: InfoListItem[];
  children?: React.ReactNode;
  className?: string;
};

// ─── Variant Config ───────────────────────────────────────────────────────────

const VARIANT_CONFIG = {
  info: {
    wrap: 'bg-[#EBF4FF]',
    titleColor: 'text-[#006FF2]',
    highlightTextColor: 'text-[#006FF2]',
    highlightDotColor: 'before:bg-[#006FF2]',
    icon: <InfoBoxInfoIcon />,
  },
  warning: {
    wrap: 'bg-[#FFF3F3]',
    titleColor: 'text-[#D92D20]',
    highlightTextColor: 'text-[#D92D20]',
    highlightDotColor: 'before:bg-[#D92D20]',
    icon: <InfoBoxWarningIcon />,
  },
  detail: {
    wrap: 'bg-[#FDF6EC]',
    titleColor: '',
    highlightTextColor: 'text-[#92400E]',
    highlightDotColor: 'before:bg-[#92400E]',
    icon: <RefIcon color="#FF5C2E" />,
  },
} as const;

// ─── InfoBox ──────────────────────────────────────────────────────────────────

export function InfoBox({ variant = 'info', bg = true, title, subTitle, items, children, className }: InfoBoxProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <Gcol gap={1.5} placement="ss" className={cn('rounded-[0.6rem] px-2.5 py-2 w-full', bg && config.wrap, className)}>
      {/* 타이틀 */}
      <Grow gap={1}>
        {(title || subTitle) && config.icon}
        {title && (
          <Typo
            color={'gray'}
            tag={'strong'}
            variant={'body-sm'}
            weight={'bold'}
            className={cn('flex gap-1 items-center')}
          >
            {title}
          </Typo>
        )}
        {subTitle && (
          <Typo color={'gray'} tag={'strong'} variant={'body-sm'} weight={'normal'}>
            {subTitle}
          </Typo>
        )}
      </Grow>

      {/* 목록 - children 우선, 없으면 items 기본 렌더링 */}
      {children ??
        (items && (
          <ul className="flex flex-col gap-[0.2rem]">
            {items.map((item, index) =>
              variant === 'detail' ? (
                <li key={index} className="flex items-center gap-[0.4rem]">
                  <span className="shrink-0 flex items-center leading-[150%]" aria-hidden>
                    {config.icon}
                  </span>
                  <span className={cn('text-[1.3rem] leading-[150%] text-(--color-text-base,#111827)', item.className)}>
                    {item.text}
                  </span>
                </li>
              ) : (
                <li
                  key={index}
                  className={cn(
                    'relative flex items-start gap-[0.4rem] pl-2',
                    'before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2',
                    'before:left-0 before:w-[0.2rem] before:h-[0.2rem] before:rounded-full',
                    item.highlight ? config.highlightDotColor : 'before:bg-[#6B7280]'
                  )}
                >
                  <Typo
                    color={'gray'}
                    tag={'span'}
                    variant="body-sm"
                    weight="normal"
                    className={cn(item.highlight ? config.highlightTextColor : 'text-[#414141]', item.className)}
                  >
                    {item.text}
                  </Typo>
                </li>
              )
            )}
          </ul>
        ))}
    </Gcol>
  );
}
