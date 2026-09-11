/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createFieldRenderer, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
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
const DummyData1: DummyData1Type[] = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  field1: `CLA342${24 + index}`,
  field2: `${index + 1} 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명`,
  field3: '사망/후유',
  field4: index % 3 === 0 ? '진단서' : '',
  field5: ['암', '뇌', '심', '기타'][index % 4],
}));

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

  const gridRef = React.useRef<AgGridReact<DummyData1Type>>(null);
  const pageSize = 5;
  const [rowData, setRowData] = React.useState<DummyData1Type[]>([]);
  const [loadedCount, setLoadedCount] = React.useState(0);
  const totalCount = DummyData1.length;

  const fetchMockData = React.useCallback(async (page: number, limit: number) => {
    return new Promise<DummyData1Type[]>((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        resolve(DummyData1.slice(start, end));
      }, 100);
    });
  }, []);

  const handleSearch = React.useCallback(async () => {
    const initialData = await fetchMockData(1, pageSize);
    setRowData(initialData);
    setLoadedCount(initialData.length);
  }, [fetchMockData, pageSize]);

  React.useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleLoadNext = React.useCallback(async () => {
    if (loadedCount >= totalCount) return;
    const nextPage = Math.floor(loadedCount / pageSize) + 1;
    const nextData = await fetchMockData(nextPage, pageSize);
    setRowData((prev) => [...prev, ...nextData]);
    setLoadedCount((prev) => prev + nextData.length);
  }, [fetchMockData, loadedCount, totalCount, pageSize]);

  const handleLoadAll = React.useCallback(async () => {
    if (loadedCount >= totalCount) return;
    setRowData(DummyData1);
    setLoadedCount(totalCount);
  }, [loadedCount, totalCount]);

  const handleLoadReset = React.useCallback(() => {
    handleSearch();
  }, [handleSearch]);

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
        <DialogSection className="grid grid-rows-[auto_auto_1fr] gap-3">
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
              <Button color="coolgray" onClick={handleSearch} only="default" size="lg" variant="contained">
                조회
              </Button>
              <Button
                color={'gray'}
                only={'icon'}
                size={'lg'}
                variant={'outlined'}
                onClick={handleSearch}
                aria-label="새로고침"
              >
                <ResetIcon />
              </Button>
            </Grow>
          </Grow>

          <FormTable cols={['w-[11rem]', 'w-auto']}>
            <FormRow className="w-full">
              <FormCell title={'매핑 담보 그룹'}>
                <CheckboxGroup className="gap-x-3 gap-y-1">
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
          <Gcol gap={1} className="overflow-hidden min-h-[21.3rem]" placement="ss">
            <div className="ag-theme-alpine">
              <AgGridReact<DummyData1Type>
                ref={gridRef}
                noRowsOverlayComponent={AgGridEmptyComponent}
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
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
              isAll={true}
              isReset={true}
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
