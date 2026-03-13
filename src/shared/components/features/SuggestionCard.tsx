'use client';

import Image from 'next/image';

import { Gcol, Grow, Typo } from '@atoms';
import { AiIcon } from '@icons';
import { cn } from '@/shared/lib/shadcn/utils';

export interface SuggestionCardProps {
  /** 영역 상단 텍스트 */
  title: string;
  /** 카드 타입 */
  type?: 'type1' | 'type2' | 'type3';
  /** 우측 AI 아이콘 노출 여부 */
  showAiIcon?: boolean;
  className?: string;
}

export function SuggestionCard({ type = 'type1', showAiIcon = false, className }: SuggestionCardProps) {
  const cardTypes = {
    type1: {
      icon: '/images/iconImg/pawn01.png',
      title: '회사추전 TOP3',
      bgColor: 'bg-[#9D86FF]',
    },
    type2: {
      icon: '/images/iconImg/pawn02.png',
      title: '담보추전 TOP3',
      bgColor: 'bg-[#86B4FF]',
    },
    type3: {
      icon: '/images/iconImg/pawn03.png',
      title: '보장추전 TOP3',
      bgColor: 'bg-[#00AC82]',
    },
  };

  const { title, icon, bgColor } = cardTypes[type];

  return (
    <Gcol
      placement={'ss'}
      className={cn('w-[28rem] overflow-hidden rounded-[1rem] bg-[var(--color-gray-5)]', className)}
    >
      <Grow className={cn('w-full h-[4rem] items-center justify-between px-[0.9rem]', bgColor)}>
        <Grow className="items-center gap-[0.4rem] text-[var(--color-gray-0)]">
          <Image
            src={icon}
            alt="icon"
            width={24}
            height={24}
            className="inline-flex items-center"
          />
          <Typo tag="strong" variant="body-lg" className="font-bold text-[var(--color-gray-0)]">
            {title}
          </Typo>
        </Grow>
        {showAiIcon ? (
          <span className="inline-flex items-center">
            <AiIcon className="h-[1.2rem] w-[1.2rem]" />
          </span>
        ) : null}
      </Grow>
      <div className="min-h-[22rem] w-full" />
    </Gcol>
  );
}

export default SuggestionCard;