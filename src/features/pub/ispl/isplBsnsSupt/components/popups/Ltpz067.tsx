/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Grow, Typo, Gcol, Grid } from '@atoms';
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
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType1 = {
  id: number;
  field01: string;
  field02: number;
  field03: number;
  field04: number;
  field05: number;
  field06: string;
};
type DummyDataType2 = {
  id: number;
  field01: string;
  field02: string;
};
const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    field01: '1회차',
    field02: 38750,
    field03: 0,
    field04: 38750,
    field05: 38750,
    field06: '당사자동차보험기가입자할인(0%), 단체할인(단체취급특별약관적용)(0%), 만12세이하자녀할인(0%)',
  },
  {
    id: 2,
    field01: '2회차',
    field02: 38750,
    field03: 0,
    field04: 38750,
    field05: 38750,
    field06: '당사자동차보험기가입자할인(0%), 단체할인(단체취급특별약관적용)(0%), 만12세이하자녀할인(0%)',
  },
  {
    id: 3,
    field01: '2회차',
    field02: 38750,
    field03: 0,
    field04: 38750,
    field05: 38750,
    field06: '당사자동차보험기가입자할인(0%), 단체할인(단체취급특별약관적용)(0%), 만12세이하자녀할인(0%)',
  },
];
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '단체할인(단체취급특별약관적용)',
    field02:
      '① 적용대상 : 동일한 단체에 소속된 피보험자 10인 이상이 하나의 계약으로 가입하는 경우\n' +
      '② 할인율 : 피보험자 9명 이하 : 할인없음 / 10명~29명: 1% / 30%명 이상 : 2%\n' +
      '③ 할인금액 : 영업보험료에 위한 할인율을 곱한 금액',
  },
  {
    id: 2,
    field01: '만12세이하자녀할인',
    field02:
      '① 적용대상 - 보험계약 체결시 피보험자의 가족관계등록부상 자녀(입양된 자녀 포함) 중 1인 이상이 만12세 이하인 경우\n' +
      '- 보험계약 체결시 피보험자의 가족관계등록부상 자녀(입양된 자녀 포함) 중 1인 이상이 만12세 이하인 경우\n' +
      '- 보험계약 체결 이후 자녀를 새로이 출산 또는 입양한 경우(입양의 경우, 보험계약 체결시점에 만 12세 이하인 경우에만 적용)\n' +
      '② 할인적용',
  },
];

const Ltpz067 = () => {
  const columnDefs1: ColDef<DummyDataType1>[] = [
    {
      headerName: '납입회차',
      field: 'field01',
      width: 100,
      autoHeight: true,
      cellClass: 'text-center',
    },
    {
      headerName: '보장보험료',
      field: 'field02',
      width: 100,
      autoHeight: true,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '적립보험료',
      field: 'field03',
      width: 100,
      autoHeight: true,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '합계보험료',
      field: 'field04',
      width: 100,
      autoHeight: true,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '납입보험료',
      field: 'field05',
      width: 100,
      autoHeight: true,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '상세',
      field: 'field06',
      flex: 1,
      autoHeight: true,
      wrapText: true,
      cellClass: '!leading-[1.4] !py-1',
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '할인명',
      field: 'field01',
      width: 200,
      autoHeight: true,
    },
    {
      headerName: '할인상세',
      field: 'field02',
      flex: 1,
      autoHeight: true,
      wrapText: true,
      cellClass: '!leading-[1.4] !py-1 !whitespace-pre-line',
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              납입보험료상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ067)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Grid className="w-full grid-rows-[auto_1fr_1fr]" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'ss'}>
              <FormTable variant="head">
                <FormRow>
                  <FormCell title={'보험기간'}>
                    <Input aria-label="" width={180} value={'2026-02-01 ~ 2046-02-03'} readOnly />
                  </FormCell>
                  <FormCell title={'만기납기'}>
                    <Input aria-label="" width={200} value={'20년만기/전기납'} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>

            <Gcol placement={'ss'} className="w-full gap-2">
              <TableFold>
                <TableFoldHead title="단체실손의료비 전환대상" />
                <TableFoldBody>
                  <div className="ag-theme-alpine min-h-[19.6rem]">
                    <AgGridReact<DummyDataType1>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyData1}
                      columnDefs={columnDefs1}
                      defaultColDef={{
                        sortable: false,
                        resizable: false,
                      }}
                      enableCellSpan={true}
                    />
                  </div>
                </TableFoldBody>
              </TableFold>
              <Typo variant={'body-sm'} icon={'info'}>
                납입보험료 변동이 예상되는 시점만 표기하였으며 상황에 따라 변동 될 수 있으므로 안내에 유의 필요
              </Typo>
            </Gcol>

            <TableFold>
              <TableFoldHead title="할인종류" />
              <TableFoldBody>
                <div className="ag-theme-alpine min-h-[18.4rem]">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData2}
                    columnDefs={columnDefs2}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    enableCellSpan={true}
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

export default Ltpz067;
