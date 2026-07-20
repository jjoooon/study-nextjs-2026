/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths, numberValueFormatter } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
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

const Ltpz117 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  type DummyDataType = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
    field4: number;
  };

  const DummyData: DummyDataType[] = [
    {
      id: 1,
      field1: '김한화',
      field2: '진단/수술',
      field3: '통풍진단비통풍진단비통풍진단비통풍진단비통풍진단비통풍진단비통풍진단비',
      field4: 100600000,
    },
    {
      id: 2,
      field1: '김한화',
      field2: '진단/수술',
      field3: '통풍진단비',
      field4: 600000,
    },
  ];
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '피보험자명/목적물주소',
      field: 'field1',
      flex: 10,
      cellClass: 'text-center',
    },
    {
      headerName: '담보분류',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center',
    },
    {
      headerName: '담보명',
      field: 'field3',
      flex: 20,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field3' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(85),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계누적상세조건
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ117)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="동시가입누적체크" variant="none" cols={['w-[1rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'동시가입누적체크'}>
                  <Input value={'LA202218975220000'} width={140} readOnly />
                  <Input value={'무배당LIFEPLUS한아름종합보험2206'} width={280} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <TableFold variant={'accordion'}>
            <TableFoldHead title="설계누적 조건 담보" />
            <TableFoldBody>
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
            </TableFoldBody>
          </TableFold>
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

export default Ltpz117;
