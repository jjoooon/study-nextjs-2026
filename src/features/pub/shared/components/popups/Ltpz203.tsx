/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import {
  CalendarIcon2,
  CheckboxIcon,
  CircleCheckIcon,
  FixingPinIcon,
  InfoBoxWarningIcon,
  NoteIcon,
  ShieldIcon,
} from '@icons';
import { Badge2, getBadge2ColorByText } from '@uiux/Badge2';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

/**
 * 동일한 색상 그룹의 태그들을 묶어서 하나의 Badge2로 렌더링하는 헬퍼 함수
 * 예: ['부담보', '할증', '감액'] -> <Badge2 color="yellow">부담보 · 할증 · 감액</Badge2>
 */
const renderGroupedBadge2 = (tags?: string[]) => {
  if (!tags || tags.length === 0) return null;

  const groups: { color: string; items: string[] }[] = [];

  tags.forEach((tag) => {
    const color = getBadge2ColorByText(tag) ?? 'gray';
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.color === color) {
      lastGroup.items.push(tag);
    } else {
      groups.push({ color, items: [tag] });
    }
  });

  return groups.map((group, idx) => (
    <Badge2 key={idx} color={group.color as any}>
      {group.items.join(' · ')}
    </Badge2>
  ));
};

/**
 * 가입가능 여부(인수, 조건부인수 등) 텍스트 및 뱃지 스타일 렌더링 헬퍼
 * - '예상 : ' 접두사 고정
 * - '인수'일 때 green, '조건부인수'일 때 yellow 등
 */
const getPossibilityBadgeStyle = (possibility?: string) => {
  if (!possibility) return { color: 'green' as const, iconColor: '#00B050', label: '예상 : 인수' };

  const clean = possibility.replace(/^[0-9]/, '').trim();

  if (clean.includes('조건부')) {
    return { color: 'yellow' as const, iconColor: '#FFB800', label: '예상 : 조건부인수' };
  }
  if (clean.includes('거절')) {
    return { color: 'red' as const, iconColor: '#E53E3E', label: '예상 : 거절' };
  }
  if (clean.includes('인수')) {
    return { color: 'green' as const, iconColor: '#00B050', label: '예상 : 인수' };
  }
  if (clean.includes('심사') || clean.includes('적부')) {
    return { color: 'blue' as const, iconColor: '#006FF2', label: `예상 : ${clean}` };
  }

  return { color: 'green' as const, iconColor: '#00B050', label: `예상 : ${clean}` };
};

/**
 * 비교 옵션 타입 정의
 */
type OptionType = { 옵션1: string } | { 옵션2: string } | { 옵션3: string[] } | { 옵션4: string };

/**
 * 설계 기준 및 비교용 상품 기본 정보 데이터 타입
 */
type InfoDataType = {
  id: number;
  유형: 'type1' | 'type2' | 'type3' | string;
  담보명: string;
  tag: string[];
  가능: string;
  옵션: OptionType[];
};

/**
 * 고지 유형별 문구 반환 헬퍼 함수
 */
const getNoticeTypeLabel = (type?: string, fallback: React.ReactNode = null): React.ReactNode => {
  switch (type) {
    case 'type1':
      return (
        <Typo tag="p" className="text-[1.5rem] font-normal">
          <b className="font-bold">현재 설계상품내</b>에서 <b>&apos;인수&apos;</b>예상 고지 유형
        </Typo>
      );
    case 'type2':
      return (
        <Typo tag="p" className="text-[1.5rem] font-normal">
          <b className="font-bold">일반고지유형내</b>에서 <b>&apos;인수/할증/부담보/감액&apos;예상</b> 고지 유형
        </Typo>
      );
    case 'type3':
      return (
        <Typo tag="p" className="text-[1.5rem] font-normal">
          <b className="font-bold">간편고지유형내</b>에서 <b>&apos;인수&apos;</b>예상 고지 유형
        </Typo>
      );
    default:
      return fallback;
  }
};

/**
 * 기준설계 및 비교설계 카드에 노출할 상품 및 플랜 요약 더미 데이터
 */
const InfoData: InfoDataType = {
  id: 1,
  유형: '',
  담보명: '한화 시그니처 여성 건강보험4.0 2504 ',
  가능: '인수가능',
  tag: ['인수'],
  옵션: [
    { 옵션1: '납입면제 강화형, 납입후 50% 해약환급금지급형 해약환급금지급형' },
    { 옵션2: '비대면진단심사플랜(20~40세)' },
    { 옵션3: ['20년납', '100세만기', '갱신 20년'] },
    { 옵션4: '1형(일반 고지 형)' },
  ],
};

const InfoData1: InfoDataType = {
  id: 1,
  유형: 'type1',
  담보명: '1한화 시그니처 여성 건강보험4.0 2504 ',
  가능: '1인수가능',
  tag: ['인수'],
  옵션: [
    { 옵션1: '납입면제 강화형, 납입후 50% 해약환급금지급형 해약환급금지급형' },
    { 옵션2: '비대면진단심사플랜(20~40세)' },
    { 옵션3: ['20년납', '100세만기', '갱신 20년'] },
    { 옵션4: '1형(일반 고지 형)' },
  ],
};

const InfoData2: InfoDataType = {
  id: 1,
  유형: 'type2',
  담보명: '2한화 시그니처 여성 건강보험4.0 2504 ',
  가능: '2조건부인수',
  tag: ['심사', '거절', '부담보', '할증', '감액'],
  옵션: [
    { 옵션1: '납입면제 강화형, 납입후 50% 해약환급금지급형 해약환급금지급형' },
    { 옵션2: '비대면진단심사플랜(20~40세)' },
    { 옵션3: ['20년납', '100세만기', '갱신 20년'] },
    { 옵션4: '1형(일반 고지 형)' },
  ],
};

const InfoData3: InfoDataType = {
  id: 1,
  유형: 'type3',
  담보명: '3한화 시그니처 여성 건강보험4.0 2504 ',
  가능: '3인수가능',
  tag: ['부담보', '할증', '감액'],
  옵션: [
    { 옵션1: '납입면제 강화형, 납입후 50% 해약환급금지급형 해약환급금지급형' },
    { 옵션2: '비대면진단심사플랜(20~40세)' },
    { 옵션3: ['20년납', '100세만기', '갱신 20년'] },
    { 옵션4: '1형(일반 고지 형)' },
  ],
};

/**
 * 드롭다운 선택 콤보박스(NativeSelect)용 옵션 데이터 타입
 */
type SelectOptionType = {
  value: string;
  label: string;
}[];

const selectOption1: SelectOptionType = [
  { value: '옵션1', label: '납입면제 강화형, 납입후 50% 해약환급금지급형 해약환급금지급형' },
  { value: '옵션2', label: '2납입면제 강화형, 납입후 50% 해약환급금지급형 해약환급금지급형' },
];
const selectOption2: SelectOptionType = [
  { value: '옵션1', label: '비대면진단심사플랜(20~40세)' },
  { value: '옵션2', label: '2비대면진단심사플랜(20~40세)' },
];
const selectOption3: SelectOptionType = [
  { value: '옵션1', label: '20년납' },
  { value: '옵션2', label: '30년납' },
];
const selectOption4: SelectOptionType = [
  { value: '옵션1', label: '100세만기' },
  { value: '옵션2', label: '200세만기' },
];
const selectOption5: SelectOptionType = [
  { value: '옵션1', label: '갱신 20년' },
  { value: '옵션2', label: '갱신 30년' },
];

/**
 * 설계 담보 상세 테이블(Ag-Grid)용 데이터 타입
 */
type DummyDataType = {
  id: number;
  field1: string; // 담보명
  field2: number; // 가입금액
  field3: number; // 보험료
};

/**
 * 설계 담보 목록 더미 데이터
 */
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '보통약관(상해80%이상후유장해)',
    field2: 13000,
    field3: 3000000,
  },
  { id: 2, field1: '보험료납입면제대상보장(5대유사)', field2: 10, field3: 10 },
  { id: 3, field1: '상해사망(간편)', field2: 15000, field3: 15000 },
  { id: 4, field1: '상해후유장해(3-100%)', field2: 10000, field3: 10000 },
  { id: 5, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 6, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 7, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 8, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 9, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 10, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 11, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 12, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 13, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 14, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 15, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 16, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
];

/**
 * @component CardBox
 * @description 설계 카드의 외부 컨테이너 스타일링 컴포넌트
 * - 오렌지/주황 그라데이션 및 쉐도우 효과와 둥근 모서리가 들어간 레이아웃 컨테이너
 * - `.card-selected` 활성화 시 주황색 메인 하이라이트 테마로 노출됩니다.
 */
function CardBox({ children, bottom, color }: { children: React.ReactNode; bottom: React.ReactNode; color?: string }) {
  return (
    <Grid
      placement="ss"
      data-recommend-item="true"
      className={`group gap-0 rounded-[1rem] after:content-[''] after:rounded-[1rem] after:absolute after:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] after:w-full after:h-full after:pointer-events-none after:top-0 after:left-0 shadow-[0_0.2rem_0.2rem_0_rgba(0,0,0,0.1)] overflow-hidden relative max-w-[31.2rem] min-w-[31.2rem] h-full grid-rows-[minmax(0,1fr)_auto] `}
      style={{
        background: color
          ? `linear-gradient(to bottom, white, ${color})`
          : `linear-gradient(to bottom, white, var(--color-secondary-40))`,
      }}
    >
      <Grid
        className="bg-[#fff] group-[.card-selected]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] group-[.card-selected]:[background-repeat:no-repeat] group-[.card-selected]:[background-position:right_top,left_top] rounded-b-[1rem] p-[1rem] gap-2 w-full p-0 shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)] group-[.card-selected]:text-white gap-0 grid-rows-[1fr_auto]"
        placement="ss"
      >
        {children}
      </Grid>
      <Grow placement="bwc" className="px-[1.6rem] h-[4rem] text-white">
        <b>예상보험료(환급률)</b>
        {bottom}
      </Grow>
    </Grid>
  );
}

/**
 * @component Ltpz203
 * @description 상품비교설계 팝업 다이얼로그 컴포넌트
 * - 기준 설계안과 최대 3개의 비교 설계안을 가로 병렬 구조로 배치하여 한도, 가입금액, 보험료 정보를 대조하는 화면입니다.
 * - 주요 기능:
 *   1. 여러 카드 내부에 들어있는 Ag-Grid 테이블의 스크롤 위치 동기화 (`handleSyncScroll`)
 *   2. Ag-Grid의 기본 헤더를 숨기는 대신, 정적 flex 영역(`getComparisonHeaderCellStyle`)을 정의하여 그리드 본체와 정확히 매칭되는 상단 헤더 직접 렌더링
 *   3. 담보별 가입금액 및 합계 행 표시 및 각 비교설계 카드별 가입조건(납기, 만기, 고지형 등) 동적 선택
 */
const Ltpz203 = () => {
  // 담보 목록 데이터를 관리하는 상태값
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  // 각 비교 카드 그리드의 스크롤 엘리먼트를 수집하는 ref 배열
  const scrollRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  // 스크롤 이벤트의 연쇄 호출(무한 동기화 루프)을 방지하기 위한 Lock 플래그 ref
  const isSyncing = React.useRef(false);

  /**
   * 스크롤 동기화 이벤트 핸들러
   * - 임의의 카드 내 그리드를 세로 스크롤하면 다른 모든 카드의 그리드도 동일한 scrollTop으로 동기화 스크롤시킵니다.
   */
  const handleSyncScroll = (idx: number, e: React.UIEvent<HTMLDivElement>) => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop;

    scrollRefs.current.forEach((ref, i) => {
      // 본인을 제외하고 ref가 유효하며 오차가 1px 이상일 때 스크롤 동기화
      if (i !== idx && ref && Math.abs(ref.scrollTop - scrollTop) > 1) {
        ref.scrollTop = scrollTop;
      }
    });

    // 비동기로 플래그를 해제하여 순환 동기화 방지
    setTimeout(() => {
      isSyncing.current = false;
    }, 0);
  };

  /**
   * 커스텀 헤더 셀의 스타일 계산 함수
   * - Ag-Grid 본문 컬럼에 적용된 width 또는 flex 설정 값을 상단 커스텀 헤더 요소에 동기화하여 너비를 정확히 일치시킵니다.
   */
  function getComparisonHeaderCellStyle(column: ColDef): React.CSSProperties {
    if (typeof column.width === 'number') {
      const width = `${column.width}px`;

      return {
        flex: '0 0 auto',
        minWidth: width,
        width,
      };
    }

    if (typeof column.flex === 'number') {
      return {
        flex: `${column.flex} ${column.flex} 0%`,
        minWidth: 0,
      };
    }

    return {
      flex: '1 1 0%',
      minWidth: 0,
    };
  }

  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 담보 그리드 컬럼 구성 정의
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '담보명',
        field: 'field1',
        flex: 3,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field1' }),
        colSpan: (params) => {
          // 합계 행(id === 0)일 경우 담보명과 가입금액 열을 가로 병합(colSpan)하여 넓게 출력
          if (params.data?.id === 0) return 2;
          return 1;
        },
      },
      {
        headerName: '가입금액(만원)',
        field: 'field2',
        flex: 3,
        minwidth: attributeColumnWidth(100),
        valueFormatter: numberValueFormatter,
        colSpan: (params) => {
          // 합계 행일 경우 가입금액 칸은 담보명 칸에 병합되므로 미출력(0 처리)
          if (params.data?.id === 0) return 0;
          return 1;
        },
        cellClass: (params) => {
          if (params.data?.id === 0) return 'hidden';
          return 'text-right';
        },
      },
      {
        headerName: '보험료(원)',
        field: 'field3',
        flex: 2,
        minwidth: attributeColumnWidth(65),
        valueFormatter: numberValueFormatter,
        cellClass: (params) => {
          // 합계 행의 보험료 출력 스타일 차별화
          if (params.data?.id === 0) return 'text-right font-bold bg-gray-100';
          return 'text-right';
        },
        editable: false,
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl" className="Ltpz203">
        {/* 다이얼로그 타이틀 */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              상품비교설계
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ203)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        {/* 다이얼로그 본문 영역 */}
        <DialogSection className="min-w-[0]!">
          <Grid className="w-full grid-cols-[auto_1fr] grid-rows-[1fr] gap-6">
            {/* [좌측 영역] 기준설계 고정 카드 */}
            <Grid className="h-full pb-[1.6rem] grid-rows-[1fr] overflow-y-hidden">
              <CardBox
                bottom={
                  <div>
                    <b>70,000</b>원(39.4%)
                  </div>
                }
              >
                <Grid className="grid-rows-[auto_minmax(0,1fr)] overflow-y-hidden">
                  {/* 카드 헤더 고정핀 */}
                  <Grow className="bg-[var(--color-primary-50)] text-white w-full h-[4rem] items-center justify-start p-[1.6rem] font-[700]">
                    <FixingPinIcon className="" />
                    기준설계
                  </Grow>
                  {/* 가입조건 및 상세 담보 그리드 */}
                  <Grid className="p-[1.6rem] gap-5 grid-rows-[1fr_auto]" placement="ss">
                    <Gcol className="gap-2" placement="ss">
                      <Gcol placement="ss">
                        {getNoticeTypeLabel(InfoData.유형)}

                        <Typo tag="h3" variant={'body-xl'} weight={'bold'} className="">
                          {InfoData.담보명}
                        </Typo>
                      </Gcol>
                      {/* 가입 설계 기본 옵션 목록 (텍스트 출력) */}
                      <Gcol
                        variant="box-warning"
                        placement="ss"
                        className="border border-[var(--color-primary-15)] gap-1 min-h-[13.9rem]"
                      >
                        {InfoData.옵션.map((option, index) => {
                          const optionKey = `옵션${index + 1}` as keyof typeof option;
                          return (
                            <Grow
                              key={index}
                              placement="ss"
                              className={`text-[1.3rem] ${index === 3 ? 'font-bold' : ''}`}
                            >
                              {index === 0 && (
                                // M1. 수정
                                <ShieldIcon
                                  color={'var(--color-blue-gray-60)'}
                                  className="translate-y-[0.2rem] shrink-0"
                                  size={16}
                                />
                              )}
                              {index === 1 && (
                                // M1. 수정
                                <NoteIcon
                                  color={'var(--color-blue-gray-60)'}
                                  className="translate-y-[0.2rem] shrink-0"
                                  size={16}
                                />
                              )}
                              {index === 2 && (
                                // M1. 수정
                                <CalendarIcon2
                                  color={'var(--color-blue-gray-60)'}
                                  className="translate-y-[0.2rem] shrink-0"
                                  size={16}
                                />
                              )}
                              {index === 3 && (
                                // M1. 수정
                                <CheckboxIcon
                                  color={'var(--color-blue-gray-60)'}
                                  className="translate-y-[0.2rem] shrink-0"
                                  size={16}
                                />
                              )}
                              {option[optionKey as keyof typeof option]}
                            </Grow>
                          );
                        })}
                      </Gcol>
                    </Gcol>

                    {/* 담보 그리드 감싸는 컨테이너 - 스크롤 동기화 타겟 (index 0) */}
                    <div
                      className="ag-theme-alpine no-header w-full overflow-y-auto relative [&_.ag-header]:!hidden [&_.ag-header-viewport]:!hidden [&_.ag-header-row]:!h-0 [&_.ag-header]:!min-h-0"
                      ref={(el) => {
                        scrollRefs.current[0] = el;
                      }}
                      onScroll={(e) => handleSyncScroll(0, e)}
                    >
                      {/* Ag-Grid 기본 헤더 대신 렌더링되는 커스텀 고정 헤더 */}
                      <div className="sticky top-0 z-10 flex h-[3rem] w-full border-b border-[#D9E2EC] bg-[var(--color-gray-5)] border-t-[0.2rem] border-t-[#000]">
                        {columnDefs.map((column, index) => {
                          const key = column.field ?? column.headerName ?? `column-${index}`;

                          return (
                            <div
                              key={key}
                              className={`flex h-full items-center border-r border-[#D9E2EC] px-0 justify-center last:border-r-0`}
                              style={getComparisonHeaderCellStyle(column)}
                            >
                              <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[#000]">
                                {column.headerName}
                              </Typo>
                            </div>
                          );
                        })}
                      </div>
                      {/* Ag-Grid React 본체 (헤더 영역은 CSS 스타일로 숨김 처리됨) */}
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        headerHeight={0}
                        groupHeaderHeight={0}
                        defaultColDef={{
                          suppressMovable: true,
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="autoHeight"
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                  </Grid>
                </Grid>
              </CardBox>
            </Grid>

            {/* [우측 영역] 가로 스크롤 가능한 비교설계 카드 3개 */}
            <Grow placement="ss" className="overflow-y-hidden overflow-x-auto h-full pb-[1rem]" gap={3}>
              {[InfoData1, InfoData2, InfoData3].map((infoData, i) => (
                <CardBox
                  color="var(--color-information-50)"
                  bottom={
                    <div>
                      <b>70,000</b>원(39.4%)
                    </div>
                  }
                  key={i}
                >
                  <Grid className="p-[1.6rem] gap-5 grid-rows-[auto_minmax(0,1fr)] overflow-y-hidden" placement="ss">
                    <Gcol placement="ss" className="">
                      {/* 비교설계 적용 대상 선택 체크박스 및 변경 버튼 */}
                      <Grow placement="ss" className="w-full">
                        <Checkbox color={'info'} aria-label="선택" className="gap-x-2!">
                          {' '}
                          <Typo tag="div" variant={'body-sm'} weight={'bold'} color={'information'}>
                            대안설계{i + 1}
                          </Typo>
                        </Checkbox>
                        {(() => {
                          const { color, iconColor, label } = getPossibilityBadgeStyle(infoData.가능);
                          return (
                            <Badge2 color={color} className="h-[2.2rem] text-[1.1rem] px-[0.6rem] py-[0.2rem]">
                              <CircleCheckIcon size={12} color={iconColor} />
                              {label}
                            </Badge2>
                          );
                        })()}
                      </Grow>
                      <Gcol placement="bws" className="h-[8.8rem]">
                        <Gcol placement="ss">
                          {getNoticeTypeLabel(infoData.유형)}
                          <Grow className="gap-1 flex-wrap">
                            <Badge2 color="gray">예상UW</Badge2>
                            {renderGroupedBadge2(infoData.tag)}
                          </Grow>
                        </Gcol>
                        <Gcol placement="ss">
                          <Typo tag="h3" variant={'body-md'} weight={'bold'}>
                            {infoData.담보명}
                          </Typo>
                        </Gcol>
                      </Gcol>

                      {/* 비교설계 콤보박스(NativeSelect) 영역 (납기/만기/갱신형 등 가입조건 조율) */}
                      <Gcol variant="box-info" placement="ss" className="border border-[var(--color-information-15)]">
                        <NativeSelect size="md" readOnly>
                          {selectOption1.map((option, index) => {
                            return (
                              <NativeSelectOption key={index} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            );
                          })}
                        </NativeSelect>
                        <NativeSelect size="md" readOnly>
                          {selectOption2.map((option, index) => {
                            return (
                              <NativeSelectOption key={index} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            );
                          })}
                        </NativeSelect>
                        <Grow>
                          <NativeSelect size="md" readOnly>
                            {selectOption3.map((option, index) => {
                              return (
                                <NativeSelectOption key={index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              );
                            })}
                          </NativeSelect>
                          <NativeSelect size="md" readOnly>
                            {selectOption4.map((option, index) => {
                              return (
                                <NativeSelectOption key={index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              );
                            })}
                          </NativeSelect>
                          <NativeSelect size="md" readOnly>
                            {selectOption5.map((option, index) => {
                              return (
                                <NativeSelectOption key={index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              );
                            })}
                          </NativeSelect>
                        </Grow>
                        <Grow placement="ss" className="text-[1.3rem] font-bold">
                          <CheckboxIcon
                            color={'var(--color-blue-gray-60)'}
                            className="translate-y-[0.2rem] shrink-0"
                            size={16}
                          />
                          1형(일반 고지 형)
                        </Grow>
                      </Gcol>
                    </Gcol>

                    {/* 담보 그리드 감싸는 컨테이너 - 스크롤 동기화 타겟 (index 1 ~ 3) */}
                    <div
                      className="ag-theme-alpine no-header w-full overflow-y-auto relative [&_.ag-header]:!hidden [&_.ag-header-viewport]:!hidden [&_.ag-header-row]:!h-0 [&_.ag-header]:!min-h-0"
                      ref={(el) => {
                        scrollRefs.current[i + 1] = el;
                      }}
                      onScroll={(e) => handleSyncScroll(i + 1, e)}
                    >
                      {/* Ag-Grid 기본 헤더 대신 렌더링되는 커스텀 고정 헤더 */}
                      <div className="sticky top-0 z-10 flex h-[3rem] w-full border-b border-[#D9E2EC] bg-[var(--color-gray-5)] border-t-[0.2rem] border-t-[#000]">
                        {columnDefs.map((column, index) => {
                          const key = column.field ?? column.headerName ?? `column-${index}`;
                          return (
                            <div
                              key={key}
                              className={`flex h-full items-center border-r border-[#D9E2EC] px-0 justify-center last:border-r-0`}
                              style={getComparisonHeaderCellStyle(column)}
                            >
                              <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[#000]">
                                {column.headerName}
                              </Typo>
                            </div>
                          );
                        })}
                      </div>
                      {/* Ag-Grid React 본체 (헤더 영역은 CSS 스타일로 숨김 처리됨) */}
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        headerHeight={0}
                        groupHeaderHeight={0}
                        defaultColDef={{
                          suppressMovable: true,
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="autoHeight"
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                    {/* 2번째 카드(i === 1) 하단 안내 문구 */}
                    {i === 1 && (
                      <Grow placement="ss" gap={1} className="shrink-0" style={{ marginTop: '-1.2rem' }}>
                        <InfoBoxWarningIcon size={14} color="#E43939" className="shrink-0 mt-0.5" />
                        <span className="text-[#E43939] text-[1.2rem]">
                          할증 반영 전 예상보험료로 최종 심사결과에 따라 변경될 수 있습니다.
                        </span>
                      </Grow>
                    )}
                  </Grid>
                </CardBox>
              ))}
            </Grow>
          </Grid>
        </DialogSection>

        {/* 다이얼로그 하단 푸터 버튼 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                설계생성(0)
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz203;
