/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
<<<<<<< HEAD
import { AgGridEmptyComponent, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
=======
import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
>>>>>>> 08a82133bee210f3d61a591a4401f1ab12e052dc
import { Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

type DummyDataType = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};

const dummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    field01: '1',
    field02: '건물(실손)',
    field03: '1급',
    field04: '9999999999999',
    field05: '9999999999999',
  },
  {
    id: 2,
    isCheck: false,
    field01: '4',
    field02: '시설(실손)',
    field03: '1급',
    field04: '9999999999999',
    field05: '9999999999999',
  },
  {
    id: 3,
    isCheck: false,
    field01: '5',
    field02: '재고자산(실손)',
    field03: '1급',
    field04: '9999999999999',
    field05: '9999999999999',
  },
  {
    id: 4,
    isCheck: false,
    field01: '6',
    field02: '집기비품(실손)',
    field03: '1급',
    field04: '9999999999999',
    field05: '9999999999999',
  },
  {
    id: 5,
    isCheck: false,
    field01: '7',
    field02: 'TEXT',
    field03: '1급',
    field04: '9999999999999',
    field05: '9999999999999',
  },
  {
    id: 6,
    isCheck: false,
    field01: '8',
    field02: 'TEXT',
    field03: '1급',
    field04: '9999999999999',
    field05: '9999999999999',
  },
];

const Ltpz060 = () => {
  const [rowData] = useState<DummyDataType[]>(dummyData);
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '부호',
      field: 'field01',
      flex: 1,
      width: attributeColumnWidth(50),
      cellClass: 'text-center',
    },
    {
      headerName: '구분',
      field: 'field02',
      wrapText: true,
      flex: 2.4,
      cellClass: 'text-center h-full',
    },
    {
      field: 'field03',
      headerName: '급수',
      width: attributeColumnWidth(60),
      cellClass: 'text-center h-full',
    },
    {
      headerName: '목적물가입금액',
      field: 'field04',
      flex: 1,
      cellClass: 'text-right h-full',
      valueFormatter: numberValueFormatter, // 천단위 콤마 표시
    },
    {
      headerName: '가입금액',
      field: 'field05',
      flex: 1,
      cellClass: 'text-right h-full',
      valueFormatter: numberValueFormatter, // 천단위 콤마 표시
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              급배수스프링부호선택
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ060)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable variant="none" cols={['w-1', 'w-auto', 'w-[16rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'증권번호'}>
                  <Input aria-label="" value={'LA2602093135558'} readOnly variant="info" />
                  <Input aria-label="" value={'한화 더 건강한 한아름종합보험 2601'} readOnly variant="info" />
                </FormCell>
                <FormCell title={'준공연도(사용승인연도)'}>
                  <Input aria-label="" value={''} required />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Grid placement={'ss'} className="w-full grid-rows-[1fr_auto] gap-3">
            <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                columnDefs={columnDefs}
                rowData={rowData}
                singleClickEdit={true}
                defaultColDef={{
                  suppressMovable: true,
                }}
                rowSelection={{
                  mode: 'multiRow',
                  headerCheckbox: false,
                  checkboxes: true,
                  enableClickSelection: false,
                }}
                selectionColumnDef={{
                  headerName: '선택',
                  width: 30,
                }}
                domLayout="normal"
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
              />
            </div>
            <TableFold variant={'default'}>
              <TableFoldHead title="계약기본사항"></TableFoldHead>
              <TableFoldBody>
                <FormTable caption={'계약기본사항'} cols={['w-[rem]', 'w-auto', 'w-[10rem]', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'담보명'}>
                      <Input width={'full'} value={'풍수재손해(실손전부보상비)'} readOnly />
                    </FormCell>
                    <FormCell title={'가입금액'}>
                      <Grow placement="sc" gap={2}>
                        <Input width={'full'} value={'0'} readOnly className="[&>input]:text-right" />
                        <Typo variant={'body-sm'} className="w-[3rem]">
                          만원
                        </Typo>
                      </Grow>
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
              <Button variant={'contained'} size={'xl'}>
                확인
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

export default Ltpz060;
