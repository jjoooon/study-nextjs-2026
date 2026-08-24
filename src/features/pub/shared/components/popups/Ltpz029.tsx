/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { CellEditingStartedEvent, ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { createExpiryCellRenderer } from '@/shared/components/grid/CellRenderers';
import {
  AgGridEmptyComponent,
  createDeleteSelectedRowsHandler,
  createSequentialRowReorderHandler,
  getNextNumericRowId,
  useDynamicColumnWidths,
} from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { ZoomInIcon, ZoomOutIcon } from '@icons';
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
  isChecked?: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: number | undefined;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field1: '공통(기본)1',
    field2: 'LTPZ001',
    field3: '설계매뉴얼',
    field4: '정상',
    field5: 'Y',
    field6: 'N',
    field7: 1,
  },
  {
    id: 2,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 2,
  },
  {
    id: 3,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 3,
  },
  {
    id: 4,
    isChecked: false,
    field1: '공통(기본)1',
    field2: 'LTPZ003',
    field3: '가입설계조회',
    field4: '정상',
    field5: 'Y',
    field6: 'N',
    field7: 4,
  },
  {
    id: 5,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ004',
    field3: '계약변경',
    field4: '정상',
    field5: 'N',
    field6: 'Y',
    field7: 5,
  },
  {
    id: 6,
    isChecked: false,
    field1: '공통(기본)1',
    field2: 'LTPZ005',
    field3: '보험료계산',
    field4: '해지',
    field5: 'Y',
    field6: 'N',
    field7: 6,
  },
  {
    id: 7,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ006',
    field3: '청약서발행',
    field4: '정상',
    field5: 'N',
    field6: 'Y',
    field7: 7,
  },
  {
    id: 8,
    isChecked: false,
    field1: '공통(기본)1',
    field2: 'LTPZ007',
    field3: '계약조회',
    field4: '정상',
    field5: 'Y',
    field6: 'N',
    field7: 8,
  },
  {
    id: 9,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ008',
    field3: '약관조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 9,
  },
  {
    id: 10,
    isChecked: false,
    field1: '공통(기본)1',
    field2: 'LTPZ009',
    field3: '보험금청구',
    field4: '정상',
    field5: 'Y',
    field6: 'N',
    field7: 10,
  },
  {
    id: 11,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ010',
    field3: '배서처리',
    field4: '정상',
    field5: 'N',
    field6: 'Y',
    field7: 11,
  },
  {
    id: 12,
    isChecked: false,
    field1: '공통(기본)1',
    field2: 'LTPZ011',
    field3: '해약청구',
    field4: '해지',
    field5: 'Y',
    field6: 'N',
    field7: 12,
  },
  {
    id: 13,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ012',
    field3: '환급금조회',
    field4: '정상',
    field5: 'N',
    field6: 'Y',
    field7: 13,
  },
  {
    id: 14,
    isChecked: false,
    field1: '공통(기본)1',
    field2: 'LTPZ013',
    field3: '설계변경',
    field4: '정상',
    field5: 'Y',
    field6: 'N',
    field7: 14,
  },
  {
    id: 15,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ014',
    field3: '특약조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 15,
  },
  {
    id: 16,
    isChecked: false,
    field1: '공통(기본)1',
    field2: 'LTPZ015',
    field3: '증권발급',
    field4: '정상',
    field5: 'Y',
    field6: 'N',
    field7: 16,
  },
  {
    id: 17,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ016',
    field3: '고객정보변경',
    field4: '정상',
    field5: 'N',
    field6: 'Y',
    field7: 17,
  },
  {
    id: 18,
    isChecked: false,
    field1: '공통(기본)1',
    field2: 'LTPZ017',
    field3: '보장분석',
    field4: '해지',
    field5: 'Y',
    field6: 'N',
    field7: 18,
  },
  {
    id: 19,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ018',
    field3: '제증명발급',
    field4: '정상',
    field5: 'N',
    field6: 'Y',
    field7: 19,
  },
  {
    id: 20,
    isChecked: false,
    field1: '공통(기본)1',
    field2: 'LTPZ019',
    field3: '대출신청',
    field4: '정상',
    field5: 'Y',
    field6: 'N',
    field7: 20,
  },
];

const Ltpz029 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const getExpiryRenderer = createExpiryCellRenderer<DummyDataType>;

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const gridContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  const handleAddRow = React.useCallback(() => {
    setRowData((prev) => {
      const nextId = getNextNumericRowId(prev);
      const newRow: DummyDataType = {
        isChecked: false,
        id: nextId,
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
        field7: undefined,
      };

      const nextRows = [...prev, newRow];

      // 최하단 스크롤
      setTimeout(() => {
        if (gridContainerRef.current) {
          const viewport = gridContainerRef.current.querySelector('.ag-body-viewport');
          if (viewport instanceof HTMLDivElement) {
            viewport.scrollTop = viewport.scrollHeight;
          }
        }
      }, 0);

      return nextRows;
    });
  }, []);

  const handleDeleteRow = createDeleteSelectedRowsHandler<DummyDataType>(setRowData, gridApiRef, {
    idKey: 'id',
  });

  const handleOrderChanged = createSequentialRowReorderHandler<DummyDataType, number>(setRowData, {
    idKey: 'id',
    orderKey: 'id',
    gridApiRef,
  });

  const handleCellEditingStarted = React.useCallback((event: CellEditingStartedEvent<DummyDataType>) => {
    if (event.colDef.field === 'field3') {
      return;
    }

    window.requestAnimationFrame(() => {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLInputElement) {
        activeElement.style.textAlign = 'center';
      }
    });
  }, []);

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '번호',
      field: 'id',
      width: attributeColumnWidth(40),
      cellClass: 'editable-center-input text-center',
      editable: true,
    },
    {
      headerName: '그룹',
      field: 'field1',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'editable-cell text-center ag-row-selected',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['공통(기본)1', '공통(기본)2'] },
      cellRenderer: getExpiryRenderer('center'),
    },
    {
      headerName: '화면코드',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'editable-cell editable-center-input text-center',
      editable: true,
    },
    {
      headerName: '바로가기명',
      field: 'field3',
      flex: 10,
      cellClass: 'editable-cell text-left',
      editable: true,
    },
    {
      headerName: '상태',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(50),
      editable: true,
      cellClass: 'editable-cell text-center ag-row-selected',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['정상', '해지'] },
      cellRenderer: getExpiryRenderer('center'),
    },
    {
      headerName: '기본값',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(50),
      editable: true,
      cellClass: (params) => {
        const baseClass = 'editable-cell text-center ag-row-selected';
        return params.value === 'Y' ? `${baseClass} text-[var(--color-primary-50)]` : baseClass;
      },
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Y', 'N'] },
      cellRenderer: getExpiryRenderer('center'),
    },
    {
      headerName: '필수값',
      field: 'field6',
      flex: 1,
      minWidth: attributeColumnWidth(50),
      editable: true,
      cellClass: (params) => {
        const baseClass = 'editable-cell text-center ag-row-selected';
        return params.value === 'Y' ? `${baseClass} text-[var(--color-primary-50)]` : baseClass;
      },
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Y', 'N'] },
      cellRenderer: getExpiryRenderer('center'),
    },
    {
      headerName: '화면표시순서',
      field: 'field7',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'editable-cell text-center ag-row-selected',
      editable: true,
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg" className="ltpz029-popup">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              바로가기 설정관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ029)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr] gap-1 h-full min-h-0 overflow-hidden">
          <Grow placement="ec" className="w-full">
            <Button variant={'outlined'} color={'gray'} onClick={handleAddRow}>
              행추가
              <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
            </Button>
            <Button variant={'outlined'} color={'gray'} onClick={handleDeleteRow}>
              행삭제
              <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
            </Button>
          </Grow>
          <div className="ag-theme-alpine w-full h-full min-h-0 inner-scroll" ref={gridContainerRef}>
            <AgGridReact<DummyDataType>
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              onGridReady={(event) => {
                gridApiRef.current = event.api;
              }}
              onCellValueChanged={handleOrderChanged}
              onCellEditingStarted={handleCellEditingStarted}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              singleClickEdit={true}
              rowSelection={{
                mode: 'singleRow',
                checkboxes: true,
                enableClickSelection: false,
              }}
              selectionColumnDef={{
                headerName: '선택',
                width: 30,
                cellClass: 'editable-cell text-center',
              }}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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

export default Ltpz029;
