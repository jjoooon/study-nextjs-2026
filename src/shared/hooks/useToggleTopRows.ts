import { useCallback, useRef, useState } from 'react';

type PrimitiveId = string | number;

type IdKeyOf<T> = {
  [K in keyof T]-?: T[K] extends PrimitiveId ? K : never;
}[keyof T];

type BooleanKeyOf<T> = {
  [K in keyof T]-?: T[K] extends boolean ? K : never;
}[keyof T];

export type ToggleTopRow<T> = T & {
  originalIndex: number;
  toggleOrder: number | null;
};

interface UseToggleTopRowsParams<T extends Record<string, unknown>> {
  rows: T[];
  idKey: IdKeyOf<T>;
  toggleKey: BooleanKeyOf<T>;
}

function sortToggleRows<T extends Record<string, unknown>>(
  rows: ToggleTopRow<T>[],
  toggleKey: BooleanKeyOf<T>
) {
  return [...rows].sort((prevRow, nextRow) => {
    const prevToggled = Boolean(prevRow[toggleKey]);
    const nextToggled = Boolean(nextRow[toggleKey]);

    if (prevToggled !== nextToggled) {
      return prevToggled ? -1 : 1;
    }

    if (prevToggled && nextToggled) {
      const prevOrder = prevRow.toggleOrder ?? 0;
      const nextOrder = nextRow.toggleOrder ?? 0;

      if (prevOrder !== nextOrder) {
        return nextOrder - prevOrder;
      }
    }

    return prevRow.originalIndex - nextRow.originalIndex;
  });
}

export function useToggleTopRows<T extends Record<string, unknown>>({
  rows,
  idKey,
  toggleKey,
}: UseToggleTopRowsParams<T>) {
  const sequenceRef = useRef(1);

  const [rowData, setRowData] = useState<ToggleTopRow<T>[]>(() => {
    const initialized = rows.map((row, index) => ({
      ...row,
      originalIndex: index,
      toggleOrder: Boolean(row[toggleKey]) ? 0 : null,
    }));

    return sortToggleRows(initialized, toggleKey);
  });

  const toggleById = useCallback(
    (id: T[IdKeyOf<T>]) => {
      setRowData((prev) => {
        const nextRows = prev.map((row) => {
          if (row[idKey] !== id) {
            return row;
          }

          const nextToggled = !Boolean(row[toggleKey]);

          return {
            ...row,
            [toggleKey]: nextToggled,
            toggleOrder: nextToggled ? sequenceRef.current++ : null,
          } as ToggleTopRow<T>;
        });

        return sortToggleRows(nextRows, toggleKey);
      });
    },
    [idKey, toggleKey]
  );

  return {
    rowData,
    setRowData,
    toggleById,
  };
}
