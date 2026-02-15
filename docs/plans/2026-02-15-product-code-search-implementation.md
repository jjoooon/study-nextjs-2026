# Product Code Search & Highlight Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add product code field to insurance plan data and implement search functionality that filters and highlights matching text across productCode and productName fields.

**Architecture:** Client-side filtering with custom AG Grid cell renderer. State management for search query and filtered data. Case-insensitive partial matching with regex-based text highlighting.

**Tech Stack:** React, AG Grid Community, TypeScript, Tailwind CSS

---

## Task 1: Add productCode to InsPlanCovData Interface

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx:31-43`

**Step 1: Update the interface**

Add `productCode: string` field to the `InsPlanCovData` interface, placing it after `id` for logical ordering:

```typescript
interface InsPlanCovData {
  id: number;
  productCode: string; // NEW - Sequential codes like P001, P002, etc.
  isDuplicate: boolean;
  productName: string;
  coverageAmount: number;
  premium: number;
  availableAmount: number;
  expiryPeriod: string;
  paymentPeriod: string;
  expectedUwResult: string;
  isHighlighted?: boolean;
  selected?: boolean;
}
```

**Step 2: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "feat: add productCode field to InsPlanCovData interface

Add productCode field to support product identification and search functionality.
Sequential codes will be added to data in next step.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Add productCode to DUMMY_PLAN_COV_DATA

**Files:**
- Modify: `src/features/poc/ispl/components/Ltra350Step2.tsx:10-371`

**Step 1: Add productCode to first item**

Update the first data item (lines 10-22) to include `productCode: "P001"`:

```typescript
const DUMMY_PLAN_COV_DATA = [
  {
    id: 1,
    productCode: "P001",  // ADD THIS LINE
    isDuplicate: false,
    productName: '무배당 삼성화재 실손의료보험',
    // ... rest of fields
  },
  // ... remaining items
];
```

**Step 2: Add productCode to remaining 29 items**

Add sequential product codes to all remaining data items:
- Item 2: `productCode: "P002"`
- Item 3: `productCode: "P003"`
- ...
- Item 30: `productCode: "P030"`

Each item should have productCode added immediately after the `id` field, following the same pattern as Step 1.

**Step 3: Verify all 30 items have productCode**

Ensure the data array ends with:
```typescript
  {
    id: 30,
    productCode: "P030",
    isDuplicate: false,
    productName: '보장보험 건강증진보험',
    coverageAmount: 65000000,
    premium: 54000,
    availableAmount: 130000000,
    expiryPeriod: '85세',
    paymentPeriod: '15년',
    expectedUwResult: '인수',
    isHighlighted: false,
  },
];
```

**Step 4: Commit**

```bash
git add src/features/poc/ispl/components/Ltra350Step2.tsx
git commit -m "feat: add sequential product codes to dummy data

Add productCode field (P001-P030) to all 30 insurance plan items.
Provides product identification for search functionality.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Add Search State Management

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx:46-48`

**Step 1: Add state variables**

Add two new state variables after the existing `useState` declarations (around line 48):

```typescript
export function InsPlanCov({ data, selectedPlanId: _selectedPlanId, onSelectPlan }: InsPlanCovProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // NEW: Search state management
  const [searchQuery, setSearchQuery] = useState('');  // Search input value
  const [filteredData, setFilteredData] = useState<InsPlanCovData[]>(data);  // Filtered rows

  // ... rest of component
```

**Step 4: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "feat: add search state management

Add searchQuery and filteredData state variables to support
search and filter functionality.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Implement Search Handler

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx:61-91`

**Step 1: Add search handler function**

Add the `handleSearch` function after `handleSelectionChanged` (around line 62):

```typescript
  const handleSelectionChanged = useCallback(
    (event: { api: GridApi<InsPlanCovData> }) => {
      const selectedNodes = event.api.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const selectedData = selectedNodes[0].data;
        if (selectedData) {
          onSelectPlan(selectedData.id);
        }
      }
    },
    [onSelectPlan]
  );

  // NEW: Search handler
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = data.filter(item =>
      item.productCode.toLowerCase().includes(query) ||
      item.productName.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);
```

**Step 2: Add reset handler function**

Add the `handleReset` function immediately after `handleSearch`:

```typescript
  // NEW: Reset handler
  const handleReset = useCallback(() => {
    setSearchQuery('');
    setFilteredData(data);
  }, [data]);
```

**Step 3: Add effect for data changes**

Add a `useEffect` hook to reset filtered data when the original data prop changes. Place it after the handler functions (around line 92):

```typescript
  // NEW: Reset filter when data changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
```

**Step 4: Add useEffect import**

Verify that `useEffect` is imported at the top of the file (line 15 should already have it):
```typescript
import { useMemo, useState, useCallback, useEffect } from 'react';
```

If `useEffect` is not imported, add it to the imports.

**Step 5: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "feat: implement search and reset handlers

Add handleSearch for case-insensitive partial matching on
productCode and productName. Add handleReset to clear search.
Add useEffect to reset filter when data changes.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Create Highlight Helper Function

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx`

**Step 1: Add highlightText helper function**

Add the `highlightText` function BEFORE the main component (before line 46):

```typescript
// 2. 데이터 행(Row)의 구조 정의
interface InsPlanCovData {
  // ... interface fields
}

// NEW: Highlight helper function
const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-black rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

// 4. 메인 컴포넌트 함수 선언
export function InsPlanCov({ data, selectedPlanId: _selectedPlanId, onSelectPlan }: InsPlanCovProps) {
```

**Note:** The regex includes special character escaping for robustness.

**Step 2: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "feat: add text highlighting helper function

Create highlightText function that wraps matched text portions
in <mark> tags with yellow background styling.
Handles special characters in search queries.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create ProductName Cell Renderer

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx:118-128`

**Step 1: Add productNameRenderer function**

Add the `productNameRenderer` function after `duplicateRenderer` (around line 129):

```typescript
  // duplicateRenderer를 useCallback으로 메모이제이션
  const duplicateRenderer = useCallback((params: ICellRendererParams<InsPlanCovData>) => {
    const isDuplicate = params.value as boolean;
    return isDuplicate ? (
      <Button aria-label="고객 추가" variant="icon" color="transparent" onClick={() => alert('추가')}>
        <AddIcon />
      </Button>
    ) : (
      ''
    );
  }, []);

  // NEW: ProductName cell renderer with highlight
  const productNameRenderer = useCallback(
    (params: ICellRendererParams<InsPlanCovData>) => {
      return (
        <span>
          {highlightText(params.data?.productName || '', searchQuery)}
        </span>
      );
    },
    [searchQuery]
  );
```

**Step 2: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "feat: add productName cell renderer with highlight

Create custom cell renderer that applies text highlighting
to productName field based on search query.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Update Search Input UI

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx:167-180`

**Step 1: Convert search input to controlled component**

Replace the existing search header component (lines 167-180) with:

```typescript
      {
        headerName: '상품명',
        field: 'productName',
        flex: 1,
        cellClass: 'text-left',
        sortable: false,
        filter: false,
        autoHeight: true,
        cellRenderer: productNameRenderer,  // ADD THIS
        tooltipValueGetter: (params) => {
          if (!params.data) return '';
          return `상품코드: ${params.data.productCode} | 상품명: ${params.data.productName}`;
        },
        headerComponent: () => (
          <Grow className="gap-1 w-full">
            <Input
              type="text"
              placeholder="상품코드 또는 상품명으로 검색하세요"
              id="cabinet-label-username"
              size="sm"
              className="flex-1"
              value={searchQuery}  // ADD THIS
              onChange={(e) => setSearchQuery(e.target.value)}  // ADD THIS
              onKeyDown={(e) => {  // ADD THIS: Enter key support
                if (e.key === 'Enter') {
                  handleSearch();
                } else if (e.key === 'Escape') {
                  handleReset();
                }
              }}
            />
            <Button
              variant="icon"
              aria-label="고객명 검색"
              size="sm"
              onClick={handleSearch}  // ADD THIS
            >
              <SearchIcon />
            </Button>
            <Button
              variant="icon"
              aria-label="검색 초기화"
              size="sm"
              onClick={handleReset}  // ADD THIS
            >
              <ResetIcon />
            </Button>
          </Grow>
        ),
      },
```

**Note:** Added:
- Controlled input with `value` and `onChange`
- Keyboard support (Enter to search, Escape to reset)
- Search button click handler
- Reset button
- cellRenderer linkage
- Updated tooltip to include productCode

**Step 2: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "feat: update search input UI with handlers

Convert search input to controlled component. Add search and
reset button handlers. Add keyboard support (Enter/Escape).
Update tooltip to show product code.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Update Grid rowData to Use Filtered Data

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx:336-337`

**Step 1: Change rowData prop**

Update line 337 from:
```typescript
<AgGridReact<InsPlanCovData>
  rowData={data}
```

To:
```typescript
<AgGridReact<InsPlanCovData>
  rowData={filteredData}
```

**Step 2: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "feat: use filtered data for grid display

Update AgGridReact to use filteredData instead of original data.
Enables search filtering to affect displayed rows.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Add Search Result Counter

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx:273-282`

**Step 1: Add result counter display**

Add the search result counter after the heading (modify lines 273-282):

```typescript
          <Grow placement="msb">
            <Typo tag="h3" variant="heading-l">
              가입담보 선택
            </Typo>
            {searchQuery && filteredData.length !== data.length && (
              <Typo variant="body-m" className="text-gray-600">
                총 {data.length}개 중 {filteredData.length}개 검색됨
              </Typo>
            )}
            <ButtonGroup>
              <Button color="gray" variant="outline" size="md">
                다운로드
              </Button>
            </ButtonGroup>
          </Grow>
```

**Step 2: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "feat: add search result counter

Display count of filtered results when search is active.
Shows '총 N개 중 M개 검색됨' format.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Update Empty State Messages

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx:268-271`

**Step 1: Differentiate empty state messages**

Replace the existing empty state check (lines 268-271) with:

```typescript
          <Gcol className="w-full">
            {/* 로딩 상태 표시 */}
            {!data || data.length === 0 ? (
              <div className="text-center p-4">데이터가 없습니다.</div>
            ) : filteredData.length === 0 ? (
              <div className="text-center p-4">검색 결과가 없습니다.</div>
            ) : (
```

**Step 2: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "feat: improve empty state messaging

Differentiate between 'no data at all' and 'no search results'.
Provides clearer feedback to users.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Update Column Dependencies

**Files:**
- Modify: `src/features/poc/ispl/components/InsPlanCov.tsx:253`

**Step 1: Add new renderers to columnDef dependencies**

Update the `useMemo` dependency array (line 253) to include the new renderer:

From:
```typescript
    ],
    [checkboxRenderer, CheckboxHeader, duplicateRenderer]
  );
```

To:
```typescript
    ],
    [checkboxRenderer, CheckboxHeader, duplicateRenderer, productNameRenderer]
  );
```

**Step 2: Commit**

```bash
git add src/features/poc/ispl/components/InsPlanCov.tsx
git commit -m "fix: add productNameRenderer to columnDef dependencies

Ensure column definitions update when search query changes
by including productNameRenderer in dependency array.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Manual Testing

**Files:**
- Test in browser

**Step 1: Start development server**

```bash
npm run dev
```

**Step 2: Test basic search functionality**

1. Navigate to the Ltra350Step2 page
2. In the search box, type "삼성"
3. Click the search button
4. Verify: Only rows with "삼성" in productName are shown
5. Verify: The text "삼성" is highlighted with yellow background
6. Verify: Result counter shows correct count

**Step 3: Test product code search**

1. Clear search (click reset button or press Escape)
2. Type "P001" in search box
3. Click search or press Enter
4. Verify: Only the first item (무배당 삼성화재 실손의료보험) is shown
5. Verify: Tooltip shows "상품코드: P001 | 상품명: ..."

**Step 4: Test case-insensitive search**

1. Type "p001" (lowercase) in search box
2. Click search
3. Verify: Same results as "P001" (case-insensitive)

**Step 5: Test partial matching**

1. Type "화재" in search box
2. Click search
3. Verify: All products with "화재" anywhere in the name are shown

**Step 6: Test reset functionality**

1. With active search, click reset button
2. Verify: Search input is cleared
3. Verify: All 30 items are shown again

**Step 7: Test keyboard shortcuts**

1. Type "암" in search box
2. Press Enter
3. Verify: Search is triggered
4. Press Escape
5. Verify: Search is cleared

**Step 8: Test empty states**

1. Type "xyz123" (non-existent term)
2. Click search
3. Verify: Message "검색 결과가 없습니다." appears

**Step 9: Test special characters**

1. Type "무배상 삼성" (with special character)
2. Click search
3. Verify: No errors, graceful handling

**Step 10: Test tooltip with product code**

1. Hover over any product name cell
2. Verify: Tooltip shows both product code and product name

**Step 11: Check all 30 items have product codes**

1. Without search, scroll through all items
2. Hover over each product name
3. Verify: Each tooltip shows a product code from P001 to P030

**Step 12: Final integration check**

1. Test that row selection still works
2. Test that checkbox functionality still works
3. Test that sorting still works
4. Test that editing coverageAmount still works
5. Verify no console errors

---

## Task 13: Code Review & Cleanup

**Files:**
- Review all modified files

**Step 1: Review code quality**

Check for:
- Unused imports
- Inconsistent formatting
- Missing error handling
- Type safety issues

**Step 2: Run linter**

```bash
npm run lint
```

Fix any linting errors that appear.

**Step 3: Build verification**

```bash
npm run build
```

Ensure build completes successfully.

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: final cleanup and verification

- Ensure all linting passes
- Verify build succeeds
- Complete search feature implementation

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Summary

This implementation adds product code search functionality to the insurance plan grid:

1. **Data Structure**: Added `productCode` field to interface and all 30 data items
2. **State Management**: Search query and filtered data states
3. **Search Logic**: Case-insensitive partial matching on productCode OR productName
4. **UI Enhancements**: Controlled search input, reset button, keyboard support, result counter
5. **Visual Feedback**: Yellow text highlighting for matches, enhanced tooltips
6. **Edge Cases**: Empty states, special characters, data changes

**Total estimated time**: 2-3 hours for all tasks

**Testing**: Manual testing checklist provided in Task 12

**Files Modified**:
- `src/features/poc/ispl/components/InsPlanCov.tsx` - Main component changes
- `src/features/poc/ispl/components/Ltra350Step2.tsx` - Data updates
