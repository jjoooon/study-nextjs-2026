'use client';

import { cn } from '@/shared/lib/shadcn/utils';
import { InfoBoxInfoIcon, InfoBoxWarningIcon, RefIcon } from '../icons';
import { Typo } from '../atoms';

// ─── Types ───────────────────────────────────────────────────────────────────

export type InfoboxVariant = 'info' | 'warning' | 'detail';

export type InfoListItem = {
  text: string;
  /** 아이템 개별 색상 강조 */
  highlight?: boolean;
};

export type InfoBoxProps = {
  variant?: InfoboxVariant;
  title?: string;
  items: InfoListItem[];
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
    showTitle: true,
  },
  warning: {
    wrap: 'bg-[#FFF3F3]',
    titleColor: 'text-[#D92D20]',
    highlightTextColor: 'text-[#D92D20]',
    highlightDotColor: 'before:bg-[#D92D20]',
    icon: <InfoBoxWarningIcon />,
    showTitle: true,
  },
  detail: {
    wrap: 'bg-[#FDF6EC]',
    titleColor: '',
    highlightTextColor: 'text-[#92400E]',
    highlightDotColor: 'before:bg-[#92400E]',
    icon: <RefIcon color='#FF5C2E' />,
    showTitle: true,
  },
} as const;

// ─── InfoBox ──────────────────────────────────────────────────────────────────

export function InfoBox({
  variant = 'info',
  title,
  items,
  className,
}: InfoBoxProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div
      className={cn(
        'rounded-[0.6rem] px-[1.2rem] py-[1rem] flex flex-col gap-1.5',
        config.wrap,
        className
      )}
    >
      {/* 타이틀 */}
      {title && (
        <div className="flex items-center gap-[0.4rem]">
          {config.icon}
          <Typo
            color={'gray'}
            tag={'strong'}
            variant="body-sm"
            weight="bold"
          >
            {title}
          </Typo>
        </div>
      )}

      {/* 목록 */}
      <ul className="flex flex-col gap-[0.2rem]">
        {items.map((item, index) => (
          variant === 'detail' ? (
            <li key={index} className="flex items-center gap-[0.4rem]">
              <span className="shrink-0 flex items-center leading-[150%]" aria-hidden>
                {config.icon}
              </span>
              <span className="text-[1.3rem] leading-[150%] text-[var(--color-text-base,#111827)]">
                {item.text}
              </span>
            </li>
          ) : (
            <li
              key={index}
              className={cn(
                'relative flex  items-start gap-[0.4rem] pl-2',
                'before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2',
                'before:left-0 before:w-[0.2rem] before:h-[0.2rem] before:rounded-full',
                item.highlight
                  ? config.highlightDotColor
                  : 'before:bg-[#6B7280]'
              )}
            >
              <span
                className={cn(
                  'text-[1.3rem] leading-[150%]',
                  item.highlight
                    ? config.highlightTextColor
                    : 'text-[var(--color-text-base,#111827)]'
                )}
              >
                {item.text}
              </span>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}