/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
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
  isEdit: boolean;
  field01: string | number;
  field02: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '여성통합암(4대유사암 제외)진단비',
    isEdit: false,
    field02: 0,
  },
  {
    id: 2,
    field01:
      '여성통합암(4대유사암 제외)진단비 여성통합암(4대유사암 제외)진단비여성통합암(4대유사암 제외)진단비 여성통합암(4대유사암 제외)진단비 여성통합암(4대유사암 제외)진단비여성통합암(4대유사암 제외)진단비',
    isEdit: true,
    field02: 1000,
  },
  {
    id: 3,
    field01: '여성통합암(4대유사암 제외)진단비 여성통합암(4대유사암 제외)',
    isEdit: false,
    field02: 1000,
  },
  {
    id: 4,
    field01: '여성통합암(4대유사암 제외)진단비 ',
    isEdit: true,
    field02: 1000,
  },
  {
    id: 4,
    field01: '여성통합암(4대유사암 제외)진단비 ',
    isEdit: true,
    field02: 1000,
  },
  {
    id: 4,
    field01: '여성통합암(4대유사암 제외)진단비 ',
    isEdit: true,
    field02: 1000,
  },
];

const Ltrz085 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '할증담보',
      flex: 10,
      field: 'field01',
      cellClass: (params) => `text-left ${params.node.rowIndex !== 0 ? '!pl-4' : ''}`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
    },
    {
      headerName: '설계금액',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      field: 'field02',
      cellClass: (params) => `text-right ${params.data?.isEdit ? 'editable-cell' : ''}`,
      valueFormatter: numberValueFormatter,
      editable: (params) => params.data?.isEdit === true,
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
              (LTRZ085)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <div className="ag-theme-alpine inner-scroll" data-row={gridRowData.length}>
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

export default Ltrz085;
