/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Grow, Grid } from '@atoms';
import { SearchIcon, ResetIcon, FileExportIcon } from '@icons';
import { AgGridEmptyComponent, useAgGridInfiniteAppend, useDynamicColumnWidths } from '@aggrid';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { useFormFields } from '@hooks/useFormFields';

import '@/shared/lib/agGridPub';

type Ltpa570DummyDataRow = {
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
  field13: string | number;
};
const Ltpa570DummyData: Ltpa570DummyDataRow[] = [
  {
    id: 1,
    field01: '전속',
    field02: '서울지역본부',
    field03: '강서지역단',
    field04: '구로지점',
    field05: 2,
    field06: 21,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: 24,
    field13: 1,
  },
  {
    id: 2,
    field01: '전속',
    field02: '경인지역본부',
    field03: '부천지역단',
    field04: '시흥지점',
    field05: 21,
    field06: 21,
    field07: 2,
    field08: 3,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: 24,
    field13: 2,
  },
  {
    id: 3,
    field01: '전속',
    field02: '중부지역본부',
    field03: '전북지역단',
    field04: '전주SFP지점',
    field05: 2,
    field06: 21,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: 24,
    field13: 3,
  },
  {
    id: 4,
    field01: '전속',
    field02: '영남지역본부',
    field03: '강서지역단',
    field04: '구로지점',
    field05: 2,
    field06: 21,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: 24,
    field13: 4,
  },
  {
    id: 5,
    field01: '전속',
    field02: '서울지역본부',
    field03: '강서지역단',
    field04: '구로지점',
    field05: 2,
    field06: 21,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: 24,
    field13: 5,
  },
  {
    id: 6,
    field01: '전속',
    field02: '서울지역본부',
    field03: '강서지역단',
    field04: '구로지점',
    field05: 2,
    field06: 21,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: 24,
    field13: 6,
  },
  {
    id: 7,
    field01: '전속',
    field02: '서울지역본부',
    field03: '강서지역단',
    field04: '구로지점',
    field05: 2,
    field06: 21,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: 24,
    field13: 7,
  },
];

export default function Ltpa570Section() {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
  });
  const [groupBy, setGroupBy] = React.useState<'option1' | 'option2' | 'option3' | 'option4'>('option1');

  const isGroupByOption = (value: string): value is 'option1' | 'option2' | 'option3' | 'option4' => {
    return value === 'option1' || value === 'option2' || value === 'option3' || value === 'option4';
  };

  const [rowData] = React.useState<Ltpa570DummyDataRow[]>(Ltpa570DummyData);

  // AgGrid Column
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<Ltpa570DummyDataRow>[]>(() => {
    // 2026-06-01 width, flex 수정
    // 2026-06-02 minWidth 추가, flex 수정
    const organizationColumnsByGroupBy: Record<
      'option1' | 'option2' | 'option3' | 'option4',
      ColDef<Ltpa570DummyDataRow>[]
    > = {
      option1: [
        {
          headerName: '채널',
          width: attributeColumnWidth(70),
          field: 'field01',
          cellClass: 'text-center',
        },
      ],
      option2: [
        {
          headerName: '채널',
          width: attributeColumnWidth(70),
          field: 'field01',
          cellClass: 'text-center',
        },
        {
          headerName: '본부명',
          flex: 1,
          minWidth: attributeColumnWidth(170),
          field: 'field02',
          cellClass: 'text-center',
        },
      ],
      option3: [
        {
          headerName: '채널',
          width: attributeColumnWidth(70),
          field: 'field01',
          cellClass: 'text-center',
        },
        {
          headerName: '본부명',
          flex: 1,
          minWidth: attributeColumnWidth(170),
          field: 'field02',
          cellClass: 'text-center',
        },
        {
          headerName: '사업단',
          flex: 1,
          minWidth: attributeColumnWidth(150),
          field: 'field03',
          cellClass: 'text-center',
        },
      ],
      option4: [
        {
          headerName: '채널',
          width: attributeColumnWidth(70),
          field: 'field01',
          cellClass: 'text-center',
        },
        {
          headerName: '본부명',
          flex: 1,
          minWidth: attributeColumnWidth(170),
          field: 'field02',
          cellClass: 'text-center',
        },
        {
          headerName: '사업단',
          flex: 1,
          minWidth: attributeColumnWidth(150),
          field: 'field03',
          cellClass: 'text-center',
        },
        {
          headerName: '지점명',
          flex: 1,
          minWidth: attributeColumnWidth(150),
          field: 'field04',
          cellClass: 'text-center',
        },
      ],
    };

    const metricColumns: ColDef<Ltpa570DummyDataRow>[] = [
      {
        headerName: '단순설계',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        field: 'field05',
        cellClass: 'text-center',
      },
      {
        headerName: '설계중',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        field: 'field06',
        cellClass: 'text-center',
      },
      {
        headerName: '설계완료',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        field: 'field07',
        cellClass: 'text-center',
      },
      {
        headerName: '청약중',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        field: 'field08',
        cellClass: 'text-center',
      },
      {
        headerName: '청약심사완료',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        field: 'field09',
        cellClass: 'text-center',
      },
      {
        headerName: '청약완료',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        field: 'field10',
        cellClass: 'text-center',
      },
      {
        headerName: '수납완료',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        field: 'field11',
        cellClass: 'text-center',
      },
      {
        headerName: '총합계',
        flex: 1.1,
        minWidth: attributeColumnWidth(70),
        field: 'field12',
        cellClass: 'text-center',
      },
      {
        headerName: '순위',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        field: 'field13',
        cellClass: 'text-center',
      },
    ];

    return [...organizationColumnsByGroupBy[groupBy], ...metricColumns];
  }, [groupBy, attributeColumnWidth]);

  const gridRef = React.useRef<AgGridReact<Ltpa570DummyDataRow>>(null);
  const pageSize = 2;
  const { loadedCount, totalCount, dataSource, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: Ltpa570DummyData,
    pageSize,
  });

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '실시간 설계현황(지점별)',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
                lineTop={false}
                caption="설계번호"
                cols={['w-[1rem]', 'w-[60rem] ', 'w-[1rem]', 'min-w-[4.8rem] w-auto']}
              >
                <FormRow>
                  <FormCell title={'조직구분'} tdClassName="grid grid-cols-[repeat(5,auto)]" colSpan={3}>
                    <NativeSelect
                      aria-label="조직구분"
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection0101', label: '채널1' },
                        { value: 'selection0102', label: '채널2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <NativeSelect
                      aria-label="본부"
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                    >
                      {[
                        { value: 'selection0201', label: '본부1' },
                        { value: 'selection0202', label: '본부2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <NativeSelect
                      aria-label="지역단1구분"
                      value={form.type03}
                      onChange={(e) => setFormField('type03', e.target.value)}
                    >
                      {[
                        { value: 'selection0301', label: '지역단1' },
                        { value: 'selection0302', label: '지역단2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <NativeSelect
                      aria-label="자점구분"
                      value={form.type04}
                      onChange={(e) => setFormField('type04', e.target.value)}
                    >
                      {[
                        { value: 'selection0401', label: '자점1' },
                        { value: 'selection0402', label: '자점2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <RadioGroup
                      className="gap-2 ml-6"
                      onValueChange={(value) => {
                        if (isGroupByOption(value)) {
                          setGroupBy(value);
                        }
                      }}
                      value={groupBy}
                      width="full"
                    >
                      {[
                        { value: 'option1', label: '채널' },
                        { value: 'option2', label: '본부' },
                        { value: 'option3', label: '지역단' },
                        { value: 'option4', label: '지점' },
                      ].map((option) => (
                        <RadioGroupItem
                          key={option.value}
                          color="primary"
                          id={option.value}
                          size="lg"
                          value={option.value}
                          variant="default"
                        >
                          {option.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'상품'} tdClassName="grid grid-cols-[auto_auto_1fr]">
                    <Input aria-label="" value={'LA1301097'} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input
                      aria-label=""
                      value={'한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601'}
                      readOnly
                    />
                  </FormCell>
                  <FormCell title={'설계일자'} tdClassName="grid grid-cols-[auto_auto]">
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      mode="single"
                      onChange={() => {}}
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
            <Grid className="grid-rows-[auto_1fr]">
              <Grow className="w-full" placement="ec">
                <Button color="success" variant="outlined">
                  엑셀내보내기
                  <FileExportIcon />
                </Button>
              </Grow>
              <div className="ag-theme-alpine ltpa010-grid">
                <AgGridReact<Ltpa570DummyDataRow>
                  ref={gridRef}
                  key={groupBy}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                  cacheBlockSize={pageSize}
                  maxBlocksInCache={2}
                  datasource={dataSource}
                  enableCellSpan={true}
                />
              </div>
              <TableMore
                gridRef={gridRef}
                loadedCount={loadedCount}
                totalCount={totalCount}
                pageSize={pageSize}
                onLoadAll={handleLoadAll}
                onLoadNext={handleLoadNext}
              />
            </Grid>
          </Grid>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
