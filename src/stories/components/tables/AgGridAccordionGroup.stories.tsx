import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';

// 샘플 데이터: 상품코드(productCode) 기준 그룹핑
const rowData = [
  { id: 1, productCode: 'A001', code: 'C101', productName: '보험A', coverageAmount: 1000, premium: 12 },
  { id: 2, productCode: 'A001', code: 'C102', productName: '보험A', coverageAmount: 2000, premium: 15 },
  { id: 3, productCode: 'A002', code: 'C201', productName: '보험B', coverageAmount: 1500, premium: 10 },
  { id: 4, productCode: 'A002', code: 'C202', productName: '보험B', coverageAmount: 2500, premium: 20 },
  { id: 5, productCode: 'A003', code: 'C301', productName: '보험C', coverageAmount: 3000, premium: 25 },
];

const columnDefs: ColDef[] = [
  { headerName: '상품코드', field: 'productCode', rowGroup: true, hide: true },
  { headerName: '코드', field: 'code', width: 100 },
  { headerName: '상품명', field: 'productName' },
  { headerName: '가입금액', field: 'coverageAmount', type: 'numericColumn', valueFormatter: p => p.value?.toLocaleString() },
  { headerName: '보험료', field: 'premium', type: 'numericColumn', valueFormatter: p => p.value?.toLocaleString() },
];

const defaultColDef: ColDef = {
  flex: 1,
  resizable: true,
  sortable: true,
  filter: true,
};

const autoGroupColumnDef: ColDef = {
  headerName: '상품코드 그룹',
  minWidth: 180,
  cellRendererParams: {
    suppressCount: false, // 그룹 내 개수 표시
    suppressDoubleClickExpand: false,
    suppressEnterExpand: false,
  },
};

const AgGridAccordionGroup = () => {
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        groupDisplayType="multipleColumns"
        autoGroupColumnDef={autoGroupColumnDef}
        animateRows
        groupDefaultExpanded={0} // 0: 모두 닫힘, 1: 모두 펼침
      />
    </div>
  );
};

export default {
  title: 'Components/Tables/AgGridAccordionGroup',
  component: AgGridAccordionGroup,
};

export const Default = () => <AgGridAccordionGroup />;
