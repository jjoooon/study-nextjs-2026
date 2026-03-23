
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { RichSelectModule, ClientSideRowModelModule } from 'ag-grid-enterprise';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { createCellValueChangedHandler } from '@aggrid';

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

const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/CellEditor Span',
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
              <b>Zebra Striping(줄무늬 행)</b> 스타일을 ag-Grid에서 적용하는 대표적인 두 가지 방법을 소개합니다.<br/>
              <ul>
                <li><b>1. 행 전체에 적용</b>:<br/>
                  <code>striped-row-gray</code>를 사용해 홀수/짝수 행에 클래스를 부여하고, CSS에서 배경색을 지정합니다.<br/>
                  (예: <code>&lt;div className="ag-theme-alpine aggrid-pagination-ko striped-row-gray"&gt;</code>)
                </li>
                <li><b>2. 셀 단위로 적용</b>:<br/>
                  <code>cellClassRules</code>를 사용해 특정 컬럼의 셀에만 홀수/짝수 행 배경색을 지정할 수 있습니다.<br/>
                  (예: <code>cellClassRules: &#123;'bg-gray': params =&gt; params.node.rowIndex % 2 === 1&#125;</code>)
                </li>
              </ul>
              <br/>
              <b>실제 예시</b>:
              <ul>
                <li>첫 번째 표: <b>전체 행</b>에 줄무늬 배경 적용(<code>striped-row-gray</code> 클래스 활용)</li>
                <li>두 번째 표: <b>나이 컬럼 셀</b>에만 cellClassRules로 줄무늬 배경 적용</li>
              </ul>
              <br/>
              <b>추가 팁</b>:<br/>
              - CSS 변수, Tailwind, ag-Grid 테마 클래스 등 다양한 방식으로 배경색을 지정할 수 있습니다.<br/>
              - rowClassRules는 행 전체, cellClassRules는 컬럼별/셀별로 세밀하게 스타일링할 때 유용합니다.
            </p>
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

//개별셀 줄무늬 스타일링 예시
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
    cellClass: 'text-right',
    editable: false, // 나이 직접 입력 가능
    cellClassRules: {
      'bg-[var(--color-gray-5)]': (params) => {
        const rowIndex = params.node.rowIndex ?? -1;
        return rowIndex % 2 !== 0;
      }, // 0부터 시작하므로 홀수 인덱스가 짝수행
    },
  },
];
 


<div className="ag-theme-alpine aggrid-pagination-ko h-[16rem]! striped-row-gray">
  <AgGridReact<DummyDataType>
    rowData={rowData}
    columnDefs={columnDefs}
    animateRows={false}
    alwaysShowHorizontalScroll={true}

    singleClickEdit={true}
    onCellValueChanged={onCellValueChanged}
  />
</div>
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
    const rowData = React.useMemo(() => DummyData, []);
    return (
      <div className="ag-theme-alpine aggrid-pagination-ko h-[26rem]! striped-row-gray">
        <AgGridReact<DummyDataType>
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={false}
          alwaysShowHorizontalScroll={true}
        />
      </div>
    );
  },
};