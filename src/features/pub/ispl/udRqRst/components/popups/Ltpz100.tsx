/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent } from '@aggrid';
import { Grow, Typo, Gcol, Grid } from '@atoms';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { TableFold, TableFoldHead, TableFoldBody } from '@/shared/components/common/TableFold';
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
import { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '1',
    field02: '2026-03-24 09:54',
  },
  {
    id: 2,
    field01: '2',
    field02: '2026-03-24 10:35',
  },
  {
    id: 2,
    field01: '2',
    field02: '2026-03-24 10:35',
    field03: '백경희',
    field04: '보완요청',
    field05: '보완요청',
    field06: '',
    field06Items: [
      { id: 'a', checked: true, label: '고지', disabled: true },
      { id: 'b', checked: true, label: '제한담보', disabled: true },
      { id: 'c', checked: true, label: '고지유형변경', disabled: true },
      { id: 'd', checked: true, label: '서류', disabled: true },
      { id: 'e', checked: true, label: '검토불가', disabled: true },
      { id: 'f', checked: true, label: '기타', disabled: true },
    ],
    field07: '보기',
  },
  {
    id: 3,
    field01: '3',
    field02: '2026-03-24 10:35',
    
  },
  
];


const Ltpz100 = () => {

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '순번',
      field: 'field01',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '일시',
      field: 'field02',
      width: 120,
      cellClass: 'text-center',
    },
    
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              이력 상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz100)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="gap-3">
          <Grow placement="bwc" gap={3}>
            <TableFold variant="default" className="grid-rows-[auto_1fr]">
              <TableFoldHead title="심사이력" />
              <TableFoldBody>
                <Gcol className="w-full h-full min-h-[18.4rem]">
                  <div className="ag-theme-alpine ">
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      domLayout="normal"
                    />
                  </div>
                </Gcol>
              </TableFoldBody>
            </TableFold>
            {/* <TableFold variant="default" className="grid-rows-[auto_1fr]">
              <TableFoldHead title="심사이력" />
              <TableFoldBody>
                <Gcol className="w-full h-full min-h-[18.4rem]">
                  <div className="ag-theme-alpine ">
                    <AgGridReact<DummyDataType2>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData2}
                      columnDefs={columnDefs2}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      domLayout="normal"
                    />
                  </div>
                </Gcol>
              </TableFoldBody>
            </TableFold>
            <TableFold variant="default" className="grid-rows-[auto_1fr]">
              <TableFoldHead title="심사이력" />
              <TableFoldBody>
                <Gcol className="w-full h-full min-h-[18.4rem]">
                  <div className="ag-theme-alpine ">
                    <AgGridReact<DummyDataType3>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData3}
                      columnDefs={columnDefs3}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      domLayout="normal"
                    />
                  </div>
                </Gcol>
              </TableFoldBody>
            </TableFold> */}
          </Grow>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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

export default Ltpz100;
