
'use client';
import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, ICellRendererParams } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { amountUnitInputCellRenderer, editableSelectCellRenderer, numberValueFormatter, productNameTooltipValueGetter, createSelectionChangedHandler, createCellValueChangedHandler } from '@/shared/components/agGridUtils';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = { id: number; label: string; price: number };
const DummyData: DummyDataType[] = [
  { id: 1, label: '사과', price: 1000 },
  { id: 2, label: '바나나', price: 0 },
  { id: 3, label: '오렌지', price: 1200 },
  { id: 4, label: '포도', price: 1500 },
  { id: 5, label: '수박', price: 0 },
];

// 가입금액(만원) 셀 렌더러 (공통 컴포넌트 활용)
// amountInputRefs는 컴포넌트 내부에서 선언해야 함(React hook 규칙)

// columnDefs는 Default 스토리 내부에서 정의합니다.


const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/CellEditor Amount Unit Input',
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
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
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
        </>
      ),
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    // rowData를 useState가 아닌 useMemo로 고정 (입력값은 내부에서만 관리)
    const rowData = useMemo(() => DummyData, []);

    // useRef는 컴포넌트 외부에서 생성, useMemo로 context 전달
    const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);

    // cellRenderer는 useCallback으로 메모이제이션
    const coverageAmountCellRenderer = useCallback(
      (params: ICellRendererParams<DummyDataType>) =>
        amountUnitInputCellRenderer<DummyDataType>({ ...params, amountInputRefs: amountInputRefs.current }),
      []
    );

    // columnDefs도 useMemo로 메모이제이션
    const columnDefs: ColDef<DummyDataType>[] = useMemo(
      () => [
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
          headerClass: 'px-0!',
          cellClass: 'text-right',
          sortable: false,
          filter: false,
          editable: false,
          cellRenderer: coverageAmountCellRenderer,
        },
      ], [coverageAmountCellRenderer]
    );

    // context도 useMemo로 전달
    const gridContext = useMemo(() => ({ amountInputRefs: amountInputRefs.current }), []);

    return (
      <>
        <div className="ag-theme-alpine">
          <AgGridReact<DummyDataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            context={gridContext}
            domLayout='autoHeight'
          />
        </div>
      </>
    );
  },
};