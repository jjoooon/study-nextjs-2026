'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
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
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';

const parseNumericValue = (value: unknown): number => {
  if (value === null || value === undefined || value === '') return 0;
  const normalized = String(value).replace(/,/g, '').trim();
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatNumericValue = (value: unknown): string => {
  if (value === null || value === undefined || value === '') return '';
  const normalized = String(value).replace(/,/g, '').trim();
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? '' : parsed.toLocaleString();
};

type DummyDataType = {
  id: number;
  field01: string;
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
    field01: '출생전',
    field02: '1~6',
    field03: '523',
    field04: '0',
    field05: '70,874',
    field06: '71,397',
    field07: '71,397',
  },
  {
    id: 2,
    field01: '출생후',
    field02: '1~6',
    field03: '523',
    field04: '0',
    field05: '70,874',
    field06: '71,397',
    field07: '71,397',
  },
];

const Ltpz044 = () => {
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '구문',
      field: 'field01',
      width: 70,
      cellClass: 'text-center bg-[var(--color-gray-5)]',
      autoHeight: true,
      cellRenderer: (_params: ICellRendererParams<DummyDataType>) => (
        <Typo tag="b" variant="body-md">
          {_params.value}
        </Typo>
      ),
    },
    {
      headerName: '납입회차',
      field: 'field02',
      width: 70,
      cellClass: 'text-center flex',
      editable: false,
    },
    {
      headerName: '보장P (일시납외)보장',
      field: 'field03',
      width: 120,
      cellClass: 'text-right',
      editable: false,
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
    },
    {
      headerName: '보장P (일시납)',
      field: 'field04',
      width: 90,
      cellClass: 'text-right',
      editable: false,
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
    },
    {
      headerName: '적립P',
      field: 'field05',
      width: 80,
      cellClass: 'text-right',
      editable: false,
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
    },
    {
      headerName: '합계보험료',
      field: 'field06',
      width: 90,
      cellClass: 'text-right',
      editable: false,
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
    },
    {
      headerName: '합계보험료 (=적용보험료)',
      field: 'field07',
      flex: 1,
      cellClass: 'text-right',
      editable: false,
      headerComponent: () => (
        <div className="w-full text-center whitespace-normal leading-5">합계보험료/ (=적용보험료)</div>
      ),
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
    },
  ];

  const [rowData] = useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              출생전후 예정보험료
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input variant="info" width={'full'} value="342334664563" readOnly />
                </FormCell>
                <FormCell title={'보험시기'}>
                  <Input variant="info" width={100} value="20260301" readOnly />
                </FormCell>
                <FormCell title={'적용성별'}>
                  <Input variant="info" width={60} value="여자" readOnly />
                </FormCell>
                <FormCell title={'출산예정일'}>
                  <Input variant="info" width={100} value="20260301" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <div className="ag-theme-alpine">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              singleClickEdit={true}
              domLayout="autoHeight"
            />
          </div>

          <Gcol>
            <Gcol className="w-full" placement="ss" variant="box-info">
              <Typo icon="info">
                예정보험료는 설계의 출생예정일 기준으로 산출된 값으로 실제출생일 출생성별이 다른 경우 변경될 수
                있습니다.
              </Typo>
              <Typo icon="info">
                일시납, 1년납, 미래보장 담보 가입여부에 따라 실제 회차별 납입보험료는 변동될 수 있습니다.
              </Typo>
            </Gcol>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz044;
