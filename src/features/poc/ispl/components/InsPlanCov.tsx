'use client';

import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ButtonGroup, Gcol, Grow, Separator, Typo } from '@/shared/components/common';
import { AddIcon, ResetIcon, SearchIcon } from '@/shared/components/icons';
import { Button, Checkbox, Input, NativeSelect, NativeSelectOption } from '@/shared/components/uiux';

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

// Utils
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
      <Button variant="icon" aria-label="고객명 검색" size="sm" onClick={() => onSearch(localQuery)}>
        <SearchIcon />
      </Button>
      <Button variant="icon" aria-label="검색 초기화" size="sm" onClick={onReset}>
        <ResetIcon />
      </Button>
    </Grow>
  );
};

// Main Component
export function InsPlanCov({ data, selectedPlanId: _selectedPlanId }: InsPlanCovProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 검색어로 데이터 필터링 (메모이제이션으로 성능 최적화)
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const lowerQuery = searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.productCode.toLowerCase().includes(lowerQuery) || item.productName.toLowerCase().includes(lowerQuery)
    );
  }, [data, searchQuery]);

  // 체크박스 선택 시 가입금액 편집 모드 시작, 해제 시 편집 모드 종료
  // const handleCellClicked = useCallback(
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   (event: any) => {
  //     if (event.colDef.field === 'selected' && event.data) {
  //       const isNowChecked = selectedRows.includes(event.data.id);

  //       setTimeout(() => {
  //         if (isNowChecked)
  //           // 지금 체크됨 → 편집 모드 시작
  //           event.api.startEditingCell({
  //             rowIndex: event.rowIndex,
  //             colKey: 'coverageAmount',
  //           });
  //         } else {
  //           // 지금 해제됨 → 편집 모드 종료
  //           event.api.stopEditing();
  //         }
  //       }, 0);
  //     }
  //   },
  //   [selectedRows]
  // );

  // Cell Renderers
  const checkboxRenderer = useCallback(
    (params: ICellRendererParams<InsPlanCovData>) => {
      const isChecked = selectedRows.includes(params.data?.id || 0);
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex justify-center flex-1">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedRows([...selectedRows, params.data?.id || 0]);
                } else {
                  setSelectedRows(selectedRows.filter((id) => id !== params.data?.id));
                }
              }}
              className="flex justify-center items-center"
            />
          </div>
          {params.data && (
            <div className="border-l border-l-(--color-table-border-border-gray) flex-1 text-center h-full">
              {params.data.id}
            </div>
          )}
        </div>
      );
    },
    [selectedRows]
  );

  const CheckboxHeader = useCallback(() => {
    const allSelected = data.length > 0 && selectedRows.length === data.length;

    return (
      <div className="w-full h-full flex items-center justify-center ">
        <Checkbox
          variant="button"
          color="secondary"
          checked={allSelected}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedRows(data.map((item) => item.id));
            } else {
              setSelectedRows([]);
            }
          }}
          className="flex justify-center items-center"
        >
          전체선택
        </Checkbox>
      </div>
    );
  }, [data, selectedRows]);

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

  const productNameRenderer = useCallback(
    (params: ICellRendererParams<InsPlanCovData>) => {
      return <span>{highlightText(params.data?.productName || '', searchQuery)}</span>;
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
      // {
      //   headerName: '',
      //   field: 'selected',
      //   width: 130,
      //   cellClass: 'text-center p-0!',
      //   sortable: false,
      //   filter: false,
      //   cellRenderer: checkboxRenderer,
      //   headerComponent: CheckboxHeader,
      //   // pinned: 'left',
      // },
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
    [checkboxRenderer, CheckboxHeader, duplicateRenderer, productNameRenderer, ProductNameHeaderComponent]
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
          <Grow placement="msb">
            <Typo tag="h3" variant="heading-l">
              가입담보 선택
            </Typo>
            <ButtonGroup>
              <Button color="gray" variant="outline" size="md">
                다운로드
              </Button>
            </ButtonGroup>
          </Grow>

          <Gcol className="w-full">
            <Gcol className="w-full border-t border-t-[#000]">
              <Grow className="w-full px-2 py-[.6rem] bg-(--color-table-th-surface-gray) gap-2" placement="me">
                <Checkbox>플랜 기본값</Checkbox>
                <NativeSelect aria-label="플랜선택" width="md" readOnly={false} required={false}>
                  <NativeSelectOption value="">플랜선택</NativeSelectOption>
                  <NativeSelectOption value="1">플랜1</NativeSelectOption>
                </NativeSelect>
                <NativeSelect aria-label="나만의 설계 선택" width="md" readOnly={false} required={false}>
                  <NativeSelectOption value="">나만의 설계</NativeSelectOption>
                  <NativeSelectOption value="1">나만의 설계1</NativeSelectOption>
                </NativeSelect>
                <Button variant="outline" color="gray" size="sm">
                  단체입력
                </Button>
                <Button variant="outline" color="gray" size="sm">
                  <ResetIcon />
                  담보초기화
                </Button>
              </Grow>
              <Grow className="w-full px-2 py-[.6rem]" placement="tsb">
                <Grow className="gap-6">
                  <Grow className="gap-1">
                    <Button variant="outline" color="gray" size="sm">
                      가입담보
                    </Button>
                    <Button variant="outline" color="gray" size="sm">
                      미가입담보
                    </Button>
                  </Grow>
                  <Grow className="gap-3">
                    <Typo variant="heading-m">분류별 선택</Typo>
                    <Separator>|</Separator>
                    <Grow className="gap-x-4 gap-y-1 flex-wrap" placement="ts">
                      {CategoriesCheckbox.map((category) => (
                        <Checkbox key={category.value} className="whitespace-nowrap">
                          {category.label}
                        </Checkbox>
                      ))}
                    </Grow>
                  </Grow>
                </Grow>
                <Grow>
                  <Button variant="outline" color="gray" size="sm">
                    더보기
                  </Button>
                </Grow>
              </Grow>
            </Gcol>

            <div style={{ width: '100%', height: 'calc(100vh - 62.1rem)' }}>
              <div className="ag-theme-alpine top-noline" style={{ height: '100%', width: '100%' }}>
                <AgGridReact<InsPlanCovData>
                  rowData={filteredData}
                  columnDefs={columnDefs}
                  suppressRowHoverHighlight={false}
                  // onCellClicked={handleCellClicked}
                  singleClickEdit={true}
                  tooltipShowDelay={0}
                  tooltipHideDelay={9999}
                  tooltipMouseTrack={true}
                  getRowClass={(params) => (params.data?.isHighlighted ? 'ag-row-highlighted' : '')}
                  rowSelection={{
                    mode: 'multiRow',
                    checkboxes: true,
                    headerCheckbox: true,
                    enableClickSelection: false,
                  }}
                  // onSelectionChanged={(event) => {
                  // const selectedNodes = event.api.getSelectedNodes();
                  // const selectedIds = selectedNodes.map((node) => node.data?.id).filter(Boolean);
                  // setSelectedRows(selectedIds);
                  // }}
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
