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
      const next = prev.filter(tab => tab.value !== value);
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
