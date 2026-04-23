'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, DatePickerCellEditor } from '@aggrid';
import { Grow, Gcol, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon, FileExportIcon, FileImportIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

// Side Effect (모듈 등록 등)
ModuleRegistry.registerModules([AllCommunityModule]);

type Ltpa360DummyDataRow1 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};

const Ltpa360DummyData1: Ltpa360DummyDataRow1[] = [
  {
    id: 1,
    field01: '기초서류',
    field02: '기초서류 작성 및 유관부서 송부',
    field03: '2025-10-01',
    field04: '2025-10-01',
    field05: '30/50',
    field06: '',
  },
  {
    id: 2,
    field01: '상품정보',
    field02: '상품정보시스템 입력',
    field03: '2025-10-01',
    field04: '2025-10-01',
    field05: '30/50',
    field06: '',
  },
  {
    id: 3,
    field01: 'PV',
    field02: '보험료 및 준비금 테이블 반영',
    field03: '2025-10-01',
    field04: '2025-10-01',
    field05: '30/50',
    field06: '',
  },
  {
    id: 4,
    field01: '룰',
    field02: '룰 시스템 개발 및 반영',
    field03: '2025-10-01',
    field04: '2025-10-01',
    field05: '30/50',
    field06: '',
  },
  {
    id: 5,
    field01: '통합테스트개시',
    field02: '관련부서 통합 설계 테스트',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 6,
    field01: '출력물검수',
    field02: '청약서류(상품설명서, 청약서, 증권) 검수',
    field03: '2025-10-01',
    field04: '2025-10-01',
    field05: '30/50',
    field06: '',
  },
  {
    id: 7,
    field01: '상품출시',
    field02: '상품판매 준비완료',
    field03: '2025-10-01',
    field04: '2025-10-01',
    field05: '30/50',
    field06: '',
  },
];

type Ltpa360DummyDataRow1b = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: React.ReactNode;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
  field10: string | number;
  isSelect?: boolean;
};

const Ltpa360DummyData1b: Ltpa360DummyDataRow1b[] = [
  {
    id: 1,
    field01: '2025-10-13',
    field02: '*',
    field03: '25년 10월 개정',
    field04: '지연(37)건',
    field05: '지연(37)건',
    field06: '지연(37)건',
    field07: '지연(37)건',
    field08: '',
    field09: '',
    field10: '',
  },
  {
    id: 2,
    field01: '2025-10-13',
    field02: 'LA02768',
    field03: '(담보추가)더건강한 한아름종합보험 2504 - 납입면제형, 기본형)',
    field04: '미완료',
    field05: '미완료',
    field06: '미완료',
    field07: '미완료',
    field08: '미완료',
    field09: '미완료',
    field10: '준비중',
  },
  {
    id: 3,
    field01: '2025-10-13',
    field02: 'LA02769',
    field03: '(담보추가)더건강한 한아름종합보험 2504 - 납입면제형, 기본형)',
    field04: '미완료',
    field05: '미완료',
    field06: '미완료',
    field07: '미완료',
    field08: '미완료',
    field09: '미완료',
    field10: '준비중',
  },
  {
    id: 4,
    field01: '2025-10-13',
    field02: 'LA02770',
    field03: '(담보추가)더건강한 한아름종합보험 2504 - 납입면제형, 기본형)',
    field04: '미완료',
    field05: '미완료',
    field06: '미완료',
    field07: '미완료',
    field08: '미완료',
    field09: '미완료',
    field10: '준비중',
  },
];

type Ltpa360DummyDataRow2 = {
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
  field16: string | number;
  field17: string | number;
  field18: string | number;
  field19: string | number;
  field20: string | number;
  field21: string | number;
};

const Ltpa360DummyData2: Ltpa360DummyDataRow2[] = [
  {
    id: 1,
    isCheck: false,
    field01: 'LA02843001',
    field02: '25년 10월 개정',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    field21: '',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'LA02843001',
    field02: '한화 더건강한 1040 종합보험 무배당2510 - 기본형',
    field03: '',
    field04: '',
    field05: 'LAC1208303',
    field06: 'F552102',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    field21: '',
  },
  {
    id: 3,
    isCheck: false,
    field01: 'LA02843001',
    field02: '한화 더건강한 1040 종합보험 무배당2510 - 납입후 50% 해약 환급금 지급형',
    field03: '',
    field04: '',
    field05: 'LAC1208303',
    field06: 'F552102',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    field21: '',
  },
  {
    id: 4,
    isCheck: false,
    field01: 'LA02843001',
    field02: '한화 더건강한 1040 종합보험 무배당2510_TM - 기본형',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    field21: '',
  },
  {
    id: 5,
    isCheck: false,
    field01: 'LA02843001',
    field02: '한화 더건강한 1040 종합보험 무배당2510_TM - 납입후50% 해약 환급금 지급형',
    field03: '',
    field04: '',
    field05: 'LAC1208303',
    field06: 'F552102',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    field21: '',
  },
  {
    id: 6,
    isCheck: false,
    field01: 'LA02843001',
    field02: '한화 건강쑥쑥 어린이보험 무배당2510 - 기본형',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    field21: '',
  },
  {
    id: 7,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    field21: '',
  },
  {
    id: 8,
    isCheck: false,
    field01: 'LA02843001',
    field02: '한화 더건강한 1040 종합보험 무배당2510_TM - 기본형',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '개발중',
    field19: '준비중',
    field20: 'LA02843001',
    field21: 'LA02843001',
  },
];

type Ltpa360DummyDataRow3 = {
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
};

const Ltpa360DummyData3: Ltpa360DummyDataRow3[] = [
  {
    id: 1,
    isCheck: false,
    field01: 'CLA70772',
    field02: '고열동반특정패혈증진단비',
    field03: '0',
    field04: '90',
    field05: '',
    field06: '세부담보 중 일부 면적',
    field07:
      '[담보]보험기간 중에 진단확정된 질병 또는 상해의 직접 결과로써 생활기능 또는 업무능력에 지장을 가져오면서 "고열"로 인하여 중환자실에 입원하여 치료를 받은 경우 보험가입금액 지급',
    field08: '간편고지/독립/모담보',
    field09: '2026-03-17',
    field10: '박한화',
    field11: '2025-10-13',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'CLA70772',
    field02: '고열동반특정패혈증진단비',
    field03: '0',
    field04: '90',
    field05: '',
    field06: '없음',
    field07:
      '[담보]보장개시일 이후에 약관에서 정한 "암(특정유사암포함)"으로 진단확정되고, 그 질병으로 입원 중에 "급여 암(특정유사암포함) 재활치료"를 받은 경우 또는 통원하여 "급여 암(특정유사암포함) 재활치료"를 받은 경우 보험가입금액 지급',
    field08: '간편고지/독립',
    field09: '2026-03-17',
    field10: '',
    field11: '2025-10-13',
  },
  {
    id: 3,
    isCheck: false,
    field01: 'CLA70772',
    field02: '고열동반특정패혈증진단비',
    field03: '0',
    field04: '90',
    field05: '',
    field06: '세부담보 중 일부 면적',
    field07: '',
    field08: '',
    field09: '2026-03-17',
    field10: '',
    field11: '2025-10-13',
  },
  {
    id: 4,
    isCheck: false,
    field01: '신규',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '삭제(기 판매 위)',
    field09: '2026-03-17',
    field10: '',
    field11: '2025-10-13',
  },
];

type Ltpa360DummyDataRow4 = {
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
};

const Ltpa360DummyData4: Ltpa360DummyDataRow4[] = [
  {
    id: 1,
    isCheck: false,
    field01: 'LAC8399197',
    field02: '급여 메일리 영유아발달검사 이용률(연연)',
    field03: '99기타',
    field04: '99기타',
    field05: 'LAC1208303',
    field06: 'F552102',
    field07: '암 치료',
    field08: '삭제(기 판매 위)',
    field09: '2025-09-11',
    field10: '',
    field11: '2025-10-13',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'LAC8399198',
    field02: '급여 메일리 영유아발달검사 이용률(연연)',
    field03: '99기타',
    field04: '99기타',
    field05: 'LAC1208303',
    field06: 'F552102',
    field07: '암 치료',
    field08: '삭제(기 판매 위)',
    field09: '2025-09-11',
    field10: '',
    field11: '2025-10-13',
  },
  {
    id: 3,
    isCheck: false,
    field01: 'LAC8399199',
    field02: '급여 메일리 영유아발달검사 이용률(연연)',
    field03: '99기타',
    field04: '99기타',
    field05: 'LAC1208303',
    field06: 'F552102',
    field07: '암 치료',
    field08: '삭제(기 판매 위)',
    field09: '2025-09-11',
    field10: '',
    field11: '2025-10-13',
  },
  {
    id: 4,
    isCheck: false,
    field01: 'LAC8399199',
    field02: '급여 메일리 영유아발달검사 이용률(연연)',
    field03: '99기타',
    field04: '99기타',
    field05: 'LAC1208303',
    field06: 'F552102',
    field07: '암 치료',
    field08: '삭제(기 판매 위)',
    field09: '2025-09-11',
    field10: '',
    field11: '2025-10-13',
  },
  {
    id: 5,
    isCheck: false,
    field01: '신규',
    field02: '급여 메일리 영유아발달검사 이용률(연연)',
    field03: '99기타',
    field04: '99기타',
    field05: 'LAC1208303',
    field06: 'F552102',
    field07: '암 치료',
    field08: '삭제(기 판매 위)',
    field09: '2025-09-11',
    field10: '',
    field11: '2025-10-13',
  },
];

// Tab 정의
type Ltpa360TabType = { name: string; value: string; label: string };
const DATA_TABS: Ltpa360TabType[] = [
  { name: '총괄장표', value: 'tab1', label: '총괄장표' },
  { name: '입력장표', value: 'tab2', label: '입력장표' },
  { name: '담보코드요청', value: 'tab3', label: '담보코드요청' },
  { name: '사고담보코드요청', value: 'tab4', label: '사고담보코드요청' },
];

export default function Ltpa360Section() {
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
    type09: '',
    type10: '',
    type11: '',
    type12: '',
    type13: '',
    type14: '',
    type15: '',
    type16: '',
    type17: '',
    type18: '',
  });
  const handlePreviewClick = (row: Ltpa360DummyDataRow2) => {
    // TODO: 실제 미리보기 팝업/라우팅 연동
    // eslint-disable-next-line no-console
    console.log('[LTPZ001] 미리보기 클릭', row);
  };

  // Tab1 AGGrid Column
  const columnDefs1: ColDef<Ltpa360DummyDataRow1>[] = [
    {
      headerName: '단계별 진행현황',
      field: 'field01',
      width: 180,
      cellEditorParams: { values: ['선택', ''] },
    },
    {
      headerName: '세부내용',
      field: 'field02',
      width: 400,
    },
    {
      headerName: '계획일정',
      field: 'field03',
      width: 90,
    },
    {
      headerName: '완료일자',
      field: 'field04',
      width: 90,
    },
    {
      headerName: '완료/대상',
      field: 'field05',
      width: 80,
    },
    {
      headerName: '진행율',
      field: 'field06',
      flex: 1,
      editable: true,
    },
  ];

  // Tab1_1 AGGrid Column
  const columnDefs1b: ColDef<Ltpa360DummyDataRow1b>[] = [
    {
      headerName: '판매일자',
      field: 'field01',
      width: 120,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
    {
      headerName: '보종코드',
      field: 'field02',
      width: 100,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
    {
      headerName: '보종명',
      field: 'field03',
      flex: 1,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
    {
      headerName: '기초서류',
      field: 'field04',
      width: 100,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
    {
      headerName: '상품정보',
      field: 'field05',
      width: 100,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
    {
      headerName: 'PV',
      field: 'field06',
      width: 100,
      editable: false,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
    {
      headerName: '만납기룰',
      field: 'field07',
      width: 100,
      editable: false,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
    {
      headerName: '설계테스트',
      field: 'field08',
      width: 100,
      editable: false,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
    {
      headerName: '츨력물검수',
      field: 'field09',
      width: 100,
      editable: false,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
    {
      headerName: '판매준비',
      field: 'field10',
      width: 100,
      editable: false,
      cellClassRules: {
        'font-bold': (params) =>
          Object.values(params.data ?? {}).some((v) => typeof v === 'string' && v.includes('지연')),
      },
    },
  ];
  // 행 isSelect 토글 함수 예시 (UI에서 호출 필요)
  // const handleToggleIsSelect = (rowId: number) => {
  //   setLtpa360DummyData1b(prev => prev.map(row => row.id === rowId ? { ...row, isSelect: !row.isSelect } : row));
  // };

  // Tab2 AGGrid Column
  const columnDefs2: (ColDef<Ltpa360DummyDataRow2> | ColGroupDef<Ltpa360DummyDataRow2>)[] = [
    {
      headerName: '상품코드',
      field: 'field01',
      width: 100,
      editable: true,
      pinned: 'left',
      cellEditorParams: { values: ['선택', ''] },
    },
    {
      headerName: '상품명',
      field: 'field02',
      width: 230,
      editable: true,
      pinned: 'left',
      cellClass: 'truncate',
    },
    {
      headerName: '판매일자',
      field: 'field03',
      width: 130,
      editable: true,
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '계획/실적 구분',
      field: 'field04',
      width: 120,
      editable: true,
      headerComponent: () => (
        <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
          계획/
          <br />
          실적 구분
        </div>
      ),
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '실적', ''] },
    },
    {
      headerName: '담당자',
      children: [
        {
          headerName: '개발(정)',
          field: 'field05',
          width: 120,
          editable: true,
          cellRenderer: () => (
            <Grow className="w-full px-1">
              <Input aria-label="" width={'100%'} size="sm" value={'박한화'} readOnly />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          ),
        },
        {
          headerName: '개발(부)',
          field: 'field06',
          width: 120,
          editable: true,
          cellRenderer: () => (
            <Grow className="w-full px-1">
              <Input aria-label="" width={'100%'} size="sm" value={'박한화'} readOnly />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          ),
        },
        {
          headerName: '지원',
          field: 'field07',
          width: 120,
          editable: true,
          cellRenderer: () => (
            <Grow className="w-full px-1">
              <Input aria-label="" width={'100%'} size="sm" value={'박한화'} readOnly />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          ),
        },
        {
          headerName: 'IT',
          field: 'field08',
          width: 120,
          editable: true,
          cellRenderer: () => (
            <Grow className="w-full px-1">
              <Input aria-label="" width={'100%'} size="sm" value={'박한화'} readOnly />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          ),
        },
      ],
    },
    {
      headerName: '메모',
      children: [
        {
          headerName: '질문',
          field: 'field09',
          width: 60,
          editable: true,
        },
        {
          headerName: '답변',
          field: 'field10',
          width: 60,
          editable: false,
          cellRenderer: () => (
            <Grow className="w-full px-1">
              <Button aria-label="숫자" variant={'none'} size={'md'} color={'gray-light'}>
                0
              </Button>
            </Grow>
          ),
        },
      ],
    },
    {
      headerName: '체크 리스트',
      field: 'isCheck',
      width: 60,
      cellClass: 'text-center flex! items-center justify-center!',
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      editable: (params) => !params.node.isSelected(),
      cellRendererParams: () => ({
        disabled: false,
      }),
      cellEditorParams: () => ({
        disabled: false,
      }),
      cellClassRules: {},
      wrapText: true,
      headerComponent: () => (
        <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
          체크/
          <br />
          리스트
        </div>
      ),
    },
    {
      headerName: '준비일정',
      children: [
        {
          headerName: '기초서류 송부',
          field: 'field12',
          width: 130,
          editable: true,
          cellEditor: DatePickerCellEditor,
        },
        {
          headerName: '상품정보 시스템',
          field: 'field13',
          width: 130,
          editable: true,
          cellEditor: DatePickerCellEditor,
        },
        {
          headerName: 'PV',
          field: 'field14',
          width: 130,
          editable: true,
          cellClass: 'text-center',
          autoHeight: true,
          cellEditor: DatePickerCellEditor,
        },
        {
          headerName: '룰',
          field: 'field15',
          width: 130,
          editable: true,
          cellClass: 'text-center',
          autoHeight: true,
          cellEditor: DatePickerCellEditor,
        },
      ],
    },
    {
      headerName: '테스트진행',
      children: [
        {
          headerName: '설계번호',
          field: 'field16',
          width: 90,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellEditor: 'agInputCellEditor',
          cellEditorParams: { values: ['선택', '', ''] },
        },
        {
          headerName: '테스트 결과',
          field: 'field17',
          width: 90,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: [
              '선택',
              '정상',
              '수납완료',
              '청약중',
              '설계중',
              '보험료계산오류',
              '환급금오류',
              '출력물오류',
              '기타오류',
            ],
          },
        },
        {
          headerName: '청약서류 검수',
          field: 'field18',
          width: 90,
          editable: false,
          cellClass: 'text-center flex! items-center justify-center!',
          cellRenderer: (params: ICellRendererParams<Ltpa360DummyDataRow2>) => (
            <Button
              variant={'text'}
              size={'lg'}
              color={'link'}
              onClick={(e) => {
                e.stopPropagation();
                if (params.data) {
                  handlePreviewClick(params.data);
                }
              }}
            >
              개발중
            </Button>
          ),
        },
      ],
    },
    {
      headerName: '판매준비 완료여부',
      field: 'field19',
      width: 80,
      editable: true,
      cellClass: 'text-center',
      headerComponent: () => (
        <div className="w-full flex items-center justify-center text-center whitespace-normal leading-5">
          판매준비/
          <br />
          완료여부
        </div>
      ),
    },
    {
      headerName: '개정 전 상품코드',
      field: 'field20',
      width: 90,
      editable: true,
      cellClass: 'text-center',
      cellEditor: 'agInputCellEditor',
      headerComponent: () => (
        <div className="w-full flex items-center justify-center text-center whitespace-normal leading-5">
          개정 전/
          <br />
          상품코드
        </div>
      ),
    },
    {
      headerName: '개정 전 상품명',
      field: 'field21',
      width: 180,
      editable: true,
      cellEditor: 'agInputCellEditor',
    },
  ];

  // Tab3 AGGrid Column
  const columnDefs3: ColDef<Ltpa360DummyDataRow3>[] = [
    {
      headerName: '담보코드',
      field: 'field01',
      width: 90,
      // autoHeight: true,
      editable: false,
    },
    {
      headerName: '담보명',
      field: 'field02',
      width: 170,
      editable: true,
      cellClass: 'truncate justify-start!',
    },
    {
      headerName: '면책(일수)',
      field: 'field03',
      width: 80,
      editable: true,
    },
    {
      headerName: '감액(일수)',
      field: 'field04',
      width: 80,
      editable: true,
    },
    {
      headerName: '감액(비율)',
      field: 'field05',
      width: 80,
      editable: true,
    },
    {
      headerName: '면책감액기타',
      field: 'field06',
      width: 140,
      editable: true,
    },
    {
      headerName: '보장내용',
      field: 'field07',
      flex: 1,
      editable: true,
      autoHeight: true,
      cellClass: 'break-all! whitespace-pre-line!',
    },
    {
      headerName: '비고',
      field: 'field08',
      width: 140,
      editable: true,
      cellClass: 'truncate',
    },
    {
      headerName: '요청일자',
      field: 'field09',
      width: 100,
      editable: false,
    },
    {
      headerName: '요청자',
      field: 'field10',
      width: 120,
      editable: false,
      cellRenderer: () => (
        <Grow className="w-full px-1">
          <Input aria-label="" value={'박한화'} readOnly />
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon />
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '상품판매일자',
      field: 'field11',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '2025-10-13', '2025-10-14'] },
    },
  ];

  // Tab4 AGGrid Column
  const columnDefs4: ColDef<Ltpa360DummyDataRow4>[] = [
    {
      headerName: '사고담보코드',
      field: 'field01',
      width: 100,
      autoHeight: true,
      editable: true,
    },
    {
      headerName: '사고담보명(100byte초과금지)',
      field: 'field02',
      flex: 1,
      editable: false,
      cellClass: 'truncate',
    },
    {
      headerName: '대유형구분',
      field: 'field03',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['99:기타', ''] },
    },
    {
      headerName: '보상구분',
      field: 'field04',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['99:기타', ''] },
    },
    {
      headerName: '표준체사고코드',
      field: 'field05',
      width: 110,
      editable: true,
    },
    {
      headerName: 'SI계수코드(대표)',
      field: 'field06',
      width: 110,
      editable: true,
    },
    {
      headerName: 'SI계수정보',
      field: 'field07',
      width: 110,
      editable: true,
    },
    {
      headerName: '비고',
      field: 'field08',
      width: 110,
      editable: true,
      cellClass: 'truncate',
    },
    {
      headerName: '요청일자',
      field: 'field09',
      width: 100,
      editable: false,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['2025-09-11', ''] },
    },
    {
      headerName: '요청자',
      field: 'field10',
      width: 120,
      editable: false,
      cellRenderer: () => (
        <Grow className="w-full px-1">
          <Input aria-label="" width={'100%'} value={'박한화'} readOnly />
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon />
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '상품판매일자',
      field: 'field11',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['2025-10-13', ''] },
    },
  ];
  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '상품판매준비프로세스',
            pageId: 'LTPA360',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={10}
            variant="default"
            hasTableBelow={true}
            error={false}
            errorMsg="에러 메시지 예시"
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            renderDropdownItem={false}
          >
            {/* TAB1 */}
            {active === 'tab1' && (
              <Grid className="grid-rows-[auto_1fr] w-full h-full" gap={3}>
                <Grow className="w-full" variant="box-round-b" placement={'bwe'}>
                  <FormTable
                    variant={'none'}
                    lineTop={false}
                    caption="총괄장표 조회 테이블"
                    cols={['w-[10rem]', 'flex-1']}
                  >
                    <FormRow>
                      <FormCell title={'상품판매일자'}>
                        <NativeSelect
                          aria-label="상품판매일자 선택"
                          width="12rem"
                          value={form.type01}
                          onChange={(e) => setFormField('type01', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type01-1', label: '2025-10-13' },
                            { value: 'selection2', id: 'type01-2', label: '2025-10-13' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
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
                <ResizablePanelGroup orientation="vertical" className="w-full h-full">
                  <ResizablePanel defaultSize={50}>
                    <TableFold variant={'accordion'} className="h-full">
                      <TableFoldHead title="전체현황" />
                      <TableFoldBody>
                        <div className="ag-theme-alpine min-h-[18.4rem]">
                          <AgGridReact<Ltpa360DummyDataRow1>
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            getRowId={(params) => String(params.data.id)}
                            rowData={Ltpa360DummyData1}
                            columnDefs={columnDefs1}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                              cellClass: 'text-center p-0! flex',
                            }}
                            singleClickEdit={true}
                            onCellValueChanged={() => {}}
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={50}>
                    <TableFold variant={'accordion'} className="h-full">
                      <TableFoldHead title="세부현황" />
                      <TableFoldBody>
                        <div className="ag-theme-alpine min-h-[18.4rem]">
                          <AgGridReact<Ltpa360DummyDataRow1b>
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            getRowId={(params) => String(params.data.id)}
                            rowData={Ltpa360DummyData1b}
                            columnDefs={columnDefs1b}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                              cellClass: 'text-center',
                            }}
                            singleClickEdit={true}
                            onCellValueChanged={() => {}}
                            selectionColumnDef={{
                              cellClass: 'text-center p-0!',
                            }}
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </Grid>
            )}
            {/* TAB2 */}
            {active === 'tab2' && (
              <Grid className="grid-rows-[1fr] w-full h-full pt-2" gap={3}>
                <TableFold variant={'accordion'}>
                  <TableFoldHead title="입력장표">
                    <Grow className="justify-end" placement="ee">
                      <Button variant={'outlined'} color={'success'}>
                        엑셀가져오기
                        <FileImportIcon />
                      </Button>
                      <Button color="success" variant="outlined">
                        엑셀내보내기
                        <FileExportIcon />
                      </Button>
                      <Button color="gray" variant="outlined">
                        행추가
                      </Button>
                      <Button color="gray" variant="outlined">
                        행삭제
                      </Button>
                      <Button color="gray" variant="outlined">
                        파일등록
                      </Button>
                      <Button color="gray" variant="outlined">
                        메모
                      </Button>
                    </Grow>
                  </TableFoldHead>
                  <TableFoldBody>
                    <Grid className="grid-rows-[auto_1fr] w-full h-full" gap={4}>
                      <Grow className="w-full" variant="box-round" placement={'bwe'}>
                        <FormTable
                          variant={'none'}
                          caption="입력장표 조회 테이블"
                          cols={['w-[10rem]', 'flex-1', 'w-[10rem]', 'flex-1']}
                        >
                          <FormRow>
                            <FormCell title={'상품판매일자'}>
                              <NativeSelect
                                aria-label="상품판매일자 선택"
                                width="12rem"
                                value={form.type02}
                                onChange={(e) => setFormField('type02', e.target.value)}
                              >
                                {[
                                  { value: 'selection', id: 'type02-1', label: '2025-10-13' },
                                  { value: 'selection2', id: 'type02-2', label: '2025-10-14' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                            <FormCell title={'조회구분'}>
                              <NativeSelect
                                aria-label="조회구분 선택"
                                width="9rem"
                                value={form.type03}
                                onChange={(e) => setFormField('type03', e.target.value)}
                              >
                                {[
                                  { value: 'selection', id: 'type03-1', label: '상품명' },
                                  { value: 'selection2', id: 'type03-2', label: '상품코드' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <Input
                                aria-label=""
                                width={'12rem'}
                                size={'sm'}
                                value={form.type04 || '12345678'}
                                isFocused
                                onChange={(e) => setFormField('type04', e.target.value)}
                              />
                              <NativeSelect
                                aria-label="조회구분 선택"
                                width="9rem"
                                size={'md'}
                                value={form.type05}
                                onChange={(e) => setFormField('type05', e.target.value)}
                              >
                                {[
                                  { value: 'selection', id: 'type05-1', label: '선택' },
                                  { value: 'selection2', id: 'type05-2', label: '담당자' },
                                  { value: 'selection3', id: 'type04-3', label: '담당부서' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <Input
                                aria-label=""
                                width={'12rem'}
                                size={'sm'}
                                value={form.type06 || '12345678'}
                                isFocused
                                onChange={(e) => setFormField('type06', e.target.value)}
                              />
                              <Button
                                aria-label="검색"
                                variant={'outlined'}
                                only="icon"
                                size={'md'}
                                color={'gray-light'}
                              >
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input aria-label="" width={'15rem'} size={'sm'} value={'신부산GA지점'} readOnly />
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
                      <div className="ag-theme-alpine min-h-[18.4rem] w-full">
                        <AgGridReact<Ltpa360DummyDataRow2>
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          getRowId={(params) => String(params.data.id)}
                          rowData={Ltpa360DummyData2}
                          columnDefs={columnDefs2}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                            cellClass: 'text-center p-0!',
                          }}
                          singleClickEdit={true}
                          onCellValueChanged={() => {}}
                          rowSelection={{
                            mode: 'singleRow',
                            checkboxes: true,
                            enableClickSelection: false,
                          }}
                          selectionColumnDef={{
                            width: 40,
                            pinned: 'left',
                            cellClass: 'text-center p-0!',
                            cellClassRules: {
                              'pointer-events-none': (params) => !!params.data?.locked,
                            },
                          }}
                        />
                      </div>
                    </Grid>
                  </TableFoldBody>
                </TableFold>
              </Grid>
            )}
            {/* TAB3 */}
            {active === 'tab3' && (
              <Grid className="grid-rows-[auto_1fr] w-full h-full" gap={3}>
                <Grow className="w-full" variant="box-round-b" placement={'bwe'}>
                  <FormTable
                    variant={'none'}
                    caption="사고담보코드 조회 테이블"
                    cols={['w-[10rem]', 'flex-1', 'w-[10rem]', 'flex-1', 'w-[10rem]', 'flex-1']}
                  >
                    <FormRow>
                      <FormCell title={'상품판매일자'}>
                        <NativeSelect
                          aria-label="상품판매일자 선택"
                          width="12rem"
                          value={form.type07}
                          onChange={(e) => setFormField('type07', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type07-1', label: '2025-10-13' },
                            { value: 'selection2', id: 'type07-2', label: '2025-10-13' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'조회구분'}>
                        <NativeSelect
                          aria-label="조회구분 선택"
                          width="17rem"
                          value={form.type08}
                          onChange={(e) => setFormField('type08', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type08-1', label: '선택' },
                            { value: 'selection2', id: 'type08-2', label: '신규' },
                            { value: 'selection3', id: 'type08-3', label: '제도성' },
                            { value: 'selection4', id: 'type08-4', label: '담보일반' },
                            { value: 'selection5', id: 'type08-5', label: '모담보' },
                            { value: 'selection6', id: 'type08-6', label: '독립특약' },
                            { value: 'selection7', id: 'type08-7', label: '판매취소' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'담보구분'}>
                        <NativeSelect
                          aria-label="담보구분 선택"
                          width="15rem"
                          value={form.type09}
                          onChange={(e) => setFormField('type09', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type09-1', label: '담보코드' },
                            { value: 'selection2', id: 'type09-2', label: '담보명' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input
                          aria-label=""
                          width={'15rem'}
                          value={form.type10 || 'CLA23429'}
                          onChange={(e) => setFormField('type10', e.target.value)}
                        />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'요청자'}>
                        <Input
                          aria-label=""
                          width={'10rem'}
                          value={form.type11 || '12345678'}
                          onChange={(e) => setFormField('type11', e.target.value)}
                        />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={'15rem'} value={'신부산GA지점'} readOnly />
                      </FormCell>
                      <FormCell title={'요청일자'} colSpan={3}>
                        <DatePickerInput
                          mode="range"
                          onChange={() => {}}
                          rangeValue={{ from: '2026-02', to: '2026-03' }}
                          size="lg"
                          width="sm"
                          readOnly
                        />
                        <NativeSelect
                          aria-label="요청일자 선택"
                          width="10rem"
                          value={form.type12}
                          onChange={(e) => setFormField('type12', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type12-1', label: '전체' },
                            { value: 'selection2', id: 'type12-2', label: '' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
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
                <Gcol>
                  <Grow className="w-full justify-end">
                    <Button color="success" variant="outlined">
                      엑셀내보내기
                      <FileExportIcon />
                    </Button>
                    <Button color="gray" variant="outlined">
                      초기화
                    </Button>
                    <Button color="gray" variant="outlined">
                      행추가
                    </Button>
                    <Button color="gray" variant="outlined">
                      행삭제
                    </Button>
                  </Grow>
                  <div className="ag-theme-alpine min-h-[18.4rem] w-full">
                    <AgGridReact<Ltpa360DummyDataRow3>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={Ltpa360DummyData3}
                      columnDefs={columnDefs3}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                        cellClass: 'text-center p-0!',
                      }}
                      singleClickEdit={true}
                      onCellValueChanged={() => {}}
                      rowSelection={{
                        mode: 'singleRow',
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{ headerName: '선택' }}
                      onGridReady={(params) => {
                        params.api.forEachNode((node) => {
                          if (node.data?.isCheck) {
                            node.setSelected(true);
                          }
                        });
                      }}
                    />
                  </div>
                </Gcol>
              </Grid>
            )}
            {/* TAB4 */}
            {active === 'tab4' && (
              <Grid className="grid-rows-[auto_1fr] w-full h-full" gap={3}>
                <Grow className="w-full" variant="box-round-b" placement={'bwe'}>
                  <FormTable
                    variant={'none'}
                    caption="사고담보코드 조회 테이블"
                    cols={['w-[10rem]', 'flex-1', 'w-[10rem]', 'flex-1', 'w-[10rem]', 'flex-1']}
                  >
                    <FormRow>
                      <FormCell title={'상품판매일자'}>
                        <NativeSelect
                          aria-label="상품판매일자 선택"
                          width="12rem"
                          value={form.type01}
                          onChange={(e) => setFormField('type01', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type01-1', label: '2025-10-13' },
                            { value: 'selection2', id: 'type01-2', label: '2025-10-13' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'조회구분'}>
                        <NativeSelect
                          aria-label="조회구분 선택"
                          width="17rem"
                          value={form.type02}
                          onChange={(e) => setFormField('type02', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type02-1', label: '선택' },
                            { value: 'selection2', id: 'type02-2', label: '신규' },
                            { value: 'selection3', id: 'type02-3', label: '판매취소' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'담보구분'}>
                        <NativeSelect
                          aria-label="담보구분 선택"
                          width="15rem"
                          value={form.type03}
                          onChange={(e) => setFormField('type03', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type03-1', label: '사고담보명' },
                            { value: 'selection2', id: 'type03-2', label: '사고담보코드' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input
                          aria-label=""
                          width={'15rem'}
                          value={form.type04 || 'CLA23429'}
                          onChange={(e) => setFormField('type04', e.target.value)}
                        />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'요청자'}>
                        <Input
                          aria-label=""
                          width={'10rem'}
                          value={form.type05 || '12345678'}
                          onChange={(e) => setFormField('type05', e.target.value)}
                        />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={'15rem'} value={'신부산GA지점'} readOnly />
                      </FormCell>
                      <FormCell title={'요청일자'} colSpan={3}>
                        <DatePickerInput
                          mode="range"
                          onChange={() => {}}
                          rangeValue={{ from: '2026-02', to: '2026-03' }}
                          size="lg"
                          width="sm"
                          readOnly
                        />
                        <NativeSelect
                          aria-label="요청일자 선택"
                          width="10rem"
                          value={form.type02}
                          onChange={(e) => setFormField('type02', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type02-1', label: '전체' },
                            { value: 'selection2', id: 'type02-2', label: '' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
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
                <Gcol>
                  <Grow className="w-full justify-end">
                    <Button color="gray" variant="outlined">
                      초기화
                    </Button>
                    <Button color="gray" variant="outlined">
                      행추가
                    </Button>
                    <Button color="gray" variant="outlined">
                      행삭제
                    </Button>
                  </Grow>
                  <div className="ag-theme-alpine min-h-[18.4rem] w-full">
                    <AgGridReact<Ltpa360DummyDataRow4>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={Ltpa360DummyData4}
                      columnDefs={columnDefs4}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                        cellClass: 'text-center p-0! ',
                      }}
                      alwaysShowHorizontalScroll={true}
                      singleClickEdit={true}
                      // 체크박스 시
                      rowSelection={{
                        mode: 'multiRow',
                        checkboxes: true,
                        headerCheckbox: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{ headerName: '' }}
                      onGridReady={(params) => {
                        params.api.forEachNode((node) => {
                          if (node.data?.isCheck) {
                            node.setSelected(true);
                          }
                        });
                      }}
                    />
                  </div>
                </Gcol>
              </Grid>
            )}
          </TabPager>
        }
        mainFoot={
          <MainBottom>
            {active === 'tab1' && (
              <MainBottomItem>
                <Grow gap={1} placement={'ee'} className="w-full">
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                    초기화
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                    삭제
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    저장
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray-light'} size={'xl'}>
                    닫기
                  </Button>
                </Grow>
              </MainBottomItem>
            )}
            {active === 'tab2' && (
              <MainBottomItem>
                <Grow gap={1} placement={'ee'} className="w-full">
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                    초기화
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                    삭제
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    저장
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray-light'} size={'xl'}>
                    닫기
                  </Button>
                </Grow>
              </MainBottomItem>
            )}
            {active === 'tab3' && (
              <MainBottomItem>
                <Grow gap={1} placement={'ee'} className="w-full">
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    저장
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray-light'} size={'xl'}>
                    닫기
                  </Button>
                </Grow>
              </MainBottomItem>
            )}
            {active === 'tab4' && (
              <MainBottomItem>
                <Grow gap={1} placement={'ee'} className="w-full">
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    저장
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray-light'} size={'xl'}>
                    닫기
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
