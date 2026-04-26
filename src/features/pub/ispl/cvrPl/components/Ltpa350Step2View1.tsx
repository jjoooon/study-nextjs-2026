'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import type {
  CellClassParams,
  ColDef,
  GridApi,
  ICellRendererParams,
  SelectionChangedEvent,
  IGroupCellRendererParams,
  EditableCallbackParams,
  CellEditorSelectorResult,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Accordion } from '@/shared/components/uiux/Accordion';
import { useTabs } from '@/shared/hooks/useTabs';
import {
  CoveragePopover,
  createCellClickSelectionToggleHandler,
  createCellErrorClassRules,
  createInsertCopiedRowButtonCellRenderer,
  createSelectionChangedHandler,
  editableSelectCellRenderer,
  numberValueFormatter,
  useDynamicColumnWidths,
  AgGridEmptyComponent,
  AmountWithPopoverCellEditor,
} from '@aggrid';
import { Divider, Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputHash } from '@common/InputHash';
import { KeyValueList } from '@common/KeyValueList';
import { LayoutScrollItem, LayoutScrollWrap } from '@common/LayoutScroll';
import { SelectDrop } from '@common/SelectDrop';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { ChevronDownIcon, PaperIcon, ResetIcon, SaveIcon, SearchIcon, SizeIcon, SizeOffIcon } from '@icons';
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

import '@/shared/lib/agGridPub';

interface TabDataType {
  id: string | number;
  name?: string;
  age?: string | number;
  gender?: string;
  value: string;
  error?: boolean;
  info: string[];
}
const TabData: TabDataType[] = [
  {
    id: 1,
    name: '홍길동',
    age: '1',
    gender: '여',
    value: 'tab1',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 2,
    name: '목적물',
    age: '1',
    gender: '',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 3,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 4,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 5,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 6,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 7,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 8,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 9,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 10,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 11,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 12,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 13,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 14,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 15,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 16,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 17,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 18,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 19,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 20,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 21,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
];

interface DummyDataType {
  id: number;
  isChecked?: boolean;
  isStandard?: {
    group: boolean;
    edit: boolean;
  }; // [isStandard, 기준이 되는 필드명]
  num: number | null;
  field1?: string | number | boolean;
  field2?: string | number | boolean;
  field3?: string | number | boolean | string[];
  isSelectedField3?: boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;
  field9?: string | number | boolean;
  field10?: {
    title: string;
    description: string;
    info: string[];
  };

  filePath?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
  isError?: boolean;
  badge?: string[];
  [key: string]: unknown;
}
const DummyData: DummyDataType[] = [
  {
    id: 1,
    num: 1,
    filePath: ['set-1'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    field1:
      '무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험',
    field2: true,
    field3: '5000',
    isSelectedField3: false,
    field4: 4500,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 1000,
    field8: '인수가능',
    field9: true,
    field10: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: true,
    isHighlighted: true,
    badge: ['독립', '갱신', '배타', '미래'],
    isError: false,
  },
  {
    id: 2,
    num: 2,
    filePath: ['set-2'],
    isChecked: false,
    isStandard: {
      group: false,
      edit: false,
    },
    field1: '무배당 KB손해보험 암보험',
    field2: true,
    field3: '3400',
    isSelectedField3: false,
    field4: 2800,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 8000,
    field8: '인수불가',
    field9: true,
    field10: {
      title: '담보명 1특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['갱신'],
    isError: false,
  },
  {
    id: 3,
    num: 123,
    filePath: ['set-123'],
    isChecked: false,
    isStandard: {
      group: true,
      edit: false,
    },
    field1: '유방암(수용체타입)진단비',
    field2: false,
    field3: '4400',
    isSelectedField3: false,
    field4: 380,
    field5: '80세',
    isEditedField5: true,
    field6: '20년',
    isEditedField6: true,
    field7: 120,
    field8: '조건부인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 4,
    num: null,
    filePath: ['set-123', 'set-123-1'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: true,
    },

    field1: '유방암A타입진단비(호르몬수용체양성,HER2음성)',
    field2: false,
    field3: '4400',
    isSelectedField3: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 5,
    num: null,
    filePath: ['set-123', 'set-123-2'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: false,
    },

    field1: '유방암B타입진단비(호르몬수용체양성,HER2양성)',
    field2: false,
    field3: '4400',
    isSelectedField3: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 6,
    num: 230,
    filePath: ['set-230'],
    isChecked: false,
    isStandard: {
      group: true,
      edit: false,
    },

    field1: '주요순환계질환Ⅰ특정치료비(요양병원제외,각연간1회한)',
    field2: false,
    field3: '5460',
    isSelectedField3: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 7,
    num: null,
    filePath: ['set-230', 'set-230-1'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: true,
    },
    field1: '주요순환계질환Ⅰ특정치료비(수술(혈전제거술제외))(요양병원제외,－연간1회한)',
    field2: false,
    field3: '1천만원',
    isSelectedField3: true,
    field4: '380',
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 8,
    num: null,
    filePath: ['set-230', 'set-230-2'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: false,
    },

    field1: '주요순환계질환Ⅰ특정치료비(혈전제거술)(요양병원제외,연간1회한)',
    field2: false,
    field3: '4400',
    isSelectedField3: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 9,
    num: 231,
    filePath: ['set-231'],
    isChecked: false,
    isStandard: {
      group: false,
      edit: false,
    },

    field1: '무배당 현대해상 3대질병보험',
    field2: false,
    field3: '5460',
    isSelectedField3: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 10,
    num: null,
    filePath: ['set-231', 'set-231-1'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },
    field1: '- 무배당 현대해상 3대질병보험',
    field2: false,
    field3: '1400',
    isSelectedField3: false,
    field4: '380',
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 11,
    num: null,
    filePath: ['set-231', 'set-231-2'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    field1: '- 무배당 현대해상 3대질병보험',
    field2: false,
    field3: '4400',
    isSelectedField3: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
];

type PlanAccordionItem = {
  value: string;
  trigger: string;
  content: string[];
};
const planAccordionItems: PlanAccordionItem[] = [
  {
    value: 'item-1',
    trigger: '기관플랜(5)',
    content: [
      '(지점)올인원플랜(15~40세)',
      '(지점)올인원플랜(15~40세)',
      '(지점)올인원플랜(15~40세)',
      '(지점)올인원플랜(15~40세)',
    ],
  },
  {
    value: 'item-2',
    trigger: '기관플랜(0)',
    content: ['(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)'],
  },
  {
    value: 'item-3',
    trigger: '모집자플랜(0)',
    content: ['(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)'],
  },
];

type AgGridRow = DummyDataType & {
  isDuplicate?: boolean;
  displayNo?: number;
  badge?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
};

interface Ltpa350Step2Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
}

export function Ltpa350Step2View1({ onSelectPlan, isWidthExpanded = false, setIsWidthExpanded }: Ltpa350Step2Props) {
  // 1) INLINED STATE (default)
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false, reset: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap((map) => ({ ...map, [key]: !!checked }));
  };
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 2) Tabs/rowData 분기
  const tabListData = TabData;
  const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({
    ...item,
    value: String(item.id),
  }));
  const { tabs: Tabs, active: TabActive, setActive: TabSetActive } = useTabs<TabDataType>(stringifiedTabs);

  // 3) Grid data
  const [rowData, setRowData] = useState<AgGridRow[]>(DummyData);

  // 중복 행 자동 선택 / 선택 해제 시 삭제 추적
  const pendingSelectIdRef = useRef<number | null>(null);
  const prevSelectedIdsRef = useRef<Set<number>>(new Set());

  // setRowData를 래핑하여 새로 삽입된 중복 행 id를 pendingSelectIdRef에 저장
  const setRowDataWithTracking = useCallback((updater: AgGridRow[] | ((prev: AgGridRow[]) => AgGridRow[])) => {
    setRowData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (next.length > prev.length) {
        const prevIds = new Set(prev.map((r) => r.id));
        const newDuplicate = next.find((r) => !prevIds.has(r.id) && r.isDuplicate);
        if (newDuplicate) {
          pendingSelectIdRef.current = newDuplicate.id;
        }
      }
      return next;
    });
  }, []);

  // ── 담보명 열 (field1) ────────────────────────────────────────────────────────
  // 헤더: 선택/미선택 카운트 체크박스 + 담보명 검색 입력 + 말풍선 토글
  const [coverageName, setCoverageName] = useState('');
  const productNameHeader = useCallback(() => {
    const handleTooltipCheck = (checked: boolean | 'indeterminate') => {
      setShowProductNameTooltip(!!checked);
    };
    return (
      <Grow className="w-full px-[0.6rem]" placement={'cc'} gap={4}>
        <Grow gap={1.5} placement={'sc'}>
          <Checkbox variant={'text'} checked={checkedMap.selected} onCheckedChange={handleCheckedChange('selected')}>
            선택 24건
          </Checkbox>
          <Divider />
          <Checkbox
            variant={'text'}
            checked={checkedMap.unselected}
            onCheckedChange={handleCheckedChange('unselected')}
          >
            미선택
          </Checkbox>
          <Divider />
          <Checkbox variant={'text'} checked={checkedMap.reset} onCheckedChange={handleCheckedChange('reset')}>
            담보초기화
          </Checkbox>
        </Grow>
        <Grow>
          <Input
            aria-label="담보명"
            placeholder="담보명 입력"
            width={'full'}
            size={'sm'}
            // clear={true}
            value={coverageName}
            onChange={(e) => setCoverageName(e.target.value)}
          />
          <Button aria-label="담보명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
          <Button aria-label="담보명 초기화" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <ResetIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
        <Grow placement={'sc'}>
          <Checkbox size={'md'} checked={showProductNameTooltip} onCheckedChange={handleTooltipCheck}>
            담보명 말풍선
          </Checkbox>
        </Grow>
      </Grow>
    );
  }, [checkedMap, coverageName, showProductNameTooltip]);
  const productNameCellRnderer = (params: IGroupCellRendererParams<AgGridRow> & ICellRendererParams<AgGridRow>) => {
    const api = params.api;
    const allRows: AgGridRow[] = [];
    api.forEachNode((node) => {
      if (node.data) allRows.push(node.data);
    });
    const originals = allRows.filter((r) => !r.isDuplicate);

    // 원본 행의 id → 순번 매핑
    const idToOrder = new Map<number, number>();
    originals.forEach((row, idx) => {
      idToOrder.set(row.id, idx + 1);
    });

    if (!params.data || !params.data.isDuplicate) {
      return (
        <Grow className="h-full pr-1.5" placement={'bwc'}>
          <Grow className="border-r border-(--color-gray-10) h-full items-center w-[3rem] justify-center">
            <span>{params.data?.num}</span>
          </Grow>
          <CoveragePopover text={String(params.data?.field1 ?? '')} data={params.data?.field10} />
          {Array.isArray(params.data?.badge) && params.data.badge.length > 0 && (
            <Grow className="shrink-0">
              {params.data.badge.includes('미래') && (
                <Badge variant={'dark'} color={'green'} className="w-[3rem]">
                  미래
                </Badge>
              )}
              {params.data.badge.includes('갱신') && (
                <Badge variant={'dark'} color={'blue'} className="w-[3rem]">
                  갱신
                </Badge>
              )}
              {params.data.badge.includes('배타') && (
                <Badge variant={'dark'} color={'primary'} className="w-[3rem]">
                  배타
                </Badge>
              )}
              {params.data.badge.includes('독립') && (
                <Badge variant={'dark'} color={'purple'} className="w-[3rem]">
                  독립
                </Badge>
              )}
            </Grow>
          )}
        </Grow>
      );
    } else {
      const originId = params.data.displayNo;
      const order = originId !== undefined ? (idToOrder.get(originId) ?? '') : '';
      return (
        <Grow className="h-full pr-1.5" placement={'bwc'}>
          <Grow className="border-r border-(--color-gray-10) h-full items-center w-[3rem] justify-center">
            <span>{order}</span>
          </Grow>
          <p className="truncate-no w-full pl-1.5 flex-1">{params.data?.field1 ?? ''}</p>
          {Array.isArray(params.data?.badge) && params.data.badge.length > 0 && (
            <Grow className="shrink-0">
              {params.data.badge.includes('독립') && (
                <Badge color={'green'} className="w-[3rem]">
                  독립
                </Badge>
              )}
              {params.data.badge.includes('갱신') && (
                <Badge color={'blue'} className="w-[3rem]">
                  갱신
                </Badge>
              )}
            </Grow>
          )}
        </Grow>
      );
    }
  };

  // 셀: 속성 값이 있을 때 돋보기 아이콘 버튼 표시
  const searchButtonRenderer = (params: ICellRendererParams<AgGridRow>) => {
    if (!params.value) return null;
    return (
      <div className="flex flex-wrap gap-1 justify-center items-center w-full h-full">
        <Button
          only={'icon'}
          variant={'none'}
          size={'sm'}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </div>
    );
  };

  // 셀: 드롭다운 선택 렌더러 정렬 및 아이콘생성
  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<AgGridRow>) =>
        editableSelectCellRenderer<AgGridRow>({ ...params, align }),
    []
  );

  // 만기 편집 가능 셀 스타일: 행 선택 시 editable-cell 클래스 적용 (선택 변경 시 refreshCells로 즉시 반영)
  // 납기는 항상 editable이므로 cellClass에 editable-cell을 고정으로 포함 → 별도 rules 불필요
  const editableCellClassRules = useMemo(
    () => ({
      'editable-cell': (params: CellClassParams<AgGridRow>) => {
        const isRowChecked = params.node?.isSelected?.() ?? false;
        return isRowChecked;
      },
    }),
    []
  );

  // 가입금액 셀 필수/에러 규칙
  // - 필수: row.field3Required === true (미지정 시 기본 true)
  // - 에러: 필수 + 값이 0(또는 빈값)
  const amountCellClassRules = useMemo(() => {
    const isAmountRequired = (params: CellClassParams<AgGridRow>) => {
      // field3Required가 존재하는 경우만 사용, 없으면 true로 처리
      if (typeof params.data !== 'undefined' && 'field3Required' in params.data) {
        return (params.data as { field3Required?: boolean }).field3Required ?? true;
      }
      return true;
    };
    const isAmountInvalid = (params: CellClassParams<AgGridRow>) =>
      params.value === '' || params.value === undefined || Number(params.value) === 0;

    return {
      required: isAmountRequired,
      ...createCellErrorClassRules<AgGridRow>((params) => isAmountRequired(params) && isAmountInvalid(params)),
    };
  }, []);

  // ── 중복 열 (field9) ──────────────────────────────────────────────────────────
  // 셀: 행 복사 버튼 — 행이 선택(체크)된 경우에만 노출/동작
  const duplicateRenderer = useMemo(() => {
    return createInsertCopiedRowButtonCellRenderer<AgGridRow, 'id'>(setRowDataWithTracking, {
      idKey: 'id',
      // 순수 함수로 id 생성: 숫자 최대값+1 (숫자/문자 혼용 방지)
      getNextId: (rows) => {
        const ids = rows.map((r) => (typeof r.id === 'number' ? r.id : Number(r.id))).filter((n) => !isNaN(n));
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        return maxId + 1;
      },
      patchCopiedRow: (originalRow, nextId) => ({
        ...originalRow,
        id: nextId,
        displayNo: originalRow.id,
        isDuplicate: true,
        filePath: Array.isArray(originalRow.filePath) ? [...originalRow.filePath, String(nextId)] : [String(nextId)],
      }),
      isVisible: (params) => {
        const isDuplicateEnabled = Boolean(params.value);
        const isRowChecked = params.node?.isSelected?.() ?? false;
        const isCopiedRow = params.data?.field9 === false;
        return isDuplicateEnabled && isRowChecked && !isCopiedRow;
      },
      ariaLabel: '동일 담보 추가',
    });
  }, [setRowDataWithTracking]);

  // ── 행 선택 핸들러 ────────────────────────────────────────────────────────────
  // locked 행은 항상 선택 상태 유지 (체크박스 해제 방지)
  const ensureLockedRowsSelected = useCallback((api: GridApi<AgGridRow>) => {
    api.forEachNode((node) => {
      if (node.data?.locked && !node.isSelected()) {
        node.setSelected(true);
      }
    });
  }, []);

  // 선택된 행의 id를 부모(onSelectPlan)로 전달
  const handleSelectionChanged = useMemo(
    () => createSelectionChangedHandler<AgGridRow, number>('id', onSelectPlan),
    [onSelectPlan]
  );

  // 그리드 선택 변경 통합 핸들러: 체크박스 선택 시 트리 확장/해제
  const handleGridSelectionChanged = useCallback(
    (event: SelectionChangedEvent<AgGridRow>) => {
      ensureLockedRowsSelected(event.api);

      // 현재 선택된 id 목록
      const currentSelectedIds = new Set(
        event.api
          .getSelectedNodes()
          .map((n) => n.data?.id)
          .filter((id): id is number => id !== undefined)
      );

      // 트리 확장/축소: 체크된 행은 expand, 해제된 행은 collapse
      event.api.forEachNode((node) => {
        if (node.data) {
          const shouldExpand = currentSelectedIds.has(node.data.id);
          if (node.expanded !== shouldExpand) {
            node.setExpanded(shouldExpand);
          }
        }
      });

      // 이전 선택에서 해제된 중복 행 찾아 삭제
      const deselectedDuplicateIds: number[] = [];
      prevSelectedIdsRef.current.forEach((id) => {
        if (!currentSelectedIds.has(id)) {
          const node = event.api.getRowNode(String(id));
          if (node?.data?.isDuplicate) {
            deselectedDuplicateIds.push(id);
          }
        }
      });
      if (deselectedDuplicateIds.length > 0) {
        setRowData((prev) => prev.filter((row) => !deselectedDuplicateIds.includes(row.id)));
      }

      prevSelectedIdsRef.current = currentSelectedIds;
      handleSelectionChanged(event);
      event.api.refreshCells({
        force: true,
        columns: ['field5', 'field6', 'field9'],
      });
    },
    [ensureLockedRowsSelected, handleSelectionChanged]
  );
  const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<AgGridRow>(), []);

  // 그리드 준비 핸들러: locked 행 초기 선택 + 선택 상태 초기화
  const handleGridReady = useCallback(
    (params: { api: GridApi<AgGridRow> }) => {
      // 1. 기본 isChecked=true인 row 선택
      params.api.forEachNode((node) => {
        if (node.data?.isChecked && !node.isSelected()) {
          node.setSelected(true);
        }
      });
      // 2. locked row 항상 선택
      ensureLockedRowsSelected(params.api);
      // 3. 선택 상태 기록
      prevSelectedIdsRef.current = new Set(
        params.api
          .getSelectedNodes()
          .map((n) => n.data?.id)
          .filter((id): id is number => id !== undefined)
      );
    },
    [ensureLockedRowsSelected]
  );

  // 행 데이터 갱신 핸들러: locked 행 유지 + 신규 중복 행 자동 선택
  const handleRowDataUpdated = useCallback(
    (params: { api: GridApi<AgGridRow> }) => {
      ensureLockedRowsSelected(params.api);
      if (pendingSelectIdRef.current !== null) {
        const nodeToSelect = params.api.getRowNode(String(pendingSelectIdRef.current));
        if (nodeToSelect) {
          nodeToSelect.setSelected(true);
          pendingSelectIdRef.current = null;
        }
      }
    },
    [ensureLockedRowsSelected]
  );

  // 1. 공통 정렬 로직을 함수로 분리 (재사용성)
  const sortRows = (rows: any[]) => {
    return [...rows].sort((a, b) => {
      if (a.isError === b.isError) return 0;
      return a.isError ? -1 : 1;
    });
  };

  // 2. 상태 업데이트 핸들러
  const toggleError = (id: number | string) => {
    setRowData((prev) => {
      const updated = prev.map((row) => (row.id == id ? { ...row, isError: !row.isError } : row));
      // 완전히 새 배열로 반환
      return [...sortRows(updated)];
    });
  };

  // 인보험 ColDef
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      // {
      //   headerName: '담보명',
      //   field: 'field1',
      //   flex: 1,
      //   cellClass: 'text-left p-0!',
      //   suppressMovable: true, // 이동 방지
      //   lockPosition: 'left', // 왼쪽 고정 유지
      //   lockPinned: true, // 고정 열에서 제외 방지
      //   tooltipValueGetter: createTooltipValueGetter<AgGridRow>({
      //     label: '담보명',
      //     field: 'field1',
      //   }),
      //   headerComponent: productNameHeader,
      //   cellRenderer: titleRenderer,
      // },
      {
        headerName: '속성',
        field: 'field2',
        width: attributeColumnWidth[4],
        cellClass: 'text-center',
        cellRenderer: searchButtonRenderer,
        resizable: false,
      },
      {
        headerComponent: () => (
          <Grow className="w-full" placement={'cc'} gap={0}>
            가입금액<span className="text-[1.1rem]">(만원)</span>
          </Grow>
        ),
        field: 'field3',
        width: attributeColumnWidth[9],
        cellClass: () => 'text-right editable-cell [&_input]:text-right',
        cellClassRules: {
          ...amountCellClassRules,
          isStandardGroup: (params) => !!(params.data?.isStandard?.group && !params.data?.isStandard?.edit),
          isStandard: (params) => !!params.data?.isStandard?.edit,
          'tooltip-on': (params) => !!params.data?._tooltipOn,
        },
        cellEditorSelector: (params: EditableCallbackParams): CellEditorSelectorResult | undefined => {
          // isStandardGroup이면 에디터 비활성화
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return undefined;
          }
          const isSelectedField3 = params.data?.isSelectedField3 ?? false;
          if (!isSelectedField3) {
            return {
              component: AmountWithPopoverCellEditor,
              params: { step: 500 }, // Popover에서 조정할 단위 설정
            };
          } else {
            const baseOptions = ['1천만원', '2천만원', '3천만원', '5천만원', '1억원'];
            return {
              component: 'agSelectCellEditor',
              params: { values: baseOptions },
            };
          }
        },
        // valueFormatter: numberValueFormatter<AgGridRow>,
        cellRenderer: (params: ICellRendererParams<AgGridRow>) => {
          // isStandardGroup(비편집) 셀 클릭 시 같은 filePath 그룹의 isStandard.edit 셀의 툴팁을 항상 보여줌
          const isSelectedField3 = params.data?.isSelectedField3 ?? false;
          if (params.data?.isStandard?.group) {
            // 그룹 내 edit 셀의 rowNode id 목록 수집 (루트 filePath 기준으로 비교)
            const groupEditNodeIds: string[] = [];
            const groupRoot = Array.isArray(params.data?.filePath) ? params.data.filePath[0] : undefined;
            params.api.forEachNode((node: any) => {
              if (
                Array.isArray(node.data?.filePath) &&
                groupRoot !== undefined &&
                node.data.filePath[0] === groupRoot &&
                node.data?.isStandard?.edit
              ) {
                groupEditNodeIds.push(node.id);
              }
            });
            // 금액 콤마 포맷 적용
            const value = params.value;
            let display = value;
            if (!isSelectedField3) {
              if (typeof value === 'number') {
                display = value.toLocaleString();
              } else if (typeof value === 'string' && value !== '') {
                // 숫자형 문자열만 콤마 적용
                const num = Number(value.replace(/[^\d.-]/g, ''));
                display = isNaN(num) ? value : num.toLocaleString();
              }
            }
            // 버튼 클릭 시 그룹 내 isStandard(edit) 셀에 tooltip-on 3초간 부여
            const handleClick = () => {
              groupEditNodeIds.forEach((nodeId) => {
                const node = params.api.getRowNode(nodeId);
                if (node && node.data) {
                  node.setData({ ...node.data, _tooltipOn: true });
                }
              });
              setTimeout(() => {
                groupEditNodeIds.forEach((nodeId) => {
                  const node = params.api.getRowNode(nodeId);
                  if (node && node.data) {
                    node.setData({ ...node.data, _tooltipOn: false });
                  }
                });
              }, 3000);
            };
            return (
              <button
                type="button"
                onClick={handleClick}
                style={{ width: '100%', background: 'none', border: 'none', padding: 0, textAlign: 'right' }}
              >
                {display}
              </button>
            );
          }
          return isSelectedField3
            ? expiryCellRenderer('left')(params)
            : numberValueFormatter<AgGridRow>(params as ValueFormatterParams<AgGridRow>);
        },
        editable: (params: EditableCallbackParams) => {
          // 그룹이면서 편집 불가면 에디터 비활성화
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return false;
          }
          return true;
        },
      },
      {
        headerName: '가능금액',
        field: 'field4',
        width: attributeColumnWidth[7],
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<AgGridRow>,
      },
      {
        headerName: '만기',
        field: 'field5',
        width: attributeColumnWidth[7],
        cellClassRules: editableCellClassRules,
        cellClass: (params: CellClassParams<AgGridRow>) => {
          const base = 'px-[0.2rem]! tracking-tighter';
          return params.data?.isEditedField5 === true ? base : `${base} no-edited`;
        },
        editable: (params: EditableCallbackParams) => {
          return params.data?.isEditedField5 === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
        },
        cellRenderer: expiryCellRenderer('left'),
      },
      {
        headerName: '납기',
        field: 'field6',
        width: attributeColumnWidth[7],
        cellClassRules: editableCellClassRules,
        cellClass: (params: CellClassParams<AgGridRow>) => {
          const base = 'px-[0.2rem]! tracking-tighter';
          return params.data?.isEditedField6 === true ? base : `${base} no-edited`;
        },
        editable: (params: EditableCallbackParams) => {
          return params.data?.isEditedField6 === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'],
        },
        cellRenderer: expiryCellRenderer('left'),
      },
      {
        headerComponent: () => (
          <Grow className="w-full" placement={'cc'} gap={0}>
            보험료<span className="text-[1.1rem]">(원)</span>
          </Grow>
        ),
        field: 'field7',
        width: attributeColumnWidth[7],
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<AgGridRow>,
      },
      {
        headerName: '예상UW',
        headerComponent: () => (
          <Grow className="w-full" placement={'cc'} gap={0}>
            <span className="text-[1.1rem]">예상</span>UW
          </Grow>
        ),
        field: 'field8',
        width: attributeColumnWidth[6],
        cellClass: 'text-center px-0! tracking-tighter',
        cellRenderer: (params: ICellRendererParams<AgGridRow>) => {
          const value = params.value as string;
          const color =
            value === '인수가능'
              ? 'var(--color-success-60)'
              : value === '인수불가'
                ? 'var(--color-danger-50)'
                : 'var(--color-warning-40)';
          return (
            <Gcol className="h-full" placement="cc">
              <div className={`w-[1rem] h-[1rem] rounded-full ${color ? `bg-[${color}]` : ''}`}></div>
            </Gcol>
          );
        },
      },
      {
        headerName: '중복',
        field: 'field9',
        width: attributeColumnWidth[4],
        cellRenderer: duplicateRenderer,
        resizable: false,
      },
    ],
    [amountCellClassRules, attributeColumnWidth, duplicateRenderer, expiryCellRenderer, editableCellClassRules]
  );

  const [testError, setTestError] = useState(false);

  return (
    <LayoutMainBody>
      <form
        id="page2-MainForm"
        className="w-full h-full"
        onSubmit={(event) => {
          event.preventDefault();
          setTestError(!testError);
        }}
        noValidate
      >
        <LayoutMain className="grid grid-rows-[auto_1fr_auto] gap-[1rem] h-full">
          <TabPager
            data={Tabs}
            active={TabActive}
            setActive={TabSetActive}
            visibleCount={5}
            error={testError}
            errorMsg="입력하세요."
            getValue={(tab) => String(tab.id)}
            renderTab={(tab) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center">
                    <span className="max-w-20 truncate block">{tab.name}</span>
                    <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  <BulletList className="gap-[0.5rem]">
                    {tab.info.map((info: string, index: number) => (
                      <BulletListItem key={index} type="dot">
                        {info}
                      </BulletListItem>
                    ))}
                  </BulletList>
                </TooltipContent>
              </Tooltip>
            )}
            renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
              <Button
                variant={'none'}
                key={String(tab.id)}
                onClick={() => {
                  setActive(String(tab.id));
                  const idx = data.findIndex((t) => String(t.id) === String(tab.id));
                  if (idx !== -1) {
                    const page = Math.floor(idx / visibleCount);
                    setVisibleStart(page * visibleCount);
                  }
                }}
              >
                <span className="flex items-start gap-2 w-full">
                  <span className="block">{tab.name}</span>
                  <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                </span>
              </Button>
            )}
          >
            {/* M1. 간격 및 위치 수정 */}
            <Gcol variant={'box-round-b'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`}>
              <Grow gap={1.5} placement={'bwc'}>
                <Grow gap={2}>
                  <Button variant={'contained'} color={'coolgray-light'} size={'md'}>
                    <PaperIcon />
                    보장패키지
                  </Button>
                  <Divider dir="col" />

                  <CheckboxGroup
                    className="gap-[0.4rem] flex-wrap type-small"
                    color="primary"
                    minSelected={0}
                    size="lg"
                    variant="button"
                    width="auto"
                  >
                    {[
                      { label: '사망후유', value: '0' },
                      { label: '진단비', value: '1' },
                      { label: '입원/통원', value: '2' },
                      { label: '수술/치료', value: '3' },
                      { label: '골절/화상', value: '4' },
                      { label: '검사/지원', value: '5' },
                      { label: '운전/비용', value: '6' },
                      { label: '재물/배상', value: '7' },
                      { label: '기타', value: '8' },
                    ].map((category) => (
                      <CheckboxGroupItem key={category.value} value={category.value}>
                        {category.label}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>
                  <Divider dir="col" />

                  <CheckboxGroup
                    className="gap-[0.4rem] flex-nowrap shrink-0 type-small"
                    color="primary"
                    minSelected={0}
                    size="lg"
                    variant="button"
                    width="auto"
                  >
                    {[
                      { label: '갱신', value: '1' },
                      { label: '비갱신', value: '2' },
                    ].map((category) => (
                      <CheckboxGroupItem key={category.value} value={category.value}>
                        {category.label}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>
                </Grow>
                <Grow placement={'ec'}>
                  <Button variant={'outlined'} only="icon" color={'gray'} size={'lg'}>
                    <ResetIcon color="var(--color-gray-500)" />
                  </Button>
                </Grow>
              </Grow>
            </Gcol>
            {/* //M1. 간격 및 위치 수정 */}
          </TabPager>

          <LayoutMainBody>
            <LayoutScrollWrap className="grid-rows-[auto_1fr]">
              <Grow placement={'bwc'} className="gap-1 w-full pb-1">
                <Grow className="gap-1.5">
                  <Typo variant="heading-sm">100세만기 · 20년납입 · 월납 · 20년 갱신 · 1형</Typo>
                  <Button variant={'outlined'} color={'gray'} size={'md'}>
                    변경
                  </Button>
                </Grow>
                <Grow className="gap-2.5">
                  {/* M1. 담보초기화 삭제 */}
                  <Checkbox>플랜기본값</Checkbox>
                  <Grow className="gap-1">
                    <NativeSelect aria-label="플랜 선택" width={140} size={'sm'} readOnly={false} required={false}>
                      {[
                        { label: '플랜 선택', value: 'planA' },
                        { label: '올인원플랜(15~89세)', value: 'planB' },
                        { label: '플1형(355간편고지형)(프리미엄올인원플랜)(1.7189형)(15~80세)', value: 'planC' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <SelectDrop typeMode="custom" size="md" width={160} placeholder="나만의 설계선택">
                      {/* 여기에 */}
                      <Gcol className="w-full p-[0.2rem]">
                        <Button variant="outlined" size="md" className="w-full">
                          <SaveIcon /> 나만의 설계
                        </Button>

                        <Accordion type="multiple" className="w-full" defaultValue={['item-1', 'item-2', 'item-3']}>
                          {planAccordionItems.map((item) => (
                            <AccordionItem key={item.value} value={item.value}>
                              <AccordionTrigger className="w-full group flex justify-between items-center text-[1.3rem] font-bold">
                                {item.trigger}
                                <ChevronDownIcon
                                  size={14}
                                  color="#777"
                                  className="transition-transform group-data-[state=open]:rotate-0 group-data-[state=closed]:rotate-180"
                                />
                              </AccordionTrigger>
                              <AccordionContent className="px-[0.8rem]">
                                {item.content.map((text, index) => (
                                  <Typo key={`${item.value}-${index}`} variant="body-md">
                                    {text}
                                  </Typo>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </Gcol>
                    </SelectDrop>

                    {/* M1. 토글 시 아이콘 변경 추가 */}
                    <Button
                      variant={'outlined'}
                      color={'gray'}
                      size={'md'}
                      only={'icon'}
                      onClick={() => setIsHeightExpanded(!isHeightExpanded)}
                    >
                      {isHeightExpanded ? (
                        <SizeOffIcon size={16} color="var(--color-secondary-50)" className="rotate-90" />
                      ) : (
                        <SizeIcon size={16} color="var(--color-secondary-50)" className="rotate-90" />
                      )}
                    </Button>
                    <Button
                      variant={'outlined'}
                      color={'gray'}
                      size={'md'}
                      only={'icon'}
                      onClick={() => setIsWidthExpanded?.(!isWidthExpanded)}
                    >
                      {isWidthExpanded ? (
                        <SizeOffIcon size={16} color="var(--color-secondary-50)" />
                      ) : (
                        <SizeIcon size={16} color="var(--color-secondary-50)" />
                      )}
                    </Button>
                    {/* //M1. 토글 시 아이콘 변경 추가 */}
                  </Grow>
                </Grow>
              </Grow>
              <LayoutScrollItem className={`ag-theme-alpine${showProductNameTooltip ? ' show-product-tooltip' : ''}`}>
                <div className="ag-theme-alpine">
                  <AgGridReact<AgGridRow>
                    rowData={rowData}
                    columnDefs={columnDefs}
                    getRowId={(params) => String(params.data.id)}
                    singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
                    rowSelection={{
                      mode: 'multiRow' as const,
                      checkboxes: true,
                      headerCheckbox: false,
                      enableClickSelection: false,
                      enableSelectionWithoutKeys: true,
                    }}
                    onCellClicked={handleGridCellClickToggle}
                    selectionColumnDef={{
                      width: 30,
                      // pinned: 'left',
                      cellClass: 'text-center p-0!',
                      cellClassRules: {
                        'pointer-events-none': (params) => !!params.data?.locked,
                      },
                    }}
                    onSelectionChanged={handleGridSelectionChanged}
                    onGridReady={handleGridReady}
                    onRowDataUpdated={handleRowDataUpdated}
                    suppressRowHoverHighlight={false}
                    tooltipShowDelay={0}
                    tooltipHideDelay={9999}
                    tooltipMouseTrack={true}
                    treeData={true}
                    getDataPath={(row) => row.filePath?.map(String) ?? []}
                    groupDefaultExpanded={0}
                    getRowClass={(params) => (params.data?.isError ? 'isError' : '')}
                    autoGroupColumnDef={{
                      headerComponent: productNameHeader,
                      field: 'id',
                      flex: 1,
                      cellClass: (_) => 'text-left !p-0',
                      cellRenderer: productNameCellRnderer,
                      tooltipValueGetter: (params) => params.data?.field1 ?? '', // 담보명 등 표시
                    }}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    suppressAnimationFrame={true}
                    suppressColumnMoveAnimation={true}
                    suppressRowTransform={true}
                    animateRows={false}
                  />
                </div>
              </LayoutScrollItem>
            </LayoutScrollWrap>
          </LayoutMainBody>

          <LayoutMainFoot>
            {/* M1. variant="box" 추가 */}
            <MainBottom variant="box">
              <MainBottomItem className="!py-0">
                <FormTable
                  className="w-full! [&_tr]:justify-between"
                  lineTop={false}
                  variant={'bottom'}
                  cols={[
                    'min-w-[9rem]',
                    'w-[36%]',
                    'min-w-[8rem]',
                    'w-[30%]',
                    'min-w-[8rem]',
                    'w-[30%]',
                    'min-w-[8rem]',
                    'min-w-[15rem]',
                  ]}
                >
                  <FormRow>
                    <FormCell title="만기금(환급률)" style={{ borderBottom: '0.1rem solid #ccc' }}>
                      <Button variant={'outlined'} color={'gray'} size={'sm'}>
                        예상
                      </Button>
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
                        size={'md'}
                        width={'full'}
                        readOnly={true}
                        className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Input
                            type="text"
                            commaAmount={true}
                            value={39.4}
                            size={'md'}
                            width={60}
                            className="[&_input]:text-right shrink-0 cursor-pointer"
                          />
                        </PopoverTrigger>
                        <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
                          <KeyValueList
                            direction="col"
                            variant="amount"
                            data={[
                              { key: '총압입보험료', value: '000,000,000원' },
                              { key: '중도환급금', value: '0원' },
                              { key: '만기환급금', value: '000,000,000원' },
                            ]}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                      %
                    </FormCell>
                    <FormCell title="보장보험료">
                      <Popover>
                        <PopoverTrigger className="w-full">
                          <span className="block w-full rounded-[0.4rem] h-[2.5rem] bg-[var(--color-gray-10)] px-2 text-[1.4rem] border border-[0.1rem] border-[var(--color-gray-20)] box-border tracking-[0] leading-[2.5rem] appearance-none truncate text-right cursor-pointer">
                            {Number(100000).toLocaleString()}
                          </span>
                        </PopoverTrigger>
                        <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
                          <KeyValueList
                            direction="col"
                            variant="amount"
                            data={[{ key: '일시납보험료', value: '000,000,000원' }]}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormCell>
                    <FormCell title="적립보험료">
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
                        width={'full'}
                        size={'md'}
                        readOnly={true}
                        className="text-right"
                      />
                    </FormCell>

                    <FormCell title="합계보험료">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Input
                            type="tel"
                            commaAmount={true}
                            value={0}
                            clear={true}
                            width={'full'}
                            size={'md'}
                            required={true}
                            error={testError}
                            errorMsg={'계약자 입력은 필수입니다.'}
                            errorPs={'tr'}
                            className="text-right font-bold"
                          />
                        </PopoverTrigger>
                        <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
                          <KeyValueList
                            direction="col"
                            variant="amount"
                            data={[
                              { key: '최소 보험료', value: '000,000,000원' },
                              { key: '최대 보험료', value: '000,000,000원' },
                            ]}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </MainBottomItem>
              <MainBottomItem>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  고지유형별보험료비교
                </Button>
                <Grow className="gap-1">
                  <Button onClick={() => toggleError(9)}>231번 행 에러 토글</Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    담보전환
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    상품비교설계
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    동일상품복사
                  </Button>
                  <Button
                    type="submit"
                    form={'page2-MainForm'}
                    variant={'contained'}
                    color={'primary'}
                    size={'xl'}
                    // onClick={onCalcGuidelineClick}
                  >
                    보험료계산(지침)
                  </Button>
                </Grow>
              </MainBottomItem>
            </MainBottom>
          </LayoutMainFoot>
        </LayoutMain>
      </form>
    </LayoutMainBody>
  );
}
