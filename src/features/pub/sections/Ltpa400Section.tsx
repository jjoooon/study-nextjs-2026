'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { t } from 'i18next';
import * as React from 'react';

import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Grow, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
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

import { DummyDataType } from '../data/ltpa020Data';
import {
  Ltpa400DummyData,
  Ltpa400DummyData2,
  type Ltpa400DummyDataRow,
  type Ltpa400DummyDataRow2,
} from '../data/ltpa400Data';

// Tab 정의
type Ltpa400TabType = { name: string; value: string; label: string };
const DATA_TABS: Ltpa400TabType[] = [
  { name: '설계요청', value: 'tab1', label: '설계요청' },
  { name: '모집자 설계', value: 'tab2', label: '모집자 설계' },
];

// Side Effects
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Ltpa400Section() {
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
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
    },
    {
      headerName: '지원SM',
      field: 'field11',
      width: 120,
      cellClass: 'truncate text-center',
      tooltipValueGetter: createTooltipValueGetter<Ltpa400DummyDataRow>({ field: 'field11' }),
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
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '지점',
      field: 'field01_01',
      flex: 1,
    },
    {
      headerName: '대리점코드',
      field: 'field02_01',
      flex: 1,
    },
    {
      headerName: '대리점명',
      field: 'field03_01',
      flex: 0.8,
    },
    {
      headerName: '사용인코드',
      field: 'field04_01',
      flex: 0.8,
    },
    {
      headerName: '사용인명',
      field: 'field05_01',
      flex: 0.8,
    },
    {
      headerName: '상품명',
      field: 'field06_01',
      flex: 1,
    },
    {
      headerName: '플랜명',
      field: 'field07_01',
      flex: 1,
    },
    {
      headerName: '고객명',
      field: 'field08_01',
      flex: 0.8,
    },
    {
      headerName: '설계일자',
      field: 'field09_01',
      flex: 1,
    },
    {
      headerName: '담당SM',
      field: 'field10_01',
      flex: 0.8,
    },
    {
      headerName: '설계번호',
      field: 'field11_01',
      flex: 1.4,
    },
    {
      headerName: '증권번호',
      field: 'field12_01',
      flex: 1.4,
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
          <Gcol className="w-full" placement="ss">
            <TabPager
              data={tabs}
              active={active}
              setActive={setActive}
              removable={false}
              onRemove={handleRemove}
              visibleCount={3}
              variant="default"
              hasTableBelow={true}
              error={false}
              errorMsg="에러 메시지 예시"
              getValue={(tab) => String(tab.value)}
              renderTab={(tab) => <span>{tab.label}</span>}
              renderDropdownItem={false}
            >
              {active === 'tab1' && (
                <>
                  <Grow className="w-full mb-3" variant="box" placement={'bwe'}>
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
                            width="12rem"
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
                            width={'15rem'}
                            value={form.type02 || '12345678'}
                            onChange={(e) => setFormField('type02', e.target.value)}
                          />
                          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <Input aria-label="" width={'15rem'} value={'신부산지점GA지점'} readOnly />
                        </FormCell>
                        <FormCell title={'설계일자'}>
                          <DatePickerInput
                            mode="range"
                            onChange={() => {}}
                            rangeValue={{ from: '2026-02', to: '2026-03' }}
                            size="lg"
                            width="sm"
                          />
                        </FormCell>
                        <FormCell title={'진행상태'}>
                          <NativeSelect
                            aria-label="진행상태 선택"
                            width="12rem"
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
                  <div className="ag-theme-alpine">
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
                      domLayout="autoHeight"
                    />
                  </div>
                </>
              )}
              {active === 'tab2' && (
                <>
                  <Grow className="w-full mb-3 mt-1" variant="box-round" placement={'bwe'}>
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
                          <Input aria-label="" width={152} value={'12345678'} readOnly />
                          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <Input aria-label="" width={152} value={'김한화'} readOnly />
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
                          <Input aria-label="사용인" width={152} value={'12345678'} readOnly />
                          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <Input aria-label="" width={152} value={'김한화'} readOnly />
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
                  <Grow className="justify-end mb-1">
                    <Button color="success" variant="outlined">
                      엑셀내보내기
                      <FileExportIcon />
                    </Button>
                  </Grow>
                  <div className="ag-theme-alpine">
                    <AgGridReact<Ltpa400DummyDataRow2>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={Ltpa400DummyData2}
                      columnDefs={columnDefs2}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      singleClickEdit={true}
                      onCellValueChanged={() => {}}
                      rowSelection={{
                        mode: 'singleRow',

                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        width: 30,
                      }}
                      onGridReady={(params) => {
                        params.api.forEachNode((node) => {
                          if (node.data?.isCheck) {
                            node.setSelected(true);
                          }
                        });
                      }}
                      domLayout="autoHeight"
                    />
                  </div>
                </>
              )}
            </TabPager>
          </Gcol>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1} placement={'ee'} className="w-full">
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  상품선택
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
