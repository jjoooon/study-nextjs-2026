
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { numberValueFormatter } from '@/shared/components/aggrid/aggridComponents';
import { ErrorMsg } from '@common/ErrorMsg';
import { Input } from '@uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

type NumberDataType = { id: number; label: string; price: number };
const numberData: NumberDataType[] = [
  { id: 1, label: '사과', price: 1000 },
  { id: 2, label: '바나나', price: 800 },
  { id: 3, label: '오렌지', price: 1200 },
  { id: 4, label: '포도', price: 1500 },
  { id: 5, label: '수박', price: 0 },
  { id: 6, label: '사과', price: 1000 },
  { id: 7, label: '바나나', price: 800 },
  { id: 8, label: '오렌지', price: 1200 },
  { id: 9, label: '포도', price: 1500 },
  { id: 10, label: '수박', price: 0 },
];
type StringDataType = { id: number; label: string; code: string };
const stringData: StringDataType[] = [
  { id: 1, label: '사과', code: 'asdfaer2324' },
  { id: 2, label: '바나나', code: 'afg43534' },
  { id: 3, label: '오렌지', code: '' },
  { id: 4, label: '포도', code: 'afg43534' },
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
              AgGrid의 <b>treeData</b> 옵션을 사용하면 폴더/파일 구조처럼 계층형 데이터를 시각화할 수 있습니다.<br />
              <b>getDataPath</b>로 각 row의 경로 배열을 지정하면 자동으로 트리 구조가 생성됩니다.
            </p>
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

type TreeRow = { id: number; label: string; price: number };
const treeData: TreeRow[] = [
  { id: 1, label: '사과', price: 1000 },
  { id: 2, label: '바나나', price: 800 },
  { id: 3, label: '오렌지', price: 1200 },
  { id: 4, label: '포도', price: 1500 },
  { id: 5, label: '수박', price: 3000 },
];

const columnDefs: ColDef<TreeRow>[] = [
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
    cellClass: 'text-right',
    editable: true, // 가격 직접 입력 가능
    valueParser: params => Number(params.newValue) || 0,
    valueFormatter: numberValueFormatter, // 천단위 콤마 표시
  },
];

<div className="ag-theme-alpine aggrid-pagination-ko">
  <AgGridReact<TreeRow>
    rowData={treeData}
    columnDefs={columnDefs}

    singleClickEdit={true} // 한 번 클릭으로 셀 수정
    domLayout="autoHeight"
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
        <div className="ag-theme-alpine aggrid-pagination-ko relative">
          <AgGridReact<NumberDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            singleClickEdit={true}
            domLayout="autoHeight"
            onCellValueChanged={onCellValueChanged}
          />
        </div>
        <div className="ag-theme-alpine aggrid-pagination-ko relative">
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