/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, GridApi, ICellRendererParams, RowClickedEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState, useCallback, useRef } from 'react';
import * as React from 'react';
import { createExpiryCellRenderer } from '@/shared/components/grid/CellRenderers';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { SearchIcon, QuestionMark } from '@icons';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  createTooltipValueGetter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
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
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

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
    field2: '척추만곡증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 3,
    field1: 'M34.5',
    field2: '척추분리증',
    field3: ['SI경증(감액)', '부담보'],
  },
  {
    id: 4,
    field1: 'M34.5',
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

type DummyDataType2 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  badge?: string[];
  checked?: boolean;
  checkedDisabled?: boolean;
  dateType?: 'month' | 'day';
};

const dummyData2: DummyDataType2[] = [
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
    field2: '급성인지 만성인지 명시되지 않은 기관지명 질병명',
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
  할증: 'bg-[var(--color-danger-50)] text-white',
  부담보: 'bg-[var(--color-success-60)] text-white',
  'SI경증(감액)': 'bg-[var(--color-warning-40)] text-white',
  // SI경증: 'bg-[var(--color-information-50)] text-white',
  SI경증: 'bg-[var(--color-information-50)] text-white',
};

const CheckedCellRenderer = ({ params }: { params: ICellRendererParams<DummyDataType2> }) => {
  const [localDateType, setLocalDateType] = React.useState<'month' | 'day'>(params.data?.dateType ?? 'month');
  const [localField5, setLocalField5] = React.useState<string>(String(params.data?.field5 ?? ''));
  const [localField6, setLocalField6] = React.useState<string>(String(params.data?.field6 ?? ''));
  const prevIdRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    const id = params.data?.id ?? -1;
    const dateType = params.data?.dateType ?? 'month';
    const field5 = String(params.data?.field5 ?? '');
    const field6 = String(params.data?.field6 ?? '');

    if (prevIdRef.current !== id) {
      setLocalDateType(dateType);
      setLocalField5(field5);
      setLocalField6(field6);
      prevIdRef.current = id;
    }
  }, [params.data?.id, params.data?.dateType, params.data?.field5, params.data?.field6]); // ✅ 직접 params.data?.id를 의존성에

  const handleDateTypeChange = useCallback(
    (val: string) => {
      const nextVal = val as 'month' | 'day';
      setLocalDateType(nextVal);
      setLocalField5('');
      if (params.node) {
        params.node.setDataValue('dateType', nextVal);
        params.node.setDataValue('field5', '');
      }
    },
    [params.node]
  );

  const handleDateChange = useCallback(
    (date: Date | undefined, dateVal: string) => {
      setLocalField5(dateVal);
      if (params.node) {
        params.node.setDataValue('field5', dateVal);
      }
    },
    [params.node]
  );

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

  return (
    <div
      className="flex flex-col items-start gap-1 w-full h-full p-1 justify-start"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Grow>
        <RadioGroup value={localDateType} onValueChange={handleDateTypeChange} className="flex gap-2 shrink-0">
          <RadioGroupItem value="month">월</RadioGroupItem>
          <RadioGroupItem value="day">일</RadioGroupItem>
        </RadioGroup>
        <DatePickerInput
          mode="single"
          size="lg"
          value={localField5}
          onChange={handleDateChange}
          monthOnly={localDateType === 'month'}
        />
      </Grow>
      <Input value={localField6} onChange={handleInputChange} placeholder="입력해주세요" width={100} />
    </div>
  );
};

const Ltpz112 = () => {
  const [rowData] = useState<DummyDataType[]>(DummyData);
  const [rowData2, setRowData2] = useState<DummyDataType2[]>(dummyData2);
  const gridRef2 = useRef<AgGridReact<DummyDataType2>>(null);
  const [searchWord] = useState('척추');
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const getExpiryRenderer = createExpiryCellRenderer<DummyDataType2>;

  // 셀 값 변경 시 상태 업데이트를 위한 핸들러 (입력한 값이 사라지지 않게 함)
  const onCellValueChanged2 = React.useMemo(
    () =>
      createCellValueChangedHandler<DummyDataType2, number>(
        ['checked', 'field5', 'field6', 'dateType'],
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

      // ✅ SI경증 포함 여부 확인 (정확한 문자열 매칭)
      const hasSIGyeongjeung = selectedRow.field3.includes('SI경증');

      return [
        ...prev,
        {
          id: nextId,
          field1: selectedRow.field1,
          field2: selectedRow.field2,
          field3: '3일이하',
          field4: 'Y',
          field5: '',
          field6: '',
          badge: selectedRow.field3,
          checked: hasSIGyeongjeung, // ✅ SI경증만 true
          checkedDisabled: hasSIGyeongjeung, // ✅ SI경증만 disabled
          dateType: 'month', // ✅ 기본값 추가
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

  // 종료시기 입력 헤더 컴포넌트
  const endTimeHeader = useCallback(
    () => (
      <Grow className="w-full pl-0.5" placement="sc" gap={0}>
        <span>종료시기 입력</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button only="icon" size="sm" variant="none" className="mt-[0.1rem]">
              <QuestionMark color2="#61554F" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={1} variant="default" className="z-[999] [&>span]:whitespace-auto!">
            <>
              입원/수술 종료일(or월)을 알고 있는 경우 경과기간을 자동 계산합니다.
              <br />
              종료월 입력 시에는 해당월의 마지막 날짜를 기준으로 계산합니다.
            </>
          </TooltipContent>
        </Tooltip>
      </Grow>
    ),
    []
  );

  // 질병명 셀 렌더러
  const titleRenderer = useCallback(
    (params: ICellRendererParams<DummyDataType2>) => {
      const badges = params.data?.badge ?? [];

      return (
        <Grow className="h-full pr-1.5" placement={'bwc'}>
          <p className="w-full flex-1 truncate pl-2">{params.data?.field2}</p>
          {badges.length > 0 && (
            <Grow className="shrink-0 flex-wrap gap-1" placement={'ec'}>
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
        cellClass: 'text-center !px-0',
        autoHeight: true,
      },
      {
        headerName: '질병명',
        field: 'field2',
        flex: 5,
        minWidth: attributeColumnWidth(200),
        cellClass: 'text-left !px-0',
        cellRenderer: titleRenderer,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field2' }),
      },
      {
        headerName: '입원',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerName: '수술',
        field: 'field4',
        width: attributeColumnWidth(40),
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerComponent: endTimeHeader,
        field: 'checked',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        cellClass: 'text-center editable-cell ',
        autoHeight: true,
        sortable: false,
        resizable: false,
        valueGetter: (params) => {
          if (params.data?.badge?.includes('SI경증')) {
            return true;
          }
          return params.data?.checked;
        },
        valueSetter: (params) => {
          params.data.checked = params.newValue;
          if (params.node) {
            params.api.refreshCells({ rowNodes: [params.node], columns: ['field6'], force: true });
          }
          return true;
        },
        editable: (params) => !params.data?.badge?.includes('SI경증'),
        cellDataType: 'boolean',
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellRendererParams: (params: ICellRendererParams<DummyDataType2>) => ({
          disabled: params.data?.badge?.includes('SI경증'),
        }),
      },
      {
        headerName: '경과기간(N년 이상)',
        field: 'field6',
        flex: 1,
        minWidth: attributeColumnWidth(220),
        cellClass: 'text-center editable-cell ag-row-selected h-full',
        autoHeight: true,
        editable: (params) => {
          return !params.data?.badge?.includes('SI경증') && !params.data?.checked;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['선택', '1년내', '2년내', '3년내', '4년내', '5년내', '6년내', '7년내', '8년내', '9년내', '10년내'],
        },
        cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
          const isReadOnly = params.data?.badge?.includes('SI경증');
          if (isReadOnly) {
            return <span className="w-full h-full text-left cursor-default text-[var(--color-gray-50)]">무관</span>;
          }

          const isChecked = params.data?.checked;

          if (isChecked) {
            return <CheckedCellRenderer params={params} />;
          }

          const ExpiryRenderer = getExpiryRenderer('center');
          return <ExpiryRenderer {...params} value={params.value || '선택'} />;
        },
      },
    ],
    [attributeColumnWidth, titleRenderer, endTimeHeader, getExpiryRenderer]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} className="w-[105rem]">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              입원/수술 정보 입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ112)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="w-full gap-3">
          <Grow className="grid w-full grid-cols-[24.7rem_1fr] gap-3" placement={'ss'}>
            {/* 많이찾는질병 & 질병검색 */}
            <Grid placement={'ss'} className="w-full h-full overflow-hidden grid-rows-[auto_1fr]" gap={5}>
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
                <Gcol variant="box-round" className="bg-[var(--color-blue-gray-15)]">
                  <Grow className="w-full">
                    <Input placeholder="병명 또는 코드 입력" className="w-full" />
                    <Button aria-label="검색" variant={'outlined'} size={'lg'} color="gray-light" only="icon">
                      <SearchIcon color2={'var(--color-primary-50)'} />
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
                      <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-[var(--color-information-50)]"></div>SI경증
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
                      onRowClicked={handleDiseaseRowClick}
                      rowClass="cursor-pointer"
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                </Gcol>
              </Grid>
            </Grid>
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
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
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
          </Grow>
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
