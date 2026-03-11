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

import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { BadgeCheckIcon, FlagCheckDoutoneIcon } from '@icons';

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

  return (
    <div className={cn('relative w-full rounded-[1rem] border border-(--color-gray-20) bg-(--color-gray-0) shadow-sm overflow-hidden', className)}>

      {/* ── 오른쪽 상단 FlagCheckDuotone 순위 배지 ── */}
      {rank !== undefined && (
        <div className="absolute top-0 right-0 flex items-start justify-end">
          <div className="relative flex items-center justify-center">
            <FlagCheckDoutoneIcon
              size={44}
              color="var(--color-brand-50, #C94C28)"
              color2="var(--color-brand-40, #E05C35)"
            />
            <span className="absolute top-[0.6rem] left-1/2 -translate-x-1/2 text-(--color-gray-0) text-[1.2rem] font-bold leading-none">
              {String(rank).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      {/* ── 카드 본문 ── */}
      <Gcol className="gap-[0.8rem] px-[1.4rem] pt-[1.2rem] pb-[1.4rem]">

        {/* 상단 행: 체크박스 + 인수상태 배지 */}
        <Grow placement="sc" className="gap-[0.8rem] pr-[3.2rem]">
          <Grow>
            <Checkbox
              checked={checked}
              onCheckedChange={(val) => onCheckedChange?.(val === true)}
            />
            {isAccept ? (
              <Badge variant="contained" color="green" size="sm" className="gap-[0.3rem]">
                <BadgeCheckIcon size={12} color="var(--color-success-50)" />
                인수가능
              </Badge>
            ) : (
              ""
            )}
          </Grow>
          <Grow>
            01
          </Grow>
        </Grow>

        {/* 상품명 */}
        <Typo
          tag="h3"
          variant="heading-lg"
          className="leading-[1.4] tracking-[-0.05rem] break-keep pr-[2rem]"
        >
          {title}
        </Typo>

        {/* 부제목 */}
        {subtitle && (
          <Typo
            tag="p"
            variant="body-sm"
            color="gray"
            className="whitespace-pre-line"
          >
            {subtitle}
          </Typo>
        )}

        {/* 특징 불릿 리스트 */}
        {features.length > 0 && (
          <BulletList className="pt-[0.2rem]">
            {features.map((feature, idx) => (
              <BulletListItem key={idx} type="dot" size="sm">
                <Typo variant="body-sm" color="gray">
                  {feature}
                </Typo>
              </BulletListItem>
            ))}
          </BulletList>
        )}

        {/* 하단 행: 추천화법 버튼 */}
        <Grow placement="ec" className="mt-[0.4rem]">
          <Button
            variant="contained"
            size="sm"
            className="gap-[0.4rem] rounded-full bg-(--color-gray-80) text-(--color-gray-0) hover:bg-(--color-gray-70) px-[1.2rem]"
            onClick={onChatClick}
          >
            <ChatBubbleIcon />
            추천화법
          </Button>
        </Grow>

      </Gcol>
    </div>
  );
}
