/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CSSProperties } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectZoomPercent } from '@/shared/store/uiSelectors';

export interface UseZoomScaleReturn {
  /** 현재 Zoom 퍼센트 (예: 100, 130, 150) */
  zoomPercent: number;
  /** 현재 Zoom 배율 스케일 (예: 1.0, 1.3, 1.5) */
  scale: number;
  /** 확대/축소 역산 배율 (예: 1 / 1.3 ≈ 0.769) */
  inverseScale: number;
  /** 배율 역산을 적용하여 크기를 100%로 고정하는 Inline CSS Style 객체 ({ zoom: inverseScale }) */
  fixedStyle: CSSProperties;
}

/**
 * 화면 확대/축소(Zoom) 배율 정보 및 크기 고정용 스타일을 제공하는 커스텀 훅
 *
 * @example
 * ```tsx
 * const { fixedStyle, scale, inverseScale } = useZoomScale();
 * return <div style={fixedStyle}>크기가 100%로 고정되는 요소</div>;
 * ```
 */
export const useZoomScale = (): UseZoomScaleReturn => {
  const zoomPercent = useAppSelector(selectZoomPercent);
  const scale = (zoomPercent || 100) / 100;
  const inverseScale = scale ? 1 / scale : 1;

  return {
    zoomPercent,
    scale,
    inverseScale,
    fixedStyle: { zoom: inverseScale } as CSSProperties,
  };
};

/**
 * 크기 고정용 inline style 객체만 바로 반환하는 경량 커스텀 훅
 *
 * @example
 * ```tsx
 * const fixedStyle = useFixedZoomStyle();
 * return <div style={fixedStyle}>...</div>;
 * ```
 */
export const useFixedZoomStyle = (): CSSProperties => {
  const { fixedStyle } = useZoomScale();
  return fixedStyle;
};
