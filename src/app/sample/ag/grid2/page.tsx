/**
 * @file AgGridFlgCdGroupSelection.tsx
 * @description flgCd 기반 그룹 연동 선택 컴포넌트
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  핵심 비즈니스 로직(community 기준 커스텀 구성)                          │
 * │  enterprise 버전의 경우 Row Grouping, Tree Data를 이용하여 손쉽게       │
 * │  structured hierarchical data를 이용할 수 있음                        │
 * │                                                                     │
 * │  [데이터 구조]                                                       │
 * │   - flgCd 01 : 일반 단독 행 (독립 선택)                               │
 * │   - flgCd 02 : 상세 행 — 평소엔 숨김, 03 선택 시 함께 노출               │
 * │   - flgCd 03 : 그룹 헤더 행 — 클릭 시 동일 Lvl1+Lvl2+Lvl3의 02 동반     │
 * │                                                                     │
 * │  [그룹 키]                                                           │
 * │   groupKey = `${lvl1}|${lvl2}|${lvl3}`                             │
 * │   → 동일 키를 가진 flgCd 02 행을 찾아 함께 처리                       │
 * │                                                                     │
 * │  [선택 흐름 — flgCd 03 클릭]                                         │
 * │   1. 해당 03 행의 groupKey 추출                                       │
 * │   2. rowData에서 동일 groupKey & flgCd==='02' 행 조회                │
 * │   3. 02 행들을 displayRows에 삽입 (03 바로 아래)                      │
 * │   4. 03 price = 02들의 price 합산으로 갱신                            │
 * │   5. 03 + 02 전체를 선택 상태로 지정                                  │
 * │                                                                     │
 * │  [선택 해제 흐름]                                                    │
 * │   - 03 또는 그 그룹의 02 중 하나라도 선택 해제되면                     │
 * │     → 같은 groupKey의 모든 02+03 선택 해제                            │
 * │     → 02 행들을 displayRows에서 제거 (숨김 복원)                      │
 * │     → 03 price를 원래 값으로 복원                                     │
 * │                                                                     │
 * │  [구현 포인트]                                                       │
 * │   - displayRows : 화면에 보이는 행 (rowData와 별도 관리)              │
 * │   - selectedGroupKeys : 현재 펼쳐진/선택된 그룹 Set                   │
 * │   - onSelectionChanged : AG Grid 이벤트로 해제 감지                   │
 * │   - applyTransaction   : 행 삽입/제거를 배치로 처리                   │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * @requires ag-grid-community ^35
 * @requires ag-grid-react     ^35
 */

'use client';

import {
  type CellValueChangedEvent,
  type CellClickedEvent,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type ICellRendererParams,
  type SelectionChangedEvent,
  AllCommunityModule,
  ModuleRegistry,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

// ─── 타입 ─────────────────────────────────────────────────────────────────────

/**
 * flgCd
 *  '01' — 일반 단독 행
 *  '02' — 그룹 상세 행 (숨김 → 03 선택 시 노출)
 *  '03' — 그룹 헤더 행 (클릭 트리거)
 */
type FlgCd = '01' | '02' | '03';

interface IRow {
  /** 행 고유 ID */
  id: number;
  flgCd: FlgCd;
  lvl1: string;
  lvl2: string;
  lvl3: string;
  itemName: string;
  price: number;
  /**
   * flgCd 03 전용 — 02 행 price 합산값을 표시할 때 덮어쓰는 필드.
   * 원래 가격 복원을 위해 originalPrice를 별도 보관.
   */
  originalPrice?: number;
  /** 화면 표시용 — flgCd 02는 들여쓰기 표현에 사용 */
  _isChild?: boolean;
}

// ─── 원본 마스터 데이터 ───────────────────────────────────────────────────────
/**
 * rawData : 모든 flgCd(01/02/03)를 포함한 원천 데이터.
 * 그리드에는 초기에 flgCd 01, 03만 표시한다.
 * flgCd 02는 rawData에만 존재하다가 03 선택 시 displayRows에 삽입된다.
 */
const RAW_DATA: IRow[] = [
  // ── flgCd 01 (단독) ──────────────────────────────────────────────────
  { id: 1, flgCd: '01', lvl1: 'A', lvl2: 'A1', lvl3: 'A1a', itemName: '독립 항목 A', price: 5000 },
  { id: 2, flgCd: '01', lvl1: 'B', lvl2: 'B1', lvl3: 'B1a', itemName: '독립 항목 B', price: 3000 },

  // ── 그룹 X (lvl1=X, lvl2=X1, lvl3=X1a) ─────────────────────────────
  // 03: 그룹 헤더
  { id: 10, flgCd: '03', lvl1: 'X', lvl2: 'X1', lvl3: 'X1a', itemName: '그룹 X 헤더', price: 0, originalPrice: 0 },
  // 02: 상세 (숨김)
  { id: 11, flgCd: '02', lvl1: 'X', lvl2: 'X1', lvl3: 'X1a', itemName: 'X 상세 1', price: 4000, _isChild: true },
  { id: 12, flgCd: '02', lvl1: 'X', lvl2: 'X1', lvl3: 'X1a', itemName: 'X 상세 2', price: 2500, _isChild: true },
  { id: 13, flgCd: '02', lvl1: 'X', lvl2: 'X1', lvl3: 'X1a', itemName: 'X 상세 3', price: 1800, _isChild: true },

  // ── 그룹 Y (lvl1=Y, lvl2=Y2, lvl3=Y2b) ─────────────────────────────
  { id: 20, flgCd: '03', lvl1: 'Y', lvl2: 'Y2', lvl3: 'Y2b', itemName: '그룹 Y 헤더', price: 0, originalPrice: 0 },
  { id: 21, flgCd: '02', lvl1: 'Y', lvl2: 'Y2', lvl3: 'Y2b', itemName: 'Y 상세 1', price: 7000, _isChild: true },
  { id: 22, flgCd: '02', lvl1: 'Y', lvl2: 'Y2', lvl3: 'Y2b', itemName: 'Y 상세 2', price: 3200, _isChild: true },

  // ── 그룹 Z (lvl1=Z, lvl2=Z3, lvl3=Z3c) ─────────────────────────────
  { id: 30, flgCd: '03', lvl1: 'Z', lvl2: 'Z3', lvl3: 'Z3c', itemName: '그룹 Z 헤더', price: 0, originalPrice: 0 },
  { id: 31, flgCd: '02', lvl1: 'Z', lvl2: 'Z3', lvl3: 'Z3c', itemName: 'Z 상세 1', price: 9000, _isChild: true },
  { id: 32, flgCd: '02', lvl1: 'Z', lvl2: 'Z3', lvl3: 'Z3c', itemName: 'Z 상세 2', price: 5500, _isChild: true },
  { id: 33, flgCd: '02', lvl1: 'Z', lvl2: 'Z3', lvl3: 'Z3c', itemName: 'Z 상세 3', price: 2100, _isChild: true },
  { id: 34, flgCd: '02', lvl1: 'Z', lvl2: 'Z3', lvl3: 'Z3c', itemName: 'Z 상세 4', price: 600, _isChild: true },
];

// ─── 유틸 ─────────────────────────────────────────────────────────────────────

/**
 * groupKey 생성 함수.
 * lvl1, lvl2, lvl3 세 값을 파이프로 이어 유니크 키를 만든다.
 * 같은 키를 가진 flgCd 02/03 행이 한 그룹을 구성한다.
 */
const makeGroupKey = (r: Pick<IRow, 'lvl1' | 'lvl2' | 'lvl3'>) =>
  `${r.lvl1}|${r.lvl2}|${r.lvl3}`;

/** 초기 displayRows: flgCd 01 + 03만 포함 */
const makeInitialDisplayRows = (): IRow[] =>
  RAW_DATA.filter(r => r.flgCd === '01' || r.flgCd === '03').map(r => ({ ...r }));

// ─── 셀 렌더러 ────────────────────────────────────────────────────────────────

/**
 * @cellRenderer FlgCdBadge
 * flgCd 값에 따라 색상 배지를 렌더링한다.
 * 문자열 반환 시 AG Grid React에서 이스케이프되므로 반드시 JSX 컴포넌트를 사용한다.
 */
const FlgCdBadge = ({ value }: ICellRendererParams<IRow, FlgCd>) => {
  const map: Record<FlgCd, { bg: string; color: string; label: string }> = {
    '01': { bg: '#E6F1FB', color: '#0C447C', label: '01 일반' },
    '02': { bg: '#FAEEDA', color: '#633806', label: '02 상세' },
    '03': { bg: '#EAF3DE', color: '#27500A', label: '03 헤더' },
  };
  const style = map[value as FlgCd] ?? map['01'];
  return (
    <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 500, background: style.bg, color: style.color }}>
      {style.label}
    </span>
  );
};

/**
 * @cellRenderer ItemNameCell
 * flgCd 02 행은 들여쓰기(12px 좌측 패딩 + 작은 인디케이터)를 추가해
 * 시각적으로 하위 행임을 표현한다.
 */
const ItemNameCell = ({ value, data }: ICellRendererParams<IRow, string>) => (
  <span style={{ paddingLeft: data?._isChild ? 20 : 0, display: 'flex', alignItems: 'center', gap: 6 }}>
    {data?._isChild && (
      <span style={{ width: 6, height: 6, borderRadius: 99, background: '#EF9F27', flexShrink: 0 }} />
    )}
    {value}
  </span>
);

/**
 * @cellRenderer PriceCell
 * flgCd 03 행의 price는 02 합산값이므로 굵게 표시.
 */
const PriceCell = ({ value, data }: ICellRendererParams<IRow, number>) => (
  <span style={{ fontWeight: data?.flgCd === '03' ? 500 : 400 }}>
    {value != null ? `₩${value.toLocaleString()}` : '-'}
  </span>
);

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function AgGridFlgCdGroupSelection() {
  const gridApiRef = useRef<GridApi<IRow> | null>(null);

  /**
   * displayRows: 그리드에 실제로 표시되는 행 목록.
   * rawData와 분리해서 관리하며, 03 선택 시 해당 그룹의 02 행을 동적으로 삽입/제거한다.
   */
  const [displayRows, setDisplayRows] = useState<IRow[]>(makeInitialDisplayRows);

  /**
   * snapshotPrice: "합계 계산" 버튼 클릭 시점의 선택 행(01·03) price 합계.
   * 자동 갱신하지 않고 버튼 클릭 시에만 gridApiRef에서 읽어 계산한다.
   */
  const [snapshotPrice, setSnapshotPrice] = useState<number | null>(null);

  /**
   * selectedGroupKeys: 현재 "펼쳐진 + 선택된" 그룹의 키 Set.
   * 이 Set에 키가 있으면 해당 그룹의 02 행이 displayRows에 포함된 상태다.
   */
  const selectedGroupKeysRef = useRef<Set<string>>(new Set());

  /**
   * isHandlingSelection: onSelectionChanged 재진입 방지 플래그.
   * applyTransaction/setSelected 호출이 다시 onSelectionChanged를 트리거하는 것을 막는다.
   */
  const isHandlingRef = useRef(false);


  // ─── expandGroup ──────────────────────────────────────────────────────────

  /**
   * @function expandGroup
   * 03 체크박스 선택 또는 행 클릭으로 그룹을 펼칠 때 호출.
   *
   * [설계 원칙]
   * - setDisplayRows로 02 행을 삽입한 뒤 React 리렌더가 완료되어야
   *   AG Grid 노드가 생성된다. 따라서 02 노드 선택은 리렌더 후 실행해야 한다.
   * - isHandlingRef를 true로 유지하는 동안 onSelectionChanged 재진입을 막는다.
   * - setTimeout 콜백 안에서만 isHandlingRef = false 로 해제해
   *   노드 선택 완료 후 비로소 외부 이벤트를 다시 받아들인다.
   */
  const expandGroup = useCallback((key: string, headerRow: IRow) => {
    const api = gridApiRef.current;
    if (!api) return;
    if (selectedGroupKeysRef.current.has(key)) return;

    isHandlingRef.current = true;
    selectedGroupKeysRef.current.add(key);

    const childRows = RAW_DATA.filter(r => r.flgCd === '02' && makeGroupKey(r) === key);
    const childSum = childRows.reduce((sum, r) => sum + r.price, 0);

    /**
     * applyTransaction은 AG Grid 내부에서 동기적으로 처리된다.
     *   트랜잭션 호출이 끝난 즉시 노드가 존재하므로
     *   바로 다음 줄에서 forEachNode로 선택할 수 있다.
     *
     * addIndex: 03 행의 현재 rowIndex + 1 위치에 02 행들을 삽입한다.
     *   getRowNode로 03 노드를 찾아 rowIndex를 읽는다.
     */
    const headerNode = api.getRowNode(String(headerRow.id));
    const insertIndex = headerNode?.rowIndex != null ? headerNode.rowIndex + 1 : undefined;

    // 1. 02 행 삽입 (동기)
    api.applyTransaction({ add: childRows, addIndex: insertIndex });

    // 2. 03 행 price 갱신 (동기)
    api.applyTransaction({ update: [{ ...headerRow, price: childSum }] });

    // 3. displayRows도 동기화 (React state — UI 요약 패널 등 외부 참조용)
    setDisplayRows(prev => {
      const next = [...prev];
      const alreadyInserted = next.some(r => r.flgCd === '02' && makeGroupKey(r) === key);
      if (!alreadyInserted) {
        const idx = next.findIndex(r => r.id === headerRow.id);
        next.splice(idx + 1, 0, ...childRows);
      }
      return next.map(r =>
        r.flgCd === '03' && makeGroupKey(r) === key ? { ...r, price: childSum } : r
      );
    });

    /**
     * 4. 노드 선택 — applyTransaction 직후 즉시 실행 가능
     *    트랜잭션은 동기 처리이므로 이 시점에 02 노드가 이미 그리드에 존재한다.
     *    setTimeout이 불필요하다.
     */
    api.forEachNode(node => {
      if (!node.data) return;
      if (
        makeGroupKey(node.data) === key &&
        (node.data.flgCd === '02' || node.data.flgCd === '03')
      ) {
        node.setSelected(true, false, 'api');
      }
    });

    /**
     * expandGroup 완료 후 선택 합계 보정.
     * onSelectionChanged는 isHandlingRef=true 구간에서 차단되므로
     * 여기서 직접 최종 선택 행 기준으로 재계산한다.
     * flgCd 02는 03 price에 포함되어 있으므로 제외한다.
     */
    isHandlingRef.current = false;
  }, []);

  // ─── collapseGroup ────────────────────────────────────────────────────────

  /**
   * @function collapseGroup
   * 03 또는 02 체크박스 해제 시 해당 그룹 전체를 닫는다.
   *
   * [설계 원칙]
   * - 노드 선택 해제(setSelected)와 displayRows 정리를 분리해서 처리한다.
   * - setSelected 호출은 동기적으로 즉시 완료된다.
   * - setDisplayRows는 비동기 리렌더를 유발하므로 isHandlingRef 해제는
   *   setSelected 완료 직후에 수행한다 (displayRows 변경 완료를 기다리지 않아도 됨).
   */
  const collapseGroup = useCallback((key: string) => {
    const api = gridApiRef.current;
    if (!api) return;

    isHandlingRef.current = true;

    // 1. 그룹 노드 선택 해제 (동기)
    api.forEachNode(node => {
      if (!node.data) return;
      if (
        makeGroupKey(node.data) === key &&
        (node.data.flgCd === '02' || node.data.flgCd === '03')
      ) {
        node.setSelected(false, false, 'api');
      }
    });

    // 2. 02 행 수집 — applyTransaction remove 대상
    const childRowsToRemove: IRow[] = [];
    api.forEachNode(node => {
      if (node.data && node.data.flgCd === '02' && makeGroupKey(node.data) === key) {
        childRowsToRemove.push(node.data);
      }
    });

    // 3. 03 price 복원 대상 조회
    let headerData: IRow | undefined;
    api.forEachNode(node => {
      if (node.data && node.data.flgCd === '03' && makeGroupKey(node.data) === key) {
        headerData = node.data;
      }
    });

    /**
     * applyTransaction({ remove })는 AG Grid 내부에서 동기적으로
     * 노드를 제거하므로 이후 forEachNode 결과가 즉시 반영된다.
     */
    if (childRowsToRemove.length > 0) {
      api.applyTransaction({ remove: childRowsToRemove });
    }
    if (headerData) {
      api.applyTransaction({ update: [{ ...headerData, price: headerData.originalPrice ?? 0 }] });
    }

    selectedGroupKeysRef.current.delete(key);
    isHandlingRef.current = false;

    /**
     * collapseGroup 완료 후 선택 합계 보정.
     * 그룹 해제 후 남은 선택 행 기준으로 재계산한다.
     */
    // 4. displayRows도 동기화 (React state — 외부 참조용)
    setDisplayRows(prev =>
      prev
        .filter(r => !(r.flgCd === '02' && makeGroupKey(r) === key))
        .map(r =>
          r.flgCd === '03' && makeGroupKey(r) === key
            ? { ...r, price: r.originalPrice ?? 0 }
            : r
        )
    );
  }, []);

  // ─── onSelectionChanged ───────────────────────────────────────────────────

  /**
   * @event onSelectionChanged
   * 체크박스 조작 시 진입하는 단일 처리 경로.
   *
   * [A] 새로 선택된 03 → expandGroup (02 노출 + 전체 선택)
   * [B] 펼쳐진 그룹 중 03 또는 02가 해제됨 → collapseGroup
   *
   * isHandlingRef가 true인 동안에는 재진입 차단.
   */
  const onSelectionChanged = useCallback((event: SelectionChangedEvent<IRow>) => {
    if (isHandlingRef.current) return;

    const api = event.api;
    const selectedRows = api.getSelectedRows();
    const selectedIds = new Set(selectedRows.map(r => r.id));

    // [A] 새로 선택된 03 중 미확장 그룹
    const keysToExpand: Array<{ key: string; row: IRow }> = [];
    selectedRows.forEach(r => {
      if (r.flgCd !== '03') return;
      const key = makeGroupKey(r);
      if (!selectedGroupKeysRef.current.has(key)) {
        keysToExpand.push({ key, row: r });
      }
    });

    // [B] 펼쳐진 그룹 중 선택이 깨진 그룹
    const keysToCollapse: string[] = [];
    selectedGroupKeysRef.current.forEach(key => {
      let broken = false;
      api.forEachNode(node => {
        if (!node.data || broken) return;
        if (makeGroupKey(node.data) !== key) return;
        if (
          (node.data.flgCd === '03' || node.data.flgCd === '02') &&
          !selectedIds.has(node.data.id)
        ) {
          broken = true;
        }
      });
      if (broken) keysToCollapse.push(key);
    });

    keysToCollapse.forEach(key => collapseGroup(key));
    keysToExpand.forEach(({ key, row }) => expandGroup(key, row));
  }, [collapseGroup, expandGroup]);

  // ─── onCellClicked ────────────────────────────────────────────────────────

  /**
   * @handler onCellClicked
   * price 컬럼(01·02)을 단일 클릭하면 즉시 편집 모드를 시작한다.
   * 다른 컬럼 클릭은 아무 액션도 하지 않는다.
   * singleClickEdit prop과 달리 컬럼별로 편집 활성화 여부를 제어할 수 있다.
   */
  const onCellClicked = useCallback((event: CellClickedEvent<IRow>) => {
    if (event.colDef.field !== 'price') return;
    if (event.data?.flgCd !== '01' && event.data?.flgCd !== '02') return;
    event.api.startEditingCell({
      rowIndex: event.rowIndex!,
      colKey: 'price',
    });
  }, []);

  // ─── onCellValueChanged ──────────────────────────────────────────────────

  /**
   * @event onCellValueChanged
   * flgCd 01, 02 행의 price 셀 편집 완료 시 호출된다.
   *
   * [flgCd 02 price 수정 시]
   *  해당 행의 groupKey로 동일 그룹의 모든 02 행 price를 합산하고,
   *  displayRows 내 03 행의 price를 재갱신한다.
   *  → 선택된 상태에서 02 price를 수정하면 03 합산이 실시간으로 반영된다.
   *
   * [flgCd 01 price 수정 시]
   *  독립 행이므로 별도 처리 없이 AG Grid 기본 값 갱신으로 완료된다.
   */
  const onCellValueChanged = useCallback((event: CellValueChangedEvent<IRow>) => {
    if (event.colDef.field !== 'price') return;
    if (event.data.flgCd !== '02') return;

    const key = makeGroupKey(event.data);

    /**
     * displayRows 내 최신 02 행 price를 모두 합산한다.
     * 수정된 행은 AG Grid가 이미 내부 값을 갱신했으므로 event.data.price가 새 값이다.
     * setDisplayRows로 03 행 price만 덮어쓴다.
     */
    setDisplayRows(prev => {
      const childSum = prev
        .filter(r => r.flgCd === '02' && makeGroupKey(r) === key)
        .reduce((sum, r) => {
          // 방금 편집된 행은 event.data.price(최신값)를 사용
          return sum + (r.id === event.data.id ? (event.newValue as number) : r.price);
        }, 0);

      return prev.map(r => {
        if (r.flgCd === '03' && makeGroupKey(r) === key) {
          return { ...r, price: childSum };
        }
        return r;
      });
    });
  }, []);

  // ─── 합계 계산 버튼 핸들러 ──────────────────────────────────────────────────

  /**
   * @handler handleCalcPrice
   * 버튼 클릭 시점에 gridApiRef에서 선택 행을 읽어 스냅샷을 찍는다.
   * 자동 갱신 없이 버튼을 눌렀을 때만 값이 반영된다.
   * flgCd 02는 03 price에 포함되어 있으므로 합산에서 제외한다.
   */
  const handleCalcPrice = useCallback(() => {
    const rows = gridApiRef.current?.getSelectedRows() ?? [];
    const price = rows
      .filter(r => r.flgCd === '01' || r.flgCd === '03')
      .reduce((acc, r) => acc + r.price, 0);
    setSnapshotPrice(price);
  }, []);

  // ─── onGridReady ──────────────────────────────────────────────────────────

  const onGridReady = useCallback((e: GridReadyEvent<IRow>) => {
    gridApiRef.current = e.api;
  }, []);

  // ─── 컬럼 정의 ────────────────────────────────────────────────────────────

  const [colDefs] = useState<ColDef<IRow>[]>([
    {
      field: 'flgCd',
      headerName: 'flgCd',
      width: 110,
      cellRenderer: FlgCdBadge,
    },
    { field: 'lvl1', headerName: 'Lvl1', width: 70 },
    { field: 'lvl2', headerName: 'Lvl2', width: 70 },
    { field: 'lvl3', headerName: 'Lvl3', width: 80 },
    {
      field: 'itemName',
      headerName: '항목명',
      flex: 1,
      cellRenderer: ItemNameCell,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      cellRenderer: PriceCell,
      /**
       * flgCd 01, 02 행만 편집 가능하도록 editable을 함수로 설정한다.
       * flgCd 03은 02 합산값이 자동으로 채워지므로 직접 편집을 막는다.
       *
       * editable: (params) => boolean
       * params.data.flgCd 로 현재 행의 flgCd를 확인한다.
       */
      editable: (params) => params.data?.flgCd === '01' || params.data?.flgCd === '02',
      /**
       * 편집 완료 후 표시 형식을 맞추기 위해 valueParser로 입력값을 숫자로 변환한다.
       * valueParser 없이 편집하면 입력값이 문자열로 저장되어 합산 계산이 깨진다.
       */
      valueParser: (params) => {
        const parsed = Number(params.newValue);
        return isNaN(parsed) ? params.oldValue : parsed;
      },
    },
  ]);

  // ─── 행 스타일 ────────────────────────────────────────────────────────────

  /**
   * @prop getRowStyle
   * flgCd에 따라 행 배경색을 구분한다.
   *  - 03 : 연한 초록 (그룹 헤더 강조)
   *  - 02 : 연한 주황 (하위 행 구분)
   *  - 01 : 기본
   */
  const getRowStyle = useCallback((params: { data?: IRow }) => {
    if (params.data?.flgCd === '03') return { background: '#f0f9eb' };
    if (params.data?.flgCd === '02') return { background: '#fffbf2' };
    return undefined;
  }, []);

  // ─── 렌더 ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-4">

        {/* 설명 카드 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
          <h1 className="text-lg font-medium text-gray-800">flgCd 그룹 연동 선택</h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-800">01 — 단독 행 (독립 선택)</span>
            <span className="px-2 py-1 rounded-full bg-green-50 text-green-800">03 — 그룹 헤더 (클릭 시 02 노출)</span>
            <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-800">02 — 상세 행 (03 선택 시 표시)</span>
          </div>
          <p className="text-xs text-gray-500">
            체크박스 클릭으로만 선택됩니다. (행 클릭은 선택에 영향 없음)
            03 체크박스 선택 → 동일 Lvl1/Lvl2/Lvl3의 02 행이 펼쳐지며 함께 선택됩니다.
            02 체크박스 해제 → 해당 그룹의 모든 02·03 선택이 함께 해제됩니다.
            한번 선택된 행은 체크박스로 해제할 수 없습니다.
            01·02 행의 Price 셀을 클릭하면 즉시 편집 모드로 진입합니다.
          </p>
        </div>

        {/* Price 합계 패널 — 버튼 클릭 시 선택 합계 스냅샷 반영 */}
        <PriceSummary
          displayRows={displayRows}
          snapshotPrice={snapshotPrice}
          onCalc={handleCalcPrice}
        />

        {/* 그리드 */}
        <div style={{ height: 480 }}>
          <AgGridReact<IRow>
            rowData={displayRows}
            columnDefs={colDefs}
            /**
             * rowSelection
             * - mode: 'multiRow'          다중 행 선택
             * - checkboxes: true          체크박스 표시
             * - headerCheckbox: false     헤더 전체선택 제거 (그룹 로직 충돌 방지)
             * - enableClickSelection: false  행 클릭으로 선택 변경 불가
             *                               체크박스 클릭으로만 선택/해제
             */
            rowSelection={{
              mode: 'multiRow',
              checkboxes: true,
              headerCheckbox: false,
              enableClickSelection: false,
            }}
            animateRows
            getRowStyle={getRowStyle}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            /**
             * onCellClicked
             * price 컬럼(01·02)을 클릭하면 즉시 편집 모드 진입.
             * 다른 셀 클릭은 아무 액션도 없음.
             */
            onCellClicked={onCellClicked}
            /**
             * onCellValueChanged
             * flgCd 02 price 편집 완료 시 동일 그룹 03 price 재합산.
             */
            onCellValueChanged={onCellValueChanged}
            /**
             * getRowId
             * applyTransaction 행 동일성 판단 기준.
             * 없으면 update/remove 시 #5 오류 발생.
             */
            getRowId={params => String(params.data.id)}
          />
        </div>
      </div>
    </div>
  );
}

// ─── 합계 패널 ───────────────────────────────────────────────────────────────

/**
 * @component PriceSummary
 * 전체 행 합계(01·03)와 버튼 클릭 시점의 선택 합계(스냅샷)를 표시한다.
 *
 * [선택 합계 설계]
 * 자동 갱신 없이 "합계 계산" 버튼 클릭 시에만 gridApiRef에서 읽어 스냅샷을 찍는다.
 * snapshotPrice가 null이면 아직 버튼을 누르지 않은 상태임을 표시한다.
 */
function PriceSummary({
  displayRows,
  snapshotPrice,
  onCalc,
}: {
  displayRows: IRow[];
  snapshotPrice: number | null;
  onCalc: () => void;
}) {
  const sum = displayRows
    .filter(r => r.flgCd === '01' || r.flgCd === '03')
    .reduce((s, r) => s + r.price, 0);

  const fmt = (n: number) => `₩${n.toLocaleString()}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Price 합계</p>
      <div className="grid grid-cols-1">
        {/* 선택 합계 — 버튼 클릭 시 스냅샷 */}
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-600 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-1.5" />
            합계
          </p>
          <p className="text-base font-medium text-blue-800 font-mono">
            {snapshotPrice !== null ? fmt(snapshotPrice) : '—'}
          </p>
          <p className="text-xs text-blue-400 mt-0.5">선택된 01·03 기준</p>
        </div>
        <div className="mt-3">

          {/**
           * 합계 계산 버튼
           * 클릭 시 handleCalcPrice → gridApiRef.getSelectedRows() 읽어 스냅샷 저장
           * 자동 갱신 없이 이 버튼을 눌렀을 때만 값이 반영된다
           */}
          <button
            onClick={onCalc}
            className="mt-2 w-full text-xs px-2 py-1.5 rounded-md bg-blue-400 text-white hover:bg-blue-600 active:scale-95 transition-all"
          >
            합계 계산
          </button>
        </div>
      </div>
    </div>
  );
}