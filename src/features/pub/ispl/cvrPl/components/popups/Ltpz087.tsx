/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { useState } from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogClose,
  DialogFooterArea,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  isSumRow?: boolean;
};

const dummyData: DummyDataType[] = [
  {
    id: 1,
    field01:
      '유형들어갑니다.유형들어갑니다.유형들어갑니다.유형들어갑니다.유형들어갑니다.유형들어갑니다.유형들어갑니다.',
    field02: 100000,
    field03: 100000,
    field04: 100000,
  },
  {
    id: 2,
    field01: '유형들어갑니다.',
    field02: 100000,
    field03: 100000,
    field04: 100000,
  },
  {
    id: 3,
    field01: '',
    field02: 100000,
    field03: 100000,
    field04: 100000,
  },
];

const Ltpz087 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '유형',
        field: 'field01',
        flex: 10,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
      },
      {
        headerName: '가입금액(원)',
        field: 'field02',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '타질권금액(원)',
        field: 'field03',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter,
      },

      {
        headerName: '보험료(만원)',
        field: 'field04',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter,
      },
    ],
    [attributeColumnWidth]
  );

  const [rowData] = useState<DummyDataType[]>(dummyData);
  const sumRow = React.useMemo(() => {
    const parse = (v: string | number) => {
      if (typeof v === 'number') return v;
      if (!v) return 0;
      const n = Number(String(v).replace(/,/g, ''));
      return Number.isFinite(n) ? n : 0;
    };
    const total02 = rowData.reduce((s, r) => s + parse(r.field02), 0);
    const total03 = rowData.reduce((s, r) => s + parse(r.field03), 0);
    const total04 = rowData.reduce((s, r) => s + parse(r.field04), 0);
    return [
      {
        id: -1,
        isSumRow: true,
        field01: '합계',
        field02: total02,
        field03: total03,
        field04: total04,
      },
    ];
  }, [rowData]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              질권설정등록
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ087)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="none" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell title={'설계번호'} tdClassName="grid grid-cols-[auto_1fr] items-center gap-1 w-full">
                  <Input aria-label="" width={'quoteNo'} value={'LA123456789012'} readOnly />
                  <Input aria-label="" value={'한화 BigPlus 재산종합보험 2601'} readOnly />
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'목적물'} tdClassName="grid grid-cols-[auto_1fr] items-center gap-1 w-full">
                  <Input aria-label="" width={250} value={''} readOnly />
                  <Input aria-label="" value={''} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Grid placement={'ss'} className="w-full gap-3 grid-rows-[auto_1fr]">
            <TableFold variant={'accordion'}>
              <TableFoldHead title="질권설정내용" />
              <TableFoldBody>
                <FormTable caption={'질권설정내용'} cols={['w-[10rem]', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'질권자'}>
                      <Input aria-label="" value={''} readOnly />
                      <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                      <Input aria-label="" width={150} value={''} readOnly />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'질권자주소'}>
                      <Gcol placement="ss">
                        <Grow className="w-full">
                          <Input aria-label="" width={120} value={''} readOnly />
                          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <Input aria-label="" width={'full'} value={''} readOnly />
                        </Grow>
                        <Input aria-label="" width={'full'} value={''} readOnly />
                      </Gcol>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'설정기간'}>
                      <DatePickerInput mode={'range'} onChange={() => {}} value="" />
                      <Input aria-label="" width={100} value={''} readOnly />
                      일간
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'질권 설정금액'}>
                      <Input aria-label="" width={150} value={''} commaAmount readOnly />원
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>

            <TableFold variant={'accordion'}>
              <TableFoldHead title="질권설정금액" />
              <TableFoldBody className="gap-2">
                <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                  <AgGridReact<DummyDataType>
                    // ref={gridRef}
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      cellClass: 'p-0',
                      cellStyle: { padding: 0 },
                    }}
                    singleClickEdit={true}
                    domLayout="normal"
                    // row 합계
                    getRowStyle={(params) =>
                      params.node.rowPinned && !params.data?.isSumRow ? { backgroundColor: '#ffffff' } : undefined
                    }
                    pinnedBottomRowData={sumRow}
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
                <FormTable
                  caption={'질권자의 설정 상태'}
                  cols={['w-[5.8rem]', 'w-auto', 'w-[5.8rem]', 'w-auto', 'w-[9.4rem]', 'w-auto']}
                >
                  <FormRow>
                    <FormCell title={'입력자'}>
                      <Input aria-label="" value={''} readOnly />
                    </FormCell>
                    <FormCell title={'입력일'}>
                      <DatePickerInput mode={'single'} onChange={() => {}} value="" readOnly />
                    </FormCell>
                    <FormCell title={'질권설정상태'}>
                      <Input aria-label="" value={''} readOnly />
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                초기화
              </Button>
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

export default Ltpz087;
