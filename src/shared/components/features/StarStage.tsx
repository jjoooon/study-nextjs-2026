/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow } from '@atoms';
import { StageIcon } from '@icons';
import React from 'react';

const LOW_PROFITABILITY_TEXT = '수익성 저조';
const HIGH_PROFITABILITY_TEXT = '수익성 우량';

export interface StarStageProps {
  star?: number;
  profitabilityText?: string;
}

const DEFAULT_STAGE_ICON_COUNT = 5;
const STAGE_ICON_ACTIVE_COLOR = '#FFB800';
const STAGE_ICON_INACTIVE_FILL = 'transparent';
const STAGE_ICON_INACTIVE_BORDER = '#ccc';

const getProfitabilityTextFromStar = (star: number): string => {
  return star <= 2 ? LOW_PROFITABILITY_TEXT : HIGH_PROFITABILITY_TEXT;
};

const getStarFromProfitabilityText = (profitabilityText: string): number | null => {
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
  const mappedStar = profitabilityText ? getStarFromProfitabilityText(profitabilityText) : null;
  const resolvedStar = mappedStar ?? star ?? 0;
  const resolvedProfitabilityText = profitabilityText ?? getProfitabilityTextFromStar(resolvedStar);

  return (
    <Gcol className="p-1 flex items-center justify-end gap-0">
      <Grow className="gap-0">
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
