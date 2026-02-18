// hooks/useAgGridSelection.ts
import { useState, useCallback } from 'react';
import type { AgGridData } from '../types/LTRA350Data.types';

export function useAgGridSelection(data: AgGridData[], onSelectPlan?: (id: number) => void) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectionChanged = useCallback(
    (event: { api: any }) => {
      const selectedNodes = event.api.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const selectedData = selectedNodes[0].data;
        if (selectedData && typeof onSelectPlan === 'function') {
          onSelectPlan(selectedData.id);
        }
      }
    },
    [onSelectPlan]
  );

  return { selectedRows, setSelectedRows, handleSelectionChanged };
}