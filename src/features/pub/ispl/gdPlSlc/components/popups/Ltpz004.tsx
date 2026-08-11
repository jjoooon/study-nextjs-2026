/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1:
      '보통약관(상해80%이상후유장해)(간편보통약관(상해80%이상후유장해)(간편보통약관(상해80%이상후유장해)(간편보통약관(상해80%이상후유장해)(간편보통약관(상해80%이상후유장해)(간편보통약관(상해80%이상후유장해)(간편)',
    field2: '15~80세',
    field3: 100867,
  },
  {
    id: 2,
    field1: '보통약관(상해80%이상후유장해)(간편)',
    field2: '15~80세',
    field3: 10000,
  },
  {
    id: 3,
    field1: '보통약관(상해80%이상후유장해)(간편)',
    field2: '15~80세',
    field3: 10000,
  },
  {
    id: 4,
    field1: '보통약관(상해80%이상후유장해)(간편)',
    field2: '15~80세',
    field3: 10000,
  },
  {
    id: 5,
    field1: '보통약관(상해80%이상후유장해)(간편)',
    field2: '15~80세',
    field3: 10000,
  },
  {
    id: 6,
    field1: '보통약관(상해80%이상후유장해)(간편)',
    field2: '15~80세',
    field3: 10000,
  },
  {
    id: 7,
    field1: '보통약관(상해80%이상후유장해)(간편)',
    field2: '15~80세',
    field3: 10000,
  },
];

const Ltpz004 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 10,

      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field1' }),
    },
    {
      headerName: '가입연령',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '가입금액(만원)',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-right ',
      valueFormatter: numberValueFormatter,
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보보기
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ004)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol variant="box-info-line" placement="ss">
            <Typo tag={'strong'} variant={'body-lg'} weight={'bold'}>
              한화 3N5 더간편건강보험(세만기형) 2601 상품의 담보코드와 메시지입니다.
            </Typo>
            <Typo tag={'p'} variant={'body-sm'} color={'gray'}>
              1종(납입후50%해약환급금지급형, 납입면제운영형, 3N5간편고지형Ⅲ)
            </Typo>
          </Gcol>
          <TableFold>
            <TableFoldHead title="1형(355간편고지형)(프리미엄올인원플랜)(1.7.8.9형)(15~80세)"></TableFoldHead>
            <TableFoldBody className="gap-2">
              <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  domLayout="normal"
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
              <Gcol className="w-full" placement="ss" variant="box-info">
                <Typo icon="info" variant="body-sm">
                  담보별 실제 가입금액은 설계 화면에서 확인하실 수 있습니다.
                </Typo>
              </Gcol>
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

export default Ltpz004;
