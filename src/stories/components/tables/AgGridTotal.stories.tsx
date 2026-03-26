
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { createCellValueChangedHandler } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = { id: number; label: string; sublabel: number; age: string | number };
const DummyData: DummyDataType[] = [
  { id: 1, sublabel:22323, label: '사과', age: 60 },
  { id: 2, sublabel:22323, label: '바나나', age: 80 },
  { id: 3, sublabel:22323, label: '오렌지', age: 90 },
  { id: 4, sublabel:22323, label: '포도', age: 0 },
  { id: 5, sublabel:22323, label: '수박', age: 100 },
];
const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
    colSpan: (params) => {
      // 합계 행이면 이름+서브레이블 합치기
      if (params.data?.id === 0) return 2;
      return 1;
    },
  
  },
  {
    headerName: '서브레이블',
    field: 'sublabel',
    flex: 1,
    editable: false,
    colSpan: (params) => {
      // 합계 행이면 숨김
      if (params.data?.id === 0) return 0;
      return 1;
    },
    cellClass: (params) => {
      if (params.data?.id === 0) return 'hidden';
      return '';
    },
  },
  {
    headerName: '나이',
    field: 'age',
    flex: 1,
    cellClass: (params) => {
      if (params.data?.id === 0) return 'text-right font-bold bg-gray-100';
      return 'text-right';
    },
    editable: false, // 나이 직접 입력 가능
  },
];

const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/BottomTotal',
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
              <b>하단 합계 행(합계 Row)</b> 예시입니다.<br/>
              <b>pinnedBottomRowData</b>를 활용해 하단에 합계 행을 추가하고,<br/>
              <b>colSpan</b>을 이용해 "이름+서브레이블" 컬럼을 합쳐서 표시합니다.<br/>
              실제 데이터와 합계 행을 id로 구분하여, 합계 행에만 병합/스타일을 적용할 수 있습니다.
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

type DummyDataType = { id: number; label: string; sublabel: number; age: string | number };
const DummyData: DummyDataType[] = [
  { id: 1, sublabel:22323, label: '사과', age: 60 },
  { id: 2, sublabel:22323, label: '바나나', age: 80 },
  { id: 3, sublabel:22323, label: '오렌지', age: 90 },
  { id: 4, sublabel:22323, label: '포도', age: 0 },
  { id: 5, sublabel:22323, label: '수박', age: 100 },
];
const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
    colSpan: (params) => {
      // 합계 행이면 이름+서브레이블 합치기
      if (params.data?.id === 0) return 2;
      return 1;
    },
    cellClass: (params) => {
      if (params.data?.id === 0) return 'font-bold bg-[var(--color-gray-10)]!';
      return '';
    },
  },
  {
    headerName: '서브레이블',
    field: 'sublabel',
    flex: 1,
    editable: false,
    colSpan: (params) => {
      // 합계 행이면 숨김
      if (params.data?.id === 0) return 0;
      return 1;
    },
    cellClass: (params) => {
      if (params.data?.id === 0) return 'hidden';
      return '';
    },
  },
  {
    headerName: '나이',
    field: 'age',
    flex: 1,
    cellClass: (params) => {
      if (params.data?.id === 0) return 'text-right font-bold bg-gray-100';
      return 'text-right';
    },
    editable: false, // 나이 직접 입력 가능
  },
];
 


<div className="ag-theme-alpine aggrid-pagination-ko h-[16rem]!">
   <AgGridReact<DummyDataType>
    getRowId={(params) => String(params.data.id)}
    rowData={rowData}
    columnDefs={columnDefs}
    animateRows={false}

    pinnedBottomRowData={sumRow}

    singleClickEdit={true}
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

    // 합계 행 생성 (age가 숫자인 값만 합산)
    const sumRow = React.useMemo(() => {
      const total = rowData.reduce((acc, cur) => {
        const ageNum = typeof cur.age === 'number' ? cur.age : Number(cur.age);
        return acc + (isNaN(ageNum) ? 0 : ageNum);
      }, 0);
      return [{ 
        id: 0, 
        label: '합계', 
        sublabel: '',
        age: total 
      }];
    }, [rowData]);

    return (
      <div style={{ width: '100%', height:'20rem', marginBottom: '6rem' }}>

        <div className="ag-theme-alpine">
          <AgGridReact<DummyDataType>
            // 필수
            getRowId={(params) => String(params.data.id)} // 각 row의 고유 id 지정(React key 역할)
            rowData={rowData} // 표시할 데이터 배열
            columnDefs={columnDefs} // 컬럼 정의

            // 합계 행 설정
            pinnedBottomRowData={sumRow}
          />
        </div>

      </div>
    );
  },
};