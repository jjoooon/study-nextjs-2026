'use client';

import type { ColDef, ColGroupDef, EditableCallbackParams, GridApi, ICellEditorParams, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { BulletItem, BulletList, BulletListItem } from '@common/BulletList';

import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { Button } from '@uiux/Button';

import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';
import { FileExportIcon, FileImportIcon, SearchIcon } from '@/shared/components/icons/CommonIcons';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { useFormFields } from '@/shared/hooks/useFormFields';

type DummyDataType = {
  id: number;
  isNew: boolean;
  isCheck?: boolean;
  field01: string | number;
  field02: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isNew: false,
    isCheck: true,
    field01: '김한화',
    field02: '900101-1234567',
  },
  {
    id: 2,
    isNew: false,
    isCheck: false,
    field01: '김한화2',
    field02: '910101-1234567',
  },
];

type ReasonCellEditorRef = {
  getValue: () => string;
};

const ReasonCellEditor = React.forwardRef<ReasonCellEditorRef, ICellEditorParams<DummyDataType>>(
  (props, ref) => {
    const initialValue = String(props.value ?? '');
    const [value, setValue] = React.useState<string>(initialValue);
    const valueRef = React.useRef<string>(initialValue);

    React.useImperativeHandle(
      ref,
      () => ({
        getValue: () => valueRef.current,
      }),
      []
    );

    return (
      <Grid className="flex h-full w-full items-center gap-1 px-1 ">
        <div className="flex min-w-0 basis-0 flex-1 items-center">
          <Input
            aria-label=""
            width={'100%'}
            value={value}
            size="sm"
            autoFocus
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => {
              const nextValue = e.target.value;

              valueRef.current = nextValue;
              setValue(nextValue);
            }}
          />
        </div>
        <Grid className="flex h-full w-[2.5rem] shrink-0 items-center justify-center place-items-stretch divide-x divide-gray-300">
          <Button
            aria-label="검색"
            variant={'outlined'}
            only="icon"
            size={'md'}
            color={'gray-light'}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grid>
      </Grid>
    );
  }
);

const reasonCellRenderer = (params: ICellRendererParams<DummyDataType>) => {
  const value = params.value == null ? '' : String(params.value);

  return (
    <Grid className="flex !h-full w-full items-center gap-1 place-items-stretch divide-x divide-gray-300">
      <div className="flex !h-full min-w-0 basis-0 flex-1 items-center justify-start text-left text-[1.3rem] leading-[2.5rem]">
        <span className="block min-w-0 truncate">{value}</span>
      </div>
      <Grid className="!h-full w-[2.5rem] items-center justify-center ">
        <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </Grid>
    </Grid>
  );
};


ReasonCellEditor.displayName = 'ReasonCellEditor';  

const Ltpz01501 = () => {
  // AgGrid Column

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '고객명',
      field: 'field01',
      editable: true,
      cellClass: 'text-center h-full',
      cellEditor: ReasonCellEditor,
      cellRenderer: reasonCellRenderer,
    },
    {
      headerName: '주민번호',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center',
      editable: true,
    },
  ];

   // 첫번째 agGrid 행삭제
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

  // 첫번째 agGrid 행추가
  const handleAddRow = React.useCallback(() => {
    const nextId = rowData.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
    const newRow: DummyDataType = {
      id: nextId,
      isCheck: false,
      isNew: true,
      field01: '',
      field02: '',
    };

    setRowData((prev) => [...prev, newRow]);

    requestAnimationFrame(() => {
      const gridApi = gridApiRef.current;

      if (!gridApi) {
        return;
      }

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
      // gridApi.startEditingCell({ rowIndex, colKey: 'field02' });
    });
  }, [rowData]);

  // 새로 추가한 행만 편집 가능
  const isEditableNewRow = React.useCallback(
    (params: EditableCallbackParams<DummyDataType>) => params.data?.isNew === true,
    []
  );

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });

  return (
    <Grid className='w-full grid-rows-[auto_1fr] h-full' gap={3}>
      <Grow className="w-full" variant="box-round">
        <FormTable variant={'head'} lineTop={false} caption="">
          <FormRow>
            <FormCell title={'취급자'}>
              <Input width={120} value={form.type01} onChange={(e) => setFormField('type01', e.target.value)} required />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input width={200} value={form.type02} readOnly />
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <TableFold variant="accordion" className='grid grid-rows-[auto_1fr] h-full'>
        <TableFoldHead title="가입설계 동의(동의서출력)">
          <Grow>
            <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
              초기화
            </Button>
            <Button
              color="success"
              variant="outlined"
            >
              엑셀내보내기
              <FileExportIcon />
            </Button>
            <Button
              color="success"
              variant="outlined"
            >
              엑셀가져오기
              <FileImportIcon />
            </Button>
            <Button variant={'outlined'} color={'secondary'} onClick={handleAddRow}>
              행추가
            </Button>
            <Button variant={'outlined'} color={'secondary'} onClick={handleDeleteRow}>
              행삭제
            </Button>
          </Grow>
        </TableFoldHead>
        <TableFoldBody className='h-full grid grid-rows-[1fr]'>
          <Grid gap={2} placement='ss' className='w-full grid-rows-[auto_1fr] h-full'>
            <BulletItem
              size="md"
              type="dotBig"
            >
              입력된 정보는 저장되지 않습니다.(고객정보 미입력 출력 가능)
            </BulletItem>
            <div className="ag-theme-alpine">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
                columnDefs={columnDefs}
                noRowsOverlayComponent={AgGridEmptyComponent}
                singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
                rowSelection={{
                  mode: 'multiRow' as const,
                  checkboxes: true,
                  headerCheckbox: true,
                  enableClickSelection: false,
                  enableSelectionWithoutKeys: true,
                }}
                getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                onGridReady={(params) => {
                  gridApiRef.current = params.api;
                }}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                }}
                domLayout="normal"
              />
            </div>
          </Grid>
        </TableFoldBody>
      </TableFold>
    </Grid>
  );
};

export default Ltpz01501;
