'use client';

import { useState, useEffect } from 'react';

export function useTabsPagination<T>(
  data: T[],
  visibleCount: number,
  variant: string,
  active: string,
  getValue: (item: T) => string // value 추출 함수 추가
) {
  // visibleStart의 초기값을 active에 맞춰 계산
  const getStartByActive = (activeValue: string) => {
    const idx = data.findIndex((t) => getValue(t) === activeValue);
    if (idx === -1) return 0;
    return Math.floor(idx / visibleCount) * visibleCount;
  };

  const [visibleStart, setVisibleStart] = useState(() => getStartByActive(active));

  // active가 바뀔 때만 visibleStart를 조정
  useEffect(() => {
    const newStart = getStartByActive(active);
    if (visibleStart !== newStart) setVisibleStart(newStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, data, visibleCount]);

  const handlePrev = () => setVisibleStart((prev) => Math.max(0, prev - visibleCount));
  const handleNext = () => {
    const maxStart =
      data.length % visibleCount === 0 ? data.length - visibleCount : data.length - (data.length % visibleCount);
    const safeMaxStart = Math.max(0, maxStart);
    if (visibleStart + visibleCount >= data.length) return;
    if (visibleStart + visibleCount >= safeMaxStart) setVisibleStart(safeMaxStart);
    else setVisibleStart(visibleStart + visibleCount);
  };

  const isLastPage =
    visibleStart >= data.length - (data.length % visibleCount === 0 ? visibleCount : data.length % visibleCount);

  const end = Math.min(visibleStart + visibleCount, data.length);

  return {
    visibleStart,
    end,
    handlePrev,
    handleNext,
    isLastPage,
    setVisibleStart,
  };
}
