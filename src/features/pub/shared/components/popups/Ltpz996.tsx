/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogHeader, DialogSection, DialogTitle, DialogFooter } from '@uiux/Dialog';

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: 'sMenuInfo',
    field2: 'transComG100',
    field3: 'RB',
    field4: 'COM10107',
    field5:
      '자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.',
  },
  {
    id: 2,
    field1: 'sComG002RA',
    field2: 'transComG100',
    field3: 'RB',
    field4: 'COM10107',
    field5: '자료가 조회되었습니다.',
  },
];

const Ltpz996 = () => {
  const rowData = DummyData;
  const { attributeColumnWidth } = useDynamicColumnWidths();
  // 2026-05-28 cellClass 수정
  // 2026-05-29 width 수정
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '통신레코드',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        cellClass: 'text-center',
      },
      {
        headerName: '서비스코드',
        field: 'field2',
        flex: 1,
        minWidth: attributeColumnWidth(110),
        cellClass: 'text-center',
      },
      {
        headerName: '거래코드',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '메세지코드',
        field: 'field4',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        cellClass: 'text-center',
        cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
          if (!params.value) return null;
          return (
            <button type="button" className="cursor-pointer text-[#006FF2] underline underline-offset-4">
              {String(params.value)}
            </button>
          );
        },
      },
      {
        headerName: '메세지상세',
        field: 'field5',
        flex: 9,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field5' }),
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              거래이력리스트
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ996)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
            <AgGridReact<DummyDataType>
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz996;
