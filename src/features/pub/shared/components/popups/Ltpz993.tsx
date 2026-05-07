'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent } from '@aggrid';
import { Typo } from '@atoms';
import { Dialog, DialogContent, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
};
const DummyData: DummyDataType[] = [
  { id: 1, field1: '예산-리스크관리', field2: '경영기획 관리자', field3: '조회' },
  { id: 2, field1: '계약관리-신계약', field2: '영업지점 담당자', field3: '조회,등록' },
  { id: 3, field1: '계약관리-보험료', field2: '영업지점 관리자', field3: '조회,수정' },
  { id: 4, field1: '보상관리-사고접수', field2: '보상센터 담당자', field3: '조회,등록,수정' },
  { id: 5, field1: '보상관리-지급심사', field2: '보상센터 관리자', field3: '조회,승인' },
  { id: 6, field1: '고객관리-고객정보', field2: '고객서비스 담당자', field3: '조회' },
  { id: 7, field1: '고객관리-계약조회', field2: '고객서비스 관리자', field3: '조회,수정' },
  { id: 8, field1: '상품관리-상품등록', field2: '상품개발 담당자', field3: '조회,등록,수정,삭제' },
  { id: 9, field1: '통계-영업실적', field2: '경영기획 담당자', field3: '조회' },
  { id: 10, field1: '시스템관리-권한설정', field2: '시스템 관리자', field3: '조회,등록,수정,삭제' },
];

const Ltpz993 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '메뉴명',
      field: 'field1',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '역할명',
      field: 'field2',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '역할권한',
      field: 'field3',
      flex: 1,
      cellClass: 'text-center',
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              화면권한보기
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ993)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <div className="ag-theme-alpine min-h-[18.4rem]">
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
            />
          </div>
        </DialogSection>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz993;
