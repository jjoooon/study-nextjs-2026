/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { CalendarIcon2, CheckboxIcon, CircleCheckIcon, FixingPinIcon, NoteIcon, ShieldIcon } from '@icons';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Badge } from '@uiux/Badge';
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
import { DialogBottomInfo } from '@common/DialogBottomInfo';

/**
 * 비교 옵션 타입 정의
 */
type OptionType = { 옵션1: string } | { 옵션2: string } | { 옵션3: string[] } | { 옵션4: string };

/**
 * 설계 기준 및 비교용 상품 기본 정보 데이터 타입
 */
type InfoDataType = {
  id: number;
  담보명: string;
  가능: string;
  옵션: OptionType[];
};

/**
 * 기준설계 및 비교설계 카드에 노출할 상품 및 플랜 요약 더미 데이터
 */
const InfoData: InfoDataType = {
  id: 1,
  담보명: '한화 시그니처 여성 건강보험4.0 2504',
  가능: '인수가능',
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
const selectOption6: SelectOptionType = [
  { value: '옵션1', label: '1형(일반고지형)' },
  { value: '옵션2', label: '2형(갱신형)' },
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
      className={`group gap-0 rounded-[1rem] after:content-[''] after:rounded-[1rem] after:absolute after:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] after:w-full after:h-full after:pointer-events-none after:top-0 after:left-0 shadow-[0_0.2rem_0.2rem_0_rgba(0,0,0,0.1)] overflow-hidden relative max-w-[31.2rem] min-w-[31.2rem] grid-rows-[1fr_auto] `}
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
        <b>보험료(환급률)</b>
        {bottom}
      </Grow>
    </Grid>
  );
}

/**
 * @component Ltpz013
 * @description 상품비교설계 팝업 다이얼로그 컴포넌트
 * - 기준 설계안과 최대 3개의 비교 설계안을 가로 병렬 구조로 배치하여 한도, 가입금액, 보험료 정보를 대조하는 화면입니다.
 * - 주요 기능:
 *   1. 여러 카드 내부에 들어있는 Ag-Grid 테이블의 스크롤 위치 동기화 (`handleSyncScroll`)
 *   2. Ag-Grid의 기본 헤더를 숨기는 대신, 정적 flex 영역(`getComparisonHeaderCellStyle`)을 정의하여 그리드 본체와 정확히 매칭되는 상단 헤더 직접 렌더링
 *   3. 담보별 가입금액 및 합계 행 표시 및 각 비교설계 카드별 가입조건(납기, 만기, 고지형 등) 동적 선택
 */
const Ltpz013 = () => {
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
      <DialogContent showCloseButton resizable={true} size="2xl">
        {/* 다이얼로그 타이틀 */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              상품비교설계
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ013)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        {/* 다이얼로그 본문 영역 */}
        <DialogSection>
          <Grid className="w-full grid-cols-[auto_1fr] gap-6">
            {/* [좌측 영역] 기준설계 고정 카드 */}
            <Grid className="h-full pb-[1.6rem] grid-rows-[1fr]">
              <CardBox
                bottom={
                  <div>
                    <b>70,000</b>원(39.4%)
                  </div>
                }
              >
                <Grid className="grid-rows-[auto_1fr]">
                  {/* 카드 헤더 고정핀 */}
                  <Grow className="bg-[var(--color-primary-50)] text-white w-full h-[4rem] items-center justify-start p-[1.6rem] font-[700]">
                    <FixingPinIcon className="" />
                    기준설계
                  </Grow>
                  {/* 가입조건 및 상세 담보 그리드 */}
                  <Grid className="p-[1.6rem] gap-5 grid-rows-[1fr_auto]" placement="ss">
                    <Gcol className="gap-2" placement="ss">
                      <Gcol placement="ss">
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
                            <Grow key={index} placement="ss" className="text-[1.3rem]">
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
                      className="ag-theme-alpine no-header w-full max-h-[calc(100vh-53rem)] overflow-y-auto relative [&_.ag-header]:!hidden [&_.ag-header-viewport]:!hidden [&_.ag-header-row]:!h-0 [&_.ag-header]:!min-h-0"
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
              {[...Array(3)].map((_, i) => (
                <CardBox
                  color="var(--color-information-50)"
                  bottom={
                    <div>
                      <b>70,000</b>원(39.4%)
                    </div>
                  }
                  key={i}
                >
                  <Gcol className="p-[1.6rem] gap-5" placement="ss">
                    <Gcol className="gap-2" placement="ss">
                      {/* 비교설계 적용 대상 선택 체크박스 및 변경 버튼 */}
                      <Grow placement="bwc" className="w-full">
                        <Checkbox aria-label="선택"></Checkbox>
                        <Button variant={'outlined'} color={'gray'} size={'sm'}>
                          변경
                        </Button>
                      </Grow>
                      <Gcol placement="ss">
                        <Typo
                          tag="div"
                          variant={'body-sm'}
                          weight={'bold'}
                          color={'information'}
                          className="flex gap-1 items-center"
                        >
                          비교설계{i + 1}
                          <Badge color="blue" className="h-[2.2rem] rounded-full text-[1.1rem] leading-[1] px-[0.6rem]">
                            <CircleCheckIcon size={12} color="var(--color-information-50)" />
                            인수가능
                          </Badge>
                        </Typo>
                        <Typo tag="h3" variant={'body-xl'} weight={'bold'}>
                          {InfoData.담보명}
                        </Typo>
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
                          <NativeSelect size="md">
                            {selectOption3.map((option, index) => {
                              return (
                                <NativeSelectOption key={index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              );
                            })}
                          </NativeSelect>
                          <NativeSelect size="md">
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
                        <NativeSelect size="md" readOnly>
                          {selectOption6.map((option, index) => {
                            return (
                              <NativeSelectOption key={index} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            );
                          })}
                        </NativeSelect>
                      </Gcol>
                    </Gcol>

                    {/* 담보 그리드 감싸는 컨테이너 - 스크롤 동기화 타겟 (index 1 ~ 3) */}
                    <div
                      className="ag-theme-alpine no-header w-full max-h-[calc(100vh-53rem)] overflow-y-auto relative [&_.ag-header]:!hidden [&_.ag-header-viewport]:!hidden [&_.ag-header-row]:!h-0 [&_.ag-header]:!min-h-0"
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
                  </Gcol>
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
                선택설계생성(0)
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

export default Ltpz013;
