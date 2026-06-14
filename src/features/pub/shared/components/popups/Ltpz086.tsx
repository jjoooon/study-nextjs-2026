/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Grow, Typo } from '@atoms';
import { AgGridEmptyComponent, useDynamicColumnWidths, numberValueFormatter } from '@aggrid';
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
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
  field10: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '교보생명',
    field02: 'LA234545233434-3',
    field03: '한화 세이프단체보',
    field04: '2010-09-30',
    field05: '2099-12-31',
    field06: '암(4대유사암제외)진단비',
    field07: 2000,
    field08: '1.0',
    field09: '정상',
    field10: 1000,
  },
  {
    id: 2,
    field01: '당사',
    field02: '-',
    field03: '한화 세이프단체보2',
    field04: '2010-09-30',
    field05: '2099-12-31',
    field06: '암(4대유사암제외)진단비',
    field07: 2000,
    field08: '1.0',
    field09: '청약완료',
    field10: 1000,
  },
  {
    id: 3,
    field01: '당사',
    field02: '-',
    field03: '한화 세이프단체보2 한화 세이프단체보2한화 세이프단체보2한화 세이프단체보2',
    field04: '2010-09-30',
    field05: '2099-12-31',
    field06: '암(4대유사암제외)진단비 암(4대유사암제외)진단비',
    field07: 2000,
    field08: '20.0',
    field09: '정상',
    field10: 1000,
  },
  {
    id: 4,
    field01: '교보생명',
    field02: '-',
    field03: '한화 세이프단체보1',
    field04: '2010-09-30',
    field05: '2099-12-31',
    field06: '암(4대유사암제외)진단비',
    field07: 2000,
    field08: '1.0',
    field09: '정상',
    field10: 1000,
  },
];

type DummyData2Type = {
  id: number;
  field01: string;
  field02: string;
  field03: string;
  field04: number;
  field05: number;
  field06: number;
};
const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    field01: '청약완료불가(업계누적)',
    field02: '암진단비(손생보)',
    field03: '-',
    field04: 4500,
    field05: 4500,
    field06: 30000,
  },
];
const Ltpz086 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '회사명',
      field: 'field01',
      minWidth: attributeColumnWidth(80),
      flex: 1,
      spanRows: true,
      autoHeight: true,
      colSpan: (params) => (params.node?.rowPinned ? 9 : 1),
      cellClass: 'text-center',
      cellStyle: (params) => (params.node?.rowPinned ? { textAlign: 'center' } : undefined),
    },
    {
      headerName: '증권번호/설계번호',
      field: 'field02',
      minWidth: attributeColumnWidth(120),
      flex: 1,
      autoHeight: true,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'text-center',
    },
    {
      headerName: '상품명',
      field: 'field03',
      wrapText: true,
      autoHeight: true,
      flex: 10,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        return (
          <div
            className="h-full w-full py-1.5 leading-[1.3] whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field03 ?? '') }}
          />
        );
      },
    },
    {
      headerName: '보험시기',
      field: 'field04',
      minWidth: attributeColumnWidth(76),
      flex: 1,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '보험종기',
      field: 'field05',
      minWidth: attributeColumnWidth(76),
      flex: 1,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '담보명',
      field: 'field06',
      flex: 15,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      autoHeight: true,
      cellClass: 'flex! items-center! justify-start! word-break whitespace-normal',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        return (
          <div
            className="h-full w-full py-1.5 leading-[1.3] whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field06 ?? '') }}
          />
        );
      },
    },
    {
      headerName: '가입금액',
      field: 'field07',
      minWidth: attributeColumnWidth(70),
      flex: 1,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'text-right',
      autoHeight: true,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '배수',
      field: 'field08',
      minWidth: attributeColumnWidth(46),
      flex: 1,
      autoHeight: true,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'text-center',
    },
    {
      headerName: '상태',
      field: 'field09',
      minWidth: attributeColumnWidth(60),
      flex: 1,
      autoHeight: true,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'text-center',
    },
    {
      headerName: '반영금액',
      field: 'field10',
      minWidth: attributeColumnWidth(70),
      flex: 1,
      autoHeight: true,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  const columnDefs2: ColDef<DummyData2Type>[] = [
    {
      headerName: '인수제한',
      field: 'field01',
      flex: 10,
      cellClass: 'text-center',
    },
    {
      headerName: '누적명',
      field: 'field02',
      flex: 10,
      cellClass: 'text-center',
    },
    {
      headerName: '누적유형',
      field: 'field03',
      flex: 5,
      cellClass: 'text-center',
    },
    {
      headerName: '기누적금액',
      field: 'field04',
      minWidth: attributeColumnWidth(100),
      flex: 1,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '합계',
      field: 'field05',
      minWidth: attributeColumnWidth(100),
      flex: 1,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '한도',
      field: 'field06',
      minWidth: attributeColumnWidth(100),
      flex: 1,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const sumRow = React.useMemo<DummyDataType[]>(() => {
    const parse = (value: string | number) => {
      if (typeof value === 'number') return value;
      const parsed = Number(String(value).replace(/,/g, ''));
      return Number.isFinite(parsed) ? parsed : 0;
    };
    const totalField10 = rowData.reduce((sum, row) => sum + parse(row.field10), 0);
    return [
      {
        id: -1,
        field01: '합계',
        field02: '',
        field03: '',
        field04: '',
        field05: '',
        field06: '',
        field07: '',
        field08: '',
        field09: '',
        field10: totalField10.toLocaleString(),
      },
    ];
  }, [rowData]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              기 누적금액 조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ086)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_auto] gap-3">
          <TableFold>
            <TableFoldHead title="위배내용">
              <Typo tag="span" variant={'body-md'}>
                단위:원
              </Typo>
            </TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine inner-scroll" data-row={DummyData2.length}>
                <AgGridReact<DummyData2Type>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData2}
                  columnDefs={columnDefs2}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                />
              </div>
            </TableFoldBody>
          </TableFold>

          <TableFold>
            <TableFoldHead title="기계약 사항" />
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[30vh]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  pinnedBottomRowData={sumRow}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  enableCellSpan={true}
                  domLayout="normal"
                />
              </div>
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

export default Ltpz086;
