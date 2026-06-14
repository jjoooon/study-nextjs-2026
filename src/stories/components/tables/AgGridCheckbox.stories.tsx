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
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { createCellValueChangedHandler, AgGridEmptyComponent } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = {
  id: number;
  label: string;
  isCheck: boolean;
  checked?: boolean;
  disabled?: boolean;
  allDisabled?: boolean;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    label: '사과',
    isCheck: false,
    checked: true,
    disabled: true,
    allDisabled: true,
  },
  {
    id: 2,
    label: '바나나',
    isCheck: false,
    checked: false,
    disabled: true,
  },
  {
    id: 3,
    label: '오렌지',
    isCheck: true,
    checked: true,
  },
  {
    id: 4,
    label: '포도',
    isCheck: false,
    checked: true,
  }, // checked: true면 체크박스 비활성화 스타일
];

const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    cellClassRules: {
      'my-all-disabled': (params) => !!params.data?.allDisabled,
    },
  },
  {
    headerName: '선택여부',
    field: 'isCheck',
    cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
    cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
    cellClass: 'text-center editable-cell',
    // 선택된 행이 아니고 allDisabled가 아닌 경우에만 편집 가능
    editable: (params) => !params.node.isSelected() && !params.data?.allDisabled,

    // cellClassRules: 셀에 allDisabled가 true면 my-all-disabled 클래스 적용(스타일로 비활성화 표시)
    cellClassRules: {
      'my-all-disabled': (params) => !!params.data?.allDisabled,
    },

    // cellRendererParams: 커스텀 체크박스(cellRenderer)로 disabled 속성 전달(실제 체크박스 비활성화)
    cellRendererParams: (params: { data: DummyDataType }) => ({
      disabled: !!params.data?.allDisabled,
    }),

    // cellEditorParams: 커스텀 체크박스(cellEditor)로 disabled 속성 전달(에디터 모드에서도 비활성화)
    cellEditorParams: (params: { data: DummyDataType }) => ({
      disabled: !!params.data?.allDisabled,
    }),
  },
];

const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/CellEditor Checkbox',
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
              이 예제는 <b>ag-Grid 기본 selection 체크박스</b>와 <b>셀 에디터 체크박스</b>를 동시에 사용하는 패턴을
              보여줍니다.
              <br />
            </p>
            <ul>
              <li>
                <b>좌측 selection 체크박스</b>: ag-Grid의 기본 행 선택 기능(멀티 선택, 전체 선택, disabled/비활성화
                지원)
              </li>
              <li>
                <b>&quot;선택여부&quot; 컬럼 체크박스</b>: cellEditor/cellRenderer로 구현된 독립 체크박스(행 데이터의
                isCheck 필드와 연결, selection과는 별개로 동작)
              </li>
              <li>
                <b>allDisabled</b>가 true인 행: 모든 입력 및 체크박스가 비활성화(선택, 편집, 클릭 모두 불가, 스타일로도
                구분)
              </li>
              <li>홀수행 배경색, disabled/checked 등 다양한 상태별 스타일 적용 예시 포함</li>
            </ul>
            <br />
            <b>구성 요약</b>:
            <ul>
              <li>좌측 selection 체크박스와 &quot;선택여부&quot; 컬럼 체크박스는 서로 연결되지 않고 독립적으로 동작</li>
              <li>
                각 체크박스의 disabled/편집 가능 여부는 <code>disabled</code>, <code>allDisabled</code> 필드로 제어
              </li>
              <li>cellRendererParams, cellEditorParams로 커스텀 체크박스에 disabled 전달</li>
              <li>rowClassRules, cellClassRules로 상태별 스타일 지정</li>
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
import { createCellValueChangedHandler } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = { id: number; label: string; isCheck: boolean; checked?: boolean; disabled?: boolean; allDisabled?: boolean };
const DummyData: DummyDataType[] = [
  { 
    id: 1, 
    label: '사과', 
    isCheck: false, 
    checked: true, 
    disabled: true, 
    allDisabled: true 
  }, 
  { 
    id: 2, 
    label: '바나나', 
    isCheck: false, 
    checked: false, 
    disabled: true 
  },
  { 
    id: 3, 
    label: '오렌지', 
    isCheck: true, 
    checked: true 
  },
  { 
    id: 4, 
    label: '포도', 
    isCheck: false, 
    checked: true 
  }, // checked: true면 체크박스 비활성화 스타일
];

const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    cellClassRules: {
      'my-all-disabled': params => !!params.data?.allDisabled,
    },
  },
  {
    headerName: '선택여부',
    field: 'isCheck',
    cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
    cellEditor: 'agCheckboxCellEditor',     // ag-Grid 기본 체크박스 에디터 사용
    
    // 선택된 행이 아니고 allDisabled가 아닌 경우에만 편집 가능
    editable: params => !params.node.isSelected() && !params.data?.allDisabled, 

    // cellClassRules: 셀에 allDisabled가 true면 my-all-disabled 클래스 적용(스타일로 비활성화 표시)
    cellClassRules: {
      'my-all-disabled': params => !!params.data?.allDisabled,
      'bg-[var(--color-gray-5)]': (params) => {
        const rowIndex = params.node.rowIndex ?? -1;
        return rowIndex % 2 !== 0;
      }, // 0부터 시작하므로 홀수 인덱스가 짝수행
    },

    // cellRendererParams: 커스텀 체크박스(cellRenderer)로 disabled 속성 전달(실제 체크박스 비활성화)
    cellRendererParams: (params: { data: DummyDataType }) => ({
      disabled: !!params.data?.allDisabled,
    }),

    // cellEditorParams: 커스텀 체크박스(cellEditor)로 disabled 속성 전달(에디터 모드에서도 비활성화)
    cellEditorParams: (params: { data: DummyDataType }) => ({
      disabled: !!params.data?.allDisabled,
    }),

  },
];


const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
const [errorRows, setErrorRows] = React.useState<number[]>(
  DummyData.filter(row => !row.isCheck).map(row => row.id)
);

// 공용 핸들러 활용
const onCellValueChanged = React.useMemo(
  () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
  [setRowData, setErrorRows]
);

<div className="ag-theme-alpine aggrid-pagination-ko">
   <AgGridReact<DummyDataType>
    rowData={rowData}
    columnDefs={columnDefs}
    animateRows={false} // 행 애니메이션 비활성화(성능 최적화)
    alwaysShowHorizontalScroll={true} // 가로 스크롤 항상 표시
    singleClickEdit={true} // 셀 한 번 클릭 시 에디터 진입
    onCellValueChanged={onCellValueChanged} // 셀 값 변경 핸들러

    // ag-Grid selection(좌측 체크박스) 옵션
    rowSelection={{
      mode: 'multiRow', // 다중 선택 모드
      headerCheckbox: true, // 헤더(전체 선택) 체크박스 표시
      checkboxes: true, // 각 행에 체크박스 표시
      enableClickSelection: false, // 셀 클릭 시 selection 변경 비활성화(오직 체크박스 클릭만 허용)
      isRowSelectable: params => !params.data?.disabled && !params.data?.allDisabled, // disabled/allDisabled 행은 선택 불가
    }}
    // selectionColumnDef 제거: selection 컬럼은 columnDefs에서 직접 정의

    // 행 상태별 스타일 적용 예시
    rowClassRules={{
      'my-row-disabled': params => !!params.data?.disabled, // disabled: true면 비활성화 스타일
      'my-row-isCheck': params => !!params.data?.checked,   // checked: true면 강조 스타일
      'my-all-disabled': params => !!params.data?.allDisabled, // allDisabled: true면 완전 비활성화 스타일
      // ...다른 규칙 추가 가능
    }}

    // 그리드 최초 렌더 시 checked: true인 행을 selection에 반영
    onGridReady={params => {
      params.api.forEachNode(node => {
        if (node.data?.checked) {
          node.setSelected(true);
        }
      });
    }}
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
      DummyData.filter((row) => !row.isCheck).map((row) => row.id)
    );

    // 공용 핸들러 활용
    const onCellValueChanged = React.useMemo(
      () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
      [setRowData, setErrorRows]
    );

    return (
      <>
        <div className="ag-theme-alpine">
          <AgGridReact<DummyDataType>
            // 필수
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            noRowsOverlayComponent={AgGridEmptyComponent}
            domLayout="autoHeight"
            // ag-Grid selection(좌측 체크박스) 옵션
            rowSelection={{
              mode: 'multiRow', // 다중 선택 모드
              headerCheckbox: true, // 헤더(전체 선택) 체크박스 표시
              checkboxes: true, // 각 행에 체크박스 표시
              enableClickSelection: false, // 셀 클릭 시 selection 변경 비활성화(오직 체크박스 클릭만 허용)
              isRowSelectable: (params) => !params.data?.disabled && !params.data?.allDisabled, // disabled/allDisabled 행은 선택 불가
            }}
            selectionColumnDef={{
              width: 30,
              cellClass: 'text-center editable-cell',
            }}
            // 행 상태별 스타일 적용 예시
            rowClassRules={{
              'my-row-disabled': (params) => !!params.data?.disabled,
              // disabled: true면 비활성화 스타일
              'my-row-isCheck': (params) => !!params.data?.checked,
              // checked: true면 강조 스타일
              'my-all-disabled': (params) => !!params.data?.allDisabled,
              // allDisabled: true면 완전 비활성화 스타일
              // ...다른 규칙 추가 가능
            }}
            // 그리드 최초 렌더 시 checked: true인 행을 selection에 반영
            onGridReady={(params) => {
              params.api.forEachNode((node) => {
                if (node.data?.checked) {
                  node.setSelected(true);
                }
              });
            }}
          />
        </div>
      </>
    );
  },
};
