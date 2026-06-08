'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
import type { ColDef, ICellRendererParams, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { scaleChange } from '@/shared/utils/scale';
import { Grow, Typo } from '@atoms';
import { SearchIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

interface InsPlanListDep1Props {
  data: InsPlanData[];
  selectedPlanId: number | null; // 향후 프로그래매틱 선택을 위해 유지
  onSelectPlan: (planId: number) => void;
}

// Types
interface InsPlanData {
  id: number;
  selected: boolean;
  category: string;
  age: string;
  productName: string;
  underwritingType: string | null;
  noSurrender: boolean;
  favorite: boolean;
  notification: boolean;
  isHighlighted?: boolean;
}

// Custom Cell Renderer - 상품명 + 추가 정보
const InsPlanNameRenderer = (props: ICellRendererParams<InsPlanData>) => {
  const data = props.data;
  if (!data) return null;

  return (
    <Grow placement="bwc">
      <Typo variant="body-md" className="flex-1 truncate">
        {data.productName}
      </Typo>
      <Grow className="shrink-0">
        <Grow className="gap-1">
          <div className="flex-1 w-[4.7rem]">
            {data.noSurrender && (
              <Badge color="green" className="w-full">
                무해지
              </Badge>
            )}
          </div>
          <div className="flex-1 w-[3.7rem] max-w-[3.7rem]">
            {data.underwritingType && (
              <Badge color={data.underwritingType === '할증' ? 'red' : 'blue'} className="w-full justify-center">
                {data.underwritingType}
              </Badge>
            )}
          </div>
          <div className="flex-1 w-[5.7rem] min-w-[5.7rem]">
            {data.notification && (
              <Button className="shrink-0" color="secondary" size="xs">
                알릴사항
              </Button>
            )}
          </div>
        </Grow>
      </Grow>
    </Grow>
  );
};

// Custom Cell Renderer - 즐겨찾기 체크박스
const InsPlanFavoriteRenderer = (props: ICellRendererParams<InsPlanData>) => {
  const [checked, setChecked] = useState<boolean>(props.data?.favorite || false);

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked);
    if (props.node && props.colDef?.field) {
      props.node.setDataValue(props.colDef.field, newChecked);
    }
  };

  return (
    <>
      <Checkbox
        variant="favorite"
        className="w-full h-full flex justify-center items-center"
        checked={checked}
        onCheckedChange={handleChange}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};

export function InsPlanListDep1({ data, selectedPlanId: _selectedPlanId, onSelectPlan }: InsPlanListDep1Props) {
  const columnDefs: ColDef<InsPlanData>[] = useMemo(
    () => [
      {
        headerName: '상품분류',
        field: 'category',
        width: scaleChange(100),
        cellClass: 'text-center',
        sortable: true,
        filter: false,
      },
      {
        headerName: '가입연령',
        field: 'age',
        width: scaleChange(100),
        cellClass: 'text-center',
        sortable: true,
        filter: false,
      },
      {
        headerName: '상품명',
        field: 'productName',
        flex: 1,
        sortable: false,
        filter: false,
        cellRenderer: InsPlanNameRenderer,
        autoHeight: true,
        tooltipValueGetter: (params) => {
          if (!params.data) return '';
          return `상품명: ${params.data.productName}`;
        },
        headerComponent: () => (
          <Grow className="gap-1 w-full">
            <Input
              type="text"
              placeholder="상품코드 또는 상품명으로 검색하세요"
              id="cabinet-label-username"
              size="sm"
              className="flex-1"
            />
            <Button variant="none" aria-label="고객명 검색" only="icon" size="sm">
              <SearchIcon />
            </Button>
          </Grow>
        ),
      },
      {
        headerName: '',
        field: 'favorite',
        width: scaleChange(30),
        sortable: true,
        filter: false,
        cellClass: 'text-center px-0!',
        headerClass: 'justify-center',
        cellRenderer: InsPlanFavoriteRenderer,
        suppressRowClickSelection: true,
      },
    ],
    []
  );

  const handleSelectionChanged = (event: { api: GridApi<InsPlanData> }) => {
    const selectedNodes = event.api.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const selectedData = selectedNodes[0].data;
      if (selectedData) {
        onSelectPlan(selectedData.id);
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<InsPlanData>
          rowData={data}
          columnDefs={columnDefs}
          rowSelection="single"
          suppressRowHoverHighlight={false}
          tooltipShowDelay={0}
          tooltipHideDelay={9999}
          tooltipMouseTrack={true}
          getRowClass={(params) => (params.data?.isHighlighted ? 'ag-row-highlighted' : '')}
          isRowSelectable={(_params) => true}
          onSelectionChanged={handleSelectionChanged}
        />
      </div>
    </div>
  );
}
