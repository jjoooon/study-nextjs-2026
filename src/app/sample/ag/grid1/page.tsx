/**
 * @file AgGridExternalActions.tsx
 * @description AG Grid 외부 액션 제어 샘플 컴포넌트
 *
 * 이 파일은 AG Grid를 React 외부(버튼/입력 UI)에서 프로그래밍 방식으로
 * 제어하는 모든 주요 패턴을 한 곳에 모아 놓은 레퍼런스 예제입니다.
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │  지원 액션 목록                                               │
 * │                                                              │
 * │  [행 조작]                                                   │
 * │   1. addRow()             — 새 행 추가 (applyTransaction)    │
 * │   2. deleteSelectedRows() — 선택 행 삭제                     │
 * │   3. duplicateSelected()  — 선택 행 복제                     │
 * │   4. moveRowUp/Down()     — 행 순서 이동 (rowDragManaged)    │
 * │                                                              │
 * │  [셀 편집]                                                   │
 * │   5. setCellValue()       — 외부 입력으로 셀 값 변경         │
 * │   6. startEditingCell()   — 특정 셀 인라인 편집 시작         │
 * │   7. stopEditing()        — 편집 종료 & 저장                 │
 * │   8. onCellDoubleClick    — 더블클릭 편집 이벤트 핸들링      │
 * │                                                              │
 * │  [선택 & 포커스]                                             │
 * │   9.  selectAll()         — 전체 행 선택                     │
 * │   10. deselectAll()       — 선택 해제                        │
 * │   11. selectFirstRow()    — 첫 번째 행 선택                  │
 * │   12. selectLastRow()     — 마지막 행 선택                   │
 * │   13. focusCell()         — 특정 셀로 포커스 이동            │
 * │                                                              │
 * │  [정렬]                                                      │
 * │   14. sortColumn()        — 특정 컬럼 정렬 (asc/desc)       │
 * │   15. clearSort()         — 모든 정렬 초기화                 │
 * │                                                              │
 * │  [필터]                                                      │
 * │   16. setQuickFilter()    — 전체 텍스트 빠른 필터            │
 * │   17. setColumnFilter()   — 특정 컬럼 필터 설정              │
 * │   18. clearAllFilters()   — 모든 필터 초기화                 │
 * │                                                              │
 * │  [컬럼 제어]                                                 │
 * │   19. toggleColumnVisible() — 컬럼 표시/숨김 토글            │
 * │   20. pinColumn()           — 컬럼 고정 (left/right/null)   │
 * │   21. autoSizeColumns()     — 컬럼 너비 자동 조정            │
 * │                                                              │
 * │  [데이터 & 뷰]                                               │
 * │   22. refreshData()       — 전체 데이터 리프레시             │
 * │   23. exportDataAsCsv()   — CSV 내보내기                     │
 * │   24. scrollToRow()       — 특정 행으로 스크롤               │
 * │   25. scrollToTop/Bottom()— 그리드 최상단/최하단 스크롤      │
 * │                                                              │
 * │  [이벤트 콜백]                                               │
 * │   26. onGridReady         — 그리드 초기화 완료               │
 * │   27. onRowClicked        — 행 클릭                          │
 * │   28. onSelectionChanged  — 선택 변경                        │
 * │   29. onCellValueChanged  — 셀 값 변경                       │
 * │   30. onSortChanged       — 정렬 변경                        │
 * │   31. onFilterChanged     — 필터 변경                        │
 * └──────────────────────────────────────────────────────────────┘
 *
 * @requires ag-grid-community ^35
 * @requires ag-grid-react      ^35
 */

'use client';

import {
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type ICellRendererParams,
  type RowClickedEvent,
  type SelectionChangedEvent,
  type CellValueChangedEvent,
  type SortChangedEvent,
  type FilterChangedEvent,
  AllCommunityModule,
  ModuleRegistry,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';

// ─── 모듈 등록 ────────────────────────────────────────────────────────────────
ModuleRegistry.registerModules([AllCommunityModule]);

// ─── 타입 정의 ────────────────────────────────────────────────────────────────
interface IRow {
  id: number;
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

interface EventLog {
  ts: string;
  event: string;
  detail: string;
}

// ─── 셀 렌더러 컴포넌트 ───────────────────────────────────────────────────────
/**
 * @cellRenderer ElectricBadge
 * AG Grid React에서 cellRenderer에 HTML 문자열을 반환하면
 * 보안상 이스케이프 처리되어 태그가 그대로 텍스트로 출력됩니다.
 * 반드시 React 컴포넌트(함수)를 사용해야 JSX가 정상 렌더링됩니다.
 *
 * ColDef의 cellRenderer에는 아래 세 가지 방식이 모두 유효합니다.
 *   1. (p: ICellRendererParams) => <JSX />   ← 인라인 함수형
 *   2. React.FC<ICellRendererParams>         ← 별도 선언 컴포넌트 (권장)
 *   3. class extends Component               ← 클래스형 (레거시)
 */
/**
 * @cellRenderer ElectricBadge
 * field: 'electric' + boolean 원본값을 받는 원래 렌더러.
 * Enterprise(agSetColumnFilter) 환경에서 사용.
 * Community 환경에서는 valueGetter로 문자열을 반환하므로
 * ElectricBadgeCommunity를 사용한다.
 */
const ElectricBadge = ({ value }: ICellRendererParams<IRow, boolean>) => (
  <span
    style={{
      padding: '2px 8px',
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 500,
      background: value ? '#EAF3DE' : '#F1EFE8',
      color: value ? '#3B6D11' : '#5F5E5A',
    }}
  >
    {value ? '전기차' : '내연기관'}
  </span>
);

/**
 * @cellRenderer ElectricBadgeCommunity
 * valueGetter 사용 시 value가 string('전기차'|'내연기관')으로 전달된다.
 * agTextColumnFilter + valueGetter 조합(Community 전용)에서 사용한다.
 *
 * valueGetter로 field를 대체하면 agTextColumnFilter가
 * valueGetter 반환 문자열을 비교 대상으로 사용해
 * setColumnFilterModel({ filter: '전기차' }) 가 정상 동작한다.
 */
const ElectricBadgeCommunity = ({ value }: ICellRendererParams<IRow, string>) => {
  const isElectric = value === '전기차';
  return (
    <span
      style={{
        padding: '2px 8px',
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 500,
        background: isElectric ? '#EAF3DE' : '#F1EFE8',
        color: isElectric ? '#3B6D11' : '#5F5E5A',
      }}
    >
      {value}
    </span>
  );
};

// ─── 초기 데이터 ──────────────────────────────────────────────────────────────
const INITIAL_ROWS: IRow[] = [
  { id: 1, make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { id: 2, make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { id: 3, make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  { id: 4, make: 'BMW', model: 'i4', price: 57995, electric: true },
  { id: 5, make: 'Hyundai', model: 'IONIQ 6', price: 39450, electric: true },
  { id: 6, make: 'Honda', model: 'Civic', price: 25000, electric: false },
];

let nextId = 7;

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function AgGridExternalActions() {
  // gridApi ref: 외부 액션의 핵심 — onGridReady에서 저장 후 어디서든 호출 가능
  const gridApiRef = useRef<GridApi<IRow> | null>(null);

  const [rowData, setRowData] = useState<IRow[]>(INITIAL_ROWS);
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [editField, setEditField] = useState<keyof IRow>('make');
  const [editValue, setEditValue] = useState('');
  const [quickFilter, setQuickFilter] = useState('');

  /** 이벤트 로그를 상단에 추가 */
  const addLog = useCallback((event: string, detail: string) => {
    const now = new Date();
    const ts = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(n => String(n).padStart(2, '0'))
      .join(':');
    setLogs(prev => [{ ts, event, detail }, ...prev].slice(0, 50));
  }, []);

  // ────────────────────────────────────────────────────────────────────────────
  // 26. onGridReady — 그리드 준비 완료 시 GridApi 저장
  // ────────────────────────────────────────────────────────────────────────────
  /**
   * @event onGridReady
   * AG Grid가 DOM에 완전히 마운트되면 호출됩니다.
   * `event.api`를 ref에 저장해 두면 이후 모든 외부 액션에서 사용할 수 있습니다.
   */
  const onGridReady = useCallback((event: GridReadyEvent<IRow>) => {
    gridApiRef.current = event.api;
    addLog('gridReady', 'GridApi 저장 완료');
  }, [addLog]);

  // ────────────────────────────────────────────────────────────────────────────
  // 행 조작
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * @action addRow
   * @method api.applyTransaction({ add: [newRow] })
   * 새 행을 그리드 끝에 추가합니다.
   * `applyTransaction`은 추가/수정/삭제를 한 번에 처리할 수 있는 배치 API입니다.
   */
  const addRow = useCallback(() => {
    const makes = ['Kia', 'Volvo', 'Rivian', 'Lucid', 'Audi'];
    const models = ['EV6', 'XC90', 'R1T', 'Air', 'e-tron'];
    const i = Math.floor(Math.random() * makes.length);
    const newRow: IRow = {
      id: nextId++,
      make: makes[i],
      model: models[i],
      price: Math.round(30000 + Math.random() * 60000),
      electric: Math.random() > 0.4,
    };
    gridApiRef.current?.applyTransaction({ add: [newRow] });
    setRowData(prev => [...prev, newRow]);
    addLog('rowAdded', `make=${newRow.make} model=${newRow.model} price=${newRow.price}`);
  }, [addLog]);

  /**
   * @action deleteSelectedRows
   * @method api.applyTransaction({ remove: selectedRows })
   * 현재 선택된 행들을 삭제합니다.
   * `getSelectedRows()`로 선택 데이터를 가져온 뒤 transaction으로 제거합니다.
   */
  const deleteSelectedRows = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const selected = api.getSelectedRows();
    if (!selected.length) { addLog('deleteSelected', '선택된 행 없음'); return; }
    api.applyTransaction({ remove: selected });
    setRowData(prev => prev.filter(r => !selected.some(s => s.id === r.id)));
    addLog('rowDeleted', `${selected.length}개 행 삭제`);
  }, [addLog]);

  /**
   * @action duplicateSelected
   * @method api.applyTransaction({ add: duplicates })
   * 선택된 행을 새 id로 복제해 그리드 끝에 추가합니다.
   */
  const duplicateSelected = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const selected = api.getSelectedRows();
    if (!selected.length) { addLog('duplicate', '선택된 행 없음'); return; }
    const copies = selected.map(r => ({ ...r, id: nextId++ }));
    api.applyTransaction({ add: copies });
    setRowData(prev => [...prev, ...copies]);
    addLog('rowDuplicated', `${copies.length}개 행 복제`);
  }, [addLog]);

  // ────────────────────────────────────────────────────────────────────────────
  // 셀 편집
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * @action setCellValue (applyTransaction update)
   * @method api.applyTransaction({ update: [updatedRow] })
   * 외부 입력값을 선택된 행의 특정 필드에 반영합니다.
   * 불변 객체 패턴: 기존 행 객체를 스프레드로 복사 후 해당 필드만 교체합니다.
   */
  const setCellValue = useCallback(() => {
    const api = gridApiRef.current;
    if (!api || !editValue) return;
    const selected = api.getSelectedRows();
    if (!selected.length) { addLog('setCellValue', '선택된 행 없음'); return; }
    const updated = selected.map(r => ({
      ...r,
      [editField]: editField === 'price' ? Number(editValue) : editValue,
    }));
    api.applyTransaction({ update: updated });
    setRowData(prev => prev.map(r => {
      const u = updated.find(u => u.id === r.id);
      return u ?? r;
    }));
    setEditValue('');
    addLog('cellValueChanged', `field=${String(editField)} value=${editValue} 대상: ${selected.length}행`);
  }, [addLog, editField, editValue]);

  /**
   * @action startEditingCell
   * @method api.startEditingCell({ rowIndex, colKey })
   * 프로그래밍 방식으로 특정 셀의 인라인 편집 모드를 시작합니다.
   * 컬럼 정의에 `editable: true`가 설정되어 있어야 동작합니다.
   */
  const startEditingCell = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const node = api.getSelectedNodes()[0];
    if (!node) { addLog('startEditing', '선택된 행 없음'); return; }
    api.startEditingCell({ rowIndex: node.rowIndex!, colKey: String(editField) });
    addLog('editingStarted', `rowIndex=${node.rowIndex} field=${String(editField)}`);
  }, [addLog, editField]);

  /**
   * @action stopEditing
   * @method api.stopEditing()
   * 현재 활성화된 인라인 편집을 종료하고 값을 확정합니다.
   * `true`를 전달하면 변경사항을 취소(cancel)합니다.
   */
  const stopEditing = useCallback((cancel = false) => {
    gridApiRef.current?.stopEditing(cancel);
    addLog('editingStopped', cancel ? '편집 취소' : '편집 저장');
  }, [addLog]);

  // ────────────────────────────────────────────────────────────────────────────
  // 선택 & 포커스
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * @action selectAll
   * @method api.selectAll()
   * 필터링된 행을 포함한 모든 행을 선택합니다.
   * (필터 적용 시 보이는 행만 선택하려면 `selectAllFiltered()` 사용)
   */
  const selectAll = useCallback(() => {
    gridApiRef.current?.selectAll();
    addLog('selectAll', '전체 행 선택');
  }, [addLog]);

  /**
   * @action deselectAll
   * @method api.deselectAll()
   * 선택된 모든 행의 선택을 해제합니다.
   */
  const deselectAll = useCallback(() => {
    gridApiRef.current?.deselectAll();
    addLog('deselectAll', '선택 전체 해제');
  }, [addLog]);

  /**
   * @action selectFirstRow
   * @method node.setSelected(true)
   * rowIndex 0번 노드를 찾아 선택합니다.
   * `api.getDisplayedRowAtIndex(0)`으로 렌더된 첫 번째 행에 접근합니다.
   */
  const selectFirstRow = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const node = api.getDisplayedRowAtIndex(0);
    if (node) {
      api.deselectAll(); node.setSelected(true);
      api.setFocusedCell(node.rowIndex!, 'make');
    }
    addLog('selectFirst', `id=${node?.data?.id}`);
  }, [addLog]);

  /**
   * @action selectLastRow
   * @method api.getDisplayedRowCount() + getDisplayedRowAtIndex(last)
   * 현재 표시된 마지막 행을 선택합니다.
   */
  const selectLastRow = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const count = api.getDisplayedRowCount();
    const node = api.getDisplayedRowAtIndex(count - 1);
    if (node) {
      api.deselectAll(); node.setSelected(true);
      api.setFocusedCell(node.rowIndex!, 'make');
    }
    addLog('selectLast', `id=${node?.data?.id}`);
  }, [addLog]);

  /**
   * @action focusCell
   * @method api.setFocusedCell(rowIndex, colKey)
   * 특정 셀로 키보드/접근성 포커스를 이동합니다.
   * 선택된 첫 번째 행의 'make' 컬럼 셀에 포커스를 줍니다.
   */
  const focusCell = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const node = api.getSelectedNodes()[0] ?? api.getDisplayedRowAtIndex(0);
    if (node) {
      api.setFocusedCell(node.rowIndex!, 'make');
      addLog('cellFocused', `rowIndex=${node.rowIndex} colKey=make`);
    }
  }, [addLog]);

  // ────────────────────────────────────────────────────────────────────────────
  // 정렬
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * @action sortColumn
   * @method api.applyColumnState({ state: [{ colId, sort }] })
   * 특정 컬럼의 정렬 방향을 프로그래밍 방식으로 설정합니다.
   * `defaultState: { sort: null }`로 나머지 컬럼의 정렬을 초기화합니다.
   */
  const sortColumn = useCallback((colId: string, sort: 'asc' | 'desc') => {
    gridApiRef.current?.applyColumnState({
      state: [{ colId, sort }],
      defaultState: { sort: null },
    });
    addLog('sortChanged', `column=${colId} direction=${sort}`);
  }, [addLog]);

  /**
   * @action clearSort
   * @method api.applyColumnState({ defaultState: { sort: null } })
   * 모든 컬럼의 정렬 상태를 초기화합니다.
   */
  const clearSort = useCallback(() => {
    gridApiRef.current?.applyColumnState({ defaultState: { sort: null } });
    addLog('sortCleared', '모든 정렬 초기화');
  }, [addLog]);

  // ────────────────────────────────────────────────────────────────────────────
  // 필터
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * @action setQuickFilter
   * @method api.setGridOption('quickFilterText', value)
   * 모든 컬럼을 대상으로 텍스트 포함 여부를 검사하는 전체 검색 필터입니다.
   * 실시간 입력(onChange)과 연결해 사용하면 효과적입니다.
   */
  const handleQuickFilter = useCallback((val: string) => {
    setQuickFilter(val);
    gridApiRef.current?.setGridOption('quickFilterText', val);
    addLog('quickFilterChanged', `query="${val}"`);
  }, [addLog]);

  /**
   * @action setColumnFilter (전기차 필터)
   * @method api.setColumnFilterModel(colId, model)
   *
   * [Community]
   * 
   * colDef에 field 대신 valueGetter를 사용해 boolean → '전기차'|'내연기관' 변환.
   * agTextColumnFilter는 valueGetter 반환 문자열을 비교 대상으로 사용하므로
   * filter: '전기차' 매칭이 정상 동작한다.
   *
   * filterModel:
   *   filterType : 'text'    — agTextColumnFilter (Community 기본 제공)
   *   type       : 'equals'  — 완전 일치
   *   filter     : '전기차'  — valueGetter 반환값과 매칭
   *
   * [Enterprise]
   * 
   *   // agSetColumnFilter (Enterprise 전용, #200 오류)
   *   // await api.setColumnFilterModel('electric', { filterType: 'set', values: ['전기차'] });
   * 
   */
  const filterElectric = useCallback(async () => {
    const api = gridApiRef.current;
    if (!api) return;
    await api.setColumnFilterModel('electric', { filterType: 'text', type: 'equals', filter: '전기차' });
    api.onFilterChanged();
    addLog('columnFilterSet', 'electric=전기차 필터 적용');
  }, [addLog]);

  /**
   * @action clearAllFilters
   * @method api.setFilterModel(null)
   * 컬럼 필터 전체를 초기화합니다. quickFilter는 별도 초기화 필요합니다.
   */
  const clearAllFilters = useCallback(() => {
    gridApiRef.current?.setFilterModel(null);
    setQuickFilter('');
    gridApiRef.current?.setGridOption('quickFilterText', '');
    addLog('filterCleared', '모든 필터 초기화');
  }, [addLog]);

  // ────────────────────────────────────────────────────────────────────────────
  // 컬럼 제어
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * @action toggleColumnVisible
   * @method api.setColumnsVisible([colId], visible)
   * 컬럼의 가시성을 토글합니다.
   * api.getColumn('electric')?.isVisible() 로 그리드의 실제 상태를 직접 읽는다.
   * → React state 없이도 항상 정확한 현재 상태를 기반으로 토글한다.
   * → useCallback 의존성 배열에 state를 넣지 않아도 되므로 불필요한 재생성도 방지된다.
   */
  const toggleElectricColumn = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    /**
     * getColumn().isVisible() 로 그리드의 실제 현재 가시성을 읽는다.
     * React state 대신 그리드 API를 단일 소스로 사용해 불일치를 방지한다.
     */
    const currentlyVisible = api.getColumn('electric')?.isVisible() ?? true;
    const next = !currentlyVisible;
    api.setColumnsVisible(['electric'], next);
    addLog('columnVisibilityChanged', `electric=${next ? '표시' : '숨김'}`);
  }, [addLog]);

  /**
   * @action pinColumn
   * @method api.applyColumnState({ state: [{ colId, pinned: 'left' | 'right' | null }] })
   * 컬럼을 좌측 또는 우측에 고정합니다. null이면 고정 해제됩니다.
   */
  const [makePinned, setMakePinned] = useState<'left' | null>(null);
  const togglePinMake = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const next: 'left' | null = makePinned ? null : 'left';
    api.applyColumnState({ state: [{ colId: 'make', pinned: next }] });
    setMakePinned(next);
    addLog('columnPinned', `make column pinned=${next ?? 'none'}`);
  }, [addLog, makePinned]);

  /**
   * @action autoSizeColumns
   * @method api.autoSizeAllColumns()
   * 모든 컬럼 너비를 컨텐츠에 맞게 자동 조정합니다.
   * 특정 컬럼만 조정하려면 `api.autoSizeColumns(['make', 'model'])` 사용합니다.
   */
  const autoSizeColumns = useCallback(() => {
    gridApiRef.current?.autoSizeAllColumns();
    addLog('columnAutoSized', '모든 컬럼 너비 자동 조정');
  }, [addLog]);

  // ────────────────────────────────────────────────────────────────────────────
  // 데이터 & 뷰
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * @action refreshData
   * setRowData로 전체 데이터를 초기 상태로 되돌립니다.
   * 각종 필터/정렬도 함께 초기화합니다.
   */
  const refreshData = useCallback(() => {
    gridApiRef.current?.deselectAll();
    gridApiRef.current?.setFilterModel(null);
    gridApiRef.current?.applyColumnState({ defaultState: { sort: null } });
    setRowData(INITIAL_ROWS);
    setQuickFilter('');
    nextId = 7;
    addLog('dataRefreshed', '데이터 및 상태 전체 초기화');
  }, [addLog]);

  /**
   * @action exportDataAsCsv
   * @method api.exportDataAsCsv(params?)
   * 현재 필터/정렬 상태가 반영된 데이터를 CSV로 내보냅니다.
   * params.fileName, params.columnKeys 등 다양한 옵션을 지원합니다.
   */
  const exportCsv = useCallback(() => {
    gridApiRef.current?.exportDataAsCsv({ fileName: 'grid-export.csv' });
    addLog('csvExported', 'grid-export.csv 다운로드');
  }, [addLog]);

  /**
   * @action scrollToRow
   * @method api.ensureIndexVisible(rowIndex, position?)
   * 특정 rowIndex가 뷰포트에 보이도록 스크롤합니다.
   * position: 'top' | 'middle' | 'bottom' | null (기본: 최소 스크롤)
   */
  const scrollToBottom = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const last = api.getDisplayedRowCount() - 1;
    api.ensureIndexVisible(last, 'bottom');
    addLog('scrolledToBottom', `rowIndex=${last}`);
  }, [addLog]);

  const scrollToTop = useCallback(() => {
    gridApiRef.current?.ensureIndexVisible(0, 'top');
    addLog('scrolledToTop', 'rowIndex=0');
  }, [addLog]);

  // ────────────────────────────────────────────────────────────────────────────
  // 이벤트 콜백 (그리드 → 외부)
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * @event onRowClicked
   * 사용자가 행을 클릭했을 때 호출됩니다.
   * `event.data`로 클릭된 행의 데이터에 접근합니다.
   */
  const onRowClicked = useCallback((event: RowClickedEvent<IRow>) => {
    addLog('rowClicked', `id=${event.data?.id} make=${event.data?.make}`);
  }, [addLog]);

  /**
   * @event onSelectionChanged
   * 선택 상태가 변경될 때마다 호출됩니다.
   * `event.api.getSelectedRows()`로 현재 선택된 행 목록을 가져옵니다.
   */
  const onSelectionChanged = useCallback((event: SelectionChangedEvent<IRow>) => {
    const count = event.api.getSelectedRows().length;
    addLog('selectionChanged', `선택된 행 수: ${count}`);
  }, [addLog]);

  /**
   * @event onCellValueChanged
   * 인라인 편집으로 셀 값이 변경되었을 때 호출됩니다.
   * `event.oldValue`, `event.newValue`로 변경 전/후 값에 접근합니다.
   */
  const onCellValueChanged = useCallback((event: CellValueChangedEvent<IRow>) => {
    addLog('cellValueChanged',
      `field=${event.colDef.field} "${event.oldValue}" → "${event.newValue}"`);
  }, [addLog]);

  /**
   * @event onSortChanged
   * 정렬이 변경될 때 호출됩니다.
   * `event.api.getColumnState()`로 현재 정렬 상태를 조회합니다.
   */
  const onSortChanged = useCallback((event: SortChangedEvent<IRow>) => {
    const sorted = event.api.getColumnState()
      .filter(c => c.sort)
      .map(c => `${c.colId}:${c.sort}`)
      .join(', ');
    addLog('sortChanged', sorted || '정렬 없음');
  }, [addLog]);

  /**
   * @event onFilterChanged
   * 필터가 변경될 때 호출됩니다.
   * `event.api.getDisplayedRowCount()`로 필터 결과 행 수를 확인합니다.
   */
  const onFilterChanged = useCallback((event: FilterChangedEvent<IRow>) => {
    addLog('filterChanged', `표시 행: ${event.api.getDisplayedRowCount()}개`);
  }, [addLog]);

  // ─── 컬럼 정의 ──────────────────────────────────────────────────────────────
  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'make', headerName: '제조사', flex: 1, sortable: true, editable: true, filter: true },
    { field: 'model', headerName: '모델', flex: 1, sortable: true, editable: true, filter: true },
    {
      field: 'price', headerName: '가격', flex: 1, sortable: true, editable: true, filter: 'agNumberColumnFilter',
      valueFormatter: p => p.value != null ? `$${p.value.toLocaleString()}` : ''
    },
    {
      /**
       * electric 컬럼
       *
       * [Enterprise]
       *  1. filter: 'agSetColumnFilter' → (SetFilterModule 필요), Community에서 #200 오류
       *
       * [Community]
       *  field를 제거하고 valueGetter로 boolean → '전기차'|'내연기관' 변환.
       *  agTextColumnFilter는 field 대신 valueGetter 반환값을 비교 대상으로 사용한다.
       *  → 필터 UI 입력란에 '전기차' 입력 시 정상 필터링
       *  → setColumnFilterModel({ filterType:'text', type:'equals', filter:'전기차' }) 정상 동작
       *
       *  ※ field를 제거하면 인라인 편집(editable)이 불가하므로
       *    편집이 필요하다면 valueSetter를 함께 정의해야 한다.
       */
      field: 'electric',
      headerName: '전기차',
      width: 110,
      sortable: true,
      filter: true,
      valueGetter: (p) => p.data?.electric ? '전기차' : '내연기관',
      /**
       * cellRenderer에 React 컴포넌트를 직접 전달한다.
       * valueGetter로 문자열을 반환하더라도 cellRenderer의 params.value는
       * valueGetter 반환값('전기차'/'내연기관')이 되므로 ElectricBadge의
       * value 타입을 string으로 맞춰야 한다.
       */
      cellRenderer: ElectricBadgeCommunity,
    },
  ]);

  // ─── 렌더 ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">AG Grid — 외부 액션 제어 샘플</h1>

        {/* ── 컨트롤 패널 ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">

          {/* 행 조작 */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">행 조작</p>
            <button onClick={addRow} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-green-200 text-green-700 hover:bg-green-50">+ 행 추가</button>
            <button onClick={deleteSelectedRows} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50">선택 행 삭제</button>
            <button onClick={duplicateSelected} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">선택 행 복제</button>
          </div>

          {/* 셀 편집 */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">셀 편집</p>
            <select value={String(editField)} onChange={e => setEditField(e.target.value as keyof IRow)}
              className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5">
              <option value="make">make</option>
              <option value="model">model</option>
              <option value="price">price</option>
            </select>
            <input value={editValue} onChange={e => setEditValue(e.target.value)}
              placeholder="값 입력"
              className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5" />
            <button onClick={setCellValue} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50">값 설정</button>
            <button onClick={startEditingCell} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">인라인 편집 시작</button>
            <button onClick={() => stopEditing()} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">편집 저장</button>
            <button onClick={() => stopEditing(true)} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">편집 취소</button>
          </div>

          {/* 선택 & 포커스 */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">선택 & 포커스</p>
            <button onClick={selectAll} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">전체 선택</button>
            <button onClick={deselectAll} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">선택 해제</button>
            <button onClick={selectFirstRow} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">첫 번째 행 선택</button>
            <button onClick={selectLastRow} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">마지막 행 선택</button>
            <button onClick={focusCell} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">셀 포커스</button>
          </div>

          {/* 정렬 & 필터 */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">정렬 & 필터</p>
            <button onClick={() => sortColumn('make', 'asc')} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">제조사 오름차순</button>
            <button onClick={() => sortColumn('price', 'desc')} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">가격 내림차순</button>
            <button onClick={clearSort} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">정렬 초기화</button>
            <button onClick={filterElectric} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">전기차만 표시</button>
            <button onClick={clearAllFilters} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">필터 초기화</button>
          </div>

          {/* 컬럼 제어 */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">컬럼 제어</p>
            <button onClick={toggleElectricColumn} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">전기차 컬럼 토글</button>
            <button onClick={togglePinMake} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">제조사 컬럼 고정</button>
            <button onClick={autoSizeColumns} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">컬럼 너비 자동 조정</button>
          </div>

          {/* 데이터 & 뷰 */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">데이터 & 뷰</p>
            <button onClick={refreshData} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">데이터 리프레시</button>
            <button onClick={exportCsv} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">CSV 내보내기</button>
            <button onClick={scrollToBottom} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">맨 아래로 스크롤</button>
            <button onClick={scrollToTop} className="w-full text-left text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">맨 위로 스크롤</button>
          </div>
        </div>

        {/* ── 빠른 필터 ── */}
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
          <input
            value={quickFilter}
            onChange={e => handleQuickFilter(e.target.value)}
            placeholder="빠른 필터 — 모든 컬럼 검색..."
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2"
          />
        </div>

        {/* ── AG Grid ── */}
        <div style={{ height: 400 }}>
          <AgGridReact<IRow>
            rowData={rowData}
            columnDefs={colDefs}
            rowSelection={{
              mode: 'multiRow',           // "multiple" 대체
              enableClickSelection: true, // suppressRowClickSelection={false} 대체
              // true = 행 클릭으로 선택 가능 (기존 동작 유지)
            }}
            animateRows
            onGridReady={onGridReady}
            onRowClicked={onRowClicked}
            onSelectionChanged={onSelectionChanged}
            onCellValueChanged={onCellValueChanged}
            onSortChanged={onSortChanged}
            onFilterChanged={onFilterChanged}
            getRowId={params => String(params.data.id)}
          />
        </div>

        {/* ── 이벤트 로그 ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">이벤트 로그</p>
          <div className="h-36 overflow-y-auto font-mono text-xs space-y-0.5">
            {logs.map((l, i) => (
              <div key={i} className="flex gap-2 border-b border-gray-50 pb-0.5">
                <span className="text-gray-300">[{l.ts}]</span>
                <span className="text-blue-600">{l.event}</span>
                <span className="text-gray-500">— {l.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}