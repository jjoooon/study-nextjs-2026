/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';
import { AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { createTooltipValueGetter } from '@/shared/components/agGridUtils';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout';
import { LayoutTemplate } from '@/shared/components/layout/LayoutTemplate';
import { useTabs } from '@/shared/hooks/useTabs';

import '@/shared/lib/agGridPub';

type Ltp040TabType = { name: string; value: string; label: string };

const DATA_TABS: Ltp040TabType[] = [
  { name: '추천설계명세', value: 'tab1', label: '추천설계명세' },
  { name: '추천설계조건입력 현황', value: 'tab2', label: '추천설계조건입력 현황' },
];

// dummy data
type Ltpa040DummyDataRow = {
  id: number;
  isCheck: boolean;
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
  field14: string | number;
  field15: string | number;
};

type Ltpa040DummyDataRowT1 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};

type Ltpa040DummyDataRowT2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};

const Ltpa040DummyData: Ltpa040DummyDataRow[] = [
  {
    id: 1,
    isCheck: false,
    field01: 'YYYY-MM-DD HH:MM',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동',
    field05: '기등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 건강보험4.0',
    field10: '12',
    field11: '83000',
    field12: 'LA260326516615',
    field13: '설계중',
    field14: '14',
    field15: '120000',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'YYYY-MM-DD HH:MM',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동(8090001)',
    field05: '기등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 건강보험4.0',
    field10: '12',
    field11: '83,000원',
    field12: 'LA260326516614',
    field13: '청약중',
    field14: '14',
    field15: '120000',
  },
  {
    id: 3,
    isCheck: false,
    field01: 'YYYY-MM-DD HH:MM',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동(8090001)',
    field05: '기등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 간편건강보험4.0',
    field10: '12',
    field11: '83,000원',
    field12: 'LA260326516623',
    field13: '청약중',
    field14: '10',
    field15: '100000',
  },
  {
    id: 4,
    isCheck: false,
    field01: 'YYYY-MM-DD HH:MM',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동(8090001)',
    field05: '기등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원 ',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 간편건강보험4.0',
    field10: '12',
    field11: '83,000원',
    field12: 'LA260326516615',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
];

const Ltpa040DummyDataT1: Ltpa040DummyDataRowT1[] = [
  {
    id: 1,
    field01: '2026-04-13',
    field02: '282',
    field03: '82',
    field04: '29.1%',
    field05: '71',
    field06: '47',
  },
  {
    id: 2,
    field01: '2026-04-12',
    field02: '737',
    field03: '437',
    field04: '59.3%',
    field05: '334',
    field06: '119',
  },
  {
    id: 3,
    field01: '2026-04-11',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 4,
    field01: '2026-04-10',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 5,
    field01: '2026-04-09',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 6,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 7,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 8,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 9,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 10,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 11,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
];

const Ltpa040DummyDataT2: Ltpa040DummyDataRowT2[] = [
  {
    id: 1,
    field01: '한화 시그니처 여성 건강보험4.0',
    field02: '1종 납입면제 강화형, 기본형[할증운영상품]',
    field03: '',
    field04: '00',
  },
  {
    id: 2,
    field01: '한화 시그니처 여성 건강보험4.0',
    field02: '1종 납입면제 강화형, 기본형[할증운영상품]',
    field03: '올인원플랜(15~40세)',
    field04: '00',
  },
  {
    id: 3,
    field01: '한화 시그니처 여성 건강보험4.0',
    field02: '1종 해약환급금미지급형, 3.10.5간편고지형',
    field03: '올인원플랜',
    field04: '00',
  },
];

export default function Ltpa040Section() {
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
  const renderConsentCell = (params: ICellRendererParams<Ltpa040DummyDataRowT1>) => {
    const value = String(params.value ?? '');

    if (value === '일자') {
      return <Typo>{value}</Typo>;
    }

    return (
      <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
        {value}
      </Button>
    );
  };

  const columnDefs: (ColDef<Ltpa040DummyDataRow> | ColGroupDef<Ltpa040DummyDataRow>)[] = [
    {
      headerName: '추천설계정보',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      children: [
        {
          headerName: '추천일시',
          field: 'field01',
          width: 150,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '채널',
          field: 'field02',
          width: 70,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '취급자',
          field: 'field03',
          width: 120,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '사용인',
          field: 'field04',
          width: 120,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '고객구분',
          field: 'field05',
          width: 90,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '고객명',
          field: 'field06',
          width: 80,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '입력조건',
          field: 'field07',
          width: 230,
          cellClass: 'text-left flex [&>div>span]:h-auto!',
          tooltipValueGetter: createTooltipValueGetter<Ltpa040DummyDataRow>({ field: 'field07' }),
        },
        {
          headerName: '추천 설계번호',
          field: 'field08',
          width: 100,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '추천상품',
          field: 'field09',
          width: 230,
          cellClass: 'text-left flex [&>div>span]:h-auto!',
          tooltipValueGetter: createTooltipValueGetter<Ltpa040DummyDataRow>({ field: 'field09' }),
        },
        {
          headerName: '담보수',
          field: 'field10',
          width: 80,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '보장보험료',
          field: 'field11',
          width: 100,
          cellClass: 'text-right flex [&>div>span]:h-auto!',
          valueFormatter: (params) => {
            if (params.value === null || params.value === undefined || params.value === '') return '';
            const raw = String(params.value).replace(/원/g, '').replace(/,/g, '');
            const num = Number(raw);
            return Number.isNaN(num) ? String(params.value) : `${num.toLocaleString()}원`;
          },
        },
      ],
    },
    {
      headerName: '설계 생성정보',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      children: [
        {
          headerName: '설계번호',
          field: 'field12',
          width: 130,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '설계상태',
          field: 'field13',
          width: 100,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '설계담보수',
          field: 'field14',
          width: 100,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        },
        {
          headerName: '보장보험료',
          field: 'field15',
          width: 100,
          cellClass: 'text-right flex [&>div>span]:h-auto!',
          valueFormatter: (params) => {
            if (params.value === null || params.value === undefined || params.value === '') return '';
            const raw = String(params.value).replace(/원/g, '').replace(/,/g, '');
            const num = Number(raw);
            return Number.isNaN(num) ? String(params.value) : `${num.toLocaleString()}원`;
          },
        },
      ],
    },
  ];

  const columnDefsT1: ColDef<Ltpa040DummyDataRowT1>[] = [
    {
      headerName: '일자',
      field: 'field01',
      flex: 1,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: renderConsentCell,
    },
    {
      headerName: '추천설계 이용건수',
      field: 'field02',
      width: 240,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '상품 선택 건수',
      field: 'field03',
      width: 400,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      spanRows: true,
      cellRenderer: createFieldRenderer<Ltpa040DummyDataRowT1>('field03', 'field04', 'row'),
    },
    {
      headerName: '총 선택 건수',
      field: 'field05',
      width: 240,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '플랜 선택 건수',
      field: 'field06',
      width: 240,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];

  const columnDefsT2: ColDef<Ltpa040DummyDataRowT2>[] = [
    {
      headerName: '상품',
      field: 'field01',
      flex: 1,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true, 
      cellRenderer: renderConsentCell,
    },
    {
      headerName: '종',
      field: 'field02',
      width: 240,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '플랜',
      field: 'field03',
      width: 400,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '건수',
      field: 'field04',
      width: 400,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
  });

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '추천 설계 만족도 조사 및 활용 모니터링', pageId: 'LTPA040' }} />
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
                    variant={'none'}
                    lineTop={false}
                    caption="추천설계명세 조회 테이블"
                    cols={['w-[8rem]', 'w-[10rem]', 'w-[8rem]', 'w-[auto]']}
                  >
                    <FormRow>
                      <FormCell title={'고객특성'}>
                        <NativeSelect
                          aria-label="연령구간 선택"
                          width={120}
                          value={form.type01}
                          onChange={(e) => setFormField('type01', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type01-1', label: '연령구간 전체' },
                            { value: 'selection2', id: 'type01-2', label: '0~14세' },
                            { value: 'selection3', id: 'type01-3', label: '15~24세' },
                            { value: 'selection4', id: 'type01-4', label: '25~29세' },
                            { value: 'selection5', id: 'type01-5', label: '60~65세' },
                            { value: 'selection6', id: 'type01-6', label: '66세이상' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect
                          aria-label="성별 선택"
                          width={120}
                          value={form.type02}
                          onChange={(e) => setFormField('type02', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type02-1', label: '전체' },
                            { value: 'selection2', id: 'type02-2', label: '남' },
                            { value: 'selection3', id: 'type02-3', label: '여' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect
                          aria-label="직업급수 선택"
                          width={120}
                          value={form.type03}
                          onChange={(e) => setFormField('type03', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type03-1', label: '직업급수 전체' },
                            { value: 'selection2', id: 'type03-2', label: '1급' },
                            { value: 'selection3', id: 'type03-3', label: '2급' },
                            { value: 'selection4', id: 'type03-4', label: '3급' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'모집자'}>
                        <NativeSelect
                          aria-label="모집자 선택"
                          width={120}
                          value={form.type04}
                          onChange={(e) => setFormField('type04', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type04-1', label: '전체' },
                            { value: 'selection2', id: 'type04-2', label: '취급직원' },
                            { value: 'selection3', id: 'type04-3', label: '사용인' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input aria-label="모집자 입력" width={120} value={''} />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={120} value={'김한화'} readOnly />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'상품코드'}>
                        <Input aria-label="상품코드 입력" width={120} value={''} />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={210} value={''} readOnly />
                      </FormCell>
                      <FormCell title={'조회기간'}>
                        <DatePickerInput
                          mode="range"
                          onChange={() => {}}
                          rangeValue={{ from: '2026-02', to: '2026-03' }}
                          size="lg"
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
                <div className="ag-theme-alpine radio-selection min-h-[18.4rem]">
                  <AgGridReact<Ltpa040DummyDataRow>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowData={Ltpa040DummyData}
                    columnDefs={columnDefs}
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    tooltipHideDelay={3000}
                    defaultColDef={{
                      resizable: true,
                      sortable: true,
                    }}
                    rowSelection={{
                      mode: 'singleRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      // width: 30,
                      cellClass: 'text-center editable-cell',
                    }}
                    singleClickEdit={true}
                    rowClassRules={{}}
                    onCellValueChanged={() => {}}
                    domLayout="normal"
                  />
                </div>
              </Grid>
            )}
            {active === 'tab2' && (
              <Grid className="w-full grid-rows-[auto_1fr] gap-3 h-full">
                <Grow placement="bwe" className="w-full" variant="box-round-b">
                  <FormTable
                    variant={'none'}
                    lineTop={false}
                    caption="추천 설계조건입력 현황 조회 테이블"
                    cols={['w-1', 'w-1', 'w-1', 'w-auto']}
                  >
                    <FormRow>
                      <FormCell title={'조회조건'}>
                        <NativeSelect
                          aria-label="조회조건 선택"
                          width={120}
                          value={form.type05}
                          onChange={(e) => setFormField('type05', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type05_1', label: '선택' },
                            { value: 'selection', id: 'type05_2', label: '고객군별' },
                            { value: 'selection2', id: 'type05_3', label: '추가옵션' },
                            { value: 'selection3', id: 'type05_4', label: '상품별' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'조회기간'}>
                        <DatePickerInput
                          mode="range"
                          onChange={() => {}}
                          rangeValue={{ from: '2026-02', to: '2026-03' }}
                          size="lg"
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
                <TableFold>
                  <TableFoldHead title="일자별 선택 현황" />
                  <TableFoldBody className="grid-rows-[auto_1fr]">
                    <div className="ag-theme-alpine min-h-[33rem]">
                      <AgGridReact<Ltpa040DummyDataRowT1>
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        getRowId={(params) => String(params.data.id)}
                        rowData={Ltpa040DummyDataT1}
                        columnDefs={columnDefsT1}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="2026-04-13 상세 현황" />
                  <TableFoldBody className="grid-rows-[auto_1fr]">
                    <div className="ag-theme-alpine min-h-[33rem]">
                      <AgGridReact<Ltpa040DummyDataRowT2>
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        getRowId={(params) => String(params.data.id)}
                        rowData={Ltpa040DummyDataT2}
                        columnDefs={columnDefsT2}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </Grid>
            )}
          </TabPager>
        }
        mainFoot={
          <MainBottom>
            {active === 'tab1' && (
              <MainBottomItem className="justify-between">
                <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'primary'} size={'xl'}>
                  추천설계상세보기
                </Button>
                <Grow gap={1}>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'primary'} size={'xl'}>
                    엑셀내려받기
                  </Button>
                </Grow>
              </MainBottomItem>
            )}
            {active === 'tab2' && (
              <MainBottomItem className="justify-end">
                <Grow gap={1}>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'primary'} size={'xl'}>
                    엑셀내려받기
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
