/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, ICellRendererParams, SortChangedEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  AsyncTooltipButton,
  createCellValueChangedHandler,
  createFieldRenderer,
  OverflowTooltipText,
  useDynamicColumnWidths,
  createDualRowHeader,
  dualRowSortComparator,
} from '@aggrid';
import { Grow, Gcol, Typo, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon, FileExportIcon, PenIcon, LinkIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

import '@/shared/lib/agGridPub';

// 통합가입설계조회 그리드에서 사용하는 단일 행 데이터 타입 정의
type DummyDataRow = {
  id: number;
  isCheck: boolean;
  isState: boolean; // 판매중지 상품 true
  field01: string;
  field02: string;
  field03: string;
  memo: boolean;
  field05: string;
  field06: string;
  field20: string;
  field21: string;
  field22: string;
  field23: string;

  field07: number;
  field08: number;

  field09: string;
  field10: string;
  field11: string;
  field24: string;
  field12: string;
  field13: string;
  field14: string;
  field15: string;
  field16: string;
  field17: string;
  field18: string;
  field19: string;
  nickname?: string;

  field25: string; // 최초설계일
  field26: string; // BM
  field27: string; // 유자격자
  link?: string;
};
const DummyData: DummyDataRow[] = [
  {
    id: 1,
    isCheck: true,
    isState: true,
    field01: '1_LA123456789012',
    field02: '1_한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '1_고지유형/플랜',
    memo: true,
    field05: '5_김한화김한',
    field06: '2009-01-01',
    field20: '1_김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 1000000,
    field08: 1.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '1_설계중',
    field10: '1_심사결과',
    field11: '1_미출력',
    field24: '1_서명완료',
    field12: '1_신부산GA지점/00팀',
    field13: '1_인카금융-다이렉트',
    field14: '1_박한화(123123)',
    field15: '1_박한화14',
    field16: '1_박한화15',
    field17: '1_박한화(123123)',
    field18: '1_동시가입설계',
    field19: '1_LA20143129023123912',
    nickname: '최고설계메니져뚜루루',

    field25: '2026-03-01',
    field26: '1_김한화',
    field27: '1_(야탑동)',
    link: 'a1',
  },
  {
    id: 2,
    isCheck: true,
    isState: false,
    field01: '2_LA123456789012',
    field02: '2_한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '2_고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '2_김한화김한',
    field06: '2009-01-02',
    field20: '2_김한화김한김한화김한',
    field21: '2009-01-02',
    field07: 2000000,
    field08: 2.2,
    field22: '2009-01-02',
    field23: '2009-01-02',
    field09: '2_설계중',
    field10: '2_설계중',
    field11: '2_미출력',
    field24: '2_휴대폰 서명',
    field12: '2_신부산GA지점/00팀',
    field13: '2_인카금융-다이렉트',
    field14: '2_박한화(123123)',
    field15: '2_박한화14',
    field16: '2_박한화15',
    field17: '2_박한화(123123)',
    field18: '2_가입설계',
    field19: '2_LA20143129023123912',
    nickname: '최고설최고설최고설최고설최고설최고설최고설',

    field25: '2026-03-02',
    field26: '2_김한화',
    field27: '2_(야탑동)',
    link: 'a1',
  },
  {
    id: 3,
    isCheck: true,
    isState: false,
    field01: '3_LA123456789012',
    field02: '3_한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '3_고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '3_김한화김한',
    field06: '2009-01-03',
    field20: '3_김한화김한김한화김한',
    field21: '2009-01-03',
    field07: 3000000,
    field08: 3.3,
    field22: '2009-01-03',
    field23: '2009-01-03',
    field09: '3_설계중',
    field10: '3_설계중',
    field11: '3_미출력',
    field24: '3_서명대기',
    field12: '3_신부산GA지점/00팀',
    field13: '3_인카금융-다이렉트',
    field14: '3_박한화(123123)',
    field15: '3_박한화14',
    field16: '3_박한화15',
    field17: '3_박한화(123123)',
    field18: '3_가입설계',
    field19: '3_LA20143129023123912',
    nickname: '',

    field25: '2026-03-03',
    field26: '3_김한화',
    field27: '3_이정연(구로점)',
    link: 'a1',
  },
  {
    id: 4,
    isCheck: true,
    isState: false,
    field01: '4_LA123456789012',
    field02: '4_한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '4_고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: false,
    field05: '4_김한화김한',
    field06: '2009-01-04',
    field20: '4_김한화김한김한화김한',
    field21: '2009-01-04',
    field07: 4000000,
    field08: 4.4,
    field22: '2009-01-04',
    field23: '2009-01-04',
    field09: '4_설계중',
    field10: '4_설계중',
    field11: '4_미출력',
    field24: '4_서명완료',
    field12: '4_신부산GA지점/00팀',
    field13: '4_인카금융-다이렉트',
    field14: '4_박한화(123123)',
    field15: '4_박한화14',
    field16: '4_박한화15',
    field17: '4_박한화(123123)',
    field18: '4_동시가입설계',
    field19: '4_LA20143129023123912',
    nickname: '',

    field25: '2026-03-04',
    field26: '4_김한화',
    field27: '4_(야탑동)',
    link: 'a2',
  },
  {
    id: 5,
    isCheck: true,
    isState: false,
    field01: '5_LA123456789012',
    field02: '5_한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '5_고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '5_김한화김한',
    field06: '2009-01-05',
    field20: '5_김한화김한김한화김한',
    field21: '2009-01-05',
    field07: 5000000,
    field08: 5.5,
    field22: '2009-01-05',
    field23: '2009-01-05',
    field09: '5_설계중',
    field10: '5_심사대기',
    field11: '5_미출력',
    field24: '5_서명완료',
    field12: '5_신부산GA지점/00팀',
    field13: '5_인카금융-다이렉트',
    field14: '5_박한화(123123)',
    field15: '5_박한화14',
    field16: '5_박한화15',
    field17: '5_박한화(123123)',
    field18: '5_동시가입설계',
    field19: '5_LA20143129023123912',
    nickname: '',
    field25: '2026-03-05',
    field26: '5_김한화',
    field27: '5_(야탑동)',
    link: 'a2',
  },
  {
    id: 6,
    isCheck: true,
    isState: false,
    field01: '6_LA123456789012',
    field02: '6_한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '6_고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '6_김한화김한',
    field06: '2009-01-06',
    field20: '6_김한화김한김한화김한',
    field21: '2009-01-06',
    field07: 6000000,
    field08: 6.6,
    field22: '2009-01-06',
    field23: '2009-01-06',
    field09: '6_설계중',
    field10: '6_설계중',
    field11: '6_미출력',
    field24: '6_서명대기',
    field12: '6_신부산GA지점/00팀',
    field13: '6_인카금융-다이렉트',
    field14: '6_박한화(123123)',
    field15: '6_박한화14',
    field16: '6_박한화15',
    field17: '6_박한화(123123)',
    field18: '6_동시가입설계',
    field19: '6_LA20143129023123912',
    nickname: '',
    field25: '2026-03-06',
    field26: '6_김한화',
    field27: '6_(야탑동)',
  },
  {
    id: 7,
    isCheck: true,
    isState: false,
    field01: '7_LA123456789012',
    field02: '7_한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '7_고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '7_김한화김한',
    field06: '2009-01-07',
    field20: '7_김한화김한김한화김한',
    field21: '2009-01-07',
    field07: 7000000,
    field08: 7.7,
    field22: '2009-01-07',
    field23: '2009-01-07',
    field09: '7_설계중',
    field10: '7_설계중',
    field11: '7_미출력',
    field24: '7_서명완료',
    field12: '7_신부산GA지점/00팀',
    field13: '7_인카금융-다이렉트',
    field14: '7_박한화(123123)',
    field15: '7_박한화14',
    field16: '7_박한화15',
    field17: '7_박한화(123123)',
    field18: '7_동시가입설계',
    field19: '7_LA20143129023123912',
    nickname: '',
    field25: '2026-03-07',
    field26: '7_김한화',
    field27: '7_(야탑동)',
  },
  {
    id: 8,
    isCheck: true,
    isState: false,
    field01: '8_LA123456789012',
    field02: '8_한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '8_고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '8_김한화김한',
    field06: '2009-01-08',
    field20: '8_김한화김한김한화김한',
    field21: '2009-01-08',
    field07: 8000000,
    field08: 8.8,
    field22: '2009-01-08',
    field23: '2009-01-08',
    field09: '8_설계중',
    field10: '8_설계중',
    field11: '8_미출력',
    field24: '8_서명완료',
    field12: '8_신부산GA지점/00팀',
    field13: '8_인카금융-다이렉트',
    field14: '8_박한화(123123)',
    field15: '8_박한화14',
    field16: '8_박한화15',
    field17: '8_박한화(123123)',
    field18: '8_동시가입설계',
    field19: '8_LA20143129023123912',
    nickname: '',
    field25: '2026-03-08',
    field26: '8_김한화',
    field27: '8_(야탑동)',
  },
  {
    id: 9,
    isCheck: true,
    isState: false,
    field01: '9_LA123456789012',
    field02: '9_한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '9_고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '9_김한화김한',
    field06: '2009-01-09',
    field20: '9_김한화김한김한화김한',
    field21: '2009-01-09',
    field07: 9000000,
    field08: 9.9,
    field22: '2009-01-09',
    field23: '2009-01-09',
    field09: '9_설계중',
    field10: '9_설계중',
    field11: '9_미출력',
    field24: '9_서명완료',
    field12: '9_신부산GA지점/00팀',
    field13: '9_인카금융-다이렉트',
    field14: '9_박한화(123123)',
    field15: '9_박한화14',
    field16: '9_박한화15',
    field17: '9_박한화(123123)',
    field18: '9_동시가입설계',
    field19: '9_LA20143129023123912',
    nickname: '',
    field25: '2026-03-09',
    field26: '9_김한화',
    field27: '9_(야탑동)',
  },
  ...Array.from({ length: 16 }, (_, i) => {
    const num = 10 + i;
    return {
      id: num,
      isCheck: true,
      isState: false,
      field01: `${num}_LA123456789012`,
      field02: `${num}_한화실손의료보험(갱신형)2601`,
      field03: `${num}_고지유형/플랜명/차량번호 값`,
      memo: true,
      field05: `${num}_김한화김한`,
      field06: `2009-01-${num.toString().padStart(2, '0')}`,
      field20: `${num}_김한화김한`,
      field21: `2009-01-${num.toString().padStart(2, '0')}`,
      field07: num * 100000,
      field08: num * 0.1,
      field22: `2009-01-${num.toString().padStart(2, '0')}`,
      field23: `2009-01-${num.toString().padStart(2, '0')}`,
      field09: `${num}_설계중`,
      field10: `${num}_설계중`,
      field11: `${num}_미출력`,
      field24: `${num}_서명완료`,
      field12: `${num}_신부산GA지점`,
      field13: `${num}_인카금융`,
      field14: `${num}_박한화`,
      field15: `${num}_박한화`,
      field16: `${num}_박한화`,
      field17: `${num}_박한화`,
      field18: `${num}_가입설계`,
      field19: `${num}_LA20143129023123912`,
      nickname: '',
      field25: `2026-03-${num.toString().padStart(2, '0')}`,
      field26: `${num}_김한화`,
      field27: `${num}_(야탑동)`,
    };
  }),
];

// Ltpa010Section: 통합가입설계조회 화면 섹션 컴포넌트

/**
 * Ltpa010Section: 통합가입설계조회 화면 섹션 컴포넌트
 */
export default function Ltpa010Section() {
  // 화면 배율에 따른 동적 컬럼 너비 계산 훅
  const { attributeColumnWidth } = useDynamicColumnWidths();
  // 증권번호 Popover에서 노출할 계약 액션 메뉴(행 공통)
  const contractActionMenu = [
    '계약상세조회',
    '계약변경설계',
    '수금방법변경',
    '계좌카드변경',
    '계속보험료입력',
    '제지급신청',
    '신계약출력물',
  ] as const;

  // 조회조건 폼 상태 (상단 필터의 Select 값 일괄 관리)
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type07: '',
    type08: '',
    type09: '',
  });

  // 정렬 적용 여부 상태
  const [isSorted, setIsSorted] = React.useState(false);

  // AG Grid 정렬 변경 핸들러
  const handleSortChanged = React.useCallback((params: SortChangedEvent<DummyDataRow>) => {
    const hasSort = params.api.getColumnState().some((col) => col.sort != null);
    setIsSorted(hasSort);
    params.api.refreshCells({ force: true });
  }, []);

  // 동일한 link 값 연결 아이콘 렌더링 헬퍼
  const renderLinkChain = (params: ICellRendererParams<DummyDataRow>) => {
    // 정렬(Sort) 상태가 적용되어 순서가 바뀐 경우 연결 아이콘 미표시
    const hasSort = isSorted || params.api.getColumnState().some((col) => col.sort != null);
    if (hasSort) return null;

    const link = params.data?.link;
    if (!link) return null;

    const rowIndex = params.node?.rowIndex;
    if (rowIndex == null) return null;

    const prevLink = params.api.getDisplayedRowAtIndex(rowIndex - 1)?.data?.link;
    const nextLink = params.api.getDisplayedRowAtIndex(rowIndex + 1)?.data?.link;

    const hasPrev = prevLink === link;
    const hasNext = nextLink === link;

    // 연속된 동일한 link가 없을 경우 미표시
    if (!hasPrev && !hasNext) return null;

    return (
      <>
        {/* 상단 연결 고리 아이콘 (이전 행`과 같은 link일 경우: 중간 또는 마지막 행) */}
        {hasPrev && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden w-[3.2rem] h-[1.6rem] ">
            <LinkIcon size={32} className="absolute bottom-0" />
          </div>
        )}
        {/* 하단 연결 고리 아이콘 (다음 행과 같은 link일 경우: 첫번째 또는 중간 행) */}
        {hasNext && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden w-[3.2rem] h-[1.6rem]">
            <LinkIcon size={32} className="absolute top-0" />
          </div>
        )}
      </>
    );
  };

  // Ag-Grid 컬럼 정의
  const columnDefs: (ColDef<DummyDataRow> | ColGroupDef<DummyDataRow>)[] = [
    // 1. 설계번호: 클릭 시 상세 조회 기능을 위한 링크 버튼 형태로 렌더링
    {
      headerName: '설계번호',
      flex: 1,
      minWidth: attributeColumnWidth(96),
      cellClass: 'text-center !relative link-cell',
      field: 'field01',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataRow>) => (
        <>
          {renderLinkChain(params)}
          <div className="relative w-full h-full flex items-center justify-center min-h-[3rem]">
            <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
              {params.data?.field01}
            </Button>
          </div>
        </>
      ),
    },
    // 2. 상품명/구분 & 고지유형/플랜명: 2행 구조 헤더 (상단: field02 정렬, 하단: field03 정렬)
    {
      colId: 'field02',
      field: 'field02',
      headerComponent: createDualRowHeader('상품명/구분', 'field02', '고지유형/플랜명', 'field03'),
      comparator: dualRowSortComparator,
      width: attributeColumnWidth(400),
      cellClass: '!px-0',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>(
        'field02',
        (data?: DummyDataRow) => {
          // 메모가 있는 경우 펜 아이콘 버튼 표시 및 닉네임 툴팁 연동
          const hasTooltip = data?.memo;
          const hasMemoButton = !data?.memo || hasTooltip;

          if (!hasMemoButton) {
            return null;
          }

          const memoButton = (
            <Button
              color={hasTooltip ? 'primary' : 'gray-light'}
              onClick={() => {
                alert('메모장');
              }}
              only={data?.nickname && hasTooltip ? 'default' : 'icon'}
              size={'sm'}
              variant={'outlined'}
            >
              {hasTooltip ? (
                data?.nickname ? (
                  <span>{data.nickname.slice(0, 5)}</span>
                ) : (
                  <PenIcon size={14} color={'var(--color-primary-50)'} />
                )
              ) : (
                <PenIcon size={14} color={'var(--color-gray-30)'} />
              )}
            </Button>
          );

          return (
            <Grow placement="bwc" className="h-full min-h-[3rem]">
              <div className="truncate-no">{data?.field03}</div>
              {data?.nickname ? (
                <Tooltip>
                  <TooltipTrigger asChild>{memoButton}</TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8} hideArrow={false}>
                    <Typo tag="span" variant="body-sm" className="break-all whitespace-pre-wrap">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: data?.nickname,
                        }}
                      />
                    </Typo>
                  </TooltipContent>
                </Tooltip>
              ) : (
                memoButton
              )}
            </Grow>
          );
        },
        'col'
      ),
    },
    // 3. 계약자 & 생년월일: 두 필드를 하나의 컬럼에 상하로 배치
    {
      colId: 'field05',
      field: 'field05',
      headerComponent: createDualRowHeader('계약자', 'field05', '생년월일', 'field06'),
      comparator: dualRowSortComparator,
      autoHeight: true,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellRenderer: createFieldRenderer<DummyDataRow>('field05', 'field06'),
    },
    // 4. 피보험자 & 생년월일
    {
      colId: 'field20',
      field: 'field20',
      headerComponent: createDualRowHeader('피보험자', 'field20', '생년월일', 'field21'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      headerClass: '!px-0',
      autoHeight: true,
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellRenderer: createFieldRenderer<DummyDataRow>('field20', 'field21'),
    },
    // 5. 보험료 & 환급률
    {
      colId: 'field07',
      field: 'field07',
      headerComponent: createDualRowHeader('보험료(원)', 'field07', '환급률', 'field08'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      autoHeight: true,
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellRenderer: (params: { data?: DummyDataRow }) => (
        <Grid className="w-full grid-rows-[1fr_1fr] divide-y divide-gray-200" gap={0}>
          <Grow placement="cc" className="min-h-[3rem] justify-end pr-1">
            {params.data ? params.data.field07.toLocaleString() : ''}
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            {params.data?.field08}%
          </Grow>
        </Grid>
      ),
    },
    // 6. 설계일자 & 유효기한
    {
      colId: 'field22',
      field: 'field22',
      headerComponent: createDualRowHeader('설계일자', 'field22', '유효기한', 'field23'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      autoHeight: true,
      cellRenderer: (params: { data?: DummyDataRow }) => (
        <Grid className="w-full grid-rows-[1fr_1fr] divide-y divide-gray-200" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            {params.data?.field22 && (
              <Button color="link" only="default" size="lg" variant="text">
                {params.data?.field22}
              </Button>
            )}
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            {params.data?.field23 && (
              //유효기간 7이내 className="text-[var(--color-danger-50)]""
              <Button color="link" className="!text-[var(--color-danger-50)]" only="default" size="lg" variant="text">
                {params.data?.field23}
              </Button>
            )}
          </Grow>
        </Grid>
      ),
    },
    // 7. 설계상태 & 심사결과
    {
      colId: 'field09',
      field: 'field09',
      headerComponent: createDualRowHeader('설계상태', 'field09', '심사결과', 'field10'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>(
        (data?: DummyDataRow) =>
          data?.field09 === '설계중' ? (
            //심사자 있는 경우
            <Button color="link" only="default" size="lg" variant="text">
              {data.field09}
            </Button>
          ) : (
            // 심사자 아닌 경우
            data?.field09
          ),
        (data?: DummyDataRow) =>
          // [260725] 심사대기 툴팁 추가
          data?.field10 === '심사대기' ? (
            <AsyncTooltipButton
              label={data.field10}
              delay={1000}
              fetchContent={() => (
                <>
                  심사자: 김현화(123457)
                  <br />- 예상대기시간 30분, 대기건수 5/8 (현재/전체)
                </>
              )}
            />
          ) : data?.field10 === '심사결과' ? (
            <Button color="link" only="default" size="lg" variant="text">
              {data.field10}
            </Button>
          ) : (
            data?.field10
          )
      ),
    },
    // 8. 청약서출력 & 스캔여부
    {
      colId: 'field11',
      field: 'field11',
      headerComponent: createDualRowHeader('청약서출력', 'field11', '스캔여부', 'field24'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      autoHeight: true,
      cellRenderer: (params: { data?: DummyDataRow }) => (
        <Grid className="w-full grid-rows-[1fr_1fr] divide-y divide-gray-200" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            {params.data?.field11 && (
              <Button color="link" only="default" size="lg" variant="text">
                {params.data?.field11}
              </Button>
            )}
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            {params.data?.field24 && (
              <Button color="link" only="default" size="lg" variant="text">
                {params.data?.field24}
              </Button>
            )}
          </Grow>
        </Grid>
      ),
    },
    // 9. 취급기관/팀 & 취급자
    {
      colId: 'field12',
      field: 'field12',
      headerComponent: createDualRowHeader('취급기관/팀', 'field12', '취급자', 'field13'),
      comparator: dualRowSortComparator,
      cellClass: '!px-0',
      flex: 1,
      minWidth: attributeColumnWidth(120),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field12', 'field13'),
    },
    // 9-1. 취급기관/팀 & BM (방카일 경우 BM으로 변경)
    {
      colId: 'field12_bm',
      field: 'field12',
      headerComponent: createDualRowHeader('취급기관/팀', 'field12', 'BM', 'field26'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(120),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field12', 'field26'),
    },
    // 9-2. 취급자 & 유자격자 (방카일 경우 유자격)
    {
      colId: 'field13',
      field: 'field13',
      headerComponent: createDualRowHeader('취급자', 'field13', '유자격자', 'field27'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field13', 'field27'),
    },
    // 10. 최초설계자 & SM
    {
      colId: 'field14',
      field: 'field14',
      headerComponent: createDualRowHeader('최초설계자', 'field14', 'SM', 'field15'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field14', (data?: DummyDataRow) => (
        <Grid className="grid-cols-[1fr_auto] px-1" gap={0.5}>
          <OverflowTooltipText text={data?.field15}>{data?.field15}</OverflowTooltipText>

          <Grow placement="cc" className="min-h-[3rem] gap-[0.2rem]">
            <Button
              color="gray-light"
              onClick={() => {}}
              only="default"
              size="sm"
              variant="outlined"
              className="w-[2.2rem] h-[2.2rem] min-w-[2.2rem] p-0"
            >
              <Typo color="primary" tag="span" variant="body-xs" weight="bold">
                I
              </Typo>
            </Button>
            <Button
              color="gray-light"
              onClick={() => {}}
              only="default"
              size="sm"
              variant="outlined"
              className="w-[2.2rem] h-[2.2rem] min-w-[2.2rem] p-0"
            >
              <Typo color="primary" tag="span" variant="body-xs" weight="bold">
                D
              </Typo>
            </Button>
          </Grow>
        </Grid>
      )),
    },
    // 10-1. 최초설계일 & 최초설계자 (전속FP 일 경우)
    {
      colId: 'field25',
      field: 'field25',
      headerComponent: createDualRowHeader('최초설계일', 'field25', '최초설계자', 'field14'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field25', 'field14'),
    },
    // 11. 사용인 & 부실유의
    {
      colId: 'field16',
      field: 'field16',
      headerComponent: createDualRowHeader('사용인', 'field16', '부실유의', 'field17'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field16', 'field17'),
    },
    // 12. 설계종류 & 증권번호
    {
      colId: 'field18',
      field: 'field18',
      headerComponent: createDualRowHeader('설계종류', 'field18', '증권번호', 'field19'),
      comparator: dualRowSortComparator,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(130),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>(
        (data?: DummyDataRow) =>
          data?.field18 && (
            <span className={data.field18 === '동시가입설계' ? 'text-[var(--color-primary-50)]!' : undefined}>
              {data.field18}
            </span>
          ),
        (data?: DummyDataRow) =>
          data?.field19 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button color="link" only="default" size="lg" variant="text" className="w-full">
                  {data?.field19}
                </Button>
              </PopoverTrigger>
              <PopoverContent side="left" align="end" closeButton={true} className="w-auto p-[0.2rem] flex flex-col">
                <Gcol
                  className="overflow-auto z-0 max-h-[20rem] [&>button]:h-[2.8rem] [&>button]:w-full gap-0"
                  placement="ss"
                >
                  {contractActionMenu.map((menuName) => (
                    <Button
                      key={menuName}
                      variant={'none'}
                      className="hover:bg-[var(--color-warning-10)] justify-start px-3"
                    >
                      <span className="block">{menuName}</span>
                    </Button>
                  ))}
                </Gcol>
              </PopoverContent>
            </Popover>
          )
      ),
    },
  ];

  // =====================
  // 그리드 데이터/페이징 상태
  // =====================
  // 초기 렌더는 첫 페이지(5건)만 표시
  const [rowData, setRowData] = React.useState<DummyDataRow[]>(() => DummyData.slice(0, 5));
  // 현재 화면에 로드된 누적 건수
  const [loadedCount, setLoadedCount] = React.useState(5);
  // 전체 데이터 건수(서버 응답 total과 동일하게 유지)
  const [totalCount, setTotalCount] = React.useState(DummyData.length);
  // 중복 요청 방지용 로딩 플래그
  const [isLoading, setIsLoading] = React.useState(false);
  // createCellValueChangedHandler 시그니처 호환용(현 화면에서는 에러행 관리 미사용)
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);

  // 체크박스 선택 변경 핸들러
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataRow, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  // 무한 스크롤(더보기) 기능을 위한 설정
  const pageSize = 5;
  // TableMore와 연동하기 위한 그리드 ref
  const gridRef = React.useRef<AgGridReact<DummyDataRow>>(null);

  // 실데이터 호출 모사 (API 호출)
  const fetchMockData = React.useCallback(async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      // API 호출 대기 시간 모사 (300ms)
      await new Promise((resolve) => setTimeout(resolve, 300));

      const start = (page - 1) * limit;
      const end = start + limit;
      const items = DummyData.slice(start, end);
      return {
        items,
        totalCount: DummyData.length,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 초기 로딩 및 검색 실행
  const handleSearch = React.useCallback(async () => {
    // 검색은 항상 1페이지부터 재조회
    const res = await fetchMockData(1, pageSize);
    setRowData(res.items);
    setLoadedCount(res.items.length);
    setTotalCount(res.totalCount);
  }, [fetchMockData, pageSize]);

  // 다음 버튼 누를 때 데이터 추가 호출 (onLoadNext 콜백)
  const handleLoadNext = React.useCallback(async () => {
    // 마지막 페이지 도달 또는 로딩 중이면 중복 호출 차단
    if (loadedCount >= totalCount || isLoading) return;

    // 현재 로드 건수 기준으로 다음 페이지 번호 계산
    const nextPage = Math.ceil(loadedCount / pageSize) + 1;
    const res = await fetchMockData(nextPage, pageSize);

    // 기존 목록 하단에 다음 페이지 데이터 이어붙이기
    setRowData((prev) => [...prev, ...res.items]);
    setLoadedCount((prev) => prev + res.items.length);
  }, [loadedCount, totalCount, pageSize, fetchMockData, isLoading]);

  // 전체조회 버튼 누를 때 데이터 호출 (onLoadAll 콜백)
  const handleLoadAll = React.useCallback(async () => {
    // 이미 전체 로드됐거나 로딩 중이면 무시
    if (loadedCount >= totalCount || isLoading) return;

    // 1페이지부터 totalCount만큼 한 번에 조회
    const res = await fetchMockData(1, totalCount);
    setRowData(res.items);
    setLoadedCount(res.items.length);
  }, [loadedCount, totalCount, fetchMockData, isLoading]);

  // 접기 버튼 (onLoadReset 콜백)
  const handleLoadReset = React.useCallback(() => {
    // 현재 목록을 첫 페이지 크기만큼만 유지
    setRowData((prev) => prev.slice(0, pageSize));
    setLoadedCount(pageSize);
  }, [pageSize]);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '통합가입설계조회',
            pageId: 'LTPA010',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full" gap={3}>
            {/* 상단: 조회 조건 필터 영역 */}
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
                lineTop={false}
                caption="설계번호"
                cols={['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'조회구분'}>
                    <NativeSelect
                      aria-label="조회구분 선택"
                      width={120}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                      required
                    >
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '피보험자 번호' },
                        { value: 'selection3', label: '계약자 번호' },
                        { value: 'selection4', label: '설계번호' },
                        { value: 'selection5', label: '증권번호' },
                        { value: 'selection6', label: '상품명' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    {form.type01 === 'selection' || form.type01 === 'selection2' || form.type01 === 'selection3' ? (
                      <Grow placement="ss">
                        <Input aria-label="이름" value={'김현화현화'} width={84} required />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </Grow>
                    ) : (
                      <Input aria-label="번호" width={130} value={'LA123456789012'} readOnly />
                    )}
                  </FormCell>
                  <FormCell title={'설계상태'}>
                    <NativeSelect
                      aria-label="설계상태 선택"
                      width={120}
                      value={form.type04}
                      onChange={(e) => setFormField('type04', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '전체' },
                        { value: 'selection1', label: '설계중' },
                        { value: 'selection2', label: '간편설계' },
                        { value: 'selection3', label: '설계심사중' },
                        { value: 'selection4', label: '설계완료' },
                        { value: 'selection5', label: '심사의뢰' },
                        { value: 'selection6', label: '심사중' },
                        { value: 'selection7', label: '심사완료' },
                        { value: 'selection8', label: '청약중' },
                        { value: 'selection9', label: '청약완료' },
                        { value: 'selection10', label: '수납완료' },
                        { value: 'selection11', label: '구독심사중' },
                        { value: 'selection12', label: '구독심사완료' },
                        { value: 'selection13', label: '청약삭제' },
                        { value: 'selection14', label: '보험료산출' },
                        { value: 'selection15', label: '설계취소' },
                        { value: 'selection16', label: '지로' },
                        { value: 'selection17', label: '반려' },
                        { value: 'selection18', label: '취소' },
                        { value: 'selection19', label: '가설계' },
                        { value: 'selection20', label: '1차보험료산출' },
                        { value: 'selection21', label: '업셀링설계' },
                        { value: 'selection22', label: '검증' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'설계경로'}>
                    <NativeSelect
                      aria-label="설계경로 선택"
                      width={150}
                      value={form.type05}
                      onChange={(e) => setFormField('type05', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '전체' },
                        { value: 'selection2', label: '문서서명' },
                        { value: 'selection3', label: '전자서명(태블릿)' },
                        { value: 'selection4', label: '전자서명(휴대폰)' },
                        { value: 'selection5', label: '전자청약' },
                        { value: 'selection6', label: 'TM' },
                        { value: 'selection7', label: 'CM' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'설계조직'}>
                    <NativeSelect
                      aria-label="설계조직 선택"
                      value={form.type07}
                      width={90}
                      required
                      onChange={(e) => setFormField('type07', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '취급기관' },
                        { value: 'selection2', label: '취급직원' },
                        { value: 'selection3', label: '사용인' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input aria-label="" width={70} value={'1301097'} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={120} value={'신부산GA지점'} readOnly />
                  </FormCell>
                  <FormCell title={'영업가족'}>
                    <NativeSelect
                      aria-label="영업가족 선택"
                      value={form.type08}
                      width={120}
                      onChange={(e) => setFormField('type08', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '전체' },
                        { value: 'selection2', label: '교차' },
                        { value: 'selection3', label: 'BP' },
                        { value: 'selection4', label: '교차+BP' },
                        { value: 'selection5', label: '그 외' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'설계일자'}>
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      // autoRangeDays={7}
                      // autoRangeFix={false}
                      min={'2026-06-28'}
                      max={'2026-07-05'}
                      mode="range"
                      size="lg"
                    />
                    <NativeSelect
                      aria-label="설계일자"
                      value={form.type09}
                      width={80}
                      onChange={(e) => setFormField('type09', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '7일' },
                        { value: 'selection3', label: '1개월' },
                        { value: 'selection4', label: '2개월' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Button color="coolgray" onClick={handleSearch} only="default" size="lg" variant="contained">
                  조회
                </Button>
                <Button
                  color={'gray'}
                  only={'icon'}
                  size={'lg'}
                  variant={'outlined'}
                  onClick={handleSearch}
                  aria-label="새로고침"
                >
                  <ResetIcon />
                </Button>
              </Grow>
            </Grow>

            <Grid className="w-full grid-rows-[minmax(0,1fr)_auto] h-full overflow-hidden" gap={2}>
              <Grid className="w-full grid-rows-[auto_1fr]" gap={1}>
                <Grow className="w-full" placement="ec">
                  <Button color="success" variant="outlined">
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                </Grow>

                {/* 그리드 영역: 데이터 개수에 따라 높이가 조절되며 내부 스크롤을 지원합니다. */}
                <Gcol gap={1} className="overflow-hidden">
                  <div className="ag-theme-alpine ltpa010-grid">
                    <AgGridReact<DummyDataRow>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowClassRules={{
                        // 판매중지 상품인 경우 배경색을 다르게 표시
                        'ag-row-state-true': (params) => params.data?.isState === true,
                      }}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      // 에디터 시
                      singleClickEdit={true}
                      onCellValueChanged={onCellValueChanged}
                      // 체크박스 시
                      rowSelection={{
                        mode: 'multiRow',
                        checkboxes: true,
                        headerCheckbox: false,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        cellClass: 'editable-cell p-0!',
                        width: 30,
                      }}
                      onGridReady={(params) => {
                        // 초기 데이터의 isCheck 값을 실제 선택 상태로 동기화
                        // (rowSelection 렌더링과 데이터 표시 상태 불일치 방지)
                        params.api.forEachNode((node) => {
                          if (node.data?.isCheck) {
                            node.setSelected(true);
                          }
                        });
                      }}
                      onSortChanged={handleSortChanged}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      ref={gridRef}
                      animateRows={false}
                      headerHeight={60}
                    />
                  </div>
                  {/* 그리드 하단: 데이터 더보기(페이징) 컨트롤 */}
                  <TableMore
                    gridRef={gridRef}
                    loadedCount={loadedCount}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onLoadAll={handleLoadAll}
                    onLoadNext={handleLoadNext}
                    onLoadReset={handleLoadReset}
                    isReset={true}
                  />
                </Gcol>
              </Grid>
              {/* 조회 가능 기간에 대한 하단 안내 문구 */}
              <Gcol variant="box-info" placement="ss">
                <Typo variant="body-sm" color="primary" icon="info">
                  <b>설계조회 가능기간</b> 취급기간(7일), 법인대리점(30일), FC/사용인/개인대리점 등(60일)
                </Typo>
              </Gcol>
            </Grid>
          </Grid>
        }
        /* 하단 푸터 영역: 각종 설계 관리 및 저장/삭제 버튼 */
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1} className="flex-wrap" placement="sc">
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  삭제설계 확인
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  출력물
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  원수수납
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  설계비교
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  알림톡발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  셀프고지
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  증권발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  계약자발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  이미지조회
                </Button>
              </Grow>
              <Grow gap={1}>
                {/*2026-05-22 버튼 스타일 변경 */}
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  설계예외처리
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  저장
                </Button>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  설계삭제
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
