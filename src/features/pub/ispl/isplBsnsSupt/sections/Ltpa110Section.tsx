/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { ArrowDoubleIcon, ResetIcon, SearchIcon, ZoomOutIcon } from '@icons';
import { LayoutTemplate } from '@layout/LayoutTemplate'; // 2026-05-29 경로 변경
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
};

type DummyDataType2 = {
  id: number;
  isCheck: boolean;
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
    isCheck: true,
    field01: 'LA26020945959594',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '9,000원',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'LA26020945959594',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '9,000원',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
];

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    isCheck: false,
    field01: 'LA26020945959594',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '9,000원',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA26020945959594',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '9,000원',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
];

export default function Ltpa110Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '설계번호',
        field: 'field01',
        flex: 2,
        minwidth: attributeColumnWidth(120),
        cellClass: 'text-center',
      },
      {
        headerName: '증권번호',
        field: 'field02',
        flex: 1,
        minwidth: attributeColumnWidth(160),
        cellClass: 'text-center',
      },
      {
        headerName: '계약자',
        field: 'field03',
        flex: 1,
        minwidth: attributeColumnWidth(70),
        cellClass: 'text-center',
      },
      {
        headerName: '보험시기',
        field: 'field04',
        flex: 1,
        minwidth: attributeColumnWidth(100),
        cellClass: 'text-center',
      },
      {
        headerName: '보험료',
        field: 'field05',
        flex: 1,
        minwidth: attributeColumnWidth(100),
        cellClass: 'text-right',
      },
      {
        headerName: '상품명',
        field: 'field06',
        flex: 10,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field06' }),
      },
      {
        headerName: '상태',
        field: 'field07',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );

  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '설계번호',
        field: 'field01',
        flex: 2,
        minwidth: attributeColumnWidth(120),
        cellClass: 'text-center',
      },
      {
        headerName: '증권번호',
        field: 'field02',
        flex: 1,
        minwidth: attributeColumnWidth(160),
        cellClass: 'text-center',
      },
      {
        headerName: '계약자',
        field: 'field03',
        flex: 1,
        minwidth: attributeColumnWidth(70),
        cellClass: 'text-center',
      },
      {
        headerName: '보험시기',
        field: 'field04',
        flex: 1,
        minwidth: attributeColumnWidth(100),
        cellClass: 'text-center',
      },
      {
        headerName: '보험료',
        field: 'field05',
        flex: 1,
        minwidth: attributeColumnWidth(100),
        cellClass: 'text-right',
      },
      {
        headerName: '상품명',
        field: 'field06',
        flex: 10,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field06' }),
      },
      {
        headerName: '상태',
        field: 'field07',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2, setRowData2] = React.useState<DummyDataType2[]>(DummyData2);

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  // 두번째 agGrid 행삭제
  const handleDeleteRow = React.useCallback(() => {
    const gridApi = gridApiRef.current;
    if (!gridApi) return;

    const selectedIds = new Set(
      gridApi
        .getSelectedNodes()
        .map((node) => node.data?.id)
        .filter((id) => id !== undefined)
    );
    if (selectedIds.size === 0) return;

    setRowData2((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, []);

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '다태아 설계연계관리', pageId: 'LTPA110' }} />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable variant={'head'} lineTop={false}>
                <FormRow>
                  <FormCell title={'보종군'}>
                    <NativeSelect aria-label="항목 선택" width={100} required>
                      {[{ value: 'selection', label: '공통' }].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'유형'}>
                    <NativeSelect aria-label="유형 선택" width={100} required>
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '모집자실명제준수 예외' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <NativeSelect aria-label="유형 선택" width={100} required>
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '모집자실명제준수 예외' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>

                  <FormCell title={'임산부 정보'}>
                    <Input aria-label="" width={100} value={'김한화'} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={120} value={'910220-1234567'} readOnly />
                  </FormCell>
                  <FormCell title={'출산예정년월'}>
                    <DatePickerInput required mode={'single'} value="2026-08-25" />
                  </FormCell>
                </FormRow>
              </FormTable>
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
            <Gcol>
              <TableFold>
                <TableFoldHead title="기본사항" />
                <TableFoldBody className="gap-2">
                  <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      enableCellSpan={true}
                      singleClickEdit={true}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        width: 30,
                      }}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      domLayout="normal"
                      onGridReady={(params) => {
                        params.api.forEachNode((node) => {
                          if (node.data?.isCheck) {
                            node.setSelected(true);
                          }
                        });
                      }}
                    />
                  </div>
                  <Gcol variant={'box-info'} placement={'ss'} className="w-full">
                    <Typo variant={'body-sm'} icon={'info'} weight={'bold'}>
                      등록사항을 확인하여 주십시오
                    </Typo>
                    <BulletList>
                      <BulletListItem size={'sm'} type={'dash'}>
                        설계번호(LA123123123) - 설계중
                      </BulletListItem>
                    </BulletList>
                  </Gcol>
                  {/* 2026-05-27 버튼 위치 변경 */}
                  <Grow className="w-full py-1">
                    <Button color="primary" onClick={() => {}} only="icon" size="lg" variant="outlined">
                      <ArrowDoubleIcon />
                    </Button>
                  </Grow>
                </TableFoldBody>
              </TableFold>

              <TableFold className="h-full grid-rows-[auto_1fr]">
                <TableFoldHead title="선택설계">
                  <Grow>
                    <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                      행삭제
                      <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                    </Button>
                  </Grow>
                </TableFoldHead>
                <TableFoldBody>
                  <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData2}
                      columnDefs={columnDefs2}
                      enableCellSpan={true}
                      singleClickEdit={true}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        width: 30,
                      }}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      domLayout="autoHeight"
                      //2026-05-29 코드 추가
                      onGridReady={(params) => {
                        gridApiRef.current = params.api;
                        params.api.forEachNode((node) => {
                          if (node.data?.isCheck) {
                            node.setSelected(true);
                          }
                        });
                      }}
                    />
                  </div>
                </TableFoldBody>
              </TableFold>
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              <Grow gap={1}>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
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
