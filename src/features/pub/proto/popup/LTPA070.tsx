'use client';
// 권오택
import * as React from 'react';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent, createFieldRenderer } from '@/shared/components/aggrid/aggridComponents';
import { Input } from '@/shared/components/uiux/Input';
import { InfoBox } from '@/shared/components/common/InfoBox';

ModuleRegistry.registerModules([AllCommunityModule]);

interface LTPA070Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LTPA070 = ({ open, onOpenChange }: LTPA070Props) => {

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

  // AgGrid Column 
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
      <DialogContent showCloseButton resizable={true} size="xl" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>고지유형별 보험료비교</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPA430)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          
          <Gcol className='w-full'>
            <FormTable caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'견종검색(한글명)'}>
                  <Input aria-label="견종검색" width={'30rem'} value={breedSearch} onChange={(e) => setBreedSearch(e.target.value)} />
                </FormCell>
              </FormRow>
            </FormTable>
            <div className="ag-theme-alpine aggrid-pagination-ko w-full">
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
          </Gcol>
        
        </DialogSection> 

        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'bwc'} gap={2} className="w-full pb-5 px-6">
              <Grow>
              </Grow>
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  확인
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </Grow>
            </Grow>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
    </DialogContent>
  </Dialog>    
  );
};

export default LTPA070;