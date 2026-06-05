/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  createTooltipValueGetter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TabPager } from '@common/TabPager';
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
import type { ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';

type Ltpz032TabType = {
  name: string;
  value: string;
  label: string;
};

const DATA_TABS: Ltpz032TabType[] = [
  {
    name: '설계번호별',
    value: 'tab1',
    label: '설계번호별',
  },
  {
    name: '질병코드별',
    value: 'tab2',
    label: '질병코드별',
  },
];

// tab1-1 dummy data
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
const DummyData11: DummyDataType11[] = [
  {
    id: 1,
    isCheck: true,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA260204310842',
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
    field03: 'LA260204310842',
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
    field03: 'LA260204310842',
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
    field03: 'LA260204310842',
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
    field03: 'LA260204310842',
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
// Tab1-2
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
    field03: 'LA260204310842',
    field04: '한화 더건강한 한아름종합보험2601 한화 더건강한 한아름종합보험2601',
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
    id: 2,
    isCheck: false,
    field01: '',
    field02: '2026-01-01',
    field03: 'LA260204310842',
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
    field03: 'LA260204310842',
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
    field03: 'LA260204310842',
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
    field03: 'LA260204310842',
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
    field03: 'LA260204310842',
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

// tab2-1 dummy data
type DummyDataType21 = {
  id: number;
  isCheck: boolean;
  field2_01: string | number;
  field2_02: string | number;
  field2_03: string | number;
  field2_04: string | number;
  field2_05: string | number;
  field2_06: string | number;
  field2_07: string | number;
  field2_08: string | number;
  field2_09: string | number;
  field2_10: string | number;
  field2_11: string | number;
  field2_12: string | number;
  field2_13: string | number;
};
const DummyData21: DummyDataType21[] = [
  {
    id: 1,
    isCheck: true,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '입원(2일)',
    field2_05: '통원(2일)',
    field2_06: '아니오',
    field2_07: '완치',
    field2_08: '없음',
    field2_09: '한화병원한화병원한화병원한화병원한화병원한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601한화 더건강한 한아름종합보험2601한화 더건강한 한아름종합보험2601한화 더건강한 한아름종합보험2601한화 더건강한 한아름종합보험2601한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
  {
    id: 2,
    isCheck: false,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '입원(2일)',
    field2_05: '통원(2일)',
    field2_06: '아니오',
    field2_07: '완치',
    field2_08: '없음',
    field2_09: '한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
  {
    id: 3,
    isCheck: false,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '입원(2일)',
    field2_05: '통원(2일)',
    field2_06: '아니오',
    field2_07: '완치',
    field2_08: '없음',
    field2_09: '한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
  {
    id: 4,
    isCheck: false,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '입원(2일)',
    field2_05: '통원(2일)',
    field2_06: '아니오',
    field2_07: '완치',
    field2_08: '없음',
    field2_09: '한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
  {
    id: 5,
    isCheck: false,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '입원(2일)',
    field2_05: '통원(2일)',
    field2_06: '아니오',
    field2_07: '완치',
    field2_08: '없음',
    field2_09: '한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
];
type DummyDataType22 = {
  id: number;
  isCheck: boolean;
  field2_01: string | number;
  field2_02: string | number;
  field2_03: string | number;
  field2_04: string | number;
  field2_05: string | number;
  field2_06: string | number;
  field2_07: string | number;
  field2_08: string | number;
  field2_09: string | number;
  field2_10: string | number;
  field2_11: string | number;
  field2_12: string | number;
  field2_13: string | number;
};
const DummyData22: DummyDataType22[] = [
  {
    id: 1,
    isCheck: true,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌 척추염좌 척추염좌',
    field2_04: '입원(2일)',
    field2_05: '-',
    field2_06: '예',
    field2_07: '미완치',
    field2_08: '있음(1회)',
    field2_09: '한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
  {
    id: 2,
    isCheck: true,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '입원(2일)',
    field2_05: '-',
    field2_06: '예',
    field2_07: '미완치',
    field2_08: '있음(1회)',
    field2_09: '한화병원한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601 한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
  {
    id: 3,
    isCheck: true,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '입원(2일)',
    field2_05: '-',
    field2_06: '예',
    field2_07: '미완치',
    field2_08: '있음(1회)',
    field2_09: '한화병원한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601 한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
  {
    id: 4,
    isCheck: true,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '입원(2일)',
    field2_05: '-',
    field2_06: '예',
    field2_07: '미완치',
    field2_08: '있음(1회)',
    field2_09: '한화병원한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601 한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
  {
    id: 5,
    isCheck: true,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '입원(2일)',
    field2_05: '-',
    field2_06: '예',
    field2_07: '미완치',
    field2_08: '있음(1회)',
    field2_09: '한화병원한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601 한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
];
type DummyDataType23 = {
  id: number;
  isCheck: boolean;
  field2_01: string | number;
  field2_02: string | number;
  field2_03: string | number;
  field2_04: string | number;
  field2_05: string | number;
  field2_06: string | number;
  field2_07: string | number;
  field2_08: string | number;
  field2_09: string | number;
  field2_10: string | number;
  field2_11: string | number;
  field2_12: string | number;
  field2_13: string | number;
};
const DummyData23: DummyDataType23[] = [
  {
    id: 1,
    isCheck: false,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '-',
    field2_05: '통원(2회)',
    field2_06: '예',
    field2_07: '완치',
    field2_08: '있음(1회)',
    field2_09: '한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
  {
    id: 2,
    isCheck: true,
    field2_01: '',
    field2_02: 'M48.0',
    field2_03: '척추염좌',
    field2_04: '-',
    field2_05: '통원(2회)',
    field2_06: '예',
    field2_07: '완치',
    field2_08: '있음(1회)',
    field2_09: '한화병원한화병원',
    field2_10: '한화 더건강한 한아름종합보험2601 한화 더건강한 한아름종합보험2601',
    field2_11: '납입면제형, 기본형',
    field2_12: 'LA260204310842',
    field2_13: '2026-01-01',
  },
];

const Ltpz032 = () => {
  const [rowData11, setRowData11] = React.useState<DummyDataType11[]>(DummyData11);
  const [rowData12, setRowData12] = React.useState<DummyDataType12[]>(DummyData12);
  const [rowData21, setRowData21] = React.useState<DummyDataType21[]>(DummyData21);
  const [rowData22, setRowData22] = React.useState<DummyDataType22[]>(DummyData22);
  const [rowData23, setRowData23] = React.useState<DummyDataType23[]>(DummyData23);

  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);
  const onCellValueChanged11 = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType11, number>('isCheck', setRowData11, setErrorRows, 'id'),
    [setErrorRows]
  );
  const onCellValueChanged12 = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType12, number>('isCheck', setRowData12, setErrorRows, 'id'),
    [setErrorRows]
  );
  const onCellValueChanged21 = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType21, number>('isCheck', setRowData21, setErrorRows, 'id'),
    [setErrorRows]
  );
  const onCellValueChanged22 = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType22, number>('isCheck', setRowData22, setErrorRows, 'id'),
    [setErrorRows]
  );
  const onCellValueChanged23 = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType23, number>('isCheck', setRowData23, setErrorRows, 'id'),
    [setErrorRows]
  );

  const syncSelectionByIsCheck = React.useCallback(
    <T extends { id: number; isCheck: boolean }>(api: GridApi<T>, rows: T[]) => {
      const checkedIdSet = new Set(rows.filter((row) => row.isCheck).map((row) => String(row.id)));

      api.forEachNode((node) => {
        node.setSelected(checkedIdSet.has(node.id ?? ''));
      });
    },
    []
  );

  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs11 = React.useMemo<ColDef<DummyDataType11>[]>(() => {
    return [
      {
        headerName: '입력일자',
        field: 'field02',
        width: attributeColumnWidth(85),
      },
      {
        headerName: '설계번호',
        field: 'field03',
        width: attributeColumnWidth(110),
      },
      {
        headerName: '상품명',
        field: 'field04',
        flex: 1,
        minWidth: attributeColumnWidth(200),
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field04' }),
      },
      {
        headerName: '고지유형',
        field: 'field05',
        width: attributeColumnWidth(140),
      },
      {
        headerName: '질병미리보기',
        field: 'field06',
        width: attributeColumnWidth(85),
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
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field07' }),
      },
      {
        headerName: '질병명2',
        field: 'field08',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field08' }),
      },
      {
        headerName: '질병명3',
        field: 'field09',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field09' }),
      },
      {
        headerName: '질병명4',
        field: 'field10',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field10' }),
      },
      {
        headerName: '질병명5',
        field: 'field11',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field11' }),
      },
      {
        headerName: '질병명6',
        field: 'field12',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field12' }),
      },
      {
        headerName: '질병명7',
        field: 'field13',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field13' }),
      },
      {
        headerName: '질병명8',
        field: 'field14',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field14' }),
      },
      {
        headerName: '질병명9',
        field: 'field15',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field15' }),
      },
      {
        headerName: '질병명10',
        field: 'field16',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field16' }),
      },
      {
        headerName: '질병명11',
        field: 'field17',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field17' }),
      },
      {
        headerName: '질병명12',
        field: 'field18',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field18' }),
      },
      {
        headerName: '질병명13',
        field: 'field19',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field19' }),
      },
      {
        headerName: '질병명14',
        field: 'field20',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field20' }),
      },
      {
        headerName: '질병명15',
        field: 'field21',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field21' }),
      },
      {
        headerName: '질병명16',
        field: 'field22',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field22' }),
      },
      {
        headerName: '질병명17',
        field: 'field23',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field23' }),
      },
      {
        headerName: '질병명18',
        field: 'field24',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field24' }),
      },
      {
        headerName: '질병명19',
        field: 'field25',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field25' }),
      },
      {
        headerName: '질병명20',
        field: 'field26',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field26' }),
      },
      {
        headerName: '질병명21',
        field: 'field27',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field27' }),
      },
      {
        headerName: '질병명22',
        field: 'field28',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field28' }),
      },
      {
        headerName: '질병명23',
        field: 'field29',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field29' }),
      },
      {
        headerName: '질병명24',
        field: 'field30',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field30' }),
      },
      {
        headerName: '질병명25',
        field: 'field31',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field31' }),
      },
      {
        headerName: '질병명26',
        field: 'field32',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field32' }),
      },
      {
        headerName: '질병명27',
        field: 'field33',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field33' }),
      },
      {
        headerName: '질병명28',
        field: 'field34',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field34' }),
      },
      {
        headerName: '질병명29',
        field: 'field35',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field35' }),
      },
      {
        headerName: '질병명30',
        field: 'field36',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType11>({ field: 'field36' }),
      },
    ];
  }, 
  [[attributeColumnWidth]]
);
  const columnDefs12 = React.useMemo<ColDef<DummyDataType12>[]>(
  () => [
    {
      headerName: '입력일자',
      field: 'field02',
      width: attributeColumnWidth(85),
    },
    {
      headerName: '설계번호',
      field: 'field03',
      width: attributeColumnWidth(110),
    },
    {
      headerName: '상품명',
      field: 'field04',
      flex: 1,
      minWidth: attributeColumnWidth(200),
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType12>({ field: 'field04' }),
    },
    {
      headerName: '고지유형',
      field: 'field05',
      width: attributeColumnWidth(140),
    },
    {
      headerName: '질병미리보기',
      field: 'field06',
      width: attributeColumnWidth(85),
      sortable: false,
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
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명2',
      field: 'field08',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명3',
      field: 'field09',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명4',
      field: 'field10',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명5',
      field: 'field11',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명6',
      field: 'field12',
      width: attributeColumnWidth(160),
    },
    {
      headerName: '질병명7',
      field: 'field13',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명8',
      field: 'field14',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명9',
      field: 'field15',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명10',
      field: 'field16',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명11',
      field: 'field17',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명12',
      field: 'field18',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명13',
      field: 'field19',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명14',
      field: 'field20',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명15',
      field: 'field21',
      width: attributeColumnWidth(200),
    },
    {
      headerName: '질병명16',
      field: 'field22',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명17',
      field: 'field23',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명18',
      field: 'field24',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명19',
      field: 'field25',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명20',
      field: 'field26',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명21',
      field: 'field27',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명22',
      field: 'field28',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명23',
      field: 'field29',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명24',
      field: 'field30',
      width: attributeColumnWidth(220),
    },
    {
      headerName: '질병명25',
      field: 'field31',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명26',
      field: 'field32',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명27',
      field: 'field33',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명28',
      field: 'field34',
      width: attributeColumnWidth(130),
    },
    {
      headerName: '질병명29',
      field: 'field35',
      width: attributeColumnWidth(220),
    },
    {
      headerName: '질병명30',
      field: 'field36',
      width: attributeColumnWidth(130),
    },
  ],
  [attributeColumnWidth]
);

  const columnDefs21 = React.useMemo<ColDef<DummyDataType21>[]>(
    () => [
      {
        headerName: '질병코드',
        field: 'field2_02',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '질병명',
        field: 'field2_03',
        flex: 1,
        minWidth: attributeColumnWidth(130),
      },
      {
        headerName: '입원',
        field: 'field2_04',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '통원',
        field: 'field2_05',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '수술',
        field: 'field2_06',
        width: attributeColumnWidth(60),
      },
      {
        headerName: '완치',
        field: 'field2_07',
        width: attributeColumnWidth(60),
      },
      {
        headerName: '재발',
        field: 'field2_08',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '의료기관',
        field: 'field2_09',
        width: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType21>({ field: 'field2_09' }),
      },
      {
        headerName: '상품명',
        field: 'field2_10',
        flex: 1,
        minWidth: attributeColumnWidth(200),
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType21>({ field: 'field2_10' }),
      },
      {
        headerName: '고지유형',
        field: 'field2_11',
        width: attributeColumnWidth(140),
      },
      {
        headerName: '설계번호',
        field: 'field2_12',
        width: attributeColumnWidth(110),
      },
      {
        headerName: '입력일자',
        field: 'field2_13',
        width: attributeColumnWidth(85),
      },
    ],
    [attributeColumnWidth]
  );
  const columnDefs22 = React.useMemo<ColDef<DummyDataType22>[]>(
    () => [
      {
        headerName: '질병코드',
        field: 'field2_02',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '질병명',
        field: 'field2_03',
        flex: 1,
        minWidth: attributeColumnWidth(130),
      },
      {
        headerName: '입원',
        field: 'field2_04',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '통원',
        field: 'field2_05',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '수술',
        field: 'field2_06',
        width: attributeColumnWidth(60),
      },
      {
        headerName: '완치',
        field: 'field2_07',
        width: attributeColumnWidth(60),
      },
      {
        headerName: '재발',
        field: 'field2_08',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '의료기관',
        field: 'field2_09',
        width: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType22>({ field: 'field2_09' }),
      },
      {
        headerName: '상품명',
        field: 'field2_10',
        flex: 1,
        minWidth: attributeColumnWidth(200),
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType22>({ field: 'field2_10' }),
      },
      {
        headerName: '고지유형',
        field: 'field2_11',
        width: attributeColumnWidth(140),
      },
      {
        headerName: '설계번호',
        field: 'field2_12',
        width: attributeColumnWidth(110),
      },
      {
        headerName: '입력일자',
        field: 'field2_13',
        width: attributeColumnWidth(85),
      },
    ],
    [attributeColumnWidth]
  );
  const columnDefs23 = React.useMemo<ColDef<DummyDataType23>[]>(
    () => [
      {
        headerName: '질병코드',
        field: 'field2_02',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '질병명',
        field: 'field2_03',
        flex: 1,
        minWidth: attributeColumnWidth(130),
      },
      {
        headerName: '입원',
        field: 'field2_04',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '통원',
        field: 'field2_05',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '수술',
        field: 'field2_06',
        width: attributeColumnWidth(60),
      },
      {
        headerName: '완치',
        field: 'field2_07',
        width: attributeColumnWidth(60),
      },
      {
        headerName: '재발',
        field: 'field2_08',
        width: attributeColumnWidth(80),
      },
      {
        headerName: '의료기관',
        field: 'field2_09',
        width: attributeColumnWidth(100),
        tooltipValueGetter: createTooltipValueGetter<DummyDataType23>({ field: 'field2_09' }),
      },
      {
        headerName: '상품명',
        field: 'field2_10',
        flex: 1,
        minWidth: attributeColumnWidth(200),
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType23>({ field: 'field2_10' }),
      },
      {
        headerName: '고지유형',
        field: 'field2_11',
        width: attributeColumnWidth(140),
      },
      {
        headerName: '설계번호',
        field: 'field2_12',
        width: attributeColumnWidth(110),
      },
      {
        headerName: '입력일자',
        field: 'field2_13',
        width: attributeColumnWidth(85),
      },
    ],
    [attributeColumnWidth]
  );

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <>
      <Dialog open>
        <DialogContent showCloseButton resizable={true} size="2xl">
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
          <DialogSection className="grid-rows-[1fr]">
            <TabPager
              data={tabs}
              active={active}
              setActive={setActive}
              removable={false}
              onRemove={handleRemove}
              visibleCount={4}
              variant="default"
              getValue={(tab) => String(tab.value)}
              renderTab={(tab) => <span>{tab.label}</span>}
              renderDropdownItem={false}
            >
              {active === 'tab1' ? (
                <Grid placement="ss" className="w-full h-full pt-2 grid-rows-[auto_auto_auto]" gap={3}>
                  <TableFold className="">
                    <TableFoldHead title="일반/건강고지" />
                    <TableFoldBody>
                      <div className="ag-theme-alpine w-full radio-selection inner-scroll" data-row={rowData11.length}>
                        <AgGridReact<DummyDataType11>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={rowData11}
                          columnDefs={columnDefs11}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                            cellClass: 'text-center',
                          }}
                          // selection 설정
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
                          onCellValueChanged={onCellValueChanged11}
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
                            sortable: true,
                            resizable: true,
                            cellClass: 'text-center',
                          }}
                          // selection 설정
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
                      실제 피보험자의 상태와 다를 경우 고지위반으로 인하여 불이익을 받을 수 있으니, 심사요청에
                      피보험자에게 최종확인하셔야 합니다.
                    </Typo>
                  </Gcol>
                </Grid>
              ) : (
                <Grid placement="ss" className="w-full h-full pt-2 grid-rows-[auto_auto_auto_auto]" gap={3}>
                  {/* Tab2-1 일반고지 */}
                  <TableFold>
                    <TableFoldHead title="일반고지" />
                    <TableFoldBody>
                      <div className="ag-theme-alpine w-full inner-scroll" data-row={3}>
                        <AgGridReact<DummyDataType21>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={rowData21}
                          columnDefs={columnDefs21}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                            cellClass: 'text-center',
                          }}
                          // selection 설정
                          rowSelection={{
                            mode: 'multiRow',
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
                          onCellValueChanged={onCellValueChanged21}
                          onGridReady={(params) => {
                            syncSelectionByIsCheck(params.api, rowData21);
                          }}
                          onFirstDataRendered={(params) => {
                            syncSelectionByIsCheck(params.api, rowData21);
                          }}
                          onRowDataUpdated={(params) => {
                            syncSelectionByIsCheck(params.api, rowData21);
                          }}
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>

                  {/* Tab2-2 건강고지 */}
                  <TableFold>
                    <TableFoldHead title="건강고지" />
                    <TableFoldBody>
                      <div className="ag-theme-alpine w-full inner-scroll" data-row={3}>
                        <AgGridReact<DummyDataType22>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={rowData22}
                          columnDefs={columnDefs22}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                            cellClass: 'text-center',
                          }}
                          // selection 설정
                          rowSelection={{
                            mode: 'multiRow',
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
                          onCellValueChanged={onCellValueChanged22}
                          onGridReady={(params) => {
                            syncSelectionByIsCheck(params.api, rowData22);
                          }}
                          onFirstDataRendered={(params) => {
                            syncSelectionByIsCheck(params.api, rowData22);
                          }}
                          onRowDataUpdated={(params) => {
                            syncSelectionByIsCheck(params.api, rowData22);
                          }}
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>

                  {/* Tab2-3 간편고지 */}
                  <TableFold>
                    <TableFoldHead title="간편고지" />
                    <TableFoldBody>
                      <div className="ag-theme-alpine w-full inner-scroll" data-row={3}>
                        <AgGridReact<DummyDataType23>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={rowData23}
                          columnDefs={columnDefs23}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                            cellClass: 'text-center',
                          }}
                          // selection 설정
                          rowSelection={{
                            mode: 'multiRow',
                            checkboxes: true,
                            enableClickSelection: false,
                          }}
                          selectionColumnDef={{
                            headerName: '선택',
                            width: 30,
                            cellClass: 'text-center editable-cell',
                          }}
                          domLayout="normal"
                          onCellValueChanged={onCellValueChanged23}
                          onGridReady={(params) => {
                            syncSelectionByIsCheck(params.api, rowData23);
                          }}
                          onFirstDataRendered={(params) => {
                            syncSelectionByIsCheck(params.api, rowData23);
                          }}
                          onRowDataUpdated={(params) => {
                            syncSelectionByIsCheck(params.api, rowData23);
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
                      실제 피보험자의 상태와 다를 경우 고지위반으로 인하여 불이익을 받을 수 있으니, 심사요청에
                      피보험자에게 최종확인하셔야 합니다.
                    </Typo>
                  </Gcol>
                </Grid>
              )}
            </TabPager>
          </DialogSection>
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
