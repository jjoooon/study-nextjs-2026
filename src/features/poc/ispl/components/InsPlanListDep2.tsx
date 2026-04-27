'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ICellRendererParams, GridApi } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import { Grid, Typo } from '@atoms';
import { Button } from '@uiux/Button';

ModuleRegistry.registerModules([AllCommunityModule]);

// Types
interface InsPlanDep2Data {
  type: string;
  name: string;
  id: string;
  dep3?: Array<{ plan: string; name: string }>;
}

interface InsPlanData {
  id: number;
  productName: string;
  dep2: InsPlanDep2Data[];
}

interface InsPlanListDep2Props {
  product: InsPlanData | undefined;
  selectedDep2Index: number | null; // 향후 프로그래매틱 선택을 위해 유지
  onSelectDep2: (index: number) => void;
}

// Custom Cell Renderer - 상품명 + 추가 정보
const InsPlanNameRenderer = (props: ICellRendererParams<InsPlanDep2Data>) => {
  const data = props.data;
  if (!data) return null;

  return (
    <Grid className="h-full grid-cols-[auto_1fr_auto] grid-rows-[1fr] items-center pr-2">
      <Typo
        variant="body-md"
        className="border-r-[.1rem] border-[#E1E1E1] px-2 h-full flex items-center justify-center"
      >
        {data.type}
      </Typo>
      <Typo variant="body-md" className="flex items-center justify-start truncate px-2">
        {data.name}
      </Typo>
      <Button className="shrink-0 flex items-center justify-center" color="secondary" size="xs">
        납면
      </Button>
    </Grid>
  );
};

export function InsPlanListDep2({ product, onSelectDep2 }: InsPlanListDep2Props) {
  const columnDefs: ColDef<InsPlanDep2Data>[] = useMemo(
    () => [
      {
        headerName: '종구분',
        field: 'name',
        flex: 1,
        cellClass: 'text-left p-0!',
        sortable: false,
        filter: false,
        suppressMovable: true, // 드래그 이동 방지
        lockPosition: true, // 컬럼 위치 고정
        tooltipValueGetter: (params) => {
          if (!params.data) return '';
        },
        cellRenderer: InsPlanNameRenderer,
      },
    ],
    []
  );

  const handleSelectionChanged = (event: { api: GridApi<InsPlanDep2Data> }) => {
    const selectedNodes = event.api.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const selectedIndex = selectedNodes[0].rowIndex || 0;
      onSelectDep2(selectedIndex);
    }
  };

  if (!product || product.dep2.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Typo variant="body-md" className="text-gray-400">
          선택된 상품이 없습니다.
        </Typo>
      </div>
    );
  }

  return (
    <>
      <Typo variant="heading-sm" className="mb-1 truncate">
        {product.productName}
      </Typo>
      <div className="ag-theme-alpine th-s" style={{ height: 'calc(100% - 2.3rem)', width: '100%' }}>
        <AgGridReact<InsPlanDep2Data>
          rowData={product.dep2}
          columnDefs={columnDefs}
          rowSelection="single"
          suppressRowHoverHighlight={false}
          suppressDragLeaveHidesColumns={true} // 드래그로 컬럼 숨기기 방지
          onSelectionChanged={handleSelectionChanged}
        />
      </div>
    </>
  );
}
