'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createFieldRenderer, createTooltipValueGetter, useAgGridInfiniteAppend } from '@aggrid';
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
    field03: '한화보험한화보험한화보험한화보험한화보험한화보험',
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

export const Ltpz038 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      width: 60,
      field: 'id',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '보종군',
      width: 80,
      field: 'field02',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '보험종목명',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
    },
    {
      headerName: '설계번호',
      width: 110,
      cellClass: 'text-center',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataType>((data?: DummyDataType) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {data?.field04}
        </Button>
      )),
    },
    {
      headerName: '계약자',
      width: 80,
      field: 'field05',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '목적물',
      flex: 1,
      field: 'field06',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '보험료',
      flex: 1,
      field: 'field07',
      cellClass: 'text-right',
      autoHeight: true,
    },
    {
      headerName: '설계일자',
      width: 100,
      field: 'field08',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '상태',
      flex: 1,
      field: 'field09',
      cellClass: 'text-center',
      autoHeight: true,
    },
  ];

  // pagination
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
            <FormTable
              variant={'none'}
              lineTop={false}
              caption=""
              cols={['w-[6rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}
            >
              <FormRow>
                <FormCell title={'보종군'}>
                  <NativeSelect aria-label="보종군 선택" width={130} required>
                    {[
                      { value: 'selection', label: '전체' },
                      { value: 'selection2', label: '장기보험' },
                      { value: 'selection3', label: '자동차보험' },
                      { value: 'selection4', label: '화재특종' },
                      { value: 'selection5', label: '해상보험' },
                      { value: 'selection6', label: '퇴직연금' },
                      { value: 'selection7', label: '단체증권' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'조회구분'}>
                  <NativeSelect aria-label="조회구분 선택" width={130}>
                    {[
                      { value: 'selection', label: '선택' },
                      { value: 'selection2', label: '피보험자 번호' },
                      { value: 'selection3', label: '계약자 번호' },
                      { value: 'selection4', label: '설계번호' },
                      { value: 'selection5', label: '차량번호' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input aria-label="" width={160} value={'123123'} readOnly />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                </FormCell>
                <FormCell title={'설계상태'}>
                  <NativeSelect aria-label="설계상태 선택" width={100} required>
                    {[
                      { value: 'selection', label: '전체' },
                      { value: 'selection2', label: '전체2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'설계조직'} colSpan={3}>
                  <NativeSelect aria-label="설계조직 선택" width={130}>
                    {[
                      { value: 'selection', label: '취급기관' },
                      { value: 'selection2', label: '취급기관2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input aria-label="" width={160} value={'12345678'} />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input aria-label="" width={222} value={'신부산GA지점'} readOnly />
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
            <div className="ag-theme-alpine min-h-[18.4rem]">
              <AgGridReact<DummyDataType>
                key={loadedCount}
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                columnDefs={columnDefs}
                domLayout="normal"
                rowModelType="infinite"
                cacheBlockSize={pageSize}
                maxBlocksInCache={2}
                datasource={dataSource}
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
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
