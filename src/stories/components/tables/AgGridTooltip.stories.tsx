/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import * as React from 'react';

import { Title, Primary, Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { RichSelectModule } from 'ag-grid-enterprise';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { Button } from '@uiux/Button';

ModuleRegistry.registerModules([AllCommunityModule, RichSelectModule]);

type DummyDataType = { id: number; label: string; age: string | number; description?: string };
const DummyData: DummyDataType[] = [
  { id: 1, label: '홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동', age: 30, description: '사용인에 대한 안내 메시지입니다.' },
  { id: 2, label: '김철수', age: 25, description: '사용인에 대한 안내 메시지입니다.' },
];

function CustomTooltip(props: { value: string }) {
  return (
    <div className="bg-gray-800 text-white p-2 rounded shadow-lg text-sm tracking-tighter">
      <p>{props.value}</p>
    </div>
  );
}

const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
    tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'label' }),
  },
   {
    headerName: '설명',
    field: 'description',
    flex: 1,
    editable: false,

    tooltipComponent: CustomTooltip, // 위에서 만든 컴포넌트 연결
    tooltipField: 'description',
  },
  {
    headerName: '나이',
    field: 'age',
    flex: 1,
    cellClass: 'text-right',
    editable: false, // 나이 직접 입력 가능

    cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="none" size="md" only="icon" className="truncate w-full block">
              {params.data?.age}
            </Button>
          </TooltipTrigger>
          <TooltipContent variant="default" side="top" align="center" sideOffset={5}>
            {'사용인에 대한 안내 메시지입니다.'}
          </TooltipContent>
        </Tooltip>
      ),
  },
];

const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/Tooltip',
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
            <b>ag-Grid Tooltip 설정</b><br/>
            <ul>
              <li>
                <b>tooltipValueGetter</b>:<br/>
                셀 값이나 가공된 문자열을 툴팁 내용으로 반환할 수 있습니다.<br/>
                <code>tooltipValueGetter={'createTooltipValueGetter({ field: "label" })'}</code>처럼 사용합니다.<br/>
                <code>tooltipShowMode="whenTruncated"</code>를 함께 쓰면 말줄임일 때만 툴팁이 표시됩니다.
              </li>
            </ul>
          </div>
          <Primary />

          <Markdown>
            {`
\`\`\`tsx
import { createTooltipValueGetter } from '@aggrid';

<div className="ag-theme-alpine">
  <AgGridReact<DummyDataType>
    columnDefs={[
      {
        headerName: '이름',
        field: 'label',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'label' }),
      },
    ]}
    tooltipShowMode="whenTruncated"
    tooltipShowDelay={0}
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

    return (
      <div>
        <div className="ag-theme-alpine">
          <AgGridReact<DummyDataType>
            // 필수
            getRowId={(params) => String(params.data.id)} // 각 row의 고유 id 지정(React key 역할)
            rowData={rowData} // 표시할 데이터 배열
            columnDefs={columnDefs} // 컬럼 정의
            noRowsOverlayComponent={AgGridEmptyComponent} // 데이터 없을 때 표시할 컴포넌트

            // 선택
            domLayout="autoHeight" // 높이 선택 normal, autoHeight, print

            tooltipShowMode="whenTruncated"
            tooltipShowDelay={0}
            tooltipHideDelay={3000}

          />
        </div>
      </div>
    );
  },
};