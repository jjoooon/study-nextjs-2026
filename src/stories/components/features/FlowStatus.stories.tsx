import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FlowStatus from '@/shared/components/features/FlowStatus';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof FlowStatus> = {
  title: 'Components/Features/FlowStatus',
  component: FlowStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <br />
          <h2>Overview</h2>
          <div>
            <p>
              FlowStatus 컴포넌트는 업무 흐름의 진행 상태를 표시하는 좌측 사이드바 UI입니다.
              <br />
              접기/펼치기 토글 기능을 통해 상세 정보를 확인하거나 공간을 확보할 수 있습니다.
            </p>
          </div>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>FlowStatus 컴포넌트는 다음과 같이 사용할 수 있습니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import FlowStatus from '@/shared/components/features/FlowStatus';

<FlowStatus
  defaultPressed={false}
  onToggleChange={(pressed) => console.log('Is Open:', pressed)}
/>
\`\`\`
            `}
          </Markdown>

          <h2>API Reference</h2>
          <p>주요 prop 옵션은 다음과 같습니다.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>prop</th>
                <th>타입</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>defaultPressed</td>
                <td>boolean</td>
                <td>초기 펼침 상태 (기본값: false)</td>
              </tr>
              <tr>
                <td>onToggleChange</td>
                <td>{`(pressed: boolean) => void`}</td>
                <td>토글 상태 변경 시 호출되는 콜백 함수</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
  argTypes: {
    defaultPressed: {
      control: 'boolean',
      description: '초기 펼침 상태',
    },
    onToggleChange: {
      action: 'toggle changed',
      description: '토글 상태 변경 이벤트',
    },
  },
  args: {
    defaultPressed: false,
  },
};

export default meta;
type Story = StoryObj<typeof FlowStatus>;

export const Default: Story = {
  render: (args) => (
    <div className="h-[60rem] w-[80rem] border border-gray-200 bg-white relative flex overflow-hidden">
      <FlowStatus {...args} />
      <div className="flex-1 bg-gray-50 p-8">
        <p className="text-gray-500">본문 영역입니다.</p>
      </div>
    </div>
  ),
};