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
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

/**
 * 그룹설정 그리드(그리드 A)용 데이터 타입
 */
type DummyDataTypeA = {
  id: number;
  isChecked: boolean;
  field1: string; // 그룹명
  field2: string; // 인원
  field3: string; // 성별
  field4: string; // 평균연령
  field5: string | number; // 직업코드
  field6: string; // 직업명
  field7: string; // 급수
  field8: string; // 운전용도
  field9: string; // 보험료
  field10: string; // 등록인원
};

/**
 * 그룹설정 그리드(그리드 A)용 더미 데이터
 */
const DummyDataA: DummyDataTypeA[] = [
  {
    id: 1,
    isChecked: true,
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

/**
 * 피보험자 명세 그리드(그리드 B)용 데이터 타입
 */
type DummyDataTypeB = {
  id: number;
  isChecked: boolean;
  field1: string | number; // 그룹명
  field2: string | number; // 이름
  field3: string | number; // 주민등록번호
  field4: string | number; // 전화번호(국번)
  field5: string | number; // 전화번호(앞자리)
  field6: string | number; // 전화번호(뒷자리)
  field7: string | number; // 동의 여부
  field8: string | number; // 관계
  field9: string | number; // 연령
  field10: string | number; // 급수
  field11: string | number; // 직업코드
  field12: string | number; // 직업명
  field13: string | number; // 업종
  field14: string | number; // 직무
  field15: string | number; // 운전형태
  field16: string | number; // 이륜차 여부
  field17: string | number; // 병력 여부
  field18: string | number; // 치아병력 여부
  field19: string | number; // 알릴사항
  field20: string | number; // 사망수익자
  field21: string | number; // 사망외수익자
  field22: string | number; // 보험료
};

/**
 * 피보험자 명세 그리드(그리드 B)용 더미 데이터
 */
const DummyDataB: DummyDataTypeB[] = [
  {
    id: 1,
    isChecked: true,
    field1: 'Text',
    field2: '김한화',
    field3: '000000-0******',
    field4: '010',
    field5: '0000',
    field6: '0000',
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

/**
 * @component Ltpz296
 * @description 담보별 피보험자명세관리 팝업 다이얼로그 컴포넌트
 * - 단체보험 가입 설계 시, 피보험자 그룹 설정 및 다수의 피보험자 명세를 일괄 등록/수정하는 화면입니다.
 * - 주요 기능:
 *   1. 피보험자 그룹 설정 (추가, 삭제 및 직업/운전 용도 설정)
 *   2. 피보험자 명세 관리 (개별/일괄 등록, 엑셀 가져오기 및 내보내기)
 *   3. 수익자/주소/연락처 정보의 일괄 일괄 등록 기능 제공
 */
export const Ltpz296 = () => {
  // 반응형 그리드 열 너비 계산 훅
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 그리드 A (그룹설정) 제어를 위한 API Ref 및 로우 데이터 상태
  const gridApiRefA = React.useRef<GridApi<DummyDataTypeA> | null>(null);
  const [rowDataA, setRowDataA] = React.useState<DummyDataTypeA[]>(DummyDataA);

  // 그리드 A 신규 행(그룹) 추가 핸들러
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

  // 그리드 A 선택된 행(그룹) 삭제 핸들러
  const handleDeleteRowA = createDeleteSelectedRowsHandler<DummyDataTypeA>(setRowDataA, gridApiRefA, {
    idKey: 'id',
  });

  /**
   * 2026-05-27 그룹추가시 select 화살표만 노출
   * 셀렉트(Select) 타입의 편집셀에서 값이 비어있을 때 드롭다운 화살표(ag-icon-small-down)를 표시하여 사용자 편집을 유도하는 공통 렌더러
   */
  const selectCellRenderer = React.useCallback(<TData,>(params: ICellRendererParams<TData>) => {
    const value = params.value == null ? '' : String(params.value);
    const hasValue = value.trim().length > 0;

    // 값이 존재하면 가운데 정렬 텍스트 출력
    if (hasValue) {
      return (
        <div className="flex h-full w-full items-center justify-center px-1">
          <span className="block min-w-0 flex-1 truncate text-center leading-[2.5rem]">{value}</span>
        </div>
      );
    }

    // 값이 없을 때는 오른쪽에 드롭다운 모양의 다운 아로우 아이콘 출력
    return (
      <div className="flex h-full w-full items-center justify-between gap-1 px-1">
        <span className="block min-w-0 flex-1" />
        <span className="ag-icon ag-icon-small-down shrink-0" aria-hidden="true" />
      </div>
    );
  }, []);

  // 2026-05-27 select 부분만 cellRenderer: selectCellRenderer, 추가
  // 그리드 A (그룹설정) 컬럼 정의
  const columnDefsA = React.useMemo<ColDef<DummyDataTypeA>[]>(
    () => [
      {
        headerName: '그룹명',
        field: 'field1',
        flex: 7,
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '인원',
        field: 'field2',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '성별',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(70),
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
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '직업코드',
        field: 'field5',
        flex: 1,
        minWidth: attributeColumnWidth(120),
        editable: true,
        cellClass: 'editable-cell text-center',
        // 직업코드 셀 내부에 값과 돋보기 검색 버튼을 함께 노출
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
        flex: 7,
        editable: true,
        cellClass: 'editable-cell text-left',
        sortable: false,
      },
      {
        headerName: '급수',
        field: 'field7',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '운전용도',
        field: 'field8',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['text1', 'text2'] },
        cellRenderer: selectCellRenderer,
        sortable: false,
      },
      {
        headerName: '보험료',
        field: 'field9',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        editable: true,
        cellClass: 'editable-cell text-right',
        sortable: false,
      },
      {
        headerName: '등록인원',
        field: 'field10',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-right',
        sortable: false,
      },
    ],
    [attributeColumnWidth, selectCellRenderer]
  );

  // 그리드 B (피보험자명세) 제어를 위한 API Ref 및 로우 데이터 상태
  const gridApiRefB = React.useRef<GridApi<DummyDataTypeB> | null>(null);
  const [rowDataB, setRowDataB] = React.useState<DummyDataTypeB[]>(DummyDataB);

  // 그리드 B 신규 행(피보험자명세) 추가 핸들러
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

  // 그리드 B 선택된 행(피보험자명세) 삭제 핸들러
  const handleDeleteRowB = createDeleteSelectedRowsHandler<DummyDataTypeB>(setRowDataB, gridApiRefB, {
    idKey: 'id',
  });

  // 2026-05-27 select 부분만 cellRenderer: selectCellRenderer, 추가
  // 그리드 B (피보험자명세) 컬럼 정의
  const columnDefsB = React.useMemo<ColDef<DummyDataTypeB>[]>(
    () => [
      {
        headerName: '그룹명',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
        pinned: 'left', // 좌측 스크롤 고정
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['선택1', '선택2'] },
        cellRenderer: selectCellRenderer,
      },
      {
        headerName: '이름',
        field: 'field2',
        flex: 1,
        width: attributeColumnWidth(120),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
        pinned: 'left', // 좌측 스크롤 고정
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
        flex: 1,
        width: attributeColumnWidth(100),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
        pinned: 'left', // 좌측 스크롤 고정
      },
      {
        headerName: '전화번호(휴대폰)',
        // 하위 컬럼을 국/앞/뒤 구조로 3단 분할 구성
        children: [
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
          {
            field: 'field6',
            flex: 1,
            minWidth: attributeColumnWidth(50),
            editable: true,
            cellClass: 'editable-cell text-center',
          },
        ],
      } as ColDef<DummyDataTypeB>,
      {
        headerName: '동의',
        field: 'field7',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '관계',
        field: 'field8',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['선택1', '선택2'] },
        cellRenderer: selectCellRenderer,
      },
      {
        headerName: '연령',
        field: 'field9',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '급수',
        field: 'field10',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '직업',
        field: 'field11',
        flex: 5,
        minWidth: attributeColumnWidth(100),
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
        flex: 2,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '업종',
        field: 'field13',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '직무',
        field: 'field14',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '운전형태',
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
        headerName: '이륜차',
        field: 'field16',
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
        field: 'field17',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['선택1', '선택2'] },
        cellRenderer: selectCellRenderer,
      },
      {
        headerName: '치아병력',
        field: 'field18',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['선택1', '선택2'] },
        cellRenderer: selectCellRenderer,
      },
      {
        headerName: '알릴사항',
        field: 'field19',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '사망수익자',
        field: 'field20',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '사망외수익자',
        field: 'field21',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-center',
        sortable: false,
      },
      {
        headerName: '보험료',
        field: 'field22',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        editable: true,
        cellClass: 'editable-cell text-right',
        sortable: false,
      },
    ],
    [attributeColumnWidth, selectCellRenderer]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="full">
        {/* 다이얼로그 타이틀 영역 */}
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

        {/* 다이얼로그 본문 영역 */}
        <DialogSection className="w-full h-full grid-rows-[auto_1fr]">
          {/* 상단: 조회 조건 설정 폼 */}
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

          {/* 2026-05-27 div 추가 - 실데이터 그리드 및 일괄 처리 영역 */}
          <div className="flex flex-col gap-3">
            {/* 1. 그룹 설정 영역 */}
            <TableFold>
              <TableFoldHead title="그룹설정">
                <Grow>
                  <Button color="gray" variant="outlined" onClick={handleAddRowA}>
                    그룹추가
                    <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                  </Button>
                  <Button color="gray" variant="outlined" onClick={handleDeleteRowA}>
                    그룹삭제
                    <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowDataA.length}>
                  <AgGridReact<DummyDataTypeA>
                    onGridReady={(event) => {
                      gridApiRefA.current = event.api;
                      event.api.forEachNode((node) => {
                        if (node.data?.isChecked) {
                          node.setSelected(true);
                        }
                      });
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

            {/* 2. 피보험자 명세 관리 영역 */}
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
                <div className="ag-theme-alpine inner-scroll" data-row={rowDataB.length}>
                  <AgGridReact<DummyDataTypeB>
                    onGridReady={(event) => {
                      gridApiRefB.current = event.api;
                      event.api.forEachNode((node) => {
                        if (node.data?.isChecked) {
                          node.setSelected(true);
                        }
                      });
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

            {/* 3. 일반정보 일괄 등록 영역 */}
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

            {/* 4. 피보험자 직장 주소 및 연락처 일괄 입력 영역 */}
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

        {/* 다이얼로그 하단 푸터 영역 */}
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
