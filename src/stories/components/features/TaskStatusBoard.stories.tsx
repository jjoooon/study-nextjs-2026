/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { TaskStatusBoard } from '@features/TaskStatusBoard';

// 꼭 확인해야 할 일!
type DataTaskState = {
  id: number;
  status: '정상' | '경고' | '중지' | '없음';
  label: string;
  sum: number;
};
const dataTaskState: DataTaskState[] = [
  { id: 1, status: '정상', label: '누적', sum: 24 },
  { id: 2, status: '경고', label: '중복', sum: 0 },
  { id: 3, status: '중지', label: '직업', sum: 2 },
  { id: 4, status: '정상', label: '기타', sum: 0 },
];

const meta: Meta<typeof TaskStatusBoard> = {
  title: 'Components/Features/Aside/신호등(TaskStatusBoard)',
  component: TaskStatusBoard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="TaskStatusBoard"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화 (StoryDocTemplate 적용)',
          ]}
          overview={`TaskStatusBoard 컴포넌트는 사용자가 확인해야 할 주요 업무의 상태를 시각적으로 보여주는 보드입니다.
각 항목의 상태(정상, 경고, 중지)에 따라 다른 아이콘과 스타일이 적용됩니다.`}
          usageCode={`import { TaskStatusBoard } from '@/shared/components/features/TaskStatusBoard';

const dataTaskState = [
  { id: 1, status: '정상', label: '누적', sum: 24 },
  { id: 2, status: '경고', label: '중복', sum: 0 },
  { id: 3, status: '중지', label: '직업', sum: 2 },
  { id: 4, status: '정상', label: '기타', sum: 0 },
];

<TaskStatusBoard state={dataTaskState} onItemClick={(item) => console.log(item)} />`}
          apiReference={[
            {
              prop: 'state',
              type: 'T[]',
              description: '각 작업의 상태 정보 배열 (id, status, label 필수)',
            },
            {
              prop: 'onItemClick',
              type: '(item: T) => void',
              description: '항목 클릭 시 호출되는 콜백 함수',
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    state: {
      control: 'object',
      description: '작업 상태 데이터 배열 (T[])',
      table: { category: 'Data' },
    },
    onItemClick: {
      action: 'itemClicked',
      description: '아이템 클릭 콜백 함수',
      table: { category: 'Events' },
    },
  },
  args: {
    state: dataTaskState,
  },
};

export default meta;
type Story = StoryObj<typeof TaskStatusBoard>;

export const Default: Story = {
  render: (args) => (
    <div className="p-4 flex justify-center items-center w-[19.8rem]">
      <TaskStatusBoard {...args} />
    </div>
  ),
};
