/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createAddRowHandler,
  createDeleteSelectedRowsHandler,
  getNextNumericRowId,
  InputWithSearchCellEditor,
  InputWithSearchCellRenderer,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon, FileExportIcon, FileImportIcon, SearchIcon, ZoomInIcon, ZoomOutIcon } from '@icons';
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

import '@/shared/lib/agGridPub';

/** 피보험자 명세 데이터 타입 정의 */
type DummyDataType = {
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
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field1: '김한화',
    field2: '000000-0******',
    field3: '010',
    field4: '1234',
    field5: '5678',
    field6: 'text',
    field7: 'text',
    field8: 'text',
    field9: 'text',
    field10: '신용추심원',
    field11: 'text',
    field12: 'text',
    field13: 'text',
    field14: 'text',
    field15: 'text',
    field16: '없음',
    field17: '미입력',
  },
  {
    id: 2,
    isChecked: true,
    field1: '김한화',
    field2: '000000-0******',
    field3: '010',
    field4: '1234',
    field5: '5678',
    field6: 'text',
    field7: 'text',
    field8: 'text',
    field9: 'text',
    field10: '신용추심원',
    field11: 'text',
    field12: 'text',
    field13: 'text',
    field14: 'text',
    field15: 'text',
    field16: '비대상',
    field17: '미입력',
  },
  {
    id: 3,
    isChecked: true,
    field1: '김한화',
    field2: '000000-0******',
    field3: '010',
    field4: '1234',
    field5: '5678',
    field6: 'text',
    field7: 'text',
    field8: 'text',
    field9: 'text',
    field10: '신용추심원 Text',
    field11: 'text',
    field12: 'text',
    field13: 'text',
    field14: 'text',
    field15: 'text',
    field16: '있음',
    field17: '미입력',
  },
];

export interface Ltpz064Props {
  /** 직장주소 표시 타입 (all: 전체, road: 기존 도로명, general: 일반, san: 산, block: 블럭) */
  addressType?: 'all' | 'road' | 'general' | 'san' | 'block';
}

/**
 * Ltpz064: 다수의 피보험자 명세를 관리하고 일괄 입력을 지원하는 팝업 컴포넌트입니다.
 */
export const Ltpz064 = ({ addressType = 'road' }: Ltpz064Props) => {
  const activeAddressType = addressType || 'road';
  const { attributeColumnWidth } = useDynamicColumnWidths(); // 화면 배율별 컬럼 너비 계산 훅

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  /** 행 추가 핸들러: 빈 데이터를 가진 신규 행을 하단에 추가 */
  const handleAddRow = createAddRowHandler<DummyDataType, number>(setRowData, {
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
    }),
    insertAt: 'end',
    gridApiRef: gridApiRef,
  });

  /** 행 삭제 핸들러: 체크박스로 선택된 행들을 삭제 */
  const handleDeleteRow = createDeleteSelectedRowsHandler<DummyDataType>(setRowData, gridApiRef, {
    idKey: 'id',
  });

  /** 셀 렌더러: 셀에 값이 없을 때만 드롭다운 화살표 아이콘을 표시 (Select UI 연출) */
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

  /** Ag-Grid 컬럼 정의 */
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '가입설계동의 시 최소 필요정보',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        children: [
          // 이름 및 검색 버튼
          {
            headerName: '이름',
            headerComponent: () => (
              <Grow placement="cc" className="w-full">
                <span>이름</span>
                <EssentialIcon />
              </Grow>
            ),
            field: 'field1',
            flex: 1,
            minWidth: attributeColumnWidth(100),
            editable: true,
            cellClass: 'editable-cell text-center',
            sortable: false,
            cellRenderer: InputWithSearchCellRenderer,
            cellEditor: InputWithSearchCellEditor,
          },
          // 주민등록번호
          {
            headerComponent: () => (
              <Grow placement="cc" className="w-full">
                <span>주민등록번호</span>
                <EssentialIcon />
              </Grow>
            ),
            field: 'field2',
            flex: 1,
            minWidth: attributeColumnWidth(110),
            editable: true,
            cellClass: 'editable-cell text-center',
            sortable: false,
          },
          // 전화번호 (3개 필드 분할)
          {
            headerName: '전화번호(휴대폰)',
            children: [
              {
                field: 'field3',
                flex: 1,
                minWidth: attributeColumnWidth(30),
                editable: true,
                cellClass: 'editable-cell text-center',
              },
              {
                field: 'field4',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                editable: true,
                cellClass: 'editable-cell text-center',
              },
              {
                field: 'field5',
                flex: 1,
                minWidth: attributeColumnWidth(40),
                editable: true,
                cellClass: 'editable-cell text-center',
              },
            ],
          },
        ],
      } as ColDef<DummyDataType>,
      // 동의 여부
      {
        headerComponent: () => (
          <div className="w-full flex flex-col items-center justify-center leading-[1.1]">
            <span>동의 여부</span>
            <span>개별/단체</span>
          </div>
        ),
        field: 'field6',
        flex: 1,
        minWidth: attributeColumnWidth(50),
        editable: false,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      // 고객 및 설계 기본 정보 그룹
      {
        headerName: '고객 및 설계 기본 정보',
        children: [
          // 관계 선택
          {
            headerName: '주피와의관계',
            field: 'field7',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            editable: true,
            cellClass: 'editable-cell text-center',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['선택1', '선택2'] },
            cellRenderer: selectCellRenderer,
          },
          // 연령
          {
            headerName: '연령',
            field: 'field8',
            flex: 1,
            minWidth: attributeColumnWidth(60),
            editable: false,
            cellClass: 'text-center',
            sortable: false,
          },
          // 상해급수
          {
            headerName: '상해급수',
            field: 'field9',
            flex: 1,
            minWidth: attributeColumnWidth(60),
            editable: false,
            cellClass: 'text-center',
            sortable: false,
          },
          // 직업 검색
          {
            headerName: '직업',
            field: 'field10',
            flex: 2,
            minWidth: attributeColumnWidth(100),
            editable: false,
            cellClass: 'text-center',
            sortable: false,
            cellRenderer: InputWithSearchCellRenderer,
            cellEditor: InputWithSearchCellEditor,
          },
          // 직장명/업종/직무
          {
            headerName: '직장명',
            field: 'field11',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            editable: true,
            cellClass: 'editable-cell text-center',
            sortable: false,
          },
          {
            headerName: '업종',
            field: 'field12',
            minWidth: attributeColumnWidth(80),
            flex: 1,
            editable: true,
            cellClass: 'editable-cell text-center',
            sortable: false,
          },
          {
            headerName: '직무',
            field: 'field13',
            minWidth: attributeColumnWidth(80),
            flex: 1,
            editable: true,
            cellClass: 'editable-cell text-center',
            sortable: false,
          },
          // 운전형태/이륜차/병력여부 (Select 박스 형태)
          {
            headerName: '운전형태',
            field: 'field14',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            editable: true,
            cellClass: 'editable-cell text-center',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['선택1', '선택2'] },
            cellRenderer: selectCellRenderer,
          },
          {
            headerName: '이륜차',
            field: 'field15',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            editable: true,
            cellClass: 'editable-cell text-center',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['선택1', '선택2'] },
            cellRenderer: selectCellRenderer,
          },
          {
            headerName: '병력여부',
            field: 'field16',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            editable: true,
            cellClass: 'editable-cell text-center',
            cellEditor: 'agSelectCellEditor',
            cellClassRules: {
              'text-[var(--color-danger-50)]!': (params: { value: string }) =>
                params.value === '없음' || params.value === '비대상',
            },
            cellEditorParams: { values: ['있음', '없음', '비대상'] },
            cellRenderer: selectCellRenderer,
          },
          // 알릴사항
          {
            headerName: '알릴사항',
            field: 'field17',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            editable: false,
            cellClass: 'text-center',
            sortable: false,
            cellRenderer: (params: { data?: DummyDataType }) => (
              <Grow placement="cc">
                {params.data?.field17 && (
                  <Button color="link" only="default" size="lg" variant="text">
                    {params.data?.field17}
                  </Button>
                )}
              </Grow>
            ),
          },
        ],
      } as ColDef<DummyDataType>,
    ],
    [attributeColumnWidth, selectCellRenderer]
  );
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            {/* 2026-05-27 타이틀 수정 */}
            <Typo tag={'strong'} variant={'heading-lg'}>
              다수피보험자 명세관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ064)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          {/* 상단: 설계번호 및 피보험자 조회 조건 영역 */}
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable
              variant={'head'}
              lineTop={false}
              caption="정액담보점검목록 조회"
              cols={['w-[6rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}
            >
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input
                    aria-label="설계번호 입력"
                    value={'LA01234567890'}
                    onChange={() => {}}
                    variant="info"
                    readOnly
                  />
                </FormCell>
                <FormCell title={'발행후변경순번'}>
                  <Input aria-label="발행후변경순번 입력" value={'1'} onChange={() => {}} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow>
              <FormTable
                variant={'head'}
                lineTop={false}
                caption="정액담보점검목록 조회"
                cols={['w-[8rem]', 'w-[auto]']}
              >
                <FormRow>
                  <FormCell className="whitespace-nowrap" title={'피보험자찾기'}>
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
              <Button id="btnRA" color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                검색
              </Button>
            </Grow>
          </Grow>
          {/* 2026-05-27 구조변경, div, Gcol 추가 */}
          <div className="flex flex-col gap-3">
            {/* 피보험자 명세 그리드 영역 */}
            <TableFold>
              <TableFoldHead title="다수 피보험자 정보">
                <Grow>
                  <Button color="success" variant="outlined">
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                  <Button color="success" variant="outlined">
                    엑셀가져오기
                    <FileImportIcon />
                  </Button>
                  <Button color="gray" variant="outlined" onClick={handleAddRow}>
                    행추가
                    <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                  </Button>
                  <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                    행삭제
                    <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                  <AgGridReact<DummyDataType>
                    onGridReady={(event) => {
                      gridApiRef.current = event.api;
                      event.api.forEachNode((node) => {
                        if (node.data?.isChecked) {
                          node.setSelected(true);
                        }
                      });
                    }}
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
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
                    groupHeaderHeight={30}
                    headerHeight={0}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            {/* 수익자 정보 일괄입력 영역 */}
            <TableFold>
              <TableFoldHead title="피보험자 수익자 일괄입력"></TableFoldHead>
              <TableFoldBody>
                <FormTable>
                  <FormRow>
                    <FormCell title={'사망보험금'}>
                      <Input aria-label="피보험자명" width={120} value={'1234567'} />
                      <Button
                        aria-label="피보험자 검색"
                        variant={'outlined'}
                        only="icon"
                        size={'lg'}
                        color={'gray-light'}
                      >
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                      <NativeSelect aria-label="사망보험금" width={'150'}>
                        {[
                          { value: '고용주(사업주)', label: '고용주(사업주)' },
                          { value: '고용주(사업주)', label: '고용주(사업주)' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                    <FormCell title={'사망외보험금'}>
                      <Input aria-label="피보험자명" width={120} value={'1234567'} />
                      <Button
                        aria-label="피보험자 검색"
                        variant={'outlined'}
                        only="icon"
                        size={'lg'}
                        color={'gray-light'}
                      >
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                      <NativeSelect aria-label="사망보험금" width={'150'}>
                        {[
                          { value: '고용주(사업주)', label: '고용주(사업주)' },
                          { value: '고용주(사업주)', label: '고용주(사업주)' },
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
            {/* 주소 및 연락처 일괄입력 영역 */}
            <TableFold>
              <TableFoldHead title="피보험자 주소 및 연락처 일괄입력"></TableFoldHead>
              <TableFoldBody>
                <FormTable cols={['w-[10rem]', 'w-[auto]']}>
                  <FormRow>
                    <FormCell title={'직장주소'}>
                      <div className="flex flex-col w-full gap-2">
                        {/* 0. 기존 도로명 주소 형태 */}
                        {(activeAddressType === 'all' || activeAddressType === 'road') && (
                          <div className="flex w-full h-full flex-wrap justify-start items-start gap-1">
                            <Grow className="basis-lg">
                              <Input width={80} value={'07308'} readOnly />
                              <Button
                                aria-label="주소 검색"
                                variant={'outlined'}
                                only="icon"
                                size={'lg'}
                                color={'gray-light'}
                              >
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input width={180} value={'서울 영등포구 영등포로'} readOnly />
                              <Input width={60} value={'254'} readOnly />
                              <Input width={60} value={''} readOnly />
                              <Input width={100} value={'A동 5층'} />
                              <Input width={180} value={''} readOnly />
                            </Grow>
                          </div>
                        )}

                        {/* 2. 일반 타입 */}
                        {(activeAddressType === 'all' || activeAddressType === 'general') && (
                          <div className="flex w-full h-full flex-wrap justify-start items-start gap-1">
                            <Grow placement="sc">
                              <Input width={80} value={'1234567'} readOnly />
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
                              <Input width={80} value={''} />
                              <span className="whitespace-nowrap shrink-0 self-center">리</span>
                            </Grow>
                            <Grow placement="sc">
                              <NativeSelect aria-label="번지구분 선택" width={80} value="일반">
                                <NativeSelectOption value="일반">일반</NativeSelectOption>
                              </NativeSelect>
                              <Input width={60} value={''} />
                              <span className="whitespace-nowrap shrink-0 self-center">-</span>
                              <Input width={60} value={''} />
                              <span className="whitespace-nowrap shrink-0 self-center">번지</span>
                              <Input width={90} value={''} />
                            </Grow>
                          </div>
                        )}

                        {/* 3. 산 타입 */}
                        {(activeAddressType === 'all' || activeAddressType === 'san') && (
                          <div className="flex w-full h-full flex-wrap justify-start items-start gap-1">
                            <Grow placement="sc">
                              <Input width={80} value={'1234567'} readOnly />
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
                              <Input width={80} value={''} />
                              <span className="whitespace-nowrap shrink-0 self-center">리</span>
                            </Grow>
                            <Grow placement="sc">
                              <NativeSelect aria-label="번지구분 선택" width={80} value="산">
                                <NativeSelectOption value="산">산</NativeSelectOption>
                              </NativeSelect>
                              <Input width={60} value={''} />
                              <span className="whitespace-nowrap shrink-0 self-center">번지-</span>
                              <Input width={60} value={''} />
                              <span className="whitespace-nowrap shrink-0 self-center">호</span>
                              <Input width={90} value={''} />
                            </Grow>
                          </div>
                        )}

                        {/* 4. 블럭 타입 */}
                        {(activeAddressType === 'all' || activeAddressType === 'block') && (
                          <div className="flex w-full h-full flex-wrap justify-start items-start gap-1">
                            <Grow placement="sc">
                              <Input width={80} value={'1234567'} readOnly />
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
                              <Input width={80} value={''} />
                              <span className="whitespace-nowrap shrink-0 self-center">리</span>
                            </Grow>
                            <Grow placement="sc">
                              <NativeSelect aria-label="번지구분 선택" width={80} value="블럭">
                                <NativeSelectOption value="블럭">블럭</NativeSelectOption>
                              </NativeSelect>
                              <Input width={60} value={''} />
                              <span className="whitespace-nowrap shrink-0 self-center">블럭-</span>
                              <Input width={60} value={''} />
                              <span className="whitespace-nowrap shrink-0 self-center">롯트</span>
                              <Input width={90} value={''} />
                            </Grow>
                          </div>
                        )}
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
            {/* 기타 정보 일괄 등록 (직장, 직무 등) */}
            <Gcol className="gap-2">
              <TableFold>
                <TableFoldHead title="피보험자 고객 및 설계정보 일괄입력"></TableFoldHead>
                <TableFoldBody>
                  <FormTable>
                    <FormRow>
                      <FormCell title={null}>
                        <NativeSelect aria-label="" width={120}>
                          {[
                            { value: '주피와의관계', label: '주피와의관계' },
                            { value: '주피와의관계2', label: '주피와의관계2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input width={100} value={''} />
                        <Button
                          aria-label="피보험자 검색"
                          variant={'outlined'}
                          only="icon"
                          size={'lg'}
                          color={'gray-light'}
                        >
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input width={120} value={''} placeholder="직장명" />
                        <Input width={120} value={''} placeholder="업종" />
                        <Input width={120} value={''} placeholder="직무" />
                        <NativeSelect aria-label="" width={90}>
                          {[
                            { value: '운전형태', label: '운전형태' },
                            { value: '운전형태2', label: '운전형태2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect aria-label="" width={90}>
                          {[
                            { value: '이륜차여부', label: '이륜차여부' },
                            { value: '이륜차여부2', label: '이륜차여부2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect aria-label="" width={90}>
                          {[
                            { value: '병력여부', label: '병력여부' },
                            { value: '병력여부2', label: '병력여부2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Button color="gray" onClick={() => {}} only="default" size="lg" variant="outlined">
                          입력
                        </Button>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
              <Gcol className="w-full" placement="ss" variant="box-warning">
                <Typo icon="warning">
                  [다수 피보험자 정보]란의 좌측에 있는 체크박스를 통하여 체크된 피보험자에게 아래의 정보가
                  일괄등록됩니다.
                </Typo>
              </Gcol>
            </Gcol>
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

export default Ltpz064;
