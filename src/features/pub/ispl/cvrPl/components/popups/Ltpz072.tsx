'use client';


import { AgGridEmptyComponent, createFieldRenderer, createTooltipValueGetter } from '@aggrid';
import { Button } from '@uiux/Button';
import '@/shared/lib/agGridPub';

import { Grow, Typo } from '@atoms';

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
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { ColDef, ColGroupDef } from 'ag-grid-enterprise';


type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;

};
const DummyData: DummyDataType[] = [
  { id: 1, field01: '특정부위', field02: '040', field03: '위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장', field04: '0년', field05: '1개월', field06: '', field07: '' },
  { id: 2, field01: '특정부위', field02: '040', field03: '위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장', field04: '0년', field05: '1개월', field06: '', field07: '' },
  { id: 3, field01: '특정부위', field02: '040', field03: '위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장', field04: '0년', field05: '1개월', field06: '', field07: '' },
  { id: 4, field01: '특정부위', field02: '040', field03: '위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장', field04: '0년', field05: '1개월', field06: '', field07: '' },
];


const Ltpz072 = () => {
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '분류',
      width: 130,
      field: 'field01',
      cellClass: 'text-center',
      spanRows: true,
      cellRenderer: createFieldRenderer<DummyDataType>('field01', '[field02, 30]', 'row'),
    },
    {
      headerName: '대상이 되는 부위 또는 질병',
      flex: 1,
      field: 'field03',
      cellClass: 'text-left',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
    },
    {
      headerName: '부담보기간',
      width: 130,
      field: 'field04',
      cellClass: 'text-center',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataType>('field04', '[field05, 50]', 'row'),
    },
    {
      headerName: '사유내용',
      width: 130,
      field: 'field06',
      cellClass: 'text-center',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field06' }),
    },
    {
      headerName: '사유코드',
      width: 80,
      field: 'field07',
      cellClass: 'text-center',
      autoHeight: true,
    },
  ];
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size={'lg'}>
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              특정부위/질병부담보
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className='grid-rows-[1fr]'>
          <div className="ag-theme-alpine min-h-[12.4rem]">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={DummyData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                resizable: true,
                cellClass: 'text-center',
              }}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                부담보선택
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz072;
