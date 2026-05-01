'use client';

import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

const Ltpz105 = () => {
  type DummyDataType = {
    id: number;
    field1: string | number;
    field2: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, field1: '설계일 ~ 최대 30일', field2: '2026-04-18' },
    { id: 2, field1: '보험나이변경일', field2: '2026-03-24' },
    { id: 3, field1: '상품판매종료일', field2: '2026-03-31' },
    { id: 4, field1: '담보판매종료일', field2: '9999-12-30' },
    { id: 5, field1: '직업코드 변경 종료일자', field2: '' },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '유료설계 기한항목',
      field: 'field1',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '유효일자',
      field: 'field2',
      width: 220,
      cellClass: 'text-center',
    },
  ];

  type DummyDataType2 = {
    id: number;
    field1: string | number;
    field2: string | number;
    field3: string | number;
    field4: string | number;
  };

  const DummyData2: DummyDataType2[] = [
    { id: 1, field1: '계약자', field2: '홍길순', field3: 'YYYY-MM-DD (D-00)', field4: 'YYYY-MM-DD (D-00)' },
    { id: 2, field1: '피보험자', field2: '홍길순', field3: 'YYYY-MM-DD (D-00)', field4: 'YYYY-MM-DD (D-00)' },
    { id: 3, field1: '피보험자', field2: '홍길동', field3: 'YYYY-MM-DD (D-00)', field4: 'YYYY-MM-DD (D-00)' },
    {
      id: 4,
      field1: '피보험자',
      field2: '반짝반짝빛나리영원히',
      field3: 'YYYY-MM-DD (D-00)',
      field4: 'YYYY-MM-DD (D-00)',
    },
    { id: 5, field1: '피보험자', field2: '-', field3: 'YYYY-MM-DD (D-00)', field4: 'YYYY-MM-DD (D-00)' },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '구분',
      field: 'field1',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '고객명',
      field: 'field2',
      flex: 1,
      cellClass: 'text-left',
    },
    {
      headerName: '상령일',
      field: 'field3',
      flex: 1,
      cellClass: 'text-center',
      cellRenderer: (params: { value: string | number }) => {
        return (
          <>
            <div className="text-[#e43939]">{params.value}</div>
          </>
        );
      },
    },
    {
      headerName: '동의종료일',
      field: 'field4',
      flex: 1,
      cellRenderer: (params: { value: string | number }) => {
        return (
          <>
            <div className="text-[#e43939]">{params.value}</div>
          </>
        );
      },
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);
  // M2. 신규 페이지
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              보험계약 중요기한 안내
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol className="w-full" placement="ss">
            <Typo variant={'body-lg'} weight={'bold'}>
              설계정보
            </Typo>
            <Grow className="w-full" variant="box-round" placement={'ss'}>
              <FormTable caption="설계번호" variant="head">
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Input value={'LA123123123123'} variant="info" readOnly />
                  </FormCell>
                  <FormCell title={'보험시기'}>
                    <Input value={'2026-03-18'} variant="info" readOnly />
                  </FormCell>
                  <FormCell title={'유효기간'}>
                    <Input value={'2026-03-18'} variant="info" readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
          </Gcol>
          <Gcol className="w-full" placement="ss" gap={2}>
            <div className="ag-theme-alpine min-h-[18.4rem]">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: false,
                  resizable: false,
                }}
                singleClickEdit={true}
                rowClassRules={{}}
                domLayout="normal"
                alwaysShowVerticalScroll={true}
              />
            </div>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo icon="warning" variant="body-sm">
                상기 유효설계 기한항목중 가장 작은 날짜로 설정됨
              </Typo>
            </Gcol>
          </Gcol>
          <div className="ag-theme-alpine min-h-[18.4rem]">
            <AgGridReact<DummyDataType2>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData2}
              columnDefs={columnDefs2}
              defaultColDef={{
                sortable: false,
                resizable: false,
              }}
              singleClickEdit={true}
              rowClassRules={{}}
              domLayout="normal"
              alwaysShowVerticalScroll={true}
            />
          </div>
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

export default Ltpz105;
