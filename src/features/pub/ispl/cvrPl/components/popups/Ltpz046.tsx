'use client';

import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createCellValueChangedHandler, numberValueFormatter } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    field01: '1',
    field02: '건물(실손)',
    field03: '1급',
    field04: '9999999999',
    field05: '9999999999',
  },
  {
    id: 2,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '9999999999',
    field05: '9999999999',
  },
  {
    id: 3,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '9999999999',
    field05: '9999999999',
  },
  {
    id: 4,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '9999999999',
    field05: '9999999999',
  },
  {
    id: 5,
    isCheck: false,
    field01: '5',
    field02: '',
    field03: '',
    field04: '9999999999',
    field05: '9999999999',
  },
  {
    id: 6,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '9999999999',
    field05: '9999999999',
  },
];

export const Ltpz046 = ({ open, onOpenChange }: PopupBaseProps) => {
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '부호',
      width: 60,
      field: 'field01',
      cellClass: 'text-center',
    },
    {
      headerName: '구분',
      flex: 1,
      field: 'field02',
      cellClass: 'text-left',
    },
    {
      headerName: '급수',
      width: 60,
      field: 'field03',
      cellClass: 'text-center',
    },
    {
      headerName: '목적물가입금액',
      flex: 1,
      field: 'field04',
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '가입금액',
      flex: 1,
      field: 'field05',
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              화재대물배상책임부호선택
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ046)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]" gap-5>
          <Grow className="w-full" variant="box-round">
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">
                    LA123123123123
                  </Typo>
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">
                    설계번호의 상품명 text
                  </Typo>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grow className="w-full">
            <div className="ag-theme-alpine min-h-[18.4rem]">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
                columnDefs={columnDefs}
                noRowsOverlayComponent={AgGridEmptyComponent}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                  autoHeight: true,
                }}
                singleClickEdit={true}
                onCellValueChanged={onCellValueChanged}
                rowSelection={{
                  mode: 'singleRow',
                  checkboxes: true,
                  enableClickSelection: false,
                }}
                selectionColumnDef={{
                  headerName: '선택',
                }}
                onGridReady={(params) => {
                  params.api.forEachNode((node) => {
                    if (node.data?.isCheck) {
                      node.setSelected(true);
                    }
                  });
                }}
                domLayout="normal"
              />
            </div>
          </Grow>
          <Grow className="w-full">
            <FormTable caption="담보" cols={['w-[14rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'담보명'}>
                  <Input value="" width={180} readOnly />
                </FormCell>
                <FormCell title={' 가입금액'}>
                  <Input value="0" width={180} commaAmount readOnly />
                  만원
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
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
