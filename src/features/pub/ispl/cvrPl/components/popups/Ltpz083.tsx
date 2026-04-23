'use client';

// M1. 파일명수정 LTPA070 -> LTPZ083
// M1. 컴포넌트명수정 LTPA070 -> LTPZ083

import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Grow, Typo } from '@atoms';

import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
};
const DummyData: DummyDataType[] = [
  { id: 1, field01: '웰시 코기 카디건', field02: 'Welsh Corgi Cardigan' },
  { id: 2, field01: '웰시 코기 펨브로크', field02: 'Welsh Corgi Pembroke' },
  { id: 3, field01: '부비에 데 아르덴', field02: 'Bouvier des Ardennes' },
];

export const Ltpz083 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '견종명',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '견종명(영문)',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center',
      autoHeight: true,
    },
  ];

  // rowSelection 사용시
  const [breedSearch, setBreedSearch] = React.useState('');

  const rowData = React.useMemo(() => {
    if (!breedSearch) return DummyData;
    return DummyData.filter((item) => String(item.field01).includes(breedSearch));
  }, [breedSearch]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              견종검색
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA083)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable variant={'none'} lineTop={false} caption="" cols={['w-[10rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'견종검색(한글명)'}>
                  <Input aria-label="견종검색" value={breedSearch} onChange={(e) => setBreedSearch(e.target.value)} />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <div className="ag-theme-alpine min-h-[18.5rem]">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              domLayout="normal"
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
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
