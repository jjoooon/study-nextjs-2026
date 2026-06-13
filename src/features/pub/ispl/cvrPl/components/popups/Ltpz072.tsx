/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { Grow, Typo } from '@atoms';
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
import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import {
  AgGridEmptyComponent,
  createFieldRenderer,
  createTooltipValueGetter,
  useDynamicColumnWidths,
} from '@/shared/components/agGridUtils';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '특정부위',
    field02: '040',
    field03: '위, 십이지장,위, 십이지장,위, 십이지장위, 십이지장위, 십이지장위, 십이지장위, 십이지장',
    field04: '0년',
    field05: '1개월',
    field06: '',
    field07: '',
  },
  {
    id: 2,
    field01: '특정부위',
    field02: '040',
    field03: '위, 십이지장',
    field04: '0년',
    field05: '1개월',
    field06: '',
    field07: '',
  },
  {
    id: 3,
    field01: '특정부위',
    field02: '040',
    field03: '위, 십이지장',
    field04: '0년',
    field05: '1개월',
    field06: '',
    field07: '',
  },
  {
    id: 4,
    field01: '특정부위',
    field02: '040',
    field03: '위, 십이지장',
    field04: '0년',
    field05: '1개월',
    field06: '',
    field07: '',
  },
  {
    id: 5,
    field01: '특정부위',
    field02: '040',
    field03: '위, 십이지장',
    field04: '0년',
    field05: '12개월',
    field06: '',
    field07: '',
  },
];

const Ltpz072 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '분류',
        flex: 1,
        width: attributeColumnWidth(120),
        cellClass: 'text-center px-0!',
        cellRenderer: createFieldRenderer<DummyDataType>('field01', '[field02,40]', 'row'),
      },
      {
        headerName: '대상이 되는 부위 또는 질병',
        flex: 3,
        field: 'field03',
        cellClass: 'text-left',
        minWidth: 150,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
      },
      {
        headerName: '부담보기간',
        width: attributeColumnWidth(100),
        cellClass: 'text-center px-0!',
        cellRenderer: createFieldRenderer<DummyDataType>('[field04,50]', '[field05,50]', 'row'),
      },
      {
        headerName: '사유내용',
        flex: 1,
        width: attributeColumnWidth(120),
        field: 'field06',
        cellClass: 'text-center',
      },
      {
        headerName: '사유코드',
        flex: 1,
        field: 'field07',
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              특정부위/질병부담보
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <div className="ag-theme-alpine inner-scroll" data-row={DummyData.length}>
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={DummyData}
              columnDefs={columnDefs}
              noRowsOverlayComponent={AgGridEmptyComponent}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                부담보선택
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz072;
