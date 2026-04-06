'use client';
// 권오택
import * as React from 'react';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, DialogClose } from '@uiux/Dialog';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Checkbox } from '@uiux/Checkbox';
import { AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { Input } from '@uiux/Input';
import { InfoBox } from '@common/InfoBox';
import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPA430 = ({ open, onOpenChange }: PopupBaseProps) => {

  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, field01: '9,999', field02: '999,999,999', field03: '999,999,999', field04: '999,999,999', field05: '999,999,999', field06: '999,999,999'},
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '구분',
      flex: 1,
      cellClass: 'text-center px-0! flex bg-[#f4f4f4]! [&>div>span]:h-auto! ',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Grow className="w-full px-1 py-1" >
          <Typo className='w-[6.5rem] whitespace-pre-wrap' color="gray" tag="span" variant="body-md" weight="bold">보장보험료 합계(원)</Typo>
        </Grow>
      ),   
    },
    {
      headerName: '1형(355간편고지형)',
      flex: 1,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataType>('field01', 
        <Button color="secondary" disabled onClick={() => {}} only="default" size="sm" variant="contained">
          설계생성
        </Button>
      ),
    },
    {
      headerName: '2형(305간편고지형)',
      flex: 1,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataType>('field02', 
        <Button color="secondary" onClick={() => {}} only="default" size="sm" variant="outlined">
          설계생성
        </Button>
      ),
    },
    {
      headerName: '3형(305간편고지형)',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataType>('field03', 
        <Button color="secondary" onClick={() => {}} only="default" size="sm" variant="outlined">
          설계생성
        </Button>
      ),
    },
    {
      headerName: '4형(305간편고지형)',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataType>('field04', 
        <Button color="secondary" onClick={() => {}} only="default" size="sm" variant="outlined">
          설계생성
        </Button>
      ),
    },
    {
      headerName: '5형(305간편고지형)',
      flex: 1,
      field: 'field05',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataType>('field05', 
        <Button color="secondary" onClick={() => {}} only="default" size="sm" variant="outlined">
          설계생성
        </Button>
      ),
    },
    {
      headerName: '6형(305간편고지형)',
      flex: 1,
      field: 'field06',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: createFieldRenderer<DummyDataType>('field06', 
        <Button color="secondary" onClick={() => {}} only="default" size="sm" variant="outlined">
          설계생성
        </Button>
      ),
    },
    
  ];
  
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  
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
          
          <Gcol>
            <Grow placement='bwc' className="w-full" variant={'box-round'}>
              <FormTable variant={'head'} lineTop={false} caption="설계번호">
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Input aria-label="" width={'15rem'} value={'LA26020945959594'} readOnly />
                    <div className="separator">-</div>
                    <Input aria-label="" width={'3rem'} value={'1'} readOnly />
                    <Input aria-label="" width={'30rem'} value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                    <Input aria-label="" width={'10rem'} value={'1형(345간편고지형)'} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <InfoBox title="간편고지 유혈별 보험료 예시" variant="info" bg={true} 
              items={[
                  { text: '이 상품은 일반심사보험대비 보험료가 할증되어 있으며, \'간편고지\' 유형에 따라 할증수준이 다릅니다. 보험료수준은 할증폭이 가장 큰 305간편고지에서 355간편고지순으로 저렴해집니다' },
                ]} 
              />
          </Gcol>
        <div className="ag-theme-alpine ">
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
        <InfoBox title="현재 설계 담보로 계산된 합계보험료비교 내용(실제해당 형으로 변경시 가입불가능한 담보가 포함될 수 있음)" variant="detail" bg={false} />
        
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