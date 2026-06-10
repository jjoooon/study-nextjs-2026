/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import React from 'react';
import { Gcol, Grow } from '@atoms';
import { StageIcon } from '@icons';

// 표시 문구 상수
const LOW_PROFITABILITY_TEXT = '수익성 저조';
const HIGH_PROFITABILITY_TEXT = '수익성 우량';

export interface StarStageProps {
  // 별 개수(0~5 권장). profitabilityText에서 해석된 값이 있으면 해당 값이 우선된다.
  star?: number;
  // 수익성 문구. 전달 시 문구를 그대로 보여주고, 별 개수도 문구 기반으로 자동 추정한다.
  profitabilityText?: string;
}

// 아이콘/색상 기본값
const DEFAULT_STAGE_ICON_COUNT = 5;
const STAGE_ICON_ACTIVE_COLOR = '#FFB800';
const STAGE_ICON_INACTIVE_FILL = 'transparent';
const STAGE_ICON_INACTIVE_BORDER = '#ccc';

// 별 개수 기반 기본 문구 생성
const getProfitabilityTextFromStar = (star: number): string => {
  return star <= 2 ? LOW_PROFITABILITY_TEXT : HIGH_PROFITABILITY_TEXT;
};

// 문구 기반 별 개수 추정
// - 저조 계열 문구: 2점
// - 우량 계열 문구: 4점
// - 매칭 실패 시 null
const getStarFromProfitabilityText = (profitabilityText: string): number | null => {
  // 공백 변형(연속 공백/앞뒤 공백) 정규화
  const normalizedProfitabilityText = profitabilityText.replace(/\s+/g, ' ').trim();

  if (normalizedProfitabilityText.includes(LOW_PROFITABILITY_TEXT) || normalizedProfitabilityText.includes('저조')) {
    return 2;
  }

  if (normalizedProfitabilityText.includes(HIGH_PROFITABILITY_TEXT) || normalizedProfitabilityText.includes('우량')) {
    return 4;
  }

  return null;
};

export const StarStage: React.FC<StarStageProps> = ({ star, profitabilityText }) => {
  // 우선순위: profitabilityText 해석값 > star prop > 0
  const mappedStar = profitabilityText ? getStarFromProfitabilityText(profitabilityText) : null;
  const resolvedStar = mappedStar ?? star ?? 0;

  // 문구 우선순위: profitabilityText prop > star 기반 자동 문구
  const resolvedProfitabilityText = profitabilityText ?? getProfitabilityTextFromStar(resolvedStar);

  return (
    <Gcol className="p-1 flex items-center justify-end gap-0">
      <Grow className="gap-0">
        {/* 총 5개 아이콘 중 resolvedStar 이하 인덱스만 활성 색상 적용 */}
        {Array.from({ length: DEFAULT_STAGE_ICON_COUNT }, (_, index) => (
          <StageIcon
            key={index}
            color={index + 1 <= resolvedStar ? STAGE_ICON_ACTIVE_COLOR : STAGE_ICON_INACTIVE_FILL}
            color2={index + 1 <= resolvedStar ? STAGE_ICON_ACTIVE_COLOR : STAGE_ICON_INACTIVE_BORDER}
          />
        ))}
      </Grow>
      <span>{resolvedProfitabilityText}</span>
    </Gcol>
  );
};
