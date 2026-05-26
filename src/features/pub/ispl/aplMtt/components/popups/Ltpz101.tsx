/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

// 2026-05-26 LTPA390 -> LTPZ101로 변경, 청약불가 사전안내 팝업(기존 LTPZ101은 삭제됨)
'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { FileExportIcon } from '@icons'; // 2026-05-26 추가
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
import { Input } from '@uiux/Input';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
};

const DummyData: DummyDataType[] = [
  { id: 1, field1: '', field2: '', field3: '' },
  { id: 2, field1: '', field2: '', field3: '' },
  { id: 3, field1: '', field2: '', field3: '' },
  { id: 4, field1: '', field2: '', field3: '' },
  { id: 5, field1: '', field2: '', field3: '' },
  { id: 6, field1: '', field2: '', field3: '' },
];

const Ltpz101 = () => {
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

  {
    /* 2026-05-26 전체 수정 */
  }
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              청약불가 사전안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ101)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr_auto]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable variant={'head'} lineTop={false} caption="설계번호">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input readOnly value={'LA2608902384509'} />
                  -
                  <Input aria-label="" width={30} value={'1'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grid className="grid-rows-[auto_1fr] gap-2">
            <Grow variant={'box-warning'} placement={'ss'} className="w-full">
              <Typo variant={'body-sm'} icon={'warning'}>
                아래 내용은 청약완료까지 해소되지 않을경우 수납이 불가능합니다.(청약완료 불가)
              </Typo>
            </Grow>
            <Gcol>
              <Grow className="w-full" placement="ec">
                <Button color="success" variant="outlined">
                  엑셀내보내기
                  <FileExportIcon />
                </Button>
              </Grow>
              <div className="ag-theme-alpine min-h-[18.3rem]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  domLayout="normal"
                />
              </div>
            </Gcol>
          </Grid>
          <TableFold variant="default">
            <TableFoldHead title="모집자 확인사항" />
            <TableFoldBody>
              <Gcol className="w-full" placement="ss" variant="box-warning">
                <Typo variant="body-sm">
                  <Checkbox>모집자 김한화는 상기 내용에 대해 정확히 확인 하였습니다.</Checkbox>
                </Typo>
              </Gcol>
            </TableFoldBody>
          </TableFold>
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

export default Ltpz101;
