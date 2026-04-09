'use client';

import { AgGridEmptyComponent } from '@aggrid';
import { Grow, Typo } from '@atoms';
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
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz01201 = ({ open, onOpenChange }: PopupBaseProps) => {
  type DummyDataType2 = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: number;
    isSumRow?: boolean;
  };

  const DummyData: DummyDataType2[] = [
    { id: 1, field1: '', field2: '', field3: '', field4: '', field5: '', field6: 1377 },
    { id: 2, field1: '', field2: '', field3: '', field4: '', field5: '', field6: 9999999 },
    { id: 3, field1: '', field2: '', field3: '', field4: '', field5: '', field6: 159999 },
    { id: 4, field1: '', field2: '', field3: '', field4: '', field5: '', field6: 2323230 },
  ];

  const columnDefs: ColDef<DummyDataType2>[] = [
    {
      headerName: '구분',
      field: 'field1',
      width: 80,
    },
    {
      headerName: '누적위험명',
      field: 'field2',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '환산포인트',
      field: 'field3',
      width: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '감',
      field: 'field4',
      width: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '세부담보명',
      field: 'field5',
      flex: 1,
    },
  ];

  const rowData = DummyData;
  // const sumRow2 = React.useMemo<DummyDataType2[]>(
  //   () => [
  //     {
  //       id: -1,
  //       field1: '합계',
  //       field2: '',
  //       field3: '',
  //       field4: '',
  //       field5: '',
  //       field6: rowData2.reduce((sum, row) => sum + row.field6, 0),
  //       isSumRow: true,
  //     },
  //   ],
  //   [rowData2]
  // );

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
            <FormTable caption="청약포인트안내" cols={['w-[20rem]', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={'10rem'} value={'LA26020945959594'} readOnly />
                  <Input aria-label="" width={'10rem'} value={'한화 시그니처 여성 건강보험4.0'} readOnly />
                </FormCell>
                <FormCell title={'피보험자'}>
                  <Input aria-label="" width={'5rem'} value={'홍길순'} readOnly />
                  <Input aria-label="" width={'5rem'} value={'940101-2******'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <TableFold variant={'default'}>
            <TableFoldHead title="">
              <Grow>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  청약가점담보목록
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[18.4rem]">
                <AgGridReact<DummyDataType2>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  // pinnedBottomRowData={sumRow2}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  singleClickEdit={true}
                  rowClassRules={{}}
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
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
