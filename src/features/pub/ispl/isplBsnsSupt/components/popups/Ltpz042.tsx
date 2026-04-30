'use client';

import { AgGridEmptyComponent } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { ResetIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';

import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

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
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: true,
    field01: '123456',
    field02: '한화생명1',
    field03: '123',
    field04: '서울',
    field05: '123',
    field06: '김한화',
  },
  {
    id: 2,
    isCheck: false,
    field01: '123456',
    field02: '한화생명1',
    field03: '124',
    field04: '서울',
    field05: '123',
    field06: '김한화',
  },
  {
    id: 3,
    isCheck: false,
    field01: '123456',
    field02: '한화생명1',
    field03: '125',
    field04: '서울',
    field05: '123',
    field06: '김한화',
  },
  {
    id: 4,
    isCheck: false,
    field01: '123456',
    field02: '한화생명1',
    field03: '126',
    field04: '서울',
    field05: '123',
    field06: '김한화',
  },
  {
    id: 5,
    isCheck: false,
    field01: '123456',
    field02: '한화생명1',
    field03: '127',
    field04: '서울',
    field05: '123',
    field06: '김한화',
  },
  {
    id: 6,
    isCheck: false,
    field01: '123456',
    field02: '한화생명1',
    field03: '128',
    field04: '서울',
    field05: '123',
    field06: '김한화',
  },
];
// Grid2 dummy data (직원번호)
type DummyDataType2 = {
  id: number;
  isCheck: boolean;
  field01: string | number; // 직원번호
  field02: string | number; // 직원명
};
const DummyData2: DummyDataType2[] = [
  { id: 1, isCheck: false, field01: '300001', field02: '윤한화' },
  { id: 2, isCheck: false, field01: '300002', field02: '조한화' },
  { id: 3, isCheck: false, field01: '300003', field02: '임한화' },
  { id: 4, isCheck: false, field01: '300001', field02: '윤한화' },
  { id: 5, isCheck: false, field01: '300002', field02: '조한화' },
  { id: 6, isCheck: false, field01: '300003', field02: '임한화' },
];
// Grid3 dummy data (직원번호)
type DummyDataType3 = {
  id: number;
  isCheck: boolean;
  field01: string | number; // 직원번호
  field02: string | number; // 직원명
};
const DummyData3: DummyDataType3[] = [
  { id: 1, isCheck: false, field01: '300001', field02: '윤한화' },
  { id: 2, isCheck: false, field01: '300002', field02: '조한화' },
  { id: 3, isCheck: false, field01: '300003', field02: '임한화' },
  { id: 4, isCheck: false, field01: '300001', field02: '윤한화' },
  { id: 5, isCheck: false, field01: '300002', field02: '조한화' },
  { id: 6, isCheck: false, field01: '300003', field02: '임한화' },
];

// Grid4 dummy data
type DummyDataType4 = {
  id: number;
  isCheck: boolean;
  field01: string | number; // 직원번호
  field02: string | number; // 직원명
};
const DummyData4: DummyDataType4[] = [
  { id: 1, isCheck: false, field01: '300001', field02: '윤한화' },
  { id: 2, isCheck: false, field01: '300002', field02: '조한화' },
  { id: 3, isCheck: false, field01: '300003', field02: '임한화' },
  { id: 4, isCheck: false, field01: '300001', field02: '윤한화' },
  { id: 5, isCheck: false, field01: '300002', field02: '조한화' },
  { id: 6, isCheck: false, field01: '300003', field02: '임한화' },
];

export const Ltpz042 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '직원번호',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '직원명',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '지점번호',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '지점명',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '유자격자번호',
      flex: 1,
      field: 'field05',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '유자격자명',
      flex: 1,
      field: 'field06',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  const columnDefs2: ColDef<DummyDataType2>[] = [
    { headerName: '직원번호', flex: 1, field: 'field01', cellClass: 'text-center px-0!', autoHeight: true },
    { headerName: '직원명', flex: 1, field: 'field02', cellClass: 'text-center px-0!', autoHeight: true },
  ];
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);

  const columnDefs3: ColDef<DummyDataType3>[] = [
    { headerName: '직원번호', flex: 1, field: 'field01', cellClass: 'text-center px-0!', autoHeight: true },
    { headerName: '직원명', flex: 1, field: 'field02', cellClass: 'text-center px-0!', autoHeight: true },
  ];
  const [rowData3] = React.useState<DummyDataType3[]>(DummyData3);

  const columnDefs4: ColDef<DummyDataType4>[] = [
    { headerName: '직원번호', flex: 1, field: 'field01', cellClass: 'text-center px-0!', autoHeight: true },
    { headerName: '직원명', flex: 1, field: 'field02', cellClass: 'text-center px-0!', autoHeight: true },
  ];
  const [rowData4] = React.useState<DummyDataType4[]>(DummyData4);

  const isEmpNo = form.type01 === 'selection2';
  const rowSelection = React.useMemo(
    () => ({ mode: 'singleRow' as const, checkboxes: true, enableClickSelection: false }),
    []
  );
  const selectionColumnDef = React.useMemo(() => ({ headerName: '선택' }), []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              은행유자격자조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ042)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'조회구분'}>
                  <NativeSelect
                    aria-label="조회구분 선택"
                    width="10rem"
                    value={form.type01}
                    onChange={(e) => setFormField('type01', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type01-1', label: '유자격자' },
                      { value: 'selection2', id: 'type01-2', label: '직원번호' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                {!isEmpNo && (
                  <FormCell title={'유자격자명'}>
                    <Input
                      aria-label="유자격자명 입력"
                      width={'16rem'}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                    />
                  </FormCell>
                )}
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

          {/* 유자격자: Grid1 단독 */}
          {!isEmpNo && (
            <div className="ag-theme-alpine ltpa010-grid w-full min-h-[18.5rem]">
              <AgGridReact<DummyDataType>
                key="ltpz042-grid-qualified"
                getRowId={(params) => `qualified-${params.data.id}`}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ sortable: true, resizable: true }}
                rowSelection={rowSelection}
                selectionColumnDef={selectionColumnDef}
                domLayout="normal"
              />
            </div>
          )}
          {/* 직원번호: Grid2~4 1/3씩 */}
          {isEmpNo && (
            <Grow className="w-full" gap={1} placement="ss">
              {/* Grid2 */}
              <div className="ag-theme-alpine ltpa010-grid w-1/3 min-h-[18.5rem]">
                <AgGridReact<DummyDataType2>
                  key="ltpz042-grid-empno-1"
                  getRowId={(params) => `empno-1-${params.data.id}`}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  defaultColDef={{ sortable: true, resizable: true }}
                  rowSelection={rowSelection}
                  selectionColumnDef={selectionColumnDef}
                  domLayout="normal"
                  alwaysShowVerticalScroll={true}
                />
              </div>
              {/* Grid3 */}
              <div className="ag-theme-alpine ltpa010-grid w-1/3 min-h-[18.5rem]">
                <AgGridReact<DummyDataType3>
                  key="ltpz042-grid-empno-2"
                  getRowId={(params) => `empno-2-${params.data.id}`}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData3}
                  columnDefs={columnDefs3}
                  defaultColDef={{ sortable: true, resizable: true }}
                  rowSelection={rowSelection}
                  selectionColumnDef={selectionColumnDef}
                  domLayout="normal"
                  alwaysShowVerticalScroll={true}
                />
              </div>
              {/* Grid4 */}
              <div className="ag-theme-alpine ltpa010-grid w-1/3 min-h-[18.5rem]">
                <AgGridReact<DummyDataType4>
                  key="ltpz042-grid-empno-3"
                  getRowId={(params) => `empno-3-${params.data.id}`}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData4}
                  columnDefs={columnDefs4}
                  defaultColDef={{ sortable: true, resizable: true }}
                  rowSelection={rowSelection}
                  selectionColumnDef={selectionColumnDef}
                  domLayout="normal"
                  alwaysShowVerticalScroll={true}
                />
              </div>
            </Grow>
          )}
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
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
