import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { DotIcon, RefIcon, StarIcon, DashIcon, HashIcon } from '@icons';

interface BulletListProps {
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xs';
  position?: 'col' | 'row';
  color?: 'default' | 'info' | 'detail' | 'warning';
  type?: 'dot' | 'hash' | 'ref' | 'dash' | 'star' | 'dotBig' | 'symbols';
  className?: string;
  onClick?: () => void;
  dataBefore?: string;
}

export const BulletList = ({ children, position = 'col', className }: BulletListProps) => {
  return (
    <ul className={cn(position === 'row' ? 'flex flex-row flex-wrap items-center' : 'flex flex-col', className)}>
      {children}
    </ul>
  );
};
export const BulletListItem = ({ children, type = 'dot', size = 'md', color = 'default', className, onClick, ...rest }: BulletListProps) => {
  const bulletStyles = {
    dot: '-indent-[0.9rem] ml-[0.9rem]',
    dotBig: '-indent-[1.1rem] ml-[1.1rem]',
    hash: "-indent-[1.2rem] ml-[1.2rem]",
    ref: "-indent-[1.5rem] ml-[1.5rem]",
    dash: "-indent-[1.0rem] ml-[1.0rem]",
    star: "-indent-[1.3rem] ml-[1.3rem]",
    symbols: "symbol-attr",

  };
  const itemSize = {
    lg: 'py-[0.4rem] text-[1.5rem]',
    md: 'py-[0.2rem] text-[1.3rem]',
    sm: 'py-[0.2rem] text-[1.2rem]',
    xs: 'py-[0.2rem] text-[1.1rem]',
  }
   const itemColor = {
    default: 'text-[var(--color-gray-70)]',
    info: 'text-[var(--color-information-50)]',
    detail: 'text-[var(--color-primary-50)]',
    warning: 'text-[var(--color-danger-50)]',
  }
  return (
    <li
      className={cn(
        `relative [counter-increment:dep1]`, 
        itemColor[color], 
        bulletStyles[type], 
        itemSize[size], 
        className)
      }
      
      {...(type === 'hash' && onClick ? { onClick } : {})}
      {...rest}
     
    >
      {type === 'ref' && (
        <RefIcon
          size={10}
          className={cn('inline-flex -translate-y-[0.1rem] mr-[0.5rem]')}
        />
      )}
      {type === 'dot' && (
        <DotIcon
          color={'currentColor'}
          className={cn('inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.4rem]')}
        />
      )}
      {type === 'dotBig' && (
        <DotIcon
          size={8}
          className={cn('inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.2rem]')}
        />
      )}
      {type === 'dash' && (
        <DashIcon
          className={cn('inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.4rem]')}
        />
      )}
      {type === 'star' && (
        <StarIcon
          size={11}
          className={cn('inline-flex -translate-y-[0.15rem] mr-[0.2rem]')}
        />
      )}

      {type === 'hash' && (
        <HashIcon
          className={cn('inline-flex -translate-y-[0.1rem] mr-[0.2rem]')}
          size={10}
        />
      )}
      {children}
    </li>
  );
};




export const BulletItem = ({ children, type = 'dot', size = 'md', color = 'default', className, onClick, ...rest }: BulletListProps) => {
  // dot 타입에 사이즈별 블릿 크기 적용
  const bulletStyles = {
    dot: '-indent-[0.9rem] ml-[0.9rem]',
    dotBig: '-indent-[1.1rem] ml-[1.1rem]',
    hash: "-indent-[1.2rem] ml-[1.2rem]",
    ref: "-indent-[1.5rem] ml-[1.5rem]",
    dash: "-indent-[1.0rem] ml-[1.0rem]",
    star: "-indent-[1.3rem] ml-[1.3rem]",
    symbols: "symbol-attr",
  };
  const itemSize = {
    sm: 'py-[0.2rem] text-[1.1rem]',
    md: 'py-[0.2rem] text-[1.3rem]',
    lg: 'py-[0.4rem] text-[1.5rem]',
    xs: 'py-[0.2rem] text-[1.1rem]',
  }
   const itemColor = {
    default: 'text-[var(--color-gray-70)]',
    info: 'text-[var(--color-information-50)]',
    detail: 'text-[var(--color-primary-50)]',
    warning: 'text-[var(--color-danger-50)]',
  }
  return (
    <div
      className={cn(`relative`, bulletStyles[type], itemSize[size], itemColor[color], className)}
      {...rest}
    >
      {type === 'ref' && (
        <RefIcon
          size={10}
          className={cn('inline-flex -translate-y-[0.1rem] mr-[0.5rem]')}
        />
      )}
      {type === 'dot' && (
        <DotIcon
          color={'currentColor'}
          className={cn('inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.4rem]')}
        />
      )}
      {type === 'dotBig' && (
        <DotIcon
          size={8}
          className={cn('inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.2rem]')}
        />
      )}
      {type === 'dash' && (
        <DashIcon
          className={cn('inline-flex -translate-y-[0.1rem] ml-[0.1rem] mr-[0.4rem]')}
        />
      )}
      {type === 'star' && (
        <StarIcon
          size={11}
          className={cn('inline-flex -translate-y-[0.15rem] mr-[0.2rem]')}
        />
      )}

      {type === 'hash' && (
        <HashIcon
          className={cn('inline-flex -translate-y-[0.1rem] mr-[0.2rem]')}
          size={10}
        />
      )}
      {children}
    </div>
  );
};
