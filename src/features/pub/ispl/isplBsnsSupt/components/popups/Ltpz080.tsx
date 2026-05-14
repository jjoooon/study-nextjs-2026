/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Grid, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { SearchIcon } from '@icons';
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
import type { ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field1: 'CLA34224',
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
    field3: '사망/후유',
    field4: '',
  },
];

const Ltpz080 = () => {
  const gridApiRef = React.useRef<GridApi<DummyData1Type> | null>(null);
  const [rowData, setRowData] = React.useState<DummyData1Type[]>(DummyData1);

  const columnDefs1: ColDef<DummyData1Type>[] = [
    {
      headerName: '순서',
      field: 'field1',
      width: 40,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agNumberCellEditor',
      sortable: false,
    },
  ];
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보그룹관리
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr] gap-1">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="설계번호" variant="head" cols={['w-[1rem]', 'w-auto', 'w-[1rem]', 'w-auto']}>
              <FormRow className="grid grid-cols-[1fr_auto] w-full">
                <FormCell title={'상품명'} className="shrink-0" tdClassName="flex-1">
                  <Input value={'한화 시그니처 여성 검강보험 3.0 2504 '} readOnly />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                </FormCell>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={130} value={'LA123123123123'} readOnly />
                  <Input aria-label="" width={30} value={'1'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <div className="ag-theme-alpine min-h-[24.4rem]">
            <AgGridReact<DummyData1Type>
              onGridReady={(event) => {
                gridApiRef.current = event.api;
              }}
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs1}
              defaultColDef={{
                sortable: true,
                resizable: false,
              }}
              singleClickEdit={true}
              rowSelection={{
                mode: 'singleRow',
                checkboxes: true,
                enableClickSelection: false,
              }}
              selectionColumnDef={{
                headerName: '선택',
                width: 30,
                cellClass: 'editable-cell text-center',
              }}
              domLayout="normal"
              animateRows={false}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
              tooltipHideDelay={3000}
            />
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button size={'xl'}>저장</Button>
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

export default Ltpz080;
