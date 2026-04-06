// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import '../../../shared/styles/ag-grid-re.css';

import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { RichSelectModule, ClientSideRowModelModule } from 'ag-grid-enterprise';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { createCellValueChangedHandler } from '@/shared/components/agGridUtils';

ModuleRegistry.registerModules([AllCommunityModule, RichSelectModule, ClientSideRowModelModule]);

type DummyDataType = { id: number; label: string; age: string | number };
const DummyData: DummyDataType[] = [
  { id: 1, label: '사과', age: '60세' },
  { id: 2, label: '사과', age: '80세' },
  { id: 3, label: '오렌지', age: '90세' },
  { id: 4, label: '포도', age: '' },
  { id: 5, label: '포도', age: 0 },
];
const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    width: 120,
    editable: false,
    rowSpan: params => {
      const { data, api } = params;
      if (!data) return 1;
      const allRows: DummyDataType[] = [];
      api.forEachNode(n => {
        if (n.data) allRows.push(n.data);
      });
      const currentIndex = allRows.findIndex(r => r && r.label === data.label && r.id === data.id);
      if (currentIndex === -1) return 1;
      let span = 1;
      for (let i = currentIndex + 1; i < allRows.length; i++) {
        if (allRows[i].label === data.label) {
          span++;
        } else {
          break;
        }
      }
      // 첫 번째 label에서만 rowspan 적용, 나머지는 1
      if (
        currentIndex === 0 ||
        allRows[currentIndex - 1].label !== data.label
      ) {
        return span;
      }
      return 1;
    },
    cellClassRules: {
      'ag-rowspan-cell': 'value !== undefined',
      // 병합 셀(첫 셀, span 2 이상)
      'ag-rowspan-merged': params => {
        if (!params.data) return false;
        const { api, data } = params;
        const allRows: DummyDataType[] = [];
        api.forEachNode(n => { if (n.data) allRows.push(n.data); });
        const currentIndex = allRows.findIndex(r => r && r.label === data.label && r.id === data.id);
        if (currentIndex === -1) return false;
        let span = 1;
        for (let i = currentIndex + 1; i < allRows.length; i++) {
          if (allRows[i].label === data.label) span++;
          else break;
        }
        return (span > 1) && (currentIndex === 0 || allRows[currentIndex - 1].label !== data.label);
      },
      // 병합 그룹의 첫번째 셀(무조건)
      'ag-rowspan-group-first': params => {
        if (!params.data) return false;
        const { api, data } = params;
        const allRows: DummyDataType[] = [];
        api.forEachNode(n => { if (n.data) allRows.push(n.data); });
        const currentIndex = allRows.findIndex(r => r && r.label === data.label && r.id === data.id);
        return currentIndex === 0 || allRows[currentIndex - 1].label !== data.label;
      },
      // 병합되어 텍스트가 안보이는(숨겨진) 셀
      'ag-rowspan-hidden': params => {
        if (!params.data) return false;
        const { api, data } = params;
        const allRows: DummyDataType[] = [];
        api.forEachNode(n => { if (n.data) allRows.push(n.data); });
        const currentIndex = allRows.findIndex(r => r && r.label === data.label && r.id === data.id);
        // 이전 행이 같은 label이면 숨겨진 셀
        return currentIndex > 0 && allRows[currentIndex - 1].label === data.label;
      },
    },
    valueGetter: params => {
      const { data, api } = params;
      if (!data) return '';
      const allRows: DummyDataType[] = [];
      api.forEachNode(n => { if (n.data) allRows.push(n.data); });
      const currentIndex = allRows.findIndex(r => r && r.label === data.label && r.id === data.id);
      if (currentIndex > 0 && allRows[currentIndex - 1].label === data.label) {
        return '';
      }
      return data.label;
    },
  },
  {
    headerName: '나이',
    field: 'age',
    flex: 1,
    cellClass: 'text-right',
    editable: false,
  },
];

import type { RowClassParams } from 'ag-grid-community';
const rowClassRules = {
  // 병합 그룹에 속한 모든 row에 클래스 부여
  'ag-rowspan-row': (params: RowClassParams) => {
    const { data, api } = params;
    if (!data) return false;
    const allRows: DummyDataType[] = [];
    api.forEachNode((n: { data: DummyDataType }) => { if (n.data) allRows.push(n.data); });
    const currentIndex = allRows.findIndex(r => r && r.label === data.label && r.id === data.id);
    if (currentIndex === -1) return false;
    // 이전 또는 이후에 같은 label이 있으면 병합 그룹 row
    const isPrevSame = currentIndex > 0 && allRows[currentIndex - 1].label === data.label;
    const isNextSame = currentIndex < allRows.length - 1 && allRows[currentIndex + 1].label === data.label;
    return isPrevSame || isNextSame;
  },
};

const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Sample/Jo/SampleTable-1',
  component: AgGridReact,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const rowData = React.useMemo(() => [...DummyData].sort((a, b) => a.label.localeCompare(b.label)), []);
    return (
      <div className="ag-theme-alpine aggrid-pagination-ko h-[26rem]! striped-row-gray">
        <AgGridReact<DummyDataType>
          rowData={rowData}
          columnDefs={columnDefs}
          rowClassRules={rowClassRules}
          animateRows={false}
          alwaysShowHorizontalScroll={true}
        />
      </div>
    );
  },
};