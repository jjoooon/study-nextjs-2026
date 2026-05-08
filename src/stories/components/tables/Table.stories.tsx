/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

type ContentTableStoryProps = React.ComponentProps<typeof Table> & {
  tableVariant?: 'default' | 'sub';
  showCaption?: boolean; 
  showSecondRow?: boolean;
};

const meta: Meta<ContentTableStoryProps> = {
  title: 'Components/Tables/ContentTable',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                Table 컴포넌트는 기본 테이블 구조를 구성하기 위한 UI 요소입니다.
                TableHeader/TableBody/TableRow/TableCell 조합으로 표 레이아웃을 구성합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>기본 사용 예시는 아래와 같습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@uiux/Table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead>역할</TableHead>
      <TableHead>상태</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>홍길동</TableCell>
      <TableCell>Admin</TableCell>
      <TableCell>활성</TableCell>
    </TableRow>
  </TableBody>
</Table>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Table 구성 요소 개요입니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>컴포넌트</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Table</td><td>전체 테이블 컨테이너</td></tr>
                <tr><td>TableHeader</td><td>헤더 영역</td></tr>
                <tr><td>TableBody</td><td>바디 영역</td></tr>
                <tr><td>TableRow</td><td>행 컨테이너</td></tr>
                <tr><td>TableHead</td><td>헤더 셀</td></tr>
                <tr><td>TableCell</td><td>바디 셀</td></tr>
              </tbody>
            </table>
          </>
        );
      },
    },
  },
  argTypes: {
    tableVariant: {
      control: 'select',
      options: ['default', 'sub'],
      description: 'Table variant',
      table: { category: 'Table' },
    },
    showCaption: {
      control: 'boolean',
      description: 'caption 렌더 여부',
      table: { category: 'Table' },
    },
    
    showSecondRow: {
      control: 'boolean',
      description: '두 번째 행 렌더 여부',
      table: { category: 'Body' },
    },

    variant: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    tableVariant: 'default',
    showCaption: false,
    showSecondRow: true,
  },
};

export default meta;
type Story = StoryObj<ContentTableStoryProps>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[56rem]">
      <Table variant={args.tableVariant}>
        {args.showCaption && <caption className="a11y-hidden">테이블 소개글</caption>}
        <TableHeader>
          <TableRow>
            <TableHead>header1</TableHead>
            <TableHead>header2</TableHead>
            <TableHead>header3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead>header1</TableHead>
            <TableCell>cell2</TableCell>
            <TableCell>cell3</TableCell>
          </TableRow>
          {args.showSecondRow && (
            <TableRow>
              <TableHead>header1</TableHead>
              <TableCell>cell5</TableCell>
              <TableCell>cell6</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  ),
};
