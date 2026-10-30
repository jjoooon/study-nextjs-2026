/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellValueChangedEvent, ColDef, ColGroupDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';
import * as React from 'react';

import {
  AgGridEmptyComponent,
  createTooltipValueGetter,
  DatePickerCellEditor,
  editableSelectCellRenderer,
  numberValueFormatter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ZoomInIcon, ZoomOutIcon } from '@icons';
import { Button } from '@uiux/Button';

import '@/shared/lib/agGridPub';

// --- 골프용품손해(실손) 데이터 및 타입 ---
type GolfItemDataType = {
  id: number;
  isNew: boolean;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};

const golfItemDummyData: GolfItemDataType[] = [
  {
    id: 1,
    isCheck: false,
    isNew: false,
    field01: '선택',
    field02: '3대진단형3대진단형3대진단형3대진단형',
    field03: '2026-04',
    field04: 3000,
  },
  {
    id: 2,
    isCheck: false,
    isNew: false,
    field01: '선택',
    field02: '3대진단형',
    field03: '2026-03',
    field04: 3000,
  },
  {
    id: 3,
    isCheck: false,
    isNew: false,
    field01: '선택',
    field02: '3대진단형',
    field03: '2026-03',
    field04: 3000,
  },
];

// --- 시설소유(관리)자배상책임 데이터 및 타입 ---
type FacilityLiabilityDataType = {
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
};

const facilityLiabilityDummyData: FacilityLiabilityDataType[] = [
  {
    id: 1,
    field01: '',
    field02: 'TEXT',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
  },
];

const Ltpz01602 = () => {
  // 1. 골프용품손해 state & handlers
  const [golfRowData, setGolfRowData] = useState<GolfItemDataType[]>(golfItemDummyData);
  const golfGridApiRef = useRef<GridApi<GolfItemDataType> | null>(null);

  const handleDeleteRow = useCallback(() => {
    const gridApi = golfGridApiRef.current;
    if (!gridApi) return;

    const selectedIds = new Set(
      gridApi
        .getSelectedNodes()
        .map((node) => node.data?.id)
        .filter((id) => id !== undefined)
    );
    if (selectedIds.size === 0) return;

    setGolfRowData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, []);

  const handleAddRow = useCallback(() => {
    const nextId = golfRowData.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
    const newRow: GolfItemDataType = {
      id: nextId,
      isCheck: false,
      isNew: true,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
    };

    setGolfRowData((prev) => [...prev, newRow]);

    requestAnimationFrame(() => {
      const gridApi = golfGridApiRef.current;
      if (!gridApi) return;

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
    });
  }, [golfRowData]);

  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<GolfItemDataType>) =>
        editableSelectCellRenderer<GolfItemDataType>({ ...params, align }),
    []
  );

  const handleGolfCellValueChanged = useCallback((params: CellValueChangedEvent<GolfItemDataType>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setGolfRowData((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

  const { attributeColumnWidth } = useDynamicColumnWidths();

  const golfColumnDefs: ColDef<GolfItemDataType>[] = [
    {
      headerName: '순번',
      field: 'id',
      width: attributeColumnWidth(50),
      cellClass: 'text-center',
    },
    {
      headerName: '어린이놀이시설 배상책임 가입여부',
      field: 'field01',
      flex: 1,
      minWidth: attributeColumnWidth(120),
      cellClass: 'text-center editable-cell',
      cellEditor: 'agSelectCellEditor',
      editable: true,
      cellEditorParams: { values: ['선택', '선택1', '선택2'] },
      cellRenderer: expiryCellRenderer('center'),
    },
    {
      headerName: '브랜드명',
      field: 'field02',
      flex: 10,
      cellClass: 'text-left editable-cell',
      editable: true,
      tooltipValueGetter: createTooltipValueGetter<GolfItemDataType>({ field: 'field02' }),
    },
    {
      headerName: '구입년월',
      field: 'field03',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center editable-cell',
      cellEditor: DatePickerCellEditor,
      cellEditorParams: {
        monthOnly: true,
      },
      editable: true,
    },
    {
      headerName: '구입가격(만원)',
      field: 'field04',
      flex: 1,
      minWidth: attributeColumnWidth(130),
      cellClass: 'text-right editable-cell',
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
      editable: true,
    },
  ];

  // 2. 시설소유(관리)자배상책임 ag-grid renderer & defs
  const facilityColumnDefs: (ColDef<FacilityLiabilityDataType> | ColGroupDef<FacilityLiabilityDataType>)[] = [
    {
      headerName: '업종구분',
      field: 'field01',
      flex: 10,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center editable-cell',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택1', '선택2'] },
      cellRenderer: expiryCellRenderer('center'),
    },
    {
      headerName: '규모',
      flex: 1,
      cellClass: 'text-center',
      children: [
        {
          headerName: '규모',
          field: 'field02',
          flex: 1,
          minWidth: attributeColumnWidth(90),
          cellClass: 'text-right editable-cell',
          editable: true,
        },
        {
          headerName: '규모단위',
          field: 'field03',
          flex: 1,
          minWidth: attributeColumnWidth(40),
          cellClass: 'text-center',
        },
        {
          headerName: '보조규모',
          field: 'field04',
          flex: 1,
          minWidth: attributeColumnWidth(90),
          cellClass: 'text-right editable-cell',
          editable: true,
        },
        {
          headerName: '보조규모단위',
          field: 'field05',
          flex: 1,
          minWidth: attributeColumnWidth(40),
          cellClass: 'text-center',
        },
      ],
    },
    {
      headerName: '보상한도',
      field: 'field06',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center editable-cell',
      editable: true,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
      cellEditor: 'agSelectCellEditor',
      cellRenderer: expiryCellRenderer('center'),
    },
    {
      headerName: '자기부담금',
      field: 'field07',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center editable-cell',
      editable: true,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
      cellEditor: 'agSelectCellEditor',
      cellRenderer: expiryCellRenderer('center'),
    },
    {
      headerName: '보험료',
      field: 'field08',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center',
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '트램플린 (에어바운스)',
      field: 'field09',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center editable-cell',
      editable: true,
      // headerComponent: () => (
      //   <div className="w-full text-center whitespace-normal px-1">
      //     트램플린
      //     <br />
      //     (에어바운스)
      //   </div>
      // ),
      cellEditor: 'agSelectCellEditor',
      cellRenderer: expiryCellRenderer('center'),
    },
    {
      headerName: '요양병원여부',
      field: 'field10',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'text-center',
    },
  ];

  return (
    <>
      <TableFold className="grid-rows-[auto_1fr]">
        <TableFoldHead title="골프용품손해(실손)">
          <Grow>
            <Button color="gray" variant="outlined" onClick={handleAddRow}>
              행추가
              <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
            </Button>
            <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
              행삭제
              <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
            </Button>
          </Grow>
        </TableFoldHead>
        <TableFoldBody>
          <div className="ag-theme-alpine inner-scroll" data-row={golfRowData.length}>
            <AgGridReact<GolfItemDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={golfRowData}
              columnDefs={golfColumnDefs}
              onCellValueChanged={handleGolfCellValueChanged}
              enableCellSpan={true}
              singleClickEdit={true}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowSelection={{
                mode: 'multiRow',
                headerCheckbox: false,
                checkboxes: true,
                enableClickSelection: false,
              }}
              selectionColumnDef={{
                headerName: '선택',
                width: 30,
                cellClass: 'editable-cell',
              }}
              getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
              onGridReady={(params) => {
                golfGridApiRef.current = params.api;
              }}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </TableFoldBody>
      </TableFold>

      <TableFold>
        <TableFoldHead title="시설소유(관리)자배상책임" />
        <TableFoldBody className="gap-2">
          <div className="ag-theme-alpine inner-scroll" data-row={facilityLiabilityDummyData.length}>
            <AgGridReact<FacilityLiabilityDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={facilityLiabilityDummyData}
              columnDefs={facilityColumnDefs}
              defaultColDef={{ sortable: false }}
              enableCellSpan={true}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
              singleClickEdit={true}
              rowSelection={{
                mode: 'multiRow',
                headerCheckbox: false,
                checkboxes: true,
                enableClickSelection: false,
              }}
              groupHeaderHeight={30}
              headerHeight={0}
              selectionColumnDef={{
                headerName: '선택',
                width: 30,
                cellClass: 'editable-cell',
              }}
            />
          </div>
          <Gcol variant={'box-info'} placement={'ss'} className="w-full">
            <Typo variant={'body-sm'} icon={'info'}>
              해당업종의 면적은 ㎡단위(1평=3.3㎡)로 입력하시기 바랍니다.
            </Typo>
          </Gcol>
        </TableFoldBody>
      </TableFold>
    </>
  );
};

export default Ltpz01602;
