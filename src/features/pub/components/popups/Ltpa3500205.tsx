'use client';

import { AllCommunityModule, ColDef, ColGroupDef, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';

import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';

ModuleRegistry.registerModules([AllCommunityModule]);

const parseNumericValue = (value: unknown): number => {
  if (value === null || value === undefined || value === '') return 0;
  const normalized = String(value).replace(/,/g, '').trim();
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatNumericValue = (value: unknown): string => {
  if (value === null || value === undefined || value === '') return '';
  const normalized = String(value).replace(/,/g, '').trim();
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? '' : parsed.toLocaleString();
};

type DummyDataType = {
  id: number;
  field01: string;
  field02: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '1',
    field02: '암',
  },
  {
    id: 2,
    field01: '2',
    field02: '뇌',
  },
  {
    id: 3,
    field01: '3',
    field02: '심',
  },
  {
    id: 4,
    field01: '4',
    field02: '수술',
  },
  {
    id: 5,
    field01: '5',
    field02: '특정',
  },
  {
    id: 6,
    field01: '6',
    field02: '표적',
  },
  {
    id: 7,
    field01: '7',
    field02: '치료',
  },
  {
    id: 8,
    field01: '8',
    field02: '골절',
  },
  {
    id: 9,
    field01: '9',
    field02: '화상',
  },
  {
    id: 10,
    field01: '10',
    field02: '치매',
  },
];

export const Ltpa3500205 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순서',
      field: 'field01',
      width: 70,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '키워드',
      field: 'field02',
      flex: 1,
      cellClass: 'text-center',
      autoHeight: true,
      editable: true,
      cellClassRules: {
        'ag-cell-error-border': (params) => params.value === '' || params.value === undefined,
      },
    },
    
  ];

  const [rowData, setRowData] = useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              키워드편집
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <div className="ag-theme-alpine">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              headerHeight={52}
              defaultColDef={{
                sortable: false,
                resizable: false,
              }}
              singleClickEdit={true}
              domLayout="autoHeight"
              alwaysShowHorizontalScroll={true}
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
