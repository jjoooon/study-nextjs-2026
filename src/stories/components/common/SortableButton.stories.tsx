/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { Grow, Gcol, Typo } from '@atoms';
import { SortableButton } from '@common/SortableButton';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

type SortOrder = 'asc' | 'desc' | 'none';

type SortableButtonStoryProps = React.ComponentProps<typeof SortableButton>;

const SORT_ORDER_OPTIONS: SortOrder[] = ['asc', 'desc', 'none'];

const meta: Meta<SortableButtonStoryProps> = {
  title: 'Components/Common/SortableButton',
  component: SortableButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <br />
            <h2>Overview</h2>
            <div>
              <p>
                SortableButton은 컬럼 정렬 상태를 표시하고 정렬 변경 이벤트를 발생시키는 버튼 컴포넌트입니다.
                <br />
                현재 정렬 컬럼과 정렬 방향(asc/desc/none)에 따라 아이콘이 자동으로 바뀝니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>SortableButton 컴포넌트는 정렬 대상 컬럼 키와 현재 정렬 상태를 전달받아 동작합니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { SortableButton } from '@common/SortableButton';

<SortableButton
  label="보험료"
  columnKey="premium"
  currentSortColumn="premium"
  currentSortOrder="asc"
  onSort={(columnKey) => console.log(columnKey)}
/>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>SortableButton 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>label</td>
                  <td>string</td>
                  <td>버튼 라벨 텍스트</td>
                </tr>
                <tr>
                  <td>columnKey</td>
                  <td>string</td>
                  <td>정렬 대상 컬럼 키</td>
                </tr>
                <tr>
                  <td>currentSortColumn</td>
                  <td>string | null</td>
                  <td>현재 정렬된 컬럼 키</td>
                </tr>
                <tr>
                  <td>currentSortOrder</td>
                  <td>'asc' | 'desc' | 'none'</td>
                  <td>현재 정렬 방향</td>
                </tr>
                <tr>
                  <td>onSort</td>
                  <td>(columnKey: string) ={'>'} void</td>
                  <td>정렬 클릭 이벤트 핸들러</td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    },
  },
  argTypes: {
    // 1. Content
    label: {
      control: 'text',
      description: '버튼 라벨 텍스트',
      table: { category: 'Content' },
    },
    columnKey: {
      control: 'text',
      description: '정렬 대상 컬럼 키',
      table: { category: 'Content' },
    },

    // 2. State
    currentSortColumn: {
      control: 'text',
      description: '현재 정렬된 컬럼 키',
      table: { category: 'State' },
    },
    currentSortOrder: {
      control: 'select',
      options: SORT_ORDER_OPTIONS,
      description: '현재 정렬 방향',
      table: {
        category: 'State',
        type: { summary: SORT_ORDER_OPTIONS.join(' | ') },
      },
    },

    // 3. Events
    onSort: {
      action: 'sorted',
      description: '버튼 클릭 시 호출되는 정렬 이벤트',
      table: { category: 'Events' },
    },
  },
  args: {
    label: '보험료',
    columnKey: 'premium',
    currentSortColumn: 'premium',
    currentSortOrder: 'none',
  },
};

export default meta;
type Story = StoryObj<SortableButtonStoryProps>;

export const Default: Story = {
  render: (args) => {
    const [currentSortColumn, setCurrentSortColumn] = React.useState<string | null>(args.currentSortColumn ?? null);
    const [currentSortOrder, setCurrentSortOrder] = React.useState<SortOrder>(args.currentSortOrder ?? 'none');

    React.useEffect(() => {
      setCurrentSortColumn(args.currentSortColumn ?? null);
    }, [args.currentSortColumn]);

    React.useEffect(() => {
      setCurrentSortOrder(args.currentSortOrder ?? 'none');
    }, [args.currentSortOrder]);

    const handleSort = (columnKey: string) => {
      const nextOrder: SortOrder =
        currentSortColumn !== columnKey
          ? 'asc'
          : currentSortOrder === 'asc'
            ? 'desc'
            : currentSortOrder === 'desc'
              ? 'none'
              : 'asc';

      setCurrentSortColumn(columnKey);
      setCurrentSortOrder(nextOrder);
      args.onSort?.(columnKey);
    };

    return (
      <Gcol className="gap-4 items-center">
        <SortableButton
          label={args.label}
          columnKey={args.columnKey}
          currentSortColumn={currentSortColumn}
          currentSortOrder={currentSortOrder}
          onSort={handleSort}
        />
        <Typo variant="body-sm" color="gray">
          currentSortOrder: {currentSortOrder}
        </Typo>
      </Gcol>
    );
  },
};
