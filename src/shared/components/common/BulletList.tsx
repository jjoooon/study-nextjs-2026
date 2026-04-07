import { ReactNode, HTMLAttributes, createContext, useContext } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow } from '@atoms';
import { DotIcon, RefIcon, StarIcon, DashIcon, HashIcon } from '@icons';

type BulletType = 'dot' | 'hash' | 'ref' | 'dash' | 'star' | 'dotBig' | 'symbols';
type BulletSize = 'sm' | 'md' | 'lg' | 'xs';
type BulletColor = 'default' | 'info' | 'detail' | 'warning';

interface BulletListContextValue {
  type?: BulletType;
  size?: BulletSize;
  color?: BulletColor;
}

const BulletListContext = createContext<BulletListContextValue>({});
const useBulletListContext = () => useContext(BulletListContext);

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
interface BulletItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  size?: BulletSize;
  color?: BulletColor;
  type?: BulletType;
  className?: string;
  before?: string;
}
const itemSize = {
  lg: 'py-[0.2rem] text-[1.5rem] leading-[2rem]',
  md: 'py-[0.1rem] text-[1.3rem] leading-[1.8rem]',
  sm: 'py-[0.1rem] text-[1.2rem] leading-[1.6rem]',
  xs: 'py-[0.1rem] text-[1.1rem] leading-[1.4rem]',
};
const itemHeight = {
  lg: 'h-[2.2rem] leading-[2rem]',
  md: 'h-[2rem] leading-[1.8rem]',
  sm: 'h-[1.8rem] leading-[1.6rem]',
  xs: 'h-[1.6rem] leading-[1.4rem]',
};
const bulletStyles = {
  dot: `w-[0.6rem]`,
  dotBig: `w-[0.6rem]`,
  hash: `w-[1rem]`,
  ref: `w-[1rem]`,
  dash: `w-[0.8rem]`,
  star: `w-[1.1rem]`,
  symbols: `w-[1.4rem]`,
};
const itemColor = {
  default: 'text-[var(--color-gray-70)]',
  info: 'text-[var(--color-information-50)]',
  detail: 'text-[var(--color-primary-50)]',
  warning: 'text-[var(--color-danger-50)]',
};
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

export const BulletListItem = ({
  children,
  type,
  size,
  color,
  className,
  before,
  onClick,
  ...rest
}: BulletListProps) => {
  const context = useBulletListContext();
  const resolvedType = type ?? context.type ?? 'dot';
  const resolvedSize = size ?? context.size ?? 'md';
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
      {...rest}
    >
      <div
        className={cn(
          'flex items-center justify-center shrink-0',
          itemHeight[resolvedSize],
          bulletStyles[resolvedType]
        )}
      >
        {resolvedType === 'ref' && <RefIcon size={10} />}
        {resolvedType === 'dot' && <DotIcon size={3} />}
        {resolvedType === 'dotBig' && <DotIcon size={8} />}
        {resolvedType === 'dash' && <DashIcon size={8} />}
        {resolvedType === 'star' && <StarIcon size={11} />}
        {resolvedType === 'hash' && <HashIcon size={10} />}
        {resolvedType === 'symbols' && before}
      </div>
      <div className="flex-1 tracking-[-0.13rem]">{children}</div>
    </li>
  );
};

export const BulletItem = ({
  children,
  type = 'dot',
  size = 'md',
  color = 'default',
  onClick,
  className,
  before,
  ...rest
}: BulletItemProps) => {
  return (
    <div
      className={cn(
        `relative flex justify-start items-start gap-[0.2rem] ${onClick ? 'cursor-pointer' : ''}`,
        bulletStyles[type],
        itemSize[size],
        itemColor[color],
        className
      )}
      onClick={onClick}
    >
      <div className={cn('flex items-center justify-center shrink-0', itemHeight[size], bulletStyles[type])}>
        {type === 'ref' && <RefIcon size={10} />}
        {type === 'dot' && <DotIcon size={3} />}
        {type === 'dotBig' && <DotIcon size={8} />}
        {type === 'dash' && <DashIcon size={8} />}
        {type === 'star' && <StarIcon size={11} />}
        {type === 'hash' && <HashIcon size={10} />}
        {type === 'symbols' && before}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
