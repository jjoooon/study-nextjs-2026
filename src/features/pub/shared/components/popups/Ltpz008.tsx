/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

/**
 * @file Ltpz008.tsx
 * @description 한화손해보험 가입설계 내 선택된 담보들의 노출 순서를 동적으로 변경해주는 담보 순서 변경 다이얼로그 컴포넌트입니다.
 *
 * 주요 설계 특징:
 * 1. 좌측(현재 순서 고정 뷰)과 우측(정렬 조작이 가능한 변경 뷰) 두 개의 Ag-Grid를 병렬 배치
 * 2. 특정 필수 담보(isFixed: true)는 위치가 고정되어 이동이 불가능하며, 나머지 담보만 정렬 대상이 됨
 * 3. 이동 연산 처리 시, 고정 행의 인덱스를 보존한 상태에서 이동 대상 행들의 순서만 동적으로 재구성하는 `reorderMovableRows` 헬퍼 적용
 * 4. 한 칸 위/아래 이동 및 맨 위/아래 이동 등 4가지 방향 버튼 및 다중 선택 정렬을 지원
 */

import '@/shared/lib/agGridPub';

import { ColDef, ColGroupDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { PageArrowDoubleIcon, PageArrowIcon } from '@/shared/components/icons/CommonIcons';
import { Gcol, Grow, Typo } from '@atoms';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Badge } from '@uiux/Badge';
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
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

/**
 * 그리드에 표시될 담보 행(Row) 데이터 모델 타입 정의
 */
type DummyDataType = {
  id: number; // 담보 일련번호
  isChecked: boolean; // 체크박스 선택 여부
  isFixed: boolean; // 위치 고정(이동 불가) 필수 담보 여부
  field01: string | number; // 담보 속성/구분
  field02: string | number; // 대상 부위 및 질병명/담보명
};
const DummyData: DummyDataType[] = [
  { id: 1, isChecked: true, isFixed: true, field01: '특정부위', field02: '040' },
  { id: 2, isChecked: false, isFixed: true, field01: '특정부위', field02: '040' },
  { id: 3, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 5, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 7, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 22, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 23, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 31, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 33, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
];

const Ltpz008 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [rightRowData, setRightRowData] = React.useState<DummyDataType[]>(DummyData);
  const rightGridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  /**
   * [중요] 고정 담보의 위치를 유지하며 가변 담보만 재정렬하는 유틸리티 헬퍼 함수
   *
   * @param rows 전체 담보 행 배열
   * @param reorder 가변(이동 가능) 담보 배열을 받아 재정렬된 가변 배열을 반환하는 콜백 함수
   * @returns 고정 행은 기존의 절대 인덱스 위치를 유지하고, 나머지 자리에는 재정렬된 가변 행들이 들어찬 최종 배열
   */
  const reorderMovableRows = React.useCallback(
    (rows: DummyDataType[], reorder: (movableRows: DummyDataType[]) => DummyDataType[]) => {
      // 1. 이동 가능한 담보(isFixed: false)만 추출
      const movableRows = rows.filter((row) => !row.isFixed);
      // 2. 전달받은 재정렬 규칙(reorder)에 따라 가변 담보 배열의 순서 변경
      const reorderedMovableRows = reorder(movableRows);

      // 3. 고정 위치 담보(isFixed: true)들의 원래 인덱스 번호와 객체 정보를 Map에 저장
      const fixedRowByIndex = new Map<number, DummyDataType>();
      rows.forEach((row, index) => {
        if (row.isFixed) {
          fixedRowByIndex.set(index, row);
        }
      });

      let movableIndex = 0;
      // 4. 전체 배열 크기만큼 인덱스를 순회하며 고정과 가변 데이터를 본래 규칙에 맞춰 조립
      return rows.map((_, index) => {
        const fixedRow = fixedRowByIndex.get(index);
        // 해당 인덱스가 고정 담보의 자리라면 기존 담보를 그대로 둠
        if (fixedRow) {
          return fixedRow;
        }

        // 고정 담보 자리가 아니라면 재정렬이 완료된 가변 담보를 순서대로 하나씩 배치
        const movableRow = reorderedMovableRows[movableIndex];
        movableIndex += 1;
        return movableRow;
      });
    },
    []
  );

  /**
   * 우측 그리드에서 체크박스로 선택된 행 중, 이동이 불가능한 고정 담보(isFixed)를 배제하고
   * 순수 이동 대상인 가변 담보의 고유 ID 목록만 추출해 반환합니다.
   */
  const getSelectedIds = React.useCallback((): number[] => {
    const selectedNodes = rightGridApiRef.current?.getSelectedNodes() ?? [];
    return selectedNodes
      .filter((node) => !node.data?.isFixed) // 고정 행 제외
      .map((node) => node.data?.id) // ID만 매핑
      .filter((id): id is number => typeof id === 'number');
  }, []);

  /**
   * [맨 아래로 이동] 선택된 가변 담보들을 가변 담보 리스트 내 최하단으로 정렬합니다.
   */
  const moveSelectedBottom = React.useCallback(() => {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) return;

    const selectedSet = new Set(selectedIds);
    setRightRowData((prev) =>
      reorderMovableRows(prev, (movableRows) => {
        // 선택되지 않은 행들을 앞에 두고, 선택된 행들을 맨 뒤(하단)에 병합
        const selectedRows = movableRows.filter((row) => selectedSet.has(row.id));
        const unselectedRows = movableRows.filter((row) => !selectedSet.has(row.id));
        return [...unselectedRows, ...selectedRows];
      })
    );
  }, [getSelectedIds, reorderMovableRows]);

  /**
   * [한 칸 아래로 이동] 선택된 가변 담보들을 가변 담보 리스트 내에서 한 단계씩 내립니다.
   */
  const moveSelectedDownOne = React.useCallback(() => {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) return;

    const selectedSet = new Set(selectedIds);
    setRightRowData((prev) =>
      reorderMovableRows(prev, (movableRows) => {
        const next = [...movableRows];
        // 아래로 이동하므로 뒤에서 두 번째 인덱스부터 역방향으로 탐색 시작
        for (let index = next.length - 2; index >= 0; index -= 1) {
          // 현재 행이 선택되어 있고, 바로 다음(아래) 행은 선택되지 않은 경우 서로 위치를 교환(Swap)
          if (selectedSet.has(next[index].id) && !selectedSet.has(next[index + 1].id)) {
            [next[index], next[index + 1]] = [next[index + 1], next[index]];
          }
        }
        return next;
      })
    );
  }, [getSelectedIds, reorderMovableRows]);

  /**
   * [한 칸 위로 이동] 선택된 가변 담보들을 가변 담보 리스트 내에서 한 단계씩 올립니다.
   */
  const moveSelectedUpOne = React.useCallback(() => {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) return;

    const selectedSet = new Set(selectedIds);
    setRightRowData((prev) =>
      reorderMovableRows(prev, (movableRows) => {
        const next = [...movableRows];
        // 위로 이동하므로 두 번째 인덱스(1)부터 정방향으로 순회
        for (let index = 1; index < next.length; index += 1) {
          // 현재 행이 선택되어 있고, 바로 직전(위) 행은 선택되지 않은 경우 서로 위치를 교환(Swap)
          if (selectedSet.has(next[index].id) && !selectedSet.has(next[index - 1].id)) {
            [next[index - 1], next[index]] = [next[index], next[index - 1]];
          }
        }
        return next;
      })
    );
  }, [getSelectedIds, reorderMovableRows]);

  /**
   * [맨 위로 이동] 선택된 가변 담보들을 가변 담보 리스트 내 최상단으로 정렬합니다.
   */
  const moveSelectedTop = React.useCallback(() => {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) return;

    const selectedSet = new Set(selectedIds);
    setRightRowData((prev) =>
      reorderMovableRows(prev, (movableRows) => {
        // 선택된 행들을 최상단에 두고, 선택되지 않은 행들을 뒤로 모아서 병합
        const selectedRows = movableRows.filter((row) => selectedSet.has(row.id));
        const unselectedRows = movableRows.filter((row) => !selectedSet.has(row.id));
        return [...selectedRows, ...unselectedRows];
      })
    );
  }, [getSelectedIds, reorderMovableRows]);

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      width: attributeColumnWidth(40),
      field: 'id',
      cellClass: 'text-center',
      spanRows: true,
    },
    {
      headerName: '대상이 되는 부위 또는 질병',
      flex: 1,
      field: 'field02',
      cellClass: 'text-left',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size={'lg'}>
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보순서변경
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ008)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="설계번호" variant="head" cols={['w-[1rem]', 'w-auto', 'w-[1rem]', 'w-auto']}>
              <FormRow className="grid grid-cols-[1fr_auto] w-full">
                <FormCell title={'상품명'} className="shrink-0" tdClassName="flex-1">
                  <Input value={'한화 시그니처 여성 검강보험 3.0 2504 '} readOnly />
                </FormCell>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={'quoteNo'} value={'LA123456789012'} readOnly />
                  -
                  <Input aria-label="" width={30} value={'1'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grow gap={3} placement="ss" className="w-full">
            {/* 좌측: 현재 순서 뷰 (수정 불가, 고정된 상태 비교용) */}
            <Gcol className="h-full p-[1.2rem]" gap={2.5} placement="ss" variant="box-line">
              <Grow>
                <Badge color="gray" size={'md'} variant={'rounded'}>
                  현재
                </Badge>
                <Typo tag={'strong'} variant={'heading-md'}>
                  가입설계 선택 담보
                </Typo>
              </Grow>
              <div className="ag-theme-alpine min-h-[27rem]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: false,
                    cellClass: 'text-center',
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                  animateRows={false}
                />
              </div>
            </Gcol>

            {/* 우측: 순서 변경 조작 뷰 (체크박스 선택 및 정렬 조작 가능) */}
            <Gcol
              className="h-full p-[1.2rem] bg-[#FFF7F4] border-[0.2rem] border-[#FFCCBE]"
              gap={1}
              placement="ss"
              variant="box-line"
            >
              <Grow placement="bwc">
                <Grow>
                  <Badge className="bg-[#FFE0E0] text-[#FF5C2E]" size={'md'} variant={'rounded'}>
                    변경
                  </Badge>
                  <Typo tag={'strong'} variant={'heading-md'}>
                    가입설계 선택 담보
                  </Typo>
                </Grow>
                {/* 상단 순서 조작 버튼 그룹 */}
                <Grow>
                  {/* 선택한 담보들을 가변 목록 내 맨 아래로 이동 */}
                  <Button color="gray-light" onClick={moveSelectedBottom} only="icon" size="md" variant="outlined">
                    <PageArrowDoubleIcon className="rotate-[270deg]" color={'#FF5C2E'} color2={'#FF5C2E'} />
                  </Button>
                  {/* 선택한 담보들을 가변 목록 내 한 칸 아래로 이동 */}
                  <Button color="gray-light" onClick={moveSelectedDownOne} only="icon" size="md" variant="outlined">
                    <PageArrowIcon className="rotate-[270deg]" color={'#FF5C2E'} />
                  </Button>
                  {/* 선택한 담보들을 가변 목록 내 한 칸 위로 이동 */}
                  <Button color="gray-light" onClick={moveSelectedUpOne} only="icon" size="md" variant="outlined">
                    <PageArrowIcon className="rotate-[90deg]" color={'#FF5C2E'} />
                  </Button>
                  {/* 선택한 담보들을 가변 목록 내 맨 위로 이동 */}
                  <Button color="gray-light" onClick={moveSelectedTop} only="icon" size="md" variant="outlined">
                    <PageArrowDoubleIcon className="rotate-[90deg]" color={'#FF5C2E'} color2={'#FF5C2E'} />
                  </Button>
                </Grow>
              </Grow>

              <div className="ag-theme-alpine min-h-[27rem]">
                <AgGridReact<DummyDataType>
                  // 그리드 마운트 완료 시, API 제어를 위해 ref에 Grid API 바인딩
                  onGridReady={(params) => {
                    rightGridApiRef.current = params.api;
                  }}
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rightRowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: false,
                    cellClass: 'text-center',
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                  // 다중 체크박스 선택 제어
                  rowSelection={{
                    mode: 'multiRow',
                    // [중요] 필수 고정 담보(isFixed: true)는 체크박스 노출 및 조작 불가 처리
                    checkboxes: (params) => !params.data?.isFixed,
                    hideDisabledCheckboxes: true, // 선택할 수 없는 행의 빈 체크박스 영역 숨김
                    enableClickSelection: false, // 일반 셀 클릭으로 자동 선택 방지 (오직 체크박스 클릭만 허용)
                    headerCheckbox: false, // 전체 선택 헤더 체크박스 미사용
                  }}
                  selectionColumnDef={{
                    headerName: '선택',
                    width: 30,
                    cellClass: 'text-center editable-cell',
                  }}
                  animateRows={false}
                />
              </div>
            </Gcol>
          </Grow>
          <Typo icon="info" variant="body-sm">
            담보명의 순서를 변경항 경우 <b className="text-bold">담보설계(LTRA350)과 고객에게 전달하는 출력물</b>에도
            담보 순서가 변경됩니다.
          </Typo>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                초기화
              </Button>
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

export default Ltpz008;
