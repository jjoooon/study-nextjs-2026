/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Grow, Grid } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon, ResetIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useState } from 'react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  field1: string | number;
  field2: string | number;
  importance: boolean;
  badge?: string[];
  field3: string | number;
};
const dummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '종합건강22',
    field2:
      '한화 더 경증 간편건강보험간연만기 갱신형)2601한화 더 경증 간편건강보험간연만기 갱신형)2601한화 더 경증 간편건강보험간연만기 갱신형)2601',
    importance: true,
    badge: ['무해지', '할증', '차움', '여성'],
    field3: '15~90세',
  },
  {
    id: 2,
    field1: '종합건강',
    field2:
      '한화 더 경증 간편건강보험간연만기 갱신형)2601한화 더 경증 간편건강보험간연만기 갱신형)2601한화 더 경증 간편건강보험간연만기 갱신형)2601',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 3,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    badge: ['간편'],
    field3: '15~90세',
  },
  {
    id: 4,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    badge: ['할증'],
    field3: '15~90세',
  },
  {
    id: 5,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 6,
    field1: '종합건강',
    field2:
      '한화 더 경증 간편건강보험간연만기 갱신형)2601한화 더 경증 간편건강보험간연만기 갱신형)2601한화 더 경증 간편건강보험간연만기 갱신형)2601',
    importance: false,
    badge: ['여성', '무해지', '할증'],
    field3: '15~90세',
  },
  {
    id: 7,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 8,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 9,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 10,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 11,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 12,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 13,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 14,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 15,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 16,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 17,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 18,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 19,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
  {
    id: 20,
    field1: '종합건강',
    field2: '한화 311 간편건강보험(연만기 경신형)',
    importance: false,
    field3: '15~90세',
  },
];

type DummyDataType2 = {
  id: number;
  field1: string | number;
  field2: string | number;
  btn?: boolean;
};
const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    field1: '1종',
    field2:
      '한화 3N5 더 간편건강보험(연만기 갱신형)2601한화 3N5 더 간편건강보험(연만기 갱신형)2601한화 3N5 더 간편건강보험(연만기 갱신형)2601한화 3N5 더 간편건강보험(연만기 갱신형)2601한화 3N5 더 간편건강보험(연만기 갱신형)2601',
    btn: true,
  },
  {
    id: 2,
    field1: '2종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
  },
  {
    id: 3,
    field1: '3종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
  },
  {
    id: 4,
    field1: '4종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
  },
  {
    id: 5,
    field1: '4종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
  },
  {
    id: 6,
    field1: '4종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
  },
  {
    id: 7,
    field1: '4종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
  },
  {
    id: 8,
    field1: '4종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
  },
  {
    id: 9,
    field1: '4종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
  },
];

type DummyDataType3 = {
  id: number;
  field1: string | number;
};
const dummyData3: DummyDataType3[] = [
  {
    id: 1,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)',
  },
  {
    id: 2,
    field1: '7형(355간편(고혈압추가고지))(프리미엄올인원플랜)(1.718.9형)(15~80세)',
  },
  {
    id: 3,
    field1: '7형(355간편(고혈압추가고지))(프리미엄올인원플랜)(1.718.9형)(15~80세)',
  },
  {
    id: 4,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(15~40세)',
  },
  {
    id: 5,
    field1:
      '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(15~1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세))',
  },
  {
    id: 6,
    field1:
      '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(11형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)5~40세)',
  },
  {
    id: 7,
    field1:
      '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)15~40세)',
  },
  {
    id: 8,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(15~40세)',
  },
  {
    id: 9,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(15~40세)',
  },
  {
    id: 10,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(15~40세)',
  },
  {
    id: 11,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(15~40세)',
  },
  {
    id: 12,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(15~40세)',
  },
];
const dummyData3b: DummyDataType3[] = [
  {
    id: 1,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)',
  },
  {
    id: 2,
    field1: '7형(355간편(고혈압추가고지))(프리미엄올인원플랜)(1.718.9형)(15~80세)',
  },
  {
    id: 3,
    field1: '7형(355간편(고혈압추가고지))(프리미엄올인원플랜)(1.718.9형)(15~80세)',
  },
  {
    id: 4,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(15~40세)',
  },
  {
    id: 5,
    field1:
      '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(15~1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세))',
  },
  {
    id: 6,
    field1:
      '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)(11형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)5~40세)',
  },
];
const dummyData3c: DummyDataType3[] = [
  {
    id: 1,
    field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)',
  },
  {
    id: 2,
    field1: '7형(355간편(고혈압추가고지))(프리미엄올인원플랜)(1.718.9형)(15~80세)',
  },
];

const dummyData3Tab: Array<{ value: string; label: string; count: number }> = [
  {
    value: 'tab1',
    label: '회사플랜',
    count: dummyData3.length,
  },
  {
    value: 'tab2',
    label: '기관플랜',
    count: dummyData3b.length,
  },
  {
    value: 'tab3',
    label: '나만의플랜',
    count: dummyData3c.length,
  },
];

export function Ltpa02001() {
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [productCategory, setProductCategory] = React.useState<string[]>(['comprehensive', 'female']);
  const [productFeature, setProductFeature] = React.useState<string[]>(['simple', 'shortTerm']);

  // 상품선택 AG-Grid 컬럼 정의
  const productNameHeader = useCallback(() => {
    const handleTooltipCheck = (checked: boolean | 'indeterminate') => {
      setShowProductNameTooltip(!!checked);
      // gridKey 제거: 리렌더 강제 목적이 아니면 필요 없음
    };
    return (
      <Grow className="w-full px-[0.6rem]" placement={'cc'} gap={4}>
        <Grow>
          <Input aria-label="상품명" placeholder="상품명 입력" type="text" width={'full'} size={'sm'} clear={true} />
          <Button aria-label="상품명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
          <Button aria-label="상품명 초기화" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <ResetIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
        <Grow placement={'sc'}>
          <Checkbox size={'md'} checked={showProductNameTooltip} onCheckedChange={handleTooltipCheck}>
            상품명 말풍선
          </Checkbox>
        </Grow>
      </Grow>
    );
  }, [showProductNameTooltip]);

  const importanceCellRenderer = (params: ICellRendererParams<DummyDataType>) => {
    const badgeText = params.data?.badge ?? '';
    return (
      <Grow className="w-full" placement="bwc">
        <Grow className="overflow-hidden -tracking-[0.03rem]">
          <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="favorite">
            중요
          </Checkbox>
          <div className="truncate">{params.data?.field2 ?? ''}</div>
        </Grow>
        <Grow>
          {badgeText && (
            <Grow className="shrink-0">
              {(
                [
                  { label: '무해지', color: 'green' },
                  { label: '차움', color: 'yellow' },
                  { label: '할증', color: 'red' },
                  { label: '여성', color: 'purple' },
                  { label: '간편', color: 'blue' },
                ] as const
              ).map((badge) =>
                badgeText.includes(badge.label) ? (
                  <Badge key={badge.label} color={badge.color} className="w-[3rem]">
                    {badge.label}
                  </Badge>
                ) : null
              )}
            </Grow>
          )}
        </Grow>
      </Grow>
    );
  };
  const designCellRenderer = (params: ICellRendererParams<DummyDataType2>) => {
    return (
      <Grow className="h-full w-full">
        <Grow className="border-r border-[var(--color-gray-10)] h-full aspect-auto w-[4rem] flex items-center justify-center shrink-0 pr-[1rem] pl-[0.4rem]">
          {params.data?.field1}
        </Grow>
        <Grow className="flex-1 truncate block text-left">{params.data?.field2}</Grow>
        <Grow>
          {params.data?.btn && (
            <Button color="gray" onClick={() => {}} only="default" size="sm" variant="outlined">
              납면
            </Button>
          )}
        </Grow>
      </Grow>
    );
  };
  const moreCellRenderer = () => {
    return (
      <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
        보기
      </Button>
    );
  };
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '상품분류',
      field: 'field1',
      cellClass: 'text-center',
      width: 100,
    },
    {
      headerName: '상품명',
      flex: 1,
      field: 'field2',
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field2' }),
      cellRenderer: importanceCellRenderer,
      headerComponent: productNameHeader,
    },
    {
      headerName: '가입연령',
      field: 'field3',
      cellClass: 'text-center',
      width: 100,
    },
  ];
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '종구분',
      field: 'field1',
      flex: 1,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field2' }),
      cellRenderer: designCellRenderer,
    },
    {
      headerName: '알릴사항',
      cellClass: 'text-center',
      width: 60,
      cellRenderer: moreCellRenderer,
    },
  ];
  const columnDefs3: ColDef<DummyDataType3>[] = [
    {
      headerName: '플랜명',
      field: 'field1',
      flex: 1,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType3>({ field: 'field1' }),
    },
    {
      headerName: '담보보기',
      cellClass: 'text-center',
      width: 60,
      cellRenderer: moreCellRenderer,
    },
  ];

  const { tabs, active, setActive } = useTabs(dummyData3Tab);
  const planRowDataMap: Record<string, DummyDataType3[]> = {
    tab1: dummyData3,
    tab2: dummyData3b,
    tab3: dummyData3c,
  };
  const selectedPlanRowData = planRowDataMap[active] ?? dummyData3;

  return (
    <Grid className="w-full grid-rows-[auto_1fr]" gap={3}>
      <Grow variant={'box-round'} className="w-full" placement="bwe">
        <FormTable caption="" cols={['w-[6rem]', 'w-auto']} variant={'none'}>
          <FormRow className="items-start!">
            <FormCell title={'상품분류'}>
              <CheckboxGroup
                value={productCategory}
                onValueChange={setProductCategory}
                variant="button"
                size="md"
                className="gap-[0.4rem] flex-wrap"
              >
                {[
                  { value: 'all', label: '전체' },
                  { value: 'comprehensive', label: '종합건강' },
                  { value: 'simple', label: '간편' },
                  { value: 'female', label: '여성' },
                  { value: 'cancer', label: '암/간병' },
                  { value: 'childDental', label: '자녀/치아' },
                  { value: 'accident', label: '상해' },
                  { value: 'medical', label: '의료비' },
                  { value: 'property', label: '재물' },
                  { value: 'annuity', label: '연금/저축' },
                ].map((opt) => (
                  <CheckboxGroupItem key={opt.value} value={opt.value} selectAll={opt.value === 'all'}>
                    {opt.label}
                  </CheckboxGroupItem>
                ))}
              </CheckboxGroup>
            </FormCell>
          </FormRow>
          <FormRow className="items-start!">
            <FormCell title={'상품특징'}>
              <CheckboxGroup
                value={productFeature}
                onValueChange={setProductFeature}
                variant="button"
                size="md"
                className="gap-[0.4rem] flex-wrap"
              >
                {[
                  { value: 'all', label: '전체' },
                  { value: 'simple', label: '간편' },
                  { value: 'noRefund', label: '무해지' },
                  { value: 'shortTerm', label: '세만기' },
                  { value: 'longTerm', label: '연만기' },
                ].map((opt) => (
                  <CheckboxGroupItem key={opt.value} value={opt.value} selectAll={opt.value === 'all'}>
                    {opt.label}
                  </CheckboxGroupItem>
                ))}
              </CheckboxGroup>
            </FormCell>
          </FormRow>
        </FormTable>
        <Button variant="outlined" color="gray" only="icon">
          <ResetIcon />
        </Button>
      </Grow>
      <Grow className="w-full overflow-hidden" placement="ss" gap={5}>
        <TableFold className="h-full">
          <TableFoldHead title="상품정보" variant="default" />
          <TableFoldBody className="w-full h-full">
            <div
              className={`tooltip-hidden-toggle w-full h-full ag-theme-alpine ${showProductNameTooltip ? ' show-product-tooltip' : ''}`}
            >
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={dummyData}
                columnDefs={columnDefs}
                domLayout="normal"
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
              />
            </div>
          </TableFoldBody>
        </TableFold>

        <Grid className="max-w-[42.5rem] w-[42.5rem] shrink-0 h-full grid-rows-[40%_1fr]" gap={5}>
          <TableFold className="">
            <TableFoldHead
              title="한화 3N5 더간편건강보험(세만기형)2601종 정보 한화 3N5 더간편건강보험(세만기형)2601종 정보"
              variant="default"
              className="grid grid-cols-[1fr_auto] gap-2 [&>div]:first:overflow-hidden [&>div]:first:flex [&>div]:first:whitespace-nowrap [&>div]:first:w-full"
            >
              <Grow>
                <Checkbox>미판매보종</Checkbox>
              </Grow>
            </TableFoldHead>
            <TableFoldBody className="w-full h-full">
              <div className="ag-theme-alpine w-full h-full min-h-0">
                <AgGridReact<DummyDataType2>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={dummyData2}
                  columnDefs={columnDefs2}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </TableFoldBody>
          </TableFold>
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            hasTableBelow={true}
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => {
              return (
                <>
                  <span>{tab.label}</span>
                  <span>({tab.count})</span>
                </>
              );
            }}
            renderDropdownItem={false}
          >
            <div className="ag-theme-alpine w-full ag-border-t h-full">
              <AgGridReact<DummyDataType3>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={selectedPlanRowData}
                columnDefs={columnDefs3}
                domLayout="normal"
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
              />
            </div>
          </TabPager>
        </Grid>
      </Grow>
    </Grid>
  );
}
