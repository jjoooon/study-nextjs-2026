/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import '@/shared/lib/agGridPub';
import {
  AgGridEmptyComponent,
  GridHeaderCheckbox,
  createHeaderCheckboxParams,
  createHeaderCheckboxOnCellValueChanged,
  createTooltipValueGetter,
} from '@aggrid';
import { Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogClose,
  DialogFooterArea,
} from '@uiux/Dialog';
import type { ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: boolean;
  field03: boolean;
  filePath?: string[];
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '암(4대유사암제외)진단후특정치료비(진단후10년,연간1회한)(간편)',
    field02: true,
    field03: false,
    filePath: ['folderC'],
  },
  {
    id: 2,
    field01: '특정유사암진단후특정치료비(진단후10년,연간1회한)(간편)',
    field02: true,
    field03: false,
    filePath: ['folderD'],
  },
  {
    id: 3,
    field01: '4대유사암진단비',
    field02: false,
    field03: true,
    filePath: ['folderE'],
  },
  {
    id: 4,
    field01: '통합안진단비',
    field02: true,
    field03: false,
    filePath: ['folderA'],
  },
  {
    id: 5,
    field01: '- 통합암진단비(간암)',
    field02: true,
    field03: false,
    filePath: ['folderA', 'folderA-1'],
  },
  {
    id: 6,
    field01: '- 통합암진단비(폐암)',
    field02: true,
    field03: false,
    filePath: ['folderA', 'folderA-2'],
  },
  {
    id: 7,
    field01: '- 통합암진단비(기관지염)',
    field02: true,
    field03: false,
    filePath: ['folderA', 'folderA-3'],
  },
  {
    id: 8,
    field01: '- 통합암진단비(폐암)',
    field02: true,
    field03: false,
    filePath: ['folderA', 'folderA-4'],
  },
  {
    id: 9,
    field01: '- 통합암진단비(간암)',
    field02: true,
    field03: false,
    filePath: ['folderA', 'folderA-5'],
  },
  {
    id: 10,
    field01: '- 통합암진단비(폐암)',
    field02: true,
    field03: false,
    filePath: ['folderA', 'folderA-6'],
  },
  {
    id: 11,
    field01: '특정유사암진단후특정치료비(진단후10년,연간1회한)(간편)',
    field02: true,
    field03: false,
    filePath: ['folderF'],
  },
];

const Ltpz007 = () => {
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const onCellValueChanged = React.useMemo(
    () => createHeaderCheckboxOnCellValueChanged<DummyDataType>(['field02', 'field03']),
    []
  );

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '세만기형',
      width: 100,
      field: 'field02',
      editable: true,
      cellClass: 'text-center editable-cell',
      autoHeight: false,
      cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
      cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
      headerComponent: GridHeaderCheckbox,
      headerComponentParams: createHeaderCheckboxParams(gridApiRef, 'field02'),
    },
    {
      headerName: '갱신형',
      width: 100,
      field: 'field03',
      editable: true,
      cellClass: 'text-center editable-cell',
      autoHeight: false,
      cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
      cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
      headerComponent: GridHeaderCheckbox,
      headerComponentParams: createHeaderCheckboxParams(gridApiRef, 'field03'),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보전환
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ007)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <div className="ag-theme-alpine min-h-[33.4rem]">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              singleClickEdit={true}
              onCellValueChanged={onCellValueChanged}
              onGridReady={(params) => {
                gridApiRef.current = params.api;
              }}
              defaultColDef={{
                suppressMovable: true,
              }}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
              // tree data 설정
              treeData={true}
              getDataPath={(row) => row.filePath?.map(String) ?? []}
              groupDefaultExpanded={-1}
              autoGroupColumnDef={{
                headerName: '담보명',
                field: 'field01',
                flex: 1,
                tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
              }}
            />
          </div>
          <BulletList position="col">
            <BulletListItem className="whitespace-nowrap" type="dot">
              선택한 담보 중 해당 설계 내 전환이 가능한 담보만 표시됩니다.
            </BulletListItem>
          </BulletList>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                초기화
              </Button>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz007;
