/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter } from '@aggrid';
import { Grow, Typo, Gcol, Grid } from '@atoms';
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
import * as React from 'react';
import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import '@/shared/lib/agGridPub';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};

type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
  },
  {
    id: 2,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
  },
];
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
  },
  {
    id: 2,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
  },
];
const Ltpa095 = () => {
  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '분류',
      field: 'field01',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '대상이되는 부위 또는 질병',
      field: 'field02',
      width: 180,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '부담보기간',
      field: 'field03',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '사유내용',
      field: 'field04',
      flex: 1,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
    },
    {
      headerName: '사유코드',
      field: 'field05',
      width: 100,
      cellClass: 'text-center',
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '할증담보',
      field: 'field01',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '보험기간',
      field: 'field02',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '표준체보험료(원)',
      field: 'field03',
      width: 120,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '할증보험료(원)',
      field: 'field04',
      width: 120,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '적용보험료(원)',
      field: 'field05',
      width: 120,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              조건부 특약 가입 상세
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="gap-3">
          <Grid placement="ss" className="w-full" gap={3}>
            <TableFold variant="default" className="grid-rows-[auto_1fr]">
              <TableFoldHead title="부담보" />
              <TableFoldBody>
                <Gcol className="w-full h-full min-h-[18.4rem]">
                  <div className="ag-theme-alpine ">
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyData}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                </Gcol>
              </TableFoldBody>
            </TableFold>
            <TableFold variant="default">
              <TableFoldHead title="할증" />
              <TableFoldBody>
                <Gcol className="w-full h-full min-h-[18.4rem]">
                  <div className="ag-theme-alpine ">
                    <AgGridReact<DummyDataType2>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyData2}
                      columnDefs={columnDefs2}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                </Gcol>
              </TableFoldBody>
            </TableFold>
          </Grid>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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

export default Ltpa095;
