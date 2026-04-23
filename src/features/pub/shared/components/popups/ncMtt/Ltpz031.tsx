'use client';

import '@/shared/lib/agGridPub';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { useTabs } from '@/shared/hooks/useTabs';

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string[];
};
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

const DataTabs = [
  { label: '척추염좌', value: 'TAB1' },
  { label: '자궁근종', value: 'TAB2' },
  { label: '대장·직장용종', value: 'TAB3' },
  { label: '추간판장애', value: 'TAB4' },
  { label: '어깨병변', value: 'TAB5' },
];

const DataTabs2 = [
  { label: '일반고지형', value: 'TAB2_1' },
  { label: '간편고지형', value: 'TAB2_2' },
];

export const Ltpz031 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [rowData] = useState<DummyDataType[]>(DummyData);
  const [form, setFormField] = useFormFields({
    // Tab1
    type01_01: '',
    type01_02: '',
    type01_03: '',
    type01_04: '',
    type01_05: '',

    // Tab2
    type02_01: '',
    type02_02: '',
    type02_03: '',
    type02_04: '',

    // Tab3
    type03_01: '',
    type03_02: '',
    type03_03: '',
    type03_04: '',

    // Tab4
    type04_01: '',
    type04_02: '',
    type04_03: '',
    type04_04: '',

    // Tab5
    type05_01: '',
    type05_02: '',
    type05_03: '',
    type05_04: '',
  });
  const { tabs, active, setActive, handleRemove } = useTabs(DataTabs);
  const { tabs: tabs2, active: active2, setActive: setActive2, handleRemove: handleRemove2 } = useTabs(DataTabs2);
  const [searchWord] = useState('척추');

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
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '위험분류',
      width: 240,
      cellClass: 'text-center',
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
      field: 'field5',
      width: 80,
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
      field: 'field6',
      width: 80,
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
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '암',
      field: 'field8',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '질병수술',
      field: 'field9',
      width: 80,
      cellClass: 'text-center',
    },
    {
      field: 'field10',
      width: 80,
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
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '질병치료',
      field: 'field12',
      width: 80,
      cellClass: 'text-center',
    },
    {
      field: 'field13',
      width: 80,
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
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상해수술',
      field: 'field15',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상해입원',
      field: 'field16',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상해치료',
      field: 'field17',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '장기요양',
      field: 'field18',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '치매',
      field: 'field19',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '치아',
      field: 'field20',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '실손',
      field: 'field21',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '서류',
      field: 'field22',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '참고사항',
      field: 'field23',
      width: 80,
      cellClass: 'text-center',
    },
  ];
  const dummyData2: DummyDataType3[] = [
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
  const columnDefs3: ColDef<DummyDataType3>[] = [
    {
      headerName: '입원일수',
      field: 'field1',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '수술유무',
      field: 'field2',
      width: 80,
      cellClass: 'text-center',
      cellRenderer: ({ value }: { value: boolean }) => (value ? 'Y' : 'N'),
    },
    {
      headerName: '경과일수',
      field: 'field3',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '재발',
      field: 'field4',
      width: 80,
      cellClass: 'text-center',
      cellRenderer: ({ value }: { value: boolean }) => (value ? 'Y' : 'N'),
    },
    {
      field: 'field5',
      width: 80,
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
      field: 'field6',
      width: 80,
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
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '암',
      field: 'field8',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '질병수술',
      field: 'field9',
      width: 80,
      cellClass: 'text-center',
    },
    {
      field: 'field10',
      width: 80,
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
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '질병치료',
      field: 'field12',
      width: 80,
      cellClass: 'text-center',
    },
    {
      field: 'field13',
      width: 80,
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
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상해수술',
      field: 'field15',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상해입원',
      field: 'field16',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상해치료',
      field: 'field17',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '장기요양',
      field: 'field18',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '치매',
      field: 'field19',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '치아',
      field: 'field20',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '실손',
      field: 'field21',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '서류',
      field: 'field22',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '참고사항',
      field: 'field23',
      width: 80,
      cellClass: 'text-center',
    },
  ];
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="xl">
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
        <DialogSection className="w-full gap-5">
          <Grow variant={'box-info-line'} placement={'bwc'} className="border-transparent">
            <Typo variant={'body-lg'}>
              자동고지(ICIS/심평원) 또는 질병 가져오기를 통해 질병 정보를 간편하게 입력하세요.
            </Typo>
            <Grow>
              <Button color={'gray'} size={'xl'} variant={'outlined'}>
                자동고지(ICIS)
              </Button>
              <Button color={'gray'} size={'xl'} variant={'outlined'}>
                자동고지(심평원)
              </Button>
              <Button color={'gray'} size={'xl'} variant={'outlined'}>
                질병 가져오기
              </Button>
            </Grow>
          </Grow>
          <Grow className="grid w-full grid-cols-[24.7rem_1fr] gap-5" placement={'ss'}>
            {/* 많이찾는질병 & 질병검색 */}
            <Grid placement={'ss'} className="w-full overflow-hidden grid-rows-[auto_1fr]" gap={5}>
              <Gcol className="w-full" placement={'ss'} gap={2}>
                <Typo variant="heading-md">많이 찾는 질병</Typo>
                <Grow variant="box-round" placement={'bwc'}>
                  <CheckboxGroup className="gap-1" minSelected={2} defaultValue={[]} variant="button">
                    {[
                      { value: '대장·직장용종', label: '대장·직장용종' },
                      { value: '척주염좌', label: '척주염좌' },
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
                        {item.label}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>
                </Grow>
              </Gcol>
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
                      <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-information-50)]"></div>SI검증
                    </Grow>
                    <Grow placement="sc">
                      <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-warning-40)]"></div>
                      SI경증(감액)
                    </Grow>
                  </Grow>

                  <div className="ag-theme-alpine min-h-[36rem] ">
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

            {/* 질병 */}
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
                    renderTab={(tab) => <span>{tab.label}</span>}
                    visibleCount={5}
                  >
                    {/* Tab1 */}
                    <Gcol placement={'ss'} className="w-full mt-2" gap={3}>
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
                                            <QuestionMark color="var(--color-gray-500)" />
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
                                            <QuestionMark color="var(--color-gray-500)" />
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
                                            <QuestionMark color="var(--color-gray-500)" />
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
                                            <QuestionMark color="var(--color-gray-500)" />
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
                                            <QuestionMark color="var(--color-gray-500)" />
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

                      <TableFold>
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
                                { value: '약처방/투약(주사,연고,안약 등)', label: '약처방/투약(주사,연고,안약 등)' },
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
                                              className="w-[57.4rem]"
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
                      <TableFold>
                        <TableFoldHead title="추가질문" />
                        <TableFoldBody>
                          <FormTable cols={['w-[8rem]', 'w-auto']}>
                            <FormRow vertical={false}>
                              <FormCell title={'발생부위'}>
                                <Grow className="w-full" gap={3} placement="sc">
                                  <RadioGroup className="gap-3" onValueChange={() => {}}>
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
                      <TableFold>
                        <TableFoldHead title="질병별 사전심사 안내" />
                        <TableFoldBody>
                          <TabPager
                            data={tabs2}
                            active={active2}
                            setActive={setActive2}
                            removable={true}
                            onRemove={handleRemove2}
                            getValue={(tab) => tab.value}
                            renderTab={(tab) => <span>{tab.label}</span>}
                            visibleCount={5}
                          >
                            {active2 === 'TAB2_1' && (
                              <div className="ag-theme-alpine w-full h-70! ag-border-t">
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
                            {active2 === 'TAB2_2' && (
                              <div className="ag-theme-alpine w-full h-70! ag-border-t">
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
                          </TabPager>
                        </TableFoldBody>
                      </TableFold>
                    </Gcol>
                  </TabPager>
                </Gcol>
              </Grow>
            </Grow>
          </Grow>
        </DialogSection>

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
