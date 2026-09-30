/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import useMounted from '@/shared/hooks/useMounted';
import { selectZoomPercent } from '@/shared/store/uiSelectors';
import { resetZoom, zoomIn, zoomOut, ZOOM_MIN, ZOOM_MAX } from '@/shared/store/uiSlice';
import { setScale } from '@/shared/utils/scale';
import { Grow, Typo } from '@atoms';
import { ZoomOutIcon, ZoomInIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';

export const ZoomControl = () => {
  const dispatch = useAppDispatch();
  const zoomPercent = useAppSelector(selectZoomPercent);
  const scale = zoomPercent / 100;
  const [envLabel, setEnvLabel] = useState<string | null>(null);

  useMounted(() => {
    const href = window.location.href;
    const hostname = window.location.hostname;

    if (href.includes('ltp-dev.hwgitest.com')) {
      setEnvLabel('개발');
    } else if (href.includes('prd-ltp.hwgitest.com')) {
      setEnvLabel('운영-임시');
    } else if (href.includes('ltp.hwgitest.com')) {
      setEnvLabel('테스트');
    } else if (href.includes('ltp.hwgeneralins.com')) {
      setEnvLabel('운영');
    } else if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
      setEnvLabel('로컬');
    }
  });

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
    document.body.setAttribute('data-zoom', zoomPercent.toString());
    document.documentElement.style.setProperty('--zoom-scale', scale.toString());
    setScale(scale); // scale 값을 공용 함수에 반영
    broadcastZoomToIframes(scale);
  }, [scale, zoomPercent]);

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
      {envLabel && <Badge>{envLabel}</Badge>}
      <Button
        variant={'none'}
        only={'icon'}
        className="text-[var(--color-primary-50)] !w-[20px] !h-[20px]"
        onClick={handleZoomOut}
        disabled={scale <= ZOOM_MIN}
      >
        <ZoomOutIcon size={20} className="!w-[20px] !h-[20px]" />
      </Button>
      <Typo variant={'button-sm'} className="!text-[12px] w-[28px] text-center">
        {zoomPercent}%
      </Typo>
      <Button
        variant={'none'}
        only={'icon'}
        className="text-[var(--color-primary-50)] !w-[20px] !h-[20px]"
        onClick={handleZoomIn}
        disabled={scale >= ZOOM_MAX}
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
