/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, GridApi, ICellRendererParams, RowClickedEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState, useCallback, useRef } from 'react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  createTooltipValueGetter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon, QuestionMark, InfoBoxWarningIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

export type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string[];
};

export const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: 'M34.5',
    field2: '척추관협착증척추관협착증척추관협착증',
    field3: ['할증', '부담보', 'SI경증'],
  },
  {
    id: 2,
    field1: 'M35.5',
    field2: '척추만곡증',
    field3: ['할증', '부담보'],
  },
  {
    id: 3,
    field1: 'M48.5',
    field2: '척추분리증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 4,
    field1: 'M00.5',
    field2: '척추전방전위증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 5,
    field1: 'M34.5',
    field2: '척추증, 척추병증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 6,
    field1: 'M34.5',
    field2: '경추, 흉추, 요추',
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

export type DummyDataType2 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5?: string | number;
  field6: string | number;
  badge?: string[];
  checked?: boolean;
  checkedDisabled?: boolean;
  dateType?: 'month' | 'day';
};

export const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field1: 'M00.0',
    field2: '척추관협착증',
    field3: '3일이하',
    field4: 'Y',
    field5: '',
    field6: '',
    badge: ['SI경증'],
    checked: true,
    checkedDisabled: true,
  },
  {
    id: 2,
    field1: 'M00.1',
    field2: '신장낭종',
    field3: '300일이하',
    field4: 'Y',
    field5: '',
    field6: '',
    badge: [],
    checked: false,
    checkedDisabled: false,
  },
  {
    id: 3,
    field1: 'M00.1',
    field2: '추간판탈출증',
    field3: '15일이하',
    field4: 'N',
    field5: '',
    field6: '',
    badge: ['SI경증(감액)'],
    checked: true,
    checkedDisabled: false,
  },
  {
    id: 4,
    field1: 'M00.1',
    field2: '질병명이 길어질 경우 두 줄로 표기됩니다. 풍선말은 반영하지 않습니다.',
    field3: '15일이하',
    field4: 'N',
    field5: '',
    field6: '',
    badge: [],
    checked: false,
    checkedDisabled: true,
  },
];

type BadgeType = '할증' | '부담보' | 'SI경증(감액)' | 'SI경증';

const BADGE_STYLES: Record<BadgeType, string> = {
  할증: 'bg-[var(--color-danger-10)] text-[var(--color-danger-50)]',
  부담보: 'bg-[var(--color-success-10)] text-[var(--color-success-50)]',
  'SI경증(감액)': 'bg-[var(--color-warning-10)] text-[var(--color-warning-50)]',
  SI경증: 'bg-[var(--color-information-10)] text-[var(--color-information-50)]',
};

/**
 * 경과기간(N년 이상) 컬럼의 커스텀 셀 렌더러 컴포넌트입니다.
 * '종료시기 입력' 체크박스 선택 여부에 따라 텍스트 인풋 또는 NativeSelect 드롭다운 및 DatePicker 피커가 유기적으로 전환되도록 제어합니다.
 */
const ExpiryInputCellRenderer = ({ params }: { params: ICellRendererParams<DummyDataType2> }) => {
  // '종료시기 입력' 체크박스 선택 상태
  const [isChecked, setIsChecked] = React.useState<boolean>(!!params.data?.checked);
  // 종료시기 입력 시 날짜 선택 모드 (월 단위 'month' 또는 일 단위 'day')
  const [localDateType, setLocalDateType] = React.useState<'month' | 'day'>(params.data?.dateType ?? 'month');
  // 종료일/월 데이트피커 문자열 값 (field5 에 매핑)
  const [localField5, setLocalField5] = React.useState<string>(String(params.data?.field5 ?? ''));
  // 경과기간 및 종료시기 텍스트 값 (field6 에 매핑)
  const [localField6, setLocalField6] = React.useState<string>(String(params.data?.field6 ?? ''));
  // 행(Row) 변경 감지를 위한 ref (그리드 가상화로 인한 렌더러 재사용 대응)
  const prevIdRef = React.useRef<number | undefined>(undefined);

  // 그리드 데이터(params.data) 또는 행 ID가 바뀔 때 로컬 React 상태와 agGrid 값 동기화
  React.useEffect(() => {
    const id = params.data?.id ?? -1;
    const checked = !!params.data?.checked;
    const dateType = params.data?.dateType ?? 'month';
    const field5 = String(params.data?.field5 ?? '');
    const field6 = String(params.data?.field6 ?? '');

    if (prevIdRef.current !== id) {
      setIsChecked(checked);
      setLocalDateType(dateType);
      setLocalField5(field5);
      setLocalField6(field6);
      prevIdRef.current = id;
    }
  }, [params.data?.id, params.data?.checked, params.data?.dateType, params.data?.field5, params.data?.field6]);

  // '종료시기 입력' 체크박스 변경 핸들러
  const handleCheckboxChange = useCallback(
    (checked: boolean) => {
      setIsChecked(checked);
      if (params.node) {
        params.node.setDataValue('checked', checked);
        // 체크 활성화 시 경과기간 초기화, 비활성화 시 '선택'으로 기본값 지정
        const defaultVal = checked ? '' : '선택';
        params.node.setDataValue('field6', defaultVal);
        setLocalField6(defaultVal);
        // 체크 해제 시 입력했던 종료일(날짜) 초기화
        if (!checked) {
          params.node.setDataValue('field5', '');
          setLocalField5('');
        }
      }
      // 체크 상태 변경으로 인한 높이 변화를 agGrid 그리드에 실시간 리셋 반영
      params.api.resetRowHeights();
    },
    [params.node, params.api]
  );

  // 날짜 타입 라디오 버튼 변경 핸들러 ('월' / '일')
  const handleDateTypeChange = useCallback(
    (val: string) => {
      const nextVal = val as 'month' | 'day';
      setLocalDateType(nextVal);
      if (params.node) {
        params.node.setDataValue('dateType', nextVal);
        // 월/일 단위가 전환되면 기존 입력했던 날짜 데이터 초기화
        params.node.setDataValue('field5', '');
        setLocalField5('');
      }
    },
    [params.node]
  );

  // DatePicker를 통해 날짜가 변경되었을 때 호출되는 핸들러 (field5 데이터 동기화)
  const handleDateChange = useCallback(
    (date: Date | undefined, dateVal: string) => {
      setLocalField5(dateVal);
      if (params.node) {
        params.node.setDataValue('field5', dateVal);
      }
    },
    [params.node]
  );

  // 경과기간 인풋(텍스트 상자) 값 변경 시 호출되는 핸들러 (field6 데이터 동기화)
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextVal = e.target.value;
      setLocalField6(nextVal);
      if (params.node) {
        params.node.setDataValue('field6', nextVal);
      }
    },
    [params.node]
  );

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const nextVal = e.target.value;
      setLocalField6(nextVal);
      if (params.node) {
        params.node.setDataValue('field6', nextVal);
      }
    },
    [params.node]
  );

  const tooltipElement = (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button only="icon" size="md" variant="none">
          <QuestionMark color="var(--color-gray-500)" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={1} variant="default" className="z-[999] [&>span]:whitespace-auto!">
        <>마지막 치료종료시기 (퇴원일 또는 수술일 등) 또는 경과년수를 입력해 주세요.</>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div
      className="flex flex-col items-start gap-1 w-full h-full py-1 justify-start"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Grow placement="sc">
        {isChecked ? (
          <Input value={localField6} onChange={handleInputChange} placeholder="" width={80} disabled />
        ) : (
          <NativeSelect value={localField6 || '선택'} onChange={handleSelectChange} width={80}>
            {[
              '선택',
              '3개월내',
              '1년이내',
              '2년이내',
              '3년이내',
              '4년이내',
              '5년이내',
              '6년이내',
              '7년이내',
              '8년이내',
              '9년이내',
              '10년이내',
            ].map((val) => (
              <NativeSelectOption key={val} value={val}>
                {val}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        )}
        <Grow gap={0.5}>
          <Checkbox checked={isChecked} onCheckedChange={(checked) => handleCheckboxChange(!!checked)}>
            종료시기 입력
          </Checkbox>
          {tooltipElement}
        </Grow>
      </Grow>

      {isChecked && (
        <Grow className="w-full justify-start gap-2 shrink-0">
          <RadioGroup
            value={localDateType}
            onValueChange={handleDateTypeChange}
            className="flex flex-row gap-3 shrink-0"
          >
            <RadioGroupItem value="month">월</RadioGroupItem>
            <RadioGroupItem value="day">일</RadioGroupItem>
          </RadioGroup>
          <div className={localDateType === 'month' ? 'expiry-month-picker' : ''}>
            <DatePickerInput
              mode="single"
              size="lg"
              value={localField5}
              onChange={handleDateChange}
              monthOnly={localDateType === 'month'}
            />
          </div>
        </Grow>
      )}
    </div>
  );
};

const DiseaseEmptyComponent = () => {
  return (
    <Gcol className="w-full h-full flex flex-col items-center justify-center">
      <InfoBoxWarningIcon color="var(--color-gray-50)" />
      <Typo variant="body-md" className="whitespace-pre-line text-center text-(--color-gray-70) break-keep">
        {'입원/수술 정보를 입력할 질병을\n검색하여 선택해 주세요.'}
      </Typo>
    </Gcol>
  );
};

export interface Ltpz112Props {
  initialRowData?: DummyDataType[];
  initialRowData2?: DummyDataType2[];
}

const Ltpz112 = ({ initialRowData = DummyData, initialRowData2 = [] }: Ltpz112Props) => {
  const [rowData, setRowData] = useState<DummyDataType[]>(initialRowData);
  const [rowData2, setRowData2] = useState<DummyDataType2[]>(initialRowData2);

  React.useEffect(() => {
    setRowData(initialRowData);
  }, [initialRowData]);

  React.useEffect(() => {
    setRowData2(initialRowData2);
  }, [initialRowData2]);
  const gridRef2 = useRef<AgGridReact<DummyDataType2>>(null);
  const [searchWord] = useState('척추');
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 셀 값 변경 시 상태 업데이트를 위한 핸들러 (입력한 값이 사라지지 않게 함)
  const onCellValueChanged2 = React.useMemo(
    () =>
      createCellValueChangedHandler<DummyDataType2, number>(
        ['checked', 'field6', 'dateType'],
        setRowData2,
        () => {},
        'id'
      ),
    []
  );

  // ✅ 체크박스 선택 최대 4건 제한
  const handleSelectionChanged = useCallback(() => {
    const api = gridRef2.current?.api;
    if (!api) return;

    const selectedRows = api.getSelectedRows();

    // 4건 초과 시 마지막 선택 취소
    if (selectedRows.length > 4) {
      const lastSelectedRow = selectedRows[selectedRows.length - 1];
      const rowNode = api.getRowNode(String(lastSelectedRow.id));

      if (rowNode) {
        rowNode.setSelected(false); // ✅ deselectRows 대신 setSelected 사용
      }

      // ✅ Alert 대신 선택 최대값 안내
      alert('최대 4건까지만 선택할 수 있습니다.');
    }
  }, []);

  // ✅ getBadge 콜백 - 의존성 배열이 비어있어도 OK
  const getBadge = useCallback((badge: string) => {
    return BADGE_STYLES[badge as BadgeType] ?? 'bg-[var(--color-blue-gray-40)] text-white';
  }, []);

  const handleDelete = useCallback(() => {
    const api: GridApi<DummyDataType2> | undefined = gridRef2.current?.api;
    if (!api) return;
    const selectedIds = new Set(api.getSelectedRows().map((row) => row.id));
    if (selectedIds.size === 0) return;
    setRowData2((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, []);

  const handleDiseaseRowClick = useCallback((event: RowClickedEvent<DummyDataType>) => {
    const selectedRow = event.data;

    if (!selectedRow) return;

    setRowData2((prev) => {
      if (prev.length >= 4) return prev;

      const nextId = prev.length > 0 ? Math.max(...prev.map((row) => row.id)) + 1 : 1;

      const hasSIGyeongjeung = selectedRow.field3.includes('SI경증');
      const hasSIGyeongjeungGamaek = selectedRow.field3.includes('SI경증(감액)');
      const defaultChecked = hasSIGyeongjeungGamaek;

      return [
        ...prev,
        {
          id: nextId,
          field1: selectedRow.field1,
          field2: selectedRow.field2,
          field3: '3일이하',
          field4: 'Y',
          field5: '',
          field6: defaultChecked ? '' : '선택',
          badge: selectedRow.field3,
          checked: defaultChecked,
          checkedDisabled: hasSIGyeongjeung,
          dateType: 'month',
        },
      ];
    });
  }, []);

  // 질병 검색 agGrid
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: 'KCD코드',
      field: 'field1',
      width: 70,
      cellClass: 'text-center ag-header-multiline',
    },
    {
      headerName: '질병명',
      field: 'field2',
      flex: 2,
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
                  <b key={idx} className="font-bold text-[var(--color-primary-50)]">
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

  // 질병명 셀 렌더러
  const titleRenderer = useCallback(
    (params: ICellRendererParams<DummyDataType2>) => {
      const badges = params.data?.badge ?? [];

      return (
        <Grow className="h-auto w-full py-1.5" placement={'bwc'}>
          <p className="w-full flex-1 whitespace-normal leading-5">{params.data?.field2}</p>
          {badges.length > 0 && (
            <Grow className="shrink-0 flex-wrap" placement={'ec'}>
              {badges.map((badge) => (
                <span
                  key={`${params.data?.id ?? 'row'}-${badge}`}
                  className={`inline-flex h-[1.8rem] items-center rounded px-1.5 text-[1rem] font-semibold leading-none ${getBadge(
                    badge
                  )}`}
                >
                  {badge}
                </span>
              ))}
            </Grow>
          )}
        </Grow>
      );
    },
    [getBadge]
  );

  // 입원/수술 정보 입력 agGrid
  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: 'KCD코드',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        autoHeight: true,
        cellClass: 'text-center !px-0 !flex !justify-center',
        cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
          return <span className="flex items-center justify-center h-full w-full">{params.value}</span>;
        },
      },
      {
        headerName: '질병명',
        field: 'field2',
        flex: 5,
        cellClass: 'text-left',
        autoHeight: true,
        cellRenderer: titleRenderer,
      },
      {
        headerName: '입원',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        autoHeight: true,
        cellClass: 'text-center !flex !justify-center',
      },
      {
        headerName: '수술',
        field: 'field4',
        width: attributeColumnWidth(40),
        autoHeight: true,
        cellClass: 'text-center !flex !justify-center',
      },
      {
        headerName: '경과기간(N년 이상)',
        field: 'field6',
        flex: 5,
        headerClass: 'ag-header-color',
        cellClass: 'text-center editable-cell',
        autoHeight: true,
        editable: false,
        cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
          const isReadOnly = params.data?.badge?.includes('SI경증');
          if (isReadOnly) {
            return (
              <div
                className="flex items-center justify-start w-full h-full"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <Input value="무관" readOnly disabled width={80} />
              </div>
            );
          }

          return <ExpiryInputCellRenderer params={params} />;
        },
      },
    ],
    [attributeColumnWidth, titleRenderer]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} className="w-[100rem]">
        <style>{`
          .expiry-month-picker input {
            width: 6.7rem !important;
          }
        `}</style>
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              간편고지 입원/수술 정보(최대4건)
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ112)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="w-full gap-3">
          <ResizablePanelGroup orientation="horizontal" className="w-full">
            <ResizablePanel defaultSize={31} maxSize={290}>
              {/* 많이찾는질병 & 질병검색 */}
              <Grid placement={'ss'} className="w-full h-full overflow-hidden grid-rows-[auto_1fr]" gap={3}>
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
                  </Grow>
                  <Gcol variant="box-round" className="bg-[var(--color-blue-gray-15)]" gap={2}>
                    <Grow className="w-full">
                      <Input placeholder="병명 또는 코드 입력" className="w-full" />
                      <Button aria-label="검색" variant={'outlined'} size={'lg'} color="gray-light" only="icon">
                        <SearchIcon color2={'var(--color-primary-50)'} />
                      </Button>
                    </Grow>
                    <Gcol placement={'ss'} className="w-full">
                      <Typo>
                        총 <b className="text-[var(--color-primary-50)]">18건</b>
                      </Typo>
                      <Grow className="text-[1.1rem] w-full" placement="sc">
                        <Grow placement="sc">
                          <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-danger-50)]"></div>할증
                        </Grow>
                        <Grow placement="sc">
                          <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-success-60)]"></div>부담보
                        </Grow>
                        <Grow placement="sc">
                          <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-information-50)]"></div>
                          SI경증
                        </Grow>
                        <Grow placement="sc">
                          <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-warning-40)]"></div>
                          SI경증(감액)
                        </Grow>
                      </Grow>
                      <div className="ag-theme-alpine min-h-[30rem] ">
                        <AgGridReact<DummyDataType>
                          noRowsOverlayComponent={DiseaseEmptyComponent}
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData}
                          columnDefs={columnDefs}
                          onRowClicked={handleDiseaseRowClick}
                          rowClass="cursor-pointer"
                          domLayout="normal"
                          tooltipShowMode="whenTruncated"
                          tooltipShowDelay={0}
                        />
                      </div>
                    </Gcol>
                  </Gcol>
                </Grid>
              </Grid>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={69}>
              <TableFold>
                <TableFoldHead title="입원/수술 정보 입력(최대 4건)">
                  <Button variant={'outlined'} size={'md'} color={'gray'} onClick={handleDelete}>
                    삭제
                  </Button>
                </TableFoldHead>
                <TableFoldBody>
                  <div className="ag-theme-alpine w-full inner-scroll" data-row={rowData2.length}>
                    <AgGridReact<DummyDataType2>
                      ref={gridRef2}
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      noRowsOverlayComponentParams={{ message: '질병을 검색하여 선택해 주세요.' }}
                      rowData={rowData2}
                      columnDefs={columnDefs2}
                      singleClickEdit={true}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                        cellClass: ['transition-none'],
                      }}
                      onCellValueChanged={onCellValueChanged2}
                      onSelectionChanged={handleSelectionChanged} // 최대 4건 제한
                      domLayout="autoHeight"
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        cellClass: 'text-center editable-cell',
                        width: attributeColumnWidth(30),
                      }}
                      animateRows={false}
                    />
                  </div>
                </TableFoldBody>
              </TableFold>
            </ResizablePanel>
          </ResizablePanelGroup>
          <Grow className="grid w-full grid-cols-[24.7rem_1fr] gap-3" placement={'ss'}></Grow>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                적용
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

export default Ltpz112;
