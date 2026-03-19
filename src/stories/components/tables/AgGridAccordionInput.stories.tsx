
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { numberValueFormatter } from '@/shared/components/aggrid/aggridComponents';

ModuleRegistry.registerModules([AllCommunityModule]);

type NumberDataType = { id: number; label: string; price: number };
const numberData: NumberDataType[] = [
  { id: 1, label: '사과', price: 1000 },
  { id: 2, label: '바나나', price: 0 },
  { id: 3, label: '오렌지', price: 1200 },
  { id: 4, label: '포도', price: 1500 },
  { id: 5, label: '수박', price: 0 },

];
type StringDataType = { id: number; label: string; code: string };
const stringData: StringDataType[] = [
  { id: 1, label: '사과', code: '' },
  { id: 2, label: '바나나', code: 'afg43534' },
  { id: 3, label: '오렌지', code: '' },
  { id: 4, label: '포도', code: '' },
];


// 커스텀 cellRenderer: 셀 내부에서 input과 ErrorMsg를 함께 렌더링
const columnDefs: ColDef<NumberDataType>[] = [
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
    editable: true, // 가격 직접 입력 가능
    valueParser: params => Number(params.newValue) || 0,
    valueFormatter: numberValueFormatter, // 천단위 콤마 표시
    cellClassRules: {
      'ag-cell-error-border': params => params.value === '' || params.value === undefined || Number(params.value) === 0,
    },
  },
];
const columnDefsString: ColDef<StringDataType>[] = [
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
    cellClass: 'required',
    editable: true, // 코드 직접 입력 가능 
    valueParser: params => params.newValue || '', // 빈 문자열일 때도 ""으로 표시
    cellClassRules: {
      'ag-cell-error-border': params => params.value === '' || params.value === undefined || Number(params.value) === 0,
    },
  },
];

const meta: Meta<typeof AgGridReact<NumberDataType>> = {
  title: 'Components/Tables/AgGrid/Input',
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
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { numberValueFormatter } from '@/shared/components/aggrid/aggridComponents';

ModuleRegistry.registerModules([AllCommunityModule]);

type NumberDataType = { id: number; label: string; price: number };
const numberData: NumberDataType[] = [
  { id: 1, label: '사과', price: 1000 },
  { id: 2, label: '바나나', price: 800 },
  { id: 3, label: '오렌지', price: 1200 },
  { id: 4, label: '포도', price: 1500 },
  { id: 5, label: '수박', price: 0 },
];

const columnDefs: ColDef<NumberDataType>[] = [
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

 <div className="ag-theme-alpine aggrid-pagination-ko">
  <AgGridReact<NumberDataType>
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

export const Default: StoryObj = {
  render: () => {
    const [rowData, setRowData] = React.useState<NumberDataType[]>(numberData);
    const [errorRows, setErrorRows] = React.useState<number[]>(
      numberData.filter(row => !row.price).map(row => row.id)
    );

    // 가격이 0 또는 빈 값인 행을 추적
    const onCellValueChanged = React.useCallback((params: any) => {
      if (params.colDef.field === 'price') {
        setRowData((prev) =>
          prev.map((row) =>
            row.id === params.data.id ? { ...row, price: params.newValue } : row
          )
        );
        setErrorRows((prev) => {
          const isInvalid = params.newValue === '' || params.newValue === undefined || Number(params.newValue) === 0;
          if (isInvalid && !prev.includes(params.data.id)) {
            return [...prev, params.data.id];
          } else if (!isInvalid && prev.includes(params.data.id)) {
            return prev.filter((id) => id !== params.data.id);
          }
          return prev;
        });
      }
    }, []);

    return (

      <>
        <div className="ag-theme-alpine aggrid-pagination-ko">
          <AgGridReact<NumberDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            singleClickEdit={true}
            domLayout="autoHeight"
            onCellValueChanged={onCellValueChanged}
          />
        </div>
        <div className="ag-theme-alpine aggrid-pagination-ko">
          <AgGridReact<StringDataType>
            rowData={stringData}
            columnDefs={columnDefsString}
            singleClickEdit={true}
            domLayout="autoHeight"
          />
        </div>
      </>
    );
  },
};