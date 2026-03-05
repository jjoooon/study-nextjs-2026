'use client';

import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Gcol, Grow, Typo } from '@atoms';
import { AddIcon, ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import { findChosungMatchIndices, getHighlightRanges, isChosungQuery } from '@/shared/utils/searchUtils';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// Types
interface InsPlanCovProps {
  data: InsPlanCovData[];
  selectedPlanId: number | null;
  onSelectPlan: (planId: number) => void;
}

interface InsPlanCovData {
  id: number;
  productCode: string;
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

// Components
interface ProductNameHeaderProps {
  onSearch: (query: string) => void;
  onReset: () => void;
  initialValue: string;
}

const ProductNameHeader = ({ onSearch, onReset, initialValue }: ProductNameHeaderProps) => {
  const [localQuery, setLocalQuery] = useState(initialValue);

  useEffect(() => {
    setLocalQuery(initialValue);
  }, [initialValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(localQuery);
    } else if (e.key === 'Escape') {
      setLocalQuery('');
      onReset();
    }
  };

  return (
    <Grow className="gap-1 w-full">
      <Input
        type="text"
        placeholder="상품코드 또는 상품명으로 검색하세요"
        id="cabinet-label-username"
        size="sm"
        className="flex-1"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button variant="outlined" aria-label="고객명 검색" only="icon" size="sm" onClick={() => onSearch(localQuery)}>
        <SearchIcon />
      </Button>
      <Button variant="outlined" aria-label="검색 초기화" only="icon" size="sm" onClick={onReset}>
        <ResetIcon />
      </Button>
    </Grow>
  );
};

// Main Component
export function InsPlanCov({ data, selectedPlanId: _selectedPlanId }: InsPlanCovProps) {
  const gridRef = useRef<AgGridReact<InsPlanCovData>>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 검색어로 데이터 필터링 (메모이제이션으로 성능 최적화)
  // data prop의 참조가 변경되지 않았다면 같은 배열 참조 반환
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const lowerQuery = searchQuery.toLowerCase();
    const isChosung = isChosungQuery(searchQuery);

    return data.filter((item) => {
      const productCodeLower = item.productCode.toLowerCase();
      const productNameLower = item.productName.toLowerCase();

      // 기본 문자열 포함 검색
      if (productCodeLower.includes(lowerQuery) || productNameLower.includes(lowerQuery)) {
        return true;
      }

      // 초성 검색 (한글 텍스트에 대해서만 수행)
      if (isChosung) {
        return (
          findChosungMatchIndices(item.productCode, searchQuery).length > 0 ||
          findChosungMatchIndices(item.productName, searchQuery).length > 0
        );
      }

      return false;
    });
  }, [data, searchQuery]);

  const duplicateRenderer = useCallback((params: ICellRendererParams<InsPlanCovData>) => {
    const isDuplicate = params.value as boolean;
    return isDuplicate ? (
      <Button aria-label="고객 추가" variant="outlined" only="icon" size="md" onClick={() => alert('추가')}>
        <AddIcon />
      </Button>
    ) : (
      ''
    );
  }, []);

  const productNameRenderer = useCallback(
    (params: ICellRendererParams<InsPlanCovData>) => {
      const ranges = getHighlightRanges(params.data?.productName || '', searchQuery);
      return (
        <span>
          {ranges.map((range, index) =>
            range.highlight ? (
              <mark key={index} className="bg-yellow-200 text-black rounded">
                {range.text}
              </mark>
            ) : (
              range.text
            )
          )}
        </span>
      );
    },
    [searchQuery]
  );

  // Search Handlers
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearchReset = useCallback(() => {
    setSearchQuery('');
  }, []);

  const ProductNameHeaderComponent = useMemo(() => {
    const Component = () => (
      <ProductNameHeader onSearch={handleSearch} onReset={handleSearchReset} initialValue={searchQuery} />
    );
    Component.displayName = 'ProductNameHeaderComponent';
    return Component;
  }, [handleSearch, handleSearchReset, searchQuery]);

  // Column Definitions
  const columnDefs: ColDef<InsPlanCovData>[] = useMemo(
    () => [
      {
        headerName: 'ID',
        field: 'id',
        width: 70,
        cellClass: 'text-center',
        sortable: false,
        filter: false,
      },
      {
        headerName: '중복',
        field: 'isDuplicate',
        width: 70,
        cellClass: 'text-center ',
        sortable: false,
        filter: false,
        cellRenderer: duplicateRenderer,
      },
      {
        headerName: '상품명',
        field: 'productName',
        flex: 1,
        cellClass: 'text-left',
        sortable: false,
        filter: false,
        autoHeight: true,
        cellRenderer: productNameRenderer,
        tooltipValueGetter: (params) => {
          if (!params.data) return '';
          return `상품코드: ${params.data.productCode} | 상품명: ${params.data.productName}`;
        },
        headerComponent: ProductNameHeaderComponent,
      },
      {
        headerName: '가입금액',
        field: 'coverageAmount',
        width: 110,
        cellClass: () => 'text-right editable-cell',
        sortable: true,
        filter: false,
        editable: true,
        valueFormatter: (params) => {
          return params.value ? params.value.toLocaleString() : '';
        },
        valueParser: (params) => {
          return Number(params.newValue);
        },
      },
      {
        headerName: '보험료',
        field: 'premium',
        width: 110,
        cellClass: 'text-right',
        sortable: true,
        filter: false,
        valueFormatter: (params) => {
          return params.value ? params.value.toLocaleString() : '';
        },
      },
      {
        headerName: '가능금액',
        field: 'availableAmount',
        width: 110,
        cellClass: 'text-right',
        sortable: true,
        filter: false,
        valueFormatter: (params) => {
          return params.value ? params.value.toLocaleString() : '';
        },
      },
      {
        headerName: '만기',
        field: 'expiryPeriod',
        width: 80,
        cellClass: 'text-center',
        sortable: true,
        filter: false,
      },
      {
        headerName: '납기',
        field: 'paymentPeriod',
        width: 80,
        cellClass: 'text-center',
        sortable: true,
        filter: false,
      },
      {
        headerName: '예상UW결과',
        field: 'expectedUwResult',
        width: 120,
        cellClass: 'text-center',
        sortable: true,
        filter: false,
        cellStyle: (params) => {
          const value = params.value as string;
          if (value === '인수') {
            return { color: '#006FF2' };
          } else if (value === '거절' || value === '조건부인수') {
            return { color: '#FB3F3F' };
          }
          return undefined;
        },
      },
    ],
    [duplicateRenderer, productNameRenderer, ProductNameHeaderComponent]
  );

  const CategoriesCheckbox = [
    { label: '사망후유', value: '0' },
    { label: '3대진단', value: '1' },
    { label: '입원일당', value: '2' },
    { label: '수술비', value: '3' },
    { label: '골절/화상', value: '4' },
    { label: '치아', value: '5' },
    { label: '운전비용', value: '6' },
  ];

  return (
    <Gcol className="gap-[1rem] w-full">
      {!data || data.length === 0 ? (
        <div className="text-center p-4">데이터가 없습니다.</div>
      ) : (
        <>
          <Grow placement="bwc">
            <Typo tag="h3" variant="heading-lg">
              가입담보 선택
            </Typo>
            <Grow>
              <Button color="gray" variant="outlined" size="md">
                다운로드
              </Button>
            </Grow>
          </Grow>

          <Gcol className="w-full">
            <Gcol className="w-full border-t border-t-[#000]">
              <Grow className="w-full px-2 py-[.6rem] bg-(--color-table-th-surface-gray) gap-2" placement="ec">
                <Checkbox>플랜 기본값</Checkbox>
                <NativeSelect aria-label="플랜선택" width="md" readOnly={false} required={false}>
                  <NativeSelectOption value="">플랜선택</NativeSelectOption>
                  <NativeSelectOption value="1">플랜1</NativeSelectOption>
                </NativeSelect>
                <NativeSelect aria-label="나만의 설계 선택" width="md" readOnly={false} required={false}>
                  <NativeSelectOption value="">나만의 설계</NativeSelectOption>
                  <NativeSelectOption value="1">나만의 설계1</NativeSelectOption>
                </NativeSelect>
                <Button variant="outlined" color="gray" size="sm">
                  단체입력
                </Button>
                <Button variant="outlined" color="gray" size="sm">
                  <ResetIcon />
                  담보초기화
                </Button>
              </Grow>
              <Grow className="w-full px-2 py-[.6rem]" placement="bws">
                <Grow className="gap-6">
                  <Grow className="gap-1">
                    <Button variant="outlined" color="gray" size="sm">
                      가입담보
                    </Button>
                    <Button variant="outlined" color="gray" size="sm">
                      미가입담보
                    </Button>
                  </Grow>
                  <Grow className="gap-3">
                    <Typo variant="heading-md">분류별 선택</Typo>
                    |
                    <Grow className="gap-x-4 gap-y-1 flex-wrap" placement="ss">
                      {CategoriesCheckbox.map((category) => (
                        <Checkbox key={category.value} className="whitespace-nowrap">
                          {category.label}
                        </Checkbox>
                      ))}
                    </Grow>
                  </Grow>
                </Grow>
                <Grow>
                  <Button variant="outlined" color="gray" size="sm">
                    더보기
                  </Button>
                </Grow>
              </Grow>
            </Gcol>

            <div style={{ width: '100%', height: 'calc(100vh - 62.1rem)' }}>
              <div className="ag-theme-alpine top-noline" style={{ height: '100%', width: '100%' }}>
                <AgGridReact<InsPlanCovData>
                  ref={gridRef}
                  rowData={filteredData}
                  getRowId={(params) => String(params.data.id)}
                  columnDefs={columnDefs}
                  // 성능 최적화 옵션
                  animateRows={false} // 행 애니메이션 비활성화 (스크롤 성능 향상)
                  suppressRowHoverHighlight={false}
                  singleClickEdit={true}
                  tooltipShowDelay={0}
                  tooltipHideDelay={9999}
                  tooltipMouseTrack={true}
                  // 스크롤 성능 최적화
                  rowBuffer={10} // 뷰포트 외부에 렌더링할 행 수 제한 (기본값: 20)
                  suppressColumnVirtualisation={false} // 컬럼 가상화 활성화
                  suppressDragLeaveHidesColumns={true} // 드래그 시 컬럼 숨김 방지
                  enableCellTextSelection={true} // 셀 텍스트 선택 활성화 (렌더링 최적화)
                  suppressCellFocus={false} // 셀 포커스 표시 (필요시 false로 변경)
                  // 행 스타일
                  getRowClass={(params) => (params.data?.isHighlighted ? 'ag-row-highlighted' : '')}
                  // 행 선택 설정
                  rowSelection={{
                    mode: 'multiRow',
                    checkboxes: true,
                    headerCheckbox: true,
                    enableClickSelection: false,
                  }}
                  onRowSelected={(event) => {
                    // 전체 선택 시 편집 모드 스킵 (여러 행 동시 편집 방지)
                    const selectedCount = event.api.getSelectedNodes().length;
                    const isSelectAll = selectedCount > 1;

                    if (event.node.isSelected() && event.node.data && !isSelectAll) {
                      requestAnimationFrame(() => {
                        event.api.startEditingCell({
                          rowIndex: event.node.rowIndex ?? -1,
                          colKey: 'coverageAmount',
                        });
                      });
                    } else if (!event.node.isSelected()) {
                      event.api.stopEditing();
                    }
                  }}
                />
              </div>
            </div>
          </Gcol>
        </>
      )}
    </Gcol>
  );
}
