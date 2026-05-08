/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { KeyValueList } from '@common/KeyValueList';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

type KeyValueListStoryProps = React.ComponentProps<typeof KeyValueList>;

const SAMPLE_DATA = [
  { key: '총 보험료', value: '125,000원' },
  { key: '납입주기', value: '월납' },
  { key: '계약상태', value: '정상' },
] as const;

const meta: Meta<typeof KeyValueList> = {
  title: 'Components/Common/KeyValueList',
  component: KeyValueList,
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
                KeyValueList는 key-value 형태의 정보를 가로 목록으로 표시하는 컴포넌트입니다.<br />
                항목 사이 구분자(|)를 자동으로 넣어 요약 정보 영역에 적합합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>KeyValueList 컴포넌트는 데이터 배열을 전달하여 사용할 수 있습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { KeyValueList } from '@common/KeyValueList';

const data = [
  { key: '총 보험료', value: '125,000원' },
  { key: '납입주기', value: '월납' },
];

<KeyValueList data={data} className="w-full" />
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>KeyValueList 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>data</td><td>{`{ key: string; value: ReactNode; }[]`}</td><td>표시할 key-value 데이터 배열</td></tr>
                <tr><td>className</td><td>string</td><td>추가 스타일 클래스</td></tr>
              </tbody>
            </table>

            <h2>Examples</h2>
            <p>다양한 데이터 구성을 통해 KeyValueList를 활용할 수 있습니다.</p>
            <Unstyled>
              <KeyValueList data={[
                { key: '계약자', value: '김한화' },
                { key: '피보험자', value: '김한화' },
                { key: '보험기간', value: '2026.01.01 ~ 2036.01.01' },
              ]} />
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    // 1. Content
    data: {
      control: 'object',
      description: '표시할 key-value 데이터 배열',
      table: {
        category: 'Content',
        type: { summary: '{ key: string; value: ReactNode }[]' },
      },
    },

    // 2. Appearance
    className: {
      control: 'text',
      description: '루트 요소에 적용할 클래스',
      table: { category: 'Appearance' },
    },
  },
  args: {
    data: [...SAMPLE_DATA],
    className: 'w-full',
  },
};

export default meta;
type Story = StoryObj<typeof KeyValueList>;

export const Default: Story = {
  render: (args: KeyValueListStoryProps) => {
    return (
      <>
        <KeyValueList {...args} />
      </>
    );
  },
};
