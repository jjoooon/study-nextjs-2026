/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { createTooltipValueGetter } from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { HeaderWithUnit } from '@grid/HeadRenderers';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

import '@/shared/lib/agGridPub';

// dummy data
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

type Ltpa040DummyDataRowT7 = {
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
    field05: '사망/후유, 진단비, 입원/통원, 수술/치료, 골절/화상, 검사/지원',
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
    field05: '검사/지원',
    field06: '00',
    field07: '00',
  },
  {
    id: 4,
    field01: '미적용',
    field02: '미적용',
    field03: '세만기',
    field04: '간편',
    field05: '골절/화상, 검사/지원',
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
    field05: '사망/후유, 진단비, 입원/통원, 골절/화상, 검사/지원',
    field06: '00',
    field07: '00',
  },
  {
    id: 7,
    field01: '적용',
    field02: '적용',
    field03: '연만기',
    field04: '표준',
    field05: '사망/후유, 진단비, 검사/지원',
    field06: '00',
    field07: '00',
  },
  {
    id: 8,
    field01: '미적용',
    field02: '미적용',
    field03: '세만기',
    field04: '간편',
    field05: '사망/후유, 진단비, 골절/화상, 검사/지원',
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
    field05: '사망/후유, 진단비, 입원/통원, 검사/지원',
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
    field05: '사망/후유, 진단비, 입원/통원',
    field06: '00',
    field07: '00',
  },
];

const Ltpa040DummyDataT7: Ltpa040DummyDataRowT7[] = [
  {
    id: 1,
    field01: '한화 시그니처 여성 건강보험4.0',
    field02: '1종 납입면제 강화형, 기본형(할증운영상품)',
    field03: '10',
    field04: '10',
    field05: '10',
    field06: '10',
    field07: '10',
    field08: '10',
    field09: '10',
    field10: '10',
    field11: '10',
    field12: '10',
    field13: '10',
    field14: '10',
    field15: '10',
    field16: '130',
    field17: '00',
  },
  {
    id: 2,
    field01: '한화 더 경증 간편건강보험(연만기 갱신형) 2601',
    field02: '1종 해약환급금미지급형 3.105간편고지형',
    field03: '10',
    field04: '10',
    field05: '10',
    field06: '10',
    field07: '10',
    field08: '10',
    field09: '10',
    field10: '10',
    field11: '10',
    field12: '10',
    field13: '10',
    field14: '10',
    field15: '10',
    field16: '130',
    field17: '00',
  },
  {
    id: 3,
    field01: '한화 3N5 더 간편건강보험(세만기형) 2604',
    field02: '',
    field03: '10',
    field04: '10',
    field05: '10',
    field06: '10',
    field07: '10',
    field08: '10',
    field09: '10',
    field10: '10',
    field11: '10',
    field12: '10',
    field13: '10',
    field14: '10',
    field15: '10',
    field16: '130',
    field17: '00',
  },
  {
    id: 4,
    field01: '한화 3N5 더 간편건강보험(연만기 갱신형) 2604',
    field02: '',
    field03: '10',
    field04: '10',
    field05: '10',
    field06: '10',
    field07: '10',
    field08: '10',
    field09: '10',
    field10: '10',
    field11: '10',
    field12: '10',
    field13: '10',
    field14: '10',
    field15: '10',
    field16: '130',
    field17: '00',
  },
  {
    id: 5,
    field01: '한화 굿밸런스 종합보험(연만기 갱신형) 2604',
    field02: '',
    field03: '10',
    field04: '10',
    field05: '10',
    field06: '10',
    field07: '10',
    field08: '10',
    field09: '10',
    field10: '10',
    field11: '10',
    field12: '10',
    field13: '10',
    field14: '10',
    field15: '10',
    field16: '130',
    field17: '00',
  },
  {
    id: 6,
    field01: '한화 더 경증 간편건강보험(연만기 갱신형) 2604',
    field02: '',
    field03: '10',
    field04: '10',
    field05: '10',
    field06: '10',
    field07: '10',
    field08: '10',
    field09: '10',
    field10: '10',
    field11: '10',
    field12: '10',
    field13: '10',
    field14: '10',
    field15: '10',
    field16: '130',
    field17: '00',
  },
  {
    id: 7,
    field01: '',
    field02: '',
    field03: '10',
    field04: '10',
    field05: '10',
    field06: '10',
    field07: '10',
    field08: '10',
    field09: '10',
    field10: '10',
    field11: '10',
    field12: '10',
    field13: '10',
    field14: '10',
    field15: '10',
    field16: '130',
    field17: '00',
  },
];

const Ltpa04002 = () => {
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

  const columnDefsT1: ColDef<Ltpa040DummyDataRowT1>[] = [
    {
      headerName: '일자',
      field: 'field01',
      flex: 1,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: renderConsentCell,
      unSortIcon: true,
    },
    {
      headerName: '추천설계 이용건수',
      field: 'field02',
      width: 220,
      cellClass: 'text-center',
      autoHeight: true,
      unSortIcon: true,
    },
    {
      headerName: '상품 선택 건수',
      field: 'field03',
      width: 400,
      cellClass: 'text-center',
      autoHeight: true,
      spanRows: true,
      cellRenderer: createFieldRenderer<Ltpa040DummyDataRowT1>('field03', 'field04', 'row'),
      unSortIcon: true,
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
      cellClass: 'text-left',
      autoHeight: true,
      unSortIcon: true,
    },
    {
      headerName: '종',
      field: 'field02',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
    },
    {
      headerName: '플랜',
      field: 'field03',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
    },
    {
      headerName: '건수',
      field: 'field04',
      width: 200,
      headerClass: 'ag-header-color',
      cellClass: 'text-center',
      autoHeight: true,
      unSortIcon: true,
    },
  ];

  const columnDefsT3: (ColDef<Ltpa040DummyDataRowT3> | ColGroupDef<Ltpa040DummyDataRowT3>)[] = [
    {
      headerName: '일자',
      field: 'field01',
      flex: 1,
      filter: false,
      suppressMovable: true,
      spanRows: true,
      autoHeight: true,
      unSortIcon: true,
      cellRenderer: renderConsentCellT3, // 버튼 렌더러 적용
    },
    {
      headerComponent: HeaderWithUnit,
      headerComponentParams: {
        label: '추천설계',
        unit: '이용건수',
        col: true,
        view: true,
        unitClassName: 'text-[1.3rem]',
      },
      field: 'field02',
      flex: 1,
      filter: false,
      suppressMovable: true,
      autoHeight: true,
      spanRows: true,
      unSortIcon: true,
    },
    {
      headerName: '고객구분',
      field: 'field03',
      width: 170,
      spanRows: true,
      cellRenderer: createFieldRenderer<Ltpa040DummyDataRowT3>('field03', 'field04', 'row'),
    },
    {
      headerName: '성별',
      spanRows: true,
      cellRenderer: createFieldRenderer<Ltpa040DummyDataRowT3>('field05', 'field06', 'row'),
      children: [
        {
          headerName: '남',
          field: 'field05',
          width: 85,
        },
        {
          headerName: '여',
          field: 'field06',
          width: 85,
        },
      ],
    },
    {
      headerName: '연령대',
      cellClass: 'text-center',
      children: [
        {
          headerName: '0~14세',
          field: 'field07',
          width: 85,
        },
        {
          headerName: '15~24세',
          field: 'field08',
          width: 85,
        },
        {
          headerName: '25~59세',
          field: 'field09',
          width: 85,
        },
        {
          headerName: '60~65세',
          field: 'field10',
          width: 85,
        },
        {
          headerName: '66세이상',
          field: 'field11',
          width: 85,
        },
      ],
    },
    {
      headerName: '직업급수',
      children: [
        {
          headerName: '1급',
          field: 'field12',
          width: 85,
        },
        {
          headerName: '2급',
          field: 'field13',
          width: 85,
        },
        {
          headerName: '3급',
          field: 'field14',
          width: 85,
        },
      ],
    },
  ];

  const columnDefsT4: ColDef<Ltpa040DummyDataRowT4>[] = [
    {
      headerName: '고객구분',
      field: 'field01',
      flex: 1,
      autoHeight: true,
      suppressMovable: true,
      spanRows: true,
    },
    {
      headerName: '성별',
      field: 'field02',
      width: 200,
      autoHeight: true,
    },
    {
      headerName: '연령대',
      field: 'field03',
      width: 200,
      autoHeight: true,
    },
    {
      headerName: '직업급수',
      field: 'field04',
      width: 200,
      autoHeight: true,
    },
    {
      headerName: '건수',
      field: 'field05',
      width: 200,
      headerClass: 'ag-header-color',
      autoHeight: true,
    },
    {
      headerName: '영업일평균',
      field: 'field06',
      width: 200,
      headerClass: 'ag-header-color',
      autoHeight: true,
    },
  ];

  const columnDefsT5: (ColDef<Ltpa040DummyDataRowT5> | ColGroupDef<Ltpa040DummyDataRowT5>)[] = [
    {
      headerName: '일자',
      field: 'field01',
      flex: 1,
      filter: false,
      suppressMovable: true,
      spanRows: true,
      unSortIcon: true,
      cellRenderer: renderConsentCellT3, // 버튼 렌더러 적용
    },
    {
      headerComponent: HeaderWithUnit,
      headerComponentParams: {
        label: '추천설계',
        unit: '이용건수',
        col: true,
        view: true,
        unitClassName: 'text-[1.3rem]',
      },
      field: 'field02',
      flex: 1,
      filter: false,
      suppressMovable: true,
      autoHeight: true,
      spanRows: true,
      unSortIcon: true,
    },
    {
      headerName: '무해지',
      spanRows: true,
      children: [
        {
          headerName: '적용',
          field: 'field03',
          width: 70,
        },
        {
          headerName: '미적용',
          field: 'field04',
          width: 70,
        },
      ],
    },
    {
      headerName: '납면',
      spanRows: true,
      children: [
        {
          headerName: '적용',
          field: 'field05',
          width: 70,
        },
        {
          headerName: '미적용',
          field: 'field06',
          width: 70,
        },
      ],
    },
    {
      headerName: '만기구분',
      children: [
        {
          headerName: '연만기',
          field: 'field07',
          width: 70,
        },
        {
          headerName: '세만기',
          field: 'field08',
          width: 70,
        },
      ],
    },
    {
      headerName: '고지유형',
      children: [
        {
          headerName: '표준',
          field: 'field09',
          width: 70,
        },
        {
          headerName: '간편',
          field: 'field10',
          width: 70,
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
        },
        {
          headerName: '진단비',
          field: 'field12',
          width: 70,
        },
        {
          headerName: '입원/통원',
          field: 'field13',
          width: 70,
        },
        {
          headerName: '수술/치료',
          field: 'field14',
          width: 70,
        },
        {
          headerName: '골절/화상',
          field: 'field15',
          width: 70,
        },
        {
          headerName: '검사/지원',
          field: 'field16',
          width: 70,
        },
      ],
    },
  ];

  const columnDefsT6: ColDef<Ltpa040DummyDataRowT6>[] = [
    {
      headerName: '무해지',
      field: 'field01',
      width: 150,
      autoHeight: true,
    },
    {
      headerName: '납면',
      field: 'field02',
      width: 150,
      autoHeight: true,
    },
    {
      headerName: '만기구분',
      field: 'field03',
      width: 150,
      autoHeight: true,
    },
    {
      headerName: '고지유형',
      field: 'field04',
      width: 150,
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
      autoHeight: true,
      unSortIcon: true,
    },
    {
      headerName: '영업일평균',
      field: 'field07',
      width: 120,
      headerClass: 'ag-header-color',
      autoHeight: true,
    },
  ];

  const columnDefsT7: (ColDef<Ltpa040DummyDataRowT7> | ColGroupDef<Ltpa040DummyDataRowT7>)[] = [
    {
      headerName: '상품',
      field: 'field01',
      width: 330,
      cellClass: 'text-left',
      autoHeight: true,
      unSortIcon: true,
      tooltipValueGetter: createTooltipValueGetter<Ltpa040DummyDataRowT7>({ field: 'field01' }),
    },
    {
      headerName: '종',
      field: 'field02',
      width: 280,
      cellClass: 'text-left',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<Ltpa040DummyDataRowT7>({ field: 'field02' }),
    },
    {
      headerName: '04',
      autoHeight: true,
      children: [
        {
          headerName: '1',
          field: 'field03',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '2',
          field: 'field04',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '3',
          field: 'field05',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '4',
          field: 'field06',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '5',
          field: 'field07',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '6',
          field: 'field08',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '7',
          field: 'field09',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '8',
          field: 'field10',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '9',
          field: 'field11',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '10',
          field: 'field12',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '11',
          field: 'field13',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '12',
          field: 'field14',
          flex: 1,
          autoHeight: true,
        },
        {
          headerName: '13',
          field: 'field15',
          flex: 1,
          autoHeight: true,
        },
      ],
    },
    {
      headerName: '계',
      field: 'field16',
      flex: 1,
      autoHeight: true,
      unSortIcon: true,
    },
    {
      headerName: '영업일 평균',
      field: 'field17',
      width: 70,
      headerClass: 'ag-header-color',
      autoHeight: true,
    },
  ];

  const [searchInput, setSearchInput] = useState('선택');

  return (
    <Grid className="w-full grid-rows-[auto_1fr] gap-3 h-full">
      <Grow placement="bwe" className="w-full" variant="box-round-b">
        <FormTable
          variant={'head'}
          lineTop={false}
          caption="추천 설계조건입력 현황 조회 테이블"
          cols={['w-1', 'w-auto', 'w-1', 'w-auto']}
        >
          <FormRow>
            <FormCell title={'조회조건'} colSpan={searchInput === '선택' ? 3 : 1}>
              <NativeSelect
                aria-label="조회조건 선택"
                width={120}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              >
                {[
                  { value: '선택', label: '선택' },
                  { value: '고객군별', label: '고객군별' },
                  { value: '추가옵션', label: '추가옵션' },
                  { value: '상품별', label: '상품별' },
                ].map((option, idx) => (
                  <NativeSelectOption key={'se' + idx} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            {searchInput === '고객군별' && (
              <FormCell title={'구분'}>
                <NativeSelect aria-label="고객 선택" width={120} value={''} onChange={() => {}}>
                  {[
                    { value: '고객 전체', id: 'type06_1', label: '고객 전체' },
                    { value: '기등록', id: 'type06_2', label: '기등록' },
                    { value: '미등록', id: 'type06_3', label: '미등록' },
                  ].map((option, idx) => (
                    <NativeSelectOption key={'se' + idx} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                <NativeSelect aria-label="성별 선택" width={120} value={''} onChange={() => {}}>
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
                <NativeSelect aria-label="연령대 선택" width={120} value={''} onChange={() => {}}>
                  {[
                    { value: '연령대 전체', id: 'type08_1', label: '연령대 전체' },
                    { value: '0~14세', id: 'type08_2', label: '0~14세' },
                    { value: '15~24세', id: 'type08_3', label: '15~24세' },
                    { value: '25~59세', id: 'type08_4', label: '25~59세' },
                    { value: '60~65세', id: 'type08_5', label: '60~65세' },
                    { value: '66세 이상', id: 'type08_6', label: '66세 이상' },
                  ].map((option) => (
                    <NativeSelectOption key={option.id} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                <NativeSelect aria-label="직업 선택" width={120} value={''} onChange={() => {}}>
                  {[
                    { value: '직업 전체', label: '직업 전체' },
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
            )}
            {searchInput === '상품별' && (
              <FormCell title={'상품'}>
                <NativeSelect aria-label="상품명 선택" width={120} value={''} onChange={() => {}}>
                  {[
                    { value: '상품명', label: '상품명' },
                    { value: '상품코드', label: '상품코드' },
                  ].map((option, idx) => (
                    <NativeSelectOption key={'se' + idx} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                <Input aria-label="상품명 입력" width={200} value={''} />
                <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                  <SearchIcon color={'var(--color-primary-50)'} />
                </Button>
                <Checkbox
                  color="primary"
                  errorMsg="선택은 필수입니다."
                  errorPs="bl"
                  onCheckedChange={() => {}}
                  size="lg"
                  variant="default"
                >
                  총 포함
                </Checkbox>
              </FormCell>
            )}
          </FormRow>
          <FormRow>
            <FormCell title={'조회기간'}>
              <DatePickerInput
                mode="range"
                onChange={() => {}}
                rangeValue={{ from: '2026-02', to: '2026-03' }}
                size="lg"
              />
              <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}} aria-label="전일">
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
                cellClass: 'text-center',
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
                cellClass: 'text-center',
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
                cellClass: 'text-center flex justify-center tems-center',
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
            <AgGridReact<Ltpa040DummyDataRowT4>
              getRowId={(params) => String(params.data.id)}
              rowData={Ltpa040DummyDataT4}
              columnDefs={columnDefsT4}
              enableCellSpan={true}
              defaultColDef={{
                sortable: true,
                resizable: false,
                cellClass: 'text-center',
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
                cellClass: 'text-center',
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
            <AgGridReact<Ltpa040DummyDataRowT6>
              getRowId={(params) => String(params.data.id)}
              rowData={Ltpa040DummyDataT6}
              columnDefs={columnDefsT6}
              enableCellSpan={true}
              defaultColDef={{
                sortable: true,
                resizable: true,
                cellClass: 'text-center',
              }}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </TableFoldBody>
      </TableFold>
      <TableFold>
        <TableFoldHead title="일자별 추가옵션 선택 현황" />
        <TableFoldBody>
          <div className="ag-theme-alpine min-h-[33.2rem]">
            <AgGridReact<Ltpa040DummyDataRowT7>
              getRowId={(params) => String(params.data.id)}
              rowData={Ltpa040DummyDataT7}
              columnDefs={columnDefsT7}
              enableCellSpan={true}
              defaultColDef={{
                sortable: true,
                resizable: true,
                cellClass: 'text-center',
              }}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </TableFoldBody>
      </TableFold>
    </Grid>
  );
};

export default Ltpa04002;
