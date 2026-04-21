'use client';
// 권오택
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
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
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

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
    field07: '2,000',
    field08: '1.0',
    field09: '정상',
    field10: '1,000',
  },
  {
    id: 2,
    field01: '당사',
    field02: '-',
    field03: '한화 세이프단체보2',
    field04: '2010-09-30',
    field05: '2099-12-31',
    field06: '암(4대유사암제외)진단비',
    field07: '2,000',
    field08: '1.0',
    field09: '정상',
    field10: '1,000',
  },
  {
    id: 3,
    field01: '당사',
    field02: '-',
    field03: '한화 세이프단체보2 한화 세이프단체보2한화 세이프단체보2한화 세이프단체보2',
    field04: '2010-09-30',
    field05: '2099-12-31',
    field06: '암(4대유사암제외)진단비 암(4대유사암제외)진단비',
    field07: '2,000',
    field08: '20.0',
    field09: '정상',
    field10: '1,000',
  },
  {
    id: 4,
    field01: '교보생명',
    field02: '-',
    field03: '한화 세이프단체보1',
    field04: '2010-09-30',
    field05: '2099-12-31',
    field06: '암(4대유사암제외)진단비',
    field07: '2,000',
    field08: '1.0',
    field09: '정상',
    field10: '1,000',
  },
];
export const Ltpz086 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '회사명',
      field: 'field01',
      width: 100,
      spanRows: true,
      colSpan: (params) => (params.node?.rowPinned ? 9 : 1),
      cellClass: 'flex! items-center! justify-center!',
      cellStyle: (params) => (params.node?.rowPinned ? { textAlign: 'center' } : undefined),
    },
    {
      headerName: '증권번호/설계번호',
      field: 'field02',
      width: 140,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '상품명',
      field: 'field03',
      wrapText: true,
      autoHeight: true,
      flex: 1,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'flex! items-center! justify-start! word-break whitespace-normal',
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
      width: 80,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '보험종기',
      field: 'field05',
      width: 80,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '담보명',
      field: 'field06',
      flex: 1,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
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
      width: 80,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'flex! items-center! justify-end!',
    },
    {
      headerName: '배수',
      field: 'field08',
      width: 60,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'flex! items-center! justify-end!',
    },
    {
      headerName: '상태',
      field: 'field09',
      width: 60,
      colSpan: (params) => (params.node?.rowPinned ? 0 : 1),
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '반영금액',
      field: 'field10',
      width: 80,
      cellClass: 'flex! items-center! justify-end!',
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
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
        <DialogSection className="grid-rows-[auto_1fr] gap-5">
          <TableFold>
            <TableFoldHead title="위배내용">
              <Typo tag="span" variant={'body-md'}>
                단위:원
              </Typo>
            </TableFoldHead>
            <TableFoldBody className="grid-rows-[1fr]">
              <FormTable caption="위배내용" className="" lineTop variant="default">
                <FormRow vertical>
                  <FormCell title="인수제한">청약완료불가(업계누적)</FormCell>
                  <FormCell title="누적명">암진단비(손생보)</FormCell>
                  <FormCell title="누적유형">-</FormCell>
                  <FormCell title="기누적금액">
                    <div className="w-full text-right">5,700</div>
                  </FormCell>
                  <FormCell title="합계">
                    <div className="w-full text-right">4,700</div>
                  </FormCell>
                  <FormCell title="한도">
                    <div className="w-full text-right">30,000</div>
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>

          <TableFold>
            <TableFoldHead title="기계약 사항" />
            <TableFoldBody className="grid-rows-[1fr]">
              <div className="ag-theme-alpine min-h-[18.4rem]">
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
                  rowClassRules={{}}
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
