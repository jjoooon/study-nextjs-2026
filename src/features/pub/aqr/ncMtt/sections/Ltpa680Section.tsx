/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';

import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Grid, Gcol, Typo } from '@atoms';
import { ChevronDownIcon, FileExportIcon, FileImportIcon, SearchIcon } from '@icons';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { Textarea } from '@uiux/Textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { BottomBar } from '@common/BottomBar';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TooltipQ } from '@common/TooltipQ';
import { PageID } from '@features/PageID';

import { LayoutHead, LayoutFoot, LayoutScrollItem } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'M48.0',
    field02: '척추관협착증',
  },
  {
    id: 2,
    field01: 'M48.0',
    field02: '척추만곡증',
  },
  {
    id: 3,
    field01: 'M48.0',
    field02: '척추분리증',
  },

  {
    id: 4,
    field01: 'M48.0',
    field02: '척추전방전위증',
  },

  {
    id: 5,
    field01: 'M48.0',
    field02: '척추증, 척추병증',
  },

  {
    id: 6,
    field01: 'M48.0',
    field02: '강직성척추염',
  },

  {
    id: 7,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },

  {
    id: 8,
    field01: 'M48.0',
    field02: '척추전방전위증',
  },

  {
    id: 9,
    field01: 'M48.0',
    field02: '척추증, 척추병증',
  },

  {
    id: 10,
    field01: 'M48.0',
    field02: '강직성척추염',
  },
  {
    id: 11,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 12,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 13,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 14,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 15,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 16,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 17,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 18,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 19,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 20,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
];

type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '통합심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 2,
    field01: '간편고지형 상품 심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 3,
    field01: '더건강한 암플랜 심사가이드라인',
    field02: '2026-01-01',
  },
];

type DummyDataType3 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData3: DummyDataType3[] = [
  {
    id: 1,
    field01: '통합심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 2,
    field01: '간편고지형 상품 심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 3,
    field01: '더건강한 암플랜 심사가이드라인',
    field02: '2026-01-01',
  },
];

type DummyDataType4 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData4: DummyDataType4[] = [
  {
    id: 1,
    field01: '통합심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 2,
    field01: '간편고지형 상품 심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 3,
    field01: '더건강한 암플랜 심사가이드라인',
    field02: '2026-01-01',
  },
];

type DummyDataType5 = {
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

const DummyData5: DummyDataType5[] = [
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
];

type DummyDataType6 = {
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

const DummyData6: DummyDataType6[] = [
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

export default function Ltpa680Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  // 할증심사방법 체크박스 그룹 상태
  const [surchargeChecks, setSurchargeChecks] = useState<string[]>([]);
  const [surchargeChecks2, setSurchargeChecks2] = useState<string[]>([]);
  // 심사시 고려사항 Textarea readOnly 상태 관리
  const [isConsiderEditMode, setIsConsiderEditMode] = useState(false);
  const [considerText1, setConsiderText1] = useState(
    '[일반고지형 심사가이드라인]\n▶ 상해: 완치 1개월 경과 후 심사(치료기간별 심사)\n▶ 상해: 완치 1개월 경과 후 심사(치료기간별 심사)\n▶ 상해: 완치 1개월 경과 후 심사(치료기간별 심사)\n▶ 상해: 완치 1개월 경과 후 심사(치료기간별 심사)'
  );
  const [considerText2, setConsiderText2] = useState(
    '① 소견서(진단명, 치료기간, 치료내용, 현재상태 등)\n② 필요 시 의사경과기록지\n② 필요 시 의사경과기록지\n② 필요 시 의사경과기록지\n② 필요 시 의사경과기록지'
  );
  const handleConsiderEditClick = () => setIsConsiderEditMode(true);
  const handleConsiderSaveClick = () => setIsConsiderEditMode(false);
  const [searchWord] = useState('척추');
  const [guidelineType, setGuidelineType] = useState('일반고지형');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  // 수정 버튼 클릭 핸들러
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  // 저장 버튼 클릭 핸들러
  const handleSaveClick = () => {
    setIsEditMode(false);
  };
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: 'KCD코드',
      width: attributeColumnWidth(70),
      field: 'field01',
      cellClass: 'text-center px-0!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
    },
    {
      headerName: '질병명',
      flex: 1,
      minWidth: attributeColumnWidth(150),
      field: 'field02',
      cellClass: 'text-left',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (!params.data) return null;
        const { field02 } = params.data;
        const text = String(field02);
        // 검색어와 일치하는 부분만 분리해서 하이라이트 렌더링
        const parts = text.split(new RegExp(`(${searchWord})`, 'g'));
        return (
          <div className="truncate-no cursor-pointer">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button only="icon" size={'md'} variant="none">
                  {parts.map((part: string, idx: number) =>
                    part === searchWord ? (
                      <b key={idx} style={{ fontWeight: 'bold', color: '#ff5c2e' }}>
                        {part}
                      </b>
                    ) : (
                      <React.Fragment key={idx}>{part}</React.Fragment>
                    )
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                align="start"
                side="bottom"
                sideOffset={0}
                variant="default"
                className="z-[60] w-auto block"
              >
                {parts.map((part: string, idx: number) =>
                  part === searchWord ? (
                    <b key={idx} style={{ fontWeight: 'bold', color: '#ff5c2e' }}>
                      {part}
                    </b>
                  ) : (
                    <React.Fragment key={idx}>{part}</React.Fragment>
                  )
                )}
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      flex: 1,
      field: 'field01',
      cellClass: 'text-left border-r-0!',
    },
    {
      width: 70,
      field: 'field02',
      cellClass: 'text-center px-0!',
    },
  ];

  const columnDefs3: ColDef<DummyDataType3>[] = [
    {
      flex: 1,
      field: 'field01',
      cellClass: 'text-left border-r-0!',
    },
    {
      width: 70,
      field: 'field02',
      cellClass: 'text-center px-0!',
    },
  ];

  const columnDefs4: ColDef<DummyDataType4>[] = [
    {
      flex: 1,
      field: 'field01',
      cellClass: 'text-left border-r-0!',
    },
    {
      width: 70,
      field: 'field02',
      cellClass: 'text-center px-0!',
    },
  ];

  // 2026-06-04 flex, minWidth 수정
  const columnDefs5: ColDef<DummyDataType5>[] = [
    {
      headerName: '위험분류',
      flex: 1,
      minWidth: attributeColumnWidth(240),
      cellClass: 'text-center',
      editable: isEditMode,
      cellRenderer: (params: ICellRendererParams<DummyDataType5>) => {
        return (
          <div className="grid h-full w-full items-stretch grid-cols-[35%_15%_35%_15%]">
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
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      wrapText: true,
      autoHeight: true,
      editable: isEditMode,
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
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
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
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '암',
      field: 'field8',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '질병수술',
      field: 'field9',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      field: 'field10',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
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
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '질병치료',
      field: 'field12',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      field: 'field13',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
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
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '상해수술',
      field: 'field15',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '상해입원',
      field: 'field16',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '상해치료',
      field: 'field17',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '장기요양',
      field: 'field18',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '치매',
      field: 'field19',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '치아',
      field: 'field20',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '실손',
      field: 'field21',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '서류',
      field: 'field22',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
    {
      headerName: '참고사항',
      field: 'field23',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
      editable: isEditMode,
    },
  ];

  // 2026-06-04 flex, minWidth 수정
  const columnDefs6: ColDef<DummyDataType6>[] = [
    {
      headerName: '입원일수',
      field: 'field1',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '수술유무',
      field: 'field2',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
      cellRenderer: ({ value }: { value: boolean }) => (value ? 'Y' : 'N'),
    },
    {
      headerName: '경과일수',
      field: 'field3',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '재발',
      field: 'field4',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
      cellRenderer: ({ value }: { value: boolean }) => (value ? 'Y' : 'N'),
    },
    {
      field: 'field5',
      flex: 1,
      minWidth: 80,
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
      flex: 1,
      minWidth: 80,
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
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '암',
      field: 'field8',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '질병수술',
      field: 'field9',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      field: 'field10',
      flex: 1,
      minWidth: 80,
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
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '질병치료',
      field: 'field12',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      field: 'field13',
      flex: 1,
      minWidth: 80,
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
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상해수술',
      field: 'field15',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상해입원',
      field: 'field16',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상해치료',
      field: 'field17',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '장기요양',
      field: 'field18',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '치매',
      field: 'field19',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '치아',
      field: 'field20',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '실손',
      field: 'field21',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '서류',
      field: 'field22',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '참고사항',
      field: 'field23',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);
  const [rowData3] = React.useState<DummyDataType3[]>(DummyData3);
  const [rowData4] = React.useState<DummyDataType4[]>(DummyData4);
  const [rowData5] = React.useState<DummyDataType5[]>(DummyData5);
  const [rowData6] = React.useState<DummyDataType6[]>(DummyData6);

  const DATA_TABS = [
    { label: '인수기준', value: 'tab1' },
    { label: '질병정보', value: 'tab2' },
    { label: 'Mobile용', value: 'tab3' },
  ];

  // 탭 상태 관리: 선택값(active)에 따라 하단 컨텐츠 분기 렌더링
  const { tabs, active, setActive } = useTabs(DATA_TABS);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '장기심사가이드',
            pageId: 'LTPA680',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-cols-[24.7rem_1fr] h-full" placement="ss" gap={3}>
            <Grid className="w-full gap-[1.2rem] grid-rows-[1fr_auto]" placement="ss">
              <Grid className="h-full grid-rows-[auto_1fr]" variant={'box-round'} placement="ss" gap={2}>
                <Grow>
                  <Input width={195} placeholder="병명 또는 코드 입력" />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                </Grow>
                <Gcol placement="ss">
                  {/* 검색결과가 없을때 */}
                  {/* <Typo className='text-center'>심사 기준이 궁금한 질병을<br></br> KCD코드 또는 질병명으로 검색해보세요.</Typo> */}
                  <Grow>
                    <Typo variant={'body-md'}>총</Typo>
                    <Typo variant={'body-md'} weight={'bold'} color={'primary'}>
                      {rowData.length}건
                    </Typo>
                  </Grow>
                  <div className="ag-theme-alpine min-h-144 ">
                    <AgGridReact<DummyDataType>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      domLayout="normal"
                    />
                  </div>
                </Gcol>
              </Grid>
              <Gcol className="w-full" placement="ss" gap={2}>
                <Typo variant={'body-lg'} weight={'bold'}>
                  많이 찾는 질병
                </Typo>
                <Gcol variant={'box-round'} placement={'bwc'}>
                  {/*
                    많이 찾는 질병 목록을 라디오 버튼으로 표시
                    [selectedDisease 연동]
                    - onValueChange={setSelectedDisease}: 항목 클릭 시 selectedDisease 상태 업데이트
                    - value={selectedDisease}: 현재 선택된 질병을 라디오 버튼에 반영
                    - selectedDisease가 변경되면 우측 패널 상단(질병명 + TooltipQ)이 조건부 표시됨
                  */}
                  <RadioGroup className="gap-1" onValueChange={setSelectedDisease} value={selectedDisease} width="full">
                    {[
                      { value: '대장·직장용종', label: '대장·직장용종' },
                      { value: '척주염좌', label: '척주염좌' },
                      { value: '등통증', label: '등통증' },
                      { value: '후천성 백내장', label: '후천성 백내장' },
                      { value: '열상·표재성손상에 의한 질병', label: '열상·표재성손상에 의한 질병' },
                      { value: '추간판장애', label: '추간판장애' },
                      { value: '금성 비인두염', label: '금성 비인두염' },
                      { value: '교통사고', label: '교통사고' },
                      { value: '치액/치질', label: '치액/치질' },
                      { value: '자궁근종', label: '자궁근종' },
                    ].map((option) => {
                      const label = option.label;
                      // 8자 초과 라벨은 말줄임 처리 후 툴팁으로 전체 텍스트 표시
                      const isLongLabel = label.length > 8;
                      const item = (
                        // 버튼 텍스트는 최대 8자까지만 표시
                        <RadioGroupItem value={option.value} color="primary" size="lg" variant="button">
                          {label.slice(0, 8)}
                        </RadioGroupItem>
                      );

                      // 8자 이하: 툴팁 불필요, 그대로 렌더링
                      if (!isLongLabel) {
                        return <React.Fragment key={option.value}>{item}</React.Fragment>;
                      }

                      // 8자 초과: 호버 시 전체 라벨을 툴팁으로 노출
                      return (
                        <Tooltip key={option.value}>
                          <TooltipTrigger asChild>{item}</TooltipTrigger>
                          <TooltipContent side="top" align="center" sideOffset={8} variant="default">
                            {label}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </RadioGroup>
                </Gcol>
              </Gcol>
            </Grid>
            <Grid placement="ss" className="grid-rows-[auto_1fr]" gap={3}>
              <Grid className="grid-cols-[1fr_1fr_1fr] w-full" placement="ss" gap={3}>
                <Gcol className="w-full" placement="ss">
                  <Grow className="w-full" placement="bwc">
                    <Typo variant={'body-lg'} weight={'bold'}>
                      공지사항
                    </Typo>
                    <Button variant={'outlined'} color={'gray'} size={'sm'}>
                      더보기 <ChevronDownIcon size={14} color="#545454" className="-rotate-90" />
                    </Button>
                  </Grow>
                  <div
                    className="ag-theme-alpine no-header inner-scroll"
                    data-row={3}
                    style={{ borderTop: '0.2rem solid #000' }}
                  >
                    <AgGridReact<DummyDataType2>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData2}
                      columnDefs={columnDefs2}
                      domLayout="normal"
                      headerHeight={0}
                      groupHeaderHeight={0}
                    />
                  </div>
                </Gcol>
                <Gcol>
                  <Grow className="w-full" placement="bwc">
                    <Typo variant={'body-lg'} weight={'bold'}>
                      상품별 심사가이드라인
                    </Typo>
                    <Button variant={'outlined'} color={'gray'} size={'sm'}>
                      더보기 <ChevronDownIcon size={14} color="#545454" className="-rotate-90" />
                    </Button>
                  </Grow>
                  <div
                    className="ag-theme-alpine no-header inner-scroll"
                    data-row={3}
                    style={{ borderTop: '0.2rem solid #000' }}
                  >
                    <AgGridReact<DummyDataType3>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData3}
                      columnDefs={columnDefs3}
                      domLayout="autoHeight"
                      headerHeight={0}
                      groupHeaderHeight={0}
                    />
                  </div>
                </Gcol>
                <Gcol>
                  <Grow className="w-full" placement="bwc">
                    <Typo variant={'body-lg'} weight={'bold'}>
                      UW정보
                    </Typo>
                    <Button variant={'outlined'} color={'gray'} size={'sm'}>
                      더보기 <ChevronDownIcon size={14} color="#545454" className="-rotate-90" />
                    </Button>
                  </Grow>
                  <div
                    className="ag-theme-alpine no-header inner-scroll"
                    data-row={3}
                    style={{ borderTop: '0.2rem solid #000' }}
                  >
                    <AgGridReact<DummyDataType4>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData4}
                      columnDefs={columnDefs4}
                      domLayout="autoHeight"
                      headerHeight={0}
                      groupHeaderHeight={0}
                    />
                  </div>
                </Gcol>
              </Grid>
              <Grid className="w-full p-2.5 grid-rows-[auto_1fr]" variant={'box-line'} placement="ss" gap={3}>
                {/*
                  [selectedDisease 연동] 좌측 '많이 찾는 질병' 라디오 버튼 선택 시 렌더링
                  - selectedDisease가 빈 문자열('')이면 이 블록 전체가 숨겨짐
                  - 라디오 버튼 클릭 → setSelectedDisease 호출 → selectedDisease 업데이트 → 이 블록 표시
                */}
                {selectedDisease && (
                  <Grow placement="sc">
                    {/* 라디오 버튼에서 선택된 질병명을 그대로 표시 */}
                    <Typo variant={'body-lg'} weight={'bold'} color={'primary'}>
                      {selectedDisease}
                    </Typo>
                    {/* 질병 상세 정보 툴팁 (할증·부담보·SI경증 뱃지 및 관련 질병명 목록) */}
                    <TooltipQ>
                      <Gcol placement={'ss'} gap={1.5}>
                        <Typo className="body-md font-bold">척추염좌</Typo>
                        {/* 심사 유형 뱃지 */}
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
                        {/* 관련 질병명 목록 */}
                        <Typo tag={'p'} className="text-wrap">
                          경추염좌, 요추염좌, 흉추염좌, 목염좌, 등염좌, 허리염좌, 강추의 염좌 및 간장, 흉추의 염좌 및
                          긴장, 요추의 염좌 및 긴장
                        </Typo>
                      </Gcol>
                    </TooltipQ>
                  </Grow>
                )}
                <TabPager
                  data={tabs}
                  active={active}
                  setActive={setActive}
                  getValue={(tab) => String(tab.value)}
                  renderTab={(tab) => <span>{tab.label}</span>}
                >
                  {active === 'tab1' && (
                    <Gcol className="mt-1" gap={3}>
                      {/* 가이드라인 유형 선택 상태 */}
                      {/* 상단 useState 선언부에 추가: const [guidelineType, setGuidelineType] = useState('일반고지형'); */}
                      <RadioGroup className="gap-2" onValueChange={setGuidelineType} width="full" value={guidelineType}>
                        {[
                          { value: '일반고지형', label: '일반고지형' },
                          { value: '간편고지형', label: '간편고지형' },
                        ].map((option) => (
                          <RadioGroupItem key={option.value} size="md" value={option.value} variant="chipBox">
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>

                      {/* 선택된 가이드라인 유형별 영역 */}
                      <>
                        <LayoutScrollItem>
                          <Gcol gap={3}>
                            <TableFold>
                              <TableFoldHead title="추가질문"></TableFoldHead>
                              <TableFoldBody>
                                <FormTable cols={['w-[18rem]', 'w-auto']}>
                                  <FormRow vertical={false}>
                                    <FormCell title={'1. 발생부위'}>
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
                                    <FormCell title={'2. 발생원인'}>
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
                                  <FormRow>
                                    <FormCell
                                      title={
                                        <>
                                          <span>3. 척추질환동반</span>
                                          <br /> (디스크,관절염,척추만곡 등)
                                        </>
                                      }
                                    >
                                      <RadioGroup className="gap-3" onValueChange={() => {}}>
                                        {[
                                          { value: '없음', label: '없음' },
                                          { value: '있음', label: '있음' },
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
                            <TableFold>
                              <TableFoldHead title="심사가이드라인">
                                <Grow>
                                  <Button variant={'outlined'} color={'success'}>
                                    엑셀내보내기
                                    <FileExportIcon />
                                  </Button>
                                  <Button variant={'outlined'} color={'success'}>
                                    엑셀가져오기
                                    <FileImportIcon />
                                  </Button>
                                  <Button variant={'outlined'} size={'md'} color={'gray'} onClick={handleEditClick}>
                                    수정
                                  </Button>
                                  <Button
                                    variant={'contained'}
                                    size={'md'}
                                    onClick={handleSaveClick}
                                    disabled={!isEditMode}
                                  >
                                    저장
                                  </Button>
                                </Grow>
                              </TableFoldHead>
                              <TableFoldBody>
                                {guidelineType === '일반고지형' && (
                                  // 일반고지형 선택 시 편집 가능한 심사가이드라인 그리드 표시
                                  <div className="ag-theme-alpine w-full inner-scroll" data-row={rowData5.length}>
                                    <AgGridReact<DummyDataType5>
                                      getRowId={(params) => String(params.data.id)}
                                      noRowsOverlayComponent={AgGridEmptyComponent}
                                      rowData={rowData5}
                                      columnDefs={columnDefs5}
                                      defaultColDef={{
                                        sortable: true,
                                        resizable: true,
                                      }}
                                      domLayout="autoHeight"
                                      tooltipShowMode="whenTruncated"
                                      tooltipShowDelay={0}
                                      headerHeight={50}
                                      singleClickEdit={isEditMode}
                                    />
                                  </div>
                                )}
                                {guidelineType === '간편고지형' && (
                                  // 간편고지형 선택 시 전용 가이드라인 그리드로 전환
                                  <div className="ag-theme-alpine w-full inner-scroll" data-row={rowData6.length}>
                                    <AgGridReact<DummyDataType6>
                                      getRowId={(params) => String(params.data.id)}
                                      noRowsOverlayComponent={AgGridEmptyComponent}
                                      rowData={rowData6}
                                      columnDefs={columnDefs6}
                                      defaultColDef={{
                                        sortable: true,
                                        resizable: true,
                                      }}
                                      headerHeight={50}
                                      domLayout="autoHeight"
                                      tooltipShowMode="whenTruncated"
                                      tooltipShowDelay={0}
                                    />
                                  </div>
                                )}
                              </TableFoldBody>
                            </TableFold>
                            <TableFold>
                              <TableFoldHead title="심사시 고려사항">
                                <Grow>
                                  <Button variant={'outlined'} color={'success'}>
                                    엑셀내보내기
                                    <FileExportIcon />
                                  </Button>
                                  <Button variant={'outlined'} color={'success'}>
                                    엑셀가져오기
                                    <FileImportIcon />
                                  </Button>
                                  <Button
                                    variant={'outlined'}
                                    size={'md'}
                                    color={'gray'}
                                    onClick={handleConsiderEditClick}
                                    disabled={isConsiderEditMode}
                                  >
                                    수정
                                  </Button>
                                  <Button
                                    variant={'contained'}
                                    size={'md'}
                                    onClick={handleConsiderSaveClick}
                                    disabled={!isConsiderEditMode}
                                  >
                                    저장
                                  </Button>
                                </Grow>
                              </TableFoldHead>
                              <TableFoldBody>
                                <Grow gap={3} placement="ss">
                                  <Table className="w-full">
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>(질병별) 심사기준</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody className="px-[0.4rem] py-[0.6rem]">
                                      <TableRow>
                                        <TableCell>
                                          <Textarea
                                            resize="y"
                                            value={considerText1}
                                            readOnly={!isConsiderEditMode}
                                            className="h-full w-full "
                                            onChange={(e) => isConsiderEditMode && setConsiderText1(e.target.value)}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                  <Table className="w-full">
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>심사기준</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody className="">
                                      <TableRow>
                                        <TableCell>
                                          <Textarea
                                            resize="y"
                                            value={considerText2}
                                            readOnly={!isConsiderEditMode}
                                            className="h-full w-full"
                                            onChange={(e) => isConsiderEditMode && setConsiderText2(e.target.value)}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </Grow>
                              </TableFoldBody>
                            </TableFold>
                          </Gcol>
                        </LayoutScrollItem>
                      </>
                    </Gcol>
                  )}
                  {active === 'tab2' && (
                    <TableFold className="mt-1">
                      <TableFoldHead title="질병관련 상세정보" />
                      <TableFoldBody>
                        <Gcol variant={'box-round'} className="h-[12rem]" placement="ss">
                          이미지노출
                        </Gcol>
                      </TableFoldBody>
                    </TableFold>
                  )}
                  {active === 'tab3' && (
                    <TableFold className="mt-1">
                      <TableFoldHead title="Mobile용 질병정보"></TableFoldHead>
                      <TableFoldBody className="gap-3">
                        <FormTable cols={['w-[10rem]', 'w-auto']}>
                          <FormRow vertical={false}>
                            <FormCell title={'발생부위'}>
                              <Input
                                width={'100%'}
                                placeholder=""
                                value={'갑상생 항진증, 갑상선기능항진증,갑상선독증, 고이터'}
                                readOnly
                              />
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title={'할증심사방법'}>
                              <CheckboxGroup
                                className="gap-3"
                                color="primary"
                                size="lg"
                                onValueChange={setSurchargeChecks}
                                minSelected={0}
                                value={surchargeChecks}
                                variant="default"
                              >
                                <CheckboxGroupItem value="a">고지할증</CheckboxGroupItem>
                                <CheckboxGroupItem value="b">전화인터뷰(TI)</CheckboxGroupItem>
                                <CheckboxGroupItem value="c">모바일인터뷰(MI)</CheckboxGroupItem>
                                <CheckboxGroupItem value="d">간편소견서</CheckboxGroupItem>
                                <CheckboxGroupItem value="e">약봉투</CheckboxGroupItem>
                                <CheckboxGroupItem value="f">서류</CheckboxGroupItem>
                                <CheckboxGroupItem value="g">할증대상</CheckboxGroupItem>
                              </CheckboxGroup>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title={'부담보'}>
                              <Checkbox onCheckedChange={() => {}} size="lg" variant="default">
                                부담보대상
                              </Checkbox>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title={'유병자상품'}>
                              <CheckboxGroup
                                className="gap-3"
                                color="primary"
                                size="lg"
                                onValueChange={setSurchargeChecks2}
                                minSelected={0}
                                value={surchargeChecks2}
                                variant="default"
                              >
                                <CheckboxGroupItem value="a1">SI경증</CheckboxGroupItem>
                                <CheckboxGroupItem value="a2">SI경증(담보제한)</CheckboxGroupItem>
                              </CheckboxGroup>
                            </FormCell>
                          </FormRow>
                        </FormTable>
                        <Grow gap={3} placement="ss">
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow>
                                <TableHead>(질병별) 심사기준</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="px-[0.4rem] py-[0.6rem]">
                              <TableRow>
                                <TableCell>
                                  <Textarea
                                    resize="y"
                                    value={considerText1}
                                    readOnly={!isConsiderEditMode}
                                    className="h-40 w-full "
                                    onChange={(e) => isConsiderEditMode && setConsiderText1(e.target.value)}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow>
                                <TableHead>(질병별) 심사기준</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="">
                              <TableRow>
                                <TableCell>
                                  <Textarea
                                    resize="y"
                                    value={considerText2}
                                    readOnly={!isConsiderEditMode}
                                    className="h-40"
                                    onChange={(e) => isConsiderEditMode && setConsiderText2(e.target.value)}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Grow>
                      </TableFoldBody>
                    </TableFold>
                  )}
                </TabPager>
              </Grid>
            </Grid>
          </Grid>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
