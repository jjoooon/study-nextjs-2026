'use client';

import { AgGridEmptyComponent, createAddRowHandler, createDeleteSelectedRowsHandler } from '@aggrid';
import { Gcol, Grow, Grid } from '@atoms';
import { BulletItem } from '@common/BulletList';

import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { FileExportIcon, FileImportIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';

import { Input } from '@uiux/Input';
import type { ColDef, ColGroupDef, GridApi, ICellEditorParams, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';
import { CheckboxGroup, CheckboxGroupItem } from '@/shared/components/uiux/Checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/uiux/Tooltip';

type DummyDataType = {
  id: number;
  isCheck?: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: true,
    field01: '010-5678-1234',
    field02: '910101-1234567',
    field03: '이한화',
  },
  {
    id: 2,
    isCheck: false,
    field01: '010-5678-1234',
    field02: '910101-1234567',
    field03: '김한화',
  },
];

type ReasonCellEditorRef = {
  getValue: () => string;
};

const ReasonCellEditor = React.forwardRef<ReasonCellEditorRef, ICellEditorParams<DummyDataType>>((props, ref) => {
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
    <Grid className="flex h-full w-full items-center gap-1 px-1 place-items-stretch divide-x divide-gray-300">
      <div className="flex min-w-0 basis-0 flex-1 items-center pr-1">
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
      <Grid className="flex h-full w-[2.5rem] shrink-0 items-center justify-center">
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
});

const reasonCellRenderer = (params: ICellRendererParams<DummyDataType>) => {
  const value = params.value == null ? '' : String(params.value);

  return (
    <Grid className="flex !h-full w-full items-center gap-1 place-items-stretch divide-x divide-gray-300">
      <div className="flex !h-full min-w-0 basis-0 flex-1 items-center justify-center text-[1.3rem] leading-[2.5rem]">
        <span className="block min-w-0">{value}</span>
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

const Ltpz01503 = () => {
  // AgGrid Column

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  // 행추가 삭제 ----------------------------------
  const handleAddRow = React.useMemo(
    () =>
      createAddRowHandler<DummyDataType, number>(setRowData, {
        idKey: 'id',
        getNextId: (rows) => {
          const maxId = rows.reduce((max, row) => Math.max(max, row.id), 0);
          return maxId + 1;
        },
        createRow: (nextId) => ({
          id: nextId,
          isCheck: true,
          field01: '',
          field02: '',
          field03: '',
        }),
        insertAt: 'end',
      }),
    [setRowData]
  );
  const handleDeleteButtonClick = React.useMemo(
    () =>
      createDeleteSelectedRowsHandler<DummyDataType>(setRowData, gridApiRef, {
        idKey: 'id',
      }),
    [setRowData, gridApiRef]
  );
  //  ---------------------------------- 행추가 삭제

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '발송 휴대폰번호',
      field: 'field01',
      editable: true,
      cellClass: 'text-center h-full',
      cellEditor: ReasonCellEditor,
      cellRenderer: reasonCellRenderer,
    },
    {
      headerName: '고객명',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="none" size="md" only="icon" className="truncate w-full block">
              {params.data?.field02}
            </Button>
          </TooltipTrigger>
          <TooltipContent variant="default" side="top" align="center" sideOffset={5}>
            {'고객명은 필수입력이 아닙니다.'}
          </TooltipContent>
        </Tooltip>
      ),
    },
    {
      headerName: '생년월일',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="none" size="md" only="icon" className="truncate w-full block">
              {params.data?.field03}
            </Button>
          </TooltipTrigger>
          <TooltipContent variant="default" side="top" align="center" sideOffset={5}>
            {'생년월일은 필수입력이 아닙니다.'}
          </TooltipContent>
        </Tooltip>
      ),
    },
  ];

  return (
    <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
      <Grow className="w-full" variant="box-round">
        <FormTable variant={'head'} lineTop={false} caption="">
          <FormRow>
            <FormCell title={'취급자(전화번호)'}>
              <Input width={120} value={''} required />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input width={200} value={''} readOnly />
              <Grow>
                (
                  <Input width={40} value={''} readOnly/>-
                  <Input width={40} value={''} readOnly/>-
                  <Input width={40} value={''} readOnly/>
                )
              </Grow>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <TableFold variant="accordion" className='grid grid-rows-[auto_1fr] h-full'>
        <TableFoldHead title="직접동의(모바일)">
          <Grow>
            <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
              초기화
            </Button>
            <Button color="success" variant="outlined">
              엑셀내보내기
              <FileExportIcon />
            </Button>
            <Button color="success" variant="outlined">
              엑셀가져오기
              <FileImportIcon />
            </Button>
            <Button variant={'outlined'} color={'secondary'} onClick={handleAddRow}>
              행추가
            </Button>
            <Button variant={'outlined'} color={'secondary'} onClick={handleDeleteButtonClick}>
              행삭제
            </Button>
          </Grow>
        </TableFoldHead>
        <TableFoldBody className='grid grid-rows-[1fr] h-full gap-2'>
          <Grid gap={2} placement="ss" className='grid-rows-[auto_1fr] h-full'>
            <BulletItem size="md" type="dotBig">
             당사 모바일로 홈페이지를 통해 고객이 직접 동의할 수 있는 알림톡이 전송됩니다.
            </BulletItem>
            <div className="ag-theme-alpine min-h-[20rem] h-full">
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
          <FormTable caption="가입설계 동의" cols={['w-[12rem]', 'flex-1']}>
            <FormRow>
              <FormCell title={'동의항목'}>
                <Grid className='w-full'>
                  <CheckboxGroup
                    className="grid grid-cols-2 gap-1"
                    color="primary"
                    minSelected={0}
                    size="lg"
                    width="auto"
                    variant="default"
                  >
                    {[
                      { value: 'v1', label: '수집, 이용 및 조회' },
                      { value: 'v2', label: '고유식별정보 처리'},
                      { value: 'v3', label: '제3자 제공'},
                      { value: 'v4', label: '민감정보(상해/질병)처리'},
                    ].map((option) => (
                      <CheckboxGroupItem key={option.value} value={option.value}>
                        {option.label}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>

                </Grid>
              </FormCell>
            </FormRow>
          </FormTable>
        </TableFoldBody>
      </TableFold>
    </Grid>
  );
};

export default Ltpz01503;
