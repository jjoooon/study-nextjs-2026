'use client';

import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = {
  id: number;
  isChecked: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};
const DummyData: DummyDataType[] = [
  { id: 1, isChecked: true, field1: '', field2: '', field3: '' },
  { id: 2, isChecked: false, field1: '', field2: '', field3: '' },
  { id: 3, isChecked: false, field1: '', field2: '', field3: '' },
  { id: 4, isChecked: false, field1: '', field2: '', field3: '' },
  { id: 5, isChecked: false, field1: '', field2: '', field3: '' },
];

export const Ltpz351 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      field: 'field1',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '성명',
      field: 'field2',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '휴대폰',
      field: 'field3',
      flex: 1,
      cellClass: 'text-center',
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  // M2. 신규 페이지
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계도우미 알림톡발송
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ351)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="">
          <Gcol className="w-full" placement="ss" gap={2}>
            <div className="ag-theme-alpine radio-selection min-h-[18.4rem]">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: false,
                  resizable: false,
                }}
                rowSelection={{
                  mode: 'singleRow',
                  checkboxes: true,
                  enableClickSelection: false,
                }}
                singleClickEdit={true}
                rowClassRules={{}}
                domLayout="normal"
              />
            </div>
            <Grow placement="ec" className="w-full">
              <Button variant={'contained'} size={'md'}>
                전송
              </Button>
            </Grow>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button
                variant={'outlined'}
                size={'xl'}
                color={'gray-light'}
                onClick={onOpenChange ? () => onOpenChange(false) : undefined}
              >
                닫기
              </Button>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
