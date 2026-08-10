/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo, Grid, Divider } from '@atoms';
import { BulletItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { QuestionMark, ResetIcon, SearchIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

/**
 * @type DummyDataType
 * @description 질병 검색 목록에서 사용되는 개별 질병 데이터 규격
 * - id: 고유 식별자
 * - field1: KCD(한국표준질병사인분류) 질병 코드
 * - field2: 공식 질병명
 * - field3: 적용 가능한 특이사항 플래그 목록 (할증, 부담보, SI경증 등)
 */
type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string[];
};

/** @description 질병 검색 리스트 테스트를 위한 Mock 데이터 */
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: 'M34.5',
    field2: '척추관협착증척추관협착증척추관협착증',
    field3: ['할증', '부담보', 'SI경증'],
  },
  {
    id: 2,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 3,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 4,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 5,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 6,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 7,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 8,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 9,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 10,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 11,
    field1: 'M34.5',
    field2: '척추관협착증척추관협착증척추관협착증',
    field3: ['할증', '부담보', 'SI경증'],
  },
  {
    id: 12,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 13,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 14,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 15,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 16,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 17,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 18,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 19,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 20,
    field1: 'M34.5',
    field2: '척추관협착증',
    field3: ['SI경증(감액)', '부담보'],
  },
];

/** @description 질병 상세 내용 탭 전환 처리를 위한 상용 질병 목록 설정 */
const DataTabs = [
  { label: '척추염좌척추염좌척추염좌척추염좌척추염좌척추염좌척추염좌', value: 'TAB1' },
  { label: '자궁근종자궁근종자궁근종자궁근종자궁근종자궁근종', value: 'TAB2' },
  { label: '대장·직장용종대장·직장용종대장·직장용종대장·직장용종대장·직장용종대장·직장용종', value: 'TAB3' },
  { label: '추간판장애추간판장애추간판장애추간판장애추간판장애추간판장애추간판장애', value: 'TAB4' },
  { label: '어깨병변어깨병변어깨병변어깨병변어깨병변어깨병변', value: 'TAB5' },
  { label: '어깨병변', value: 'TAB6' },
  { label: '자궁근종', value: 'TAB7' },
  { label: '대장·직장용종', value: 'TAB8' },
  { label: '추간판장애', value: 'TAB9' },
  { label: '어깨병변', value: 'TAB10' },
];

/**
 * @type DummyDataType3
 * @description 사전심사 기준 테이블(일반고지형/간편고지형)의 데이터 규격
 * - field1 ~ field4: 위험분류 조건 정보
 * - field5 ~ field21: 각 담보별 인수 조건 (인수, 거절, 할증 등)
 * - field22: 필요 서류 정보
 * - field23: 심사 시 참고사항
 */
type DummyDataType3 = {
  id: number;
  field1: string | number;
  field2: boolean;
  field3: string | number;
  field4: boolean;
  field5: string | number;
  field6: string | number;
  field7: string | number;
  field8: string | number;
  field9: string | number;
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
  field22: string | number;
  field23: string | number;
};

const dummyData2: DummyDataType3[] = [];

const dummyData3: DummyDataType3[] = [
  {
    id: 1,
    field1: '15일이하',
    field2: true,
    field3: '즉시',
    field4: false,
    field5: '인수',
    field6: '할증(20)',
    field7: '거절',
    field8: '할증(10)',
    field9: '거절',
    field10: '거절',
    field11: '할증(30)',
    field12: '인수',
    field13: '인수',
    field14: '인수',
    field15: '인수',
    field16: '인수',
    field17: '인수',
    field18: '서류',
    field19: '서류',
    field20: '서류',
    field21: '진단',
    field22: '',
    field23: '',
  },
  {
    id: 2,
    field1: '15일이하',
    field2: true,
    field3: '3개월이내',
    field4: false,
    field5: '인수',
    field6: '할증(20)',
    field7: '거절',
    field8: '할증(10)',
    field9: '거절',
    field10: '거절',
    field11: '할증(30)',
    field12: '인수',
    field13: '인수',
    field14: '인수',
    field15: '인수',
    field16: '인수',
    field17: '인수',
    field18: '서류',
    field19: '서류',
    field20: '서류',
    field21: '진단',
    field22: '',
    field23: '',
  },
  {
    id: 3,
    field1: '15일이하',
    field2: true,
    field3: '즉시',
    field4: false,
    field5: '인수',
    field6: '할증(20)',
    field7: '거절',
    field8: '할증(10)',
    field9: '거절',
    field10: '거절',
    field11: '할증(30)',
    field12: '인수',
    field13: '인수',
    field14: '인수',
    field15: '인수',
    field16: '인수',
    field17: '인수',
    field18: '서류',
    field19: '서류',
    field20: '서류',
    field21: '진단',
    field22: '',
    field23: '',
  },
];

/**
 * @component Ltpz031
 * @description 질병검색 및 입력 다이얼로그 팝업 컴포넌트
 * - 질병 검색을 수행하고, 선택된 질병들을 탭 형식으로 추가하여 각 질병별 상세 질문지(치료이력, 치료내용, 추가질문)와 사전심사 안내를 확인 및 입력할 수 있습니다.
 */
const Ltpz031 = () => {
  // [상태값 정의]
  /** @description 검색 결과 그리드에 바인딩할 질병 데이터 리스트 상태 */
  const [rowData] = useState<DummyDataType[]>(DummyData);

  /** @description 각 상세 탭별 입력 폼 데이터 통합 관리 상태 */
  const [form, setFormField] = useFormFields({
    // Tab1 (척추염좌) 관련 입력 필드
    type01_01: '',
    type01_02: '',
    type01_03: '',
    type01_04: '',
    type01_05: '',

    // Tab2 (자궁근종) 관련 입력 필드
    type02_01: '',
    type02_02: '',
    type02_03: '',
    type02_04: '',

    // Tab3 (대장·직장용종) 관련 입력 필드
    type03_01: '',
    type03_02: '',
    type03_03: '',
    type03_04: '',

    // Tab4 (추간판장애) 관련 입력 필드
    type04_01: '',
    type04_02: '',
    type04_03: '',
    type04_04: '',

    // Tab5 (어깨병변) 관련 입력 필드
    type05_01: '',
    type05_02: '',
    type05_03: '',
    type05_04: '',
  });

  /** @description 질병 상세 페이지의 탭 제어(추가, 선택, 삭제)를 담당하는 커스텀 훅 */
  const { tabs, active, setActive, handleRemove } = useTabs(DataTabs);

  /** @description 질병명 검색 시 하이라이팅 기준 단어 상태 */
  const [searchWord] = useState('척추');

  /**
   * @description 질병검색 결과 그리드(ag-Grid)의 컬럼 명세 정의
   * - KCD코드: 질병 분류 코드 출력
   * - 질병명: 검색어 매칭 시 볼드 처리하고, 질병 특성 뱃지(할증, 부담보, SI경증 등)를 나열
   */
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: 'KCD코드',
      field: 'field1',
      width: 80,
      cellClass: 'text-center ag-header-multiline',
    },
    {
      headerName: '질병명',
      field: 'field2',
      flex: 1,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field2' }),
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (!params.data) return null;
        const { field2, field3 } = params.data;
        // "척추" 단어를 <b className="font-bold">로 감싸기
        const parts = field2.split(new RegExp(`(${searchWord})`, 'g'));
        return (
          <Grow className="w-full" placement="bwc" gap={2}>
            <div className="truncate-no">
              {parts.map((part, idx) =>
                part === searchWord ? (
                  <b key={idx} className="font-bold">
                    {part}
                  </b>
                ) : (
                  <React.Fragment key={idx}>{part}</React.Fragment>
                )
              )}
            </div>
            <Grow className="gap-[0.2rem] mt-1 shrink-0" placement="ec">
              {field3.includes('할증') && (
                <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-[var(--color-danger-50)]"></div>
              )}
              {field3.includes('부담보') && (
                <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-[var(--color-success-60)]"></div>
              )}
              {field3.includes('SI경증') && (
                <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-[var(--color-information-50)]"></div>
              )}
              {field3.includes('SI경증(감액)') && (
                <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-[var(--color-warning-40)]"></div>
              )}
            </Grow>
          </Grow>
        );
      },
    },
  ];

  // M1. 테이블 추가
  /**
   * @type DummyDataType2
   * @description 일반고지형/간편고지형 사전심사 데이터 규격 별칭 정의
   */
  type DummyDataType2 = {
    id: number;
    field1: string | number;
    field2: boolean;
    field3: string | number;
    field4: boolean;
    field5: string | number;
    field6: string | number;
    field7: string | number;
    field8: string | number;
    field9: string | number;
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
    field22: string | number;
    field23: string | number;
  };

  /** @description 반응형/고정형 열 너비 조절 유틸 훅 */
  const { attributeColumnWidth } = useDynamicColumnWidths();

  /**
   * @description 사전심사 안내 [일반고지형] 데이터 테이블의 컬럼 정의
   * - 위험분류: 입원/수술 등의 조건 조합 렌더링
   * - 질병사망 고도후유 ~ 실손: 각 특약별 인수 등급 노출
   * - 서류: 심사 필요 첨부서류
   * - 참고사항: 부가 설명 정보
   */
  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '위험분류',
        flex: 1,
        minWidth: attributeColumnWidth(200),
        cellClass: 'text-center !px-0',
        cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
          return (
            <div className="grid h-full w-full items-stretch [grid-template-columns:35%_15%_35%_15%]">
              <span className="flex h-full items-center justify-center">{params.data?.field1}</span>
              <span className="flex h-full items-center justify-center border-l border-gray-200">
                {typeof params.data?.field2 === 'boolean' ? (params.data.field2 ? 'Y' : 'N') : params.data?.field2}
              </span>
              <span className="flex h-full items-center justify-center border-l border-gray-200">
                {params.data?.field3}
              </span>
              <span className="flex h-full items-center justify-center border-l border-gray-200">
                {typeof params.data?.field4 === 'boolean' ? (params.data.field4 ? 'Y' : 'N') : params.data?.field4}
              </span>
            </div>
          );
        },
      },
      {
        headerName: '질병사망 고도후유',
        field: 'field5',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        wrapText: true,
        autoHeight: true,
        headerComponent: () => (
          <div className="w-full text-center whitespace-normal px-1">
            질병사망
            <br />
            고도후유
          </div>
        ),
      },
      {
        headerName: '질병휴우 (경증)',
        field: 'field6',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        headerComponent: () => (
          <div className="w-full text-center whitespace-normal px-1">
            질병휴우
            <br />
            (경증)
          </div>
        ),
      },
      {
        headerName: '2대질병',
        field: 'field7',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '암',
        field: 'field8',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '질병수술',
        field: 'field9',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '질병중환 자실입원',
        field: 'field10',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        headerComponent: () => (
          <div className="w-full text-center whitespace-normal px-1">
            질병중환
            <br />
            자실입원
          </div>
        ),
      },
      {
        headerName: '질병입원',
        field: 'field11',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '질병치료',
        field: 'field12',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '상해사망 고도후유',
        field: 'field13',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        headerComponent: () => (
          <div className="w-full text-center whitespace-normal px-1">
            상해사망
            <br />
            고도후유
          </div>
        ),
      },
      {
        headerName: '상해50%',
        field: 'field14',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '상해수술',
        field: 'field15',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '상해입원',
        field: 'field16',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '상해치료',
        field: 'field17',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '장기요양',
        field: 'field18',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '치매',
        field: 'field19',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '치아',
        field: 'field20',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '실손',
        field: 'field21',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '서류',
        field: 'field22',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '참고사항',
        field: 'field23',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );

  /**
   * @description 사전심사 안내 [간편고지형] 데이터 테이블의 컬럼 정의
   * - 입원일수, 수술유무, 경과일수, 재발 여부 등의 조건과 함께 각 특약의 인수 여부 바인딩
   */
  const columnDefs3 = React.useMemo<ColDef<DummyDataType3>[]>(
    () => [
      {
        headerName: '입원일수',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClass: 'text-center',
      },
      {
        headerName: '수술유무',
        field: 'field2',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        cellRenderer: ({ value }: { value: boolean }) => (value ? 'Y' : 'N'),
      },
      {
        headerName: '경과일수',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '재발',
        field: 'field4',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        cellRenderer: ({ value }: { value: boolean }) => (value ? 'Y' : 'N'),
      },
      {
        headerName: '질병사망 고도후유',
        field: 'field5',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        headerComponent: () => (
          <div className="w-full text-center whitespace-normal px-1">
            질병사망
            <br />
            고도후유
          </div>
        ),
      },
      {
        headerName: '질병휴우 (경증)',
        field: 'field6',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        headerComponent: () => (
          <div className="w-full text-center whitespace-normal px-1">
            질병휴우
            <br />
            (경증)
          </div>
        ),
      },
      {
        headerName: '2대질병',
        field: 'field7',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '암',
        field: 'field8',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '질병수술',
        field: 'field9',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '질병중환 자실입원',
        field: 'field10',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        headerComponent: () => (
          <div className="w-full text-center whitespace-normal px-1">
            질병중환
            <br />
            자실입원
          </div>
        ),
      },
      {
        headerName: '질병입원',
        field: 'field11',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '질병치료',
        field: 'field12',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '상해사망 고도후유',
        field: 'field13',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        headerComponent: () => (
          <div className="w-full text-center whitespace-normal px-1">
            상해사망
            <br />
            고도후유
          </div>
        ),
      },
      {
        headerName: '상해50%',
        field: 'field14',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '상해수술',
        field: 'field15',
        flex: 1,
        minWidth: attributeColumnWidth(60),
      },
      {
        headerName: '상해입원',
        field: 'field16',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '상해치료',
        field: 'field17',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '장기요양',
        field: 'field18',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '치매',
        field: 'field19',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '치아',
        field: 'field20',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '실손',
        field: 'field21',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '서류',
        field: 'field22',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '참고사항',
        field: 'field23',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );
  const [subTabs, setSubTabs] = useState('tab1');

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} className="w-[100rem]">
        {/* 1. 다이얼로그 헤더 영역: 화면 타이틀 및 ID 표시 */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              질병검색 및 입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ031)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        {/* 2. 다이얼로그 본문 영역 */}
        <DialogSection className="w-full gap-3 grid-rows-[auto_1fr]">
          {/* 2-1. 최상단: 자동고지 조회 및 연계 정보 가져오기 단축 실행바 */}
          <Grow variant={'box-info-line'} placement={'bwc'} className="border-transparent">
            <Typo variant={'body-lg'}>자동고지(ICIS) 또는 질병 가져오기를 통해 질병 정보를 간편하게 입력하세요.</Typo>
            <Grow>
              <Button color={'gray'} size={'xl'} variant={'outlined'}>
                자동고지(ICIS)
              </Button>
              <Button color={'gray'} size={'xl'} variant={'outlined'}>
                질병 가져오기
              </Button>
            </Grow>
          </Grow>

          {/* 2-2. 중앙 스플릿 레이아웃: 좌측(질병검색 패널) & 우측(선택 질병별 입력 폼 패널) */}
          {/* 좌측 영역: 많이 찾는 질병 목록 및 질병 검색창 & 결과 목록 그리드 */}
          <ResizablePanelGroup orientation="horizontal" className="w-full">
            <ResizablePanel defaultSize={31} maxSize={290}>
              <Grid placement={'ss'} className="w-full h-full overflow-hidden grid-rows-[auto_1fr]" gap={5}>
                {/* 많이 찾는 질병 (퀵 태그 버튼들) */}
                <Gcol className="w-full" placement={'ss'} gap={2}>
                  <Typo variant="heading-md">많이 찾는 질병</Typo>
                  <Grow variant="box-round" placement={'bwc'}>
                    <CheckboxGroup className="gap-1" minSelected={2} defaultValue={[]} variant="button">
                      {[
                        { value: '대장·직장용종', label: '대장직장용종장직장용종 장·직장용종' },
                        { value: '척주염좌', label: '척주염좌척주염좌척주염좌 척주염좌' },
                        { value: '등통증', label: '등통증' },
                        { value: '후천성 백내장', label: '후천성 백내장' },
                        { value: '열상·표재성손상', label: '열상·표재성손상' },
                        { value: '추간판장애', label: '추간판장애' },
                        { value: '금성 비인두염', label: '금성 비인두염' },
                        { value: '교통사고', label: '교통사고' },
                        { value: '치액/치질', label: '치액/치질' },
                        { value: '자궁근종', label: '자궁근종' },
                      ].map((item) => (
                        <CheckboxGroupItem key={item.value} value={item.value}>
                          {item.label.length > 8 ? `${item.label.slice(0, 8)}...` : item.label}
                        </CheckboxGroupItem>
                      ))}
                    </CheckboxGroup>
                  </Grow>
                </Gcol>
                {/* 질병 검색창 및 ag-Grid 결과 테이블 */}
                <Grid className="w-full grid-rows-[auto_1fr]" placement={'ss'} gap={2}>
                  <Grow placement={'bwe'}>
                    <Typo variant="heading-md">질병검색</Typo>
                    <Badge color="blue" size="md" variant="contained" className="">
                      입력된 질병 6건
                    </Badge>
                  </Grow>
                  <Gcol variant="box-round" className="bg-[var(--color-blue-gray-15)]">
                    <Grow className="w-full">
                      <Input placeholder="병명 또는 코드 입력" className="w-full" />
                      <Button aria-label="검색" variant={'outlined'} size={'lg'} color="gray-light" only="icon">
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                    </Grow>
                    <Grow placement={'ss'} className="w-full">
                      <Typo>
                        총 <b className="text-[var(--color-primary-50)]">18건</b>
                      </Typo>
                    </Grow>
                    <Grow className="text-[1.1rem] w-full" placement="sc">
                      <Grow placement="sc">
                        <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-danger-50)]"></div>할증
                      </Grow>
                      <Grow placement="sc">
                        <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-success-60)]"></div>부담보
                      </Grow>
                      <Grow placement="sc">
                        <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-information-50)]"></div>
                        SI검증
                      </Grow>
                      <Grow placement="sc">
                        <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-warning-40)]"></div>
                        SI경증(감액)
                      </Grow>
                    </Grow>

                    <div className="ag-theme-alpine min-h-[30rem] ">
                      <AgGridReact<DummyDataType>
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        domLayout="normal"
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                  </Gcol>
                </Grid>
              </Grid>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={69}>
              {/* 우측 영역: 선택한 질병 리스트 탭 및 탭별 세부 정보 입력 폼 */}
              <Grow placement={'ss'} className="w-full min-w-0" gap={2}>
                <Grow className="w-full min-w-0">
                  <Gcol className="w-full min-w-0" placement={'ss'}>
                    <TabPager
                      data={tabs}
                      active={active}
                      setActive={setActive}
                      removable={true}
                      onRemove={handleRemove}
                      getValue={(tab) => tab.value}
                      renderTab={(tab) => {
                        const isTruncated = tab.label.length > 6;
                        const displayLabel = isTruncated ? `${tab.label.slice(0, 6)}...` : tab.label;
                        return isTruncated ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{displayLabel}</span>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center" sideOffset={8}>
                              {tab.label}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <span>{displayLabel}</span>
                        );
                      }}
                      renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => {
                        const idx = data.findIndex((t) => String(t.value) === String(tab.value));
                        return (
                          <Button
                            variant={'none'}
                            key={String(tab.value)}
                            onClick={() => {
                              setActive(String(tab.value));
                              if (idx !== -1) {
                                const page = Math.floor(idx / visibleCount);
                                setVisibleStart(page * visibleCount);
                              }
                            }}
                            className="min-h-[2.8rem]! w-full rounded-none hover:bg-[var(--color-warning-10)]"
                            style={idx > 0 ? { borderTop: '1px solid var(--color-gray-15)' } : undefined}
                          >
                            <span className="flex items-start gap-2 w-full">
                              <span className="block">{tab.label}</span>
                            </span>
                          </Button>
                        );
                      }}
                      visibleCount={5}
                    >
                      {/* Tab1 (활성화된 질병별 상세 질문 카드 리스트) */}
                      <Gcol placement={'ss'} className="w-full mt-2" gap={3}>
                        {/* [세부 폼 1] 기본질문 아코디언 */}
                        <TableFold>
                          <TableFoldHead title="기본질문">
                            <Button variant={'outlined'} size={'md'} color={'gray'}>
                              초기화
                              <ResetIcon size={14} color={'var(--color-gray-60)'} />
                            </Button>
                          </TableFoldHead>
                          <TableFoldBody>
                            <FormTable caption="기본질문 항목" cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
                              <FormRow vertical={false}>
                                <FormCell title={'병명'}>
                                  <Grow placement={'bwc'}>
                                    {active === 'TAB1' ? (
                                      <Grow placement={'sc'}>
                                        척추염좌
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button only="icon" size={'md'} variant="none">
                                              <QuestionMark color="var(--color-gray-50)" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent
                                            align="start"
                                            side="bottom"
                                            sideOffset={0}
                                            variant="default"
                                            className="z-[60] w-[22.1rem] block"
                                          >
                                            <Gcol placement={'ss'} gap={1.5}>
                                              <Typo className="body-md font-bold">척추염좌</Typo>
                                              <Grow>
                                                <Badge color="primary" size="md" variant="contained">
                                                  할증
                                                </Badge>
                                                <Badge color="green" size="md" variant="contained">
                                                  부담보
                                                </Badge>
                                                <Badge color="blue" size="md" variant="contained">
                                                  SI경증
                                                </Badge>
                                              </Grow>
                                              <Typo tag={'p'} className="text-wrap">
                                                경추염좌, 요추염좌, 흉추염좌, 목염좌, 등염좌, 허리염좌, 강추의 염좌 및
                                                간장, 흉추의 염좌 및 긴장, 요추의 염좌 및 긴장
                                              </Typo>
                                            </Gcol>
                                          </TooltipContent>
                                        </Tooltip>
                                      </Grow>
                                    ) : active === 'TAB2' ? (
                                      <Grow placement={'sc'}>
                                        자궁근종
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button only="icon" size={'md'} variant="none">
                                              <QuestionMark color="var(--color-gray-50)" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent
                                            align="start"
                                            side="bottom"
                                            sideOffset={0}
                                            variant="default"
                                            className="z-[60] w-[22.1rem] block"
                                          >
                                            <Gcol placement={'ss'} gap={1.5}>
                                              <Typo className="body-md font-bold">자궁근종</Typo>
                                              <Grow>
                                                <Badge color="primary" size="md" variant="contained">
                                                  할증
                                                </Badge>
                                                <Badge color="green" size="md" variant="contained">
                                                  부담보
                                                </Badge>
                                                <Badge color="blue" size="md" variant="contained">
                                                  SI경증
                                                </Badge>
                                              </Grow>
                                              <Typo className="text-wrap">
                                                자궁근종, 난소낭종, 자궁내막증, 자궁선근증, 난소종양, 자궁근종의 염좌 및
                                                난소, 자궁의 염좌 및 긴장, 자궁근종의 염좌 및 긴장
                                              </Typo>
                                            </Gcol>
                                          </TooltipContent>
                                        </Tooltip>
                                      </Grow>
                                    ) : active === 'TAB3' ? (
                                      <Grow placement={'sc'}>
                                        대장·직장용종
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button only="icon" size={'md'} variant="none">
                                              <QuestionMark color="var(--color-gray-50)" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent
                                            align="start"
                                            side="bottom"
                                            sideOffset={0}
                                            variant="default"
                                            className="z-[60] w-[22.1rem] block"
                                          >
                                            <Gcol placement={'ss'} gap={1.5}>
                                              <Typo className="body-md font-bold">대장·직장용종</Typo>
                                              <Grow>
                                                <Badge color="primary" size="md" variant="contained">
                                                  할증
                                                </Badge>
                                                <Badge color="green" size="md" variant="contained">
                                                  부담보
                                                </Badge>
                                                <Badge color="blue" size="md" variant="contained">
                                                  SI경증
                                                </Badge>
                                              </Grow>
                                              <Typo tag={'p'} className="text-wrap">
                                                자궁근종, 난소낭종, 자궁내막증, 자궁선근증, 난소종양, 자궁근종의 염좌 및
                                                난소, 자궁의 염좌 및 긴장, 자궁근종의 염좌 및 긴장
                                              </Typo>
                                            </Gcol>
                                          </TooltipContent>
                                        </Tooltip>
                                      </Grow>
                                    ) : active === 'TAB4' ? (
                                      <Grow placement={'sc'}>
                                        추간판장애
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button only="icon" size={'md'} variant="none">
                                              <QuestionMark color="var(--color-gray-50)" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent
                                            align="start"
                                            side="bottom"
                                            sideOffset={0}
                                            variant="default"
                                            className="z-[60] w-[22.1rem] block"
                                          >
                                            <Gcol placement={'ss'} gap={1.5}>
                                              <Typo className="body-md font-bold">추간판장애</Typo>
                                              <Grow>
                                                <Badge color="primary" size="md" variant="contained">
                                                  할증
                                                </Badge>
                                                <Badge color="green" size="md" variant="contained">
                                                  부담보
                                                </Badge>
                                                <Badge color="blue" size="md" variant="contained">
                                                  SI경증
                                                </Badge>
                                              </Grow>
                                              <Typo className="text-wrap">
                                                경추염좌, 요추염좌, 흉추염좌, 목염좌, 등염좌, 허리염좌, 강추의 염좌 및
                                                간장, 흉추의 염좌 및 긴장, 요추의 염좌 및 긴장
                                              </Typo>
                                            </Gcol>
                                          </TooltipContent>
                                        </Tooltip>
                                      </Grow>
                                    ) : active === 'TAB5' ? (
                                      <Grow placement={'sc'}>
                                        어깨병변
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button only="icon" size={'md'} variant="none">
                                              <QuestionMark color="var(--color-gray-50)" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent
                                            align="start"
                                            side="bottom"
                                            sideOffset={0}
                                            variant="default"
                                            className="z-[60] w-[22.1rem] block"
                                          >
                                            <Gcol placement={'ss'} gap={1.5}>
                                              <Typo className="body-md font-bold">어깨병변</Typo>
                                              <Grow>
                                                <Badge color="primary" size="md" variant="contained">
                                                  할증
                                                </Badge>
                                                <Badge color="green" size="md" variant="contained">
                                                  부담보
                                                </Badge>
                                                <Badge color="blue" size="md" variant="contained">
                                                  SI경증
                                                </Badge>
                                              </Grow>
                                              <Typo className="text-wrap">
                                                어깨병변, 회전근개 손상, 견봉하 점액낭염, 어깨 탈구, 어깨 관절염, 어깨
                                                근육 손상
                                              </Typo>
                                            </Gcol>
                                          </TooltipContent>
                                        </Tooltip>
                                      </Grow>
                                    ) : null}

                                    <Badge color="green" size="md" variant="contained" className="">
                                      자동완성
                                    </Badge>
                                  </Grow>
                                </FormCell>

                                <FormCell title={'의료기관명'}>
                                  <Input
                                    value={form.type01_02}
                                    onChange={(e) => setFormField('type01_02', e.target.value)}
                                    required
                                  />
                                </FormCell>
                              </FormRow>
                              <FormRow vertical={false}>
                                <FormCell title={'치료기간'}>
                                  <DatePickerInput
                                    errorMsg=""
                                    errorPs="bl"
                                    mode="range"
                                    onChange={() => {}}
                                    rangeValue={{
                                      from: '2026-03-01',
                                      to: '2026-03-07',
                                    }}
                                    required
                                    size="lg"
                                  />
                                </FormCell>
                                <FormCell title={'수술여부'}>
                                  <RadioGroup
                                    className="gap-3"
                                    onValueChange={() => {}}
                                    width="full"
                                    required
                                    defaultValue={'예'}
                                  >
                                    {[
                                      { value: '예', label: '예' },
                                      { value: '아니오', label: '아니오' },
                                    ].map((item) => (
                                      <RadioGroupItem key={item.value} value={item.value}>
                                        {item.label}
                                      </RadioGroupItem>
                                    ))}
                                  </RadioGroup>
                                </FormCell>
                              </FormRow>
                              <FormRow vertical={false}>
                                <FormCell title={'치료일수'} titleRowSpan={2}>
                                  <Grow gap={3}>
                                    <Checkbox onCheckedChange={() => {}} required>
                                      입원
                                    </Checkbox>
                                    <Grow>
                                      <Input
                                        commaAmount={true}
                                        value={form.type01_03}
                                        onChange={(e) => setFormField('type01_03', e.target.value)}
                                        width={40}
                                        required
                                      />
                                      일
                                    </Grow>
                                  </Grow>
                                </FormCell>
                                <FormCell title={'완치여부'}>
                                  <RadioGroup className="gap-3" onValueChange={() => {}} width="full" required>
                                    {[
                                      { value: '예', label: '예' },
                                      { value: '아니오', label: '아니오' },
                                    ].map((item) => (
                                      <RadioGroupItem key={item.value} value={item.value}>
                                        {item.label}
                                      </RadioGroupItem>
                                    ))}
                                  </RadioGroup>
                                </FormCell>
                              </FormRow>
                              <FormRow vertical={false}>
                                <FormCell title={null}>
                                  <Grow gap={3}>
                                    <Checkbox onCheckedChange={() => {}} required>
                                      통원
                                    </Checkbox>
                                    <Grow>
                                      <Input
                                        commaAmount={true}
                                        value={form.type01_04}
                                        onChange={(e) => setFormField('type01_04', e.target.value)}
                                        required
                                        width={40}
                                      />
                                      회
                                    </Grow>
                                  </Grow>
                                </FormCell>
                                <FormCell title={'재발유무'}>
                                  <Grow gap={3}>
                                    <RadioGroup
                                      className="gap-3"
                                      errorMsg="하나를 선택해주세요."
                                      errorPs="bl"
                                      onValueChange={() => {}}
                                      required
                                    >
                                      {[
                                        { value: '없음', label: '없음' },
                                        { value: '있음', label: '있음' },
                                      ].map((item) => (
                                        <RadioGroupItem key={item.value} value={item.value}>
                                          {item.label}
                                        </RadioGroupItem>
                                      ))}
                                    </RadioGroup>
                                    <Grow>
                                      <Input
                                        commaAmount={true}
                                        value={form.type01_05}
                                        onChange={(e) => setFormField('type01_05', e.target.value)}
                                        width={40}
                                      />
                                      회
                                    </Grow>
                                  </Grow>
                                </FormCell>
                              </FormRow>
                            </FormTable>
                          </TableFoldBody>
                        </TableFold>

                        {/* [세부 폼 2] (선택) 치료내용 아코디언 */}
                        <TableFold defaultOpen={false}>
                          <TableFoldHead title="(선택)치료내용">
                            <Grow>
                              <BulletItem
                                className="text-right w-full break-words whitespace-pre-line"
                                color="default"
                                onClick={() => {}}
                                size="md"
                                type="dot"
                              >
                                치료내용은 심사자 심사시 참고하는 항목으로 필요시 선택바랍니다.
                              </BulletItem>
                            </Grow>
                          </TableFoldHead>
                          <TableFoldBody className="border-t border-[var(--color-gray-100)] border-t-[0.2rem]">
                            <CheckboxGroup className="gap-0" defaultValue={[]}>
                              {(() => {
                                const items = [
                                  { value: '진단/검사/검진', label: '진단/검사/검진' },
                                  {
                                    value: '약처방/투약(주사,연고,안약 등)',
                                    label: '약처방/투약(주사,연고,안약 등)',
                                  },
                                  { value: '물리치료', label: '물리치료' },
                                  { value: '상담/언어치료', label: '상담/언어치료' },
                                  { value: '치과치료', label: '치과치료' },
                                  { value: '한방치료', label: '한방치료' },
                                  { value: '기타', label: '기타' },
                                ];
                                const groups: React.ReactNode[] = [];
                                for (let i = 0; i < items.length; i += 3) {
                                  const isEtcGroup = i === 6;
                                  groups.push(
                                    <>
                                      <Grid
                                        key={i}
                                        className={
                                          isEtcGroup
                                            ? 'w-full min-h-[3.8rem]'
                                            : 'grid grid-cols-3 gap-3 w-full min-h-[3.8rem]'
                                        }
                                      >
                                        {items.slice(i, i + 3).map((item) => (
                                          <Grow key={item.value} gap={3} placement="bwc" className="w-full">
                                            <CheckboxGroupItem value={item.value}>{item.label}</CheckboxGroupItem>

                                            {item.value === '한방치료' && (
                                              <Button variant={'outlined'} size={'md'} color={'gray'}>
                                                기타
                                              </Button>
                                            )}
                                            {item.value === '기타' && (
                                              <Input
                                                aria-label="기타 치료 입력"
                                                value={''}
                                                readOnly
                                                className="!w-[calc(100%-7.5rem)]"
                                              />
                                            )}
                                          </Grow>
                                        ))}
                                      </Grid>
                                      <Divider dir="row" className="w-full" />
                                    </>
                                  );
                                }
                                // 기타 항목 3열 전체
                                return groups;
                              })()}
                            </CheckboxGroup>
                          </TableFoldBody>
                        </TableFold>
                        {/* [세부 폼 3] 추가질문 아코디언 */}
                        <TableFold>
                          <TableFoldHead title="추가질문" />
                          <TableFoldBody>
                            <FormTable
                              variant="head"
                              className="border-t border-t-[0.2rem] [&_dl+dl]:mt-0! [&_dl]:border-t-[var(--color-gray-100)] [&_dl>div]:flex-col [&_dl>div]:gap-0! [&_dl>div]:w-full [&_dl]:w-full [&_dl_dt]:bg-[var(--color-gray-5)] [&_dl_dt]:w-full [&_dl_dt]:p-2 [&_dl_dt]:border-b [&_dl_dt]:border-b-[var(--color-gray-10)] [&_dl_dt_span]:text-[#000] [&_dl_dd]:border-b [&_dl_dd]:border-b-[var(--color-gray-10)] [&_dl_dd]:w-full [&_dl_dd]:p-2 "
                            >
                              <FormRow vertical={false}>
                                <FormCell title={null} tdClassName="justify-center">
                                  * 해당 질병의 추가 질문은 없습니다.
                                </FormCell>
                              </FormRow>
                              <FormRow vertical={false}>
                                <FormCell
                                  title={
                                    '발생부위 발생부위발생부위 발생부위 발생부위발생부위 발생부위 발생부위발생부위 발생부위 생부위발 발생부 발생부위발생부위 발생부위 발생부생부위  '
                                  }
                                >
                                  <Grow className="w-full" gap={3} placement="sc">
                                    <RadioGroup className="gap-x-3 gap-y-1" onValueChange={() => {}}>
                                      {[
                                        { value: '경추', label: '경추' },
                                        { value: '흉추', label: '흉추' },
                                        { value: '요추', label: '요추' },
                                        { value: '그외 부위 또는 여러부위', label: '그외 부위 또는 여러부위' },
                                      ].map((item) => (
                                        <RadioGroupItem key={item.value} value={item.value}>
                                          {item.label}
                                        </RadioGroupItem>
                                      ))}
                                      <Input aria-label="" placeholder="직접 입력" value={''} readOnly />
                                    </RadioGroup>
                                  </Grow>
                                </FormCell>
                              </FormRow>
                              <FormRow>
                                <FormCell title={'발생원인'}>
                                  <RadioGroup className="gap-3" onValueChange={() => {}}>
                                    {[
                                      { value: '교통사고 外원인', label: '교통사고 外원인' },
                                      { value: '교통사고 원인', label: '교통사고 원인' },
                                    ].map((item) => (
                                      <RadioGroupItem key={item.value} value={item.value}>
                                        {item.label}
                                      </RadioGroupItem>
                                    ))}
                                  </RadioGroup>
                                </FormCell>
                              </FormRow>
                            </FormTable>
                          </TableFoldBody>
                        </TableFold>
                        {/* M1. 테이블 추가  */}
                        {/* [세부 폼 4] 질병별 사전심사 안내 아코디언 */}
                        <TableFold>
                          <TableFoldHead title="질병별 사전심사 안내" />
                          <TableFoldBody>
                            <RadioGroup
                              className="gap-1 mb-[0.4rem]"
                              onValueChange={setSubTabs}
                              width="full"
                              value={subTabs}
                            >
                              {[
                                { value: 'tab1', label: '일반고지형' },
                                { value: 'tab2', label: '간편고지형' },
                              ].map((option) => (
                                <RadioGroupItem
                                  key={option.value}
                                  size="md"
                                  value={option.value}
                                  variant="chipBox"
                                  className="bg-[#E5E5E5] text-[#777] data-[state=checked]:bg-[#414141] data-[state=checked]:text-white data-[state=checked]:border-solid data-[state=checked]:border data-[state=checked]:border-[#414141] hover:border-[#414141]"
                                >
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>

                            {subTabs === 'tab1' && (
                              <div className="ag-theme-alpine w-full inner-scroll" data-row={dummyData2.length}>
                                <AgGridReact<DummyDataType2>
                                  getRowId={(params) => String(params.data.id)}
                                  noRowsOverlayComponent={AgGridEmptyComponent}
                                  rowData={dummyData2}
                                  columnDefs={columnDefs2}
                                  defaultColDef={{
                                    sortable: true,
                                    resizable: true,
                                  }}
                                  domLayout="normal"
                                  tooltipShowMode="whenTruncated"
                                  tooltipShowDelay={0}
                                  headerHeight={50}
                                />
                              </div>
                            )}
                            {subTabs === 'tab2' && (
                              <div className="ag-theme-alpine w-full inner-scroll" data-row={dummyData3.length}>
                                <AgGridReact<DummyDataType3>
                                  getRowId={(params) => String(params.data.id)}
                                  noRowsOverlayComponent={AgGridEmptyComponent}
                                  rowData={dummyData3}
                                  columnDefs={columnDefs3}
                                  defaultColDef={{
                                    sortable: true,
                                    resizable: true,
                                  }}
                                  headerHeight={50}
                                  domLayout="normal"
                                  tooltipShowMode="whenTruncated"
                                  tooltipShowDelay={0}
                                />
                              </div>
                            )}
                          </TableFoldBody>
                        </TableFold>
                      </Gcol>
                    </TabPager>
                  </Gcol>
                </Grow>
              </Grow>
            </ResizablePanel>
          </ResizablePanelGroup>
        </DialogSection>

        {/* 3. 다이얼로그 하단 푸터 영역: FAQ 조회, 저장 및 닫기 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                알릴사항 FAQ
              </Button>
            </Grow>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                알릴사항 저장하기
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

export default Ltpz031;
