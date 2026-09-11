/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, useDynamicColumnWidths, createTooltipValueGetter } from '@aggrid';
import { Grid, Grow } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

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

const Ltpa040DummyData: Ltpa040DummyDataRow[] = [
  {
    id: 1,
    isCheck: true,
    field01: '2026-06-01 12:00',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동',
    field05: '기등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원 사망후유, 진단비, 입원/통원',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 건강보험4.0 한화 시그니처 여성 건강보험4.0 한화 시그니처 여성 건강보험4.0',
    field10: '12',
    field11: '83000000',
    field12: 'LA123456789012',
    field13: '설계중',
    field14: '14',
    field15: '120000000',
  },
  {
    id: 2,
    isCheck: false,
    field01: '2026-06-01 12:00',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동동(8090001)',
    field05: '기등록',
    field06: '홍길순순',
    field07: '간편, 입원수술, 추가질병, 한화',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 건강보험4.0',
    field10: '12',
    field11: '83,000원',
    field12: 'LA123456789012',
    field13: '청약중',
    field14: '14',
    field15: '120000',
  },
  {
    id: 3,
    isCheck: false,
    field01: '2026-06-01 12:00',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동(8090001)',
    field05: '미등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 간편건강보험4.0',
    field10: '12',
    field11: '83,000원',
    field12: 'LA123456789012',
    field13: '청약중',
    field14: '10',
    field15: '100000',
  },
  {
    id: 4,
    isCheck: false,
    field01: '2026-06-01 12:00',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동(8090001)',
    field05: '미등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원 ',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 간편건강보험4.0',
    field10: '12',
    field11: '83,000원',
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 5,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 6,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 7,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 8,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 9,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 10,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 11,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 12,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 13,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 14,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 15,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 16,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 17,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 18,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 19,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
  {
    id: 20,
    isCheck: false,
    field01: '2026-06-01 12:00',
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
    field12: 'LA123456789012',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
];

const Ltpa04001 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // =====================
  // 그리드 데이터/페이징 상태
  // =====================
  // 초기 렌더는 첫 페이지(5건)만 표시
  const [rowData, setRowData] = React.useState<Ltpa040DummyDataRow[]>(() => Ltpa040DummyData.slice(0, 5));
  // 현재 화면에 로드된 누적 건수
  const [loadedCount, setLoadedCount] = React.useState(5);
  // 전체 데이터 건수(서버 응답 total과 동일하게 유지)
  const [totalCount, setTotalCount] = React.useState(Ltpa040DummyData.length);
  // 중복 요청 방지용 로딩 플래그
  const [isLoading, setIsLoading] = React.useState(false);

  // 무한 스크롤(더보기) 기능을 위한 설정
  const pageSize = 5;
  // TableMore와 연동하기 위한 그리드 ref
  const gridRef = React.useRef<AgGridReact<Ltpa040DummyDataRow>>(null);

  // 실데이터 호출 모사 (API 호출)
  const fetchMockData = React.useCallback(async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      // API 호출 대기 시간 모사 (300ms)
      await new Promise((resolve) => setTimeout(resolve, 300));

      const start = (page - 1) * limit;
      const end = start + limit;
      const items = Ltpa040DummyData.slice(start, end);
      return {
        items,
        totalCount: Ltpa040DummyData.length,
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
  const columnDefs: (ColDef<Ltpa040DummyDataRow> | ColGroupDef<Ltpa040DummyDataRow>)[] = [
    {
      headerName: '추천설계정보',
      headerGroupComponent: () => (
        <Grow placement="cc" className="w-full">
          <span className="font-bold">추천설계정보</span>
        </Grow>
      ),
      children: [
        {
          headerName: '추천일시',
          field: 'field01',
          flex: 1,
          minWidth: attributeColumnWidth(110),
          cellClass: 'text-center',
          unSortIcon: true,
        },
        {
          headerName: '채널',
          field: 'field02',
          flex: 1,
          minWidth: attributeColumnWidth(50),
          cellClass: 'text-center',
          unSortIcon: true,
        },
        {
          headerName: '취급자',
          field: 'field03',
          flex: 1,
          minWidth: attributeColumnWidth(110),
          cellClass: 'text-center',
          unSortIcon: true,
        },
        {
          headerName: '사용인',
          field: 'field04',
          flex: 1,
          minWidth: attributeColumnWidth(115),
          cellClass: 'text-center',
          unSortIcon: true,
        },
        {
          headerName: '고객구분',
          field: 'field05',
          flex: 1,
          minWidth: attributeColumnWidth(60),
          cellClass: 'text-center',
        },
        {
          headerName: '고객명',
          field: 'field06',
          flex: 1,
          minWidth: attributeColumnWidth(70),
          cellClass: 'text-center',
        },
        {
          headerName: '입력조건',
          field: 'field07',
          flex: 20,
          minWidth: attributeColumnWidth(150),
          cellClass: 'text-left',
          tooltipValueGetter: createTooltipValueGetter<Ltpa040DummyDataRow>({ field: 'field07' }),
        },
        {
          headerName: '추천 설계번호',
          field: 'field08',
          flex: 1,
          minWidth: attributeColumnWidth(95),
          cellClass: 'text-center',
          unSortIcon: true,
        },
        {
          headerName: '추천상품',
          field: 'field09',
          flex: 1,
          minWidth: attributeColumnWidth(150),
          cellClass: 'text-left',
          tooltipValueGetter: createTooltipValueGetter<Ltpa040DummyDataRow>({ field: 'field09' }),
        },
        {
          headerName: '담보수',
          field: 'field10',
          flex: 1,
          minWidth: attributeColumnWidth(50),
          cellClass: 'text-center',
        },
        {
          headerName: '보장보험료',
          field: 'field11',
          flex: 1,
          minWidth: attributeColumnWidth(85),
          cellClass: 'text-right',
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
      headerClass: 'ag-header-color',
      cellClass: 'text-center',
      children: [
        {
          headerName: '설계번호',
          field: 'field12',
          flex: 1,
          minWidth: attributeColumnWidth(120),
          headerClass: 'ag-header-color',
          cellClass: 'text-center',
        },
        {
          headerName: '설계상태',
          field: 'field13',
          flex: 1,
          minWidth: attributeColumnWidth(70),
          headerClass: 'ag-header-color',
          cellClass: 'text-center',
        },
        {
          headerName: '설계담보수',
          field: 'field14',
          flex: 1,
          minWidth: attributeColumnWidth(70),
          headerClass: 'ag-header-color',
          cellClass: 'text-center',
        },
        {
          headerName: '보장보험료',
          field: 'field15',
          flex: 1,
          minWidth: attributeColumnWidth(85),
          headerClass: 'ag-header-color',
          cellClass: 'text-right',
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

  return (
    <Grid className="w-full grid-rows-[auto_1fr] gap-3 h-full">
      <Grow className="w-full" variant="box-round-b" placement={'bwe'}>
        <FormTable
          variant={'none'}
          lineTop={false}
          caption="추천설계명세 조회 테이블"
          cols={['w-[5.6rem]', 'w-[10rem]', 'w-[8rem]', 'w-[auto]']}
        >
          <FormRow>
            <FormCell title={'고객특성'}>
              <NativeSelect aria-label="연령구간 선택" width={120} value={''}>
                {[
                  { value: '연령구간 전체', label: '연령구간 전체' },
                  { value: '0~14세', label: '0~14세' },
                  { value: '15~24세', label: '15~24세' },
                  { value: '25~59세', label: '25~59세' },
                  { value: '60~65세', label: '60~65세' },
                  { value: '66세이상', label: '66세이상' },
                ].map((option, idx) => (
                  <NativeSelectOption key={'se' + idx} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <NativeSelect aria-label="성별 선택" width={100} value={''}>
                {[
                  { value: '전체', label: '전체' },
                  { value: '남', label: '남' },
                  { value: '여', label: '여' },
                ].map((option, idx) => (
                  <NativeSelectOption key={'se' + idx} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <NativeSelect aria-label="직업급수 선택" width={120} value={''}>
                {[
                  { value: '직업급수 전체', label: '직업급수 전체' },
                  { value: '1급', label: '1급' },
                  { value: '2급', label: '2급' },
                  { value: '3급', label: '3급' },
                ].map((option, idx) => (
                  <NativeSelectOption key={'se' + idx} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'모집자'}>
              <NativeSelect aria-label="모집자 선택" width={100} value={''}>
                {[
                  { value: '전체', label: '전체' },
                  { value: '취급직원', label: '취급직원' },
                  { value: '사용인', label: '사용인' },
                ].map((option, idx) => (
                  <NativeSelectOption key={'se' + idx} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="모집자 입력" width={120} value={''} />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input aria-label="" width={90} value={'김한화'} readOnly />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'상품코드'}>
              <Input aria-label="상품코드 입력" width={101} value={''} />
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
      <div className="ag-theme-alpine radio-selection ">
        <AgGridReact<Ltpa040DummyDataRow>
          ref={gridRef}
          noRowsOverlayComponent={AgGridEmptyComponent}
          getRowId={(params) => String(params.data.id)}
          rowData={rowData}
          columnDefs={columnDefs}
          tooltipShowMode="whenTruncated"
          tooltipShowDelay={0}
          tooltipHideDelay={3000}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          rowSelection={{
            mode: 'singleRow',
            checkboxes: true,
            enableClickSelection: false,
          }}
          selectionColumnDef={{
            headerName: '선택',
            width: 30,
            cellClass: 'text-center editable-cell',
          }}
          singleClickEdit={true}
          rowClassRules={{}}
          onCellValueChanged={() => {}}
          domLayout="normal"
          onGridReady={(params) => {
            params.api.forEachNode((node) => {
              if (node.data?.isCheck) {
                node.setSelected(true);
              }
            });
          }}
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
    </Grid>
  );
};

export default Ltpa04001;
