'use client';
// 권오택
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea } from '@uiux/Dialog';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent } from '@/shared/components/aggrid/aggridComponents';
import { Input } from '@/shared/components/uiux/Input';
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';
import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ039 = ({ open, onOpenChange }: PopupBaseProps) => {

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
    field11: string | number;
    field12: string | number;
    field13: string | number;
    field14: string | number;
    field15: string | number;
    field16: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, field01: '1년', field02: '755,000',  field03: '0', field04: '0', field05: '0', field06: '1.2', field07: '0', field08: '0', field09: '0', field10: '1.2', field11: '0', field12: '0', field13: '0', field14: '1.2', field15: '0', field16: '0' },
    { id: 2, field01: '2년', field02: '755,000',  field03: '0', field04: '0', field05: '0', field06: '1.2', field07: '0', field08: '0', field09: '0', field10: '1.2', field11: '0', field12: '0', field13: '0', field14: '1.2', field15: '0', field16: '0' },
    { id: 3, field01: '3년', field02: '755,000',  field03: '0', field04: '0', field05: '0', field06: '1.2', field07: '0', field08: '0', field09: '0', field10: '1.2', field11: '0', field12: '0', field13: '0', field14: '1.2', field15: '0', field16: '0' },
    { id: 4, field01: '4년', field02: '755,000',  field03: '0', field04: '0', field05: '0', field06: '1.2', field07: '0', field08: '0', field09: '0', field10: '1.2', field11: '0', field12: '0', field13: '0', field14: '1.2', field15: '0', field16: '0' },
    { id: 5, field01: '5년', field02: '755,000',  field03: '0', field04: '0', field05: '0', field06: '1.2', field07: '0', field08: '0', field09: '0', field10: '1.2', field11: '0', field12: '0', field13: '0', field14: '1.2', field15: '0', field16: '0' },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '경과시간',
      width: 80,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '기본계약 및 특약담보(실손의료비 제외)',
      width: 1000,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      headerClass: 'ag-header-right-divider',
      autoHeight: true,
      children: [
        {
          headerName: '납입보험료',
          field: 'field02',
          width: 180,
          cellClass: 'text-right flex [&>div>span]:h-auto!',
          autoHeight: true,
        },
        {
          headerName: '최저보증이율 적용시',
          width: 310,
          cellClass: 'text-right px-0! flex [&>div>span]:h-auto!',
          headerClass: 'ag-header-right-divider',
          autoHeight: true,
          children:[
            {
              headerName: '적립부분',
              field: 'field03',
              width: 100,
              cellClass: 'text-right flex [&>div>span]:h-auto!',
              autoHeight: true,
            },
            {
              headerName: '보장부분',
              field: 'field04',
              width: 70,
              cellClass: 'text-right flex [&>div>span]:h-auto!',
              autoHeight: true,
            },
            {
              headerName: '합계',
              field: 'field05',
              width: 70,
              cellClass: 'text-right flex [&>div>span]:h-auto!',
              autoHeight: true,
            },
            {
              headerName: '환급율',
              field: 'field06',
              width: 70,
              cellClass: 'text-center flex [&>div>span]:h-auto!',
              autoHeight: true,
            }
          ]
        },
        {
          headerName: '2026년 2월 현재공시이율(1.5%) 적용시',
          width: 310,
          cellClass: 'text-right flex [&>div>span]:h-auto!',
          headerClass: 'ag-header-right-divider',
          autoHeight: true,
          children:[
            {
              headerName: '적립부분',
              field: 'field07',
              width: 100,
              cellClass: 'text-right flex [&>div>span]:h-auto!',
              autoHeight: true,
            },
            {
              headerName: '보장부분',
              field: 'field08',
              width: 70,
              cellClass: 'text-right flex [&>div>span]:h-auto!',
              autoHeight: true,
            },
            {
              headerName: '합계',
              field: 'field09',
              width: 70,
              cellClass: 'text-right flex [&>div>span]:h-auto!',
              autoHeight: true,
            },
            {
              headerName: '환급율',
              field: 'field10',
              width: 70,
              cellClass: 'text-center flex [&>div>span]:h-auto!',
              autoHeight: true,
            }
          ]
        },
        {
          headerName: '평균공시이율(1.5%) 적용시',
          width: 310,
          cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
          headerClass: 'ag-header-right-divider',
          autoHeight: true,
          children:[
            {
              headerName: '적립부분',
              field: 'field11',
              width: 100,
              cellClass: 'text-right flex [&>div>span]:h-auto!',
              autoHeight: true,
            },
            {
              headerName: '보장부분',
              field: 'field12',
              width: 70,
              cellClass: 'text-right flex [&>div>span]:h-auto!',
              autoHeight: true,
            },
            {
              headerName: '합계',
              field: 'field13',
              width: 70,
              cellClass: 'text-right flex [&>div>span]:h-auto!',
              autoHeight: true,
            },
            {
              headerName: '환급율',
              field: 'field14',
              width: 70,
              cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
              autoHeight: true,
            }
          ]
        },
      ]
    },
    {
      headerName: '실손의료비',
      width: 140,
      autoHeight: true,
       children: [
        {
          headerName: '납입보험료', 
          field: 'field15',
          width: 80,
          cellClass: 'text-right flex [&>div>span]:h-auto!',
        },
        {
          headerName: '환급금', 
          field: 'field16',
          width: 60,
          cellClass: 'text-right flex [&>div>span]:h-auto!',
        },
      ]    
    }
  ];
  
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [breedSearch, setBreedSearch] = React.useState('');
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>예상환급금(장기)</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ039)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          
          <Gcol className='w-full'>
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable variant={'head'}
              lineTop={false}
              caption="">
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Typo color="default" tag="span" variant="body-lg" weight="bold">LA123123123123</Typo>
                    <Typo color="default" tag="span" variant="body-lg" weight="bold">설계번호의 상품명 text</Typo>
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
            <Gcol className="w-full" placement="ss" variant="box-info">
              <BulletList>
                <BulletListItem size="sm">
                  기본계약 및 특약담보(실손의료비를 제외한 갱신담보)의 납입보험료는 각 담보별 갱신 종료일까지 납입할 예상보험료의 합계액이 실손의료비의 납입보험료는 재가입 이후 보험료를 제외한 최대 14회차(노후실손의료비 담보의 경우 2회차)까지 갱신하는 것을 가정하여 예시합니다.
                </BulletListItem>
                <BulletListItem size="sm">적용이율(평균공시이율)은 공시이율을 한도로 합니다.</BulletListItem>
                <BulletListItem size="sm">평균공시이율은 전체 보험회사 공시이율의 평균으로 보험업감독규정 제 1-2조(정의) 제13호, 보험업감독업무시행세칙 제 4-4조(평균공시이율)의 기준에 따라 산출된 이율을 말합니다.</BulletListItem>
                <BulletListItem size="sm">최저보증이율은 가입설계서를 참조하시기 바랍니다.</BulletListItem>
                <BulletListItem size="sm">노후실손의료비 담보 가입 시 실손의료비 항목에 노후실손의료비 보험료가 표시됩니다.</BulletListItem>
                <BulletListItem size="sm">차도리ECO운전자보험의 ECO마일리지 할인을 신청한 경우, 실제 해지환급금은 마일리지 정산금액이 포함되어 환급률이 상이할 수 있습니다.</BulletListItem>
              </BulletList>
            </Gcol>
          </Gcol>
        
        </DialogSection> 

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                닫기
              </Button>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>    
  );
};