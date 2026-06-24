/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
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

/** 그리드 행 데이터 타입 정의 (가점/감점/정책요소 공통 사용) */
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

/** 최종 요약 데이터 타입 정의 */
type FinalSummaryData = {
  id: number;
  label: string;
  formula: string;
  point: string;
};

/** 가점계산 영역 임시 데이터 */
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

/** 가점계산 합계 행 데이터 */
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

/** 감점계산 영역 임시 데이터 */
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

/** 감점계산 소계 및 합계 행 데이터 */
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

/** 정책요소 영역 임시 데이터 */
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

/** 최종 청약포인트 요약 데이터 */
const finalSummaryData: FinalSummaryData[] = [
  {
    id: 1,
    label: '최종',
    formula: '가점 합계 - 감점 합계 + 정책 요소',
    point: '136.15',
  },
];

/**
 * Ltpz012: 청약포인트의 상세 산출 내역(가점, 감점, 정책요소 등)을 보여주는 팝업 컴포넌트입니다.
 */
const Ltpz012 = () => {
  /** 특정 합계 행(가점 합계, 감점 소계, 감점 합계)인지 여부를 판별하는 유틸 함수 */
  const isMergedSumRow = (data?: DummyDataType2) => {
    return (
      data?.isSumRow === true &&
      (data.field1 === '가점 합계' || data.field1 === '감점 소계' || data.field1 === '감점 합계')
    );
  };

  /** 화면 해상도에 따른 동적 컬럼 너비 계산 훅 */
  const { attributeColumnWidth } = useDynamicColumnWidths();

  /** 가점/감점/정책요소 그리드용 컬럼 정의 */
  const columnDefs = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '구분',
        field: 'field1',
        minWidth: attributeColumnWidth(90),
        flex: 1,
        cellClass: (params) => {
          if (isMergedSumRow(params.data)) {
            return 'text-center';
          }
          return params.data?.isSumRow ? 'text-center' : 'text-center';
        },
        // 합계 행일 경우 구분 컬럼의 우측 테두리 표시
        cellStyle: (params) => (isMergedSumRow(params.data) ? { borderRight: '1px solid #E5E7EB' } : undefined),
        colSpan: (params) => {
          if (isMergedSumRow(params.data)) {
            return 1;
          }
          // 일반 합계 행은 구분과 누적위험명 컬럼을 병합
          return params.data?.isSumRow ? 2 : 1;
        },
        cellRenderer: (params: ICellRendererParams<DummyDataType2>) =>
          params.data?.isSumRow ? params.value : params.value,
      },
      {
        headerName: '누적위험명',
        field: 'field2',
        flex: 10,
        minWidth: attributeColumnWidth(224),
        cellClass: (params) => {
          if (isMergedSumRow(params.data)) {
            return 'text-right pr-2 font-bold';
          }
          return 'text-center';
        },
        cellStyle: (params) => (isMergedSumRow(params.data) ? { borderRight: '1px solid #E5E7EB' } : undefined),
        colSpan: (params) => {
          // 특정 합계 행은 누적위험명부터 환산포인트, 가입금액 컬럼까지 병합
          if (isMergedSumRow(params.data)) {
            return 3;
          }
          return params.data?.isSumRow ? 0 : 1;
        },
        cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
          if (isMergedSumRow(params.data)) {
            return params.value;
          }
          return params.data?.isSumRow ? null : params.value;
        },
      },
      {
        headerName: '환산포인트',
        field: 'field3',
        minWidth: attributeColumnWidth(200),
        flex: 1,
        // 특정 합계 행인 경우 해당 컬럼의 셀을 렌더링하지 않음 (병합됨)
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
          // 일반 행인 경우 환산포인트 기준과 가점/감점 수치를 나란히 표시
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
        minWidth: attributeColumnWidth(80),
        flex: 1,
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
        minWidth: attributeColumnWidth(70),
        flex: 1,
        cellClass: 'text-right',
        cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
          if (params.data?.isSumRow) {
            return <div className="flex h-full w-full items-center justify-end pl-2">{params.value}</div>;
          }
          return params.value;
        },
      },
    ],
    [attributeColumnWidth]
  );

  /** 최종 합계 그리드용 컬럼 정의 */
  const finalColumnDefs = React.useMemo<ColDef<FinalSummaryData>[]>(
    () => [
      {
        headerName: '최종',
        field: 'label',
        minWidth: attributeColumnWidth(90),
        flex: 1,
        cellClass: 'text-center font-bold',
        cellStyle: { borderRight: '1px solid #E5E7EB' },
        cellRenderer: (params: ICellRendererParams<FinalSummaryData>) => <span>{params.data?.label}</span>,
      },
      {
        headerName: '내용',
        field: 'formula',
        flex: 10,
        cellClass: 'text-right pr-2 font-bold',
        cellStyle: { borderRight: '1px solid #E5E7EB' },
        cellRenderer: (params: ICellRendererParams<FinalSummaryData>) => <span>{params.data?.formula}</span>,
      },
      {
        headerName: '청약포인트',
        field: 'point',
        minWidth: attributeColumnWidth(70),
        flex: 1,
        cellClass: 'text-right font-bold',
        cellRenderer: (params: ICellRendererParams<FinalSummaryData>) => (
          <div className="flex h-full w-full items-center justify-end pl-2">{params.value}</div>
        ),
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="xl">
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

        <DialogSection className="grid h-full grid-rows-[auto_1fr]">
          {/* 상단: 기본 설계 및 피보험자 정보 영역 */}
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="head">
              <FormRow className="grid grid-cols-[1fr_auto]">
                <FormCell
                  title={'설계번호'}
                  tdClassName="grid grid-cols-[auto_minmax(20rem,1fr)] gap-1 w-full"
                  className="whitespace-nowrap"
                >
                  <Input aria-label="설계번호" width={120} value={'LA123456789012'} readOnly />
                  <Input aria-label="상품명" width={'full'} value={'한화 시그니쳐 여성 건강보험4.0'} readOnly />
                </FormCell>
                <FormCell
                  title={'피보험자'}
                  tdClassName="grid grid-cols-[auto_auto] gap-1"
                  className="whitespace-nowrap"
                >
                  <Input aria-label="피보험자명" width={80} value={'홍길순'} readOnly />
                  <Input aria-label="생년월일" width={120} value={'000000-0******'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grid placement="ss" className="min-h-0 w-full overflow-y-auto" gap={4}>
            {/* 1. 가점계산 섹션 */}
            <TableFold>
              <TableFoldHead title="가점계산">
                <Button variant={'outlined'} size={'lg'} color={'secondary'} onClick={() => {}}>
                  청약가점담보목록
                </Button>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={section2Data.length}>
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={section2Data}
                    columnDefs={columnDefs}
                    pinnedBottomRowData={section2SumData}
                    defaultColDef={{ sortable: true, resizable: true }}
                    domLayout={'normal'}
                  />
                </div>
              </TableFoldBody>
            </TableFold>

            {/* 2. 감점계산 섹션 */}
            <TableFold>
              <TableFoldHead title="감점계산" />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={section3Data.length}>
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
                    domLayout={'normal'}
                    // alwaysShowVerticalScroll={true}
                  />
                </div>
              </TableFoldBody>
            </TableFold>

            {/* 3. 정책요소 섹션 */}
            <TableFold>
              <TableFoldHead title="정책요소" />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={policyData.length}>
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

            {/* 4. 최종 요약 섹션 */}
            <TableFold>
              <TableFoldHead title="최종" />
              <TableFoldBody>
                {/* 2026-05-28 */}
                <div className="ag-theme-alpine no-header" style={{ borderTop: '1px solid #ff5c2e' }}>
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

export default Ltpz012;
