/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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
import { Textarea } from '@uiux/Textarea';
import { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type DetailCheckItem = {
  id: string;
  checked: boolean;
  label: string;
  disabled?: boolean;
};

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field06Items: DetailCheckItem[];
  field07: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '1',
    field02: '2026-03-24 09:54',
    field03: '김정택택',
    field04: '재심사의뢰',
    field05: '',
    field06: '',
    field06Items: [],
    field07: '보기',
  },
  {
    id: 2,
    field01: '2',
    field02: '2026-03-24 10:35',
    field03: '백경희',
    field04: '보완요청',
    field05: '보완요청',
    field06: '',
    field06Items: [
      { id: 'a', checked: true, label: '고지', disabled: true },
      { id: 'b', checked: true, label: '제한담보', disabled: true },
      { id: 'c', checked: true, label: '고지유형변경', disabled: true },
      { id: 'd', checked: true, label: '서류', disabled: true },
      { id: 'e', checked: true, label: '검토불가', disabled: true },
      { id: 'f', checked: true, label: '기타', disabled: true },
    ],
    field07: '보기',
  },
  {
    id: 3,
    field01: '3',
    field02: '2026-03-24 10:35',
    field03: '시스템',
    field04: '결재완료',
    field05: '감액후인수',
    field06: '',
    field06Items: [
      { id: 'a', checked: true, label: '제한담보', disabled: true },
      { id: 'b', checked: true, label: '부담보(부위/질병)', disabled: true },
      { id: 'c', checked: true, label: '보험료 할증', disabled: true },
    ],
    field07: '보기',
  },
  {
    id: 4,
    field01: '4',
    field02: '2026-03-24 10:35',
    field03: '백경희',
    field04: '결재완료',
    field05: '부담보인수',
    field06: '',
    field06Items: [],
    field07: '보기',
  },
  {
    id: 5,
    field01: '5',
    field02: '2026-03-24 10:35',
    field03: '백경희',
    field04: '결재완료',
    field05: '특별조건부인수',
    field06: '',
    field06Items: [],
    field07: '보기',
  },
  {
    id: 6,
    field01: '6',
    field02: '2026-03-24 10:35',
    field03: '백경희',
    field04: '재심사의뢰',
    field05: '',
    field06: '',
    field06Items: [],
    field07: '보기',
  },
  {
    id: 7,
    field01: '7',
    field02: '2026-03-24 10:35',
    field03: '백경희',
    field04: '재심사의뢰',
    field05: '',
    field06: '',
    field06Items: [],
    field07: '보기',
  },
];

const Ltpz090 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '순번',
      field: 'field01',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '일시',
      field: 'field02',
      flex: 1,
      minWidth: attributeColumnWidth(120),
      cellClass: 'text-center',
    },
    {
      headerName: '담당자',
      field: 'field03',
      width: attributeColumnWidth(70),
      cellClass: 'text-center',
    },
    {
      headerName: '작업구분',
      field: 'field04',
      flex: 1,
      minWidth: attributeColumnWidth(150),
      cellClass: 'text-center',
    },
    {
      headerName: '심사결과',
      field: 'field05',
      flex: 1,
      minWidth: attributeColumnWidth(130),
      cellClass: 'text-center',
    },
    {
      headerName: '심사결과 상세',
      field: 'field06',
      flex: 6,
      minWidth: attributeColumnWidth(500),
      cellClass: 'text-left',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        const row = params.data;

        if (!row) {
          return null;
        }

        return (
          <Grow placement="ss" className="w-full gap-2 px-1">
            {row.field06Items.map((item) => (
              <Grow key={item.id}>
                <Checkbox checked disabled>
                  <span>{item.label}</span>
                </Checkbox>
              </Grow>
            ))}
          </Grow>
        );
      },
    },
    {
      headerName: '보기',
      field: 'field07',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      autoHeight: true,
      cellClass: 'text-center',
      sortable: false,
      cellRenderer: () => (
        <Button variant={'outlined'} size={'md'} color={'gray'}>
          보기
        </Button>
      ),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              이력 상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz090)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="gap-3">
          <Grid placement="ss" className="w-full grid-rows-[1fr_auto]" gap={3}>
            <TableFold variant="default" className="grid-rows-[auto_1fr]">
              <TableFoldHead title="심사이력" />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    domLayout="normal"
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            {/* 2026-05-29 placement="ss" */}
            <Grow gap={3} placement="ss">
              <TableFold variant="default">
                <TableFoldHead title="요청자 의견" />
                <TableFoldBody>
                  <Textarea placeholder="" resize={true} className="w-full" readOnly />
                </TableFoldBody>
              </TableFold>
              <TableFold variant="default">
                <TableFoldHead title="작업자 의견" />
                <TableFoldBody>
                  <Textarea placeholder="" resize={true} className="w-full" readOnly />
                </TableFoldBody>
              </TableFold>
            </Grow>
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

export default Ltpz090;
