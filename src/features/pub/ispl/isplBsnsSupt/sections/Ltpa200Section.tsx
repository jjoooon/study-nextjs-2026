'use client';

// M1. 팝업에서 화면으로 변경, 전체 수정

import {
  AgGridEmptyComponent,
  DatePickerCellEditor,
  useAgGridInfiniteAppend,
  createFieldRenderer,
  editableSelectCellRenderer,
} from '@aggrid';
import { Grid, Grow, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

import { TableMore } from '@common/TablePagination';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type {
  ColDef,
  EditableCallbackParams,
  GridApi,
  ICellEditorParams,
  ICellRendererParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback } from 'react';
import * as React from 'react';
import { createTooltipValueGetter } from '@/shared/components/agGridUtils';
import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';
import { useFormFields } from '@/shared/hooks/useFormFields';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  isCheck: boolean;
  isNew: boolean;
  field01: string | number;
  field02: string | number;
  searchInputValue: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    isNew: false,
    field01: '취급직원',
    field02: '대상대상대상대상대상대상대상대상대상대상대상대상',
    searchInputValue: '',
    field03: '2023-03-01',
    field04: '9999-12-31',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 2,
    isCheck: false,
    isNew: false,
    field01: '취급직원',
    field02: '',
    searchInputValue: '',
    field03: '2023-03-01',
    field04: '9999-12-31',
    field05: '',

    field06: '',
    field07: '김한화',
  },
  {
    id: 3,
    isCheck: false,
    isNew: false,
    field01: '취급직원',
    field02: '',
    searchInputValue: '',
    field03: '2023-03-01',
    field04: '9999-12-31',
    field05: '',
    field06: '',
    field07: '',
  },
];

const targetNameByCode = new Map(
  DummyData.filter((item) => String(item.field02).trim() !== '').map((item) => [
    String(item.field02),
    String(item.field03),
  ])
);

type TargetCellEditorRef = {
  getValue: () => string;
  isCancelAfterEnd: () => boolean;
};

const TargetCellEditor = React.forwardRef<TargetCellEditorRef, ICellEditorParams<DummyDataType>>((props, ref) => {
  const [value, setValue] = React.useState<string>(String(props.data?.searchInputValue ?? ''));
  const valueRef = React.useRef<string>(String(props.data?.searchInputValue ?? ''));
  const isSearchConfirmedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const initialValue = String(props.data?.searchInputValue ?? '');

    setValue(initialValue);
    valueRef.current = initialValue;
    isSearchConfirmedRef.current = false;
  }, [props.data?.searchInputValue]);

  React.useImperativeHandle(
    ref,
    () => ({
      getValue: () => valueRef.current,
      isCancelAfterEnd: () => !isSearchConfirmedRef.current,
    }),
    []
  );

  return (
    // 행추가시 검색창 input 클릭시 편집모드 진입 및 검색어 입력 가능하도록 수정
    <Grow className="w-full px-1">
      <Input
        aria-label=""
        width={'100%'}
        value={value}
        size="sm"
        autoFocus
        onChange={(e) => {
          const nextValue = e.target.value;

          valueRef.current = nextValue;
          isSearchConfirmedRef.current = false;
          setValue(nextValue);
          props.node.setDataValue('searchInputValue', nextValue);
        }}
      />
      <Button
        aria-label="검색"
        variant={'outlined'}
        only="icon"
        size={'md'}
        color={'gray-light'}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();

          const selectedCode = valueRef.current.trim();
          const targetName = targetNameByCode.get(selectedCode) ?? '';

          valueRef.current = selectedCode;
          setValue(selectedCode);
          props.node.setDataValue('searchInputValue', selectedCode);
          props.node.setDataValue('field03', targetName);
          isSearchConfirmedRef.current = true;
          props.stopEditing?.();
        }}
      >
        <SearchIcon color={'var(--color-primary-50)'} />
      </Button>
    </Grow>
  );
});

TargetCellEditor.displayName = 'TargetCellEditor';

export default function Ltpa200Section() {
  const pageSize = 2;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });

  // 새로 추가한 행만 편집 가능
  const isEditableNewRow = React.useCallback(
    (params: EditableCallbackParams<DummyDataType>) => params.data?.isNew === true,
    []
  );
  const existingRowFieldRenderer = React.useMemo(
    () => createFieldRenderer<DummyDataType>('field02', 'field03', 'row'),
    []
  );

  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<DummyDataType>) =>
        editableSelectCellRenderer<DummyDataType>({ ...params, align }),
    []
  );

  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      field: 'field01',
      flex: 1,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      editable: isEditableNewRow,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '취급직원', ''] },
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '대상',
      field: 'field02',
      flex: 2,
      cellClass: 'flex! items-center! justify-center! text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
      editable: isEditableNewRow,
      cellEditor: TargetCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          const rowIndex = params.node.rowIndex;

          return (
            <Grow className="w-full px-1">
              <div
                className="w-full min-w-0"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  if (rowIndex === null) {
                    return;
                  }

                  params.node.setDataValue('searchInputValue', String(params.data?.field02 ?? ''));
                  params.api.startEditingCell({ rowIndex, colKey: 'field02' });
                }}
              >
                <Input
                  aria-label=""
                  width={'100%'}
                  value={''}
                  size="sm"
                  variant="ghost"
                  className="pointer-events-none"
                />
              </div>
              <Button
                aria-label="검색"
                variant={'outlined'}
                only="icon"
                size={'md'}
                color={'gray-light'}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  if (rowIndex === null) {
                    return;
                  }

                  params.node.setDataValue('searchInputValue', String(params.data?.field02 ?? ''));
                  params.api.startEditingCell({ rowIndex, colKey: 'field02' });
                }}
              >
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          );
        }
        return existingRowFieldRenderer(params);
      },
    },
    {
      headerName: '적용시작일자',
      field: 'field03',
      width: 120,
      cellClass: 'flex! items-center! justify-center!',
      editable: isEditableNewRow,
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '적용종료일자',
      field: 'field04',
      width: 120,
      cellClass: 'flex! items-center! justify-center!',
      editable: isEditableNewRow,
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '상태',
      field: 'field05',
      flex: 0.8,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      editable: isEditableNewRow,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '정상', ''] },
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '적용사유',
      field: 'field06',
      flex: 2,
      cellClass: 'flex! items-center! justify-center!',
      editable: isEditableNewRow,
      cellEditor: 'agInputCellEditor',
    },
    {
      headerName: '등록자',
      field: 'field07',
      flex: 0.7,
      cellClass: 'flex! items-center! justify-center!',
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });

  // agGrid 행삭제
  const handleDeleteRow = React.useCallback(() => {
    const gridApi = gridApiRef.current;
    if (!gridApi) return;

    const selectedIds = new Set(
      gridApi
        .getSelectedNodes()
        .map((node) => node.data?.id)
        .filter((id) => id !== undefined)
    );
    if (selectedIds.size === 0) return;

    setRowData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, []);

  // agGrid 행추가
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const handleAddRow = React.useCallback(() => {
    const nextId = rowData.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
    const newRow: DummyDataType = {
      id: nextId,
      isCheck: false,
      isNew: true,
      field01: '',
      field02: '',
      searchInputValue: '',
      field03: '',
      field04: '',
      field05: '',
      field06: '',
      field07: '',
    };

    setRowData((prev) => [...prev, newRow]);

    requestAnimationFrame(() => {
      const gridApi = gridApiRef.current;

      if (!gridApi) {
        return;
      }

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
    });
  }, [rowData]);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '신계약스캔권한관리',
            pageId: 'LTPA200',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr]" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
                caption="장기보험 모집자 설계 조회 테이블"
                cols={['w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'등록항목'}>
                    <NativeSelect
                      aria-label="항목 선택"
                      width={108}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                      required
                    >
                      {[
                        { value: 'selection', id: 'type01-1', label: '장기보험' },
                        { value: 'selection2', id: 'type01-2', label: '장기보험2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'조직구분'}>
                    <NativeSelect
                      aria-label="조직구분 선택"
                      width={108}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      required
                    >
                      {[
                        { value: 'selection', id: 'type02-1', label: '선택' },
                        { value: 'selection', id: 'type02-2', label: '취급기관' },
                        { value: 'selection2', id: 'type02-3', label: '취급직원' },
                        { value: 'selection3', id: 'type02-4', label: '사용인' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input aria-label="" width={110} value={''} readOnly />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={120} value={'김한화'} readOnly />
                    <Grow className="ml-6">
                      <NativeSelect
                        aria-label="조직구분 선택"
                        width={90}
                        value={form.type03}
                        onChange={(e) => setFormField('type03', e.target.value)}
                      >
                        {[
                          { value: 'selection', id: 'type03-1', label: '선택' },
                          { value: 'selection2', id: 'type03-2', label: '기준일자' },
                        ].map((option) => (
                          <NativeSelectOption key={option.id} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <DatePickerInput mode="single" onChange={() => {}} size="lg" value="" />
                    </Grow>
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
              <TableFoldHead title="등록사항">
                <Grow>
                  <Button color="gray" variant="outlined" onClick={handleAddRow}>
                    행추가
                  </Button>
                  <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                    행삭제
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <Gcol className="w-full" gap={1}>
                  <div className="ag-theme-alpine min-h-[18.4rem]">
                    <AgGridReact<DummyDataType>
                      // getRowId 적용: id 필드를 고유 식별자로 사용
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      enableCellSpan={true}
                      singleClickEdit={true}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '√',
                        cellClass: 'text-center',
                        width: 30,
                      }}
                      // 행추가 된 rowCell
                      getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                      onGridReady={(params) => {
                        gridApiRef.current = params.api;
                      }}
                    />
                  </div>
                  <TableMore
                    isAll={false}
                    loadedCount={loadedCount}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onLoadAll={handleLoadAll}
                    onLoadNext={handleLoadNext}
                  />
                </Gcol>
              </TableFoldBody>
            </TableFold>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              <Grow gap={1}>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  저장
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
