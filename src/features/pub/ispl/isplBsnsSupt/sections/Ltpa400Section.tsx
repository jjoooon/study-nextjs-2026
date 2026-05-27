/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, useAgGridInfiniteAppend } from '@aggrid';
import { Grow, Grid, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon, FileExportIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';

import '@/shared/lib/agGridPub';

// Tab 정의
type Ltpa400TabType = { name: string; value: string; label: string };
const DATA_TABS: Ltpa400TabType[] = [
  { name: '설계요청', value: 'tab1', label: '설계요청' },
  { name: '모집자 설계', value: 'tab2', label: '모집자 설계' },
];

type Ltpa400DummyDataRow = {
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
  field10: string | number;
  field11: string | number;
  field12: string | number;
};
const Ltpa400DummyData: Ltpa400DummyDataRow[] = [
  {
    id: 1,
    field01: '26020923141',
    field02: '신부산GA지점 신부산GA지점 신부산GA지점',
    field03: '에이플러스에이플러스에이플러스-서면(34577)',
    field04: '김한화김한화김한화김한화(4649111)',
    field05: '기타',
    field06: '박한화박한화박한화박한화박한화박한화박한화',
    field07: '2026-03-11 14:33',
    field08: '2026-03-11 15:33',
    field09: '신청중',
    field10: '김한화김한화김한화김한화김한화',
    field11: '심한화',
    field12: 'LA251028678825',
  },
  {
    id: 2,
    field01: '26020923141',
    field02: '신부산GA지점',
    field03: '에이플러스-서면(34577)',
    field04: '김한화(4649111)',
    field05: '종합보험',
    field06: '박한화',
    field07: '2026-03-11 14:33',
    field08: '2026-03-11 15:33',
    field09: '요청취소',
    field10: '김한화',
    field11: '심한화',
    field12: 'LA251028678825',
  },
];

// 2026-05-22 체크박스 삭제, 페이징 추가
type Ltpa400DummyDataRow2 = {
  id: number;
  field01_01: string | number;
  field02_01: string | number;
  field03_01: string | number;
  field04_01: string | number;
  field05_01: string | number;
  field06_01: string | number;
  field07_01: string | number;
  field08_01: string | number;
  field09_01: string | number;
  field10_01: string | number;
  field11_01: string | number;
  field12_01: string | number;
};
const Ltpa400DummyData2: Ltpa400DummyDataRow2[] = [
  {
    id: 1,
    field01_01: '신부산GA지점',
    field02_01: '1301097',
    field03_01: '에이플러스-서면',
    field04_01: '4649111',
    field05_01: '김한화',
    field06_01: '한화 건강쑥쑥 어린이보험',
    field07_01: '우리집안심간편플',
    field08_01: '박한화',
    field09_01: '2026-04-11',
    field10_01: '임한화(8994772)',
    field11_01: 'LA251028678825',
    field12_01: 'LA251028678825',
  },
  {
    id: 2,
    field01_01: '',
    field02_01: ' ',
    field03_01: '',
    field04_01: '',
    field05_01: '',
    field06_01: '',
    field07_01: '',
    field08_01: '',
    field09_01: '',
    field10_01: '',
    field11_01: '',
    field12_01: '',
  },
  {
    id: 3,
    field01_01: '',
    field02_01: ' ',
    field03_01: '',
    field04_01: '',
    field05_01: '',
    field06_01: '',
    field07_01: '',
    field08_01: '',
    field09_01: '',
    field10_01: '',
    field11_01: '',
    field12_01: '',
  },
  {
    id: 4,
    field01_01: '',
    field02_01: ' ',
    field03_01: '',
    field04_01: '',
    field05_01: '',
    field06_01: '',
    field07_01: '',
    field08_01: '',
    field09_01: '',
    field10_01: '',
    field11_01: '',
    field12_01: '',
  },
  {
    id: 5,
    field01_01: '',
    field02_01: ' ',
    field03_01: '',
    field04_01: '',
    field05_01: '',
    field06_01: '',
    field07_01: '',
    field08_01: '',
    field09_01: '',
    field10_01: '',
    field11_01: '',
    field12_01: '',
  },
  {
    id: 6,
    field01_01: '',
    field02_01: ' ',
    field03_01: '',
    field04_01: '',
    field05_01: '',
    field06_01: '',
    field07_01: '',
    field08_01: '',
    field09_01: '',
    field10_01: '',
    field11_01: '',
    field12_01: '',
  },
];

export default function Ltpa400Section() {
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  // 2026-05-22 페이징 추가
  const pageSize = 5;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: Ltpa400DummyData2,
    pageSize,
  });
  const visibleRows = React.useMemo(() => Ltpa400DummyData2.slice(0, loadedCount), [loadedCount]);

  // 2026-05-22 지원SM 버튼으로 변경
  // 2026-05-27 담당SM 버튼으로 변경
  const columnDefs: ColDef<Ltpa400DummyDataRow>[] = [
    {
      headerName: '설계접수번호',
      field: 'field01',
      width: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '지점',
      field: 'field02',
      width: 150,
      cellClass: 'truncate',
      tooltipValueGetter: createTooltipValueGetter<Ltpa400DummyDataRow>({ field: 'field02' }),
    },
    {
      headerName: '대리점',
      field: 'field03',
      flex: 1,
      minWidth: 150,
      cellClass: 'truncate',
      tooltipValueGetter: createTooltipValueGetter<Ltpa400DummyDataRow>({ field: 'field03' }),
    },
    {
      headerName: '사용인',
      field: 'field04',
      width: 120,
      cellRenderer: (params: ICellRendererParams<Ltpa400DummyDataRow>) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="none" size="md" only="icon" className="truncate w-full block">
              {params.data?.field04}
            </Button>
          </TooltipTrigger>
          <TooltipContent variant="default" side="top" align="center" sideOffset={5}>
            {'사용인에 대한 안내 메시지입니다.'}
          </TooltipContent>
        </Tooltip>
      ),
    },
    {
      headerName: '상품',
      field: 'field05',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '고객명',
      field: 'field06',
      width: 130,
      cellClass: 'truncate text-center',
      tooltipValueGetter: createTooltipValueGetter<Ltpa400DummyDataRow>({ field: 'field06' }),
    },
    {
      headerName: '요청일시',
      field: 'field07',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '처리일시',
      field: 'field08',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '진행상태',
      field: 'field09',
      width: 130,
      cellClass: 'text-center',
    },
    {
      headerName: '담당SM',
      field: 'field10',
      width: 120,
      cellClass: 'truncate text-center',
      tooltipValueGetter: createTooltipValueGetter<Ltpa400DummyDataRow>({ field: 'field10' }),
      cellRenderer: (params: ICellRendererParams<Ltpa400DummyDataRow>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.data?.field10 ?? ''}
        </Button>
      ),
    },
    {
      headerName: '지원SM',
      field: 'field11',
      width: 120,
      cellClass: 'truncate text-center',
      tooltipValueGetter: createTooltipValueGetter<Ltpa400DummyDataRow>({ field: 'field11' }),
      cellRenderer: (params: ICellRendererParams<Ltpa400DummyDataRow>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.data?.field11 ?? ''}
        </Button>
      ),
    },
    {
      headerName: '설계번호',
      field: 'field12',
      width: 110,
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<Ltpa400DummyDataRow>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.data?.field12 ?? ''}
        </Button>
      ),
    },
  ];

  // Tab2 AGGrid Column
  const columnDefs2: ColDef<Ltpa400DummyDataRow2>[] = [
    {
      headerName: 'No',
      field: 'id',
      width: 40,
      cellClass: 'text-center',
    },
    {
      headerName: '지점',
      field: 'field01_01',
      cellClass: 'text-center',
      flex: 1,
    },
    {
      headerName: '대리점코드',
      field: 'field02_01',
      cellClass: 'text-center',
      flex: 1,
    },
    {
      headerName: '대리점명',
      field: 'field03_01',
      cellClass: 'text-center',
      flex: 1.2,
    },
    {
      headerName: '사용인코드',
      field: 'field04_01',
      cellClass: 'text-center',
      flex: 0.8,
    },
    {
      headerName: '사용인명',
      field: 'field05_01',
      cellClass: 'text-center',
      flex: 0.8,
    },
    {
      headerName: '상품명',
      field: 'field06_01',
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<Ltpa400DummyDataRow2>({ field: 'field06_01' }),
      flex: 1.4,
    },
    {
      headerName: '플랜명',
      field: 'field07_01',
      cellClass: 'text-left',
      flex: 1,
    },
    {
      headerName: '고객명',
      field: 'field08_01',
      cellClass: 'text-center',
      flex: 0.7,
    },
    {
      headerName: '설계일자',
      field: 'field09_01',
      cellClass: 'text-center',
      flex: 1,
    },
    {
      headerName: '담당SM',
      field: 'field10_01',
      cellClass: 'text-center',
      flex: 1,
    },
    {
      headerName: '설계번호',
      field: 'field11_01',
      cellClass: 'text-center',
      flex: 1,
      cellRenderer: (params: ICellRendererParams<Ltpa400DummyDataRow2>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.data?.field11_01 ?? ''}
        </Button>
      ),
    },
    {
      headerName: '증권번호',
      field: 'field12_01',
      cellClass: 'text-center',
      flex: 1,
    },
  ];

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
  });
  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '장기보험_가입설계요청',
            pageId: 'LTPA400',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={6}
            variant="default"
            hasTableBelow={true}
            error={false}
            errorMsg="에러 메시지 예시"
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            renderDropdownItem={false}
          >
            {active === 'tab1' && (
              <Grid className="w-full grid-rows-[auto_1fr] gap-3 h-full">
                <Grow className="w-full" variant="box-round-b" placement={'bwe'}>
                  <FormTable
                    variant={'head'}
                    lineTop={false}
                    caption="장기보험 설계요청 조회 테이블"
                    cols={['w-1', 'w-auto', 'w-1', 'w-auto', 'w-1', 'w-auto']}
                  >
                    <FormRow>
                      <FormCell title={'조회구분'}>
                        <NativeSelect
                          aria-label="조회구분 선택"
                          width={120}
                          value={form.type01}
                          onChange={(e) => setFormField('type01', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type01-1', label: '지점1' },
                            { value: 'selection2', id: 'type01-2', label: '지점2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input
                          aria-label=""
                          width={150}
                          value={form.type02 || '12345678'}
                          onChange={(e) => setFormField('type02', e.target.value)}
                        />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={200} value={'신부산지점GA지점'} readOnly />
                      </FormCell>
                      <FormCell title={'설계일자'}>
                        <DatePickerInput
                          mode="range"
                          onChange={() => {}}
                          rangeValue={{ from: '2026-02', to: '2026-03' }}
                          size="lg"
                        />
                      </FormCell>
                      <FormCell title={'진행상태'}>
                        <NativeSelect
                          aria-label="진행상태 선택"
                          width={120}
                          value={form.type03}
                          onChange={(e) => setFormField('type03', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type03-1', label: '전체' },
                            { value: 'selection2', id: 'type03-2', label: '진행중' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
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
                <div className="ag-theme-alpine min-h-[18.4rem]">
                  <AgGridReact<Ltpa400DummyDataRow>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowData={Ltpa400DummyData}
                    columnDefs={columnDefs}
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    tooltipHideDelay={3000}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    singleClickEdit={true}
                    onCellValueChanged={() => {}}
                    domLayout="normal"
                  />
                </div>
              </Grid>
            )}
            {active === 'tab2' && (
              <Grid className="w-full grid-rows-[auto_1fr] gap-3 h-full">
                <Grow className="w-full" variant="box-round-b" placement={'bwe'}>
                  <FormTable
                    variant={'none'}
                    lineTop={false}
                    caption="장기보험 모집자 설계 조회 테이블"
                    cols={['w-[6rem]', 'w-[10rem]', 'w-[8rem]', 'w-[10rem]', 'w-[8rem]', 'w-[auto]']}
                  >
                    <FormRow>
                      <FormCell title={'소속'}>
                        <NativeSelect
                          aria-label="소속 선택"
                          width={120}
                          value={form.type04}
                          onChange={(e) => setFormField('type04', e.target.value)}
                          readOnly
                        >
                          {[
                            { value: 'selection', id: 'type04_1', label: 'GA영업2본부' },
                            { value: 'selection2', id: 'type04_2', label: 'GA영업2본부2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect
                          aria-label="사업단 선택"
                          width={152}
                          value={form.type05}
                          onChange={(e) => setFormField('type05', e.target.value)}
                          readOnly
                        >
                          {[
                            { value: 'selection', id: 'type05-1', label: '부산GA사업단' },
                            { value: 'selection2', id: 'type05-2', label: '부산GA사업단2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect
                          aria-label="지점 선택"
                          width={152}
                          value={form.type06}
                          onChange={(e) => setFormField('type06', e.target.value)}
                          readOnly
                        >
                          {[
                            { value: 'selection', id: 'type06-1', label: '신부산GA지점' },
                            { value: 'selection2', id: 'type06-2', label: '신부산GA지점2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'담당SM'}>
                        <Input aria-label="" width={80} value={'12345678'} readOnly />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={100} value={'김한화'} readOnly />
                      </FormCell>
                      <FormCell title={'설계일자'}>
                        <DatePickerInput
                          mode="range"
                          onChange={() => {}}
                          rangeValue={{ from: '2026-02', to: '2026-03' }}
                          size="lg"
                        />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'대리인'}>
                        <NativeSelect
                          aria-label="대리점 선택"
                          width={120}
                          value={form.type07}
                          onChange={(e) => setFormField('type07', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type07-1', label: '구분' },
                            { value: 'selection2', id: 'type07-2', label: '대리점' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input
                          aria-label=""
                          width={120}
                          value={form.type07 || '12345678'}
                          onChange={(e) => setFormField('type07', e.target.value)}
                        />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={152} value={'신부산지점GA지점'} readOnly />
                      </FormCell>
                      <FormCell title={'사용인'}>
                        <Input aria-label="사용인" width={80} value={'12345678'} readOnly />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={100} value={'김한화'} readOnly />
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
                <Grid className="w-full grid-rows-[auto_1fr] gap-1 h-full">
                  <Grow className="w-full justify-end mb-1" placement="ec">
                    <Button color="success" variant="outlined">
                      엑셀내보내기
                      <FileExportIcon />
                    </Button>
                  </Grow>
                  <Gcol className="w-full" gap={1}>
                    <div className="ag-theme-alpine min-h-[18.4rem]">
                      {/* 2026-05-22 체크박스 삭제 */}
                      <AgGridReact<Ltpa400DummyDataRow2>
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        getRowId={(params) => String(params.data.id)}
                        // rowData={Ltpa400DummyData2}
                        rowData={visibleRows}
                        columnDefs={columnDefs2}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                    {/* 2026-05-22 페이징 추가 */}
                    <TableMore
                      isAll={true}
                      loadedCount={loadedCount}
                      totalCount={totalCount}
                      pageSize={pageSize}
                      onLoadAll={handleLoadAll}
                      onLoadNext={handleLoadNext}
                    />
                  </Gcol>
                </Grid>
              </Grid>
            )}
          </TabPager>
        }
        // 2025-05-22 버튼 분리
        mainFoot={
          <MainBottom>
            {active === 'tab1' && (
              <MainBottomItem>
                <Grow gap={1} placement={'ee'} className="w-full">
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    상품선택
                  </Button>
                </Grow>
              </MainBottomItem>
            )}
            {active === 'tab2' && (
              <MainBottomItem>
                <Grow gap={1} placement={'ee'} className="w-full">
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    상품선택
                  </Button>
                </Grow>
              </MainBottomItem>
            )}
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
