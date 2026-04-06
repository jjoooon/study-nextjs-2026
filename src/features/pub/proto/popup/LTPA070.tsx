'use client';
// 권오택
import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, DialogClose } from '@uiux/Dialog';
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils';

import type { ColDef, ColGroupDef } from 'ag-grid-community';
import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPA070 = ({ open, onOpenChange }: PopupBaseProps) => {
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
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '견종명',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '견종명(영문)',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];
  
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [breedSearch, setBreedSearch] = React.useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>고지유형별 보험료비교</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPA430)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable 
              variant={'none'}
              lineTop={false}
              caption=""
              cols={['w-[10rem]','w-auto']}
            >
              <FormRow>
                <FormCell title={'견종검색(한글명)'}>
                  <Input aria-label="견종검색" value={breedSearch} onChange={(e) => setBreedSearch(e.target.value)} />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <div className="ag-theme-alpine">
            <AgGridReact<DummyDataType>
              getRowId={params => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{ 
                sortable: false,
                resizable: false,
              }}
              domLayout="autoHeight" 
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