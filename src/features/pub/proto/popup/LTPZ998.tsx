'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Badge } from '@uiux/Badge';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogTrigger } from '@uiux/Dialog';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';


import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { PlusIcon, SearchIcon } from '@icons';


import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { amountUnitInputCellRenderer, AgGridEmptyComponent, createCellValueChangedHandler, editableSelectCellRenderer, numberValueFormatter } from '@aggrid';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, EditableCallbackParams, ICellRendererParams } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);


export interface LTPZ998Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LTPZ998 = ({ open, onOpenChange }: LTPZ998Props) => {
  type DummyDataType = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
  };
    
  const dummyData: DummyDataType[] = [
    {
      id: 1,
      field1: '예산-리스크관리',
      field2: '경영기획 관리자',
      field3: '조회',
    },
     
  ];
	const [rowData, setRowData] = useState<DummyDataType[]>(dummyData);

	const columnDefs: ColDef<DummyDataType>[] = [
		{
			headerName: '메뉴명',
			field: 'field1',
			flex: 1,
			cellClass: 'text-center',
		},
		{
			headerName: '역할명',
			field: 'field2',
			flex: 1,
      cellClass: 'text-center',
		},
    {
			headerName: '역할권한',
			field: 'field3',
			flex: 1,
      cellClass: 'text-center',
		},
	];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md" className="h-[40rem]">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>화면권한보기</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ998)</Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <div className="ag-theme-alpine" >
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{ 
                sortable: true, 
                resizable: true,
              }}
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

export default LTPZ998;
