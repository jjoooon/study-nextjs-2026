/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  numberValueFormatter,
  useDynamicColumnWidths,
} from '@aggrid';
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
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';
import { useMemo } from 'storybook/internal/preview-api';

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
    field01: '4',
    field02: '시설(실손)',
    field03: '1급',
    field04: '9999999999',
    field05: '9999999999',
  },
  {
    id: 3,
    isCheck: false,
    field01: '5',
    field02: '재고자산(실손)',
    field03: '1급',
    field04: '9999999999',
    field05: '9999999999',
  },
  {
    id: 4,
    isCheck: false,
    field01: '6',
    field02: '재고자산(실손)',
    field03: '1급',
    field04: '9999999999',
    field05: '9999999999',
  },
  {
    id: 5,
    isCheck: false,
    field01: '7',
    field02: '재고자산(실손)',
    field03: '1급',
    field04: '9999999999',
    field05: '9999999999',
  },
  {
    id: 6,
    isCheck: false,
    field01: '8',
    field02: '재고자산(실손)',
    field03: '1급',
    field04: '9999999999',
    field05: '9999999999',
  },
];

const Ltpz046 = () => {
  // AgGrid Column
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(
    () => [
      {
        headerName: '부호',
        flex: 1,
        width: attributeColumnWidth(50),
        field: 'field01',
        cellClass: 'text-center',
      },
      {
        headerName: '구분',
        flex: 2,
        field: 'field02',
        cellClass: 'text-left',
      },
      {
        headerName: '급수',
        width: attributeColumnWidth(60),
        flex: 1,
        field: 'field03',
        cellClass: 'text-center',
      },
      {
        headerName: '목적물가입금액',
        minWidth: attributeColumnWidth(110),
        flex: 1,
        field: 'field04',
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '가입금액',
        minWidth: attributeColumnWidth(100),
        flex: 1,
        field: 'field05',
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter,
      },
    ],
    [attributeColumnWidth]
  );

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
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
              <FormTable variant="none" cols={['w-1', 'w-auto']}>
                <FormRow>
                  {/* 2026-05-27 input 수정 */}
                  <FormCell title={'설계번호'} tdClassName="grid grid-cols-[auto_1fr] items-center gap-1 w-full">
                    <Input aria-label="" width={130} value={'LA26020945959594'} variant="info" readOnly />
                    <Input aria-label="" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} variant="info" readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </FormTable>
          </Grow>
          <Grow className="w-full">
            <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
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
                  width: 30,
                  cellClass: 'text-center editable-cell',
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
            <FormTable caption="담보" cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'담보명'}>
                  <Input value="풍수재손해(실손번부보상, 비특수)" readOnly />
                </FormCell>
                <FormCell title={' 가입금액'} tdClassName="grid grid-cols-[1fr_auto] items-center gap-1">
                  <Input value="100" commaAmount readOnly />
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

export default Ltpz046;
