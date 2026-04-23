'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createFieldRenderer, renderTbodyTh, numberValueFormatter } from '@aggrid';

import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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

export const Ltpa430 = ({ open, onOpenChange }: PopupBaseProps) => {
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
        (data?: DummyDataType) => <span className="tracking-[0]">{simpleNumberFormatter(data?.field01?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-[0]">{simpleNumberFormatter(data?.field02?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-[0]">{simpleNumberFormatter(data?.field03?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-[0]">{simpleNumberFormatter(data?.field04?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-[0]">{simpleNumberFormatter(data?.field05?.[0])}</span>,
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
        (data?: DummyDataType) => <span className="tracking-[0]">{simpleNumberFormatter(data?.field06?.[0])}</span>,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고지유형별 보험료비교
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA430)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol>
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable variant={'head'} lineTop={false} caption="설계번호">
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Input aria-label="" width={150} value={'LA26020945959594'} readOnly />
                    -
                    <Input aria-label="" width={30} value={'1'} readOnly />
                    <Typo variant={'body-sm'}>무배당 1등 엄마의 똑똑한 자녀보힘 1404</Typo>
                    <Typo variant={'body-sm'}>1형(345간편고지형)</Typo>
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
          {/* M1. Gcol, Typo 태그 추가  */}
          <Gcol>
            <Typo variant="body-md" className="w-full text-right">
              기준 : 가입담보 사항에 해당하는 보장보험료 합계
            </Typo>
            <div className="ag-theme-alpine ">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: false,
                  resizable: false,
                }}
                domLayout="autoHeight"
              />
            </div>
          </Gcol>
          <Typo icon="ref">
            현재 설계 담보로 계산된 합계보험료비교 내용(실제해당 형으로 변경시 가입불가능한 담보가 포함될 수 있음)
          </Typo>
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
