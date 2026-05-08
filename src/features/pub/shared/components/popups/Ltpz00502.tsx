/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';

import { TabPager } from '@common/TabPager';
import { AiIcon, NotificationIcon } from '@icons';
import { Button } from '@uiux/Button';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import type { ValueFormatterParams, ValueParserParams } from 'ag-grid-enterprise';
import { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

export type Ltpz005TabValue = 'common' | 'accum' | 'job' | 'expected-uw';

type GroupTabItem = {
  id: number;
  age: string;
  gender: string;
  name: string;
  value: string;
};

// 누적
type DummyDataType2 = {
  id: number;
  accumName: string | number;
  accumType: string | number;
  pseudoAccumAmount: string | number;
  totalAmount: string | number;
  limitAmount: string | number;
  guaranteeName: string | number;
  designAmount: string | number;
  multiplier: string | number;
  appliedAmount: string | number;
  excessAmount: string | number;
};
type DummyDataType3 = DummyDataType2;
type DummyDataType4 = DummyDataType2;

// 누적 인수기준
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    accumName: '암(유사암제외)진단비(암진단비)',
    accumType: '증권',
    pseudoAccumAmount: '-',
    totalAmount: '30,000',
    limitAmount: '10,000',
    guaranteeName: '암(유사암제외)진단비(암진단비)',
    designAmount: '10,000',
    multiplier: '1.0',
    appliedAmount: '10,000',
    excessAmount: '20,000',
  },
  {
    id: 2,
    accumName: '암(유사암제외)진단비(암진단비)',
    accumType: '증권',
    pseudoAccumAmount: '-',
    totalAmount: '30,000',
    limitAmount: '10,000',
    guaranteeName: '암(유사암제외)진단비(암진단비)(갱신형)',
    designAmount: '10,000',
    multiplier: '1.0',
    appliedAmount: '10,000',
    excessAmount: '20,000',
  },
  {
    id: 3,
    accumName: '암(유사암제외)진단비(암진단비)',
    accumType: '증권',
    pseudoAccumAmount: '-',
    totalAmount: '30,000',
    limitAmount: '10,000',
    guaranteeName: '-여성통합암(4대유사암제외)진단비II(특정소화기관암)',
    designAmount: '10,000',
    multiplier: '1.0',
    appliedAmount: '10,000',
    excessAmount: '20,000',
  },
  {
    id: 4,
    accumName: '유사암진단비(기타피부암)',
    accumType: '전체',
    pseudoAccumAmount: '12,300',
    totalAmount: '14,300',
    limitAmount: '13,000',
    guaranteeName: '-4대유사암(기타피부암)',
    designAmount: '800',
    multiplier: '2.5',
    appliedAmount: '2,000',
    excessAmount: '1,300',
  },
  {
    id: 5,
    accumName: '유사암진단비',
    accumType: '전체',
    pseudoAccumAmount: '2,300',
    totalAmount: '4,300',
    limitAmount: '3,000',
    guaranteeName: '-4대유사암(기타피부암)',
    designAmount: '800',
    multiplier: '2.5',
    appliedAmount: '2,000',
    excessAmount: '0',
  },
];

// 누적 청약완료불가(당수누적)
const DummyData3: DummyDataType3[] = [
  {
    id: 101,
    accumName: '상해입원일당(당수누적)',
    accumType: '당수',
    pseudoAccumAmount: '7,500',
    totalAmount: '9,000',
    limitAmount: '8,000',
    guaranteeName: '상해입원일당(1일이상,180일한도)',
    designAmount: '1,000',
    multiplier: '1.0',
    appliedAmount: '1,000',
    excessAmount: '1,000',
  },
  {
    id: 102,
    accumName: '질병입원일당(당수누적)',
    accumType: '당수',
    pseudoAccumAmount: '7,500',
    totalAmount: '6,000',
    limitAmount: '6,000',
    guaranteeName: '질병입원일당(1일이상,180일한도)',
    designAmount: '800',
    multiplier: '1.0',
    appliedAmount: '800',
    excessAmount: '0',
  },
];

// 누적 청약완료불가(업계누적)
const DummyData4: DummyDataType4[] = [
  {
    id: 201,
    accumName: '암진단비(손생보)',
    accumType: '-',
    pseudoAccumAmount: '15,000',
    totalAmount: '20,000',
    limitAmount: '18,000',
    guaranteeName: '암진단비(유사암제외)',
    designAmount: '3,000',
    multiplier: '1.0',
    appliedAmount: '3,000',
    excessAmount: '2,000',
  },
  {
    id: 202,
    accumName: '암진단비(손생보)',
    accumType: '-',
    pseudoAccumAmount: '15,000',
    totalAmount: '20,000',
    limitAmount: '18,000',
    guaranteeName: '유사암진단비(기타피부암)',
    designAmount: '1,000',
    multiplier: '1.0',
    appliedAmount: '1,000',
    excessAmount: '2,000',
  },
];

function formatAmountWithComma(value: unknown): string {
  const normalized = String(value ?? '')
    .replace(/,/g, '')
    .trim();

  if (normalized === '') {
    return '';
  }

  const digitsOnly = normalized.replace(/[^0-9]/g, '');

  if (digitsOnly === '') {
    return '';
  }

  return Number(digitsOnly).toLocaleString('ko-KR');
}

function designAmountValueFormatter(params: ValueFormatterParams): string {
  return formatAmountWithComma(params.value);
}

function designAmountValueParser(params: ValueParserParams): string {
  return formatAmountWithComma(params.newValue);
}

const Ltpz00502 = () => {
  const [groupTabValue, setGroupTabValue] = React.useState<string>('tab1');
  const [accumOptionValue, setAccumOptionValue] = React.useState<string>('option1');

  // 누적 인수기준
  const columnDefs2: (ColDef<DummyDataType2> | ColGroupDef<DummyDataType2>)[] = [
    {
      headerName: '누적명',
      field: 'accumName',
      width: 200,
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'accumName' }),
    },
    {
      headerName: '누적유형',
      field: 'accumType',
      width: 80,
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '기누적금액(원)',
      field: 'pseudoAccumAmount',
      width: 90,
      spanRows: true,
      cellClass: 'flex! items-center! justify-end!',
      cellRenderer: (params: { value: string | number }) => {
        const rawValue = String(params.value ?? '').trim();
        const numericValue = Number(rawValue.replace(/,/g, ''));

        if (!Number.isNaN(numericValue) && numericValue !== 0) {
          return (
            <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
              {params.value}
            </Button>
          );
        }
        return params.value;
      },
    },
    {
      headerName: '합계(원)',
      field: 'totalAmount',
      width: 80,
      spanRows: true,
      cellClass: 'flex! items-center! justify-end!',
    },
    {
      headerName: '한도(원)',
      field: 'limitAmount',
      width: 80,
      spanRows: true,
      cellClass: 'flex! items-center! justify-end!',
    },
    {
      headerName: '담보명',
      field: 'guaranteeName',
      flex: 1,
      cellClass: 'flex! items-center! justify-start!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'guaranteeName' }),
    },
    {
      headerName: '설계금액(원)',
      field: 'designAmount',
      width: 80,
      cellClass: 'text-right bg-[#EFF8FF]',
      editable: true,
      valueFormatter: designAmountValueFormatter,
      valueParser: designAmountValueParser,
    },
    {
      headerName: '배수',
      field: 'multiplier',
      width: 40,
      cellClass: 'text-center',
    },
    {
      headerName: '반영금액(원)',
      field: 'appliedAmount',
      width: 80,
      cellClass: 'text-right',
    },
    {
      headerName: '초과금액',
      field: 'excessAmount',
      flex: 1,
      spanRows: true,
      cellClass: 'flex! items-center! justify-end! border-r-0',
      cellStyle: { borderRight: 'none' },
      cellRenderer: (params: { value: string | number }) => {
        const rawValue = String(params.value ?? '').trim();
        const numericValue = Number(rawValue.replace(/,/g, ''));

        if (!Number.isNaN(numericValue) && numericValue === 0) {
          return `${rawValue}(누적해소)`;
        }

        return params.value;
      },
    },
  ];

  const selectedAccumRowData: DummyDataType2[] =
    accumOptionValue === 'option2' ? DummyData3 : accumOptionValue === 'option3' ? DummyData4 : DummyData2;
  const groupTabs: GroupTabItem[] = [
    {
      id: 1,
      age: '32',
      gender: '여',
      name: '홍길준',
      value: 'tab1',
    },
    {
      id: 2,
      age: '27',
      gender: '남',
      name: '홍길동',
      value: 'tab2',
    },
    {
      id: 3,
      age: '3',
      gender: '여',
      name: '빛나리',
      value: 'tab3',
    },
  ];

  // 누적
  const accumRadioItemClassName =
    'h-[3rem]! rounded-full! border-transparent! bg-[#E5E5E5]! px-[0.8rem]! py-[0.4rem]! text-[1.2rem]! font-bold! leading-normal! tracking-[-0.13rem]! text-[#777777]! data-[state=checked]:border-transparent! data-[state=checked]:bg-[#414141]! data-[state=checked]:text-white! data-[state=checked]:shadow-none!';

  return (
    // M2. 디자인 변경으로 수정
    <Gcol className="w-full" gap={2} placement="ss">
      <Grow className="w-full bg-[#374151]" variant={'box-round'} placement="sc">
        <NotificationIcon />
        <Typo tag={'p'} variant={'body-md'} weight={'normal'} className="text-white">
          청약완료불가(당사누적) 및 청약완료불가(업계누적)은 청약완료 전 까지만 해소하면 됩니다.
        </Typo>
      </Grow>
      <TabPager
        active={groupTabValue}
        data={groupTabs}
        setActive={setGroupTabValue}
        visibleCount={5}
        getValue={(tab) => String(tab.value)}
        renderTab={(tab) => (
          <Typo tag={'strong'} variant={'body-md'}>
            {`${tab.name} ${tab.age}세(${tab.gender})`}
          </Typo>
        )}
        renderAfter={
          <Button variant={'contained'} size={'md'}>
            <AiIcon color={'#FFF'} color2={'#FFF'} />
            AI인수한도해소
          </Button>
        }
      >
        <div className="w-full mt-1">
          <RadioGroup
            className="gap-1"
            errorMsg="하나를 선택해주세요."
            errorPs="bl"
            onValueChange={setAccumOptionValue}
            value={accumOptionValue}
            width="auto"
          >
            {[
              {
                value: 'option1',
                label: '인수기준(3)',
              },
              {
                value: 'option2',
                label: '청약완료불가(당수누적)(4)',
              },
              {
                value: 'option3',
                label: '청약완료불가(업계누적)(1)',
              },
            ].map((option) => (
              <RadioGroupItem
                key={option.value}
                className={accumRadioItemClassName}
                size="lg"
                value={option.value}
                variant="chipBox"
                width="auto"
              >
                {option.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </div>
      </TabPager>
      <Typo tag={'strong'} variant={'body-lg'}>
        확인사항
      </Typo>
      <div className="ag-theme-alpine">
        <AgGridReact<DummyDataType2>
          getRowId={(params) => String(params.data.id)}
          noRowsOverlayComponent={AgGridEmptyComponent}
          rowData={selectedAccumRowData}
          columnDefs={columnDefs2}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          rowClassRules={{}}
          enableCellSpan={true}
          domLayout="autoHeight"
          tooltipShowMode="whenTruncated"
          tooltipShowDelay={0}
        />
      </div>
    </Gcol>
  );
};

export default Ltpz00502;
