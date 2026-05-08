/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { Grow, Typo } from '@atoms';
import { ZoomOutIcon, ZoomInIcon } from '@icons';
import { Button } from '@uiux/Button';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectZoomPercent } from '@/shared/store/uiSelectors';
import { resetZoom, zoomIn, zoomOut } from '@/shared/store/uiSlice';
import { setScale } from '@/shared/utils/scale';

export const ZoomControl = () => {
  const dispatch = useAppDispatch();
  const zoomPercent = useAppSelector(selectZoomPercent);
  const scale = zoomPercent / 100;

  useEffect(() => {
    document.documentElement.style.fontSize = `${scale * 10}px`;
    setScale(scale); // scale 값을 공용 함수에 반영
  }, [scale]);

  const handleZoomIn = () => {
    dispatch(zoomIn());
  };

  const handleZoomOut = () => {
    dispatch(zoomOut());
  };

  const handleZoomRest = () => {
    dispatch(resetZoom());
  };

  return (
    <Grow className="items-center">
      <Button variant={'none'} only={'icon'} className="text-[var(--color-primary-50)]" onClick={handleZoomOut}>
        <ZoomOutIcon size={20} />
      </Button>
      <Typo variant={'button-sm'}>{zoomPercent}%</Typo>
      <Button variant={'none'} only={'icon'} className="text-[var(--color-primary-50)]" onClick={handleZoomIn}>
        <ZoomInIcon size={20} />
      </Button>
      <Button variant={'outlined'} color={'gray'} size={'sm'} onClick={handleZoomRest}>
        초기화
      </Button>
    </Grow>
  );
};
