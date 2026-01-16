'use client';

import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
// ✅ AG Grid v34+ Theming API 사용 (구버전 CSS 제거)
import 'ag-grid-community/styles/ag-theme-quartz.css';

import type { Product } from '../types/api';

// ============================================================================
// AG GRID MODULE REGISTRATION
// ============================================================================

/**
 * AG Grid 모듈 등록
 *
 * @description
 * AG Grid v34부터는 모듈 시스템을 사용하여 필요한 기능을 등록해야 합니다.
 * AllCommunityModule: Community Edition의 모든 기능 포함
 */
ModuleRegistry.registerModules([AllCommunityModule]);

// ============================================================================
// PRODUCT GRID COMPONENT
// ============================================================================

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

/**
 * ProductGrid Component
 *
 * AG Grid를 사용하여 제품 목록을 표시하는 컴포넌트
 *
 * @description
 * - AG Grid Community Edition (v34.3.1)
 * - 정렬, 필터링, 컬럼 리사이징 지원
 * - 반응형 디자인
 * - Row 클릭 시 onProductClick 호출
 *
 * @features
 * - 자동 정렬: 모든 컬럼
 * - 필터링: 텍스트 필터
 * - 컬럼 리사이징: 사용자 조절 가능
 * - 상태 컬럼: 색상 배지 표시
 * - 가격 컬럼: 통화 포맷
 */
export default function ProductGrid({ products, onProductClick }: ProductGridProps) {
  // ============================================================================
  // COLUMN DEFINITIONS
  // ============================================================================

  /**
   * AG Grid 컬럼 정의
   *
   * @description
   * - id: 숨김 (내부용)
   * - name: 제품명
   * - description: 설명
   * - price: 가격 (통화 포맷)
   * - status: 상태 (배지 스타일)
   */
  const columnDefs: ColDef<Product>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: '제품명',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 2, // ✅ 2 비율로 공간 차지
        minWidth: 150,
        pinned: 'left', // 좌측 고정
        cellStyle: () => ({ fontWeight: 600 }),
      },
      {
        field: 'description',
        headerName: '설명',
        sortable: false,
        filter: true,
        resizable: true,
        flex: 3, // ✅ 3 비율로 공간 차지 (가장 넓음)
        minWidth: 200,
        cellStyle: () => ({ color: '#6b7280' }), // gray-600
      },
      {
        field: 'price',
        headerName: '가격',
        sortable: true,
        filter: 'agNumberColumnFilter',
        resizable: true,
        flex: 1, // ✅ 1 비율로 공간 차지
        minWidth: 120,
        valueFormatter: (params) => {
          return params.value ? `₩${Number(params.value).toLocaleString()}` : '';
        },
        cellStyle: () => ({ fontWeight: 600, color: '#2563eb' }), // blue-600
      },
      {
        field: 'status',
        headerName: '상태',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1, // ✅ 1 비율로 공간 차지
        minWidth: 100,
        cellRenderer: (params: { value: string }) => {
          const status = params.value;
          const colorClass =
            status === 'active'
              ? '#dcfce7' // green-100
              : status === 'inactive'
                ? '#fef9c3' // yellow-100
                : '#f3f4f6'; // gray-100

          const textClass =
            status === 'active'
              ? '#166534' // green-800
              : status === 'inactive'
                ? '#854d0e' // yellow-800
                : '#374151'; // gray-800

          return (
            <div
              style={{
                backgroundColor: colorClass,
                color: textClass,
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              {status}
            </div>
          );
        },
      },
    ],
    []
  );

  // ============================================================================
  // GRID OPTIONS
  // ============================================================================

  /**
   * AG Grid 설정
   *
   * @description
   * - animateRows: 행 애니메이션
   * - domLayout: 자동 높이 조정
   * - rowHeight: 행 높이
   * - headerHeight: 헤더 높이
   * - pagination: 페이지네이션 비활성화 (전체 데이터 표시)
   * - suppressCellFocus: 셀 포커스 스타일 제거
   * - rowSelection: 객체 형태 사용 (v32.2.1+)
   */
  const gridOptions = useMemo(
    () => ({
      animateRows: true,
      domLayout: 'autoHeight' as const,
      rowHeight: 60,
      headerHeight: 50,
      pagination: false,
      suppressCellFocus: true,
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
      },
      // ✅ rowSelection을 객체 형태로 변경 (v32.2.1+)
      rowSelection: {
        mode: 'singleRow' as const, // 단일 행 선택
        enableClickSelection: true, // 클릭으로 선택 가능
        enableSelectionWithoutKeys: true, // 키 없이 선택 가능
      },
    }),
    []
  );

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Row 클릭 핸들러
   */
  const onRowClicked = (event: { data?: Product }) => {
    if (onProductClick && event.data) {
      onProductClick(event.data);
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
      <AgGridReact<Product>
        rowData={products}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        onRowClicked={onRowClicked}
      />
    </div>
  );
}
