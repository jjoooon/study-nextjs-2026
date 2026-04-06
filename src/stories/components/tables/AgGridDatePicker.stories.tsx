
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { RichSelectModule } from 'ag-grid-enterprise';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { createCellValueChangedHandler, DatePickerCellEditor } from '@/shared/components/agGridUtils';

ModuleRegistry.registerModules([AllCommunityModule, RichSelectModule]);

type DummyDataType = { id: number; label: string; date: string | number };
const DummyData: DummyDataType[] = [
  { id: 1, label: '사과', date: '2023-01-01' },
  { id: 2, label: '바나나', date: '2022-12-15' },
  { id: 3, label: '오렌지', date: '2024-03-20' },
];

const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '날짜',
    field: 'date',
    flex: 1,
    cellClass: 'text-center editable-cell',
    editable: true, // 날짜 직접 입력 가능
    cellEditor: DatePickerCellEditor,
  },
];


const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/CellEditor DatePicker',
  component: AgGridReact,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>Overview</h2>
          <div>
            <p>
              <b>DatePickerCellEditor</b>를 cellEditor로 지정하면 날짜 입력이 가능합니다.<br/>
              <code>shared/components/common/DatePicker</code>를 활용한 커스텀 달력/직접입력 UI를 제공합니다.<br/>
              셀 클릭 시 달력 또는 직접 입력(YYYY-MM-DD) 모두 지원합니다.
            </p>
            <ul>
              <li>DatePicker Cell Editor: 커스텀 달력/직접입력 지원</li>
              <li>Text Cell Editor (기본값): 일반 텍스트 입력</li>
              <li>Select Cell Editor (agSelectCellEditor): 드롭다운 선택</li>
            </ul>
          </div>
          <Primary />

          <Markdown>
            {`
\`\`\`tsx
import * as React from 'react';

import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { createCellValueChangedHandler } from '@aggrid'

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = { id: number; label: string; date: string | number };
const DummyData: DummyDataType[] = [
  { id: 1, label: '사과', date: '2023-01-01' },
  { id: 2, label: '바나나', date: '2022-12-15' },
  { id: 3, label: '오렌지', date: '2024-03-20' },
];

const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '날짜',
    field: 'date',
    flex: 1,
    cellClass: 'text-center editable-cell',
    editable: true, // 날짜 직접 입력 가능
    cellEditor: DatePickerCellEditor,
  },
];


const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
const [errorRows, setErrorRows] = React.useState<number[]>(
  DummyData.filter(row => !row.date).map(row => row.id)
);

// 공용 핸들러 활용
const onCellValueChanged = React.useMemo(
  () => createCellValueChangedHandler<DummyDataType, number>('date', setRowData, setErrorRows, 'id'),
  [setRowData, setErrorRows]
);

<div className="ag-theme-alpine aggrid-pagination-ko">
   <AgGridReact<DummyDataType>
    rowData={rowData}
    columnDefs={columnDefs}
    animateRows={false}
    alwaysShowHorizontalScroll={true}
    singleClickEdit={true}

    domLayout="autoHeight"
    onCellValueChanged={onCellValueChanged}
  />
</div>
\`\`\`
          `}
          </Markdown>
        </>
      ),
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
    const [errorRows, setErrorRows] = React.useState<number[]>(
      DummyData.filter(row => !row.date).map(row => row.id)
    );

    // 공용 핸들러 활용
    const onCellValueChanged = React.useMemo(
      () => createCellValueChangedHandler<DummyDataType, number>('date', setRowData, setErrorRows, 'id'),
      [setRowData, setErrorRows]
    );

    return (
      <>
        <div className="ag-theme-alpine">
          <AgGridReact<DummyDataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout='autoHeight'
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </>
    );
  },
};