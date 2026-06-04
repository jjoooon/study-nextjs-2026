/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

// 2026-05-27 팝업에서 화면으로 변경, 전체 수정

import { AgGridEmptyComponent, createFieldRenderer, renderTbodyTh, numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';

import { Input } from '@uiux/Input';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  field01: [number, boolean];
  field02: [number, boolean];
  field03: [number, boolean];
  field04: [number, boolean];
  field05: [number, boolean];
  field06: [number, boolean];
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: [3950, true],
    field02: [394350, false],
    field03: [39350, false],
    field04: [393650, false],
    field05: [2453950, false],
    field06: [35950, false],
  },
];

// 간결한 number 포매터 래퍼 (numberValueFormatter는 ag-grid에서만 사용, 여기선 직접 포맷)
const simpleNumberFormatter = (value?: number) => {
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  return '';
};

export default function Ltpa010Section() {
  // M1. div 추가
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '구분',
      width: 80,
      cellClass: 'text-center px-0! bg-[#f4f4f4]!',
      autoHeight: true,
      cellRenderer: (_params: ICellRendererParams<DummyDataType>) => renderTbodyTh('보장보험료 합계(원)'),
    },
    {
      headerName: '1형(355간편고지형)',
      flex: 1,
      cellClass: 'text-right px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      valueGetter: (params) => params.data?.field01?.[0],
      valueFormatter: numberValueFormatter,
      cellRenderer: createFieldRenderer<DummyDataType>(
        (data?: DummyDataType) => <span className="tracking-normal">{simpleNumberFormatter(data?.field01?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-normal">{simpleNumberFormatter(data?.field02?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-normal">{simpleNumberFormatter(data?.field03?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-normal">{simpleNumberFormatter(data?.field04?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-normal">{simpleNumberFormatter(data?.field05?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-normal">{simpleNumberFormatter(data?.field06?.[0])}</span>,
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
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '고지유형별 보험료비교',
            pageId: 'LTPA430',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <>
            <Gcol placement="ss" className="gap-3">
              <Gcol gap={2}>
                <Grow placement="bwc" className="w-full" variant={'box-round'}>
                  <FormTable variant="none" cols={['w-1', 'w-auto']}>
                    <FormRow>
                      <FormCell
                        title={'설계번호'}
                        tdClassName="grid grid-cols-[auto_auto_auto_1fr] items-center gap-1 w-full"
                      >
                        <Input aria-label="" width={130} value={'LA26020945959594'} readOnly />
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
              <Gcol placement="ss">
                <Typo variant="body-md" className="w-full text-right">
                  기준 : 가입담보 사항에 해당하는 보장보험료 합계
                </Typo>
                <div className="ag-theme-alpine">
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
                <Typo icon="ref">
                  현재 설계 담보로 계산된 합계보험료비교 내용(실제해당 형으로 변경시 가입불가능한 담보가 포함될 수 있음)
                </Typo>
              </Gcol>
            </Gcol>
          </>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1}>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  닫기
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
