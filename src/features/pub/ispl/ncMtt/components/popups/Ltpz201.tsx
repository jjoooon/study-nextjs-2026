/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, IHeaderGroupParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { AgGridEmptyComponent, useDynamicColumnWidths, createHeaderWithSort } from '@aggrid';
import { Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { createExpiryCellRenderer } from '@grid/CellRenderers';
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

type DummyDataType = {
  id: number;
  field01?: string;
  field02?: string;
  field03?: string;
  field04?: string;
  field05?: string;
  field06?: string;
  field07?: string;
  field08?: string;
  field09?: string;
  field10?: string;
  field11?: string;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '전립선 제자리암 진단후 현재까지의 기간은 얼마나 됩니까? (진단 일자: 년/월)',
    field02: '1년 이상',
    field03: '1년 이상',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 2,
    field01: '전립선 제자리암 진단 후 정기검진 시 PSA(전립선항원) 수치가 안정적입니까?',
    field02: '1년 이상',
    field03: '1년 이상',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 3,
    field01: '전립선 제자리암 진단 후 정기검진 시 PSA(전립선항원) 수치가 안정적입니까?',
    field02: '1년 이상',
    field03: '1년 이상',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 4,
    field01: '전립선 제자리암 진단 후 정기검진 시 PSA(전립선항원) 수치가 안정적입니까?',
    field02: '1년 이상',
    field03: '1년 이상',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 5,
    field01: '전립선 제자리암 진단 후 정기검진 시 PSA(전립선항원) 수치가 안정적입니까?',
    field02: '1년 이상',
    field03: '1년 이상',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 6,
    field01: '전립선 제자리암 진단 후 정기검진 시 PSA(전립선항원) 수치가 안정적입니까?',
    field02: '1년 이상',
    field03: '1년 이상',
    field04: '',
    field05: '',
    field06: '',
  },
];
type DummyDataType2 = DummyDataType;

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '발생원인을 선택하여 주십시오.',
    field02: '상해',
    field03: '1년 이상',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 2,
    field01: '발생부위를 모두 선택하여 주십시오.',
    field02: '목(경추)',
    field03: '모름',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 3,
    field01: '발생부위를 모두 선택하여 주십시오.',
    field02: '목(경추)',
    field03: '모름',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 4,
    field01: '발생부위를 모두 선택하여 주십시오.',
    field02: '목(경추)',
    field03: '모름',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 5,
    field01: '발생부위를 모두 선택하여 주십시오.',
    field02: '목(경추)',
    field03: '모름',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 6,
    field01: '발생부위를 모두 선택하여 주십시오.',
    field02: '목(경추)',
    field03: '모름',
    field04: '',
    field05: '',
    field06: '',
  },
];
// 그룹 헤더 클릭 시 하위 자식 컬럼의 내림차순/오름차순 정렬을 실행하고 화살표(↑/↓) 아이콘을 표시하는 커스텀 그룹 헤더
const GroupHeaderWithSort = (props: IHeaderGroupParams) => {
  const [sortState, setSortState] = useState<'asc' | 'desc' | null>(null);

  const handleClick = () => {
    const leafCols = props.columnGroup.getLeafColumns();
    if (!leafCols || leafCols.length === 0) return;

    const nextSort = sortState === 'desc' ? 'asc' : 'desc';
    setSortState(nextSort);

    props.api.applyColumnState({
      state: leafCols.map((col) => ({
        colId: col.getColId(),
        sort: nextSort,
      })),
      defaultState: { sort: null },
    });
  };

  return (
    <Grow onClick={handleClick} placement="cc" className="w-full cursor-pointer select-none gap-1">
      <span className="font-bold text-[1.3rem]!">{props.displayName}</span>
      {sortState === 'asc' && <span className="ag-icon ag-icon-asc" role="presentation" />}
      {sortState === 'desc' && <span className="ag-icon ag-icon-desc" role="presentation" />}
    </Grow>
  );
};

const Ltpz201 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const getExpiryRendererB = createExpiryCellRenderer<DummyDataType>;
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(
    () => [
      {
        headerName: '추가질문/답변',
        field: 'field01',
        flex: 3,
        width: attributeColumnWidth(280),
        autoHeight: true,
        wrapText: true,
        cellClass: 'text-left leading-[1.4]! py-1!',
      },
      {
        headerName: '고지 1순번 답변',
        headerGroupComponent: GroupHeaderWithSort,
        children: [
          {
            headerName: '',
            headerComponent: createHeaderWithSort('2026-03-01~2026-03-16, 입원(2일)'),
            field: 'field02',
            editable: true,
            flex: 2,
            cellClass: 'editable-cell text-center',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['1년 이상', '2년 이상'] },
            cellRenderer: getExpiryRendererB('center'),
          },
        ],
      },
      {
        headerName: '고지 2순번 답변',
        headerGroupComponent: GroupHeaderWithSort,
        children: [
          {
            headerName: '',
            headerComponent: createHeaderWithSort('2026-03-01~2026-03-16, 입원(2일)'),
            field: 'field03',
            editable: true,
            flex: 2,
            cellClass: 'editable-cell text-center',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['1년 이상', '2년 이상'] },
            cellRenderer: getExpiryRendererB('center'),
          },
        ],
      },
      {
        headerName: '고지 3순번 답변',
        headerGroupComponent: GroupHeaderWithSort,
        children: [
          {
            headerName: '',
            headerComponent: createHeaderWithSort('2026-03-01~2026-03-16, 입원(2일)'),
            field: 'field04',
            editable: true,
            flex: 2,
            cellClass: 'editable-cell text-center',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['1년 이상', '2년 이상'] },
            cellRenderer: getExpiryRendererB('center'),
          },
        ],
      },
      {
        headerName: '고지 4순번 답변',
        headerGroupComponent: GroupHeaderWithSort,
        children: [
          {
            headerName: '',
            headerComponent: createHeaderWithSort('2026-03-01~2026-03-16, 입원(2일)'),
            field: 'field05',
            editable: true,
            flex: 2,
            cellClass: 'editable-cell text-center',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['1년 이상', '2년 이상'] },
            cellRenderer: getExpiryRendererB('center'),
          },
        ],
      },
      {
        headerName: '고지 5순번 답변',
        headerGroupComponent: GroupHeaderWithSort,
        children: [
          {
            headerName: '',
            headerComponent: createHeaderWithSort('2026-03-01~2026-03-16, 입원(2일)'),
            field: 'field06',
            editable: true,
            flex: 2,
            cellClass: 'editable-cell text-center',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['1년 이상', '2년 이상'] },
            cellRenderer: getExpiryRendererB('center'),
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              추가 질문답변 확인
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ201)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="gap-3">
          <Grid placement="ss" className="w-full grid-rows-[auto_auto_1fr]" gap={3}>
            <Typo tag={'p'} variant={'body-md'}>
              고지하신 질병 중 <b className="font-bold">추가질문에 대한 답변을 확인</b>하신 후 고객님의{' '}
              <b className="font-bold">치료내용에 맞는 답변항목을 선택</b>해주시기 바랍니다.
            </Typo>
            <TableFold variant="default" className="grid-rows-[auto_1fr]">
              <TableFoldHead
                title={
                  (
                    <>
                      <span className="font-normal">질병명:</span> 전립선암
                    </>
                  ) as any
                }
              />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={2}>
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                      singleClickEdit: true,
                      cellClass: 'text-center',
                      cellClassRules: {
                        'bg-[#fff0f0]!': (params) => !params.value || String(params.value).trim() === '',
                      },
                    }}
                    singleClickEdit={true}
                    domLayout="autoHeight"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold variant="default" className="grid-rows-[auto_1fr]">
              <TableFoldHead
                title={
                  (
                    <>
                      <span className="font-normal">질병명:</span> 기타 추간판장애
                    </>
                  ) as any
                }
              />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={2}>
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData2}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                      singleClickEdit: true,
                      cellClass: 'text-center',
                      cellClassRules: {
                        'bg-[#fff0f0]!': (params) => !params.value || String(params.value).trim() === '',
                      },
                    }}
                    singleClickEdit={true}
                    domLayout="autoHeight"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Grid>
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

export default Ltpz201;
