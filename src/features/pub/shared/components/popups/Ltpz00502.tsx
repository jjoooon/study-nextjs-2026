/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';

import { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import type { ValueFormatterParams, ValueParserParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createSpanRowsByField,
  createTooltipValueGetter,
  numberValueFormatter,
  useDynamicColumnWidths,
} from '@aggrid'; // 2026-05-29 numberValueFormatter 추가
import { Gcol, Grow, Typo } from '@atoms';
import { TabPager } from '@common/TabPager';
import { AiIcon } from '@icons';
import { Button } from '@uiux/Button';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

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
    guaranteeName:
      '암(유사암제외)진단비(암진단비)(갱신형) 암(유사암제외)진단비(암진단비)(갱신형) 암(유사암제외)진단비(암진단비)(갱신형)암(유사암제외)진단비(암진단비)(갱신형)',
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
  {
    id: 6,
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
  {
    id: 7,
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
  {
    id: 8,
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
  {
    id: 9,
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
  {
    id: 10,
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
  {
    id: 11,
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
  {
    id: 12,
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
  {
    id: 13,
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

const Ltpz00502 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [groupTabValue, setGroupTabValue] = React.useState<string>('tab1');
  const [accumOptionValue, setAccumOptionValue] = React.useState<string>('option1');

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

  const spanRowsByAccumName = React.useMemo(() => createSpanRowsByField<DummyDataType2, 'accumName'>('accumName'), []);

  // 누적 인수기준
  const columnDefs2: (ColDef<DummyDataType2> | ColGroupDef<DummyDataType2>)[] = [
    // 2026-05-29 numberValueFormatter 추가
    {
      headerName: '누적명',
      field: 'accumName',
      flex: 10,
      spanRows: true,
      autoHeight: true,
      cellClass: 'flex! !items-center !justify-start !whitespace-normal !leading-[1.4] !py-1',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'accumName' }),
    },
    {
      headerName: '누적유형',
      field: 'accumType',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      spanRows: spanRowsByAccumName,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '기누적금액',
      field: 'pseudoAccumAmount',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      spanRows: spanRowsByAccumName,
      cellClass: 'flex! items-center! justify-end!',
      valueFormatter: numberValueFormatter,
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
      headerName: '합계',
      field: 'totalAmount',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      spanRows: spanRowsByAccumName,
      cellClass: 'flex! items-center! justify-end!',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '한도',
      field: 'limitAmount',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      spanRows: spanRowsByAccumName,
      cellClass: 'flex! items-center! justify-end!',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '담보명',
      field: 'guaranteeName',
      flex: 20,
      cellClass: 'flex! items-center! justify-start!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'guaranteeName' }),
    },
    {
      headerName: '설계금액',
      field: 'designAmount',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellClass: 'text-right bg-[#EFF8FF] [&_input]:text-right',
      editable: true,
      valueFormatter: designAmountValueFormatter,
      valueParser: designAmountValueParser,
    },
    {
      headerName: '배수',
      field: 'multiplier',
      flex: 1,
      minWidth: attributeColumnWidth(40),
      cellClass: 'text-center',
    },
    {
      headerName: '반영금액',
      field: 'appliedAmount',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '초과금액',
      field: 'excessAmount',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      spanRows: true,
      cellClass: 'flex! items-center! justify-end! border-r-0',
      cellStyle: { borderRight: 'none' },
      valueFormatter: numberValueFormatter,
      cellRenderer: (params: { value: string | number }) => {
        const rawValue = String(params.value ?? '').trim();
        const numericValue = Number(rawValue.replace(/,/g, ''));

        if (!Number.isNaN(numericValue) && numericValue === 0) {
          return <span className="text-[var(--color-success-50)]">(누적해소)</span>;
        } else {
          return <span className="text-[var(--color-danger-50)]">{rawValue}</span>;
        }
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
  return (
    // M2. 디자인 변경으로 수정
    <Gcol className="w-full" gap={2} placement="ss">
      <Gcol variant={'box-info'} placement={'ss'} className="w-full">
        <Typo variant={'body-sm'} icon={'info'}>
          청약완료불가(당사누적) 및 청약완료불가(업계누적)은 청약완료 전 까지만 해소하면 됩니다.
        </Typo>
      </Gcol>
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
        <div className="w-full mt-2">
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
              <RadioGroupItem key={option.value} size="lg" value={option.value} variant="tab" width="auto">
                {option.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </div>
      </TabPager>
      <Gcol>
        <Grow className="f-full" placement="bwe">
          <Typo tag={'strong'} variant={'body-lg'}>
            확인사항
          </Typo>
          <Typo variant={'body-md'}>단위: 원</Typo>
        </Grow>

        <div className="ag-theme-alpine min-h-[12.3rem]">
          <AgGridReact<DummyDataType2>
            getRowId={(params) => String(params.data.id)}
            noRowsOverlayComponent={AgGridEmptyComponent}
            rowData={selectedAccumRowData}
            columnDefs={columnDefs2}
            defaultColDef={{
              sortable: true,
              resizable: true,
            }}
            singleClickEdit={true}
            enableCellSpan={true}
            domLayout="autoHeight"
            tooltipShowMode="whenTruncated"
            tooltipShowDelay={0}
            animateRows={false}
          />
        </div>
      </Gcol>
    </Gcol>
  );
};

export default Ltpz00502;
