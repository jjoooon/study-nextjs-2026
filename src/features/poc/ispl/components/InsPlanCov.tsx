'use client';

/**
 * AG Grid 컴포넌트 흐름
 * 1. 모듈 등록 : AG Grid가 필요한 모든 기능(필터, 소트, 렌더링 등)을 사용할 수 있도록 초기화
 * 2. 타입 정의 (Props & Data Inerface) : 타입 안정성 제공 및 자동완성 활성화
 * 3. 커스텀 셀 렌더러 정의 (필요시) : 셀 내에서 복잡한 UI를 구현하기 위해
 * 4. 메인 컴포넌트 함수 선언 : 상태 관리, 컬럼 정의, 이벤트 핸들러 등 구현
 */
// 1.모듈 등록
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

import type { ColDef, ICellRendererParams, GridApi } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState, useCallback, useEffect } from 'react';
// import { Label } from 'recharts';
import { Gcol, Typo, Grow, ButtonGroup, Separator } from '@/shared/components/common';
import { SearchIcon, AddIcon, ResetIcon } from '@/shared/components/icons';
import { Button, Input, Checkbox, NativeSelect, NativeSelectOption } from '@/shared/components/uiux';

// 1.모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// 2. 타입 정의 : 컴포넌트 Props 정의
interface InsPlanCovProps {
  data: InsPlanCovData[];
  selectedPlanId: number | null;
  onSelectPlan: (planId: number) => void;
}
// 2. 데이터 행(Row)의 구조 정의
interface InsPlanCovData {
  id: number;
  productCode: string; // NEW - Sequential codes like P001, P002, etc.
  isDuplicate: boolean; // 중복 여부 (boolean은 관습적으로 is/has 접두사 사용)
  productName: string; // 상품명
  coverageAmount: number; // 가입금액 (보장받는 금액)
  premium: number; // 보험료 (매달 내는 돈)
  availableAmount: number; // 가능금액
  expiryPeriod: string; // 만기 (또는 maturityTerm)
  paymentPeriod: string; // 납기 (또는 paymentTerm)
  expectedUwResult: string; // 예상UW결과 (UnderWriting의 약어)
  isHighlighted?: boolean;
  selected?: boolean; // 체크박스 상태 추가
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
  // 3. 커스텀 셀 렌더러 정의 (필요시)
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // NEW: Search state management
  const [searchQuery, setSearchQuery] = useState(''); // Search input value
  const [filteredData, setFilteredData] = useState<InsPlanCovData[]>(data); // Filtered rows

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
    const filtered = data.filter(
      (item) => item.productCode.toLowerCase().includes(query) || item.productName.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  // NEW: Reset handler
  const handleReset = useCallback(() => {
    setSearchQuery('');
    setFilteredData(data);
  }, [data]);

  // NEW: Reset filter when data changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // checkboxRenderer를 useCallback으로 메모이제이션
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

  // CheckboxHeader를 useCallback으로 메모이제이션
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
      return <span>{highlightText(params.data?.productName || '', searchQuery)}</span>;
    },
    [searchQuery]
  );

  // 5. 컬럼 정의
  const columnDefs: ColDef<InsPlanCovData>[] = useMemo(
    () => [
      {
        headerName: '',
        field: 'selected',
        width: 130,
        cellClass: 'text-center p-0!',
        sortable: false,
        filter: false,
        cellRenderer: checkboxRenderer,
        headerComponent: CheckboxHeader,
        suppressRowClickSelection: true,
        pinned: 'left',
      },
      {
        headerName: '중복',
        field: 'isDuplicate',
        width: 70,
        cellClass: 'text-center ',
        sortable: false,
        filter: false,
        cellRenderer: duplicateRenderer,
        suppressRowClickSelection: true,
      },
      {
        headerName: '상품명',
        field: 'productName',
        flex: 1,
        cellClass: 'text-left',
        sortable: false,
        filter: false,
        autoHeight: true,
        cellRenderer: productNameRenderer, // ADD THIS - connect the renderer
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
              value={searchQuery} // ADD THIS - controlled input
              onChange={(e) => setSearchQuery(e.target.value)} // ADD THIS - handler
              onKeyDown={(e) => {
                // ADD THIS - keyboard support
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
              onClick={handleSearch} // ADD THIS - search handler
            >
              <SearchIcon />
            </Button>
            <Button
              variant="icon"
              aria-label="검색 초기화"
              size="sm"
              onClick={handleReset} // ADD THIS - reset handler
            >
              <ResetIcon />
            </Button>
          </Grow>
        ),
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
    [checkboxRenderer, CheckboxHeader, duplicateRenderer, productNameRenderer]
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
      {/* 로딩 상태 표시 */}
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
            <Gcol className="w-full border-t border-t-[.2rem] border-t-[#000]">
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
                  rowSelection="multiple" // multiple로 변경
                  suppressRowHoverHighlight={false}
                  isRowSelectable={(_params) => true}
                  onSelectionChanged={handleSelectionChanged}
                  singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
                  tooltipShowDelay={0}
                  tooltipHideDelay={9999}
                  tooltipMouseTrack={true}
                  getRowClass={(params) => (params.data?.isHighlighted ? 'ag-row-highlighted' : '')}
                />
              </div>
            </div>
          </Gcol>
        </>
      )}
    </Gcol>
  );
}
