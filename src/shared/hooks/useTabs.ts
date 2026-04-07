'use client';

import { useEffect, useState } from 'react';

/**
 * 탭 아이템의 최소 형태.
 *
 * 역할
 * - `value`를 탭의 고유 키로 사용
 * - 필요 시 `label` 등 확장 필드를 제네릭으로 추가
 */
export interface BaseTab {
  value: string;
  label?: string;
}

/**
 * 탭 목록/활성 탭/가시성/추가/삭제를 관리하는 공통 훅.
 *
 * 역할
 * - `tabs`: 현재 탭 목록 상태
 * - `active`, `setActive`: 활성 탭 제어
 * - `hiddenTabs`, `visibleTabs`: 숨김 처리와 노출 목록 계산
 * - `addTab`, `removeTab`, `handleRemove`: 탭 동적 변경
 *
 * 특징
 * - 제네릭(`T extends BaseTab`)으로 탭 메타데이터를 타입 안전하게 확장 가능
 * - 활성 탭 삭제 시 첫 번째 사용 가능한 탭으로 자동 보정
 */
export function useTabs<T extends BaseTab>(initialTabs: T[]) {
  const [tabs, setTabs] = useState<T[]>(() => initialTabs);
  const [active, setActive] = useState(() => initialTabs[0]?.value ?? '');
  const [hiddenTabs, setHiddenTabs] = useState<Set<string>>(new Set());

  const handleRemove = (value: string) => {
    if (tabs.length <= 1) return;
    setTabs((prev) => {
      const next = prev.filter((tab) => tab.value !== value);
      // 삭제된 탭이 active였다면, 첫 번째 탭을 active로 설정
      if (active === value) {
        setActive(next[0]?.value || '');
      }
      return next;
    });
  };

  const visibleTabs = tabs.filter((tab) => !hiddenTabs.has(tab.value));

  const addTab = (tab: T, options?: { activate?: boolean }) => {
    setTabs((prev) => [...prev, tab]);
    if (options?.activate) {
      setActive(tab.value);
    }
  };

  const removeTab = (value: string) => {
    setTabs((prev) => {
      const nextTabs = prev.filter((tab) => tab.value !== value);
      if (active === value) {
        const nextVisible = nextTabs.filter((tab) => !hiddenTabs.has(tab.value));
        setActive(nextVisible[0]?.value ?? '');
      }
      return nextTabs;
    });
    setHiddenTabs((prev) => {
      if (!prev.has(value)) return prev;
      const next = new Set(prev);
      next.delete(value);
      return next;
    });
  };

  return { tabs, active, setActive, hiddenTabs, handleRemove, visibleTabs, addTab, removeTab };
}

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
  getValue: (item: T) => string
) {
  // variant는 외부 API 호환을 위해 유지
  void variant;

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
