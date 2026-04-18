import { cn } from '@/shared/lib/shadcn/utils';
import { Grow, Typo } from '@atoms';

interface KeyValueItem {
  key: React.ReactNode;
  value: React.ReactNode;
}

interface KeyValueListProps {
  data: KeyValueItem[];
  className?: string;
}

export const KeyValueList = ({ data, className }: KeyValueListProps) => {
  return (
    <ul className={`flex gap-1 justify-start items-center flex-1 overflow-x-auto ${className}`}>
      {data.map((item, index) => (
        <li
          key={index}
          className="flex flex-row items-center gap-1 after:content-['|'] after:mx-3 after:text-gray-400 last:after:hidden"
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
