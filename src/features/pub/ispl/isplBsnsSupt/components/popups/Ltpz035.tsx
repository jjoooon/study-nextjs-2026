/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string;
  field03: string | number;
  field04: string;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'LA2414313',
    field02: '나눔의행복(상해사망) 나눔의행복(상해사망)',
    field03: 'CLA23114',
    field04: '나눔의행복(상해사망) 나눔의행복(상해사망)',
  },
  {
    id: 2,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
  },
  {
    id: 3,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
  },
  {
    id: 4,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
  },
  {
    id: 5,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
  },
  {
    id: 6,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
  },
];

const Ltpz035 = () => {
  // 2026-06-02 flex, minWidth 수정
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '상품 코드',
      field: 'field01',
      width: attributeColumnWidth(70),
      cellClass: 'text-center',
    },
    {
      headerName: '상품명',
      field: 'field02',
      flex: 10,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '동시가입 담보코드',
      field: 'field03',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center',
    },
    {
      headerName: '동시가입 담보명',
      field: 'field04',
      flex: 10,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보별 취급상품 조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ035)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <div className="ag-theme-alpine inner-scroll" data-row={DummyData.length}>
            <AgGridReact<DummyDataType>
              // getRowId 적용: id 필드를 고유 식별자로 사용
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
              selectionColumnDef={{
                cellClass: 'text-center',
              }}
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

export default Ltpz035;
