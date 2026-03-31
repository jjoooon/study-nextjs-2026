'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { Input } from '@uiux/Input';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { amountUnitInputCellRenderer, AgGridEmptyComponent, createCellValueChangedHandler } from '@aggrid';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { SearchIcon } from '@/shared/components/icons/CommonIcons';
ModuleRegistry.registerModules([AllCommunityModule]);


export const LTPZ017P = () => {
 
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    planNo: number;
    planName: string;
    registrationDate: string;
  };

  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: false, planNo: 1, planName: '', registrationDate: '' },
    { id: 2, isCheck: false, planNo: 2, planName: '', registrationDate: '' },
    { id: 3, isCheck: true, planNo: 3, planName: '', registrationDate: '' },
    { id: 4, isCheck: false, planNo: 4, planName: '', registrationDate: '' },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '플랜순번',
      field: 'planNo',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '플랜명',
      field: 'planName',
      flex: 1,
    },
    {
      headerName: '등록일자',
      field: 'registrationDate',
      width: 120,
      cellClass: 'text-center',
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


  const [open] = useState(true);

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton resizable={false} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'h2'} variant={'heading-lg'}>나만의설계</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ017)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement='bwc' className="w-full" variant={'box'}>
            <FormTable variant={'none'} lineTop={false} caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-[20rem] min-w-[20rem]', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'설계사'}>
                  <Input aria-label="" width={'10rem'} value={'text'} readOnly />
                </FormCell>
                <FormCell title={'상품명'}>
                  <Grow>
                    <Input aria-label="" width={'20rem'} value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
            <TableFold variant={'accordion'}>
              <TableFoldHead title="계약기본사항">
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{ sortable: false }}
                    animateRows={false}
                    alwaysShowHorizontalScroll={true}
                    singleClickEdit={true}
                    onCellValueChanged={onCellValueChanged}
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: true,
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    rowClassRules={{}}
                    onGridReady={params => {
                      params.api.forEachNode(node => {
                        if (node.data?.isCheck) {
                          node.setSelected(true);
                        }
                      });
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>  
        </DialogSection>  
        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'ee'} gap={2} className="w-full pb-5 px-6">
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  저장
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

export default LTPZ017P;
