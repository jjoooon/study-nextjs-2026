'use client';
// 권오택
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, numberValueFormatter } from '@/shared/components/agGridUtils';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
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

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz085 = ({ open, onOpenChange }: PopupBaseProps) => {
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, field01: '여성통합암(4대유사암 제외)진단비', field02: 0 },
    { id: 2, field01: '여성통합암(4대유사암 제외)진단비', field02: 100 },
    { id: 3, field01: '여성통합암(4대유사암 제외)진단비', field02: 7000 },
    { id: 4, field01: '여성통합암(4대유사암 제외)진단비', field02: 7000 },
    { id: 5, field01: '여성통합암(4대유사암 제외)진단비', field02: 7000 },
    { id: 6, field01: '여성통합암(4대유사암 제외)진단비', field02: 7000 },
  ];

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '할증담보',
      flex: 1,
      field: 'field01',
      cellClass: 'text-left flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '설계금액',
      width: 180,
      field: 'field02',
      cellClass:
        'text-right pr-[1rem]! [&_.ag-cell-wrapper]:overflow-visible! [&_.ag-cell-value]:overflow-visible! [&_.ag-cell-value]:whitespace-nowrap [&_.ag-input-field-input]:pr-[1rem]! [&_.ag-input-field-input]:tracking-normal',
      autoHeight: true,
      valueFormatter: numberValueFormatter,
      editable: true,
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const gridRowData = React.useMemo<DummyDataType[]>(() => {
    const total = rowData.reduce((sum, row) => sum + Number(row.field02), 0);
    return rowData.map((row, index) => ({
      ...row,
      field02: index === 0 ? total : row.field02,
    }));
  }, [rowData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              통합/세트담보누적조정
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ085)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full">
            <Grow className="w-full">
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={gridRowData}
                  columnDefs={columnDefs}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowStyle={(params) =>
                    params.node.rowIndex === 0 && !params.node.rowPinned ? { fontWeight: '700' } : undefined
                  }
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                    autoHeight: true,
                  }}
                  animateRows={false}
                  singleClickEdit={true}
                  domLayout="autoHeight"
                />
              </div>
            </Grow>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow></Grow>
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
