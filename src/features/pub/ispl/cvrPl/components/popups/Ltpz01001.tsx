'use client';

import { AllCommunityModule, ColDef, ColGroupDef, ModuleRegistry, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
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

ModuleRegistry.registerModules([AllCommunityModule]);

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

export const Ltpz01001 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '구문',
      field: 'field01',
      width: 70,
      cellClass: 'text-center bg-[#f4f4f4]!',
      autoHeight: true,
      cellRenderer: (_params: ICellRendererParams<DummyDataType>) => (
        <Grow className="w-full h-full">
          <Typo className="w-full whitespace-pre-wrap text-[#000000]" tag="span" variant="body-md" weight="bold">
            {_params.value}
          </Typo>
        </Grow>
      ),
    },
    {
      headerName: '납입회차',
      field: 'field02',
      width: 70,
      cellClass: 'text-center flex',
      autoHeight: true,
      editable: true,
      cellClassRules: {
        'ag-cell-error-border': (params) => params.value === '' || params.value === undefined,
      },
    },
    {
      headerName: '보장P (일시납외)보장',
      field: 'field03',
      width: 120,
      cellClass: 'text-right',
      autoHeight: true,
      editable: true,
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
      cellClassRules: {
        'ag-cell-error-border': (params) =>
          params.value === '' || params.value === undefined || Number(params.value) === 0,
      },
    },
    {
      headerName: '보장P (일시납)',
      field: 'field04',
      width: 90,
      cellClass: 'text-right',
      autoHeight: true,
      editable: true,
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
      cellClassRules: {
        'ag-cell-error-border': (params) =>
          params.value === '' || params.value === undefined || Number(params.value) === 0,
      },
    },
    {
      headerName: '적립P',
      field: 'field05',
      width: 80,
      cellClass: 'text-right',
      autoHeight: true,
      editable: true,
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
      cellClassRules: {
        'ag-cell-error-border': (params) =>
          params.value === '' || params.value === undefined || Number(params.value) === 0,
      },
    },
    {
      headerName: '합계보험료',
      field: 'field06',
      width: 90,
      cellClass: 'text-right',
      autoHeight: true,
      editable: true,
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
      cellClassRules: {
        'ag-cell-error-border': (params) =>
          params.value === '' || params.value === undefined || Number(params.value) === 0,
      },
    },
    {
      headerName: '합계보험료 (=적용보험료)',
      field: 'field07',
      flex: 1,
      cellClass: 'text-right',
      wrapText: true,
      autoHeight: true,
      editable: true,
      headerComponent: () => (
        <div className="w-full text-center whitespace-normal leading-5">
          합계보험료/
          <br />
          (=적용보험료)
        </div>
      ),
      valueParser: (params) => parseNumericValue(params.newValue),
      valueFormatter: (params) => formatNumericValue(params.value),
      cellClassRules: {
        'ag-cell-error-border': (params) =>
          params.value === '' || params.value === undefined || Number(params.value) === 0,
      },
    },
  ];

  const [rowData] = useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              출생전후 예정보험료
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable
              caption="보험정보"
              cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
              variant="head"
            >
              <FormRow>
                <FormCell title={'설계번호'}>LA26029313558</FormCell>
                <FormCell title={'보험시기'}>20260112</FormCell>
                <FormCell title={'적용성별'}>여자</FormCell>
                <FormCell title={'출산예정일'}>20260301</FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <div className="ag-theme-alpine min-h-[11.6rem]">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              headerHeight={52}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              singleClickEdit={true}
              domLayout="normal"
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
