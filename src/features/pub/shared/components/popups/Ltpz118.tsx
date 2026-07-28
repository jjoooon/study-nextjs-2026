/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
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

const Ltpz118 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  type DummyDataType = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
  };

  const DummyData: DummyDataType[] = [
    { id: 1, field1: '모집자전자서명', field2: '알림톡', field3: '2026-03-24 11:19:15' },
    { id: 2, field1: '모집자전자서명', field2: '알림톡', field3: '2026-03-24 11:19:15' },
    { id: 3, field1: '모집자전자서명', field2: '알림톡', field3: '2026-03-24 11:19:15' },
  ];
  // 2026-05-22 cellClass 수정
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '전자서명유형',
      field: 'field1',
      flex: 1,
      minWidth: attributeColumnWidth(120),
      cellClass: 'text-center',
    },
    {
      headerName: '발송채널',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center',
    },
    {
      headerName: '요청일시',
      field: 'field3',
      flex: 10,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field3' }),
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  // M2. 신규 페이지
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              휴대폰 전자서명 발송이력조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ118)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="설계번호" variant="none" cols={['w-[1rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input value={'LA123123123123-1'} variant="info" readOnly />
                  <Input value={'김한화'} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <div className="ag-theme-alpine">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              singleClickEdit={true}
              rowClassRules={{}}
              domLayout="autoHeight"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm">
              <b>위 전자서명 이력은 발송요청이력이며, 실제 발송결과는 UMS 결과조회에서 확인바랍니다.</b>
            </Typo>
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
export default Ltpz118;
