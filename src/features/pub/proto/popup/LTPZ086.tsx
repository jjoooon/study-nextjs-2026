'use client';
// 권오택
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, DialogClose } from '@uiux/Dialog';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@/shared/components/agGridUtils';
import { Input } from '@uiux/Input';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ086 = ({ open, onOpenChange }: PopupBaseProps) => {

   // dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
    field07: string | number;
    field08: string | number;
    field09: string | number;
    field10: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, field01: '교보생명', field02: '-',  field03: '한화 세이프단체보', field04: '2010-09-30', field05: '2099-12-31', field06: '암(4대유사암제외)진단비', field07: '2,000', field08: '1.0', field09: '정상', field10: '1,000' },
    { id: 2, field01: '당사', field02: '-',  field03: '한화 세이프단체보2', field04: '2010-09-30', field05: '2099-12-31', field06: '암(4대유사암제외)진단비', field07: '2,000', field08: '1.0', field09: '정상', field10: '1,000' },
    { id: 3, field01: '당사', field02: '-',  field03: '한화 세이프단체보2', field04: '2010-09-30', field05: '2099-12-31', field06: '암(4대유사암제외)진단비', field07: '2,000', field08: '1.0', field09: '정상', field10: '1,000' },
    { id: 4, field01: '교보생명', field02: '-',  field03: '한화 세이프단체보1', field04: '2010-09-30', field05: '2099-12-31', field06: '암(4대유사암제외)진단비', field07: '2,000', field08: '1.0', field09: '정상', field10: '1,000' },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
			headerName: '회사명',
			field: 'field01',
			width: 100,
      spanRows: true,
      colSpan: (params) => params.node?.rowPinned ? 9 : 1,
			cellClass: 'flex! items-center! justify-center!',
      cellStyle: (params) => params.node?.rowPinned ? { textAlign: 'center' } : undefined,
		},
    {
			headerName: '증권번호/설계번호',
			field: 'field02',
			flex: 1,
      colSpan: (params) => params.node?.rowPinned ? 0 : 1,
			cellClass: 'flex! items-center! justify-center!',
		},
    {
			headerName: '상품명',
			field: 'field03',
			 flex: 1,
      colSpan: (params) => params.node?.rowPinned ? 0 : 1,
			cellClass: 'flex! items-center! justify-start!',
		},
    {
			headerName: '보호시기',
			field: 'field04',
      flex: 1,
      colSpan: (params) => params.node?.rowPinned ? 0 : 1,
			cellClass: 'text-center',
		},
    {
			headerName: '보험종기',
			field: 'field05',
			width: 100,
      colSpan: (params) => params.node?.rowPinned ? 0 : 1,
			cellClass: 'text-center',
		},
    {
			headerName: '담보명',
			field: 'field06',
			flex: 1,
      colSpan: (params) => params.node?.rowPinned ? 0 : 1,
			cellClass: 'text-center',
		},
    {
			headerName: '가입금액',
			field: 'field07',
			width: 80,
      colSpan: (params) => params.node?.rowPinned ? 0 : 1,
			cellClass: 'text-right',
		},
    {
			headerName: '배수',
			field: 'field08',
			width: 80,
      colSpan: (params) => params.node?.rowPinned ? 0 : 1,
			cellClass: 'text-right',
		},
    {
			headerName: '상태',
			field: 'field09',
			width: 80,
      colSpan: (params) => params.node?.rowPinned ? 0 : 1,
			cellClass: 'text-center',
		},
    {
			headerName: '반영금액',
			field: 'field10',
			width: 80,
			cellClass: 'text-right',
		},
  ];
  
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const sumRow = React.useMemo<DummyDataType[]>(() => {
    const parse = (value: string | number) => {
      if (typeof value === 'number') return value;
      const parsed = Number(String(value).replace(/,/g, ''));
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const totalField10 = rowData.reduce((sum, row) => sum + parse(row.field10), 0);

    return [
      {
        id: -1,
        field01: '합계',
        field02: '',
        field03: '',
        field04: '',
        field05: '',
        field06: '',
        field07: '',
        field08: '',
        field09: '',
        field10: totalField10.toLocaleString(),
      },
    ];
  }, [rowData]);

  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>실손의료비 전환 계약 조회</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ040)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          
          <Gcol className='w-full' gap={5}>
            <TableFold>
              <TableFoldHead title="위배내용">
                <Typo tag='span' variant={'body-md'}>단위:원</Typo>
              </TableFoldHead>  
              <TableFoldBody className="grid-rows-[auto_1fr]">
                <FormTable
                  caption="위배내용"
                  className=""
                  lineTop
                  variant="default"
                >
                  <FormRow vertical>
                    <FormCell title='인수제한'>
                      청약완료불가(업계누적)
                    </FormCell>
                    <FormCell title='누적명'>
                      암진단비(손생보)
                    </FormCell>
                    <FormCell title="누적유형">
                        -
                    </FormCell>
                    <FormCell title="기눅적금액">
                        4,700
                    </FormCell>
                    <FormCell title="합계">
                        4,700
                    </FormCell>
                    <FormCell title="한도">
                        30,000
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>
              
            

            <TableFold>
              <TableFoldHead title="계약전환용 실손의료비(갱신형)" />
              <TableFoldBody className="grid-rows-[auto_1fr]">
                <Gcol className='w-full' gap={4}>
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType>
                      getRowId={params => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData}
                      pinnedBottomRowData={sumRow}
                      columnDefs={columnDefs}
                      defaultColDef={{ 
                        sortable: false,
                        resizable: false,
                      }}
                      rowClassRules={{}}    
                      enableCellSpan={true} 
                      domLayout="autoHeight" 
                    />
                  </div>
                </Gcol>
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