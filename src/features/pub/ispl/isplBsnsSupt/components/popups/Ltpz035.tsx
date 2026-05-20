/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter } from '@/shared/components/agGridUtils/AgGridUtils';
import { Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-enterprise';
import * as React from 'react';

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

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
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
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '상품 코드',
      field: 'field01',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '상품명',
      field: 'field02',
      flex: 1,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '동시가입 담보코드',
      field: 'field03',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '동시가입 담보명',
      field: 'field04',
      flex: 1,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보 속성별 상품관리
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <div className="ag-theme-alpine min-h-[18.4rem]">
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
