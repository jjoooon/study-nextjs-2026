'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '김한화',
    field02: '1990-01-01',
    field03: '010-****-5651',
  },
];

type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '김한화',
    field02: '20260-01-01 11:22:55',
    field03: '20260-01-01 11:22:55',
    field04: '20260-01-01 11:22:55',
    field05: '동의요청',
  },
  {
    id: 2,
    field01: '김한화',
    field02: '20260-01-01 11:22:55',
    field03: '20260-01-01 11:22:55',
    field04: '20260-01-01 11:22:55',
    field05: '동의요청',
  },
  {
    id: 3,
    field01: '김한화',
    field02: '20260-01-01 11:22:55',
    field03: '20260-01-01 11:22:55',
    field04: '20260-01-01 11:22:55',
    field05: '동의요청',
  },
];

const Ltpz025 = () => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '성명',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0!',
    },
    {
      headerName: '생년월일',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0!',
    },
    {
      headerName: '휴대폰번호',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0!',
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '대상',
      width: 50,
      field: 'field01',
      cellClass: 'text-center px-0! flex! items-center! justify-center!',
      spanRows: true,
    },
    {
      headerName: '발송일시',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0!',
    },
    {
      headerName: '동의일시',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0!',
    },
    {
      headerName: '동의종료일',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center px-0!',
    },
    {
      headerName: '진행상태',
      width: 80,
      field: 'field05',
      cellClass: 'text-center px-0!',
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              [심평원] 진료정보 조회도의 알림톡발송 및 이력관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ025)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Typo tag={'div'} variant={'body-lg'}>
            심사평가원 동의를 위한 알림톡을 발송합니다.
          </Typo>
          <Grid className="grid-rows-[auto_1fr]" gap={3}>
            <Gcol>
              <Grow placement="bwc">
                <Typo variant={'body-lg'} weight={'bold'}>
                  발송 대상
                </Typo>
                <Button variant={'contained'} size={'md'} color={'primary'}>
                  알림톡 전송
                </Button>
              </Grow>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="autoHeight"
                  className="text-center"
                />
              </div>
            </Gcol>
            <TableFold>
              <TableFoldHead title="발송이력"></TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine min-h-[15.3rem]">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    domLayout="normal"
                    className="text-center"
                    enableCellSpan={true}
                  />
                </div>
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
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz025;
