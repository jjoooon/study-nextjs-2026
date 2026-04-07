'use client';
// 권오택
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, useAgGridInfiniteAppend } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { ResetIcon, SearchIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ038 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
  });
  // dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
    field07: string | number;
    field08: string | number;
    field09: string | number;
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
      field01: '',
      field02: '',
      field03: '',
      field04: 'LA26234242342',
      field05: '김한화',
      field06: '',
      field07: '',
      field08: '2026-03-01',
      field09: '',
    },
    {
      id: 2,
      field01: '',
      field02: '',
      field03: '',
      field04: 'LA26234242342',
      field05: '김한화',
      field06: '',
      field07: '',
      field08: '2026-03-01',
      field09: '',
    },
    {
      id: 3,
      field01: '',
      field02: '',
      field03: '',
      field04: 'LA26234242342',
      field05: '김한화',
      field06: '',
      field07: '',
      field08: '2026-03-01',
      field09: '',
    },
    {
      id: 4,
      field01: '',
      field02: '',
      field03: '',
      field04: 'LA26234242342',
      field05: '김한화',
      field06: '',
      field07: '',
      field08: '2026-03-01',
      field09: '',
    },
    {
      id: 5,
      field01: '',
      field02: '',
      field03: '',
      field04: 'LA26234242342',
      field05: '김한화',
      field06: '',
      field07: '',
      field08: '2026-03-01',
      field09: '',
    },
  ];

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      width: 80,
      field: 'id',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '보종군',
      width: 80,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '보험종목명',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '설계번호',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '계약자',
      flex: 1,
      field: 'field05',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '목적물',
      flex: 1,
      field: 'field06',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '보험료',
      flex: 1,
      field: 'field07',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '설계일자',
      flex: 1,
      field: 'field08',
      cellClass: 'text-left px-1 flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '상태',
      flex: 1,
      field: 'field09',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];

  // rowSelection 사용시

  const pageSize = 3;
  const { loadedCount, totalCount, dataSource, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계검색
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ038)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'보종군'}>
                  <NativeSelect
                    aria-label="보종군 선택"
                    width="10rem"
                    value={form.type01}
                    required
                    onChange={(e) => setFormField('type01', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type01-1', label: '전체' },
                      { value: 'selection2', id: 'type01-2', label: '장기보험' },
                      { value: 'selection3', id: 'type01-3', label: '자동차보험' },
                      { value: 'selection4', id: 'type01-4', label: '화재특종' },
                      { value: 'selection5', id: 'type01-5', label: '해상보험' },
                      { value: 'selection6', id: 'type01-6', label: '퇴직연금' },
                      { value: 'selection7', id: 'type01-7', label: '단체증권' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'조회구분'}>
                  <NativeSelect
                    aria-label="조회구분 선택"
                    width="10rem"
                    value={form.type02}
                    onChange={(e) => setFormField('type02', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type02-1', label: '선택' },
                      { value: 'selection2', id: 'type02-2', label: '피보험자 번호' },
                      { value: 'selection3', id: 'type02-3', label: '계약자 번호' },
                      { value: 'selection4', id: 'type02-4', label: '설계번호' },
                      { value: 'selection5', id: 'type02-5', label: '차량번호' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input aria-label="" width={'16rem'} value={'123123'} readOnly />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                </FormCell>
                <FormCell title={'설계상태'}>
                  <NativeSelect
                    aria-label="설계상태 선택"
                    width="10rem"
                    value={form.type03}
                    required
                    onChange={(e) => setFormField('type03', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type03-1', label: '전체' },
                      { value: 'selection2', id: 'type03-2', label: '전체2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'설계조직'} colSpan={3}>
                  <NativeSelect
                    aria-label="설계조직 선택"
                    width="10rem"
                    value={form.type04}
                    onChange={(e) => setFormField('type04', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type04-1', label: '취급기관' },
                      { value: 'selection2', id: 'type04-2', label: '취급기관2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input aria-label="" width={'16rem'} value={'12345678'} />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input aria-label="" width={'16rem'} value={'신부산GA지점'} readOnly />
                </FormCell>
                <FormCell title={'설계일자'} colSpan={3}>
                  <DatePickerInput
                    errorMsg="입력은 필수입니다."
                    errorPs="bl"
                    mode="range"
                    onChange={() => {}}
                    rangeValue={{
                      from: '2026-03-01',
                      to: '2026-03-07',
                    }}
                    required
                    size="lg"
                    width="sm"
                  />
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

          <Gcol className="w-full">
            <div className="ag-theme-alpine">
              <AgGridReact<DummyDataType>
                key={loadedCount}
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: false,
                  resizable: false,
                }}
                domLayout="autoHeight"
                rowModelType="infinite"
                cacheBlockSize={pageSize}
                maxBlocksInCache={2}
                datasource={dataSource}
              />
            </div>
            <TableMore
              loadedCount={loadedCount}
              totalCount={totalCount}
              pageSize={pageSize}
              onLoadAll={handleLoadAll}
              onLoadNext={handleLoadNext}
            />
          </Gcol>
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
