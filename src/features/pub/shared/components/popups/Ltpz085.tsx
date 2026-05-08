'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter } from '@/shared/components/agGridUtils';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
};
const DummyData: DummyDataType[] = [
  { id: 1, field01: '여성통합암(4대유사암 제외)진단비', field02: 0 },
  {
    id: 2,
    field01:
      '여성통합암(4대유사암 제외)진단비 여성통합암(4대유사암 제외)진단비여성통합암(4대유사암 제외)진단비 여성통합암(4대유사암 제외)진단비 여성통합암(4대유사암 제외)진단비여성통합암(4대유사암 제외)진단비',
    field02: 100,
  },
  { id: 3, field01: '여성통합암(4대유사암 제외)진단비', field02: 7000 },
  { id: 4, field01: '여성통합암(4대유사암 제외)진단비', field02: 7000 },
  { id: 5, field01: '여성통합암(4대유사암 제외)진단비', field02: 7000 },
  { id: 6, field01: '여성통합암(4대유사암 제외)진단비', field02: 7000 },
];

const Ltpz085 = () => {
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '할증담보',
      flex: 1,
      field: 'field01',
      cellClass: 'text-left',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
    },
    {
      headerName: '설계금액',
      width: 120,
      field: 'field02',
      cellClass: 'text-right editable-cell [&_.ag-cell-value]:-tracking-[0.03rem]! [&_input]:-tracking-[0.03rem]!',
      autoHeight: true,
      valueFormatter: numberValueFormatter,
      editable: true,
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const gridRowData = React.useMemo<DummyDataType[]>(() => {
    const total = rowData.reduce((sum, row) => sum + Number(row.field02), 0);
    return rowData.map((row, index) => ({
      ...row,
      field02: index === 0 ? total : row.field02,
    }));
  }, [rowData]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              통합/세트담보누적조정
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ085)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[1fr]">
          <div className="ag-theme-alpine min-h-[18.4rem]">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={gridRowData}
              columnDefs={columnDefs}
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowStyle={(params) =>
                params.node.rowIndex === 0 && !params.node.rowPinned ? { fontWeight: '700' } : undefined
              }
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              singleClickEdit={true}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow></Grow>
            <Grow>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz085;
