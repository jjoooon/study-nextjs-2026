'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
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
    field01: '-',
    field02: '-',
    field03: 'LA20234472050000',
    field04: '1급',
    field05: '회사원',
    field06: '1급',
    field07: '회사원',
  },
  {
    id: 2,
    field01: '-',
    field02: '-',
    field03: 'LA20234472050001',
    field04: '1급',
    field05: '회사원',
    field06: '1급',
    field07: '회사원',
  },
];

const Ltpz01501 = () => {
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '대상여부',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '증권번호',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경설계번호',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경전 직업정보',
      headerClass: 'ag-header-right-divider',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field04 ?? '')}</Typo>
          ),
        },
        {
          headerName: '직업',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field05 ?? '')}</Typo>
          ),
        },
      ],
    },
    {
      headerName: '변경후 직업정보',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field06 ?? '')}</Typo>
          ),
        },
        {
          headerName: '직업',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field07 ?? '')}</Typo>
          ),
        },
      ],
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Gcol>
      <Grow className="w-full" variant="box-round">
        <FormTable variant={'head'} lineTop={false} caption="">
          <FormRow>
            <FormCell title={'상품명'}>
              <Input value={'한화 3N5 더 간편건강보험(세만기형) 무배당 2601'} variant="info" readOnly />
            </FormCell>
            <FormCell title={'설계번호'}>
              <Input value={'LA123123123123'} variant="info" readOnly />
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <Grid className="w-full grid-rows-[auto_auto_1fr] h-full" gap={4}>
        <div className="ag-theme-alpine min-h-[18.4rem]">
          <AgGridReact<DummyDataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{
              sortable: true,
              resizable: true,
            }}
            domLayout="normal"
          />
        </div>
      </Grid>
    </Gcol>
  );
};

export default Ltpz01501;
