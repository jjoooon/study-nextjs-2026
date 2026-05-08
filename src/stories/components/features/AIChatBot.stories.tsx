/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import AIChatBot from '@/shared/components/features/AIChatBot';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof AIChatBot> = {
  title: 'Components/Features/AI챗봇(AIChatBot)',
  component: AIChatBot,
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
              AIChatBot 컴포넌트는 챗봇 버튼 클릭 시 레이어 팝업(Dialog)을 띄우는 컴포넌트입니다.
              <br />
              팝업은 드래그/리사이즈가 가능하며, 내부 iframe은 팝업 크기에 맞춰 함께 조절됩니다.
            </p>
          </div>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>버튼을 클릭하면 챗봇 팝업이 열립니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import AIChatBot from '@/shared/components/features/AIChatBot';

<AIChatBot />
\`\`\`
            `}
          </Markdown>

          <h2>API Reference</h2>
          <p>이 컴포넌트는 현재 외부 props를 받지 않습니다.</p>
        </>
      ),
    },
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof AIChatBot>;

export const Default: Story = {
  render: () => (
    <div className="relative flex items-center justify-center" style={{ width: '20rem', height: '8rem' }}>
      <AIChatBot />
    </div>
  ),
};
