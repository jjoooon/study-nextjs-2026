
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { RichSelectModule } from 'ag-grid-enterprise';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { createCellValueChangedHandler } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule, RichSelectModule]);

type DummyDataType = { id: number; label: string; age: string | number };
const DummyData: DummyDataType[] = [
  { id: 1, label: '사과', age: '60세' },
  { id: 2, label: '바나나', age: '80세' },
  { id: 3, label: '오렌지', age: '90세' },
  { id: 4, label: '포도', age: '' },
  { id: 5, label: '수박', age: 0 },
];
const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '나이',
    field: 'age',
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


const columnDefsRich: ColDef<DummyDataType>[] = [
  {
    headerName: 'Rich Select',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '나이',
    field: 'age',
    flex: 1,
    cellClass: 'text-right editable-cell',
    editable: true, // 나이 직접 입력 가능

    cellEditor: 'agRichSelectCellEditor',
    cellEditorParams: {
      values: ['A_INS', 'B_INS', 'C_INS'], // 실제 값
      // 리스트에 보여줄 모양을 커스텀 (로고 + 이름)
      cellRenderer: (params: { value: string }) => {
        return (
          <div className="border rounded px-2 py-1 items-center gap-1 w-full flex">
            <span>{params.value}</span>
          </div>
        );
      },
      searchType: 'matchAny', // 검색 방식 설정
      allowTyping: true,      // 직접 타이핑 허용
      filterList: true,       // 타이핑 시 리스트 필터링
    },
  },
];


const meta: Meta<typeof AgGridReact<DummyDataType>> = {
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
              <b>agSelectCellEditor</b>와 <b>agRichSelectCellEditor</b>를 사용하면 드롭다운 선택 UI를 셀에서 바로 사용할 수 있습니다.<br/>
              Rich Select는 옵션 커스텀 렌더링, 검색, 직접 입력 등 고급 기능을 지원합니다.<br/>
              <b>셀 클릭 → 리스트 선택/검색/직접입력 모두 지원</b>하며, cellRenderer로 옵션 UI를 자유롭게 꾸밀 수 있습니다.
            </p>
            <ul>
              <li>Select Cell Editor (agSelectCellEditor): 기본 드롭다운 선택</li>
              <li>Rich Select Cell Editor (agRichSelectCellEditor): 커스텀 옵션/검색/직접입력 지원</li>
              <li>cellRenderer: 옵션 리스트의 UI를 React로 커스텀 가능</li>
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

type DummyDataType = { id: number; label: string; age: string | number };
const DummyData: DummyDataType[] = [
  { id: 1, label: '사과', age: '60세' },
  { id: 2, label: '바나나', age: '80세' },
  { id: 3, label: '오렌지', age: '90세' },
  { id: 4, label: '포도', age: '' },
  { id: 5, label: '수박', age: 0 },
];

const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '나이',
    field: 'age',
    flex: 1,
    cellClass: 'text-right editable-cell',
    editable: true,

    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'] },
  },
];

// Rich Select 예시
const columnDefsRich: ColDef<DummyDataType>[] = [
  {
    headerName: 'Rich Select',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '나이',
    field: 'age',
    flex: 1,
    cellClass: 'text-right editable-cell',
    editable: true, 

    cellEditor: 'agRichSelectCellEditor',
    cellEditorParams: {
      values: ['A_INS', 'B_INS', 'C_INS'], // 실제 값
      cellRenderer: (params: { value: string }) => {
        return (
          <div className="border rounded px-2 py-1 items-center gap-1 w-full flex">
            <span>{params.value}</span>
          </div>
        );
      },
      searchType: 'matchAny', // 검색 방식 설정
      allowTyping: true,      // 직접 타이핑 허용
      filterList: true,       // 타이핑 시 리스트 필터링
    },
  },
];


const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
const [errorRows, setErrorRows] = React.useState<number[]>(
  DummyData.filter(row => !row.age).map(row => row.id)
);

// 공용 핸들러 활용
const onCellValueChanged = React.useMemo(
  () => createCellValueChangedHandler<DummyDataType, number>('age', setRowData, setErrorRows, 'id'),
  [setRowData, setErrorRows]
);

<div className="ag-theme-alpine aggrid-pagination-ko">
  <AgGridReact<DummyDataType>
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
      DummyData.filter(row => !row.age).map(row => row.id)
    );

    // 공용 핸들러 활용
    const onCellValueChanged = React.useMemo(
      () => createCellValueChangedHandler<DummyDataType, number>('age', setRowData, setErrorRows, 'id'),
      [setRowData, setErrorRows]
    );

    return (

      <>
        <div className="ag-theme-alpine aggrid-pagination-ko h-[16rem]!">
          <AgGridReact<DummyDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={false}
            alwaysShowHorizontalScroll={true}

            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
        <div className="ag-theme-alpine aggrid-pagination-ko h-[16rem]!">
          <AgGridReact<DummyDataType>
            rowData={rowData}
            columnDefs={columnDefsRich}
            animateRows={false}
            alwaysShowHorizontalScroll={true}

            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </>
    );
  },
};