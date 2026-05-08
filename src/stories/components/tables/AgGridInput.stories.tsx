
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, ICellRendererParams } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-enterprise';
import { numberValueFormatter, createCellValueChangedHandler } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = { id: number; label: string; price: number };
const DummyData: DummyDataType[] = [
  { id: 1, label: '사과', price: 1000 },
  { id: 2, label: '바나나', price: 0 },
  { id: 3, label: '오렌지', price: 1200 },
  { id: 4, label: '포도', price: 1500 },
  { id: 5, label: '수박', price: 0 },
];
type Dummy2DataType = { id: number; label: string; code: string | null };
const Dummy2Data: Dummy2DataType[] = [
  { id: 1, label: '사과', code: null },
  { id: 2, label: '바나나', code: 'afg43534' },
  { id: 3, label: '오렌지', code: null },
  { id: 4, label: '포도', code: null },
  { id: 5, label: '메론', code: null },
  { id: 6, label: '수박', code: null },
];


// 커스텀 cellRenderer: 셀 내부에서 input과 ErrorMsg를 함께 렌더링
const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '가격',
    field: 'price',
    flex: 1,
    cellClass: 'text-right required editable-cell',
    editable: true, // 가격 직접 입력 가능
    cellEditor: 'agNumberCellEditor',
    cellEditorParams: {
      min: 0,
      max: 1000000,
      step:10
    },
    valueParser: params => Number(params.newValue) || 0,
    valueFormatter: numberValueFormatter, // 천단위 콤마 표시
    cellClassRules: {
      'ag-cell-error-border': params => params.value === '' || params.value === undefined,
    },
  },
];
const columnDefsString: ColDef<Dummy2DataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '코드',
    field: 'code',
    flex: 1,
    cellClass: 'required editable-cell',
    editable: true, // 코드 직접 입력 가능 
    valueSetter: params => {
      const newVal = params.newValue ?? null;
      params.data.code = newVal;
      return true; 
    },
    cellClassRules: {
      // 저장된 값을 기준으로 실시간 에러 테두리 표시
      'ag-cell-error-border': (params: { value: string | null | undefined }) => {
        const val = params.value;
        if (val === null || val === undefined ) return false;
        if (Number(val) === 0) return true;
        if (typeof val === 'string' && val.length <= 2) return true;
        return false;
      },
      // 에러 메시지용 클래스 추가
      'has-error-msg': (params: { value: string | null | undefined }) => {
        return (typeof params.value === 'string' && params.value.length <= 2);
      }
    },

  },
];

export const Default: StoryObj = {
  render: () => {
    const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
    const [rowData2, setRowData2] = React.useState<Dummy2DataType[]>(Dummy2Data);

    // 가격 컬럼용 공용 핸들러
    const onCellValueChanged = React.useMemo(
      () => createCellValueChangedHandler<DummyDataType, number>('price', setRowData, () => {}, 'id'),
      [setRowData]
    );

    // 코드 컬럼 실시간 에러 체크 및 반영
    const onCellEditingStopped = React.useCallback((params: any) => {
      if (params.colDef.field !== 'code') return;
      const val = params.value;
      // 에러 조건: null/undefined 제외, 0 또는 2글자 이하
      const isError = val !== null && val !== undefined && (Number(val) === 0 || (typeof val === 'string' && val.length <= 2));
      // rowData2를 강제로 갱신하여 cellClassRules가 즉시 반영되게 함
      setRowData2(prev => [...prev]);
    }, []);

    return (
      <>
        <div className="ag-theme-alpine">
          <AgGridReact<DummyDataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            domLayout='autoHeight'
          />
        </div>
        <div className="ag-theme-alpine">
          <AgGridReact<Dummy2DataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData2}
            columnDefs={columnDefsString}
            singleClickEdit={true}
            onCellEditingStopped={onCellEditingStopped}
            domLayout='autoHeight'
          />
        </div>
      </>
    );
  },
};

const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/CellEditor Input',
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
              <li>Number Cell Editor: 숫자 입력 (type="number")</li>
              <li>Select Cell Editor: 드롭다운 선택</li>
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
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-enterprise';
import { numberValueFormatter, createCellValueChangedHandler } from '@aggrid'

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = { id: number; label: string; price: number };
const DummyData: DummyDataType[] = [
  { id: 1, label: '사과', price: 1000 },
  { id: 2, label: '바나나', price: 800 },
  { id: 3, label: '오렌지', price: 1200 },
  { id: 4, label: '포도', price: 1500 },
  { id: 5, label: '수박', price: 0 },
];

const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '가격',
    field: 'price',
    flex: 1,
    cellClass: 'text-right required',
    editable: true, // true/false. 셀을 직접 수정 가능하게 할지 여부
    valueParser: params => Number(params.newValue) || 0,
    valueFormatter: numberValueFormatter, // 천단위 콤마 표시
    cellClassRules: {
      'ag-cell-error-border': params => params.value === '' || params.value === undefined || Number(params.value) === 0,
    },
  },
];


const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
const [errorRows, setErrorRows] = React.useState<number[]>(
  DummyData.filter(row => !row.price).map(row => row.id)
);

// 공용 핸들러 활용
const onCellValueChanged = React.useMemo(
  () => createCellValueChangedHandler<DummyDataType, number>('price', setRowData, setErrorRows, 'id'),
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
          
          <h2>주요 옵션</h2>
          <table style={{ minWidth: 600, borderCollapse: 'collapse', marginBottom: 24 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: 8, background: '#f8f8f8' }}>옵션명</th>
                <th style={{ border: '1px solid #ddd', padding: 8, background: '#f8f8f8' }}>설명</th>
                <th style={{ border: '1px solid #ddd', padding: 8, background: '#f8f8f8' }}>타입</th>
                <th style={{ border: '1px solid #ddd', padding: 8, background: '#f8f8f8' }}>예시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>editable</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>셀 직접 수정 가능 여부</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>boolean</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>editable: true</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>cellEditor</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>커스텀 입력 컴포넌트 지정</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>string | React.Component</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>cellEditor: MyEditor</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>valueParser</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>입력값 → 저장값 변환 함수</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>(params) =&gt; any</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>valueParser: params =&gt; Number(params.newValue) || 0</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>valueFormatter</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>저장값 → 표시값 변환 함수</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>(params) =&gt; string</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>valueFormatter: numberValueFormatter</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>cellClassRules</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>조건부 셀 클래스 지정</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Record&lt;string, (params) =&gt; boolean&gt;</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>cellClassRules: {'{"ag-cell-error-border": params =&gt; params.value === ""}'}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>singleClickEdit</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>한 번 클릭으로 편집 시작</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>boolean</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>singleClickEdit: true</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>onCellValueChanged</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>값 변경 시 콜백</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>(params) =&gt; void</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>onCellValueChanged: fn</td>
              </tr>
            </tbody>
          </table>

          <h2>커스텀 Cell Editor 사용법</h2>
          <p>cellEditor에 React 컴포넌트 할당<br/>
          컴포넌트는 props.value, props.onValueChange, props.stopEditing 등 다양한 prop을 받음</p>
          <Markdown>
            {`
\`\`\`tsx
const MyEditor = (props) => (
  <input
    value={props.value}
    onChange={e => props.onValueChange(e.target.value)}
    onBlur={props.stopEditing}
  />
);

// 컬럼 정의
{
  field: 'price',
  editable: true,
  cellEditor: MyEditor,
}
\`\`\`
          `}
          </Markdown>
        </>
      ),
    },
  },
};

export default meta;
