'use client';

import { useCallback, useEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { GridReadyEvent } from 'ag-grid-community';
import type { AgGridReact } from 'ag-grid-react';

type FieldKey<TData> = Extract<keyof TData, string>;

interface UseAgGridColumnVisibilityParams<TData extends object> {
  gridRef: RefObject<AgGridReact<TData> | null>;
  toggleFields: readonly FieldKey<TData>[];
  initialVisibleFields?: readonly FieldKey<TData>[];
}

export function useAgGridColumnVisibility<TData extends object>({
  gridRef,
  toggleFields,
  initialVisibleFields,
}: UseAgGridColumnVisibilityParams<TData>) {
  const [visibleFields, setVisibleFields] = useState<FieldKey<TData>[]>(() => {
    if (initialVisibleFields && initialVisibleFields.length > 0) {
      return [...initialVisibleFields];
    }
    return [...toggleFields];
  });

  const applyColumnVisibility = useCallback(
    (selectedFields: readonly FieldKey<TData>[]) => {
      const api = gridRef.current?.api;
      if (!api) return;

      api.setColumnsVisible([...toggleFields], false);
      api.setColumnsVisible([...selectedFields], true);
      api.refreshHeader();
    },
    [gridRef, toggleFields]
  );

  useEffect(() => {
    applyColumnVisibility(visibleFields);
  }, [applyColumnVisibility, visibleFields]);

  const onGridReady = useCallback(
    (_event: GridReadyEvent<TData>) => {
      applyColumnVisibility(visibleFields);
    },
    [applyColumnVisibility, visibleFields]
  );

  const onVisibleFieldsChange = useCallback((fields: string[]) => {
    const next = fields.filter((field): field is FieldKey<TData> =>
      toggleFields.includes(field as FieldKey<TData>)
    );
    setVisibleFields(next);
  }, [toggleFields]);

  return {
    visibleFields,
    setVisibleFields,
    onVisibleFieldsChange,
    onGridReady,
    applyColumnVisibility,
  };
}
