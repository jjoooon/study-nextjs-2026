/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import {
  AgGridEmptyComponent,
  createAddRowHandler,
  createDeleteSelectedRowsHandler,
  getNextNumericRowId,
} from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { FileExportIcon, FileImportIcon, ResetIcon, SearchIcon, ZoomInIcon, ZoomOutIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';

import '@/shared/lib/agGridPub';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

type DummyDataTypeA = {
  id: number;
  isChecked: boolean;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string | number;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
  field10: string;
};

const DummyDataA: DummyDataTypeA[] = [
  {
    id: 1,
    isChecked: false,
    field1: 'Text',
    field2: '10명',
    field3: '남자',
    field4: '35세',
    field5: 31110,
    field6: '회사 사무직 종사자',
    field7: '1/A',
    field8: 'text',
    field9: '99,999,999원',
    field10: '3명',
  },
];

type DummyDataTypeB = {
  id: number;
  isChecked: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: string | number;
  field8: string | number;
  field9: string | number;
  field10: string | number;
  field11: string | number;
  field12: string | number;
  field13: string | number;
  field14: string | number;
  field15: string | number;
  field16: string | number;
  field17: string | number;
  field18: string | number;
  field19: string | number;
  field20: string | number;
  field21: string | number;
  field22: string | number;
};

const DummyDataB: DummyDataTypeB[] = [
  {
    id: 1,
    isChecked: false,
    field1: 'Text',
    field2: '김한화',
    field3: '900101-1234567',
    field4: '010',
    field5: '1234',
    field6: '5678',
    field7: 'text',
    field8: 'text',
    field9: 'text',
    field10: 'text',
    field11: '신용추심원',
    field12: 'text',
    field13: 'text',
    field14: 'text',
    field15: 'text',
    field16: 'text',
    field17: 'text',
    field18: 'text',
    field19: 'text',
    field20: 'text',
    field21: 'text',
    field22: 'text',
  },
];
export const Ltpz296 = () => {
  const gridApiRefA = React.useRef<GridApi<DummyDataTypeA> | null>(null);
  const [rowDataA, setRowDataA] = React.useState<DummyDataTypeA[]>(DummyDataA);

  const handleAddRowA = createAddRowHandler<DummyDataTypeA, number>(setRowDataA, {
    idKey: 'id',
    getNextId: getNextNumericRowId,
    createRow: (nextId) => ({
      id: nextId,
      isChecked: false,
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
      field8: '',
      field9: '',
      field10: '',
    }),
    insertAt: 'end',
    gridApiRef: gridApiRefA,
  });

  const handleDeleteRowA = createDeleteSelectedRowsHandler<DummyDataTypeA>(setRowDataA, gridApiRefA, {
    idKey: 'id',
  });

  // 2026-05-27 그룹추가시 select 화살표만 노출
  const selectCellRenderer = React.useCallback(<TData,>(params: ICellRendererParams<TData>) => {
    const value = params.value == null ? '' : String(params.value);
    const hasValue = value.trim().length > 0;

    if (hasValue) {
      return (
        <div className="flex h-full w-full items-center justify-center px-1">
          <span className="block min-w-0 flex-1 truncate text-center leading-[2.5rem]">{value}</span>
        </div>
      );
    }

    return (
      <div className="flex h-full w-full items-center justify-between gap-1 px-1">
        <span className="block min-w-0 flex-1" />
        <span className="ag-icon ag-icon-small-down shrink-0" aria-hidden="true" />
      </div>
    );
  }, []);

  // 2026-05-27 select 부분만 cellRenderer: selectCellRenderer, 추가
  const columnDefsA: ColDef<DummyDataTypeA>[] = [
    {
      headerName: '그룹명',
      field: 'field1',
      flex: 1,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '인원',
      field: 'field2',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '성별',
      field: 'field3',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['남자', '여자'] },
      cellRenderer: selectCellRenderer,
      sortable: false,
    },
    {
      headerName: '평균연령',
      field: 'field4',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '직업코드',
      field: 'field5',
      width: 120,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellRenderer: (_params: ICellRendererParams<DummyDataTypeA>) => (
        <Grid className="w-full h-full grid-cols-[1fr_auto] grid-flow-col items-center" placement="cc">
          <Typo>{_params.value}</Typo>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grid>
      ),
    },
    {
      headerName: '직업명',
      field: 'field6',
      flex: 1,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '급수',
      field: 'field7',
      width: 60,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '운전용도',
      field: 'field8',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['text1', 'text2'] },
      cellRenderer: selectCellRenderer,
      sortable: false,
    },
    {
      headerName: '보혐료',
      field: 'field9',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '등록인원',
      field: 'field10',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-right',
      sortable: false,
    },
  ];
  const gridApiRefB = React.useRef<GridApi<DummyDataTypeB> | null>(null);
  const [rowDataB, setRowDataB] = React.useState<DummyDataTypeB[]>(DummyDataB);

  const handleAddRowB = createAddRowHandler<DummyDataTypeB, number>(setRowDataB, {
    idKey: 'id',
    getNextId: getNextNumericRowId,
    createRow: (nextId) => ({
      id: nextId,
      isChecked: false,
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
      field8: '',
      field9: '',
      field10: '',
      field11: '',
      field12: '',
      field13: '',
      field14: '',
      field15: '',
      field16: '',
      field17: '',
      field18: '',
      field19: '',
      field20: '',
      field21: '',
      field22: '',
    }),
    insertAt: 'end',
    gridApiRef: gridApiRefB,
  });

  const handleDeleteRowB = createDeleteSelectedRowsHandler<DummyDataTypeB>(setRowDataB, gridApiRefB, {
    idKey: 'id',
  });

  // 2026-05-27 select 부분만 cellRenderer: selectCellRenderer, 추가
  const columnDefsB: ColDef<DummyDataTypeB>[] = [
    {
      headerName: '그룹명',
      field: 'field1',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
      pinned: 'left',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택1', '선택2'] },
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '이름',
      field: 'field2',
      width: 100,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
      pinned: 'left',
      cellRenderer: (_params: ICellRendererParams<DummyDataTypeB>) => (
        <Grid className="w-full h-full grid-cols-[1fr_auto] grid-flow-col items-center" placement="cc">
          <Typo>{_params.value}</Typo>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grid>
      ),
    },
    {
      headerName: '주민등록번호',
      field: 'field3',
      width: 110,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
      pinned: 'left',
    },
    {
      headerName: '전화번호(휴대폰)',
      children: [
        {
          field: 'field4',
          width: 50,
          editable: true,
          cellClass: 'editable-cell text-center',
        },
        {
          field: 'field5',
          width: 50,
          editable: true,
          cellClass: 'editable-cell text-center',
        },
        {
          field: 'field6',
          width: 50,
          editable: true,
          cellClass: 'editable-cell text-center',
        },
      ],
    } as ColDef<DummyDataTypeB>,
    {
      headerName: '동의',
      field: 'field7',
      width: 60,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '관계',
      field: 'field8',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택1', '선택2'] },
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '연령',
      field: 'field9',
      width: 60,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '급수',
      field: 'field10',
      width: 60,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '직업',
      field: 'field11',
      width: 100,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
      cellRenderer: (_params: ICellRendererParams<DummyDataTypeB>) => (
        <Grid className="w-full h-full grid-cols-[1fr_auto] grid-flow-col items-center" placement="cc">
          <Typo>{_params.value}</Typo>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grid>
      ),
    },
    {
      headerName: '직업명',
      field: 'field12',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '업종',
      field: 'field13',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '직무',
      field: 'field14',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '운전형태',
      field: 'field15',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택1', '선택2'] },
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '이륜차',
      field: 'field16',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택1', '선택2'] },
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '병력여부',
      field: 'field17',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택1', '선택2'] },
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '치아병력',
      field: 'field18',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택1', '선택2'] },
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '알릴사항',
      field: 'field19',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '사망수익자',
      field: 'field20',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '사망외수익자',
      field: 'field21',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '보험료',
      field: 'field22',
      width: 80,
      editable: true,
      cellClass: 'editable-cell text-right',
      sortable: false,
    },
  ];
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            {/* 2026-05-27 텍스트 수정 */}
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보별 피보험자명세관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ296)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="w-full h-full grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable
              variant={'head'}
              lineTop={false}
              caption="정액담보점검목록 조회"
              cols={['w-[6rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}
            >
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input
                    aria-label="설계번호 입력"
                    value={'LA26022432174'}
                    onChange={() => {}}
                    variant="info"
                    readOnly
                  />
                </FormCell>
                <FormCell title={'발행후변경순번'}>
                  <Input aria-label="발행후변경순번 입력" value={'1'} onChange={() => {}} variant="info" readOnly />
                </FormCell>
                <FormCell title={'피보험자찾기'}>
                  <NativeSelect aria-label="점검방법 선택" value={''} width={80} onChange={() => {}}>
                    {[
                      { value: 'selection', id: 'type1', label: '이름' },
                      { value: 'selection2', id: 'type2', label: '이름1' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input aria-label="조직구분명 입력" width={120} value={'김한화'} onChange={() => {}} />
                </FormCell>
              </FormRow>
            </FormTable>

            <Grow>
              <Button id="btnRA" color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
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
          {/* 2026-05-27 div 추가 */}
          <div className="flex flex-col gap-3">
            <TableFold>
              <TableFoldHead title="그룹설정">
                <Grow>
                  <Button color="gray" variant="outlined" onClick={handleAddRowA}>
                    그룹추가
                  </Button>
                  <Button color="gray" variant="outlined" onClick={handleDeleteRowA}>
                    그룹삭제
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine min-h-[12.3rem]">
                  <AgGridReact<DummyDataTypeA>
                    onGridReady={(event) => {
                      gridApiRefA.current = event.api;
                    }}
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowDataA}
                    columnDefs={columnDefsA}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    singleClickEdit={true}
                    rowClassRules={{}}
                    domLayout="normal"
                    rowSelection={{
                      mode: 'multiRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      width: 30,
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold>
              <TableFoldHead title="피보험자 명세">
                <Grow>
                  <Button color="success" variant="outlined">
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                  <Button color="success" variant="outlined">
                    엑셀가져오기
                    <FileImportIcon />
                  </Button>
                  {/* 2026-05-21 텍스트수정 */}
                  <Button color="gray" variant="outlined" onClick={handleAddRowB}>
                    행추가
                    <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                  </Button>
                  <Button color="gray" variant="outlined" onClick={handleDeleteRowB}>
                    행삭제
                    <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine min-h-[12.3rem]">
                  <AgGridReact<DummyDataTypeB>
                    onGridReady={(event) => {
                      gridApiRefB.current = event.api;
                    }}
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowDataB}
                    columnDefs={columnDefsB}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    singleClickEdit={true}
                    rowClassRules={{}}
                    domLayout="normal"
                    rowSelection={{
                      mode: 'multiRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      width: 30,
                      pinned: 'left',
                    }}
                    groupHeaderHeight={30}
                    headerHeight={0}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold>
              <TableFoldHead title="일반정보 일괄 등록(선택된 피보험자에게 아래의 정보로 일괄 등록 됩니다.)">
                <Grow>
                  <Button color="gray" variant="outlined" onClick={() => {}}>
                    등록
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <FormTable cols={['w-[10rem]', 'w-[auto]', 'w-[10rem]', 'w-[auto]']}>
                  <FormRow>
                    <FormCell title={'사망보험금'}>
                      <NativeSelect aria-label="사망보험금" width={80}>
                        {[
                          { value: '선택1', label: '선택1' },
                          { value: '선택2', label: '선택2' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Input aria-label="피보험자명" width={120} value={'1234567'} readOnly />
                      <Button
                        aria-label="피보험자 검색"
                        variant={'outlined'}
                        only="icon"
                        size={'lg'}
                        color={'gray-light'}
                      >
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                    </FormCell>
                    <FormCell title={'사망외보험금'}>
                      <NativeSelect aria-label="사망외보험금" width={80}>
                        {[
                          { value: '선택1', label: '선택1' },
                          { value: '선택2', label: '선택2' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Input aria-label="피보험자명" width={100} value={'1234567'} readOnly />
                      <Button
                        aria-label="피보험자 검색"
                        variant={'outlined'}
                        only="icon"
                        size={'lg'}
                        color={'gray-light'}
                      >
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'기타'} colSpan={3}>
                      <NativeSelect aria-label="기타" width={80}>
                        {[
                          { value: '그룹명', label: '그룹명' },
                          { value: '그룹명1', label: '그룹명1' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <NativeSelect aria-label="기타" width={100}>
                        {[
                          { value: '그룹명', label: '그룹명' },
                          { value: '그룹명1', label: '그룹명1' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Input aria-label="피보험자명" width={100} value={'1234567'} readOnly />
                      <Button
                        aria-label="피보험자 검색"
                        variant={'outlined'}
                        only="icon"
                        size={'lg'}
                        color={'gray-light'}
                      >
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                      <Input width={90} placeholder="직장명" value={''} />
                      <Input width={90} placeholder="업종" value={''} />
                      <Input width={90} placeholder="직무" value={''} />
                      <NativeSelect aria-label="운전형태" width={90}>
                        {[
                          { value: '운전형태', label: '운전형태' },
                          { value: '운전형태1', label: '운전형태1' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <NativeSelect aria-label="이륜차여부" width={90}>
                        {[
                          { value: '이륜차여부', label: '이륜차여부' },
                          { value: '이륜차여부1', label: '이륜차여부1' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <NativeSelect aria-label="병력여부" width={90}>
                        {[
                          { value: '병력여부', label: '병력여부' },
                          { value: '병력여부1', label: '병력여부1' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>
            <TableFold>
              <TableFoldHead title="피보험자 직장 주소 및 연락처 일괄 입력(저장시 고객정보에 반영)"></TableFoldHead>
              <TableFoldBody>
                <FormTable cols={['w-[10rem]', 'w-[auto]']}>
                  <FormRow>
                    <FormCell title={'직장주소'}>
                      <div className="flex w-full h-full flex-wrap justify-start items-start gap-1">
                        <Grow className="basis-lg">
                          <Input width={80} value={'1234567'} />
                          <Button
                            aria-label="피보험자 검색"
                            variant={'outlined'}
                            only="icon"
                            size={'lg'}
                            color={'gray-light'}
                          >
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <Input width={100} value={'1234567'} readOnly />
                          <Input width={80} value={''} />리
                        </Grow>
                        <Grow className="basis-lg">
                          <NativeSelect aria-label="사망보험금" width={80}>
                            {[
                              { value: '선택1', label: '선택1' },
                              { value: '선택2', label: '선택2' },
                            ].map((option) => (
                              <NativeSelectOption key={option.value} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                          <Input width={60} value={''} readOnly />-
                          <Input width={60} value={''} readOnly />
                          <Input width={90} value={''} />
                          <Input width={60} value={''} readOnly />
                          <Input width={60} value={''} readOnly />
                          <Input width={90} value={''} />
                        </Grow>
                        <Grow className="basis-full">
                          <Input aria-label="" width={'full'} value={''} />
                        </Grow>
                      </div>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'직장연락처'}>
                      <NativeSelect aria-label="사망보험금" width={80}>
                        {[
                          { value: '선택1', label: '선택1' },
                          { value: '선택2', label: '선택2' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      -
                      <Input width={60} value={''} />-
                      <Input width={60} value={''} />
                      ~(
                      <Input width={60} value={''} />)
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => {}}>
                새로고침
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => {}}>
                단체규약
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => {}}>
                일괄가입설계동의
              </Button>
            </Grow>
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

export default Ltpz296;
