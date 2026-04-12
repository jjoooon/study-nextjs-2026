'use client';
// 허승하
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
};

const DummyData: DummyDataType[] = [
  { id: 1, field1: '', field2: '', field3: '' },
  { id: 2, field1: '', field2: '', field3: '' },
];

export const Ltpa390 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: 'No',
      field: 'id',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '피보험자',
      field: 'field2',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '위배내용',
      field: 'field3',
      flex: 2,
      cellClass: 'text-center',
    },
  ];

  const rowData = DummyData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              청약불가 사전안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA390)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable variant={'head'} lineTop={false} caption="설계번호">
              <FormRow>
                <FormCell title={'설계번호'}>LA2608902384509</FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Grid placement="ss" className="grid-rows-[auto_1fr_auto] gap-4">
            <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
              <Typo variant={'body-sm'} icon={'warning'}>
                <b>안내사항 노출 영역</b>
              </Typo>
            </Gcol>
            <Gcol placement="ss" className="w-full" gap={5}>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  domLayout="autoHeight"
                />
              </div>
            </Gcol>
            <Gcol>
              <TableFold variant="default">
                <TableFoldHead title="모집자 확인사항"></TableFoldHead>
                <TableFoldBody>
                  <Gcol className="w-full" placement="ss" variant="box-warning">
                    <Typo variant="body-sm">
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        모집자 김한화는 상기 내용에 대해 정확히 확인 하였습니다.
                      </Checkbox>
                    </Typo>
                  </Gcol>
                </TableFoldBody>
              </TableFold>
            </Gcol>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                엑셀내보내기
              </Button>
            </Grow>
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
