/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import {
  AgGridEmptyComponent,
  createTooltipValueGetter,
  numberValueFormatter,
  useAgGridInfiniteAppend,
  useDynamicColumnWidths,
} from '@aggrid';
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
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

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
    field02: '한화보험한',
    field03: '한화보험한화보험한화보험한화보험한화보험한화보험 한화보험한화보험한화보험한화보험한화보험한화보험',
    field04: 'LA123456789012',
    field05: '김한화김한화',
    field06: '',
    field07: 1000,
    field08: '2026-03-01',
    field09: '',
  },
  {
    id: 2,
    field01: '',
    field02: '',
    field03: '',
    field04: 'LA123456789012',
    field05: '김한화한화',
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
  {
    id: 6,
    field01: '',
    field02: '장기보험',
    field03: '무배당 장기보장플랜',
    field04: 'LA777700000001',
    field05: '이한화',
    field06: '',
    field07: 25000,
    field08: '2026-03-02',
    field09: '진행중',
  },
  {
    id: 7,
    field01: '',
    field02: '자동차보험',
    field03: '스마트 자동차보험',
    field04: 'LA777700000002',
    field05: '박한화',
    field06: '',
    field07: 18000,
    field08: '2026-03-03',
    field09: '완료',
  },
  {
    id: 8,
    field01: '',
    field02: '화재특종',
    field03: '종합 화재보장 특약',
    field04: 'LA777700000003',
    field05: '최한화',
    field06: '',
    field07: 32000,
    field08: '2026-03-03',
    field09: '진행중',
  },
  {
    id: 9,
    field01: '',
    field02: '해상보험',
    field03: '해상 적하보험 기본형',
    field04: 'LA777700000004',
    field05: '정한화',
    field06: '',
    field07: 41000,
    field08: '2026-03-04',
    field09: '',
  },
  {
    id: 10,
    field01: '',
    field02: '퇴직연금',
    field03: '퇴직연금 안정형 플랜',
    field04: 'LA777700000005',
    field05: '오한화',
    field06: '',
    field07: 27500,
    field08: '2026-03-05',
    field09: '검토중',
  },
  {
    id: 11,
    field01: '',
    field02: '단체증권',
    field03: '단체 상해보장형',
    field04: 'LA777700000006',
    field05: '조한화',
    field06: '',
    field07: 36500,
    field08: '2026-03-06',
    field09: '완료',
  },
  {
    id: 12,
    field01: '',
    field02: '장기보험',
    field03: '장기 건강보장 특약',
    field04: 'LA777700000007',
    field05: '윤한화',
    field06: '',
    field07: 29000,
    field08: '2026-03-07',
    field09: '진행중',
  },
];

const Ltpz038 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [searchCategory, setSearchCategory] = useState('selection');
  const gridRef = useRef<AgGridReact<DummyDataType>>(null);
  const [pendingScrollIndex, setPendingScrollIndex] = useState<number | null>(null);
  const isInputOnlyCategory = searchCategory === 'selection4' || searchCategory === 'selection5';

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      flex: 1,
      minWidth: attributeColumnWidth(40),
      field: 'id',
      cellClass: 'text-center',
    },
    {
      headerName: '보종군',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      field: 'field02',
      cellClass: 'text-center',
    },
    {
      headerName: '보험종목명',
      flex: 10,
      field: 'field03',
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
    },
    {
      headerName: '설계번호',
      flex: 1,
      field: 'field04',
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center',
      cellRenderer: (params: { value: string | number }) => (
        <Button asChild color="link" only="default" size="lg" variant="text">
          <Link href={`/pub/ispl/LTPA050?designNumber=${encodeURIComponent(String(params.value ?? ''))}`}>
            {params.value}
          </Link>
        </Button>
      ),
    },
    {
      headerName: '계약자',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      field: 'field05',
      cellClass: 'text-center !px-0',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field05' }),
    },
    {
      headerName: '목적물',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      field: 'field06',
      cellClass: 'text-center',
    },
    {
      headerName: '보험료',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      field: 'field07',
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '설계일자',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      field: 'field08',
      cellClass: 'text-center',
    },
    {
      headerName: '상태',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      field: 'field09',
      cellClass: 'text-center',
    },
  ];

  // pagination
  const pageSize = 10;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });

  const visibleRows = useMemo(() => DummyData.slice(0, loadedCount), [loadedCount]);

  useEffect(() => {
    if (pendingScrollIndex === null) {
      return;
    }

    if (loadedCount <= pendingScrollIndex) {
      return;
    }

    requestAnimationFrame(() => {
      gridRef.current?.api.ensureIndexVisible(pendingScrollIndex, 'top');
      setPendingScrollIndex(null);
    });
  }, [loadedCount, pendingScrollIndex]);

  const handleLoadNextWithScroll = () => {
    if (loadedCount >= totalCount) {
      return;
    }

    setPendingScrollIndex(loadedCount);
    handleLoadNext();
  };

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl" className="">
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
          <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
            <FormTable variant={'none'} lineTop={false} cols={['w-1', 'w-auto', 'w-1', 'w-auto', 'w-1', 'w-auto']}>
              <FormRow>
                <FormCell title={'보종군'}>
                  <NativeSelect aria-label="보종군 선택" required>
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
                {/* 2026-05-27 설계번호, 차량번호 선택시 input만 노출로 수정 */}
                <FormCell
                  title={'조회구분'}
                  tdClassName={isInputOnlyCategory ? 'grid grid-cols-[12rem_1fr]' : 'grid grid-cols-[12rem_1fr_auto]'}
                >
                  <NativeSelect
                    aria-label="조회구분 선택"
                    value={searchCategory}
                    onChange={(event) => setSearchCategory(event.target.value)}
                  >
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
                  <Input aria-label="" width="full" value={'123123'} readOnly />
                  {!isInputOnlyCategory && (
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  )}
                </FormCell>
                <FormCell title={'설계상태'}>
                  <NativeSelect aria-label="설계상태 선택" required>
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
                <FormCell title={'설계조직'} colSpan={3} tdClassName="grid grid-cols-[auto_auto_auto_1fr]">
                  <NativeSelect aria-label="설계조직 선택" width={100}>
                    {[
                      { value: 'selection', label: '취급기관' },
                      { value: 'selection2', label: '취급기관2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input aria-label="" width={80} value={'12345678'} />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input aria-label="" value={'신부산GA지점'} readOnly />
                </FormCell>
                <FormCell title={'설계일자'}>
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
            <div className="ag-theme-alpine inner-scroll" data-page={pageSize}>
              <AgGridReact<DummyDataType>
                ref={gridRef}
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={visibleRows}
                columnDefs={columnDefs}
                domLayout="normal"
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
                animateRows={false}
              />
            </div>
            <TableMore
              loadedCount={loadedCount}
              totalCount={totalCount}
              pageSize={pageSize}
              onLoadAll={handleLoadAll}
              onLoadNext={handleLoadNextWithScroll}
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

export default Ltpz038;
