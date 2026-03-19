
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { RichSelectModule } from 'ag-grid-enterprise';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { createCellValueChangedHandler } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule, RichSelectModule]);

type SelectDataType = { id: number; label: string; price: string | number };
const SelectData: SelectDataType[] = [
  { id: 1, label: '사과', price: '60세' },
  { id: 2, label: '바나나', price: '80세' },
  { id: 3, label: '오렌지', price: '90세' },
  { id: 4, label: '포도', price: '' },
  { id: 5, label: '수박', price: 0 },
];
const columnDefs: ColDef<SelectDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '나이',
    field: 'price',
    flex: 1,
    cellClass: 'text-right editable-cell',
    editable: true, // 나이 직접 입력 가능
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { 
      values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
      valueListMaxHeight: 60,
      valueListMaxWidth: 120 
    },
  },
];


type RichSelectDataType = { id: number; label: string; price: string | number };
const RichSelectData: RichSelectDataType[] = [
  { id: 1, label: '사과', price: '60세' },
  { id: 2, label: '바나나', price: '80세' },
  { id: 3, label: '오렌지', price: '90세' },
  { id: 4, label: '포도', price: '' },
  { id: 5, label: '수박', price: 0 },
];
const columnDefsRich: ColDef<RichSelectDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '나이',
    field: 'price',
    flex: 1,
    cellClass: 'text-right editable-cell',
    editable: true, // 나이 직접 입력 가능
    cellEditor: 'agRichSelectCellEditor',
    cellEditorParams: { 
      values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
      valueListMaxHeight: 120,
      valueListMaxWidth: 120 
    },
  },
];


const meta: Meta<typeof AgGridReact<SelectDataType>> = {
  title: 'Components/Tables/AgGrid/CellEditor Select',
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
              Ag Grid는 셀을 직접 수정할 수 있도록 다양한 Cell Editor(입력 요소) 옵션을 제공합니다.<br/>
              기본적으로 텍스트, 숫자, 셀렉트박스 등 다양한 입력 UI를 지원하며, 커스텀 React 컴포넌트도 에디터로 지정할 수 있습니다.
            </p>
            <ul>
              <li>Text Cell Editor (기본값): 일반 텍스트 입력</li>
              <li>Select Cell Editor (agSelectCellEditor): 드롭다운 선택</li>
              <li>Large Text Cell Editor: textarea(여러 줄 입력)</li>
              <li>Rich Select Cell Editor: 커스텀 옵션/검색 지원 드롭다운</li>
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

type SelectDataType = { id: number; label: string; price: string | number };
const SelectData: SelectDataType[] = [
  { id: 1, label: '사과', price: '60세' },
  { id: 2, label: '바나나', price: '80세' },
  { id: 3, label: '오렌지', price: '90세' },
  { id: 4, label: '포도', price: '' },
  { id: 5, label: '수박', price: 0 },
];

const columnDefs: ColDef<SelectDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '나이',
    field: 'price',
    flex: 1,
    cellClass: 'text-right required editable-cell',
    editable: true, // 나이 직접 입력 가능
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'] },
  },
];


const [rowData, setRowData] = React.useState<SelectDataType[]>(SelectData);
const [errorRows, setErrorRows] = React.useState<number[]>(
  SelectData.filter(row => !row.price).map(row => row.id)
);

// 공용 핸들러 활용
const onCellValueChanged = React.useMemo(
  () => createCellValueChangedHandler<SelectDataType, number>('price', setRowData, setErrorRows, 'id'),
  [setRowData, setErrorRows]
);

<div className="ag-theme-alpine aggrid-pagination-ko">
  <AgGridReact<SelectDataType>
    rowData={rowData}
    columnDefs={columnDefs}

    singleClickEdit={true} // true면 한 번 클릭으로 바로 편집 시작
    domLayout="autoHeight"
    onCellValueChanged={onCellValueChanged}
  />
</div>
\`\`\`
          `}
          </Markdown>
          
          <h2>주요 옵션</h2>
          
        </>
      ),
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [rowData, setRowData] = React.useState<SelectDataType[]>(SelectData);
    const [errorRows, setErrorRows] = React.useState<number[]>(
      SelectData.filter(row => !row.price).map(row => row.id)
    );

    // 공용 핸들러 활용
    const onCellValueChanged = React.useMemo(
      () => createCellValueChangedHandler<SelectDataType, number>('price', setRowData, setErrorRows, 'id'),
      [setRowData, setErrorRows]
    );

    return (

      <>
        <div className="ag-theme-alpine aggrid-pagination-ko">
          <AgGridReact<SelectDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={false}
            alwaysShowHorizontalScroll={true}

            singleClickEdit={true}
            domLayout="autoHeight"
            onCellValueChanged={onCellValueChanged}
          />
        </div>
        <div className="ag-theme-alpine aggrid-pagination-ko">
          <AgGridReact<SelectDataType>
            rowData={rowData}
            columnDefs={columnDefsRich}
            animateRows={false}
            alwaysShowHorizontalScroll={true}

            singleClickEdit={true}
            domLayout="autoHeight"
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </>
    );
  },
};