/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useRef, useState } from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { ResetIcon, SearchIcon } from '@icons';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
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
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';

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
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604 한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화화',
    field04: '123647000',
    field05: '2026-06-18-20:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
  {
    id: 2,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화',
    field04: '64700',
    field05: '2026-06-18-10:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
  {
    id: 3,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화',
    field04: '64700',
    field05: '2026-06-18-10:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
  {
    id: 4,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화',
    field04: '64700',
    field05: '2026-06-18-10:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
  {
    id: 5,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화',
    field04: '64700',
    field05: '2026-06-18-10:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
  {
    id: 6,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화화',
    field04: '64700',
    field05: '2026-06-18-10:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
  {
    id: 7,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화화',
    field04: '64700',
    field05: '2026-06-18-10:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
  {
    id: 8,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화화',
    field04: '64700',
    field05: '2026-06-18-10:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
  {
    id: 9,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화화',
    field04: '64700',
    field05: '2026-06-18-10:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
  {
    id: 10,
    field01: 'LA260408138365',
    field02: '한화 더 경증 간편건강 보험(만기형) 무배당 2604',
    field03: '김한화화',
    field04: '64700',
    field05: '2026-06-18-10:24:20',
    field06: '출력가능',
    field07: '미리보기 출력완료',
    field08: '삭제',
  },
];

const Ltpz113 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [searchCategory, setSearchCategory] = useState('selection');
  const gridRef = useRef<AgGridReact<DummyDataType>>(null);

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      field: 'id',
      flex: 1,
      minWidth: attributeColumnWidth(40),
      cellClass: 'text-center',
    },
    {
      headerName: '설계번호',
      field: 'field01',
      width: attributeColumnWidth(105),
      cellClass: 'text-center',
    },
    {
      headerName: '상품명',
      field: 'field02',
      flex: 10,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '피보험자',
      field: 'field03',
      flex: 1,
      minWidth: attributeColumnWidth(65),
      cellClass: 'text-center',
    },
    {
      headerName: '보험료(원)',
      field: 'field04',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '출력예약요청시간',
      field: 'field05',
      width: attributeColumnWidth(125),
      cellClass: 'text-center',
    },
    {
      headerName: '가입제안서',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      field: 'field06',
      cellClass: 'text-center',
      autoHeight: true,
      cellRenderer: () => (
        <Button variant={'outlined'} size={'md'} color={'gray'}>
          출력가능
        </Button>
      ),
    },
    {
      headerName: '청약서류',
      flex: 1,
      minWidth: attributeColumnWidth(140),
      field: 'field07',
      cellClass: 'text-center',
      autoHeight: true,
      cellRenderer: () => (
        <Grow>
          <Button variant={'outlined'} size={'md'} color={'gray'}>
            미리보기
          </Button>
          <Button variant={'outlined'} size={'md'} color={'gray'}>
            출력완료
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '삭제',
      flex: 1,
      minWidth: attributeColumnWidth(50),
      field: 'field08',
      cellClass: 'text-center',
      autoHeight: true,
      cellRenderer: () => (
        <Button variant={'outlined'} size={'md'} color={'gray'}>
          삭제
        </Button>
      ),
    },
  ];

  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(() => DummyData.slice(0, 5));
  const [loadedCount, setLoadedCount] = React.useState(5);
  const [totalCount, setTotalCount] = React.useState(DummyData.length);
  const [isLoading, setIsLoading] = React.useState(false);

  // pagination
  const pageSize = 6;

  // 실데이터 호출 모사 (API 호출)
  const fetchMockData = React.useCallback(async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      // API 호출 대기 시간 모사 (300ms)
      await new Promise((resolve) => setTimeout(resolve, 300));

      const start = (page - 1) * limit;
      const end = start + limit;
      const items = DummyData.slice(start, end);
      return {
        items,
        totalCount: DummyData.length,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 초기 로딩 및 검색 실행
  const handleSearch = React.useCallback(async () => {
    const res = await fetchMockData(1, pageSize);
    setRowData(res.items);
    setLoadedCount(res.items.length);
    setTotalCount(res.totalCount);
  }, [fetchMockData, pageSize]);

  // 다음 버튼 누를 때 데이터 추가 호출 (onLoadNext 콜백)
  const handleLoadNext = React.useCallback(async () => {
    if (loadedCount >= totalCount || isLoading) return;

    const nextPage = Math.ceil(loadedCount / pageSize) + 1;
    const res = await fetchMockData(nextPage, pageSize);

    setRowData((prev) => [...prev, ...res.items]);
    setLoadedCount((prev) => prev + res.items.length);
  }, [loadedCount, totalCount, pageSize, fetchMockData, isLoading]);

  // 전체조회 버튼 누를 때 데이터 호출 (onLoadAll 콜백)
  const handleLoadAll = React.useCallback(async () => {
    if (loadedCount >= totalCount || isLoading) return;

    const res = await fetchMockData(1, totalCount);
    setRowData(res.items);
    setLoadedCount(res.items.length);
  }, [loadedCount, totalCount, fetchMockData, isLoading]);

  // 접기 버튼 (onLoadReset 콜백)
  const handleLoadReset = React.useCallback(() => {
    setRowData((prev) => prev.slice(0, pageSize));
    setLoadedCount(pageSize);
  }, [pageSize]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              간편출력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ113)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'} gap={6}>
            <FormTable variant={'none'} lineTop={false} cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell title={'설계조직'}>
                  <NativeSelect
                    aria-label="설계조직 선택"
                    value={searchCategory}
                    width={100}
                    onChange={(event) => setSearchCategory(event.target.value)}
                    required
                  >
                    {[
                      { value: 'selection', label: '선택' },
                      { value: 'selection2', label: '취급기관' },
                      { value: 'selection3', label: '취급직원' },
                      { value: 'selection4', label: '사용인' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input aria-label="" width={80} value={'1301152'} required />
                  <Input aria-label="" width={150} value={'강북GTA지점'} readOnly />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
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

          <Gcol className="w-full">
            <Grow placement="bwc" className="w-full">
              <RadioGroup defaultValue="단면" className="gap-3">
                {[
                  { value: '단면', label: '단면' },
                  { value: '양면', label: '양면' },
                ].map((option) => (
                  <RadioGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
              <Button variant={'outlined'} color={'gray'}>
                전체삭제
              </Button>
            </Grow>
            <div className="ag-theme-alpine inner-scroll" data-page={pageSize}>
              <AgGridReact<DummyDataType>
                ref={gridRef}
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                domLayout="normal"
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
                animateRows={false}
              />
            </div>
            <TableMore
              gridRef={gridRef}
              loadedCount={loadedCount}
              totalCount={totalCount}
              pageSize={pageSize}
              onLoadAll={handleLoadAll}
              onLoadNext={handleLoadNext}
              onLoadReset={handleLoadReset}
              isReset={true}
            />
          </Gcol>
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning" variant="body-sm">
              출력대기 목록은{' '}
              <em className="font-normal!">
                <b>3일 후</b> 삭제 예정
              </em>
            </Typo>
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

export default Ltpz113;
