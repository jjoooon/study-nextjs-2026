'use client';

/**
 * Table Dialog (테이블 팝업)
 *
 * @description
 * - 테이블 데이터를 표시하고 다양한 액션을 지원하는 팝업
 * - 단일 선택, 다중 선택 모드 지원
 * - 정렬, 필터링 등의 기본 기능 포함
 * - 액션 타입 포함 방식으로 유연한 결과 반환
 *
 * @usage
 * import { popup } from '@/shared/utils/popup';
 *
 * const result = await popup.open<TableDialogResult>('shared/table', {
 *   title: '제품 목록',
 *   data: products,
 *   allowMultiSelect: false
 * });
 *
 * if (result?.action === 'select') {
 *   console.log('선택된 행:', result.singleRow);
 * } else if (result?.action === 'multiSelect') {
 *   console.log('선택된 행들:', result.selectedRows);
 * } else if (result?.action === 'cancel') {
 *   console.log('취소됨');
 * }
 */

import { useState } from 'react';
import { Button } from '@/shared/components/uiux/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/uiux/dialog';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * 테이블 데이터 타입
 */
export interface TableData {
  id: string;
  name: string;
  category: string;
  price: number;
  status: string;
}

/**
 * 테이블 팝업 결과 타입
 *
 * @description
 * 액션 타입을 포함하여 다양한 결과를 반환
 */
export interface TableDialogResult {
  /** 수행된 액션 타입 */
  action: 'select' | 'multiSelect' | 'cancel';
  /** 단일 선택된 행 (select 액션 시) */
  singleRow?: TableData;
  /** 다중 선택된 행들 (multiSelect 액션 시) */
  selectedRows?: TableData[];
}

/**
 * 테이블 팝업 Props
 */
export interface TableDialogProps {
  /** 팝업 제목 */
  title?: string;
  /** 팝업 설명 */
  description?: string;
  /** 테이블 데이터 */
  data: TableData[];
  /** 다중 선택 허용 여부 */
  allowMultiSelect?: boolean;
  /** Promise resolve 함수 (결과 반환) */
  resolve: (result: TableDialogResult) => void;
}

// ============================================================================
// TABLE DIALOG COMPONENT
// ============================================================================

/**
 * 테이블 팝업 컴포넌트
 */
export function TableDialog({
  title = '데이터 목록',
  description = '항목을 선택하면 팝업이 닫히고 값이 반환됩니다.',
  data,
  allowMultiSelect = false,
  resolve,
}: TableDialogProps) {
  const [sortColumn, setSortColumn] = useState<keyof TableData>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  /**
   * 정렬 함수
   */
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  /**
   * 정렬 핸들러
   */
  const handleSort = (column: keyof TableData) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  /**
   * 체크박스 토글 핸들러 (다중 선택 모드)
   */
  const handleCheckboxToggle = (rowId: string) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  /**
   * 행 클릭 핸들러 (단일 선택)
   */
  const handleRowClick = (row: TableData) => {
    if (allowMultiSelect) {
      // 다중 선택 모드에서는 체크박스 토글
      handleCheckboxToggle(row.id);
    } else {
      // 단일 선택 모드에서는 즉시 선택 및 팝업 닫기
      resolve({
        action: 'select',
        singleRow: row,
      });
    }
  };

  /**
   * 확인 버튼 핸들러 (다중 선택)
   */
  const handleConfirm = () => {
    if (allowMultiSelect && selectedRows.size > 0) {
      const selectedItems = data.filter((row) => selectedRows.has(row.id));
      resolve({
        action: 'multiSelect',
        selectedRows: selectedItems,
      });
    } else {
      resolve({
        action: 'cancel',
      });
    }
  };

  /**
   * 취소 버튼 핸들러
   */
  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  return (
    <Dialog open>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* 테이블 */}
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* 다중 선택 모드에서만 체크박스 컬럼 표시 */}
                  {allowMultiSelect && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      선택
                    </th>
                  )}
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('id')}
                  >
                    ID {sortColumn === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    이름 {sortColumn === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('category')}
                  >
                    카테고리 {sortColumn === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('price')}
                  >
                    가격 {sortColumn === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    상태 {sortColumn === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-blue-50 transition-colors ${
                      selectedRows.has(row.id) ? 'bg-blue-50' : ''
                    } ${allowMultiSelect ? 'cursor-pointer' : ''}`}
                    onClick={() => handleRowClick(row)}
                  >
                    {/* 다중 선택 모드 체크박스 */}
                    {allowMultiSelect && (
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedRows.has(row.id)}
                          onChange={() => handleCheckboxToggle(row.id)}
                        />
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.price.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          row.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : row.status === 'inactive'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 데이터가 없는 경우 */}
          {data.length === 0 && <div className="text-center py-8 text-gray-500">표시할 데이터가 없습니다.</div>}
        </div>

        {/* 선택된 항목 수 표시 (다중 선택 모드) */}
        {allowMultiSelect && selectedRows.size > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            선택된 항목: <span className="font-semibold">{selectedRows.size}</span>개
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="mt-6 flex justify-between">
          {allowMultiSelect ? (
            <>
              <div className="text-sm text-gray-500">
                {selectedRows.size > 0 ? `${selectedRows.size}개 선택됨` : '항목을 선택해주세요'}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  취소
                </Button>
                <Button onClick={handleConfirm} disabled={selectedRows.size === 0}>
                  확인 ({selectedRows.size})
                </Button>
              </div>
            </>
          ) : (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                취소
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TableDialog;
