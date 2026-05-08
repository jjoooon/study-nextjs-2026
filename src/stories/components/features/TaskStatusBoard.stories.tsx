/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { TaskStatusBoard } from '@features/TaskStatusBoard';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

// 꼭 확인해야 할 일!
type DataTaskState = {
  id: number;
  status: '정상' | '경고' | '중지';
  label: string;
  sum: number;
};
const dataTaskState: DataTaskState[] = [
  { id: 1, status: '정상', label: '누적', sum: 24 },
  { id: 2, status: '경고', label: '중복', sum: 0 },
  { id: 3, status: '중지', label: '직업', sum: 2 },
  { id: 4, status: '중지', label: '기타', sum: 0 },
];

const meta: Meta<typeof TaskStatusBoard> = {
  title: 'Components/Features/Aside/신호등(TaskStatusBoard)',
  component: TaskStatusBoard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <br />
          <h2>Overview</h2>
          <div>
            <p>
              TaskStatusBoard 컴포넌트는 사용자가 확인해야 할 주요 업무의 상태를 시각적으로 보여주는 보드입니다.
              <br />
              각 항목의 상태(정상, 경고, 중지)에 따라 다른 아이콘과 스타일이 적용됩니다.
            </p>
          </div>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>TaskStatusBoard 컴포넌트는 `state` 배열을 props로 받아 렌더링합니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import TaskStatusBoard from '@features/TaskStatusBoard';

type DataTaskState = {
  id: number;
  status: '정상' | '경고' | '중지';
  label: string;
  sum: number;
};
const dataTaskState: DataTaskState[] = [
  { id: 1, status: '정상', label: '누적', sum: 24 },
  { id: 2, status: '경고', label: '중복', sum: 0 },
  { id: 3, status: '중지', label: '직업', sum: 2 },
  { id: 4, status: '중지', label: '기타', sum: 0 },
];

<TaskStatusBoard state={dataTaskState} />
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
                <td>state</td>
                <td>{`{ id: number; status: '정상' | '경고' | '중지'; label: string, sum: number }[]`}</td>
                <td>표시할 작업 상태 데이터 배열.</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
  argTypes: {
    state: {
      control: 'object',
      description: '작업 상태 데이터 배열',
    },
  },
  args: { state: dataTaskState },
};

export default meta;
type Story = StoryObj<typeof TaskStatusBoard>;

export const Default: Story = {
  render: (args) => (
    <div className="p-4 flex justify-center items-center">
      <TaskStatusBoard {...args} />
    </div>
  ),
};