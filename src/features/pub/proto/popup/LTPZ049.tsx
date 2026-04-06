'use client';
// 권오택
import * as React from 'react';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
import { Button } from '@uiux/Button';
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
import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ049 = ({ open, onOpenChange }: PopupBaseProps) => {

   type DummyDataType = {
      id: number;
      isCheck: boolean;
      field01: string | number;
      field02: string | number;
      field03: string | number;
      field04: string | number;
      field05: string | number;
    };
    const DummyData: DummyDataType[] = [
      { id: 1, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 2, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 3, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 4, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 5, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 6, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
    ];
    
    // AgGrid Column 
    const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
      {
        headerName: '할증담보',
        flex: 1,
        field: 'field01',
        cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        colSpan: (params: any) => params.data?.isSumRow ? 2 : 1,
        autoHeight: true,   
      },
      {
        headerName: '보험기간',
        width: 100,
        field: 'field02',
        cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        colSpan: (params: any) => params.data?.isSumRow ? 0 : 1,
        autoHeight: true,
      },
      {
        headerName: '표준체보험료(원)',
        width: 170,
        field: 'field03',
        cellClass: 'text-right flex [&>div>span]:h-auto!',
        autoHeight: true,
      },
      {
        headerName: '할증보험료(원)',
        width: 170,
        field: 'field04',
        cellClass: 'text-right flex [&>div>span]:h-auto!',
        autoHeight: true,
      },
      {
        headerName: '적용보험료(원)',
        width: 170,
        field: 'field05',
        cellClass: 'text-right flex [&>div>span]:h-auto!',
        autoHeight: true,
      },
    ];
      
    const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
    const sumRow = React.useMemo(() => {
      const parse = (v: string | number) => {
        if (typeof v === 'number') return v;
        if (!v) return 0;
        const n = Number(String(v).replace(/,/g, ''));
        return Number.isFinite(n) ? n : 0;
      };
      const total03 = rowData.reduce((s, r) => s + parse(r.field03), 0);
      const total04 = rowData.reduce((s, r) => s + parse(r.field04), 0);
      const total05 = rowData.reduce((s, r) => s + parse(r.field05), 0);
    return [{ id: -1, isSumRow: true, field01: '할증적용담보 합계금액', field02: '', field03: total03.toLocaleString(), field04: total04.toLocaleString(), field05: total05.toLocaleString() }];
    }, [rowData]);
  
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>특별조건특약조회</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ049)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          
          <Gcol className='w-full' gap={5}>
            <Grow className='w-full' variant="box-round">
              <FormTable variant={'head'}
              lineTop={false}
              caption="">
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Typo color="default" tag="span" variant="body-lg" weight="bold">LA123123123123</Typo>
                  </FormCell>
                  <FormCell title={'피보험자'}>
                    <Typo color="default" tag="span" variant="body-lg" weight="bold">김한화(901212-1111111)</Typo>
                  </FormCell>  
                </FormRow>
              </FormTable>
            </Grow>
            <Grow className='w-full'>
              <div className="ag-theme-alpine aggrid-pagination-ko w-full">
                <AgGridReact<DummyDataType>
                  getRowId={params => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  pinnedBottomRowData={sumRow}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{ 
                    sortable: false,
                    resizable: false,
                    autoHeight: true,
                  }}
                  animateRows={false}
                  alwaysShowHorizontalScroll={true}
                  singleClickEdit={true}
                  domLayout="autoHeight" 
                />
              </div>
            </Grow>
            <InfoBox subTitle="할증보험료 계산시 발생할 수 있는 1원 미만의 할증보험료는 0원으로 표시되며, 갱신기 변동될 수 있습니다." variant="info" bg={false}>
            </InfoBox>
          </Gcol>
        
        </DialogSection> 

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                상세조회
              </Button>      
            </Grow>
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