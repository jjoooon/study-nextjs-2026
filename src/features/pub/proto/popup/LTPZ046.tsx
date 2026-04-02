'use client';
// 권오택
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@/shared/components/aggrid/aggridComponents';
import { Input } from '@/shared/components/uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

interface LTPZ046Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LTPZ046 = ({ open, onOpenChange }: LTPZ046Props) => {
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
    { id: 1, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 2, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 3, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 4, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 5, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 6, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
  ];
  
    // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '부호',
      width: 80,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '구분',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '급수',
      width: 150,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '목적물가입금액',
      flex: 1,
      field: 'field04',
      cellClass: 'text-right flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '가입금액',
      flex: 1,
      field: 'field05',
      cellClass: 'text-right flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];
    
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    DummyData.filter(row => !row.isCheck).map(row => row.id)
  );
  
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>화재대물배상책임부호선택</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ046)</Typo>
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
                    <Typo color="default" tag="span" variant="body-lg" weight="bold">설계번호의 상품명 text</Typo>
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <Grow className='w-full'>
              <div className="ag-theme-alpine aggrid-pagination-ko w-full">
                <AgGridReact<DummyDataType>
                  rowData={rowData}
                  columnDefs={columnDefs}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{ 
                    sortable: false,
                    resizable: false,
                    autoHeight: true,
                  }}
                  animateRows={false}
                  alwaysShowHorizontalScroll={true}
                  singleClickEdit={true}
                  onCellValueChanged={onCellValueChanged}
                  rowSelection={{
                    mode: 'singleRow',
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    headerName: '선택',
                  }}
                  rowClassRules={{}}
                  onGridReady={params => {
                    params.api.forEachNode(node => {
                      if (node.data?.isCheck) {
                        node.setSelected(true);
                      }
                    });
                  }}
                  domLayout="autoHeight" 
                />
              </div>
            </Grow>
            <Grow className='w-full'>
              <FormTable caption="담보" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
                <FormRow>
                  <FormCell title={'담보명'}>
                    <Input size="lg" value="" variant="default" width="18rem" readOnly/>
                  </FormCell>
                  <FormCell title={' 가입금액'}>
                    <Input size="lg" value="0" variant="default" width="18rem" after="만원" commaAmount readOnly/>
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
          </Gcol>
        
        </DialogSection> 

        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'bwc'} gap={2} className="w-full pb-5 px-6">
              <Grow>
              </Grow>
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  확인
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </Grow>
            </Grow>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
    </DialogContent>
  </Dialog>    
  );
};

export default LTPZ046;