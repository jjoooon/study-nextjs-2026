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
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils';
import { useTabs } from '@/shared/hooks/useTabs';
import { TabPager } from '@common/TabPager';
import { Checkbox } from '@uiux/Checkbox';
import type { PopupBaseProps } from './types';
import { Bold } from 'lucide-react';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ051 = ({ open, onOpenChange }: PopupBaseProps) => {
   
  type LTPZ051Tab = { name: string; value: string; label: string };
  const DATA_TABS: LTPZ051Tab[] = [
    { name: '직업정보(상해급수)변경대상(d건)', value: 'basic', label: '직업정보(상해급수)변경대상(d건)' },
    { name: '이륜차부담보 변경대상(d건)', value: 'detail', label: '이륜차부담보 변경대상(d건)' },
  ];

  const { tabs, active, setActive } = useTabs(DATA_TABS);

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
    { id: 1, field01: '-', field02: '-', field03: 'LA20234472050000', field04: '1급', field05: '회사원', field06: '1급', field07: '회사원'},
    { id: 2, field01: '-', field02: '-', field03: 'LA20234472050001', field04: '1급', field05: '회사원', field06: '1급', field07: '회사원'}
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '대상여부',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '증권번호',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경설계번호',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경전 직업정보',
      headerClass: 'ag-header-right-divider',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: any) => <Typo className="whitespace-nowrap">{String(params.data?.field04 ?? '')}</Typo>,
        },
        {
          headerName: '직업',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: any) => <Typo className="whitespace-nowrap">{String(params.data?.field05 ?? '')}</Typo>,
        }
      ]
    },
    {
      headerName: '변경후 직업정보',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: any) => <Typo className="whitespace-nowrap">{String(params.data?.field06 ?? '')}</Typo>,
        },
        {
          headerName: '직업',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: any) => <Typo className="whitespace-nowrap">{String(params.data?.field07 ?? '')}</Typo>,
        }
      ]
    },
  ];
  
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>고객 직업정보(상해급수)변경안내</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ051)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          <Grow className='w-full' variant="box-round">
            <FormTable variant={'head'}
            lineTop={false}
            caption="">
              <FormRow>
                <FormCell title={'상품명'}>
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">Text</Typo>
                </FormCell>
                <FormCell title={'설계번호'}>
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">LA123123123123</Typo>
                </FormCell>  
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol className='w-full' gap={2.5}>
            <Gcol variant={'box-info'}>
              <Typo variant="body-sm" icon={'info'}>
                고객 직업정보(상해급수) 또는 이륜차부담보 가입여부가 불일치 할 경우 신계약 체결이 불가능합니다. 해당 신계약 청약완료 이전에 기계약의 직업변경 또는 이윤차부담보 변경 완료 필요. 또한, 신계약 청약서 발행 이전에 배서(청약중 이후) 진행 필요
              </Typo>
            </Gcol>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo variant="body-sm">
                <Checkbox color="primary" errorMsg="선택은 필수입니다." errorPs="bl" onCheckedChange={() => {}} size="lg" variant="default">계약변경 설계 청약서 발급 및 확인서명을 조건으로 청약 진행 (단, 계약변경 미완료시 <Typo weight="bold" color="primary">신계약 청약완료불가</Typo>)</Checkbox>
              </Typo>
            </Gcol>
            <TabPager
              data={tabs}
              active={active}
              setActive={setActive}
              hasTableBelow={true}
              getValue={(t) => t.value}
              renderTab={(t) => t.label ?? t.value}
              visibleCount={4}
              removable={false}
            >
              {active === 'basic' ? (
                <Gcol className='w-full' gap={4}>
                  <FormTable caption="직업 상세" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']} lineTop={false}>
                    <FormRow>
                      <FormCell title={'고객명'}>김한화</FormCell>
                      <FormCell title={'직업정보'}>1급/회사원</FormCell>
                    </FormRow>
                  </FormTable>
                  <Gcol>
                    <Grow className="w-full" gap={1} placement='se'>
                      <Typo variant="body-md" color="default">직업정보(상해급수) 상이 계약
                      </Typo>
                      <Typo variant="body-md" weight={'bold'} color="primary">99건</Typo>
                    </Grow>
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType>
                        getRowId={params => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        defaultColDef={{ 
                          sortable: false,
                          resizable: false,
                        }}
                        domLayout="autoHeight" 
                      />
                    </div>
                  </Gcol>
                </Gcol>
              ) : (
                <Gcol className='w-full' gap={4}>
                  <FormTable caption="직업 상세" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']} lineTop={false}>
                    <FormRow>
                      <FormCell title={'고객명'}>김한화2</FormCell>
                      <FormCell title={'직업정보'}>1급/회사원2</FormCell>
                    </FormRow>
                  </FormTable>
                  <Gcol>
                  <Grow className="w-full" gap={1} placement='se'>
                    <Typo variant="body-md" color="default">이륜차부담보 가입 사이 계약</Typo>
                    <Typo variant="body-md" weight={'bold'} color="primary">99건</Typo>
                  </Grow>
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType>
                      getRowId={params => String(params.data.id)}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      defaultColDef={{ 
                        sortable: false,
                        resizable: false,
                      }}
                      domLayout="autoHeight" 
                    />
                  </div>
                  </Gcol>
                </Gcol>
              )}
            </TabPager>
           </Gcol>
     
        </DialogSection> 

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
              </Button>
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