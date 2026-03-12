'use client';

/**
 * InsuranceProductCard Component
 *
 * 보험 상품 목록 카드 아이템 컴포넌트
 *
 * @description
 * - 오른쪽 상단 FlagCheckDoutoneIcon 에 순위 번호 표시
 * - 인수가능/불가 상태 배지
 * - 체크박스 선택
 * - 상품 특징 불릿 리스트
 * - 추천 화법 버튼
 */

import { Divider, Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { CircleCheckIcon, FlagCheckDoutoneIcon, SpeechBubbleIcon } from '@icons';

import { cn } from '@/shared/lib/shadcn/utils';

// ─── 추천화법 채팅 아이콘 (인라인) ──────────────────────────────
const ChatBubbleIcon = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.4rem"
    height="1.4rem"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M14 1H2C1.44772 1 1 1.44772 1 2V10C1 10.5523 1.44772 11 2 11H5V14.5L9.5 11H14C14.5523 11 15 10.5523 15 10V2C15 1.44772 14.5523 1 14 1Z"
      fill="currentColor"
    />
  </svg>
);

// ─── Types ──────────────────────────────────────────────────────

export interface InsuranceProductCardProps {
  /** 오른쪽 상단 플래그 배지에 표시할 순위 (1자리~2자리) */
  rank?: number;
  /** 상품명 */
  title: string;
  /** 부제목 / 납입 유형 설명 */
  subtitle?: string;
  /** 상품 특징 불릿 리스트 */
  features?: string[];
  /** 인수 가능 여부 */
  status?: 'accept' | 'reject';
  /** 체크박스 선택 상태 */
  checked?: boolean;
  /** 체크박스 변경 핸들러 */
  onCheckedChange?: (checked: boolean) => void;
  /** 추천화법 버튼 클릭 핸들러 */
  onChatClick?: () => void;
  className?: string;
}

// ─── Component ──────────────────────────────────────────────────

export function InsuranceProductCard({
  rank,
  title,
  subtitle,
  features = [],
  status = 'accept',
  checked = false,
  onCheckedChange,
  onChatClick,
  className,
}: InsuranceProductCardProps) {
  const isAccept = status === 'accept';

  // rank 값에 따라 아이콘 색상을 동적으로 결정합니다.
  let flagColor: string;
  let flagShadowColor: string;

  // rank 값에 따라 분기 처리
  if (rank === 1) {
    // 1위일 경우: 금색 계열
    flagColor = '#FF5C2E';
    flagShadowColor = '#C94C28';
  } else if (rank === 2) {
    // 2위일 경우: 은색 계열
    flagColor = '#374151';
    flagShadowColor = '#0C1C35';
  } else {
    // 그 외 순위는 기본 주황색 계열
    flagColor = '#FF5C2E';
    flagShadowColor = '#C94C28';
  }

  return (
    <Gcol placement={'ss'}  className={cn('relative w-full rounded-[1rem] p-4  bg-(--color-gray-0) shadow-md', className)}>

      {/* ── 오른쪽 상단 FlagCheckDuotone 순위 배지 ── */}
      {rank !== undefined && (
        <div className="absolute top-[-0.3rem] right-4 flex items-start justify-end">
            <FlagCheckDoutoneIcon color={flagColor} color2={flagShadowColor} />
            <span className="absolute top-[0.6rem] left-1/2 -translate-x-1/2 text-(--color-gray-0) text-[1.2rem] font-bold leading-none">
              {String(rank).padStart(2, '0')}
            </span>
        </div>
      )}

      {/* ── 카드 본문 ── */}
      <Gcol placement={'ss'} className="gap-1.5">

        {/* 상단 행: 체크박스 + 인수상태 배지 */}
        <Grow className='flex items-center gap-[0.8rem]'>
          <Checkbox
            checked={checked}
            onCheckedChange={(val) => onCheckedChange?.(val === true)}
          />
          {isAccept ? (
            <Badge variant="contained" color="green" size="md" className="gap-[0.6rem]">
              <CircleCheckIcon size={11} color="var(--color-success-50)" />
              인수가능
            </Badge>
          ) : (
            ""
          )}
        </Grow>

        <Grow className='flex flex-col items-start'>
          <Grow className='flex flex-col items-start'>
            <Typo
              tag="strong"
              variant="body-lg"
            >
              {title}
            </Typo>
            <Typo
              tag="p"
              variant="body-xs"
              className="text-(--color-gray-70)"
            >
              {subtitle}
            </Typo>
          </Grow>
          <Divider className="border-[#E5E5E5] my-2.5" />

          <Grow>
            {/* 특징 불릿 리스트 */}
            <BulletList className="pt-[0.2rem] gap-[0.2rem]">
              {features.map((feature, idx) => (
                <BulletListItem key={idx} type="dot" size="sm">
                  <Typo variant="body-xs" className='text-(--color-gray-70)'>
                    {feature}
                  </Typo>
                </BulletListItem>
              ))}
            </BulletList>
          </Grow>
        </Grow>


        {/* 하단 행: 추천화법 버튼 */}
        <Button
          variant={'rounded'}
          size={'md'}
          color={'gray'}
          className="gap-[0.4rem] absolute bottom-0 right-0"
          onClick={onChatClick}
        >
          <SpeechBubbleIcon />
          추천화법
        </Button>
      </Gcol>
    </Gcol>
  );
}
