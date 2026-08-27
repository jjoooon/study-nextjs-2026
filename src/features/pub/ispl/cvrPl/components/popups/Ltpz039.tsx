/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';
import { AgGridEmptyComponent, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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

import '@/shared/lib/agGridPub';

// 예상 환급금 - 일반형 dummy data
type DummyDataType1 = {
  id: number;
  field01: string | number;
  field02: number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
};
// 예상 환급금 - 분리형 dummy data
type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: number;
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
};
// 태아 일반형 - 태아 피보험자의 예상환급금 - dummy data
type DummyDataType3 = {
  id: number;
  field01: string | number;
  field02: number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};
// 태아 일반형 - 태아 이외 피보험자 및 부양자의 예상환급금 - dummy data
type DummyDataType4 = {
  id: number;
  field01: string | number;
  field02: number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};
// 태아 일반형 - 예상환급금 합계 - dummy data
type DummyDataType5 = {
  id: number;
  field01: string | number;
  field02: number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
};
// 태아 분리형 - 태아 피보험자의 예상환급금 - dummy data
type DummyDataType6 = {
  id: number;
  field01: string | number;
  field02: number;
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
};
// 태아 분리형 - 태아 이외 피보험자 및 부양자의 예상환급금 - dummy data
type DummyDataType7 = {
  id: number;
  field01: string | number;
  field02: number;
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
};
// 태아 분리형 - 예상환급금 합계 - dummy data
type DummyDataType8 = {
  id: number;
  field01: string | number;
  field02: number;
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
};

// 예상 환급금 - 일반형
const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    field01: '1년',
    field02: 755000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 2,
    field01: '2년',
    field02: 100000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 3,
    field01: '3년',
    field02: 3750000,
    field03: 1000000,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 4,
    field01: '4년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 5,
    field01: '5년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 6,
    field01: '6년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 7,
    field01: '7년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 8,
    field01: '8년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 9,
    field01: '9년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 10,
    field01: '10년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 11,
    field01: '11년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
];
// 예상 환급금 - 분리형
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '만기',
    field02: 755000000,
    field03: 100000000,
    field04: 100000000,
    field05: 100000000,
    field06: 1.2,
    field07: 100000000,
    field08: 100000000,
    field09: 100000000,
    field10: 1.2,
    field11: 100000000,
    field12: 100000000,
    field13: 100000000,
    field14: 1.2,
    field15: 100000000,
    field16: 100000000,
  },
  {
    id: 2,
    field01: '1년',
    field02: 1000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
  {
    id: 3,
    field01: '2년',
    field02: 3800000,
    field03: 1000000,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
  {
    id: 4,
    field01: '3년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
  {
    id: 5,
    field01: '4년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
  {
    id: 6,
    field01: '5년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
  {
    id: 7,
    field01: '6년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
  {
    id: 8,
    field01: '7년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
  {
    id: 9,
    field01: '8년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
  {
    id: 10,
    field01: '9년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
  {
    id: 11,
    field01: '10년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1.2,
    field11: 0,
    field12: 0,
    field13: 0,
    field14: 1.2,
    field15: 0,
    field16: 0,
  },
];
// 태아 일반형 - 태아 피보험자의 예상환급금
const DummyData3: DummyDataType3[] = [
  {
    id: 1,
    field01: '출생예정일',
    field02: 755000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
  {
    id: 2,
    field01: '1년',
    field02: 1000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
  {
    id: 3,
    field01: '2년',
    field02: 3800000,
    field03: 1000000,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
  {
    id: 4,
    field01: '3년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
  {
    id: 5,
    field01: '4년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
];
// 태아 일반형 - 태아 이외 피보험자 및 부양자의 예상환급금
const DummyData4: DummyDataType4[] = [
  {
    id: 1,
    field01: '1년',
    field02: 755000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
  {
    id: 2,
    field01: '2년',
    field02: 1000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
  {
    id: 3,
    field01: '3년',
    field02: 3800000,
    field03: 1000000,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
  {
    id: 4,
    field01: '4년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
  {
    id: 5,
    field01: '5년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
  },
];
// 태아 일반형 - 예상환급금 합계
const DummyData5: DummyDataType5[] = [
  {
    id: 1,
    field01: '만기',
    field02: 755000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 2,
    field01: '1년',
    field02: 1000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 3,
    field01: '2년',
    field02: 3800000,
    field03: 1000000,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 4,
    field01: '3년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
  {
    id: 5,
    field01: '4년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
  },
];
// 태아 분리형 - 태아 피보험자의 예상환급금
const DummyData6: DummyDataType6[] = [
  {
    id: 1,
    field01: '만기',
    field02: 755000000,
    field03: 200000000,
    field04: 200000000,
    field05: 200000000,
    field06: 1.2,
    field07: 200000000,
    field08: 200000000,
    field09: 200000000,
    field10: 1.2,
    field11: 200000000,
    field12: 200000000,
    field13: 200000000,
    field14: 1.2,
    field15: 200000000,
    field16: 200000000,
  },
  {
    id: 2,
    field01: '1년',
    field02: 1000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 3,
    field01: '2년',
    field02: 3800000,
    field03: 1000000,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 4,
    field01: '3년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 5,
    field01: '4년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 6,
    field01: '5년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 7,
    field01: '6년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 8,
    field01: '7년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 9,
    field01: '8년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 10,
    field01: '9년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 11,
    field01: '10년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 12,
    field01: '11년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
];
// 태아 분리형 - 태아 이외 피보험자 및 부양자의 예상환급금
const DummyData7: DummyDataType7[] = [
  {
    id: 1,
    field01: '1년',
    field02: 755000000,
    field03: 200000000,
    field04: 200000000,
    field05: 200000000,
    field06: 1.2,
    field07: 200000000,
    field08: 200000000,
    field09: 200000000,
    field10: 1.2,
    field11: 200000000,
    field12: 200000000,
    field13: 200000000,
    field14: 1.2,
    field15: 200000000,
    field16: 200000000,
  },
  {
    id: 2,
    field01: '2년',
    field02: 1000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 3,
    field01: '3년',
    field02: 3800000,
    field03: 1000000,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 4,
    field01: '4년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 5,
    field01: '5년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 6,
    field01: '6년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 7,
    field01: '7년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 8,
    field01: '8년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 9,
    field01: '9년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 10,
    field01: '10년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 11,
    field01: '11년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 12,
    field01: '12년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 13,
    field01: '13년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 14,
    field01: '14년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
];
// 태아 분리형 - 예상환급금 합계
const DummyData8: DummyDataType8[] = [
  {
    id: 1,
    field01: '만기',
    field02: 755000000,
    field03: 100000000,
    field04: 100000000,
    field05: 100000000,
    field06: 1.2,
    field07: 100000000,
    field08: 100000000,
    field09: 100000000,
    field10: 1.2,
    field11: 100000000,
    field12: 100000000,
    field13: 100000000,
    field14: 1.2,
    field15: 100000000,
    field16: 100000000,
  },
  {
    id: 2,
    field01: '1년',
    field02: 1000000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 3,
    field01: '2년',
    field02: 3800000,
    field03: 1000000,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 4,
    field01: '3년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
  {
    id: 5,
    field01: '4년',
    field02: 755000,
    field03: 0,
    field04: 0,
    field05: 0,
    field06: 1.2,
    field07: 0,
    field08: 0,
    field09: 1000,
    field10: 1.2,
    field11: 1000,
    field12: 1000,
    field13: 1000,
    field14: 1.2,
    field15: 1000,
    field16: 1000,
  },
];

export type FetusInsuranceType =
  | 'refundGeneral' // 예상환급금 - 일반형
  | 'refundSeparated' // 예상환급금 - 분리형
  | 'fetusGeneral' // 태아 일반형 (3종 세트)
  | 'fetusSeparated' // 태아 분리형 (3종 세트)
  | 'refund'; // 하위 호환용
export type NoticeType = 'default' | 'standardRate' | 'fetusSilson';

export interface Ltpz039Props {
  isFetus?: FetusInsuranceType;
  noticeType?: NoticeType;
}

const Ltpz039 = ({ isFetus = 'refundGeneral', noticeType = 'default' }: Ltpz039Props = {}) => {
  // AgGrid Column
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 예상 환급금 - 일반형
  const columnDefs1: (ColDef<DummyDataType1> | ColGroupDef<DummyDataType1>)[] = useMemo(
    () => [
      {
        headerComponent: () => (
          <Grow className="w-full text-center" placement="cc">
            경과
            <br />
            기간
          </Grow>
        ),
        width: attributeColumnWidth(50),
        field: 'field01',
        cellClass: 'text-center',
      },
      {
        headerName: '기본계약 및 특약담보(실손의료비 제외)',
        cellClass: 'text-center',
        headerClass: 'ag-header-right-divider',
        children: [
          {
            headerName: '납입보험료',
            field: 'field02',
            flex: 1,
            minWidth: attributeColumnWidth(78),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType1>,
          },
          {
            headerName: '예상해약환급금',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field03',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType1>,
              },
              {
                headerName: '보장부분',
                field: 'field04',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType1>,
              },
              {
                headerName: '합계',
                field: 'field05',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType1>,
              },
              {
                headerName: '환급율',
                field: 'field06',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
        ],
      },
      {
        headerName: '실손의료비',
        children: [
          {
            headerName: '납입보험료',
            field: 'field07',
            flex: 1,
            minWidth: attributeColumnWidth(78),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType1>,
          },
          {
            headerName: '환급금',
            field: 'field08',
            flex: 1,
            minWidth: attributeColumnWidth(78),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType1>,
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );
  // 예상 환급금 - 분리형
  const columnDefs2: (ColDef<DummyDataType2> | ColGroupDef<DummyDataType2>)[] = useMemo(
    () => [
      {
        headerComponent: () => (
          <Grow className="w-full text-center" placement="cc">
            경과
            <br />
            기간
          </Grow>
        ),
        width: attributeColumnWidth(50),
        field: 'field01',
        cellClass: 'text-center',
      },
      {
        headerName: '기본계약 및 특약담보(실손의료비 제외)',
        cellClass: 'text-center',
        headerClass: 'ag-header-right-divider',
        children: [
          {
            headerName: '납입보험료',
            field: 'field02',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType2>,
          },
          {
            headerName: '최저보증이율 적용시',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',

            children: [
              {
                headerName: '적립부분',
                field: 'field03',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType2>,
              },
              {
                headerName: '보장부분',
                field: 'field04',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType2>,
              },
              {
                headerName: '합계',
                field: 'field05',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType2>,
              },
              {
                headerName: '환급율',
                field: 'field06',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
          {
            headerName: '2026년 2월 현재공시이율(1.5%) 적용시',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',

            children: [
              {
                headerName: '적립부분',
                field: 'field07',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType2>,
              },
              {
                headerName: '보장부분',
                field: 'field08',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType2>,
              },
              {
                headerName: '합계',
                field: 'field09',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType2>,
              },
              {
                headerName: '환급율',
                field: 'field10',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
          {
            headerName: '평균공시이율(1.5%) 적용시',
            cellClass: 'text-center',
            headerClass: 'ag-header-right-divider',

            children: [
              {
                headerName: '적립부분',
                field: 'field11',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType2>,
              },
              {
                headerName: '보장부분',
                field: 'field12',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType2>,
              },
              {
                headerName: '합계',
                field: 'field13',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType2>,
              },
              {
                headerName: '환급율',
                field: 'field14',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
        ],
      },
      {
        headerName: '실손의료비',
        children: [
          {
            headerName: '납입보험료',
            field: 'field15',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType2>,
          },
          {
            headerName: '환급금',
            field: 'field16',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType2>,
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );
  // 태아 일반형 - 태아 피보험자의 예상환급금
  const columnDefs3: (ColDef<DummyDataType3> | ColGroupDef<DummyDataType3>)[] = useMemo(
    () => [
      {
        headerComponent: () => (
          <Grow className="w-full text-center" placement="cc">
            출생예정일
            <br />
            이후
            <br />
            경과기간
          </Grow>
        ),
        width: attributeColumnWidth(80),
        field: 'field01',
        cellClass: 'text-center',
      },
      {
        headerName: '기본계약 및 특약담보(실손의료비 제외)',
        cellClass: 'text-center',
        headerClass: 'ag-header-right-divider',
        children: [
          {
            headerName: '납입보험료',
            field: 'field02',
            flex: 1,
            minWidth: attributeColumnWidth(78),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType3>,
          },
          {
            headerName: '예상해약환급금',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field03',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType3>,
              },
              {
                headerName: '보장부분',
                field: 'field04',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType3>,
              },
              {
                headerName: '합계',
                field: 'field05',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType3>,
              },
              {
                headerName: '환급율',
                field: 'field06',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );
  // 태아 일반형 - 태아 이외 피보험자 및 부양자의 예상환급금
  const columnDefs4: (ColDef<DummyDataType4> | ColGroupDef<DummyDataType4>)[] = useMemo(
    () => [
      {
        headerComponent: () => (
          <Grow className="w-full text-center" placement="cc">
            경과
            <br />
            기간
          </Grow>
        ),
        width: attributeColumnWidth(50),
        field: 'field01',
        cellClass: 'text-center',
      },
      {
        headerName: '기본계약 및 특약담보(실손의료비 제외)',
        cellClass: 'text-center',
        headerClass: 'ag-header-right-divider',
        children: [
          {
            headerName: '납입보험료',
            field: 'field02',
            flex: 1,
            minWidth: attributeColumnWidth(78),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType4>,
          },
          {
            headerName: '예상해약환급금',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field03',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType4>,
              },
              {
                headerName: '보장부분',
                field: 'field04',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType4>,
              },
              {
                headerName: '합계',
                field: 'field05',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType4>,
              },
              {
                headerName: '환급율',
                field: 'field06',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );
  // 태아 일반형 - 예상환급금 합계
  const columnDefs5: (ColDef<DummyDataType5> | ColGroupDef<DummyDataType5>)[] = useMemo(
    () => [
      {
        headerComponent: () => (
          <Grow className="w-full text-center" placement="cc">
            경과
            <br />
            기간
          </Grow>
        ),
        width: attributeColumnWidth(50),
        field: 'field01',
        cellClass: 'text-center',
      },
      {
        headerName: '기본계약 및 특약담보(실손의료비 제외)',
        cellClass: 'text-center',
        headerClass: 'ag-header-right-divider',
        children: [
          {
            headerName: '납입보험료',
            field: 'field02',
            flex: 1,
            minWidth: attributeColumnWidth(78),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType5>,
          },
          {
            headerName: '최저보증이율 적용시',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field03',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType5>,
              },
              {
                headerName: '보장부분',
                field: 'field04',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType5>,
              },
              {
                headerName: '합계',
                field: 'field05',
                flex: 1,
                minWidth: attributeColumnWidth(78),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType5>,
              },
              {
                headerName: '환급율',
                field: 'field06',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
        ],
      },
      {
        headerName: '실손의료비',
        children: [
          {
            headerName: '납입보험료',
            field: 'field07',
            flex: 1,
            minWidth: attributeColumnWidth(78),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType5>,
          },
          {
            headerName: '환급금',
            field: 'field08',
            flex: 1,
            minWidth: attributeColumnWidth(78),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType5>,
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );
  // 태아 분리형 - 태아 피보험자의 예상환급금
  const columnDefs6: (ColDef<DummyDataType6> | ColGroupDef<DummyDataType6>)[] = useMemo(
    () => [
      {
        headerComponent: () => (
          <Grow className="w-full text-center" placement="cc">
            출생예정일
            <br />
            이후
            <br />
            경과기간
          </Grow>
        ),
        width: attributeColumnWidth(65),
        field: 'field01',
        cellClass: 'text-center',
      },
      {
        headerName: '기본계약 및 특약담보(실손의료비 제외)',
        cellClass: 'text-center',
        headerClass: 'ag-header-right-divider',
        children: [
          {
            headerName: '납입보험료',
            field: 'field02',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType6>,
          },
          {
            headerName: '최저보증이율 적용시',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',

            children: [
              {
                headerName: '적립부분',
                field: 'field03',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType6>,
              },
              {
                headerName: '보장부분',
                field: 'field04',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType6>,
              },
              {
                headerName: '합계',
                field: 'field05',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType6>,
              },
              {
                headerName: '환급율',
                field: 'field06',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
          {
            headerName: '2026년 2월 현재공시이율(1.5%) 적용시',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',

            children: [
              {
                headerName: '적립부분',
                field: 'field07',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType6>,
              },
              {
                headerName: '보장부분',
                field: 'field08',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType6>,
              },
              {
                headerName: '합계',
                field: 'field09',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType6>,
              },
              {
                headerName: '환급율',
                field: 'field10',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
          {
            headerName: '평균공시이율(1.5%) 적용시',
            cellClass: 'text-center',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field11',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType6>,
              },
              {
                headerName: '보장부분',
                field: 'field12',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType6>,
              },
              {
                headerName: '합계',
                field: 'field13',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType6>,
              },
              {
                headerName: '환급율',
                field: 'field14',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
        ],
      },
      {
        headerName: '실손의료비',
        children: [
          {
            headerName: '납입보험료',
            field: 'field15',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType6>,
          },
          {
            headerName: '환급금',
            field: 'field16',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType6>,
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );
  // 태아 분리형 - 태아 이외 피보험자 및 부양자의 예상환급금
  const columnDefs7: (ColDef<DummyDataType7> | ColGroupDef<DummyDataType7>)[] = useMemo(
    () => [
      {
        headerComponent: () => (
          <Grow className="w-full text-center" placement="cc">
            경과
            <br />
            기간
          </Grow>
        ),
        width: attributeColumnWidth(50),
        field: 'field01',
        cellClass: 'text-center',
      },
      {
        headerName: '기본계약 및 특약담보(실손의료비 제외)',
        cellClass: 'text-center',
        headerClass: 'ag-header-right-divider',
        children: [
          {
            headerName: '납입보험료',
            field: 'field02',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType7>,
          },
          {
            headerName: '최저보증이율 적용시',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field03',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType7>,
              },
              {
                headerName: '보장부분',
                field: 'field04',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType7>,
              },
              {
                headerName: '합계',
                field: 'field05',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType7>,
              },
              {
                headerName: '환급율',
                field: 'field06',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
          {
            headerName: '2026년 2월 현재공시이율(1.5%) 적용시',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field07',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType7>,
              },
              {
                headerName: '보장부분',
                field: 'field08',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType7>,
              },
              {
                headerName: '합계',
                field: 'field09',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType7>,
              },
              {
                headerName: '환급율',
                field: 'field10',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
          {
            headerName: '평균공시이율(1.5%) 적용시',
            cellClass: 'text-center',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field11',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType7>,
              },
              {
                headerName: '보장부분',
                field: 'field12',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType7>,
              },
              {
                headerName: '합계',
                field: 'field13',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType7>,
              },
              {
                headerName: '환급율',
                field: 'field14',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
        ],
      },
      {
        headerName: '실손의료비',
        children: [
          {
            headerName: '납입보험료',
            field: 'field15',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType7>,
          },
          {
            headerName: '환급금',
            field: 'field16',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType7>,
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );
  // 태아 분리형 - 예상환급금 합계
  const columnDefs8: (ColDef<DummyDataType8> | ColGroupDef<DummyDataType8>)[] = useMemo(
    () => [
      {
        headerComponent: () => (
          <Grow className="w-full text-center" placement="cc">
            경과
            <br />
            기간
          </Grow>
        ),
        width: attributeColumnWidth(50),
        field: 'field01',
        cellClass: 'text-center',
      },
      {
        headerName: '기본계약 및 특약담보(실손의료비 제외)',
        cellClass: 'text-center',
        headerClass: 'ag-header-right-divider',
        children: [
          {
            headerName: '납입보험료',
            field: 'field02',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType8>,
          },
          {
            headerName: '최저보증이율 적용시',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field03',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType8>,
              },
              {
                headerName: '보장부분',
                field: 'field04',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType8>,
              },
              {
                headerName: '합계',
                field: 'field05',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType8>,
              },
              {
                headerName: '환급율',
                field: 'field06',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
          {
            headerName: '2026년 2월 현재공시이율(1.5%) 적용시',
            cellClass: 'text-right',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field07',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType8>,
              },
              {
                headerName: '보장부분',
                field: 'field08',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType8>,
              },
              {
                headerName: '합계',
                field: 'field09',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType8>,
              },
              {
                headerName: '환급율',
                field: 'field10',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
          {
            headerName: '평균공시이율(1.5%) 적용시',
            cellClass: 'text-center',
            headerClass: 'ag-header-right-divider',
            children: [
              {
                headerName: '적립부분',
                field: 'field11',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType8>,
              },
              {
                headerName: '보장부분',
                field: 'field12',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType8>,
              },
              {
                headerName: '합계',
                field: 'field13',
                flex: 1,
                minWidth: attributeColumnWidth(76),
                cellClass: 'text-right',
                valueFormatter: numberValueFormatter<DummyDataType8>,
              },
              {
                headerName: '환급율',
                field: 'field14',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                cellClass: 'text-right',
              },
            ],
          },
        ],
      },
      {
        headerName: '실손의료비',
        children: [
          {
            headerName: '납입보험료',
            field: 'field15',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType8>,
          },
          {
            headerName: '환급금',
            field: 'field16',
            flex: 1,
            minWidth: attributeColumnWidth(76),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<DummyDataType8>,
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );

  // rowSelection 사용시
  const [rowData1] = React.useState<DummyDataType1[]>(DummyData1);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);
  const [rowData3] = React.useState<DummyDataType3[]>(DummyData3);
  const [rowData4] = React.useState<DummyDataType4[]>(DummyData4);
  const [rowData5] = React.useState<DummyDataType5[]>(DummyData5);
  const [rowData6] = React.useState<DummyDataType6[]>(DummyData6);
  const [rowData7] = React.useState<DummyDataType7[]>(DummyData7);
  const [rowData8] = React.useState<DummyDataType8[]>(DummyData8);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              예상환급금(장기)
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ039)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={130} value={'LA123456789012'} readOnly variant="info" />
                  <Input aria-label="" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly variant="info" />
                </FormCell>
                <FormCell title={'경과기간세부산출(n년)'}>
                  <Checkbox color="primary" onCheckedChange={() => {}}>
                    <Typo color="default" tag="span" variant="body-lg" weight="bold">
                      ☞재조회 경과기간이 n년 단위로 산출 됨(자동실행)
                    </Typo>
                  </Checkbox>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          {(isFetus === 'refundGeneral' || isFetus === 'refund' || !isFetus) && (
            <Grid placement="ss" className="w-full grid-rows-[1fr_auto]" gap={0}>
              <div className="ag-theme-alpine inner-scroll" data-row={rowData1.length}>
                <AgGridReact<DummyDataType1>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData1}
                  columnDefs={columnDefs1}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                />
              </div>
            </Grid>
          )}
          {isFetus === 'refundSeparated' && (
            <Grid placement="ss" className="w-full grid-rows-[1fr_auto]" gap={0}>
              <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                <AgGridReact<DummyDataType2>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                />
              </div>
            </Grid>
          )}
          {isFetus === 'fetusGeneral' && (
            <Grid placement="ss" className="w-full grid-rows-[1fr_auto]" gap={3}>
              <Gcol placement="ss" gap={2}>
                {/* 태아 일반형 - 태아 피보험자의 예상환급금 */}
                <TableFold className="grid-rows-[1fr]" variant="default">
                  <TableFoldHead title="태아 피보험자의 예상환급금" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine inner-scroll" data-row={rowData3.length}>
                      <AgGridReact<DummyDataType3>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData3}
                        columnDefs={columnDefs3}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <Typo icon="info" variant="body-sm">
                  태아 피보험자 예상환급금의 경과기간은 출생예정일 기준입니다.
                </Typo>
              </Gcol>
              <Gcol placement="ss" gap={2}>
                {/* 태아 일반형 - 태아 이외 피보험자 및 부양자의 예상환급금 */}
                {/* 태아만 있는 경우 agGrid 미노출 */}
                <TableFold className="grid-rows-[1fr]" variant="default">
                  <TableFoldHead title="태아 이외 피보험자 및 부양자의 예상환급금" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine inner-scroll" data-row={rowData4.length}>
                      <AgGridReact<DummyDataType4>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData4}
                        columnDefs={columnDefs4}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <Typo icon="info" variant="body-sm">
                  태아 이외 피보험자 및 부양자 예상환급금의 경과기간은 계약일 기준입니다.
                </Typo>
              </Gcol>
              <Gcol placement="ss" gap={2}>
                {/* 태아 일반형 - 예상환급금 합계 */}
                <TableFold className="grid-rows-[1fr]" variant="default">
                  <TableFoldHead title="예상환급금 합계" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine inner-scroll" data-row={rowData5.length}>
                      <AgGridReact<DummyDataType5>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData5}
                        columnDefs={columnDefs5}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <Typo icon="info" variant="body-sm">
                  만기환급률 확인을 위한 참고용임
                </Typo>
              </Gcol>
            </Grid>
          )}
          {isFetus === 'fetusSeparated' && (
            <Grid placement="ss" className="w-full grid-rows-[1fr_auto]" gap={3}>
              <Gcol placement="ss" gap={2}>
                {/* 태아 분리형 - 태아 피보험자의 예상환급금 */}
                <TableFold className="grid-rows-[1fr]" variant="default">
                  <TableFoldHead title="태아 피보험자의 예상환급금" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine inner-scroll" data-row={rowData6.length}>
                      <AgGridReact<DummyDataType6>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData6}
                        columnDefs={columnDefs6}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <Typo icon="info" variant="body-sm">
                  태아 피보험자 예상환급금의 경과기간은 출생예정일 기준입니다.
                </Typo>
              </Gcol>
              <Gcol placement="ss" gap={2}>
                {/* 태아 분리형 - 태아 이외 피보험자 및 부양자의 예상환급금 */}
                <TableFold className="grid-rows-[1fr]" variant="default">
                  <TableFoldHead title="태아 이외 피보험자 및 부양자의 예상환급금" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine inner-scroll" data-row={rowData7.length}>
                      <AgGridReact<DummyDataType7>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData7}
                        columnDefs={columnDefs7}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <Typo icon="info" variant="body-sm">
                  태아 이외 피보험자 및 부양자 예상환급금의 경과기간은 계약일 기준입니다.
                </Typo>
              </Gcol>
              <Gcol placement="ss" gap={2}>
                {/* 태아 분리형 - 예상환급금 합계 */}
                <TableFold className="grid-rows-[1fr]" variant="default">
                  <TableFoldHead title="예상환급금 합계" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine inner-scroll" data-row={rowData8.length}>
                      <AgGridReact<DummyDataType8>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData8}
                        columnDefs={columnDefs8}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <Typo icon="info" variant="body-sm">
                  만기환급률 확인을 위한 참고용임
                </Typo>
              </Gcol>
            </Grid>
          )}
          {/* 기본 안내사항 */}
          {(noticeType === 'default' || !noticeType) && (
            <Gcol className="w-full" placement="ss" variant="box-info">
              <BulletList>
                <BulletListItem size="sm">
                  기본계약 및 특약담보(실손의료비를 제외한 갱신담보)의 납입보험료는 각 담보별 갱신 종료일까지 납입할
                  예상보험료의 합계액이며 실손의료비의 납입보험료는 재가입 이후 보험료를 제외한 최대
                  14회차(노후실손의료비 담보의 경우 2회차)까지 갱신하는 것을 가정하여 예시합니다.
                </BulletListItem>
                <BulletListItem size="sm">적용이율(평균공시이율)은 공시이율을 한도로 합니다.</BulletListItem>
                <BulletListItem size="sm">
                  평균공시이율은 전체 보험회사 공시이율의 평균으로 보험업감독규정 제 1-2조(정의) 제13호,
                  보험업감독업무시행세칙 제 4-4조(평균공시이율)의 기준에 따라 산출된 이율을 말합니다.
                </BulletListItem>
                <BulletListItem size="sm">최저보증이율은 가입설계서를 참조하시기 바랍니다.</BulletListItem>
                <BulletListItem size="sm">
                  노후실손의료비 담보 가입 시 실손의료비 항목에 노후실손의료비 보험료가 표시됩니다.
                </BulletListItem>
                <BulletListItem size="sm">
                  차도리ECO운전자보험의 ECO마일리지 할인을 신청한 경우, 실제 해지환급금은 마일리지 정산금액이 포함되어
                  환급률이 상이할 수 있습니다.
                </BulletListItem>
              </BulletList>
            </Gcol>
          )}
          {/* 적용이율이 표준이율인 경우 */}
          {noticeType === 'standardRate' && (
            <Gcol className="w-full" placement="ss" variant="box-info">
              <BulletList>
                <BulletListItem size="sm">
                  기본계약 및 특약담보(실손의료비를 제외한 갱신담보)의 납입보험료는 각 담보별 갱신 종료일까지 납입할
                  예상보험료의 합계액이며 실손의료비의 납입보험료는 재개입 이후 보험료를 제외한 최대
                  14회차(노후실손의료비 담보의 경우 2회차)까지 갱신하는 것을 가정하여 예시합니다.
                </BulletListItem>
                <BulletListItem size="sm">적용이율(표준이율, 표준이율*1.2)은 공시이율을 한도로 합니다.</BulletListItem>
                <BulletListItem size="sm">
                  &apos;표준이율&apos;이란 보험회사가 최소한 적립해야 할 보험료적립금의 계산 등을 위해 시장금리를
                  고려하여 금융감독원장이 정하는 이율을 말합니다.
                </BulletListItem>
                <BulletListItem size="sm">
                  보험업감독규정 보험상품의 공시(제7~45조)에 따라 금리연동형상품의 경우 적용이율(표준이율,
                  표준이율*1.2)에 따른 해지환급금 예시를 안내해 드립니다.
                </BulletListItem>
                <BulletListItem size="sm">최저보증이율은 가입설계서를 참조하시기 바랍니다.</BulletListItem>
                <BulletListItem size="sm">
                  노후실손의료비 담보 가입시 실손의료비 항목에 노후실손의료비 보험료가 표시됩니다.
                </BulletListItem>
              </BulletList>
            </Gcol>
          )}
          {/* 태아실손상품인 경우 */}
          {noticeType === 'fetusSilson' && (
            <Gcol className="w-full" placement="ss" variant="box-info">
              <BulletList>
                <BulletListItem size="sm">
                  태아가입의 경우 가입기간 1년은 계약시점부터 출생예정일까지 기간과 출생예정일부터 1년까지의 기간을
                  포함합니다.
                </BulletListItem>
              </BulletList>
            </Gcol>
          )}
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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

export default Ltpz039;
