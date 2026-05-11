# 코드 품질 검토 — `useLtpa35002.tsx`

> 파일 경로: `src/features/pub/ispl/cvrPl/hooks/useLtpa35002.tsx`  
> 검토 일자: 2026-05-11

---

## 🔴 Critical

### 1. 파일명과 내용 불일치

파일명은 `useLtpa35002.tsx`이지만 파일 내부에 해당 이름의 훅이 전혀 없습니다. 실제로는 AG Grid 관련 공용 유틸리티 모음입니다. 유지보수 시 파일을 찾을 수 없어 사실상 죽은 코드가 될 가능성이 높습니다.

---

### 2. 동적 Tailwind 클래스 — 런타임에 동작 안 함

```tsx
// uwIconRenderer - line 358
<div className={`w-[1rem] h-[1rem] rounded-full ${color ? `bg-[${color}]` : ''}`}></div>
```

`bg-[var(--color-success-60)]` 같은 동적 클래스는 Tailwind의 빌드 타임 스캔에서 감지되지 않아 production에서 스타일이 적용되지 않습니다.

```tsx
// 수정
<div
  className="w-[1rem] h-[1rem] rounded-full"
  style={{ backgroundColor: color }}
/>
```

---

### 3. 이벤트 핸들러 반환값이 묵살됨 — 오해를 유발하는 API

```tsx
// useGridReadyHandler - line 44
return new Set(...); // AG Grid는 onGridReady 반환값을 사용하지 않음

// useGridSelectionChangedHandler - line 141
return currentSelectedIds; // 동일

// useRowDataUpdatedHandler - line 76
return cleared; // 동일
```

AG Grid 이벤트 핸들러의 반환값은 AG Grid 내부에서 완전히 무시됩니다. 호출자가 이 반환값을 받으려면 별도 래퍼가 필요한데, 현재 시그니처만 보면 가능한 것처럼 보여 혼란을 줍니다. `prevSelectedIdsRef`처럼 ref로 처리하거나, 핸들러를 사용하는 쪽에서 콜백으로 처리해야 합니다.

---

## 🟡 Important

### 4. 단일 파일에 너무 많은 관심사

현재 파일에 공존하는 것들:

| 종류 | 항목 |
|---|---|
| 커스텀 훅 | `useGridReadyHandler`, `useRowDataUpdatedHandler`, `useGridSelectionChangedHandler`, `useExpiryCellRenderer`, `useEnsureLockedRowsSelected`, `useHandleSelectionChanged` |
| 셀 렌더러 함수 | `searchButtonRenderer`, `productNameCellRenderer`, `uwIconRenderer`, `groupEditableButtonRenderer` |
| 유틸리티 함수 | `sortRows`, `toggleError`, `editableCellClassRules`, `rowDataWithTrackingFactory` |
| 타입 정의 | `ProductNameCellBase`, `ProductTitleDetail` |

권장 분리:

```
hooks/gridEventHandlers.ts   ← 훅만
renderers/cellRenderers.tsx  ← 셀 렌더러 함수들
utils/gridUtils.ts           ← sortRows, toggleError 등
types/gridTypes.ts           ← 타입 정의
```

---

### 5. `rowDataWithTrackingFactory` — 의미없는 alias

```tsx
// line 277
const localPendingSelectIdRef = pendingSelectIdRef; // 그냥 원본 ref 재할당, 아무 효과 없음
```

삭제하고 `pendingSelectIdRef`를 직접 사용하면 됩니다.

---

### 6. `numberValueFormatter` 타입 오류

```tsx
// line 376 — groupEditableButtonRenderer 시그니처
numberValueFormatter: (params: ValueFormatterParams<T>) => React.ReactNode
```

AG Grid의 `ValueFormatterParams`는 `string`을 반환하는 formatter에 쓰입니다. `React.ReactNode`를 반환 타입으로 쓰는 것은 타입 오류이며, 실제 사용 시 셀 렌더링이 깨질 수 있습니다. `cellRenderer` 시그니처(`ICellRendererParams<T> => React.ReactNode`)로 교체해야 합니다.

---

## 🟢 Recommended

### 7. `useExpiryCellRenderer` — 3중 중첩 화살표

```tsx
export const useExpiryCellRenderer = () =>
  useCallback(
    <T,>(align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<T>) =>
        editableSelectCellRenderer<T>({ ...params, align }),
    []
  );
```

훅이 함수를 반환하고 → 그 함수가 또 함수를 반환합니다. 호출부에서 `getExpiryRenderer('left')(params)` 처럼 이중 호출이 필요해 직관성이 떨어집니다. `align`을 `useCallback` 인수로 올리거나, 단순히 함수 팩토리로 분리하는 편이 낫습니다.

---

### 8. 셀 렌더러 함수가 hooks 폴더에 혼재

`searchButtonRenderer`, `productNameCellRenderer` 등은 `use` 접두사도 없고 훅도 아닌 순수 함수들입니다. 파일명이 `use...`이고 hooks 폴더에 있어 협업 시 혼란을 줍니다.

---

## 요약

| 심각도 | 항목 | 수정 필요 |
|---|---|---|
| 🔴 | 파일명 불일치 | 즉시 |
| 🔴 | 동적 Tailwind 클래스 (`uwIconRenderer`) | 즉시 |
| 🔴 | 이벤트 핸들러 반환값 오해 유발 | 즉시 |
| 🟡 | 단일 파일 과다 책임 | 리팩토링 시 |
| 🟡 | `numberValueFormatter` 타입 오류 | 가능한 빨리 |
| 🟡 | 의미없는 ref alias | 다음 수정 시 |
| 🟢 | 3중 중첩 화살표 가독성 | 여유 있을 때 |
