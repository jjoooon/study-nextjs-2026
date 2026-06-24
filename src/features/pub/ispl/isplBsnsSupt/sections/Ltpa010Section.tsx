/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Grow, Gcol, Typo, Grid } from '@atoms';
import { SearchIcon, ResetIcon, FileExportIcon, PenIcon } from '@icons';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  createFieldRenderer,
  OverflowTooltipText,
  useDynamicColumnWidths,
} from '@aggrid';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { useFormFields } from '@hooks/useFormFields';

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
};
const DummyData: DummyDataRow[] = [
  {
    id: 1,
    isCheck: true,
    isState: true,
    field01: 'LA123456789012',
    field02: '한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '심사결과',
    field11: '미출력',
    field24: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '최고설계메니져뚜루루',

    field25: '2026-03-11',
    field26: '김한화',
    field27: '(야탑동)',
  },
  {
    id: 2,
    isCheck: true,
    isState: false,
    field01: 'LA123456789012',
    field02: '한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '설계중',
    field11: '미출력',
    field24: '휴대폰 서명',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '최고설최고설최고설최고설최고설최고설최고설',

    field25: '2026-03-11', // 전속FP(최초설계일)
    field26: '김한화', // 방카(BM)
    field27: '(야탑동)', // 방카(유자격자)
  },
  {
    id: 3,
    isCheck: true,
    isState: false,
    field01: 'LA123456789012',
    field02: '한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '설계중',
    field11: '미출력',
    field24: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',

    field25: '2026-03-11',
    field26: '김한화',
    field27: '이정연(구로점)',
  },
  {
    id: 4,
    isCheck: true,
    isState: false,
    field01: 'LA123456789012',
    field02: '한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '설계중',
    field11: '미출력',
    field24: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',

    field25: '2026-03-11',
    field26: '김한화',
    field27: '(야탑동)',
  },
  {
    id: 5,
    isCheck: true,
    isState: false,
    field01: 'LA123456789012',
    field02: '55555 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '설계중',
    field11: '미출력',
    field24: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',
    field25: '2026-03-11',
    field26: '김한화',
    field27: '(야탑동)',
  },
  {
    id: 6,
    isCheck: true,
    isState: false,
    field01: 'LA123456789012',
    field02: '한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '설계중',
    field11: '미출력',
    field24: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',
    field25: '2026-03-11',
    field26: '김한화',
    field27: '(야탑동)',
  },
  {
    id: 7,
    isCheck: true,
    isState: false,
    field01: 'LA123456789012',
    field02: '한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '설계중',
    field11: '미출력',
    field24: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',
    field25: '2026-03-11',
    field26: '김한화',
    field27: '(야탑동)',
  },
  {
    id: 8,
    isCheck: true,
    isState: false,
    field01: 'LA123456789012',
    field02: '한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '설계중',
    field11: '미출력',
    field24: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',
    field25: '2026-03-11',
    field26: '김한화',
    field27: '(야탑동)',
  },
  {
    id: 9,
    isCheck: true,
    isState: false,
    field01: 'LA123456789012',
    field02: '한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '설계중',
    field11: '미출력',
    field24: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',
    field25: '2026-03-11',
    field26: '김한화',
    field27: '(야탑동)',
  },
  ...Array.from({ length: 16 }, (_, i) => ({
    id: 10 + i,
    isCheck: true,
    isState: false,
    field01: 'LA123456789012',
    field02: `한화실손의료보험(갱신형)2601 ${10 + i}`,
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한',
    field06: '2009-01-01',
    field20: '김한화김한김한화김한',
    field21: '2009-01-01',
    field07: 9999999,
    field08: 2.1,
    field22: '2009-01-01',
    field23: '2009-01-01',
    field09: '설계중',
    field10: '설계중',
    field11: '미출력',
    field24: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',
    field25: '2026-03-11',
    field26: '김한화',
    field27: '(야탑동)',
  })),
];

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

  // Ag-Grid 컬럼 정의
  const columnDefs: (ColDef<DummyDataRow> | ColGroupDef<DummyDataRow>)[] = [
    // 1. 설계번호: 클릭 시 상세 조회 기능을 위한 링크 버튼 형태로 렌더링
    {
      headerName: '설계번호',
      flex: 1,
      minWidth: attributeColumnWidth(96),
      cellClass: 'text-center',
      field: 'field01',
      autoHeight: true,
      cellRenderer: (params: { data?: DummyDataRow }) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.data?.field01}
        </Button>
      ),
    },
    // 2. 상품명/구분 & 고지유형/플랜명: 2행 구조의 헤더와 커스텀 필드 렌더러를 사용하여 복합 정보 표시
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            상품명/구분
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            고지유형/플랜명
          </Grow>
        </Grid>
      ),
      width: attributeColumnWidth(400),
      cellClass: '!px-0',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field02', (data?: DummyDataRow) => {
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
          <Grow placement="bwc" className="h-full ">
            <div className="truncate-no">{data?.field03}</div>

            {data?.nickname ? (
              <Tooltip>
                <TooltipTrigger asChild>{memoButton}</TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
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
      }),
    },
    // 3. 계약자 & 생년월일: 두 필드를 하나의 컬럼에 상하로 배치
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            계약자
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            생년월일
          </Grow>
        </Grid>
      ),
      autoHeight: true,
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellRenderer: createFieldRenderer<DummyDataRow>('field05', 'field06'),
    },
    // 4. 피보험자 & 생년월일
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            피보험자
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            생년월일
          </Grow>
        </Grid>
      ),
      cellClass: 'text-center !px-0',
      headerClass: '!px-0',
      autoHeight: true,
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellRenderer: createFieldRenderer<DummyDataRow>('field20', 'field21'),
    },
    // 5. 보험료 & 환급률
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            보험료(원)
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            환급률
          </Grow>
        </Grid>
      ),
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
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            설계일자
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            유효기한
          </Grow>
        </Grid>
      ),
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
              <Button color="link" only="default" size="lg" variant="text">
                {params.data?.field23}
              </Button>
            )}
          </Grow>
        </Grid>
      ),
    },
    // 7. 설계상태 & 심사결과
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            설계상태
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            심사결과
          </Grow>
        </Grid>
      ),
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field09', (data?: DummyDataRow) =>
        data?.field10 === '심사결과' ? (
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
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            청약서출력
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            스캔여부
          </Grow>
        </Grid>
      ),
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
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            취급기관/팀
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            취급자
          </Grow>
        </Grid>
      ),
      cellClass: '!px-0',
      flex: 1,
      minWidth: attributeColumnWidth(120),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field12', 'field13'),
    },
    // 9-1. 취급기관/팀 & BM (방카일 경우 BM으로 변경)
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            취급기관/팀
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            BM
          </Grow>
        </Grid>
      ),
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(120),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field12', 'field26'),
    },
    // 9-2. 취급자 & 유자격자 (방카일 경우 유자격)
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            취급자
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            유자격자
          </Grow>
        </Grid>
      ),
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field13', 'field27'),
    },
    // 10. 최초설계자 & SM
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            최초설계자
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            SM
          </Grow>
        </Grid>
      ),
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field14', (data?: DummyDataRow) => (
        <Grid className="grid-cols-[1fr_auto] px-1" gap={0.5}>
          <OverflowTooltipText text={data?.field15}>{data?.field15}</OverflowTooltipText>

          <Grow placement="cc" className="min-h-[3rem]">
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
            <Button color="gray-light" onClick={() => {}} only="default" size="sm" variant="outlined">
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
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            최초설계일
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            최초설계자
          </Grow>
        </Grid>
      ),
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field25', 'field14'),
    },
    // 11. 사용인 & 부실유의
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            사용인
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            부실유의
          </Grow>
        </Grid>
      ),
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>('field16', 'field17'),
    },
    // 12. 설계종류 & 증권번호
    {
      headerComponent: () => (
        <Grid className="grid-rows-[1fr_1fr] divide-y divide-gray-300 w-full h-full" gap={0}>
          <Grow placement="cc" className="min-h-[3rem]">
            설계종류
          </Grow>
          <Grow placement="cc" className="min-h-[3rem]">
            증권번호
          </Grow>
        </Grid>
      ),
      cellClass: 'text-center !px-0',
      flex: 1,
      minWidth: attributeColumnWidth(130),
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataRow>(
        'field18',
        (data?: DummyDataRow) =>
          data?.field19 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button color="link" only="default" size="lg" variant="text" className="w-full">
                  <OverflowTooltipText text={data?.field19}>{data?.field19}</OverflowTooltipText>
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
          <Grid className="grid-rows-[auto_1fr] h-full" gap={3}>
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
                      <Input aria-label="번호" width={130} value={'LA2608902384509'} readOnly />
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
                      mode="range"
                      onChange={() => {}}
                      rangeValue={{
                        from: '2026-03-01',
                        to: '2026-03-07',
                      }}
                      size="lg"
                      width="sm"
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

            <Grid className="grid-rows-[1fr_auto] h-full" gap={2}>
              <Grid className="grid-rows-[auto_1fr]" gap={1}>
                <Grow className="w-full" placement="ec">
                  <Button color="success" variant="outlined">
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                </Grow>

                {/* 그리드 영역: 데이터 개수에 따라 높이가 조절되며 내부 스크롤을 지원합니다. */}
                <Gcol gap={1}>
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
              <Grow gap={1}>
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
