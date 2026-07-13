/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import * as React from 'react';
import { createTooltipValueGetter } from '@aggrid';
import { Gcol, Grow, Typo, ConTit, ConTitName, Grid } from '@atoms';

import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormTable, FormCell, FormRow } from '@common/FormTable';
import { ArrowDoubleIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: string;
};
type DummyData2Type = {
  id: number;
  field01: string;
  field02: string;
};
type DummyData3Type = {
  id: number;
  field01: string;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01:
      '3대진단 3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단3대진단',
  },
  {
    id: 2,
    field01: '하이클래스',
  },
  {
    id: 3,
    field01: '65세남성용',
  },
];

const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    field01: '1종',
    field02:
      '납입후 50%해약환급금지급형, 납입면제 운영형, 3N5간편고지형2납입후 50%해약환급금지급형, 납입면제 운영형, 3N5간편고지형2납입후 50%해약환급금지급형, 납입면제 운영형, 3N5간편고지형2납입후 50%해약환급금지급형, 납입면제 운영형, 3N5간편고지형2',
  },
  {
    id: 2,
    field01: '2종',
    field02: '납입후 50%해약환급금지급형, 납입면제 운영형, 3N5간편고지형2',
  },
  {
    id: 3,
    field01: '3종',
    field02: '납입후 50%해약환급금지급형, 납입면제 운영형, 3N5간편고지형2',
  },
  {
    id: 4,
    field01: '4종',
    field02: '납입후 50%해약환급금지급형, 납입면제 운영형, 3N5간편고지형2',
  },
];

const DummyData3: DummyData3Type[] = [
  {
    id: 1,
    field01: '1형(345간편고지형)(프리미엄올인원 플렌)',
  },
  {
    id: 2,
    field01:
      '1형(345간편고지형)(프리미엄올인원 플렌)1형(345간편고지형)(프리미엄올인원 플렌)1형(345간편고지형)(프리미엄올인원 플렌)1형(345간편고지형)(프리미엄올인원 플렌)1형(345간편고지형)(프리미엄올인원 플렌)',
  },
  {
    id: 3,
    field01:
      '1형(345간편고지형)(프리미엄올인원 플렌)1형(345간편고지형)(프리미엄올인원 플렌)1형(345간편고지형)(프리미엄올인원 플렌)',
  },
  {
    id: 4,
    field01: '1형(345간편고지형)(프리미',
  },
  {
    id: 5,
    field01: '1형(345간편고지형)(프리',
  },
  {
    id: 6,
    field01: '1형(345간편고지형)(프리미엄올',
  },
  {
    id: 7,
    field01: '1형(345간편고',
  },

  {
    id: 8,
    field01: '1형(345간편고지형)(프',
  },
];

const Ltpz070 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2] = React.useState<DummyData2Type[]>(DummyData2);
  const [rowData3] = React.useState<DummyData3Type[]>(DummyData3);

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(
    () => [
      {
        headerName: '나만의설계',
        field: 'field01',
        flex: 1,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
      },
    ],
    []
  );

  const columnDefs2: (ColDef<DummyData2Type> | ColGroupDef<DummyData2Type>)[] = useMemo(
    () => [
      {
        headerName: '종',
        field: 'field01',
        flex: 1,
        cellClass: 'px-0!',
        tooltipValueGetter: createTooltipValueGetter<DummyData2Type>({ field: 'field02' }),
        cellRenderer: (params: ICellRendererParams<DummyData2Type>) => {
          return (
            <Grid className="h-full w-full grid-cols-[3rem_1fr]">
              <Grow className="border-r border-[#ddddde] h-full " placement="cc">
                {params.data?.field01}
              </Grow>
              <Grow placement="sc">{params.data?.field02}</Grow>
            </Grid>
          );
        },
      },
    ],
    []
  );

  const columnDefs3: (ColDef<DummyData3Type> | ColGroupDef<DummyData3Type>)[] = useMemo(
    () => [
      {
        headerName: '회사플랜',
        field: 'field01',
        flex: 1,
        tooltipValueGetter: createTooltipValueGetter<DummyData3Type>({ field: 'field01' }),
      },
    ],
    []
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              나만의설계 종복사
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ115)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <Grid className="w-full grid-cols-[1fr_auto_1fr]" gap={3} placement="ss">
            <Gcol gap={2}>
              <ConTit>
                <ConTitName>현재</ConTitName>
              </ConTit>
              <FormTable caption="계약자 관련 정보 입력하세요." cols={['w-[6rem]', 'w-[auto]']}>
                <FormRow>
                  <FormCell title="상품명">{'한화 3N5 더간편건강보험(세만기형) 무배당2604'}</FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="종">{'(2종) 납입후50%해약환급금지급형,납입면제 미운형.3N5 간편고지형'}</FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="플랜">
                    <NativeSelect
                      variant="default"
                      size="lg"
                      width="full"
                      required={false}
                      readOnly={false}
                      error={false}
                      errorMsg="선택은 필수입니다."
                      errorPs="bl"
                    >
                      {[
                        { value: 1, label: ' (2종) 납입후50%해약환급금지급형,납입면제 미운형.3N5 간편고지형' },
                        { value: 2, label: ' (3종) 납입후50%해약환급금지급형,납입면제 미운형.3N5 간편고지형' },
                        { value: 3, label: ' (4종) 납입후50%해약환급금지급형,납입면제 미운형.3N5 간편고지형' },
                        { value: 4, label: ' (5종) 납입후50%해약환급금지급형,납입면제 미운형.3N5 간편고지형' },
                      ].map((item) => (
                        <NativeSelectOption key={item.value} value={item.value}>
                          {item.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
              </FormTable>
              <div className="ag-theme-alpine radio-selection inner-scroll" data-row={rowData.length}>
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  singleClickEdit={false}
                  defaultColDef={{
                    sortable: true,
                    resizable: false,
                  }}
                  rowSelection={{
                    mode: 'singleRow',
                    checkboxes: true,
                    enableClickSelection: true,
                  }}
                  selectionColumnDef={{
                    headerName: '선택',
                    width: 30,
                    cellClass: 'text-center',
                  }}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </Gcol>
            <Gcol placement="cc" className="w-[auto] h-full">
              <ArrowDoubleIcon className="w-[2.4rem] h-[2.4rem] rotate-270" />
            </Gcol>
            <Gcol gap={2}>
              <ConTit>
                <ConTitName>복사</ConTitName>
              </ConTit>

              <div className="ag-theme-alpine radio-selection inner-scroll" data-row={rowData2.length}>
                <AgGridReact<DummyData2Type>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  singleClickEdit={false}
                  defaultColDef={{
                    sortable: true,
                    resizable: false,
                  }}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
              <div className="ag-theme-alpine radio-selection inner-scroll" data-row={rowData.length}>
                <AgGridReact<DummyData3Type>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData3}
                  columnDefs={columnDefs3}
                  singleClickEdit={false}
                  defaultColDef={{
                    sortable: true,
                    resizable: false,
                  }}
                  rowSelection={{
                    mode: 'singleRow',
                    checkboxes: true,
                    enableClickSelection: true,
                  }}
                  selectionColumnDef={{
                    headerName: '선택',
                    width: 30,
                    cellClass: 'text-center',
                  }}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </Gcol>
          </Grid>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
              </Button>
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

export default Ltpz070;
