/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { createTooltipValueGetter } from '@/shared/components/agGridUtils';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout';
import { LayoutTemplate } from '@/shared/components/layout/LayoutTemplate';
import { useTabs } from '@/shared/hooks/useTabs';

import '@/shared/lib/agGridPub';

type Ltp040TabType = { name: string; value: string; label: string };

const DATA_TABS: Ltp040TabType[] = [
  { name: '추천설계명세', value: 'tab1', label: '추천설계명세' },
  { name: '추천설계조건입력 현황', value: 'tab2', label: '추천설계조건입력 현황' },
];

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

type Ltpa040DummyDataRowT1 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};

type Ltpa040DummyDataRowT2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};

type Ltpa040DummyDataRowT3 = {
  id: number;
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
};

type Ltpa040DummyDataRowT4 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};

type Ltpa040DummyDataRowT5 = {
  id: number;
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
};

type Ltpa040DummyDataRowT6 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
};

const Ltpa040DummyData: Ltpa040DummyDataRow[] = [
  {
    id: 1,
    isCheck: false,
    field01: 'YYYY-MM-DD HH:MM',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동',
    field05: '기등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 건강보험4.0',
    field10: '12',
    field11: '83000',
    field12: 'LA260326516615',
    field13: '설계중',
    field14: '14',
    field15: '120000',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'YYYY-MM-DD HH:MM',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동(8090001)',
    field05: '기등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 건강보험4.0',
    field10: '12',
    field11: '83,000원',
    field12: 'LA260326516614',
    field13: '청약중',
    field14: '14',
    field15: '120000',
  },
  {
    id: 3,
    isCheck: false,
    field01: 'YYYY-MM-DD HH:MM',
    field02: 'GA',
    field03: '대리점(3xxxxxx)',
    field04: '홍길동(8090001)',
    field05: '기등록',
    field06: '홍길순',
    field07: '사망후유, 진단비, 입원/통원',
    field08: 'LT22222_4',
    field09: '한화 시그니처 여성 간편건강보험4.0',
    field10: '12',
    field11: '83,000원',
    field12: 'LA260326516623',
    field13: '청약중',
    field14: '10',
    field15: '100000',
  },
  {
    id: 4,
    isCheck: false,
    field01: 'YYYY-MM-DD HH:MM',
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
    field12: 'LA260326516615',
    field13: '청약완료',
    field14: '9',
    field15: '140000',
  },
];

const Ltpa040DummyDataT1: Ltpa040DummyDataRowT1[] = [
  {
    id: 1,
    field01: '2026-04-13',
    field02: '282',
    field03: '82',
    field04: '29.1%',
    field05: '71',
    field06: '47',
  },
  {
    id: 2,
    field01: '2026-04-12',
    field02: '737',
    field03: '437',
    field04: '59.3%',
    field05: '334',
    field06: '119',
  },
  {
    id: 3,
    field01: '2026-04-11',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 4,
    field01: '2026-04-10',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 5,
    field01: '2026-04-09',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 6,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 7,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 8,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 9,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 10,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
  {
    id: 11,
    field01: '2026-04-06',
    field02: '0,000',
    field03: '000',
    field04: '00.0%',
    field05: '000',
    field06: '000',
  },
];

const Ltpa040DummyDataT2: Ltpa040DummyDataRowT2[] = [
  {
    id: 1,
    field01: '한화 시그니처 여성 건강보험4.0',
    field02: '1종 납입면제 강화형, 기본형[할증운영상품]',
    field03: '',
    field04: '00',
  },
  {
    id: 2,
    field01: '한화 시그니처 여성 건강보험4.0',
    field02: '1종 납입면제 강화형, 기본형[할증운영상품]',
    field03: '올인원플랜(15~40세)',
    field04: '00',
  },
  {
    id: 3,
    field01: '한화 더 경증 간편건강보험(연만기 갱신형) 2601',
    field02: '1종 해약환급금미지급형, 3.10.5간편고지형',
    field03: '올인원플랜',
    field04: '00',
  },
  {
    id: 4,
    field01: '한화 더 경증 간편건강보험(연만기 갱신형) 2601',
    field02: '1종 해약환급금미지급형, 3.10.5간편고지형',
    field03: '올인원플랜',
    field04: '00',
  },
  {
    id: 5,
    field01: '한화 더 경증 간편건강보험(연만기 갱신형) 2601',
    field02: '2종 기본형, 3.10.5간편고지형',
    field03: '',
    field04: '00',
  },
  {
    id: 6,
    field01: '한화 시그니처 여성 건강보험4.0',
    field02: '1종 납입면제 강화형, 기본형[할증운영상품]',
    field03: '',
    field04: '00',
  },
  {
    id: 7,
    field01: '한화 시그니처 여성 건강보험4.0',
    field02: '1종 납입면제 강화형, 기본형[할증운영상품]',
    field03: '올인원플랜(15~40세)',
    field04: '00',
  },
  {
    id: 8,
    field01: '한화 더 경증 간편건강보험(연만기 갱신형) 2601',
    field02: '1종 해약환급금미지급형, 3.10.5간편고지형',
    field03: '올인원플랜',
    field04: '00',
  },
  {
    id: 9,
    field01: '한화 더 경증 간편건강보험(연만기 갱신형) 2601',
    field02: '1종 해약환급금미지급형, 3.10.5간편고지형',
    field03: '올인원플랜',
    field04: '00',
  },
  {
    id: 10,
    field01: '한화 더 경증 간편건강보험(연만기 갱신형) 2601',
    field02: '2종 기본형, 3.10.5간편고지형',
    field03: '',
    field04: '00',
  },
  {
    id: 11,
    field01: '한화 더 경증 간편건강보험(연만기 갱신형) 2601',
    field02: '2종 기본형, 3.10.5간편고지형',
    field03: '',
    field04: '00',
  },
];

const Ltpa040DummyDataT3: Ltpa040DummyDataRowT3[] = [
  {
    id: 1,
    field01: '2026-04-13',
    field02: '282',
    field03: '기등록',
    field04: '200',
    field05: '50',
    field06: '150',
    field07: '00',
    field08: '30',
    field09: '100',
    field10: '50',
    field11: '20',
    field12: '180',
    field13: '10',
    field14: '10',
  },
  {
    id: 2,
    field01: '2026-04-13',
    field02: '282',
    field03: '미등록',
    field04: '82',
    field05: '12',
    field06: '70',
    field07: '00',
    field08: '10',
    field09: '50',
    field10: '22',
    field11: '00',
    field12: '60',
    field13: '6',
    field14: '6',
  },
  {
    id: 3,
    field01: '2026-04-12',
    field02: '737',
    field03: '기등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
  {
    id: 4,
    field01: '2026-04-12',
    field02: '737',
    field03: '미등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
  {
    id: 5,
    field01: '2026-04-11',
    field02: '0,003',
    field03: '기등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
  {
    id: 6,
    field01: '2026-04-11',
    field02: '0,003',
    field03: '미등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
  {
    id: 7,
    field01: '2026-04-10',
    field02: '0,002',
    field03: '기등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
  {
    id: 8,
    field01: '2026-04-10',
    field02: '0,002',
    field03: '미등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
  {
    id: 9,
    field01: '2026-04-09',
    field02: '0,001',
    field03: '기등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
  {
    id: 10,
    field01: '2026-04-09',
    field02: '0,001',
    field03: '미등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
  {
    id: 11,
    field01: '2026-04-09',
    field02: '0,001',
    field03: '기등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
  {
    id: 10,
    field01: '2026-04-09',
    field02: '0,001',
    field03: '미등록',
    field04: '0,000',
    field05: '000',
    field06: '000',
    field07: '00',
    field08: '00',
    field09: '00',
    field10: '00',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
  },
];

const Ltpa040DummyDataT4: Ltpa040DummyDataRowT4[] = [
  {
    id: 1,
    field01: '기등록',
    field02: '남',
    field03: '0~14세',
    field04: '1급',
    field05: '00',
    field06: '00',
  },
  {
    id: 2,
    field01: '기등록',
    field02: '여',
    field03: '25~59세',
    field04: '2급',
    field05: '00',
    field06: '00',
  },
  {
    id: 3,
    field01: '기등록',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 4,
    field01: '미등록',
    field02: '남',
    field03: '0~14세',
    field04: '1급',
    field05: '00',
    field06: '00',
  },
  {
    id: 5,
    field01: '미등록',
    field02: '여',
    field03: '25~59세',
    field04: '2급',
    field05: '',
    field06: '',
  },
  {
    id: 6,
    field01: '미등록',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 7,
    field01: '기등록',
    field02: '남',
    field03: '0~14세',
    field04: '1급',
    field05: '00',
    field06: '00',
  },
  {
    id: 8,
    field01: '미등록',
    field02: '여',
    field03: '25~59세',
    field04: '2급',
    field05: '',
    field06: '',
  },
  {
    id: 9,
    field01: '미등록',
    field02: '여',
    field03: '25~59세',
    field04: '2급',
    field05: '',
    field06: '',
  },
  {
    id: 10,
    field01: '미등록',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 11,
    field01: '기등록',
    field02: '남',
    field03: '0~14세',
    field04: '1급',
    field05: '00',
    field06: '00',
  },
  {
    id: 12,
    field01: '기등록',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
  },
];

const Ltpa040DummyDataT5: Ltpa040DummyDataRowT5[] = [
  {
    id: 1,
    field01: '2026-04-13',
    field02: '282',
    field03: '50',
    field04: '150',
    field05: '50',
    field06: '150',
    field07: '00',
    field08: '30',
    field09: '100',
    field10: '50',
    field11: '20',
    field12: '180',
    field13: '10',
    field14: '10',
    field15: '10',
    field16: '10',
    field17: '10',
  },
  {
    id: 2,
    field01: '2026-04-13',
    field02: '282',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 3,
    field01: '2026-04-12',
    field02: '737',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 4,
    field01: '2026-04-12',
    field02: '737',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 5,
    field01: '2026-04-11',
    field02: '000',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 6,
    field01: '2026-04-11',
    field02: '000',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 7,
    field01: '2026-04-10',
    field02: '001',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 8,
    field01: '2026-04-10',
    field02: '001',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 9,
    field01: '2026-04-09',
    field02: '002',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 10,
    field01: '2026-04-09',
    field02: '002',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 11,
    field01: '2026-04-08',
    field02: '002',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
  {
    id: 12,
    field01: '2026-04-08',
    field02: '002',
    field03: '12',
    field04: '70',
    field05: '12',
    field06: '70',
    field07: '12',
    field08: '70',
    field09: '12',
    field10: '70',
    field11: '00',
    field12: '00',
    field13: '00',
    field14: '00',
    field15: '00',
    field16: '00',
    field17: '00',
  },
];

const Ltpa040DummyDataT6: Ltpa040DummyDataRowT6[] = [
  {
    id: 1,
    field01: '적용',
    field02: '적용',
    field03: '연만기',
    field04: '표준',
    field05: '사망/후유, 진단비, 입원/통원, 수술/치료, 골절/화상, 검사/지원, 운전/비용',
    field06: '00',
    field07: '00',
  },
  {
    id: 2,
    field01: '미적용',
    field02: '미적용',
    field03: '세만기',
    field04: '간편',
    field05: '사망/후유, 진단비, 입원/통원, 수술/치료',
    field06: '00',
    field07: '00',
  },
  {
    id: 3,
    field01: '적용',
    field02: '적용',
    field03: '연만기',
    field04: '표준',
    field05: '검사/지원, 운전/비용',
    field06: '00',
    field07: '00',
  },
  {
    id: 4,
    field01: '미적용',
    field02: '미적용',
    field03: '세만기',
    field04: '간편',
    field05: '골절/화상, 검사/지원, 운전/비용',
    field06: '00',
    field07: '00',
  },
  {
    id: 5,
    field01: '적용',
    field02: '적용',
    field03: '연만기',
    field04: '표준',
    field05: '운전/비용, 검사/지원',
    field06: '00',
    field07: '00',
  },
  {
    id: 6,
    field01: '미적용',
    field02: '미적용',
    field03: '세만기',
    field04: '간편',
    field05: '사망/후유, 진단비, 입원/통원, 골절/화상, 검사/지원, 운전/비용',
    field06: '00',
    field07: '00',
  },
  {
    id: 7,
    field01: '적용',
    field02: '적용',
    field03: '연만기',
    field04: '표준',
    field05: '사망/후유, 진단비, 검사/지원, 운전/비용',
    field06: '00',
    field07: '00',
  },
  {
    id: 8,
    field01: '미적용',
    field02: '미적용',
    field03: '세만기',
    field04: '간편',
    field05: '사망/후유, 진단비, 골절/화상, 검사/지원, 운전/비용',
    field06: '00',
    field07: '00',
  },
  {
    id: 9,
    field01: '적용',
    field02: '적용',
    field03: '연만기',
    field04: '표준',
    field05: '사망/후유, 진단비, 검사/지원',
    field06: '00',
    field07: '00',
  },
  {
    id: 10,
    field01: '미적용',
    field02: '미적용',
    field03: '세만기',
    field04: '간편',
    field05: '사망/후유, 진단비, 입원/통원, 검사/지원, 운전/비용',
    field06: '00',
    field07: '00',
  },
  {
    id: 11,
    field01: '적용',
    field02: '적용',
    field03: '연만기',
    field04: '표준',
    field05: '운전/비용, 검사/지원',
    field06: '00',
    field07: '00',
  },
  {
    id: 12,
    field01: '미적용',
    field02: '미적용',
    field03: '세만기',
    field04: '간편',
    field05: '사망/후유, 진단비, 입원/통원, 운전/비용',
    field06: '00',
    field07: '00',
  },
];
export default function Ltpa040Section() {
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  const renderConsentCell = (params: ICellRendererParams<Ltpa040DummyDataRowT1>) => {
    const value = String(params.value ?? '');

    if (value === '일자') {
      return <Typo>{value}</Typo>;
    }

    return (
      <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
        {value}
      </Button>
    );
  };
  const renderConsentCellT3 = (params: ICellRendererParams<Ltpa040DummyDataRowT3>) => {
    const value = String(params.value ?? '');

    if (value === '일자') {
      return <Typo>{value}</Typo>;
    }

    return (
      <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
        {value}
      </Button>
    );
  };

  const columnDefs: (ColDef<Ltpa040DummyDataRow> | ColGroupDef<Ltpa040DummyDataRow>)[] = [
    {
      headerName: '추천설계정보',
      cellClass: 'text-center px-0!',
      autoHeight: true,
      children: [
        {
          headerName: '추천일시',
          field: 'field01',
          width: 150,
          cellClass: 'text-center',
          unSortIcon: true,
        },
        {
          headerName: '채널',
          field: 'field02',
          width: 70,
          cellClass: 'text-center',
          unSortIcon: true,
        },
        {
          headerName: '취급자',
          field: 'field03',
          width: 120,
          cellClass: 'text-center',
        },
        {
          headerName: '사용인',
          field: 'field04',
          width: 120,
          cellClass: 'text-center',
        },
        {
          headerName: '고객구분',
          field: 'field05',
          width: 90,
          cellClass: 'text-center',
        },
        {
          headerName: '고객명',
          field: 'field06',
          width: 80,
          cellClass: 'text-center',
        },
        {
          headerName: '입력조건',
          field: 'field07',
          width: 230,
          cellClass: 'text-left',
          tooltipValueGetter: createTooltipValueGetter<Ltpa040DummyDataRow>({ field: 'field07' }),
        },
        {
          headerName: '추천 설계번호',
          field: 'field08',
          width: 100,
          cellClass: 'text-center',
        },
        {
          headerName: '추천상품',
          field: 'field09',
          width: 230,
          cellClass: 'text-left',
          tooltipValueGetter: createTooltipValueGetter<Ltpa040DummyDataRow>({ field: 'field09' }),
        },
        {
          headerName: '담보수',
          field: 'field10',
          width: 80,
          cellClass: 'text-center',
        },
        {
          headerName: '보장보험료',
          field: 'field11',
          width: 100,
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
          width: 130,
          headerClass: 'ag-header-color',
          cellClass: 'text-center',
        },
        {
          headerName: '설계상태',
          field: 'field13',
          width: 100,
          headerClass: 'ag-header-color',
          cellClass: 'text-center',
        },
        {
          headerName: '설계담보수',
          field: 'field14',
          width: 100,
          headerClass: 'ag-header-color',
          cellClass: 'text-center',
        },
        {
          headerName: '보장보험료',
          field: 'field15',
          width: 100,
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

  const columnDefsT1: ColDef<Ltpa040DummyDataRowT1>[] = [
    {
      headerName: '일자',
      field: 'field01',
      flex: 1,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: renderConsentCell,
    },
    {
      headerName: '추천설계 이용건수',
      field: 'field02',
      width: 220,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '상품 선택 건수',
      field: 'field03',
      width: 400,
      cellClass: 'text-center',
      autoHeight: true,
      spanRows: true,
      cellRenderer: createFieldRenderer<Ltpa040DummyDataRowT1>('field03', 'field04', 'row'),
    },
    {
      headerName: '총 선택 건수',
      field: 'field05',
      width: 220,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '플랜 선택 건수',
      field: 'field06',
      width: 220,
      cellClass: 'text-center',
      autoHeight: true,
    },
  ];

  const columnDefsT2: ColDef<Ltpa040DummyDataRowT2>[] = [
    {
      headerName: '상품',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: renderConsentCell,
    },
    {
      headerName: '종',
      field: 'field02',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
      sortable: false,
    },
    {
      headerName: '플랜',
      field: 'field03',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
      sortable: false,
    },
    {
      headerName: '건수',
      field: 'field04',
      width: 200,
      headerClass: 'ag-header-color',
      cellClass: 'text-center',
      autoHeight: true,
      sortable: true,
    },
  ];

  const columnDefsT3: (ColDef<Ltpa040DummyDataRowT3> | ColGroupDef<Ltpa040DummyDataRowT3>)[] = [
    {
      headerName: '일자',
      field: 'field01',
      flex: 1,
      cellClass: `text-center flex! items-center! justify-center! whitespace-pre-line`,
      sortable: true,
      filter: false,
      suppressMovable: true,
      spanRows: true,
      cellRenderer: renderConsentCellT3, // 버튼 렌더러 적용
    },
    {
      headerName: '추천설계\n이용건수',
      field: 'field02',
      flex: 1,
      cellClass: `text-center flex! items-center! justify-center! whitespace-pre-line`,
      headerClass: 'ag-header-preline',
      sortable: true,
      filter: false,
      suppressMovable: true,
      spanRows: true,
    },
    {
      headerName: '고객구분',
      field: 'field03',
      width: 170,
      cellClass: 'text-center',
      spanRows: true,
      cellRenderer: createFieldRenderer<Ltpa040DummyDataRowT3>('field03', 'field04', 'row'),
    },
    {
      headerName: '성별',
      cellClass: 'text-center',
      spanRows: true,
      cellRenderer: createFieldRenderer<Ltpa040DummyDataRowT3>('field05', 'field06', 'row'),
      children: [
        {
          headerName: '남',
          field: 'field05',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center!',
          sortable: false,
        },
        {
          headerName: '여',
          field: 'field06',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center!',
          sortable: false,
        },
      ],
    },
    {
      headerName: '연령대',
      cellClass: 'text-center',
      sortable: false,
      children: [
        {
          headerName: '0~14세',
          field: 'field07',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center!',
        },
        {
          headerName: '15~24세',
          field: 'field08',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center!',
        },
        {
          headerName: '25~59세',
          field: 'field09',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center!',
        },
        {
          headerName: '60~65세',
          field: 'field10',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center!',
        },
        {
          headerName: '66세이상',
          field: 'field11',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center!',
        },
      ],
    },
    {
      headerName: '직업급수',
      cellClass: 'text-center',
      children: [
        {
          headerName: '1급',
          field: 'field12',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center! ',
        },
        {
          headerName: '2급',
          field: 'field13',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center! ',
        },
        {
          headerName: '3급',
          field: 'field14',
          width: 85,
          cellClass: 'text-center flex! items-center! justify-center!',
        },
      ],
    },
  ];

  const columnDefsT4: ColDef<Ltpa040DummyDataRowT4>[] = [
    {
      headerName: '고객구분',
      field: 'field01',
      flex: 1,
      cellClass: 'text-center',
      autoHeight: true,
      suppressMovable: true,
      spanRows: true,
    },
    {
      headerName: '성별',
      field: 'field02',
      width: 200,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '연령대',
      field: 'field03',
      width: 200,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '직업급수',
      field: 'field04',
      width: 200,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '건수',
      field: 'field05',
      width: 200,
      headerClass: 'ag-header-color',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '영업일평균',
      field: 'field06',
      width: 200,
      headerClass: 'ag-header-color',
      cellClass: 'text-center',
      autoHeight: true,
    },
  ];

  const columnDefsT5: (ColDef<Ltpa040DummyDataRowT5> | ColGroupDef<Ltpa040DummyDataRowT5>)[] = [
    {
      headerName: '일자',
      field: 'field01',
      flex: 1,
      cellClass: `text-center flex! items-center! justify-center! whitespace-pre-line`,
      sortable: true,
      filter: false,
      suppressMovable: true,
      spanRows: true,
      cellRenderer: renderConsentCellT3, // 버튼 렌더러 적용
    },
    {
      headerName: '추천설계\n이용건수',
      field: 'field02',
      flex: 1,
      cellClass: `text-center flex! items-center! justify-center! whitespace-pre-line`,
      headerClass: 'ag-header-preline',
      sortable: true,
      filter: false,
      suppressMovable: true,
      spanRows: true,
    },
    {
      headerName: '무해지',
      spanRows: true,
      children: [
        {
          headerName: '적용',
          field: 'field03',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '미적용',
          field: 'field04',
          width: 70,
          cellClass: 'text-center',
        },
      ],
    },
    {
      headerName: '납면',
      cellClass: 'text-center',
      spanRows: true,
      children: [
        {
          headerName: '적용',
          field: 'field05',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '미적용',
          field: 'field06',
          width: 70,
          cellClass: 'text-center',
        },
      ],
    },
    {
      headerName: '만기구분',
      cellClass: 'text-center',
      children: [
        {
          headerName: '연만기',
          field: 'field07',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '세만기',
          field: 'field08',
          width: 70,
          cellClass: 'text-center',
        },
      ],
    },
    {
      headerName: '고지유형',
      cellClass: 'text-center',
      children: [
        {
          headerName: '표준',
          field: 'field09',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '간편',
          field: 'field10',
          width: 70,
          cellClass: 'text-center',
        },
      ],
    },
    {
      headerName: '담보군',
      cellClass: 'text-center',
      children: [
        {
          headerName: '사망/후유',
          field: 'field11',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '진단비',
          field: 'field12',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '입원/통원',
          field: 'field13',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '수술/치료',
          field: 'field14',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '골절/화상',
          field: 'field15',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '검사/지원',
          field: 'field16',
          width: 70,
          cellClass: 'text-center',
        },
        {
          headerName: '운전/비용',
          field: 'field17',
          width: 70,
          cellClass: 'text-center',
        },
      ],
    },
  ];

  const columnDefsT6: ColDef<Ltpa040DummyDataRowT6>[] = [
    {
      headerName: '무해지',
      field: 'field01',
      width: 150,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '납면',
      field: 'field02',
      width: 150,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '만기구분',
      field: 'field03',
      width: 150,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '고지유형',
      field: 'field04',
      width: 150,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '담보군',
      field: 'field05',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<Ltpa040DummyDataRowT6>({ field: 'field05' }),
    },
    {
      headerName: '건수',
      field: 'field06',
      width: 120,
      headerClass: 'ag-header-color',
      cellClass: 'text-center',
      autoHeight: true,
      sortable: true,
    },
    {
      headerName: '영업일평균',
      field: 'field07',
      width: 120,
      headerClass: 'ag-header-color',
      cellClass: 'text-center',
      autoHeight: true,
    },
  ];

  // form event
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
  });

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '추천 설계 만족도 조사 및 활용 모니터링', pageId: 'LTPA040' }} />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={6}
            variant="default"
            hasTableBelow={true}
            error={false}
            errorMsg="에러 메시지 예시"
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            renderDropdownItem={false}
          >
            {active === 'tab1' && (
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
                        <NativeSelect
                          aria-label="연령구간 선택"
                          width={120}
                          value={form.type01}
                          onChange={(e) => setFormField('type01', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type01-1', label: '연령구간 전체' },
                            { value: 'selection2', id: 'type01-2', label: '0~14세' },
                            { value: 'selection3', id: 'type01-3', label: '15~24세' },
                            { value: 'selection4', id: 'type01-4', label: '25~59세' },
                            { value: 'selection5', id: 'type01-5', label: '60~65세' },
                            { value: 'selection6', id: 'type01-6', label: '66세이상' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect
                          aria-label="성별 선택"
                          width={120}
                          value={form.type02}
                          onChange={(e) => setFormField('type02', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type02-1', label: '전체' },
                            { value: 'selection2', id: 'type02-2', label: '남' },
                            { value: 'selection3', id: 'type02-3', label: '여' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect
                          aria-label="직업급수 선택"
                          width={120}
                          value={form.type03}
                          onChange={(e) => setFormField('type03', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type03-1', label: '직업급수 전체' },
                            { value: 'selection2', id: 'type03-2', label: '1급' },
                            { value: 'selection3', id: 'type03-3', label: '2급' },
                            { value: 'selection4', id: 'type03-4', label: '3급' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'모집자'}>
                        <NativeSelect
                          aria-label="모집자 선택"
                          width={120}
                          value={form.type04}
                          onChange={(e) => setFormField('type04', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type04-1', label: '전체' },
                            { value: 'selection2', id: 'type04-2', label: '취급직원' },
                            { value: 'selection3', id: 'type04-3', label: '사용인' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
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
                        <Input aria-label="상품코드 입력" width={120} value={''} />
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
                <div className="ag-theme-alpine radio-selection min-h-[18.4rem]">
                  <AgGridReact<Ltpa040DummyDataRow>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowData={Ltpa040DummyData}
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
                      // width: 30,
                      cellClass: 'text-center editable-cell',
                    }}
                    singleClickEdit={true}
                    rowClassRules={{}}
                    onCellValueChanged={() => {}}
                    domLayout="normal"
                  />
                </div>
              </Grid>
            )}
            {active === 'tab2' && (
              <Grid className="w-full grid-rows-[auto_1fr] gap-3 h-full">
                <Grow placement="bwe" className="w-full" variant="box-round-b">
                  <FormTable
                    variant={'none'}
                    lineTop={false}
                    caption="추천 설계조건입력 현황 조회 테이블"
                    cols={['w-1', 'w-[10rem]', 'w-1', 'w-auto']}
                  >
                    <FormRow>
                      <FormCell title={'조회조건'}>
                        <NativeSelect
                          aria-label="조회조건 선택"
                          width={120}
                          value={form.type05}
                          onChange={(e) => setFormField('type05', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type05_1', label: '선택' },
                            { value: 'selection', id: 'type05_2', label: '고객군별' },
                            { value: 'selection2', id: 'type05_3', label: '추가옵션' },
                            { value: 'selection3', id: 'type05_4', label: '상품별' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'구분'}>
                        <NativeSelect
                          aria-label="고객 선택"
                          width={120}
                          value={form.type06}
                          onChange={(e) => setFormField('type06', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type06_1', label: '고객 전체' },
                            { value: 'selection', id: 'type06_2', label: '기등록' },
                            { value: 'selection2', id: 'type06_3', label: '미등록' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect
                          aria-label="성별 선택"
                          width={120}
                          value={form.type07}
                          onChange={(e) => setFormField('type07', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type07_1', label: '성별' },
                            { value: 'selection', id: 'type07_2', label: '남' },
                            { value: 'selection2', id: 'type07_3', label: '여' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect
                          aria-label="연령대 선택"
                          width={120}
                          value={form.type08}
                          onChange={(e) => setFormField('type08', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type08_1', label: '연령대 전체' },
                            { value: 'selection', id: 'type08_2', label: '0~14세' },
                            { value: 'selection2', id: 'type08_3', label: '15~24세' },
                            { value: 'selection3', id: 'type08_4', label: '25~59세' },
                            { value: 'selection3', id: 'type08_5', label: '60~65세' },
                            { value: 'selection3', id: 'type08_6', label: '66세 이상' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect
                          aria-label="직업 선택"
                          width={120}
                          value={form.type06}
                          onChange={(e) => setFormField('type06', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type06_1', label: '직업 전체' },
                            { value: 'selection', id: 'type06_2', label: '1급' },
                            { value: 'selection2', id: 'type06_3', label: '2급' },
                            { value: 'selection3', id: 'type06_4', label: '3급' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'조회기간'}>
                        <DatePickerInput
                          mode="range"
                          onChange={() => {}}
                          rangeValue={{ from: '2026-02', to: '2026-03' }}
                          size="lg"
                        />
                        <Button
                          color={'secondary'}
                          size={'lg'}
                          variant={'outlined'}
                          onClick={() => {}}
                          aria-label="전일"
                        >
                          전일
                        </Button>
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
                <TableFold>
                  <TableFoldHead title="일자별 선택 현황" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine min-h-[33.2rem]">
                      <AgGridReact<Ltpa040DummyDataRowT1>
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        getRowId={(params) => String(params.data.id)}
                        rowData={Ltpa040DummyDataT1}
                        columnDefs={columnDefsT1}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="2026-04-13 상세 현황" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine min-h-[33.2rem]">
                      <AgGridReact<Ltpa040DummyDataRowT2>
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        getRowId={(params) => String(params.data.id)}
                        rowData={Ltpa040DummyDataT2}
                        columnDefs={columnDefsT2}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="일자별 고객군별 선택 현황" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine ag-header-preline-grid min-h-[36.8rem]">
                      <AgGridReact<Ltpa040DummyDataRowT3>
                        getRowId={(params) => String(params.data.id)}
                        rowData={Ltpa040DummyDataT3}
                        columnDefs={columnDefsT3}
                        enableCellSpan={true}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                          autoHeaderHeight: true,
                        }}
                        domLayout="normal"
                        headerHeight={29}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="2026-04-13 상세 현황" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine min-h-[33.2rem]">
                      <AgGridReact<Ltpa040DummyDataRowT4>
                        getRowId={(params) => String(params.data.id)}
                        rowData={Ltpa040DummyDataT4}
                        columnDefs={columnDefsT4}
                        enableCellSpan={true}
                        defaultColDef={{
                          sortable: true,
                          resizable: false,
                          autoHeaderHeight: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="일자별 추가옵션 선택 현황" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine ag-header-preline-grid min-h-[36.8rem]">
                      <AgGridReact<Ltpa040DummyDataRowT5>
                        getRowId={(params) => String(params.data.id)}
                        rowData={Ltpa040DummyDataT5}
                        columnDefs={columnDefsT5}
                        enableCellSpan={true}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                          autoHeaderHeight: true,
                        }}
                        domLayout="normal"
                        headerHeight={29}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="2026-04-13 상세 현황" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine min-h-[33.2rem]">
                      <AgGridReact<Ltpa040DummyDataRowT6>
                        getRowId={(params) => String(params.data.id)}
                        rowData={Ltpa040DummyDataT6}
                        columnDefs={columnDefsT6}
                        enableCellSpan={true}
                        defaultColDef={{
                          sortable: true,
                          resizable: false,
                          autoHeaderHeight: true,
                        }}
                        domLayout="normal"
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </Grid>
            )}
          </TabPager>
        }
        mainFoot={
          <MainBottom>
            {active === 'tab1' && (
              <MainBottomItem className="justify-between">
                <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'primary'} size={'xl'}>
                  추천설계상세보기
                </Button>
                <Grow gap={1}>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'primary'} size={'xl'}>
                    엑셀내려받기
                  </Button>
                </Grow>
              </MainBottomItem>
            )}
            {active === 'tab2' && (
              <MainBottomItem className="justify-end">
                <Grow gap={1}>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'primary'} size={'xl'}>
                    엑셀내려받기
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
