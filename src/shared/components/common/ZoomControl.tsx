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

  // 모든 iframe을 CSS transform으로 직접 확대/축소
  const broadcastZoomToIframes = (scale: number) => {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      try {
        iframe.style.transform = `scale(${scale})`;
        iframe.style.transformOrigin = '0 0';
        iframe.style.width = scale === 1 ? '' : `${100 / scale}%`;
        iframe.style.height = scale === 1 ? '' : `${100 / scale}%`;
      } catch {
        // cross-origin iframe 등 예외 무시
      }
    });
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${scale * 10}px`;
    setScale(scale); // scale 값을 공용 함수에 반영
    broadcastZoomToIframes(scale);
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
      <Button
        variant={'none'}
        only={'icon'}
        className="text-[var(--color-primary-50)] !w-[20px] !h-[20px]"
        onClick={handleZoomOut}
      >
        <ZoomOutIcon size={20} className="!w-[20px] !h-[20px]" />
      </Button>
      <Typo variant={'button-sm'} className="!text-[12px]">
        {zoomPercent}%
      </Typo>
      <Button
        variant={'none'}
        only={'icon'}
        className="text-[var(--color-primary-50)] !w-[20px] !h-[20px]"
        onClick={handleZoomIn}
      >
        <ZoomInIcon size={20} className="!w-[20px] !h-[20px]" />
      </Button>
      <Button
        variant={'outlined'}
        color={'gray'}
        size={'sm'}
        onClick={handleZoomRest}
        className="!w-[47px] !h-[22px] !text-[12px] !p-[0px]"
      >
        초기화
      </Button>
    </Grow>
  );
};
