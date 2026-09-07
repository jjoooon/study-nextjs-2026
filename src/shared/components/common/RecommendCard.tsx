/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ReactNode } from 'react';
import { Gcol, Grow, Grid, Typo } from '@atoms';
import { AiIcon, CircleCheckIcon } from '@icons';
import { Badge2 } from '../uiux/Badge2';
import { Button } from '../uiux/Button';

/**
 * 가입가능 여부(인수, 조건부인수 등) 텍스트 및 뱃지 스타일 렌더링 헬퍼
 */
const getPossibilityBadgeStyle = (possibility?: string | string[]) => {
  if (!possibility) return { color: 'green' as const, iconColor: '#00B050', label: '예상 : 인수' };

  const rawText = Array.isArray(possibility) ? possibility.filter(Boolean).join(',') : possibility;
  const clean = rawText.replace(/^[0-9]/, '').trim();

  if (!clean) return { color: 'green' as const, iconColor: '#00B050', label: '예상 : 인수' };

  const label = clean.startsWith('예상') ? clean : `예상 : ${clean}`;

  if (clean.includes('조건부') || clean.includes('할증') || clean.includes('부담보') || clean.includes('감액')) {
    return { color: 'yellow' as const, iconColor: '#FFB800', label };
  }
  if (clean.includes('거절')) {
    return { color: 'red' as const, iconColor: '#E53E3E', label };
  }
  if (clean.includes('인수')) {
    return { color: 'green' as const, iconColor: '#00B050', label };
  }
  if (clean.includes('심사') || clean.includes('적부')) {
    return { color: 'blue' as const, iconColor: '#006FF2', label };
  }

  return { color: 'green' as const, iconColor: '#00B050', label };
};

export type RecommendCardDataItem = {
  id: number;
  type?: string;
  title?: ReactNode;
  plan?: string[] | string;
  price?: string;
  list?: string[];
  isChecked?: boolean;
};

type RecommendCardNormalProps = {
  variant?: 'normal' | 'checkbox';
  className?: string;
  recommendData?: RecommendCardDataItem[];
  title?: ReactNode;
  type?: string;
  plan?: string[] | string;
  price?: string;
  list?: string[];
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onAiReasonClick?: () => void;
  children?: never;
  footer?: never;
};

type RecommendCardFreeProps = {
  variant: 'free';
  className?: string;
  children?: ReactNode;
  footer?: ReactNode;
  title?: never;
  type?: never;
  plan?: never;
  price?: never;
  list?: never;
  checked?: never;
  onCheckedChange?: never;
  onAiReasonClick?: never;
};

export type RecommendCardProps = RecommendCardNormalProps | RecommendCardFreeProps;

type NormalRecommendCardItemProps = {
  variant?: 'normal' | 'checkbox';
  className?: string;
  title?: ReactNode;
  type?: string;
  plan?: string[] | string;
  price?: string;
  list?: string[];
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onAiReasonClick?: () => void;
};

function NormalRecommendCardItem({
  className,
  title,
  type,
  plan,
  price,
  onAiReasonClick,
}: NormalRecommendCardItemProps) {
  const { color, iconColor, label } = getPossibilityBadgeStyle(type);
  const planText = Array.isArray(plan) && plan.length > 0 ? plan.join(', ') : typeof plan === 'string' ? plan : '';

  return (
    <Grid
      className={`relative w-full h-full rounded-[1rem] bg-white border border-[#E2E8F0] shadow-[0_0.2rem_0.4rem_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between grid-rows-[1fr_auto] gap-0${
        className ? ` ${className}` : ''
      }`}
    >
      <Gcol className="p-[1.6rem] w-full h-[18rem]" placement="ss">
        <Gcol className="w-full" placement="ss" gap={2}>
          <Grow className="w-full justify-start">
            <Badge2 color={color} className="h-[2.2rem] text-[1.1rem] px-[0.6rem] py-[0.2rem]">
              <CircleCheckIcon size={12} color={iconColor} />
              {label}
            </Badge2>
          </Grow>

          <Gcol className="w-full" placement="ss" gap={2}>
            <Typo tag="strong" variant="body-xl" className="w-full font-normal text-[1.4rem] text-[#000] h-[4.6rem]">
              {typeof title === 'string' && title.includes('<') ? (
                <span dangerouslySetInnerHTML={{ __html: title }} />
              ) : (
                title
              )}
            </Typo>
          </Gcol>
        </Gcol>

        <Gcol>
          {planText ? (
            <Typo tag="p" variant="body-xs" className="text-[#414141] text-[1.2rem] items-start w-full">
              {planText}
            </Typo>
          ) : null}
          <Grow
            className="w-full bg-[#FFF5F2] rounded-[0.8rem] px-[1.4rem] py-[1.2rem] items-center justify-end gap-2"
            placement="sc"
          >
            <Typo tag="span" variant="body-sm">
              예상보험료
            </Typo>
            <Typo tag="strong" className="text-[#FF5C2E] font-bold text-[1.8rem]">
              {price}
            </Typo>
          </Grow>
        </Gcol>
      </Gcol>

      {/* 하단 버튼 */}
      <Grow className="w-full h-[4rem]" placement="cc">
        <Button
          color="primary"
          className="w-full h-[4rem] bg-[#7B736E] hover:bg-[#69615C] text-white font-bold text-[1.3rem] flex items-center justify-center gap-1.5 rounded-b-[0.8rem] rounded-t-none transition-colors cursor-pointer"
          onClick={() => onAiReasonClick?.()}
          only="default"
          size="lg"
          variant="none"
        >
          <AiIcon color={'#FFFFFF'} color2={'#FFFFFF'} />
          대안상품 비교설계
        </Button>
      </Grow>
    </Grid>
  );
}

export function RecommendCard(props: RecommendCardProps) {
  if (props.variant === 'free') {
    const { children, footer, className } = props;
    return (
      <Gcol
        className={`relative p-px w-full rounded-[0.8rem] bg-linear-to-b from-[#E5E5E5] from-[47.33%] to-[#61554F] to-100%${className ? ` ${className}` : ''}`}
      >
        <Grid className="bg-[#817772] rounded-[0.8rem] grid-rows-[1fr_auto] w-full">
          <Gcol
            className="relative bg-white rounded-[0.8rem] w-full min-h-[16.3rem] py-[2rem] px-[1.6rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)]"
            placement="ss"
            gap={2}
          >
            {children}
          </Gcol>
          <Grow className="w-full min-h-[3.7rem]" placement="cc">
            {footer}
          </Grow>
        </Grid>
      </Gcol>
    );
  }

  const {
    className,
    recommendData,
    variant = 'normal',
    title,
    type,
    plan,
    price,
    list = [],
    checked,
    onCheckedChange,
    onAiReasonClick,
  } = props;

  if (recommendData && recommendData.length > 0) {
    return (
      <Gcol className="w-full" gap={2}>
        {recommendData.map((item) => (
          <NormalRecommendCardItem
            key={item.id}
            variant={variant}
            className={className}
            title={item.title}
            type={item.type}
            plan={item.plan}
            price={item.price}
            list={item.list}
            onAiReasonClick={onAiReasonClick}
          />
        ))}
      </Gcol>
    );
  }

  return (
    <NormalRecommendCardItem
      variant={variant}
      className={className}
      title={title}
      type={type}
      plan={plan}
      price={price}
      list={list}
      checked={checked}
      onCheckedChange={onCheckedChange}
      onAiReasonClick={onAiReasonClick}
    />
  );
}
