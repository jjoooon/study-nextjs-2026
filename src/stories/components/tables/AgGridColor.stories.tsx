/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import {
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

ModuleRegistry.registerModules([AllCommunityModule]);

type ColorCaseDataType = {
  id: number;
  caseName: string;
  text1: string;
  text2: string;
  description: string;
};

const ColorCasesData: ColorCaseDataType[] = [
  { id: 1, caseName: 'default', text1: '텍스트', text2: '텍스트', description: 'default 상태' },
  { id: 2, caseName: 'hover', text1: '텍스트', text2: '텍스트', description: 'hover 상태' },
  { id: 3, caseName: 'selected', text1: '텍스트', text2: '텍스트', description: 'selected 상태' },
  { id: 4, caseName: 'click', text1: '텍스트', text2: '텍스트', description: 'click 상태' },
  { id: 5, caseName: 'editable', text1: '텍스트', text2: '텍스트', description: 'editable 상태' },
  { id: 6, caseName: 'edited', text1: '텍스트', text2: '텍스트', description: 'edited 상태' },
  { id: 7, caseName: 'total (highlight)', text1: '텍스트', text2: '텍스트', description: 'total (highlight) 상태' },
  { id: 8, caseName: 'decrease', text1: '텍스트', text2: '텍스트', description: 'decrease 상태' },
  { id: 9, caseName: 'error', text1: '텍스트', text2: '텍스트', description: 'error 상태' },
  { id: 10, caseName: 'success', text1: '텍스트', text2: '텍스트', description: 'success 상태' },
  { id: 11, caseName: 'standard', text1: '텍스트', text2: '텍스트', description: 'standard 상태' },
  { id: 12, caseName: 'bookmark', text1: '텍스트', text2: '텍스트', description: 'bookmark 상태' },
  { id: 13, caseName: 'cancel', text1: '텍스트', text2: '텍스트', description: 'cancel 상태' },
];

const getCaseClassName = (caseName?: string) => {
  if (!caseName || caseName === 'default') return '';
  const key = caseName.split(' ')[0]; // 'total (highlight)' -> 'total'
  return `is${key.charAt(0).toUpperCase()}${key.slice(1)}`;
};

const columnDefs: ColDef<ColorCaseDataType>[] = [
  {
    headerName: 'Case 구문 (종류)',
    field: 'caseName',
    width: 200,
    cellClass: (params) => `font-semibold text-center ${getCaseClassName(params.data?.caseName)}`,
  },
  {
    headerName: '셀 1 (예시)',
    field: 'text1',
    width: 150,
    cellClass: (params) => `text-center ${getCaseClassName(params.data?.caseName)}`,
  },
  {
    headerName: '셀 2 (예시)',
    field: 'text2',
    width: 150,
    cellClass: (params) => `text-center ${getCaseClassName(params.data?.caseName)}`,
  },
  {
    headerName: '적용 cellClass / 설명',
    field: 'description',
    flex: 1,
    cellClass: (params) => `text-left ${getCaseClassName(params.data?.caseName)}`,
    valueGetter: (params) => {
      const cls = getCaseClassName(params.data?.caseName);
      return `${cls} (${params.data?.description || ''})`;
    },
  },
];

const meta: Meta<typeof AgGridReact<ColorCaseDataType>> = {
  title: 'Components/Tables/AgGrid/Color',
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
              <b>AG Grid 셀 상태별 컬러 스타일 가이드 (Case 별 컬러 모음)</b>입니다.
              <br />
              각 케이스별로 <code>is[CaseName]</code> 형태의 클래스(예: <code>isHover</code>, <code>isSelected</code>, <code>isClick</code>, <code>isEditable</code>, <code>isEdited</code>, <code>isTotal</code>, <code>isDecrease</code>, <code>isError</code>, <code>isSuccess</code>, <code>isStandard</code>, <code>isBookmark</code>, <code>isCancel</code>)가 추가되어 적용됩니다.
            </p>
          </div>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    return (
      <div className="w-full">
        <div className="ag-theme-alpine">
          <AgGridReact<ColorCaseDataType>
            getRowId={(params) => String(params.data.id)}
            rowData={ColorCasesData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            defaultColDef={{
              sortable: true,
              resizable: true,
            }}
          />
        </div>
      </div>
    );
  },
};
