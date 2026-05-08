'use client';

import type { ColDef, ColGroupDef, ColSpanParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Grow, Typo, Gcol } from '@atoms';
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
  isSumRow?: boolean;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '13950600',
    field04: '13950600',
    field05: '13950600',
  },
  {
    id: 2,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '13950600',
    field04: '13950600',
    field05: '13950600',
  },
  {
    id: 3,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '13950600',
    field04: '13950600',
    field05: '13950600',
  },
  {
    id: 4,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '13950600',
    field04: '13950600',
    field05: '13950600',
  },
  {
    id: 5,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '13950600',
    field04: '13950600',
    field05: '13950600',
  },
  {
    id: 6,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '13950600',
    field04: '13950600',
    field05: '13950600',
  },
];

const Ltpz049 = () => {
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '할증담보',
      flex: 1,
      field: 'field01',
      colSpan: (params: ColSpanParams<DummyDataType>) => (params.data?.isSumRow ? 2 : 1),
    },
    {
      headerName: '보험기간',
      width: 100,
      field: 'field02',
      colSpan: (params: ColSpanParams<DummyDataType>) => (params.data?.isSumRow ? 0 : 1),
    },
    {
      headerName: '표준체보험료(원)',
      width: 170,
      field: 'field03',
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '할증보험료(원)',
      width: 170,
      field: 'field04',
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '적용보험료(원)',
      width: 170,
      field: 'field05',
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const sumRow = React.useMemo(() => {
    const parse = (v: string | number) => {
      if (typeof v === 'number') return v;
      if (!v) return 0;
      const n = Number(String(v).replace(/,/g, ''));
      return Number.isFinite(n) ? n : 0;
    };
    const total03 = rowData.reduce((s, r) => s + parse(r.field03), 0);
    const total04 = rowData.reduce((s, r) => s + parse(r.field04), 0);
    const total05 = rowData.reduce((s, r) => s + parse(r.field05), 0);
    return [
      {
        id: -1,
        isSumRow: true,
        field01: '할증적용담보 합계금액',
        field02: '',
        field03: total03,
        field04: total04,
        field05: total05,
      },
    ];
  }, [rowData]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              특별조건특약조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ049)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr] gap-3">
          <Grow className="w-full" variant="box-round">
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input value={'LA123123123123'} readOnly variant="info" />
                </FormCell>
                <FormCell title={'피보험자'}>
                  <Input value={'김한화(901212-1111111)'} readOnly variant="info" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol placement="ss">
            <div className="ag-theme-alpine min-h-[18.4rem]">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
                columnDefs={columnDefs}
                pinnedBottomRowData={sumRow}
                noRowsOverlayComponent={AgGridEmptyComponent}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                  autoHeight: true,
                }}
                domLayout="normal"
              />
            </div>
            <Typo icon="info">
              할증보험료 계산시 발생할 수 있는 1원 미만의 할증보험료는 0원으로 표시되며, 갱신기 변동될 수 있습니다.
            </Typo>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                상세조회
              </Button>
            </Grow>
            <Grow>
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

export default Ltpz049;
