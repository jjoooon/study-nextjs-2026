'use client';

import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { AgGridEmptyComponent, DatePickerCellEditor } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
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

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
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
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 2,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '김한화',
  },
  {
    id: 3,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
  },
];

export const Ltpa030 = () => {
  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      field: 'field02',
      width: 90,
      editable: true,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '취급직원', '사용인', '설계'] },
    },
    {
      headerName: '대상',
      field: 'field02',
      flex: 1,
      autoHeight: true,
      editable: false,
      cellClass: 'text-center  flex! items-center justify-center!',
      cellRenderer: (_params: ICellRendererParams<DummyDataType>) => (
        <Grow className="w-full px-1">
          <Input aria-label="" width={'100%'} value={'1234567'} size="sm" readOnly />
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
          <Input aria-label="" width={'100%'} value={'김한화'} size="sm" readOnly />
        </Grow>
      ),
    },
    {
      headerName: '적용시작일자',
      field: 'field03',
      width: 120,
      editable: true,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) =>
        params.data?.field03 && String(params.data.field03).trim() !== '' ? String(params.data.field03) : '',
    },
    {
      headerName: '적용종료일자',
      field: 'field04',
      width: 120,
      editable: true,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) =>
        params.data?.field04 && String(params.data.field04).trim() !== '' ? String(params.data.field04) : '',
    },
    {
      headerName: '상태',
      field: 'field05',
      width: 90,
      editable: true,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '정상', '고객환불', '조치완료', '취소'] },
    },
    {
      headerName: '비고',
      field: 'field06',
      flex: 1,
      editable: true,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
    },
    {
      headerName: '등록자',
      field: 'field07',
      width: 80,
      editable: true,
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

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              신계약기준관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA030)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable
              variant={'head'}
              lineTop={false}
              caption="장기신계약 조회 테이블"
              cols={['w-[8rem]', 'flex-1', 'w-[8rem]', 'flex-1', 'w-[8rem]', 'flex-1']}
            >
              <FormRow>
                <FormCell title={'보종군'}>
                  <NativeSelect
                    aria-label="항목 선택"
                    width={100}
                    value={form.type01}
                    required
                    onChange={(e) => setFormField('type01', e.target.value)}
                  >
                    {[{ value: 'selection', id: 'type01-1', label: '공통' }].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'적용사항'}>
                  <NativeSelect
                    aria-label="적용사항 선택"
                    width={120}
                    value={form.type02}
                    required
                    onChange={(e) => setFormField('type02', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type02-1', label: '선택' },
                      { value: 'selection2', id: 'type02-2', label: '모집자실명제준수 예외' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'적용대상'}>
                  <NativeSelect
                    aria-label="적용대상 선택"
                    width={120}
                    value={form.type03}
                    required
                    onChange={(e) => setFormField('type03', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type03-1', label: '선택' },
                      { value: 'selection2', id: 'type03-2', label: '모집자실명제준수 예외' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input aria-label="" width={100} value={'1234567'} readOnly />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input aria-label="" width={100} value={'김한화'} readOnly />
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
            <TableFoldHead title="피보험자의 위험정보(고객정보)">
              <Grow>
                <Button color="gray" variant="outlined">
                  행추가
                </Button>
                <Button color="gray" variant="outlined">
                  행삭제
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[30rem]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  domLayout="normal"
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
                    headerName: '√',
                    width: 30,
                  }}
                  alwaysShowVerticalScroll={true}
                  onGridReady={(params) => {
                    params.api.forEachNode((node) => {
                      if (node.data?.isCheck) {
                        node.setSelected(true);
                      }
                    });
                  }}
                  onCellValueChanged={(params) => {
                    const field = params.colDef.field;
                    if (!field) return;
                    setRowData((prev) =>
                      prev.map((row) => (row.id === params.data.id ? { ...row, [field]: params.newValue } : row))
                    );
                  }}
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
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
