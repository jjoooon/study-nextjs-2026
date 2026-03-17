/**
 * BulletList Components
 * 
 * @description
 * 목록 아이템을 불릿 마크와 함께 표시하는 컴포넌트 모음
 * 다양한 불릿 타입과 사이즈를 지원하며, 행/열 배치가 가능
 * 
 * @components
 * - **BulletList**: 목록을 감싸는 컨테이너 (ul)
 * - **BulletListItem**: 불릿 마크가 있는 목록 아이템 (li)
 * - **BulletItem**: 불릿 마크가 있는 일반 div (li 대신 div 사용)
 * 
 * @features
 * - 3가지 불릿 타입: dot(원형), hash(#), ref(아이콘)
 * - 3가지 크기 옵션: sm, md, lg
 * - 2가지 배치 옵션: col(세로), row(가로)
 * - 클릭 가능한 hash 타입
 * 
 * @example
 * // 기본 목록 (dot 타입)
 * <BulletList>
 *   <BulletListItem>항목 1</BulletListItem>
 *   <BulletListItem>항목 2</BulletListItem>
 *   <BulletListItem>항목 3</BulletListItem>
 * </BulletList>
 * 
 * // 커스텀 타입과 크기
 * <BulletList position="row">
 *   <BulletListItem type="dot" size="lg">큰 항목</BulletListItem>
 *   <BulletListItem type="dot" size="md">중간 항목</BulletListItem>
 * </BulletList>
 * 
 * // Hash 타입 (클릭 가능)
 * <BulletList>
 *   <BulletListItem type="hash" onClick={() => console.log('clicked')}>
 *     클릭 가능한 항목
 *   </BulletListItem>
 * </BulletList>
 * 
 * @version 1.0.0
 * @since 2026-03-05
 * @lastModified 2026-03-05
 */

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { RefIcon } from '@icons';

interface BulletListProps {
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  position?: 'col' | 'row';
  type?: 'dot' | 'hash' | 'ref';
  className?: string;
  onClick?: () => void;
}

export const BulletList = ({ children, position = 'col', className }: BulletListProps) => {
  return (
    <ul className={cn(position === 'row' ? 'flex flex-row flex-wrap items-center' : 'flex flex-col', className)}>
      {children}
    </ul>
  );
};
export const BulletListItem = ({ children, type = 'dot', size = 'md', className, onClick }: BulletListProps) => {
  // dot 타입에 사이즈별 블릿 크기 적용
  const dotSizeMap = {
    sm: 'pl-[0.6rem] before:top-[0.8rem] before:w-[.2rem] before:h-[.2rem] before:translate-y-[-20%] before:rounded-full before:bg-current tracking-[-0.08rem]',
    md: 'pl-[1rem] before:top-[50%] before:w-[.4rem] before:h-[.4rem] before:translate-y-[-40%] before:rounded-full before:bg-current',
    lg: 'pl-[1rem] before:top-[50%] before:w-[.5rem] before:h-[.5rem] before:translate-y-[-30%] before:rounded-full before:bg-current',
  };
  const bulletStyles = {
    dot: `before:absolute before:left-0 before:content-[''] before:block  ${dotSizeMap[size]}`,
    hash: "before:content-['#'] before:block before:text-[var(--color-blue-gray-50)] before:text-[1.3rem] before:font-bold text-[1.3rem] font-bold flex items-center text-[var(--color-blue-gray-60)]",
    ref: "pl-[1.2rem]",
  };
  const itemSize = {
    sm: 'text-[1.1rem] leading-[1.7rem]',
    md: 'py-[0.4rem] text-[1.3rem]',
    lg: 'py-[0.6rem] text-[1.5rem]',
  }
  return (
    <li
      className={cn(`relative text-[var(--color-secondary-70)]`, bulletStyles[type], itemSize[size], className)}
      {...(type === 'hash' && onClick ? { onClick } : {})}
      style={type === 'hash' && onClick ? { cursor: 'pointer' } : undefined}
    >
      {type === 'ref' && (
        <RefIcon
          className={cn('absolute left-0', size === 'sm' ? 'top-[0.8rem] translate-y-[-40%]' : size === 'md' ? 'top-[0.9rem]' : 'top-[1.2rem]')}
        />
      )}
      {children}
    </li>
  );
};
export const BulletItem = ({ children, type = 'dot', size = 'md', className, onClick }: BulletListProps) => {
  // dot 타입에 사이즈별 블릿 크기 적용
  const dotSizeMap = {
    sm: 'pl-[0.6rem] before:top-[0.8rem] before:w-[.2rem] before:h-[.2rem] before:translate-y-[-20%] before:rounded-full before:bg-current tracking-[-0.08rem]',
    md: 'pl-[1rem] before:top-[50%] before:w-[.4rem] before:h-[.4rem] before:translate-y-[-40%] before:rounded-full before:bg-current',
    lg: 'pl-[1rem] before:top-[50%] before:w-[.5rem] before:h-[.5rem] before:translate-y-[-30%] before:rounded-full before:bg-current',
  };
  const bulletStyles = {
    dot: `before:absolute before:left-0 before:translate-y-[-15%] before:content-[''] before:block  ${dotSizeMap[size]}`,
    hash: "before:content-['#'] before:block before:text-[var(--color-blue-gray-50)] before:text-[1.3rem] before:font-bold text-[1.3rem] font-bold flex items-center text-[var(--color-blue-gray-60)]",
    ref: "pl-[1.2rem]",
  };
  const itemSize = {
    sm: 'text-[1.1rem]',
    md: 'py-[0.4rem] text-[1.3rem]',
    lg: 'py-[0.6rem] text-[1.5rem]',
  }
  return (
    <div
      className={cn(`relative text-[var(--color-secondary-70)]`, bulletStyles[type], itemSize[size], className)}
      {...(type === 'hash' && onClick ? { onClick } : {})}
      style={type === 'hash' && onClick ? { cursor: 'pointer' } : undefined}
    >
      {type === 'ref' && (
        <RefIcon
          className={cn('absolute left-0', size === 'sm' ? 'top-[0.8rem] translate-y-[-40%]' : size === 'md' ? 'top-[0.9rem]' : 'top-[1.2rem]')}
        />
      )}
      {children}
    </div>
  );
};
