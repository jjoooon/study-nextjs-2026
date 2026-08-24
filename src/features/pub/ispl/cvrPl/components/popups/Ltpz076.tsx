/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { ResetIcon, RightArrowIcon } from '@/shared/components/icons/CommonIcons';
import { useAgGridInfiniteAppend, useDynamicColumnWidths } from '@aggrid'; // 2026-07-31 useAgGridInfiniteAppend 추가
import { Grid, Grow, Gcol, Typo } from '@atoms'; // 2026-07-22 : Gcol 추가
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TableFold } from '@common/TableFold';
import { TableMore } from '@common/TablePagination';
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
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

// M2. 신규페이지
import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isChecked?: boolean;
  field01: number;
  field02: string | number;
  field03: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 2,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 3,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 4,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 5,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 6,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리11',
    field03: '대리점',
  },
  {
    id: 7,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
  {
    id: 8,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
    field03: '대리점',
  },
];

type DummyDataType2 = {
  id: number;
  isChecked?: boolean;
  field01: number;
  field02: string | number;
};

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 2,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 3,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 4,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 5,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 6,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 7,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 8,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 7,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 8,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 7,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
  {
    id: 8,
    isChecked: true,
    field01: 3253180,
    field02: '(주)씨엔아이보험대리',
  },
];

const Ltpz076 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '코드',
        field: 'field01',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '성명/상호명',
        field: 'field02',
        flex: 10,
        cellClass: 'text-left',
      },
      {
        headerName: '구분',
        field: 'field03',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );
  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '코드',
        field: 'field01',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '성명/상호명',
        field: 'field02',
        flex: 10,
        cellClass: 'text-left',
      },
    ],
    [attributeColumnWidth]
  );

  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);

  // 2026-07-31 - 페이지네이션 추가
  const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
  const pageSize = 5;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext, handleLoadReset } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });
  const rowData = React.useMemo(() => DummyData.slice(0, loadedCount), [loadedCount]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              적용대상관리 및 조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ076)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable variant={'head'} lineTop={false} caption="보험정보" cols={['w-[1rem]', 'w-[2rem]']}>
              <FormRow>
                <FormCell title={'플랜순번'}>
                  <Input value={'1'} readOnly variant="info" />
                </FormCell>
                <FormCell title={'플랜명'}>
                  <Input value={'한아름_3대진단강화형_특화'} readOnly variant="info" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          {/* 2026-05-27 버튼 이동으로 전체수정 */}
          <Grid className="w-full h-full grid grid-flow-col grid-cols-[6fr_minmax(26rem,4fr)] gap-3" placement="ss">
            <TableFold className="w-full">
              <TableFoldHead title="대상" />
              <TableFoldBody className="grid gap-[1.2rem]">
                {/* 2026-07-22 : 구조 변경, true로 수정 */}
                <Grid className="grid-flow-col grid-cols-[1fr_auto]" gap={3}>
                  <Gcol>
                    <Grow placement="bwe" className="w-full" variant={'box-round'}>
                      <FormTable variant={'none'} lineTop={false} caption="보험정보" cols={['w-[1rem]', 'w-auto']}>
                        <FormRow>
                          <FormCell title={'직업구분'}>
                            <NativeSelect aria-label="직업구분 선택" width={80}>
                              {[
                                { value: 'selection', label: '설계사' },
                                { value: 'selection2', label: '대리점' },
                                { value: 'selection3', label: '중개인' },
                                { value: 'selection4', label: '사용인' },
                              ].map((option) => (
                                <NativeSelectOption key={option.value} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'조회구분'}>
                            <NativeSelect aria-label="조회구분 선택" width={80}>
                              {[
                                { value: 'selection', label: '코드' },
                                { value: 'selection2', label: '상호명' },
                              ].map((option) => (
                                <NativeSelectOption key={option.value} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                            <Input aria-label="" width={75} value={'1234567'} />
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
                    {/* 20260731 - data-page={5} 수정, ref 추가 */}
                    <div className="ag-theme-alpine inner-scroll" data-page={5}>
                      <AgGridReact<DummyDataType>
                        ref={gridRef}
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        enableCellSpan={true}
                        singleClickEdit={true}
                        rowSelection={{
                          mode: 'multiRow',
                          headerCheckbox: true,
                          checkboxes: true,
                        }}
                        selectionColumnDef={{
                          width: 30,
                          cellClass: 'editable-cell',
                        }}
                      />
                    </div>
                    {/* 2026-07-31 - 페이지네이션 추가 */}
                    <TableMore
                      gridRef={gridRef}
                      loadedCount={loadedCount}
                      totalCount={totalCount}
                      pageSize={pageSize}
                      onLoadAll={handleLoadAll}
                      onLoadNext={handleLoadNext}
                      onLoadReset={handleLoadReset}
                      isReset={true}
                      isAll={true}
                    />
                  </Gcol>
                  <Grow className="w-full h-full flex justify-center items-center ">
                    <Button variant={'none'} size={'lg'} color={'primary'} className="p-0">
                      <RightArrowIcon color="#FF5C2E" />
                    </Button>
                  </Grow>
                </Grid>
                {/* // 2026-07-22 : 구조 변경 */}
              </TableFoldBody>
            </TableFold>
            <TableFold className="w-full">
              <TableFoldHead title="적용대상">
                <Button variant={'outlined'} size={'md'} color={'gray'}>
                  삭제
                </Button>
              </TableFoldHead>
              <TableFoldBody className="grid grid-rows-[1fr]">
                <div className="ag-theme-alpine inner-scroll ltpz076-target-grid" data-row={rowData2.length}>
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
                    enableCellSpan={true}
                    singleClickEdit={true}
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: true, // 2026-07-22 : true로 수정
                      checkboxes: true,
                    }}
                    selectionColumnDef={{
                      width: 30,
                      cellClass: 'editable-cell',
                    }}
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

export default Ltpz076;
