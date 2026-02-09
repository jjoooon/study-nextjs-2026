'use client';

import { useState, useEffect } from 'react';
import { Grow } from '@/shared/components/common';
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

  return (
    <Grow className="absolute top-0 right-8 gap-1 font-[1.1rem] p-1 bg-white border border-gray-300 rounded-md shadow-md z-20">
      <Button size="xs" onClick={handleZoomOut}>
        축소
      </Button>
      <span>{fontSize / 10}배</span>
      <Button size="xs" onClick={handleZoomIn}>
        확대
      </Button>
    </Grow>
  );
};
