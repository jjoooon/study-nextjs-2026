'use client';

import { useMemo, useState } from 'react';
import { Gcol, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, } from '@uiux/Dialog';

import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule]);

interface LTPZ002Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LTPZ002 = ({ open, onOpenChange }: LTPZ002Props) => {
  type DummyDataType = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
  };
  const dummyData: DummyDataType[] = [
    { 
      id: 1, 
      field1: 'sMenuInfo',
      field2: 'transComG100', 
      field3: 'RB',
      field4: 'COM10107',
      field5: '자료가 조회되었습니다.' 
    },
    
  ];
	const [rowData, setRowData] = useState<DummyDataType[]>(dummyData);
  const columnDefs: ColDef<DummyDataType>[] = useMemo(() => [
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
        if (!params.value) {
          return null;
        }

        return (
          <button
            type="button"
            className="cursor-pointer text-[#006FF2] underline underline-offset-4"
            onClick={event => {
              console.log('메세지코드 클릭:', params.value);
            }}
          >
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
  ], []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>가입설계검색</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ002)</Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <div className="ag-theme-alpine" >
            <AgGridReact<DummyDataType>
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{ 
                sortable: true, 
                resizable: true,
              }}
              domLayout='autoHeight'
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
      </DialogContent>
    </Dialog>
	);
};

export default LTPZ002;
