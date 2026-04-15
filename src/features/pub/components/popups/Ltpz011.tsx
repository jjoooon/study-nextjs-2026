'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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

ModuleRegistry.registerModules([AllCommunityModule]);

type ComparisonRow = {
  id: number;
  coverage: string;
  amount: number;
  premium: number;
  isSumRow?: boolean;
};

const comparisonRows: ComparisonRow[] = [
  { id: 1, coverage: '보통약관(상해80%이상후유장해)', amount: 3000, premium: 3000 },
  { id: 2, coverage: '보험료납입면제대상보장(5대유사)', amount: 10, premium: 10 },
  { id: 3, coverage: '상해사망(간편)', amount: 15000, premium: 15000 },
  { id: 4, coverage: '상해후유장해(3-100%)', amount: 10000, premium: 10000 },
  { id: 5, coverage: '질병사망(간편)', amount: 10000, premium: 10000 },
  { id: 6, coverage: '질병사망(간편)', amount: 10000, premium: 10000 },
  { id: 7, coverage: '질병사망(간편)', amount: 10000, premium: 10000 },
  { id: 8, coverage: '질병사망(간편)', amount: 10000, premium: 10000 },
  { id: 9, coverage: '질병사망(간편)', amount: 10000, premium: 10000 },
  { id: 10, coverage: '질병사망(간편)', amount: 10000, premium: 10000 },
];

export const Ltpz011 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs2: ColDef<ComparisonRow>[] = [
    {
      headerName: '담보명',
      field: 'coverage',
      flex: 1,
      cellClass: (params) => (params.data?.isSumRow ? 'text-center font-bold' : 'text-center'),
      cellRenderer: (params: ICellRendererParams<ComparisonRow>) =>
        params.data?.isSumRow ? <b>합계</b> : params.value,
    },
    {
      headerName: '가입금액(원)',
      field: 'amount',
      width: 120,
      cellClass: 'text-right',
      cellRenderer: (params: ICellRendererParams<ComparisonRow>) =>
        params.data?.isSumRow ? (
          <b>{Number(params.value ?? 0).toLocaleString()}</b>
        ) : (
          Number(params.value ?? 0).toLocaleString()
        ),
    },
    {
      headerName: '보험료(원)',
      field: 'premium',
      width: 120,
      cellClass: 'text-right',
      cellRenderer: (params: ICellRendererParams<ComparisonRow>) =>
        params.data?.isSumRow ? (
          <b>{Number(params.value ?? 0).toLocaleString()}</b>
        ) : (
          Number(params.value ?? 0).toLocaleString()
        ),
    },
  ];

  const rowData2 = comparisonRows;
  const sumRow2 = React.useMemo<ComparisonRow[]>(
    () => [
      {
        id: -1,
        coverage: '합계',
        amount: rowData2.reduce((sum, row) => sum + row.amount, 0),
        premium: rowData2.reduce((sum, row) => sum + row.premium, 0),
        isSumRow: true,
      },
    ],
    [rowData2]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보내용상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ011)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="대표담보명" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'대표담보명'}>
                  <Input aria-label="" width={200} value={'대표담보명.text'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <TableFold variant={'default'}>
            <TableFoldHead title="">
              <Grow>
                <Typo variant="body-md">(단위: 원)</Typo>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[36.5rem]">
                <AgGridReact<ComparisonRow>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  pinnedBottomRowData={sumRow2}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  singleClickEdit={true}
                  rowClassRules={{}}
                  domLayout="normal"
                  alwaysShowVerticalScroll={true}
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
