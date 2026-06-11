/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Grow, Typo } from '@atoms';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
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
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

import '@/shared/lib/agGridPub';

type ComparisonRow = {
  id: number;
  state: string;
  code: string;
  term1: string;
  term2: string;
  coverage: string;
  premium: number;
  isSumRow?: boolean;
};

const comparisonRows: ComparisonRow[] = [
  {
    id: 1,
    state: '보통약관',
    code: 'A001',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '보통약관(상해80%이상후유장해) 보통약관(상해80%이상후유장해)',
    premium: 3000,
  },
  {
    id: 2,
    state: '보험료납',
    code: 'A002',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '보험료납입면제대상보장(5대유사)',
    premium: 10,
  },
  {
    id: 3,
    state: '상해사망',
    code: 'A003',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '상해사망(간편)',
    premium: 15000000,
  },
  {
    id: 4,
    state: '상해후유장해',
    code: 'A004',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '상해후유장해(3-100%)',
    premium: 10000,
  },
  {
    id: 5,
    state: '질병사망',
    code: 'A005',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '질병사망(간편)',
    premium: 10000,
  },
  {
    id: 6,
    state: '질병사망',
    code: 'A006',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '질병사망(간편)',
    premium: 10000,
  },
  {
    id: 7,
    state: '질병사망',
    code: 'A007',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '질병사망(간편)',
    premium: 10000,
  },
  {
    id: 8,
    state: '질병사망',
    code: 'A008',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '질병사망(간편)',
    premium: 10000,
  },
  {
    id: 9,
    state: '질병사망',
    code: 'A009',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '질병사망(간편)',
    premium: 10000,
  },
  {
    id: 10,
    state: '질병사망',
    code: 'A010',
    term1: '2026-11-11',
    term2: '2026-11-11',
    coverage: '질병사망(간편)',
    premium: 10000,
  },
];

const Ltpz011 = () => {
  // 2026-05-28 cellClass 수정
  // 2026-05-29 width 수정
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs2: ColDef<ComparisonRow>[] = [
    {
      headerName: '담보상태',
      field: 'state',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'text-center',
    },
    {
      headerName: '담보코드',
      field: 'code',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '담보보험시기',
      field: 'term1',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '담보보험종기',
      field: 'term2',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '세부담보명',
      field: 'coverage',
      flex: 10,
      tooltipValueGetter: createTooltipValueGetter<ComparisonRow>({ field: 'coverage' }),
      cellClass: (params) => (params.data?.isSumRow ? 'text-left font-bold' : 'text-left'),
      cellRenderer: (params: ICellRendererParams<ComparisonRow>) => (params.data?.isSumRow ? '합계' : params.value),
    },
    {
      headerName: '보험료',
      field: 'premium',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellClass: 'text-right',
      cellRenderer: (params: ICellRendererParams<ComparisonRow>) =>
        params.data?.isSumRow ? Number(params.value ?? 0).toLocaleString() : Number(params.value ?? 0).toLocaleString(),
    },
  ];

  const rowData2 = comparisonRows;
  const sumRow2 = React.useMemo<ComparisonRow[]>(
    () => [
      {
        id: -1,
        state: '',
        code: '',
        term1: '',
        term2: '',
        coverage: '합계',
        premium: rowData2.reduce((sum, row) => sum + row.premium, 0),
        isSumRow: true,
      },
    ],
    [rowData2]
  );

  return (
    <Dialog open>
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
                  <Input
                    aria-label=""
                    value={'대표담보명대표담보명.대표담보명대표담보명text'}
                    readOnly
                    variant="info"
                  />
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
              <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                <AgGridReact<ComparisonRow>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  pinnedBottomRowData={sumRow2}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </TableFoldBody>
          </TableFold>
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
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz011;
