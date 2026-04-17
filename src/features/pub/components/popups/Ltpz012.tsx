'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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
import { Input } from '@uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType2 = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  isSumRow?: boolean;
};

type FinalSummaryData = {
  id: number;
  label: string;
  formula: string;
  point: string;
};

// 가점계산 데이터
const section2Data: DummyDataType2[] = [
  {
    id: 1,
    field1: '(H1)사망후유',
    field2: '일반상해사망',
    field3: '(65세이하)1000만원당',
    field4: '+1.0',
    field5: '17,000',
    field6: '17.00',
  },
  {
    id: 2,
    field1: '(H1)사망후유',
    field2: '일반상해사망',
    field3: '1000만원당',
    field4: '+0.1',
    field5: '2,000',
    field6: '0.20',
  },
  {
    id: 3,
    field1: '(H1)입원/일당',
    field2: '상해출환치성입원비',
    field3: '10만원당',
    field4: '+4.0',
    field5: '50',
    field6: '20.00',
  },
  {
    id: 4,
    field1: '(H1)사망후유',
    field2: '질병사망',
    field3: '1000만원당',
    field4: '+1.0',
    field5: '17,000',
    field6: '42.00',
  },
];

const section2SumData: DummyDataType2[] = [
  {
    id: -1,
    field1: '가점 합계',
    field2: '가산담보합계(H그룹)',
    field3: '',
    field4: '',
    field5: '',
    field6: '137.00',
    isSumRow: true,
  },
];
// 감점계산 데이터
const section3Data: DummyDataType2[] = [
  {
    id: 1,
    field1: '(S1)진단비',
    field2: '유사암진단비(기타피부양)',
    field3: '100만원당',
    field4: '-0.125',
    field5: '50',
    field6: '-0.06',
  },
  {
    id: 2,
    field1: '(S1)진단비',
    field2: '유사암진단(갑상선암)',
    field3: '100만원당',
    field4: '-0.125',
    field5: '50',
    field6: '-0.06',
  },
  {
    id: 3,
    field1: '(S1)진단비',
    field2: '유사암진단비(제자리암)',
    field3: '100만원당',
    field4: '-0.125',
    field5: '50',
    field6: '-0.06',
  },
  {
    id: 4,
    field1: '(S1)진단비',
    field2: '유사암진단비(경계성종양)',
    field3: '100만원당',
    field4: '-0.125',
    field5: '50',
    field6: '-0.06',
  },
];

const section3SumData: DummyDataType2[] = [
  {
    id: -1,
    field1: '감점 소계',
    field2: 'MAX[(MIN(G그룹간) + S그룹), NL(감점한도)]',
    field3: '',
    field4: '',
    field5: '',
    field6: '-0.85',
    isSumRow: true,
  },
  {
    id: -2,
    field1: '(X1)최소필요',
    field2: '일상생활중배상책임',
    field3: '가입시',
    field4: '-12.0',
    field5: '10,000',
    field6: '-10.00',
  },
  {
    id: -3,
    field1: '감점 합계',
    field2: 'MIN(감점 소계, X(필요기준))',
    field3: '',
    field4: '',
    field5: '',
    field6: '-0.85',
    isSumRow: true,
  },
];

const policyData: DummyDataType2[] = [
  {
    id: 1,
    field1: '(PL)정책요소',
    field2: '일상생활중배상책임 보장 충족 여부',
    field3: '보장',
    field4: '+5',
    field5: '0',
    field6: '1.00',
  },
];

const finalSummaryData: FinalSummaryData[] = [
  {
    id: 1,
    label: '최종',
    formula: '가점 합계 - 감점 합계 + 정책 요소',
    point: '136.15',
  },
];

export const Ltpz012 = ({ open, onOpenChange }: PopupBaseProps) => {
  const isMergedSumRow = (data?: DummyDataType2) => {
    return (
      data?.isSumRow === true &&
      (data.field1 === '가점 합계' || data.field1 === '감점 소계' || data.field1 === '감점 합계')
    );
  };

  const columnDefs: ColDef<DummyDataType2>[] = [
    {
      headerName: '구분',
      field: 'field1',
      width: 110,
      cellClass: (params) => {
        if (isMergedSumRow(params.data)) {
          return 'text-center font-bold';
        }
        return params.data?.isSumRow ? 'text-center font-bold' : 'text-center';
      },
      cellStyle: (params) => (isMergedSumRow(params.data) ? { borderRight: '1px solid #E5E7EB' } : undefined),
      colSpan: (params) => {
        if (isMergedSumRow(params.data)) {
          return 1;
        }
        return params.data?.isSumRow ? 2 : 1;
      },
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) =>
        params.data?.isSumRow ? <b>{params.value}</b> : params.value,
    },
    {
      headerName: '누적위험명',
      field: 'field2',
      flex: 1,
      cellClass: (params) => {
        if (isMergedSumRow(params.data)) {
          return 'text-right pr-2 font-bold';
        }
        return 'text-center';
      },
      cellStyle: (params) => (isMergedSumRow(params.data) ? { borderRight: '1px solid #E5E7EB' } : undefined),
      colSpan: (params) => {
        if (isMergedSumRow(params.data)) {
          return 3;
        }
        return params.data?.isSumRow ? 0 : 1;
      },
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        if (isMergedSumRow(params.data)) {
          return <b>{params.value}</b>;
        }
        return params.data?.isSumRow ? null : params.value;
      },
    },
    {
      headerName: '환산포인트',
      field: 'field3',
      width: 220,
      cellClass: 'text-center',
      colSpan: (params) => {
        if (isMergedSumRow(params.data)) {
          return 0;
        }
        return params.data?.isSumRow ? 2 : 1;
      },
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        if (isMergedSumRow(params.data)) {
          return null;
        }
        if (params.data?.isSumRow) {
          return params.value;
        }
        return (
          <div className="grid h-full w-full grid-cols-[7fr_3fr] items-stretch">
            <span className="truncate pr-2">{params.value}</span>
            <span className="flex h-full items-center justify-end border-l border-gray-200 pl-2">
              {params.data?.field4}
            </span>
          </div>
        );
      },
    },
    {
      headerName: '가입금액(만원)',
      field: 'field5',
      width: 110,
      cellClass: 'text-right',
      colSpan: (params) => {
        if (isMergedSumRow(params.data)) {
          return 0;
        }
        return params.data?.isSumRow ? 0 : 1;
      },
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        if (isMergedSumRow(params.data)) {
          return null;
        }
        return params.data?.isSumRow ? null : params.value;
      },
    },
    {
      headerName: '청약포인트',
      field: 'field6',
      width: 100,
      cellClass: 'text-right',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        if (params.data?.isSumRow) {
          return (
            <div className="flex h-full w-full items-center justify-end pl-2">
              <b>{params.value}</b>
            </div>
          );
        }
        return params.value;
      },
    },
  ];

  const finalColumnDefs: ColDef<FinalSummaryData>[] = [
    {
      headerName: '최종',
      field: 'label',
      width: 110,
      cellClass: 'text-center',
      cellStyle: { borderRight: '1px solid #E5E7EB' },
      cellRenderer: (params: ICellRendererParams<FinalSummaryData>) => <b>{params.data?.label}</b>,
    },
    {
      headerName: '내용',
      field: 'formula',
      flex: 1,
      cellClass: 'text-right pr-2',
      cellStyle: { borderRight: '1px solid #E5E7EB' },
      cellRenderer: (params: ICellRendererParams<FinalSummaryData>) => <b>{params.data?.formula}</b>,
    },
    {
      headerName: '청약포인트',
      field: 'point',
      width: 100,
      cellClass: 'text-right',
      cellRenderer: (params: ICellRendererParams<FinalSummaryData>) => (
        <div className="flex h-full w-full items-center justify-end pl-2">
          <b>{params.value}</b>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              청약포인트 상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ012)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid h-full grid-rows-[auto_minmax(0,1fr)]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="기본정보" cols={['w-auto', 'w-auto', 'w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="설계번호" width={140} value={'LA260305361023'} readOnly />
                  <Input aria-label="상품명" width={220} value={'한화 시그니쳐 여성 건강보험4.0'} readOnly />
                </FormCell>
                <FormCell title={'피보험자'}>
                  <Input aria-label="피보험자명" width={80} value={'홍길순'} readOnly />
                  <Input aria-label="생년월일" width={140} value={'940302-2******'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol placement="ss" className="min-h-0 w-full overflow-y-auto" gap={4}>
            {/* 가점계산 */}
            <TableFold>
              <TableFoldHead title="가점계산">
                <Button variant={'outlined'} size={'lg'} color={'secondary'} onClick={() => {}}>
                  청약가점담보목록
                </Button>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={section2Data}
                    columnDefs={columnDefs}
                    pinnedBottomRowData={section2SumData}
                    defaultColDef={{ sortable: true, resizable: true }}
                    domLayout={'autoHeight'}
                  />
                </div>
              </TableFoldBody>
            </TableFold>

            {/* 감점계산 */}
            <TableFold>
              <TableFoldHead title="감점계산" />
              <TableFoldBody>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={section3Data}
                    columnDefs={columnDefs}
                    pinnedBottomRowData={section3SumData}
                    getRowStyle={(params) =>
                      params.node.rowPinned && !params.data?.isSumRow ? { backgroundColor: '#ffffff' } : undefined
                    }
                    defaultColDef={{ sortable: true, resizable: true }}
                    domLayout={'autoHeight'}
                    // alwaysShowVerticalScroll={true}
                  />
                </div>
              </TableFoldBody>
            </TableFold>

            {/* 정책요소 */}
            <TableFold>
              <TableFoldHead title="정책요소" />
              <TableFoldBody>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={policyData}
                    columnDefs={columnDefs}
                    defaultColDef={{ sortable: true, resizable: true }}
                    domLayout={'autoHeight'}
                    // alwaysShowVerticalScroll={true}
                  />
                </div>
              </TableFoldBody>
            </TableFold>

            {/* 최종 */}
            <TableFold>
              <TableFoldHead title="최종" />
              <TableFoldBody>
                <div
                  className="ag-theme-alpine no-header ltpz012-final-grid"
                  style={{ borderTop: '1px solid #ff5c2e' }}
                >
                  <AgGridReact<FinalSummaryData>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={finalSummaryData}
                    columnDefs={finalColumnDefs}
                    headerHeight={0}
                    groupHeaderHeight={0}
                    getRowStyle={() => ({ backgroundColor: '#FFEFEA' })}
                    defaultColDef={{ sortable: true, resizable: true }}
                    rowClassRules={{}}
                    domLayout={'autoHeight'}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Gcol>
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
