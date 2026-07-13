/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  createTooltipValueGetter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
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

/**
 * @type Ltpz032TabType
 * @description 팝업 내부 상단 대분류 탭 규격
 */

/**
 * @type DummyDataType11
 * @description 일반/건강고지 설계번호 목록 데이터 구조
 * - field02: 입력 일자
 * - field03: 설계 번호
 * - field04: 상품명
 * - field05: 고지유형
 * - field06: 질병 미리보기 활성화
 * - field07 ~ field36: 매핑된 질병명 리스트
 */
type DummyDataType11 = {
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
  field22: string | number;
  field23: string | number;
  field24: string | number;
  field25: string | number;
  field26: string | number;
  field27: string | number;
  field28: string | number;
  field29: string | number;
  field30: string | number;
  field31: string | number;
  field32: string | number;
  field33: string | number;
  field34: string | number;
  field35: string | number;
  field36: string | number;
};

/** @description 일반/건강고지 설계번호별 목록 테스트 데이터 */
const DummyData11: DummyDataType11[] = [
  {
    id: 1,
    isCheck: true,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌 척추염좌 척추염좌',
    field08: '자궁근종 자궁근종 자궁근종',
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
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
  },
  {
    id: 2,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌',
    field08: '자궁근종',
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
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
  },
  {
    id: 3,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌',
    field08: '자궁근종',
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
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
  },
  {
    id: 4,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌',
    field08: '자궁근종',
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
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
  },
  {
    id: 5,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌',
    field08: '자궁근종',
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
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
  },
];
// Tab1-2 (간편고지 설계번호 목록 데이터 구조)
type DummyDataType12 = {
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
  field22: string | number;
  field23: string | number;
  field24: string | number;
  field25: string | number;
  field26: string | number;
  field27: string | number;
  field28: string | number;
  field29: string | number;
  field30: string | number;
  field31: string | number;
  field32: string | number;
  field33: string | number;
  field34: string | number;
  field35: string | number;
  field36: string | number;
};

const DummyData12: DummyDataType12[] = [
  {
    id: 1,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601 한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌 척추염좌 척추염좌',
    field08: '자궁근종 자궁근종 자궁근종',
    field09: '척추염좌 척추염좌 척추염좌',
    field10: '자궁근종 자궁근종 자궁근종',
    field11: '척추염좌 척추염좌 척추염좌',
    field12: '자궁근종 자궁근종 자궁근종',
    field13: '척추염좌 척추염좌 척추염좌',
    field14: '자궁근종 자궁근종 자궁근종',
    field15: '척추염좌 척추염좌 척추염좌',
    field16: '자궁근종 자궁근종 자궁근종',
    field17: '척추염좌 척추염좌 척추염좌',
    field18: '자궁근종 자궁근종 자궁근종',
    field19: '척추염좌 척추염좌 척추염좌',
    field20: '자궁근종 자궁근종 자궁근종',
    field21: '척추염좌 척추염좌 척추염좌',
    field22: '자궁근종 자궁근종 자궁근종',
    field23: '척추염좌 척추염좌 척추염좌',
    field24: '자궁근종',
    field25: '척추염좌',
    field26: '자궁근종',
    field27: '척추염좌',
    field28: '자궁근종',
    field29: '척추염좌',
    field30: '자궁근종',
    field31: '척추염좌',
    field32: '자궁근종',
    field33: '척추염좌',
    field34: '자궁근종',
    field35: '척추염좌',
    field36: '자궁근종',
  },
  {
    id: 2,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌',
    field08: '자궁근종',
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
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
  },
  {
    id: 3,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌',
    field08: '자궁근종',
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
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
  },
  {
    id: 4,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌',
    field08: '자궁근종',
    field09: '척추염좌',
    field10: '자궁근종',
    field11: '척추염좌',
    field12: '자궁근종',
    field13: '척추염좌',
    field14: '자궁근종',
    field15: '척추염좌',
    field16: '자궁근종',
    field17: '척추염좌',
    field18: '자궁근종',
    field19: '척추염좌',
    field20: '자궁근종',
    field21: '척추염좌',
    field22: '자궁근종',
    field23: '척추염좌',
    field24: '자궁근종',
    field25: '척추염좌',
    field26: '자궁근종',
    field27: '척추염좌',
    field28: '자궁근종',
    field29: '척추염좌',
    field30: '자궁근종',
    field31: '척추염좌',
    field32: '자궁근종',
    field33: '척추염좌',
    field34: '자궁근종',
    field35: '척추염좌',
    field36: '자궁근종',
  },
  {
    id: 5,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌',
    field08: '자궁근종',
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
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
  },
  {
    id: 6,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA2401521476365',
    field04: '한화 더건강한 한아름종합보험2601',
    field05: '납입면제형, 기본형',
    field06: '보기',
    field07: '척추염좌',
    field08: '자궁근종',
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
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
  },
];

/**
 * @component Ltpz032
 * @description 질병입력 가져오기 다이얼로그 팝업 컴포넌트
 * - 대분류 탭(설계번호별 / 질병코드별)을 전환하며 과거 설계 데이터 및 고지된 질병 이력 데이터를 조회하고 선택하여, 현재 피보험자의 질병 고지 입력 사항으로 복원(가져오기) 처리를 수행합니다.
 */
const Ltpz032 = () => {
  // [상태값 정의]
  /** @description 설계번호별 일반/건강고지 목록 그리드 바인딩 데이터 */
  const [rowData11, setRowData11] = React.useState<DummyDataType11[]>(DummyData11);
  /** @description 설계번호별 간편고지 목록 그리드 바인딩 데이터 */
  const [rowData12, setRowData12] = React.useState<DummyDataType12[]>(DummyData12);

  /**
   * @description 에러 행 상태 관리 핸들러 (현재 구조에서는 비어 있음)
   */
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);

  // 셀 값 변경 시 실행 - isCheck 필드 변경을 감지하고 rowData 업데이트
  const onCellValueChanged11 = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType11, number>('isCheck', setRowData11, setErrorRows, 'id'),
    [setErrorRows]
  );
  const onCellValueChanged12 = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType12, number>('isCheck', setRowData12, setErrorRows, 'id'),
    [setErrorRows]
  );

  /** @description 화면 크기별로 고정/반응형 그리드 열 너비를 계산하여 보정하는 유틸 훅 */
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // Tab1-1: 일반/건강고지 테이블 컬럼 정의
  // useMemo로 감싼 이유: 불필요한 re-render 방지
  const columnDefs11 = React.useMemo<ColDef<DummyDataType11>[]>(() => {
    return [
      {
        headerName: '입력일자',
        field: 'field02',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '설계번호',
        field: 'field03',
        width: attributeColumnWidth(115),
      },
      {
        headerName: '상품명',
        field: 'field04',
        flex: 10,
        minWidth: attributeColumnWidth(120),
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field04' }),
      },
      {
        headerName: '고지유형',
        field: 'field05',
        width: attributeColumnWidth(120),
      },
      {
        headerName: '질병미리보기',
        field: 'field06',
        width: attributeColumnWidth(80),
        sortable: false,
        autoHeight: true,
        cellRenderer: (_params: ICellRendererParams<DummyDataType11>) => (
          <Grow className="w-full px-1">
            보기
            <Button aria-label="질병 상세내용 보기" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
              <SearchIcon color={'var(--color-primary-50)'} />
            </Button>
          </Grow>
        ),
      },
      {
        headerName: '질병명1',
        field: 'field07',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field07' }),
      },
      {
        headerName: '질병명2',
        field: 'field08',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field08' }),
      },
      {
        headerName: '질병명3',
        field: 'field09',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field09' }),
      },
      {
        headerName: '질병명4',
        field: 'field10',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field10' }),
      },
      {
        headerName: '질병명5',
        field: 'field11',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field11' }),
      },
      {
        headerName: '질병명6',
        field: 'field12',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field12' }),
      },
      {
        headerName: '질병명7',
        field: 'field13',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field13' }),
      },
      {
        headerName: '질병명8',
        field: 'field14',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field14' }),
      },
      {
        headerName: '질병명9',
        field: 'field15',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field15' }),
      },
      {
        headerName: '질병명10',
        field: 'field16',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field16' }),
      },
      {
        headerName: '질병명11',
        field: 'field17',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field17' }),
      },
      {
        headerName: '질병명12',
        field: 'field18',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field18' }),
      },
      {
        headerName: '질병명13',
        field: 'field19',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field19' }),
      },
      {
        headerName: '질병명14',
        field: 'field20',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field20' }),
      },
      {
        headerName: '질병명15',
        field: 'field21',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field21' }),
      },
      {
        headerName: '질병명16',
        field: 'field22',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field22' }),
      },
      {
        headerName: '질병명17',
        field: 'field23',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field23' }),
      },
      {
        headerName: '질병명18',
        field: 'field24',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field24' }),
      },
      {
        headerName: '질병명19',
        field: 'field25',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field25' }),
      },
      {
        headerName: '질병명20',
        field: 'field26',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field26' }),
      },
      {
        headerName: '질병명21',
        field: 'field27',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field27' }),
      },
      {
        headerName: '질병명22',
        field: 'field28',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field28' }),
      },
      {
        headerName: '질병명23',
        field: 'field29',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field29' }),
      },
      {
        headerName: '질병명24',
        field: 'field30',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field30' }),
      },
      {
        headerName: '질병명25',
        field: 'field31',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field31' }),
      },
      {
        headerName: '질병명26',
        field: 'field32',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field32' }),
      },
      {
        headerName: '질병명27',
        field: 'field33',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field33' }),
      },
      {
        headerName: '질병명28',
        field: 'field34',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field34' }),
      },
      {
        headerName: '질병명29',
        field: 'field35',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field35' }),
      },
      {
        headerName: '질병명30',
        field: 'field36',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field36' }),
      },
    ];
  }, [attributeColumnWidth]);
  const columnDefs12 = React.useMemo<ColDef<DummyDataType12>[]>(
    () => [
      {
        headerName: '입력일자',
        field: 'field02',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '설계번호',
        field: 'field03',
        width: attributeColumnWidth(115),
      },
      {
        headerName: '상품명',
        field: 'field04',
        flex: 5,
        minWidth: attributeColumnWidth(180),
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType12>({ field: 'field04' }),
      },
      {
        headerName: '고지유형',
        field: 'field05',
        width: attributeColumnWidth(120),
      },
      {
        headerName: '질병미리보기',
        field: 'field06',
        width: attributeColumnWidth(85),
        sortable: false,
        autoHeight: true,
        cellRenderer: (_params: ICellRendererParams<DummyDataType12>) => (
          <Grow className="w-full px-1">
            보기
            <Button aria-label="질병 상세내용 보기" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
              <SearchIcon color={'var(--color-primary-50)'} />
            </Button>
          </Grow>
        ),
      },
      {
        headerName: '질병명1',
        field: 'field07',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field07' }),
      },
      {
        headerName: '질병명2',
        field: 'field08',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field08' }),
      },
      {
        headerName: '질병명3',
        field: 'field09',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field09' }),
      },
      {
        headerName: '질병명4',
        field: 'field10',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field10' }),
      },
      {
        headerName: '질병명5',
        field: 'field11',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field11' }),
      },
      {
        headerName: '질병명6',
        field: 'field12',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field12' }),
      },
      {
        headerName: '질병명7',
        field: 'field13',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field13' }),
      },
      {
        headerName: '질병명8',
        field: 'field14',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field14' }),
      },
      {
        headerName: '질병명9',
        field: 'field15',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field15' }),
      },
      {
        headerName: '질병명10',
        field: 'field16',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field16' }),
      },
      {
        headerName: '질병명11',
        field: 'field17',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field17' }),
      },
      {
        headerName: '질병명12',
        field: 'field18',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field18' }),
      },
      {
        headerName: '질병명13',
        field: 'field19',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field19' }),
      },
      {
        headerName: '질병명14',
        field: 'field20',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field20' }),
      },
      {
        headerName: '질병명15',
        field: 'field21',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field21' }),
      },
      {
        headerName: '질병명16',
        field: 'field22',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field22' }),
      },
      {
        headerName: '질병명17',
        field: 'field23',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field23' }),
      },
      {
        headerName: '질병명18',
        field: 'field24',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field24' }),
      },
      {
        headerName: '질병명19',
        field: 'field25',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field25' }),
      },
      {
        headerName: '질병명20',
        field: 'field26',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field26' }),
      },
      {
        headerName: '질병명21',
        field: 'field27',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field27' }),
      },
      {
        headerName: '질병명22',
        field: 'field28',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field28' }),
      },
      {
        headerName: '질병명23',
        field: 'field29',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field29' }),
      },
      {
        headerName: '질병명24',
        field: 'field30',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field30' }),
      },
      {
        headerName: '질병명25',
        field: 'field31',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field31' }),
      },
      {
        headerName: '질병명26',
        field: 'field32',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field32' }),
      },
      {
        headerName: '질병명27',
        field: 'field33',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field33' }),
      },
      {
        headerName: '질병명28',
        field: 'field34',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field34' }),
      },
      {
        headerName: '질병명29',
        field: 'field35',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field35' }),
      },
      {
        headerName: '질병명30',
        field: 'field36',
        flex: 1,
        minWidth: attributeColumnWidth(100),
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <>
      <Dialog open>
        <DialogContent showCloseButton resizable={true} size="2xl">
          {/* 1. 다이얼로그 헤더 영역: 팝업 타이틀 및 ID 정의 */}
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                질병입력 가져오기
              </Typo>
              <Typo tag={'p'} variant={'body-xl'}>
                (LTPZ032)
              </Typo>
            </DialogTitle>
          </DialogHeader>

          {/* 2. 다이얼로그 본문 영역 */}
          <DialogSection className="grid-rows-[1fr]">
            <Grid placement="ss" className="w-full h-full pt-2 grid-rows-[auto_auto_auto]" gap={3}>
              <TableFold className="">
                <TableFoldHead title="일반/건강고지" />
                <TableFoldBody>
                  <div className="ag-theme-alpine w-full radio-selection inner-scroll" data-row={rowData11.length}>
                    <AgGridReact<DummyDataType11>
                      getRowId={(params) => String(params.data.id)} // 행의 고유 ID 설정
                      noRowsOverlayComponent={AgGridEmptyComponent} // 데이터가 없을 때 표시할 컴포넌트
                      rowData={rowData11} // 테이블에 표시할 실제 데이터
                      columnDefs={columnDefs11} // 컬럼 설정
                      // 모든 컬럼의 기본 설정
                      defaultColDef={{
                        sortable: true, // 정렬 가능 여부
                        resizable: true, // 열 크기 조정 가능 여부
                        cellClass: 'text-center', // 셀의 기본 스타일
                      }}
                      // 체크박스 선택 모드 설정
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
                      // Grid 레이아웃 설정
                      domLayout="normal"
                      tooltipShowMode="whenTruncated" // 텍스트가 길면 툴팁 표시
                      tooltipShowDelay={0} // 툴팁 표시 지연 시간
                      onCellValueChanged={onCellValueChanged11} // 셀 값 변경 시 실행
                      // Grid 초기화 완료 시 실행 - isCheck가 true인 행들을 체크
                      onGridReady={(params) => {
                        params.api.forEachNode((node) => {
                          if (node.data?.isCheck) {
                            node.setSelected(true);
                          }
                        });
                      }}
                    />
                  </div>
                </TableFoldBody>
              </TableFold>
              <TableFold className="">
                <TableFoldHead title="간편고지" />
                <TableFoldBody>
                  <div className="ag-theme-alpine w-full radio-selection inner-scroll" data-row={rowData12.length}>
                    <AgGridReact<DummyDataType12>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData12}
                      columnDefs={columnDefs12}
                      defaultColDef={{
                        sortable: true, // 정렬 가능 여부
                        resizable: true, // 열 크기 조정 가능 여부
                        cellClass: 'text-center', // 셀의 기본 스타일
                      }}
                      // 체크박스 선택 모드 설정
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
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      onCellValueChanged={onCellValueChanged12}
                      onGridReady={(params) => {
                        params.api.forEachNode((node) => {
                          if (node.data?.isCheck) {
                            node.setSelected(true);
                          }
                        });
                      }}
                    />
                  </div>
                </TableFoldBody>
              </TableFold>

              <Gcol className="w-full" placement="ss" variant="box-warning">
                <Typo icon="warning" variant="body-sm">
                  최근 1개월이내 설계번호(유형별 최대 5개) 표시
                </Typo>
                <Typo icon="warning" variant="body-sm">
                  질병 가져오기 : 기존 입력사항 초기화 → 선택한 설계번호의 질병입력정보를 가져옵니다
                </Typo>
                <Typo icon="warning" variant="body-sm">
                  실제 피보험자의 상태와 다를 경우 고지위반으로 인하여 불이익을 받을 수 있으니, 심사요청에 피보험자에게
                  최종확인하셔야 합니다.
                </Typo>
              </Gcol>
            </Grid>
          </DialogSection>

          {/* 3. 다이얼로그 푸터 영역: 질병 가져오기 실행 및 팝업 닫기 버튼 */}
          <DialogFooter>
            <DialogFooterArea>
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  질병 가져오기
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
    </>
  );
};

export default Ltpz032;
