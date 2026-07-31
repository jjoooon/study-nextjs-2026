/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormatDateTime } from '@/shared/hooks/useFormatDateTime';
import { useDynamicColumnWidths, createTooltipValueGetter } from '@aggrid';
import { Grid, Grow } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { ZoomInIcon, ZoomOutIcon, ResetIcon } from '@icons';
import { LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

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
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 2,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병간편심사가이드 인수완화 두통질병간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 3,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '반려',
  },
  {
    id: 4,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '등록',
  },
  {
    id: 5,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '결재중',
  },
  {
    id: 6,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '상신취소',
  },
  {
    id: 7,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '등록',
  },
  {
    id: 8,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '등록',
  },
  {
    id: 9,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '등록',
  },
  {
    id: 10,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '등록',
  },
  {
    id: 11,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '등록',
  },
  {
    id: 12,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '등록',
  },
  {
    id: 13,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 14,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
];

export default function Ltpa070Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const { formatDateTime } = useFormatDateTime();

  // 오늘 날짜 기준 1주일 전 ~ 오늘 계산
  const getInitialDateRange = () => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    const formatDate = (d: Date) => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    return {
      from: formatDate(oneWeekAgo),
      to: formatDate(today),
    };
  };

  const [dateRange, setDateRange] = React.useState(getInitialDateRange);
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '문서',
        field: 'field01',
        flex: 1,
        cellClass: 'text-left',
        minWidth: attributeColumnWidth(200),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
      },
      {
        headerName: '제목',
        field: 'field02',
        flex: 1,
        cellClass: 'text-left',
        minWidth: attributeColumnWidth(200),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
      },
      {
        headerName: '주요내용',
        field: 'field03',
        cellClass: 'text-left',
        flex: 10,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
      },
      {
        headerName: '등록자',
        field: 'field04',
        flex: 1,
        cellClass: 'text-center',
        minWidth: attributeColumnWidth(90),
      },
      {
        headerName: '등록일시',
        field: 'field05',
        flex: 1,
        cellClass: 'text-center',
        minWidth: attributeColumnWidth(120),
      },
      {
        headerName: '수정일시',
        field: 'field06',
        flex: 1,
        cellClass: 'text-center',
        minWidth: attributeColumnWidth(120),
      },
      {
        headerName: '문서번호',
        field: 'field07',
        flex: 1,
        cellClass: 'text-center',
        minWidth: attributeColumnWidth(90),
      },
      {
        headerName: '결재상태',
        field: 'field08',
        flex: 1,
        cellClass: 'text-center',
        minWidth: attributeColumnWidth(60),
      },
    ],
    [attributeColumnWidth, formatDateTime]
  );

  const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
  const pageSize = 10;

  // 초기 렌더는 첫 페이지(10건)만 표시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(() => DummyData.slice(0, 10));
  // 현재 화면에 로드된 누적 건수
  const [loadedCount, setLoadedCount] = React.useState(10);
  // 전체 데이터 건수
  const [totalCount, setTotalCount] = React.useState(DummyData.length);
  // 중복 요청 방지용 로딩 플래그
  const [isLoading, setIsLoading] = React.useState(false);

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
    // 검색은 항상 1페이지부터 재조회
    const res = await fetchMockData(1, pageSize);
    setRowData(res.items);
    setLoadedCount(res.items.length);
    setTotalCount(res.totalCount);
  }, [fetchMockData, pageSize]);

  // 다음 버튼 누를 때 데이터 추가 호출 (onLoadNext 콜백)
  const handleLoadNext = React.useCallback(async () => {
    // 마지막 페이지 도달 또는 로딩 중이면 중복 호출 차단
    if (loadedCount >= totalCount || isLoading) return;

    // 현재 로드 건수 기준으로 다음 페이지 번호 계산
    const nextPage = Math.ceil(loadedCount / pageSize) + 1;
    const res = await fetchMockData(nextPage, pageSize);

    // 기존 목록 하단에 다음 페이지 데이터 이어붙이기
    setRowData((prev) => [...prev, ...res.items]);
    setLoadedCount((prev) => prev + res.items.length);
  }, [loadedCount, totalCount, pageSize, fetchMockData, isLoading]);

  // 전체조회 버튼 누를 때 데이터 호출 (onLoadAll 콜백)
  const handleLoadAll = React.useCallback(async () => {
    // 이미 전체 로드됐거나 로딩 중이면 무시
    if (loadedCount >= totalCount || isLoading) return;

    // 1페이지부터 totalCount만큼 한 번에 조회
    const res = await fetchMockData(1, totalCount);
    setRowData(res.items);
    setLoadedCount(res.items.length);
  }, [loadedCount, totalCount, fetchMockData, isLoading]);

  // 접기 버튼 (onLoadReset 콜백)
  const handleLoadReset = React.useCallback(() => {
    // 현재 목록을 첫 페이지 크기만큼만 유지
    setRowData((prev) => prev.slice(0, pageSize));
    setLoadedCount(pageSize);
  }, [pageSize]);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '결재관리',
            pageId: 'LTPA070',
          }}
        />
      </LayoutHead>

      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid-rows-[auto_1fr] gap-4 h-full">
            <Grow className="w-full items-center" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable variant={'head'} lineTop={false} caption="전자증명서(정부24) 등록 현황 조회">
                <FormRow>
                  <FormCell title={'결재상태'}>
                    <NativeSelect aria-label="결재상태 선택" width={100}>
                      {[
                        { value: 'selection1', id: 'type01-1', label: '전체' },
                        { value: 'selection2', id: 'type01-2', label: '등록' },
                        { value: 'selection3', id: 'type01-3', label: '결재중' },
                        { value: 'selection4', id: 'type01-4', label: '승인' },
                        { value: 'selection5', id: 'type01-5', label: '반려' },
                        { value: 'selection6', id: 'type01-6', label: '상신취소' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'문서번호'}>
                    <Input aria-label="문서번호 입력" width={130} />
                  </FormCell>
                  <FormCell title={'문서발급일자'}>
                    <DatePickerInput
                      mode="range"
                      onChange={(val) => {
                        if (val && typeof val === 'object' && 'from' in val && 'to' in val) {
                          setDateRange(val as { from: string; to: string });
                        }
                      }}
                      rangeValue={dateRange}
                      size="lg"
                    />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Button id="btnRA" color="coolgray" onClick={handleSearch} only="default" size="lg" variant="contained">
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

            <Grid className="grid-rows-[auto_1fr_auto] gap-2">
              <Grow placement="ec">
                <Button color="gray" variant="outlined">
                  파일추가
                  <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
                <Button color="gray" variant="outlined">
                  파일삭제
                  <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
              </Grow>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  ref={gridRef}
                  getRowId={(params) => String(params.data.id)}
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    editable: false,
                    cellClass: 'text-center',
                  }}
                  rowSelection={{
                    mode: 'multiRow',
                    isRowSelectable: (node) =>
                      !['승인', '상신취소', '결재중', '반려'].includes(String(node.data?.field08 ?? '')),
                    headerCheckbox: true,
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    width: attributeColumnWidth(30),
                    cellClass: 'text-center editable-cell',
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
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
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  상신취소(0)
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  결제상신(0)
                </Button>
                <Button size={'xl'}>저장</Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
    </>
  );
}
