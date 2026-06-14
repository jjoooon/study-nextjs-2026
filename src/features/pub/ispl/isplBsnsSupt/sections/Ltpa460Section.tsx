/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useState } from 'react';
import * as React from 'react';
import { Grid, Grow, Gcol, Typo } from '@atoms';
import { ResetIcon, FileImportIcon, SearchIcon } from '@icons';
import {
  AgGridEmptyComponent,
  useAgGridInfiniteAppend,
  createTooltipValueGetter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
  field10: string | number;
  field11: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 8,
    field02: '로그구분1',
    field03: '-',
    field04: '2026-03-01',
    field05: '항목명1',
    field06: '항목명2',
    field07: '항목명3',
    field08: '항목명4',
    field09: '항목명5',
    field10: '항목명6',
    field11: '항목명7',
  },
  {
    id: 2,
    field01: 7,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
    field10: '항목명6',
    field11: '항목명7',
  },
  {
    id: 3,
    field01: 6,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
    field10: '항목명6',
    field11: '항목명7',
  },
  {
    id: 4,
    field01: 5,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
    field10: '항목명6',
    field11: '항목명7',
  },
  {
    id: 5,
    field01: 4,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
    field10: '항목명6',
    field11: '항목명7',
  },
  {
    id: 6,
    field01: 3,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
    field10: '항목명6',
    field11: '항목명7',
  },
  {
    id: 7,
    field01: 2,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
    field10: '항목명6',
    field11: '항목명7',
  },
  {
    id: 8,
    field01: 1,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
    field10: 'Data',
    field11: 'Data',
  },
];

export default function Ltpa460Section() {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [coverageName, setCoverageName] = useState('');
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // KEY 컬럼 공통 헤더: 제목 + 상품명 검색 입력 UI
  const productNameHeader = useCallback(
    ({ displayName }: { displayName: string }) => {
      return (
        <Grow className="w-full px-[0.6rem]" placement={'sc'} gap={4}>
          <Grow placement="bwc" className="justify-center!" gap={1}>
            <Typo>{displayName}</Typo>
            <Grow>
              <Input
                aria-label="상품명"
                placeholder=""
                type="text"
                width={90}
                size={'sm'}
                clear={true}
                value={coverageName}
                onChange={(e) => setCoverageName(e.target.value)}
              />
              <Button aria-label="상품명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          </Grow>
        </Grow>
      );
    },
    [coverageName]
  );

  // KEY 컬럼 공통 셀 렌더러: 긴 텍스트는 한 줄 말줄임으로 표시
  const titleRenderer = useCallback((params: ICellRendererParams<DummyDataType>) => {
    return <p className="truncate w-full pl-1.5">{params.data?.field05 ?? ''}</p>;
  }, []);

  const gridRef = React.useRef<any>(null);
  const pageSize = 5;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: rowData,
    pageSize,
  });
  const visibleRows = React.useMemo(() => DummyData.slice(0, loadedCount), [loadedCount]);

  // 2026-06-01 width, flex 수정
  // 2026-06-04 minWidth, flex 수정
  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '번호',
      field: 'field01',
      width: attributeColumnWidth(30),
      cellClass: 'text-center',
      pinned: 'left',
    },
    {
      headerName: '로그구분',
      field: 'field02',
      width: attributeColumnWidth(90),
      pinned: 'left',
    },
    {
      headerName: '거래코드',
      field: 'field03',
      width: attributeColumnWidth(90),
      pinned: 'left',
    },
    {
      headerName: '시작일시',
      field: 'field04',
      width: attributeColumnWidth(90),
      cellClass: 'text-center',
      pinned: 'left',
    },
    {
      headerName: 'KEY1',
      field: 'field05',
      flex: 1,
      minWidth: attributeColumnWidth(180),
      sortable: false,
      filter: false,
      suppressMovable: true, // 이동 방지
      lockPinned: true, // 고정 열에서 제외 방지
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({
        label: 'KEY1',
        field: 'field05',
      }),
      // KEY1~KEY7 컬럼은 동일한 헤더/셀 렌더러 패턴을 재사용
      headerComponent: productNameHeader,
      cellRenderer: titleRenderer,
    },
    {
      headerName: 'KEY2',
      field: 'field06',
      flex: 1,
      minWidth: attributeColumnWidth(180),
      suppressMovable: true, // 이동 방지
      lockPinned: true, // 고정 열에서 제외 방지
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({
        label: 'KEY2',
        field: 'field06',
      }),
      headerComponent: productNameHeader,
      cellRenderer: titleRenderer,
    },
    {
      headerName: 'KEY3',
      field: 'field07',
      flex: 1,
      minWidth: attributeColumnWidth(180),
      suppressMovable: true, // 이동 방지
      lockPinned: true, // 고정 열에서 제외 방지
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({
        label: 'KEY3',
        field: 'field07',
      }),
      headerComponent: productNameHeader,
      cellRenderer: titleRenderer,
    },
    {
      headerName: 'KEY4',
      field: 'field08',
      flex: 1,
      minWidth: attributeColumnWidth(180),
      suppressMovable: true, // 이동 방지
      lockPinned: true, // 고정 열에서 제외 방지
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({
        label: 'KEY4',
        field: 'field08',
      }),
      headerComponent: productNameHeader,
      cellRenderer: titleRenderer,
    },
    {
      headerName: 'KEY5',
      field: 'field09',
      flex: 1,
      minWidth: attributeColumnWidth(180),
      suppressMovable: true, // 이동 방지
      lockPinned: true, // 고정 열에서 제외 방지
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({
        label: 'KEY5',
        field: 'field09',
      }),
      headerComponent: productNameHeader,
      cellRenderer: titleRenderer,
    },
    {
      headerName: 'KEY6',
      field: 'field10',
      flex: 1,
      minWidth: attributeColumnWidth(180),
      suppressMovable: true, // 이동 방지
      lockPinned: true, // 고정 열에서 제외 방지
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({
        label: 'KEY6',
        field: 'field10',
      }),
      headerComponent: productNameHeader,
      cellRenderer: titleRenderer,
    },
    {
      headerName: 'KEY7',
      field: 'field11',
      flex: 1,
      minWidth: attributeColumnWidth(180),
      suppressMovable: true, // 이동 방지
      lockPinned: true, // 고정 열에서 제외 방지
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({
        label: 'KEY7',
        field: 'field11',
      }),
      headerComponent: productNameHeader,
      cellRenderer: titleRenderer,
    },
  ];

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '검증화면 조회',
            pageId: 'LTPA460',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr_auto] h-full w-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
                caption="검증화면 조회 테이블"
                cols={['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'조회기간'}>
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      mode="range"
                      onChange={() => {}}
                      rangeValue={{
                        from: '2026-03-01',
                        to: '2026-03-07',
                      }}
                    />
                  </FormCell>
                  <FormCell title={'검증업무구분'}>
                    <NativeSelect aria-label="검증업무구분 선택" width={108} value={''} onChange={() => {}}>
                      {[
                        { value: 'selection', label: '보험료' },
                        { value: 'selection1', label: '추천보험료' },
                        { value: 'selection2', label: '예상환급금' },
                      ].map((option, index) => (
                        <NativeSelectOption key={index} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'설계번호'}>
                    <Input aria-label="번호" width={150} value={''} />
                  </FormCell>
                  <FormCell title={'발행후변경순번'}>
                    <Input aria-label="번호" width={150} value={''} />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'로그구분'}>
                    <NativeSelect aria-label="로그구분 선택" width={108} value={''} onChange={() => {}}>
                      {[
                        { value: 'selection', id: '', label: '선택' },
                        { value: 'selection1', id: '', label: '선택2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'거개코드'}>
                    <NativeSelect aria-label="거개코드 선택" width={108} value={''} onChange={() => {}}>
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection1', label: '선택1' },
                      ].map((option, index) => (
                        <NativeSelectOption key={index} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
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
            <Gcol className="w-full grid-rows-[auto_1fr_auto]">
              <Grow className="w-full flex justify-end">
                <Button color="success" variant="outlined">
                  엑셀가져오기
                  <FileImportIcon />
                </Button>
              </Grow>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  ref={gridRef}
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={visibleRows}
                  columnDefs={columnDefs}
                  singleClickEdit={true}
                  domLayout="normal"
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
              />
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              <Grow gap={1}>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  저장
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
