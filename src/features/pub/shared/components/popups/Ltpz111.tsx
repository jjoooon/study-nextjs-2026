/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';

import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { DialogBottomInfo } from '@/shared/components/common/DialogBottomInfo';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';

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

type DummyDataType = {
  id: number;
  field01: string;
  field02: string;
  field03: string;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '10년이내',
    field02: 'Y',
    field03: 'Y/N',
  },
  {
    id: 2,
    field01: '9년이내',
    field02: 'Y',
    field03: 'Y/N',
  },
  {
    id: 3,
    field01: '8년이내',
    field02: 'Y',
    field03: 'Y/N',
  },
  {
    id: 4,
    field01: '7년이내',
    field02: 'Y',
    field03: 'Y/N',
  },
  {
    id: 5,
    field01: '6년이내',
    field02: 'Y',
    field03: 'Y/N',
  },
  {
    id: 6,
    field01: '5년이내',
    field02: 'Y',
    field03: 'Y/N',
  },
  {
    id: 7,
    field01: '4년이내',
    field02: 'Y',
    field03: 'Y/N',
  },
  {
    id: 8,
    field01: '3년이내',
    field02: 'Y',
    field03: 'Y/N',
  },
  {
    id: 9,
    field01: '2년이내',
    field02: '',
    field03: 'Y/N',
  },
  {
    id: 10,
    field01: '1년이내',
    field02: '',
    field03: 'Y/N',
  },
  {
    id: 11,
    field01: '3개월이내',
    field02: '',
    field03: 'Y/N',
  },
];
const Ltpz111 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(
    () => [
      {
        headerName: '대상기간',
        field: 'field01',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClass: 'text-center',
      },
      {
        headerName: '경증외 입원수술',
        children: [
          {
            headerName: '건강/일반',
            field: 'field02',
            flex: 1,
            minWidth: attributeColumnWidth(170),
            cellClass: 'text-center',
          },
          {
            headerName: '간편(전체/2일)',
            field: 'field03',
            flex: 1,
            minWidth: attributeColumnWidth(170),
            cellClass: 'text-center',
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );

  const [rowData] = useState<DummyDataType[]>(DummyData);
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              N년이내 입원수술
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz111)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol placement="ss">
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
                domLayout="autoHeight"
              />
            </div>
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

export default Ltpz111;
