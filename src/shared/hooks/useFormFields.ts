/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { useState, useCallback } from 'react';

export function useFormFields<T extends object>(initialState: T) {
  const [fields, setFields] = useState<T>(initialState);
  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);
  return [fields, setField] as const;
}
