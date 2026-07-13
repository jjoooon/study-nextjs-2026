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
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
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
    field16: 'text',
    field17: 'text',
  },
];

/**
 * Ltpz064: 다수의 피보험자 명세를 관리하고 일괄 입력을 지원하는 팝업 컴포넌트입니다.
 */
export const Ltpz064 = () => {
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
        minWidth: attributeColumnWidth(100),
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
            cellRenderer: (_params: ICellRendererParams<DummyDataType>) => (
              <Grid className="w-full h-full grid-cols-[1fr_auto] grid-flow-col items-center" placement="cc">
                <Typo>{_params.value}</Typo>
                <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                  <SearchIcon color={'var(--color-primary-50)'} />
                </Button>
              </Grid>
            ),
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
                minWidth: attributeColumnWidth(50),
                editable: true,
                cellClass: 'editable-cell text-center',
              },
              {
                field: 'field4',
                flex: 1,
                minWidth: attributeColumnWidth(50),
                editable: true,
                cellClass: 'editable-cell text-center',
              },
              {
                field: 'field5',
                flex: 1,
                minWidth: attributeColumnWidth(50),
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
        minWidth: attributeColumnWidth(60),
        editable: true,
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
            editable: true,
            cellClass: 'editable-cell text-center',
            sortable: false,
          },
          // 상해급수
          {
            headerName: '상해급수',
            field: 'field9',
            flex: 1,
            minWidth: attributeColumnWidth(60),
            editable: true,
            cellClass: 'editable-cell text-center',
            sortable: false,
          },
          // 직업 검색
          {
            headerName: '직업',
            field: 'field10',
            flex: 1,
            minWidth: attributeColumnWidth(100),
            editable: true,
            cellClass: 'editable-cell text-center',
            sortable: false,
            cellRenderer: (_params: ICellRendererParams<DummyDataType>) => (
              <Grid className="w-full h-full grid-cols-[1fr_auto] grid-flow-col items-center" placement="cc">
                <Typo>{_params.value}</Typo>
                <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                  <SearchIcon color={'var(--color-primary-50)'} />
                </Button>
              </Grid>
            ),
          },
          // 직업명/업종/직무
          {
            headerName: '직업명',
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
            cellEditorParams: { values: ['선택1', '선택2'] },
            cellRenderer: selectCellRenderer,
          },
          // 알릴사항
          {
            headerName: '알릴사항',
            field: 'field17',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            editable: true,
            cellClass: 'editable-cell text-center',
            sortable: false,
          },
        ],
      } as ColDef<DummyDataType>,
    ],
    [attributeColumnWidth, selectCellRenderer]
  );
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="full">
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
              cols={['w-[6rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}
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
                검색
              </Button>
            </Grow>
          </Grow>
          {/* 2026-05-27 구조변경, div, Gcol 추가 */}
          <div className="flex flex-col gap-3">
            {/* 피보험자 명세 그리드 영역 */}
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
                    <FormCell title={'설계번호'}>
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
                      <NativeSelect aria-label="사망보험금" width={'full'}>
                        {[
                          { value: '선택1', label: '선택1' },
                          { value: '선택2', label: '선택2' },
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
                      <NativeSelect aria-label="사망보험금" width={'full'}>
                        {[
                          { value: '선택1', label: '선택1' },
                          { value: '선택2', label: '선택2' },
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
                <FormTable>
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
            {/* 기타 정보 일괄 등록 (직장, 직무 등) */}
            <Gcol className="gap-2">
              <TableFold>
                <TableFoldHead title="피보험자 주소 및 연락처 일괄입력"></TableFoldHead>
                <TableFoldBody>
                  <FormTable>
                    <FormRow>
                      <FormCell title={null}>
                        <NativeSelect aria-label="" width={80}>
                          {[
                            { value: '선택1', label: '선택1' },
                            { value: '선택2', label: '선택2' },
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
                        <NativeSelect aria-label="" width={80}>
                          {[
                            { value: '선택1', label: '선택1' },
                            { value: '선택2', label: '선택2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect aria-label="" width={80}>
                          {[
                            { value: '선택1', label: '선택1' },
                            { value: '선택2', label: '선택2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <NativeSelect aria-label="" width={80}>
                          {[
                            { value: '선택1', label: '선택1' },
                            { value: '선택2', label: '선택2' },
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
