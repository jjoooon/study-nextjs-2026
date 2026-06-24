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

/**
 * 기계약 사항 그리드용 행 데이터 타입
 */
type DummyDataType = {
  id: number;
  field01: string | number; // 회사명
  field02: string | number; // 증권번호/설계번호
  field03: string | number; // 상품명
  field04: string | number; // 보험시기
  field05: string | number; // 보험종기
  field06: string | number; // 담보명
  field07: string | number; // 가입금액
  field08: string | number; // 배수
  field09: string | number; // 상태
  field10: string | number; // 반영금액
};

/**
 * 기계약 사항 그리드용 더미 데이터 목록
 */
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

/**
 * 위배내용 그리드용 행 데이터 타입
 */
type DummyData2Type = {
  id: number;
  field01: string; // 인수제한 사유
  field02: string; // 누적명
  field03: string; // 누적유형
  field04: number; // 기누적금액
  field05: number; // 합계
  field06: number; // 한도
};

/**
 * 위배내용 그리드용 더미 데이터 목록
 */
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

/**
 * @component Ltpz086
 * @description 기 누적금액 조회 팝업 다이얼로그 컴포넌트
 * - 계약 진행 시 한도 초과 또는 인수 조건 위배가 발생한 누적 위배 상세 내역을 제공합니다.
 * - 크게 두 가지 섹션으로 구성됩니다:
 *   1. 위배내용 (인수제한 사유, 누적명, 누적 한도 정보)
 *   2. 기계약 사항 (기존 가입되어 있는 타사 및 당사 계약 정보 리스트 및 합계)
 */
const Ltpz086 = () => {
  // 반응형 그리드 열 너비 계산 훅
  const { attributeColumnWidth } = useDynamicColumnWidths();

  /**
   * 기계약 사항 그리드의 컬럼 레이아웃 정의
   * - Pinned Row(합계행)일 때 첫 열에 9칸 병합 처리를 적용하여 레이아웃을 깨지지 않게 하고 있습니다.
   */
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '회사명',
      field: 'field01',
      minWidth: attributeColumnWidth(80),
      flex: 1,
      spanRows: true,
      autoHeight: true,
      // 하단 합계 행(rowPinned)일 때 가로로 9개 셀을 병합하여 넓게 쓰고, 일반 행일 때는 1셀만 사용
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
      // 합계 행일 때는 회사명 열에 병합(colSpan)되므로 가려짐 (0 처리)
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
      // 텍스트가 줄 바꿈이 되도록 HTML 문자열 적용 처리
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
      // 담보명이 길 경우 줄 바꿈을 위한 렌더링 처리
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
      valueFormatter: numberValueFormatter, // 세 자리 콤마 포맷터 적용
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
      valueFormatter: numberValueFormatter, // 세 자리 콤마 포맷터 적용
    },
  ];

  /**
   * 상단 위배내용 그리드의 컬럼 레이아웃 정의
   */
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

  // 기계약 사항 테이블용 상태 관리
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  /**
   * 기계약 사항 그리드 하단에 고정 표시(Pinned Bottom)할 합계 행 데이터를 동적으로 생성
   */
  const sumRow = React.useMemo<DummyDataType[]>(() => {
    // 세 자리 콤마가 포함된 문자열을 숫자로 변환하는 유틸 함수
    const parse = (value: string | number) => {
      if (typeof value === 'number') return value;
      const parsed = Number(String(value).replace(/,/g, ''));
      return Number.isFinite(parsed) ? parsed : 0;
    };

    // 반영금액(field10) 합산
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
        field10: totalField10.toLocaleString(), // 포맷된 금액 적용
      },
    ];
  }, [rowData]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        {/* 다이얼로그 타이틀 영역 */}
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

        {/* 다이얼로그 본문 영역 */}
        <DialogSection className="grid-rows-[auto_auto] gap-3">
          {/* 섹션 1: 위배내용 */}
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

          {/* 섹션 2: 기계약 사항 */}
          <TableFold>
            <TableFoldHead title="기계약 사항" />
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[30vh]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  pinnedBottomRowData={sumRow} // 하단 합계 로우 고정 적용
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  enableCellSpan={true} // 합계 행의 병합 처리를 위한 셀 스팬 활성화
                  domLayout="normal"
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        {/* 다이얼로그 하단 버튼 영역 */}
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
