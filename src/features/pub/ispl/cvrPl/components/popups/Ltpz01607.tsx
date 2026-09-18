/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellValueChangedEvent, ColDef, ColGroupDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';
import * as React from 'react';

import { createExpiryCellRenderer } from '@/shared/components/grid/CellRenderers';
import { AgGridEmptyComponent } from '@aggrid';
import { Grow } from '@atoms';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { QueryIcon } from '@icons';
import { Button } from '@uiux/Button';
import '@/shared/lib/agGridPub';

type DataType = {
  id: number;
  field01: string; // 시설종류
  field02: string; // 세부업종
  field03: string; // 면적(또는 인원)
  field04: string; // 대인(1인당)
  field05: string; // 대인(1사고당)
  field06: string; // 대물
  field07: string; // 자기부담금
  field08: string; // 어린이놀이시설 배상책임 가입여부
};

const getExpiryRenderer = (align: 'left' | 'center' | 'right' = 'center') => createExpiryCellRenderer<DataType>(align);

const formatNumberWithComma = (str: string) => {
  const rawNum = str.replace(/[^0-9.-]/g, '');
  if (!rawNum || isNaN(Number(rawNum))) return str;
  const parts = rawNum.split('.');
  parts[0] = Number(parts[0]).toLocaleString();
  return parts.join('.');
};

type WonUnitCellEditorProps = {
  value?: any;
  onValueChange?: (value: string) => void;
  stopEditing?: () => void;
  [key: string]: any;
};

// 규모(면적/인원) 셀 에디터
const ScaleUnitCellEditor = (props: WonUnitCellEditorProps) => {
  const facilityType = props.node?.data?.field01 ?? props.data?.field01 ?? '';
  const isSpanMode = facilityType === '모자원' || facilityType === '노숙인시설';
  const unitText = isSpanMode ? '명' : '㎡';

  const rawValue = props.value == null ? '' : String(props.value);
  const editorValue = formatNumberWithComma(rawValue.replace(/[^0-9.-]/g, '').trim());

  if (isSpanMode) {
    return (
      <Grow placement="cc" className="h-full w-full gap-1 px-1 bg-white">
        <span className="w-full text-right px-1 text-xs font-normal text-gray-800">{editorValue || '0'}</span>
        <span className="shrink-0 text-xs">{unitText}</span>
      </Grow>
    );
  }

  return (
    <Grow placement="cc" className="h-full w-full gap-1 px-1 bg-white">
      <input
        className="ag-input-field-input ag-text-field-input w-full text-right outline-none focus:border-primary-500 border border-gray-300 rounded px-1 text-xs"
        value={editorValue}
        onChange={(event) => {
          const val = formatNumberWithComma(event.target.value.replace(/[^0-9.-]/g, '').trim());
          props.onValueChange?.(val ? `${val}${unitText}` : '');
        }}
        onBlur={() => props.stopEditing?.()}
        autoFocus
      />
      <span className="shrink-0 text-xs">{unitText}</span>
    </Grow>
  );
};

const dummyData: DataType[] = [
  {
    id: 1,
    field01: '모자원',
    field02: '선택1',
    field03: '50명',
    field04: '1,000만원',
    field05: '5,000만원',
    field06: '선택1',
    field07: '선택1',
    field08: '아니오',
  },
  {
    id: 2,
    field01: '성폭력피해보호시설',
    field02: '선택1',
    field03: '100㎡',
    field04: '1,000만원',
    field05: '5,000만원',
    field06: '선택1',
    field07: '선택1',
    field08: '아니오',
  },
];

const columnDefs: (ColDef<DataType> | ColGroupDef<DataType>)[] = [
  {
    headerName: '업종',
    headerClass: 'text-center',
    headerGroupComponent: () => (
      <Grow placement="cc" className="w-full gap-0">
        <b className="text-[1.3rem]!">업종</b>
        <Button variant="none" size="xs">
          <QueryIcon size={14} />
        </Button>
      </Grow>
    ),
    children: [
      {
        headerName: '시설종류',
        field: 'field01',
        flex: 1,
        cellClass: 'text-center editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['모자원', '노숙인시설', '가정폭력보호시설', '성폭력피해보호시설'] },
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '세부업종',
        field: 'field02',
        flex: 1,
        cellClass: 'text-center editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['선택1', '선택2'] },
        cellRenderer: getExpiryRenderer('center'),
      },
    ],
  },
  {
    headerName: '규모',
    headerGroupComponent: () => (
      <Grow placement="cc" className="w-full">
        <b className="text-[1.3rem]!">규모</b>
      </Grow>
    ),
    headerClass: 'text-center',
    children: [
      {
        headerName: '면적(또는 인원)',
        field: 'field03',
        flex: 1,
        cellClass: 'text-right editable-cell',
        editable: (params) => {
          const facilityType = params.data?.field01 ?? '';
          return facilityType !== '모자원' && facilityType !== '노숙인시설';
        },
        cellEditor: ScaleUnitCellEditor,
        valueFormatter: (params) => {
          if (!params.value) return '';
          const str = String(params.value).trim();
          const facilityType = params.data?.field01 ?? '';
          const unit = facilityType === '모자원' || facilityType === '노숙인시설' ? '명' : '㎡';
          if (str.endsWith(unit)) return str;
          const num = formatNumberWithComma(str.replace(/[^0-9.-]/g, ''));
          return num ? `${num}${unit}` : str;
        },
      },
    ],
  },
  {
    headerName: '보상한도',
    headerGroupComponent: () => (
      <Grow placement="cc" className="w-full">
        <b className="text-[1.3rem]!">보상한도</b>
      </Grow>
    ),
    headerClass: 'text-center',
    children: [
      {
        headerName: '대인(1인당)',
        field: 'field04',
        flex: 1,
        cellClass: 'text-center editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['1,000만원', '10,000만원'] },
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '대인(1사고당)',
        field: 'field05',
        flex: 1,
        cellClass: 'text-center editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['5,000만원', '10억'] },
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '대물',
        field: 'field06',
        flex: 1,
        cellClass: 'text-center editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['선택1', '선택2'] },
        cellRenderer: getExpiryRenderer('center'),
      },
    ],
  },
  {
    headerName: '자기부담금',
    field: 'field07',
    flex: 1,
    cellClass: 'text-center editable-cell',
    editable: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { values: ['선택1', '선택2'] },
    cellRenderer: getExpiryRenderer('center'),
  },
  {
    headerName: '어린이놀이시설 배상책임 가입여부',
    headerComponent: () => (
      <Grow placement="cc" className="w-full">
        <b className="text-[1.3rem]! text-center">
          어린이놀이시설
          <br />
          배상책임 가입여부
        </b>
      </Grow>
    ),
    field: 'field08',
    flex: 1,
    cellClass: 'text-center',
  },
];

const Ltpz01607 = () => {
  const [rowData, setRowData] = useState<DataType[]>(dummyData);
  const gridApiRef = useRef<GridApi<DataType> | null>(null);

  const handleCellValueChanged = useCallback((params: CellValueChangedEvent<DataType>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setRowData((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

  return (
    <TableFold>
      <TableFoldHead title="사회복지시설소유(관리)자배상책임" />
      <TableFoldBody className="gap-2">
        <div className="ag-theme-alpine inner-scroll" data-rows={rowData.length}>
          <AgGridReact<DataType>
            getRowId={(params) => String(params.data.id)}
            noRowsOverlayComponent={AgGridEmptyComponent}
            rowData={rowData}
            columnDefs={columnDefs}
            onCellValueChanged={handleCellValueChanged}
            defaultColDef={{ sortable: false }}
            enableCellSpan={true}
            tooltipShowMode="whenTruncated"
            tooltipShowDelay={0}
            singleClickEdit={true}
            headerHeight={30}
            groupHeaderHeight={30}
            onGridReady={(params) => {
              gridApiRef.current = params.api;
            }}
          />
        </div>
      </TableFoldBody>
    </TableFold>
  );
};

export default Ltpz01607;
