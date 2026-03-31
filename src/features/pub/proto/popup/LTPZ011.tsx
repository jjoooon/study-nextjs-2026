'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { Input } from '@uiux/Input';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { amountUnitInputCellRenderer, AgGridEmptyComponent } from '@aggrid';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
ModuleRegistry.registerModules([AllCommunityModule]);


export const LTPZ011P = () => {
  const amountInputRefs2 = useRef<Array<HTMLInputElement | null>>([]);

  type DummyDataType2 = {
    id: number;
    담보상태: string;
    담보코드: string;
    담보보험시기: string;
    담보보험종기: string;
    세부담보명: string;
    보험료: number;
    isSumRow?: boolean;
  };

  const DummyData2: DummyDataType2[] = [
    { id: 1, 담보상태: '', 담보코드: '', 담보보험시기: '', 담보보험종기: '', 세부담보명: '', 보험료: 1377 },
    { id: 2, 담보상태: '', 담보코드: '', 담보보험시기: '', 담보보험종기: '', 세부담보명: '', 보험료: 9999999 },
    { id: 3, 담보상태: '', 담보코드: '', 담보보험시기: '', 담보보험종기: '', 세부담보명: '', 보험료: 159999 },
    { id: 4, 담보상태: '', 담보코드: '', 담보보험시기: '', 담보보험종기: '', 세부담보명: '', 보험료: 2323230 },
  ];

  const premiumAmountCellRenderer2 = (params: ICellRendererParams<DummyDataType2>) =>
    amountUnitInputCellRenderer<DummyDataType2>({ ...params, amountInputRefs: amountInputRefs2.current });

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '담보상태',
      field: '담보상태',
      width: 80,
      cellClass: (params) => params.data?.isSumRow ? 'text-center font-bold' : 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? <b>합계</b> : params.value,
      colSpan: (params) => params.data?.isSumRow ? 5 : 1,
    },
    {
      headerName: '담보코드',
      field: '담보코드',
      width: 80,
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? null : params.value,
      colSpan: (params) => params.data?.isSumRow ? 0 : 1,
    },
    {
      headerName: '담보보험시기',
      field: '담보보험시기',
      width: 110,
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? null : params.value,
      colSpan: (params) => params.data?.isSumRow ? 0 : 1,
    },
    {
      headerName: '담보보험종기',
      field: '담보보험종기',
      width: 110,
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? null : params.value,
      colSpan: (params) => params.data?.isSumRow ? 0 : 1,
    },
    {
      headerName: '세부담보명',
      field: '세부담보명',
      flex: 1,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? null : params.value,
      colSpan: (params) => params.data?.isSumRow ? 0 : 1,
    },
    {
      headerName: '보험료(원)',
      field: '보험료',
      width: 120,
      cellClass: 'text-right',
      headerClass: 'px-0!',
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        if (params.data?.isSumRow) {
          return <b>{Number(params.value ?? 0).toLocaleString()}</b>;
        }
        return premiumAmountCellRenderer2(params);
      },
    },
  ];

  const rowData2 = React.useMemo(() => DummyData2, []);
  const sumRow2 = React.useMemo<DummyDataType2[]>(
    () => [{
      id: -1,
      담보상태: '합계',
      담보코드: '',
      담보보험시기: '',
      담보보험종기: '',
      세부담보명: '',
      보험료: rowData2.reduce((sum, row) => sum + row.보험료, 0),
      isSumRow: true,
    }],
    [rowData2]
  );

  const [open] = useState(true);

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton resizable={false} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'h2'} variant={'heading-lg'}>담보내용상세</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ011)</Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol className="w-full" gap={5}>
            <Grow className='w-full' variant="box-round" placement={'ss'}>
              <FormTable caption="대표담보명" cols={['w-[14rem] min-w-[14rem]', 'w-auto']} variant='none'>
                <FormRow>
                  <FormCell title={'대표담보명'}>
                    <Input aria-label="" width={'20rem'} value={'대표담보명.text'} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <TableFold variant="default">
              <TableFoldHead title="">
                <Grow>
                  <Typo variant="body-xl">(단위: 원)</Typo>
                </Grow>   
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine w-full absolute top-0 left-0 h-full">
                  <AgGridReact<DummyDataType2>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
                    pinnedBottomRowData={sumRow2}
                      defaultColDef={{ 
                      sortable: false, 
                      resizable: false,
                    }}
                    animateRows={false}
                    alwaysShowHorizontalScroll={true}
                    singleClickEdit={true}
                    rowClassRules={{}}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Gcol>
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

export default LTPZ011P;
