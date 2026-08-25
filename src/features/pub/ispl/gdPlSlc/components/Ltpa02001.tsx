/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import type { ClonedTopRow } from '@aggrid';
import { AgGridEmptyComponent, createTooltipValueGetter, useCloneTopRows, useDynamicColumnWidths } from '@aggrid';
import { Grow, Grid } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon, ResetIcon, AiIcon, ArrowNext, CheckIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

import '@/shared/lib/agGridPub';

/** 상품 정보 그리드 행 데이터 타입 */
type DummyDataType = {
  /** 데이터 ID */
  id: string | number;
  /** 상품 분류 */
  field1: string | number;
  /** 상품명 */
  field2: string | number;
  /** 중요 상품 여부 */
  importance: boolean;
  /** 상품 태그/배지 (예: 간편, 무해지 등) */
  badge?: string[];
  /** 가입 연령대 */
  field3: string | number;
};

/** 상품 종 정보 그리드 행 데이터 타입 */
type DummyDataType2 = {
  /** 데이터 ID */
  id: number;
  /** 종 구분 (예: 1종, 2종 등) */
  field1: string | number;
  /** 종 상세 명칭 및 옵션 */
  field2: string | number;
  /** 납입면제 버튼 표시 여부 */
  btn?: boolean;
};

/** 플랜 정보 그리드 행 데이터 타입 */
type DummyDataType3 = {
  /** 데이터 ID */
  id: number;
  /** 플랜 명칭 및 대상 연령 정보 */
  field1: string | number;
  /** 체크 여부 */
  checked?: boolean;
};

/** Ltpa02001 컴포넌트 Props 인터페이스 */
interface Ltpa02001Props {
  /** 가능상품만 보기 필터 활성화 여부 */
  isPossibleProductsOnly?: boolean;
  /** 가능상품 필터 리셋 콜백 */
  onResetPossibleFilter?: () => void;
}

/** 기본 상품 데이터 목록 */
const dummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '종합건강',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
    importance: true,
    badge: ['간편'],
    field3: '15~90세',
  },
  {
    id: 2,
    field1: '종합건강',
    field2: '한화 더 경증 간편건강보험간연만기 갱신형)2601',
    importance: true,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 3,
    field1: '종합건강',
    field2: '한화 더건강한 1040 종합보험2601',
    importance: false,
    badge: ['무해지', '할증'],
    field3: '15~90세',
  },
  {
    id: 4,
    field1: '종합건강',
    field2: '한화 3N5 더간편건강보험(세만기형)2601',
    importance: false,
    badge: ['무해지', '간편'],
    field3: '15~90세',
  },
  {
    id: 5,
    field1: '종합건강',
    field2: '한화 시그니처 여성 건강보험4.0',
    importance: false,
    badge: ['무해지', '할증'],
    field3: '15~90세',
  },
  {
    id: 6,
    field1: '암간병',
    field2: '한화 100세 암치료보장보험 2601',
    importance: false,
    badge: ['무해지', '할증'],
    field3: '15~90세',
  },
  {
    id: 7,
    field1: '자녀/치아',
    field2: '한화 건강쑥쑥 어린이 보험2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 8,
    field1: '의료비',
    field2: '한화실손의료보험(갱신형)(단체전환용)2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 9,
    field1: '의료비',
    field2: '드림모아 저축보험 2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 10,
    field1: '종합건강',
    field2: '한화 시그니처 여성 건강보험4.0(건강관리형)',
    importance: false,
    badge: ['할증'],
    field3: '15~90세',
  },
  {
    id: 11,
    field1: '종합건강',
    field2: '한화 건강쑥쑥 어린이 보험2601',
    importance: false,
    badge: ['무해지', '할증'],
    field3: '15~90세',
  },
  {
    id: 12,
    field1: '종합건강',
    field2: '한화실손의료보험(갱신형)(단체전환용)2601',
    importance: false,
    badge: ['할증'],
    field3: '15~90세',
  },
  {
    id: 13,
    field1: '종합건강',
    field2: '드림모아 저축보험 2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 14,
    field1: '종합건강',
    field2: '한화 시그니처 여성 건강보험4.0(건강관리형)',
    importance: false,
    badge: ['여성', '무해지', '할증'],
    field3: '15~90세',
  },
  {
    id: 15,
    field1: '종합건강',
    field2: '한화 건강쑥쑥 어린이 보험2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 16,
    field1: '종합건강',
    field2: '한화실손의료보험(갱신형)(단체전환용)2601',
    importance: false,
    badge: ['할증'],
    field3: '15~90세',
  },
  {
    id: 17,
    field1: '종합건강',
    field2: '한화 건강쑥쑥 어린이 보험2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 18,
    field1: '종합건강',
    field2: '한화 건강쑥쑥 어린이 보험2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 19,
    field1: '종합건강',
    field2: '한화 건강쑥쑥 어린이 보험2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 20,
    field1: '종합건강',
    field2: '한화 건강쑥쑥 어린이 보험2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 21,
    field1: '종합건강',
    field2: '한화 건강쑥쑥 어린이 보험2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
  {
    id: 22,
    field1: '종합건강',
    field2: '한화 건강쑥쑥 어린이 보험2601',
    importance: false,
    badge: [],
    field3: '15~90세',
  },
];

/** 기본 상품 종 데이터 목록 */
const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    field1: '1종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
    btn: false,
  },
  {
    id: 2,
    field1: '2종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
    btn: true,
  },
  {
    id: 3,
    field1: '3종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
    btn: false,
  },
  {
    id: 4,
    field1: '4종',
    field2: '한화 3N5 더 간편건강보험(연만기 갱신형)2601',
    btn: true,
  },
];

/** 마스터 플랜 목록 데이터 */
const planDummyDataList: DummyDataType3[] = [
  { id: 1, checked: true, field1: '(매니저 or 사용자)9형(355간편고지형(고혈압및당뇨 추가고지))(프리미엄올인원플랜)' },
  { id: 2, checked: true, field1: '1형(355간편고지형)(프리미엄응원입원플랜)(1,718.9형)(15~80세)' },
  { id: 3, checked: false, field1: '7형(355간편고지형)(고혈압추가고지X)(프리미엄응원입원플랜)(1,718.9형)' },
  { id: 4, checked: false, field1: '(지점)8형(355간편고지형)(당뇨 추가고지X)(프리미엄응원입원플랜)' },
  { id: 5, checked: false, field1: '4형(3.10.5간편고지형(고혈압및당뇨추가고지))(올인원플랜)(1~4형)(15-80세)' },
  { id: 6, checked: false, field1: '5형(385간편고지형)(올인원플랜)(5~12형)(15-80세)' },
  { id: 7, checked: false, field1: '6형(385간편고지형(고혈압추가고지))(올인원플랜)(5~12형)(15-80세)' },
  { id: 8, checked: false, field1: '7형(385간편고지형(당뇨추가고지))(올인원플랜)(5~12형)(15-80세)' },
  { id: 9, checked: false, field1: '8형(385간편고지형(고혈압및당뇨추가고지))(올인원플랜)(5~12형)(15-80세)' },
  { id: 10, checked: false, field1: '9형(365간편고지형)(올인원플랜)(5~12형)(15-80세)' },
  { id: 11, checked: false, field1: '10형(365간편고지형(고혈압추가고지))(올인원플랜)(5~12형)(15-80세)' },
  { id: 12, checked: false, field1: '11형(365간편고지형(당뇨추가고지))(올인원플랜)(5~12형)(15-80세)' },
  { id: 13, checked: false, field1: '12형(365간편고지형(고혈압및당뇨추가고지))(올인원플랜)(5~12형)(15-80세)' },
];

/** 회사플랜 데이터 목록 */
const dummyData3: DummyDataType3[] = [
  { id: 1, checked: true, field1: '(매니저 or 사용자)9형(355간편고지형(고혈압및당뇨 추가고지))(프리미엄올인원플랜)' },
  { id: 2, checked: true, field1: '1형(355간편고지형)(프리미엄응원입원플랜)(1,718.9형)(15~80세)' },
  { id: 3, checked: false, field1: '7형(355간편고지형)(고혈압추가고지X)(프리미엄응원입원플랜)(1,718.9형)' },
  { id: 4, checked: false, field1: '(지점)8형(355간편고지형)(당뇨 추가고지X)(프리미엄응원입원플랜)' },
  { id: 5, checked: false, field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)' },
  { id: 6, checked: true, field1: '7형(355간편(고혈압추가고지))(프리미엄올인원플랜)(1.718.9형)(15~80세)' },
  { id: 7, checked: true, field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)' },
  { id: 8, checked: false, field1: '7형(355간편(고혈압추가고지))(프리미엄올인원플랜)(1.718.9형)(15~80세)' },
  { id: 9, checked: false, field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)' },
  { id: 10, checked: false, field1: '7형(355간편(고혈압추가고지))(프리미엄올인원플랜)(1.718.9형)(15~80세)' },
  { id: 11, checked: false, field1: '1형(355간편고지형)(프리미엄올인원플랜)(1.718.9형)(15~80세)' },
  { id: 12, checked: true, field1: '7형(355간편(고혈압추가고지))(프리미엄올인원플랜)(1.718.9형)(15~80세)' },
];
/** 기관플랜 데이터 목록 (초기 빈 배열) */
const dummyData3b: DummyDataType3[] = [];
/** 나만의플랜 데이터 목록 (초기 빈 배열) */
const dummyData3c: DummyDataType3[] = [];

// 가능상품 보기 활성화 시 사용될 대체 데이터 셋
const possibleDummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '간편',
    field2: '한화 시그니처 여성 간편건강보험4.0 2604',
    importance: true,
    badge: ['여성', '무해지', '간편'],
    field3: '만15~89세',
  },
  {
    id: 2,
    field1: '간편',
    field2: '한화 3N5 더간편건강보험(세만기형) 2604',
    importance: true,
    badge: ['무해지', '간편'],
    field3: '15~89세',
  },
  {
    id: 3,
    field1: '간편',
    field2: '한화 3N5 더간편건강보험(연만기 갱신형) 2604',
    importance: true,
    badge: ['무해지', '간편'],
    field3: '15~90세',
  },
  {
    id: 4,
    field1: '간편',
    field2: '한화 311 간편건강보험(연만기 갱신형) 2604',
    importance: true,
    badge: ['무해지', '간편'],
    field3: '15~90세',
  },
  {
    id: 5,
    field1: '간편',
    field2: '한화 더 경증 간편건강보험(연만기 갱신형) 2604',
    importance: true,
    badge: ['무해지', '간편'],
    field3: '15~90세',
  },
  {
    id: 6,
    field1: '간편',
    field2: '한화 더 경증 간편건강보험Ⅱ(세만기형) 2604',
    importance: true,
    badge: ['무해지', '간편'],
    field3: '15~89세',
  },
];
const possibleDummyData2: DummyDataType2[] = [
  {
    id: 1,
    field1: '1종',
    field2: '납입후50%해약환급금지급형, 간편고지형',
    btn: true,
  },
  {
    id: 2,
    field1: '2종',
    field2: '기본형, 간편고지형',
    btn: true,
  },
  {
    id: 3,
    field1: '3종',
    field2: '납입후50%해약환급금지급형, 간편고지형',
    btn: true,
  },
  {
    id: 4,
    field1: '4종',
    field2: '기본형, 일반고지형',
    btn: true,
  },
];

const possibleDummyData3: DummyDataType3[] = planDummyDataList;
const possibleDummyData3b: DummyDataType3[] = [];
const possibleDummyData3c: DummyDataType3[] = [];

/**
 * LTPA02001 - 상품 및 플랜 선택 화면 컴포넌트
 *
 * @param props - {@link Ltpa02001Props}
 */
export function Ltpa02001({ isPossibleProductsOnly = false, onResetPossibleFilter }: Ltpa02001Props) {
  /** AG-Grid 동적 컬럼 폭 계산 훅 */
  const { attributeColumnWidth } = useDynamicColumnWidths();

  /** 상품명 툴팁/말풍선 노출 여부 상태 */
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);

  /** 상품 분류 라디오 버튼 선택값 상태 */
  const [productCategory, setProductCategory] = React.useState<string>('');

  /** 상품 특징 체크박스 선택값 상태 배열 */
  const [productFeature, setProductFeature] = React.useState<string[]>(['']);

  /** 상품 분류 변경 이벤트 처리 */
  const handleProductCategoryChange = React.useCallback(
    (val: string) => {
      setProductCategory(val);
      onResetPossibleFilter?.();
    },
    [onResetPossibleFilter]
  );

  /** 상품 특징 변경 이벤트 처리 */
  const handleProductFeatureChange = React.useCallback(
    (val: string[]) => {
      setProductFeature(val);
      onResetPossibleFilter?.();
    },
    [onResetPossibleFilter]
  );

  /** 즐겨찾기(행 상단 고정 및 복제) 로직을 제어하는 훅 */
  const {
    rowData: productRowData,
    toggleCloneByRow,
    isFavoriteRow,
    getRowId: getProductRowId,
    getCloneRowClass,
  } = useCloneTopRows<DummyDataType, 'id'>({
    rows: isPossibleProductsOnly ? possibleDummyData : dummyData,
    idKey: 'id',
  });

  type ProductGridRow = DummyDataType | ClonedTopRow<DummyDataType>;

  /** 상품선택 AG-Grid 헤더 렌더러 (검색/초기화 버튼 및 상품명 말풍선 툴팁 체크박스) */
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

  /** 상품명 컬럼 셀 렌더러 (즐겨찾기 토글, 상품명, 특성 배지 렌더링) */
  const importanceCellRenderer = (params: ICellRendererParams<ProductGridRow>) => {
    const badgeText = params.data?.badge ?? '';
    const isCloned = isFavoriteRow(params.data);

    const handleFavoriteChange = (checked: boolean | 'indeterminate') => {
      if (checked === 'indeterminate') return;
      toggleCloneByRow(params.data, checked);
    };

    return (
      <Grow className="w-full" placement="bwc">
        <Grow className="overflow-hidden -tracking-[0.03rem]">
          <Checkbox
            color="primary"
            onCheckedChange={handleFavoriteChange}
            checked={isCloned}
            size="lg"
            variant="favorite"
          >
            즐겨찾기
          </Checkbox>
          <div className="truncate-no">{params.data?.field2 ?? ''}</div>
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
                  <Badge key={badge.label} color={badge.color} className="min-w-[3rem]">
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

  /** 종 구분 컬럼 셀 렌더러 (종 구분 텍스트, 상세 텍스트 및 납입면제 버튼) */
  const designCellRenderer = (params: ICellRendererParams<DummyDataType2>) => {
    return (
      <Grow className="h-full w-full">
        <Grow className="border-r border-[var(--color-gray-10)] h-full aspect-auto w-[4rem] flex items-center justify-center shrink-0 pr-[1rem] pl-[0.4rem]">
          {params.data?.field1}
        </Grow>

        {/* M5. truncate > truncate-no 로 수정 */}
        <Grow className="flex-1 truncate-no block text-left">{params.data?.field2}</Grow>
        {params.data?.btn && (
          <Grow className="pr-1">
            <Button color="gray" onClick={() => {}} only="default" size="sm" variant="outlined">
              납면
            </Button>
          </Grow>
        )}
      </Grow>
    );
  };

  const planNameCellRenderer = (params: ICellRendererParams<DummyDataType3>) => {
    return (
      <Grow className="w-full h-full flex items-center justify-between gap-1 overflow-hidden">
        <span className="truncate-no flex-1">{params.data?.field1}</span>
        {params.data?.checked && <CheckIcon color="var(--color-primary-50)" className="shrink-0" />}
      </Grow>
    );
  };

  /** 상세 보기 버튼 셀 렌더러 */
  const moreCellRenderer = () => {
    return (
      <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
        보기
      </Button>
    );
  };

  /** 상품 목록 그리드 컬럼 정의 */
  const columnDefs: ColDef<ProductGridRow>[] = [
    {
      headerName: '상품분류',
      field: 'field1',
      cellClass: 'text-center',
      flex: 1,
      minWidth: attributeColumnWidth(80),
    },
    {
      headerName: '상품명',
      flex: 10,
      field: 'field2',
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<ProductGridRow>({ field: 'field2' }),
      cellRenderer: importanceCellRenderer,
      headerComponent: productNameHeader,
    },
    {
      headerName: '가입연령',
      field: 'field3',
      cellClass: 'text-center',
      flex: 1,
      minWidth: attributeColumnWidth(80),
    },
  ];

  /** 종 정보 그리드 컬럼 정의 */
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '종구분',
      field: 'field1',
      flex: 10,
      cellClass: 'text-center pr-0!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field2' }),
      cellRenderer: designCellRenderer,
    },
    {
      headerName: '알릴사항',
      cellClass: 'text-center',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellRenderer: moreCellRenderer,
    },
  ];

  /** 플랜 정보 그리드 컬럼 정의 */
  const columnDefs3: ColDef<DummyDataType3>[] = [
    {
      headerName: '플랜명',
      field: 'field1',
      flex: 10,
      cellClass: 'pr-0!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType3>({ field: 'field1' }),
      cellRenderer: planNameCellRenderer,
    },
    {
      headerName: '담보보기',
      cellClass: 'text-center',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellRenderer: moreCellRenderer,
    },
  ];

  /** 가능상품 전용 데이터 여부에 따른 탭 3개별 플랜 데이터 구성 */
  const tabData3 = isPossibleProductsOnly ? possibleDummyData3 : dummyData3;
  const tabData3b = isPossibleProductsOnly ? possibleDummyData3b : dummyData3b;
  const tabData3c = isPossibleProductsOnly ? possibleDummyData3c : dummyData3c;

  /** 플랜 선택 탭 항목 데이터 생성 */
  const dynamicDummyData3Tab = React.useMemo(
    () => [
      {
        value: 'tab1',
        label: '회사플랜',
        count: tabData3.length,
      },
      {
        value: 'tab2',
        label: '기관플랜',
        count: tabData3b.length,
      },
      {
        value: 'tab3',
        label: '나만의플랜',
        count: tabData3c.length,
      },
    ],
    [tabData3.length, tabData3b.length, tabData3c.length]
  );

  /** 탭 활성화 상태 및 클릭 훅 */
  const { tabs, active, setActive } = useTabs(dynamicDummyData3Tab);

  /** 활성화 탭에 해당하는 플랜 그리드 데이터 매핑 */
  const planRowDataMap: Record<string, DummyDataType3[]> = {
    tab1: tabData3,
    tab2: tabData3b,
    tab3: tabData3c,
  };
  const selectedPlanRowData = planRowDataMap[active] ?? tabData3;

  return (
    <Grid className="w-full h-full min-h-0 grid-rows-[auto_1fr_auto] px-[1rem] overflow-hidden" gap={3}>
      <Grow variant={'box-round'} className="w-full" placement="bwe">
        <FormTable caption="" cols={['w-[6rem]', 'w-auto']} variant={'none'}>
          <FormRow className="items-start!">
            <FormCell title={'상품분류'}>
              <RadioGroup
                value={productCategory}
                onValueChange={handleProductCategoryChange}
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
                  <RadioGroupItem variant="button" size="md" key={opt.value} value={opt.value}>
                    {opt.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </FormCell>
          </FormRow>
          <FormRow className="items-start!">
            <FormCell title={'상품특징'}>
              <CheckboxGroup
                value={productFeature}
                onValueChange={handleProductFeatureChange}
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
        <Button variant="outlined" color="gray" only="icon" onClick={onResetPossibleFilter}>
          <ResetIcon />
        </Button>
      </Grow>
      <Grow className="w-full h-full min-h-0 overflow-hidden" placement="ss" gap={5}>
        <ResizablePanelGroup orientation="horizontal" className="w-full h-full min-h-0">
          <ResizablePanel defaultSize={70}>
            <TableFold className="h-full flex flex-col min-h-0">
              <TableFoldHead title="상품정보" variant="default" />
              <TableFoldBody className="w-full flex-1 min-h-0 relative">
                <div
                  className={`tooltip-hidden-toggle w-full h-full relative ag-theme-alpine ${showProductNameTooltip ? ' show-product-tooltip' : ''}`}
                >
                  <AgGridReact<ProductGridRow>
                    getRowId={(params) => getProductRowId(params.data)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={productRowData}
                    columnDefs={columnDefs}
                    getRowClass={(params) => getCloneRowClass(params.data, 'row-cloning')}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </ResizablePanel>
          <ResizableHandle />
          {/* 우측 종 정보 및 플랜 영역 패널 */}
          <ResizablePanel defaultSize={30}>
            <ResizablePanelGroup orientation="vertical" className="w-full h-full min-h-0">
              <ResizablePanel defaultSize={50}>
                <TableFold className="w-full h-full flex flex-col min-h-0">
                  <TableFoldHead
                    title="한화 3N5 더간편건강보험(세만기형)2601종 정보 한화 3N5 더간편건강보험(세만기형)2601종 정보"
                    variant="default"
                    className="grid grid-cols-[1fr_auto] gap-2 [&>div]:first:overflow-hidden [&>div]:first:flex [&>div]:first:whitespace-nowrap [&>div]:first:w-full"
                  >
                    <Grow>
                      <Checkbox>미판매보종</Checkbox>
                    </Grow>
                  </TableFoldHead>
                  <TableFoldBody className="w-full flex-1 min-h-0 relative">
                    <div
                      className={`tooltip-hidden-toggle w-full h-full relative ag-theme-alpine ${showProductNameTooltip ? ' show-product-tooltip' : ''}`}
                    >
                      <AgGridReact<DummyDataType2>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={isPossibleProductsOnly ? possibleDummyData2 : dummyData2}
                        columnDefs={columnDefs2}
                        domLayout="normal"
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </ResizablePanel>
              <ResizableHandle />
              {/* 플랜 탭 및 플랜 목록 AG-Grid 영역 */}
              <ResizablePanel defaultSize={50}>
                <TabPager
                  data={tabs}
                  active={active}
                  setActive={setActive}
                  hasTableBelow={true}
                  className="w-full h-full min-h-0"
                  contentClass="w-full h-full min-h-0 relative"
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
                  <div
                    className={`tooltip-hidden-toggle w-full h-full relative ag-border-t ag-theme-alpine ${showProductNameTooltip ? ' show-product-tooltip' : ''}`}
                  >
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
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Grow>

      {/* 3. 하단 작업 버튼 영역 (추천설계 / 설계시작) */}
      <Grow gap={1} className="w-full min-h-[3.2rem] pb-2.5" placement="ec">
        <Button variant={'outlined'} color={'gray'} size={'xl'}>
          <AiIcon size={24} color={'#006FF2'} color2={'#A683FF'} />
          추천설계
        </Button>
        <Button type="button" variant={'contained'} color={'primary'} size={'xl'}>
          설계시작
          <ArrowNext size={16} />
        </Button>
      </Grow>
    </Grid>
  );
}
