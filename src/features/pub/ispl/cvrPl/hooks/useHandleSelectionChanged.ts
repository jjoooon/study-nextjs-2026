/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useMemo } from 'react';
import { createSelectionChangedHandler } from '@aggrid';

export function useHandleSelectionChanged<T, K>(idKey: keyof T, callback?: (id: K) => void) {
  return useMemo(() => createSelectionChangedHandler<T, K>(idKey, callback), [callback, idKey]);
}
