'use client';

import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

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
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';

import { TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { TableFold } from '@/shared/components/common/TableFold';
import { ResetIcon, RightArrowIcon } from '@/shared/components/icons/CommonIcons';
import { Input } from '@/shared/components/uiux/Input';
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux/NativeSelect';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

// M2. 신규페이지
ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = {
  id: number;
  isChecked?: boolean;
  field01: number;
  field02: string | number;
  field03: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 2,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 3,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 4,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 5,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 6,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 7,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 8,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
];

type DummyDataType2 = {
  id: number;
  isChecked?: boolean;
  field01: number;
  field02: string | number;
};

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 2,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 3,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 4,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 5,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 6,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 7,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 8,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
];

export const Ltpz01701 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '코드',
      field: 'field01',
      width: 70,
      cellClass: 'text-center',
    },
    {
      headerName: '성명/상호명',
      field: 'field02',
      flex: 1,
      cellClass: 'text-left',
    },
    {
      headerName: '구분',
      field: 'field03',
      width: 80,
      cellClass: 'text-center',
    },
  ];
  const columnDefs2: ColDef<DummyDataType>[] = [
    {
      headerName: '코드',
      field: 'field01',
      width: 70,
      cellClass: 'text-center',
    },
    {
      headerName: '성명/상호명',
      field: 'field02',
      flex: 1,
      cellClass: 'text-left',
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              적용대상관리 및 조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ017_01)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable
              variant={'none'}
              lineTop={false}
              caption="보험정보"
              cols={['w-[1rem]', 'w-[2rem]', 'w-[1rem]', 'w-auto']}
            >
              <FormRow>
                <FormCell title={'플랜순번'}>
                  <b>1</b>
                </FormCell>
                <FormCell title={'플랜명'}>
                  <b>한아름_3대진단강화형_특화</b>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grid className="w-full grid grid-flow-col grid-cols-[52%_4%_44%]" placement="ss">
            <TableFold className="w-full">
              <TableFoldHead title="대상" />
              <TableFoldBody className="grid grid-rows-[auto_1fr] gap-[1.2rem]">
                <Grow placement="bwe" className="w-full" variant={'box-round'}>
                  <FormTable variant={'none'} lineTop={false} caption="보험정보" cols={['w-[1rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'직업구분'}>
                        <NativeSelect aria-label="직업구분 선택" width={80} required>
                          {[
                            { value: 'selection', label: '설계사' },
                            { value: 'selection2', label: '대리점' },
                            { value: 'selection3', label: '중개인' },
                            { value: 'selection4', label: '사용인' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'조회구분'}>
                        <NativeSelect aria-label="조회구분 선택" width={80} required>
                          {[
                            { value: 'selection', label: '코드' },
                            { value: 'selection2', label: '상호명' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input aria-label="" width={75} value={'1234567'} required />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                  <Grow>
                    <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                      조회
                    </Button>
                    <Button
                      color={'gray'}
                      only={'icon'}
                      size={'lg'}
                      variant={'outlined'}
                      onClick={() => {}}
                      aria-label="새로고침"
                    >
                      <ResetIcon />
                    </Button>
                  </Grow>
                </Grow>
                <div className="ag-theme-alpine min-h-[18.4rem]">
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    enableCellSpan={true}
                    singleClickEdit={true}
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: false,
                      checkboxes: true,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      width: 30,
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <Gcol className="w-full h-full flex justify-center items-center">
              <Button variant={'none'} size={'lg'} color={'primary'}>
                <RightArrowIcon color="#FF5C2E" />
              </Button>
            </Gcol>
            <TableFold className="w-full">
              <TableFoldHead title="적용대상">
                <Button variant={'outlined'} size={'md'} color={'gray'}>
                  삭제
                </Button>
              </TableFoldHead>
              <TableFoldBody className="grid grid-rows-[1fr]">
                <div className="ag-theme-alpine min-h-[18.4rem]">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
                    enableCellSpan={true}
                    singleClickEdit={true}
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: false,
                      checkboxes: true,
                    }}
                    selectionColumnDef={{
                      headerName: '합계',
                      width: 30,
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
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
