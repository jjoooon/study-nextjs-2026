'use client';

import { useState, useEffect } from 'react';
import { Grow, Typo } from '@/shared/components/common';
import { ZoomOutIcon, ZoomInIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/uiux';
import { setScale } from '@/shared/utils/scale';

export const ZoomControl = () => {
  const [fontSize, setFontSize] = useState(10);
  const [scale, setScaleState] = useState(1);
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    setScale(scale); // scale 값을 공용 함수에 반영
  }, [fontSize, scale]);

  const handleZoomIn = () => {
    setFontSize(fontSize + 1);
    setScaleState(scale + 0.1);
  };
  const handleZoomOut = () => {
    setFontSize(Math.max(1.4, fontSize - 1));
    setScaleState(Math.max(0.8, scale - 0.1));
  };
  const handleZoomRest = () => {
    setFontSize(10);
    setScaleState(1);
  };

  return (
    <Grow className="gap-1 items-center">
      <Button variant="none" size="icon-sm" className='text-[var(--color-primary-50)]' onClick={handleZoomOut}>
        <ZoomOutIcon />
      </Button>
      <Typo variant="button-sm">{fontSize * 10}%</Typo>
      <Button variant="none" size="icon-sm" className='text-[var(--color-primary-50)]' onClick={handleZoomIn}>
        <ZoomInIcon />
      </Button>
      <Button variant="outlined" color="gray" className="mr-[1rem]" size="sm" onClick={handleZoomRest}>
        초기화
      </Button>
    </Grow>
  );
};
