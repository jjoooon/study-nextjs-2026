'use client';
// 권오택
import * as React from 'react';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, DialogClose } from '@uiux/Dialog';

import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, useAgGridPagination } from '@/shared/components/agGridUtils';
import type { PopupBaseProps } from './types';
import { TablePagination } from '@common/TablePagination';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ048 = ({ open, onOpenChange }: PopupBaseProps) => {
  // dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, field01: '심사요청', field02: '승인', field03: '김한화',},
    { id: 2, field01: '심사중', field02: '', field03: '김한화',},
    { id: 3, field01: '심사처리', field02: '', field03: '김한화',},
    { id: 4, field01: '심사요청', field02: '승인', field03: '김한화',},
    { id: 5, field01: '심사중', field02: '', field03: '김한화',},
    { id: 6, field01: '심사처리', field02: '', field03: '김한화',},
    { id: 7, field01: '심사요청', field02: '승인', field03: '김한화',},
    { id: 8, field01: '심사중', field02: '', field03: '김한화',},
    { id: 9, field01: '심사처리', field02: '', field03: '김한화',},
    { id: 10, field01: '심사요청', field02: '승인', field03: '김한화',},
    { id: 11, field01: '심사중', field02: '', field03: '김한화',},
    { id: 12, field01: '심사처리', field02: '', field03: '김한화',},
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '',
      width: 40,
      field: 'id',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '구분',
      width: 80,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '결과',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '처리자',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];
  
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

    const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
    const pageSize = 7;
    const { currentPage, totalPages, handleGridReady, handlePageChange } = useAgGridPagination(gridRef, pageSize);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>QA 심사이력</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ048)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          <Gcol className='w-full'>
            
            <TableFold>
              <TableFoldHead title="QA 심사이력">
                
              </TableFoldHead>
              <TableFoldBody>
                <Grow className='w-full'>
                  <Gcol>
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

                        pagination={true} 
                        paginationPageSize={pageSize} 
                        suppressPaginationPanel={true} 

                        ref={gridRef} 
                        onGridReady={handleGridReady}
                      />
                    </div>
                    <TablePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      itemsPerPage={pageSize}
                    />
                  </Gcol>
                  <Gcol variant="box-round" placement='ss' className='w-full h-[27.6rem]'>
                       [보안]<br></br>
                       1.[15:43]월 보험료 27,130원으로 오안내<br></br>
                       2.건강고지 전산방영되었으나 녹취 미확인 
                  </Gcol>
                </Grow>
              </TableFoldBody>
            </TableFold>

          </Gcol>  
        
        
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
          <DialogBottomInfo />
        </DialogFooter>
    </DialogContent>
  </Dialog>    
  );
};