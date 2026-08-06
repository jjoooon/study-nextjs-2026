/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Canvas,
  Source,
  Markdown,
  Unstyled,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModuleRegistry, AllCommunityModule, ICellRendererParams } from 'ag-grid-enterprise';
import type { ColDef, CellEditingStoppedEvent, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Button } from '@uiux/Button';
import {
  numberValueFormatter,
  createCellValueChangedHandler,
  InputWithSearchCellRenderer,
  InputWithSearchCellEditor,
  createEditableCallbackForButton,
  PortalErrorTooltipCellEditor,
} from '@aggrid';

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

// cellRenderer와 cellEditor 모두 적용된 공용 유틸 활용 컬럼 정의
const columnDefsWithButton: ColDef<Dummy2DataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '코드 (공용 InputWithSearchCellRenderer + Editor)',
    field: 'code',
    flex: 1,
    cellClass: 'required editable-cell',
    
    // 🔥 버튼 클릭 시 인풋 편집 활성화 방지 (표준 AG Grid 콜백)
    editable: createEditableCallbackForButton(),
    cellRenderer: InputWithSearchCellRenderer,
    cellEditor: InputWithSearchCellEditor,
    
    // 1. 에러 테두리 표시 조건
    cellClassRules: {
      'ag-cell-error-border': (params: { value: string | null | undefined }) => {
        const val = params.value;
        return val === null || val === undefined || val === '' || (typeof val === 'string' && val.length <= 2);
      },
    },
    
    // 2. 동적 에러 메시지 툴팁 지정
    cellStyle: (params) => {
      const val = params.value;
      if (val === null || val === undefined || val === '') {
        return { '--error-msg': '"코드를 검색해 입력해 주세요."' } as Record<string, string>;
      }
      if (typeof val === 'string' && val.length <= 2) {
        return { '--error-msg': '"코드는 3자 이상이어야 합니다."' } as Record<string, string>;
      }
      return {};
    },
    
    cellRendererParams: {
      onButtonClick: (params: ICellRendererParams<Dummy2DataType>) => {
        alert(`[공용 Renderer] 검색 버튼 클릭: ${params.value ?? '빈 값'}`);
      },
    },
    cellEditorParams: {
      onButtonClick: (val: string) => {
        alert(`[공용 Editor] 검색 버튼 클릭: ${val}`);
      },
    },
  },
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
      step: 10,
    },
    valueParser: (params) => Number(params.newValue) || 0,
    valueFormatter: numberValueFormatter, // 천단위 콤마 표시
    cellClassRules: {
      'ag-cell-error-border': (params) => params.value === '' || params.value === undefined,
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
    valueSetter: (params) => {
      const newVal = params.newValue ?? null;
      params.data.code = newVal;
      return true;
    },
    cellClassRules: {
      // 실시간 에러 테두리 표시 (입력값이 없거나 2자 이하인 경우)
      'ag-cell-error-border': (params: { value: string | null | undefined }) => {
        const val = params.value;
        return val === null || val === undefined || val === '' || (typeof val === 'string' && val.length <= 2);
      },
    },
    // 🔥 ColDef 안에서 원하는 텍스트 문구를 직접 지정 (타입 에러 완벽 해결)
    cellStyle: (params) => {
      const val = params.value;
      if (val === null || val === undefined || val === '') {
        return { '--error-msg': '"코드를 입력해 주세요."' } as Record<string, string>;
      }
      if (typeof val === 'string' && val.length <= 2) {
        return { '--error-msg': '"코드는 3자 이상 입력해야 합니다."' } as Record<string, string>;
      }
      return {};
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
    const onCellEditingStopped = React.useCallback((params: CellEditingStoppedEvent<Dummy2DataType>) => {
      if (params.colDef.field !== 'code') return;
      // rowData2를 강제로 갱신하여 cellClassRules가 즉시 반영되게 함
      setRowData2((prev) => [...prev]);
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
            domLayout="autoHeight"
          />
        </div>
        <div className="ag-theme-alpine">
          <AgGridReact<Dummy2DataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData2}
            columnDefs={columnDefsString}
            singleClickEdit={true}
            onCellEditingStopped={onCellEditingStopped}
            domLayout="autoHeight"
          />
        </div>
        <div className="ag-theme-alpine">
          <AgGridReact<Dummy2DataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData2}
            columnDefs={columnDefsWithButton}
            singleClickEdit={true}
            domLayout="autoHeight"
          />
        </div>
      </>
    );
  },
};

export const ErrorFocusTest: StoryObj = {
  render: () => {
    const [rowData] = React.useState<Dummy2DataType[]>([
      { id: 1, label: '항목 1 (정상)', code: 'A101' },
      { id: 2, label: '항목 2 (에러: 빈 값)', code: '' },
      { id: 3, label: '항목 3 (에러: 2자 이하)', code: 'B1' },
      { id: 4, label: '항목 4 (정상)', code: 'C104' },
      { id: 5, label: '항목 5 (에러: 빈 값)', code: '' },
    ]);
    const gridApiRef = React.useRef<GridApi<Dummy2DataType> | null>(null);

    const handleFocusFirstError = () => {
      if (!gridApiRef.current) return;
      const api = gridApiRef.current;
      let targetRowIndex = -1;

      api.forEachNode((node: any, index: number) => {
        if (targetRowIndex !== -1) return;
        const val = node.data?.code;
        if (!val || (typeof val === 'string' && val.length <= 2)) {
          targetRowIndex = index;
        }
      });

      if (targetRowIndex !== -1) {
        api.ensureIndexVisible(targetRowIndex);
        api.setFocusedCell(targetRowIndex, 'code');
        // 🔥 input 편집 모드 진입 (커서 포커스 활성화)
        api.startEditingCell({
          rowIndex: targetRowIndex,
          colKey: 'code',
        });
      } else {
        alert('에러가 발생한 셀이 없습니다.');
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
        <div>
          <Button variant="contained" color="primary" onClick={handleFocusFirstError}>
            🔥 첫 번째 에러 셀로 강제 포커스 이동 & 툴팁 노출
          </Button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 260 }}>
          <AgGridReact<Dummy2DataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefsString}
            singleClickEdit={true}
            onGridReady={(params) => {
              gridApiRef.current = params.api;
            }}
          />
        </div>
      </div>
    );
  },
};

// 🔥 방안 4: React Portal 기반 에러 툴팁 컬럼 정의
const columnDefsPortal: ColDef<Dummy2DataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '코드 (방안 4: Portal 기반 툴팁 CellEditor)',
    field: 'code',
    flex: 1,
    editable: true,
    cellEditor: PortalErrorTooltipCellEditor,
    cellEditorParams: {
      getErrorMessage: (val: string | null | undefined) => {
        if (!val) return '코드를 입력해 주세요 (Portal 방식).';
        if (typeof val === 'string' && val.length <= 2) return '코드는 3자 이상 입력해야 합니다.';
        return null;
      },
    },
  },
];

export const PortalErrorTooltipOption: StoryObj = {
  render: () => {
    const [rowData] = React.useState<Dummy2DataType[]>(Dummy2Data);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
            ✨ 방안 4: React Portal 기반 에러 툴팁 (그리드 밖 절단 100% 방지)
          </h3>
          <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
            그리드 폭이 가변적이거나 반응형 해상도/확대축소 시에도 document.body 상위 포털에 말풍선을 렌더링하여 절단
            현상을 방지합니다.
          </p>
        </div>
        <div className="ag-theme-alpine" style={{ height: 260 }}>
          <AgGridReact<Dummy2DataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefsPortal}
            singleClickEdit={true}
          />
        </div>
      </div>
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
          <br />
          <br />
          <h2>Overview</h2>
          <div>
            <p>
              Ag Grid는 셀을 직접 수정할 수 있도록 다양한 Cell Editor(입력 요소) 옵션을 제공합니다.
              <br />
              기본적으로 텍스트, 숫자, 셀렉트박스 등 다양한 입력 UI를 지원하며, 커스텀 React 컴포넌트도 에디터로 지정할
              수 있습니다.
            </p>
            <ul>
              <li>Text Cell Editor (기본값): 일반 텍스트 입력</li>
              <li>Number Cell Editor: 숫자 입력 (type=&quot;number&quot;)</li>
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
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  valueParser: params =&gt; Number(params.newValue) || 0
                </td>
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
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  cellClassRules: {'{"ag-cell-error-border": params =&gt; params.value === ""}'}
                </td>
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

          <h2>에러 테두리 및 커스텀 에러 메시지 설정 가이드</h2>
          <p>
            셀 편집 시 유효성 검사를 수행하여 **에러 테두리(`ag-cell-error-border`)**를 표시하거나,
            ColDef의 <strong>`cellStyle`</strong>을 활용하여 **동적 에러 메시지(`--error-msg`)**를 지정할 수 있습니다.
          </p>
          <Markdown>
            {`
\`\`\`tsx
const columnDefs: ColDef<MyDataType>[] = [
  {
    headerName: '코드',
    field: 'code',
    cellClass: 'required editable-cell',
    editable: true,
    
    // 1. 에러 테두리 조건 지정 (ag-cell-error-border)
    cellClassRules: {
      'ag-cell-error-border': (params) => {
        const val = params.value;
        return val === null || val === undefined || val === '' || (typeof val === 'string' && val.length <= 2);
      },
    },
    
    // 2. ColDef 내에서 동적 에러 메시지 문구 직접 지정 (--error-msg)
    cellStyle: (params) => {
      const val = params.value;
      if (val === null || val === undefined || val === '') {
        return { '--error-msg': '"코드를 입력해 주세요."' } as Record<string, string>;
      }
      if (typeof val === 'string' && val.length <= 2) {
        return { '--error-msg': '"코드는 3자 이상 입력해야 합니다."' } as Record<string, string>;
      }
      return {};
    },
  },
];
\`\`\`
          `}
          </Markdown>

          <h2>커스텀 Cell Editor 사용법</h2>
          <p>
            cellEditor에 React 컴포넌트 할당
            <br />
            컴포넌트는 props.value, props.onValueChange, props.stopEditing 등 다양한 prop을 받음
          </p>
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
