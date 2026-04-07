'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

ModuleRegistry.registerModules([AllCommunityModule]);

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
    field5: '자료가 조회되었습니다.',
  },
];

export const Ltpz996 = ({ open, onOpenChange }: PopupBaseProps) => {
  const rowData = DummyData;

  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '통신레코드',
        field: 'field1',
        flex: 1,
        cellClass: 'text-center',
      },
      {
        headerName: '서비스코드',
        field: 'field2',
        flex: 1,
        cellClass: 'text-center',
      },
      {
        headerName: '거래코드',
        field: 'field3',
        flex: 1,
        cellClass: 'text-center',
      },
      {
        headerName: '메세지코드',
        field: 'field4',
        flex: 1,
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
        flex: 1,
        cellClass: 'text-center',
      },
    ],
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
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

        <DialogSection className="grid-rows-[1fr]">
          <div className="ag-theme-alpine">
            <AgGridReact<DummyDataType>
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              domLayout="autoHeight"
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
