/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { DialogBottomInfo } from '@/shared/components/common/DialogBottomInfo';
import { Grow, Typo, Gcol } from '@atoms';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
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
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

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
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const selectedHeaderField = React.useMemo<'field02' | 'field03' | null>(() => {
    if (rowData.length === 0) {
      return null;
    }

    if (rowData.every((row) => row.field02)) {
      return 'field02';
    }

    if (rowData.every((row) => row.field03)) {
      return 'field03';
    }

    return null;
  }, [rowData]);

  const handleHeaderRadioChange = React.useCallback((field: 'field02' | 'field03') => {
    setRowData((currentRowData) =>
      currentRowData.map((row) => ({
        ...row,
        field02: field === 'field02',
        field03: field === 'field03',
      }))
    );
  }, []);

  const renderRadioHeader = React.useCallback(
    (label: string, field: 'field02' | 'field03') => {
      return (
        <div className="flex h-full w-full items-center justify-center gap-2">
          <RadioGroup
            value={selectedHeaderField ?? ''}
            onValueChange={() => handleHeaderRadioChange(field)}
            width="auto"
            className="justify-center gap-0"
          >
            <RadioGroupItem value={field} id={`header-${field}`} variant="default" size="lg">
              <span>{label}</span>
            </RadioGroupItem>
          </RadioGroup>
        </div>
      );
    },
    [handleHeaderRadioChange, selectedHeaderField]
  );

  const handleRadioChange = React.useCallback((rowId: number, field: 'field02' | 'field03') => {
    setRowData((currentRowData) =>
      currentRowData.map((row) => {
        if (row.id !== rowId) {
          return row;
        }

        return {
          ...row,
          field02: field === 'field02',
          field03: field === 'field03',
        };
      })
    );
  }, []);

  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerComponent: () => renderRadioHeader('세만기형', 'field02'),
        width: attributeColumnWidth(100),
        field: 'field02',
        headerClass: '!justify-center',
        cellClass: 'text-center justify-center',
        cellClassRules: {
          'bg-[var(--color-primary-5)]': (params) => Boolean(params.data?.field02),
        },
        autoHeight: false,
        cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
          const row = params.data;

          if (!row) {
            return null;
          }

          return (
            <div
              className="flex h-full w-full cursor-pointer items-center justify-center"
              onClick={(event) => {
                event.stopPropagation();
                handleRadioChange(row.id, 'field02');
              }}
            >
              <RadioGroup
                value={row.field02 ? 'field02' : row.field03 ? 'field03' : ''}
                onValueChange={() => handleRadioChange(row.id, 'field02')}
                width="auto"
                className="justify-center gap-0"
              >
                <RadioGroupItem value="field02" id={`field02-${row.id}`} variant="default" size="lg" />
              </RadioGroup>
            </div>
          );
        },
      },
      {
        headerComponent: () => renderRadioHeader('갱신형', 'field03'),
        width: attributeColumnWidth(100),
        field: 'field03',
        headerClass: '!justify-center',
        cellClass: 'text-center',
        cellClassRules: {
          'bg-[var(--color-primary-5)]': (params) => Boolean(params.data?.field03),
        },
        autoHeight: false,
        cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
          const row = params.data;

          if (!row) {
            return null;
          }

          return (
            <div
              className="flex h-full w-full cursor-pointer items-center justify-center"
              onClick={(event) => {
                event.stopPropagation();
                handleRadioChange(row.id, 'field03');
              }}
            >
              <RadioGroup
                value={row.field02 ? 'field02' : row.field03 ? 'field03' : ''}
                onValueChange={() => handleRadioChange(row.id, 'field03')}
                width="auto"
                className="justify-center gap-0"
              >
                <RadioGroupItem value="field03" id={`field03-${row.id}`} variant="default" size="lg" />
              </RadioGroup>
            </div>
          );
        },
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
              담보전환
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ007)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr_auto] gap-2">
          <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                suppressMovable: true,
                // headerClass: '!justify-center',
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
                flex: 6,
                tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
              }}
            />
          </div>
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm">
              선택한 담보 중 해당 설계 내 전환이 가능한 담보만 표시됩니다.
            </Typo>
          </Gcol>
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
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz007;
