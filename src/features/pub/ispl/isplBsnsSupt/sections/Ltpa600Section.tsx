/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import {
  AgGridEmptyComponent,
  createInsertCopiedRowButtonCellRenderer,
  getNextNumericRowId,
  useAgGridInfiniteAppend,
  useDynamicColumnWidths,
  createTooltipValueGetter,
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
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type TagGroups = [string[], string[]];
type DummyData1Type = {
  id: number;
  isCheck: boolean;
  field1: number;
  field2: string;
  field3: TagGroups;
  field4: number;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    isCheck: true,
    field1: 1,
    field2: '사망/후유',
    field3: [['사망', '후유장해', '장애'], ['보험료']],
    field4: 98,
  },
  {
    id: 2,
    isCheck: true,
    field1: 2,
    field2: '진단비',
    field3: [
      ['사망', '후유장해', '깁스', '골절'],
      ['보험료', '후유'],
    ],
    field4: 77,
  },
  {
    id: 3,
    isCheck: true,
    field1: 3,
    field2: '입원/통원',
    field3: [['사망'], []],
    field4: 35,
  },
  {
    id: 4,
    isCheck: true,
    field1: 4,
    field2: '골절/화상',
    field3: [[], []],
    field4: 11,
  },
  {
    id: 5,
    isCheck: true,
    field1: 5,
    field2: '검사/지원',
    field3: [[], ['후유장해', '깁스', '골절']],
    field4: 34,
  },
  {
    id: 6,
    isCheck: true,
    field1: 6,
    field2: '운전/비용',
    field3: [
      ['사망', '후유장해', '장애'],
      ['사망', '후유장해', '장애'],
    ],
    field4: 98,
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
    rowCopy: true,
  },
];

export default function Ltpa600Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 담보분류 -------------
  const [rowData, setRowData] = React.useState<DummyData1Type[]>(DummyData1);

  // inputTag의 onChange에서 호출되는 함수로, 변경된 태그 값을 받아서 해당 행의 field3 값을 업데이트하는 로직입니다.
  const handleTagChange = React.useCallback((rowId: number, groupIndex: 0 | 1, value: string[]) => {
    setRowData((previous) =>
      previous.map((row) => {
        if (row.id !== rowId) {
          return row;
        }
        const nextField3: TagGroups = groupIndex === 0 ? [value, row.field3[1]] : [row.field3[0], value];

        return {
          ...row,
          field3: nextField3,
        };
      })
    );
  }, []);

  const columnDefs1: ColDef<DummyData1Type>[] = useMemo(
    () => [
      {
        headerName: '순서',
        field: 'field1',
        width: attributeColumnWidth[5],
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerName: '담보그룹',
        field: 'field2',
        width: attributeColumnWidth[8],
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerName: '구분',
        field: 'field3',
        flex: 1,
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
        field: 'field4',
        width: attributeColumnWidth[5],
        cellClass: 'text-center',
        autoHeight: true,
      },
    ],
    [attributeColumnWidth, handleTagChange]
  );

  // 시뮬레이션 -------------
  const [rowData2, setRowData2] = React.useState<DummyData2Type[]>(DummyData2);
  const pageSize = 3;
  const { loadedCount, totalCount, dataSource, handleLoadAll, handleLoadNext, handleLoadReset, handleSortChanged } =
    useAgGridInfiniteAppend({
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
            width: attributeColumnWidth[8],
            cellClass: 'text-center',
            autoHeight: true,
          },
          {
            headerName: '변경 후',
            field: 'field2',
            width: attributeColumnWidth[8],
            cellClass: 'text-center',
            autoHeight: true,
          },
        ],
      },
      {
        headerName: '담보코드',
        field: 'field3',
        width: attributeColumnWidth[9],
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerName: '담보명',
        field: 'field4',
        flex: 5,
        autoHeight: true,
        tooltipValueGetter: createTooltipValueGetter<DummyData2Type>({ field: 'field4' }),
      },
      {
        headerName: '예외',
        field: 'field5',
        width: attributeColumnWidth[10],
        editable: true,
        cellClass: 'text-center editable-cell',
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
        cellRenderer: getExpiryRenderer('left'),
      },
      {
        headerName: '중복',
        field: 'rowCopy',
        flex: 1,
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
          <Grid className="grid-cols-[1fr_1fr] h-full w-full" gap={3}>
            {/* 담보분류 */}
            <Grid className="grid-rows-[auto_1fr_auto] h-full w-full">
              <Grow className="w-full" placement="sc">
                <Typo variant={'heading-md'} tag="h2">
                  담보분류
                </Typo>
              </Grow>
              <div className="ag-theme-alpine radio-selection">
                <AgGridReact<DummyData1Type>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs1}
                  defaultColDef={{
                    sortable: true,
                    resizable: false,
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
                  animateRows={false}
                />
              </div>
              <Grow placement="ec" className="w-full">
                <Button variant={'outlined'} size={'sm'}>
                  시뮬레이션
                </Button>
              </Grow>
            </Grid>

            {/* 시뮬레이션 */}
            <Grid className="grid-rows-[auto_1fr_auto] h-full w-full" gap={1}>
              <Grow className="w-full" placement="sc">
                <Typo variant={'heading-md'} tag="h2">
                  시뮬레이션
                </Typo>
              </Grow>
              <Grid className="grid-rows-[auto_1fr] h-full w-full" gap={3}>
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
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData2.slice(0, loadedCount)}
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
                    rowModelType="infinite"
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
                    cacheBlockSize={pageSize}
                    maxBlocksInCache={2}
                    datasource={dataSource}
                  />
                </div>
              </Grid>
              <TableMore
                isAll={true}
                loadedCount={loadedCount}
                totalCount={totalCount}
                pageSize={pageSize}
                onLoadAll={handleLoadAll}
                onLoadNext={handleLoadNext}
                onLoadReset={handleLoadReset}
              />
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1} placement={'sc'} className="w-full">
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  담보그룹관리
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  상품별 시뮬레이션
                </Button>
              </Grow>
              <Grow gap={1} placement={'ec'} className="w-full">
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
