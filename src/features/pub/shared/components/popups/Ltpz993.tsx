/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogHeader, DialogSection, DialogTitle, DialogFooter } from '@uiux/Dialog';

// 화면 권한 정보를 나타내는 데이터 타입 정의
type DummyDataType = {
  id: number;
  field1: string; // 메뉴명
  field2: string; // 역할명
  field3: string; // 역할권한 (조회, 등록, 수정 등)
};

// 그리드에 표시할 임시 데이터
const DummyData: DummyDataType[] = [
  { id: 1, field1: '예산-리스크관리', field2: '경영기획 관리자', field3: '조회' },
  { id: 2, field1: '계약관리-신계약', field2: '영업지점 담당자', field3: '조회,등록' },
  {
    id: 3,
    field1: '계약관리-보험료계약관리-보험료계약관리-보험료계약관리-보험료계약관리-보험료',
    field2: '영업지점 관리자 영업지점 관리자 영업지점 관리자영업지점 관리자',
    field3: '조회,수정조회,수정조회,수정조회,수정조회,수정조회,수정조회,수정',
  },
  { id: 4, field1: '보상관리-사고접수', field2: '보상센터 담당자', field3: '조회,등록,수정' },
  { id: 5, field1: '보상관리-지급심사', field2: '보상센터 관리자', field3: '조회,승인' },
  { id: 6, field1: '고객관리-고객정보', field2: '고객서비스 담당자', field3: '조회' },
  { id: 7, field1: '고객관리-계약조회', field2: '고객서비스 관리자', field3: '조회,수정' },
  { id: 8, field1: '상품관리-상품등록', field2: '상품개발 담당자', field3: '조회,등록,수정,삭제' },
  { id: 9, field1: '통계-영업실적', field2: '경영기획 담당자', field3: '조회' },
  { id: 10, field1: '시스템관리-권한설정', field2: '시스템 관리자', field3: '조회,등록,수정,삭제' },
];

/**
 * Ltpz993: 현재 화면에 접근 가능한 그룹별 역할과 권한 현황을 보여주는 팝업 컴포넌트입니다.
 */
const Ltpz993 = () => {
  // 그리드에 표시할 데이터를 상태로 관리합니다.
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  // Ag-Grid 컬럼 정의: 메뉴명, 역할명, 역할권한 순으로 표시합니다.
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '메뉴명',
      field: 'field1',
      flex: 1,
      cellClass: 'text-center',
      // 내용이 길어질 경우를 대비해 툴팁 기능을 추가합니다.
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field1' }),
    },
    {
      headerName: '역할명',
      field: 'field2',
      flex: 1,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field2' }),
    },
    {
      headerName: '역할권한',
      field: 'field3',
      flex: 1,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field3' }),
    },
  ];

  return (
    <Dialog open>
      {/* showCloseButton: 우측 상단 X 버튼 표시, resizable: 크기 조절 가능, size: 중간 크기 설정 */}
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Grow>
              <Typo tag={'strong'} variant={'heading-lg'}>
                화면권한보기
              </Typo>
              <Typo tag={'p'} variant={'body-xl'}>
                (LTPZ993)
              </Typo>
            </Grow>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          {/* 그리드 영역: 데이터 개수에 따라 높이가 조절되며 내부 스크롤을 지원합니다. */}
          <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
            <AgGridReact<DummyDataType>
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              domLayout="normal"
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              // 텍스트가 잘릴 때 툴팁을 즉시 표시하도록 설정합니다.
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>
        {/* 하단 공통 정보 영역 (연락처 등) */}
        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz993;
