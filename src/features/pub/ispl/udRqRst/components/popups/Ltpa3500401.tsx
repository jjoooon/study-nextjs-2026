'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter } from '@aggrid';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

import { Grow, Typo } from '@/shared/components/atoms';
import { DialogBottomInfo } from '@/shared/components/common/DialogBottomInfo';
import { Button } from '@/shared/components/uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
} from '@/shared/components/uiux/Dialog';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
};

type DummyDataType2 = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
};

const dummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  },
  {
    id: 2,
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  },
];

const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  },
  {
    id: 2,
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '100000000',
  },
];

export const Ltpa3500401 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [rowData] = React.useState<DummyDataType[]>(dummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(dummyData2);
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '분류',
      field: 'field1',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '대상이 되는 부위 또는 질병',
      field: 'field2',
      width: 150,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field2' }),
    },
    {
      headerName: '부담보기간',
      field: 'field3',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '사유내용',
      field: 'field4',
      flex: 1,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field4' }),
    },
    {
      headerName: '사유코드',
      field: 'field5',
      width: 100,
      cellClass: 'text-center',
    },
  ];
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '할증담보',
      field: 'field1',
      flex: 1,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field1' }),
    },
    {
      headerName: '보험기간',
      field: 'field2',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '표준체보험료(원)',
      field: 'field3',
      width: 120,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '할증보험료(원)',
      field: 'field4',
      width: 120,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '적용보험료(원)',
      field: 'field5',
      width: 120,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              조건부 특약 가입 상세
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr_1fr] gap-5">
          <TableFold className="grid-rows-[auto_1fr]">
            <TableFoldHead title="부담보" variant="default" />
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[13.4rem]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  selectionColumnDef={{
                    width: 30,
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </TableFoldBody>
          </TableFold>

          <TableFold className="grid-rows-[auto_1fr]">
            <TableFoldHead title="할증" variant="default" />
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[13.4rem]">
                <AgGridReact<DummyDataType2>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  selectionColumnDef={{
                    width: 30,
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button
                variant={'outlined'}
                size={'xl'}
                color={'gray-light'}
                onClick={onOpenChange ? () => onOpenChange(false) : undefined}
              >
                닫기
              </Button>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
