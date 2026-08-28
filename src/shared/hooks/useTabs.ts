/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useState } from 'react';

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
  removable?: boolean;
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
export function useTabs<T extends BaseTab>(initialTabs?: T[] | null) {
  const safeInitial = initialTabs ?? [];
  const [tabs, setTabs] = useState<T[]>(() => safeInitial);
  const [active, setActive] = useState(() => safeInitial[0]?.value ?? '');
  const [hiddenTabs, setHiddenTabs] = useState<Set<string>>(new Set());

  const handleRemove = (value: string) => {
    if (tabs.length === 0) return;
    setTabs((prev) => {
      const removeIndex = prev.findIndex((tab) => tab.value === value);
      const next = prev.filter((tab) => tab.value !== value);
      // 삭제된 탭이 active였다면, 바로 이전 탭을 active로 설정
      if (active === value) {
        const nextActiveIndex = removeIndex > 0 ? removeIndex - 1 : 0;
        setActive(next[nextActiveIndex]?.value || '');
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
        const currentVisible = prev.filter((tab) => !hiddenTabs.has(tab.value));
        const removeVisibleIndex = currentVisible.findIndex((tab) => tab.value === value);
        const nextVisible = nextTabs.filter((tab) => !hiddenTabs.has(tab.value));
        const nextActiveIndex = removeVisibleIndex > 0 ? removeVisibleIndex - 1 : 0;
        setActive(nextVisible[nextActiveIndex]?.value ?? '');
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

  const replaceTabs = (nextTabs?: T[] | null) => {
    const safeNext = nextTabs ?? [];
    setTabs(safeNext);
    setHiddenTabs(new Set());
    setActive((prev) => {
      if (safeNext.some((tab) => tab.value === prev)) {
        return prev;
      }

      return safeNext[0]?.value ?? '';
    });
  };

  return { tabs, active, setActive, hiddenTabs, handleRemove, visibleTabs, addTab, removeTab, replaceTabs };
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
  data: T[] | null | undefined,
  visibleCount: number,
  variant: string,
  active: string,
  getValue: (item: T) => string
) {
  const safeData = data ?? [];

  // variant는 외부 API 호환을 위해 유지
  void variant;

  // visibleStart의 초기값을 active에 맞춰 계산
  const getStartByActive = (activeValue: string) => {
    const idx = safeData.findIndex((t) => getValue(t) === activeValue);
    if (idx === -1) return 0;
    return Math.floor(idx / visibleCount) * visibleCount;
  };

  const [visibleStart, setVisibleStart] = useState(() => getStartByActive(active));
  const [prevActive, setPrevActive] = useState<string>(active);
  const [prevData, setPrevData] = useState<T[] | null | undefined>(data);
  const [prevVisibleCount, setPrevVisibleCount] = useState<number>(visibleCount);

  // active, data, visibleCount 변경 시 보이는 탭 시작 위치 동기화 (렌더 단계에서 동기화)
  if (active !== prevActive || data !== prevData || visibleCount !== prevVisibleCount) {
    setPrevActive(active);
    setPrevData(data);
    setPrevVisibleCount(visibleCount);

    const newStart = getStartByActive(active);
    if (visibleStart !== newStart) {
      setVisibleStart(newStart);
    }
  }

  const handlePrev = () => setVisibleStart((prev) => Math.max(0, prev - visibleCount));
  const handleNext = () => {
    const maxStart =
      safeData.length % visibleCount === 0
        ? safeData.length - visibleCount
        : safeData.length - (safeData.length % visibleCount);
    const safeMaxStart = Math.max(0, maxStart);
    if (visibleStart + visibleCount >= safeData.length) return;
    if (visibleStart + visibleCount >= safeMaxStart) setVisibleStart(safeMaxStart);
    else setVisibleStart(visibleStart + visibleCount);
  };

  const isLastPage =
    visibleStart >=
    safeData.length - (safeData.length % visibleCount === 0 ? visibleCount : safeData.length % visibleCount);

  const end = Math.min(visibleStart + visibleCount, safeData.length);

  return {
    visibleStart,
    end,
    handlePrev,
    handleNext,
    isLastPage,
    setVisibleStart,
  };
}
