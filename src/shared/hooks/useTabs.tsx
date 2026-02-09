'use client';

import { useState } from 'react';

interface BaseTab {
  value: string;
  label: string;
}

export function useTabs<T extends BaseTab>(initialTabs: T[]) {
  const [tabs, setTabs] = useState<T[]>(() => initialTabs);
  const [active, setActive] = useState(() => initialTabs[0]?.value ?? '');
  const [hiddenTabs, setHiddenTabs] = useState<Set<string>>(new Set());

  const handleRemove = (value: string) => {
    if (tabs.length - hiddenTabs.size <= 1) return;
    const newHidden = new Set(hiddenTabs);
    newHidden.add(value);
    setHiddenTabs(newHidden);

    if (active === value) {
      const visibleTabs = tabs.filter((tab) => !newHidden.has(tab.value));
      setActive(visibleTabs[0]?.value || '');
    }
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
