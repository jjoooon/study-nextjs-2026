/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import { Grow, Typo } from '@atoms';
import { cn } from '@/shared/lib/shadcn/utils';

interface KeyValueItem {
  key: React.ReactNode;
  value: React.ReactNode;
}

type KeyValueListVariant = 'default' | 'amount';
type KeyValueListDirection = 'row' | 'col';

interface KeyValueListProps {
  data: KeyValueItem[];
  className?: string;
  variant?: KeyValueListVariant;
  direction?: KeyValueListDirection; // row(default) | col
}

export const KeyValueList = ({ data, className, variant = 'default', direction = 'row' }: KeyValueListProps) => {
  // direction: row (default) | col
  const isRow = direction === 'row';

  if (variant === 'amount') {
    return (
      <dl
        className={`flex ${isRow ? 'flex-row flex-wrap gap-x-6 gap-y-[0.2rem]' : 'flex-col gap-y-[0.2rem]'} ${className}`}
      >
        {data.map((item, index) => (
          <div key={index} className={`grid grid-cols-[auto_1fr] gap-4`}>
            <dt className="text-[1.3rem] font-bold whitespace-nowrap">{item.key}</dt>
            <dd className="text-[1.2rem] text-[var(--color-gray-70)] whitespace-nowrap text-right">{item.value}</dd>
          </div>
        ))}
      </dl>
    );
  }
  // default variant
  return (
    <ul
      className={`flex ${isRow ? 'flex-row gap-1 items-center' : 'flex-col gap-y-2'} justify-start flex-1 overflow-x-auto ${className}`}
    >
      {data.map((item, index) => (
        <li
          key={index}
          className={`flex flex-row items-center gap-1 ${isRow ? "after:content-['|'] after:mx-3 after:text-gray-400 last:after:hidden" : ''}`}
        >
          <span className="text-[1.4rem] whitespace-nowrap">{item.key}</span>
          <b className="text-[1.8rem] font-bold whitespace-nowrap">{item.value}</b>
        </li>
      ))}
    </ul>
  );
};

interface KeyValueItemProps {
  label: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'info' | 'error';
}

export const KeyValueItem = ({ label, children, className, variant = 'default' }: KeyValueItemProps) => {
  const variantStyles = {
    default: '',
    info: '[&>div]:text-[1.3rem] [&>div]:text-[var(--color-gray-70)] flex gap-2 items-center [&>div+div]:text-[var(--color-gray-100)] [&>div+div]:font-bold',
    error: 'text-[var(--color-text-danger)]',
  };
  return (
    <Grow className={cn(className, variantStyles[variant])}>
      <Typo tag="div">{label}</Typo>
      <Grow>{children}</Grow>
    </Grow>
  );
};
