'use client';

import { useState, useEffect } from 'react';
import { Grow, Typo } from '@/shared/components/common';
import { ZoomOut, ZoomIn } from '@/shared/components/icons';
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
  const handleZoomAuto = () => {
    setFontSize(Math.max(1.4, 10));
    setScaleState(Math.max(0.8, 1));
  };

  return (
    <Grow className="gap-1 items-center">
      <Button variant="outline" color="gray" className="mr-[1rem]" size="xs" onClick={handleZoomAuto}>
        자동맞춤
      </Button>
      <Button variant="icon" size="xs" color="transparent" onClick={handleZoomOut}>
        <ZoomOut />
      </Button>
      <Typo variant="button-s">{fontSize * 10}%</Typo>
      <Button variant="icon" size="xs" color="transparent" onClick={handleZoomIn}>
        <ZoomIn />
      </Button>
    </Grow>
  );
};
