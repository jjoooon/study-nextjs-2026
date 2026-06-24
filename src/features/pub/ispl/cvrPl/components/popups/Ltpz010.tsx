/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, EditableCallbackParams, ICellRendererParams, RowSelectedEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState, useRef } from 'react';
import * as React from 'react';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { SearchIcon } from '@icons';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  editableSelectCellRenderer,
  numberValueFormatter,
  createInsertCopiedRowButtonCellRenderer,
  useDynamicColumnWidths,
} from '@aggrid';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogClose,
  DialogFooterArea,
} from '@uiux/Dialog';

import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';

/**
 * @type DummyDataType
 * @description 담보 가입 사항 리스트 데이터의 타입 정의
 */
type DummyDataType = {
  id: number; // 행 고유 식별자 (ID)
  isCheck: boolean; // 담보의 체크박스 선택 여부 (체크 시 가입)
  isDuplicate: boolean; // 복사 버튼을 클릭하여 사용자가 임의로 추가한 '중복 행'인지 여부
  productName: string; // 담보명 (보험 상품 내 보장 항목 명칭)
  badge?: string[]; // 담보 우측에 표시할 뱃지 목록 (예: '갱신')
  attribute: boolean; // 속성 검색용 돋보기 버튼 활성화 여부
  coverageAmount: string; // 가입금액 조건 (예: '5천만원(통원20만원)')
  premium: number; // 해당 담보의 산출 보험료
  expiryPeriod: string; // 보험 만기 기간 (예: '01년만기')
  paymentPeriod: string; // 보험료 납입 기간 (예: '전기납')
  canEditExpiry: boolean; // 가입금액 열의 편집(수정)을 허용할지 여부
};

/**
 * @constant dummyData
 * @description 동시 가입 설계 상세 화면에서 표시할 초기 담보 목록 (테스트용 모크 데이터)
 */
const dummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: true, // 초기 선택 상태 활성화
    isDuplicate: false, // 원본 행
    productName:
      '기본형 실손의료비(상해급여)(갱신형)기본형 실손의료비(상해급여)(갱신형)기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: true,
    coverageAmount: '5천만원(통원20만원)',
    premium: 1377,
    expiryPeriod: '01년만기',
    paymentPeriod: '전기납',
    canEditExpiry: true,
  },
  {
    id: 2,
    isCheck: false,
    isDuplicate: false,
    productName: '기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: false,
    coverageAmount: '2천만원(통원20만원)',
    premium: 9999999,
    expiryPeriod: '01년만기',
    paymentPeriod: '전기납',
    canEditExpiry: true,
  },
  {
    id: 3,
    isCheck: false,
    isDuplicate: false,
    productName: '기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: true,
    coverageAmount: '3천만원(통원20만원)',
    premium: 159999,
    expiryPeriod: '01년만기',
    paymentPeriod: '전기납',
    canEditExpiry: true,
  },
  {
    id: 4,
    isCheck: false,
    isDuplicate: false,
    productName: '기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: false,
    coverageAmount: '4천만원(통원20만원)',
    premium: 2323230,
    expiryPeriod: '01년만기',
    paymentPeriod: '전기납',
    canEditExpiry: true,
  },
];

/**
 * @component Ltpz010
 * @description 동시가입설계상세 팝업 다이얼로그 컴포넌트
 *
 * [주요 화면 구성 및 기능 개요]
 * 1. 설계번호 및 상품명: 최상단 영역에서 현재 조회/설계 중인 대표 상품의 기본 정보(설계번호, 상품명 등)를 표시합니다.
 * 2. 계약기본사항 (아코디언): 상품구분(4세대실손/간편실손), 납기/만기 주기, 납기 방법, 태아 가입 여부 및 임산부 매칭 정보를 설정합니다.
 * 3. 피보험자/계약자 (아코디언): 피보험자와 계약자의 인적사항 및 계약자와 주피보험자 간의 관계(주피와관계)를 드롭다운으로 설정하며, 합계 보험료를 확인하고 보험료를 계산합니다.
 * 4. 담보가입사항 (아코디언 & ag-Grid): 가입 대상 담보 리스트를 표 형태로 렌더링합니다.
 *    - 중복 담보 가입 지원: 원본 담보 행의 '중복' 열에 있는 추가 버튼을 클릭해 동일 담보를 다중 구성(복사 행)할 수 있습니다.
 *    - 체크 해제 시 자동 삭제: 임의 복사 추가된 담보 행의 체크박스를 해제하면 해당 행이 그리드와 데이터에서 즉시 파괴(제거)됩니다.
 *    - 신규 행 자동 선택: 중복 행 추가 시, 해당 행이 데이터에 마운트되는 즉시 ag-Grid API를 통해 체크 상태가 강제로 활성화됩니다.
 */
const Ltpz010 = () => {
  // ==========================================
  // [1] 상태 관리 (State) & 레퍼런스 (Ref)
  // ==========================================

  // 주피보험자와 계약자의 관계 콤보박스 선택 값 (예: 본인, 배우자, 부모 등)
  const [relationValue, setRelationValue] = useState('');

  // 담보 가입 설계 그리드에 바인딩할 데이터 배열 상태값
  const [rowData, setRowData] = useState<DummyDataType[]>(dummyData);

  // 가입 대상에서 제외(체크박스 해제)되어 에러 또는 경고 처리가 필요한 행의 ID 목록 상태값
  const [, setErrorRows] = useState<number[]>(dummyData.filter((row) => !row.isCheck).map((row) => row.id));

  // ag-Grid React 컴포넌트의 API 제어 및 내부 Node 접근을 위한 ref
  const gridRef = useRef<AgGridReact<DummyDataType>>(null);

  // '중복 행 추가' 버튼 클릭 시 신규 렌더링된 복사본 행이 감지되면, 이를 자동 체크(Select) 처리하기 위해 임시 보관하는 행 ID ref
  const pendingSelectIdRef = useRef<number | null>(null);

  // ==========================================
  // [2] 그리드 비즈니스 로직 및 이벤트 핸들러
  // ==========================================

  /**
   * @function setRowDataWithTracking
   * @description 담보 목록(rowData)을 안전하게 변경하고, 신규 중복 복사 행의 추가 여부를 실시간 추적하는 래퍼 함수
   * - 기존 데이터 길이와 신규 데이터 길이를 비교하여 행이 새로 추가되었고, 추가된 행이 복사본(isDuplicate === true)일 경우
   *   해당 행의 ID를 `pendingSelectIdRef`에 기록해 둡니다.
   */
  const setRowDataWithTracking = useCallback(
    (updater: DummyDataType[] | ((prev: DummyDataType[]) => DummyDataType[])) => {
      setRowData((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        // 행이 새롭게 추가된 경우
        if (next.length > prev.length) {
          const prevIds = new Set(prev.map((r) => r.id));
          // 새로 추가된 행 중에서 isDuplicate 플래그를 가진 행 탐색
          const newDuplicate = next.find((r) => !prevIds.has(r.id) && r.isDuplicate);
          if (newDuplicate) {
            // 해당 행의 ID를 ref에 담아 나중에 rowData 업데이트 완료 시점에 체크 활성화를 처리하도록 예약
            pendingSelectIdRef.current = newDuplicate.id;
          }
        }
        return next;
      });
    },
    []
  );

  /**
   * @function duplicateRenderer
   * @description '중복' 열에 노출할 행 복사(동일 담보 추가) 버튼 셀 렌더러 정의
   * - 렌더링 조건:
   *   1. 복사본 행(isDuplicate === true)에는 중복 생성 버튼 자체를 렌더링하지 않음 (무한 복사 방지).
   *   2. 원본 행(isDuplicate === false)이면서 가입 선택(isCheck === true)이 되어 있는 경우에만 복사 버튼 노출.
   * - 동작 방식:
   *   - 복사 버튼 클릭 시 가장 큰 ID값을 기준으로 새 ID를 생성하고, 원본 데이터 사본에 `isDuplicate: true`, `isCheck: true` 마킹을 부여하여 리스트에 주입합니다.
   */
  const duplicateRenderer = useMemo(
    () => (params: ICellRendererParams<DummyDataType>) => {
      // 복사되어 생성된 임의 행에는 버튼 노출 안 함
      if (params.data?.isDuplicate) return null;

      return createInsertCopiedRowButtonCellRenderer<DummyDataType, 'id'>(setRowDataWithTracking, {
        idKey: 'id',
        // 현재 행들 중 가장 높은 ID를 검색하여 중복되지 않는 신규 ID 결정
        getNextId: (rows) => rows.reduce((maxId, row) => (row.id > maxId ? row.id : maxId), 0) + 1,
        // 복사 대상 데이터를 기반으로 속성값 재정의 (복사본 표시 및 체크 상태 강제 고정)
        patchCopiedRow: (originalRow, nextId) => ({
          ...originalRow,
          id: nextId,
          isCheck: true,
          isDuplicate: true, // 복사 행 마킹
        }),
        // 체크박스가 true(선택 완료) 상태인 원본 행에만 중복 버튼을 노출하도록 처리
        isVisible: (p) => Boolean(p.data?.isCheck),
        ariaLabel: '동일 담보 추가',
      })(params);
    },
    [setRowDataWithTracking]
  );

  /**
   * @function attributeRenderer
   * @description '속성' 열 내부에 돋보기 형태의 검색 버튼 아이콘을 렌더링하는 함수
   * - 해당 담보 데이터의 `attribute` 값이 true일 때만 상세 속성 조회를 위한 검색 아이콘 버튼을 표시합니다.
   */
  const attributeRenderer = (params: ICellRendererParams<DummyDataType>) => {
    if (!params.value) {
      return null;
    }

    return (
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-1">
        <Button only={'icon'} variant={'none'} size={'sm'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </div>
    );
  };

  /**
   * @function titleRenderer
   * @description '담보명' 열 렌더러
   * - 담보명이 길어질 경우를 대비해 텍스트를 말줄임(`truncate`) 처리합니다.
   * - 담보에 갱신형 정보가 포함된 뱃지 배열(`badge`)이 들어있고 '갱신' 문자열을 가진 경우 파란색 Badge 컴포넌트를 덧붙여 렌더링합니다.
   */
  const titleRenderer = useCallback((params: ICellRendererParams<DummyDataType>) => {
    return (
      <Grow className="h-full pr-1.5" placement={'bwc'}>
        <p className="w-full flex-1 truncate pl-2">{params.data?.productName}</p>
        {params.data?.badge && (
          <Grow className="shrink-0">
            {params.data.badge.includes('갱신') && (
              <Badge color={'blue'} className="w-[3rem]">
                갱신
              </Badge>
            )}
          </Grow>
        )}
      </Grow>
    );
  }, []);

  /**
   * @function coverageAmountCellRenderer
   * @description '가입금액(만원)' 셀 렌더러
   * - ag-Grid 공통 셀 렌더러 유틸인 `editableSelectCellRenderer`를 바인딩하여,
   *   편집 가능한 드롭다운 셀 형태의 UI를 통일감 있게 제공합니다.
   */
  const coverageAmountCellRenderer = (params: ICellRendererParams<DummyDataType>) =>
    editableSelectCellRenderer<DummyDataType>(params);

  // 반응형 또는 고정형 그리드 열 너비 조절 훅 활용
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // ==========================================
  // [3] ag-Grid 컬럼 스펙 정의 (Column Definitions)
  // ==========================================
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '중복',
        field: 'isDuplicate',
        width: attributeColumnWidth(30),
        cellClass: 'text-center',
        sortable: false,
        cellRenderer: duplicateRenderer,
      },
      {
        headerName: '담보명',
        field: 'productName',
        flex: 10,
        cellClass: '!px-0',
        cellRenderer: titleRenderer,
      },
      {
        headerName: '속성',
        field: 'attribute',
        width: attributeColumnWidth(30),
        cellClass: 'text-center',
        cellRenderer: attributeRenderer,
        sortable: false,
      },
      {
        headerName: '가입금액(만원)',
        field: 'coverageAmount',
        minWidth: attributeColumnWidth(140),
        flex: 1,
        cellClass: () => 'w-auto text-centerleft editable-cell [&_input]:text-left!',
        sortable: false,
        filter: false,
        // 담보 데이터 내 canEditExpiry 변수가 true인 경우에만 인라인 셀 드롭다운을 편집할 수 있도록 분기
        editable: (params: EditableCallbackParams<DummyDataType>) => {
          return params.data?.canEditExpiry === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['5천만원(통원20만원)', '2천만원(통원20만원)', '3천만원(통원20만원)', '4천만원(통원20만원)'],
        },
        cellRenderer: coverageAmountCellRenderer,
      },
      {
        headerName: '보험료(원)',
        field: 'premium',
        minWidth: attributeColumnWidth(80),
        flex: 1,
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        // 천단위 세자리 콤마 포맷터 바인딩
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '만기',
        field: 'expiryPeriod',
        minWidth: attributeColumnWidth(70),
        flex: 1,
        cellClass: 'text-center px-[0.2rem]!',
        sortable: false,
        filter: false,
      },
      {
        headerName: '납기',
        field: 'paymentPeriod',
        minWidth: attributeColumnWidth(70),
        flex: 1,
        cellClass: 'text-center px-[0.2rem]!',
        sortable: false,
        filter: false,
      },
    ],
    [attributeColumnWidth, duplicateRenderer, titleRenderer]
  );

  /**
   * @function onCellValueChanged
   * @description 그리드 내 가입금액 수정 등의 셀 값 변경 발생 시 공통 핸들러 호출
   * - 'isCheck' 필드를 상태값 기준으로 설정하며, 에러 행 목록 및 rowData를 최신값으로 동기화합니다.
   */
  const onCellValueChanged = useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  /**
   * @function handleRowDataUpdated
   * @description 그리드의 로우 데이터가 화면에 성공적으로 렌더링/업데이트 완료되었을 때 호출되는 이벤트 핸들러
   * - 중복 복사된 신규 행 추가가 진행되어 `pendingSelectIdRef`에 행 ID가 기록되어 있는 경우,
   *   해당 행의 RowNode를 획득하여 체크박스(Selected) 상태를 즉각 강제 활성화(`node.setSelected(true)`) 처리합니다.
   * - 처리가 끝난 후에는 예약 ref를 초기화합니다.
   */
  const handleRowDataUpdated = useCallback(() => {
    const pendingSelectId = pendingSelectIdRef.current;

    if (pendingSelectId === null) {
      return;
    }

    const node = gridRef.current?.api.getRowNode(String(pendingSelectId));

    if (!node) {
      return;
    }

    // 신규 추가된 중복 행을 화면상에서 강제로 선택 상태로 전환
    node.setSelected(true);
    // 예약 완료 후 ref 초기화
    pendingSelectIdRef.current = null;
  }, []);

  /**
   * @function handleRowSelected
   * @description 그리드 내 특정 행의 체크박스가 클릭(선택/해제)되었을 때 동작하는 핸들러
   * - 비즈니스 요구사항:
   *   1. 선택 해제(`isSelected === false`)가 감지된 행이 복사본 행(`isDuplicate: true`)인 경우,
   *      가입하지 않는 중복 담보이므로 그리드 목록(rowData)에서 필터링을 통해 완전히 즉시 삭제 처리합니다.
   *   2. 그 외 일반 원본 행이거나 선택 활성화 시에는 해당 행의 데이터 내 `isCheck` 값을 선택 상태와 동일하게 동기화합니다.
   */
  const handleRowSelected = useCallback((event: RowSelectedEvent<DummyDataType>) => {
    const data = event.data;

    if (!data) {
      return;
    }

    const isSelected = Boolean(event.node.isSelected());

    // 중복 추가된 행의 체크박스를 해제하면 데이터 배열에서 즉각 누락시켜 행을 파괴함
    if (!isSelected && data.isDuplicate) {
      setRowData((prev) => prev.filter((row) => row.id !== data.id));
      if (pendingSelectIdRef.current === data.id) {
        pendingSelectIdRef.current = null;
      }
      return;
    }

    // 일반 행의 경우 체크 상태 동기화
    setRowData((prev) => prev.map((row) => (row.id === data.id ? { ...row, isCheck: isSelected } : row)));
  }, []);

  // ==========================================
  // [4] 다이얼로그 및 마크업 렌더링 (UI)
  // ==========================================
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        {/* 1. 다이얼로그 헤더 영역: 화면 제목 및 컴포넌트 ID 정의 */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              동시가입설계상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ010)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        {/* 2. 다이얼로그 본문 섹션: 상/하 스크롤 흐름 구성을 위한 Grid 레이아웃 */}
        <DialogSection className="grid-rows-[auto_1fr]">
          {/* 2-1. 최상단: 현재 진행 중인 설계번호 및 보장 상품 이름 표시 상자 */}
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="none" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell
                  title={'설계번호'}
                  tdClassName="grid grid-cols-[auto_auto_auto_1fr] items-center gap-1 w-full"
                >
                  {/* 설계 일련번호 및 대표 상품 이름 (읽기 전용 필드) */}
                  <Input aria-label="" width={'quoteNo'} value={'LA26020945959594'} readOnly />
                  -
                  <Input aria-label="" width={26} value={'1'} readOnly />
                  <Input aria-label="" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          {/* 2-2. 하단 데이터 대조 및 설정 영역: 아코디언 컴포넌트들의 상하 배치 */}
          <Grid placement={'ss'} className="w-full gap-3 grid-rows-[auto_1fr]">
            <Gcol gap={3}>
              {/* [아코디언 1] 계약 기본 사항 설정 영역 */}
              <TableFold variant={'accordion'}>
                <TableFoldHead title="계약기본사항"></TableFoldHead>
                <TableFoldBody>
                  <FormTable caption={'계약기본사항'} cols={['w-[12rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
                    {/* 실손 유형 선택 (라디오 버튼) */}
                    <FormRow>
                      <FormCell title={'상품선택'} colSpan={3}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="4세대실손">
                          {[
                            { value: '4세대실손', label: '4세대실손' },
                            { value: '간편실손', label: '간편실손' },
                          ].map((option, index) => (
                            <RadioGroupItem key={index} value={option.value}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                    {/* 날짜/시간 정보 */}
                    <FormRow>
                      <FormCell title={'보험시기'}>2026-03-06</FormCell>
                      <FormCell title={'유효설계'}>2026-03-06까지</FormCell>
                    </FormRow>
                    {/* 만기 및 기본 납입 방식 */}
                    <FormRow>
                      <FormCell title={'보장내용변경주기'}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="05년만기">
                          <RadioGroupItem value="05년만기">05년만기</RadioGroupItem>
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'납기'}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="전기납">
                          <RadioGroupItem value="전기납">전기납</RadioGroupItem>
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                    {/* 납입 주기 및 갱신 주기 옵션 */}
                    <FormRow>
                      <FormCell title={'납기주기'}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="월납">
                          {[
                            { value: '월납', id: 'Monthly1', label: '월납' },
                            { value: '2월납', id: 'Monthly2', label: '2월납' },
                            { value: '3월납', id: 'Monthly3', label: '3월납' },
                            { value: '6월납', id: 'Monthly6', label: '6월납' },
                            { value: '년납', id: 'Yearly1', label: '년납' },
                          ].map((option, index) => (
                            <RadioGroupItem key={index} value={option.value}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'갱신주기'}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="1년">
                          <RadioGroupItem value="1년">1년</RadioGroupItem>
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                    {/* 태아 가입 조건 및 연계 설정 */}
                    <FormRow>
                      <FormCell title={'태아여부'}>
                        <Grow placement={'sc'}>
                          <CheckboxGroup className="gap-3" onValueChange={() => {}} variant="default">
                            <CheckboxGroupItem value="a">가입</CheckboxGroupItem>
                            <CheckboxGroupItem value="b">다태아</CheckboxGroupItem>
                          </CheckboxGroup>
                          <Button
                            color="secondary"
                            onClick={() => {}}
                            only="default"
                            size="lg"
                            variant="outlined"
                            className="ml-[1rem]"
                          >
                            다태아 연계
                          </Button>
                        </Grow>
                      </FormCell>
                      <FormCell title={'임산부'}>
                        <Input aria-label="" width={70} value={''} readOnly />
                        <Input aria-label="" width={140} value={''} readOnly />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>

              {/* [아코디언 2] 피보험자 / 계약자 기본 정보 및 보험료 계산 실행 영역 */}
              <TableFold variant={'accordion'}>
                <TableFoldHead title="피보험자/계약자"></TableFoldHead>
                <TableFoldBody className="gap-2">
                  {/* 피보험자 인적 정보 및 알림 할인 사항 */}
                  <FormTable caption={'피보험자'} cols={['w-[9rem]', 'w-auto', 'w-[9rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'피보험자'}>
                        <Input aria-label="" width={70} value={'김한화화'} readOnly />
                        <Input aria-label="" width={114} value={'000000-0******'} readOnly />
                      </FormCell>
                      <FormCell title={'알림사항'}>
                        <Grow placement={'bwc'}>
                          <Grow>
                            <Input aria-label="" width={32} align="center" value={'무'} readOnly />
                            <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                              입력
                            </Button>
                          </Grow>
                          <Checkbox onCheckedChange={() => {}}>의료급여수급권자할인</Checkbox>
                        </Grow>
                      </FormCell>
                    </FormRow>
                    {/* 계약자 인적 정보 및 관계성 지정 */}
                    <FormRow>
                      <FormCell title={'계약자'}>
                        <Input aria-label="" width={70} value={'김한화'} readOnly />
                        <Input aria-label="" width={114} value={'910101-1******'} readOnly />
                      </FormCell>
                      <FormCell title={'주피와관계'}>
                        주피보험자(김한화)는 계약자의
                        <NativeSelect
                          aria-label="주피와관계 선택"
                          width={120}
                          readOnly
                          value={relationValue}
                          onChange={(event) => setRelationValue(event.target.value)}
                        >
                          {[
                            { value: 'selection', label: '고용주(사업주)' },
                            { value: 'selection1', label: '본인' },
                            { value: 'selection2', label: '배우자' },
                            { value: 'selection3', label: '부모' },
                            { value: 'selection4', label: '배우자부모' },
                            { value: 'selection5', label: '조부모' },
                          ].map((option, idx) => (
                            <NativeSelectOption key={idx} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                    </FormRow>
                  </FormTable>

                  {/* 총 합계 보험료 요약 및 실시간 보험료 재계산 동작 버튼 */}
                  <FormTable caption={'합계보험료'} cols={['w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'합계보험료'}>
                        <Input aria-label="" width={100} value={'123456'} commaAmount readOnly />원
                        <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                          출생후 보혐료
                        </Button>
                        <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                          보험료 계산
                        </Button>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
            </Gcol>

            {/* [아코디언 3] 담보가입사항 ag-Grid 데이터 테이블 영역 */}
            <TableFold variant={'accordion'}>
              <TableFoldHead title="담보가입사항" />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                  <AgGridReact<DummyDataType>
                    ref={gridRef}
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      cellClass: 'p-0',
                      cellStyle: { padding: 0 },
                    }}
                    singleClickEdit={true}
                    onCellValueChanged={onCellValueChanged}
                    // 멀티 행 선택을 활성화하되, 체크박스로만 조작하고 헤더 체크박스는 숨김 처리
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: false,
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      cellClass: 'text-center editable-cell',
                      width: attributeColumnWidth(30),
                    }}
                    animateRows={false}
                    domLayout="normal"
                    onRowDataUpdated={handleRowDataUpdated} // 데이터 업데이트 완료 시, 예약된 중복 행을 자동 선택 처리
                    onRowSelected={handleRowSelected} // 체크 해제 시 복사된 중복행 필터 삭제
                    onGridReady={(params) => {
                      // 최초 그리드 로딩 시 데이터의 `isCheck` 필드값이 true인 노드들의 체크박스를 수동으로 활성화 처리
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
          </Grid>
        </DialogSection>

        {/* 3. 다이얼로그 하단 푸터 영역: 확인/닫기 제어 및 하단 정보 바 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
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

export default Ltpz010;
