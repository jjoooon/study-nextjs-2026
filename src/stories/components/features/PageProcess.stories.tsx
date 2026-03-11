import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PageProcess from '@/shared/components/features/PageProcess';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof PageProcess> = {
  title: 'Components/Features/PageProcess',
  component: PageProcess,
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
              PageProcess 컴포넌트는 페이지의 주요 업무 단계를 시각적으로 보여주는 수직 프로세스 바입니다.
              <br />
              현재 활성화된 단계와 완료된 단계를 시각적으로 구분하여 사용자가 진행 상태를 쉽게 파악할 수 있도록 돕습니다.
            </p>
          </div>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>PageProcess 컴포넌트는 현재 props를 받지 않으며, 다음과 같이 간단하게 사용할 수 있습니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import PageProcess from '@/shared/components/features/PageProcess';

<PageProcess />
\`\`\`
            `}
          </Markdown>

          <h2>API Reference</h2>
          <p>이 컴포넌트는 현재 외부로부터 props를 받지 않습니다. 각 단계의 상태(완료, 활성)는 컴포넌트 내부에 하드코딩된 `data-process` 속성으로 제어됩니다.</p>
        </>
      ),
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof PageProcess>;

export const Default: Story = {
  render: () => (
    <PageProcess />
  ),
};