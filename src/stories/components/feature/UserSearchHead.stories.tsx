import type { Meta, StoryObj } from '@storybook/react';
import { Grow } from '@atoms';
import UserSearchHead  from '@/shared/components/features/UserSearchHead';
import { Title, Primary, Controls, Canvas, Markdown } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof UserSearchHead> = {
  title: 'Components/Features/UserSearchHead',
  component: UserSearchHead,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>Overview</h2>
          <div>
            <p>
              UserSearchHead 컴포넌트는 사용자 검색 및 탭 전환 등 상단 검색/필터 UI를 제공합니다.<br />
              검색 조건, 탭, 버튼 등 다양한 조합이 가능합니다.
            </p>
          </div>
          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>사용자 검색, 필터, 탭 전환 등 상단 영역에 활용합니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import { UserSearchHead } from '@/shared/components/features/UserSearchHead';

<UserSearchHead />
\`\`\`
            `}
          </Markdown>
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof UserSearchHead>;

export const Default: Story = {
  render: (args) => {
    return (
      <Grow className="p-8">
        <UserSearchHead />
      </Grow>
    );
  },
};

