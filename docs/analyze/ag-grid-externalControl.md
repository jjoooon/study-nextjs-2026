# AG Grid 외부 액션 제어 사용 설명서

> **버전** ag-grid-community / ag-grid-react ^35  
> **환경** React (Next.js `'use client'`), TypeScript, Community Edition

---

## 목차

1. [시작하기](#1-시작하기)
2. [핵심 개념 — GridApi](#2-핵심-개념--gridapi)
3. [데이터 구조 및 컬럼 정의](#3-데이터-구조-및-컬럼-정의)
4. [행 조작](#4-행-조작)
5. [셀 편집](#5-셀-편집)
6. [선택 & 포커스](#6-선택--포커스)
7. [정렬](#7-정렬)
8. [필터](#8-필터)
9. [컬럼 제어](#9-컬럼-제어)
10. [데이터 & 뷰](#10-데이터--뷰)
11. [이벤트 콜백](#11-이벤트-콜백)
12. [셀 렌더러 (cellRenderer)](#12-셀-렌더러-cellrenderer)
13. [Community vs Enterprise 필터 차이](#13-community-vs-enterprise-필터-차이)
14. [자주 발생하는 오류](#14-자주-발생하는-오류)

---

## 1. 시작하기

### 설치

```bash
npm install ag-grid-community ag-grid-react
```

### 기본 설정

```tsx
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

// 파일 최상단(컴포넌트 외부)에서 한 번만 등록
ModuleRegistry.registerModules([AllCommunityModule]);
```

> **주의** `ModuleRegistry.registerModules`는 컴포넌트 내부에서 호출하면 리렌더마다 재등록되어 성능 문제가 발생합니다. 반드시 모듈 최상단에서 한 번만 호출하세요.

### 최소 동작 예시

```tsx
<AgGridReact
  rowData={rowData}
  columnDefs={colDefs}
  getRowId={params => String(params.data.id)}
/>
```

---

## 2. 핵심 개념 — GridApi

외부에서 그리드를 제어하는 모든 액션은 `GridApi`를 통해 이루어집니다.

### GridApi 저장 방법

```tsx
const gridApiRef = useRef<GridApi<IRow> | null>(null);

const onGridReady = useCallback((event: GridReadyEvent<IRow>) => {
  // 그리드가 DOM에 완전히 마운트된 후 호출됨
  // event.api를 ref에 저장해 두면 어디서든 사용 가능
  gridApiRef.current = event.api;
}, []);

<AgGridReact onGridReady={onGridReady} ... />
```

### 왜 useRef를 사용하는가

`useState`를 사용하면 `api`가 바뀔 때마다 리렌더가 발생합니다. `GridApi`는 변경되지 않는 참조값이므로 `useRef`가 적합합니다.

### getRowId — 필수 설정

```tsx
<AgGridReact
  getRowId={params => String(params.data.id)}
  ...
/>
```

`applyTransaction`(행 추가/수정/삭제)을 사용할 때 `getRowId`가 없으면 AG Grid가 객체 참조(`===`)로 행 동일성을 판단합니다. `getSelectedRows()`가 반환한 객체와 내부 rowData의 참조가 다를 경우 **오류 #5**가 발생합니다. 행 데이터에 고유 `id` 필드가 있다면 항상 설정하세요.

---

## 3. 데이터 구조 및 컬럼 정의

### 데이터 타입 정의

```tsx
interface IRow {
  id: number;
  make: string;
  model: string;
  price: number;
  electric: boolean;
}
```

### 컬럼 정의 (ColDef)

```tsx
const [colDefs] = useState<ColDef<IRow>[]>([
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    sortable: true,
  },
  {
    field: 'make',
    headerName: '제조사',
    flex: 1,           // 남은 공간을 비율로 채움
    sortable: true,
    editable: true,    // 더블클릭으로 인라인 편집 가능
    filter: true,      // agTextColumnFilter 활성화
  },
  {
    field: 'price',
    headerName: '가격',
    flex: 1,
    sortable: true,
    editable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: p => p.value != null ? `$${p.value.toLocaleString()}` : '',
    // valueFormatter: 셀 표시 형식만 변환 (데이터 원본은 유지)
  },
]);
```

### 주요 ColDef 옵션

| 옵션 | 설명 | 예시 |
|---|---|---|
| `field` | 데이터 키 | `'make'` |
| `headerName` | 헤더 표시명 | `'제조사'` |
| `flex` | 비율 기반 너비 | `1` |
| `width` | 고정 너비(px) | `120` |
| `sortable` | 정렬 활성화 | `true` |
| `editable` | 인라인 편집 활성화 | `true` |
| `filter` | 필터 종류 | `true` / `'agNumberColumnFilter'` |
| `valueFormatter` | 표시 형식 변환 | `p => '$' + p.value` |
| `valueGetter` | 표시/필터 비교값 커스텀 | `p => p.data?.electric ? '전기차' : '내연기관'` |
| `cellRenderer` | 커스텀 셀 컴포넌트 | `ElectricBadge` |
| `pinned` | 컬럼 고정 | `'left'` / `'right'` |

---

## 4. 행 조작

모든 행 추가·수정·삭제는 `applyTransaction`을 사용합니다. 하나의 호출로 추가·수정·삭제를 동시에 처리할 수 있습니다.

### 행 추가

```tsx
const addRow = () => {
  const newRow: IRow = { id: nextId++, make: 'Kia', model: 'EV6', price: 45000, electric: true };

  // 그리드에 반영
  gridApiRef.current?.applyTransaction({ add: [newRow] });

  // React state에도 반영 (동기화 유지)
  setRowData(prev => [...prev, newRow]);
};
```

> `applyTransaction`과 `setRowData`를 **함께** 호출해야 그리드와 React state가 일치합니다.

### 선택 행 삭제

```tsx
const deleteSelectedRows = () => {
  const api = gridApiRef.current;
  if (!api) return;

  const selected = api.getSelectedRows(); // 선택된 행 데이터 배열
  if (!selected.length) return;

  api.applyTransaction({ remove: selected });
  setRowData(prev => prev.filter(r => !selected.some(s => s.id === r.id)));
};
```

### 선택 행 복제

```tsx
const duplicateSelected = () => {
  const api = gridApiRef.current;
  if (!api) return;

  const selected = api.getSelectedRows();
  const copies = selected.map(r => ({ ...r, id: nextId++ })); // 새 id 부여

  api.applyTransaction({ add: copies });
  setRowData(prev => [...prev, ...copies]);
};
```

### applyTransaction 전체 문법

```tsx
api.applyTransaction({
  add:    [newRow1, newRow2],    // 추가
  update: [updatedRow],          // 수정
  remove: [rowToDelete],         // 삭제
  addIndex: 0,                   // 추가 위치 (선택, 기본: 끝)
});
```

---

## 5. 셀 편집

### 외부 입력으로 셀 값 변경

선택된 행의 특정 필드를 외부에서 일괄 변경합니다.

```tsx
const setCellValue = (field: keyof IRow, value: string) => {
  const api = gridApiRef.current;
  if (!api) return;

  const selected = api.getSelectedRows();
  if (!selected.length) return;

  // 불변 패턴: 기존 행을 복사 후 해당 필드만 교체
  const updated = selected.map(r => ({
    ...r,
    [field]: field === 'price' ? Number(value) : value,
  }));

  api.applyTransaction({ update: updated });
  setRowData(prev => prev.map(r => {
    const u = updated.find(u => u.id === r.id);
    return u ?? r;
  }));
};
```

### 인라인 편집 시작

특정 셀을 프로그래밍 방식으로 편집 모드로 전환합니다.

```tsx
const startEditingCell = (field: keyof IRow) => {
  const api = gridApiRef.current;
  if (!api) return;

  const node = api.getSelectedNodes()[0];
  if (!node) return;

  // colDef에 editable: true 가 설정되어 있어야 동작
  api.startEditingCell({
    rowIndex: node.rowIndex!,
    colKey: String(field),
  });
};
```

### 편집 종료

```tsx
// 저장하며 종료
api.stopEditing();

// 변경사항 취소하며 종료
api.stopEditing(true);
```

### 조건부 편집 허용

특정 행만 편집 가능하게 설정할 수 있습니다.

```tsx
{
  field: 'price',
  // flgCd가 '01' 또는 '02'인 행만 편집 허용
  editable: (params) => params.data?.flgCd === '01' || params.data?.flgCd === '02',
  // 편집 후 입력값을 숫자로 변환 (없으면 문자열로 저장되어 계산 오류 발생)
  valueParser: (params) => {
    const parsed = Number(params.newValue);
    return isNaN(parsed) ? params.oldValue : parsed;
  },
}
```

---

## 6. 선택 & 포커스

### 다중 선택 설정

```tsx
// 기본 클릭 선택 (다중)
<AgGridReact rowSelection="multiple" ... />

// 체크박스 기반 다중 선택
<AgGridReact
  rowSelection={{ mode: 'multiRow', checkboxes: true, headerCheckbox: false }}
  ...
/>
```

### 전체 선택 / 해제

```tsx
api.selectAll();    // 모든 행 선택 (필터된 행 포함)
api.deselectAll();  // 모든 선택 해제
```

### 특정 행 선택

```tsx
// 첫 번째 행 선택
const firstNode = api.getDisplayedRowAtIndex(0);
if (firstNode) {
  api.deselectAll();
  firstNode.setSelected(true);
  api.setFocusedCell(firstNode.rowIndex!, 'make'); 
}

// 마지막 행 선택
const count = api.getDisplayedRowCount();
const lastNode = api.getDisplayedRowAtIndex(count - 1);
if (lastNode) {
  api.deselectAll();
  lastNode.setSelected(true);
  api.setFocusedCell(lastNode.rowIndex!, 'make'); 
}
```

### 셀 포커스 이동

키보드 포커스를 특정 셀로 이동합니다.

```tsx
// rowIndex 0, 'make' 컬럼으로 포커스
api.setFocusedCell(0, 'make');
```

---

## 7. 정렬

### 특정 컬럼 정렬

```tsx
// 제조사 오름차순 정렬, 나머지 컬럼 정렬 초기화
api.applyColumnState({
  state: [{ colId: 'make', sort: 'asc' }],
  defaultState: { sort: null }, // 다른 컬럼 정렬 모두 초기화
});

// 가격 내림차순
api.applyColumnState({
  state: [{ colId: 'price', sort: 'desc' }],
  defaultState: { sort: null },
});
```

### 정렬 초기화

```tsx
api.applyColumnState({ defaultState: { sort: null } });
```

### 현재 정렬 상태 조회

```tsx
const sortedCols = api.getColumnState()
  .filter(c => c.sort)
  .map(c => `${c.colId}: ${c.sort}`);
// 예: ['make: asc', 'price: desc']
```

---

## 8. 필터

### 빠른 필터 (전체 컬럼 검색)

모든 컬럼을 대상으로 텍스트 포함 여부를 검사합니다.

```tsx
api.setGridOption('quickFilterText', '검색어');

// 실시간 검색 예시
<input
  onChange={e => api.setGridOption('quickFilterText', e.target.value)}
  placeholder="전체 검색..."
/>
```

### 컬럼 필터 설정

특정 컬럼에 프로그래밍 방식으로 필터를 적용합니다.

```tsx
// 텍스트 필터 (agTextColumnFilter)
await api.setColumnFilterModel('make', {
  filterType: 'text',
  type: 'equals',    // 'equals' | 'contains' | 'startsWith' | 'endsWith'
  filter: 'Tesla',
});
api.onFilterChanged(); // 필터 적용 갱신

// 숫자 필터 (agNumberColumnFilter)
await api.setColumnFilterModel('price', {
  filterType: 'number',
  type: 'greaterThan',
  filter: 50000,
});
api.onFilterChanged();
```

### valueGetter를 이용한 boolean 컬럼 필터

`boolean` 타입 컬럼은 `agTextColumnFilter`가 `'True'`/`'False'` 문자열로 처리합니다. `valueGetter`로 표시 문자열로 변환하면 의미 있는 필터를 구성할 수 있습니다.

```tsx
// ColDef 설정
{
  headerName: '전기차',
  filter: true, // agTextColumnFilter
  valueGetter: (p) => p.data?.electric ? '전기차' : '내연기관',
  cellRenderer: ElectricBadgeCommunity,
}

// 필터 적용
await api.setColumnFilterModel('electric', {
  filterType: 'text',
  type: 'equals',
  filter: '전기차', // valueGetter 반환값과 매칭
});
api.onFilterChanged();
```

### 모든 필터 초기화

```tsx
api.setFilterModel(null);                          // 컬럼 필터 초기화
api.setGridOption('quickFilterText', '');          // 빠른 필터 초기화
```

---

## 9. 컬럼 제어

### 컬럼 표시 / 숨김

```tsx
// 숨기기
api.setColumnsVisible(['electric'], false);

// 표시
api.setColumnsVisible(['electric'], true);

// 현재 상태를 그리드 API에서 직접 읽어 토글
// (React state로 추적하면 외부 변경 시 불일치 발생 가능)
const currentlyVisible = api.getColumn('electric')?.isVisible() ?? true;
api.setColumnsVisible(['electric'], !currentlyVisible);
```

> React state 대신 `api.getColumn().isVisible()`로 현재 상태를 읽는 것이 안전합니다. 다른 곳에서 컬럼 상태가 바뀌어도 항상 실제 그리드 상태를 기반으로 동작합니다.

### 컬럼 고정 (Pin)

```tsx
// 좌측 고정
api.applyColumnState({
  state: [{ colId: 'make', pinned: 'left' }],
});

// 고정 해제
api.applyColumnState({
  state: [{ colId: 'make', pinned: null }],
});
```

### 컬럼 너비 자동 조정

```tsx
// 모든 컬럼 자동 조정
api.autoSizeAllColumns();

// 특정 컬럼만 조정
api.autoSizeColumns(['make', 'model']);
```

---

## 10. 데이터 & 뷰

### 데이터 리프레시

```tsx
const refreshData = () => {
  const api = gridApiRef.current;
  if (!api) return;

  api.deselectAll();
  api.setFilterModel(null);
  api.applyColumnState({ defaultState: { sort: null } });

  setRowData(INITIAL_ROWS); // React state 초기화
  api.setGridOption('quickFilterText', '');
};
```

### CSV 내보내기

현재 필터·정렬 상태가 반영된 데이터를 CSV 파일로 내보냅니다.

```tsx
api.exportDataAsCsv({
  fileName: 'export.csv',         // 파일명 (선택)
  columnKeys: ['make', 'model'],  // 특정 컬럼만 내보내기 (선택)
});
```

### 스크롤 제어

```tsx
// 특정 행으로 스크롤
api.ensureIndexVisible(rowIndex, 'top');    // 'top' | 'middle' | 'bottom' | null

// 맨 위로
api.ensureIndexVisible(0, 'top');

// 맨 아래로
const last = api.getDisplayedRowCount() - 1;
api.ensureIndexVisible(last, 'bottom');
```

---

## 11. 이벤트 콜백

그리드에서 사용자 액션이 발생할 때 외부 컴포넌트로 알림을 받는 방법입니다.

### 주요 이벤트 목록

```tsx
<AgGridReact
  onGridReady={onGridReady}           // 그리드 초기화 완료
  onRowClicked={onRowClicked}         // 행 클릭
  onSelectionChanged={onSelectionChanged} // 선택 변경
  onCellValueChanged={onCellValueChanged} // 셀 값 변경 (인라인 편집 후)
  onSortChanged={onSortChanged}       // 정렬 변경
  onFilterChanged={onFilterChanged}   // 필터 변경
  ...
/>
```

### 각 이벤트 구현 예시

```tsx
// 행 클릭 — 클릭된 행 데이터 접근
const onRowClicked = (event: RowClickedEvent<IRow>) => {
  console.log(event.data?.make); // 클릭된 행의 make 값
};

// 선택 변경 — 현재 선택된 행 목록 조회
const onSelectionChanged = (event: SelectionChangedEvent<IRow>) => {
  const selectedRows = event.api.getSelectedRows();
  console.log(`선택된 행 수: ${selectedRows.length}`);
};

// 셀 값 변경 — 변경 전/후 값 비교
const onCellValueChanged = (event: CellValueChangedEvent<IRow>) => {
  console.log(`${event.colDef.field}: "${event.oldValue}" → "${event.newValue}"`);
};

// 정렬 변경 — 현재 정렬 컬럼 목록 조회
const onSortChanged = (event: SortChangedEvent<IRow>) => {
  const sorted = event.api.getColumnState()
    .filter(c => c.sort)
    .map(c => `${c.colId}:${c.sort}`)
    .join(', ');
  console.log('정렬 상태:', sorted);
};

// 필터 변경 — 필터 결과 행 수 확인
const onFilterChanged = (event: FilterChangedEvent<IRow>) => {
  console.log(`표시 행: ${event.api.getDisplayedRowCount()}개`);
};
```

---

## 12. 셀 렌더러 (cellRenderer)

### HTML 문자열 반환 — 사용 불가

```tsx
// ❌ AG Grid React에서 HTML 문자열 반환 시 이스케이프 처리됨
// → <span ...>전기차</span> 이 텍스트 그대로 출력됨
cellRenderer: (p) => `<span style="color:green">${p.value ? '전기차' : '내연기관'}</span>`
```

### React 컴포넌트 — 올바른 방법

```tsx
// ✅ React 컴포넌트(JSX)를 반환해야 정상 렌더링
const ElectricBadge = ({ value }: ICellRendererParams<IRow, boolean>) => (
  <span style={{
    padding: '2px 8px',
    borderRadius: 99,
    fontSize: 11,
    fontWeight: 500,
    background: value ? '#EAF3DE' : '#F1EFE8',
    color: value ? '#3B6D11' : '#5F5E5A',
  }}>
    {value ? '전기차' : '내연기관'}
  </span>
);

// ColDef에 컴포넌트 참조 전달
{ field: 'electric', cellRenderer: ElectricBadge }
```

### valueGetter 사용 시 value 타입 변경

`valueGetter`를 사용하면 `cellRenderer`의 `value` 타입도 `valueGetter` 반환 타입으로 바뀝니다.

```tsx
// valueGetter가 string을 반환하므로 렌더러도 string 타입으로 받아야 함
const ElectricBadgeCommunity = ({ value }: ICellRendererParams<IRow, string>) => {
  const isElectric = value === '전기차';
  return (
    <span style={{
      background: isElectric ? '#EAF3DE' : '#F1EFE8',
      color: isElectric ? '#3B6D11' : '#5F5E5A',
      // ...
    }}>
      {value}
    </span>
  );
};
```

---

## 13. Community vs Enterprise 필터 차이

boolean 컬럼 필터 구성 시 Community와 Enterprise 사이에 중요한 차이가 있습니다.

### Enterprise — agSetColumnFilter

```tsx
// ColDef
{ field: 'electric', filter: 'agSetColumnFilter' }
// → SetFilterModule 등록 필요, Community에서 오류 #200 발생

// 필터 적용
await api.setColumnFilterModel('electric', {
  filterType: 'set',
  values: [true], // boolean 원본값 사용
});
```

### Community — valueGetter + agTextColumnFilter

```tsx
// ColDef: field 대신 valueGetter로 문자열 반환
{
  headerName: '전기차',
  filter: true, // agTextColumnFilter
  valueGetter: (p) => p.data?.electric ? '전기차' : '내연기관',
  cellRenderer: ElectricBadgeCommunity,
}

// 필터 적용: valueGetter 반환값 문자열로 매칭
await api.setColumnFilterModel('electric', {
  filterType: 'text',
  type: 'equals',
  filter: '전기차',
});
api.onFilterChanged();
```

### 비교 표

| 항목 | Community | Enterprise |
|---|---|---|
| 필터 모듈 | `AllCommunityModule` (기본 포함) | `SetFilterModule` 별도 등록 |
| 필터 UI | 텍스트 입력 | 체크박스 목록 자동 생성 |
| filterValueGetter 지원 | ❌ UI/비교 모두 무시 | ✅ UI 목록 + 비교값 반영 |
| boolean 필터 방법 | `valueGetter`로 문자열 변환 | `agSetColumnFilter` + boolean 값 |
| filterModel | `{ filterType: 'text', type: 'equals', filter: '전기차' }` | `{ filterType: 'set', values: [true] }` |

> **중요** Community에서 `filter: true` + `filterValueGetter` 조합은 동작하지 않습니다. `filterValueGetter`는 `agTextColumnFilter`에서 무시되어 UI에 `True`/`False` 원본값이 그대로 표시됩니다. 반드시 `valueGetter`를 사용하세요.

---

*이 문서는 `ag-grid-community ^35` 기준으로 작성되었습니다.*

자세한 AG-Grid API 설명은 https://www.ag-grid.com/react-data-grid/grid-api/ 페이지 참고하세요.