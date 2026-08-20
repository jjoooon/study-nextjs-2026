/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';
import {
  AgGridEmptyComponent,
  createInsertCopiedRowButtonCellRenderer,
  getNextNumericRowId,
  useAgGridInfiniteAppend,
  useDynamicColumnWidths,
  createTooltipValueGetter,
  createFieldRenderer,
} from '@aggrid';
import { Grow, Grid, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { InputTag } from '@common/InputTag';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { createExpiryCellRenderer } from '@grid/CellRenderers';
import { ResetIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

import '@/shared/lib/agGridPub';

type TagGroups = [string[], string[]];
type DummyData1Type = {
  id: number;
  isCheck: boolean;
  depth1: number;
  depth2?: number;
  cvrGroup: string;
  groups: TagGroups;
  cvrCount: number;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    isCheck: false,
    depth1: 1,
    cvrGroup: '사망/후유',
    groups: [['사망', '후유장해', '장애'], ['보험료']],
    cvrCount: 98,
  },
  {
    id: 2,
    isCheck: true,
    depth1: 2,
    cvrGroup: '진단비',
    groups: [
      ['사망', '후유장해', '깁스', '골절'],
      ['보험료', '후유'],
    ],
    cvrCount: 77,
  },
  {
    id: 3,
    isCheck: true,
    depth1: 2,
    depth2: 1,
    cvrGroup: '진단비',
    groups: [
      ['사망', '후유장해', '깁스', '골절'],
      ['보험료', '후유'],
    ],
    cvrCount: 77,
  },
  {
    id: 4,
    isCheck: true,
    depth1: 2,
    depth2: 2,
    cvrGroup: '진단비',
    groups: [
      ['사망', '후유장해', '깁스', '골절'],
      ['보험료', '후유'],
    ],
    cvrCount: 77,
  },
  {
    id: 5,
    isCheck: true,
    depth1: 2,
    depth2: 3,
    cvrGroup: '입원/통원',
    groups: [['사망'], []],
    cvrCount: 35,
  },
  {
    id: 6,
    isCheck: false,
    depth1: 3,
    cvrGroup: '골절/화상',
    groups: [[], []],
    cvrCount: 11,
  },
  {
    id: 7,
    isCheck: false,
    depth1: 3,
    depth2: 1,
    cvrGroup: '골절/화상',
    groups: [[], []],
    cvrCount: 11,
  },
  {
    id: 8,
    isCheck: false,
    depth1: 4,
    cvrGroup: '검사/지원',
    groups: [[], ['후유장해', '깁스', '골절']],
    cvrCount: 34,
  },
  {
    id: 9,
    isCheck: false,
    depth1: 5,
    cvrGroup: '운전/비용',
    groups: [
      ['사망', '후유장해', '장애'],
      ['사망', '후유장해', '장애'],
    ],
    cvrCount: 98,
  },
  {
    id: 10,
    isCheck: false,
    depth1: 6,
    cvrGroup: '운전/비용',
    groups: [
      ['사망', '후유장해', '장애'],
      ['사망', '후유장해', '장애'],
    ],
    cvrCount: 98,
  },
];

type DummyData2Type = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  rowCopy?: boolean;
};
const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '1나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 2,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4:
      '2나눔의행복(상해사망)나눔의행복(상해사망)나눔의행복(상해사망)나눔의행복(상해사망)나눔의행복(상해사망)나눔의행복(상해사망)나눔의행복(상해사망)나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 3,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '3나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 4,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '4나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 5,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '5나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 6,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '6나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 7,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '7나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 8,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '8나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 9,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '9나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 10,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '10나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 11,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '11나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  {
    id: 12,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: '12나눔의행복(상해사망)',
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  },
  ...Array.from({ length: 13 }, (_, i) => ({
    id: 13 + i,
    field1: '사망/후유',
    field2: '사망/후유',
    field3: 'CLA23114',
    field4: `나눔의행복(상해사망) ${13 + i}`,
    field5: '보험료',
    field6: '기타',
    field7: '암',
    field8: '뇌',
    rowCopy: true,
  })),
];

export default function Ltpa600Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 담보분류 -------------
  const [rowData, setRowData] = React.useState<DummyData1Type[]>(DummyData1);

  // 라디오 및 체크박스 선택 토글 처리 (부모-자식 동적 연동)
  const handleSelectRow = React.useCallback((selectedId: number) => {
    setRowData((prev) => {
      const targetRow = prev.find((r) => r.id === selectedId);
      if (!targetRow) return prev;

      const isSubRow = targetRow.depth2 !== undefined && targetRow.depth2 !== null;

      if (isSubRow) {
        // 1. 클릭한 항목이 자식 체크박스 항목 (depth2가 존재하는 경우)
        const targetParentDepth1 = targetRow.depth1;
        const nextIsCheck = !targetRow.isCheck;

        return prev.map((row) => {
          const rowIsSub = row.depth2 !== undefined && row.depth2 !== null;

          if (row.id === selectedId) {
            return { ...row, isCheck: nextIsCheck };
          }

          if (nextIsCheck) {
            // 자식 항목을 체크하는 경우:
            // A. 자기 부모 행은 isCheck: true
            if (!rowIsSub && row.depth1 === targetParentDepth1) {
              return { ...row, isCheck: true };
            }
            // B. 타 부모 행은 isCheck: false
            if (!rowIsSub && row.depth1 !== targetParentDepth1) {
              return { ...row, isCheck: false };
            }
            // C. 타 부모 그룹의 자식 행은 isCheck: false
            if (rowIsSub && row.depth1 !== targetParentDepth1) {
              return { ...row, isCheck: false };
            }
          }
          return row;
        });
      } else {
        // 2. 클릭한 항목이 부모 라디오 항목 (depth2가 undefined/null인 경우)
        const targetParentDepth1 = targetRow.depth1;

        return prev.map((row) => {
          const rowIsSub = row.depth2 !== undefined && row.depth2 !== null;

          if (rowIsSub) {
            // 선택한 부모의 자식 행들은 모두 true, 다른 부모의 자식 행들은 false
            if (row.depth1 === targetParentDepth1) {
              return { ...row, isCheck: true };
            } else {
              return { ...row, isCheck: false };
            }
          } else {
            // 부모 라디오 중 클릭한 행만 isCheck: true
            return { ...row, isCheck: row.id === selectedId };
          }
        });
      }
    });
  }, []);

  // inputTag의 onChange에서 호출되는 함수로, 변경된 태그 값을 받아서 해당 행의 groups 값을 업데이트하는 로직입니다.
  const handleTagChange = React.useCallback((rowId: number, groupIndex: 0 | 1, value: string[]) => {
    setRowData((previous) =>
      previous.map((row) => {
        if (row.id !== rowId) {
          return row;
        }
        const nextGroups: TagGroups = groupIndex === 0 ? [value, row.groups[1]] : [row.groups[0], value];

        return {
          ...row,
          groups: nextGroups,
        };
      })
    );
  }, []);

  // 2026-06-04 flex, minWidth 수정
  const columnDefs1: ColDef<DummyData1Type>[] = useMemo(
    () => [
      {
        headerName: '선택',
        field: 'isCheck',
        width: attributeColumnWidth(40),
        cellClass: 'text-center',
        sortable: false,
        cellRenderer: (params: ICellRendererParams<DummyData1Type>) => {
          const data = params.data;
          if (!data) return null;

          const isSubRow = data.depth2 !== undefined && data.depth2 !== null;

          if (isSubRow) {
            return (
              <div className="flex items-center justify-center h-full ">
                <Checkbox
                  size="sm"
                  variant="noneText"
                  checked={data.isCheck}
                  onCheckedChange={() => handleSelectRow(data.id)}
                />
              </div>
            );
          }

          return (
            <div className="flex items-center justify-center h-full">
              <input
                type="radio"
                name="dummy1-radio-group"
                checked={data.isCheck}
                onChange={() => handleSelectRow(data.id)}
                className="cp-radio shrink-0 size-[1.4rem] cursor-pointer accent-[var(--color-primary-50)]"
              />
            </div>
          );
        },
      },
      {
        headerName: '순서',
        valueGetter: (params) => {
          const d = params.data;
          if (!d) return '';
          return d.depth2 !== undefined && d.depth2 !== null ? `${d.depth1}-${d.depth2}` : String(d.depth1);
        },
        width: attributeColumnWidth(50),
        cellClass: (params) => {
          const isSub = params.data?.depth2 !== undefined && params.data?.depth2 !== null;
          return isSub ? 'text-center font-medium text-[var(--color-gray-60)]' : 'text-center font-bold';
        },
        valueFormatter: (params) => String(params.value ?? ''),
        cellRenderer: (params: ICellRendererParams<DummyData1Type>) => {
          return <span>{String(params.value ?? '')}</span>;
        },
        autoHeight: true,
      },
      {
        headerName: '담보그룹',
        field: 'cvrGroup',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerName: '구분',
        field: 'groups',
        flex: 5,
        minWidth: attributeColumnWidth(100),
        cellClass: 'text-center !p-0',
        autoHeight: true,
        sortable: false,
        cellRenderer: (params: ICellRendererParams<DummyData1Type, TagGroups>) => {
          const values = params.value;
          const rowId = params.data?.id;

          if (!values || rowId === undefined) {
            return null;
          }

          return (
            <Grid className="grid-cols-[5rem_1fr] grid-rows-[auto_auto] gap-0 ">
              <Grow placement="cc" className="border-b border-[var(--color-gray-10)]">
                포함
              </Grow>
              <Grow placement="cc" className="py-1 px-2 border-l border-b border-[var(--color-gray-10)]">
                <InputTag value={values[0]} onChange={(value) => handleTagChange(rowId, 0, value)} />
              </Grow>
              <Grow placement="cc" className="">
                미포함
              </Grow>
              <Grow placement="cc" className="py-1 px-2 border-l border-[var(--color-gray-10)]">
                <InputTag value={values[1]} onChange={(value) => handleTagChange(rowId, 1, value)} />
              </Grow>
            </Grid>
          );
        },
      },
      {
        headerName: '담보',
        field: 'cvrCount',
        width: attributeColumnWidth(40),
        cellClass: 'text-center',
        autoHeight: true,
      },
    ],
    [attributeColumnWidth, handleSelectRow, handleTagChange]
  );

  // 시뮬레이션 -------------
  const [rowData2, setRowData2] = React.useState<DummyData2Type[]>(DummyData2);
  const gridRef = React.useRef<AgGridReact<DummyData2Type>>(null);
  const pageSize = 3;
  const { totalCount, dataSource, handleSortChanged } = useAgGridInfiniteAppend({
    allRows: rowData2,
    pageSize,
  });

  // 복사
  const duplicateButtonRenderer = useMemo(
    () =>
      createInsertCopiedRowButtonCellRenderer<DummyData2Type, 'id'>(setRowData2, {
        idKey: 'id',
        getNextId: getNextNumericRowId,
        isVisible: (params) => params.data?.rowCopy === true,
        ariaLabel: '추가',
      }),
    []
  );

  const getExpiryRenderer = createExpiryCellRenderer<DummyData2Type>;
  // 2026-06-01 flex 수정
  const columnDefs2: (ColDef<DummyData2Type> | ColGroupDef<DummyData2Type>)[] = useMemo(
    () => [
      {
        headerName: '담보그룹명',
        children: [
          {
            headerName: '현재',
            field: 'field1',
            flex: 1,
            minWidth: attributeColumnWidth(120),
            cellClass: 'text-center',
            autoHeight: true,
            cellRenderer: createFieldRenderer<DummyData2Type>('field1', 'field7', 'row', [7, 3]),
          },
          {
            headerName: '변경 후',
            field: 'field2',
            flex: 1,
            minWidth: attributeColumnWidth(120),
            cellClass: 'text-center',
            autoHeight: true,
            cellRenderer: createFieldRenderer<DummyData2Type>('field2', 'field8', 'row', [7, 3]),
          },
        ],
      },
      {
        headerName: '담보코드',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(72),
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerName: '담보명',
        field: 'field4',
        flex: 16,
        autoHeight: true,
        tooltipValueGetter: createTooltipValueGetter<DummyData2Type>({ field: 'field4' }),
      },
      {
        headerName: '예외',
        field: 'field5',
        flex: 20,
        editable: true,
        cellClass: 'text-center editable-cell cp-pr-0',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: [
            '사망/후유',
            '진단비',
            '입원/통원',
            '수술/치료',
            '골절/화상',
            '검사/지원',
            '운전/비용',
            '재물/배상',
            '기타',
            '미분류',
          ],
        },
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '중복',
        field: 'rowCopy',
        width: attributeColumnWidth(30),
        sortable: false,
        cellRenderer: duplicateButtonRenderer,
      },
    ],
    [attributeColumnWidth, duplicateButtonRenderer, getExpiryRenderer]
  );

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '담보그룹관리',
            pageId: 'LTPA600',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <ResizablePanelGroup orientation="horizontal" className="w-full h-full">
            {/* 담보분류 */}
            <ResizablePanel defaultSize={55} minSize={20}>
              <Grid className="grid-rows-[auto_minmax(0,1fr)_auto] h-full w-full overflow-y-hidden" gap={1}>
                <Grow className="w-full" placement="sc">
                  <Typo variant={'heading-md'} tag="h2">
                    담보분류
                  </Typo>
                </Grow>
                <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full w-full" gap={3}>
                  <Grow className="w-full" variant="box-round" placement={'ec'} gap={6}>
                    <Grow>
                      <Button color="primary" onClick={() => {}} only="default" size="lg" variant="contained">
                        시뮬레이션
                      </Button>
                    </Grow>
                  </Grow>

                  <div className="ag-theme-alpine radio-selection group-style">
                    <AgGridReact<DummyData1Type>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      getRowClass={(params) => {
                        const isSubRow = params.data?.depth2 !== undefined && params.data?.depth2 !== null;
                        return isSubRow ? 'is-sub-row' : 'is-parent-row';
                      }}
                      rowData={rowData}
                      columnDefs={columnDefs1}
                      defaultColDef={{
                        sortable: true,
                        resizable: false,
                      }}
                      singleClickEdit={true}
                      domLayout="normal"
                      animateRows={false}
                    />
                  </div>
                </Grid>
                <div className="h-[1.95rem]"></div>
              </Grid>
            </ResizablePanel>

            <ResizableHandle />

            {/* 시뮬레이션 */}
            <ResizablePanel defaultSize={45} minSize={20}>
              <Grid className="grid-rows-[auto_minmax(0,1fr)_auto] h-full w-full overflow-y-hidden" gap={1}>
                <Grow className="w-full" placement="sc">
                  <Typo variant={'heading-md'} tag="h2">
                    시뮬레이션
                  </Typo>
                </Grow>
                <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full w-full" gap={3}>
                  <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
                    <Grid className="grid-cols-[auto_1fr_auto] place-items-center w-full gap-[0.4rem]">
                      <NativeSelect aria-label="조회구분 선택">
                        {[
                          { value: '선택', label: '선택해주세요' },
                          { value: '담보코드', label: '담보코드' },
                          { value: '담보명', label: '담보명' },
                          { value: '담보그룹', label: '담보그룹' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Input placeholder="담보검색" />
                      <CheckboxGroup className="ml-[0.8rem] gap-2" aria-label="변경/예외 선택">
                        {[
                          { value: '변경', label: '변경' },
                          { value: '예외', label: '예외' },
                        ].map((option) => (
                          <CheckboxGroupItem key={option.value} value={option.value}>
                            {option.label}
                          </CheckboxGroupItem>
                        ))}
                      </CheckboxGroup>
                    </Grid>
                    <Grow>
                      <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                        조회
                      </Button>
                      <Button
                        color={'gray'}
                        only={'icon'}
                        size={'lg'}
                        variant={'outlined'}
                        onClick={() => {}}
                        aria-label="새로고침"
                      >
                        <ResetIcon />
                      </Button>
                    </Grow>
                  </Grow>

                  <div className="ag-theme-alpine radio-selection">
                    <AgGridReact<DummyData2Type>
                      ref={gridRef}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData2}
                      columnDefs={columnDefs2}
                      defaultColDef={{
                        sortable: true,
                        resizable: true, // 2026-06-01 true로 변경
                      }}
                      singleClickEdit={true}
                      domLayout="normal"
                      animateRows={false}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      tooltipHideDelay={3000}
                      onSortChanged={(event) => {
                        handleSortChanged(
                          event.api
                            .getColumnState()
                            .filter((col) => col.sort)
                            .map((col) => ({
                              colId: col.colId || '',
                              sort: (col.sort || 'asc') as 'asc' | 'desc',
                            }))
                        );
                      }}
                      datasource={dataSource}
                    />
                  </div>
                </Grid>
                <TableMore
                  gridRef={gridRef}
                  isAll={false}
                  isNext={false}
                  loadedCount={totalCount}
                  totalCount={totalCount}
                  pageSize={totalCount}
                />
              </Grid>
            </ResizablePanel>
          </ResizablePanelGroup>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1} placement={'sc'}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  담보그룹관리
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  상품별 시뮬레이션
                </Button>
              </Grow>
              <Grow gap={1} placement={'ec'}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  엑셀내보내기
                </Button>
                <Button variant={'contained'} color={'primary'} size={'xl'}>
                  저장
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
