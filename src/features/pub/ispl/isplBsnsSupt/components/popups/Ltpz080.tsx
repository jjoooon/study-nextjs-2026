/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createFieldRenderer,
  createTooltipValueGetter,
  useAgGridInfiniteAppend,
  useDynamicColumnWidths,
} from '@aggrid';
import { Grow, Gcol, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { SearchIcon, ResetIcon } from '@icons';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
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

type DummyData1Type = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '',
  },
  {
    id: 2,
    field1: 'CLA34224',
    field2:
      '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '뇌',
  },
  {
    id: 3,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '진단서',
    field5: '암',
  },
  {
    id: 4,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '심',
  },
  {
    id: 5,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '기타',
  },
  {
    id: 6,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '암',
  },
  {
    id: 7,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '뇌',
  },
  {
    id: 8,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '심',
  },
  {
    id: 9,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '기타',
  },
  {
    id: 10,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '암',
  },
  {
    id: 11,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '뇌',
  },
  {
    id: 12,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '심',
  },
  {
    id: 13,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '기타',
  },
  {
    id: 14,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '암',
  },
  {
    id: 15,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '뇌',
  },
  {
    id: 16,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
    field5: '심',
  },
];

const Ltpz080 = () => {
  // 2026-06-01 width, flex 수정
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs1 = React.useMemo<ColDef<DummyData1Type>[]>(
    () => [
      {
        headerName: '담보코드',
        field: 'field1',
        width: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '담보명',
        field: 'field2',
        flex: 7,
        minWidth: attributeColumnWidth(200),
        tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field2' }),
      },
      {
        headerName: '담보그룹',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(140),
        cellClass: 'text-center',
        cellRenderer: createFieldRenderer<DummyData1Type>('field3', 'field5', 'row', [5, 5]),
      },
      {
        headerName: '예외',
        field: 'field4',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );

  const [rowData1] = React.useState<DummyData1Type[]>(DummyData1);
  const gridRef = React.useRef<AgGridReact<DummyData1Type>>(null);
  const pageSize = 5;
  const {
    loadedCount,
    totalCount,
    handleLoadAll: handleLoadAllDefault,
    handleLoadNext: handleLoadNextDefault,
    handleLoadReset: handleLoadResetDefault,
  } = useAgGridInfiniteAppend({
    allRows: rowData1,
    pageSize,
  });

  const handleLoadNext = React.useCallback(() => {
    handleLoadNextDefault();
  }, [handleLoadNextDefault]);

  const handleLoadAll = React.useCallback(() => {
    handleLoadAllDefault();
  }, [handleLoadAllDefault]);

  const handleLoadReset = React.useCallback(() => {
    handleLoadResetDefault();
  }, [handleLoadResetDefault]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보그룹관리 상품시뮬
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ080)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_auto_1fr] gap-3">
          <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
            <FormTable variant="head">
              {/* 260727 - FormRow에 w-full 삭제 */}
              <FormRow>
                <FormCell title={'상품명'} className="shrink-0" tdClassName="flex-1">
                  <Input width={140} value={'LA123123123123'} />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input width={290} aria-label="" value={'한화시그니처여성 건강보험/(1종)'} readOnly />
                </FormCell>
                <FormCell title={'기준일자'}>
                  <DatePickerInput mode="single" onChange={() => {}} value={'2026-04-30'} />
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

          <FormTable cols={['w-[11rem]', 'w-auto']}>
            <FormRow className="w-full">
              <FormCell title={'매핑 담보 그룹'}>
                <CheckboxGroup className="gap-3">
                  {[
                    { value: '사망/후유', label: '사망/후유' },
                    { value: '진단비', label: '진단비' },
                    { value: '입원/통원', label: '입원/통원' },
                    { value: '수술/치료', label: '수술/치료' },
                    { value: '골절/화상', label: '골절/화상' },
                    { value: '검사/지원', label: '검사/지원' },
                    { value: '운전비용', label: '운전비용' },
                    { value: '재물/배상', label: '재물/배상' },
                    { value: '기타', label: '기타' },
                    { value: '미분류', label: '미분류' },
                  ].map((option, idx) => (
                    <CheckboxGroupItem key={'mpg' + idx} value={option.value}>
                      {option.label}
                    </CheckboxGroupItem>
                  ))}
                </CheckboxGroup>
              </FormCell>
            </FormRow>
          </FormTable>

          <Gcol>
            <div className="ag-theme-alpine inner-scroll" data-row={rowData1.length}>
              <AgGridReact<DummyData1Type>
                ref={gridRef}
                noRowsOverlayComponent={AgGridEmptyComponent}
                getRowId={(params) => String(params.data.id)}
                rowData={rowData1.slice(0, loadedCount)}
                columnDefs={columnDefs1}
                defaultColDef={{
                  sortable: true,
                  resizable: true, // 2026-06-01 true로 변경
                }}
                singleClickEdit={true}
                domLayout="normal"
                animateRows={false}
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
                tooltipHideDelay={3000}
              />
            </div>
            <TableMore
              gridRef={gridRef}
              isAll={false}
              loadedCount={loadedCount}
              totalCount={totalCount}
              pageSize={pageSize}
              onLoadAll={handleLoadAll}
              onLoadNext={handleLoadNext}
              onLoadReset={handleLoadReset}
            />
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button size={'xl'}>저장</Button>
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

export default Ltpz080;
