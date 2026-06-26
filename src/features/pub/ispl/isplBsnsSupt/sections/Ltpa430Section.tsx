/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

// 2026-05-27 팝업에서 화면으로 변경, 전체 수정

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createFieldRenderer,
  renderTbodyTh,
  numberValueFormatter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

/**
 * 고지유형별 보험료 비교 데이터 타입 정의
 * 각 필드는 [보험료금액(number), 설계생성 버튼 비활성화 여부(boolean)]의 튜플 구조를 가짐
 */
type DummyDataType = {
  id: number;
  field01: [number, boolean]; // 1형(355간편고지형) 데이터
  field02: [number, boolean]; // 2형(305간편고지형) 데이터
  field03: [number, boolean]; // 3형(305간편고지형) 데이터
  field04: [number, boolean]; // 4형(305간편고지형) 데이터
  field05: [number, boolean]; // 5형(305간편고지형) 데이터
  field06: [number, boolean]; // 6형(305간편고지형) 데이터
};

/**
 * 화면에 표시할 예시용 더미 데이터 설정
 */
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: [3950, true], // 1형: 3,950원, 설계생성 불가(비활성화)
    field02: [394350, false], // 2형: 394,350원, 설계생성 가능(활성화)
    field03: [39350, false], // 3형: 39,350원, 설계생성 가능
    field04: [393650, false], // 4형: 393,650원, 설계생성 가능
    field05: [2453950, false], // 5형: 2,453,950원, 설계생성 가능
    field06: [35950, false], // 6형: 35,950원, 설계생성 가능
  },
];

/**
 * 숫자를 천 단위 쉼표(,)가 포함된 문자열 형태로 포맷하는 단순 포매터 함수
 * @param value 포맷할 숫자값
 * @returns 쉼표로 구분된 숫자 문자열
 */
const simpleNumberFormatter = (value?: number) => {
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  return '';
};

/**
 * LTPA430: 고지유형별 보험료비교 화면 섹션 컴포넌트
 */
export default function Ltpa010Section() {
  // M1. div 추가
  // 반응형 및 화면 크기 대응을 위한 동적 그리드 컬럼 너비 계산 훅
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // ag-Grid 컬럼 정의 구성 (Memoization하여 컬럼 정의 객체 재생성 방지)
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = React.useMemo(
    () => [
      {
        headerName: '구분',
        width: attributeColumnWidth(80),
        cellClass: 'text-center px-0! bg-[#f4f4f4]!',
        autoHeight: true,
        // 구분 열에 보장보험료 합계 라벨을 렌더링
        cellRenderer: (_params: ICellRendererParams<DummyDataType>) => renderTbodyTh('보장보험료 합계(원)'),
      },
      {
        headerName: '1형(355간편고지형)',
        flex: 1,
        cellClass: 'text-right px-0! flex [&>div>span]:h-auto!',
        autoHeight: true,
        valueGetter: (params) => params.data?.field01?.[0],
        valueFormatter: numberValueFormatter,
        // createFieldRenderer를 활용해 셀 내부 영역에 1행(금액), 2행(설계생성 버튼) 구조 생성
        cellRenderer: createFieldRenderer<DummyDataType>(
          // 상단 영역: 보험료 금액 표시
          (data?: DummyDataType) => (
            <div className="tracking-normal px-2">{simpleNumberFormatter(data?.field01?.[0])}</div>
          ),
          // 하단 영역: 설계생성 버튼 표시 (데이터에 설정된 비활성화 flag 활용)
          (data?: DummyDataType) => (
            <div className="text-center!">
              <Button color="secondary" onClick={() => {}} size="sm" variant="outlined" disabled={data?.field01[1]}>
                설계생성
              </Button>
            </div>
          )
        ),
      },
      {
        headerName: '2형(305간편고지형)',
        flex: 1,
        cellClass: 'text-right px-0! flex [&>div>span]:h-auto!',
        autoHeight: true,
        cellRenderer: createFieldRenderer<DummyDataType>(
          // 상단 영역: 보험료 금액 표시
          (data?: DummyDataType) => (
            <div className="tracking-normal px-2">{simpleNumberFormatter(data?.field02?.[0])}</div>
          ),
          // 하단 영역: 설계생성 버튼 표시
          (data?: DummyDataType) => (
            <div className="text-center!">
              <Button
                color="secondary"
                onClick={() => {}}
                only="default"
                size="sm"
                variant="outlined"
                disabled={data?.field02[1]}
              >
                설계생성
              </Button>
            </div>
          )
        ),
      },
      {
        headerName: '3형(305간편고지형)',
        flex: 1,
        field: 'field03',
        cellClass: 'text-right px-0! flex [&>div>span]:h-auto!',
        autoHeight: true,
        cellRenderer: createFieldRenderer<DummyDataType>(
          // 상단 영역: 보험료 금액 표시
          (data?: DummyDataType) => (
            <div className="tracking-normal px-2">{simpleNumberFormatter(data?.field03?.[0])}</div>
          ),
          // 하단 영역: 설계생성 버튼 표시
          (data?: DummyDataType) => (
            <div className="text-center!">
              <Button
                color="secondary"
                onClick={() => {}}
                only="default"
                size="sm"
                variant="outlined"
                disabled={data?.field03[1]}
              >
                설계생성
              </Button>
            </div>
          )
        ),
      },
      {
        headerName: '4형(305간편고지형)',
        flex: 1,
        field: 'field04',
        cellClass: 'text-right px-0! flex [&>div>span]:h-auto!',
        autoHeight: true,
        cellRenderer: createFieldRenderer<DummyDataType>(
          // 상단 영역: 보험료 금액 표시
          (data?: DummyDataType) => (
            <div className="tracking-normal px-2">{simpleNumberFormatter(data?.field04?.[0])}</div>
          ),
          // 하단 영역: 설계생성 버튼 표시
          (data?: DummyDataType) => (
            <div className="text-center!">
              <Button
                color="secondary"
                onClick={() => {}}
                only="default"
                size="sm"
                variant="outlined"
                disabled={data?.field04[1]}
              >
                설계생성
              </Button>
            </div>
          )
        ),
      },
      {
        headerName: '5형(305간편고지형)',
        flex: 1,
        field: 'field05',
        cellClass: 'text-right px-0! flex [&>div>span]:h-auto!',
        autoHeight: true,
        cellRenderer: createFieldRenderer<DummyDataType>(
          // 상단 영역: 보험료 금액 표시
          (data?: DummyDataType) => (
            <div className="tracking-normal px-2">{simpleNumberFormatter(data?.field05?.[0])}</div>
          ),
          // 하단 영역: 설계생성 버튼 표시
          (data?: DummyDataType) => (
            <div className="text-center!">
              <Button
                color="secondary"
                onClick={() => {}}
                only="default"
                size="sm"
                variant="outlined"
                disabled={data?.field05[1]}
              >
                설계생성
              </Button>
            </div>
          )
        ),
      },
      {
        headerName: '6형(305간편고지형)',
        flex: 1,
        field: 'field06',
        cellClass: 'text-right px-0! flex [&>div>span]:h-auto!',
        autoHeight: true,
        cellRenderer: createFieldRenderer<DummyDataType>(
          // 상단 영역: 보험료 금액 표시
          (data?: DummyDataType) => (
            <div className="tracking-normal px-2">{simpleNumberFormatter(data?.field06?.[0])}</div>
          ),
          // 하단 영역: 설계생성 버튼 표시
          (data?: DummyDataType) => (
            <div className="text-center!">
              <Button
                color="secondary"
                onClick={() => {}}
                only="default"
                size="sm"
                variant="outlined"
                disabled={data?.field06[1]}
              >
                설계생성
              </Button>
            </div>
          )
        ),
      },
    ],
    [attributeColumnWidth]
  );

  // 그리드에 주입할 로우 데이터 상태
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <>
      {/* 1. 레이아웃 헤더 영역: 화면명 및 페이지 ID 정의 */}
      <LayoutHead>
        <PageID
          data={{
            pageName: '고지유형별 보험료비교',
            pageId: 'LTPA430',
          }}
        />
      </LayoutHead>

      {/* 2. 메인 바디 레이아웃 템플릿 적용 */}
      <LayoutTemplate
        mainBody={
          <>
            <Gcol placement="ss" className="gap-3">
              <Gcol gap={2}>
                {/* 2.1. 설계기본정보 테이블 카드 (설계번호, 상품명) */}
                <Grow placement="bwc" className="w-full" variant={'box-round'}>
                  <FormTable variant="none" cols={['w-1', 'w-auto']}>
                    <FormRow>
                      <FormCell
                        title={'설계번호'}
                        tdClassName="grid grid-cols-[auto_auto_auto_1fr] items-center gap-1 w-full"
                      >
                        <Input aria-label="" width={130} value={'LA123456789012'} readOnly />
                        -
                        <Input aria-label="" width={30} value={'1'} readOnly />
                        <Input
                          aria-label=""
                          variant={'info'}
                          value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'}
                          readOnly
                        />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>

                {/* 2.2. 고지유형별 설명 안내 박스 */}
                <Gcol variant="box-info" placement="ss">
                  <Typo variant="body-sm" weight={'bold'} icon="info">
                    간편고지 유혈별 보험료 예시
                  </Typo>
                  <Typo variant="body-sm" icon="dot">
                    이 상품은 일반심사보험대비 보험료가 할증되어 있으며, &apos;간편고지&apos; 유형에 따라 할증수준이
                    다릅니다. 보험료수준은 할증폭이 가장 큰 305간편고지에서 355간편고지순으로 저렴해집니다
                  </Typo>
                </Gcol>
              </Gcol>

              {/* 2.3. 보험료 비교 ag-Grid 영역 및 유의사항 */}
              <Gcol placement="ss">
                <Typo variant="body-md" className="w-full text-right">
                  기준 : 가입담보 사항에 해당하는 보장보험료 합계
                </Typo>

                {/* ag-Grid 렌더링 컨테이너 */}
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
                    domLayout="autoHeight"
                  />
                </div>

                {/* 하단 참고 정보 */}
                <Typo icon="ref">
                  현재 설계 담보로 계산된 합계보험료비교 내용(실제해당 형으로 변경시 가입불가능한 담보가 포함될 수 있음)
                </Typo>
              </Gcol>
            </Gcol>
          </>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
