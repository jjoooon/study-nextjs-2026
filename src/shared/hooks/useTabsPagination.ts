'use client';

import { useState, useEffect } from 'react';

/**
 * 탭 목록을 페이지 단위로 나눠 보여줄 때 사용하는 공통 훅.
 *
 * 역할
 * - 현재 보이는 시작 인덱스(`visibleStart`) 관리
 * - `active` 탭이 바뀌면 해당 탭이 포함된 페이지로 자동 이동
 * - 이전/다음 페이지 이동 핸들러 제공
 * - 마지막 페이지 여부(`isLastPage`) 및 렌더링 종료 인덱스(`end`) 계산
 *
 * 참고
 * - `getValue`로 제네릭 데이터에서 탭 고유값을 추출해 타입 안전하게 동작
 */
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
