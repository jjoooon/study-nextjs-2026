/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

/** 유효설계 기한 항목 데이터 타입 */
type DummyDataType = {
  id: number;
  field1: string | number;
  field2: string | number;
};

/** 유효설계 기한 항목 임시 데이터 */
const dummyData: DummyDataType[] = [
  { id: 1, field1: '설계일 ~ 최대 30일', field2: '2026-04-18' },
  { id: 2, field1: '보험나이변경일', field2: '2026-03-24' },
  { id: 3, field1: '상품판매종료일', field2: '2026-03-31' },
  { id: 4, field1: '담보판매종료일', field2: '9999-12-30' },
  { id: 5, field1: '직업코드 변경 종료일자', field2: '' },
];

/** 고객별 중요 기한(상령일, 동의종료일 등) 데이터 타입 */
type DummyDataType2 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
};

/** 고객별 중요 기한 임시 데이터 */
const dummyData2: DummyDataType2[] = [
  { id: 1, field1: '계약자', field2: '홍길순', field3: '2026-03-24 (D-100)', field4: '2026-03-24 (D-100)' },
  { id: 2, field1: '피보험자', field2: '홍길순', field3: '2026-03-24 (D-100)', field4: '2026-03-24 (D-100)' },
  { id: 3, field1: '피보험자', field2: '홍길동', field3: '2026-03-24 (D-100)', field4: '2026-03-24 (D-100)' },
  {
    id: 4,
    field1: '피보험자',
    field2: '반짝반짝빛나리영원히',
    field3: '2026-03-24 (D-100)',
    field4: '2026-03-24 (D-100)',
  },
  { id: 5, field1: '피보험자', field2: '-', field3: '2026-03-24 (D-100)', field4: '2026-03-24 (D-100)' },
  { id: 6, field1: '피보험자', field2: '-', field3: '2026-03-24 (D-100)', field4: '2026-03-24 (D-100)' },
];

/**
 * Ltpz105: 보험계약과 관련된 주요 기한(설계 유효기간, 상령일, 동의 종료일 등)을 안내하는 팝업 컴포넌트입니다.
 */
const Ltpz105 = () => {
  /** 화면 해상도에 따른 컬럼 너비 조절 훅 */
  const { attributeColumnWidth } = useDynamicColumnWidths();

  /** 첫 번째 그리드: 유효설계 기한 항목 컬럼 정의 */
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '유효설계 기한항목',
      field: 'field1',
      flex: 10,
      cellClass: 'text-center',
    },
    {
      headerName: '유효일자',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'text-center',
    },
  ];

  /** 두 번째 그리드: 고객별 상령일 및 동의종료일 컬럼 정의 */
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '구분',
      field: 'field1',
      width: attributeColumnWidth(70),
      cellClass: 'text-center',
    },
    {
      headerName: '고객명',
      field: 'field2',
      flex: 10,
      cellClass: 'text-center', // 2026-05-29 text-center 수정
    },
    {
      headerName: '상령일',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(130),
      cellClass: 'text-center',
      // 상령일 안내를 위해 텍스트 색상을 빨간색으로 표시
      cellRenderer: (params: { value: string | number }) => {
        return (
          <>
            <div className="text-[#e43939]">{params.value}</div>
          </>
        );
      },
    },
    {
      headerName: '동의종료일',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(130),
      cellClass: 'text-center',
      // 동의종료일 안내를 위해 텍스트 색상을 빨간색으로 표시
      cellRenderer: (params: { value: string | number }) => {
        return (
          <>
            <div className="text-[#e43939]">{params.value}</div>
          </>
        );
      },
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(dummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(dummyData2);
  // M2. 신규 페이지
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              보험계약 중요기한 안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ105)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="gap-3">
          {/* 상단: 기본 설계정보 영역 */}
          <Gcol className="w-full" placement="ss">
            <Typo variant={'body-lg'} weight={'bold'}>
              설계정보
            </Typo>
            <Grow className="w-full" variant="box-round" placement={'ss'}>
              <FormTable caption="설계번호" variant="head">
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Input value={'LA123123123123'} variant="info" readOnly />
                  </FormCell>
                  <FormCell title={'보험시기'}>
                    <Input value={'2026-03-18'} variant="info" readOnly />
                  </FormCell>
                  <FormCell title={'유효기한'}>
                    <Input value={'2026-03-18'} variant="info" readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
          </Gcol>

          {/* 중간: 유효설계 기한 목록 그리드 */}
          <Gcol className="w-full" placement="ss" gap={2}>
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
                singleClickEdit={true}
                rowClassRules={{}}
                domLayout="normal"
              />
            </div>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo icon="warning" variant="body-sm">
                상기 유효설계 기한항목 중 가장 작은 날짜로 설정됨
              </Typo>
            </Gcol>
          </Gcol>

          {/* 하단: 고객별 상세 기한 목록 그리드 */}
          <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
            <AgGridReact<DummyDataType2>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData2}
              columnDefs={columnDefs2}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              singleClickEdit={true}
              rowClassRules={{}}
              domLayout="normal"
            />
          </div>
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

export default Ltpz105;
