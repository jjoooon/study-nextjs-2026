'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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
import { Input } from '@uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz012 = ({ open, onOpenChange }: PopupBaseProps) => {
  type DummyDataType2 = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;
    isSumRow?: boolean;
  };

  // 가점계산 데이터
  const section2Data: DummyDataType2[] = [
    {
      id: 1,
      field1: '(H1)사망후유',
      field2: '일반상해사망',
      field3: '(65세이하)1000만원당',
      field4: '+1.0',
      field5: '17,000',
      field6: '17.00',
    },
    {
      id: 2,
      field1: '(H1)사망후유',
      field2: '일반상해사망',
      field3: '1000만원당',
      field4: '+0.1',
      field5: '2,000',
      field6: '0.20',
    },
    {
      id: 3,
      field1: '(H1)입원/일당',
      field2: '상해출환치성입원비',
      field3: '10만원당',
      field4: '+4.0',
      field5: '50',
      field6: '20.00',
    },
    {
      id: 4,
      field1: '(H1)사망후유',
      field2: '질병사망',
      field3: '1000만원당',
      field4: '+1.0',
      field5: '17,000',
      field6: '42.00',
    },
  ];

  const section2SumData: DummyDataType2[] = [
    {
      id: -1,
      field1: '가점 합계',
      field2: '',
      field3: '가산담보 합계(H그룹)',
      field4: '',
      field5: '',
      field6: '137.00',
      isSumRow: true,
    },
  ];

  // 감점계산 데이터
  const section3Data: DummyDataType2[] = [
    {
      id: 1,
      field1: '(S1)진단비',
      field2: '유사암진단비(기타피부양)',
      field3: '100만원당',
      field4: '-0.125',
      field5: '50',
      field6: '-0.06',
    },
    {
      id: 2,
      field1: '(S1)진단비',
      field2: '유사암진단(갑상선암)',
      field3: '100만원당',
      field4: '-0.125',
      field5: '50',
      field6: '-0.06',
    },
    {
      id: 3,
      field1: '(S1)진단비',
      field2: '유사암진단비(제자리암)',
      field3: '100만원당',
      field4: '-0.125',
      field5: '50',
      field6: '-0.06',
    },
    {
      id: 4,
      field1: '(S1)진단비',
      field2: '유사암진단비(경계성종양)',
      field3: '100만원당',
      field4: '-0.125',
      field5: '50',
      field6: '-0.06',
    },
  ];

  const section3SumData: DummyDataType2[] = [
    {
      id: -1,
      field1: '감점 소계',
      field2: '',
      field3: 'MAX[(MIN(G그룹간) + S그룹), NL(감점한도)]',
      field4: '',
      field5: '',
      field6: '-0.85',
      isSumRow: true,
    },
    {
      id: -2,
      field1: '(X1)최소필요',
      field2: '잎샀생활중배상책임',
      field3: '가입시',
      field4: '-12.0',
      field5: '10,000',
      field6: '-10.00',
    },
    {
      id: -3,
      field1: '감점 합계',
      field2: '',
      field3: 'MIN(감점 소계, X(필요기준))',
      field4: '',
      field5: '',
      field6: '-0.85',
      isSumRow: true,
    },
  ];

  const columnDefs: ColDef<DummyDataType2>[] = [
    {
      headerName: '구분',
      field: 'field1',
      width: 110,
      cellClass: 'text-center',
      colSpan: (params) => (params.data?.isSumRow ? 2 : 1),
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) =>
        params.data?.isSumRow ? <b>{params.value}</b> : params.value,
    },
    {
      headerName: '누적위험명',
      field: 'field2',
      flex: 1,
      cellClass: 'text-center',
      colSpan: (params) => (params.data?.isSumRow ? 0 : 1),
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => (params.data?.isSumRow ? null : params.value),
    },
    {
      headerName: '환산포인트',
      field: 'field3',
      width: 220,
      cellClass: 'text-center',
      colSpan: (params) => (params.data?.isSumRow ? 2 : 1),
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        if (params.data?.isSumRow) {
          return params.value;
        }
        return (
          <div className="flex items-center justify-between gap-2">
            <span>{params.value}</span>
            <span>{params.data?.field4}</span>
          </div>
        );
      },
    },
    {
      headerName: '가입금액(만원)',
      field: 'field5',
      width: 110,
      cellClass: 'text-right',
      colSpan: (params) => (params.data?.isSumRow ? 0 : 1),
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => (params.data?.isSumRow ? null : params.value),
    },
    {
      headerName: '청약포인트',
      field: 'field6',
      width: 100,
      cellClass: 'text-right',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) =>
        params.data?.isSumRow ? <b>{params.value}</b> : params.value,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              청약포인트 상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ012)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="기본정보" cols={['w-auto', 'w-auto', 'w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="설계번호" width={'14rem'} value={'LA260305361023'} readOnly />
                  <Input aria-label="상품명" width={'22rem'} value={'한화 시그니쳐 여성 건강보험4.0'} readOnly />
                </FormCell>
                <FormCell title={'피보험자'}>
                  <Input aria-label="피보험자명" width={'8rem'} value={'홍길순'} readOnly />
                  <Input aria-label="생년월일" width={'14rem'} value={'940302-2*****'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Gcol placement="ss" className="w-full" gap={4}>
            {/* 가점계산 */}
            <TableFold>
              <TableFoldHead title="가점계산">
                <Button variant={'outlined'} size={'lg'} color={'secondary'} onClick={() => {}}>
                  청약가점담보목록
                </Button>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={section2Data}
                    columnDefs={columnDefs}
                    pinnedBottomRowData={section2SumData}
                    defaultColDef={{ sortable: false, resizable: false }}
                    rowClassRules={{}}
                    domLayout={'autoHeight'}
                  />
                </div>
              </TableFoldBody>
            </TableFold>

            {/* 감점계산 */}
            <TableFold>
              <TableFoldHead title="감점계산" />
              <TableFoldBody>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={section3Data}
                    columnDefs={columnDefs}
                    pinnedBottomRowData={section3SumData}
                    defaultColDef={{ sortable: false, resizable: false }}
                    rowClassRules={{}}
                    domLayout={'autoHeight'}
                  />
                </div>
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
