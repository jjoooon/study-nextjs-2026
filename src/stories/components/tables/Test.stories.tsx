import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';

import testData from './test.json';

export interface IOlympicData {
  athlete: string;
  age: number | null;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

const meta: Meta = {
  title: 'Components/Tables/AgGrid/RowSpanFetchDemo',
  component: AgGridReact,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <h2>AG Grid RowSpan (셀 병합) + Fetch 데모</h2>
          <p>Taekwondo 행을 병합하여 표시하는 예시입니다. 데이터는 fetch로 가져옵니다.</p>
        </>
      ),
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    ModuleRegistry.registerModules([AllCommunityModule]);
    // JSON 파일을 직접 import하여 rowData로 사용
    const data: IOlympicData[] = testData;

    // Taekwondo 행을 식별하는 함수
    const isMergedRow = (rowIndex: number) => {
      const isMerged = data && data[rowIndex]?.sport === 'Taekwondo';
      return isMerged;
    };
    const isHiddenRowForMerge = (rowIndex: number) => {
      return data && rowIndex > 0 && data[rowIndex - 1]?.sport === 'Taekwondo';
    };

    const columnDefs = React.useMemo<ColDef[]>(() => [
      { field: 'country', spanRows: true, sort: 'asc' },
      { field: 'year', spanRows: true, sort: 'asc' },
      {
        field: 'sport',
        sort: 'asc',
        spanRows: true,
        cellRenderer: (params: any) => {
          if (isMergedRow(params.rowIndex)) {
            return (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '8px',
                  backgroundColor: '#f0f0f0',
                  fontWeight: 'bold',
                }}
              >
                {`${params.value}, ${params.value}, ${params.value}, ${params.value}`}
              </div>
            );
          }
          return params.value;
        },
        cellClass: (params: any) => {
          if (isHiddenRowForMerge(params.rowIndex)) {
            return 'hidden-merge-cell';
          }
          return '';
        },
      },
      {
        field: 'athlete',
        wrapText: true,
        autoHeight: true,
        cellStyle: {
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        },
        cellClass: (params: any) => {
          if (isHiddenRowForMerge(params.rowIndex)) {
            return 'hidden-merge-cell';
          }
          return '';
        },
      },
      { field: 'age' },
      { field: 'total' },
    ], [data]);

    const defaultColDef = React.useMemo<ColDef>(() => ({ flex: 1 }), []);

    return (
      <div style={{ padding: '20px' }}>
        <style>{`
          .ag-root .hidden-merge-cell {
            opacity: 0;
            pointer-events: none;
          }
          .ag-root .hidden-merge-cell::before {
            content: '';
          }
        `}</style>
        <div style={{ height: 500, width: '100%' }}>
          <AgGridReact<IOlympicData>
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableCellSpan={true}
          />
        </div>
      </div>
    );
  },
};
