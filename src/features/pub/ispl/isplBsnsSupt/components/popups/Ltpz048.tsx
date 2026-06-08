/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, useAgGridPagination, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TablePagination } from '@common/TablePagination';
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
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};
const DummyData: DummyDataType[] = [
  { id: 1, field01: '심사요청', field02: '승인', field03: '김한화김한화김한화' },
  { id: 2, field01: '심사중', field02: '', field03: '김한화한화' },
  { id: 3, field01: '심사처리', field02: '', field03: '김한화' },
  { id: 4, field01: '심사요청', field02: '승인', field03: '김한화' },
  { id: 5, field01: '심사중', field02: '', field03: '김한화' },
  { id: 6, field01: '심사처리', field02: '', field03: '김한화' },
  { id: 7, field01: '심사요청', field02: '승인', field03: '김한화' },
  { id: 8, field01: '심사중', field02: '', field03: '김한화' },
  { id: 9, field01: '심사처리', field02: '', field03: '김한화' },
  { id: 10, field01: '심사요청', field02: '승인', field03: '김한화' },
  { id: 11, field01: '심사중', field02: '', field03: '김한화' },
  { id: 12, field01: '심사처리', field02: '', field03: '김한화' },
];

const Ltpz048 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '',
      width: attributeColumnWidth(40),
      field: 'id',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '구분',
      minWidth: attributeColumnWidth(108),
      flex: 10,
      field: 'field01',
      cellClass: 'text-center',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
    },
    {
      headerName: '결과',
      minWidth: attributeColumnWidth(44),
      flex: 1,
      field: 'field02',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '처리자',
      flex: 10,
      minWidth: attributeColumnWidth(80),
      field: 'field03',
      cellClass: 'text-center',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
    },
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
  const pageSize = 7;
  const { currentPage, totalPages, handleGridReady, handlePageChange } = useAgGridPagination(gridRef, pageSize);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="lg" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              QA 심사이력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ048)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[1fr]">
          <TableFold variant="accordion">
            <TableFoldHead title="QA 심사이력" />
            <TableFoldBody>
              <Grow className="w-full" placement="ss" gap={3}>
                <Grid className="w-[30rem] shrink-0 h-full grid-rows-[1fr_auto]">
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      domLayout="autoHeight"
                      pagination={true}
                      paginationPageSize={pageSize}
                      suppressPaginationPanel={true}
                      ref={gridRef}
                      onGridReady={handleGridReady}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                  <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={pageSize}
                  />
                </Grid>
                <Gcol variant="box-round" placement="ss" className="flex-1 h-[27.6rem]">
                  [보안]
                  <br />
                  1.[15:43]월 보험료 27,130원으로 오안내
                  <br />
                  2.건강고지 전산방영되었으나 녹취 미확인
                </Gcol>
              </Grow>
            </TableFoldBody>
          </TableFold>
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
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz048;
