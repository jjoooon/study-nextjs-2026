/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo, Gcol, Grid } from '@atoms';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
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
import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import '@/shared/lib/agGridPub';

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
    field01: '040',
    field02: '위, 십이지장',
    field03: '0년 0개월',
    field04: '사유 텍스트 노출',
    field05: '',
  },
  {
    id: 2,
    field01: '040',
    field02: '위, 십이지장',
    field03: '0년 0개월',
    field04: '사유 텍스트 노출',
    field05: '',
  },
];
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '상해후유장해(3-100%)(갱신형)',
    field02: '2020-01-01~2050-01-01',
    field03: '10,000',
    field04: '10,000,000',
    field05: '10,000',
  },
  {
    id: 2,
    field01: '상해후유장해(3-100%)(갱신형)',
    field02: '2020-01-01~2050-01-01',
    field03: '10,000',
    field04: '10,000,000',
    field05: '10,000',
  },
];
const Ltpa095 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  
  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '분류',
      field: 'field01',
      width: attributeColumnWidth(70),
    },
    {
      headerName: '대상이되는 부위 또는 질병',
      field: 'field02',
      flex: 2,
      minWidth: attributeColumnWidth(160),
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '부담보기간',
      field: 'field03',
      flex: 1,
      minWidth: attributeColumnWidth(70),
    },
    {
      headerName: '사유내용',
      field: 'field04',
      flex: 1,
      minWidth: attributeColumnWidth(180),
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
    },
    {
      headerName: '사유코드',
      field: 'field05',
      flex: 1,
      minWidth: attributeColumnWidth(70),
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '할증담보',
      field: 'field01',
      flex: 10,
      minWidth: attributeColumnWidth(150),
    },
    {
      headerName: '보험기간',
      field: 'field02',
      flex: 1,
      minWidth: attributeColumnWidth(145),
    },
    {
      headerName: '표준체보험료(원)',
      field: 'field03',
      flex: 1,
      minWidth: attributeColumnWidth(95),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '할증보험료(원)',
      field: 'field04',
      flex: 1,
      minWidth: attributeColumnWidth(95),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '적용보험료(원)',
      field: 'field05',
      flex: 1,
      minWidth: attributeColumnWidth(95),
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
                        cellClass: 'text-center',
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
                        cellClass: 'text-center',
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
